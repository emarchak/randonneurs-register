import { GatsbyNode } from "gatsby"

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = ({ actions }) => {
  const { createTypes } = actions
  createTypes(`
    enum Chapter {
        Club
        Toronto
        Huron
        Ottawa
        Simcoe
    }
    enum EventType {
        Brevet
        Permanent
        Fleche
        Populaire
        Other
    }
    type Event implements Node {
        season: String
        rwgpsId: String
        chapter: Chapter
        eventType: EventType
        scheduleId: String
    }
  `)
}
