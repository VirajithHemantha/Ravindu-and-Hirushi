export const PREFIXES = ['Mr.', 'Mrs.', 'Miss', 'Mr. & Mrs.', 'Family', 'Dear'] as const;
export type Prefix = (typeof PREFIXES)[number];

/**
 * Combines prefix + name into the guest's display name.
 *  Mr.        + Sanjaya -> "Mr. Sanjaya"
 *  Family     + Sanjaya -> "Sanjaya and Family"
 *  Dear       + Sanjaya -> "Sanjaya"   (greeting already starts with "Dear")
 */
export function buildDisplayName(prefix: Prefix, name: string): string {
  const clean = name.trim().replace(/\s+/g, ' ');
  if (!clean) return '';
  switch (prefix) {
    case 'Family':
      return `${clean} and Family`;
    case 'Dear':
      return clean;
    default:
      return `${prefix} ${clean}`;
  }
}

/** Builds `{baseURL}/{displayName}` with the name safely URL-encoded. */
export function buildInviteLink(baseUrl: string, displayName: string): string {
  return `${baseUrl.replace(/\/+$/, '')}/${encodeURIComponent(displayName)}`;
}

/**
 * Reads the guest display name from the current URL.
 * Supports the path format (/Mr.%20Sanjaya) and the legacy query format (?prefix=Mr.&name=Sanjaya).
 */
export function getGuestNameFromUrl(): string | null {
  const params = new URLSearchParams(window.location.search);
  const legacyName = params.get('name');
  if (legacyName) {
    const legacyPrefix = params.get('prefix') ?? '';
    return (PREFIXES as readonly string[]).includes(legacyPrefix)
      ? buildDisplayName(legacyPrefix as Prefix, legacyName)
      : `${legacyPrefix} ${legacyName}`.trim();
  }

  const segment = window.location.pathname.replace(/^\/+|\/+$/g, '');
  if (!segment || segment.toLowerCase() === 'admin' || segment.includes('/')) return null;
  try {
    const decoded = decodeURIComponent(segment).trim();
    return decoded || null;
  } catch {
    return null;
  }
}
