import React from "react"
import { LatestsPosts } from "src/components/Blog"
import { ContentWrapper } from "src/components/content-wrapper"
import { Layout } from "src/components/layout"
import { SeasonsCta } from "src/components/seasons"
import { SEO } from "src/components/seo"

const NotFoundPage = () => (
  <Layout>
    <ContentWrapper>
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </ContentWrapper>
    <SeasonsCta />
    <LatestsPosts />
  </Layout>
)

export const Head = () => <SEO title="404: Not found" />

export default NotFoundPage
