import { DrupalNode } from "next-drupal";
import { FormattedText } from "components/formatted-text";
import { DrupalEntity } from "components/entity";

import { ContactSection } from 'components/ContactSection'
import { Container } from 'components/Container'
import { FadeIn } from 'components/FadeIn'
import { PageIntro } from 'components/PageIntro'

interface NodePageProps {
  node: DrupalNode;
}

export function NodePage({ node, ...props }: NodePageProps) {
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

      <div className="mt-24 space-y-24 [counter-reset:section] sm:mt-32 sm:space-y-32 lg:mt-40 lg:space-y-40">
        <section>
            <h2 className="mb-2 text-4xl">Content</h2>

            {node.main_entity && (
            <div className="mb-4">
                {/* entity_reference_revisions */}
                <pre>{JSON.stringify(node.main_entity, null, 2)}</pre>
            </div>
            )}
        </section>
      </div>

      <ContactSection />

    </article>
  );
}
