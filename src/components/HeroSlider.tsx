import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FSIAImage } from './FSIAImage';

export interface HeroSlide {
  id: string;
  image: string;
  title: string;
  venue: string;
  badge: string;
  categoryTag: string;
  alt: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    image: 'https://www.fsia.in/uploads/Forever-Star-India-Pageant.webp',
    title: 'Forever Star India Pageant 2026',
    venue: 'Zee Studio Arena • Jaipur, Rajasthan',
    badge: 'Season 2026',
    categoryTag: 'Grand Coronation Stage',
    alt: 'Forever Star India National Crowning Ceremony at Zee Studio Jaipur'
  },
  {
    id: 'slide-2',
    image: 'https://www.fsia.in/static/media/ee4544.6a2d3bd6bf0b169df07e.webp',
    title: 'Grand Coronation Stage Architecture',
    venue: 'Zee Studio Production Set • Jaipur',
    badge: 'Stage Architecture',
    categoryTag: 'National Finale Arena',
    alt: 'Grand Coronation Stage Architecture at Zee Studio Jaipur'
  },
  {
    id: 'slide-3',
    image: 'https://www.fsia.in/uploads/Forever-Star-India-award-season-8.webp',
    title: 'National Honors & Achievers Felicitation',
    venue: 'Televised National Ceremony • Season 8',
    badge: 'Season 8 Awards',
    categoryTag: 'Class 41 Honours',
    alt: 'Forever Star India National Awards Season 8 Felicitation'
  },
  {
    id: 'slide-4',
    image: 'https://www.fsia.in/static/media/exclusive1.webp',
    title: 'Exclusive Runway Walk & Designer Couture',
    venue: 'Zee Studio Runway • Jaipur',
    badge: 'Live Telecast',
    categoryTag: 'Runway Masterclass',
    alt: 'Exclusive Runway Walk Moments at Forever Star India Pageant'
  },
  {
    id: 'slide-5',
    image: 'https://www.fsia.in/static/media/grand-finale-setup1.webp',
    title: 'State-of-the-Art Production & Lighting',
    venue: 'Nationwide Telecast & Media Coverage',
    badge: 'Zee Studio Broadcast',
    categoryTag: 'Production Excellence',
    alt: 'State-of-the-Art Stage Lighting and Production at Zee Studio'
  }
];

export const HeroSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const totalSlides = HERO_SLIDES.length;

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  }, [totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-play interval with pause on hover
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      handleNext();
    }, 4500);

    return () => clearInterval(timer);
  }, [isHovered, handleNext]);

  // Touch Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return;
    const distance = touchStartX - touchEndX;
    const minSwipeDistance = 45;
    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      handleNext();
    } else if (e.key === 'ArrowLeft') {
      handlePrev();
    }
  };

  const currentSlide = HERO_SLIDES[currentIndex];

  return (
    <div
      id="hero-image-slider"
      className="relative border border-[#D4AF37]/50 bg-white p-2 shadow-md select-none group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Forever Star India Stage and Crowning Moments Slideshow"
    >
      {/* Visual Slider Frame */}
      <div className="relative overflow-hidden bg-neutral-900 h-72 sm:h-96 md:h-[440px] lg:h-[490px]">
        {/* Render stacked slides with smooth opacity crossfade */}
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
              }`}
              aria-hidden={!isActive}
            >
              <FSIAImage
                src={slide.image}
                alt={slide.alt}
                className="w-full h-full"
                objectPosition="top"
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
                fetchPriority={index === 0 ? 'high' : 'auto'}
                sizes="(max-width: 1024px) 100vw, 520px"
              />
              {/* Subtle gradient overlay for readability and depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C1322]/85 via-[#0C1322]/20 to-transparent pointer-events-none" />
            </div>
          );
        })}

        {/* Floating Top Header Badges */}
        <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#0C1322]/80 backdrop-blur-xs text-[#EADBAC] border border-[#D4AF37]/50 text-[10px] font-sans font-bold tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
            {currentSlide.categoryTag}
          </span>

          <span className="text-[11px] font-mono font-bold text-[#EADBAC] px-2 py-0.5 bg-[#0C1322]/80 border border-[#D4AF37]/40 backdrop-blur-xs">
            {String(currentIndex + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
          </span>
        </div>

        {/* Left Arrow Button */}
        <button
          type="button"
          onClick={handlePrev}
          id="hero-slider-prev-btn"
          aria-label="Previous Slide"
          className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-[#0C1322]/80 hover:bg-[#0C1322] text-[#EADBAC] hover:text-white border border-[#D4AF37]/60 shadow-md backdrop-blur-xs transition-all active:scale-95 cursor-pointer opacity-90 sm:opacity-75 group-hover:opacity-100"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Right Arrow Button */}
        <button
          type="button"
          onClick={handleNext}
          id="hero-slider-next-btn"
          aria-label="Next Slide"
          className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-[#0C1322]/80 hover:bg-[#0C1322] text-[#EADBAC] hover:text-white border border-[#D4AF37]/60 shadow-md backdrop-blur-xs transition-all active:scale-95 cursor-pointer opacity-90 sm:opacity-75 group-hover:opacity-100"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Interactive Slide Indicator Dots */}
        <div className="absolute bottom-3 left-0 right-0 z-20 flex items-center justify-center gap-1.5 pointer-events-auto">
          {HERO_SLIDES.map((slide, idx) => {
            const isDotActive = idx === currentIndex;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => goToSlide(idx)}
                id={`hero-slider-dot-${idx}`}
                aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
                className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                  isDotActive
                    ? 'w-7 bg-[#D4AF37] shadow-xs'
                    : 'w-2 bg-white/50 hover:bg-white/90'
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Caption Bar Below Image with Smooth Content Synchronization */}
      <div className="mt-2.5 p-3 bg-[#FAF8F2] border border-[#EADBAC] flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <span className="text-[10px] font-sans tracking-widest text-[#7E591B] font-bold uppercase block truncate">
            {currentSlide.title}
          </span>
          <p className="text-xs sm:text-sm font-display font-bold text-[#0C1322] mt-0.5 truncate">
            {currentSlide.venue}
          </p>
        </div>

        <span className="text-[11px] font-sans font-bold text-[#7E591B] px-2.5 py-1 bg-white border border-[#D4AF37]/50 uppercase tracking-wider shrink-0 whitespace-nowrap shadow-2xs">
          {currentSlide.badge}
        </span>
      </div>
    </div>
  );
};
