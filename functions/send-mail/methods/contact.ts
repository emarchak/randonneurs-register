import fetch from 'cross-fetch'
import { HandlerEvent, HandlerResponse } from "@netlify/functions"

const contactEndpoint = 'https://api.resend.com/audiences'
const customFieldEndpoint = 'https://api.resend.com/audiences/fields'

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
}

const addContact = async (event: HandlerEvent): Promise<HandlerResponse> => {
  try {
    const {
      first_name,
      last_name,
      email,
      customFields = {},
      lists = []
    } = JSON.parse(event.body)

    if (!email) {
      throw new Error('Email is required')
    }

    const contactCustomFields = Object.keys(customFields).reduce((acc, fieldName) => {
      return { ...acc, [fieldName]: customFields[fieldName] }
    }, {})

    const response = await fetch(contactEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        name: `${first_name} ${last_name}`,
        email,
        unsubscribed: false,
        audienceId: lists[0],
        attributes: {
          firstName: first_name,
          lastName: last_name,
          ...contactCustomFields
        }
      })
    })

    return {
      statusCode: response.status,
      body: JSON.stringify(response)
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error?.message)
    }
  }
}

export default addContact
