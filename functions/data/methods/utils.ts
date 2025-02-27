import fetch from 'cross-fetch'

export const endpoint = process.env.RO_ENDPOINT || ''
export const dbUrl = process.env.GRAPHQL_URL || ''
export const rwgpsRegex = /^((?:https?:)?\/\/)?((?:www)\.)?((?:ridewithgps\.com))(\/routes\/)([\d\-]+)?$/
export const headers = {
    'Content-Type': 'application/json',
}

export type RawEvent = {
    Sched_Id?: string
    Chapter?: string
    Event?: string
    Distance?: string
    Date?: string
    Route?: string
    StartLoc?: string
    Stime?: string
    Organizer?: string
    Contact?: string
    RWGPS?: string
    Unixtime?: number
}

export type RemoteRoute = {
    route_id?: number
    route_brevet_distance?: number
    route_chapter?: number
    route_cuesheet?: string
    route_distance?: number
    route_name?: string
    route_start_location?: string
    route_active?: boolean
}

export type RemoteEvent = {
    event_id?: number
    event_date?: string
    event_eventtype?: number
    event_name?: string
    event_route?: number
    event_schedule_id?: string
    event_start_time?: string
}

export type RemoteQuery<QueryResponse> = { data: QueryResponse, errors?: Error[] }


export const eventtypeKey = (test: string) => {
    const eventtypeNames = ['Brevet', 'Populaire', 'Fleche', 'Trace', 'Permanent', 'Grand brevet']
    return eventtypeNames.indexOf(eventtypeNames.find(chapter => test.includes(chapter)) || 'Other') + 1
}

export const chapterKey = (test: string) => {
    const chapterNames = ['Club', 'Toronto', 'Ottawa', 'Simcoe', 'Huron']

    return chapterNames.indexOf(chapterNames.find(chapter => test.includes(chapter)) || 'Other')
}

const formatCuesheet = (cuesheet: string | undefined) => {
    switch (true) {
        case cuesheet === undefined: return undefined
        case rwgpsRegex.test(cuesheet): return cuesheet
        default: return undefined
    }
}

const isActiveRoute = (rawEvent: RawEvent) => { return formatCuesheet(rawEvent.RWGPS) !== undefined }

export const brevetDistance = (dist: number): number | undefined => {
    if (dist < 200) {
        return undefined
    }
    return Math.floor((dist / 100) + .5) * 100
}

export const fetchEvents = async (args: { from?: Date }): Promise<RawEvent[]> => {
    const dateRange = (args?.from ? new Date(args.from) : new Date(Date.now())).toISOString().slice(0, 10)

    const response = await fetch(endpoint + '?&from=' + dateRange)
    const data = await response.json()

    if (data.status !== 'ok') {
        throw new Error(`Failed to fetch events`)
    }

    return data.schedule as RawEvent[]
}

export const fetchQuery = async (query: string) => {
    const response = await fetch(dbUrl, {
        method: 'POST',
        headers: {
            ...headers,
            [process.env.GRAPHQL_SECRETKEY]: process.env.GRAPHQL_SECRET
        },
        body: JSON.stringify({ query: query.replace(/"([^"]+)":/g, '$1:') })
    })
    const data = await response.json()
    return data
}

export const buildRoute = (rawEvent: RawEvent): RemoteRoute => ({
    route_brevet_distance: brevetDistance(parseInt(rawEvent.Distance)),
    route_distance: parseInt(rawEvent.Distance),
    route_name: rawEvent.Route,
    route_start_location: rawEvent.StartLoc,
    route_cuesheet: formatCuesheet(rawEvent.RWGPS),
    route_chapter: chapterKey(rawEvent.Chapter),
    route_active: isActiveRoute(rawEvent)
})


