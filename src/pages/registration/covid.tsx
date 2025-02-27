import React from 'react'
import { ContentWrapper } from 'src/components/content-wrapper'
import { Layout } from 'src/components/layout'
import { Link } from 'src/components/Link'
import { SEO } from 'src/components/seo'
import CovidForm from 'src/components/registration/CovidForm'

const CovidScreening = () => {
  return (
    <Layout>
      <ContentWrapper>
        <h1>COVID screening form</h1>
        <p>
          All riders must complete self-screen before starting a ride. A missing
          screening will result in a DNS.{' '}
          <Link href="https://www.randonneursontario.ca/who/whatis.html#COVID">
            Learn more about our COVID-19 policies
          </Link>
          .
        </p>
      </ContentWrapper>
      <CovidForm />
      <ContentWrapper>
        <p>
          Screening questionnaire based off of the{' '}
          <Link href="https://www.toronto.ca/wp-content/uploads/2020/05/95ea-Screening-poster-retail-entrance-TPH.pdf">
            Toronto Public Health screening
          </Link>
          .
        </p>
      </ContentWrapper>
    </Layout>
  )
}

export const Head = () => <SEO title="COVID screening form" />

export default CovidScreening
