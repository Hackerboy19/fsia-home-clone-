import React, { useEffect, useMemo, useState } from 'react';
import { cmsObject } from '../lib/cms';

/**
 * Advertisement slot (CMS key "advertisement").
 *
 * Each ad has a desktop image and an optional mobile image. Size is either
 * "auto" (the image scales to the slot width, keeping its proportions) or
 * "manual" (exact width × height in px, still capped at the screen width).
 * Ads with a start/end date only show inside that window; several active ads
 * rotate every `rotateSeconds`.
 *
 * Until the admin saves this section, the original 728×90 / 300×250
 * placeholder is shown, exactly as before.
 */

export interface AdItem {
  id: string;
  title?: string;
  image: string;
  mobileImage?: string;
  link?: string;
  alt?: string;
  sizeMode?: 'auto' | 'manual';
  width?: number;
  height?: number;
  mobileWidth?: number;
  mobileHeight?: number;
  startDate?: string;
  endDate?: string;
  active?: boolean;
}

interface AdSettings {
  enabled: boolean;
  label: string;
  rotateSeconds: number;
  items: AdItem[];
}

const NOT_CONFIGURED: AdSettings = { enabled: true, label: 'Advertisement', rotateSeconds: 6, items: [] };

function isLive(ad: AdItem, now: number): boolean {
  if (ad.active === false || !ad.image) return false;
  if (ad.startDate && now < new Date(ad.startDate).getTime()) return false;
  if (ad.endDate && now > new Date(ad.endDate).getTime()) return false;
  return true;
}

function sizeStyle(w?: number, h?: number): React.CSSProperties {
  return {
    width: w ? `${w}px` : undefined,
    height: h ? `${h}px` : undefined,
    maxWidth: '100%',
    objectFit: w && h ? 'cover' : undefined,
  };
}

const Placeholder: React.FC = () => (
  <>
    <div className="hidden md:flex mt-3 mx-auto w-[728px] max-w-full h-[90px] items-center justify-center border border-dashed border-[#D4AF37]/45 bg-white">
      <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#9AA3B2]">728 &times; 90</span>
    </div>
    <div className="flex md:hidden mt-3 mx-auto w-[300px] max-w-full h-[250px] items-center justify-center border border-dashed border-[#D4AF37]/45 bg-white">
      <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#9AA3B2]">300 &times; 250</span>
    </div>
  </>
);

export const AdvertisementSection: React.FC = () => {
  const configured = typeof window !== 'undefined' && !!window.__FSIA_CMS__?.advertisement;
  const settings = cmsObject<AdSettings>('advertisement', NOT_CONFIGURED);
  const live = useMemo(() => (settings.items || []).filter((ad) => isLive(ad, Date.now())), [settings.items]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (live.length < 2) return undefined;
    const ms = Math.max(3, Number(settings.rotateSeconds) || 6) * 1000;
    const t = setInterval(() => setIndex((i) => (i + 1) % live.length), ms);
    return () => clearInterval(t);
  }, [live.length, settings.rotateSeconds]);

  if (configured && (!settings.enabled || live.length === 0)) return null;

  const ad = live[index % Math.max(live.length, 1)];
  const manual = ad?.sizeMode === 'manual';

  const body = ad ? (
    <div className="mt-3 flex justify-center">
      <picture className="block max-w-full">
        {ad.mobileImage && <source media="(max-width: 767px)" srcSet={ad.mobileImage} />}
        <img
          src={ad.image}
          alt={ad.alt || ad.title || 'Advertisement'}
          loading="lazy"
          decoding="async"
          className={`block mx-auto ${manual ? '' : 'w-full h-auto'}`}
          style={manual ? sizeStyle(ad.width, ad.height) : undefined}
        />
      </picture>
      {manual && (ad.mobileWidth || ad.mobileHeight) ? (
        <style>{`@media (max-width: 767px){#advertisement img{width:${ad.mobileWidth ? ad.mobileWidth + 'px' : 'auto'} !important;height:${ad.mobileHeight ? ad.mobileHeight + 'px' : 'auto'} !important;}}`}</style>
      ) : null}
    </div>
  ) : (
    <Placeholder />
  );

  return (
    <section id="advertisement" className="py-12 md:py-16 bg-white border-b border-[#EADBAC]/60" aria-label="Advertisement">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative mx-auto w-full max-w-[760px] bg-[#FAF9F5] border border-[#EADBAC] shadow-2xs px-4 py-6 sm:px-6 sm:py-7">
          <span className="absolute top-2 right-3 text-[10px] font-sans font-semibold uppercase tracking-[0.18em] text-[#9AA3B2] select-none">
            {settings.label || 'Advertisement'}
          </span>
          {ad?.link ? (
            <a href={ad.link} target="_blank" rel="noopener sponsored" aria-label={ad.title || 'Advertisement'}>
              {body}
            </a>
          ) : (
            body
          )}
          {live.length > 1 && (
            <div className="mt-3 flex justify-center gap-1.5" aria-hidden="true">
              {live.map((a, i) => (
                <span key={a.id} className={`h-1.5 rounded-full transition-all ${i === index % live.length ? 'w-6 bg-[#D4AF37]' : 'w-1.5 bg-[#EADBAC]'}`} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
