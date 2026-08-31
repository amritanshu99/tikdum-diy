import { cache } from "react";
import { defineQuery } from "next-sanity";

import {
  fallbackArtworks,
  fallbackPosts,
  fallbackSiteSettings,
} from "@/content/fallback";
import { siteConfig } from "@/config/site";
import type {
  ArtworkRecord,
  JournalPostRecord,
  SiteSettingsRecord,
} from "@/sanity/types";

import { sanityFetch } from "./client";

const legacyBrandNames = new Set(["tikdum", "tikdum studio", "tikdum diy"]);

function normalizeArtworkBrand(artwork: ArtworkRecord): ArtworkRecord {
  const artist = artwork.artist?.trim() || siteConfig.name;

  return {
    ...artwork,
    artist: legacyBrandNames.has(artist.toLowerCase())
      ? siteConfig.name
      : artist,
  };
}

const artworksQuery = defineQuery(`
  *[_type == "artwork" && defined(slug.current)] |
    order(featured desc, year desc, _createdAt desc) {
      _id,
      title,
      "slug": slug.current,
      artist,
      year,
      medium,
      featured,
      image {
        ...,
        "alt": alt
      },
      description,
      "descriptionText": pt::text(description)
    }
`);

const artworkQuery = defineQuery(`
  *[_type == "artwork" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    artist,
    year,
    medium,
    featured,
    image {
      ...,
      "alt": alt
    },
    description,
    "descriptionText": pt::text(description)
  }
`);

const postsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] |
    order(publishedAt desc, _createdAt desc) {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      publishedAt,
      coverImage {
        ...,
        "alt": alt
      }
    }
`);

const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    coverImage {
      ...,
      "alt": alt
    },
    body
  }
`);

const settingsQuery = defineQuery(`
  *[_type == "siteSettings"] | order(_updatedAt desc) [0] {
    title,
    description
  }
`);

async function fetchFromSanity<T>(
  query: string,
  label: string,
  params: Record<string, string> = {},
): Promise<T | null> {
  try {
    return await sanityFetch<T>({ query, params });
  } catch (error) {
    console.error(
      `[Sanity] Could not load ${label}; using local fallback content.`,
      error instanceof Error ? error.message : error,
    );
    return null;
  }
}

export const getArtworks = cache(async (): Promise<ArtworkRecord[]> => {
  const artworks = await fetchFromSanity<ArtworkRecord[]>(
    artworksQuery,
    "artworks",
  );
  const records = artworks?.length ? artworks : fallbackArtworks;
  return records.map(normalizeArtworkBrand);
});

export const getArtworkBySlug = cache(
  async (slug: string): Promise<ArtworkRecord | null> => {
    const artwork = await fetchFromSanity<ArtworkRecord | null>(
      artworkQuery,
      `artwork "${slug}"`,
      { slug },
    );

    const record =
      artwork ??
      fallbackArtworks.find((candidate) => candidate.slug === slug) ??
      null;

    return record ? normalizeArtworkBrand(record) : null;
  },
);

export const getPosts = cache(async (): Promise<JournalPostRecord[]> => {
  const posts = await fetchFromSanity<JournalPostRecord[]>(
    postsQuery,
    "journal posts",
  );
  return posts?.length ? posts : fallbackPosts;
});

export const getPostBySlug = cache(
  async (slug: string): Promise<JournalPostRecord | null> => {
    const post = await fetchFromSanity<JournalPostRecord | null>(
      postQuery,
      `journal post "${slug}"`,
      { slug },
    );

    return (
      post ??
      fallbackPosts.find((candidate) => candidate.slug === slug) ??
      null
    );
  },
);

export const getSiteSettings = cache(
  async (): Promise<SiteSettingsRecord> => {
    const settings =
      await fetchFromSanity<SiteSettingsRecord | null>(
        settingsQuery,
        "site settings",
      );

    return {
      title: settings?.title ?? fallbackSiteSettings.title ?? siteConfig.name,
      description:
        settings?.description ?? fallbackSiteSettings.description,
    };
  },
);
