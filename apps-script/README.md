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
8. In the project root, copy `.env.example` to `.env` and set:

```env
VITE_GAS_WEBAPP_URL=https://script.google.com/macros/s/XXXXXXXX/exec
```

9. Restart `npm run dev` (or rebuild for production). For GitHub Pages, add `VITE_GAS_WEBAPP_URL` as a repository secret and wire it into the deploy workflow build step if you do not want the URL in the client repo — the URL is public once the form is live either way.

## Test

- Opening the `/exec` URL in a browser should return JSON from `doGet`.
- Submit the site contact form with a small PDF attached and confirm mail arrives at `ulc@actrix.co.nz`.

## Notes

- The browser sends `Content-Type: text/plain` so the request stays a simple CORS request.
- Attachment total size is capped (~6–7 MB) on both the site and the script.
- Reply-To is set to the visitor’s email so you can reply directly from Gmail.
