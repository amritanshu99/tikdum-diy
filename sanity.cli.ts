import { defineCliConfig } from "sanity/cli";

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

export default defineCliConfig({
  api: {
    projectId: studioProjectId ?? frontendProjectId,
    dataset: studioDataset ?? frontendDataset ?? "production",
  },
});
