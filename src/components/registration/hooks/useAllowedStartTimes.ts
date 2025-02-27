import { Brevet } from "src/data/events"
import { cancelledUntil } from './utils'
const inFutureDate = (date: Date, after: Date) => new Date(date).setHours(0) > new Date(after).setHours(23)
const onDateTime = (date: Date, now: Date) => new Date(date).toUTCString() === new Date(now).toUTCString()
const addDays = (date: Date, number: number) => new Date(new Date(date).setDate(date.getDate() + number))

const weekdays = {
    'Sun': 0,
    'Mon': 1,
    'Tue': 2,
    'Wed': 3,
    'Thu': 4,
    'Fri': 5,
    'Sat': 6,
}

const isAllClub = (brevet: Brevet) => Boolean(brevet.chapter.includes('Club'))

function getWeekdayBefore(day: keyof typeof weekdays, date: Date) {
    const weekday = weekdays[day]
    const dayOfDate = date.getDay()
    const diff = (dayOfDate < weekday) ? (7 - weekday + dayOfDate) : (weekday - dayOfDate)

    return addDays(date, diff)
}

export const useAllowedStartTimes = () => {
    const allowedStartTimes = (time: Date, scheduleTime?: Date) => {
        const now = new Date(Date.now())
        if (scheduleTime) {
            return onDateTime(time, scheduleTime) && inFutureDate(time, addDays(now, 6))
        }
        return inFutureDate(time, now)
    }

    const getBrevetRegistrationDeadline = (brevet: Brevet) => {
        // DW 2024 Lake simcoe 300
        if (brevet.scheduleId === "1061") {
            const dwDeadline = addDays(brevet.date, -2)
            dwDeadline.setUTCHours(24, 0, 0)
            return dwDeadline
        }
        switch (brevet.chapter) {
            case 'Ottawa':
                const ottawaDeadline = getWeekdayBefore('Fri', brevet.date)
                ottawaDeadline.setUTCHours(22, 0, 0)
                return ottawaDeadline
            case 'Huron':
                const huronDeadline = getWeekdayBefore('Fri', brevet.date)
                huronDeadline.setUTCHours(24, 0, 0)
                return huronDeadline
            case 'Toronto':
                const torontoDeadline = addDays(brevet.date, -1)
                torontoDeadline.setUTCHours(22, 0, 0)
                return torontoDeadline
            case 'Simcoe':
                const simcoeDeadline = addDays(brevet.date, -1)
                simcoeDeadline.setUTCHours(24, 0, 0)
                return simcoeDeadline
            default:
                const deadline = addDays(brevet.date, -3)
                deadline.setUTCHours(27, 59, 0)
                return deadline
        }
    }
    const isNotRegisterable = (brevet: Brevet): boolean => {
        const cancelled = cancelledUntil()
        if (cancelled) {
            return brevet.date.valueOf() < cancelled.valueOf()
        }

        return isAllClub(brevet)
    }

    const allowedToRegister = (brevet: Brevet) => {
        const now = new Date(Date.now())
        const registrationDeadline = getBrevetRegistrationDeadline(brevet)
        const brevetCancelled = isNotRegisterable(brevet)

        return brevetCancelled ? !brevetCancelled : now < registrationDeadline
    }

    return {
        allowedToRegister,
        allowedStartTimes,
        getBrevetRegistrationDeadline
    }
}
