import React from 'react'
import { graphql, PageProps, useStaticQuery } from 'gatsby'

import { ContentChild, ContentWrapper } from 'src/components/content-wrapper'
import { Gallery } from 'src/components/Gallery'
import { LatestsPosts } from 'src/components/Blog'
import { Layout } from 'src/components/layout'
import { Link } from 'src/components/Link'
import { SeasonsCta } from 'src/components/seasons'
import { SEO } from 'src/components/seo'
import { TabMenu } from 'src/components/Menu'

const pageQuery = graphql`
  query eventPageQuery {
    allSitePage(
      filter: { path: { regex: "/event/[0-9]{4}/$/" } }
      sort: { path: DESC }
    ) {
      nodes {
        id
        path
        pageContext
      }
      pageInfo {
        title
      }
    }
  }
`

const Seasons = ({ path }: PageProps) => {
  const {
    allSitePage: { nodes: seasons },
  } = useStaticQuery(pageQuery)

  return (
    <Layout>
      <ContentWrapper>
        <TabMenu section="registration" activeRoute={path} />
        <h1>Events</h1>

        <p>
          Randonneurs Ontario have been running ACP approved brevets since at
          least 1982. Here are some of our past seasons.
        </p>
        <p>
          To view the full results of these seasons,{' '}
          <Link href="https://randonneursontario.ca/history/heath.html">
            visit our results archive
          </Link>
          .
        </p>
      </ContentWrapper>
      <ContentWrapper container>
        <ContentChild>
          <ul>
            {seasons.map(({ path, id, pageContext: { season } }) => (
              <li key={id}>
                <Link to={path}>{season} Season</Link>
              </li>
            ))}
          </ul>
        </ContentChild>
        <ContentChild>
          <Gallery />
        </ContentChild>
      </ContentWrapper>
      <SeasonsCta />
      <LatestsPosts />
    </Layout>
  )
}

export const Head = () => <SEO title="Events" />

export default Seasons
