import React from 'react';
import { FSIAImage } from './FSIAImage';

interface FinalCtaSectionProps {
  onExploreEvents: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({
  onExploreEvents
}) => {
  return (
    <section className="relative py-20 md:py-28 bg-[#0C1322] text-white overflow-hidden border-t border-[#D4AF37]/40">
      {/* Background authentic FSIA event photograph */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <FSIAImage
          src="https://www.fsia.in/uploads/Forever-Star-India-Pageant.webp"
          alt="Forever Star India Grand Finale Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0C1322]/90" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold uppercase tracking-widest mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
          <span>SEASON 2026 AUDITIONS &amp; NOMINATIONS ACTIVE</span>
        </div>

        {/* Majestic Headline */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight leading-tight uppercase mb-6">
          STEP ONTO THE NATIONAL STAGE
        </h2>

        <p className="text-base sm:text-lg text-[#EADBAC] font-sans max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
          Join India’s premier talent and achievement movement across 4,000+ cities. Secure your city chapter audition, master runway grooming, and grand coronation stage at Zee Studio Jaipur.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a
            href="https://www.fsia.in/quickapply"
            target="_blank"
            rel="noopener noreferrer"
            id="final-cta-quickapply-btn"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-[#D4AF37] hover:bg-[#BF9136] text-[#0C1322] text-xs sm:text-sm font-bold tracking-widest uppercase transition-colors cursor-pointer"
          >
            QUICK APPLY • 2026 SEASON
          </a>

          <a
            href="tel:+919983286999"
            id="final-cta-call-btn"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-transparent hover:bg-white/10 text-white text-xs sm:text-sm font-bold tracking-widest uppercase border border-[#D4AF37]/60 transition-colors cursor-pointer"
          >
            CALL HELPLINE: +91-99832-86999
          </a>
        </div>

        {/* Verified Institutional Contact Strip */}
        <div className="pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-3xl mx-auto font-sans">
          <div className="p-4 bg-white/5 border border-white/10">
            <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] block font-bold mb-1">
              Direct Helpline
            </span>
            <a href="tel:+919983286999" className="text-sm font-semibold text-white hover:text-[#D4AF37] transition-colors">
              +91-99832-86999
            </a>
            <span className="text-[11px] text-neutral-400 block mt-0.5">
              Mon–Sat, 10am–7pm IST
            </span>
          </div>

          <div className="p-4 bg-white/5 border border-white/10">
            <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] block font-bold mb-1">
              Official Email
            </span>
            <a href="mailto:care@fsia.in" className="text-sm font-semibold text-white hover:text-[#D4AF37] transition-colors block">
              care@fsia.in
            </a>
            <span className="text-[11px] text-neutral-400 block mt-0.5">
              starindiaaward@gmail.com
            </span>
          </div>

          <div className="p-4 bg-white/5 border border-white/10">
            <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] block font-bold mb-1">
              Headquarters
            </span>
            <span className="text-sm font-semibold text-white block">
              Jaipur, Rajasthan
            </span>
            <span className="text-[11px] text-neutral-400 block mt-0.5">
              Govt. Trademark Class 41
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
