import React from 'react';
import { PAGEANTS } from '../data/fsiaData';
import { PageantItem } from '../types';
import { FSIAImage } from './FSIAImage';

interface PageantsSectionProps {
  onSelectPageant: (pageant: PageantItem) => void;
}

export const PageantsSection: React.FC<PageantsSectionProps> = ({
  onSelectPageant
}) => {
  // Premier flagship national pageants
  const missIndia = PAGEANTS.find((p) => p.id === 'forever-miss-india') || PAGEANTS[0];
  const mrsIndia = PAGEANTS.find((p) => p.id === 'forever-mrs-india') || PAGEANTS[1];
  const teenIndia = PAGEANTS.find((p) => p.id === 'forever-miss-teen-india') || PAGEANTS[2];

  // International & special editions
  const globalPageants = PAGEANTS.filter(
    (p) => !['forever-miss-india', 'forever-mrs-india', 'forever-miss-teen-india'].includes(p.id)
  );

  return (
    <section id="pageants" className="py-20 md:py-24 bg-white relative border-b border-[#EADBAC]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 pb-6 border-b border-[#EADBAC]/80">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FAF7F0] border border-[#D4AF37]/40 text-[#7E591B] text-[11px] font-semibold tracking-widest uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B]" />
              <span>OFFICIAL TITLE EDITIONS • SEASON 2026</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#0C1322] tracking-tight">
              NATIONAL &amp; GLOBAL PAGEANTS
            </h2>
            <p className="text-base text-[#475569] mt-3 font-sans leading-relaxed">
              Every city in India has a queen. FSIA conducts transparent talent auditions across 4,000+ cities, providing master runway training and crowning winners on the grand stage of Zee Studio Jaipur.
            </p>
          </div>

          <a
            href="https://www.fsia.in/quickapply"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-[#0C1322] hover:bg-[#1A253E] text-[#EADBAC] hover:text-white text-xs font-bold uppercase tracking-wider border border-[#D4AF37]/50 shadow-xs transition-colors shrink-0"
          >
            AUDITION APPLICATION
          </a>
        </div>

        {/* ASYMMETRIC EDITORIAL SHOWCASE: The 3 Flagship National Titles */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* PRIMARY LEAD: Forever Miss India (Dominant 7-column editorial layout) */}
          <div className="lg:col-span-7 bg-[#FAF9F5] border border-[#EADBAC] p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="text-xs font-bold font-sans tracking-widest text-[#B8860B] uppercase">
                  Flagship National Title
                </span>
                <span className="text-[11px] font-sans font-semibold text-[#0C1322] px-2.5 py-0.5 bg-white border border-[#D4AF37]/40">
                  {missIndia.season}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-[#0C1322] mb-3">
                {missIndia.name}
              </h3>

              <p className="text-sm sm:text-base text-[#475569] font-sans leading-relaxed mb-6">
                {missIndia.description}
              </p>

              {/* Large Authentic Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900 border border-[#D4AF37]/30 mb-6">
                <FSIAImage
                  src={missIndia.image}
                  alt={missIndia.name}
                  className="w-full h-full"
                  objectPosition="top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C1322]/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-4 right-4 text-white text-xs font-sans">
                  Grand Finale Runway • Zee Studio Jaipur
                </div>
              </div>

              {/* Editorial Specs Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-[#EADBAC] text-xs font-sans">
                <div>
                  <span className="text-[#7E591B] font-bold block uppercase text-[10px] tracking-wider">Audition Scale</span>
                  <span className="text-[#0C1322] font-semibold">4,000+ Indian Cities</span>
                </div>
                <div>
                  <span className="text-[#7E591B] font-bold block uppercase text-[10px] tracking-wider">Crowning Rule</span>
                  <span className="text-[#0C1322] font-semibold">1 Winner Every City</span>
                </div>
                <div>
                  <span className="text-[#7E591B] font-bold block uppercase text-[10px] tracking-wider">Finale Arena</span>
                  <span className="text-[#0C1322] font-semibold">Zee Studio Jaipur</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#EADBAC] flex items-center justify-between flex-wrap gap-4">
              <button
                onClick={() => onSelectPageant(missIndia)}
                className="text-xs font-bold text-[#0C1322] hover:text-[#B8860B] uppercase tracking-wider cursor-pointer font-sans"
              >
                VIEW FULL SPECIFICATIONS &rarr;
              </button>
              <a
                href="https://www.fsia.in/forever-miss-india-new.php"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-[#0C1322] text-[#EADBAC] text-xs font-bold uppercase tracking-wider border border-[#D4AF37]/40 hover:bg-[#1A253E] transition-colors"
              >
                APPLY FOR MISS INDIA
              </a>
            </div>
          </div>

          {/* SECONDARY STACK: Mrs India & Miss Teen India (5-column editorial stack) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            
            {/* Forever Mrs India Card */}
            <div className="bg-[#FAF9F5] border border-[#EADBAC] p-6 flex flex-col justify-between flex-1">
              <div>
                <div className="flex items-center justify-between gap-3 mb-2">
                  <span className="text-[10px] font-bold font-sans tracking-widest text-[#B8860B] uppercase">
                    National Title • Married Women
                  </span>
                  <span className="text-[10px] font-sans font-semibold text-[#0C1322] px-2 py-0.5 bg-white border border-[#D4AF37]/30">
                    {mrsIndia.season}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-display font-bold text-[#0C1322] mb-2">
                  {mrsIndia.name}
                </h3>

                <p className="text-xs sm:text-sm text-[#475569] font-sans leading-relaxed mb-4">
                  {mrsIndia.description}
                </p>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="relative aspect-[4/3] overflow-hidden bg-neutral-900 border border-[#D4AF37]/30">
                    <FSIAImage
                      src={mrsIndia.image}
                      alt={mrsIndia.name}
                      className="w-full h-full"
                      objectPosition="top"
                    />
                  </div>
                  <div className="flex flex-col justify-center space-y-2 text-xs font-sans">
                    <div>
                      <span className="text-[#7E591B] text-[10px] uppercase font-bold block">Categories</span>
                      <span className="font-semibold text-[#0C1322]">G-1 (18-35 yrs)</span>
                      <span className="font-semibold text-[#0C1322] block">G-2 (36-50 yrs)</span>
                    </div>
                    <div>
                      <span className="text-[#7E591B] text-[10px] uppercase font-bold block">Mentorship</span>
                      <span className="text-[#526077]">Runway, poise, grooming</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#EADBAC] flex items-center justify-between">
                <button
                  onClick={() => onSelectPageant(mrsIndia)}
                  className="text-xs font-bold text-[#0C1322] hover:text-[#B8860B] uppercase tracking-wider cursor-pointer"
                >
                  DETAILS &rarr;
                </button>
                <a
                  href="https://www.fsia.in/forever-mrs-india-new.php"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white text-[#0C1322] hover:bg-[#FAF7F0] text-xs font-bold uppercase tracking-wider border border-[#D4AF37]/50 transition-colors"
                >
                  APPLY NOW
                </a>
              </div>
            </div>

            {/* Forever Miss Teen India Card */}
            <div className="bg-[#FAF9F5] border border-[#EADBAC] p-6 flex flex-col justify-between flex-1">
              <div>
                <div className="flex items-center justify-between gap-3 mb-2">
                  <span className="text-[10px] font-bold font-sans tracking-widest text-[#B8860B] uppercase">
                    National Teenage Title
                  </span>
                  <span className="text-[10px] font-sans font-semibold text-[#0C1322] px-2 py-0.5 bg-white border border-[#D4AF37]/30">
                    {teenIndia.season}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-display font-bold text-[#0C1322] mb-2">
                  {teenIndia.name}
                </h3>

                <p className="text-xs sm:text-sm text-[#475569] font-sans leading-relaxed mb-4">
                  {teenIndia.description}
                </p>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="relative aspect-[4/3] overflow-hidden bg-neutral-900 border border-[#D4AF37]/30">
                    <FSIAImage
                      src={teenIndia.image}
                      alt={teenIndia.name}
                      className="w-full h-full"
                      objectPosition="top"
                    />
                  </div>
                  <div className="flex flex-col justify-center space-y-2 text-xs font-sans">
                    <div>
                      <span className="text-[#7E591B] text-[10px] uppercase font-bold block">Eligibility</span>
                      <span className="font-semibold text-[#0C1322]">Ages 13 to 19 Years</span>
                    </div>
                    <div>
                      <span className="text-[#7E591B] text-[10px] uppercase font-bold block">Platform</span>
                      <span className="text-[#526077]">National TV &amp; Talent Scouting</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#EADBAC] flex items-center justify-between">
                <button
                  onClick={() => onSelectPageant(teenIndia)}
                  className="text-xs font-bold text-[#0C1322] hover:text-[#B8860B] uppercase tracking-wider cursor-pointer"
                >
                  DETAILS &rarr;
                </button>
                <a
                  href="https://www.fsia.in/forever-miss-teen-india-new.php"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white text-[#0C1322] hover:bg-[#FAF7F0] text-xs font-bold uppercase tracking-wider border border-[#D4AF37]/50 transition-colors"
                >
                  APPLY NOW
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* HORIZONTAL EDITORIAL ROW: International & Specialized Editions */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-display font-bold text-[#0C1322] uppercase tracking-wider">
              International Crowns &amp; Kids Edition
            </h3>
            <span className="text-xs text-[#7E591B] font-semibold">
              Global Platform Delegations
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {globalPageants.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-[#EADBAC] p-5 flex flex-col justify-between hover:border-[#D4AF37] transition-colors"
              >
                <div>
                  <div className="relative aspect-[4/3] overflow-hidden bg-neutral-900 border border-[#EADBAC]/60 mb-4">
                    <FSIAImage
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full"
                      objectPosition="top"
                    />
                  </div>

                  <span className="text-[10px] font-sans font-bold text-[#7E591B] uppercase tracking-wider block mb-1">
                    {item.season}
                  </span>

                  <h4 className="text-base font-display font-bold text-[#0C1322] mb-1.5 leading-snug">
                    {item.name}
                  </h4>

                  <p className="text-xs text-[#526077] font-sans line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#EADBAC]/60 flex items-center justify-between">
                  <button
                    onClick={() => onSelectPageant(item)}
                    className="text-[11px] font-bold text-[#0C1322] hover:text-[#B8860B] uppercase tracking-wider cursor-pointer"
                  >
                    SPECS &rarr;
                  </button>
                  <a
                    href="https://www.fsia.in/quickapply"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-bold text-[#7E591B] hover:text-[#0C1322] uppercase tracking-wider"
                  >
                    APPLY
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
