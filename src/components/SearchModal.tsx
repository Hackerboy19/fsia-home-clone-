import React, { useState, useMemo } from 'react';
import { Search, X, Trophy, Award, Newspaper, Crown, ArrowRight } from 'lucide-react';
import { PAGEANTS, AWARDS, ARTICLES, WINNERS } from '../data/fsiaData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (type: 'pageant' | 'award' | 'article' | 'winner', item: any) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectResult
}) => {
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query.trim()) return { pageants: [], awards: [], articles: [], winners: [] };
    const q = query.toLowerCase();

    return {
      pageants: PAGEANTS.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      ),
      awards: AWARDS.filter(
        (a) => a.name.toLowerCase().includes(q) || a.description.toLowerCase().includes(q)
      ),
      articles: ARTICLES.filter(
        (art) => art.title.toLowerCase().includes(q) || art.excerpt.toLowerCase().includes(q)
      ),
      winners: WINNERS.filter(
        (w) => w.name.toLowerCase().includes(q) || w.title.toLowerCase().includes(q) || w.location.toLowerCase().includes(q)
      )
    };
  }, [query]);

  if (!isOpen) return null;

  const totalResults =
    searchResults.pageants.length +
    searchResults.awards.length +
    searchResults.articles.length +
    searchResults.winners.length;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-start justify-center p-4 pt-16 sm:pt-24">
      <div
        className="relative bg-white border border-[#D4AF37]/40 rounded-md shadow-2xl max-w-2xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Bar */}
        <div className="p-4 border-b border-neutral-200 flex items-center gap-3 bg-[#FAF9F5]">
          <Search className="w-5 h-5 text-[#B8860B] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pageants, awards, winners, or news releases..."
            autoFocus
            className="w-full text-sm sm:text-base font-sans bg-transparent focus:outline-hidden text-[#0C1322] placeholder:text-neutral-400"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-neutral-400 hover:text-neutral-600 text-xs px-2 py-1"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-neutral-200 hover:bg-neutral-300 text-neutral-600 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {!query.trim() ? (
            <div className="py-10 text-center text-xs sm:text-sm text-neutral-500 space-y-2">
              <p>Type to search across official FSIA programs and records:</p>
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                <button
                  onClick={() => setQuery('Miss India')}
                  className="px-2.5 py-1 rounded-xs bg-[#FAF7F0] border border-[#D4AF37]/30 text-xs text-[#0C1322] hover:bg-[#F6F0DA]"
                >
                  Miss India
                </button>
                <button
                  onClick={() => setQuery('Mrs India')}
                  className="px-2.5 py-1 rounded-xs bg-[#FAF7F0] border border-[#D4AF37]/30 text-xs text-[#0C1322] hover:bg-[#F6F0DA]"
                >
                  Mrs India
                </button>
                <button
                  onClick={() => setQuery('Super Women')}
                  className="px-2.5 py-1 rounded-xs bg-[#FAF7F0] border border-[#D4AF37]/30 text-xs text-[#0C1322] hover:bg-[#F6F0DA]"
                >
                  Super Women Awards
                </button>
                <button
                  onClick={() => setQuery('Zee Studio')}
                  className="px-2.5 py-1 rounded-xs bg-[#FAF7F0] border border-[#D4AF37]/30 text-xs text-[#0C1322] hover:bg-[#F6F0DA]"
                >
                  Zee Studio
                </button>
              </div>
            </div>
          ) : totalResults === 0 ? (
            <div className="py-12 text-center text-sm text-neutral-500">
              No results found for &ldquo;{query}&rdquo;.
            </div>
          ) : (
            <div className="space-y-4">
              {/* Pageants */}
              {searchResults.pageants.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#7E591B] mb-2 flex items-center gap-1.5">
                    <Trophy className="w-3.5 h-3.5" /> Pageants ({searchResults.pageants.length})
                  </h4>
                  <div className="space-y-1.5">
                    {searchResults.pageants.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => {
                          onSelectResult('pageant', p);
                          onClose();
                        }}
                        className="p-2.5 rounded-sm hover:bg-[#FAF7F0] cursor-pointer flex items-center justify-between border border-transparent hover:border-[#D4AF37]/40 transition-colors"
                      >
                        <div>
                          <p className="text-sm font-display font-bold text-[#0C1322]">{p.name}</p>
                          <p className="text-xs text-[#64748B] line-clamp-1">{p.description}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#B8860B] shrink-0 ml-2" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Awards */}
              {searchResults.awards.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#7E591B] mb-2 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5" /> Awards & Honours ({searchResults.awards.length})
                  </h4>
                  <div className="space-y-1.5">
                    {searchResults.awards.map((a) => (
                      <div
                        key={a.id}
                        onClick={() => {
                          onSelectResult('award', a);
                          onClose();
                        }}
                        className="p-2.5 rounded-sm hover:bg-[#FAF7F0] cursor-pointer flex items-center justify-between border border-transparent hover:border-[#D4AF37]/40 transition-colors"
                      >
                        <div>
                          <p className="text-sm font-display font-bold text-[#0C1322]">{a.name}</p>
                          <p className="text-xs text-[#64748B] line-clamp-1">{a.description}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#B8860B] shrink-0 ml-2" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Winners */}
              {searchResults.winners.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#7E591B] mb-2 flex items-center gap-1.5">
                    <Crown className="w-3.5 h-3.5" /> Crowned Winners ({searchResults.winners.length})
                  </h4>
                  <div className="space-y-1.5">
                    {searchResults.winners.map((w) => (
                      <div
                        key={w.id}
                        onClick={() => {
                          onSelectResult('winner', w);
                          onClose();
                        }}
                        className="p-2.5 rounded-sm hover:bg-[#FAF7F0] cursor-pointer flex items-center justify-between border border-transparent hover:border-[#D4AF37]/40 transition-colors"
                      >
                        <div>
                          <p className="text-sm font-display font-bold text-[#0C1322]">{w.name}</p>
                          <p className="text-xs text-[#64748B]">{w.title} • {w.location}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#B8860B] shrink-0 ml-2" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Articles */}
              {searchResults.articles.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#7E591B] mb-2 flex items-center gap-1.5">
                    <Newspaper className="w-3.5 h-3.5" /> News & Updates ({searchResults.articles.length})
                  </h4>
                  <div className="space-y-1.5">
                    {searchResults.articles.map((art) => (
                      <div
                        key={art.id}
                        onClick={() => {
                          onSelectResult('article', art);
                          onClose();
                        }}
                        className="p-2.5 rounded-sm hover:bg-[#FAF7F0] cursor-pointer flex items-center justify-between border border-transparent hover:border-[#D4AF37]/40 transition-colors"
                      >
                        <div>
                          <p className="text-sm font-display font-bold text-[#0C1322]">{art.title}</p>
                          <p className="text-xs text-[#64748B] line-clamp-1">{art.excerpt}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#B8860B] shrink-0 ml-2" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
