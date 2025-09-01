// emails/BrevetSubmissionEmail.jsx
import React from 'react'
import { Html } from '@react-email/html'
import { Heading } from '@react-email/heading'
import { Text } from '@react-email/text'
import { Button } from '@react-email/button'
import { Img } from '@react-email/img'
import { Container } from '@react-email/container'

export default function BrevetSubmissionEmail({ firstName = 'folks' }) {
  return (
    <Html>
      <Container style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px' }}>
        <Text>Hiya {firstName}!</Text>
        <Text>
          I hope you had a great time on the ride this weekend. For me to
          certify your ride, I'll need you to submit all the paperwork! If you
          had to abandon, let me know so I know you made it home safe.
        </Text>

        <Text>
          <strong>
            Since this is a Paris-Brest-Paris year, I’ll need your results 24h
            after the last control closes. A missing or unsubmitted brevet card
            is a DNF.
          </strong>
        </Text>

        <Text>Please reply with:</Text>
        <ul>
          <li>Your finishing time in 24h format (HH:MM)</li>
          <li>A picture of your completed brevet card (both sides)</li>
          <li>A recording (gpx, strava, etc.) of the event</li>
        </ul>

        <Img
          src="http://cdn.mcauto-images-production.sendgrid.net/dc46dcfd45230203/9e049e47-afd5-476f-8158-61c9bf7fff10/800x511.jpg"
          alt="Brevet card example"
          width="600"
        />

        <Heading as="h2">🥇 Homologation numbers and medals</Heading>
        <Text>
          Official results and homologation numbers will be posted on our
          website. Medals can be purchased at season’s end.
        </Text>

        <Button href="https://randonneursontario.ca/who/Mailing_Lists.html">
          Join the Randolist
        </Button>
        <Button href="https://join.slack.com/t/randonneursontario/...">
          Join Slack
        </Button>

        <Heading as="h2">📸 Ride reports</Heading>
        <Text>
          If you have photos or stories from the ride, please send them to share
          on our blog.
        </Text>

        <Button href="http://blog.randonneursontario.ca/">
          Read previous ride reports
        </Button>

        <Heading as="h2">🇫🇷 Qualifying for Paris-Brest-Paris?</Heading>
        <Text>
          Homologation numbers will be available within a week of finishing the
          ride. Contact our VP of Brevet Admin if there are issues.
        </Text>
      </Container>
    </Html>
  )
}
