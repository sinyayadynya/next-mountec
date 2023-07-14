import { DrupalNode } from "next-drupal";
import { FormattedText } from "components/formatted-text";
import { DrupalEntity } from "components/entity";

import { Border } from 'components/Border'
import { ContactSection } from 'components/ContactSection'
import { Container } from 'components/Container'
import { FadeIn } from 'components/FadeIn'
import { GridList, GridListItem } from 'components/GridList'
import { PageIntro } from 'components/PageIntro'
import { SectionIntro } from 'components/SectionIntro'
import { StatList, StatListItem } from 'components/StatList'


interface NodePageProps {
  node: DrupalNode;
}


function Culture() {
    return (
      <div className="mt-24 rounded-4xl bg-neutral-950 py-24 sm:mt-32 lg:mt-40 lg:py-32">
        <SectionIntro
          eyebrow="Our culture"
          title="Balance your passion with your passion for life."
          invert
        >
          <p>
            We are a group of like-minded people who share the same core values.
          </p>
        </SectionIntro>
        <Container className="mt-16">
          <GridList>
            <GridListItem title="Loyalty" invert>
              Our team has been with us since the beginning because none of them
              are allowed to have LinkedIn profiles.
            </GridListItem>
            <GridListItem title="Trust" invert>
              We don’t care when our team works just as long as they are working
              every waking second.
            </GridListItem>
            <GridListItem title="Compassion" invert>
              You never know what someone is going through at home and we make
              sure to never find out.
            </GridListItem>
          </GridList>
        </Container>
      </div>
    )
}

export const metadata = {
    title: 'About Us',
    description:
      'We believe that our strength lies in our collaborative approach, which puts our clients at the center of everything we do.',
}

export function NodeAboutPage({ node, ...props }: NodePageProps) {
  return (
    <article {...props}>

      <PageIntro eyebrow={node.title} title={node.headline}>
        {node.description?.processed && (
            <div>
                <FormattedText processed={node.description.processed} />
            </div>
        )}
        {node.text?.processed && (
            <div className="mt-10 max-w-2xl space-y-6 text-base">
                <FormattedText processed={node.text.processed} />
            </div>
        )}
      </PageIntro>

      <Container className="mt-16">
        <StatList>
          <StatListItem value="35" label="Underpaid employees" />
          <StatListItem value="52" label="Placated clients" />
          <StatListItem value="$25M" label="Invoices billed" />
        </StatList>
      </Container>

      <Culture />

      <div className="mt-24 space-y-24 [counter-reset:section] sm:mt-32 sm:space-y-32 lg:mt-40 lg:space-y-40">

        <section>
            {node.main_entity && (
                <div>
                    {/* entity_reference_revisions */}
                    <pre>{JSON.stringify(node.main_entity, null, 2)}</pre>
                </div>
            )}
        </section>
      </div>

      <ContactSection />


      {/* <section>
        <h2 className="mb-2 text-4xl">General information</h2>

        {node.text?.processed && (
          <div className="mb-4">
            <FormattedText processed={node.text.processed} />
          </div>
        )}

        {node.subtype && (
          <div className="mb-4">
            <h3 className="mb-1 text-2xl">Subtype</h3>
            <div>{node.subtype}</div>
          </div>
        )}
      </section> */}

      {/* <section>
        <h2 className="mb-2 text-4xl">Media/Assets</h2>

        {node.primary_image_of_page && (
          <div className="mb-4">
            <h3 className="mb-1 text-2xl">Primary image of page</h3>
            <DrupalEntity entity={node.primary_image_of_page} />
          </div>
        )}
      </section> */}

      {/* <section>
        <h2 className="mb-2 text-4xl">Links</h2>

        {node.related_link && (
          <div className="mb-4">
            <h3 className="mb-1 text-2xl">Related links</h3>
            <div>
              {node.related_link.map((item, i) => (
                <div key={i}>
                  <a
                    className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
                    href={item.uri}
                  >
                    {item.title || item.uri}
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {node.significant_link && (
          <div className="mb-4">
            <h3 className="mb-1 text-2xl">Significant links</h3>
            <div>
              {node.significant_link.map((item, i) => (
                <div key={i}>
                  <a
                    className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
                    href={item.uri}
                  >
                    {item.title || item.uri}
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </section> */}

    </article>
  );
}
