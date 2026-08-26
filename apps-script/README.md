# Google Apps Script mailer

Contact form → **unlimitedcopies07@gmail.com** (sending gateway) → **ulc@actrix.co.nz** (inbox), with file attachments.

## Deploy (must use the gateway Gmail)

1. Sign in to Google as **unlimitedcopies07@gmail.com**.
2. Open [script.google.com](https://script.google.com) → **New project**.
3. Name it e.g. `ULC website contact`.
4. Replace `Code.gs` with [`Code.gs`](./Code.gs) from this folder.
5. **Deploy → New deployment → Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Authorise Gmail when prompted.
7. Copy the Web app URL (ends with `/exec`).
8. GitHub repo **Settings → Secrets and variables → Actions** → secret named `VITE_GAS_WEBAPP_URL` = that URL.
9. Re-run **Deploy to GitHub Pages** (or push a commit) so the site rebuilds with the secret.

Locally: copy `.env.example` to `.env`, set the same URL, `npm run dev`.

## Flow

```text
Visitor form (+ files)
  → POST JSON to Apps Script /exec
  → GmailApp sends from unlimitedcopies07@gmail.com
  → To: ulc@actrix.co.nz
  → Reply-To: visitor’s email
```

## Test

1. Open the `/exec` URL in a browser → JSON with `"ok": true`.
2. Submit the site form with a small PDF → mail arrives at **ulc@actrix.co.nz**.
3. Reply from Actrix should go to the visitor (Reply-To).

## Notes

- Browser uses `Content-Type: text/plain` to avoid CORS preflight issues.
- Attachment total ~6–7 MB max.
- Rotate the deployment URL if it is ever abused.
