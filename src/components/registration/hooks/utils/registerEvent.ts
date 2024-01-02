import Bugsnag from "@bugsnag/js"
import { Event } from "src/data/events"
import { useMail } from "src/data/mail"
import { registerRider } from "src/data/riders"

type FormData = {
  name: string
  email: string
  route: Event['route']
  rideType: Event['eventType'] | ''
  chapter: Event['chapter'],
  eventId: Event['scheduleId'],
  shareRide: boolean,
  [keyof: string]: any
}

export const registerEvent = async ({ eventId, name, route, shareRide, email, gender, chapter }: FormData) => {
  const { createContact, createList } = useMail()

  if (!eventId) {
    return true
  }

  const [firstName, ...rest] = name.split(' ')
  const lastName = rest.join(' ')

  const lists = []

  try {
    const list = await createList({ scheduleId: eventId, name: route })
    if (!list || !list.id) {
      throw new Error(`Unable to create list for event ${eventId}`)
    }
    lists.push(list.id)
  } catch (e) {
    Bugsnag.notify('Could not find list', null, (e, event) => {
      event.addMetadata('route', { route })
      event.addMetadata('eventId', { eventId })
    })

  }

  const success = await Promise.all([
    createContact({ firstName, lastName, email, chapter, lists }),
    registerRider({
      eventId: parseInt(eventId),
      hideRide: !shareRide,
      email: email,
      firstName,
      lastName,
      gender
    })
  ])
  return success.every(Boolean)
}
