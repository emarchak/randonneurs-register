import fetch from 'isomorphic-unfetch'

const mailTemplates = {
    'brevetRegistration': 'd-6d0774ec805f41e09c68b2da5e79978a'
}

type sendMailParams = {
    to: string | string[],
    subject: string,
    body: string,
    replyTo?: string,
    from?: string,
    data?: Object
}

export const useSendMail = () => {
    const sendMail = async (params: sendMailParams, template?: keyof typeof mailTemplates) => {
        try {
            const templateId = mailTemplates[template] || undefined
            const response = await fetch('/.netlify/functions/send-mail', {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: JSON.stringify({
                    ...params,
                    templateId
                }),
            })

            return response.ok
        }
        catch (err) {
            return false
        }
    }

    return {
        sendMail,
    }
}