
import { graphql, useStaticQuery } from 'gatsby'
import { UseRoutesQuery } from 'src/gatsby.gql.d'

export type Route = UseRoutesQuery['db']['routes'][0]

export const useRoutes = () => {
  const { db: { routes } } = useStaticQuery<UseRoutesQuery>(graphql`
    query useRoutes {
      db {
        routes(
          order_by: {chapter: asc, distance: asc}
        ) {
          startLocation
          name
          id
          distance
          chapter
          cuesheet
        }
      }
    }
  `)

  return ({ routes })
}
