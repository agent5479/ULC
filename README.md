# Unlimited Copies Takaka

Marketing site for **Unlimited Copies Takaka** — commercial printer and postal pickup/drop-off at 29 Commercial Street, Takaka.

- Live (GitHub Pages): https://agent5479.github.io/ULC/
- Email: ulc@actrix.co.nz
- Phone: 03 525 8355

## Stack

- Vite + React + TypeScript (static)
- Deploy: GitHub Actions → GitHub Pages
- Contact form mailer: [Google Apps Script](./apps-script/README.md)

## Local development

```bash
npm install
cp .env.example .env   # add VITE_GAS_WEBAPP_URL after deploying Apps Script
npm run dev
```

## Logo swap

Edit `ACTIVE_LOGO` in [`src/config.ts`](./src/config.ts) to `1`–`6`.

## Images

Optimized assets live in `public/images` and `public/logos`. Originals (gitignored) can sit in `raw-assets/`. Re-run:

```bash
npm run optimize-images
```

## Build

```bash
npm run build
npm run preview
```
