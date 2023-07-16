import { DrupalJsonApiParams } from "drupal-jsonapi-params"

export function getParams(resourceType: string) {
  const apiParams = new DrupalJsonApiParams().addFilter(
    "field_site.meta.drupal_internal__target_id",
    process.env.DRUPAL_SITE_ID
  )

  if (resourceType === "node--about_page") {
    apiParams.addInclude([ "uid", "primary_image_of_page", "primary_image_of_page.image"])
    apiParams.addFields(resourceType, [
      "name",
      "text",
      "uid",
      "created",
      "primary_image_of_page",
      "status",
      "metatag",
    ])
  }

  if (resourceType === "node--article") {
    apiParams.addInclude(["uid", "image", ])
    apiParams.addFields(resourceType, [
      "title",
      "body",
      "uid",
      "created",
      "field_image",
      "status",
      "metatag",
    ])
  }

  return apiParams.getQueryObject()
}

// export const RESOURCE_INCLUDES = {
//     "node--about_page":
//         "uid,about,primary_image_of_page,primary_image_of_page.uid,primary_image_of_page.thumbnail,primary_image_of_page.image",
//     "node--article": "uid,image,keywords,author,author.uid,author.image",
//     "node--event":
//         "uid,image,image.uid,image.thumbnail,image.image,location,location.uid,location.image,organizer,organizer.uid,organizer.image,performer,performer.uid,performer.image",
//     "node--organization": "uid,image,image.uid,image.thumbnail,image.image",
//     "node--page":
//         "uid,primary_image_of_page,primary_image_of_page.uid,primary_image_of_page.thumbnail,primary_image_of_page.image",
//     "node--person": "uid,image,image.uid,image.thumbnail,image.image",
//     "node--place": "uid,image,image.uid,image.thumbnail,image.image",
// };
