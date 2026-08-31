import { createClient } from "next-sanity";

function requireVariable(value, name) {
  if (!value) {
    throw new Error(`Missing ${name} in .env.local.`);
  }

  return value;
}

async function main() {
  const frontendProjectId = requireVariable(
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    "NEXT_PUBLIC_SANITY_PROJECT_ID",
  );
  const frontendDataset =
    process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
  const studioProjectId =
    process.env.SANITY_STUDIO_PROJECT_ID ?? frontendProjectId;
  const studioDataset =
    process.env.SANITY_STUDIO_DATASET ?? frontendDataset;

  if (studioProjectId !== frontendProjectId) {
    throw new Error(
      "Studio and website project IDs do not match. Check .env.local.",
    );
  }

  if (studioDataset !== frontendDataset) {
    throw new Error(
      "Studio and website datasets do not match. Check .env.local.",
    );
  }

  const client = createClient({
    projectId: frontendProjectId,
    dataset: frontendDataset,
    apiVersion:
      process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-08-31",
    useCdn: false,
    perspective: "published",
  });

  const counts = await client.fetch(`{
    "artworks": count(*[_type == "artwork"]),
    "posts": count(*[_type == "post"]),
    "settings": count(*[_type == "siteSettings"])
  }`);
  const total = counts.artworks + counts.posts + counts.settings;

  console.log("Sanity connection verified.");
  console.log(`Dataset: ${frontendDataset}`);
  console.log(
    `Published content: ${counts.artworks} artworks, ${counts.posts} posts, ${counts.settings} site settings.`,
  );

  if (total === 0) {
    console.log(
      "The dataset is connected but empty, so the website will show local fallback content.",
    );
  }
}

main().catch((error) => {
  console.error(
    `Sanity connection check failed: ${error instanceof Error ? error.message : error}`,
  );
  process.exitCode = 1;
});
