import { DrupalNode } from "next-drupal";
import { FormattedText } from "components/formatted-text";
import { DrupalEntity } from "components/entity";

interface NodeEventProps {
  node: DrupalNode;
}

export function NodeEvent({ node, ...props }: NodeEventProps) {
  return (
    <article {...props}>
      <h1 className="mb-4 text-6xl">{node.title}</h1>

      <section>
        <h2 className="mb-2 text-4xl">General information</h2>

        {node.description?.processed && (
          <div className="mb-4">
            <h3 className="mb-1 text-2xl">Description</h3>
            <FormattedText processed={node.description.processed} />
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

        {node.image && (
          <div className="mb-4">
            <h3 className="mb-1 text-2xl">Image</h3>
            <DrupalEntity entity={node.image} />
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-2 text-4xl">Event information</h2>

        {node.event_schedule && (
          <div className="mb-4">
            <h3 className="mb-1 text-2xl">Event schedule</h3>
            {/* smartdate */}
            <pre>{JSON.stringify(node.event_schedule, null, 2)}</pre>
          </div>
        )}

        {node.event_status && (
          <div className="mb-4">
            <h3 className="mb-1 text-2xl">Event status</h3>
            <div>{node.event_status}</div>
          </div>
        )}

        {node.location && (
          <div className="mb-4">
            <h3 className="mb-1 text-2xl">Location</h3>
            <DrupalEntity entity={node.location} />
          </div>
        )}

        {node.organizer && (
          <div className="mb-4">
            <h3 className="mb-1 text-2xl">Organizers</h3>
            <div>
              {node.organizer.map((item, i) => (
                <DrupalEntity key={i} entity={item} />
              ))}
            </div>
          </div>
        )}

        {node.performer && (
          <div className="mb-4">
            <h3 className="mb-1 text-2xl">Performers</h3>
            <div>
              {node.performer.map((item, i) => (
                <DrupalEntity key={i} entity={item} />
              ))}
            </div>
          </div>
        )}
      </section>
    </article>
  );
}
