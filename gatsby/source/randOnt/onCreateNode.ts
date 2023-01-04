import { GatsbyNode } from "gatsby"

export const buildEventPath = (event) => {
  const path = `/event/${event.season}/${event.chapter}/${event.route}-${event.scheduleId}/`.replace(/( |\.|:)/g, '-')
  return encodeURI(path).toLowerCase()
}

export const onCreateNode: GatsbyNode['onCreateNode'] = async ({ node, actions: { createRedirect } }) => {
  if (node.internal.type !== 'Event') {
    return
  }

  createRedirect({
    fromPath: `/schedule/${node.scheduleId}/`,
    toPath: buildEventPath(node),
    isPermanent: true,
    redirectInBrowser: true,
  })
}
