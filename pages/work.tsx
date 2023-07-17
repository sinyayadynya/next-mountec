import Head from "next/head"
import { GetStaticPropsResult } from "next"
import { DrupalNode } from "next-drupal"

import { drupal } from "lib/drupal"
import { RootLayout } from "components/RootLayout"
import { Container } from 'components/Container'
import { ContactSection } from 'components/ContactSection'
import { FadeIn } from 'components/FadeIn'
import { PageIntro } from 'components/PageIntro'
import { NodeCaseStudyTeaser } from "components/node--case_study--teaser"


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
            <ContactSection />

        </Container>

      </div>
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
