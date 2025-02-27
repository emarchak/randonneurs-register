import React from 'react'
import { graphql, PageProps } from 'gatsby'

import { ContentWrapper } from 'src/components/content-wrapper'
import { getDateTimeLong } from 'src/utils'
import { LatestsPosts } from 'src/components/Blog'
import { Layout } from 'src/components/layout'
import { Link } from 'src/components/Link'
import { SeasonPageQuery } from 'src/gatsby.gql'
import { SeasonsCta } from 'src/components/seasons'
import { SEO } from 'src/components/seo'
import { TabMenu } from 'src/components/Menu'
import * as styles from '../styles/event.module.scss'
type SeasonProps = PageProps<SeasonPageQuery>

export const query = graphql`
  query SeasonPage($season: String) {
    allEvent(filter: { season: { eq: $season } }) {
      nodes {
        chapter
        distance
        eventType
        id
        organizer
        route
        startLocation
        date
        season
        path: gatsbyPath(
          filePath: "/event/{event.season}/{event.chapter}/{event.route}-{event.scheduleId}"
        )
      }
    }
  }
`

const Season = ({
  uri,
  params: { season },
  data: {
    allEvent: { nodes: events },
  },
}: SeasonProps) => (
  <Layout>
    <ContentWrapper>
      <TabMenu activeRoute={`${uri}/`} section="seasons" />
      <h1>{season} Season</h1>

      <h2>
        {Array.from(new Set(events.map((e) => e.chapter)))
          .sort()
          .map((chapter) => (
            <Link
              key={chapter}
              className={styles.submenuLink}
              to={`/event/${season}/${chapter.toLowerCase()}/`}
            >
              {chapter}
            </Link>
          ))}
      </h2>

      <table>
        <thead>
          <tr>
            <th>Distance</th>
            <th>Route</th>
            <th>Starting time</th>
            <th>Starting location</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, i) => (
            <tr key={i}>
              <td>
                {event.distance}
                <br />
                {event.eventType}
              </td>
              <td>
                <Link to={event.path}>{event.route}</Link>
                <br />
                {event.chapter}
              </td>
              <td>{getDateTimeLong(new Date(event.date))}</td>
              <td>{event.startLocation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </ContentWrapper>

    <SeasonsCta />
    <LatestsPosts />
  </Layout>
)

export const Head = ({ params: { season } }: SeasonProps) => (
  <SEO
    title={`${season} | Season`}
    description={`The ${season} season of the Toronto Chapter of Randonneurs Ontario, a long distance cycling club associated with the Audax Club Parisien.`}
  />
)

export default Season
