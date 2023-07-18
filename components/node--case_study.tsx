import { DrupalNode } from 'next-drupal';
import { FormattedText } from 'components/formatted-text';
import { DrupalImage } from 'components/image';
import { DrupalEntity } from 'components/entity';
import clsx from 'clsx'

import { Blockquote } from 'components/Blockquote';
import { ContactSection } from 'components/ContactSection'
import { Container } from 'components/Container'
import { FadeIn } from 'components/FadeIn'
import { GrayscaleTransitionImage } from 'components/GrayscaleTransitionImage'
import { PageIntro } from 'components/PageIntro'
import { PageLinks } from 'components/PageLinks'
import { StatList, StatListItem } from 'components/StatList';
import { formatDate } from 'lib/format-date';
import { MediaImage } from './media--image';
import { absoluteUrl } from 'lib/absolute-url';
import { useEffect, useState } from 'react';
import { drupal } from 'lib/drupal';


interface NodeCaseStudyProps {
    node: DrupalNode;
}

export function NodeCaseStudy({ node, ...props }: NodeCaseStudyProps) {
    const [caseStudies, setCaseStudies] = useState([]);

        useEffect(() => {
            async function fetchCaseStudies() {
            const nodes = await drupal.getResourceCollection<DrupalNode[]>(
                "node--case_study",
                {
                params: {
                    "filter[status]": 1,
                    "fields[node--case_study]": "title,path,image,uid,created,description",
                    include: "image,uid",
                    sort: "-created",
                    "page[limit]": 2,
                },
                }
            )
            setCaseStudies(nodes);
            }

            fetchCaseStudies();
        }, []);

        console.log(node.has_part)

        return (

        <>
            <article className="mt-24 sm:mt-32 lg:mt-40" {...props}>

                <header>
                    <PageIntro eyebrow="Case Study" title={node.title} centered>
                    {node.article_body?.processed && (
                        <FormattedText
                            processed={node.description.processed}
                        />
                    )}
                    </PageIntro>

                    <FadeIn>
                        <div className="mt-24 border-t border-neutral-200 bg-white/50 sm:mt-32 lg:mt-40">
                        <Container>
                            <div className="mx-auto max-w-5xl">
                            <dl className="-mx-6 grid grid-cols-1 text-sm text-neutral-950 sm:mx-0 sm:grid-cols-3">
                                <div className="border-t border-neutral-200 px-6 py-4 first:border-t-0 sm:border-l sm:border-t-0">
                                    <dt className="font-semibold">Client</dt>
                                    <dd>{node.source_organization.title}</dd>
                                </div>
                                <div className="border-t border-neutral-200 px-6 py-4 first:border-t-0 sm:border-l sm:border-t-0">
                                    <dt className="font-semibold">Year</dt>
                                    <dd>
                                        <time dateTime={node.dcopyright_year}>
                                            {node.copyright_year}
                                        </time>
                                    </dd>
                                </div>
                                <div className="border-t border-neutral-200 px-6 py-4 first:border-t-0 sm:border-l sm:border-t-0">
                                    <dt className="font-semibold">Service</dt>
                                    <dd>{node.teaches}</dd>
                                </div>
                            </dl>
                            </div>
                        </Container>
                        </div>

                        <div className="border-y border-neutral-200 bg-neutral-100">
                            <div className="-my-px mx-auto max-w-[76rem] bg-neutral-200">
                                {/* <MediaImage media={node.image} /> */}

                                {node.image && (
                                    <GrayscaleTransitionImage
                                        src={absoluteUrl(node.image.image.uri.url)}
                                        width={node.image.image.resourceIdObjMeta.width}
                                        height={node.image.image.resourceIdObjMeta.height}
                                        quality={90}
                                        className="w-full"
                                        sizes="(min-width: 1216px) 76rem, 100vw"
                                        priority
                                    />
                                )}

                            </div>
                        </div>
                    </FadeIn>
                </header>

                <div className='mx-auto max-w-7xl px-6 lg:px-8 mt-24 sm:mt-32 lg:mt-40'>

                    <div className="mx-auto max-w-2xl lg:max-w-none">

                        <div className='[&>*]:mx-auto [&>*]:max-w-3xl [&>:first-child]:!mt-0 [&>:last-child]:!mb-0'>

                            {node.article_body?.processed && (
                                <FadeIn>
                                    <div className="mt-24 sm:mt-32 lg:mt-40">
                                        <div className={clsx('[&>*]:mx-auto [&>*]:max-w-3xl [&>:first-child]:!mt-0 [&>:last-child]:!mb-0')}>
                                            <div className='typography'>
                                                <h2>Overview</h2>
                                                <FormattedText processed={node.article_body.processed} />
                                                {node.is_based_on && node.is_based_on.length > 0 && (
                                                    <h2>What we did</h2>
                                                )}
                                            </div>
                                            {node.is_based_on && node.is_based_on.length > 0 && (
                                                <ul className="my-6 flex flex-wrap gap-4">
                                                    {node.is_based_on.map((link, index) => (
                                                    <li key={index} className='rounded-full bg-neutral-100 px-4 py-1.5 text-base text-neutral-600'>
                                                        {link.uri === 'route:<nolink>' ? link.title : <a href={link.uri}>{link.title}</a>}
                                                    </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </div>
                                </FadeIn>
                            )}

                        {node.subject_of && node.subject_of.length > 0 && (
                            <div className="mt-36">
                                {node.subject_of.map((recommendation, i) => (
                                    <Blockquote
                                        key={i}
                                        author={{
                                            name: recommendation.author.title,
                                            role: recommendation.author.job_title,
                                        }}
                                        image={{
                                            src: `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${recommendation.author.image.image.uri.url}`,
                                            alt: recommendation.author.title,
                                            width: 1800, // replace with actual width
                                            height: 1800, // replace with actual height
                                        }}
                                    >
                                        {recommendation.text.processed}
                                    </Blockquote>
                                ))}
                            </div>
                        )}

                        </div>

                        <div className='my-32 !max-w-none [&>div:items-start]'>
                            <StatList>
                                {node.has_part.map((part, i) => (
                                    <StatListItem key={i} label={part.name} value={part.variable_measured} />
                                ))}
                            </StatList>
                        </div>


                    </div>

                </div>

            </article>

            <PageLinks
                className="mt-24 sm:mt-32 lg:mt-40"
                title="More case studies"
                intro=""
                pages={caseStudies}
            />

            <ContactSection />
        </>
    );
}
