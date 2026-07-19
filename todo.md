# Inurri Content and i18n Todo

Use this file when running Pi from the repository root.

## Agent workflow

Before each task, read:

- this `todo.md`
- `src/i18n/locales/en.properties`
- `src/i18n/locales/pl.properties`
- the relevant page/component files that render the affected keys

Rules:

- Work only inside this project.
- Keep changes small and focused.
- This todo is for content and localization work, not large code refactors.
- Do not remove reusable code just because the current copy is placeholder content.
- Keep reusable pages/components such as blog, changelog, features, showcase, checkout, or demos unless the task explicitly says removal is approved.
- If a section is not part of the current public Inurri site, prefer rewriting it to neutral reusable copy, hiding/unlinking it, or documenting it before deleting anything.
- Preserve both locales: every key in `en.properties` should also exist in `pl.properties`, and vice versa.
- Preserve placeholders such as `{year}` and `{plan}` in both languages.
- Preserve intentional HTML fragments such as `<span>` and `<a>` when they are used by rendered content.
- Use one brand voice consistently: personal freelancer voice, preferably `I`, unless the task explicitly changes the direction.
- Keep Polish copy natural and client-facing, not literal translations.
- Task lines use this format: `- [pending] CONTENT-000 Task title`.
- All tasks start as `pending`.
- If new content work is discovered, append it to this file instead of doing it immediately, unless it blocks the current task.
- After each task, run the smallest useful checks, usually `pnpm build`; run `pnpm test:unit` if code or rendered behavior changed.

## Current content audit

Strong current content:

- Home hero, FAQ, contact box, bento, pricing, contact page, benefits, tech stack, and portfolio copy are already aligned with Inurri.
- English and Polish locale files have matching key sets.
- Placeholder and HTML usage appears consistent between English and Polish.

Main content problems:

- Many template/boilerplate strings remain from Cooper/Astro/product/demo content.
- The Polish locale still contains many English user-facing strings.
- Brand voice is mixed between personal `I`, agency `we`, product/SaaS language, and open-source boilerplate language.
- Some reusable sections may be useful later, so content should be rewritten or isolated rather than deleting reusable code.

## Milestone 1: protect the public Inurri experience

- [done] CONTENT-001 Audit visible routes and map which locale keys are actually public
  - Check current navigation, footer, linked pages, generated routes, and public demo routes.
  - Identify which placeholder sections are visible to real visitors.
  - Do not remove reusable code during this task.
  - Add notes under the relevant later tasks if priority changes.
  - Audit notes:
    - Header links only to localized home, portfolio/work, pricing, and contact; the header CTA also links to contact.
    - Footer currently shows only the legal section with privacy and unlocalized terms; product links for features, about, pricing, and changelog are configured as hidden.
    - Home renders hero, bento, benefits, tech stack, FAQ, and contact box. Announcement, search, logo cloud, latest posts, and testimonials are disabled or hidden by current config/data.
    - Primary linked localized routes are `/en|pl`, `/portfolio`, `/pricing`, `/contact`, `/privacy`; `/terms` is a public unlocalized root route.
    - Generated but unlinked localized routes remain publicly reachable by direct URL: blog index/posts/authors/tags, changelog, features, about, checkout, design, showcase, portfolio detail pages, and localized 404.
    - Public unlocalized template/demo routes also exist at `/docs`, `/docs/*`, `/demo/home-*`, `/privacy`, `/license`, and `/404`.
    - Most urgent visible placeholder copy is on direct public template routes: 404, blog UI/content, features, about, changelog, showcase/compare, checkout, design/docs/demo, plus root legal pages.

- [done] CONTENT-002 Remove public-facing Astro boilerplate language from primary CTAs
  - Review `cta.*`, `announcement.*`, and `opensource.*` content.
  - Replace product/free-trial/open-source boilerplate copy with Inurri service copy where visible.
  - If a section is disabled or unused, keep reusable keys but make the copy neutral or clearly non-public.
  - Audit note: announcement/search/open-source notification are not visible from current config, but `cta.*` copy can appear on direct public changelog pages.

- [done] CONTENT-003 Finish Polish translations for primary navigation and footer content
  - Translate remaining English navigation descriptions in `pl.properties` where they can appear in menus.
  - Review `nav.*` and `footer.*` for natural Polish.
  - Keep labels such as `Blog`, `GitHub`, and brand names unchanged where appropriate.
  - Audit note: visible header keys are `nav.home`, `nav.work`, `nav.pricing`, `nav.contact`, `nav.cta`, and `nav.menu`; visible footer keys are `footer.quote`, `footer.copyright`, `footer.legal`, `footer.privacy`, and `footer.terms`.

- [done] CONTENT-004 Rewrite 404 page copy in English and Polish
  - Replace generic “void”/space-themed copy with Inurri-appropriate language.
  - Translate all Polish 404 labels.
  - Keep the tone helpful and simple.

