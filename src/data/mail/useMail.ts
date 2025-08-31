import { sendMail } from './api/sendMail'
import { createContact } from './api/contact'

export const useMail = () => ({
  createContact,
  sendMail
})
