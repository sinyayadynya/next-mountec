import { DrupalMedia } from "next-drupal";

interface MediaVideoProps {
  media: DrupalMedia;
}

export function MediaVideo({ media, ...props }: MediaVideoProps) {
  return (
    <div {...props}>
      {media.field_media_video_file && (
        <div className="mb-4">
          <h3 className="sr-only">Video file</h3>
          {/* file */}
          <pre>{JSON.stringify(media.field_media_video_file, null, 2)}</pre>
        </div>
      )}

      {media.video && (
        <div className="mb-4">
          <h3 className="mb-1 text-2xl">Video</h3>
          <div>{media.video}</div>
        </div>
      )}
    </div>
  );
}
