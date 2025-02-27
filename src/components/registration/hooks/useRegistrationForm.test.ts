import { act, renderHook, waitFor } from '@testing-library/react'
import MockDate from 'mockdate'
import { Chapter, EventType } from 'src/data/events'
import { useRegistrationForm } from './useRegistrationForm'
import * as Mail from 'src/data/mail'
import * as Slack from 'src/hooks/useSlack'
import * as Sheets from 'src/hooks/useSheets'
import * as Riders from 'src/data/riders'

const formName = 'registration'
const fieldLabels = {
  name: 'Name',
  email: 'Email',
  route: 'Route'
}
const formData = {
  name: 'Lael de Silva',
  email: 'rider@example.com',
  route: '200',
  rideType: 'brevet' as EventType,
  chapter: 'Toronto' as Chapter,
  eventId: '123',
  gender: 'X',
  startTime: new Date('Sat Aug 28 2021 05:01 EDT'),
  shareRide: true
}

describe('useRegistrationForm', () => {
  const registerRiderSpy = jest.spyOn(Riders, 'registerRider')

  const sendSlackMsgSpy = jest.fn().mockName('sendSlackMsg')
  jest.spyOn(Slack, 'useSlack').mockReturnValue({ sendSlackMsg: sendSlackMsgSpy })

  const addRowSpy = jest.fn().mockName('addRow')
  jest.spyOn(Sheets, 'useSheets').mockReturnValue({ addRow: addRowSpy })

  const sendMailSpy = jest.fn().mockName('sendMail')
  jest.spyOn(Mail, 'useMail').mockReturnValue({
    sendMail: sendMailSpy,
    createList: jest.fn().mockResolvedValue({ id: 'listid' }),
    getList: jest.fn().mockResolvedValue({ id: 'listid' }),
    createContact: jest.fn().mockResolvedValue({ id: 'contactid' })
  })

  const originalLocation = window.location

  beforeEach(() => {
    MockDate.set(new Date('Sun August 22 2021 05:01'))
  })

  afterEach(() => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: originalLocation,
    })
    sendSlackMsgSpy.mockClear()
    addRowSpy.mockClear()
    sendMailSpy.mockClear()
    registerRiderSpy.mockClear()
  })

  it('sets loading to true on submit', async () => {
    const { result } = renderHook(() => useRegistrationForm({ formName, fieldLabels }))

    expect(result.current.loading).toBeFalsy()

    act(() => {
      result.current.onSubmit(formData)
    })

    await waitFor(() => {
      expect(result.current.loading).toBeFalsy()
    })
  })

  it('submits expected data to slack, row, mail and registration', async () => {
    const { result } = renderHook(() => useRegistrationForm({ formName, fieldLabels }))

    await result.current.onSubmit(formData)

    await waitFor(() => {

      expect(registerRiderSpy).toHaveBeenCalledWith({
        email: 'rider@example.com',
        eventId: 123,
        firstName: 'Lael',
        gender: 'X',
        hideRide: false,
        lastName: 'de Silva',
      })
    })
    await waitFor(() => {
      expect(sendSlackMsgSpy).toHaveBeenCalledWith({
        'attachments': [
          'Name: Lael de Silva \nEmail: rider@example.com \nRoute: 200 \nRide Type: brevet \nChapter: Toronto \nEvent Id: 123 \nGender: X \nStart Time: Sat August 28 05:01 \nShare Ride: true',
        ],
        'message': 'Registration for Toronto 200 brevet',
      },
        'registration')
      expect(addRowSpy).toHaveBeenCalledWith({
        'row': {
          'chapter': 'Toronto',
          'email': 'rider@example.com',
          'eventId': '123',
          'gender': 'X',
          'shareRide': true,
          'name': 'Lael de Silva',
          'rideType': 'brevet',
          'route': '200',
          'scheduleTime': undefined,
          'startDate': 'Sat August 28',
          'startTime': '05:01',
          'submitted': 'Sun August 22 2021 01:01',
        },
        'sheet': 'registration',
      })
      expect(sendMailSpy).toHaveBeenCalledWith({
        'data': {
          'chapter': 'Toronto',
          'email': 'rider@example.com',
          'eventId': '123',
          'gender': 'X',
          'shareRide': true,
          'name': 'Lael de Silva',
          'rideType': 'brevet',
          'route': '200',
          'startTime': new Date('2021-08-28T09:01:00.000Z')
        },
        'replyTo': 'vp-toronto@randonneursontario.ca',
        'to': [
          'rider@example.com',
          'vp-toronto@randonneursontario.ca'
        ],
      },
        'brevetRegistration')
    })
  })

  it('does not call register rider for permanents', async () => {
    const permFormData = {
      ...formData,
      eventId: undefined
    }
    const { result } = renderHook(() => useRegistrationForm({ formName, fieldLabels }))

    await result.current.onSubmit(permFormData)
    await waitFor(() => {
      expect(sendSlackMsgSpy).toHaveBeenCalled()
      expect(addRowSpy).toHaveBeenCalled()
      expect(sendMailSpy).toHaveBeenCalled()
      expect(registerRiderSpy).not.toHaveBeenCalled()
    })
  })

  it('gets defaultEventId from URL', async () => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: {
        ...window.location,
        search: '?schedule-id=1',
      },
    })

    const { result } = renderHook(() => useRegistrationForm({ formName, fieldLabels }))

    expect(result.current.defaultScheduleId).toBe('1')
  })

  it('returns null defaultScheduleId if not in URL', async () => {
    const { result } = renderHook(() => useRegistrationForm({ formName, fieldLabels }))

    expect(result.current.defaultScheduleId).toBeNull()
  })
})
