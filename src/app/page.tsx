import Link from "next/link";

import { ArtworkCard } from "@/components/artwork-card";
import { ArtworkImage } from "@/components/artwork-image";
import {
  getArtworks,
  getPosts,
  getSiteSettings,
} from "@/sanity/lib/data";

function formatDate(value?: string) {
  if (!value) return "Field notes";

  return new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export default async function Home() {
  const [artworks, posts, settings] = await Promise.all([
    getArtworks(),
    getPosts(),
    getSiteSettings(),
  ]);
  const heroArtwork = artworks[0];

  return (
    <>
      <section className="hero page-gutter">
        <div className="hero__copy reveal">
          <p className="eyebrow">Independent art studio · India</p>
          <h1>
            Art for slower
            <span>ways of seeing.</span>
          </h1>
          <p className="hero__intro">
            {settings.description ??
              "A considered collection of original work, material experiments, and stories from the studio."}
          </p>
          <div className="hero__actions">
            <Link href="/artworks" className="button button--dark">
              Explore the collection <span aria-hidden="true">↗</span>
            </Link>
            <Link href="/journal" className="text-link">
              Read the journal <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="hero__note">
            <span>01</span>
            <p>
              Made with attention
              <br />
              Shared with intention
            </p>
          </div>
        </div>

        {heroArtwork ? (
          <Link
            href={`/artworks/${heroArtwork.slug}`}
            className="hero__art reveal"
            aria-label={`View ${heroArtwork.title}`}
          >
            <div className="hero__image-wrap">
              <ArtworkImage
                artwork={heroArtwork}
                className="hero__image"
                priority
                sizes="(max-width: 900px) 100vw, 52vw"
              />
            </div>
            <div className="hero__caption">
              <div>
                <span>Featured work</span>
                <strong>{heroArtwork.title}</strong>
              </div>
              <p>
                {[heroArtwork.artist, heroArtwork.year]
                  .filter(Boolean)
                  .join(", ")}
              </p>
            </div>
          </Link>
        ) : null}
      </section>

      <section className="collection-section page-gutter">
        <header className="section-heading">
          <div>
            <p className="eyebrow">Selected works · 2026</p>
            <h2>From the collection</h2>
          </div>
          <p>
            Studies in colour, texture, and the fragments of everyday life that
            stay with us.
          </p>
        </header>

        <div className="art-grid">
          {artworks.slice(0, 3).map((artwork, index) => (
            <ArtworkCard
              key={artwork._id}
              artwork={artwork}
              index={index}
              large={index === 0}
            />
          ))}
        </div>

        <div className="section-end-link">
          <Link href="/artworks" className="text-link">
            View all artworks <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className="manifesto">
        <div className="manifesto__index">02</div>
        <div className="manifesto__content reveal">
          <p className="eyebrow eyebrow--light">Our point of view</p>
          <blockquote>
            We believe the things we live with can invite us to pause, notice,
            and feel more at home in our own lives.
          </blockquote>
          <Link href="/about" className="button button--light">
            About TikDum <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="manifesto__mark" aria-hidden="true">
          T
        </div>
      </section>

      <section className="journal-section page-gutter">
        <header className="section-heading section-heading--journal">
          <div>
            <p className="eyebrow">Notes from the studio</p>
            <h2>The journal</h2>
          </div>
          <Link href="/journal" className="text-link">
            All stories <span aria-hidden="true">→</span>
          </Link>
        </header>

        <div className="journal-grid">
          {posts.slice(0, 2).map((post, index) => (
            <article className="journal-card reveal" key={post._id}>
              <Link href={`/journal/${post.slug}`}>
                <div
                  className={`journal-card__image-wrap ${
                    index === 1 ? "journal-card__image-wrap--wide" : ""
                  }`}
                >
                  <ArtworkImage
                    artwork={{
                      title: post.title,
                      coverImage: post.coverImage,
                      localImage: post.localImage,
                    }}
                    className="journal-card__image"
                    sizes="(max-width: 800px) 100vw, 48vw"
                  />
                </div>
                <div className="journal-card__meta">
                  <p>{formatDate(post.publishedAt)}</p>
                  <span>Journal</span>
                </div>
                <h3>{post.title}</h3>
                {post.excerpt ? (
                  <p className="journal-card__excerpt">{post.excerpt}</p>
                ) : null}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="closing-note page-gutter">
        <p className="eyebrow">A living collection</p>
        <h2>New work, honest process, and small reasons to keep looking.</h2>
        <Link
          href="/artworks"
          className="circle-link"
          aria-label="Browse artworks"
        >
          Browse
          <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </>
  );
}
