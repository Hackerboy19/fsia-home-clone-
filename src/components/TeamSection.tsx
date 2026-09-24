import React from 'react';
import { TEAM_MEMBERS } from '../data/fsiaData';
import { FSIAImage } from './FSIAImage';

export const TeamSection: React.FC = () => {
  return (
    <section id="team" className="py-20 md:py-24 bg-white relative border-b border-[#EADBAC]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FAF7F0] border border-[#D4AF37]/40 text-[#7E591B] text-[11px] font-semibold tracking-widest uppercase mb-4 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B]" />
            <span>LEADERSHIP &amp; EXPERT JURY PANEL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#0C1322] tracking-tight">
            OUR TEAM &amp; MENTORS
          </h2>
          <p className="text-base text-[#475569] mt-3 font-sans leading-relaxed">
            Guiding Forever Star India with dedication, national industry pedigree, and a commitment to unlocking human potential.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.name}
              className="bg-[#FAF9F5] border border-[#EADBAC] p-6 shadow-2xs hover:border-[#D4AF37] transition-colors flex flex-col items-center text-center justify-between"
            >
              <div className="flex flex-col items-center">
                <div className="w-28 h-28 overflow-hidden border-2 border-[#D4AF37] mb-4 bg-neutral-900 shadow-xs">
                  <FSIAImage
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full"
                    objectPosition="top"
                  />
                </div>

                <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#B8860B] mb-1">
                  {member.role}
                </span>

                <h3 className="text-lg font-display font-bold text-[#0C1322]">
                  {member.name}
                </h3>

                <p className="text-xs text-[#7E591B] font-semibold font-sans mt-0.5">
                  {member.designation}
                </p>

                <p className="text-xs text-[#526077] font-sans mt-3 leading-relaxed line-clamp-3">
                  {member.bio}
                </p>
              </div>

              <div className="w-full pt-4 mt-4 border-t border-[#EADBAC]">
                <span className="text-[10px] uppercase font-bold text-[#0C1322] tracking-wider font-sans">
                  Official FSIA Board
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* View Full Team CTA */}
        <div className="mt-12 text-center">
          <a
            href="https://www.fsia.in/our-teams.php"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-7 py-3.5 bg-[#0C1322] hover:bg-[#1A253E] text-[#EADBAC] hover:text-white text-xs font-bold tracking-widest uppercase border border-[#D4AF37]/50 transition-colors"
          >
            VIEW COMPLETE LEADERSHIP DIRECTORY &rarr;
          </a>
        </div>

      </div>
    </section>
  );
};
