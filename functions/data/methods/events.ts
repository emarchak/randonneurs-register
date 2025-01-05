import { HandlerEvent, HandlerResponse } from '@netlify/functions'
import { fetchEvents, RemoteEvent, eventtypeKey, fetchQuery, RemoteRoute, buildRoute, RemoteQuery, headers } from './utils'

export const syncEvents = async ({ queryStringParameters }: HandlerEvent): Promise<HandlerResponse> => {
  try {
    const rawEvents = await fetchEvents(queryStringParameters)

    const insertRoutes = new Map<string, RemoteRoute>()
    // 1. Build the events and route map from RO
    const insertEvents = rawEvents.map((rawEvent) => {
      const event: RemoteEvent = {
        event_id: parseInt(rawEvent.Sched_Id),
        event_name: rawEvent.Route,
        event_date: new Date(rawEvent.Unixtime * 1000).toISOString(),
        event_eventtype: eventtypeKey(rawEvent.Event),
      }
      insertRoutes.set(rawEvent.Route, buildRoute(rawEvent))

      return event
    })
    // 2. Upsert the routes
    const { data: { insert_route: { returning: routes } }, errors: routeErrors }: RemoteQuery<{ insert_route: { returning: RemoteRoute[] } }> = await fetchQuery(`
      mutation CreateRoutes {
        insert_route(objects: ${JSON.stringify(Array.from(insertRoutes.values()))},
        on_conflict: {constraint: route_route_name_route_distance_route_active_key, update_columns: []}) {
          returning {
            route_id
            route_name
          }
        }
      }`)
    if (routeErrors) {
      throw new Error(JSON.stringify(routeErrors))
    }

    const eventsWithRoutes = insertEvents.map((event) => ({
      ...event,
      event_route: routes.find((route) => route.route_name === event.event_name)?.route_id
    }))

    // 3. Insert the events
    const { data: events, errors: eventErrors }: RemoteQuery<{ insert_event: { returning: RemoteEvent[] } }> = await fetchQuery(`
      mutation CreateEvents {
        insert_event(
          objects: ${JSON.stringify(eventsWithRoutes)},
          on_conflict: {constraint: event_event_id_event_date_key, update_columns: [
          event_name, event_eventtype, event_route]}
        ) {
          returning {
            event_id
            event_name
          }
        }
      }`)
    if (eventErrors) {
      throw new Error(JSON.stringify(eventErrors))
    }

    return {
      headers,
      statusCode: 200,
      body: JSON.stringify(events),
    }
  } catch (error) {
    return {
      headers,
      statusCode: 500,
      body: JSON.stringify(error)
    }
  }
}
