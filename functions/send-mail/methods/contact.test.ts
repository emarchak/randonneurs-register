import { HandlerEvent } from '@netlify/functions'
import * as fetch from 'cross-fetch'
import customFields from '../customFields'
import addContact from './contact'

describe('send', () => {
  const fetchMock = jest.spyOn(fetch, 'default')

  beforeEach(() => {
    fetchMock.mockImplementation(async (endpoint): Promise<Response> => {
      if (typeof endpoint === 'string' && endpoint.includes('audiences')) {
        return {
          status: 200,
          statusText: 'OK',
          json: () => ({ success: true }),
        } as any
      }
      return {
        status: 200,
        statusText: 'OK'
      } as Response
    })
  })

  afterEach(() => {
    fetchMock.mockClear()
  })

  it('returns 500 if missing email', async () => {
    const event: HandlerEvent = {
      body: JSON.stringify({})
    } as any

    const response = await addContact(event)
    expect(response).toEqual({
      statusCode: 500,
      body: '\"Email is required\"'
    })
  })

  it('returns 200 if successful with custom fields', async () => {
    const event: HandlerEvent = {
      body: JSON.stringify({
        first_name: 'Test',
        last_name: 'User',
        email: 'test@email.com',
        customFields: {
          chapter: 'Toronto',
        }
      })
    } as any

    const response = await addContact(event)
    expect(response).toEqual({ statusCode: 200, body: '{\"status\":200,\"statusText\":\"OK\"}' })
  })

  it('returns 200 if successful', async () => {
    const event: HandlerEvent = {
      body: JSON.stringify({
        first_name: 'Test',
        last_name: 'User',
        email: 'test@email.com',
        customFields: {
          chapter: 'Toronto',
        }
      })
    } as any

    const response = await addContact(event)

    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('audiences'),
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          name: 'Test User',
          email: 'test@email.com',
          unsubscribed: false,
          audienceId: undefined,
          attributes: {
            firstName: 'Test',
            lastName: 'User',
            chapter: 'Toronto'
          }
        })
      }))
    expect(response).toEqual({ statusCode: 200, body: '{\"status\":200,\"statusText\":\"OK\"}' })
  })
})
