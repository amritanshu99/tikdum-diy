import type {
  ArtworkRecord,
  JournalPostRecord,
  SiteSettingsRecord,
} from "@/sanity/types";

export const fallbackArtworks: ArtworkRecord[] = [
  {
    _id: "starter-earth-memory",
    title: "Earth Memory I",
    slug: "earth-memory-i",
    artist: "Tikdum DIY",
    year: 2026,
    medium: "Pigment, graphite and collage",
    featured: true,
    localImage: "/images/art/earth-memory.png",
    descriptionText:
      "A study in warm mineral tones, layered surfaces, and the quiet marks that materials carry over time.",
  },
  {
    _id: "starter-after-rain",
    title: "After Rain",
    slug: "after-rain",
    artist: "Tikdum DIY",
    year: 2026,
    medium: "Oil and cold wax study",
    featured: true,
    localImage: "/images/art/monsoon-study.png",
    descriptionText:
      "Indigo, mist, and a rust-coloured seam gather into a landscape that sits somewhere between memory and weather.",
  },
  {
    _id: "starter-garden-glyphs",
    title: "Garden Glyphs",
    slug: "garden-glyphs",
    artist: "Tikdum DIY",
    year: 2026,
    medium: "Gouache, ink and cut paper",
    featured: false,
    localImage: "/images/art/botanical-rhythm.png",
    descriptionText:
      "A playful arrangement of botanical silhouettes, handmade edges, and small repeating signs.",
  },
];

export const fallbackPosts: JournalPostRecord[] = [
  {
    _id: "starter-looking-slowly",
    title: "A slower way of looking",
    slug: "a-slower-way-of-looking",
    excerpt:
      "What changes when we give an image more than a passing glance?",
    publishedAt: "2026-08-18T09:00:00.000Z",
    localImage: "/images/art/monsoon-study.png",
    fallbackBody: [
      "Looking is often treated as an instant act. We decide what something is, whether we like it, and then move on. Art asks for a different pace.",
      "Stay with an image long enough and its first impression begins to loosen. Texture comes forward. A small colour starts to hold the composition together. The work becomes less like an answer and more like a place.",
      "This journal is a space for that slower attention: notes on materials, process, ordinary objects, and the images that continue to unfold after we leave them.",
    ],
  },
  {
    _id: "starter-handmade-images",
    title: "Why handmade images still matter",
    slug: "why-handmade-images-still-matter",
    excerpt:
      "Irregular edges and visible decisions give an image its human temperature.",
    publishedAt: "2026-07-02T09:00:00.000Z",
    localImage: "/images/art/botanical-rhythm.png",
    fallbackBody: [
      "A handmade image contains evidence of time. A brush hesitates, paper lifts at an edge, and one colour refuses to behave exactly like the last.",
      "These are not defects to be cleaned away. They are records of attention. They let us feel the distance between an idea and the hand that tried to give it form.",
      "Tikdum DIY is interested in that distance—in making, revising, and sharing work whose surfaces still remember how they came to be.",
    ],
  },
];

export const fallbackSiteSettings: SiteSettingsRecord = {
  title: "Tikdum DIY",
  description:
    "An independent space for art, process, and the pleasure of making.",
};
