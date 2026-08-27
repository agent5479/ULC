# Site SEO/GEO Instructions (2026)

Working spec for auditing and updating developer-hosted sites for AI search visibility (Gemini, ChatGPT, Perplexity, Claude) alongside traditional SEO. Use this as a checklist/prompt basis in Cursor — treat each section as a task to verify or implement.

---

## 0. Crawler Access (do this first — blocks everything else if wrong)

AI labs split crawlers by purpose. **Retrieval** bots decide whether you appear in AI answers; **training** bots collect content for model training. Blocking training bots does **not** remove you from citations. Blocking retrieval bots does.

**Must allow for AI search visibility (retrieval):**
- [ ] `OAI-SearchBot`, `ChatGPT-User` (OpenAI — ChatGPT search / user fetch)
- [ ] `Claude-SearchBot`, `Claude-User` (Anthropic — Claude search index / user fetch)
- [ ] `PerplexityBot`, `Perplexity-User` (Perplexity)
- [ ] `Bingbot` (optional but useful — Bing / Copilot and some ChatGPT retrieval paths)

**Decide separately (training / generative — no citation penalty if blocked):**
- [ ] `GPTBot` (OpenAI training)
- [ ] `ClaudeBot` (Anthropic training — distinct from `Claude-SearchBot` / `Claude-User`)
- [ ] `Google-Extended` (control token for Gemini / generative use of already-crawled content — **not** a separate crawler; does **not** affect classic Google Search ranking or `Googlebot`)
- [ ] `Applebot-Extended` (Apple Intelligence training)
- [ ] `CCBot` (Common Crawl — many models train on this)
- [ ] `Bytespider` (ByteDance / TikTok / Doubao — allow only if targeting those surfaces; otherwise fine to block)
- [ ] `Meta-ExternalAgent` (Meta AI — optional)

Notes:
- Some user-triggered agents (`ChatGPT-User`, `Perplexity-User`, sometimes `Claude-User`) may ignore `robots.txt` when a human asked for the page — still declare intent clearly.
- Each user-agent token needs its **own** `robots.txt` block. A rule for `ClaudeBot` does **not** apply to `Claude-SearchBot`.

Also:
- [ ] If using Cloudflare or another CDN/WAF: check dashboard-level bot rules separately from `robots.txt` — Cloudflare's default config can block AI bots at the edge even if `robots.txt` allows them.
- [ ] Check server/access logs for actual crawl activity from the **retrieval** user agents above to confirm they're really getting through, not just theoretically allowed.
- [ ] Confirm no important content is gated behind login, paywall, or interactive-only elements (modals, tabs that require JS click to reveal content).

## 1. Rendering & Indexing (GitHub Pages / static hosting)

- [ ] All pages are statically generated or pre-rendered (SSG) — no content that only appears after client-side JS execution. AI crawlers largely do not execute JS.
- [ ] Custom domain has HTTPS enforced.
- [ ] Explicit `<link rel="canonical">` on every page (avoid duplicate content across `.github.io` and custom domain).
- [ ] `sitemap.xml` present, current, and referenced in `robots.txt`.
- [ ] `robots.txt` and sitemap validated (no stale/broken URLs).
- [ ] Submit sitemap to Google Search Console **and** Bing Webmaster Tools where practical.

## 2. Icons & Link-Preview Images

Missing/incorrect icon tags are why some sites show a blank/generic square when shared or when found in Google's site listing. Cover both favicon (browser tab / SERP favicon) and social link-preview images — they're separate systems with separate requirements. `og:image` primarily drives **social** previews (iMessage, Slack, LinkedIn, Facebook, WhatsApp); Google Search thumbnails / favicons use different rules.

- [ ] `favicon.ico` (multi-size ICO, 16×16/32×32/48×48) at site root `/favicon.ico` — still the fallback browsers and some crawlers check by default even with no `<link>` tag.
- [ ] `<link rel="icon" href="/favicon.ico" sizes="any">` in `<head>`.
- [ ] PNG favicons for modern browsers/tab bars:
  - `<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">`
  - `<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">`
