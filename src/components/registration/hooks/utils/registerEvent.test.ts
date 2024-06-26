import { Chapter, EventKind } from "src/data/events"
import { registerEvent } from "./registerEvent"
import * as fetch from 'cross-fetch'
import Bugsnag from '@bugsnag/js'
const event = {
  eventId: '420',
  name: 'John de la Doe',
  route: '200',
  shareRide: true,
  email: 'test@test.com',
  rideType: EventKind.Brevet,
  chapter: Chapter.Toronto
}

describe('registerEvent', () => {
  const fetchSpy = jest.spyOn(fetch, 'default')

  afterEach(() => {
    fetchSpy.mockClear()
  })

  it('should register a rider', async () => {
    const response = await registerEvent({ ...event })
    expect(response).toBeTruthy()
    expect(fetchSpy).toHaveBeenCalledWith(
      expect.stringContaining('send-mail/contact'),
      expect.objectContaining({
        method: 'PUT',
        body: JSON.stringify({
          first_name: 'John',
          last_name: 'de la Doe',
          email: 'test@test.com',
          lists: ['1234'],
          custom_fields: { chapter: 'Toronto' }
        })
      })
    )
    expect(fetchSpy).toHaveBeenCalledWith(
      expect.stringContaining('data/ride'),
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          eventId: 420,
          hideRide: false,
          email: 'test@test.com',
          firstName: 'John',
          lastName: 'de la Doe',
        })
      })
    )
  })

  it('should return early if eventId is missing', async () => {
    const response = await registerEvent({ ...event, eventId: '' })
    expect(response).toBeTruthy()
    expect(fetchSpy).not.toHaveBeenCalledWith()
  })

  it('should return register event even if list.id is missing', async () => {
    const response = await registerEvent({ ...event, eventId: '999' })
    const callbackSpy = jest.fn()

    expect(response).toBeTruthy()
    expect(Bugsnag.notify).toHaveBeenCalledWith('Could not find list', null, expect.any(Function))
    expect(fetchSpy).toHaveBeenNthCalledWith(4,
      expect.stringContaining('send-mail/contact'),
      expect.objectContaining({
        method: 'PUT',
        body: JSON.stringify({
          first_name: 'John',
          last_name: 'de la Doe',
          email: 'test@test.com',
          lists: [],
          custom_fields: { chapter: 'Toronto' }
        })
      })
    )
    // @ts-ignore-next-line
    const callback = Bugsnag.notify.mock.calls[0][2]

    callback(new Error('test'), { addMetadata: callbackSpy })
    expect(callbackSpy).toHaveBeenCalledWith('route', { route: '200' })
    expect(callbackSpy).toHaveBeenCalledWith('eventId', { eventId: '999' })
  })
})
