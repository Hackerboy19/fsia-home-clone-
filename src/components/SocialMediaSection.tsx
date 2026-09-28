import React from 'react';
import { Instagram, Facebook, Youtube, Linkedin, Twitter, Share2, ArrowUpRight } from 'lucide-react';
import { FSIA_SOCIAL_PLATFORMS } from '../data/fsiaData';
import { FSIAImage } from './FSIAImage';
import { MobileCarousel } from './MobileCarousel';
import type { SocialPlatformItem } from '../types';

// Each platform's own mark, in its own colour. The brand colour is confined to
// this one chip — the rest of the card stays in the FSIA gold/navy palette, so
// six different brands don't pull the section apart.
const PLATFORM: Record<
  SocialPlatformItem['iconName'],
  { Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>; color: string }
> = {
  instagram: { Icon: Instagram, color: '#E1306C' },
  facebook: { Icon: Facebook, color: '#1877F2' },
  youtube: { Icon: Youtube, color: '#FF0000' },
  linkedin: { Icon: Linkedin, color: '#0A66C2' },
  twitter: { Icon: Twitter, color: '#0F1419' },
  pinterest: { Icon: Share2, color: '#E60023' }
};

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

        {/* Official Social Channels — swipeable row on phones, grid from md up. */}
        <MobileCarousel
          label="Official FSIA social channels"
          gridClassName="md:grid-cols-2 lg:grid-cols-3"
          gapClassName="gap-6"
        >
          {FSIA_SOCIAL_PLATFORMS.map((platform) => {
            const { Icon, color } = PLATFORM[platform.iconName] ?? PLATFORM.pinterest;

            return (
              // The whole card is the link, so anywhere you tap opens the channel
              // — on a phone the old text-sized target was the only hit area.
              // No h-full on it: the flex row and the grid both default to
              // align-items:stretch, while a percentage height inside an
              // auto-height row resolves short and leaves the cards ragged.
              <a
                key={platform.id}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${platform.name} — ${platform.profileName} (opens in a new tab)`}
                className="group bg-[#FAF9F5] border border-[#EADBAC] shadow-2xs flex flex-col overflow-hidden hover:border-[#D4AF37] hover:shadow-md motion-safe:transition-all motion-safe:duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B8860B]"
              >
                {/* Channel imagery — already in the data, previously unused */}
                <div className="relative overflow-hidden aspect-[16/10] bg-[#EDE8DC]">
                  <FSIAImage
                    src={platform.thumbnail ?? ''}
                    alt=""
                    className="w-full h-full"
                    imgClassName="motion-safe:transition-transform motion-safe:duration-500 group-hover:scale-105"
                    objectPosition="center"
                    sizes="(max-width: 768px) 82vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  {/* Scrim keeps the chips readable over any photo */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C1322]/70 via-[#0C1322]/10 to-transparent" />

                  <span
                    className="absolute top-3 left-3 w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center"
                    style={{ color }}
                  >
                    <Icon className="w-[18px] h-[18px]" strokeWidth={2} />
                  </span>

                  <span className="absolute top-3 right-3 text-[10px] font-sans font-semibold uppercase tracking-wider text-[#0C1322] px-2 py-0.5 bg-white/95 border border-[#D4AF37]/30">
                    {platform.badge}
                  </span>

                  <span className="absolute bottom-3 left-3 text-xs font-bold font-sans uppercase tracking-widest text-white drop-shadow">
                    {platform.name}
                  </span>
                </div>

                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-lg font-display font-bold text-[#0C1322] group-hover:text-[#7E591B] motion-safe:transition-colors">
                      {platform.profileName}
                    </h3>
                    <p className="text-xs text-[#526077] font-sans leading-relaxed mt-2">
                      {platform.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-6 border-t border-[#EADBAC] flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0C1322] group-hover:text-[#B8860B] motion-safe:transition-colors font-sans">
                      Open channel
                      <ArrowUpRight className="w-3.5 h-3.5 motion-safe:transition-transform motion-safe:duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                    <span className="text-[10px] text-[#7E591B] font-semibold uppercase tracking-wider">
                      Verified Official
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </MobileCarousel>

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
