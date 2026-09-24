import React from 'react';
import { Sparkles, Award, ShieldCheck, Star, ArrowUpRight } from 'lucide-react';
import { TEAM_MEMBERS, CELEBRITIES } from '../data/fsiaData';
import { FSIAImage } from './FSIAImage';

export const TeamCelebritiesSection: React.FC = () => {
  return (
    <section id="team" className="py-24 bg-white relative border-t border-[#EADBAC]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF7F0] border border-[#D4AF37]/30 text-[#7E591B] text-[11px] font-semibold tracking-widest uppercase mb-3 shadow-2xs">
            <Sparkles className="w-3 h-3 text-[#B8860B]" />
            <span>Leadership, Celebrities & Recognition</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#0C1322] tracking-tight">
            Team, Celebrities & National Recognition
          </h2>
          <p className="text-sm sm:text-base text-[#475569] mt-3 font-sans leading-relaxed">
            The visionary minds shaping Forever Star India, distinguished celebrity jury guests, and certified national credentials.
          </p>
        </div>

        {/* Part 1: Official FSIA Leadership */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <ShieldCheck className="w-5 h-5 text-[#B8860B]" />
            <h3 className="text-xl font-display font-bold text-[#0C1322] tracking-wide uppercase">
              FSIA Executive Leadership
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.name}
                className="bg-[#FAF9F5] rounded-md border border-[#EADBAC]/80 overflow-hidden shadow-2xs hover:border-[#D4AF37] hover:shadow-md transition-all flex flex-col sm:flex-row group"
              >
                {/* Member Image */}
                <div className="relative w-full sm:w-56 md:w-52 lg:w-60 h-64 sm:h-auto min-h-[220px] overflow-hidden shrink-0 bg-neutral-900">
                  <FSIAImage
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full"
                    objectPosition="top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C1322]/80 sm:hidden via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 text-[10px] font-sans font-semibold text-white bg-[#0C1322]/85 px-2 py-0.5 rounded-xs border border-[#D4AF37]/40">
                    {member.role}
                  </span>
                </div>

                {/* Member Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xl font-display font-bold text-[#0C1322]">
                      {member.name}
                    </h4>
                    <p className="text-xs font-sans font-semibold text-[#7E591B] mt-0.5">
                      {member.designation}
                    </p>
                    <p className="text-xs sm:text-sm text-[#526077] font-sans mt-3 leading-relaxed">
                      {member.bio}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#EADBAC]/50 flex items-center justify-between">
                    <span className="text-[11px] text-[#64748B] font-medium">
                      Govt. Class 41 Certified Executive
                    </span>
                    <a
                      href="https://www.fsia.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#0C1322] hover:text-[#B8860B] transition-colors"
                    >
                      <span>Official Profile</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Part 2: Celebrity Guests & Jury Documented on FSIA */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <Star className="w-5 h-5 text-[#B8860B]" />
            <h3 className="text-xl font-display font-bold text-[#0C1322] tracking-wide uppercase">
              Celebrity Guests & Event Presence
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CELEBRITIES.map((celeb) => (
              <div
                key={celeb.id}
                className="bg-[#FAF9F5] rounded-md border border-[#EADBAC]/80 overflow-hidden shadow-2xs hover:border-[#D4AF37] hover:shadow-md transition-all flex flex-col sm:flex-row group"
              >
                <div className="relative w-full sm:w-56 md:w-52 lg:w-60 h-64 sm:h-auto min-h-[220px] overflow-hidden shrink-0 bg-neutral-900">
                  <FSIAImage
                    src={celeb.image}
                    alt={celeb.name}
                    className="w-full h-full"
                    objectPosition="top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C1322]/70 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 text-[10px] font-sans font-semibold text-white bg-[#0C1322]/85 px-2 py-0.5 rounded-xs border border-[#D4AF37]/40">
                    Celebrity Guest
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#7E591B] font-semibold">
                      {celeb.event}
                    </span>
                    <h4 className="text-xl font-display font-bold text-[#0C1322] mt-0.5">
                      {celeb.name}
                    </h4>
                    <p className="text-xs font-sans font-semibold text-[#B8860B] mt-0.5">
                      {celeb.role}
                    </p>
                    <p className="text-xs sm:text-sm text-[#526077] font-sans mt-3 leading-relaxed">
                      {celeb.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#EADBAC]/50 flex items-center gap-2 text-xs text-[#7E591B] font-medium">
                    <Award className="w-4 h-4 text-[#B8860B]" />
                    <span>Official FSIA Grand Stage Dignitary</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Part 3: Verified Recognition Banner */}
        <div className="bg-[#FAF7F0] p-6 sm:p-8 rounded-md border border-[#D4AF37]/40 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xs">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#0C1322] text-[#D4AF37] flex items-center justify-center shrink-0 shadow-sm">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-display font-bold text-[#0C1322]">
                Registered Trademark under Class 41, Government of India
              </h4>
              <p className="text-xs sm:text-sm text-[#526077] font-sans mt-0.5">
                Represented by the Star Logo with nationwide audition chapters across 4,000+ cities and grand finale ceremonies broadcast from Zee Studio Jaipur.
              </p>
            </div>
          </div>

          <a
            href="https://www.fsia.in/top-awardee-in-india"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-sm bg-[#0C1322] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#1A253E] border border-[#D4AF37]/40 transition-colors shadow-2xs"
          >
            <span>View Top Awardees</span>
            <ArrowUpRight className="w-4 h-4 text-[#D4AF37]" />
          </a>
        </div>
      </div>
    </section>
  );
};
