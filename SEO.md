# Unlimited Copies Takaka — AI search & SEO notes

Operational checklist for traditional SEO and AI-search visibility (Gemini, ChatGPT, Perplexity, Claude). On-page technical work lives in the build (static JSON-LD + prerendered HTML in `dist/index.html`).

## Crawler access (Section 0)

- [`public/robots.txt`](public/robots.txt) allows all user agents, including AI bots (GPTBot, Google-Extended, ClaudeBot, PerplexityBot, Applebot-Extended).
- **GitHub Pages** has no server access logs here — bot crawl activity cannot be verified from this repo.
- **If Cloudflare (or another CDN/WAF) is added later:** allow AI bots in dashboard bot rules separately from robots.txt. Cloudflare can block AI crawlers at the edge even when robots.txt allows them.
- No login or paywall; all marketing content is public.

## Rendering (Section 1)

- `npm run build` prerenders `/` into `dist/index.html` so crawlers see main copy and JSON-LD without JavaScript.
- Custom domain + HTTPS: [`public/CNAME`](public/CNAME) → `unlimitedcopies.co.nz`.
- Canonical, sitemap, and [`public/llms.txt`](public/llms.txt) point at the custom domain only.

## Off-site & measurement (Sections 6–8)

- Keep NAP and description consistent on Facebook, Google Business Profile, and directories.
- Search Console does not report AI citations — periodically query ChatGPT, Perplexity, Gemini, and Claude with real local prompts (e.g. “print shop Takaka”, “courier pickup Takaka not RD”) and log which sites are cited.
- Track branded searches for “Unlimited Copies Takaka” as a KPI alongside generic local terms.

## Content freshness

Review homepage copy and `lastmod` in [`public/sitemap.xml`](public/sitemap.xml) when services, hours, or contact details change.
