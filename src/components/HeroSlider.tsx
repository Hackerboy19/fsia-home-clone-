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
  Minimize2,
  Image as ImageIcon,
  Plus,
  Smartphone,
  Monitor,
  ZoomIn,
  ZoomOut,
  X,
  Sparkles
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

const STORAGE_KEY = 'fsia_hero_slider_settings_v4';

export const HeroSlider: React.FC = () => {
  // Load initial slides from localStorage or fallback to defaults
  const [slides, setSlides] = useState<SlideTimerConfig[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Fallback
    }
    return DEFAULT_HERO_SLIDES;
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isAutoPlayActive, setIsAutoPlayActive] = useState(true);
  const [progressPercent, setProgressPercent] = useState(0);

  // Display size tracking hook (window resize listener with debounce)
  const [displayWidth, setDisplayWidth] = useState<number>(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    let timeoutId: number;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        setDisplayWidth(window.innerWidth);
      }, 50);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  const isMobileDisplay = displayWidth < 640;
  const isTabletDisplay = displayWidth >= 640 && displayWidth < 1024;

  // Schedule & Timer Options Modal State
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false);
  const [modalInitialSlideId, setModalInitialSlideId] = useState<string | undefined>(undefined);

  // Fullscreen / Zoom Lightbox state for examining fine flyer text on any display
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Touch Swipe coordinates
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const totalSlides = slides.length;
  const currentSlide = slides[currentIndex] || slides[0] || DEFAULT_HERO_SLIDES[0];

  // Helper to determine display-effective fit mode for each slide
  const getEffectiveFitMode = useCallback(
    (slide: SlideTimerConfig): 'contain' | 'cover' => {
      if (slide.fitMode === 'contain') return 'contain';
      if (slide.fitMode === 'cover') return 'cover';
      
      // If 'auto' (Display Adaptive):
      // Posters with text need 'contain' so crucial dates, cities, and URLs aren't cut off
      const isFlyer = /pageant|award|audition|poster|flyer|trophy|season\s*\d+/i.test(
        `${slide.title} ${slide.badge} ${slide.image}`
      );
      if (isFlyer) return 'contain';

      // Stage / catwalk landscape photos:
      // On mobile screens, 'contain' ensures stage edges aren't sliced, while on desktop 'cover' fills arena
      return isMobileDisplay ? 'contain' : 'cover';
    },
    [isMobileDisplay]
  );

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

  // Cycle image fit mode on the active slide: auto -> contain -> cover -> auto
  const cycleActiveFitMode = () => {
    const updated = slides.map((s, idx) => {
      if (idx !== currentIndex) return s;
      const currentFit = s.fitMode;
      const nextFit: 'contain' | 'cover' | 'auto' =
        currentFit === 'auto' ? 'contain' : currentFit === 'contain' ? 'cover' : 'auto';
      return { ...s, fitMode: nextFit };
    });
    setSlides(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  const handleOpenChangeImage = () => {
    setModalInitialSlideId(currentSlide.id);
    setIsOptionsModalOpen(true);
  };

  const handleOpenAddSlide = () => {
    const newIndex = slides.length + 1;
    const newSlide: SlideTimerConfig = {
      id: `slide-${Date.now()}`,
      image: 'https://www.fsia.in/uploads/Forever-Star-India-Pageant.webp',
      title: `Forever Star India Announcement ${newIndex}`,
      categoryTag: 'National Recognition',
      venue: 'Zee Studio Arena • Jaipur, Rajasthan',
      subtitle: 'Class 41 registered national beauty pageant and honors initiative across 4,000+ Indian cities.',
      badge: `Feature ${newIndex}`,
      alt: `Forever Star India Slide ${newIndex}`,
      ctaText: 'Quick Apply 2026',
      ctaUrl: 'https://www.fsia.in/quickapply',
      fitMode: 'auto',
      startDate: new Date().toISOString().slice(0, 16),
      endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
      timerDuration: 6,
      showCountdown: true
    };
    const updated = [...slides, newSlide];
    setSlides(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore
    }
    setCurrentIndex(updated.length - 1);
    setModalInitialSlideId(newSlide.id);
    setIsOptionsModalOpen(true);
  };

  // Slide display progress timer
  const animFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isAutoPlayActive || isHovered) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    const durationMs = Math.max(2, currentSlide.timerDuration || 5) * 1000;
    startTimeRef.current = null;

    const tick = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const pct = Math.min((elapsed / durationMs) * 100, 100);
      setProgressPercent(pct);

      if (elapsed < durationMs) {
        animFrameRef.current = requestAnimationFrame(tick);
      } else {
        handleNext();
      }
    };

    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [currentIndex, isAutoPlayActive, isHovered, currentSlide.timerDuration, handleNext]);

  // Preload adjacent slides for instantaneous transitions across any display size
  useEffect(() => {
    if (slides.length <= 1) return;
    const nextIdx = (currentIndex + 1) % slides.length;
    const prevIdx = (currentIndex - 1 + slides.length) % slides.length;
    [slides[nextIdx]?.image, slides[prevIdx]?.image].forEach((src) => {
      if (src && typeof window !== 'undefined') {
        const img = new Image();
        img.src = src;
      }
    });
  }, [currentIndex, slides]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    } else if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      setIsAutoPlayActive((prev) => !prev);
    }
  };

  // Touch Swipe handlers for mobile screens
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
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  const handleSaveOptions = (updatedSlides: SlideTimerConfig[]) => {
    setSlides(updatedSlides);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSlides));
    } catch {
      // Ignore
    }
    if (currentIndex >= updatedSlides.length) {
      setCurrentIndex(0);
    }
  };

  const handleResetOptions = () => {
    setSlides(DEFAULT_HERO_SLIDES);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
    setCurrentIndex(0);
  };

  // Calculate schedule state and countdown string
  const calculateTimeline = (startDateStr: string, endDateStr: string) => {
    const now = new Date().getTime();
    const start = new Date(startDateStr).getTime();
    const end = new Date(endDateStr).getTime();

    if (isNaN(start) || isNaN(end)) {
      return { status: 'active', label: 'Auditions Open', countdownText: 'Registrations Open', isUrgent: false };
    }

    if (now < start) {
      const diff = start - now;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      return {
        status: 'upcoming',
        label: 'Starts In',
        countdownText: `${days}d ${hours}h remaining`,
        isUrgent: false
      };
    } else if (now >= start && now <= end) {
      const diff = end - now;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const isUrgent = days <= 7;
      return {
        status: 'active',
        label: isUrgent ? 'CLOSING SOON' : 'Closes In',
        countdownText: `${days}d ${hours}h remaining`,
        isUrgent
      };
    } else {
      return {
        status: 'concluded',
        label: 'Registration Closed',
        countdownText: 'Auditions Concluded',
        isUrgent: false
      };
    }
  };

  const timeline = calculateTimeline(currentSlide.startDate, currentSlide.endDate);

  const formatDateRange = (startStr: string, endStr: string) => {
    try {
      const s = new Date(startStr);
      const e = new Date(endStr);
      if (isNaN(s.getTime()) || isNaN(e.getTime())) return 'Season 2026 Schedule';
      const sFormatted = s.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
      const eFormatted = e.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
      return `${sFormatted} – ${eFormatted}`;
    } catch {
      return 'Season 2026 Schedule';
    }
  };

  const activeEffectiveFit = getEffectiveFitMode(currentSlide);

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
      {/* TOP CONTROLS & DISPLAY-ADAPTIVE HEADER STRIP */}
      <div className="mb-2 px-2 py-1.5 bg-[#0C1322] border border-[#D4AF37]/40 flex items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse shrink-0" />
          <span className="text-[10px] sm:text-[11px] font-sans font-bold tracking-widest text-[#EADBAC] uppercase truncate">
            {currentSlide.categoryTag}
          </span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Display Mode & Fit Mode Toggle */}
          <button
            type="button"
            onClick={cycleActiveFitMode}
            title={`Current: ${
              currentSlide.fitMode === 'auto'
                ? 'Auto-Adaptive (Screen Aware)'
                : currentSlide.fitMode === 'contain'
                ? 'Uncropped Poster (Contain)'
                : 'Fill Stage (Cover)'
            }. Click to cycle mode.`}
            className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#1A253E] hover:bg-[#243356] text-[#EADBAC] border border-[#D4AF37]/40 text-[10px] font-sans font-semibold rounded-xs transition-colors cursor-pointer"
          >
            {currentSlide.fitMode === 'auto' ? (
              <>
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                <span>Auto-Fit</span>
              </>
            ) : currentSlide.fitMode === 'contain' ? (
              <>
                <Minimize2 className="w-3 h-3 text-[#D4AF37]" />
                <span className="hidden sm:inline">Uncropped</span>
                <span className="sm:hidden">Full</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3 h-3 text-[#D4AF37]" />
                <span>Fill</span>
              </>
            )}
          </button>

          {/* Fullscreen / Zoom Lightbox Button */}
          <button
            type="button"
            onClick={() => {
              setZoomLevel(1);
              setIsZoomModalOpen(true);
            }}
            title="Inspect full image in high-resolution zoom mode"
            className="p-1 bg-[#1A253E] hover:bg-[#243356] text-[#EADBAC] border border-[#D4AF37]/40 rounded-xs transition-colors cursor-pointer"
            aria-label="Inspect full image"
          >
            <ZoomIn className="w-3 h-3 text-[#D4AF37]" />
          </button>

          {/* Update Image Shortcut Button */}
          <button
            type="button"
            onClick={handleOpenChangeImage}
            title="Update current slider image or choose from library"
            className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#1A253E] hover:bg-[#243356] text-[#EADBAC] border border-[#D4AF37]/40 text-[10px] font-sans font-semibold rounded-xs transition-colors cursor-pointer"
          >
            <ImageIcon className="w-3 h-3 text-[#D4AF37]" />
            <span className="hidden xs:inline sm:inline">Update</span>
          </button>

          {/* Add Slide Shortcut Button */}
          <button
            type="button"
            onClick={handleOpenAddSlide}
            title="Add a new image/slide to the slider"
            className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#B8860B] hover:bg-[#996515] text-[#0C1322] hover:text-white font-bold text-[10px] rounded-xs transition-colors cursor-pointer shadow-xs"
          >
            <Plus className="w-3 h-3" />
            <span className="hidden xs:inline">+ Add</span>
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
            onClick={() => {
              setModalInitialSlideId(currentSlide.id);
              setIsOptionsModalOpen(true);
            }}
            id="hero-slider-timer-options-btn"
            title="Configure Start & End Timers for Every Slide"
            className="p-1 sm:px-2 sm:py-0.5 bg-[#1A253E] hover:bg-[#243356] text-[#EADBAC] border border-[#D4AF37]/40 font-bold text-[10px] rounded-xs transition-colors cursor-pointer shadow-xs inline-flex items-center gap-1"
          >
            <Settings className="w-3 h-3 text-[#D4AF37]" />
            <span className="hidden md:inline">Options</span>
          </button>

          {/* Slide Counter */}
          <span className="text-[11px] font-mono font-bold text-[#EADBAC] px-1.5 py-0.5 bg-[#0C1322] border border-[#D4AF37]/30">
            {String(currentIndex + 1).padStart(2, '0')}/{String(totalSlides).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* VISUAL SLIDER STAGE (Dynamically Sized per Display: Mobile, Tablet, Desktop) */}
      <div
        className="relative overflow-hidden bg-[#0B1220] w-full flex items-center justify-center border border-[#D4AF37]/20 transition-[height] duration-300 h-[290px] xs:h-[340px] sm:h-[400px] md:h-[460px] lg:h-[490px] xl:h-[520px]"
      >
        {/* Render stacked slides with smooth opacity crossfade */}
        {slides.map((slide, index) => {
          const isActive = index === currentIndex;
          const redirectUrl = slide.ctaUrl || 'https://www.fsia.in/quickapply';
          const slideEffectiveFit = getEffectiveFitMode(slide);

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out flex items-center justify-center ${
                isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
              }`}
              aria-hidden={!isActive}
            >
              {/* Layer 1: Ambient Blurred Backdrop (Scaled per display size for cinematic lighting without text blur interference) */}
              <img
                src={slide.image}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover blur-xl sm:blur-2xl opacity-20 sm:opacity-25 scale-105 pointer-events-none select-none"
              />

              {/* Layer 2: Main Crisp Image Adjusted to Display Size */}
              <a
                href={redirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                title={`Click to open: ${slide.title} (${slide.ctaText})`}
                aria-label={`Open announcement: ${slide.title}`}
                className="relative z-10 w-full h-full flex items-center justify-center p-0.5 sm:p-1.5 md:p-2.5 cursor-pointer group/slide"
              >
                <FSIAImage
                  src={slide.image}
                  alt={slide.alt || slide.title}
                  className="w-full h-full bg-transparent flex items-center justify-center max-h-full max-w-full"
                  imgClassName="max-h-full max-w-full drop-shadow-md select-none"
                  objectFit={slideEffectiveFit}
                  objectPosition="center"
                  loading={isActive ? 'eager' : 'lazy'}
                  decoding="async"
                  fetchPriority={isActive ? 'high' : 'auto'}
                  sizes="(max-width: 480px) 100vw, (max-width: 640px) 96vw, (max-width: 1024px) 85vw, (max-width: 1440px) 46vw, 620px"
                />

                {/* Layer 3: Floating Hover Redirect Pill (Desktop) */}
                <div className="absolute bottom-4 right-4 z-25 opacity-0 group-hover/slide:opacity-100 transition-all duration-200 pointer-events-none hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-[#0C1322]/90 border border-[#D4AF37] text-[#EADBAC] text-[11px] font-bold tracking-wider uppercase backdrop-blur-md shadow-xl translate-y-1 group-hover/slide:translate-y-0">
                  <span>{slide.ctaText || 'Open Official Page'}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
                </div>
              </a>

              {/* Layer 4: Subtle Vignette for Contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C1322]/80 via-transparent to-[#0C1322]/30 pointer-events-none z-20" />
            </div>
          );
        })}

        {/* Live Countdown Ribbon on Slide (if enabled) */}
        {currentSlide.showCountdown && (
          <div className="absolute top-3 left-3 z-30 pointer-events-none max-w-[85%] sm:max-w-none">
            <div
              className={`inline-flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-xs font-mono font-bold tracking-wide border shadow-md backdrop-blur-md ${
                timeline.isUrgent
                  ? 'bg-rose-950/90 text-amber-200 border-rose-500/80 animate-pulse'
                  : 'bg-[#0C1322]/90 text-[#EADBAC] border-[#D4AF37]/60'
              }`}
            >
              <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#D4AF37] shrink-0" />
              <span className="text-[#FAF7F0] font-sans font-medium text-[8px] sm:text-[10px] uppercase">
                {timeline.label}:
              </span>
              <span className="font-bold text-[#EADBAC]">{timeline.countdownText}</span>
            </div>
          </div>
        )}

        {/* Display Size / Fit Mode Pill in top-right */}
        <div className="absolute top-3 right-3 z-30 pointer-events-none hidden xs:inline-flex">
          <span className="px-2 py-0.5 bg-[#0C1322]/80 border border-[#D4AF37]/50 text-[#EADBAC] text-[9px] font-mono tracking-wider backdrop-blur-xs uppercase">
            {isMobileDisplay ? '📱 Mobile View' : isTabletDisplay ? '📱 Tablet View' : '💻 Desktop View'} • {activeEffectiveFit}
          </span>
        </div>

        {/* Left Arrow Button */}
        <button
          type="button"
          onClick={handlePrev}
          id="hero-slider-prev-btn"
          aria-label="Previous Slide"
          className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-11 sm:h-11 flex items-center justify-center bg-[#0C1322]/85 hover:bg-[#0C1322] text-[#EADBAC] hover:text-white border border-[#D4AF37]/60 shadow-lg backdrop-blur-xs transition-all active:scale-95 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
        </button>

        {/* Right Arrow Button */}
        <button
          type="button"
          onClick={handleNext}
          id="hero-slider-next-btn"
          aria-label="Next Slide"
          className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-11 sm:h-11 flex items-center justify-center bg-[#0C1322]/85 hover:bg-[#0C1322] text-[#EADBAC] hover:text-white border border-[#D4AF37]/60 shadow-lg backdrop-blur-xs transition-all active:scale-95 cursor-pointer"
        >
          <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
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

          <span
            className={`text-[10px] font-sans font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs border ${
              timeline.status === 'active'
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : timeline.status === 'upcoming'
                ? 'bg-amber-50 text-amber-800 border-amber-300'
                : 'bg-neutral-100 text-neutral-700 border-neutral-300'
            }`}
          >
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
            <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover/title:opacity-100 text-[#B8860B] shrink-0" />
          </a>
        </h3>

        {/* Row 3: Official Venue with Zee Studio Details */}
        <p className="text-xs font-sans text-[#7E591B] font-semibold flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B] shrink-0" />
          <span>{currentSlide.venue}</span>
        </p>

        {/* Row 4: Full Non-Truncated Editorial Description */}
        <p className="text-xs sm:text-sm text-[#475569] font-sans leading-relaxed break-words">
          {currentSlide.subtitle}
        </p>

        {/* Row 5: Action Button & Image Management Bar */}
        <div className="pt-2 border-t border-[#EADBAC]/60 flex flex-wrap items-center justify-between gap-2.5">
          <a
            href={currentSlide.ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0C1322] hover:bg-[#1A253E] text-[#EADBAC] hover:text-white text-xs font-bold uppercase tracking-wider border border-[#D4AF37]/50 shadow-xs transition-colors shrink-0"
          >
            <span>{currentSlide.ctaText}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {/* Image & Slider Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setZoomLevel(1);
                setIsZoomModalOpen(true);
              }}
              title="Inspect flyer in full-screen zoom view"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-[#526077] hover:text-[#0C1322] bg-white hover:bg-[#F6F2E8] border border-neutral-300 rounded-xs transition-colors cursor-pointer shadow-2xs"
            >
              <ZoomIn className="w-3.5 h-3.5 text-[#B8860B]" />
              <span className="hidden sm:inline">Zoom</span>
            </button>

            <button
              type="button"
              onClick={handleOpenChangeImage}
              title="Update image, URL, or upload from device"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-[#7E591B] hover:text-[#0C1322] bg-white hover:bg-[#F6F2E8] border border-[#D4AF37]/50 rounded-xs transition-colors cursor-pointer shadow-2xs"
            >
              <ImageIcon className="w-3.5 h-3.5 text-[#B8860B]" />
              <span>Update Image</span>
            </button>

            <button
              type="button"
              onClick={handleOpenAddSlide}
              title="Add a new image/slide to the slider"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-[#0C1322] hover:text-white bg-[#EADBAC] hover:bg-[#0C1322] border border-[#D4AF37] rounded-xs transition-colors cursor-pointer shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5 text-[#B8860B]" />
              <span>+ Add Image</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setModalInitialSlideId(currentSlide.id);
                setIsOptionsModalOpen(true);
              }}
              title="Edit start/end dates, timers, and countdowns"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-[#526077] hover:text-[#0C1322] bg-white hover:bg-[#F6F2E8] border border-neutral-300 rounded-xs transition-colors cursor-pointer shadow-2xs"
            >
              <Clock className="w-3.5 h-3.5 text-[#B8860B]" />
              <span className="hidden sm:inline">Timers</span>
            </button>
          </div>
        </div>

      </div>

      {/* FULLSCREEN / ZOOM LIGHTBOX MODAL (Optimized for Any Display Size) */}
      {isZoomModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="High Resolution Flyer Lightbox"
          className="fixed inset-0 z-50 bg-[#0C1322]/95 backdrop-blur-md flex flex-col items-center justify-between p-3 sm:p-6 animate-fade-in"
          onClick={() => setIsZoomModalOpen(false)}
        >
          {/* Top Bar */}
          <div
            className="w-full max-w-5xl flex items-center justify-between gap-3 text-white pb-3 border-b border-[#D4AF37]/30"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="min-w-0">
              <span className="text-[10px] text-[#D4AF37] uppercase font-bold tracking-widest block">
                {currentSlide.badge} • High Resolution Viewer
              </span>
              <h3 className="text-sm sm:text-base font-display font-bold text-[#FAF7F0] truncate">
                {currentSlide.title}
              </h3>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setZoomLevel((z) => (z === 1 ? 1.6 : 1))}
                className="px-2.5 py-1 bg-[#1A253E] hover:bg-[#243356] text-[#EADBAC] border border-[#D4AF37]/40 rounded-xs text-xs font-semibold cursor-pointer inline-flex items-center gap-1"
              >
                {zoomLevel === 1 ? <ZoomIn className="w-3.5 h-3.5" /> : <ZoomOut className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{zoomLevel === 1 ? 'Zoom 160%' : 'Reset 100%'}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsZoomModalOpen(false)}
                className="p-1.5 bg-[#1A253E] hover:bg-rose-900 text-white border border-neutral-600 hover:border-rose-400 rounded-xs cursor-pointer"
                aria-label="Close high-res lightbox"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Centered Image with Adaptive Viewport Constraints */}
          <div
            className="flex-1 w-full max-w-5xl overflow-auto flex items-center justify-center p-2 sm:p-4 my-auto select-none"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentSlide.image}
              alt={currentSlide.alt || currentSlide.title}
              style={{
                transform: `scale(${zoomLevel})`,
                transition: 'transform 0.25s ease-out'
              }}
              className="max-h-[72vh] sm:max-h-[78vh] max-w-[95vw] sm:max-w-[85vw] object-contain shadow-2xl rounded-xs cursor-zoom-in"
              onClick={() => setZoomLevel((z) => (z === 1 ? 1.6 : 1))}
            />
          </div>

          {/* Bottom Action Bar */}
          <div
            className="w-full max-w-5xl pt-3 border-t border-[#D4AF37]/30 flex flex-wrap items-center justify-between gap-3 text-xs text-[#EADBAC]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2">
              <span className="text-[#94A3B8]">Display Mode:</span>
              <span className="font-semibold text-white">
                {isMobileDisplay ? 'Mobile Optimized' : isTabletDisplay ? 'Tablet Scaled' : 'Desktop 4K Ready'}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={currentSlide.ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-1.5 bg-[#D4AF37] hover:bg-[#FAF7F0] text-[#0C1322] font-bold uppercase tracking-wider text-xs rounded-xs transition-colors inline-flex items-center gap-1.5"
              >
                <span>{currentSlide.ctaText}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                type="button"
                onClick={() => setIsZoomModalOpen(false)}
                className="text-xs text-neutral-300 hover:text-white underline cursor-pointer"
              >
                Close (Esc)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* START & END TIMER / SCHEDULE & IMAGE OPTIONS MODAL */}
      <SliderTimerOptionsModal
        isOpen={isOptionsModalOpen}
        onClose={() => {
          setIsOptionsModalOpen(false);
          setModalInitialSlideId(undefined);
        }}
        slides={slides}
        onSave={handleSaveOptions}
        onReset={handleResetOptions}
        isAutoPlayActive={isAutoPlayActive}
        onToggleAutoPlay={() => setIsAutoPlayActive((prev) => !prev)}
        initialSlideId={modalInitialSlideId}
      />

    </div>
  );
};
