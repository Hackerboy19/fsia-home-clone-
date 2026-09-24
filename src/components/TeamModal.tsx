import React from 'react';
import { X, Sparkles, Award, ShieldCheck } from 'lucide-react';
import { TEAM_MEMBERS } from '../data/fsiaData';
import { FSIAImage } from './FSIAImage';

interface TeamModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TeamModal: React.FC<TeamModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full bg-[#FAF9F5] border border-[#D4AF37]/50 rounded-lg shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0C1322] text-white p-6 border-b border-[#D4AF37]/30 flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF7F0]/10 border border-[#D4AF37]/40 text-[#D4AF37] text-[11px] font-semibold tracking-widest uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>FSIA Leadership & Board</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
              The Visionaries Behind FSIA
            </h2>
            <p className="text-xs sm:text-sm text-[#EADBAC] mt-1 font-sans">
              Dedicated leadership democratizing national recognition and pageantry across India.
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

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-md border border-[#EADBAC]/80 overflow-hidden shadow-2xs hover:border-[#D4AF37] transition-all flex flex-col"
              >
                <div className="relative h-60 sm:h-64 md:h-72 w-full overflow-hidden bg-neutral-900">
                  <FSIAImage
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full"
                    objectPosition="top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C1322]/85 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <span className="text-[10px] uppercase font-sans tracking-widest text-[#D4AF37] font-semibold">
                      {member.role}
                    </span>
                    <h3 className="text-xl font-display font-bold text-white">
                      {member.name}
                    </h3>
                    <p className="text-xs text-[#EADBAC]">
                      {member.designation}
                    </p>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <p className="text-xs sm:text-sm text-[#475569] font-sans leading-relaxed">
                    {member.bio}
                  </p>
                  <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center gap-2 text-xs text-[#7E591B] font-medium">
                    <ShieldCheck className="w-4 h-4 text-[#B8860B]" />
                    <span>Official FSIA Executive</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#FAF7F0] p-5 rounded-md border border-[#D4AF37]/30 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#0C1322] text-[#D4AF37] flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-display font-bold text-[#0C1322]">
                Official National Trademark & Organization
              </h4>
              <p className="text-xs text-[#526077] font-sans mt-0.5">
                Forever Star India is officially registered with the Government of India under Class 41. All operations, jury sessions, and coronation events are managed under strict organizational governance.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#FAF7F0] px-6 py-4 border-t border-[#EADBAC]/60 flex justify-end">
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
