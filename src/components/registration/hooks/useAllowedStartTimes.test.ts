import MockDate from 'mockdate'
import { Brevet } from 'src/data/events'
import { useAllowedStartTimes } from "./useAllowedStartTimes"
import * as utils from './utils'

const brevet: Brevet = {
    chapter: 'All chapter',
    event: 'brevet',
    distance: 200,
    date: new Date('Sat April 3 2021 09:20:00 EDT'),
    route: 'Gentle Start 60',
    startLocation: 'Second Cup, 355 Danforth Ave, Toronto',
    id: '1',
    rwgpsUrl: 'https://rwgps.com',
    rwgpsId: 1,
    organizer: 'Erin',
    season: 2021
}

const ottawaBrevet: Brevet = { ...brevet, chapter: 'Ottawa' }
const huronBrevet: Brevet = { ...brevet, chapter: 'Huron' }
const torontoBrevet: Brevet = { ...brevet, chapter: 'Toronto' }
const simcoeBrevet: Brevet = { ...brevet, chapter: 'Simcoe' }

const rideOnSaturday = new Date('Sat August 7 2021 09:20:00 EDT')
const rideNextSaturday = new Date('Sat August 14 2021 09:20:00 EDT')

describe('useAllowedStartTimes', () => {
    describe('allowedStartTimes()', () => {
        it('requires the start date to be a day in the future for unscheduled events', () => {
            MockDate.set(new Date('August 18 2021 19:59:30 EDT'))
            const { allowedStartTimes } = useAllowedStartTimes()

            expect(allowedStartTimes(new Date('August 18 2021'))).toBeFalsy()
            expect(allowedStartTimes(new Date('August 19 2021'))).toBeTruthy()
        })

        it('requires start date to be on scheduled date', () => {
            MockDate.set(new Date('August 1 2021 19:59:30 EDT'))

            const { allowedStartTimes } = useAllowedStartTimes()

            const scheduledDate = new Date('August 20 2021 09:20:00 EDT')
            expect(allowedStartTimes(new Date('August 17 2021 09:20:00 EDT'), scheduledDate)).toBeFalsy()
            expect(allowedStartTimes(new Date('August 19 2021 09:20:00 EDT'), scheduledDate)).toBeFalsy()
            expect(allowedStartTimes(new Date('August 26 2021 09:20:00 EDT'), scheduledDate)).toBeFalsy()
            expect(allowedStartTimes(new Date('August 20 2021 09:20:00 EDT'), scheduledDate)).toBeTruthy()
        })
    })

    describe('allowedToRegister()', () => {
        const cancelledUntilMock = jest.spyOn(utils, 'cancelledUntil')

        afterEach(() => {
            cancelledUntilMock.mockClear()
        })

        it('allows riders to register three days before scheduled date', () => {
            MockDate.set(new Date('Wed August 4 2021 12:59:30 EDT'))
            const { allowedToRegister } = useAllowedStartTimes()

            expect(allowedToRegister({ ...brevet, date: rideOnSaturday })).toBeTruthy()

            MockDate.set(new Date('Thu August 5 2021 19:59:30 EDT'))
            expect(allowedToRegister({ ...brevet, date: rideOnSaturday })).toBeFalsy()

            expect(allowedToRegister({ ...brevet, date: rideNextSaturday })).toBeTruthy()
        })

        it('allows Ottawa riders to register before Friday at 6pm ET before scheduled date', () => {
            MockDate.set(new Date('Fri August 6 2021 7:59:30 EDT'))
            const { allowedToRegister } = useAllowedStartTimes()

            expect(allowedToRegister({ ...ottawaBrevet, date: rideOnSaturday })).toBeTruthy()

            MockDate.set(new Date('Fri August 6 2021 18:01:30 EDT'))
            expect(allowedToRegister({ ...ottawaBrevet, date: rideOnSaturday })).toBeFalsy()
        })

        it('allows Huron riders to register before Friday at 8pm ET before scheduled date', () => {
            MockDate.set(new Date('Fri August 6 2021 7:59:30 EDT'))
            const { allowedToRegister } = useAllowedStartTimes()

            expect(allowedToRegister({ ...huronBrevet, date: rideOnSaturday })).toBeTruthy()

            MockDate.set(new Date('Fri August 6 2021 20:01:30 EDT'))
            expect(allowedToRegister({ ...huronBrevet, date: rideOnSaturday })).toBeFalsy()
        })

        it('allows Toronto riders to register before Friday at 6pm ET before scheduled date', () => {
            MockDate.set(new Date('Fri August 6 2021 5:59:30 EDT'))
            const { allowedToRegister } = useAllowedStartTimes()

            expect(allowedToRegister({ ...torontoBrevet, date: rideOnSaturday })).toBeTruthy()

            MockDate.set(new Date('Fri August 6 2021 18:01:30 EDT'))
            expect(allowedToRegister({ ...torontoBrevet, date: rideOnSaturday })).toBeFalsy()
        })

        it('cancels rides when configuration is set', () => {
            MockDate.set(new Date('August 1 2021 19:59:30 EDT'))
            cancelledUntilMock.mockReturnValueOnce(rideNextSaturday)

            const { allowedToRegister } = useAllowedStartTimes()

            expect(allowedToRegister({ ...brevet, date: rideOnSaturday })).toBeFalsy()
        })
    })

    describe('getBrevetRegistrationDeadline()', () => {
        const opts: Intl.DateTimeFormatOptions = {
            timeZone: 'America/Toronto',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            weekday: 'short',
            hour12: false,
        }

        it('shows Friday at 6pm ET for Ottawa brevets', () => {
            const { getBrevetRegistrationDeadline } = useAllowedStartTimes()
            const d = getBrevetRegistrationDeadline({ ...ottawaBrevet, date: rideOnSaturday })

            expect(new Intl.DateTimeFormat('en', opts).format(d)).toEqual('Fri, Aug 6, 18:00')
        })

        it('shows Friday at 8pm ET for Huron brevets', () => {
            const { getBrevetRegistrationDeadline } = useAllowedStartTimes()
            const d = getBrevetRegistrationDeadline({ ...huronBrevet, date: rideOnSaturday })

            expect(new Intl.DateTimeFormat('en', opts).format(d)).toEqual('Fri, Aug 6, 20:00')
        })


        it('shows the day before at 6pm ET for Toronto brevets', () => {
            const { getBrevetRegistrationDeadline } = useAllowedStartTimes()
            const d = getBrevetRegistrationDeadline({ ...torontoBrevet, date: rideOnSaturday })

            expect(new Intl.DateTimeFormat('en', opts).format(d)).toEqual('Fri, Aug 6, 18:00')
        })


        it('shows the day before at 8pm ET for Simcoe brevets', () => {
            const { getBrevetRegistrationDeadline } = useAllowedStartTimes()
            const d = getBrevetRegistrationDeadline({ ...simcoeBrevet, date: rideOnSaturday })

            expect(new Intl.DateTimeFormat('en', opts).format(d)).toEqual('Fri, Aug 6, 20:00')
        })

        it('shows 2 days before at 8pm ET for brevet id 1061 ', () => {
            const { getBrevetRegistrationDeadline } = useAllowedStartTimes()
            const d = getBrevetRegistrationDeadline({ ...brevet, scheduleId: "1061" })

            expect(new Intl.DateTimeFormat('en', opts).format(d)).toEqual('Thu, Apr 1, 20:00')
        })

        it('shows 3 days before at 11:59pm ET for brevets', () => {
            const { getBrevetRegistrationDeadline } = useAllowedStartTimes()
            const d = getBrevetRegistrationDeadline({ ...brevet, date: rideOnSaturday })

            expect(new Intl.DateTimeFormat('en', opts).format(d)).toEqual('Wed, Aug 4, 23:59')
        })
    })
})
