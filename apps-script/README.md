# Google Apps Script mailer

The contact form posts JSON (including base64 file attachments) to a Google Apps Script web app, which emails **ulc@actrix.co.nz**.

## Deploy

1. Open [script.google.com](https://script.google.com) and create a **New project**.
2. Rename it (e.g. `ULC contact form`).
3. Replace the default `Code.gs` contents with [`Code.gs`](./Code.gs) from this folder.
4. Click **Deploy → New deployment**.
5. Type: **Web app**.
6. Settings:
   - **Execute as:** Me
   - **Who has access:** Anyone
7. Deploy and **copy the Web app URL** (ends with `/exec`).
8. Add the Web app URL as a **GitHub Actions secret** named `VITE_GAS_WEBAPP_URL` (repo → Settings → Secrets and variables → Actions). The deploy workflow injects it at build time.
9. Optional for local preview: copy `.env.example` to `.env` and set the same URL, then restart `npm run dev`.

Until the secret exists, the live site shows an **Under construction** contact panel with mailto/phone CTAs instead of the attachment form.

## Test

- Opening the `/exec` URL in a browser should return JSON from `doGet`.
- After the secret is set and the site is rebuilt, submit the contact form with a small PDF and confirm mail arrives at `ulc@actrix.co.nz`.

## Notes

- The browser sends `Content-Type: text/plain` so the request stays a simple CORS request.
- Attachment total size is capped (~6–7 MB) on both the site and the script.
- Reply-To is set to the visitor’s email so you can reply directly from Gmail.
- The `/exec` URL is embedded in the static JS at build time (normal for `VITE_*` vars). Protect the script with validation in `Code.gs`; rotate the deployment if the URL is ever abused.
