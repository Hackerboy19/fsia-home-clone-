import React from 'react';
import { VERIFIED_STATISTICS } from '../data/fsiaData';

export const TrustStatsSection: React.FC = () => {
  return (
    <section className="w-full bg-[#FFFFFF] border-b border-[#EADBAC]/60 py-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Grid: High contrast typography, no icon-box clichés */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {VERIFIED_STATISTICS.map((stat, idx) => (
            <div
              key={stat.label}
              className={`flex flex-col py-2 ${
                idx !== 0 ? 'md:border-l md:border-[#EADBAC] md:pl-8' : ''
              }`}
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#0C1322] tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-sans font-bold text-[#7E591B] uppercase tracking-wider mt-1.5">
                {stat.label}
              </div>
              <p className="text-xs text-[#526077] font-sans mt-1 leading-relaxed">
                {stat.subtext}
              </p>
            </div>
          ))}
        </div>

        {/* Verified Institutional Statement Footer */}
        <div className="mt-8 pt-6 border-t border-[#EADBAC]/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-[#526077] font-sans">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#B8860B] shrink-0" />
            <span className="font-semibold text-[#0C1322]">
              Democratic Grassroots Model:
            </span>
            <span>Auditioning talent across 28 States &amp; Union Territories without bias.</span>
          </div>

          <div className="text-[11px] text-[#7E591B] font-medium tracking-wide">
            Source: Official FSIA Registered Trademark Documentation (Class 41)
          </div>
        </div>

      </div>
    </section>
  );
};
