import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Cormorant_Garamond, Manrope } from "next/font/google";

import { MotionObserver } from "@/components/motion-observer";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/config/site";
import { getSiteSettings } from "@/sanity/lib/data";

import "./globals.css";

const displayFont = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  display: "swap",
});

const bodyFont = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
});

const googleAnalyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;
const googleSiteVerification =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const title = settings.title ?? siteConfig.name;
  const description = settings.description ?? siteConfig.description;

  return {
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: "/",
    },
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description,
    keywords: [
      "art",
      "contemporary art",
      "handmade art",
      "art journal",
      "Tikdum DIY",
    ],
    openGraph: {
      type: "website",
      url: siteConfig.url,
      siteName: title,
      title,
      description,
      images: [
        {
          url: "/images/brand/tikdum-diy-social.jpg",
          width: 1200,
          height: 630,
          alt: "Tikdum DIY — art and craft by Neha and Sneha",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/brand/tikdum-diy-social.jpg"],
    },
    verification: googleSiteVerification
      ? { google: googleSiteVerification }
      : undefined,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${displayFont.variable} ${bodyFont.variable}`}>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
        <MotionObserver />
        {googleAnalyticsId ? (
          <GoogleAnalytics gaId={googleAnalyticsId} />
        ) : null}
      </body>
    </html>
  );
}
