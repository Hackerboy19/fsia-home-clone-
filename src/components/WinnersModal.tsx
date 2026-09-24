import React, { useState } from 'react';
import { X, Crown, MapPin, Sparkles, Trophy } from 'lucide-react';
import { WINNERS } from '../data/fsiaData';
import { WinnerItem } from '../types';
import { FSIAImage } from './FSIAImage';

interface WinnersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectWinner: (winner: WinnerItem) => void;
}

export const WinnersModal: React.FC<WinnersModalProps> = ({
  isOpen,
  onClose,
  onSelectWinner
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  if (!isOpen) return null;

  const categories = ['All', 'Forever Miss India', 'Forever Mrs India', 'Forever Miss Teen India', 'Miss Forever Universe'];

  const filteredWinners = activeCategory === 'All'
    ? WINNERS
    : WINNERS.filter((w) => w.category === activeCategory || (activeCategory === 'Miss Forever Universe' && w.category.includes('Universe')));

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full bg-[#FAF9F5] border border-[#D4AF37]/50 rounded-lg shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0C1322] text-white p-6 border-b border-[#D4AF37]/30 flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF7F0]/10 border border-[#D4AF37]/40 text-[#D4AF37] text-[11px] font-semibold tracking-widest uppercase mb-2">
              <Crown className="w-3.5 h-3.5" />
              <span>National Coronation Roll of Honour</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
              Crowned Titleholders of FSIA
            </h2>
            <p className="text-xs sm:text-sm text-[#EADBAC] mt-1 font-sans">
              Reigning national pageant winners crowned on the grand stage of Forever Star India.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Bar */}
        <div className="bg-white px-6 py-3 border-b border-[#EADBAC]/60 flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-sm text-xs font-medium tracking-wide uppercase transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#0C1322] text-[#EADBAC] border border-[#D4AF37]'
                  : 'bg-[#FAF9F5] text-[#334155] border border-neutral-200 hover:border-[#D4AF37]/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Modal Body: Winners Grid */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredWinners.map((winner) => (
              <div
                key={winner.id}
                onClick={() => {
                  onSelectWinner(winner);
                }}
                className="group bg-white rounded-md border border-[#EADBAC]/80 overflow-hidden shadow-2xs hover:shadow-md hover:border-[#D4AF37] transition-all cursor-pointer flex flex-col"
              >
                <div className="relative h-60 sm:h-64 md:h-72 w-full overflow-hidden bg-neutral-900">
                  <FSIAImage
                    src={winner.image}
                    alt={winner.name}
                    className="w-full h-full"
                    objectPosition="top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C1322]/90 via-[#0C1322]/20 to-transparent" />

                  <div className="absolute top-3 left-3 w-7 h-7 rounded-full bg-[#0C1322]/90 border border-[#D4AF37]/60 flex items-center justify-center text-[#D4AF37]">
                    <Crown className="w-3.5 h-3.5" />
                  </div>

                  <span className="absolute top-3 right-3 text-[10px] font-sans font-medium text-white bg-black/60 px-2 py-0.5 rounded-xs flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#D4AF37]" />
                    {winner.location}
                  </span>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] uppercase font-sans tracking-widest text-[#D4AF37] font-semibold">
                      {winner.category}
                    </span>
                    <h3 className="text-base font-display font-bold text-white leading-tight">
                      {winner.name}
                    </h3>
                    <p className="text-xs text-[#EADBAC] font-sans mt-0.5">
                      {winner.title}
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-white flex items-center justify-between text-xs text-[#0C1322] font-medium border-t border-neutral-100 group-hover:bg-[#FAF7F0]">
                  <span className="text-[11px] text-[#64748B]">Season {winner.year}</span>
                  <span className="text-[11px] font-semibold text-[#7E591B] uppercase tracking-wider">
                    View Full Profile
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#FAF7F0] px-6 py-4 border-t border-[#EADBAC]/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#526077]">
          <span className="flex items-center gap-1.5 font-medium">
            <Trophy className="w-4 h-4 text-[#B8860B]" />
            Official Titleholders Verified by Forever Star India Board
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-sm bg-[#0C1322] text-white font-medium hover:bg-[#1A253E] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
