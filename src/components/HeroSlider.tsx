import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Clock,
  Calendar,
  ExternalLink,
  Settings,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { FSIAImage } from './FSIAImage';
import { SliderTimerOptionsModal, SlideTimerConfig } from './SliderTimerOptionsModal';

export const DEFAULT_HERO_SLIDES: SlideTimerConfig[] = [
  {
    id: 'slide-1',
    image: 'https://www.fsia.in/uploads/Forever-Star-India-Pageant.webp',
    title: 'Forever Star India National Pageant 2026',
    categoryTag: 'Auditions Open • Season 2026',
    venue: 'Zee Studio Arena • Jaipur, Rajasthan',
    subtitle: 'Grassroots auditions across 4,000+ Indian cities for Miss, Mrs & Teen India titles. 1 crowned city winner from every represented city with live televised coronation at Zee Studio Jaipur.',
    badge: 'Auditions 2026',
    alt: 'Forever Star India National Pageant 2026 Auditions at Zee Studio Jaipur',
    ctaText: 'Quick Apply 2026',
    ctaUrl: 'https://www.fsia.in/quickapply',
    fitMode: 'contain',
    startDate: '2026-08-01T00:00',
    endDate: '2026-11-30T23:59',
    timerDuration: 6,
    showCountdown: true
  },
  {
    id: 'slide-2',
    image: 'https://www.fsia.in/uploads/Forever-Star-India-award-season-8.webp',
    title: 'Forever Star India Awards 2026 (Season 8)',
    categoryTag: 'Class 41 Honours • Nominations Open',
    venue: 'Televised National Honors Arena • Zee Studio Jaipur',
    subtitle: "Honouring today's achievers and tomorrow's icons across business, arts, healthcare, education & innovation. Bestowed under Government of India Class 41 registered trademark.",
    badge: 'Season 8 Awards',
    alt: 'Forever Star India National Awards Season 8 Felicitation and Nominations',
    ctaText: 'Submit Nomination',
    ctaUrl: 'https://www.fsia.in/super-woman-award.php',
    fitMode: 'contain',
    startDate: '2026-08-15T00:00',
    endDate: '2026-10-31T23:59',
    timerDuration: 7,
    showCountdown: true
  },
  {
    id: 'slide-3',
    image: 'https://www.fsia.in/static/media/ee4544.6a2d3bd6bf0b169df07e.webp',
    title: 'Grand Coronation Stage & Lighting Architecture',
    categoryTag: 'National Finale Arena',
    venue: 'Zee Studio Production Set • Jaipur, Rajasthan',
    subtitle: 'State-of-the-art stage architecture engineered with multi-camera live broadcast facilities, LED matrix wall, and robotic lighting for the national crowning ceremony.',
    badge: 'Stage Architecture',
    alt: 'Grand Coronation Stage Architecture at Zee Studio Jaipur',
    ctaText: 'Explore Stage Gallery',
    ctaUrl: 'https://www.fsia.in/gallery',
    fitMode: 'cover',
    startDate: '2026-09-01T00:00',
    endDate: '2026-12-25T23:59',
    timerDuration: 5,
    showCountdown: true
  },
  {
    id: 'slide-4',
    image: 'https://www.fsia.in/static/media/exclusive1.webp',
    title: 'Exclusive Runway Walk & Designer Couture Showcase',
    categoryTag: 'Runway Masterclass',
    venue: 'Zee Studio Catwalk • Jaipur',
    subtitle: 'National finalists undergo rigorous ramp-walk training, posture choreography, poise development, and portfolio grooming under celebrity mentors.',
    badge: 'Live Telecast',
    alt: 'Exclusive Runway Walk Moments at Forever Star India Pageant',
    ctaText: 'Pageant Details',
    ctaUrl: 'https://www.fsia.in/forever-miss-india-new.php',
    fitMode: 'cover',
    startDate: '2026-09-10T00:00',
    endDate: '2026-12-15T23:59',
    timerDuration: 5,
    showCountdown: false
  },
  {
    id: 'slide-5',
    image: 'https://www.fsia.in/static/media/grand-finale-setup1.webp',
    title: 'Multi-Camera Broadcast Setup & Grand Auditorium',
    categoryTag: 'Production Excellence',
    venue: 'Nationwide Telecast & Media Coverage',
    subtitle: 'Pan-India broadcast production delivering seamless high-definition streaming and televised coverage reaching millions of viewers across India.',
    badge: 'Zee Studio Broadcast',
    alt: 'State-of-the-Art Stage Lighting and Production at Zee Studio',
    ctaText: 'View Media Archive',
    ctaUrl: 'https://www.fsia.in/gallery',
    fitMode: 'cover',
    startDate: '2026-09-01T00:00',
    endDate: '2026-12-30T23:59',
    timerDuration: 5,
    showCountdown: false
  }
];

