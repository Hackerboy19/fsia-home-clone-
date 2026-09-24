import React from 'react';
import { CELEBRITIES } from '../data/fsiaData';
import { FSIAImage } from './FSIAImage';

export const CelebritiesRecognitionSection: React.FC = () => {
  return (
    <section id="celebrities" className="py-20 md:py-24 bg-white relative border-b border-[#EADBAC]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FAF7F0] border border-[#D4AF37]/40 text-[#7E591B] text-[11px] font-semibold tracking-widest uppercase mb-4 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B]" />
            <span>DISTINGUISHED DIGNITARIES &amp; MENTORS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#0C1322] tracking-tight">
            CELEBRITY JURY &amp; GUESTS
          </h2>
          <p className="text-base text-[#475569] mt-3 font-sans leading-relaxed">
            Distinguished Bollywood icons, national jury members, and state dignitaries gracing the grand stage at Zee Studio Jaipur.
          </p>
        </div>

        {/* Celebrity Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {CELEBRITIES.map((celeb) => (
            <div
              key={celeb.id}
              className="bg-[#FAF9F5] border border-[#EADBAC] overflow-hidden shadow-2xs hover:border-[#D4AF37] transition-colors flex flex-col"
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden shrink-0 bg-neutral-900">
                <FSIAImage
                  src={celeb.image}
                  alt={celeb.name}
                  className="w-full h-full"
                  objectPosition="top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C1322]/80 via-transparent to-transparent pointer-events-none" />
                <span className="absolute bottom-3 left-3 text-[10px] font-sans font-bold uppercase tracking-wider text-[#EADBAC] bg-[#0C1322]/90 px-2.5 py-1 border border-[#D4AF37]/40">
                  {celeb.role.split('&')[0].trim()}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#7E591B] font-bold block mb-1">
                    {celeb.event}
                  </span>
                  <h3 className="text-xl font-display font-bold text-[#0C1322]">
                    {celeb.name}
                  </h3>
                  <p className="text-xs font-sans font-semibold text-[#B8860B] mt-0.5">
                    {celeb.role}
                  </p>
                  <p className="text-xs sm:text-sm text-[#526077] font-sans mt-3 leading-relaxed">
                    {celeb.description}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-[#EADBAC] flex items-center justify-between text-xs text-[#7E591B] font-medium font-sans">
                  <span>Official Grand Stage Guest</span>
                  <span className="text-[#0C1322] font-semibold">Zee Studio Finale</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Authentic Institutional Strip - No icon-bubble clichés */}
        <div className="p-6 sm:p-8 border border-[#D4AF37]/40 bg-[#FAF8F2] grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-sm font-display font-bold text-[#0C1322] uppercase tracking-wider">
              Government Registered Trademark • Class 41
            </h4>
            <p className="text-xs text-[#526077] font-sans mt-1.5 leading-relaxed">
              Forever Star India Awards is an officially protected trademark under Govt. of India intellectual property laws, safeguarding the integrity of all titleholders and awardees.
            </p>
          </div>

          <div className="md:border-l md:border-[#EADBAC] md:pl-8">
            <h4 className="text-sm font-display font-bold text-[#0C1322] uppercase tracking-wider">
              Grand Finale Arena • Zee Studio Jaipur
            </h4>
            <p className="text-xs text-[#526077] font-sans mt-1.5 leading-relaxed">
              The grand crowning ceremonies are produced with broadcast cameras, specialized lighting rigs, national media coverage, and live streaming to millions of viewers.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
