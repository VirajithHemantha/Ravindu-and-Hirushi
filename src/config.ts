// Central wedding configuration — edit details here and they update everywhere
// (invitation, envelope, admin link generator, WhatsApp message).

export const WEDDING = {
  groomName: 'Ravindu',
  brideName: 'Hirushi',

  groomParents: 'Son of Mr. N A D Dauglas & Late Mrs. Sendanayake',
  brideParents: 'Daughter of Mr. Samaraweera Arachchi & Mrs. Meegoda',

  // Sri Lanka time (UTC+05:30)
  dateISO: '2026-12-17T10:00:00+05:30',
  dayName: 'Thursday',
  dateLong: 'Thursday, 17 December 2026',
  dateShort: '17 . 12 . 2026',
  dateHeading: 'Thursday, December 17',
  yearInWords: 'The Year Two Thousand Twenty Six',
  monthYear: 'December 2026',
  startTime: '10:00 AM',

  venueHall: 'Main Ballroom',
  venueName: 'Avinka Grand Luxury Banquet',
  mapEmbedQuery: 'Avinka Grand Luxury Banquet, Sri Lanka',
  mapLink: 'https://maps.app.goo.gl/JQKNSZMWoKFrtoZa6',

  timeline: [
    { time: '10:00 AM', title: 'Poruwa Ceremony', desc: 'The traditional and sacred Poruwa ceremony' },
    { time: '12:30 PM', title: 'Buffet Opens', desc: 'A grand celebratory feast with our loved ones' },
    { time: '04:00 PM', title: 'Farewell', desc: 'The celebration comes to a close as we begin our journey together' },
  ],
} as const;

export const COUPLE_NAMES = `${WEDDING.groomName} & ${WEDDING.brideName}`;

// Google Apps Script Web App URL (Deploy > Web app > copy URL ending in /exec).
// Can also be set via .env: VITE_GOOGLE_APPS_SCRIPT_URL=...
export const GOOGLE_SCRIPT_URL: string =
  (import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL as string | undefined) ||
  'PASTE_YOUR_WEB_APP_URL_HERE';

export const isScriptConfigured = () => GOOGLE_SCRIPT_URL.startsWith('https://script.google.com/');

/** Sends a form submission to the Google Sheet. Uses urlencoded body so Apps Script fills e.parameter. */
export async function submitToSheet(sheet: 'RSVP' | 'Wishes', data: Record<string, string>) {
  if (!isScriptConfigured()) {
    throw new Error('Google Apps Script URL is not configured in src/config.ts');
  }
  const body = new URLSearchParams({ sheet, ...data });
  // no-cors: Apps Script doesn't return CORS headers; the request still reaches the script.
  await fetch(GOOGLE_SCRIPT_URL, { method: 'POST', mode: 'no-cors', body });
}
