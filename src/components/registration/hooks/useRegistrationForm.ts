import { useEffect, useState } from 'react'
import Bugsnag from '@bugsnag/js'
import { formatSlackMessage } from 'src/components/form/utils'
import { useMail } from 'src/data/mail'
import { useSlack } from 'src/hooks/useSlack'
import { useSheets } from 'src/hooks/useSheets'
import { Brevet } from 'src/data/events'
import { getDateShort, getDateTimeLong, getTime, trackEvent } from 'src/utils'
import { registerEvent } from './utils'

type useRegistrationFormParams = {
    formName: string,
    fieldLabels: {
        [keyof: string]: string
    }
}

type FormData = {
    name: string
    email: string
    route: Brevet['route']
    rideType: Brevet['eventType'] | ''
    chapter: Brevet['chapter'] | '',
    [keyof: string]: any
}

const permEmail = 'treasurer@randonneursontario.ca'
const replyToEmails = {
    "toronto": "vp-toronto@randonneursontario.ca",
    "simcoe": "vp-simcoe@randonneursontario.ca",
    "huron": "vp-huron@randonneursontario.ca",
    "ottawa": "vp-ottawa@randonneursontario.ca",
    "default": "vp-toronto@randonneursontario.ca"
}

export const useRegistrationForm = ({ formName, fieldLabels }: useRegistrationFormParams) => {
    const [loading, setLoading] = useState(false)
    const [defaultScheduleId, setDefaultScheduleId] = useState<string | null>(null)
    const { sendMail } = useMail()
    const { sendSlackMsg } = useSlack()
    const { addRow } = useSheets()

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const eventId = params.get('schedule-id')
        setDefaultScheduleId(eventId)
    }, [defaultScheduleId, setDefaultScheduleId])

    const onSubmit = async (data: FormData) => {
        setLoading(true)
        const message = `Registration for ${data.chapter} ${data.route} ${data.rideType}`

        const successRegistration = await registerEvent(data as any)

        const successSlack = await sendSlackMsg(formatSlackMessage({ fieldLabels, formData: data, message }), 'registration')
        const successSheet = await addRow({
            sheet: formName,
            row: {
                ...data,
                submitted: getDateTimeLong(new Date(Date.now())),
                scheduleTime: data.scheduleTime && getDateTimeLong(data.scheduleTime),
                startDate: data.startTime && getDateShort(data.startTime),
                startTime: data.startTime && getTime(data.startTime),
            }
        })
        const replyTo = replyToEmails[data.chapter.toLowerCase() || 'default']
        const memberAtLarge = data.chapter === 'Huron' ? 'director1@randonneursontario.ca' : undefined
        const vpPermanent = data.rideType === 'Permanent' ? permEmail : undefined
        const successMail = await sendMail({
            to: [data.email, replyTo, vpPermanent, memberAtLarge].filter(Boolean),
            replyTo,
            data
        }, 'brevetRegistration')

        if (!successSlack || !successMail || !successSheet) {
            Bugsnag.notify('Registration error', null, (e, event) => {
                event.addMetadata('data', { data })
                event.addMetadata('success', { successMail, successSheet, successSlack })
            })
        }

        trackEvent("sign_up", { method: formName, ...data })

        setLoading(false)
        return successRegistration && successSheet
    }
    return {
        defaultScheduleId,
        loading,
        onSubmit
    }

}
