import React from 'react';
import { cmsObject } from '../lib/cms';
import { linkProps } from '../lib/richText';
import { DEFAULT_PARTNERS } from '../data/homeContent';

// Edited under Homepage -> Partners in the CMS admin.
const P = cmsObject('home_partners', DEFAULT_PARTNERS);
const PARTNERS = Array.isArray(P.items) ? P.items.filter((x) => x && x.name) : [];
import { FSIAImage } from './FSIAImage';

export const OfficialPartnersSection: React.FC = () => {
  return (
    <section id="partners" className="py-20 md:py-24 bg-[#FAF9F5] relative border-b border-[#EADBAC]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#D4AF37]/40 text-[#7E591B] text-[11px] font-semibold tracking-widest uppercase mb-4 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B]" />
            <span>{P.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#0C1322] tracking-tight">
            {P.title}
          </h2>
          <p className="text-base text-[#475569] mt-3 font-sans leading-relaxed">
            {P.subtitle}
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {PARTNERS.map((partner) => (
            <div
              key={partner.id || partner.name}
              className="bg-white border border-[#EADBAC] p-5 shadow-2xs hover:border-[#D4AF37] transition-colors flex flex-col justify-between items-center text-center group h-full"
            >
              {/* Logo Container with object-contain */}
              <div className="w-full h-24 sm:h-28 flex items-center justify-center p-3 mb-3 bg-white border border-neutral-100">
                <FSIAImage
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  className="w-full h-full bg-white flex items-center justify-center"
                  imgClassName="object-contain max-h-full max-w-full p-1 transition-opacity duration-300"
                  objectFit="contain"
                  objectPosition="center"
                />
              </div>

              {/* Partner Information */}
              <div className="w-full pt-2 border-t border-neutral-100 flex flex-col items-center">
                <h3 className="text-xs sm:text-sm font-display font-bold text-[#0C1322] leading-snug">
                  {partner.name}
                </h3>
                <span className="text-[11px] font-sans font-medium text-[#7E591B] mt-0.5 tracking-wide">
                  {partner.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Section Verification Notice & Direct Sponsor Directory Link */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-5 bg-white p-6 border border-[#EADBAC] max-w-4xl mx-auto">
          <div>
            <p className="text-xs font-bold text-[#0C1322] uppercase tracking-wider font-sans">
              {P.noticeTitle}
            </p>
            <p className="text-xs text-[#64748B] font-sans mt-0.5">
              {P.noticeText}
            </p>
          </div>

          {P.buttonText && <a
            {...linkProps(P.buttonUrl)}
            className="inline-flex items-center px-6 py-2.5 bg-[#0C1322] hover:bg-[#1A253E] text-[#EADBAC] hover:text-white text-xs font-bold uppercase tracking-wider border border-[#D4AF37]/50 transition-colors shrink-0"
          >
            {P.buttonText}
          </a>}
        </div>

      </div>
    </section>
  );
};
