import Head from "next/head"
import Image from 'next/image'
import { GetStaticPropsResult } from "next"
import { DrupalNode } from "next-drupal"

import { drupal } from "lib/drupal"
import { RootLayout } from "components/RootLayout"
import { Border } from 'components/Border'
import { Container } from 'components/Container'
import { ContactSection } from 'components/ContactSection'
import { FadeIn, FadeInStagger } from 'components/FadeIn'
import { PageIntro } from 'components/PageIntro'
import { Testimonial } from 'components/Testimonial'
import { NodeCaseStudyTeaser } from "components/node--case_study--teaser"

import logoBrightPath from 'images/clients/bright-path/logo-dark.svg'
import logoFamilyFund from 'images/clients/family-fund/logo-dark.svg'
import logoGreenLife from 'images/clients/green-life/logo-dark.svg'
import logoHomeWork from 'images/clients/home-work/logo-dark.svg'
import logoMailSmirk from 'images/clients/mail-smirk/logo-dark.svg'
import logoNorthAdventures from 'images/clients/north-adventures/logo-dark.svg'
import logoPhobia from 'images/clients/phobia/logo-dark.svg'
import logoUnseal from 'images/clients/unseal/logo-dark.svg'

// To make dynamic
const clients = [
    ['Phobia', logoPhobia],
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
      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <FadeIn>
          <h2 className="font-display text-2xl font-semibold text-neutral-950">
            You’re in good company
          </h2>
        </FadeIn>
        <FadeInStagger className="mt-10" faster>
          <Border as={FadeIn} />
          <ul
            role="list"
            className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-4"
          >
            {clients.map(([client, logo]) => (
              <li key={client} className="group">
                <FadeIn className="overflow-hidden">
                  <Border className="pt-12 group-[&:nth-child(-n+2)]:-mt-px sm:group-[&:nth-child(3)]:-mt-px lg:group-[&:nth-child(4)]:-mt-px">
                    <Image src={logo} alt={client} unoptimized />
                  </Border>
                </FadeIn>
              </li>
            ))}
          </ul>
        </FadeInStagger>
      </Container>
    )
  }


interface IndexPageProps {
  nodes: DrupalNode[]
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
      <div className='mx-auto max-w-7xl px-6 lg:px-8 mt-24 sm:mt-32 lg:mt-40'>
        <PageIntro eyebrow="Our work" title="Proven solutions for real-world problems.">
            <p>
            We believe in efficiency and maximizing our resources to provide the best value to our clients.
            The primary way we do that is by re-using the same five projects we’ve been developing for the past decade.
            </p>
        </PageIntro>

        <Container className="mt-40">
            <FadeIn>
                <h2 className="font-display text-2xl font-semibold text-neutral-950">
                    Case studies
                </h2>
            </FadeIn>
            <div className="mt-10 space-y-20 sm:space-y-24 lg:space-y-32">

                {nodes?.length ? (
                    nodes.map((node) => (
                        <div key={node.id}>
                            <NodeCaseStudyTeaser node={node} />
                        </div>
                    ))
                    ) : (
                    <p className="py-4">No nodes found</p>
                )}

            </div>

        </Container>

      </div>

        <Testimonial
            className="mt-24 sm:mt-32 lg:mt-40"
            client={{ name: 'Mail Smirk', logo: logoMailSmirk }}
        >
            We approached <em>Studio</em> because we loved their past work. They
            delivered something remarkably similar in record time.
        </Testimonial>

        <Clients />

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
        "fields[node--case_study]": "title,description,path,image,uid,created",
        include: "image,uid",
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
