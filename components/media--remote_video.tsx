import { DrupalMedia } from "next-drupal";

interface MediaRemoteVideoProps {
  media: DrupalMedia;
}

export function MediaRemoteVideo({ media, ...props }: MediaRemoteVideoProps) {
  return (
    <div {...props}>
      {media.video && (
        <div className="mb-4">
          <div>{media.video}</div>
        </div>
      )}
    </div>
  );
}
