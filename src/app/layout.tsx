import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/config/site";
import { getSiteSettings } from "@/sanity/lib/data";

import "./globals.css";

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
      "TikDum",
    ],
    openGraph: {
      type: "website",
      url: siteConfig.url,
      siteName: title,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
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
    <html lang="en">
      <body>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
        {googleAnalyticsId ? (
          <GoogleAnalytics gaId={googleAnalyticsId} />
        ) : null}
      </body>
    </html>
  );
}
