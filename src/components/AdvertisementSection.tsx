import React from 'react';

/**
 * Advertisement slot.
 *
 * Renders a leaderboard (728x90) from the md breakpoint up and a rectangle
 * (300x250) below it — only one is in the layout at a time. Both are capped
 * with max-w-full so the 728px slot can never overflow a narrow viewport.
 *
 * To drop a real creative in, replace the contents of each placeholder div
 * (the <span> with the size label) with the ad tag or an <a><img/></a>.
 */
export const AdvertisementSection: React.FC = () => {
  return (
    <section
      id="advertisement"
      className="py-12 md:py-16 bg-white border-b border-[#EADBAC]/60"
      aria-label="Advertisement"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative mx-auto w-full max-w-[760px] bg-[#FAF9F5] border border-[#EADBAC] shadow-2xs px-4 py-6 sm:px-6 sm:py-7">

          <span className="absolute top-2 right-3 text-[10px] font-sans font-semibold uppercase tracking-[0.18em] text-[#9AA3B2] select-none">
            Advertisement
          </span>

          {/* Desktop / tablet leaderboard — 728x90 */}
          <div className="hidden md:flex mt-3 mx-auto w-[728px] max-w-full h-[90px] items-center justify-center border border-dashed border-[#D4AF37]/45 bg-white">
            <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#9AA3B2]">
              728 &times; 90
            </span>
          </div>

          {/* Mobile rectangle — 300x250 */}
          <div className="flex md:hidden mt-3 mx-auto w-[300px] max-w-full h-[250px] items-center justify-center border border-dashed border-[#D4AF37]/45 bg-white">
            <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#9AA3B2]">
              300 &times; 250
            </span>
          </div>

        </div>
      </div>
    </section>
  );
};
