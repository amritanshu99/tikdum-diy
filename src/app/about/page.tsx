import type { Metadata } from "next";

import { ArtworkImage } from "@/components/artwork-image";

export const metadata: Metadata = {
  title: "About",
  description:
    "TikDum is an independent space for art, process, and thoughtful making.",
  alternates: { canonical: "/about" },
};

const principles = [
  {
    number: "01",
    title: "Look closely",
    copy: "Attention is a creative act. We make room for work that rewards time, curiosity, and more than one reading.",
  },
  {
    number: "02",
    title: "Keep the hand visible",
    copy: "Texture, irregularity, and evidence of process are part of the work—not details to be polished away.",
  },
  {
    number: "03",
    title: "Live with art",
    copy: "Art belongs in everyday life: beside books, above tables, and in the rooms where ordinary days unfold.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="about-hero">
        <div className="about-hero__copy reveal">
          <p className="eyebrow">About TikDum</p>
          <h1>A home for thoughtful making.</h1>
        </div>
        <div className="about-hero__visual reveal">
          <ArtworkImage
            artwork={{
              title: "Garden Glyphs",
              localImage: "/images/art/botanical-rhythm.png",
            }}
            className="journal-card__image"
            priority
            sizes="(max-width: 700px) 100vw, 50vw"
          />
        </div>
      </section>

      <section className="about-story page-gutter">
        <p className="eyebrow">The beginning</p>
        <div className="about-story__body">
          <p>
            TikDum began with a simple idea: the things we make and live with
            can help us pay better attention.
          </p>
          <p>
            This is an evolving collection of original art, material studies,
            and honest notes from the studio. Phase one is intentionally small;
            it leaves room for the work, the voice, and the community to grow.
          </p>
        </div>
      </section>

      <section className="about-principles" aria-label="Our principles">
        {principles.map((principle) => (
          <article className="about-principle" key={principle.number}>
            <span>{principle.number}</span>
            <h2>{principle.title}</h2>
            <p>{principle.copy}</p>
          </article>
        ))}
      </section>
    </>
  );
}
