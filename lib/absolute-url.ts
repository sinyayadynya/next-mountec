export function absoluteUrl(uri: string) {
  return `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${uri}`;
}
