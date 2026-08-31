import Image from "next/image";

import { SanityImage } from "@/components/sanity-image";
import type { ArtworkRecord, JournalPostRecord } from "@/sanity/types";

type VisualRecord = Pick<ArtworkRecord, "title" | "image" | "localImage"> &
  Partial<Pick<ArtworkRecord, "artist">> &
  Partial<Pick<JournalPostRecord, "coverImage">>;

type ArtworkImageProps = {
  artwork: VisualRecord;
  className?: string;
  priority?: boolean;
  sizes: string;
};

export function ArtworkImage({
  artwork,
  className,
  priority = false,
  sizes,
}: ArtworkImageProps) {
  const cmsImage = artwork.image ?? artwork.coverImage;
  const alt =
    cmsImage?.alt ??
    (artwork.artist
      ? `${artwork.title} by ${artwork.artist}`
      : artwork.title);

  if (cmsImage?.asset) {
    return (
      <SanityImage
        src={cmsImage}
        alt={alt}
        className={className}
        fill
        loading={priority ? "eager" : "lazy"}
        sizes={sizes}
      />
    );
  }

  if (artwork.localImage) {
    return (
      <Image
        src={artwork.localImage}
        alt={alt}
        className={className}
        fill
        loading={priority ? "eager" : "lazy"}
        sizes={sizes}
      />
    );
  }

  return <div className="artwork-image-placeholder" aria-hidden="true" />;
}
