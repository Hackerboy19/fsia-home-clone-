import React from 'react';
import { TESTIMONIALS } from '../data/fsiaData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 md:py-24 bg-[#FAF9F5] relative border-b border-[#EADBAC]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#D4AF37]/40 text-[#7E591B] text-[11px] font-semibold tracking-widest uppercase mb-4 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B]" />
            <span>DELEGATE VOICES &amp; EXPERIENCES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#0C1322] tracking-tight">
            VOICES OF FSIA
          </h2>
          <p className="text-base text-[#475569] mt-3 font-sans leading-relaxed">
            Real delegates, city winners, and national titleholders share their authentic journey on the Forever Star India platform.
          </p>
        </div>

        {/* Testimonials 4-Card Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#EADBAC] p-6 shadow-2xs hover:border-[#D4AF37] transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-serif text-[#B8860B] leading-none font-bold">
                    “
                  </span>
                  <span className="text-[10px] font-sans font-bold text-[#7E591B] bg-[#FAF7F0] border border-[#D4AF37]/30 px-2 py-0.5 uppercase tracking-wider">
                    {item.badge}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#334155] font-sans leading-relaxed italic">
                  {item.quote}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-[#EADBAC] flex flex-col">
                <span className="text-sm font-display font-bold text-[#0C1322] uppercase tracking-wide">
                  {item.name}
                </span>
                <span className="text-xs text-[#7E591B] font-semibold font-sans mt-0.5">
                  {item.title}
                </span>
                <span className="text-[11px] text-[#64748B] font-sans mt-0.5">
                  {item.city}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Source Verification Note */}
        <div className="mt-10 text-center">
          <p className="text-xs text-[#7E591B] font-medium tracking-wide font-sans">
            Authentic delegate feedback published on the official FSIA platform (www.fsia.in)
          </p>
        </div>

      </div>
    </section>
  );
};
