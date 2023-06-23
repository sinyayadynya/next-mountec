import { DrupalNode } from 'next-drupal';
import { FormattedText } from 'components/formatted-text';
import { DrupalImage } from 'components/image';
import { DrupalEntity } from 'components/entity';

interface NodeArticleProps {
    node: DrupalNode;
}

export function NodeArticle({ node, ...props }: NodeArticleProps) {
    return (
        <article {...props}>
            <h1 className="mb-4 text-6xl">{node.title}</h1>

            <section>
                <h2 className="mb-2 text-4xl">General information</h2>

                {node.article_body?.processed && (
                    <div className="mb-4">
                        <FormattedText
                            processed={node.article_body.processed}
                        />
                    </div>
                )}

                {node.subtype && (
                    <div className="mb-4">
                        <h3 className="mb-1 text-2xl">Subtype</h3>
                        <div>{node.subtype}</div>
                    </div>
                )}

                {node.author && (
                    <div className="mb-4">
                        <h3 className="mb-1 text-2xl">Author</h3>
                        <DrupalEntity entity={node.author} />
                    </div>
                )}
            </section>

            <section>
                <h2 className="mb-2 text-4xl">Media/Assets</h2>

                {node.image && (
                    <div className="mb-4">
                        <DrupalImage image={node.image} />
                    </div>
                )}
            </section>

            <section>
                <h2 className="mb-2 text-4xl">Meta data</h2>

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
            </section>
        </article>
    );
}
