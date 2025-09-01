import fetch from 'cross-fetch'
import { brevetRegistrationTemplate, BrevetRegistrationData } from '../../../templates/emails/brevetRegistration'
import { defaultFormTemplate, DefaultFormData } from '../../../templates/emails/defaultForm'

type sendMailParams = {
    to: string | string[],
    replyTo?: string,
    from?: string,
    data?: Object
}

type TemplateType = 'brevetRegistration' | 'defaultForm'

const generateEmailBody = (template: TemplateType, data: any): string => {
    switch (template) {
        case 'brevetRegistration':
            return brevetRegistrationTemplate(data as BrevetRegistrationData)
        case 'defaultForm':
            return defaultFormTemplate(data as DefaultFormData)
        default:
            return ''
    }
}

export const sendMail = async (params: sendMailParams, template?: TemplateType) => {
    try {
        let body = ''
        if (template && params.data) {
            body = generateEmailBody(template, params.data)
        }

        const response = await fetch('/.netlify/functions/send-mail/send', {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: JSON.stringify({
                ...params,
                body
            }),
        })

        return response.ok
    }
    catch (err) {
        return false
    }
}
