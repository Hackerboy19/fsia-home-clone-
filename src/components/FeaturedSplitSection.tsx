import React from 'react';
import { Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { FSIAImage } from './FSIAImage';

interface FeaturedSplitSectionProps {
  onExploreFsia: () => void;
}

export const FeaturedSplitSection: React.FC<FeaturedSplitSectionProps> = ({ onExploreFsia }) => {
  const factualPoints = [
    {
      title: 'Beauty Pageants',
      desc: 'National titles including Forever Miss India, Forever Mrs India, and Teen India with city auditions across 40+ Indian destinations.'
    },
    {
      title: 'Awards & Recognition',
      desc: 'Honouring doctors, teachers, entrepreneurs, and unsung heroes through Super Woman, Super Hero, and Business Awards.'
    },
    {
      title: 'Fashion Shows & Couture',
      desc: 'Bharat Couture Week showcasing prominent fashion designers, makeup artists, and bridal fashion choreographers.'
    },
    {
      title: 'Talent Recognition',
      desc: 'Empowering performing artists, youth icons, and community leaders with transparent merit and professional media exposure.'
    },
    {
      title: 'Opportunities for Participants',
      desc: 'Top Google ranking for profiles, national press releases, photoshoots, brand collaborations, and lifelong mentorship.'
    }
  ];

  return (
    <section id="about" className="py-20 bg-white relative border-t border-[#EADBAC]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT: Large real FSIA event photograph */}
          <div className="lg:col-span-6 relative">
            <div className="relative">
              {/* Outer Thin Gold Frame */}
              <div className="absolute -inset-3 rounded-lg border border-[#D4AF37]/40 pointer-events-none hidden sm:block" />

              <div className="relative rounded-md overflow-hidden shadow-lg border-2 border-[#D4AF37]/30 bg-[#FAF9F5]">
                <FSIAImage
                  src="https://www.fsia.in/uploads/Forever-Star-India-award-season-8.webp"
                  alt="Forever Star India Awards Season 8 Grand Stage"
                  className="w-full h-72 sm:h-96 md:h-[440px] lg:h-[520px]"
                  objectPosition="top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C1322]/80 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 p-4 bg-white/95 backdrop-blur-xs rounded-sm border border-[#D4AF37]/30">
                  <p className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#B8860B]">
                    Grand Production
                  </p>
                  <h4 className="text-sm font-display font-bold text-[#0C1322]">
                    National Award Show & Pageant Series
                  </h4>
                  <p className="text-xs text-[#64748B] mt-0.5">
                    Recognized under Class 41 with the Government of India
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Heading & Factual points */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF7F0] border border-[#D4AF37]/30 text-[#7E591B] text-[11px] font-semibold tracking-widest uppercase">
              <Sparkles className="w-3 h-3 text-[#B8860B]" />
              <span>National Vision</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#0C1322] tracking-tight leading-tight">
              A Platform for Every Talent
            </h2>

            <p className="text-sm sm:text-base text-[#475569] leading-relaxed font-sans">
              Forever Star India was founded with the belief that talent should never remain unnoticed because of a lack of opportunity. India has talent in every city, town, and community. The responsibility of FSIA is to create platforms where deserving individuals present their abilities, earn recognition on merit, and move forward with unshakeable confidence.
            </p>

            {/* 5 Factual Points */}
            <div className="space-y-4 pt-2">
              {factualPoints.map((point) => (
                <div key={point.title} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#FAF7F0] border border-[#D4AF37]/40 flex items-center justify-center text-[#B8860B] shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-sans font-bold text-[#0C1322]">
                      {point.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#64748B] font-sans mt-0.5">
                      {point.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-3.5">
              <a
                href="https://www.fsia.in/quickapply"
                target="_blank"
                rel="noopener noreferrer"
                id="featured-quickapply-btn"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-sm bg-[#0C1322] hover:bg-[#1A253E] text-[#EADBAC] hover:text-white text-xs sm:text-sm font-semibold tracking-wider uppercase border border-[#D4AF37]/50 hover:border-[#D4AF37] transition-all shadow-md group"
              >
                <span>Quick Apply</span>
                <ArrowRight className="w-4 h-4 text-[#D4AF37] transition-transform group-hover:translate-x-1" />
              </a>
              <button
                onClick={onExploreFsia}
                id="explore-fsia-btn"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-sm bg-white hover:bg-[#FAF7F0] text-[#0C1322] text-xs sm:text-sm font-semibold tracking-wider uppercase border border-[#D4AF37]/40 hover:border-[#D4AF37] transition-all cursor-pointer group"
              >
                <span>Explore FSIA</span>
                <ArrowRight className="w-4 h-4 text-[#B8860B] transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
