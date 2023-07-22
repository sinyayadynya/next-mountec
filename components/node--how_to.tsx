import { DrupalNode } from "next-drupal";
import { FormattedText } from "components/formatted-text";
import { DrupalEntity } from "components/entity";
import { DrupalJsonApiParams } from "drupal-jsonapi-params";


import { ContactSection } from 'components/ContactSection'
import { Container } from 'components/Container'
import { FadeIn } from 'components/FadeIn'
import { GridList, GridListItem } from 'components/GridList'
import { GridPattern } from 'components/GridPattern'
import { List, ListItem } from 'components/List'
import { PageIntro } from 'components/PageIntro'
import { SectionIntro } from 'components/SectionIntro'
import { StylizedImage } from 'components/StylizedImage'
import { useEffect, useState } from "react";

import processStep1 from 'images/process_step1.jpg';
import processStep2 from 'images/process_step2.jpg';
import processStep3 from 'images/process_step3.jpg';

const params = new DrupalJsonApiParams();

params.addInclude(['step', 'step.image']);

async function fetchImage(id) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/jsonapi/media/image_object/${id}`);
    const data = await response.json();
    return data;
}

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
        <Section title={data.name} image={{ src: processStep1 }}>
            <div className="space-y-6 text-base text-neutral-600 [&>ul]:mt-4 [&>ul]:flex [&>ul]:flex-wrap [&>ul]:gap-4 [&>ul>li]:rounded-full [&>ul>li]:bg-neutral-100 [&>ul>li]:px-4 [&>ul>li]:py-1.5 [&>ul>li]:text-base [&>ul>li]:text-neutral-600 [&>h3]:mt-12 [&>h3]:font-display [&>h3]:text-base [&>h3]:font-semibold [&>h3]:text-neutral-950">
                <FormattedText processed={data.description.processed} />
            </div>
        </Section>
    );
}

function StepType2({ data }) {
    return (
        <Section title={data.name} image={{ src: processStep2, shape: 1 }}>
            <div className="space-y-6 text-base text-neutral-600 [&>ul]:mt-4 [&>ul]:flex [&>ul]:flex-wrap [&>ul]:gap-4 [&>ul>li]:rounded-full [&>ul>li]:bg-neutral-100 [&>ul>li]:px-4 [&>ul>li]:py-1.5 [&>ul>li]:text-base [&>ul>li]:text-neutral-600 [&>h3]:mt-12 [&>h3]:font-display [&>h3]:text-base [&>h3]:font-semibold [&>h3]:text-neutral-950">
                <FormattedText processed={data.description.processed} />
            </div>
        </Section>
    );
}

function StepType3({ data }) {
    return (
        <Section title={data.name} image={{ src: processStep3, shape: 2 }}>
            <div className="space-y-6 text-base text-neutral-600 [&>ul]:mt-4 [&>ul]:flex [&>ul]:flex-wrap [&>ul]:gap-4 [&>ul>li]:rounded-full [&>ul>li]:bg-neutral-100 [&>ul>li]:px-4 [&>ul>li]:py-1.5 [&>ul>li]:text-base [&>ul>li]:text-neutral-600 [&>h3]:mt-12 [&>h3]:font-display [&>h3]:text-base [&>h3]:font-semibold [&>h3]:text-neutral-950">
                <FormattedText processed={data.description.processed} />
            </div>
        </Section>
    );
}

function Values() {
    return (
      <div className="relative mt-24 pt-24 sm:mt-32 sm:pt-32 lg:mt-40 lg:pt-40">
        <div className="absolute inset-x-0 top-0 -z-10 h-[884px] overflow-hidden rounded-t-4xl bg-gradient-to-b from-neutral-50">
          <GridPattern
            className="absolute inset-0 h-full w-full fill-neutral-100 stroke-neutral-950/5 [mask-image:linear-gradient(to_bottom_left,white_40%,transparent_50%)]"
            yOffset={-270}
          />
        </div>

        <SectionIntro
          eyebrow="Our values"
          title="Balancing reliability and innovation"
        >
          <p>
            We strive to stay at the forefront of emerging trends and
            technologies, while completely ignoring them and forking that old
            Rails project we feel comfortable using. We stand by our core values
            to justify that decision.
          </p>
        </SectionIntro>

        <Container className="mt-24">
          <GridList>
            <GridListItem title="Meticulous">
              The first part of any partnership is getting our designer to put
              your logo in our template. The second step is getting them to do the
              colors.
            </GridListItem>
            <GridListItem title="Efficient">
              We pride ourselves on never missing a deadline which is easy because
              most of the work was done years ago.
            </GridListItem>
            <GridListItem title="Adaptable">
              Every business has unique needs and our greatest challenge is
              shoe-horning those needs into something we already built.
            </GridListItem>
            <GridListItem title="Honest">
              We are transparent about all of our processes, banking on the simple
              fact our clients never actually read anything.
            </GridListItem>
            <GridListItem title="Loyal">
              We foster long-term relationships with our clients that go beyond
              just delivering a product, allowing us to invoice them for decades.
            </GridListItem>
            <GridListItem title="Innovative">
              The technological landscape is always evolving and so are we. We are
              constantly on the lookout for new open source projects to clone.
            </GridListItem>
          </GridList>
        </Container>
      </div>
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

            <Values />

            <ContactSection />
        </>

    );
}
