import Image from 'next/image';
import Link from 'next/link';
import { DrupalNode } from 'next-drupal';
import { FormattedText } from "components/formatted-text";

import { absoluteUrl } from 'lib/absolute-url';
import { formatDate } from 'lib/format-date';

import { Border } from 'components/Border'
import { Button } from 'components/Button'
import { FadeIn } from 'components/FadeIn'


interface NodeArticleTeaserProps {
    node: DrupalNode;
}

export function NodeArticleTeaser({ node, ...props }: NodeArticleTeaserProps) {
    return (
        <FadeIn key={node.id}>
            <article {...props}>

                <Border className="pt-16">
                  <div className="relative lg:-mx-4 lg:flex lg:justify-end">
                    <div className="pt-10 lg:w-2/3 lg:flex-none lg:px-4 lg:pt-0">
                      <h2 className="font-display text-2xl font-semibold text-neutral-950">

                            <Link
                                href={node.path.alias}
                                passHref
                            >
                                {node.title}
                            </Link>
                        </h2>


                        <dl className="lg:absolute lg:left-0 lg:top-0 lg:w-1/3 lg:px-4">
                            <dt className="sr-only">Published</dt>
                            <dd className="absolute left-0 top-0 text-sm text-neutral-950 lg:static">
                                <time dateTime={node.created}>
                                    {formatDate(node.created)}
                                </time>
                            </dd>
                            {node.uid?.display_name ? (
                                <>
                                    <dt className="sr-only">Author</dt>
                                    <dd className="mt-6 flex gap-x-4">
                                        {/* <div className="flex-none overflow-hidden rounded-xl bg-neutral-100">
                                            <Image
                                                alt=""
                                                {...article.author.image}
                                                className="h-12 w-12 object-cover grayscale"
                                            />
                                            {node.author.image}
                                        </div> */}
                                        <div className="text-sm text-neutral-950">
                                            <div className="font-semibold">
                                                {node.uid?.display_name}
                                            </div>
                                            {/* <div>
                                                {article.author.role}
                                            </div> */}
                                        </div>
                                    </dd>
                                </>
                            ) : null}

                        </dl>

                            {node.description?.processed && (
                                <div className="mt-6 max-w-2xl text-base text-neutral-600">
                                    <FormattedText processed={node.description.processed} />
                                </div>
                            )}

                        <Button
                            href={node.path.alias}
                            aria-label={`Read more: ${node.title}`}
                            className="mt-8"
                        >
                            Read more
                        </Button>

                    </div>
                </div>
            </Border>



            </article>
        </FadeIn>
    );
}
