import React, { useState } from 'react';

interface FSIALogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark' | 'auto';
  showSubtitle?: boolean;
}

export const FSIALogo: React.FC<FSIALogoProps> = ({
  className = '',
  size = 'md',
  variant = 'auto',
  showSubtitle = true
}) => {
  const [imgError, setImgError] = useState(false);

  const starSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9 sm:w-10 sm:h-10',
    lg: 'w-12 h-12 sm:w-14 sm:h-14'
  };

  const titleSizes = {
    sm: 'text-base',
    md: 'text-lg sm:text-xl',
    lg: 'text-2xl sm:text-3xl'
  };

  const subSizes = {
    sm: 'text-[8px] tracking-[0.14em]',
    md: 'text-[9px] sm:text-[10px] tracking-[0.18em]',
    lg: 'text-[11px] sm:text-xs tracking-[0.2em]'
  };

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 group select-none ${className}`}>
      {/* Official Star Logo Emblem */}
      <div className={`relative ${starSizes[size]} rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105 overflow-hidden shadow-xs bg-[#0C1322] border border-[#D4AF37]/60`}>
        {!imgError ? (
          <img
            src="https://www.fsia.in/favicon.ico"
            alt="Forever Star India (FSIA) Registered Trademark Logo"
            className="w-full h-full object-contain p-1"
            onError={() => setImgError(true)}
          />
        ) : (
          /* High-Fidelity SVG of the Class 41 Registered Star Logo of Forever Star India */
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full p-1 text-[#D4AF37]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="50" cy="50" r="46" stroke="#D4AF37" strokeWidth="2" strokeDasharray="3 2" />
            <polygon
              points="50,6 62,37 95,37 68,58 78,90 50,71 22,90 32,58 5,37 38,37"
              fill="url(#goldGrad)"
              stroke="#FBF2D5"
              strokeWidth="1.5"
            />
            <circle cx="50" cy="50" r="12" fill="#0C1322" stroke="#D4AF37" strokeWidth="1.5" />
            <polygon
              points="50,42 53,47 58,47 54,50 56,55 50,52 44,55 46,50 42,47 47,47"
              fill="#D4AF37"
            />
            <defs>
              <linearGradient id="goldGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F6E7B0" />
                <stop offset="0.5" stopColor="#D4AF37" />
                <stop offset="1" stopColor="#996515" />
              </linearGradient>
            </defs>
          </svg>
        )}
      </div>

      {/* Brand Identity Wordmark */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-1.5 leading-none">
          <span
            className={`font-display font-bold tracking-widest leading-none ${
              variant === 'light'
                ? 'text-white'
                : variant === 'dark'
                ? 'text-[#0C1322]'
                : 'text-[#0C1322]'
            } ${titleSizes[size]}`}
          >
            FSIA
          </span>
          <span className="text-[9px] font-sans font-bold text-[#B8860B] border border-[#B8860B]/40 px-1 py-0.2 rounded-xs tracking-normal bg-[#FAF7F0]">
            TM
          </span>
        </div>

        {showSubtitle && (
          <span
            className={`uppercase font-sans font-semibold leading-tight mt-0.5 ${
              variant === 'light' ? 'text-[#EADBAC]' : 'text-[#7E591B]'
            } ${subSizes[size]}`}
          >
            Forever Star India
          </span>
        )}
      </div>
    </div>
  );
};
