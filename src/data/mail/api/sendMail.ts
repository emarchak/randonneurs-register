import fetch from 'cross-fetch'
import RideRegistrationEmail, { RideRegistrationData } from '../../../templates/emails/rideRegistration'
import { defaultFormTemplate, DefaultFormData } from '../../../templates/emails/defaultForm'

type sendMailParams = {
    to: string | string[],
    replyTo?: string,
    from?: string,
    data?: Object
}

type TemplateType = 'rideRegistration' | 'defaultForm'

const generateEmailBody = async (template: TemplateType, data: any): Promise<string> => {
    switch (template) {
        case 'rideRegistration':
            // Dynamic import to avoid issues in test environment
            const { render } = await import('@react-email/render')
            return render(RideRegistrationEmail(data as RideRegistrationData))
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
            body = await generateEmailBody(template, params.data)
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
