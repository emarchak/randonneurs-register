
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
            body: JSON.stringify(emailContent)
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
        const response = await result.current.sendMail(emailContent, "brevetRegistration")

        expect(response).toEqual(true)
        expect(fetchSpy).toHaveBeenCalledWith('/.netlify/functions/send-mail/send', expect.objectContaining({
            body: JSON.stringify({
                ...emailContent,
                templateId: 'd-6d0774ec805f41e09c68b2da5e79978a'
            })
        }))
    })

    it('fetches list with scheduleId', async () => {
        const { result } = renderHook(() => useMail())
        const response = await result.current.getList({ scheduleId: '420' })

        expect(response).toEqual({
            id: '1234',
            name: '420 - Example list',
            scheduleId: '420'
        })
        expect(fetchSpy).toHaveBeenCalledWith(
            '/.netlify/functions/send-mail/list?scheduleId=420',
            { method: 'GET' }
        )
    })

    it('fetches list with name', async () => {
        const { result } = renderHook(() => useMail())
        const response = await result.current.getList({ name: 'Named list' })

        expect(fetchSpy).toHaveBeenCalledWith(
            '/.netlify/functions/send-mail/list?name=Named+list',
            { method: 'GET' }
        )

        expect(response).toEqual({
            id: '91011',
            name: 'Named list',
            scheduleId: ''
        })
    })

    it('fetches list with errors', async () => {
        fetchSpy.mockRejectedValueOnce({ ok: false })
        const { result } = renderHook(() => useMail())
        const response = await result.current.getList({ scheduleId: '999' })

        expect(response).toBeUndefined()
        expect(notifySpy).toHaveBeenCalledWith({ ok: false })
        expect(fetchSpy).toHaveBeenCalledWith('/.netlify/functions/send-mail/list?scheduleId=999', expect.objectContaining({
            method: 'GET',
        }))
    })

    it('creates list', async () => {
        const { result } = renderHook(() => useMail())
        await result.current.createList({ scheduleId: 999, name: 'Example list' })

        expect(fetchSpy).toHaveBeenCalledWith(
            '/.netlify/functions/send-mail/list?scheduleId=999', expect.objectContaining({
                method: 'GET',
            }))
        expect(fetchSpy).toHaveBeenCalledWith(
            '/.netlify/functions/send-mail/list',
            expect.objectContaining({
                method: 'POST',
                body: JSON.stringify({ name: '999 - Example list' })
            }))
    })

    it('creates list with errors', async () => {
        fetchSpy.mockRejectedValue({ ok: false })
        const { result } = renderHook(() => useMail())
        const response = await result.current.createList({ scheduleId: 999, name: 'Example list' })

        expect(response).toBeNull()
        expect(notifySpy).toHaveBeenCalledWith({ ok: false })
        expect(fetchSpy).toHaveBeenCalledWith('/.netlify/functions/send-mail/list?scheduleId=999', { method: 'GET' })
        expect(fetchSpy).toHaveBeenCalledWith('/.netlify/functions/send-mail/list', {
            method: 'POST',
            body: JSON.stringify({ name: '999 - Example list' })
        })
    })
})
