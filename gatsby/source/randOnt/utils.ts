import fetch from "cross-fetch"

const endpoint = process.env.RO_ENDPOINT

export const loopSchedule = async (prev, fromYear) => {
  try {
    const response = await fetch(`${endpoint}&from=${fromYear - 1}-01-01&to=${fromYear}-01-01`)
    const data = await response.json()

    if (data.status !== 'ok') {
      throw new Error(`randOnt response ${response.status}`)
    }
    const allSchedule = [...prev, ...data.schedule]
    if (data.schedule.length) {
      return loopSchedule(allSchedule, fromYear - 1)
    } else {
      return allSchedule
    }
  } catch (err) {
    console.log({ err })
    return prev
  }
}

