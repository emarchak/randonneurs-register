import React from "react"
import { ContentChild } from "src/components/content-wrapper"
import { getDateTimeLong } from "src/utils"
import { Link } from "src/components/Link"
import { Chapter, Event } from "src/data/events"

import * as styles from "../pages/styles/index.module.scss"

const UpcomingEvents = ({
  chapter,
  events,
}: {
  chapter: Chapter
  events: Event[]
}) =>
  events.length > 0 && (
    <ContentChild>
      <h3>{chapter} Chapter</h3>
      <ul className={styles.eventWrapper}>
        {events.map((event) => (
          <li key={event.id} className={styles.eventRow}>
            <Link to={event.path}>
              <strong>
                {event.route} {event.distance}
              </strong>
            </Link>
            <br />
            {getDateTimeLong(new Date(event.date))}
            <br />
            {event.startLocation}
          </li>
        ))}
      </ul>
    </ContentChild>
  )
export default UpcomingEvents
