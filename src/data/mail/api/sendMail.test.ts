import * as fetch from 'cross-fetch'
import { sendMail } from './sendMail'

// Mock the email templates
jest.mock('../../../templates/emails/rideRegistration', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({ type: 'div', props: { children: 'Mocked Ride Registration Email' } })
}))

jest.mock('../../../templates/emails/defaultForm', () => ({
  defaultFormTemplate: jest.fn().mockReturnValue('Mocked Default Form Template')
}))

// Mock @react-email/render
jest.mock('@react-email/render', () => ({
  render: jest.fn().mockReturnValue('<!DOCTYPE html><html><body>Mocked React Email HTML</body></html>')
}))

describe('sendMail', () => {
  const fetchSpy = jest.spyOn(fetch, 'default')

  beforeEach(() => {
    jest.clearAllMocks()
    fetchSpy.mockResolvedValue({ ok: true } as any)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('basic functionality', () => {
    it('sends mail without template', async () => {
      const params = {
        to: 'test@example.com',
        subject: 'Test Subject',
        body: 'Test body'
      }

      const result = await sendMail(params)

      expect(result).toBe(true)
      expect(fetchSpy).toHaveBeenCalledWith('/.netlify/functions/send-mail/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: JSON.stringify({
          ...params,
          body: ''
        })
      })
    })

    it('sends mail with single recipient', async () => {
      const params = {
        to: 'single@example.com',
        subject: 'Single Recipient',
        replyTo: 'reply@example.com',
        from: 'sender@example.com'
      }

      const result = await sendMail(params)

      expect(result).toBe(true)
      expect(fetchSpy).toHaveBeenCalledWith('/.netlify/functions/send-mail/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: JSON.stringify({
          ...params,
          body: ''
        })
      })
    })

    it('sends mail with multiple recipients', async () => {
      const params = {
        to: ['recipient1@example.com', 'recipient2@example.com'],
        subject: 'Multiple Recipients',
        data: { key: 'value' }
      }

      const result = await sendMail(params)

      expect(result).toBe(true)
      expect(fetchSpy).toHaveBeenCalledWith('/.netlify/functions/send-mail/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: JSON.stringify({
          ...params,
          body: ''
        })
      })
    })
  })

  describe('template functionality', () => {
    it('generates rideRegistration template', async () => {
      const params = {
        to: 'rider@example.com',
        subject: 'Ride Registration',
        data: {
          name: 'John Doe',
          membership: 'active',
          route: 'Toronto 200',
          distance: '200km',
          chapter: 'Toronto',
          startTime: '7:00 AM',
          startLocation: 'Start Point',
          rideType: 'Brevet',
          notes: 'Test notes'
        }
      }

      const result = await sendMail(params, 'rideRegistration')

      expect(result).toBe(true)
      expect(fetchSpy).toHaveBeenCalledWith('/.netlify/functions/send-mail/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: JSON.stringify({
          ...params,
          body: '<!DOCTYPE html><html><body>Mocked React Email HTML</body></html>'
        })
      })
    })

    it('generates defaultForm template', async () => {
      const params = {
        to: 'form@example.com',
        subject: 'Form Submission',
        data: {
          name: 'Jane Doe',
          email: 'jane@example.com',
          message: 'Test message'
        }
      }

      const result = await sendMail(params, 'defaultForm')

      expect(result).toBe(true)
      expect(fetchSpy).toHaveBeenCalledWith('/.netlify/functions/send-mail/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: JSON.stringify({
          ...params,
          body: 'Mocked Default Form Template'
        })
      })
    })

    it('handles template with no data', async () => {
      const params = {
        to: 'test@example.com',
        subject: 'No Data Template'
      }

      const result = await sendMail(params, 'rideRegistration')

      expect(result).toBe(true)
      expect(fetchSpy).toHaveBeenCalledWith('/.netlify/functions/send-mail/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: JSON.stringify({
          ...params,
          body: ''
        })
      })
    })

    it('handles unknown template type', async () => {
      const params = {
        to: 'test@example.com',
        subject: 'Unknown Template'
      }

      const result = await sendMail(params, 'unknownTemplate' as any)

      expect(result).toBe(true)
      expect(fetchSpy).toHaveBeenCalledWith('/.netlify/functions/send-mail/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: JSON.stringify({
          ...params,
          body: ''
        })
      })
    })
  })

  describe('error handling', () => {
    it('returns false when fetch fails', async () => {
      fetchSpy.mockRejectedValue(new Error('Network error'))

      const params = {
        to: 'test@example.com',
        subject: 'Error Test'
      }

      const result = await sendMail(params)

      expect(result).toBe(false)
    })

    it('returns false when fetch returns not ok', async () => {
      fetchSpy.mockResolvedValue({ ok: false } as any)

      const params = {
        to: 'test@example.com',
        subject: 'Not OK Test'
      }

      const result = await sendMail(params)

      expect(result).toBe(false)
    })

    it('returns false when template generation fails', async () => {
      // Mock the render function to throw an error
      const { render } = require('@react-email/render')
      render.mockImplementation(() => {
        throw new Error('Template generation failed')
      })

      const params = {
        to: 'test@example.com',
        subject: 'Template Error Test',
        data: { test: 'data' }
      }

      const result = await sendMail(params, 'rideRegistration')

      expect(result).toBe(false)
    })

    it('returns false when dynamic import fails', async () => {
      // Mock the dynamic import to fail
      jest.doMock('@react-email/render', () => {
        throw new Error('Import failed')
      })

      const params = {
        to: 'test@example.com',
        subject: 'Import Error Test',
        data: { test: 'data' }
      }

      const result = await sendMail(params, 'rideRegistration')

      expect(result).toBe(false)
    })
  })

  describe('edge cases', () => {
    it('handles empty string recipients', async () => {
      const params = {
        to: '',
        subject: 'Empty Recipient'
      }

      const result = await sendMail(params)

      expect(result).toBe(true)
      expect(fetchSpy).toHaveBeenCalledWith('/.netlify/functions/send-mail/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: JSON.stringify({
          ...params,
          body: ''
        })
      })
    })

    it('handles empty array recipients', async () => {
      const params = {
        to: [],
        subject: 'Empty Array Recipients'
      }

      const result = await sendMail(params)

      expect(result).toBe(true)
      expect(fetchSpy).toHaveBeenCalledWith('/.netlify/functions/send-mail/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: JSON.stringify({
          ...params,
          body: ''
        })
      })
    })

    it('handles null data', async () => {
      const params = {
        to: 'test@example.com',
        subject: 'Null Data',
        data: null
      }

      const result = await sendMail(params, 'rideRegistration')

      expect(result).toBe(true)
      expect(fetchSpy).toHaveBeenCalledWith('/.netlify/functions/send-mail/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: JSON.stringify({
          ...params,
          body: ''
        })
      })
    })

    it('handles undefined data', async () => {
      const params = {
        to: 'test@example.com',
        subject: 'Undefined Data'
      }

      const result = await sendMail(params, 'rideRegistration')

      expect(result).toBe(true)
      expect(fetchSpy).toHaveBeenCalledWith('/.netlify/functions/send-mail/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: JSON.stringify({
          ...params,
          body: ''
        })
      })
    })

    it('handles complex data objects', async () => {
      const complexData = {
        user: {
          name: 'John Doe',
          preferences: {
            theme: 'dark',
            notifications: true
          }
        },
        event: {
          id: 123,
          details: {
            location: 'Toronto',
            date: '2024-01-01'
          }
        },
        metadata: {
          timestamp: '2024-01-01T00:00:00.000Z',
          version: '1.0.0'
        }
      }

      const params = {
        to: 'complex@example.com',
        subject: 'Complex Data',
        data: complexData
      }

      const result = await sendMail(params, 'defaultForm')

      expect(result).toBe(true)
      expect(fetchSpy).toHaveBeenCalledWith('/.netlify/functions/send-mail/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: JSON.stringify({
          ...params,
          body: 'Mocked Default Form Template'
        })
      })
    })
  })

  describe('request format', () => {
    it('sends correct headers', async () => {
      const params = {
        to: 'test@example.com',
        subject: 'Headers Test'
      }

      await sendMail(params)

      expect(fetchSpy).toHaveBeenCalledWith(
        '/.netlify/functions/send-mail/send',
        expect.objectContaining({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
      )
    })

    it('sends correct method', async () => {
      const params = {
        to: 'test@example.com',
        subject: 'Method Test'
      }

      await sendMail(params)

      expect(fetchSpy).toHaveBeenCalledWith(
        '/.netlify/functions/send-mail/send',
        expect.objectContaining({
          method: 'POST'
        })
      )
    })

    it('sends correct endpoint', async () => {
      const params = {
        to: 'test@example.com',
        subject: 'Endpoint Test'
      }

      await sendMail(params)

      expect(fetchSpy).toHaveBeenCalledWith(
        '/.netlify/functions/send-mail/send',
        expect.any(Object)
      )
    })
  })
})
