# Art Website Project Plan

## Project goal

Create a fast, editorial art website where artworks and journal stories are
managed in Sanity and presented through a polished Next.js frontend.

The primary production URL is `https://www.tikdumdiy.com`. The apex domain,
`https://tikdumdiy.com`, should permanently redirect to the `www` address so
there is one canonical version of every page.

## Agreed foundation

| Area | Decision |
| --- | --- |
| Frontend | Next.js 16 App Router with TypeScript |
| Styling | Tailwind CSS |
| Content | Sanity project `3ihrnxlk`, dataset `production` |
| Images | Sanity CDN rendered through `next/image` |
| Database | None initially |
| Hosting | Vercel |
| Analytics | Google Analytics 4 and Google Search Console |
| Comments | Deferred; consider Giscus later |
| Search | Deferred; consider Pagefind first, Algolia at larger scale |

## Current status

- [x] Scaffold Next.js, TypeScript, and Tailwind CSS.
- [x] Configure Sanity Studio and connect the production dataset.
- [x] Add Artwork, Journal post, and Site settings schemas.
- [x] Configure Sanity image URLs and the reusable image component.
- [x] Add sitemap, robots, canonical metadata, and analytics hooks.
- [x] Set `https://www.tikdumdiy.com` as the canonical site URL.
- [x] Build the responsive Phase 1 visual system and shared navigation.
- [x] Build Home, Artworks, Journal, About, detail, and not-found pages.
- [x] Connect published Sanity content with complete starter-content fallbacks.
- [x] Add dynamic page metadata and sitemap entries for CMS content.
- [x] Verify linting, TypeScript, and a production build.

## Phase 1: Direction and content

- Review the initial TikDum name, cream/charcoal/vermilion palette, editorial
  typography, and tactile visual tone; refine them when the brand is finalized.
- The first navigation includes Home, Artworks, Journal, and About. Add Contact
  after a public contact channel is chosen.
- Prepare initial artwork images, titles, descriptions, dates, media, sizes,
  artist details, alt text, and availability information.
- Prepare the About copy, contact details, and first journal posts.

## Phase 2: Core website

- Build the responsive header, footer, and shared page layout.
- Build an editorial homepage with featured artwork and recent writing.
- Build artwork listing and individual artwork pages.
- Build journal listing and article pages.
- Build About, Contact, loading, empty, and not-found states.
- Add accessible keyboard navigation, visible focus states, and image alt text.

## Phase 3: Sanity workflow

- Connect frontend pages to published Sanity content.
- Configure ordering, previews, validation, and singleton behavior for settings.
- Add draft preview and visual editing only if the publishing workflow needs it.
- Enter and review a small set of real content before expanding the schema.

## Phase 4: SEO and measurement

- Add page-specific titles, descriptions, canonical URLs, and social images.
- Extend the sitemap to include all published artworks and journal posts.
- Add structured data appropriate to artworks, articles, and the organization.
- Create a GA4 property and set `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID`.
- Verify the domain in Search Console and set the verification value if needed.
- Submit `https://www.tikdumdiy.com/sitemap.xml` after launch.

## Phase 5: Deployment and launch

- Create the Vercel project and add all production environment variables.
- Connect `www.tikdumdiy.com` and configure the required DNS records.
- Redirect `tikdumdiy.com` permanently to `www.tikdumdiy.com`.
- Add the Vercel production URL to Sanity CORS origins with credentials disabled
  unless authenticated frontend requests are introduced.
- Run final mobile, desktop, accessibility, metadata, and performance checks.
- Publish initial content, deploy production, and verify analytics collection.

## Later, when justified

- Add Giscus if readers need comments and a GitHub-based flow is appropriate.
- Add Pagefind when the content library needs search; move to Algolia only when
  advanced ranking, filtering, or scale requires it.
- Add a database only if the site gains features that Sanity cannot reasonably
  support, such as customer accounts, orders, or private user data.

## Launch definition of done

- The `www` domain serves the production site over HTTPS and the apex redirects.
- All production environment variables are configured in Vercel.
- Real content can be created, previewed, published, and displayed correctly.
- Every public page has correct metadata, accessible content, and responsive UI.
- The sitemap and robots file use the production domain.
- GA4 and Search Console are verified and receiving data.
- Lint, type checking, and the production build pass.
