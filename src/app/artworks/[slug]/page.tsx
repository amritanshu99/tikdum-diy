import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArtworkImage } from "@/components/artwork-image";
import { getArtworkBySlug, getArtworks } from "@/sanity/lib/data";

type ArtworkPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const artworks = await getArtworks();
  return artworks.map((artwork) => ({ slug: artwork.slug }));
}

export async function generateMetadata({
  params,
}: ArtworkPageProps): Promise<Metadata> {
  const { slug } = await params;
  const artwork = await getArtworkBySlug(slug);

  if (!artwork) return {};

  return {
    title: artwork.title,
    description:
      artwork.descriptionText ??
      `View ${artwork.title}, an artwork by ${artwork.artist}.`,
    alternates: { canonical: `/artworks/${artwork.slug}` },
  };
}

export default async function ArtworkPage({ params }: ArtworkPageProps) {
  const { slug } = await params;
  const artwork = await getArtworkBySlug(slug);

  if (!artwork) notFound();

  return (
    <article className="art-detail page-gutter">
      <div className="art-detail__visual reveal">
        <ArtworkImage
          artwork={artwork}
          className="art-card__image"
          eager
          sizes="(max-width: 900px) 100vw, 58vw"
        />
      </div>
      <div className="art-detail__copy reveal">
        <p className="eyebrow">From the collection</p>
        <h1>{artwork.title}</h1>
        <p className="art-detail__artist">by {artwork.artist}</p>

        <dl className="art-detail__facts">
          <div>
            <dt>Year</dt>
            <dd>{artwork.year ?? "Ongoing"}</dd>
          </div>
          <div>
            <dt>Medium</dt>
            <dd>{artwork.medium ?? "Mixed media"}</dd>
          </div>
        </dl>

        {artwork.descriptionText ? (
          <p className="art-detail__description">{artwork.descriptionText}</p>
        ) : null}

        <Link href="/artworks" className="text-link back-link">
          <span aria-hidden="true">←</span> Back to collection
        </Link>
      </div>
    </article>
  );
}
