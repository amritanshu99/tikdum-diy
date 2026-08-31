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

import { client } from "./client";

const legacyBrandNames = new Set(["tikdum", "tikdum studio", "tikdum diy"]);

function normalizeArtworkBrand(artwork: ArtworkRecord): ArtworkRecord {
  return legacyBrandNames.has(artwork.artist.trim().toLowerCase())
    ? { ...artwork, artist: siteConfig.name }
    : artwork;
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
  *[_type == "siteSettings"][0] {
    title,
    description
  }
`);

async function fetchFromSanity<T>(
  query: string,
  params: Record<string, string> = {},
): Promise<T | null> {
  try {
    return await client.fetch<T>(query, params);
  } catch {
    return null;
  }
}

export const getArtworks = cache(async (): Promise<ArtworkRecord[]> => {
  const artworks = await fetchFromSanity<ArtworkRecord[]>(artworksQuery);
  const records = artworks?.length ? artworks : fallbackArtworks;
  return records.map(normalizeArtworkBrand);
});

export const getArtworkBySlug = cache(
  async (slug: string): Promise<ArtworkRecord | null> => {
    const artwork = await fetchFromSanity<ArtworkRecord | null>(artworkQuery, {
      slug,
    });

    const record =
      artwork ??
      fallbackArtworks.find((candidate) => candidate.slug === slug) ??
      null;

    return record ? normalizeArtworkBrand(record) : null;
  },
);

export const getPosts = cache(async (): Promise<JournalPostRecord[]> => {
  const posts = await fetchFromSanity<JournalPostRecord[]>(postsQuery);
  return posts?.length ? posts : fallbackPosts;
});

export const getPostBySlug = cache(
  async (slug: string): Promise<JournalPostRecord | null> => {
    const post = await fetchFromSanity<JournalPostRecord | null>(postQuery, {
      slug,
    });

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
      await fetchFromSanity<SiteSettingsRecord | null>(settingsQuery);
    return {
      ...(settings ?? fallbackSiteSettings),
      title: siteConfig.name,
    };
  },
);
