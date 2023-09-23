// pages/about.tsx

import Head from "next/head"
import Image from 'next/image'
import { GetStaticPropsResult } from "next"
import { DrupalNode } from "next-drupal"
import { FormattedText } from "components/formatted-text";

import { drupal } from "lib/drupal"
import { RootLayout } from "components/RootLayout"
import { Border } from 'components/Border'
import { Container } from 'components/Container'
import { ContactSection } from 'components/ContactSection'
import { FadeIn, FadeInStagger } from 'components/FadeIn'
import { PageIntro } from 'components/PageIntro'

import { NodeAboutPage } from "components/node--about_page";
const aboutCultureSerializer = require("../lib/serializers/aboutCultureSerializer");

export default function AboutPage({ node, data }) {
    return (
        <RootLayout>
            <Head>
                <title>Mountec Corp</title>
                <meta
                name="description"
                content="A Next.js site powered by a Drupal backend."
                />
            </Head>

            <NodeAboutPage node={node} data={data} />

        </RootLayout>
    )
}

export async function getStaticProps(): Promise<GetStaticPropsResult<{ node: DrupalNode }>> {
    const aboutPageUUID = 'b10c91fe-b5b2-423d-8e09-1da19a96ffc0'; // replace with your UUID

    // Fetch the data for the 'about_page'
    const response = await fetch(`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/jsonapi/node/about_page/${aboutPageUUID}`);
    const aboutPageData = await response.json();

    // Prepare the data for the serializer
    const serializerData = {
      type: aboutPageData.data.type,
      id: aboutPageData.data.id,
      ...aboutPageData.data.attributes,
      ...aboutPageData.data.relationships,
    };

    // Serialize the data
    const serializedAboutPage = aboutCultureSerializer.serialize(serializerData);

    return {
      props: {
        node: serializerData,
        data: serializedAboutPage,
      },
      revalidate: 60, // Set revalidation time as needed
    };
  }
