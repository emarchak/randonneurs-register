import React from 'react'
import { graphql, PageProps } from 'gatsby'

import { ContentChild, ContentWrapper } from 'src/components/content-wrapper'
import { EventPageQuery } from 'src/gatsby.gql'
import { getDateTimeLong, getDateTimeShort } from 'src/utils'
import { LatestsPosts } from 'src/components/Blog'
import { Layout } from 'src/components/layout'
import { Link, MapLink } from 'src/components/Link'
import { LinkButton } from 'src/components/Buttons'
import { Loading } from 'src/components/form/components'
import { RwgpsRoute } from 'src/components/RwgpsRoute'
import { SeasonsCta } from 'src/components/seasons'
import { SEO } from 'src/components/seo'
import { TabMenu } from 'src/components/Menu'
import { useEvent } from 'src/data/events'

type EventProps = PageProps<EventPageQuery>

export const query = graphql`
  query EventPage($id: String) {
    event(id: { eq: $id }) {
      chapter
      date
      distance
      eventType
      id
      route
      rwgpsId
      rwgpsUrl
      scheduleId
      season
      startLocation
    }
  }
`

const Event = ({ data: { event } }: EventProps) => {
  const { isLoading, data } = useEvent(parseInt(event.scheduleId))

  return (
    <Layout>
      <ContentWrapper>
        <TabMenu activeRoute={`/event/${event.season}/`} section="seasons" />
        <h1>{event.route}</h1>
        <h2>
          {event.distance} {event.eventType}
        </h2>
      </ContentWrapper>
      <ContentWrapper container>
        {event.rwgpsId && (
          <ContentChild>
            <RwgpsRoute routeId={event.rwgpsId} />
          </ContentChild>
        )}
        <ContentChild>
          <table>
            <tbody>
              <tr>
                <th>Start location</th>
                <td>
                  <MapLink location={event.startLocation}>
                    {event.startLocation}
                  </MapLink>
                </td>
              </tr>
              <tr>
                <th>Start time</th>
                <td>{getDateTimeLong(new Date(event.date))}</td>
              </tr>
              {event.rwgpsUrl && (
                <tr>
                  <th>Route</th>
                  <td>
                    <Link href={event.rwgpsUrl}>{event.route}</Link>
                  </td>
                </tr>
              )}
              {!event.rwgpsUrl && (
                <tr>
                  <th>Route</th>
                  <td>{event.route}</td>
                </tr>
              )}
              <tr>
                <th>Season</th>
                <td>
                  <Link
                    to={`/event/${event.season}/${event.chapter.toLowerCase()}`}
                  >
                    {event.season}
                  </Link>
                </td>
              </tr>
              <tr>
                <th>Chapter</th>
                <td>
                  <Link
                    to={`/event/${event.season}/${event.chapter.toLowerCase()}`}
                  >
                    {event.chapter}
                  </Link>
                </td>
              </tr>
              <tr>
                <th>Type</th>
                <td>{event.eventType}</td>
              </tr>
              <tr>
                <th>Distance</th>
                <td>{event.distance}</td>
              </tr>
            </tbody>
          </table>
          {Date.now() < new Date(event.date).valueOf() && (
            <p>
              <LinkButton
                block
                primary
                to={`/registration?schedule-id=${event.scheduleId}`}
              >
                Register to ride
              </LinkButton>
            </p>
          )}
          {Date.now() > new Date(event.date).valueOf() && (
            <p>
              <LinkButton
                block
                secondary
                href={`https://randonneursontario.ca/result/torres${event.season
                  .toString()
                  .slice(-2)}.html`}
              >
                View official results
              </LinkButton>
            </p>
          )}
        </ContentChild>
      </ContentWrapper>
      <ContentWrapper>
        <h2>Who's riding</h2>
        {isLoading && <Loading />}
        <ul>
          {!data && <li>No riders registered</li>}
          {data && (
            <>
              {data.riders.length === 0 && <li>No riders registered</li>}
              {data.riders.map(({ rider }) => (
                <li>{rider.riderName}</li>
              ))}
            </>
          )}
        </ul>
      </ContentWrapper>
      <SeasonsCta />
      <LatestsPosts />
    </Layout>
  )
}

export const Head = ({ data: { event } }: EventProps) => (
  <SEO
    title={`${event.route} | ${getDateTimeShort(new Date(event.date))}`}
    description={`A ${event.distance}km ride starting from ${event.startLocation} with the ${event.chapter} Chapter of Randonneurs Ontario, a long distance cycling club associated with the Audax Club Parisien.`}
  />
)

export default Event
