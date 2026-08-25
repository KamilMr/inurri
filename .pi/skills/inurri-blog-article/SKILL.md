---
name: inurri-blog-article
description: Adds, edits, formats, and validates concise Inurri blog articles in Polish or English. Use when drafting or publishing an article, preparing its hero image, translating a post, or checking blog and homepage visibility.
---

# Inurri Blog Article

## Before editing

- Read `src/content.config.ts`, a recent post in the requested locale, and the relevant blog page components.
- Check Git status and preserve unrelated changes.
- Confirm details that cannot be inferred safely, especially language, date, image, author, and slug.

## Locations and format

- Polish: `src/content/blog/pl/<slug>.md`
- English: `src/content/blog/en/<slug>.md`
- Images: `src/assets/blog/`

Use lowercase ASCII kebab-case slugs and Markdown unless custom components require MDX. Translations must share a filename, but create them only when requested. Do not add an H1 in the body because the layout renders the title.

Follow the current content schema. Include a factual title, short SEO description, confirmed publication date, hero image, descriptive alt text, and focused tags. Add an author only when supported by existing author data.

## Writing style

Write in a concise, calm, informative voice:

- Use plain Polish or English and short paragraphs.
- Explain what changed, the earlier difficulty, and the practical benefit.
- Connect technical work to usability, stability, or development speed.
- Define useful specialist terms naturally: “onboarding, czyli proces pierwszej konfiguracji.”
- Prefer concrete facts over promotion; avoid hype, filler, and unnecessary English terms.
- Preserve supplied meaning and wording. Never invent behavior, metrics, quotations, or benefits.
- Use first-person plural naturally when describing Inurri's work.
- Use sentence case, for example: `ProsteZapisy: prostszy start i bezpieczniejszy rozwój`.

A useful flow is: brief introduction, main change, before-and-after explanation, practical benefit, short conclusion. Add only headings that improve scanning.

## Images and publishing

Verify the source image, give it a descriptive name, optimize it with the repository's available tools, and prefer WebP when quality is preserved. If the image is inaccessible, request an accessible copy rather than substituting one.

After adding the post, verify its direct route, blog listing, tags, hero image, alt text, SEO metadata, and language links. If the latest-posts section is active, verify homepage visibility. Polish tag copy uses `Artykuły oznaczone tagiem {tag}`.

Do not alter navigation, homepage sections, feeds, or translations unless requested.

## Validation and delivery

Run the repository's Astro check and production build. Report the article path, image path, generated URL, image optimization, and validation results.

Do not commit automatically. When asked, commit only intended changes with a concise message.
