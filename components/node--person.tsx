import { DrupalNode } from "next-drupal";
import { FormattedText } from "components/formatted-text";
import { DrupalEntity } from "components/entity";

interface NodePersonProps {
  node: DrupalNode;
}

export function NodePerson({ node, ...props }: NodePersonProps) {
  return (
    <article {...props}>
      <h1 className="mb-4 text-6xl">{node.title}</h1>

      <section>
        {/* <h2 className="mb-2 text-4xl">General information</h2> */}

        {node.description?.processed && (
          <div className="mb-4">
            {/* <h3 className="mb-1 text-2xl">Description</h3> */}
            <FormattedText processed={node.description.processed} />
          </div>
        )}
      </section>

      <section>
        {/* <h2 className="mb-2 text-4xl">Media/Assets</h2> */}

        {/* {node.image && (
          <div className="mb-4">
            <h3 className="mb-1 text-2xl">Image</h3>
            <DrupalEntity entity={node.image} />
          </div>
        )} */}
      </section>

      {/* <section>
        <h2 className="mb-2 text-4xl">Biographical information</h2>

        {node.additional_name && (
          <div className="mb-4">
            <h3 className="mb-1 text-2xl">Middle name</h3>
            <div>{node.additional_name}</div>
          </div>
        )}

        {node.family_name && (
          <div className="mb-4">
            <h3 className="mb-1 text-2xl">Last name</h3>
            <div>{node.family_name}</div>
          </div>
        )}

        {node.gender && (
          <div className="mb-4">
            <h3 className="mb-1 text-2xl">Gender</h3>
            <div>{node.gender}</div>
          </div>
        )}

        {node.given_name && (
          <div className="mb-4">
            <h3 className="mb-1 text-2xl">First name</h3>
            <div>{node.given_name}</div>
          </div>
        )}

        {node.honorific_prefix && (
          <div className="mb-4">
            <h3 className="mb-1 text-2xl">Honorific prefix</h3>
            <div>{node.honorific_prefix}</div>
          </div>
        )}

        {node.honorific_suffix && (
          <div className="mb-4">
            <h3 className="mb-1 text-2xl">Honorific suffix</h3>
            <div>{node.honorific_suffix}</div>
          </div>
        )}

        {node.knows_language && (
          <div className="mb-4">
            <h3 className="mb-1 text-2xl">Knows languages</h3>
            <div>
              {node.knows_language.map((value, i) => (
                <div key={i}>{value}</div>
              ))}
            </div>
          </div>
        )}
      </section> */}

      <section>
        <h2 className="mb-2 text-4xl">Contact information</h2>

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

      {/* <section>
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
      </section> */}
    </article>
  );
}
