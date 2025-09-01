import { Resend } from 'resend'
import { HandlerEvent, HandlerResponse } from '@netlify/functions'

const resend = new Resend(process.env.RESEND_API_KEY)

const send = async (event: HandlerEvent): Promise<HandlerResponse> => {
  try {
    const {
      to,
      from = 'Randonneurs Ontario <no-reply@randonneurs.to>',
      replyTo = 'Randonneurs Ontario <no-reply@randonneurs.to>',
      subject,
      body = ' '
    } = JSON.parse(event.body)

    const response = await resend.emails.send({
      to,
      subject,
      from,
      reply_to: replyTo,
      text: body.replace(/(<([^>]+)>)/gi, ""),
      html: body,
    })

    return {
      statusCode: 200,
      body: JSON.stringify(response),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error)
    }
  }
}

export default send
