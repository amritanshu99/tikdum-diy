import type { Metadata } from "next";

import { ArtworkCard } from "@/components/artwork-card";
import { getArtworks } from "@/sanity/lib/data";

export const metadata: Metadata = {
  title: "Artworks",
  description:
    "Explore original artworks and material studies from the TikDum collection.",
  alternates: { canonical: "/artworks" },
};

export default async function ArtworksPage() {
  const artworks = await getArtworks();

  return (
    <>
      <header className="page-intro page-gutter reveal">
        <div>
          <p className="eyebrow">The collection</p>
          <h1>Artworks</h1>
        </div>
        <p className="page-intro__copy">
          Original works and studio studies shaped by colour, material, and a
          curiosity for the ordinary.
        </p>
      </header>
      <section className="archive-grid page-gutter" aria-label="Artwork collection">
        <div className="art-grid">
          {artworks.map((artwork, index) => (
            <ArtworkCard
              key={artwork._id}
              artwork={artwork}
              index={index}
              large={index % 3 === 0}
              eager={index === 0}
            />
          ))}
        </div>
      </section>
    </>
  );
}
