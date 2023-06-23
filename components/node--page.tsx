import { DrupalNode } from "next-drupal";
import { FormattedText } from "components/formatted-text";
import { DrupalEntity } from "components/entity";

interface NodePageProps {
  node: DrupalNode;
}

export function NodePage({ node, ...props }: NodePageProps) {
  return (
    <article {...props}>
      <h1 className="mb-4 text-6xl">{node.title}</h1>

      <section>
        <h2 className="mb-2 text-4xl">General information</h2>

        {node.text?.processed && (
          <div className="mb-4">
            <FormattedText processed={node.text.processed} />
          </div>
        )}

        {node.subtype && (
          <div className="mb-4">
            <h3 className="mb-1 text-2xl">Subtype</h3>
            <div>{node.subtype}</div>
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-2 text-4xl">Media/Assets</h2>

        {node.primary_image_of_page && (
          <div className="mb-4">
            <h3 className="mb-1 text-2xl">Primary image of page</h3>
            <DrupalEntity entity={node.primary_image_of_page} />
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-2 text-4xl">Links</h2>

        {node.related_link && (
          <div className="mb-4">
            <h3 className="mb-1 text-2xl">Related links</h3>
            <div>
              {node.related_link.map((item, i) => (
                <div key={i}>
                  <a
                    className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
                    href={item.uri}
                  >
                    {item.title || item.uri}
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {node.significant_link && (
          <div className="mb-4">
            <h3 className="mb-1 text-2xl">Significant links</h3>
            <div>
              {node.significant_link.map((item, i) => (
                <div key={i}>
                  <a
                    className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
                    href={item.uri}
                  >
                    {item.title || item.uri}
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </article>
  );
}
