import { DrupalNode } from "next-drupal";
import { FormattedText } from "components/formatted-text";
import { DrupalEntity } from "components/entity";

interface NodeOrganizationProps {
  node: DrupalNode;
}

export function NodeOrganization({ node, ...props }: NodeOrganizationProps) {
  return (
    <article className='mx-auto max-w-7xl px-6 lg:px-8 mt-24 sm:mt-32 lg:mt-40' {...props}>
        <h1 className='mt-6 block max-w-5xl font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-6xl'>
        {node.title}
        </h1>

      <section>
        <h2 className="mb-2 text-4xl">General information</h2>

        {node.description?.processed && (
          <div className="mb-4">
            <h3 className="mb-1 text-2xl">Description</h3>
            <FormattedText processed={node.description.processed} />
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-2 text-4xl">Media/Assets</h2>

        {node.image && (
          <div className="mb-4">
            <h3 className="mb-1 text-2xl">Image</h3>
            <DrupalEntity entity={node.image} />
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-2 text-4xl">Organization information</h2>

        {node.member_of && (
          <div className="mb-4">
            <h3 className="mb-1 text-2xl">Member of</h3>
            <div>
              {node.member_of.map((value, i) => (
                <div key={i}>{value}</div>
              ))}
            </div>
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-2 text-4xl">Contact information</h2>

        {node.address && (
          <div className="mb-4">
            <h3 className="mb-1 text-2xl">Address</h3>
            {/* address */}
            <pre>{JSON.stringify(node.address, null, 2)}</pre>
          </div>
        )}

        {node.email && (
          <div className="mb-4">
            <h3 className="mb-1 text-2xl">Email</h3>
            <a
              className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
              href={"mailto:" + node.email}
            >
              {node.email}
            </a>
          </div>
        )}

        {node.telephone && (
          <div className="mb-4">
            <h3 className="mb-1 text-2xl">Telephone</h3>
            <a
              className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
              href={"tel:" + node.telephone}
            >
              {node.telephone}
            </a>
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-2 text-4xl">Links</h2>

        {node.same_as && (
          <div className="mb-4">
            <h3 className="mb-1 text-2xl">Same as</h3>
            <div>
              {node.same_as.map((item, i) => (
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
