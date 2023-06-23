import { DrupalMedia } from "next-drupal";

interface MediaDocumentProps {
  media: DrupalMedia;
}

export function MediaDocument({ media, ...props }: MediaDocumentProps) {
  return (
    <div {...props}>
      {media.field_media_document && (
        <div className="mb-4">
          <h3 className="sr-only">Document</h3>
          {/* file */}
          <pre>{JSON.stringify(media.field_media_document, null, 2)}</pre>
        </div>
      )}

      {media.content_url && (
        <div className="mb-4">
          <h3 className="mb-1 text-2xl">Content URL</h3>
          {/* file */}
          <pre>{JSON.stringify(media.content_url, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
