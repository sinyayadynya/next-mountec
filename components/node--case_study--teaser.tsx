import Image from 'next/image';
import Link from 'next/link';
import { DrupalNode } from 'next-drupal';
import { FormattedText } from "components/formatted-text";

import { absoluteUrl } from 'lib/absolute-url';
import { formatDateMonth } from 'lib/format-date';

import { Blockquote } from 'components/Blockquote'
import { Border } from 'components/Border'
import { Button } from 'components/Button'
import { FadeIn } from 'components/FadeIn'


interface NodeCaseStudyTeaserProps {
    node: DrupalNode;
}

export function NodeCaseStudyTeaser({ node, ...props }: NodeCaseStudyTeaserProps) {
    console.log(node.subject_of);
    // console.log(node.source_organization.logo[2].image);

    return (
        <FadeIn key={node.id}>
            <article {...props}>
                <Border className="grid grid-cols-3 gap-x-8 gap-y-8 pt-16">
                    <div className="col-span-full sm:flex sm:items-center sm:justify-between sm:gap-x-8 lg:col-span-1 lg:block">
                        <div className="sm:flex sm:items-center sm:gap-x-6 lg:block">
                            {/* {node.source_organization?.logo[2]?.image} */}
                            <Image
                                src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${node.source_organization.logo[2].image.uri.url}`}
                                alt={node.source_organization.logo[2].image.resourceIdObjMeta.alt}
                                width={64} // replace with your desired width
                                height={64} // replace with your desired height
                                className="h-16 w-16 flex-none"
                                unoptimized
                            />

                            <h3 className="mt-6 text-sm font-semibold text-neutral-950 sm:mt-0 lg:mt-8">
                                {node.source_organization?.title}
                            </h3>
                        </div>
                        <div className="mt-1 flex gap-x-4 sm:mt-0 lg:block">
                            <p className="text-sm tracking-tight text-neutral-950 after:ml-4 after:font-semibold after:text-neutral-300 after:content-['/'] lg:mt-2 lg:after:hidden">
                                {node.teaches}
                            </p>
                            <p className="text-sm text-neutral-950 lg:mt-2">
                                <time dateTime={node.created}>
                                    {formatDateMonth(node.created)}
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

                        {/* Not using <Blockquote> component because of 'RangeError: Maximum call stack size exceeded' issues */}

                        {node.subject_of.map((recommendation, i) => {
                            const text = recommendation.text?.processed.trim().replace(/<p>|<\/p>/g, match => match === '<p>' ? '<span>' : '</span>');
                            return (
                                <div key={i} className='pl-8 mt-12 relative before:absolute after:absolute before:bg-neutral-950 after:bg-neutral-950/10 before:left-0 before:top-0 before:h-6 before:w-px after:bottom-0 after:left-0 after:top-8 after:w-px'>
                                <figure className="text-sm">
                                    <blockquote className="text-neutral-600 [&>*]:relative [&>:first-child]:before:absolute [&>:first-child]:before:right-full [&>:first-child]:before:content-['“'] [&>:last-child]:after:content-['”']">
                                        <div dangerouslySetInnerHTML={{ __html: text }} />
                                    </blockquote>
                                    <figcaption className="mt-6 font-semibold text-neutral-950">
                                        {recommendation.author?.title}, {recommendation.author?.job_title}
                                    </figcaption>
                                </figure>
                                </div>
                            );
                        })}




                        {/* {node.subject_of && node.subject_of.length > 0 && (
                            <div>
                                {node.subject_of.map((recommendation, i) => (
                                <Blockquote
                                    key={i}
                                    author={{
                                    name: recommendation.author ? recommendation.author.title : '',
                                    role: 'Role of the person' // replace this with the actual role
                                    }}
                                >
                                    {recommendation.text.processed}
                                </Blockquote>
                                ))}
                            </div>
                        )} */}


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