const STORAGE_KEY = 'fsia_hero_slider_settings_v3';

export const HeroSlider: React.FC = () => {
  // Load initial slides from localStorage or fallback to defaults
  const [slides, setSlides] = useState<SlideTimerConfig[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((s: SlideTimerConfig, i: number) => {
            const defaultSlide = DEFAULT_HERO_SLIDES[i] || DEFAULT_HERO_SLIDES[0];
            return {
              ...defaultSlide,
              ...s,
              ctaUrl: s.ctaUrl || defaultSlide.ctaUrl || 'https://www.fsia.in/quickapply',
              ctaText: s.ctaText || defaultSlide.ctaText || 'Quick Apply'
            };
          });
        }
      }
    } catch {
      // Fallback
    }
    return DEFAULT_HERO_SLIDES;
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlayActive, setIsAutoPlayActive] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false);

  // Real-time ticking clock timestamp for live countdowns
  const [nowTime, setNowTime] = useState<number>(() => Date.now());

  // Touch Swipe coordinates
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const totalSlides = slides.length;
  const currentSlide = slides[currentIndex] || slides[0];

  // Keep live time ticking every second
  useEffect(() => {
    const clockInterval = setInterval(() => {
      setNowTime(Date.now());
    }, 1000);
    return () => clearInterval(clockInterval);
  }, []);

  const handleNext = useCallback(() => {
    setProgressPercent(0);
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const handlePrev = useCallback(() => {
    setProgressPercent(0);
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  }, [totalSlides]);

  const goToSlide = (index: number) => {
    setProgressPercent(0);
    setCurrentIndex(index);
  };

  // Toggle image fit mode (contain vs cover) on the active slide
  const toggleActiveFitMode = () => {
    const updated = slides.map((s, idx) =>
      idx === currentIndex
        ? { ...s, fitMode: s.fitMode === 'contain' ? ('cover' as const) : ('contain' as const) }
        : s
    );
    setSlides(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  // Slide display progress timer
  const animFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isAutoPlayActive || isHovered) {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      return;
    }

    const durationMs = Math.max(3, currentSlide.timerDuration || 5) * 1000;
    let startTimestamp = performance.now() - (progressPercent / 100) * durationMs;
    startTimeRef.current = startTimestamp;

    const step = (now: number) => {
      const elapsed = now - startTimestamp;
      const pct = Math.min(100, (elapsed / durationMs) * 100);
      setProgressPercent(pct);

      if (pct >= 100) {
        handleNext();
      } else {
        animFrameRef.current = requestAnimationFrame(step);
      }
    };

    animFrameRef.current = requestAnimationFrame(step);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isAutoPlayActive, isHovered, currentIndex, currentSlide.timerDuration, handleNext, progressPercent]);

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
    } else if (e.key === ' ') {
      e.preventDefault();
      setIsAutoPlayActive((prev) => !prev);
    }
  };

  // Helper to calculate live countdown status
  const getTimelineDetails = (startDateStr: string, endDateStr: string) => {
    const start = new Date(startDateStr).getTime();
    const end = new Date(endDateStr).getTime();

    if (isNaN(start) || isNaN(end)) {
      return {
        status: 'unknown' as const,
        label: 'Active Timeline',
        countdownText: 'Timeline in Progress',
        isUrgent: false
      };
    }

    if (nowTime < start) {
      const diff = Math.max(0, start - nowTime);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      return {
        status: 'upcoming' as const,
        label: 'Auditions Open In',
        countdownText: `${days}d ${hours}h ${minutes}m ${seconds}s`,
        isUrgent: false
      };
    }

    if (nowTime > end) {
      return {
        status: 'ended' as const,
        label: 'Auditions Closed',
        countdownText: 'Official Schedule Concluded',
        isUrgent: false
      };
    }

    const diff = Math.max(0, end - nowTime);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    const isUrgent = days <= 15;

    return {
      status: 'active' as const,
      label: 'Nominations & Auditions Close In',
      countdownText: `${days}d ${hours}h ${minutes}m ${seconds}s`,
      isUrgent
    };
  };

  const timeline = getTimelineDetails(currentSlide.startDate, currentSlide.endDate);

  // Format date range nicely
  const formatDateRange = (startStr: string, endStr: string) => {
    try {
      const d1 = new Date(startStr);
      const d2 = new Date(endStr);
      const opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
      return `${d1.toLocaleDateString('en-US', opts)} — ${d2.toLocaleDateString('en-US', opts)}`;
    } catch {
      return 'Official 2026 Schedule';
    }
  };

  // Save updated slides from options modal
  const handleSaveOptions = (updatedSlides: SlideTimerConfig[]) => {
    setSlides(updatedSlides);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSlides));
    } catch {
      // Ignore
    }
  };

  // Reset to default slides
  const handleResetOptions = () => {
    setSlides(DEFAULT_HERO_SLIDES);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  return (
    <div
      id="hero-slider-container"
      className="relative w-full border border-[#D4AF37]/60 bg-white p-2 sm:p-2.5 shadow-xl select-none group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Forever Star India Stage Announcements and Crowning Moments Slider"
    >
      {/* TOP CONTROLS & ANNOUNCEMENT HEADER STRIP */}
      <div className="mb-2 px-2 py-1.5 bg-[#0C1322] border border-[#D4AF37]/40 flex items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse shrink-0" />
          <span className="text-[10px] sm:text-[11px] font-sans font-bold tracking-widest text-[#EADBAC] uppercase truncate">
            {currentSlide.categoryTag}
          </span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Fit Toggle Button */}
          <button
            type="button"
            onClick={toggleActiveFitMode}
            title={
              currentSlide.fitMode === 'contain'
                ? 'Switch to Cover (Fill Container)'
                : 'Switch to Contain (Show Full Poster Without Cropping)'
            }
            className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#1A253E] hover:bg-[#243356] text-[#EADBAC] border border-[#D4AF37]/40 text-[10px] font-sans font-semibold rounded-xs transition-colors cursor-pointer"
          >
            {currentSlide.fitMode === 'contain' ? (
              <>
                <Minimize2 className="w-3 h-3 text-[#D4AF37]" />
                <span className="hidden sm:inline">Uncropped (Full)</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3 h-3 text-[#D4AF37]" />
                <span className="hidden sm:inline">Fill</span>
              </>
            )}
          </button>

          {/* Auto-Play Pause/Resume Button */}
          <button
            type="button"
            onClick={() => setIsAutoPlayActive((prev) => !prev)}
            title={isAutoPlayActive ? 'Pause Slide Timer' : 'Resume Slide Timer'}
            className="p-1 bg-[#1A253E] hover:bg-[#243356] text-[#EADBAC] border border-[#D4AF37]/40 rounded-xs transition-colors cursor-pointer"
            aria-label={isAutoPlayActive ? 'Pause slide timer' : 'Resume slide timer'}
          >
            {isAutoPlayActive ? (
              <Pause className="w-3 h-3 text-[#D4AF37]" />
            ) : (
              <Play className="w-3 h-3 text-[#D4AF37]" />
            )}
          </button>

          {/* Schedule & Timer Options Modal Trigger */}
          <button
            type="button"
            onClick={() => setIsOptionsModalOpen(true)}
            id="hero-slider-timer-options-btn"
            title="Configure Start & End Timers for Every Slide"
            className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#B8860B] hover:bg-[#996515] text-[#0C1322] hover:text-white font-bold text-[10px] rounded-xs transition-colors cursor-pointer shadow-xs"
          >
            <Settings className="w-3 h-3" />
            <span className="hidden xs:inline sm:inline">Timer Options</span>
          </button>

          {/* Slide Counter */}
          <span className="text-[11px] font-mono font-bold text-[#EADBAC] px-1.5 py-0.5 bg-[#0C1322] border border-[#D4AF37]/30">
            {String(currentIndex + 1).padStart(2, '0')}/{String(totalSlides).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* VISUAL SLIDER STAGE (Fixed for Mobile & PC with Ambient Lighting Backdrop) */}
      <div className="relative overflow-hidden bg-[#0B1220] min-h-[380px] h-[380px] sm:min-h-[440px] sm:h-[440px] md:h-[480px] lg:h-[500px] w-full flex items-center justify-center border border-[#D4AF37]/20">
        
        {/* Render stacked slides with smooth opacity crossfade - clicking redirects to slide URL */}
        {slides.map((slide, index) => {
          const isActive = index === currentIndex;
          const redirectUrl = slide.ctaUrl || 'https://www.fsia.in/quickapply';
          return (
            <a
              key={slide.id}
              href={redirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              title={`Click to open: ${slide.title} (${slide.ctaText})`}
              aria-label={`Open announcement: ${slide.title}`}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out flex items-center justify-center cursor-pointer group/slide ${
                isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
              }`}
              aria-hidden={!isActive}
            >
              {/* Layer 1: Ambient Blurred Backdrop so letterbox margins blend beautifully with the image colors */}
              <img
                src={slide.image}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-25 scale-110 pointer-events-none"
              />

              {/* Layer 2: Main Crisp Image (Uses 'contain' for posters so text is 100% visible on both mobile and PC!) */}
              <div className="relative z-10 w-full h-full flex items-center justify-center p-1 sm:p-2">
                <FSIAImage
                  src={slide.image}
                  alt={slide.alt || slide.title}
                  className="w-full h-full bg-transparent flex items-center justify-center"
                  objectFit={slide.fitMode}
                  objectPosition="center"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  fetchPriority={index === 0 ? 'high' : 'auto'}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 700px, 600px"
                />
              </div>

              {/* Layer 3: Floating Hover Redirect Pill (Appears on hover to signal interactive link) */}
              <div className="absolute bottom-4 right-4 z-25 opacity-0 group-hover/slide:opacity-100 transition-all duration-200 pointer-events-none hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-[#0C1322]/90 border border-[#D4AF37] text-[#EADBAC] text-[11px] font-bold tracking-wider uppercase backdrop-blur-md shadow-xl translate-y-1 group-hover/slide:translate-y-0">
                <span>{slide.ctaText || 'Open Official Page'}</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
              </div>

              {/* Layer 4: Subtle Vignette at top & bottom for contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C1322]/80 via-transparent to-[#0C1322]/40 pointer-events-none z-20" />
            </a>
          );
        })}

        {/* Live Countdown Ribbon on Slide (if enabled) */}
        {currentSlide.showCountdown && (
          <div className="absolute top-3 left-3 z-30 pointer-events-none max-w-[85%] sm:max-w-none">
            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] sm:text-xs font-mono font-bold tracking-wide border shadow-md backdrop-blur-md ${
              timeline.isUrgent
                ? 'bg-rose-950/90 text-amber-200 border-rose-500/80 animate-pulse'
                : 'bg-[#0C1322]/90 text-[#EADBAC] border-[#D4AF37]/60'
            }`}>
              <Clock className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
              <span className="text-[#FAF7F0] font-sans font-medium text-[9px] sm:text-[10px] uppercase">
                {timeline.label}:
              </span>
              <span className="font-bold text-[#EADBAC]">{timeline.countdownText}</span>
            </div>
          </div>
        )}

        {/* Left Arrow Button */}
        <button
          type="button"
          onClick={handlePrev}
          id="hero-slider-prev-btn"
          aria-label="Previous Slide"
          className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center bg-[#0C1322]/85 hover:bg-[#0C1322] text-[#EADBAC] hover:text-white border border-[#D4AF37]/60 shadow-lg backdrop-blur-xs transition-all active:scale-95 cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Right Arrow Button */}
        <button
          type="button"
          onClick={handleNext}
          id="hero-slider-next-btn"
          aria-label="Next Slide"
          className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center bg-[#0C1322]/85 hover:bg-[#0C1322] text-[#EADBAC] hover:text-white border border-[#D4AF37]/60 shadow-lg backdrop-blur-xs transition-all active:scale-95 cursor-pointer"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Slide Indicator Dots */}
        <div className="absolute bottom-3 left-0 right-0 z-30 flex items-center justify-center gap-1.5 pointer-events-auto">
          {slides.map((slide, idx) => {
            const isDotActive = idx === currentIndex;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => goToSlide(idx)}
                id={`hero-slider-dot-${idx}`}
                aria-label={`Jump to announcement ${idx + 1}: ${slide.title}`}
                className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                  isDotActive
                    ? 'w-7 sm:w-9 bg-[#D4AF37] shadow-sm'
                    : 'w-2 bg-white/50 hover:bg-white/90'
                }`}
              />
            );
          })}
        </div>

        {/* Start-to-End Slide Duration Progress Bar (Visual Timer) */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#1A253E] z-30 pointer-events-none">
          <div
            className="h-full bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#FAF7F0] transition-[width] ease-linear"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* COMPREHENSIVE ANNOUNCEMENT BOX (NO TRUNCATION, ADAPTS TO MOBILE & PC) */}
      <div className="mt-2.5 p-3.5 sm:p-4 bg-[#FAF8F2] border border-[#EADBAC] space-y-2.5">
        
        {/* Row 1: Category, Schedule Dates & Badge */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#EADBAC]/60">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-sans font-bold tracking-widest text-[#7E591B] uppercase bg-white px-2 py-0.5 border border-[#D4AF37]/40 shadow-2xs">
              {currentSlide.badge}
            </span>

            <span className="text-[11px] text-[#526077] font-sans flex items-center gap-1">
              <Calendar className="w-3 h-3 text-[#B8860B]" />
              <span>{formatDateRange(currentSlide.startDate, currentSlide.endDate)}</span>
            </span>
          </div>

          <span className={`text-[10px] font-sans font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs border ${
            timeline.status === 'active'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
              : timeline.status === 'upcoming'
              ? 'bg-amber-50 text-amber-800 border-amber-300'
              : 'bg-neutral-100 text-neutral-700 border-neutral-300'
          }`}>
            {timeline.status === 'active' ? '● Active Schedule' : timeline.status === 'upcoming' ? '● Upcoming' : '● Concluded'}
          </span>
        </div>

        {/* Row 2: Full Non-Truncated Headline as Clickable Link */}
        <h3 className="text-base sm:text-lg font-display font-bold text-[#0C1322] leading-snug break-words">
          <a
            href={currentSlide.ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            title={`Redirect to ${currentSlide.ctaUrl}`}
            className="hover:text-[#B8860B] transition-colors inline-flex items-center gap-1.5 group/title"
          >
            <span>{currentSlide.title}</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#B8860B] inline opacity-70 group-hover/title:opacity-100 shrink-0" />
          </a>
        </h3>

        {/* Row 3: Full Non-Truncated Subtitle & Venue Details */}
        <p className="text-xs sm:text-sm text-[#475569] font-sans leading-relaxed break-words">
          {currentSlide.subtitle}
        </p>

        {/* Row 4: Venue Info Strip & Redirect URL Display */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#526077] font-sans pt-1 border-t border-[#EADBAC]/40">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-[#0C1322]">Official Arena:</span>
            <span>{currentSlide.venue}</span>
          </div>

          <div className="flex items-center gap-1 text-[#7E591B] bg-white px-2 py-0.5 border border-[#D4AF37]/30 rounded-xs">
            <span className="text-[#526077]">Redirect URL:</span>
            <a
              href={currentSlide.ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#B8860B] hover:underline font-mono font-semibold flex items-center gap-1 max-w-[200px] sm:max-w-[280px] truncate"
            >
              <span className="truncate">{currentSlide.ctaUrl}</span>
              <ExternalLink className="w-2.5 h-2.5 shrink-0" />
            </a>
          </div>
        </div>

        {/* Row 5: Action Button & Timer Configuration Button */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <a
              href={currentSlide.ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0C1322] hover:bg-[#1A253E] text-[#EADBAC] hover:text-white text-xs font-bold tracking-wider uppercase border border-[#D4AF37]/60 shadow-xs transition-colors cursor-pointer"
            >
              <span>{currentSlide.ctaText}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <span className="text-[11px] text-[#526077] font-sans hidden sm:inline">
              Slide Timer: <strong>{currentSlide.timerDuration}s</strong>
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsOptionsModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#7E591B] hover:text-[#0C1322] bg-white hover:bg-[#F6F2E8] border border-[#D4AF37]/50 rounded-xs transition-colors cursor-pointer shadow-2xs"
          >
            <Clock className="w-3.5 h-3.5 text-[#B8860B]" />
            <span>Edit Start / End Timer</span>
          </button>
        </div>

      </div>

      {/* START & END TIMER / SCHEDULE OPTIONS MODAL */}
      <SliderTimerOptionsModal
        isOpen={isOptionsModalOpen}
        onClose={() => setIsOptionsModalOpen(false)}
        slides={slides}
        onSave={handleSaveOptions}
        onReset={handleResetOptions}
        isAutoPlayActive={isAutoPlayActive}
        onToggleAutoPlay={() => setIsAutoPlayActive((prev) => !prev)}
      />

    </div>
  );
};
