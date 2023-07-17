import { DrupalNode } from "next-drupal";
import { FormattedText } from "components/formatted-text";
import { DrupalEntity } from "components/entity";
import { DrupalJsonApiParams } from "drupal-jsonapi-params";


import { ContactSection } from 'components/ContactSection'
import { Container } from 'components/Container'
import { FadeIn } from 'components/FadeIn'
import { PageIntro } from 'components/PageIntro'
import { SectionIntro } from 'components/SectionIntro'
import { StylizedImage } from 'components/StylizedImage'
import { useEffect, useState } from "react";

const params = new DrupalJsonApiParams();

params.addInclude(['step']);

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
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/jsonapi/media/image_object/${data.image.id}`)
            .then(response => response.json())
            .then(data => {
                const imageUrl = `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${data.data.attributes.uri.url}`;
                setImageUrl(imageUrl);
            });
    }, [data.image.id]);

    return (
        <Section title={data.name} image={{ src: imageUrl }}>
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

                <div className="mt-24 space-y-24 [counter-reset:section] sm:mt-32 sm:space-y-32 lg:mt-40 lg:space-y-40">


                {node.step && node.step.map((step, index) => {
                    switch (index) {
                        case 0:
                        return <StepType1 key={index} data={step} />
                        case 1:
                        return <StepType2 key={index} data={step} />
                        case 2:
                        return <StepType3 key={index} data={step} />
                        default:
                        return null;
                    }
                })}

                </div>


            </article>

            <ContactSection />
        </>

    );
  }
