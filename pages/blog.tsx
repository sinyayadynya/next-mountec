import Head from "next/head"
import { GetStaticPropsResult } from "next"
import { DrupalNode } from "next-drupal"

import { drupal } from "lib/drupal"
import { RootLayout } from "components/RootLayout"
import { Container } from 'components/Container'
import { PageIntro } from 'components/PageIntro'
import { NodeArticleTeaser } from "components/node--article--teaser"


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
        <PageIntro eyebrow="Blog" title="The latest articles and news">
            <p>
            Stay informed with the latest in sustainable tourism and territorial development
            as our team transforms landscapes responsibly.
            </p>
        </PageIntro>

        <Container className="mt-24 sm:mt-32 lg:mt-40">
            <div className="space-y-24 lg:space-y-32">

                {nodes?.length ? (
                    nodes.map((node) => (
                        <div key={node.id}>
                        <NodeArticleTeaser node={node} />
                        <hr className="my-20" />
                        </div>
                    ))
                    ) : (
                    <p className="py-4">No nodes found</p>
                )}

            </div>
        </Container>

      </div>
    </RootLayout>
  )
}

export async function getStaticProps(
  context
): Promise<GetStaticPropsResult<IndexPageProps>> {
  const nodes = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    "node--article",
    context,
    {
      params: {
        "filter[status]": 1,
        "fields[node--article]": "title,description,path,image,uid,created",
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
