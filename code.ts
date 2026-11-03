// @ts-nocheck
/**
 * Ravindu & Hirushi — Wedding RSVP + Wishes → Google Sheets
 *
 * Paste this whole file into Extensions > Apps Script (Code.gs) of the spreadsheet, then
 * Deploy > New deployment > Web app (Execute as: Me, Who has access: Anyone).
 * Copy the /exec URL into src/config.ts (GOOGLE_SCRIPT_URL).
 *
 * The "RSVP" and "Wishes" sheets (tabs) are created automatically with headers on first use.
 * You can also run `setup` once from the editor to create them immediately.
 */

const SPREADSHEET_ID = '1E0ugl3mvVPoWnp2ZX4_kz3hJQi3B2a63wmslhwViTQo';
const TIMEZONE = 'Asia/Colombo';

const SHEETS = {
  RSVP: {
    name: 'RSVP',
    color: '#722F37', // maroon
    headers: ['Timestamp', 'Full Name', 'Number of Guests', 'Dietary Notes', 'Attendance', 'Invited As'],
    widths: [170, 220, 140, 300, 110, 220],
    row: (p) => [p.name, p.guests, p.dietary, p.attendance, p.invitedAs],
  },
  WISHES: {
    name: 'Wishes',
    color: '#097969', // emerald
    headers: ['Timestamp', 'Name', 'Message', 'Invited As'],
    widths: [170, 220, 480, 220],
    row: (p) => [p.name, p.message, p.invitedAs],
  },
};

/** Resolves the `sheet` param (accepts RSVP, Wishes, Wish, WISH …). */
function resolveSheetConfig_(sheetParam) {
  const key = String(sheetParam || '').trim().toUpperCase();
  if (key === 'RSVP') return SHEETS.RSVP;
  if (key === 'WISHES' || key === 'WISH') return SHEETS.WISHES;
  return null;
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);

    const p = parsePayload_(e);
    const config = resolveSheetConfig_(p.sheet);
    if (!config) {
      return jsonResponse_({ ok: false, error: 'Invalid sheet. Use "RSVP" or "Wishes".' });
    }

    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = getOrCreateSheet_(ss, config);

    const values = config.row(p).map(clean_);
    sheet.appendRow([new Date()].concat(values));

    const lastRow = sheet.getLastRow();
    sheet.getRange(lastRow, 1).setNumberFormat('yyyy-mm-dd hh:mm:ss');
    sheet.getRange(lastRow, 1, 1, config.headers.length).setWrap(true).setVerticalAlignment('top');

    return jsonResponse_({ ok: true, sheet: config.name, row: lastRow });
  } catch (error) {
    return jsonResponse_({ ok: false, error: String(error && error.message ? error.message : error) });
  } finally {
    try { lock.releaseLock(); } catch (_) {}
  }
}

function doGet() {
  return jsonResponse_({ ok: true, message: 'Ravindu & Hirushi wedding endpoint is running.' });
}

/** Run once from the Apps Script editor to create both sheets with headers right away. */
function setup() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  ss.setSpreadsheetTimeZone(TIMEZONE);
  getOrCreateSheet_(ss, SHEETS.RSVP);
  getOrCreateSheet_(ss, SHEETS.WISHES);
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getOrCreateSheet_(ss, config) {
  let sheet = ss.getSheetByName(config.name);
  if (!sheet) {
    sheet = ss.insertSheet(config.name);
  }
  ensureHeaders_(sheet, config);
  return sheet;
}

/** Writes + styles the header row if the sheet is empty or its header row is wrong/missing. */
function ensureHeaders_(sheet, config) {
  const headers = config.headers;
  const lastRow = sheet.getLastRow();

  if (lastRow > 0) {
    const current = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
    const matches = headers.every((h, i) => String(current[i]).trim() === h);
    if (matches) return;
    // Data exists but no proper header row: insert one on top instead of overwriting data
    const looksLikeHeader = String(current[0]).trim() === headers[0];
    if (!looksLikeHeader) sheet.insertRowBefore(1);
  }

  const range = sheet.getRange(1, 1, 1, headers.length);
  range
    .setValues([headers])
    .setFontWeight('bold')
    .setFontColor('#FFFFFF')
    .setBackground(config.color)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');
  sheet.setRowHeight(1, 32);
  sheet.setFrozenRows(1);
  config.widths.forEach((w, i) => sheet.setColumnWidth(i + 1, w));

  // Remove unused default columns for a tidy sheet
  const maxCols = sheet.getMaxColumns();
  if (maxCols > headers.length) {
    sheet.deleteColumns(headers.length + 1, maxCols - headers.length);
  }
}

/** Trims values and neutralises spreadsheet formula injection (=, +, -, @). */
function clean_(value) {
  const s = value === undefined || value === null ? '' : String(value).trim();
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function parsePayload_(e) {
  const params = (e && e.parameter) || {};
  if (Object.keys(params).length > 0) return params;

  const contents = e && e.postData && e.postData.contents ? e.postData.contents : '';
  if (!contents) return {};

  const trimmed = contents.trim();
  if (trimmed.charAt(0) === '{') {
    try { return JSON.parse(trimmed); } catch (_) { return {}; }
  }
  return parseQueryString_(trimmed);
}

function parseQueryString_(query) {
  const out = {};
  String(query).split('&').forEach((part) => {
    if (!part) return;
    const idx = part.indexOf('=');
    const rawKey = idx >= 0 ? part.slice(0, idx) : part;
    const rawValue = idx >= 0 ? part.slice(idx + 1) : '';
    out[decodeURIComponent(rawKey.replace(/\+/g, ' '))] = decodeURIComponent(rawValue.replace(/\+/g, ' '));
  });
  return out;
}

function jsonResponse_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
