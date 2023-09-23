// ./components/node--about_page.tsx

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

const aboutCultureSerializer = require("../lib/serializers/aboutCultureSerializer");



interface NodeAboutPageProps {
    node: DrupalNode;
    data: any; // or replace 'any' with the specific type of your serialized data
  }

  export async function getStaticProps() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/jsonapi/node/about_page`);
    const data = await response.json();

    const serializedAboutPage = aboutCultureSerializer.serialize(data);

    return {
      props: {
        data: serializedAboutPage,
      },
      revalidate: 60 // Set revalidation time as needed
    };
  }



export const metadata = {
    title: 'About Us',
    description:
      'We believe that our strength lies in our collaborative approach, which puts our clients at the center of everything we do.',
}

function Culture({ data }) {
    console.log("Culture data:", data);

    return (
      <div className="mt-24 rounded-4xl bg-neutral-950 py-24 sm:mt-32 lg:mt-40 lg:py-32">
        <SectionIntro
          eyebrow={data?.label}
          title={data?.alternate_name}
          invert
        >
          <p>{data?.body}</p>
        </SectionIntro>
        <Container className="mt-16">
          <GridList>
            {data?.item_list_element?.map((item, index) => (
              <GridListItem key={index} title={item.item} invert>
                {item?.description}
              </GridListItem>
            ))}
          </GridList>
        </Container>
      </div>
    );
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

export function NodeAboutPage({ node, data: { data } }: NodeAboutPageProps) {

// export function NodeAboutPage({ node: { data: node }, data: { data } }: NodeAboutPageProps) {


    const [team, setTeam] = useState([]);
    const [blogArticles, setBlogArticles] = useState([]);

    useEffect(() => {
      async function fetchTeam() {
        const response = await fetch(`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/api/team`);
        const data = await response.json();
        setTeam(data);
      }

      async function fetchBlogArticles() {
        try {
          const nodes = await drupal.getResourceCollection<DrupalNode[]>(
            "node--article",
            {
              params: {
                "filter[status]": 1,
                "fields[node--article]": "title,path,image,uid,created,description",
                include: "image,uid",
                sort: "-created",
                "page[limit]": 2,
              },
            }
          )
          setBlogArticles(nodes);
        } catch (error) {
          console.error('Failed to fetch blog articles:', error);
        }
      }

      fetchTeam();
      fetchBlogArticles();
    }, []);

    return (
    <article>
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



        <Culture data={data} />


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
