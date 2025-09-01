import React from 'react'
import { Html } from '@react-email/html'
import { Heading } from '@react-email/heading'
import { Text } from '@react-email/text'
import { Button } from '@react-email/button'
import { Container } from '@react-email/container'

export default function RideConfirmationEmail({ firstName = 'folks' }) {
  return (
    <Html>
      <Container style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px' }}>
        <Text>Hiya {firstName}!</Text>
        <Text>
          Welcome back existing riders, and welcome new riders! I hope you're
          pumped and ready for the ride this weekend.
        </Text>

        <Heading as="h2">🗺 The route</Heading>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
          tincidunt elementum sem non luctus.
        </Text>
        <Text>Some points to note:</Text>
        <ul>
          <li>Bring a charged GPS device</li>
          <li>Have your route downloaded in advance</li>
        </ul>

        <Button href="http://randonneursontario.ca/Permanents/Permanents.html">
          Download the route from RideWithGPS
        </Button>

        <Heading as="h2">🏁 The start</Heading>
        <Text>
          <strong>Tim Horton's, 111 Cross Ave, Oakville</strong>
          <br />
          Ride out at 07:00 sharp. Registration and bike inspection from
          06:30–07:00.
        </Text>

        <Heading as="h2">🔎 Bike inspection</Heading>
        <Text>
          Bikes must pass safety inspection, have front and rear lights, and
          riders must wear helmets and reflective vests for night riding.
        </Text>

        <Heading as="h2">🏁 Toronto Brevet rules</Heading>
        <ul>
          <li>Be an active member of Randonneurs Ontario</li>
          <li>Wear a helmet and reflective vest</li>
          <li>Have front and rear lights affixed</li>
          <li>Follow OCA and COVID-19 rules</li>
        </ul>
      </Container>
    </Html>
  )
}
