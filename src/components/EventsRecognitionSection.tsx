import React from 'react';
import { Sparkles, Award, Tv, Shield, Globe2 } from 'lucide-react';
import { FSIAImage } from './FSIAImage';

export const EventsRecognitionSection: React.FC = () => {
  const recognitionHighlights = [
    {
      icon: Tv,
      title: 'Zee Studio Jaipur Grand Finale',
      description: 'Grand scale broadcast stage host for FSIA national crowning, featuring multi-camera live coverage and production.'
    },
    {
      icon: Shield,
      title: 'Govt. Class 41 Trademark',
      description: 'Official Government of India registered trademark for the Star Logo, protecting national awardee credentials.'
    },
    {
      icon: Award,
      title: 'World Record Crowning',
      description: 'Crowning over 300 nationwide achievers and delegates on a single national platform in one momentous celebration.'
    },
    {
      icon: Globe2,
      title: '40+ City Audition Chapters',
      description: 'Democratic grassroots reach bringing professional jury auditions directly to tier-1, tier-2, and tier-3 Indian cities.'
    }
  ];

  return (
    <section className="py-20 bg-[#FAF9F5] relative border-t border-[#EADBAC]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#D4AF37]/30 text-[#7E591B] text-[11px] font-semibold tracking-widest uppercase mb-3">
            <Sparkles className="w-3 h-3 text-[#B8860B]" />
            <span>National Eminence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#0C1322] tracking-tight">
            FSIA Events & Recognition
          </h2>
          <p className="text-sm sm:text-base text-[#475569] mt-2 font-sans">
            Showcasing authentic production benchmarks, verified achievements, and grand stage milestones.
          </p>
        </div>

        {/* Real Event Visual Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="relative rounded-md overflow-hidden border border-[#D4AF37]/40 shadow-xs h-56 sm:h-64 md:h-60 lg:h-64 group bg-neutral-900">
            <FSIAImage
              src="https://www.fsia.in/static/media/glimp4.657abb599cd479f88972.webp"
              alt="Bharat Couture Week Stage"
              className="w-full h-full"
              objectPosition="top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C1322]/85 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 text-white">
              <span className="text-[10px] uppercase font-sans tracking-widest text-[#D4AF37]">Ramp & Runway</span>
              <h3 className="text-sm sm:text-base font-display font-bold text-white">Bharat Couture Week</h3>
            </div>
          </div>

          <div className="relative rounded-md overflow-hidden border border-[#D4AF37]/40 shadow-xs h-56 sm:h-64 md:h-60 lg:h-64 group bg-neutral-900">
            <FSIAImage
              src="https://www.fsia.in/uploads/Forever-Star-India-Pageant.webp"
              alt="National Pageant Coronation Ceremony"
              className="w-full h-full"
              objectPosition="top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C1322]/85 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 text-white">
              <span className="text-[10px] uppercase font-sans tracking-widest text-[#D4AF37]">Coronation</span>
              <h3 className="text-sm sm:text-base font-display font-bold text-white">Grand Finale at Zee Studio</h3>
            </div>
          </div>

          <div className="relative rounded-md overflow-hidden border border-[#D4AF37]/40 shadow-xs h-56 sm:h-64 md:h-60 lg:h-64 group bg-neutral-900">
            <FSIAImage
              src="https://www.fsia.in/uploads/Forever-Star-India-award-season-8.webp"
              alt="National Award Show Felicitation"
              className="w-full h-full"
              objectPosition="top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C1322]/85 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 text-white">
              <span className="text-[10px] uppercase font-sans tracking-widest text-[#D4AF37]">Felicitation</span>
              <h3 className="text-sm sm:text-base font-display font-bold text-white">Super Woman & Achievers Awards</h3>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Verified Recognition */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recognitionHighlights.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-white p-5 rounded-md border border-[#EADBAC]/70 shadow-2xs hover:border-[#D4AF37] transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-[#FAF7F0] border border-[#D4AF37]/30 flex items-center justify-center text-[#B8860B] mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-display font-bold text-[#0C1322] mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-[#526077] font-sans leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
