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

export const registerEvent = async ({ eventId, name, shareRide, email, gender }: FormData) => {
  if (!eventId) {
    return true
  }

  const [firstName, ...rest] = name.split(' ')
  const lastName = rest.join(' ')

  return await registerRider({
    eventId: parseInt(eventId),
    hideRide: !shareRide,
    email: email,
    firstName,
    lastName,
    gender
  })
}
