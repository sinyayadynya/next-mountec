import Image from 'next/image';
import Link from 'next/link';
import { DrupalNode } from 'next-drupal';
import { FormattedText } from "components/formatted-text";

import { absoluteUrl } from 'lib/absolute-url';
import { formatDate } from 'lib/format-date';

import { Border } from 'components/Border'
import { Button } from 'components/Button'
import { FadeIn } from 'components/FadeIn'


interface NodeCaseStudyTeaserProps {
    node: DrupalNode;
}

export function NodeCaseStudyTeaser({ node, ...props }: NodeCaseStudyTeaserProps) {
    return (
        <FadeIn key={node.id}>
            <article {...props}>

                <Border className="grid grid-cols-3 gap-x-8 gap-y-8 pt-16">

                    <div className="col-span-full sm:flex sm:items-center sm:justify-between sm:gap-x-8 lg:col-span-1 lg:block">
                        <div className="sm:flex sm:items-center sm:gap-x-6 lg:block">
                            {/* <Image /> */}
                            <h3 className="mt-6 text-sm font-semibold text-neutral-950 sm:mt-0 lg:mt-8">
                                {node.title}
                            </h3>
                        </div>
                        <div className="mt-1 flex gap-x-4 sm:mt-0 lg:block">
                            <p className="text-sm tracking-tight text-neutral-950 after:ml-4 after:font-semibold after:text-neutral-300 after:content-['/'] lg:mt-2 lg:after:hidden">
                                {node.teaches}
                            </p>

                            <p className="text-sm text-neutral-950 lg:mt-2">
                                <time dateTime={node.copyright_year}>
                                    {node.copyright_year}
                                </time>
                            </p>
                        </div>
                    </div>

                    <div className="col-span-full lg:col-span-2 lg:max-w-2xl">

                        <p className="font-display text-4xl font-medium text-neutral-950">
                            <Link href={node.path.alias}>
                                {node.title}
                            </Link>
                        </p>

                        {node.description?.processed && (
                            <div className="mt-6 space-y-6 text-base text-neutral-600">
                                <FormattedText processed={node.description.processed} />
                            </div>
                        )}

                        <div className="mt-8 flex">
                            <Button
                                href={node.path.alias}
                                aria-label={`Read case study: ${node.title}`}
                            >
                                Read case study
                            </Button>
                        </div>

                        {/* {caseStudy.testimonial && (
                            <Blockquote
                                author={caseStudy.testimonial.author}
                                className="mt-12"
                            >
                            {caseStudy.testimonial.content}
                            </Blockquote>
                        )} */}

                    </div>

                </Border>

            </article>
        </FadeIn>
    );
}
