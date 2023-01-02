import React from "react"
import { graphql, PageProps } from "gatsby"
import { ContentChild, ContentWrapper } from "src/components/content-wrapper"
import { getDateTimeLong, getDateTimeShort } from "src/utils"
import { Layout } from "src/components/layout"
import { SeasonsCta } from "src/components/seasons"
import { SEO } from "src/components/seo"
import { TabMenu } from "src/components/Menu"
import { RwgpsRoute } from "src/components/RwgpsRoute"
import { LinkButton } from "src/components/Buttons"
import { Link, MapLink } from "src/components/Link"
import { EventPageQuery } from "src/gatsby.gql"
import { useEvent } from "src/data/events"
import { Loading } from "src/components/form/components"
import { LatestsPosts } from "src/components/Blog"

type SeasonChapterProps = PageProps<SeasonChapterPageQuery>

export const query = graphql`
  query SeasonChapterPage($season: String, $chapter: Chapter) {
    allEvent(filter: { season: { eq: $season }, chapter: { eq: $chapter } }) {
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

const SeasonChapter = ({
  uri,
  params: { season, chapter },
  data: {
    allEvent: { nodes: events },
  },
}: SeasonChapterProps) => (
  <Layout>
    <ContentWrapper>
      <TabMenu activeRoute={`${uri}/`} section="seasons" />
      <h1>
        {season} {chapter} Season
      </h1>
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

// export const Head = ({ data: { event } }: EventProps) => (
//   <SEO
//     title={`${event.route} | ${getDateTimeShort(new Date(event.date))}`}
//     description={`A ${event.distance}km ride starting from ${event.startLocation} with the ${event.chapter} Chapter of Randonneurs Ontario, a long distance cycling club associated with the Audax Club Parisien.`}
//   />
// )

export default SeasonChapter
