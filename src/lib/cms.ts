/**
 * Homepage content managed in the FSIA CMS admin (https://www.fsia.in/cms-admin/).
 *
 * index.php reads the CMS rows for page "index" straight from the database and
 * prints them as window.__FSIA_CMS__ before this bundle loads, so content is
 * available synchronously (no extra request, no flash of old content).
 * Anything missing or empty falls back to the built-in defaults in fsiaData.ts.
 */

type CmsSection = { content?: Record<string, unknown>; image_url?: string };

declare global {
  interface Window {
    __FSIA_CMS__?: Record<string, CmsSection>;
  }
}

function section(key: string): Record<string, unknown> | undefined {
  if (typeof window === 'undefined') return undefined;
  const s = window.__FSIA_CMS__?.[key];
  return s && typeof s.content === 'object' && s.content !== null ? s.content : undefined;
}

/** A list section saved as { items: [...] }. Empty or missing -> fallback. */
export function cmsList<T>(key: string, fallback: T[]): T[] {
  const items = section(key)?.items;
  return Array.isArray(items) && items.length > 0 ? (items as T[]) : fallback;
}

/** An object section; saved fields override the fallback's. */
export function cmsObject<T extends object>(key: string, fallback: T): T {
  const c = section(key);
  return c ? { ...fallback, ...(c as Partial<T>) } : fallback;
}
