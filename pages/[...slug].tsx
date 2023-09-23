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
    const paths = await drupal.getStaticPathsFromContext(RESOURCE_TYPES, context);

    // Exclude the conflicting paths
    const filteredPaths = paths.filter(
      (pathObj) => {
        if (typeof pathObj === 'string') {
          return !['/about', '/work', '/blog', '/'].includes(pathObj);
        } else if (pathObj.params && pathObj.params.slug) {
          const pathString = '/' + pathObj.params.slug.join('/');
          return !['/about', '/work', '/blog', '/'].includes(pathString);
        }
        return true;
      }
    );

    return {
      paths: filteredPaths,
      fallback: "blocking",
    };
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
      .addInclude(['subject_of.author'])
      .addInclude(['subject_of.author.image']) // Include the image field of the author
      .addInclude(['subject_of.author.image.image'])
      .addInclude(['has_part']) // Include the has_part field
      .addFields('node--case_study', ['title', 'path', 'image', 'uid', 'created', 'source_organization', 'copyright_year', 'teaches', 'is_based_on', 'description', 'article_body', 'about', 'subject_of', 'has_part', 'field_key_results'])
      .addFields('node--recommendation', ['author', 'text']) // replace 'node--recommendation' with the correct entity type for the 'subject_of' entity
      .addFields('node--person', ['title', 'job_title', 'image']) // Include the image field in the fields for the person entity
      .addFields('node--organization', ['title', 'logo'])
      .addFields('paragraph--data_catalog', ['dataset']); // Include the dataset field in the fields for the data_catalog entity
}

  if (type === 'node--organization') {
    params
    .addInclude(['logo.image'])
    .addFields('node--organization', ['title', 'path', 'image', 'logo']);
  }

  if (type === 'node--contact_page') {
    params.addInclude(['primary_image_of_page.image']);
  }

  if (type === 'node--how_to') {
    params
      .addInclude(['step', 'main_entity'])
      .addFields('paragraph--how_to_step', ['name', 'description', 'image'])
      .addFields('paragraph--block', ['name', 'alternate_name', 'text', 'item_list_element']);
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
