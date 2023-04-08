import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import * as fetch from 'cross-fetch'
import { MailingForm } from './MailingForm'

describe('<MailingForm>', () => {
  const fetchSpy = jest.spyOn(fetch, 'default').mockName('fetch')

  afterEach(() => {
    fetchSpy.mockClear()
  })

  it('renders child content', () => {
    const mount = render(
      <MailingForm listName="contact">{'content'}</MailingForm>
    )

    expect(mount.getByText('content')).toBeTruthy()
  })

  it('requires all fields', async () => {
    const fetchSpy = jest.spyOn(fetch, 'default')
    const mount = render(<MailingForm listName="Named list" />)

    expect(mount.getByText('Subscribe')).not.toBeDisabled()

    fireEvent.change(mount.getByLabelText(/first name/i), {
      target: { value: 'Foo' },
    })

    fireEvent.change(mount.getByLabelText(/email/i), {
      target: { value: 'foo@bar.com' },
    })
    fireEvent.click(mount.getByText('Subscribe'))

    expect(fetchSpy).not.toHaveBeenCalled()
    expect(mount.getByText('Subscribe')).toBeDisabled()

    fireEvent.change(mount.getByLabelText(/last name/i), {
      target: { value: 'Bar' },
    })
    expect(mount.getByText('Subscribe')).not.toBeDisabled()
    fireEvent.click(mount.getByText('Subscribe'))

    await waitFor(() => expect(fetchSpy).toHaveBeenCalled())
  })

  it('rejects incorrect emails', () => {
    const mount = render(<MailingForm listName="contact" />)

    fireEvent.change(mount.getByLabelText(/email/i), {
      target: { value: 'higgeldy-piggeldy' },
    })
    fireEvent.click(mount.getByText('Subscribe'))

    expect(mount.getByText('Subscribe')).toBeDisabled()

    expect(
      mount.getByText(/higgeldy-piggeldy is not a valid email/i)
    ).toBeTruthy()
  })

  it('shows confirmation on subscribe', async () => {
    const fetchSpy = jest.spyOn(fetch, 'default')
    const mount = render(<MailingForm listName="contact" />)

    expect(mount.getByText('Subscribe')).not.toBeDisabled()

    fireEvent.change(mount.getByLabelText(/first name/i), {
      target: { value: 'Foo' },
    })

    fireEvent.change(mount.getByLabelText(/last name/i), {
      target: { value: 'Bar' },
    })

    fireEvent.change(mount.getByLabelText(/email/i), {
      target: { value: 'foo@bar.com' },
    })

    expect(mount.getByText('Subscribe')).not.toBeDisabled()
    fireEvent.click(mount.getByText('Subscribe'))

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalled()
      expect(mount.getByText(/Thank you/)).toBeTruthy()
    })
  })

  it('shows error message if unable to subscribe', async () => {
    const fetchSpy = jest.spyOn(fetch, 'default')
    fetchSpy.mockRejectedValue({ ok: false })

    const mount = render(<MailingForm listName="contact" />)

    expect(mount.getByText('Subscribe')).not.toBeDisabled()

    fireEvent.change(mount.getByLabelText(/first name/i), {
      target: { value: 'Foo' },
    })

    fireEvent.change(mount.getByLabelText(/last name/i), {
      target: { value: 'Bar' },
    })

    fireEvent.change(mount.getByLabelText(/email/i), {
      target: { value: 'foo@bar.com' },
    })

    expect(mount.getByText('Subscribe')).not.toBeDisabled()
    fireEvent.click(mount.getByText('Subscribe'))

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalled()
      expect(mount.getByText(/Server error/)).toBeTruthy()
    })
  })
})
