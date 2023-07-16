import { DrupalNode } from 'next-drupal';
import { FormattedText } from 'components/formatted-text';
import { DrupalImage } from 'components/image';
import { DrupalEntity } from 'components/entity';
import clsx from 'clsx'


import { ContactSection } from 'components/ContactSection'
import { Container } from 'components/Container'
import { FadeIn } from 'components/FadeIn'
import { PageLinks } from 'components/PageLinks'
import { formatDate } from 'lib/format-date';


interface NodeArticleProps {
    node: DrupalNode;
}

export function NodeArticle({ node, ...props }: NodeArticleProps) {
    return (
        <article {...props}>

            <Container as="article" className="mt-24 sm:mt-32 lg:mt-40">
                <FadeIn>
                    <header className="mx-auto flex max-w-5xl flex-col text-center">
                        <h1 className="mt-6 font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-6xl">
                            {node.title}
                        </h1>
                        <time
                            dateTime={node.created}
                            className="order-first text-sm text-neutral-950"
                        >
                            {formatDate(node.created)}
                        </time>
                        <p className="mt-6 text-sm font-semibold text-neutral-950">
                            by {node.uid?.display_name}
                            {/* , {node.author.role} */}
                        </p>
                    </header>
                </FadeIn>

                {node.article_body?.processed && (
                    <FadeIn>
                        <div className="mt-24 sm:mt-32 lg:mt-40">
                            <div className={clsx('[&>*]:mx-auto [&>*]:max-w-3xl [&>:first-child]:!mt-0 [&>:last-child]:!mb-0'
                            // , className
                            )}>
                                <div className='typography'>
                                    <FormattedText
                                        processed={node.article_body.processed}
                                    />
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                )}

                {/* <section>
                    {node.image && (
                        <div className="mb-4">
                            <DrupalImage image={node.image} />
                        </div>
                    )}
                </section> */}

                {/* <section>
                    {node.keywords && (
                        <div className="mb-4">
                            <h3 className="mb-1 text-2xl">Tags</h3>
                            <div>
                                {node.keywords.map((item, i) => (
                                    <DrupalEntity key={i} entity={item} />
                                ))}
                            </div>
                        </div>
                    )}
                </section> */}

            </Container>

            {/* {moreArticles.length > 0 && (
                    <PageLinks
                    className="mt-24 sm:mt-32 lg:mt-40"
                    title="More articles"
                    pages={moreArticles}
                    />
                )} */}

            <ContactSection />
        </article>
    );
}
