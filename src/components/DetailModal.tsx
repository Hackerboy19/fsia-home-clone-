import React from 'react';
import { X, Calendar, MapPin } from 'lucide-react';
import { FSIAImage } from './FSIAImage';

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'pageant' | 'award' | 'article' | 'winner' | null;
  data: any;
}

export const DetailModal: React.FC<DetailModalProps> = ({
  isOpen,
  onClose,
  type,
  data
}) => {
  if (!isOpen || !data || !type) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 overflow-y-auto">
      <div
        className="relative bg-white border border-[#D4AF37]/50 shadow-2xl max-w-2xl w-full my-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 bg-black/70 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Media Top */}
        <div className="relative h-56 sm:h-64 md:h-72 w-full bg-neutral-900 overflow-hidden">
          <FSIAImage
            src={data.image}
            alt={data.name || data.title}
            className="w-full h-full"
            objectPosition="top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C1322] via-[#0C1322]/40 to-transparent" />

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#D4AF37] block mb-1">
              {type === 'pageant' ? data.season : type === 'award' ? data.scope : type === 'winner' ? `Season ${data.year}` : data.category}
            </span>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
              {data.name || data.title}
            </h2>
            {data.subtitle && (
              <p className="text-xs text-[#EADBAC] font-sans mt-0.5">
                {data.subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-8 space-y-5 max-h-[50vh] overflow-y-auto">
          {/* Main Description */}
          <p className="text-sm text-[#334155] font-sans leading-relaxed">
            {data.description || data.content || data.bio || data.excerpt}
          </p>

          {/* Pageant-specific Details */}
          {type === 'pageant' && (
            <div className="space-y-4 pt-2">
              <div className="p-4 bg-[#FAF7F0] border border-[#EADBAC] text-xs space-y-1.5 font-sans">
                <p className="font-bold text-[#0C1322] uppercase text-[10px] tracking-wider">Audition Scale:</p>
                <p className="text-[#526077]">{data.cityRounds}</p>
                <p className="font-bold text-[#0C1322] uppercase text-[10px] tracking-wider pt-1">Eligibility Criteria:</p>
                <p className="text-[#526077]">{data.eligibility}</p>
              </div>

              {data.features && (
                <div>
                  <h4 className="text-xs font-sans font-bold uppercase tracking-wider text-[#0C1322] mb-2">
                    Official Structure &amp; Specifications:
                  </h4>
                  <ul className="space-y-1 text-xs text-[#475569] font-sans list-disc list-inside">
                    {data.features?.map((f: string, i: number) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Award-specific Details */}
          {type === 'award' && (
            <div className="space-y-3 pt-2">
              <div className="p-4 bg-[#FAF7F0] border border-[#EADBAC] text-xs space-y-2 font-sans">
                <div>
                  <span className="font-bold text-[#0C1322] uppercase text-[10px] tracking-wider block">Candidate Profile:</span>
                  <span className="text-[#526077]">{data.idealFor}</span>
                </div>
                <div>
                  <span className="font-bold text-[#0C1322] uppercase text-[10px] tracking-wider block">Nomination Status:</span>
                  <span className="text-[#526077]">{data.nominationStatus}</span>
                </div>
              </div>
            </div>
          )}

          {/* Winner-specific Details */}
          {type === 'winner' && (
            <div className="p-4 bg-[#FAF7F0] border border-[#EADBAC] text-xs space-y-2 font-sans">
              <div className="flex items-center gap-2 text-[#0C1322]">
                <MapPin className="w-4 h-4 text-[#B8860B]" />
                <span className="font-semibold">Represented: {data.location}</span>
              </div>
              <div className="text-[#0C1322]">
                <span className="text-[#7E591B] font-bold uppercase text-[10px] block">Title Conferred:</span>
                <span className="font-semibold">{data.title}</span>
              </div>
            </div>
          )}

          {/* Article-specific Details */}
          {type === 'article' && (
            <div className="flex items-center gap-4 text-xs text-[#64748B] pt-2 border-t border-neutral-100 font-sans">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#B8860B]" />
                {data.date}
              </span>
              <span>Reading time: {data.readTime}</span>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 bg-[#FAF9F5] border-t border-[#EADBAC] flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#475569] hover:text-[#0C1322] cursor-pointer"
          >
            Close
          </button>

          {(type === 'pageant' || type === 'award') && (
            <a
              href="https://www.fsia.in/quickapply"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-2.5 bg-[#0C1322] hover:bg-[#1A253E] text-[#EADBAC] hover:text-white text-xs font-bold uppercase tracking-wider border border-[#D4AF37]/50 shadow-xs transition-colors cursor-pointer"
            >
              {type === 'pageant' ? 'AUDITION APPLICATION' : 'NOMINATION PORTAL'} &rarr;
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
