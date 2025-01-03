import React from 'react'
import { PageProps } from 'gatsby'
import { Callout } from 'src/components/callout'
import { ContentWrapper } from 'src/components/content-wrapper'
import { Layout } from 'src/components/layout'
import { Link } from 'src/components/Link'
import { RegistrationFormPermanent } from 'src/components/registration'
import { SEO } from 'src/components/seo'
import { TabMenu } from 'src/components/Menu'

export const PermanentRegistration = ({ path }: PageProps) => {
  return (
    <Layout>
      <ContentWrapper>
        <TabMenu section="registration" activeRoute={path} />
        <h1>Register for a permanent</h1>

        <p>
          You must have an Ontario Cycling membership and have read the{' '}
          <Link href="https://ontariocycling.org/covid-19-information/">
            latest OC Return to Sport updates
          </Link>
          . Please visit{' '}
          <Link href="https://www.ontariocycling.org">
            Ontario Cycling for the latest information
          </Link>{' '}
          about group riding during the pandemic.
        </p>

        <Callout alternative>
          <p>
            <strong>A Permanent ride</strong> is one of the existing Randonneurs
            Ontario brevet routes ridden outside of the normal Brevet schedule.
            Any current Randonneurs Ontario member may propose riding a
            Permanent, with at least 2 weeks notice before the proposed date.
            Once approved, there can be no changes to the request, except at the
            discretion of the Chapter VP and Treasurer.
          </p>
          <p>
            Standard brevet rules apply for Permanents. Control cards must be
            completed during the ride, including start and end. Permanents do
            not take the place of brevets for the ACP Super Randonneur award,
            nor will they count for qualification for PBP.
          </p>
          <p>
            <Link href="http://randonneursontario.ca/Permanents/Permanents.html">
              Learn more about our permanents program.
            </Link>
          </p>
        </Callout>
      </ContentWrapper>

      <RegistrationFormPermanent />
    </Layout>
  )
}

export const Head = () => <SEO title="Register for a permanent" />

export default PermanentRegistration
