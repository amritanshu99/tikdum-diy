import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About",
  description:
    "Tikdum DIY is an independent space for art, process, and thoughtful making.",
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
          <p className="eyebrow">About Tikdum DIY</p>
          <h1>A home for thoughtful making.</h1>
        </div>
        <div className="about-hero__visual reveal">
          <Image
            src="/images/brand/tikdum-diy-logo.webp"
            alt="Tikdum DIY — it is all about art and craft, by Neha and Sneha"
            fill
            preload
            sizes="(max-width: 700px) 100vw, 50vw"
          />
        </div>
      </section>

      <section className="about-story page-gutter reveal">
        <p className="eyebrow">The beginning</p>
        <div className="about-story__body">
          <p>
            Tikdum DIY began with a simple idea shared by Neha and Sneha: the
            things we make and live with can help us pay better attention.
          </p>
          <p>
            This is an evolving collection of original art, material studies,
            and honest notes from the studio. Phase one is intentionally small;
            it leaves room for the work, the voice, and the community to grow.
          </p>
        </div>
      </section>

      <section className="makers-feature page-gutter reveal" aria-labelledby="makers-title">
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
            <p className="eyebrow">The makers</p>
            <h2 id="makers-title">
              Made together, <em>with joy.</em>
            </h2>
          </div>
          <p>
            Neha and Sneha bring curiosity, colour, and the pleasure of making
            by hand to every story shared here.
          </p>
        </div>
      </section>

      <section className="about-principles" aria-label="Our principles">
        {principles.map((principle) => (
          <article
            className="about-principle reveal"
            data-reveal-delay={Number(principle.number) * 70}
            key={principle.number}
          >
            <span>{principle.number}</span>
            <h2>{principle.title}</h2>
            <p>{principle.copy}</p>
          </article>
        ))}
      </section>
    </>
  );
}
