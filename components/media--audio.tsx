import { DrupalMedia } from "next-drupal";

interface MediaAudioProps {
  media: DrupalMedia;
}

export function MediaAudio({ media, ...props }: MediaAudioProps) {
  return (
    <div {...props}>
      {media.content_url && (
        <div className="mb-4">
          <h3 className="sr-only">Audio file</h3>
          {/* file */}
          <pre>{JSON.stringify(media.content_url, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
