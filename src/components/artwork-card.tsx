import Link from "next/link";

import { ArtworkImage } from "@/components/artwork-image";
import type { ArtworkRecord } from "@/sanity/types";

type ArtworkCardProps = {
  artwork: ArtworkRecord;
  index?: number;
  large?: boolean;
  eager?: boolean;
};

export function ArtworkCard({
  artwork,
  index = 0,
  large = false,
  eager = false,
}: ArtworkCardProps) {
  const aspectClass =
    index % 3 === 2 ? "art-card__visual--square" : "art-card__visual--portrait";

  return (
    <article
      className={`art-card reveal ${large ? "art-card--large" : ""}`}
      data-reveal-delay={Math.min(index % 3, 2) * 80}
    >
      <Link href={`/artworks/${artwork.slug}`} className="art-card__link">
        <div className={`art-card__visual ${aspectClass}`}>
          <ArtworkImage
            artwork={artwork}
            className="art-card__image"
            eager={eager}
            sizes={
              large
                ? "(max-width: 700px) calc(100vw - 2.5rem), (max-width: 980px) 48vw, min(58vw, 55rem)"
                : "(max-width: 700px) calc(100vw - 2.5rem), (max-width: 980px) 48vw, min(42vw, 40rem)"
            }
          />
          <span className="art-card__view" aria-hidden="true">
            View work <span aria-hidden="true">↗︎</span>
          </span>
        </div>
        <div className="art-card__meta">
          <div>
            <h3>{artwork.title}</h3>
            <p>{artwork.artist}</p>
          </div>
          <p className="art-card__details">
            {[artwork.year, artwork.medium].filter(Boolean).join(" · ")}
          </p>
        </div>
      </Link>
    </article>
  );
}