- [ ] `<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">` — used for iOS home-screen bookmarks and some link previews.
- [ ] `site.webmanifest` (or `manifest.json`) with `icons` array (192×192 and 512×512 minimum) — required for Android/Chrome "add to home screen" and PWA install icon. Reference it: `<link rel="manifest" href="/site.webmanifest">`.
- [ ] `theme-color` meta tag matching brand color: `<meta name="theme-color" content="#xxxxxx">`.

### 2a. og:image — this is the one most likely to be missing on your sites

This is what drives the preview image on iMessage, Slack, LinkedIn, Facebook, and WhatsApp link shares. A missing or broken `og:image` is the most common cause of a blank/generic box on link share — separate issue from the favicon, and easy to have fixed one without the other.

Required tags, every page, in `<head>`:
```html
<meta property="og:title" content="Exact page title">
<meta property="og:description" content="1-2 sentence page summary">
<meta property="og:image" content="https://yourdomain.com/images/og/page-slug.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Short description of the image">
<meta property="og:url" content="https://yourdomain.com/page-slug">
<meta property="og:type" content="website">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="https://yourdomain.com/images/og/page-slug.png">
```

Checklist:
- [ ] `og:image` URL is **absolute** (`https://yourdomain.com/...`), never relative (`/images/og.png`) — relative paths silently fail on most crawlers.
- [ ] Image is a real JPG/PNG file, not SVG — most link-preview crawlers won't render SVG.
- [ ] Image is 1200×630px (standard OG ratio ~1.91:1) and under ~1MB.
- [ ] Also set `og:image:width`, `og:image:height`, and `og:image:alt` explicitly — some crawlers (notably older Facebook/LinkedIn scrapers) skip the image without dimensions.
- [ ] Every page/demo/app on the site gets **its own** `og:image` — not one sitewide default. For your demo showcase specifically, each vertical (venue booking, beekeeping, home-care, etc.) should have a distinct preview image showing that app, not a generic homepage graphic reused everywhere.
- [ ] Confirm the image file is actually present in the deployed build output — on GitHub Pages/static builds it's common for an `og-images/` folder to exist in source but not get copied into the publish directory.
- [ ] After fixing, force a re-scrape (previews are cached per-URL and won't update on their own):
  - Facebook Sharing Debugger — paste URL, click "Scrape Again"
  - LinkedIn Post Inspector — same, forces LinkedIn's cache to refresh
  - Twitter Card Validator
  - iMessage/WhatsApp previews are the hardest to force-refresh — may just need time, or a version-tagged image URL (`og-image.png?v=2`) to bust the cache.
- [ ] Test actual rendering, not just tag presence — code inspection alone misses broken paths:
  - Google: search `site:yourdomain.com` and check the favicon shown next to the listing (can take time to update/recrawl).
  - Rich Results Test / URL Inspection in Google Search Console for favicon eligibility issues (Google has specific size/squareness rules for favicons to show in search results — non-square or too-small icons get dropped).
  - Facebook Sharing Debugger, LinkedIn Post Inspector, and Twitter Card Validator for OG image previews (also force a re-scrape if a stale/blank preview was cached from before the fix).

## 3. Content Strategy

- [ ] Audit existing pages: flag anything that's generic "how-to"/boilerplate rehashing content available elsewhere. Deprioritize or cut.
- [ ] For content to keep or add, it must include at least one of: proprietary data, a working first-party tool/calculator/demo, a real case study, or a distinct expert take not found elsewhere.
- [ ] Reformat content for extraction:
  - Lead each section with a direct, standalone answer (1–2 sentences) before supporting detail.
  - Clean heading hierarchy (H1 → H2 → H3), one topic per section.
  - Use tables, numbered steps, and bullet lists over long prose blocks.
  - Phrase key headings as actual questions where natural.
- [ ] Add a freshness/update pass cadence for evergreen pages — stale pages lose ground to recently updated ones in AI retrieval.

## 4. Structured Data (JSON-LD)

Schema helps crawlers and knowledge graphs understand **who you are** and how pages relate. It is **not** a proven AI-citation shortcut on pages already being retrieved — prioritize entity clarity over schema volume.

- [ ] `Organization` (or `LocalBusiness`) on homepage: name, URL, logo, `sameAs` social/profile links, legal/alternate names, stable `@id`.
- [ ] Prefer one connected `@graph` (Organization ↔ WebSite ↔ Service/Person via `@id`) over disconnected blocks.
- [ ] `WebSite` schema where useful (with `SearchAction` only if you have on-site search).
- [ ] `SoftwareApplication` schema for each app/demo/tool hosted on the site.
- [ ] `LocalBusiness` + `Service` + `GeoCoordinates` for local-business client sites — prefer one page per service and per location when the site is multi-service or multi-location; a single-location shop may strengthen the homepage instead of forcing thin extra URLs.
- [ ] `FAQPage` / `HowTo` only where the visible page content genuinely matches — each FAQ answer must be a complete, standalone response (no "see above"). Note: Google largely limits FAQ rich results to authoritative government/health sites; markup is still valid for other engines/parsers.
- [ ] `Person`/portfolio schema where relevant for personal sites or named authors (E-E-A-T).

## 5. llms.txt

- [ ] Optional hedge: publish `/llms.txt` at domain root. Emerging convention with **no proven citation lift** in 2026 studies; Google has stated it does not use the file. Ship it if cheap (API/docs sites, or a curated map you maintain) — do not prioritize it over crawler access, rendering, or content.
  Structure if you ship one:
  - Site/brand name + one-line description
  - Links to key pages (services, demos, about, contact) with a one-line description each — curated highlights, not a sitemap dump
  - Optional: link to a clean Markdown version of long-form pages if the HTML is heavy
- [ ] Do not rely on any auto-generated default `llms.txt` from a host/platform — it'll be generic and indistinguishable from competitors. Write it manually per site.

## 6. Local Business Client Sites (if applicable)

- [ ] Website structure mirrors the client's Google Business Profile exactly — matching service names, categories, and locations.
- [ ] One dedicated page per service × per location when there are multiple services or locations (no thin combined "services" list page). **Exception:** a single-shop, single-location site can keep one strong homepage with clear service sections + schema instead of forcing extra URLs.
- [ ] Copy explicitly names specific services and outcomes matching how customers phrase reviews/prompts (e.g., "emergency tankless water heater repair in [City]") — pull language directly from real reviews where possible.
- [ ] `LocalBusiness`/`Service`/`GeoCoordinates` schema implemented in the static build, not injected client-side only.

## 7. Off-Site Authority (not on-page, but required)

- [ ] Identify opportunities for mentions in other authoritative sites/publications, relevant directories, and (where applicable) Wikipedia/Wikidata — brand-mention frequency across the web correlates with AI citation frequency.
- [ ] Maintain accurate, consistent brand info across all external profiles (name, description, links) — inconsistency undermines entity matching.

## 8. Branded Demand / Diversification

- [ ] Track branded search volume (client name / app name searches) as a KPI, not just generic keyword rank.
- [ ] Maintain at least one non-search channel per client (YouTube, social, email list) so visibility isn't 100% dependent on any single engine.

## 9. Measurement

- [ ] Set up manual or tool-based tracking of AI citations — Search Console does not capture this. Periodically query ChatGPT, Perplexity, Gemini, and Claude with real target prompts and log which pages/competitors get cited.
- [ ] Track AI bot crawl activity in server logs over time, separate from human traffic — focus on **retrieval** agents (`OAI-SearchBot`, `Claude-SearchBot`, `PerplexityBot`, etc.).

---

**Priority order if doing this incrementally:** Section 0 → 1 → 2 → 3 → 4 → 5 → 6/7/8 → 9. Access, rendering, and icon/preview fixes are quick wins; extractable content beats schema volume for citations; `llms.txt` is last among on-page tech. All of it is wasted if retrieval crawlers can't reach the site (Section 0).
