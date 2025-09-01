
import { renderHook } from '@testing-library/react'
import * as fetch from 'cross-fetch'
import Bugsnag from '@bugsnag/js'
import { useMail } from './useMail'

describe('useMail()', () => {
    const fetchSpy = jest.spyOn(fetch, 'default')
    const notifySpy = jest.spyOn(Bugsnag, 'notify')

    afterEach(() => {
        fetchSpy.mockClear()
        notifySpy.mockClear()
    })

    it('calls send mail function', async () => {
        const { result } = renderHook(() => useMail())
        const emailContent = {
            to: 'foo@bar.com',
            subject: 'Test email',
            data: { body: 'Hello' }
        }
        const response = await result.current.sendMail(emailContent)

        expect(response).toEqual(true)
        expect(fetchSpy).toHaveBeenCalledWith('/.netlify/functions/send-mail/send', expect.objectContaining({
            body: JSON.stringify({
                ...emailContent,
                body: ''
            })
        }))
    })
    it('returns false on error', async () => {
        fetchSpy.mockRejectedValueOnce({ ok: false })
        const { result } = renderHook(() => useMail())

        const response = await result.current.sendMail({
            to: 'foo@bar.com'
        })

        expect(response).toEqual(false)
    })

    it('includes template and data if provided', async () => {
        const { result } = renderHook(() => useMail())
        const emailContent = {
            to: 'foo@bar.com',
            from: 'bar@baz.com',
            data: {
                'baz': 'qux'
            }
        }
        const response = await result.current.sendMail(emailContent, "rideRegistration")

        expect(response).toEqual(true)
        expect(fetchSpy).toHaveBeenCalledWith('/.netlify/functions/send-mail/send', expect.objectContaining({
            body: expect.stringContaining('<!DOCTYPE html>')
        }))
    })
})
