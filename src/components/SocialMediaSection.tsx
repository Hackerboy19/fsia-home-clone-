import React from 'react';
import { FSIA_SOCIAL_PLATFORMS } from '../data/fsiaData';

export const SocialMediaSection: React.FC = () => {
  return (
    <section id="social" className="py-20 md:py-24 bg-white relative border-b border-[#EADBAC]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FAF7F0] border border-[#D4AF37]/40 text-[#7E591B] text-[11px] font-semibold tracking-widest uppercase mb-4 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B]" />
            <span>OFFICIAL BROADCAST &amp; COMMUNITY FEEDS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#0C1322] tracking-tight">
            CONNECT WITH FSIA
          </h2>
          <p className="text-base text-[#475569] mt-3 font-sans leading-relaxed">
            Follow the live crowning ceremonies, behind-the-scenes masterclasses, delegate highlights, and nationwide coronation coverage across our official verified media handles.
          </p>
        </div>

        {/* Official Social Channels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FSIA_SOCIAL_PLATFORMS.map((platform) => (
            <div
              key={platform.id}
              className="bg-[#FAF9F5] border border-[#EADBAC] p-6 flex flex-col justify-between hover:border-[#D4AF37] transition-colors shadow-2xs"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold font-sans uppercase tracking-widest text-[#B8860B]">
                    {platform.name}
                  </span>
                  <span className="text-[11px] font-sans font-semibold text-[#0C1322] px-2.5 py-0.5 bg-white border border-[#D4AF37]/30">
                    {platform.badge}
                  </span>
                </div>

                <h3 className="text-lg font-display font-bold text-[#0C1322] mb-1">
                  {platform.profileName}
                </h3>

                <p className="text-xs text-[#526077] font-sans leading-relaxed mt-2">
                  {platform.description}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-[#EADBAC] flex items-center justify-between">
                <a
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold uppercase tracking-wider text-[#0C1322] hover:text-[#B8860B] transition-colors font-sans"
                >
                  OPEN CHANNEL &rarr;
                </a>
                <span className="text-[10px] text-[#7E591B] font-semibold uppercase tracking-wider">
                  Verified Official
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Live Broadcast Note */}
        <div className="mt-12 p-6 bg-[#FAF8F2] border border-[#D4AF37]/40 text-center max-w-3xl mx-auto">
          <p className="text-xs text-[#526077] font-sans">
            All coronation ceremonies, contestant walk-throughs, and celebrity felicitation segments are livestreamed exclusively on the official Forever Star India YouTube and social channels.
          </p>
        </div>

      </div>
    </section>
  );
};
