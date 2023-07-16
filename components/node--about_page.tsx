import { DrupalNode } from "next-drupal";
import { FormattedText } from "components/formatted-text";
import { DrupalEntity } from "components/entity";
import Image from "next/image"

import { Border } from 'components/Border'
import { ContactSection } from 'components/ContactSection'
import { Container } from 'components/Container'
import { FadeIn, FadeInStagger } from 'components/FadeIn'
import { GridList, GridListItem } from 'components/GridList'
import { PageIntro } from 'components/PageIntro'
import { PageLinks } from 'components/PageLinks'
import { SectionIntro } from 'components/SectionIntro'
import { StatList, StatListItem } from 'components/StatList'

import { drupal } from 'lib/drupal'
import { useEffect, useState } from 'react';


interface NodePageProps {
  node: DrupalNode;
}

export const metadata = {
    title: 'About Us',
    description:
      'We believe that our strength lies in our collaborative approach, which puts our clients at the center of everything we do.',
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

function Team({ team }) {
    return (
      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <div className="space-y-24">
          <FadeInStagger>
            <Border as={FadeIn} />
            <div className="grid grid-cols-1 gap-6 pt-12 sm:pt-16 lg:grid-cols-4 xl:gap-8">
              <FadeIn>
                <h2 className="font-display text-2xl font-semibold text-neutral-950">
                  Team
                </h2>
              </FadeIn>
              <div className="lg:col-span-3">
                <ul
                  role="list"
                  className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8"
                >
                  {team.map((person) => (
                    <li key={person.id}>
                      <FadeIn>
                        <div className="group relative overflow-hidden rounded-3xl bg-neutral-100">
                          <Image
                            alt=""
                            src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${person.image}`}
                            width={900}
                            height={1200}
                            className="h-96 w-full object-cover grayscale transition duration-500 motion-safe:group-hover:scale-105"
                          />
                          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black to-black/0 to-40% p-6">
                            <p className="font-display text-base/6 font-semibold tracking-wide text-white">
                              {person.name}
                            </p>
                            <p className="mt-2 text-sm text-white">
                              {person.role}
                            </p>
                          </div>
                        </div>
                      </FadeIn>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeInStagger>
        </div>
      </Container>
    )
  }



  export function NodeAboutPage({ node, ...props }: NodePageProps) {
    const [team, setTeam] = useState([]);
    const [blogArticles, setBlogArticles] = useState([]);

    useEffect(() => {
      async function fetchTeam() {
        const response = await fetch(`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/api/team`);
        const data = await response.json();
        setTeam(data);
      }

      async function fetchBlogArticles() {
        const nodes = await drupal.getResourceCollection<DrupalNode[]>(
          "node--article",
          {
            params: {
              "filter[status]": 1,
              "fields[node--article]": "title,path,image,uid,created,description",
              include: "image,uid",
              sort: "-created",
              "page[limit]": 4,
            },
          }
        )
        setBlogArticles(nodes);
      }

      fetchTeam();
      fetchBlogArticles();
    }, []);

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


        <Team team={team} />

        <PageLinks
            className="mt-24 sm:mt-32 lg:mt-40"
            title="From the blog"
            intro="Our team of skilled territorial developers and tourism professionals is committed to fostering sustainable prosperity. Through comprehensive diagnostics to sustainable tourism strategies, we focus on enriching communities and preserving natural beauty."
            pages={blogArticles}
        />


        <ContactSection />

    </article>
  );
}
