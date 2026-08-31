import { createClient, type QueryParams } from "next-sanity";

import { apiVersion, dataset, projectId } from "@/sanity/env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
});

export async function sanityFetch<T>({
  query,
  params = {},
  revalidate = 60,
}: {
  query: string;
  params?: QueryParams;
  revalidate?: number | false;
}): Promise<T> {
  return client.fetch<T>(query, params, {
    next: { revalidate },
  });
}
