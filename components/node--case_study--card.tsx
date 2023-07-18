import Image from 'next/image';
import Link from 'next/link';
import { DrupalNode } from 'next-drupal';
import { FormattedText } from "components/formatted-text";

import { absoluteUrl } from 'lib/absolute-url';
import { formatDate } from 'lib/format-date';

import { Border } from 'components/Border'
import { Button } from 'components/Button'
import { FadeIn } from 'components/FadeIn'


interface NodeCaseStudyCardProps {
    node: DrupalNode;
}

export function NodeCaseStudyCard({ node, ...props }: NodeCaseStudyCardProps) {
    return (
        <FadeIn key={node.id} className="flex">
            <article {...props} className="relative flex w-full flex-col rounded-3xl p-6 ring-1 ring-neutral-950/5 transition hover:bg-neutral-50 sm:p-8">

                <h3>
                  <Link href={node.path.alias}>
                        <span className="absolute inset-0 rounded-3xl" />
                        <Image
                                src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${node.source_organization.logo[2].image.uri.url}`}
                                alt={node.source_organization.logo[2].image.resourceIdObjMeta.alt}
                                width={64} // replace with your desired width
                                height={64} // replace with your desired height
                                className="h-16 w-16 flex-none"
                                unoptimized
                            />
                    </Link>
                </h3>
                <p className="mt-6 flex gap-x-2 text-sm text-neutral-950">
                  <time dateTime={node.copyright_year} className="font-semibold">
                    {node.copyright_year}
                  </time>
                  <span className="text-neutral-300" aria-hidden="true">
                    /
                  </span>
                  <span>Case study</span>
                </p>
                <p className="mt-6 font-display text-2xl font-semibold text-neutral-950">
                  {node.title}
                </p>

                {node.description?.processed && (
                    <div className="mt-4 text-base text-neutral-600">
                        <FormattedText processed={node.description.processed} />
                    </div>
                )}

            </article>
        </FadeIn>
    );
}
