import { DrupalMedia } from "next-drupal";
import { DrupalImage } from "components/image";

interface MediaImageProps {
  media: DrupalMedia;
}

export function MediaImage({ media, ...props }: MediaImageProps) {
  return (
    <div {...props}>
      {media.image && (
        <div className="mb-4">
          <h3 className="sr-only">Image</h3>
          <DrupalImage image={media.image} />
        </div>
      )}
    </div>
  );
}
