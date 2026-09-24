import React, { useState } from 'react';
import { Award } from 'lucide-react';

interface FSIAImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  objectPosition?: 'top' | 'center' | 'bottom' | string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'scale-down';
  aspectRatio?: string;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'sync' | 'auto';
  sizes?: string;
  fetchPriority?: 'high' | 'low' | 'auto';
}

export const FSIAImage: React.FC<FSIAImageProps> = ({
  src,
  alt,
  className = '',
  imgClassName = '',
  objectPosition = 'top',
  objectFit = 'cover',
  aspectRatio,
  loading = 'lazy',
  decoding = 'async',
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  fetchPriority = 'auto'
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Extract custom fit and position classes from className if passed by callers
  const customFitMatch = className.match(/\bobject-(cover|contain|fill|scale-down|none)\b/);
  const customPosMatch = className.match(/\bobject-(top|center|bottom|left|right)\b/);

  const effectiveFit = customFitMatch
    ? customFitMatch[0]
    : objectFit
    ? `object-${objectFit}`
    : 'object-cover';

  const effectivePos = customPosMatch
    ? customPosMatch[0]
    : objectPosition === 'top'
    ? 'object-top'
    : objectPosition === 'center'
    ? 'object-center'
    : objectPosition === 'bottom'
    ? 'object-bottom'
    : `object-[${objectPosition}]`;

  // Clean wrapper className of object-* styles so they do not redundantly sit on the container div
  const wrapperClass = className
    .replace(/\bobject-(cover|contain|fill|scale-down|none)\b/g, '')
    .replace(/\bobject-(top|center|bottom|left|right)\b/g, '')
    .trim();

  if (hasError) {
    return (
      <div
        className={`bg-[#121826] flex flex-col items-center justify-center text-center p-6 border border-[#D4AF37]/20 relative overflow-hidden [contain:paint] ${wrapperClass}`}
        style={{
          ...(aspectRatio ? { aspectRatio } : {}),
          contain: 'paint'
        }}
      >
        <div className="w-10 h-10 rounded-sm border border-[#D4AF37]/40 flex items-center justify-center mb-2.5 bg-[#0C1322] text-[#D4AF37]">
          <Award className="w-5 h-5" />
        </div>
        <p className="font-display text-[#FAF7F0] text-xs sm:text-sm tracking-wider font-semibold uppercase line-clamp-2">{alt}</p>
        <span className="text-[#D4AF37] text-[11px] mt-1 font-sans">
          Forever Star India
        </span>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden ${wrapperClass.includes('bg-') ? '' : 'bg-[#EDE8DC]'} [contain:paint] ${wrapperClass}`}
      style={{
        ...(aspectRatio ? { aspectRatio } : {}),
        contain: 'paint'
      }}
    >
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding={decoding}
        sizes={sizes}
        fetchPriority={fetchPriority}
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full ${effectiveFit} ${effectivePos} transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${imgClassName}`}
      />
    </div>
  );
};
