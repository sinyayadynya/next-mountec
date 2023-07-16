import * as React from "react"
import { GetStaticPathsResult, GetStaticPropsResult } from "next"
import Head from "next/head"
import { DrupalNode } from "next-drupal"
// import { DrupalMenuLinkContent } from 'next-drupal';
import { DrupalJsonApiParams } from 'drupal-jsonapi-params';

import { drupal } from "lib/drupal"
// import { getMenus } from '../lib/get-menus'


import { RootLayout } from "components/RootLayout"
import { Metatag } from "components/metatag"
import { Node, RESOURCE_TYPES, RESOURCE_INCLUDES } from "components/node"

interface NodePageProps {
    resource: DrupalNode;
    // menus: {
    //   main: DrupalMenuLinkContent[];
    //   footer: DrupalMenuLinkContent[];
    // };
  }

export default function NodePage({
    // menus,
    resource
}: NodePageProps) {
    // console.log('menus:', menus);

  if (!resource) return null

  return (
    <RootLayout
        // menus={menus}
    >
      <Head>
        <title>{resource.title}</title>
        {resource.metatag && <Metatag data={resource.metatag} />}
      </Head>
      <Node resource={resource} />
    </RootLayout>
  )
}

export async function getStaticPaths(context): Promise<GetStaticPathsResult> {
  return {
    paths: await drupal.getStaticPathsFromContext(RESOURCE_TYPES, context),
    fallback: "blocking",
  }
}

export async function getStaticProps(
  context
): Promise<GetStaticPropsResult<NodePageProps>> {
  const path = await drupal.translatePathFromContext(context)

  if (!path) {
    return {
      notFound: true,
    }
  }

  const type = path.jsonapi.resourceName

//   let params = {}
//   if (RESOURCE_INCLUDES[type]) {
//     params = {
//       include: RESOURCE_INCLUDES[type],
//     }
//   }


  const params = new DrupalJsonApiParams();

  if (type === 'node--page') {
    params.addInclude(['primary_image_of_page.image']);
  }

  if (type === 'node--about_page') {
    params
        .addInclude(['primary_image_of_page.image'])
        .addFields('node--person', ['name', 'path']);
  }

  if (type === 'node--article') {
    params
      .addInclude(['uid'])
      .addFields('node--article', ['title', 'path', 'image', 'uid', 'created', 'description', 'article_body']);
  }

  if (type === 'node--case_study') {
    params
      .addInclude(['uid'])
      .addInclude(['image.image'])
      .addInclude(['source_organization'])
      .addInclude(['subject_of'])
      .addInclude(['about'])
      .addFields('node--case_study', ['title', 'path', 'image', 'uid', 'created', 'source_organization', 'copyright_year', 'teaches', 'is_based_on', 'description', 'article_body', 'about']);
  }

  if (type === 'node--contact_page') {
    params.addInclude(['primary_image_of_page.image']);
  }

  if (type === 'node--how_to') {
    params
      .addInclude(['step'])
      .addFields('paragraph--how_to_step', ['name', 'description', 'image']);
  }

  if (type === 'node--person') {
    params.addInclude(['image.image']);
  }

  const resource = await drupal.getResourceFromContext<DrupalNode>(
    path,
    context,
    {
      params,
    }
  )

  // At this point, we know the path exists and it points to a resource.
  // If we receive an error, it means something went wrong on Drupal.
  // We throw an error to tell revalidation to skip this for now.
  // Revalidation can try again on next request.
  if (!resource) {
    throw new Error(`Failed to fetch resource: ${path.jsonapi.individual}`)
  }

  // If we're not in preview mode and the resource is not published,
  // Return page not found.
  if (!context.preview && resource?.status === false) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      resource,
    //   menus: await getMenus(context),
    },
  }
}
