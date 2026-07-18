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

- [ready] CONTENT-001 Audit visible routes and map which locale keys are actually public
  - Check current navigation, footer, linked pages, generated routes, and public demo routes.
  - Identify which placeholder sections are visible to real visitors.
  - Do not remove reusable code during this task.
  - Add notes under the relevant later tasks if priority changes.

- [pending] CONTENT-002 Remove public-facing Astro boilerplate language from primary CTAs
  - Review `cta.*`, `announcement.*`, and `opensource.*` content.
  - Replace product/free-trial/open-source boilerplate copy with Inurri service copy where visible.
  - If a section is disabled or unused, keep reusable keys but make the copy neutral or clearly non-public.

- [pending] CONTENT-003 Finish Polish translations for primary navigation and footer content
  - Translate remaining English navigation descriptions in `pl.properties` where they can appear in menus.
  - Review `nav.*` and `footer.*` for natural Polish.
  - Keep labels such as `Blog`, `GitHub`, and brand names unchanged where appropriate.

- [pending] CONTENT-004 Rewrite 404 page copy in English and Polish
  - Replace generic “void”/space-themed copy with Inurri-appropriate language.
  - Translate all Polish 404 labels.
  - Keep the tone helpful and simple.

- [pending] CONTENT-005 Clean blog UI labels without removing blog functionality
  - Translate Polish blog labels such as previous/next/page/read more/back/no posts/updated on.
  - Keep the blog system and reusable blog-related code intact.
  - Make English labels consistent in casing and tone.

## Milestone 2: rewrite reusable template pages instead of deleting them

- [pending] CONTENT-006 Rewrite features page content for Inurri services and technology strengths
  - Replace Astro boilerplate/product claims with Inurri-relevant capabilities.
  - Keep the reusable features page structure.
  - Provide complete English and Polish copy.

- [pending] CONTENT-007 Rewrite about page content for Inurri
  - Replace Interstellar/NASA placeholder story, team, and timeline copy.
  - Use a personal/freelancer narrative aligned with Kamil Mrówka and Inurri.
  - Keep reusable page sections if they can support a future about page.

- [pending] CONTENT-008 Rewrite changelog content labels or reposition changelog as reusable/internal
  - Replace product-release/newsletter boilerplate with neutral Inurri updates language, or mark the page as reusable/internal.
  - Translate Polish changelog UI labels if the page remains public.
  - Do not delete changelog code or content collections unless explicitly approved later.

- [pending] CONTENT-009 Rewrite showcase and compare copy to avoid SaaS/product-plan language
  - Replace generic plan comparison and interactive showcase copy with Inurri-relevant wording, or keep it neutral for future reuse.
  - Translate Polish values that are not intentionally technical or numeric.
  - Do not remove the comparison/showcase components during this task.

- [pending] CONTENT-010 Rewrite checkout copy or clearly isolate checkout as unused reusable flow
  - Replace subscription/payment boilerplate if checkout is publicly reachable.
  - If checkout is not part of the current business model, keep code but make content neutral or hide/unlink the route in a separate approved task.
  - Preserve `{plan}` placeholders if still used.

## Milestone 3: polish existing Inurri copy

- [pending] CONTENT-011 Polish English pricing copy for natural service-sales language
  - Review package descriptions, care plans, FAQ answers, and CTA labels.
  - Improve wording such as landing page descriptions, materials/content wording, and client/admin panel wording.
  - Keep pricing meaning and numbers unchanged.

- [pending] CONTENT-012 Polish Polish pricing copy for punctuation, tone, and consistency
  - Review punctuation and flow, especially longer descriptions.
  - Normalize wording around `email`/`e-mail`, care plan names, and maintenance language.
  - Keep prices and package scope unchanged.

- [pending] CONTENT-013 Review contact and contact-box microcopy in both languages
  - Make the form labels, placeholders, validation errors, and success states consistent.
  - Keep the personal tone.
  - Preserve existing form behavior expectations.

- [pending] CONTENT-014 Review benefits and tech stack copy for clarity and repetition
  - Reduce repeated wording around speed, SEO, maintenance, and future growth.
  - Keep the practical client-facing tone.
  - Keep all reusable tech stack categories and item keys.

## Milestone 4: content hygiene and future reuse

- [pending] CONTENT-015 Decide what to do with empty testimonial fields
  - Check whether testimonial fields render anywhere.
  - If visible, add real placeholder-safe content or hide empty testimonials without deleting the reusable testimonial component.
  - If not visible, document that they are intentionally empty.

- [pending] CONTENT-016 Normalize brand voice across both locale files
  - Remove accidental `we/our/product/subscription` voice where Inurri should speak as a personal service provider.
  - Keep `we` only where it is intentionally chosen.
  - Review both English and Polish after changes for consistency.

- [pending] CONTENT-017 Add a lightweight locale QA checklist or script
  - Check matching keys between `en.properties` and `pl.properties`.
  - Check empty values and placeholder consistency.
  - Keep this as a helper for future content work.

- [pending] CONTENT-018 Review unused locale keys after public content is cleaned
  - Identify keys that are unused by current pages/components.
  - Do not delete reusable keys automatically.
  - Propose a later cleanup only for keys confirmed obsolete and not useful for future reusable sections.
