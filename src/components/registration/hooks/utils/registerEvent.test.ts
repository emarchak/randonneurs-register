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
})
