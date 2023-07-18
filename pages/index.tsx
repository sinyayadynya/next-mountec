import Head from "next/head"
import Image from 'next/image'
import { GetStaticPropsResult } from "next"
import { DrupalNode } from "next-drupal"

import { drupal } from "lib/drupal"
import { RootLayout } from "components/RootLayout"
import { NodeCaseStudyCard } from "components/node--case_study--card"

import { ContactSection } from 'components/ContactSection'
import { Container } from 'components/Container'
import { FadeIn, FadeInStagger } from 'components/FadeIn'
import { List, ListItem } from 'components/List'
import { SectionIntro } from 'components/SectionIntro'
import { StylizedImage } from 'components/StylizedImage'
import { Testimonial } from 'components/Testimonial'

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

interface IndexPageProps {
  nodes: DrupalNode[]
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

function CaseStudies({ caseStudies }) {
    return (
      <>
        <SectionIntro
          title="Harnessing technology for a brighter future"
          className="mt-24 sm:mt-32 lg:mt-40"
        >
          <p>
            We believe technology is the answer to the world’s greatest
            challenges. It’s also the cause, so we find ourselves in bit of a
            catch 22 situation.
          </p>
        </SectionIntro>
        <Container className="mt-16">
          <FadeInStagger className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {caseStudies.map((caseStudy) => (
              <FadeIn key={caseStudy.href} className="flex">
                <article className="relative flex w-full flex-col rounded-3xl p-6 ring-1 ring-neutral-950/5 transition hover:bg-neutral-50 sm:p-8">
                  <h3>
                    <Link href={caseStudy.href}>
                      <span className="absolute inset-0 rounded-3xl" />
                      <Image
                        src={caseStudy.logo}
                        alt={caseStudy.client}
                        className="h-16 w-16"
                        unoptimized
                      />
                    </Link>
                  </h3>
                  <p className="mt-6 flex gap-x-2 text-sm text-neutral-950">
                    <time dateTime={caseStudy.year} className="font-semibold">
                      {caseStudy.date.split('-')[0]}
                    </time>
                    <span className="text-neutral-300" aria-hidden="true">
                      /
                    </span>
                    <span>Case study</span>
                  </p>
                  <p className="mt-6 font-display text-2xl font-semibold text-neutral-950">
                    {caseStudy.title}
                  </p>
                  <p className="mt-4 text-base text-neutral-600">
                    {caseStudy.description}
                  </p>
                </article>
              </FadeIn>
            ))}
          </FadeInStagger>
        </Container>
      </>
    )
}

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

export const metadata = {
    description:
      'We are developer studio working at the intersection of design and technology.',
}

export default function IndexPage({ nodes }: IndexPageProps) {
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
                    Pioneers <br />in sustainable territorial <br />development.
                </h1>
                <p className="mt-6 text-xl text-neutral-600">
                    Sculpting landscapes, shaping futures. We fuse innovation and sustainability with local dynamics, laying the groundwork for future-ready tourism.
                </p>
            </FadeIn>
        </Container>

        <Clients />

        <div>
            <SectionIntro
                title="Building sustainable destinations for future generations"
                className="mt-24 sm:mt-32 lg:mt-40"
            >
                <p>
                We see tourism as the key to fostering socio-economic growth and environmental conservation.
                It's a delicate balance, but then again, so is skiing on a steep slope.
                </p>
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

        <Testimonial
            className="mt-24 sm:mt-32 lg:mt-40"
            client={{ name: 'Phobia', logo: logoPhobiaDark }}
        >
            Partnering with Mountec Corp. was an absolute game-changer for our local tourism sector.
            Their innovative, sustainable approach has made a significant, positive impact on our community.
        </Testimonial>

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

  return {
    props: {
      nodes,
    },
  }
}
