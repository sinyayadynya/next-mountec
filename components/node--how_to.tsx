// ./components/node--how_to.tsx

import { DrupalClient, DrupalNode } from "next-drupal";
import { FormattedText } from "components/formatted-text";
import { DrupalEntity } from "components/entity";
import { DrupalJsonApiParams } from "drupal-jsonapi-params";
import { drupal } from "lib/drupal"
import { getResourceCollection } from 'next-drupal';
import HowToStepSerializer from 'lib/serializers/HowToStepSerializer';

import { ContactSection } from 'components/ContactSection'
import { Container } from 'components/Container'
import { FadeIn } from 'components/FadeIn'
import { GridList, GridListItem } from 'components/GridList'
import { GridPattern } from 'components/GridPattern'
import { List, ListItem } from 'components/List'
import { PageIntro } from 'components/PageIntro'
import { SectionIntro } from 'components/SectionIntro'
import { StylizedImage } from 'components/StylizedImage'
import { useEffect, useState } from "react"

import { Blockquote } from 'components/Blockquote'
import { TagList, TagListItem } from 'components/TagList'

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
    howToData: any; // Replace 'any' with the specific type if known
}


const client = new DrupalClient(process.env.NEXT_PUBLIC_DRUPAL_BASE_URL);

export async function getStaticProps() {
    const howToData = await client.getResourceCollection("/jsonapi/node/how_to");

    // Manually apply the custom serializer to the 'how_to_step' paragraphs
    const serializedHowToData = howToData.map((node) => {
      if (node.type === 'paragraph--how_to_step') {
        return HowToStepSerializer(node);
      }
      return node;
    });

    return {
      props: {
        howToData: serializedHowToData,
      },
      revalidate: 60 // Set revalidation time as needed
    };
  }


// export async function getStaticProps() {
//     const howToData = await client.getResourceCollection("/jsonapi/node/how_to")

//     return {
//       props: {
//         howToData,
//       },
//       revalidate: 60 // Set revalidation time as needed
//     }
// }

// interface NodeHowToProps {
//     node: DrupalNode;
//     howToData: any; // You can replace 'any' with the specific type if known
//   }


function Identify() {
    return (
      <Section title="Identify" image={{ src: processStep1 }}>
        <div className="space-y-6 text-base text-neutral-600">
          <p>
            Delving deeper than the surface, we embark on an in-depth, systematic{' '}
            <strong className="font-semibold text-neutral-950">exploration</strong>{' '}of your organization&apos;s untapped <strong className="font-semibold text-neutral-950">opportunities</strong>.
          </p>
          <p>
            Using an array of <strong className="font-semibold text-neutral-950">participatory</strong>{' '}tools, we conduct an extensive audit that not only evaluates the current state of your operations but also probes for concealed <strong className="font-semibold text-neutral-950">potential</strong>. We scrutinize key  <strong className="font-semibold text-neutral-950">performance</strong>{' '} indicators, analyze your strategic alignments, and mine raw data to identify hidden patterns. This thorough examination helps us pinpoint areas ripe for innovation and development.
          </p>
          <p>
            <strong className="font-semibold text-neutral-950">Our goal?</strong>{' '}To unravel a comprehensive understanding of your organization&apos;s unique capabilities and growth potentials, setting the stage for a sustainable future.
          </p>
        </div>

        <h3 className="mt-12 font-display text-base font-semibold text-neutral-950">
          Included in this phase
        </h3>
        <TagList className="mt-4">
          <TagListItem>Detailed questionnaires</TagListItem>
          <TagListItem>Industry benchmarking studies</TagListItem>
          <TagListItem>Data mining and analytics</TagListItem>
          <TagListItem>Stakeholder interviews</TagListItem>
          <TagListItem>Potential-capability mapping</TagListItem>
          <TagListItem>Comprehensive audit report</TagListItem>
        </TagList>
      </Section>
    );
  }

  function Cocreate() {
    return (
      <Section title="Co-create" image={{ src: processStep2, shape: 1 }}>
        <div className="space-y-6 text-base text-neutral-600">
          <p>
            Grounded in the insights gathered from our exhaustive exploration, we foster a space for collaborative strategy development. We facilitate interactive workshops that unite key stakeholders, harnessing their collective expertise to carve out a bespoke set of recommendations. In these sessions, ideas are shared, possibilities are explored, and priorities are refined.
            </p>
          <p>
            This participatory approach allows us to produce an astute roadmap, one that truly echoes your ambitions and addresses your unique challenges.
          </p>
          <p>
            By weaving together collective intelligence and our strategic insights, we design an actionable plan that paves the way to your desired future.
          </p>
        </div>

        <Blockquote
          author={{ name: 'Debra Fiscal', role: 'CEO of Unseal' }}
          className="mt-12"
        >
          Mountec Corp. were so regular with their progress updates we almost began to
          think they were automated!
        </Blockquote>
      </Section>
      )
  }

  function Nurture() {
    return (
      <Section title="Nurture" image={{ src: processStep3, shape: 2 }}>
        <div className="space-y-6 text-base text-neutral-600">
          <p>
            True to our commitment to collective achievement, we frame our project support around a mutually agreed-upon{' '}
            <strong className="font-semibold text-neutral-950">roadmap</strong>
            . This roadmap, serving as our guiding star, helps us navigate through the implementation phase, ensuring our efforts are harmonized with your strategic objectives.
          </p>
          <p>
            We stay involved every step of the way, offering continual assistance, monitoring{' '}
            <strong className="font-semibold text-neutral-950">progress</strong>{' '}
            and making necessary adjustments to keep us on track. By fostering a steady communication line with all stakeholders, we ensure transparency and inspire confidence in our approach.
          </p>
          <p>
            This{' '}
            <strong className="font-semibold text-neutral-950">
                synergistic
            </strong>{' '}
            journey not only reinforces our commitment to your project but also assures that we are heading towards a future defined by shared success and sustainability.
          </p>
        </div>

        <h3 className="mt-12 font-display text-base font-semibold text-neutral-950">
          Included in this phase
        </h3>
        <List className="mt-8">
          <ListItem title="Project adaptation and validation.">
            We tweak plans to match project dynamics, validating each step. Adaptability, not rigidity, rules our approach.
          </ListItem>
          <ListItem title="Infrastructure integration.">
            We ensure new developments blend with your existing setup, maintaining a seamless operational continuity.
          </ListItem>
          <ListItem title="Continued support and monitoring.">
            Our consistent support and monitoring doesn&apos;t end after implementation. We&apos;re always there, ensuring smooth operations.
          </ListItem>
        </List>
      </Section>
    )
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
        <Section title={data.schemaName} image={{ src: processStep1 }}>
            <div className="space-y-6 text-base text-neutral-600 [&>ul]:mt-4 [&>ul]:flex [&>ul]:flex-wrap [&>ul>:gap-4 [&>ul>li]:rounded-full [&>ul>li]:bg-neutral-100 [&>ul>li]:px-4 [&>ul>li]:py-1.5 [&>ul>li]:text-base [&>ul>li]:text-neutral-600 [&>h3]:mt-12 [&>h3]:font-display [&>h3]:text-base [&>h3]:font-semibold [&>h3]:text-neutral-950">
                {/* <FormattedText processed={data.description.processed} /> */}
                {data.schemaDescription}
            </div>
        </Section>
    );
}

