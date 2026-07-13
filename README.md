# Inurri project codebase findings

This repository is an Astro-based website/app that started from the Cooper/GladTek boilerplate and has been partially adapted for Inurri.

## Stack

- Astro 7
- Tailwind CSS 4
- React 19 islands
- TypeScript
- Astro Content Collections
- Vitest for unit/component tests
- Playwright for E2E tests
- Deployment adapters configured for Cloudflare, Netlify, Vercel, and Node

## Main structure

Important files and folders:

- `astro.config.mjs` — Astro config, adapters, i18n, sitemap, markdown plugins.
- `src/site.config.ts` — global site config: branding, nav, footer, search, contact/social config.
- `src/layouts/Layout.astro` — main HTML layout, header/footer, SEO, analytics, cookie consent.
- `src/components/layout/Header.astro` — desktop/mobile nav, logo, language picker, theme toggle.
- `src/components/layout/Footer.astro` — footer links and copyright.
- `src/components/layout/SEO.astro` — meta tags, canonical URL, Open Graph, Twitter tags.
- `src/pages/[lang]/index.astro` — localized homepage route.
- `src/components/sections/HomeContent.astro` — homepage section composition.
- `src/i18n/locales/pl.properties` — Polish translations.
- `src/i18n/locales/en.properties` — English translations.
- `src/content.config.ts` — content collection schemas.
- `src/content/` — blog, portfolio, docs, changelog, authors content.
- `tests/` — Playwright tests.
- `src/components/islands/ContactForm.test.tsx` — Vitest test.
- `todo.md` — current adaptation plan.

## Current project state

The project is only partially converted from Cooper/GladTek to Inurri.

Already adapted:

- Site name/logo mostly changed to Inurri.
- Main navigation simplified to home, portfolio/work, pricing, contact.
- Homepage hero adapted to Inurri messaging.
- Homepage services/bento section adapted.
- Benefits section adapted.
- Tech stack section adapted.
- Homepage stats/blog/testimonials mostly hidden or removed from homepage composition.
- Footer partially adapted.
- Privacy pages added/localized.
- Search disabled via `siteConfig.search.enabled = false`.

Still boilerplate-heavy:

- `package.json` still uses boilerplate identity: `tars-app`.
- Original README content was Cooper boilerplate documentation before this findings file replaced it.
- `astro.config.mjs` defaults `site` to `https://cooper.gladtek.com`.
- `src/site.config.ts` still contains Interstellar/GladTek contact/social values.
- Pricing page is still SaaS subscription pricing.
- Portfolio entries are still sample GladTek projects.
- Blog, docs, changelog, demo, showcase, about, features, checkout routes still exist.
- Many translation keys still mention Cooper, boilerplate, Interstellar, product SaaS copy, etc.
- Tests still expect old Cooper behavior and old routes/features.

## Routing and i18n notes

- Default locale is Polish: `DEFAULT_LOCALE = "pl"` in `astro.config.mjs`.
- Configured locales are only `en` and `pl`.
- Some content still exists for `ar`, `de`, and `fr`, and Astro currently generates routes for those content entries through collection-based pages.
- Main localized pages are under `src/pages/[lang]/...`.
- Root `/` currently redirects to the default locale.

## Content collections

Collections configured in `src/content.config.ts`:

- `blog`
- `portfolio`
- `docs`
- `changelog`
- `authors`

The current content is mostly boilerplate/demo content and should be cleaned if not needed for Inurri.

## Build and test findings

### Build

Command run:

```bash
pnpm run build
```

Result: passes.

Notable build output:

- Many boilerplate routes are still generated, including docs, demo, blog, changelog, and non-configured language content routes.
- Build logs missing Polish author entries for blog author pages.
- Vite reports some chunks larger than 500 KB.

### Astro check

Command run:

```bash
pnpm astro check
```

Result: fails.

Main errors:

- `src/components/islands/ContactForm.test.tsx` imports `screen`, `fireEvent`, and `waitFor` from `@testing-library/react`, but the dependency/type setup is broken.
- Warnings also include unused `LatestPosts` import in `HomeContent.astro`.

### Unit tests

Command run:

```bash
pnpm run test:unit
```

Result: fails.

Main error:

- `Cannot find module '@testing-library/dom'` required by `@testing-library/react`.

### E2E tests

The Playwright tests are stale. They still expect old Cooper UI behavior, such as:

- Cooper branding.
- “Ship Faster with” hero text.
- Search palette enabled.
- Docs/demo navigation.
- Arabic/French language switching.

These tests need rewriting before they are useful for the Inurri version.

## Deployment/config concerns

- Project says `output: 'static'`, but some routes use `prerender = false`, including:
  - `src/pages/index.astro`
  - `src/pages/privacy.astro`
  - `src/pages/api/search.json.ts`
- The project has both `pnpm-lock.yaml` and `package-lock.json`.
- `packageManager` says pnpm, but deployment config uses npm commands in some places.
- Deployment package-manager strategy should be standardized.

## Highest-risk leftovers before production

1. Boilerplate public routes still available.
2. Boilerplate metadata and URLs.
3. Boilerplate pricing and portfolio content.
4. Stale tests that do not describe current behavior.
5. Non-configured language content still generating pages.
6. Contact/social config still pointing to old placeholder/GladTek/Interstellar data.

## Recommended future workflow

Work in small, focused steps:

1. Global config/SEO cleanup.
2. Route/content cleanup.
3. Pricing page adaptation.
4. Portfolio content replacement.
5. Contact form behavior decision.
6. Test suite rewrite.
7. Final build, route check, mobile nav check, and SEO verification.

Use `todo.md` as the task source and make only one approved change set at a time.
