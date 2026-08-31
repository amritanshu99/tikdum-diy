import type { Metadata } from "next";
import Link from "next/link";

import { ArtworkImage } from "@/components/artwork-image";
import { getPosts } from "@/sanity/lib/data";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Studio notes on art, materials, attention, and the pleasure of making.",
  alternates: { canonical: "/journal" },
};

function formatDate(value?: string) {
  if (!value) return "Field notes";

  return new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export default async function JournalPage() {
  const posts = await getPosts();

  return (
    <>
      <header className="page-intro page-gutter reveal">
        <div>
          <p className="eyebrow">Notes from the studio</p>
          <h1>Journal</h1>
        </div>
        <p className="page-intro__copy">
          Essays, observations, and fragments from a practice built around
          looking closely and making slowly.
        </p>
      </header>

      <section className="journal-list page-gutter" aria-label="Journal stories">
        {posts.map((post, index) => (
          <Link
            href={`/journal/${post.slug}`}
            className="journal-row reveal"
            data-reveal-delay={Math.min(index, 3) * 70}
            key={post._id}
          >
            <time className="journal-row__date" dateTime={post.publishedAt}>
              {formatDate(post.publishedAt)}
            </time>
            <div>
              <h2>{post.title}</h2>
              {post.excerpt ? (
                <p className="journal-row__excerpt">{post.excerpt}</p>
                ) : null}
              <span className="journal-row__cta" aria-hidden="true">
                Read story <span aria-hidden="true">↗︎</span>
              </span>
            </div>
            <div className="journal-row__visual">
              <ArtworkImage
                artwork={{
                  title: post.title,
                  coverImage: post.coverImage,
                  localImage: post.localImage,
                }}
                className="journal-card__image"
                eager={index === 0}
                sizes="(max-width: 700px) 100vw, 30vw"
              />
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
