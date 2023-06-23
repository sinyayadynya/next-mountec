import { JsonApiResource } from "next-drupal/src/types"
import {
  DrupalMedia,
  DrupalNode,
  DrupalTaxonomyTerm,
  DrupalUser,
} from "next-drupal"
import Link from "next/link"

import { User } from "components/user"
import { Media } from "components/media"

interface DrupalEntityProps {
  entity: JsonApiResource
}

export function DrupalEntity({ entity, ...props }: DrupalEntityProps) {
  // Handle missing entities.
  // @see https://www.drupal.org/docs/8/modules/json-api/core-concepts#missing
  if (entity.id === "missing") {
    return <></>
  }

  const type = entity.type.split("--")[0]
  switch (type) {
    case "media":
      const resource = entity as DrupalMedia
      return <Media resource={resource} />

    case "node":
      const node = entity as DrupalNode
      return (
        <Link
            href={node.path.alias}
            passHref
            className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
        >
            {node.title}
        </Link>
      )

    case "taxonomy_term":
      const term = entity as DrupalTaxonomyTerm;
      return <div>{term.name}</div>

    case "user":
      const user = entity as DrupalUser;
      return <User user={user} />

    default:
      const json = JSON.stringify(entity, null, 2);
      return <pre>{json}</pre>
  }
}
