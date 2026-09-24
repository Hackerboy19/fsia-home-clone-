import React, { useState } from 'react';
import { WINNERS } from '../data/fsiaData';
import { WinnerItem } from '../types';
import { FSIAImage } from './FSIAImage';

interface WinnersSectionProps {
  onSelectWinner?: (winner: WinnerItem) => void;
}

export const WinnersSection: React.FC<WinnersSectionProps> = ({ onSelectWinner }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Forever Miss India', 'Forever Mrs India', 'Forever Miss Teen India', 'Miss Forever Universe'];

  const filteredWinners = activeCategory === 'All'
    ? WINNERS
    : WINNERS.filter((w) => w.category === activeCategory || (activeCategory === 'Miss Forever Universe' && w.category.includes('Universe')));

  return (
    <section id="winners" className="py-20 md:py-24 bg-[#FAF9F5] relative border-b border-[#EADBAC]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6 pb-6 border-b border-[#EADBAC]">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#D4AF37]/40 text-[#7E591B] text-[11px] font-semibold tracking-widest uppercase mb-4 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B]" />
              <span>OFFICIAL CORONATION HALL OF FAME</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#0C1322] tracking-tight">
              CROWNED QUEENS OF INDIA
            </h2>
            <p className="text-base text-[#475569] mt-3 font-sans leading-relaxed">
              Celebrating prominent titleholders crowned at Zee Studio Jaipur across Forever Miss India, Forever Mrs India, Miss Teen India, and Forever Universe.
            </p>
          </div>

          {/* Action & Filter Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs font-semibold tracking-wide uppercase transition-colors cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-[#0C1322] text-[#EADBAC]'
                      : 'bg-white text-[#475569] border border-[#EADBAC] hover:border-[#D4AF37]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <a
              href="https://www.fsia.in/pageant-winner"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-5 py-2.5 bg-[#0C1322] hover:bg-[#1A253E] text-[#EADBAC] hover:text-white text-xs font-bold uppercase tracking-wider border border-[#D4AF37]/40 shadow-xs transition-colors shrink-0"
            >
              ALL WINNERS DIRECTORY
            </a>
          </div>
        </div>

        {/* Queens Portrait Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredWinners.map((winner) => (
            <div
              key={winner.id}
              className="group bg-white border border-[#EADBAC] overflow-hidden shadow-2xs hover:border-[#D4AF37] transition-colors flex flex-col justify-between"
            >
              {/* Authentic High-Resolution Queen Portrait */}
              <a
                href={winner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative block w-full aspect-[3/4] overflow-hidden bg-neutral-900"
                aria-label={`View profile of ${winner.name}`}
              >
                <FSIAImage
                  src={winner.image}
                  alt={winner.name}
                  className="w-full h-full group-hover:scale-103 transition-transform duration-500"
                  objectPosition="top"
                  aspectRatio="3/4"
                />
              </a>

              {/* Information Panel Below Image */}
              <div className="p-6 bg-white flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] font-sans text-[#7E591B] font-semibold uppercase tracking-wider mb-1">
                    <span>{winner.category}</span>
                    <span className="text-[#526077]">{winner.season || winner.year || '2025'}</span>
                  </div>

                  <a
                    href={winner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-xl font-display font-bold text-[#0C1322] hover:text-[#7E591B] transition-colors mt-1"
                  >
                    {winner.name}
                  </a>

                  <p className="text-xs font-sans font-semibold text-[#B8860B] mt-1">
                    {winner.title}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#EADBAC] flex items-center justify-between text-xs font-sans">
                  <a
                    href={winner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold uppercase tracking-wider text-[#0C1322] hover:text-[#B8860B] transition-colors"
                  >
                    OFFICIAL PROFILE &rarr;
                  </a>
                  <span className="text-[#64748B]">
                    {winner.location}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
