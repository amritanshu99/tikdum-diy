import type { NextConfig } from "next";

const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const sanityDataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: sanityProjectId
      ? [
          {
            protocol: "https",
            hostname: "cdn.sanity.io",
            pathname: `/images/${sanityProjectId}/${sanityDataset}/**`,
          },
        ]
      : [],
  },
};

export default nextConfig;
