import * as React from "react";
import { DrupalNode } from "next-drupal";
import { DrupalJsonApiParams } from 'drupal-jsonapi-params';

import { NodeAboutPage } from "components/node--about_page";
import { NodeArticle } from "components/node--article";
import { NodeCaseStudy } from "components/node--case_study";
import { NodeContactPage } from "components/node--contact_page";
import { NodeEvent } from "components/node--event";
import { NodeHowTo } from "components/node--how_to";
import { NodeOrganization } from "components/node--organization";
import { NodePage } from "components/node--page";
import { NodePerson } from "components/node--person";
import { NodePlace } from "components/node--place";
import { DrupalEntity } from "components/entity";

export const RESOURCE_TYPES = [
    "node--about_page",
    "node--article",
    "node--case_study",
    "node--contact_page",
    "node--event",
    "node--how_to",
    "node--organization",
    "node--page",
    "node--person",
    "node--place",
    "node--recommendation",
];

export const RESOURCE_INCLUDES = {
    "node--about_page":
        "uid,about,primary_image_of_page,primary_image_of_page.uid,primary_image_of_page.thumbnail,primary_image_of_page.image,offers",
    "node--article": "uid,image,keywords,author,author.uid,author.image",
    "node--case_study": "uid,image,image.uid,image.thumbnail,image.image,keywords,author,author.uid,author.image,source_organization,source_organization.uid,source_organization.title,copyright_year,teaches,is_based_on,about,about.name,about.variable_measured,subject_of,has_part",
    "node--case_study--card": "uid,image,image.uid,image.thumbnail,image.image,keywords,author,author.uid,author.image,source_organization,source_organization.uid,source_organization.title,copyright_year,teaches,is_based_on",
    "node--case_study--teaser": "uid,image,image.uid,image.thumbnail,image.image,keywords,author,author.uid,author.image,source_organization,source_organization.uid,source_organization.title,copyright_year,teaches,is_based_on,about,about.name,about.variable_measured,subject_of",
    "node--contact_page":
        "uid,primary_image_of_page,primary_image_of_page.uid,primary_image_of_page.thumbnail,primary_image_of_page.image",
    "node--event":
        "uid,image,image.uid,image.thumbnail,image.image,location,location.uid,location.image,organizer,organizer.uid,organizer.image,performer,performer.uid,performer.image",
    "node--how_to":
        "uid,image,image.uid,image.thumbnail,image.image,step,step.uid,step.image,step.image.thumbnail,step.image.image,step.description",
    "node--organization": "uid,image,image.uid,image.thumbnail,image.image,logo,logo.image",
    "node--page":
        "uid,primary_image_of_page,primary_image_of_page.uid,primary_image_of_page.thumbnail,primary_image_of_page.image",
    "node--person": "uid,image,image.uid,image.thumbnail,image.image",
    "node--place": "uid,image,image.uid,image.thumbnail,image.image",
    "node--recommendation": "uid",
};

interface NodePageProps {
  resource: DrupalNode;
}

export function Node({ resource }: NodePageProps) {
  switch (resource.type) {
    // case "node--about_page":
    //     return <NodeAboutPage node={resource} data={{}} />;

    case "node--article":
      return <NodeArticle node={resource} />;

    case "node--case_study":
        return <NodeCaseStudy node={resource} />;

    case "node--contact_page":
        return <NodeContactPage node={resource} />;

    case "node--event":
      return <NodeEvent node={resource} />;

    case "node--how_to":
        return <NodeHowTo node={resource} howToData={resource} />;

    case "node--organization":
      return <NodeOrganization node={resource} />;

    case "node--page":
      return <NodePage node={resource} />;

    case "node--person":
      return <NodePerson node={resource} />;

    case "node--place":
      return <NodePlace node={resource} />;

    default:
      return <DrupalEntity entity={resource} />;
  }
}
