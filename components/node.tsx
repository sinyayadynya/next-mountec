import * as React from "react";
import { DrupalNode } from "next-drupal";

import { NodeArticle } from "components/node--article";
import { NodeEvent } from "components/node--event";
import { NodeOrganization } from "components/node--organization";
import { NodePage } from "components/node--page";
import { NodePerson } from "components/node--person";
import { NodePlace } from "components/node--place";
import { DrupalEntity } from "components/entity";

export const RESOURCE_TYPES = [
  "node--article",
  "node--event",
  "node--organization",
  "node--page",
  "node--person",
  "node--place",
];

export const RESOURCE_INCLUDES = {
  "node--article": "uid,image,keywords,author,author.uid,author.image",
  "node--event":
    "uid,image,image.uid,image.thumbnail,image.image,location,location.uid,location.image,organizer,organizer.uid,organizer.image,performer,performer.uid,performer.image",
  "node--organization": "uid,image,image.uid,image.thumbnail,image.image",
  "node--page":
    "uid,primary_image_of_page,primary_image_of_page.uid,primary_image_of_page.thumbnail,primary_image_of_page.image",
  "node--person": "uid,image,image.uid,image.thumbnail,image.image",
  "node--place": "uid,image,image.uid,image.thumbnail,image.image",
};

interface NodePageProps {
  resource: DrupalNode;
}

export function Node({ resource }: NodePageProps) {
  switch (resource.type) {
    case "node--article":
      return <NodeArticle node={resource} />;

    case "node--event":
      return <NodeEvent node={resource} />;

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
