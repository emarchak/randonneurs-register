import React from 'react'
import { graphql, PageProps } from 'gatsby'
import { useLocation } from '@reach/router'

import { SchedulePageQuery } from 'src/gatsby.gql'

type ScheduleProps = PageProps<SchedulePageQuery>

export const query = graphql`
  query SchedulePage($scheduleId: String) {
    site {
      siteMetadata {
        siteURL
      }
    }
    event(scheduleId: { eq: $scheduleId }) {
      path: gatsbyPath(
        filePath: "/event/{event.season}/{event.chapter}/{event.route}-{event.scheduleId}"
      )
    }
  }
`

const Schedule = () => <div />

export const Head = ({ data: { event, site } }: ScheduleProps) => {
  const location = useLocation()
  const path = `${location.origin || site.siteMetadata.siteURL}${event.path}`
  return (
    <>
      <link rel="canonical" href={`${path}`} />
      <meta httpEquiv="refresh" content={`0;url=${path}`} />
    </>
  )
}

export default Schedule
