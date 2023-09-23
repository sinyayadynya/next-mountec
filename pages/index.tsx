import Head from "next/head"
import Image from 'next/image'
import { GetStaticPropsResult } from "next"
import { DrupalNode } from "next-drupal"
import { useEffect, useState } from 'react'

import { drupal } from "lib/drupal"
import { RootLayout } from "components/RootLayout"
import { NodeCaseStudyCard } from "components/node--case_study--card"

import { ContactSection } from 'components/ContactSection'
import { Container } from 'components/Container'
import { FadeIn, FadeInStagger } from 'components/FadeIn'
import { List, ListItem } from 'components/List'
import { SectionIntro } from 'components/SectionIntro'
import { StylizedImage } from 'components/StylizedImage'
import { Testimonial as TestimonialComponent } from 'components/Testimonial'

import logoBrightPath from 'images/clients/bright-path/logo-light.svg'
import logoFamilyFund from 'images/clients/family-fund/logo-light.svg'
import logoGreenLife from 'images/clients/green-life/logo-light.svg'
import logoHomeWork from 'images/clients/home-work/logo-light.svg'
import logoMailSmirk from 'images/clients/mail-smirk/logo-light.svg'
import logoNorthAdventures from 'images/clients/north-adventures/logo-light.svg'
import logoPhobiaDark from 'images/clients/phobia/logo-dark.svg'
import logoPhobiaLight from 'images/clients/phobia/logo-light.svg'
import logoUnseal from 'images/clients/unseal/logo-light.svg'
import imageServices from 'images/services.jpg'
import { FormattedText } from "components/formatted-text"

interface IndexPageProps {
  nodes: DrupalNode[]
  homeContent: DrupalNode
}

const clients = [
    ['Phobia', logoPhobiaLight],
    ['Family Fund', logoFamilyFund],
    ['Unseal', logoUnseal],
    ['Mail Smirk', logoMailSmirk],
    ['Home Work', logoHomeWork],
    ['Green Life', logoGreenLife],
    ['Bright Path', logoBrightPath],
    ['North Adventures', logoNorthAdventures],
]

function Clients() {
    return (
      <div className="mt-24 rounded-4xl bg-neutral-950 py-20 sm:mt-32 sm:py-32 lg:mt-56">
        <Container>
          <FadeIn className="flex items-center gap-x-8">
            <h2 className="text-center font-display text-sm font-semibold tracking-wider text-white sm:text-left">
              We’ve worked with hundreds of amazing people
            </h2>
            <div className="h-px flex-auto bg-neutral-800" />
          </FadeIn>
          <FadeInStagger faster>
            <ul
              role="list"
              className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4"
            >
              {clients.map(([client, logo]) => (
                <li key={client}>
                  <FadeIn>
                    <Image src={logo} alt={client} unoptimized />
                  </FadeIn>
                </li>
              ))}
            </ul>
          </FadeInStagger>
        </Container>
      </div>
    )
}

// To make dynamic

function Services() {
    return (
      <>
        <SectionIntro
          eyebrow="Services"
          title="We help you navigate your sustainable transformation journey."
          className="mt-24 sm:mt-32 lg:mt-40"
        >
          <p>
            As long as your project embraces our innovative approach to challenges - we can guide you towards a sustainable horizon.
          </p>
        </SectionIntro>
        <Container className="mt-16">
          <div className="lg:flex lg:items-center lg:justify-end">
            <div className="flex justify-center lg:w-1/2 lg:justify-end lg:pr-12">
              <FadeIn className="w-[33.75rem] flex-none lg:w-[45rem]">
                <StylizedImage
                  src={imageServices}
                  sizes="(min-width: 1024px) 41rem, 31rem"
                  className="justify-center lg:justify-end"
                />
              </FadeIn>
            </div>
            <List className="mt-16 lg:mt-0 lg:w-1/2 lg:min-w-[33rem] lg:pl-4">
              <ListItem title="Governance and Development Strategy">
              We draw strategic roadmaps for development, perform destination diagnostics,
              prioritize clientele needs, and facilitate innovative workshops.
              </ListItem>
              <ListItem title="Social and Environmental Improvements">
              From environment auditing to impact-minimizing strategies, we boost sustainability
              factors in line with local socio-economic conditions.
              </ListItem>
              <ListItem title="Knowledge and Training">
              We assess training needs, help structure development programs, and lead
              participative training initiatives, creating a knowledge-forward environment.
              </ListItem>
              <ListItem title="Territorial Marketing and Communication">
              Through diagnostic interpretation and marketing positioning,
              we enhance and promote unique regional experiences.
              </ListItem>
              <ListItem title="Infrastructure Planning and Technical Services">
              We excel in crafting and integrating year-round infrastructures for tourist
              attractions, ensuring functionality, aesthetics, and sustainability.
              </ListItem>
            </List>
          </div>
        </Container>
      </>
    )
}

