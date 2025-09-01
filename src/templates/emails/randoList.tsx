import React from 'react'
import { Html } from '@react-email/html'
import { Heading } from '@react-email/heading'
import { Text } from '@react-email/text'
import { Button } from '@react-email/button'
import { Section } from '@react-email/section'
import { Container } from '@react-email/container'

export default function RandolistEmail({ rides = [] }) {
  return (
    <Html>
      <Container style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px' }}>
        <Text>Hiya folks!</Text>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
          tincidunt elementum sem non luctus.
        </Text>

        <Heading as="h2">🎉 Section heading</Heading>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
          tincidunt elementum sem non luctus.
        </Text>

        <Section
          style={{ margin: '20px 0', background: '#eeeeee', padding: '10px' }}
        >
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
            tincidunt elementum sem non luctus.
          </Text>
        </Section>

        <Button
          href="http://randonneursontario.ca/Permanents/Permanents.html"
          style={{
            backgroundColor: '#dec8d3',
            borderRadius: '6px',
            padding: '12px 18px',
            color: '#333333',
            textDecoration: 'none',
          }}
        >
          Learn more about Permanents
        </Button>

        <Heading as="h2">🚲 Upcoming Toronto rides</Heading>
        <Text>
          You can request your own start time on the scheduled date and still
          receive ACP credit for each ride.
        </Text>
        <ul>
          {rides.map((ride, i) => (
            <li key={i}>{ride}</li>
          ))}
        </ul>

        <Text>
          Submit your brevet card and recorded activity (strava, ridewgps,
          garmin, etc.) to vp@randonneurs.to when you're done.
        </Text>
      </Container>
    </Html>
  )
}
