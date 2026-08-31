import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArtworkImage } from "@/components/artwork-image";
import { PortableContentView } from "@/components/portable-content";
import { ReadingProgress } from "@/components/reading-progress";
import { getPostBySlug, getPosts } from "@/sanity/lib/data";

type JournalPostPageProps = {
  params: Promise<{ slug: string }>;
};

function formatDate(value?: string) {
  if (!value) return "Field notes";

  return new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: JournalPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/journal/${post.slug}` },
  };
}

export default async function JournalPostPage({
  params,
}: JournalPostPageProps) {
  const { slug } = await params;
  const [post, posts] = await Promise.all([getPostBySlug(slug), getPosts()]);

  if (!post) notFound();

  const hasCover = Boolean(post.coverImage?.asset || post.localImage);
  const currentIndex = posts.findIndex((item) => item.slug === post.slug);
  const nextPost =
    posts.length > 1
      ? posts[(currentIndex + 1 + posts.length) % posts.length]
      : undefined;

  return (
    <article id="journal-article">
      <ReadingProgress targetId="journal-article" />
      <header className="article-header reveal">
        <p className="eyebrow">
          Journal ·{" "}
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        </p>
        <h1>{post.title}</h1>
        {post.excerpt ? (
          <p className="article-header__excerpt">{post.excerpt}</p>
        ) : null}
      </header>

      {hasCover ? (
        <div className="article-cover reveal">
          <ArtworkImage
            artwork={{
              title: post.title,
              coverImage: post.coverImage,
              localImage: post.localImage,
            }}
            className="journal-card__image"
            eager
            sizes="(max-width: 900px) 100vw, 82rem"
          />
        </div>
      ) : null}

      <div className="article-body">
        <PortableContentView value={post.body} fallback={post.fallbackBody} />
        <Link href="/journal" className="text-link back-link">
          <span aria-hidden="true">←</span> Back to journal
        </Link>
      </div>

      {nextPost ? (
        <aside className="article-next page-gutter reveal" aria-label="Next story">
          <p className="eyebrow">Continue reading</p>
          <Link href={`/journal/${nextPost.slug}`}>
            <span>{nextPost.title}</span>
            <span aria-hidden="true">↗︎</span>
          </Link>
        </aside>
      ) : null}
    </article>
  );
}
