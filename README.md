# Art Website

A polished Phase 1 foundation for an editorial art website.

Primary production domain: `https://www.tikdumdiy.com`

## Stack

- Next.js 16 with the App Router and TypeScript
- Tailwind CSS 4
- Sanity Studio and the Sanity image CDN
- `next/image` through the reusable `SanityImage` component
- Google Analytics and Search Console hooks (disabled until configured)
- Vercel-ready Next.js deployment

Comments and site search are intentionally not installed yet. Giscus and
Pagefind or Algolia can be added when the content and audience justify them.

The public pages read published Artwork, Journal post, and Site settings
documents from Sanity. When the dataset is empty, original starter content is
shown so the design remains complete; publishing the first document of a type
switches that section to Sanity content.

## Prerequisites

- Node.js 20.9 or newer (Node 24 LTS is selected in `.nvmrc`)
- A Sanity account and project

## Local setup

1. Switch to a supported Node version.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env.local` and add your Sanity project ID.
4. Start the website:

   ```bash
   npm run dev
   ```

5. In another terminal, start Sanity Studio:

   ```bash
   npm run sanity:dev
   ```

The website runs at `http://localhost:3000`. Sanity Studio normally runs at
`http://localhost:3333`.

## Editing content

1. Open Sanity Studio at `http://localhost:3333`.
2. Create an Artwork, Journal post, or Site settings document.
3. Complete the required title, slug, image, and alternative-text fields.
4. Publish the document.
5. Refresh the public site to see the published content.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production | Canonical URL and sitemap |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | For CMS use | Sanity project |
| `NEXT_PUBLIC_SANITY_DATASET` | No | Defaults to `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | No | Fixed Sanity API version |
| `SANITY_STUDIO_PROJECT_ID` | For Studio use | Sanity Studio project |
| `SANITY_STUDIO_DATASET` | No | Sanity Studio dataset |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` | No | Enables GA4 when set |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | No | Search Console HTML verification |

Add the same variables to the Vercel project before the production deployment.
Configure the apex domain, `tikdumdiy.com`, to redirect permanently to the
primary `www.tikdumdiy.com` domain.

See [`PLAN.md`](./PLAN.md) for the implementation roadmap and launch checklist.

## Available commands

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
npm run sanity:dev
npm run sanity:deploy
```
