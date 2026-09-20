# Unlimited Copies Takaka — AI search & SEO notes

Operational checklist for traditional SEO and AI-search visibility (Gemini, ChatGPT, Perplexity, Claude). On-page technical work lives in the build (static JSON-LD + prerendered HTML in `dist/index.html`).

## Section map (single URL)

Primary entity: **commercial printer in Takaka / Golden Bay / Tasman**.

| Anchor | Intent |
|--------|--------|
| `#` / H1 | Unlimited Copies Takaka — commercial printer |
| `#services` | Commercial printing Golden Bay |
| `#print-scan-finish` | Photocopying, scanning, finishing, SRA3 |
| `#business-cards` | Business cards Takaka |
| `#posters` | Poster printing Golden Bay |
| `#print` | Print enquiry builder (conversion; keep static lede) |
| `#visit` / `#contact` | Address, hours, NAP |
| `#postal-pickup` | NZ Couriers & Post Haste agent Takaka |
| `#vacuum-bags` | Vacuum bags Takaka / Miele / vac-pac |
| `#community` | Golden Bay Community Directory & GB Weekly |

Do **not** chase national “online printing” or “printing NZ” broker terms — the shop is walk-in / phone / email local.

## Print enquiry builder (crawlable copy)

The interactive selector in `#print` is JS state for conversion. **Keep** the Services section (and any static lede under `#print`) as real HTML listing SRA3, sides, finishing, job types — never move that catalogue into JS-only rendering. Prerender must still expose it in `dist/index.html`.

## Crawler access (Section 0)

- [`public/robots.txt`](public/robots.txt) allows all user agents, including AI bots (GPTBot, Google-Extended, ClaudeBot, PerplexityBot, Applebot-Extended).
- **GitHub Pages** has no server access logs here — bot crawl activity cannot be verified from this repo.
- **If Cloudflare (or another CDN/WAF) is added later:** allow AI bots in dashboard bot rules separately from robots.txt. Cloudflare can block AI crawlers at the edge even when robots.txt allows them.
- No login or paywall; all marketing content is public.

## Rendering (Section 1)

- `npm run build` prerenders `/` into `dist/index.html` so crawlers see main copy and JSON-LD without JavaScript.
- Custom domain + HTTPS: [`public/CNAME`](public/CNAME) → `unlimitedcopies.co.nz`.
- Canonical, sitemap, and [`public/llms.txt`](public/llms.txt) point at the custom domain only.

## NAP consistency (must match everywhere)

Use these exact public strings on the site, Google Business Profile, and Facebook:

| Field | Value |
|-------|--------|
| Name | Unlimited Copies Takaka |
| Address | 29 Commercial Street, Takaka 7110 |
| Phone | 03 525 8355 (`+6435258355`) |
| Email | ulc@actrix.co.nz |

On-site NAP is sourced from [`src/config.ts`](src/config.ts) (`BUSINESS` + helpers). Re-check GBP and Facebook after any change.

## Off-site & measurement (Sections 6–8)

- Keep NAP and description consistent on Facebook, Google Business Profile, and directories.
- **Reviews:** refresh Google Business Profile reviews — for a walk-in local shop this outweighs most further on-page tweaks.
- **Local backlink:** Takaka Rugby Football Club / Community Directory relationship is a natural reciprocal-mention opportunity (not manufactured link spam).
- Search Console does not report AI citations — periodically query ChatGPT, Perplexity, Gemini, and Claude with real local prompts (e.g. “print shop Takaka”, “courier pickup Takaka not RD”, “vacuum bags Takaka”) and log which sites are cited.
- Track branded searches for “Unlimited Copies Takaka” as a KPI alongside generic local terms.

## Content freshness

Review homepage copy and `lastmod` in [`public/sitemap.xml`](public/sitemap.xml) when services, hours, or contact details change.
