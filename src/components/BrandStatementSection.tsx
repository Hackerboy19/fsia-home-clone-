import React from 'react';
import { Sparkles, Quote, Search, Globe, HeartHandshake, Trophy, ArrowRight } from 'lucide-react';
import { BRAND_PILLARS } from '../data/fsiaData';

export const BrandStatementSection: React.FC = () => {
  const getPillarIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Search className="w-5 h-5 text-[#B8860B]" />;
      case 1:
        return <Globe className="w-5 h-5 text-[#B8860B]" />;
      case 2:
        return <HeartHandshake className="w-5 h-5 text-[#B8860B]" />;
      case 3:
        return <Trophy className="w-5 h-5 text-[#B8860B]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#B8860B]" />;
    }
  };

  return (
    <section id="brand" className="py-24 bg-[#FAF8F2] relative border-t border-[#EADBAC]/60 overflow-hidden">
      {/* Subtle gold atmospheric accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[320px] bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Quote Icon */}
        <div className="w-12 h-12 rounded-full bg-white border border-[#D4AF37]/40 flex items-center justify-center text-[#B8860B] mx-auto mb-6 shadow-2xs">
          <Quote className="w-5 h-5 fill-[#D4AF37]/20" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-[#D4AF37]/40 text-[#7E591B] text-xs font-semibold tracking-widest uppercase mb-4 shadow-2xs">
          <span>About Forever Star India Awards (FSIA)</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#0C1322] tracking-tight mb-6">
          Opportunities Before Judgment
        </h2>

        {/* Brand Quote */}
        <blockquote className="text-xl sm:text-2xl md:text-3xl font-serif italic text-[#0C1322] leading-snug tracking-tight max-w-4xl mx-auto font-normal">
          “Our mission is to create a transparent, non-discriminatory national and international platform where talent receives opportunity before it is judged.”
        </blockquote>

        <div className="mt-6 flex flex-col items-center">
          <span className="font-display font-bold tracking-[0.15em] text-[#7E591B] uppercase text-xs sm:text-sm">
            — Rajesh Agarwal, Founder, Forever Star India
          </span>
          <span className="text-[11px] text-[#64748B] font-sans mt-0.5">
            Registered Trademark under Class 41, Govt. of India • 4,000+ City Network
          </span>
        </div>

        {/* 4 Supporting Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 text-left">
          {BRAND_PILLARS.map((pillar, idx) => (
            <div
              key={pillar.title}
              className="bg-white p-6 rounded-md border border-[#EADBAC]/80 shadow-2xs hover:border-[#D4AF37] hover:shadow-md transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-full bg-[#FAF7F0] border border-[#D4AF37]/40 flex items-center justify-center mb-4 group-hover:bg-[#0C1322] group-hover:text-[#D4AF37] transition-colors">
                {getPillarIcon(idx)}
              </div>
              <h3 className="text-base font-display font-bold text-[#0C1322] mb-1.5 group-hover:text-[#7E591B] transition-colors">
                {pillar.title}
              </h3>
              <p className="text-xs text-[#526077] font-sans leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Button to fsia.in/about-us.php */}
        <div className="mt-12">
          <a
            href="https://www.fsia.in/about-us.php"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-sm bg-[#0C1322] hover:bg-[#1A253E] text-[#EADBAC] hover:text-white text-xs font-semibold uppercase tracking-wider border border-[#D4AF37]/40 shadow-xs transition-colors"
          >
            <span>Learn More About FSIA</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
          </a>
        </div>
      </div>
    </section>
  );
};