function Testimonial({ className }) {
    const [testimonial, setTestimonial] = useState(null)

    useEffect(() => {
      const fetchTestimonial = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/api/testimonials/random`)
          const data = await response.json()
          setTestimonial(data[0])
        } catch (error) {
          console.error('Failed to fetch testimonial:', error)
        }
      }

      fetchTestimonial()
    }, [])

    if (!testimonial) {
      return null // or a loading spinner
    }

    // Remove HTML tags from the title to use as alt text
    const altText = testimonial.title.replace(/<[^>]*>?/gm, '')

    return (
      <TestimonialComponent
        className={className}
        client={{ name: altText, logo: `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${testimonial.logo}` }}
        imageWidth={184} // placeholder width
        imageHeight={36} // placeholder height
      >
        {testimonial.text}
      </TestimonialComponent>
    )
  }

export const metadata = {
    description:
      'We are developer studio working at the intersection of design and technology.',
}

export default function IndexPage({ nodes, homeContent }: IndexPageProps) {
    console.log(homeContent.offers);

    return (
    <RootLayout>
      <Head>
        <title>Mountec Corp</title>
        <meta
          name="description"
          content="A Next.js site powered by a Drupal backend."
        />
      </Head>

      <Container className="mt-24 sm:mt-32 md:mt-56">
            <FadeIn className="max-w-3xl">
                <h1 className="font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-7xl">
                    {homeContent.headline}
                </h1>
                <div className="mt-6 text-xl text-neutral-600">
                    <FormattedText processed={homeContent.description.processed} />
                </div>
            </FadeIn>
        </Container>


        <Clients />

        <div>
            <SectionIntro
                title={homeContent.alternative_headline}
                className="mt-24 sm:mt-32 lg:mt-40"
            >
                <FormattedText processed={homeContent.description.processed} />

            </SectionIntro>

            <Container className="mt-16">
                <FadeInStagger className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {nodes?.length ? (
                        nodes.map((node) => (
                            <div key={node.id}>
                                <NodeCaseStudyCard node={node} />
                            </div>
                        ))
                        ) : (
                    <p className="py-4">No case study found</p>
                    )}
                </FadeInStagger>
            </Container>
        </div>

        {/* <CaseStudies caseStudies={caseStudies} /> */}

        <Testimonial className="mt-24 sm:mt-32 lg:mt-40" />

        <Services />

        <ContactSection />

    </RootLayout>
  )
}

export async function getStaticProps(
    context
  ): Promise<GetStaticPropsResult<IndexPageProps>> {
    const nodes = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
      "node--case_study",
      context,
      {
        params: {
          "filter[status]": 1,
          "fields[node--case_study]": "title,description,path,image,uid,created,source_organization,copyright_year,teaches",
          "fields[node--organization]": "title,logo",
          include: "image,uid,source_organization,source_organization.logo,source_organization.logo.image",
          sort: "-created",
        },
      }
    )

    const homeContent = await drupal.getResource(
      "node--page",
      "456f8965-1cf5-40c8-85c7-ad2bc47f4792"
    )

    console.log('homeContent:', homeContent)

    return {
      props: {
        nodes,
        homeContent: homeContent as DrupalNode,
    },
      revalidate: 60, // revalidate every 60 seconds
    }
}
