import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { schemaTypes } from "./src/sanity/schemaTypes";

const frontendProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const frontendDataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const studioProjectId = process.env.SANITY_STUDIO_PROJECT_ID;
const studioDataset = process.env.SANITY_STUDIO_DATASET;

if (
  frontendProjectId &&
  studioProjectId &&
  frontendProjectId !== studioProjectId
) {
  throw new Error(
    "Sanity project mismatch: the Studio and website project IDs must match.",
  );
}

if (frontendDataset && studioDataset && frontendDataset !== studioDataset) {
  throw new Error(
    "Sanity dataset mismatch: the Studio and website datasets must match.",
  );
}

const projectId = studioProjectId ?? frontendProjectId;
const dataset = studioDataset ?? frontendDataset ?? "production";

if (!projectId) {
  throw new Error(
    "Missing Sanity project ID. Set SANITY_STUDIO_PROJECT_ID or NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local.",
  );
}

export default defineConfig({
  name: "default",
  title: "Art Website Studio",
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
