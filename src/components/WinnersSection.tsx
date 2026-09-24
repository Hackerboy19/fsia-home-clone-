import React, { useState, useMemo } from 'react';
import { Search, X, RotateCcw, Award, Calendar, MapPin, ExternalLink, Filter } from 'lucide-react';
import { WINNERS } from '../data/fsiaData';
import { WinnerItem } from '../types';
import { FSIAImage } from './FSIAImage';

interface WinnersSectionProps {
  onSelectWinner?: (winner: WinnerItem) => void;
}

export const WinnersSection: React.FC<WinnersSectionProps> = ({ onSelectWinner }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    'All',
    'Forever Miss India',
    'Forever Mrs India',
    'Forever Miss Teen India',
    'Miss Forever Universe'
  ];

  const availableYears = useMemo(() => {
    const years = new Set<string>();
    WINNERS.forEach((w) => {
      if (w.year) years.add(w.year);
      if (w.season && /^\d{4}$/.test(w.season)) years.add(w.season);
    });
    return ['All', ...Array.from(years).sort((a, b) => b.localeCompare(a))];
  }, []);

  // Multi-facet filtering: Category + Year + Search Query
  const filteredWinners = useMemo(() => {
    return WINNERS.filter((winner) => {
      // 1. Category filter
      if (activeCategory !== 'All') {
        const matchesCategory =
          winner.category === activeCategory ||
          (activeCategory === 'Miss Forever Universe' && winner.category.includes('Universe'));
        if (!matchesCategory) return false;
      }

      // 2. Year filter
      if (selectedYear !== 'All') {
        const winnerYear = winner.year || winner.season;
        if (winnerYear !== selectedYear) return false;
      }

      // 3. Search query (matches name, year, season, title, category, or location)
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const nameMatch = winner.name.toLowerCase().includes(query);
        const yearMatch = (winner.year && winner.year.toLowerCase().includes(query)) ||
          (winner.season && winner.season.toLowerCase().includes(query));
        const titleMatch = winner.title.toLowerCase().includes(query);
        const categoryMatch = winner.category.toLowerCase().includes(query);
        const locationMatch = winner.location.toLowerCase().includes(query);

        if (!nameMatch && !yearMatch && !titleMatch && !categoryMatch && !locationMatch) {
          return false;
        }
      }

      return true;
    });
  }, [activeCategory, selectedYear, searchQuery]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedYear('All');
    setActiveCategory('All');
  };

  const isFiltered = searchQuery.trim() !== '' || selectedYear !== 'All' || activeCategory !== 'All';

  return (
    <section id="winners" className="py-20 md:py-24 bg-[#FAF9F5] relative border-b border-[#EADBAC]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 pb-6 border-b border-[#EADBAC]">
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

          <a
            href="https://www.fsia.in/pageant-winner"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0C1322] hover:bg-[#1A253E] text-[#EADBAC] hover:text-white text-xs font-bold uppercase tracking-wider border border-[#D4AF37]/40 shadow-xs transition-colors shrink-0 self-start md:self-end"
          >
            <span>ALL WINNERS DIRECTORY</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* SEARCH & FILTER CONTROL BAR */}
        <div className="bg-white border border-[#EADBAC] p-4 sm:p-5 shadow-2xs mb-10 space-y-4">
          
          {/* Top Row: Search Bar by Name or Year */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-[#B8860B]" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search winners by name or year (e.g. Neeharika, 2025, Bhumika, 2024, Rajasthan)..."
                className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm border border-neutral-300 rounded-xs focus:outline-none focus:border-[#B8860B] focus:ring-1 focus:ring-[#B8860B] font-sans text-[#0C1322] bg-[#FAF8F2]/40 placeholder:text-[#94A3B8]"
                aria-label="Search winners by name or year"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#94A3B8] hover:text-[#0C1322] cursor-pointer"
                  title="Clear search"
                  aria-label="Clear search text"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Year Selector */}
            <div className="flex items-center gap-1.5 shrink-0 overflow-x-auto pb-1 sm:pb-0">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#7E591B] flex items-center gap-1 shrink-0 mr-1">
                <Calendar className="w-3.5 h-3.5 text-[#B8860B]" />
                <span className="hidden sm:inline">Year:</span>
              </span>
              {availableYears.map((year) => (
                <button
                  key={year}
                  type="button"
                  onClick={() => setSelectedYear(year)}
                  className={`px-2.5 py-1.5 text-xs font-semibold tracking-wider rounded-xs transition-colors cursor-pointer shrink-0 ${
                    selectedYear === year
                      ? 'bg-[#0C1322] text-[#EADBAC] border border-[#D4AF37]'
                      : 'bg-[#FAF8F2] text-[#526077] border border-neutral-200 hover:border-[#D4AF37]'
                  }`}
                >
                  {year === 'All' ? 'All Years' : year}
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Row: Pageant Category Filter Tabs & Filter Status */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 pt-3 border-t border-[#EADBAC]/60">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#7E591B] flex items-center gap-1 mr-1">
                <Filter className="w-3.5 h-3.5 text-[#B8860B]" />
                <span className="hidden sm:inline">Category:</span>
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1 text-xs font-semibold tracking-wide uppercase transition-colors cursor-pointer rounded-xs ${
                    activeCategory === cat
                      ? 'bg-[#0C1322] text-[#EADBAC] border border-[#D4AF37]'
                      : 'bg-white text-[#475569] border border-[#EADBAC] hover:border-[#D4AF37] hover:bg-[#FAF8F2]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Status badge & Reset Button */}
            <div className="flex items-center gap-3 text-xs font-sans self-stretch sm:self-auto justify-between sm:justify-end">
              <span className="text-[#526077]">
                Showing <strong>{filteredWinners.length}</strong> of {WINNERS.length} titleholders
              </span>

              {isFiltered && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-[#7E591B] hover:text-[#0C1322] bg-[#FAF8F2] hover:bg-[#EDE8DC] border border-[#D4AF37]/50 rounded-xs transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>
          </div>

        </div>

        {/* Queens Portrait Gallery or Empty State */}
        {filteredWinners.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
            {filteredWinners.map((winner) => (
              <div
                key={winner.id}
                className="group bg-white border border-[#EADBAC] overflow-hidden shadow-2xs hover:border-[#D4AF37] transition-all flex flex-col justify-between"
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
                  <div className="absolute top-3 left-3 bg-[#0C1322]/90 border border-[#D4AF37]/60 text-[#EADBAC] text-[10px] font-bold px-2 py-0.5 tracking-wider uppercase backdrop-blur-xs">
                    Year {winner.year || winner.season}
                  </div>
                </a>

                {/* Information Panel Below Image */}
                <div className="p-6 bg-white flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-sans text-[#7E591B] font-semibold uppercase tracking-wider mb-1">
                      <span>{winner.category}</span>
                      <span className="text-[#526077] font-mono font-bold">
                        {winner.season || winner.year || '2025'}
                      </span>
                    </div>

                    <a
                      href={winner.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-xl font-display font-bold text-[#0C1322] hover:text-[#7E591B] transition-colors mt-1"
                    >
                      {winner.name}
                    </a>

                    <p className="text-xs font-sans font-semibold text-[#B8860B] mt-1 flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 shrink-0" />
                      <span>{winner.title}</span>
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#EADBAC] flex items-center justify-between text-xs font-sans">
                    <a
                      href={winner.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold uppercase tracking-wider text-[#0C1322] hover:text-[#B8860B] transition-colors inline-flex items-center gap-1"
                    >
                      <span>OFFICIAL PROFILE</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <span className="text-[#64748B] flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#B8860B]" />
                      <span>{winner.location}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty Search Results State */
          <div className="p-12 text-center bg-white border border-[#EADBAC] shadow-2xs max-w-xl mx-auto">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#FAF8F2] border border-[#D4AF37]/50 flex items-center justify-center text-[#B8860B]">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-display font-bold text-[#0C1322] mb-1">
              No Titleholders Found
            </h3>
            <p className="text-xs sm:text-sm text-[#64748B] font-sans mb-5 leading-relaxed">
              We couldn't find any crowned winners matching{' '}
              {searchQuery && <strong className="text-[#0C1322]">"{searchQuery}"</strong>}{' '}
              {selectedYear !== 'All' && <span>in year <strong>{selectedYear}</strong></span>}{' '}
              {activeCategory !== 'All' && <span>under <strong>{activeCategory}</strong></span>}.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0C1322] text-[#EADBAC] text-xs font-bold uppercase tracking-wider border border-[#D4AF37]/60 hover:bg-[#1A253E] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear Search &amp; Reset Filters</span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
