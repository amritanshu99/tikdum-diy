import {
  PortableText,
  type PortableTextComponents,
} from "next-sanity";

import { SanityImage } from "@/components/sanity-image";
import type { CmsImage, PortableContent } from "@/sanity/types";

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
  marks: {
    link: ({ children, value }) => {
      const href =
        typeof value?.href === "string" ? value.href : "#";
      const external = href.startsWith("http");

      return (
        <a
          href={href}
          {...(external ? { rel: "noreferrer", target: "_blank" } : {})}
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      const image = value as CmsImage;

      if (!image.asset) return null;

      return (
        <figure className="portable-image">
          <div>
            <SanityImage
              src={image}
              alt={image.alt ?? ""}
              fill
              sizes="(max-width: 760px) 100vw, 760px"
            />
          </div>
          {image.alt ? <figcaption>{image.alt}</figcaption> : null}
        </figure>
      );
    },
  },
};

type PortableContentProps = {
  value?: PortableContent;
  fallback?: string[];
};

export function PortableContentView({
  value,
  fallback,
}: PortableContentProps) {
  if (value?.length) {
    return <PortableText value={value} components={components} />;
  }

  return fallback?.map((paragraph) => <p key={paragraph}>{paragraph}</p>);
}
