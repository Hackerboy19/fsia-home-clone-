import React from 'react';
import { CELEBRITIES as DEFAULT_CELEBRITIES } from '../data/fsiaData';
import { cmsHeader, cmsList } from '../lib/cms';
import { DEFAULT_CELEBS_TEXT } from '../data/homeContent';
import { CelebrityItem } from '../types';

// Managed in the CMS admin (Homepage -> Celebrity Jury & Guests).
// Headings and fixed text, edited under Homepage -> Celebrity Jury & Guests.
const HEAD = cmsHeader('celebrities', DEFAULT_CELEBS_TEXT);
const CELEBRITIES = cmsList<CelebrityItem>('celebrities', DEFAULT_CELEBRITIES);
import { FSIAImage } from './FSIAImage';

export const CelebritiesRecognitionSection: React.FC = () => {
  return (
    <section id="celebrities" className="py-20 md:py-24 bg-white relative border-b border-[#EADBAC]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FAF7F0] border border-[#D4AF37]/40 text-[#7E591B] text-[11px] font-semibold tracking-widest uppercase mb-4 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B]" />
            <span>{HEAD.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#0C1322] tracking-tight">
            {HEAD.title}
          </h2>
          <p className="text-base text-[#475569] mt-3 font-sans leading-relaxed">
            {HEAD.subtitle}
          </p>
        </div>

        {/* Celebrity Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {CELEBRITIES.map((celeb) => (
            <div
              key={celeb.id}
              className="bg-[#FAF9F5] border border-[#EADBAC] overflow-hidden shadow-2xs hover:border-[#D4AF37] transition-colors flex flex-col"
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden shrink-0 bg-neutral-900">
                <FSIAImage
                  src={celeb.image}
                  alt={celeb.name}
                  className="w-full h-full"
                  objectPosition="top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C1322]/80 via-transparent to-transparent pointer-events-none" />
                <span className="absolute bottom-3 left-3 text-[10px] font-sans font-bold uppercase tracking-wider text-[#EADBAC] bg-[#0C1322]/90 px-2.5 py-1 border border-[#D4AF37]/40">
                  {celeb.role.split('&')[0].trim()}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#7E591B] font-bold block mb-1">
                    {celeb.event}
                  </span>
                  <h3 className="text-xl font-display font-bold text-[#0C1322]">
                    {celeb.name}
                  </h3>
                  <p className="text-xs font-sans font-semibold text-[#B8860B] mt-0.5">
                    {celeb.role}
                  </p>
                  <p className="text-xs sm:text-sm text-[#526077] font-sans mt-3 leading-relaxed">
                    {celeb.description}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-[#EADBAC] flex items-center justify-between text-xs text-[#7E591B] font-medium font-sans">
                  <span>{HEAD.cardLeft}</span>
                  <span className="text-[#0C1322] font-semibold text-right">{HEAD.cardRight}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Authentic Institutional Strip - No icon-bubble clichés */}
        <div className="p-6 sm:p-8 border border-[#D4AF37]/40 bg-[#FAF8F2] grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-sm font-display font-bold text-[#0C1322] uppercase tracking-wider">
              {HEAD.box1Title}
            </h4>
            <p className="text-xs text-[#526077] font-sans mt-1.5 leading-relaxed">
              {HEAD.box1Text}
            </p>
          </div>

          <div className="md:border-l md:border-[#EADBAC] md:pl-8">
            <h4 className="text-sm font-display font-bold text-[#0C1322] uppercase tracking-wider">
              {HEAD.box2Title}
            </h4>
            <p className="text-xs text-[#526077] font-sans mt-1.5 leading-relaxed">
              {HEAD.box2Text}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
