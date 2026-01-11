import RideRegistrationEmail, { RideRegistrationData } from './rideRegistration'
import { renderToStaticMarkup } from 'react-dom/server'

const baseData: RideRegistrationData = {
  name: 'Test Rider',
  membership: 'active',
  route: 'Test Route',
  distance: '200km',
  chapter: 'Toronto',
  startTime: '7:00 AM',
  startLocation: 'Somewhere',
  rideType: 'Brevet',
  notes: 'Some notes',
}

describe('RideRegistrationEmail', () => {
  it('renders Direction only for Permanent rides when direction is provided', () => {
    const html = renderToStaticMarkup(
      RideRegistrationEmail({
        ...baseData,
        rideType: 'Permanent',
        direction: 'CW',
      }),
    )

    expect(html).toContain('<strong>Direction</strong>: CW')
  })

  it('does not render Direction when not a Permanent ride', () => {
    const html = renderToStaticMarkup(
      RideRegistrationEmail({
        ...baseData,
        rideType: 'Brevet',
        direction: 'CW',
      }),
    )

    expect(html).not.toContain('<strong>Direction</strong>:')
  })

  it('renders missing membership callout and CTA when membership is missing', () => {
    const html = renderToStaticMarkup(
      RideRegistrationEmail({
        ...baseData,
        membership: 'missing',
      }),
    )

    expect(html).toContain("You&#x27;re currently not registered with Randonneurs Ontario")
    expect(html).toContain('Register to Ride')
    expect(html).toContain('who/how.html')
  })
})

