const fallbackUrl = "https://www.tikdumdiy.com";

export const siteConfig = {
  name: "Tikdum DIY",
  description:
    "An independent space for art, process, and the pleasure of making.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? fallbackUrl,
} as const;
