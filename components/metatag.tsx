import React from "react";

interface DrupalMetatag {
  data: {
    tag: string;
    attributes: [];
  }[];
}

export function Metatag({ data }: DrupalMetatag): JSX.Element {
  const metatags = data.map((metatag, i) => {
    return React.createElement(metatag.tag, { key: i, ...metatag.attributes });
  });

  return <>{metatags}</>;
}
