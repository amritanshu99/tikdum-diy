import Image from "next/image";

import { SanityImage } from "@/components/sanity-image";
import type { ArtworkRecord, JournalPostRecord } from "@/sanity/types";

type VisualRecord = Pick<ArtworkRecord, "title" | "image" | "localImage"> &
  Partial<Pick<ArtworkRecord, "artist">> &
  Partial<Pick<JournalPostRecord, "coverImage">>;

type ArtworkImageProps = {
  artwork: VisualRecord;
  className?: string;
  eager?: boolean;
  sizes: string;
};

const fallbackBlurDataUrl =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='50' viewBox='0 0 40 50'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop stop-color='%23d8c9af'/%3E%3Cstop offset='.55' stop-color='%23eee7d9'/%3E%3Cstop offset='1' stop-color='%23c77c59'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath fill='url(%23g)' d='M0 0h40v50H0z'/%3E%3C/svg%3E";

export function ArtworkImage({
  artwork,
  className,
  eager = false,
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
        loading={eager ? "eager" : "lazy"}
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
        loading={eager ? "eager" : "lazy"}
        placeholder="blur"
        blurDataURL={fallbackBlurDataUrl}
        sizes={sizes}
      />
    );
  }

  return <div className="artwork-image-placeholder" aria-hidden="true" />;
}
