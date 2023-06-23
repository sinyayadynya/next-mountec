import Image from "next/image";
import { DrupalFile } from "next-drupal";
import { absoluteUrl } from "lib/absolute-url";

interface DrupalImageProps {
  image: DrupalFile;
}

export function DrupalImage({ image, ...props }: DrupalImageProps) {
  return (
    <figure {...props}>
      <Image
        src={absoluteUrl(image.uri.url)}
        width={768}
        height={400}
        layout="responsive"
        objectFit="cover"
        alt={image.resourceIdObjMeta.alt}
        priority
      />

      {image.resourceIdObjMeta.title && (
        <figcaption className="py-2 text-sm text-center text-gray-600">
          {image.resourceIdObjMeta.title}
        </figcaption>
      )}
    </figure>
  );
}
