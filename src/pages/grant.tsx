import React from "react"
import { LatestsPosts } from "src/components/Blog"
import { LinkButton } from "src/components/Buttons"
import { Callout } from "src/components/callout"
import { ContentWrapper, ContentChild} from "src/components/content-wrapper"
import { Gallery } from "src/components/Gallery"
import { Layout } from "src/components/layout"
import { Link } from "src/components/Link"
import { SeasonsCta } from "src/components/seasons"
import { SEO } from "src/components/seo"
import {BlackArrow} from "src/components/grant/BlackArrow"
import {Urbane} from "src/components/grant/Urbane"

const GrantPage = () => (
  <Layout>
    <ContentWrapper>
      <h1>Randonneurs Ontario</h1><h2>Access Grant</h2>
    </ContentWrapper>
    <ContentWrapper container>
      <ContentChild>
        <p>The Randonneurs Ontario Access Grant is designed to reduce barriers to the ultra-distance riding community. This access grant is for someone from a group under-represented in the ultra-distance riding community that would have otherwise not been able to participate in Randonneurs Ontario events.</p>
        <p>We have been heavily inspired by the work of <Link href="https://radicaladventureriders.com/scholarship">RAR’s SJ Brooks Scholarship</Link>.</p>
        <LinkButton primary block href="https://forms.gle/2zWxxf9Pix3gQQM7A">Apply for the RO Access Grant</LinkButton>
      </ContentChild>
      <ContentChild>IMG</ContentChild>
    </ContentWrapper>
    <ContentWrapper container>
      <ContentChild>IMG</ContentChild>
      <ContentChild>
      <h3>Recipients</h3>
      <p>The grant is meant to reduce barriers for individuals who intend on completing an ACP Brevet of at least 200km.</p>
      <p>You must be able to physically attend an event on the Randonneurs Ontario schedule</p>
      <p>The ideal recipient will be someone who:
      <ul>
        <li>have existing experience with cycling in their community</li>
        <li>have a plan for training and completing an ACP Brevet of at least 200km</li>
        <li>are enthusiastic about riding bicycles and growing their ultra-distance cycling experience</li>
        <li>are part of an underrepresented group within the ultra-distance cycling community</li>
        <li>absolutely need financial assistance to participate in the Randonneurs Ontario events</li>
          </ul></p>
      </ContentChild>
      </ContentWrapper>
      <ContentWrapper>
      <Callout>
      <h3>Grant</h3>
      <p>This grant covers the registration fees and equipment requirements for Randonneurs Ontario events, for a total value of $2000. This includes:
      <ul>
        <li><strong>Randonneurs Ontario membership fees for 2023</strong></li>
          <li><strong>$1500 worth of support from one of our bicycle shops sponsors, such as:</strong>
            <ul>
              <li>Bicycle tune-up, repair, and/or misc equipment</li>
              <li>Required night riding equipment, such as sufficient lighting and a reflective vest or sash</li>
              <li>Approved cycling helmet</li>
              <li>Equipment bags sufficient for a 200km+ ride</li>
              </ul>
        </li>
        <li><strong>$500 worth of support for use during a Randonneurs Ontario event, such as</strong><ul>
          <li>Meals in-between the controls</li>
          <li>Lodging for overnight controls, if needed</li>
          <li>Extra equipment required to complete a brevet, such as flat repair kits</li>
          <li>Supplemental childcare</li>
            </ul>
        </li>
        </ul></p>
      <p><strong>One recipient will also receive a bicycle bag suitable for air travel, donated by Internet Light and Power.</strong></p>

      <p>This grant does not cover the Ontario Cycling Association membership. OCA Membership is included in all racing licenses, or it can be obtained with an OCA Affiliate Club Membership.</p>
      </Callout>
    </ContentWrapper>
    <ContentWrapper>
      <h3>Grant committee</h3>
      <p>The grant committee is responsible for determining the recipient of the grant. They are the only ones who will view your answers to this submission. They are:
        <ul>
          <li>Gwyneth Mitchell</li>
          <li>Erin Marchak</li>
          <li>Carey Chappelle</li></ul>
      </p>
      <Gallery/>
    </ContentWrapper>
    <ContentWrapper>
      <h3>Supporters</h3>
      If your company would like to get involved, please email us at grant@randonneurs.to. This grant is possible thanks to the generosity of:
    </ContentWrapper>
    <ContentWrapper container>
      <ContentChild><center><Link href="http://www.mtc.gov.on.ca/en/home.shtml">Ontario Ministry of Heritage,<br/> Sport, Tourism & Culture Industries </Link></center></ContentChild>
      <ContentChild><center><Link href="https://ontariocycling.org">Ontario Cycling<br />through their Member Club Rebuild program</Link></center></ContentChild>
    </ContentWrapper>
    <ContentWrapper container>
      <ContentChild><center>
        <Link href="https://www.blackarrowcycles.ca"><BlackArrow />Black Arrow Cycles</Link>
      </center></ContentChild>
      <ContentChild><center><Link href="https://www.ilap.com">Internet Light and Power</Link></center></ContentChild>
      <ContentChild><center><Link href="https://www.ucycle.com"><Urbane/> Urbane Cyclist</Link></center></ContentChild>
    </ContentWrapper>
    <SeasonsCta />
    <LatestsPosts />
  </Layout>
)}

export const Head = () => <SEO
  title="Randonneurs Ontario Access Grant"
  description=""
  //image={""}
/>

export default GrantPage
