import React from 'react';
import { Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { WHY_FSIA_POINTS } from '../data/fsiaData';
import { FSIAImage } from './FSIAImage';

export const WhyFsiaSection: React.FC = () => {
  return (
    <section id="why-fsia" className="py-20 md:py-24 bg-[#FAF9F5] relative border-t border-[#EADBAC]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#D4AF37]/30 text-[#7E591B] text-[11px] font-semibold tracking-widest uppercase mb-3 shadow-2xs">
            <Sparkles className="w-3 h-3 text-[#B8860B]" />
            <span>The FSIA Foundation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#0C1322] tracking-tight">
            Why FSIA
          </h2>
          <p className="text-sm sm:text-base text-[#475569] mt-3 font-sans leading-relaxed">
            Pioneering a democratic, merit-based ecosystem across 4,000+ cities where genuine talent meets transformative national recognition.
          </p>
        </div>

        {/* Visual Structure: Large Editorial Image + 4-6 Concise Strengths */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Large Editorial Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute -inset-2.5 rounded-lg border border-[#D4AF37]/40 pointer-events-none hidden sm:block transform -rotate-1" />
              
              <div className="relative rounded-md overflow-hidden shadow-xl border-2 border-[#D4AF37]/30 bg-neutral-900">
                <FSIAImage
                  src="https://www.fsia.in/uploads/Forever-Star-India-Pageant.webp"
                  alt="Forever Star India National Crowning Ceremony"
                  className="w-full h-80 sm:h-96 md:h-[480px] lg:h-[540px]"
                  objectPosition="top"
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 1024px) 100vw, 500px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C1322]/90 via-[#0C1322]/20 to-transparent pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="px-2.5 py-1 rounded-xs bg-[#D4AF37] text-[#0C1322] text-[10px] font-bold uppercase tracking-wider">
                    Zee Studio Jaipur
                  </span>
                  <h3 className="text-lg font-display font-bold text-white mt-1.5">
                    Grand Crowning Ceremony
                  </h3>
                  <p className="text-xs text-[#EADBAC] font-sans mt-0.5">
                    Broadcasted live nationwide with verified jury adjudication.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 6 Concise Verified Strengths */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {WHY_FSIA_POINTS.map((point, index) => (
              <div
                key={point.title}
                className="bg-white p-5 sm:p-6 rounded-md border border-[#EADBAC]/80 shadow-2xs hover:shadow-md hover:border-[#D4AF37] transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono font-bold text-[#B8860B] bg-[#FAF7F0] px-2 py-0.5 rounded-xs border border-[#D4AF37]/30">
                      0{index + 1}
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-[#B8860B]" />
                  </div>

                  <h3 className="text-base font-display font-bold text-[#0C1322] group-hover:text-[#7E591B] transition-colors">
                    {point.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#526077] font-sans leading-relaxed mt-2">
                    {point.description}
                  </p>
                </div>

                <div className="mt-4 pt-2.5 border-t border-neutral-100 flex items-center gap-1.5 text-[10px] font-semibold text-[#7E591B] uppercase tracking-wider">
                  <ShieldCheck className="w-3 h-3 text-[#B8860B]" />
                  <span>Verified Standard</span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

