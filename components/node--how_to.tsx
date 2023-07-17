import { DrupalNode } from "next-drupal";
import { FormattedText } from "components/formatted-text";
import { DrupalEntity } from "components/entity";

import { ContactSection } from 'components/ContactSection'
import { Container } from 'components/Container'
import { FadeIn } from 'components/FadeIn'
import { PageIntro } from 'components/PageIntro'
import { SectionIntro } from 'components/SectionIntro'
import { StylizedImage } from 'components/StylizedImage'


interface NodeHowToProps {
  node: DrupalNode;
}

function Section({ title, image, children }) {
    return (
      <Container className="group/section [counter-increment:section]">
        <div className="lg:flex lg:items-center lg:justify-end lg:gap-x-8 lg:group-even/section:justify-start xl:gap-x-20">
          <div className="flex justify-center">
            <FadeIn className="w-[33.75rem] flex-none lg:w-[45rem]">
              <StylizedImage
                {...image}
                sizes="(min-width: 1024px) 41rem, 31rem"
                className="justify-center lg:justify-end lg:group-even/section:justify-start"
              />
            </FadeIn>
          </div>
          <div className="mt-12 lg:mt-0 lg:w-[37rem] lg:flex-none lg:group-even/section:order-first">
            <FadeIn>
              <div
                className="font-display text-base font-semibold before:text-neutral-300 before:content-['/_'] after:text-neutral-950 after:content-[counter(section,decimal-leading-zero)]"
                aria-hidden="true"
              />
              <h2 className="mt-2 font-display text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl">
                {title}
              </h2>
              <div className="mt-6">{children}</div>
            </FadeIn>
          </div>
        </div>
      </Container>
    )
  }

function StepType1({ data }) {
    return (
        <Section title={data.name} image={{ src: data.image }}>
        <div className="space-y-6 text-base text-neutral-600">
          <FormattedText processed={data.description.processed} />
        </div>
      </Section>
    )
  }

  function StepType2({ data }) {
    return (
        <Section title={data.name} image={{ src: data.image }}>
        <div className="space-y-6 text-base text-neutral-600">
          <FormattedText processed={data.description.processed} />
        </div>
      </Section>
    )
  }

  function StepType3({ data }) {
    return (
        <Section title={data.name} image={{ src: data.image }}>
        <div className="space-y-6 text-base text-neutral-600">
          <FormattedText processed={data.description.processed} />
        </div>
      </Section>
    )
  }


  export function NodeHowTo({ node, ...props }: NodeHowToProps) {
    return (
        <>
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

                {node.step && node.step.map((step, index) => {
                switch (index) {
                    case 0:
                    return <StepType1 key={index} data={step} />
                    // Add other step types here
                    default:
                    return null;
                }
                })}

                {node.step && node.step.map((step, index) => {
                switch (index) {
                    case 1:
                    return <StepType2 key={index} data={step} />
                    // Add other step types here
                    default:
                    return null;
                }
                })}

                {node.step && node.step.map((step, index) => {
                switch (index) {
                    case 2:
                    return <StepType3 key={index} data={step} />
                    // Add other step types here
                    default:
                    return null;
                }
                })}
            </article>

            <ContactSection />
        </>

    );
  }
