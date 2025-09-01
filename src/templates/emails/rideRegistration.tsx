import React from 'react'
import { Html } from '@react-email/html'
import { Head } from '@react-email/head'
import { Body } from '@react-email/body'
import { Container } from '@react-email/container'
import { Section } from '@react-email/section'
import { Text } from '@react-email/text'
import { Heading } from '@react-email/heading'
import { Button } from '@react-email/button'
import { Hr } from '@react-email/hr'
import { Img } from '@react-email/img'

export interface RideRegistrationData {
  name: string
  membership: string
  route: string
  distance: string
  chapter: string
  startTime: string
  startLocation: string
  rideType: string
  direction?: string
  notes: string
}

export default function RideRegistrationEmail(data: RideRegistrationData) {
  const isMissingMembership = data.membership === 'missing'
  const isPermanent = data.rideType === 'Permanent'

  return (
    <Html>
      <Head>
        <title>Brevet Registration Confirmation</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body
        style={{
          fontFamily: 'arial,helvetica,sans-serif',
          fontSize: '14px',
          color: '#000000',
          backgroundColor: '#FFFFFF',
          margin: 0,
          padding: 0,
        }}
      >
        <Container
          style={{
            maxWidth: '600px',
            margin: '0 auto',
            backgroundColor: '#FFFFFF',
          }}
        >
          <Section style={{ padding: '18px 0px' }}>
            <Text style={{ margin: 0, padding: 0 }}>Hi {data.name},</Text>
          </Section>

          <Section style={{ padding: '18px 0px', backgroundColor: '#FFFFFF' }}>
            <Text
              style={{
                color: '#000000',
                fontFamily: 'arial, helvetica, sans-serif',
                fontSize: '14px',
                margin: 0,
                padding: 0,
              }}
            >
              Thanks for your interest in our {data.route} {data.rideType}.
              We've received your registration request and we'll be following up
              if we need anything more.
            </Text>
          </Section>

          <Section style={{ padding: '18px 0px' }}>
            <Text style={{ margin: 0, padding: 0 }}>
              <strong>Rider name</strong>: {data.name}
              <br />
              <strong>Membership</strong>: {data.membership}
              <br />
              <strong>Ride</strong>: {data.route} {data.distance}
              <br />
              <strong>Chapter</strong>: {data.chapter}
              <br />
              <strong>Start time</strong>: {data.startTime}
              <br />
              <strong>Start location</strong>: {data.startLocation}
              {isPermanent && data.direction && (
                <>
                  <br />
                  <strong>Direction</strong>: {data.direction}
                </>
              )}
              <br />
              <strong>Notes for the ride organizer</strong>:<br />
              {data.notes}
            </Text>
          </Section>

          {isMissingMembership && (
            <>
              <Section
                style={{
                  padding: '0px 0px',
                  backgroundColor: '#eeeeee',
                  display: 'flex',
                  gap: '10px',
                }}
              >
                <div style={{ flex: 2, padding: '18px 18px 18px 18px' }}>
                  <Text style={{ margin: 0, padding: 0 }}>
                    You're currently not registered with Randonneurs Ontario.
                    You must have a trial or full membership to join the ride.
                  </Text>
                </div>
                <div style={{ flex: 1, padding: '18px 18px 18px 18px' }}>
                  <Button
                    href="https://www.randonneursontario.ca/who/how.html"
                    style={{
                      backgroundColor: '#a0dcc2',
                      border: '1px solid #7acfaa',
                      borderRadius: '3px',
                      color: '#333333',
                      fontSize: '14px',
                      fontWeight: 'normal',
                      padding: '12px 18px',
                      textDecoration: 'none',
                      display: 'inline-block',
                      textAlign: 'center',
                    }}
                  >
                    Register to Ride
                  </Button>
                </div>
              </Section>
            </>
          )}

          <Hr
            style={{
              border: 'none',
              borderTop: '1px solid #eeeeee',
              margin: '18px 0px 0px 0px',
            }}
          />

          <Section style={{ padding: '18px 0px', backgroundColor: '#FFFFFF' }}>
            <Heading
              as="h2"
              style={{
                textAlign: 'start',
                fontFamily: 'inherit',
                margin: '0 0 18px 0',
              }}
            >
              Brevet Rules
            </Heading>
            <ul
              style={{
                color: '#000000',
                fontFamily: 'arial, helvetica, sans-serif',
                fontSize: '14px',
                margin: 0,
                padding: 0,
              }}
            >
              <li>
                Be an active member of Randonneurs Ontario and Ontario Cycling.
              </li>
              <li>Wear a helmet</li>
              <li>
                Wear a reflective vest 1 hour before sunset, and 1 hour after
                sunrise.
              </li>
              <li>
                Have front and rear lights solidly affixed to your bicycle.
              </li>
              <li>
                Follow the Ontario, Ontario Cycling, and regional guidelines for
                COVID-19.
              </li>
              <li>Have someone sign your brevet card at the controls</li>
            </ul>
            <Text style={{ margin: '18px 0 0 0' }}>
              <a
                href="https://randonneursontario.ca/who/whatis.html"
                style={{ color: '#1188E6', textDecoration: 'none' }}
              >
                <u>Learn more about Brevets</u>
              </a>
            </Text>
          </Section>

          <Hr
            style={{
              border: 'none',
              borderTop: '1px solid #eeeeee',
              margin: '18px 0px 0px 0px',
            }}
          />

          <Section style={{ padding: '18px 0px' }}>
            <Heading
              as="h2"
              style={{
                textAlign: 'start',
                fontFamily: 'inherit',
                margin: '0 0 18px 0',
              }}
            >
              What's Next?
            </Heading>
            <Text
              style={{
                color: '#000000',
                fontFamily: 'arial, helvetica, sans-serif',
                fontSize: '14px',
                margin: 0,
              }}
            >
              Don't miss any exciting Randonneuring updates by joining our
              mailing list or our slack.
            </Text>
          </Section>

          <Section
            style={{
              padding: '0px 0px',
              backgroundColor: '#FFFFFF',
              display: 'flex',
              gap: '10px',
            }}
          >
            <div style={{ flex: 1, padding: '18px 18px 18px 18px' }}>
              <Button
                href="https://randonneursontario.ca/who/Mailing_Lists.html"
                style={{
                  backgroundColor: '#a0dcc2',
                  border: '1px solid #7acfaa',
                  borderRadius: '3px',
                  color: '#333333',
                  fontSize: '14px',
                  fontWeight: 'normal',
                  padding: '12px 18px',
                  textDecoration: 'none',
                  display: 'inline-block',
                  textAlign: 'center',
                  width: '100%',
                }}
              >
                Join the Randolist
              </Button>
            </div>
            <div style={{ flex: 1, padding: '18px 18px 18px 18px' }}>
              <Button
                href="https://join.slack.com/t/randonneursontario/shared_invite/zt-tmjbpuox-b5TL5jeHFCqYrT5nkAbUkA"
                style={{
                  backgroundColor: '#DEC8D3',
                  border: '1px solid #CBA8BA',
                  borderRadius: '3px',
                  color: '#333333',
                  fontSize: '14px',
                  fontWeight: 'normal',
                  padding: '12px 18px',
                  textDecoration: 'none',
                  display: 'inline-block',
                  textAlign: 'center',
                  width: '100%',
                }}
              >
                Join our Slack
              </Button>
            </div>
          </Section>

          <Hr
            style={{
              border: 'none',
              borderTop: '1px solid #eeeeee',
              margin: '18px 0px 0px 0px',
            }}
          />

          <Section style={{ padding: '18px 0px 0px 0px' }}>
            <Heading
              as="h2"
              style={{
                textAlign: 'inherit',
                fontFamily: 'inherit',
                margin: '0 0 18px 0',
              }}
            >
              <strong>From our Blog...</strong>
            </Heading>
            <Heading
              as="h2"
              style={{
                textAlign: 'inherit',
                margin: '0 0 18px 0',
                fontSize: '14px',
                fontWeight: '700',
              }}
            >
              Introduction – PBP 87 Newsletter
            </Heading>
          </Section>

          <Section
            style={{
              padding: '0px 0px',
              backgroundColor: '#FFFFFF',
              display: 'flex',
              gap: '10px',
            }}
          >
            <div style={{ flex: 1, padding: '0px 0px 18px 0px' }}>
              <Text
                style={{
                  fontFamily: 'inherit',
                  textAlign: 'inherit',
                  lineHeight: '20px',
                  margin: 0,
                }}
              >
                The 1987 Paris-Brest-Paris saw 26 members of the Toronto
                Randonneurs Long Distance Cycling Association starting out at
                4:00 am, Monday August 24, 1987.
                <br />
                <br />
                It was lightly drizzling but the roads gleamed in golden hues
                from the light of the street lamps. Spirits were lively.
                Thursday August 27 welcomed 24 of the Randonneurs at the final
                control by the 10:00 pm closing. Jubilance mingled with relief;
                celebration with fatigue.
                <br />
                <br />
                Here are exerpts from some of the stories written by members of
                the Toronto Randonneurs. They recollect the many people, variety
                of events, vagaries of weather, doubts and strength – and insane
                humour.{' '}
                <a
                  href="https://blog.randonneursontario.ca/?p=1406"
                  style={{ color: '#1188E6', textDecoration: 'none' }}
                >
                  Read More...
                </a>
              </Text>
            </div>
            <div style={{ flex: 1, padding: '0px 0px 0px 0px' }}>
              <Img
                src="http://cdn.mcauto-images-production.sendgrid.net/dc46dcfd45230203/9fedbbd6-75f3-41cc-9415-fdf0737179c9/918x1224.jpg"
                alt="PBP 87 Newsletter"
                width="290"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </div>
          </Section>

          <Hr
            style={{
              border: 'none',
              borderTop: '1px solid #eeeeee',
              margin: '18px 0px 0px 0px',
            }}
          />

          <Section style={{ padding: '18px 0px 18px 0px' }}>
            <Text style={{ margin: 0, padding: 0 }}>
              The VP {data.chapter} is included in this email. Just hit reply if
              you have any questions. We're always happy to help!
            </Text>
          </Section>

          <Section style={{ padding: '18px 0px 18px 0px' }}>
            <Text style={{ margin: 0, padding: 0 }}>
              Stay safe,
              <br />
              <br />
              <strong>Randonneurs Ontario</strong>
              <br />
              randonneursontario.ca
              <br />
              randonneurs.to
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
