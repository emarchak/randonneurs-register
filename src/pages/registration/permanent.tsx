import React from 'react'
import { PageProps } from 'gatsby'
import { Layout } from 'src/components/layout'
import { SEO } from 'src/components/seo'
import { ContentWrapper } from 'src/components/content-wrapper'
import { RegistrationFormPermanent } from 'src/components/registration'
import { Callout } from 'src/components/callout'
import { TabMenu } from 'src/components/Menu'
import { Link } from 'src/components/Link'

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
          <p><strong>A Permanent ride</strong> is one of the existing Randonneurs Ontario brevet routes ridden outside of the normal Brevet schedule. Any current Randonneurs Ontario member may propose riding a Permanent. They can be run as individual rides, or they can be organized with several club members choosing to ride the same course on the same day.</p>

          <p>Permanents are not sanctioned by ACP, and therefore do not take the place of brevets for the ACP Super Randonneur award, nor will they count for qualification for PBP. However they remain a great way to engage in the sport of randonneuring at the club level. </p>
          
          <hr />
          
          <p>Rules governing permanents are as follows: </p>

          <p><strong>Registration: </strong>
          <ul><li>Members in good standing may schedule such a ride as late as 20:00 the day before the intended ride date. We ask that new members provide a 48 hour grace period to ensure their membership is validated by the route's chapter VP prior to the ride. </li>
          <li>Once approved, changes to the request must be communicated with, and approved by, the route's regional Chapter VP. </li><ul></p>

          <p><strong>Riding a Permanent: </strong>
          <ul><li>Standard brevet rules apply for Permanents. Control cards must be completed during the ride, including start and end. Riders are responsible for supplying their own control cards.</li>
          <li>Riders may start the route at any point along the route (usually a control). They may also choose to ride the route in reverse. It is the rider's responsibility to supply their own navigation (cue sheet, GPS track) in these exceptional cases.</li>
          <li>As with brevets, once the ride is completed, proof of passage must be sent to the route's regional chapter VP for club sanctioning. This is typically done in the form of control card photos (front and back), as well as a GPX file, or link to an online record of the travel log. </li></ul></p>
          
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