- [review] CONTENT-005 Clean blog UI labels without removing blog functionality
  - Translate Polish blog labels such as previous/next/page/read more/back/no posts/updated on.
  - Keep the blog system and reusable blog-related code intact.
  - Make English labels consistent in casing and tone.
  - Audit note: blog routes are generated and public by direct URL, although they are not linked from current header/footer/home.
  - Reviewer notes:
    - `npm run build` passes.
    - Remaining blog UI labels are incomplete: English `blog.videoContent` is still title case, and `BlogCard.astro` still renders hardcoded `Video`/`Audio` badges instead of localized labels.

- [done] CONTENT-005a Finish remaining blog badge labels and English casing
  - parent: CONTENT-005
  - Change English `blog.videoContent` to sentence case.
  - Localize the blog card media badges instead of rendering hardcoded `Video` and `Audio` labels.
  - Preserve blog functionality and locale key parity.

## Milestone 2: rewrite reusable template pages instead of deleting them

- [done] CONTENT-006 Rewrite features page content for Inurri services and technology strengths
  - Replace Astro boilerplate/product claims with Inurri-relevant capabilities.
  - Keep the reusable features page structure.
  - Provide complete English and Polish copy.
  - Audit note: `/en|pl/features` is public by direct URL but hidden from current header/footer.

- [done] CONTENT-007 Rewrite about page content for Inurri
  - Replace Interstellar/NASA placeholder story, team, and timeline copy.
  - Use a personal/freelancer narrative aligned with Kamil Mrówka and Inurri.
  - Keep reusable page sections if they can support a future about page.
  - Audit note: `/en|pl/about` is public by direct URL but hidden from current header/footer; it still renders Interstellar images and copy.

- [review] CONTENT-008 Rewrite changelog content labels or reposition changelog as reusable/internal
  - Replace product-release/newsletter boilerplate with neutral Inurri updates language, or mark the page as reusable/internal.
  - Translate Polish changelog UI labels if the page remains public.
  - Do not delete changelog code or content collections unless explicitly approved later.
  - Audit note: `/en|pl/changelog` and changelog detail routes are public by direct URL but hidden from current header/footer.
  - Reviewer notes:
    - `npm run build` passes.
    - The changelog remains public, but `/en/changelog` still renders Cooper/Astro release content from `src/content/changelog/en/*.md` such as “Project Genesis”, “Cooper v0.0.1”, release notes, migration guides, and open-source/product-roadmap language.
    - The implementation updates many UI labels, but it does not complete the required replacement/isolation of product-release boilerplate changelog content.

- [done] CONTENT-008a Rewrite or isolate visible changelog entry content
  - parent: CONTENT-008
  - Replace the public English changelog entry titles, descriptions, and body copy with neutral reusable/Inurri update notes, or clearly isolate the changelog entries as internal/reusable without deleting changelog code or content collections.

- [review] CONTENT-008b Reposition changelog as public Updates page
  - parent: CONTENT-008
  - Use the changelog feature as an Inurri `Updates` / `Aktualności` page rather than a software-product changelog.
  - Content can include finished projects, new services, website improvements, new blog posts or guides, pricing/package changes, availability updates, and technology/process improvements.
  - Avoid public navigation label `Changelog`; prefer English `Updates` and Polish `Aktualności` or `Zmiany`.
  - Keep the reusable changelog code and content collection intact.
  - Reviewer notes:
    - `npm run build` passes.
    - `npm run test` passes.
    - The detail route still prerenders public `/ar|de|fr/changelog/...` pages from unchanged Cooper/Astro software-product changelog entries, so the public changelog feature is not fully repositioned as Inurri Updates/Aktualności.

- [done] CONTENT-008c Isolate or neutralize non-English/Polish changelog detail routes
  - parent: CONTENT-008b
  - Stop public `/ar|de|fr/changelog/...` pages from exposing unchanged Cooper/Astro software-product changelog content, either by limiting generated changelog detail routes to supported locales or by rewriting/isolating those entries.
  - Keep the English and Polish Updates/Aktualności pages and reusable changelog collection intact.

- [review] CONTENT-009 Rewrite showcase and compare copy to avoid SaaS/product-plan language
  - Replace generic plan comparison and interactive showcase copy with Inurri-relevant wording, or keep it neutral for future reuse.
  - Translate Polish values that are not intentionally technical or numeric.
  - Do not remove the comparison/showcase components during this task.
  - Audit note: `/en|pl/showcase` is public by direct URL but hidden from current header/footer.
  - Reviewer notes:
    - `npm run build` passes.
    - `npm run test` passes.
    - The comparison table docs/example at `src/content/docs/sections/comparison-table.mdx` still renders public SaaS/product-plan language such as `plans or products`, `Free`, `Pro`, `$29/mo`, `$99/mo`, `API Calls`, and `Phone Support`.

- [done] CONTENT-009a Neutralize public comparison table docs/example copy
  - parent: CONTENT-009
  - Rewrite the comparison table documentation/example copy to neutral reusable or Inurri-relevant wording, avoiding SaaS/product-plan/subscription language.
  - Keep the comparison component and docs page reusable.

