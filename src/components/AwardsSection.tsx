import React, { useState } from 'react';
import { AWARDS } from '../data/fsiaData';
import { AwardItem } from '../types';
import { FSIAImage } from './FSIAImage';

interface AwardsSectionProps {
  onSelectAward: (award: AwardItem) => void;
}

export const AwardsSection: React.FC<AwardsSectionProps> = ({
  onSelectAward
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'national' | 'international'>('all');

  const filteredAwards = AWARDS.filter((award) => {
    if (activeTab === 'national') return award.scope.toLowerCase().includes('national');
    if (activeTab === 'international') return award.scope.toLowerCase().includes('international');
    return true;
  });

  // Flagship honors
  const superWoman = AWARDS.find((a) => a.id === 'super-woman-award') || AWARDS[0];
  const superHero = AWARDS.find((a) => a.id === 'super-hero-award') || AWARDS[1];
  const otherAwards = AWARDS.filter(
    (a) => a.id !== 'super-woman-award' && a.id !== 'super-hero-award'
  );

  return (
    <section id="awards" className="py-20 md:py-24 bg-[#FAF9F5] relative border-b border-[#EADBAC]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 pb-6 border-b border-[#EADBAC]">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#D4AF37]/40 text-[#7E591B] text-[11px] font-semibold tracking-widest uppercase mb-4 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B]" />
              <span>HONOURING EXCELLENCE • GOVT REGISTERED CLASS 41</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#0C1322] tracking-tight">
              NATIONAL &amp; INTERNATIONAL AWARDS
            </h2>
            <p className="text-base text-[#475569] mt-3 font-sans leading-relaxed">
              Forever Star India confers prestigious recognitions upon exceptional entrepreneurs, educators, social leaders, artists, and innovators with televised trophy presentations and national media broadcasts.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex bg-white p-1 border border-[#EADBAC]">
              {(['all', 'national', 'international'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3.5 py-1.5 text-xs font-semibold tracking-wide uppercase transition-colors cursor-pointer ${
                    activeTab === tab
                      ? 'bg-[#0C1322] text-[#EADBAC]'
                      : 'text-[#475569] hover:text-[#0C1322]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <a
              href="https://www.fsia.in/register-nominate.php"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-5 py-2.5 bg-[#0C1322] hover:bg-[#1A253E] text-[#EADBAC] hover:text-white text-xs font-bold uppercase tracking-wider border border-[#D4AF37]/50 transition-colors shrink-0"
            >
              NOMINATE NOW
            </a>
          </div>
        </div>

        {/* FLAGSHIP HONORS: Super Woman & Super Hero Editorial Duet */}
        {(activeTab === 'all' || activeTab === 'national') && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            
            {/* Super Woman Award */}
            <div className="bg-white border border-[#EADBAC] p-6 sm:p-8 flex flex-col justify-between shadow-2xs hover:border-[#D4AF37] transition-colors">
              <div>
                <div className="flex items-center justify-between gap-4 mb-3">
                  <span className="text-[10px] font-sans font-bold tracking-widest text-[#B8860B] uppercase">
                    Flagship Women’s Honors
                  </span>
                  <span className="text-[10px] font-sans font-semibold text-[#0C1322] px-2 py-0.5 bg-[#FAF7F0] border border-[#D4AF37]/30">
                    {superWoman.scope}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#0C1322] mb-3">
                  {superWoman.name}
                </h3>

                <p className="text-sm text-[#475569] font-sans leading-relaxed mb-6">
                  {superWoman.description}
                </p>

                <div className="relative aspect-[16/9] overflow-hidden bg-neutral-900 border border-[#D4AF37]/30 mb-6">
                  <FSIAImage
                    src={superWoman.image}
                    alt={superWoman.name}
                    className="w-full h-full"
                    objectPosition="top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C1322]/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-4 right-4 text-white text-xs font-sans">
                    National Felicitation Ceremony • Zee Studio Jaipur
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 py-3 border-y border-[#EADBAC] text-xs font-sans">
                  <div>
                    <span className="text-[#7E591B] font-bold block uppercase text-[10px]">Recognizing</span>
                    <span className="text-[#0C1322] font-semibold">Women Leaders &amp; Innovators</span>
                  </div>
                  <div>
                    <span className="text-[#7E591B] font-bold block uppercase text-[10px]">Trophy &amp; Citation</span>
                    <span className="text-[#0C1322] font-semibold">Televised Grand Stage</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 flex items-center justify-between">
                <button
                  onClick={() => onSelectAward(superWoman)}
                  className="text-xs font-bold text-[#0C1322] hover:text-[#B8860B] uppercase tracking-wider cursor-pointer font-sans"
                >
                  FULL CRITERIA &rarr;
                </button>
                <a
                  href="https://www.fsia.in/super-woman-award.php"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#0C1322] text-[#EADBAC] text-xs font-bold uppercase tracking-wider border border-[#D4AF37]/40 hover:bg-[#1A253E] transition-colors"
                >
                  NOMINATE FOR SUPER WOMAN
                </a>
              </div>
            </div>

            {/* Super Hero Award */}
            <div className="bg-white border border-[#EADBAC] p-6 sm:p-8 flex flex-col justify-between shadow-2xs hover:border-[#D4AF37] transition-colors">
              <div>
                <div className="flex items-center justify-between gap-4 mb-3">
                  <span className="text-[10px] font-sans font-bold tracking-widest text-[#B8860B] uppercase">
                    Distinguished Achievers
                  </span>
                  <span className="text-[10px] font-sans font-semibold text-[#0C1322] px-2 py-0.5 bg-[#FAF7F0] border border-[#D4AF37]/30">
                    {superHero.scope}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#0C1322] mb-3">
                  {superHero.name}
                </h3>

                <p className="text-sm text-[#475569] font-sans leading-relaxed mb-6">
                  {superHero.description}
                </p>

                <div className="relative aspect-[16/9] overflow-hidden bg-neutral-900 border border-[#D4AF37]/30 mb-6">
                  <FSIAImage
                    src={superHero.image}
                    alt={superHero.name}
                    className="w-full h-full"
                    objectPosition="top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C1322]/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-4 right-4 text-white text-xs font-sans">
                    National Felicitation Ceremony • Zee Studio Jaipur
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 py-3 border-y border-[#EADBAC] text-xs font-sans">
                  <div>
                    <span className="text-[#7E591B] font-bold block uppercase text-[10px]">Recognizing</span>
                    <span className="text-[#0C1322] font-semibold">Innovators, Founders, Mentors</span>
                  </div>
                  <div>
                    <span className="text-[#7E591B] font-bold block uppercase text-[10px]">Trophy &amp; Citation</span>
                    <span className="text-[#0C1322] font-semibold">Televised Grand Stage</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 flex items-center justify-between">
                <button
                  onClick={() => onSelectAward(superHero)}
                  className="text-xs font-bold text-[#0C1322] hover:text-[#B8860B] uppercase tracking-wider cursor-pointer font-sans"
                >
                  FULL CRITERIA &rarr;
                </button>
                <a
                  href="https://www.fsia.in/super-hero-award.php"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#0C1322] text-[#EADBAC] text-xs font-bold uppercase tracking-wider border border-[#D4AF37]/40 hover:bg-[#1A253E] transition-colors"
                >
                  NOMINATE FOR SUPER HERO
                </a>
              </div>
            </div>

          </div>
        )}

        {/* NATIONAL & INTERNATIONAL HONORS ROW */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-display font-bold text-[#0C1322] uppercase tracking-wider">
              Specialized &amp; Cross-Border Recognitions
            </h3>
            <span className="text-xs text-[#7E591B] font-semibold">
              Verified Class 41 Categories
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(activeTab === 'all' ? otherAwards : filteredAwards).map((item) => (
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
                    {item.scope}
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
                    onClick={() => onSelectAward(item)}
                    className="text-[11px] font-bold text-[#0C1322] hover:text-[#B8860B] uppercase tracking-wider cursor-pointer"
                  >
                    CRITERIA &rarr;
                  </button>
                  <a
                    href="https://www.fsia.in/register-nominate.php"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-bold text-[#7E591B] hover:text-[#0C1322] uppercase tracking-wider"
                  >
                    NOMINATE
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
