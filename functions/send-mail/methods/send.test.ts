// Mock the entire resend module (must be declared before importing the handler)
jest.mock('resend', () => {
  const send = jest.fn().mockResolvedValue({ id: 'test-id', from: 'test@example.com' })
  return {
    Resend: jest.fn().mockImplementation(() => ({
      emails: { send },
    })),
    __sendMock: send,
  }
})

import { HandlerEvent } from '@netlify/functions'
import send from './send'

describe('send', () => {
  beforeEach(() => {
    const { __sendMock } = require('resend')
    __sendMock.mockClear()
  })

  const getResendSendSpy = () => {
    const { __sendMock } = require('resend')
    return __sendMock as jest.Mock
  }

  it('sends the mail correctly (defaults from/replyTo and strips HTML for text)', async () => {
    const event: HandlerEvent = {
      body: JSON.stringify({
        to: 'recipient@mail.com',
        subject: 'Test mail',
        body: 'hello <br/>how are you',
      }),
    } as any

    const response = await send(event)
    expect(response).toEqual({
      statusCode: 200,
      body: '{\"id\":\"test-id\",\"from\":\"test@example.com\"}'
    })

    const sendSpy = getResendSendSpy()
    expect(sendSpy).toHaveBeenCalledWith({
      to: 'recipient@mail.com',
      subject: 'Test mail',
      from: 'Randonneurs Ontario <no-reply@randonneursontario.ca>',
      reply_to: 'Randonneurs Ontario <no-reply@randonneursontario.ca>',
      text: 'hello how are you',
      html: 'hello <br/>how are you',
    })
  })

  it('uses default subject and body when not provided', async () => {
    const event: HandlerEvent = {
      body: JSON.stringify({
        to: 'recipient@mail.com',
      }),
    } as any

    const response = await send(event)
    expect(response).toEqual({
      statusCode: 200,
      body: '{\"id\":\"test-id\",\"from\":\"test@example.com\"}'
    })

    const sendSpy = getResendSendSpy()
    expect(sendSpy).toHaveBeenCalledWith({
      to: 'recipient@mail.com',
      subject: 'Randonneurs Ontario',
      from: 'Randonneurs Ontario <no-reply@randonneursontario.ca>',
      reply_to: 'Randonneurs Ontario <no-reply@randonneursontario.ca>',
      text: ' ',
      html: ' ',
    })
  })

  it('handles errors', async () => {
    const event: HandlerEvent = {
      body: '{'
    } as any

    const response = await send(event)
    expect(response).toEqual({
      statusCode: 500,
      body: expect.any(String)
    })
  })

})
