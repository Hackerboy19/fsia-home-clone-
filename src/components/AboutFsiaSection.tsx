import React from 'react';
import { FSIAImage } from './FSIAImage';

interface AboutFsiaSectionProps {
  onLearnMore?: () => void;
}

export const AboutFsiaSection: React.FC<AboutFsiaSectionProps> = ({ onLearnMore }) => {
  return (
    <section id="about" className="py-20 md:py-24 bg-white relative border-b border-[#EADBAC]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Authentic Grand Coronation Stage at Zee Studio */}
          <div className="lg:col-span-6 relative">
            <div className="border border-[#D4AF37]/50 bg-[#FAF9F5] p-2 shadow-sm">
              <div className="relative overflow-hidden bg-neutral-900">
                <FSIAImage
                  src="https://www.fsia.in/static/media/ee4544.6a2d3bd6bf0b169df07e.webp"
                  alt="Forever Star India Grand Coronation Stage at Zee Studio Jaipur"
                  className="w-full h-72 sm:h-96 md:h-[440px] lg:h-[480px]"
                  objectPosition="center"
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 1024px) 100vw, 600px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C1322]/90 via-[#0C1322]/20 to-transparent pointer-events-none" />

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="inline-block px-2.5 py-1 bg-[#0C1322]/90 border border-[#D4AF37]/40 text-[#EADBAC] text-[10px] uppercase tracking-wider font-semibold mb-1">
                    Government Registered Trademark • Class 41
                  </span>
                  <p className="text-xs text-neutral-200 font-sans">
                    Grand Coronation Arena • Zee Studio Jaipur, Rajasthan
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: About Forever Star India Editorial Content */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FAF7F0] border border-[#D4AF37]/40 text-[#7E591B] text-[11px] font-semibold tracking-widest uppercase mb-4 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B]" />
              <span>ABOUT FOREVER STAR INDIA</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#0C1322] tracking-tight leading-[1.15] mb-6">
              Empowering India’s Talent, <br />
              <span className="text-[#B8860B]">Before It Is Judged</span>
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#475569] font-sans leading-relaxed mb-8">
              <p>
                <strong className="text-[#0C1322] font-semibold">Forever Star India (FSIA)</strong> is an officially registered trademark organization under Class 41 by the Government of India. Headquartered in Jaipur, Rajasthan, FSIA pioneers a non-discriminatory national and international platform where talent receives opportunity, runway mentorship, and national media prestige.
              </p>
              <p>
                Unlike traditional pageants and award institutions with narrow criteria, FSIA operates on an unprecedented grassroots model: conducting talent evaluations across <strong>4,000+ Indian cities</strong> and crowning <strong>1 winner from every single city</strong>, ensuring that every regional achiever earns rightful state and national recognition.
              </p>
            </div>

            {/* Typographic Pillars - No cards inside cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#EADBAC] w-full mb-8">
              <div>
                <h3 className="text-xs font-display font-bold text-[#0C1322] uppercase tracking-wider">
                  Grassroots Democracy
                </h3>
                <p className="text-xs text-[#526077] font-sans mt-1 leading-relaxed">
                  City chapters spanning all 28 states and union territories, discovering talent at the ground level.
                </p>
              </div>

              <div>
                <h3 className="text-xs font-display font-bold text-[#0C1322] uppercase tracking-wider">
                  10,000+ Delegations
                </h3>
                <p className="text-xs text-[#526077] font-sans mt-1 leading-relaxed">
                  A nationwide network of crowned queens, entrepreneurs, changemakers, and mentors.
                </p>
              </div>
            </div>

            {/* Action Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://www.fsia.in/about-us.php"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-7 py-3.5 bg-[#0C1322] hover:bg-[#1A253E] text-[#EADBAC] hover:text-white text-xs font-bold uppercase tracking-wider border border-[#D4AF37]/50 shadow-xs transition-colors"
              >
                READ MORE ABOUT FSIA
              </a>

              <a
                href="https://www.fsia.in/our-teams.php"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3.5 bg-white hover:bg-[#FAF7F0] text-[#0C1322] text-xs font-bold uppercase tracking-wider border border-[#EADBAC] hover:border-[#D4AF37] transition-colors"
              >
                OUR LEADERSHIP
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
