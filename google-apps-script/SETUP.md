# Google Sheets setup (RSVP + Wishes)

Spreadsheet: https://docs.google.com/spreadsheets/d/1E0ugl3mvVPoWnp2ZX4_kz3hJQi3B2a63wmslhwViTQo/edit

1. Open the spreadsheet > Extensions > Apps Script.
2. Replace everything in Code.gs with the contents of `code.ts` (or `google-apps-script/code.gs` — same code).
3. Save, then select `setup` in the function dropdown and click Run once (approve permissions).
   This creates the **RSVP** and **Wishes** tabs with styled headers. (They are also auto-created on the first submission.)
4. Deploy > New deployment > type **Web app** — Execute as: **Me**, Who has access: **Anyone** > Deploy.
5. Copy the Web App URL (ends with `/exec`) and paste it into `GOOGLE_SCRIPT_URL` in `src/config.ts`
   (or set `VITE_GOOGLE_APPS_SCRIPT_URL` in `.env` / Vercel environment variables).
6. Redeploy the site.

If you change the Apps Script later: Deploy > Manage deployments > Edit > Version: New version.

Columns:
- RSVP: Timestamp | Full Name | Number of Guests | Dietary Notes | Attendance | Invited As
- Wishes: Timestamp | Name | Message | Invited As

Wishes are stored only in the sheet — they are not shown on the invitation.
