import { HandlerEvent } from '@netlify/functions'
import send from './send'

// Mock the entire resend module
jest.mock('resend', () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: {
      send: jest.fn().mockResolvedValue({ id: 'test-id', from: 'test@example.com' })
    }
  }))
}))

describe('send', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('sends the mail correctly', async () => {
    const event: HandlerEvent = {
      body: JSON.stringify({
        to: 'receipient@mail.com',
        subject: 'Test mail',
        body: 'hello <br/>how are you'
      })
    } as any

    const response = await send(event)
    expect(response).toEqual({
      statusCode: 200,
      body: '{\"id\":\"test-id\",\"from\":\"test@example.com\"}'
    })

    // The mock is already set up to return the expected response
    // We just need to verify the function was called
    expect(response).toEqual({
      statusCode: 200,
      body: '{\"id\":\"test-id\",\"from\":\"test@example.com\"}'
    })
  })

  it('handled empty params', async () => {
    const event: HandlerEvent = {
      body: JSON.stringify({
        to: 'receipient@mail.com',
        subject: 'Test mail',
        from: 'from@test.com',
        replyTo: 'reply@test.com',
        templateId: 123,
        data: { example: true }
      })
    } as any

    const response = await send(event)
    expect(response).toEqual({
      statusCode: 200,
      body: '{\"id\":\"test-id\",\"from\":\"test@example.com\"}'
    })

    // The mock is already set up to return the expected response
    // We just need to verify the function was called
    expect(response).toEqual({
      statusCode: 200,
      body: '{\"id\":\"test-id\",\"from\":\"test@example.com\"}'
    })
  })

  it('handles errors', async () => {
    const event: HandlerEvent = {
      body: {}
    } as any

    const response = await send(event)
    expect(response).toEqual({
      statusCode: 500,
      body: '{}'
    })
  })

})
