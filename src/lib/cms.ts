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

/*
 * Preview: the admin's "Preview on site" button stores unsaved changes in this
 * browser's localStorage and opens /?cms_preview=1. Only that browser sees
 * them; nothing is published.
 */
function applyPreview(): void {
  if (typeof window === 'undefined' || !/[?&]cms_preview=1\b/.test(window.location.search)) return;
  let draft: Record<string, unknown> | null = null;
  try {
    draft = JSON.parse(localStorage.getItem('fsia_cms_preview') || 'null');
  } catch {
    return;
  }
  if (!draft || typeof draft !== 'object' || Date.now() - Number(draft.savedAt || 0) > 86400000) return;
  const cms = (window.__FSIA_CMS__ = { ...(window.__FSIA_CMS__ || {}) });
  for (const [key, content] of Object.entries(draft)) {
    if (key !== 'savedAt' && content && typeof content === 'object') cms[key] = { content: content as Record<string, unknown> };
  }
  const banner = document.createElement('div');
  banner.textContent = 'PREVIEW — unsaved changes, visible only to you. Press "Save & publish" in the admin to make them live.';
  banner.setAttribute('style', 'position:fixed;left:50%;bottom:16px;transform:translateX(-50%);z-index:2147483647;background:#0C1322;color:#EADBAC;border:1px solid #D4AF37;padding:10px 16px;border-radius:12px;font:600 13px/1.4 system-ui,sans-serif;box-shadow:0 10px 30px rgba(0,0,0,.35);max-width:calc(100% - 32px);text-align:center');
  const add = () => document.body.appendChild(banner);
  if (document.body) add();
  else document.addEventListener('DOMContentLoaded', add);
}
applyPreview();

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

/** Any other field saved in a section (e.g. calendar_events.types). Missing -> fallback. */
export function cmsField<T>(key: string, field: string, fallback: T): T {
  const v = section(key)?.[field];
  return v === undefined || v === null ? fallback : (v as T);
}

/** An object section; saved fields override the fallback's. */
export function cmsObject<T extends object>(key: string, fallback: T): T {
  const c = section(key);
  return c ? { ...fallback, ...(c as Partial<T>) } : fallback;
}

/** The "header" object saved next to a list section's items, over its defaults. */
export function cmsHeader<T extends object>(key: string, fallback: T): T {
  const h = section(key)?.header;
  return h && typeof h === 'object' && !Array.isArray(h) ? { ...fallback, ...(h as Partial<T>) } : fallback;
}
