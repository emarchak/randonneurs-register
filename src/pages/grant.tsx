import React from "react"
import { LatestsPosts } from "src/components/Blog"
import { ContentWrapper } from "src/components/content-wrapper"
import { Layout } from "src/components/layout"
import { SEO } from "src/components/seo"

const GrantPage = () => (
  <Layout>
    <ContentWrapper>
      <h1>Randonneurs Ontario</h1><h2>Access Grant</h2>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </ContentWrapper>
    <LatestsPosts />
  </Layout>
)

export const Head = () => <SEO title="Randonneurs Ontario Access Grant" />

export default GrantPage
