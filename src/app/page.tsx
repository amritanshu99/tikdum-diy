import Image from "next/image";
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
              Explore the collection <span aria-hidden="true">↗︎</span>
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

        <Link
          href="/about"
          className="hero__art hero__art--brand reveal"
          aria-label="Meet Neha and Sneha, the makers behind Tikdum DIY"
        >
          <div className="hero__image-wrap">
            <Image
              src="/images/brand/tikdum-diy-logo.webp"
              alt="Tikdum DIY — it is all about art and craft, by Neha and Sneha"
              className="hero__image"
              fill
              preload
              sizes="(max-width: 900px) calc(100vw - 2.5rem), 52vw"
            />
            <span className="hero__image-label" aria-hidden="true">
              Tikdum DIY · Art &amp; craft
            </span>
          </div>
          <div className="hero__caption">
            <div>
              <span>The studio</span>
              <strong>Tikdum DIY</strong>
            </div>
            <p>Neha &amp; Sneha · India</p>
          </div>
        </Link>
      </section>

      <section className="collection-section page-gutter">
        <header className="section-heading reveal">
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
              eager={index === 0}
            />
          ))}
        </div>

        <div className="section-end-link reveal">
          <Link href="/artworks" className="text-link">
            View all artworks <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section
        className="makers-feature page-gutter reveal"
        aria-labelledby="home-makers-title"
      >
        <div className="makers-feature__visual">
          <Image
            src="/images/brand/tikdum-diy-founders.webp"
            alt="Neha and Sneha, the makers behind Tikdum DIY"
            fill
            sizes="(max-width: 700px) calc(100vw - 2.2rem), min(92vw, 86rem)"
          />
        </div>
        <div className="makers-feature__caption">
          <div>
            <p className="eyebrow">Meet the makers</p>
            <h2 id="home-makers-title">
              Two imaginations, <em>one joyful studio.</em>
            </h2>
          </div>
          <p>
            Tikdum DIY is made by Neha and Sneha—a shared space for colourful
            ideas, handmade experiments, and stories that make creativity feel
            welcoming.
          </p>
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
            About Tikdum DIY <span aria-hidden="true">↗︎</span>
          </Link>
        </div>
        <div className="manifesto__mark" aria-hidden="true">
          T
        </div>
      </section>

      <section className="journal-section page-gutter">
        <header className="section-heading section-heading--journal reveal">
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
            <article
              className="journal-card reveal"
              data-reveal-delay={index * 100}
              key={post._id}
            >
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
                    eager={index === 0}
                    sizes="(max-width: 800px) 100vw, 48vw"
                  />
                </div>
                <div className="journal-card__meta">
                  <time dateTime={post.publishedAt}>
                    {formatDate(post.publishedAt)}
                  </time>
                  <span>Journal</span>
                </div>
                <h3>{post.title}</h3>
                {post.excerpt ? (
                  <p className="journal-card__excerpt">{post.excerpt}</p>
                ) : null}
                <span className="journal-card__read" aria-hidden="true">
                  Read story <span aria-hidden="true">↗︎</span>
                </span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="closing-note page-gutter reveal">
        <p className="eyebrow">A living collection</p>
        <h2>New work, honest process, and small reasons to keep looking.</h2>
        <Link
          href="/artworks"
          className="circle-link"
          aria-label="Browse artworks"
        >
          Browse
          <span aria-hidden="true">↗︎</span>
        </Link>
      </section>
    </>
  );
}
