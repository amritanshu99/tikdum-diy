function requireEnvironmentVariable(
  value: string | undefined,
  name: string,
): string {
  if (!value) {
    throw new Error(
      `Missing ${name}. Copy .env.example to .env.local and add the value.`,
    );
  }

  return value;
}

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-08-31";
export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const projectId = requireEnvironmentVariable(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "NEXT_PUBLIC_SANITY_PROJECT_ID",
);

