import React from 'react';
import { HeroSlider } from './HeroSlider';

interface HeroSectionProps {
  onExploreEvents: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreEvents
}) => {
  return (
    <section id="home" className="relative w-full overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24 bg-[#FAF9F5] border-b border-[#EADBAC]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* LEFT: Editorial Content */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            {/* Editorial Category Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#D4AF37]/50 text-[#7E591B] text-[11px] font-semibold tracking-[0.2em] uppercase mb-5 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B]" />
              <span>BEAUTY PAGEANTS • NATIONAL AWARDS • FASHION</span>
            </div>

            {/* Majestic Display Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-[#0C1322] leading-[1.08] tracking-tight mb-5">
              REAL PEOPLE. <br />
              <span className="text-[#B8860B]">REAL STORIES.</span> <br />
              A BRIGHTER INDIA.
            </h1>

            {/* Authoritative Editorial Copy */}
            <p className="text-base sm:text-lg text-[#334155] leading-relaxed max-w-2xl font-sans font-normal mb-8">
              Forever Star India (FSIA) is a premier national beauty pageant and honors institution, officially protected under Trademark Class 41 by the Government of India. Operating grassroots talent evaluations across <strong>4,000+ Indian cities</strong> with <strong>1 crowned winner from every city</strong>, delegates experience masterclass runway training and grand crowning ceremonies televised at Zee Studio Jaipur.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
              <a
                href="https://www.fsia.in/quickapply"
                target="_blank"
                rel="noopener noreferrer"
                id="hero-apply-btn"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-[#0C1322] hover:bg-[#1A253E] text-[#EADBAC] hover:text-white text-xs sm:text-sm font-bold tracking-widest uppercase border border-[#D4AF37]/60 shadow-xs transition-colors cursor-pointer"
              >
                QUICK APPLY • 2026 AUDITIONS
              </a>

              <a
                href="#pageants"
                onClick={(e) => {
                  e.preventDefault();
                  onExploreEvents();
                }}
                id="hero-explore-btn"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-white hover:bg-[#F6F2E8] text-[#0C1322] text-xs sm:text-sm font-bold tracking-widest uppercase border border-[#D4AF37]/50 hover:border-[#D4AF37] transition-colors cursor-pointer shadow-2xs"
              >
                EXPLORE TITLES &amp; AWARDS
              </a>
            </div>

            {/* Institutional Credentials Strip */}
            <div className="pt-5 border-t border-[#EADBAC] flex flex-wrap items-center gap-y-3 gap-x-6 text-xs text-[#526077] font-sans">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#0C1322]">Trademark Class 41:</span>
                <span>Govt. of India Registered</span>
              </div>
              <span className="text-[#D4AF37] hidden sm:inline">•</span>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#0C1322]">Grand Finale Arena:</span>
                <span>Zee Studio Jaipur</span>
              </div>
              <span className="text-[#D4AF37] hidden sm:inline">•</span>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#0C1322]">Reach:</span>
                <span>4,000+ Cities Nationwide</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Authentic FSIA Stage & Crowning Moments Slider */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <HeroSlider />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
