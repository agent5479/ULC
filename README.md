# Unlimited Copies Takaka

Marketing site for **Unlimited Copies Takaka** — commercial printer at 29 Commercial Street, Takaka (also NZ Couriers / Post Haste agent).

- Live: https://unlimitedcopies.co.nz/
- Email: ulc@actrix.co.nz
- Phone: 03 525 8355

## Stack

- Vite + React + TypeScript (static)
- Deploy: GitHub Actions → GitHub Pages
- Contact form mailer: [Google Apps Script](./apps-script/README.md) via **GitHub Actions secret**

## Print enquiry builder

The `#print` section lets visitors choose job type, paper, size, colour, sides, finishing, and quantity. **Apply to enquiry form** fills the contact message (no live prices yet — structure ready for a later pricelist). UX inspired by GBTech `sim-demos` estimate wizards.

## Contact form status

Form UI is live. Mail gateway is wired via GitHub Actions secret `VITE_GAS_WEBAPP_URL`:

- **From (gateway):** unlimitedcopies07@gmail.com  
- **To (shop inbox):** ulc@actrix.co.nz  

Deploy / rotate the Apps Script URL: [`apps-script/README.md`](./apps-script/README.md). After changing the secret, re-run **Deploy to GitHub Pages**.

## Local development

```bash
npm install
cp .env.example .env   # optional until Apps Script is ready
npm run dev
```

## Images

Shop photos live in `public/images`; the wordmark is `public/logos/ulc-logo.png`. Re-run:

```bash
npm run optimize-images
npm run generate-favicons
```

`optimize-images` resizes photos to a 1600px max edge (JPEG + WebP) and writes a web-sized wordmark. Favicons are generated from `public/icons/printer.svg` (16/32/48, apple-touch 180, Android 192/512, plus `favicon.ico` and `site.webmanifest`).

## Build

```bash
npm run build
npm run preview
```

See [SEO.md](./SEO.md) for AI-search / crawler notes (robots, prerender, llms.txt).
