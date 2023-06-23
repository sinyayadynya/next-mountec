import * as React from "react";
import { DrupalMedia } from "next-drupal";

import { MediaAudio } from "components/media--audio";
import { MediaDocument } from "components/media--document";
import { MediaImage } from "components/media--image";
import { MediaRemoteVideo } from "components/media--remote_video";
import { MediaVideo } from "components/media--video";
import { DrupalEntity } from "components/entity";

interface MediaPageProps {
  resource: DrupalMedia;
}

export function Media({ resource }: MediaPageProps) {
  switch (resource.type) {
    case "media--audio":
      return <MediaAudio media={resource} />;

    case "media--document":
      return <MediaDocument media={resource} />;

    case "media--image":
      return <MediaImage media={resource} />;

    case "media--remote_video":
      return <MediaRemoteVideo media={resource} />;

    case "media--video":
      return <MediaVideo media={resource} />;

    default:
      return <DrupalEntity entity={resource} />;
  }
}
