import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { getImage } from "gatsby-plugin-image"
import { ContentChild, ContentWrapper } from "src/components/content-wrapper"
import { Gallery } from "src/components/Gallery"
import { Layout } from "src/components/layout"
import { Link } from "src/components/Link"
import { LinkButton } from "src/components/Buttons"
import { LatestsPosts } from "src/components/Blog"
import { SEO } from "src/components/seo"
import { Chapter, useEvents } from "src/data/events"

import * as styles from "./styles/index.module.scss"
import { iframe } from "src/components/styles/iframe.module.scss"
import UpcomingEvents from "src/components/UpcomingEvents"

const pageQuery = graphql`
  query indexPageQuery {
    allFile(
      filter: {
        extension: { regex: "/(jpg|JPG|jpeg)/" }
        relativeDirectory: { eq: "gallery" }
      }
      limit: 6
      sort: { birthTime: DESC }
    ) {
      nodes {
        name
        childImageSharp {
          gatsbyImageData(aspectRatio: 1, height: 300, formats: JPG)
        }
      }
    }
  }
`

const IndexPage = () => {
  const { brevets: torontoBrevets } = useEvents({
    chapter: Chapter.Toronto,
    limit: 2,
  })
  const { brevets: huronBrevets } = useEvents({
    chapter: Chapter.Huron,
    limit: 2,
  })
  const { brevets: ottawaBrevets } = useEvents({
    chapter: Chapter.Ottawa,
    limit: 2,
  })
  const { brevets: simcoeBrevets } = useEvents({
    chapter: Chapter.Simcoe,
    limit: 2,
  })
  return (
    <Layout>
      <ContentWrapper>
        <h2>Upcoming Events</h2>
      </ContentWrapper>
      <ContentWrapper container>
        <UpcomingEvents chapter={Chapter.Toronto} events={torontoBrevets} />
        <UpcomingEvents chapter={Chapter.Huron} events={huronBrevets} />
        <UpcomingEvents chapter={Chapter.Ottawa} events={ottawaBrevets} />
        <UpcomingEvents chapter={Chapter.Simcoe} events={simcoeBrevets} />
      </ContentWrapper>
      <ContentWrapper>
        <footer className={styles.eventFooter}>
          <LinkButton to="/registration/" primary small block>
            Register to ride
          </LinkButton>
        </footer>
        <ContentChild>
          <Gallery />
        </ContentChild>
      </ContentWrapper>
      <ContentWrapper>
        <h3>About us</h3>
        <p>
          Randonneurs Ontario is an ultra-distance cycling club. We've been
          riding 200km+ events southern Ontario since 1982.
        </p>
        <p>
          <Link href="https://randonneursontario.ca/">Randonneurs Ontario</Link>{" "}
          is affiliated with the{" "}
          <Link href="https://www.audax-club-parisien.com/en">
            Audax Club Parisien
          </Link>
          , the parent organization governing the qualification of riders
          wishing to participate in the 1200K Paris - Brest - Paris Randonnee.
          The club is also affiliated with{" "}
          <Link href="https://www.audax-club-parisien.com/en/our-organizations/brm-world/">
            Les Randonneurs Mondiaux
          </Link>
          , which provides recognition for brevets other than Paris - Brest -
          Paris that are longer than 1000K.
        </p>
        <Link href="https://randonneursontario.ca/who/index.html">
          Learn more about Randonneurs Ontario
        </Link>
      </ContentWrapper>
      <LatestsPosts />
      <ContentWrapper>
        <h2>2021 Virtual Symposium</h2>
        <ContentWrapper container>
          <ContentChild>
            <iframe
              className={iframe}
              title="2021 Symposium video recording"
              src="https://www.youtube.com/embed/1_QZSRRFpP4?start=203"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </ContentChild>
          <ContentChild>
            <p>
              On 16 February 2022 we held our second Virtual Symposium! A
              perfect way to get better acquainted with randonneuring and to
              help you pull through the winter to get to the season start.
            </p>
            <p>
              Topics included: Hardware: The right stuff for randonneuring;
              Software: Nutrition, night riding, and mental toughness;
              Categories of rides: Brevets, Devil's Week and the flèche; Grand
              Brevets: Granite Anvil and Paris-Brest-Paris; Randonneurs Ontario
              awards; A first-hand experience riding a 1,000km brevet; Moderated
              Q&A with the speakers
            </p>
            <p>
              <Link to="symposium/2021">
                {"View the full recording and slide deck >>"}
              </Link>
            </p>
          </ContentChild>
        </ContentWrapper>
      </ContentWrapper>
    </Layout>
  )
}

export const Head = () => {
  const {
    allFile: { nodes: images },
  } = useStaticQuery(pageQuery)
  const seoImage = getImage(images[0])

  return (
    <SEO
      description="Part of Randonneurs Ontario, a long distance cycling club affiliated with the Audax Club Parisien"
      image={seoImage}
    />
  )
}

export default IndexPage
