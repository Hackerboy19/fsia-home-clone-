import React from 'react';

/** "Plain text with **bold** parts" -> React nodes. No HTML is interpreted. */
export function richText(text: string): React.ReactNode[] {
  return String(text || '')
    .split(/(\*\*[^*]+\*\*)/g)
    .filter(Boolean)
    .map((part, i) => (part.startsWith('**') && part.endsWith('**') ? <strong key={i}>{part.slice(2, -2)}</strong> : part));
}

/** http(s) links open in a new tab (as before); tel:, mailto: and # links do not. */
export function linkProps(url: string): { href: string; target?: string; rel?: string } {
  const href = url || '#';
  return /^https?:\/\//i.test(href) ? { href, target: '_blank', rel: 'noopener noreferrer' } : { href };
}
