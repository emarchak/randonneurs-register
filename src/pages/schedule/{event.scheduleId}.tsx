import React from 'react'
import { graphql, PageProps } from 'gatsby'
import { SchedulePageQuery } from 'src/gatsby.gql'
import { useLocation } from '@reach/router'

type ScheduleProps = PageProps<SchedulePageQuery>

export const query = graphql`
  query SchedulePage($scheduleId: String) {
    event(scheduleId: { eq: $scheduleId }) {
      path: gatsbyPath(
        filePath: "/event/{event.season}/{event.chapter}/{event.route}-{event.scheduleId}"
      )
    }
  }
`

const Schedule = () => <div />

export const Head = ({ data: { event } }: ScheduleProps) => {
  const location = useLocation()
  return (
    <meta
      httpEquiv="refresh"
      content={`0;url=${location.origin}${event.path}`}
    />
  )
}

export default Schedule
