import React, { useState, useMemo } from 'react';
import { Filter, Check, ExternalLink, Sparkles, UserCheck, Calendar, MapPin, Award } from 'lucide-react';
import { PAGEANTS } from '../data/fsiaData';
import { PageantItem } from '../types';
import { FSIAImage } from './FSIAImage';

interface PageantsSectionProps {
  onSelectPageant: (pageant: PageantItem) => void;
}

export type PageantFilterCategory = 'All' | 'Miss' | 'Mrs' | 'Teen';

export const PageantsSection: React.FC<PageantsSectionProps> = ({
  onSelectPageant
}) => {
  const [activeFilter, setActiveFilter] = useState<PageantFilterCategory>('All');

  // Helper to categorize each pageant into Miss, Mrs, or Teen
  const getPageantCategory = (item: PageantItem): 'Miss' | 'Mrs' | 'Teen' => {
    const text = `${item.name} ${item.slug || ''} ${item.id}`.toLowerCase();
    if (text.includes('teen')) return 'Teen';
    if (text.includes('mrs')) return 'Mrs';
    return 'Miss';
  };

  // Pre-calculate counts for each category
  const filterCounts = useMemo(() => {
    const counts = { All: PAGEANTS.length, Miss: 0, Mrs: 0, Teen: 0 };
    PAGEANTS.forEach((p) => {
      const cat = getPageantCategory(p);
      counts[cat] += 1;
    });
    return counts;
  }, []);

  // Filtered pageant items
  const filteredPageants = useMemo(() => {
    if (activeFilter === 'All') return PAGEANTS;
    return PAGEANTS.filter((p) => getPageantCategory(p) === activeFilter);
  }, [activeFilter]);

  // Flagship references
  const missIndia = PAGEANTS.find((p) => p.slug === 'forever-miss-india' || p.id.includes('miss-india')) || PAGEANTS[0];
  const mrsIndia = PAGEANTS.find((p) => p.slug === 'forever-mrs-india' || p.id.includes('mrs-india')) || PAGEANTS[1];
  const teenIndia = PAGEANTS.find((p) => p.slug === 'forever-miss-teen-india' || p.id.includes('teen-india')) || PAGEANTS[2];

  const filterDescriptions: Record<PageantFilterCategory, string> = {
    All: 'Explore all 7 official national titles, international crowns, and specialized age divisions.',
    Miss: 'Premier national and international pageant titles for unmarried women (Ages 18–35).',
    Mrs: 'Prestigious national and global pageant titles for married women across G-1 (18–38) & G-2 (39+) categories.',
    Teen: 'India’s premier nationwide youth runway platform for aspiring female leaders (Ages 13–19).'
  };

  return (
    <section id="pageants" className="py-20 md:py-24 bg-white relative border-b border-[#EADBAC]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 pb-6 border-b border-[#EADBAC]/80">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FAF7F0] border border-[#D4AF37]/40 text-[#7E591B] text-[11px] font-semibold tracking-widest uppercase mb-4 shadow-2xs">
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
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0C1322] hover:bg-[#1A253E] text-[#EADBAC] hover:text-white text-xs font-bold uppercase tracking-wider border border-[#D4AF37]/50 shadow-xs transition-colors shrink-0 self-start md:self-end"
          >
            <span>AUDITION APPLICATION</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* CATEGORY FILTERING SYSTEM ('Miss', 'Mrs', 'Teen', 'All') */}
        <div className="bg-[#FAF9F5] border border-[#EADBAC] p-4 sm:p-5 mb-12 shadow-2xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Filter buttons */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#7E591B] flex items-center gap-1 mr-1">
                <Filter className="w-3.5 h-3.5 text-[#B8860B]" />
                <span>Filter Pageants:</span>
              </span>

              {/* ALL */}
              <button
                type="button"
                onClick={() => setActiveFilter('All')}
                className={`px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all rounded-xs cursor-pointer flex items-center gap-1.5 ${
                  activeFilter === 'All'
                    ? 'bg-[#0C1322] text-[#EADBAC] border border-[#D4AF37] shadow-xs'
                    : 'bg-white text-[#475569] border border-[#EADBAC] hover:border-[#D4AF37] hover:text-[#0C1322]'
                }`}
              >
                <span>All Pageants</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-xs font-mono font-bold ${
                  activeFilter === 'All' ? 'bg-[#1A253E] text-[#D4AF37]' : 'bg-neutral-100 text-[#64748B]'
                }`}>
                  {filterCounts.All}
                </span>
              </button>

              {/* MISS */}
              <button
                type="button"
                onClick={() => setActiveFilter('Miss')}
                className={`px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all rounded-xs cursor-pointer flex items-center gap-1.5 ${
                  activeFilter === 'Miss'
                    ? 'bg-[#0C1322] text-[#EADBAC] border border-[#D4AF37] shadow-xs'
                    : 'bg-white text-[#475569] border border-[#EADBAC] hover:border-[#D4AF37] hover:text-[#0C1322]'
                }`}
              >
                <span>Miss</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-xs font-mono font-bold ${
                  activeFilter === 'Miss' ? 'bg-[#1A253E] text-[#D4AF37]' : 'bg-neutral-100 text-[#64748B]'
                }`}>
                  {filterCounts.Miss}
                </span>
              </button>

              {/* MRS */}
              <button
                type="button"
                onClick={() => setActiveFilter('Mrs')}
                className={`px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all rounded-xs cursor-pointer flex items-center gap-1.5 ${
                  activeFilter === 'Mrs'
                    ? 'bg-[#0C1322] text-[#EADBAC] border border-[#D4AF37] shadow-xs'
                    : 'bg-white text-[#475569] border border-[#EADBAC] hover:border-[#D4AF37] hover:text-[#0C1322]'
                }`}
              >
                <span>Mrs</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-xs font-mono font-bold ${
                  activeFilter === 'Mrs' ? 'bg-[#1A253E] text-[#D4AF37]' : 'bg-neutral-100 text-[#64748B]'
                }`}>
                  {filterCounts.Mrs}
                </span>
              </button>

              {/* TEEN */}
              <button
                type="button"
                onClick={() => setActiveFilter('Teen')}
                className={`px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all rounded-xs cursor-pointer flex items-center gap-1.5 ${
                  activeFilter === 'Teen'
                    ? 'bg-[#0C1322] text-[#EADBAC] border border-[#D4AF37] shadow-xs'
                    : 'bg-white text-[#475569] border border-[#EADBAC] hover:border-[#D4AF37] hover:text-[#0C1322]'
                }`}
              >
                <span>Teen</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-xs font-mono font-bold ${
                  activeFilter === 'Teen' ? 'bg-[#1A253E] text-[#D4AF37]' : 'bg-neutral-100 text-[#64748B]'
                }`}>
                  {filterCounts.Teen}
                </span>
              </button>
            </div>

            {/* Filter Reset Button */}
            {activeFilter !== 'All' && (
              <button
                type="button"
                onClick={() => setActiveFilter('All')}
                className="text-xs font-semibold text-[#7E591B] hover:text-[#0C1322] underline cursor-pointer shrink-0 self-start md:self-center"
              >
                View All Categories ({PAGEANTS.length})
              </button>
            )}
          </div>

          {/* Filter Description Strip */}
          <div className="mt-3 pt-3 border-t border-[#EADBAC]/60 flex items-center gap-2 text-xs font-sans text-[#526077]">
            <Sparkles className="w-3.5 h-3.5 text-[#B8860B] shrink-0" />
            <span>{filterDescriptions[activeFilter]}</span>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* VIEW A: 'ALL' SELECTED -> Full Editorial Layout */}
        {/* ------------------------------------------------------------- */}
        {activeFilter === 'All' && (
          <div>
            {/* Asymmetric Editorial Showcase: 3 Flagship National Titles */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
              
              {/* PRIMARY LEAD: Forever Miss India (Dominant 7-column editorial layout) */}
              <div className="lg:col-span-7 bg-[#FAF9F5] border border-[#EADBAC] p-6 sm:p-8 flex flex-col justify-between hover:border-[#D4AF37] transition-all">
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="text-xs font-bold font-sans tracking-widest text-[#B8860B] uppercase">
                      Flagship National Title • Miss Division
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
                      <span className="text-[#7E591B] font-bold block uppercase text-[10px] tracking-wider">Eligibility</span>
                      <span className="text-[#0C1322] font-semibold">{missIndia.eligibility}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[#EADBAC] flex items-center justify-between flex-wrap gap-4">
                  <button
                    type="button"
                    onClick={() => onSelectPageant(missIndia)}
                    className="text-xs font-bold text-[#0C1322] hover:text-[#B8860B] uppercase tracking-wider cursor-pointer font-sans"
                  >
                    VIEW FULL SPECIFICATIONS &rarr;
                  </button>
                  <a
                    href="https://www.fsia.in/forever-miss-india-new.php"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-[#0C1322] text-[#EADBAC] text-xs font-bold uppercase tracking-wider border border-[#D4AF37]/40 hover:bg-[#1A253E] transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>APPLY FOR MISS INDIA</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* SECONDARY STACK: Mrs India & Miss Teen India (5-column editorial stack) */}
              <div className="lg:col-span-5 flex flex-col gap-8">
                
                {/* Forever Mrs India Card */}
                <div className="bg-[#FAF9F5] border border-[#EADBAC] p-6 flex flex-col justify-between flex-1 hover:border-[#D4AF37] transition-all">
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <span className="text-[10px] font-bold font-sans tracking-widest text-[#B8860B] uppercase">
                        National Title • Mrs Division
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
                          <span className="font-semibold text-[#0C1322]">G-1 (18-38 yrs)</span>
                          <span className="font-semibold text-[#0C1322] block">G-2 (39+ yrs)</span>
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
                      type="button"
                      onClick={() => onSelectPageant(mrsIndia)}
                      className="text-xs font-bold text-[#0C1322] hover:text-[#B8860B] uppercase tracking-wider cursor-pointer"
                    >
                      DETAILS &rarr;
                    </button>
                    <a
                      href="https://www.fsia.in/forever-mrs-india-new.php"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-white text-[#0C1322] hover:bg-[#FAF7F0] text-xs font-bold uppercase tracking-wider border border-[#D4AF37]/50 transition-colors inline-flex items-center gap-1"
                    >
                      <span>APPLY NOW</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Forever Miss Teen India Card */}
                <div className="bg-[#FAF9F5] border border-[#EADBAC] p-6 flex flex-col justify-between flex-1 hover:border-[#D4AF37] transition-all">
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <span className="text-[10px] font-bold font-sans tracking-widest text-[#B8860B] uppercase">
                        National Youth Title • Teen Division
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
                      type="button"
                      onClick={() => onSelectPageant(teenIndia)}
                      className="text-xs font-bold text-[#0C1322] hover:text-[#B8860B] uppercase tracking-wider cursor-pointer"
                    >
                      DETAILS &rarr;
                    </button>
                    <a
                      href="https://www.fsia.in/forever-miss-teen-india-new.php"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-white text-[#0C1322] hover:bg-[#FAF7F0] text-xs font-bold uppercase tracking-wider border border-[#D4AF37]/50 transition-colors inline-flex items-center gap-1"
                    >
                      <span>APPLY NOW</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

              </div>
            </div>

            {/* HORIZONTAL EDITORIAL ROW: International & Specialized Editions */}
            <div className="mt-12">
              <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#EADBAC]/60">
                <div>
                  <h3 className="text-xl font-display font-bold text-[#0C1322] uppercase tracking-wider">
                    International Crowns &amp; Global Delegations
                  </h3>
                  <p className="text-xs text-[#64748B] font-sans mt-0.5">
                    Miss World, Mrs World, Miss Universe, and Mrs Universe official franchise representations
                  </p>
                </div>
                <span className="text-xs text-[#7E591B] font-semibold hidden sm:inline">
                  Global Platform Delegations
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {PAGEANTS.filter((p) => !['forever-miss-india-2026', 'forever-mrs-india-2026', 'forever-miss-teen-india-2026', 'forever-miss-india', 'forever-mrs-india', 'forever-miss-teen-india'].includes(p.id)).map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border border-[#EADBAC] p-5 flex flex-col justify-between hover:border-[#D4AF37] transition-all group"
                  >
                    <div>
                      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-900 border border-[#EADBAC]/60 mb-4">
                        <FSIAImage
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full group-hover:scale-103 transition-transform duration-500"
                          objectPosition="top"
                        />
                        <div className="absolute top-2 right-2 px-2 py-0.5 bg-[#0C1322]/85 text-[#EADBAC] text-[9px] font-bold uppercase tracking-wider">
                          {getPageantCategory(item)} Division
                        </div>
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
                        type="button"
                        onClick={() => onSelectPageant(item)}
                        className="text-[11px] font-bold text-[#0C1322] hover:text-[#B8860B] uppercase tracking-wider cursor-pointer"
                      >
                        SPECS &rarr;
                      </button>
                      <a
                        href={item.url || 'https://www.fsia.in/quickapply'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-bold text-[#7E591B] hover:text-[#0C1322] uppercase tracking-wider inline-flex items-center gap-1"
                      >
                        <span>APPLY</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* VIEW B: FILTERED VIEW ('Miss', 'Mrs', or 'Teen') */}
        {/* ------------------------------------------------------------- */}
        {activeFilter !== 'All' && (
          <div className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPageants.map((pageant) => {
                const category = getPageantCategory(pageant);
                return (
                  <div
                    key={pageant.id}
                    className="bg-[#FAF9F5] border border-[#EADBAC] overflow-hidden flex flex-col justify-between hover:border-[#D4AF37] transition-all shadow-2xs group"
                  >
                    <div>
                      {/* Image Preview */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900 border-b border-[#EADBAC]">
                        <FSIAImage
                          src={pageant.image}
                          alt={pageant.name}
                          className="w-full h-full group-hover:scale-103 transition-transform duration-500"
                          objectPosition="top"
                        />
                        <div className="absolute top-3 left-3 bg-[#0C1322]/90 border border-[#D4AF37]/60 text-[#EADBAC] text-[10px] font-bold px-2 py-0.5 tracking-wider uppercase backdrop-blur-xs">
                          {category} Category
                        </div>
                        <div className="absolute top-3 right-3 bg-white/90 text-[#0C1322] text-[10px] font-bold px-2 py-0.5 tracking-wider uppercase border border-neutral-200">
                          {pageant.season}
                        </div>
                      </div>

                      {/* Content Details */}
                      <div className="p-6 space-y-4">
                        <div>
                          <span className="text-[10px] font-bold font-sans tracking-widest text-[#B8860B] uppercase block mb-1">
                            {pageant.subtitle || `${category} Division`}
                          </span>
                          <h3 className="text-xl sm:text-2xl font-display font-bold text-[#0C1322]">
                            {pageant.name}
                          </h3>
                        </div>

                        <p className="text-xs sm:text-sm text-[#475569] font-sans leading-relaxed">
                          {pageant.description}
                        </p>

                        {/* Eligibility & Details Pill */}
                        <div className="p-3 bg-white border border-[#EADBAC] space-y-2 text-xs font-sans">
                          <div className="flex items-start gap-2">
                            <UserCheck className="w-3.5 h-3.5 text-[#B8860B] shrink-0 mt-0.5" />
                            <div>
                              <strong className="text-[#0C1322]">Eligibility:</strong>{' '}
                              <span className="text-[#526077]">{pageant.eligibility}</span>
                            </div>
                          </div>

                          <div className="flex items-start gap-2">
                            <MapPin className="w-3.5 h-3.5 text-[#B8860B] shrink-0 mt-0.5" />
                            <div>
                              <strong className="text-[#0C1322]">Auditions:</strong>{' '}
                              <span className="text-[#526077]">{pageant.cityRounds}</span>
                            </div>
                          </div>
                        </div>

                        {/* Features List */}
                        {pageant.features && pageant.features.length > 0 && (
                          <div className="space-y-1.5 pt-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#7E591B] block">
                              Key Highlights:
                            </span>
                            <div className="grid grid-cols-2 gap-1.5 text-[11px] font-sans text-[#334155]">
                              {pageant.features.slice(0, 4).map((f, i) => (
                                <div key={i} className="flex items-center gap-1.5 truncate">
                                  <Check className="w-3 h-3 text-[#B8860B] shrink-0" />
                                  <span className="truncate">{f}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions footer */}
                    <div className="p-6 pt-4 border-t border-[#EADBAC] bg-white flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => onSelectPageant(pageant)}
                        className="text-xs font-bold text-[#0C1322] hover:text-[#B8860B] uppercase tracking-wider cursor-pointer font-sans"
                      >
                        SPECIFICATIONS &rarr;
                      </button>

                      <a
                        href={pageant.url || 'https://www.fsia.in/quickapply'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-[#0C1322] hover:bg-[#1A253E] text-[#EADBAC] hover:text-white text-xs font-bold uppercase tracking-wider border border-[#D4AF37]/50 transition-colors inline-flex items-center gap-1.5"
                      >
                        <span>APPLY NOW</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