- [done] CONTENT-010 Rewrite checkout copy or clearly isolate checkout as unused reusable flow
  - Replace subscription/payment boilerplate if checkout is publicly reachable.
  - If checkout is not part of the current business model, keep code but make content neutral or hide/unlink the route in a separate approved task.
  - Preserve `{plan}` placeholders if still used.
  - Audit note: `/en|pl/checkout` is public by direct URL but hidden from current header/footer; no current pricing CTA links to it.

## Milestone 3: polish existing Inurri copy

- [done] CONTENT-011 Polish English pricing copy for natural service-sales language
  - Review package descriptions, care plans, FAQ answers, and CTA labels.
  - Improve wording such as landing page descriptions, materials/content wording, and client/admin panel wording.
  - Keep pricing meaning and numbers unchanged.

- [done] CONTENT-012 Polish Polish pricing copy for punctuation, tone, and consistency
  - Review punctuation and flow, especially longer descriptions.
  - Normalize wording around `email`/`e-mail`, care plan names, and maintenance language.
  - Keep prices and package scope unchanged.

- [done] CONTENT-013 Review contact and contact-box microcopy in both languages
  - Make the form labels, placeholders, validation errors, and success states consistent.
  - Keep the personal tone.
  - Preserve existing form behavior expectations.

- [done] CONTENT-014 Review benefits and tech stack copy for clarity and repetition
  - Reduce repeated wording around speed, SEO, maintenance, and future growth.
  - Keep the practical client-facing tone.
  - Keep all reusable tech stack categories and item keys.

## Milestone 4: content hygiene and future reuse

- [done] CONTENT-015 Decide what to do with empty testimonial fields
  - Check whether testimonial fields render anywhere.
  - If visible, add real placeholder-safe content or hide empty testimonials without deleting the reusable testimonial component.
  - If not visible, document that they are intentionally empty.
  - Audit note: homepage filters out testimonials with empty text, author, or role, so the current empty testimonial locale values do not render.

- [done] CONTENT-016 Normalize brand voice across both locale files
  - Remove accidental `we/our/product/subscription` voice where Inurri should speak as a personal service provider.
  - Keep `we` only where it is intentionally chosen.
  - Review both English and Polish after changes for consistency.

- [done] CONTENT-017 Add a lightweight locale QA checklist or script
  - Check matching keys between `en.properties` and `pl.properties`.
  - Check empty values and placeholder consistency.
  - Keep this as a helper for future content work.

- [pending-review] CONTENT-018 Review unused locale keys after public content is cleaned
  - Identify keys that are unused by current pages/components.
  - Do not delete reusable keys automatically.
  - Propose a later cleanup only for keys confirmed obsolete and not useful for future reusable sections.
  - Audit notes:
    - `AGENTS.md` was not present in the repository root; only `todo.md` and required locale files were available to read.
    - Exact-key scan found 129 English/Polish keys without direct literal references outside locale files; current dynamic usage accounts for `nav.home`, `nav.work`, `nav.pricing`, `nav.contact`, footer link keys from `site.config.ts`, `techstack.category.*`, `techstack.item.*.desc`, and `changelog.type.*`.
    - After accounting for those dynamic keys, 97 keys remain unmatched by current pages/components.
    - Likely reusable/unresolved groups to keep for now: legacy/nav and docs menu keys (`nav.all.projects*`, `nav.case.studies*`, `nav.docs*`, `nav.introduction*`, `nav.theming*`, `nav.components*`, `nav.design*`, `nav.product*`, `nav.resources*`, `nav.company*`, `nav.features*`, `nav.about*`, `nav.demos`, `nav.home.*`), comparison table labels/rows/categories, search/dev notification keys, changelog sidebar helper keys, `footer.description`, `footer.license`, `pricing.cta.start`, `blog.readArticle`, `portfolio.backToWork`, `opensource.badge`, and generic `faq.title` / `faq.subtitle`.
    - Confirmed cleanup candidates that look obsolete after current content changes: `stats.downloads`, `stats.uptime`, `stats.requests`, `stats.support`, all `pricing.feat.*` keys, and `compare.val.*` keys including old storage/SLA values.

- [pending] CONTENT-019 Audit and clean public unlocalized template/legal/demo pages
  - Review `/docs`, `/docs/*`, `/demo/home-*`, `/design`, `/terms`, `/privacy`, and `/license` for public boilerplate visibility.
  - Decide whether to rewrite, hide, noindex, or keep them as reusable/internal reference pages.
  - Do not delete reusable docs, demo, or legal page code without explicit approval.

- [pending] CONTENT-020 Remove obsolete locale keys after review approval
  - Remove only locale keys confirmed obsolete by CONTENT-018: `stats.downloads`, `stats.uptime`, `stats.requests`, `stats.support`, all `pricing.feat.*` keys, and `compare.val.*` keys.
  - Preserve English/Polish key parity.
  - Do not remove reusable navigation, docs/demo, comparison label/row/category, search/dev, changelog sidebar helper, footer, blog, portfolio, open-source notification, or FAQ keys without a separate review decision.