function StepType2({ data }) {
    return (
        <Section title={data.schemaName} image={{ src: processStep2, shape: 1 }}>
            <div className="space-y-6 text-base text-neutral-600 [&>ul]:mt-4 [&>ul]:flex [&>ul]:flex-wrap [&>ul]:gap-4 [&>ul>li]:rounded-full [&>ul>li]:bg-neutral-100 [&>ul>li]:px-4 [&>ul>li]:py-1.5 [&>ul>li]:text-base [&>ul>li]:text-neutral-600 [&>h3]:mt-12 [&>h3]:font-display [&>h3]:text-base [&>h3]:font-semibold [&>h3]:text-neutral-950">
                {/* <FormattedText processed={data.description.processed} /> */}
                {data.schemaDescription}
            </div>
        </Section>
    );
}

function StepType3({ data }) {
    return (
        <Section title={data.schemaName} image={{ src: processStep3, shape: 2 }}>
            <div className="space-y-6 text-base text-neutral-600 [&>ul]:mt-4 [&>ul]:flex [&>ul]:flex-wrap [&>ul]:gap-4 [&>ul>li]:rounded-full [&>ul>li]:bg-neutral-100 [&>ul>li]:px-4 [&>ul>li]:py-1.5 [&>ul>li]:text-base [&>ul>li]:text-neutral-600 [&>h3]:mt-12 [&>h3]:font-display [&>h3]:text-base [&>h3]:font-semibold [&>h3]:text-neutral-950">
                {/* <FormattedText processed={data.description.processed} /> */}
                {data.schemaDescription}
            </div>
        </Section>
    );
}

function Values() {
    const [data, setData] = useState(null);

    useEffect(() => {
      fetch(`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/api/values`)
        .then(response => response.json())
        .then(data => setData(data));
    }, []);

    // If data is null, render nothing
    if (!data) {
      return null;
    }

    // Render the block data
    return (
      <div className="relative mt-24 pt-24 sm:mt-32 sm:pt-32 lg:mt-40 lg:pt-40">
        <div className="absolute inset-x-0 top-0 -z-10 h-[884px] overflow-hidden rounded-t-4xl bg-gradient-to-b from-neutral-50">
          <GridPattern
            className="absolute inset-0 h-full w-full fill-neutral-100 stroke-neutral-950/5 [mask-image:linear-gradient(to_bottom_left,white_40%,transparent_50%)]"
            yOffset={-270}
          />
        </div>

        <SectionIntro
          eyebrow={data[0].title}
          title={data[0].headline}
        >
          <p>
            {data[0].description}
          </p>
        </SectionIntro>

        <Container className="mt-24">
          <GridList className="">
            {data.map((item, index) => (
              <GridListItem key={index} title={item.item_name} className="">
                {item.item_description}
              </GridListItem>
            ))}
          </GridList>
        </Container>
      </div>
    );
}




export function NodeHowTo({ node, howToData, ...props }: NodeHowToProps) {
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

                {/* <div className="mt-24 space-y-24 [counter-reset:section] sm:mt-32 sm:space-y-32 lg:mt-40 lg:space-y-40">


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

                </div> */}

            <div className="mt-24 space-y-24 [counter-reset:section] sm:mt-32 sm:space-y-32 lg:mt-40 lg:space-y-40">
                <Identify />
                <Cocreate />
                <Nurture />
            </div>


            </article>

            <Values />

            <ContactSection />
        </>

    );
}
