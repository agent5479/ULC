# Unlimited Copies Takaka

Marketing site for **Unlimited Copies Takaka** — commercial printer and postal pickup/drop-off at 29 Commercial Street, Takaka.

- Live: https://unlimitedcopies.co.nz/
- Email: ulc@actrix.co.nz
- Phone: 03 525 8355

## Stack

- Vite + React + TypeScript (static)
- Deploy: GitHub Actions → GitHub Pages
- Contact form mailer: [Google Apps Script](./apps-script/README.md) via **GitHub Actions secret**

## Contact form status

Form UI is live on the site. Sending needs the Apps Script gateway:

- **From (gateway):** unlimitedcopies07@gmail.com  
- **To (shop inbox):** ulc@actrix.co.nz  

Deploy steps: [`apps-script/README.md`](./apps-script/README.md). Then set GitHub Actions secret `VITE_GAS_WEBAPP_URL` and redeploy.

## Local development

```bash
npm install
cp .env.example .env   # optional until Apps Script is ready
npm run dev
```

## Logo swap

Click the logo in the **header** or **hero** to cycle through options 1–6. The choice is remembered in the browser (`localStorage`) for the showcase.

To lock a final logo in code later, set `ACTIVE_LOGO` in [`src/config.ts`](./src/config.ts).

## Images

Optimized assets live in `public/images` and `public/logos`. Originals (gitignored) can sit in `raw-assets/`. Re-run:

```bash
npm run optimize-images
npm run generate-favicons
```

Favicons are generated from `public/logos/logo1.png` (16/32/48, apple-touch 180, Android 192/512, plus `favicon.ico` and `site.webmanifest`).

## Build

```bash
npm run build
npm run preview
```
