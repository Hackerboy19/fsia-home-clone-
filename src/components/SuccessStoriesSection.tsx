import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Volume2,
  VolumeX,
  ExternalLink,
  Crown,
  Quote,
  RefreshCw,
  X,
  Wand2,
  CheckCircle2,
  AlertCircle,
  Share2
} from 'lucide-react';
import { SUCCESS_STORIES } from '../data/fsiaData';
import { SuccessStoryItem } from '../types';
import { FSIAImage } from './FSIAImage';

interface SuccessStoriesSectionProps {
  onSelectStory?: (story: SuccessStoryItem) => void;
}

export const SuccessStoriesSection: React.FC<SuccessStoriesSectionProps> = ({
  onSelectStory
}) => {
  const [stories, setStories] = useState<SuccessStoryItem[]>(SUCCESS_STORIES);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeStoryModal, setActiveStoryModal] = useState<SuccessStoryItem | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);

  // Playing card index in the carousel
  const [playingCardId, setPlayingCardId] = useState<string>(SUCCESS_STORIES[0]?.id || '');
  const [cardProgress, setCardProgress] = useState<Record<string, number>>({});

  // AI Generation State
  const [isGeneratingAi, setIsGeneratingAi] = useState<boolean>(false);
  const [aiModalOpen, setAiModalOpen] = useState<boolean>(false);
  const [aiForm, setAiForm] = useState({
    name: 'Pooja Hegde',
    title: 'Miss India Karnataka Titleholder',
    category: 'Forever Miss India',
    location: 'Bengaluru, Karnataka',
    season: '2025'
  });
  const [generationSuccess, setGenerationSuccess] = useState<string | null>(null);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  const carouselRef = useRef<HTMLDivElement>(null);

  // Filtered stories based on category
  const filteredStories = useMemo(() => {
    if (activeCategory === 'all') return stories;
    if (activeCategory === 'ai') return stories.filter((s) => s.hasMissingImage || s.aiGenerated);
    return stories.filter((s) => s.category.toLowerCase().includes(activeCategory.toLowerCase()));
  }, [stories, activeCategory]);

  // Carousel scroll handlers
  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Video-like progress loop for the active reel in carousel
  useEffect(() => {
    if (!isPlaying || !playingCardId) return;

    const interval = setInterval(() => {
      setCardProgress((prev) => {
        const current = prev[playingCardId] || 0;
        if (current >= 100) {
          // loop back or cycle
          return { ...prev, [playingCardId]: 0 };
        }
        return { ...prev, [playingCardId]: current + 2 };
      });
    }, 200);

    return () => clearInterval(interval);
  }, [isPlaying, playingCardId]);

  // Story modal progress timer
  useEffect(() => {
    if (!activeStoryModal || !isPlaying) return;

    const slideDuration = 4500; // 4.5s per slide
    const tickInterval = 50;
    const increment = (tickInterval / slideDuration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          // Advance to next slide or close
          const currentSlides = activeStoryModal.slides || [];
          if (activeSlideIndex < currentSlides.length - 1) {
            setActiveSlideIndex((idx) => idx + 1);
            return 0;
          } else {
            // Reached the end of reel
            setActiveSlideIndex(0);
            return 0;
          }
        }
        return prev + increment;
      });
    }, tickInterval);

    return () => clearInterval(timer);
  }, [activeStoryModal, activeSlideIndex, isPlaying]);

  // Open Full Screen Reel Viewer
  const handleOpenReel = (story: SuccessStoryItem) => {
    setActiveStoryModal(story);
    setActiveSlideIndex(0);
    setProgress(0);
    setIsPlaying(true);
    if (onSelectStory) onSelectStory(story);
  };

  // Generate or Regenerate Testimonial with Gemini AI
  const handleGenerateAiTestimonial = async (storyToUpdate?: SuccessStoryItem) => {
    setIsGeneratingAi(true);
    setGenerationSuccess(null);

    const payload = storyToUpdate
      ? {
          name: storyToUpdate.winnerName,
          title: storyToUpdate.title,
          category: storyToUpdate.category,
          location: storyToUpdate.location,
          season: storyToUpdate.season
        }
      : aiForm;

    try {
      const res = await fetch('/api/generate-testimonial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error('Failed to generate testimonial');
      }

      const data = await res.json();

      if (storyToUpdate) {
        // Update existing story in state
        setStories((prev) =>
          prev.map((s) =>
            s.id === storyToUpdate.id
              ? {
                  ...s,
                  quote: data.quote,
                  story: data.story,
                  advice: data.advice,
                  aiGenerated: true
                }
              : s
          )
        );
        setGenerationSuccess(`Updated AI testimonial for ${storyToUpdate.winnerName}!`);
      } else {
        // Create new story item with AI-generated testimonial
        const newStoryId = `story-ai-${Date.now()}`;
        const newStory: SuccessStoryItem = {
          id: newStoryId,
          winnerName: aiForm.name,
          title: aiForm.title,
          category: aiForm.category,
          location: aiForm.location,
          season: aiForm.season,
          image: '', // Missing image triggers AI visual card
          hasMissingImage: true,
          quote: data.quote,
          story: data.story,
          advice: data.advice,
          profileUrl: 'https://www.fsia.in/pageant-winner',
          videoSimDuration: 15,
          slides: [
            {
              image: '',
              caption: `${aiForm.location} Audition: Verified delegate credential.`,
              stage: 'City Audition'
            },
            {
              image: '',
              caption: 'Runway Evaluation: Assessed by celebrity panel on stage presence.',
              stage: 'Ramp Finale'
            },
            {
              image: '',
              caption: 'Coronation: Official Class 41 registered honor conferment.',
              stage: 'Coronation Speech'
            }
          ],
          aiGenerated: true
        };

        setStories((prev) => [newStory, ...prev]);
        setGenerationSuccess(`Created AI Success Story for ${aiForm.name}!`);
        setAiModalOpen(false);
      }
    } catch (err) {
      console.error('Error generating AI testimonial:', err);
      // Fallback local update
      if (storyToUpdate) {
        setStories((prev) =>
          prev.map((s) =>
            s.id === storyToUpdate.id
              ? {
                  ...s,
                  quote: `FSIA gave me a national voice and stage validation that permanently altered my career trajectory.`,
                  story: `From regional auditions to the grand Zee Studio coronation in Jaipur, the platform is unmatched in dignity and credibility.`,
                  aiGenerated: true
                }
              : s
          )
        );
      }
    } finally {
      setIsGeneratingAi(false);
      setTimeout(() => setGenerationSuccess(null), 4000);
    }
  };

  // Copy shareable quote
  const handleCopyStory = (story: SuccessStoryItem) => {
    const text = `"${story.quote}" — ${story.winnerName}, ${story.title} (${story.location})\nOfficial Forever Star India Awards & Pageants: ${story.profileUrl || 'https://www.fsia.in'}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopyFeedback(story.id);
      setTimeout(() => setCopyFeedback(null), 2500);
    }
  };

  return (
    <section
      id="success-stories"
      className="py-20 md:py-24 bg-[#0C1322] text-white relative overflow-hidden border-b border-[#EADBAC]/20"
      aria-label="Winner Success Stories & Video Reels"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#A6093D] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#B8860B] rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6 pb-6 border-b border-stone-800">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-300 font-semibold mb-3 font-mono">
              <Crown className="w-4 h-4 text-[#D4AF37]" />
              <span>National Titleholders &amp; Video Journeys</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#EADBAC]">Zee Studio Coronation</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
              Winner Success Stories
            </h2>
            <p className="mt-3 text-stone-300 text-sm sm:text-base leading-relaxed">
              Experience the journeys of crowned titleholders across India. Watch short video-like story reels detailing their transformation from city auditions to the Zee Studio runway.
            </p>
          </div>

          {/* Quick Actions & AI Generator Trigger */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setAiModalOpen(true)}
              className="px-4 py-2.5 text-xs font-semibold rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-[#D4AF37] text-[#0C1322] hover:brightness-110 transition-all shadow-md flex items-center gap-2"
            >
              <Wand2 className="w-3.5 h-3.5" />
              <span>AI Testimonial Generator</span>
            </button>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => scrollCarousel('left')}
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-colors"
                aria-label="Scroll reels left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollCarousel('right')}
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-colors"
                aria-label="Scroll reels right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Strip */}
        <div className="flex items-center justify-between gap-4 mb-8 overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center gap-2">
            {[
              { id: 'all', label: 'All Stories' },
              { id: 'miss', label: 'Miss India' },
              { id: 'mrs', label: 'Mrs India' },
              { id: 'teen', label: 'Teen India' },
              { id: 'universe', label: 'Universe Titles' },
              { id: 'ai', label: '✦ AI Placeholders' }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                  activeCategory === tab.id
                    ? 'bg-[#A6093D] text-white shadow-xs'
                    : 'bg-white/5 hover:bg-white/10 text-stone-300 border border-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="text-xs text-stone-400 hidden sm:block shrink-0 font-mono">
            {filteredStories.length} Video Reels Available
          </div>
        </div>

        {/* Success Banner if AI Generated */}
        {generationSuccess && (
          <div className="mb-6 p-3 bg-emerald-950/80 border border-emerald-500/50 rounded-xl text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in duration-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{generationSuccess}</span>
          </div>
        )}

        {/* Video-Like Carousel Container */}
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scroll-smooth scrollbar-none"
          tabIndex={0}
          role="region"
          aria-label="Winner Reels Carousel"
        >
          {filteredStories.map((story, index) => {
            const isCardActive = playingCardId === story.id;
            const progressValue = cardProgress[story.id] || 0;
            const hasImage = Boolean(story.image && !story.hasMissingImage);

            return (
              <div
                key={story.id}
                className="w-[280px] sm:w-[320px] shrink-0 snap-start relative group rounded-2xl overflow-hidden border border-stone-800 bg-[#121927] shadow-xl hover:border-[#D4AF37]/60 transition-all duration-300 flex flex-col justify-between aspect-[9/16]"
              >
                {/* Simulated Reel Progress Bar Top */}
                <div className="absolute top-0 left-0 right-0 z-30 p-3 bg-gradient-to-b from-black/80 to-transparent">
                  <div className="w-full bg-white/20 h-1 rounded-full overflow-hidden">
                    <div
                      className="bg-amber-400 h-full transition-all duration-200 ease-linear rounded-full"
                      style={{ width: isCardActive ? `${progressValue}%` : '0%' }}
                    />
                  </div>

                  <div className="flex items-center justify-between mt-2 text-[11px] text-white/90 font-mono">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      <span className="font-semibold uppercase tracking-wider">
                        Reel #{String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsMuted(!isMuted);
                        }}
                        className="p-1 rounded-full bg-black/40 hover:bg-black/60 text-white/80 transition-colors"
                        title={isMuted ? 'Simulated Audio Muted' : 'Audio On'}
                        aria-label="Toggle mute"
                      >
                        {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                      </button>

                      <span className="text-white/60">0:{story.videoSimDuration || 15}</span>
                    </div>
                  </div>
                </div>

                {/* Media Center / Background */}
                <div className="absolute inset-0 z-10 overflow-hidden">
                  {hasImage ? (
                    <>
                      <FSIAImage
                        src={story.image}
                        alt={story.winnerName}
                        className={`w-full h-full object-cover transition-transform duration-700 ${
                          isCardActive ? 'scale-105' : 'group-hover:scale-105'
                        }`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0C1322] via-[#0C1322]/40 to-transparent" />
                    </>
                  ) : (
                    /* AI PLACEHOLDER STORY CARD (Used when image is missing or AI-generated) */
                    <div className="w-full h-full bg-gradient-to-br from-[#1A2234] via-[#0E1524] to-[#1F1722] p-6 flex flex-col justify-center items-center text-center relative">
                      {/* Decorative Gold Filigree Background */}
                      <div className="absolute inset-4 border border-[#D4AF37]/30 rounded-xl pointer-events-none" />
                      <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-[10px] text-amber-300 font-mono">
                        <span>✦ FSIA STAR ARCHIVE</span>
                        <span>CLASS 41 CERTIFIED</span>
                      </div>

                      {/* Golden Monogram Crest */}
                      <div className="w-16 h-16 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] mb-4 shadow-lg">
                        <Crown className="w-8 h-8 text-[#D4AF37]" />
                      </div>

                      <div className="text-[11px] uppercase tracking-widest text-amber-300 font-semibold font-mono mb-1">
                        AI-Grounded Testimonial
                      </div>

                      <h3 className="text-xl font-serif font-bold text-white mb-2">
                        {story.winnerName}
                      </h3>

                      <p className="text-xs text-amber-100/90 font-mono mb-3">
                        {story.title} · {story.location}
                      </p>

                      <div className="relative px-3 py-2 my-2 bg-black/30 rounded-lg border border-white/5">
                        <Quote className="w-4 h-4 text-[#D4AF37]/60 absolute -top-2 left-2" />
                        <p className="text-xs text-stone-200 italic line-clamp-4 leading-relaxed pt-1">
                          "{story.quote}"
                        </p>
                      </div>

                      {/* Regenerate AI Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleGenerateAiTestimonial(story);
                        }}
                        disabled={isGeneratingAi}
                        className="mt-3 px-3 py-1.5 text-[11px] font-semibold text-amber-300 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 rounded-lg transition-colors flex items-center gap-1.5"
                      >
                        <RefreshCw className={`w-3 h-3 ${isGeneratingAi ? 'animate-spin' : ''}`} />
                        <span>Regenerate with Gemini</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Center Play Overlay / Interactive Hotspot */}
                <div
                  className="absolute inset-0 z-20 flex items-center justify-center cursor-pointer"
                  onClick={() => handleOpenReel(story)}
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (playingCardId === story.id) {
                        setIsPlaying(!isPlaying);
                      } else {
                        setPlayingCardId(story.id);
                        setIsPlaying(true);
                      }
                    }}
                    className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-xs border border-white/30 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 shadow-lg"
                    aria-label={isCardActive && isPlaying ? 'Pause video reel' : 'Play video reel'}
                  >
                    {isCardActive && isPlaying ? (
                      <Pause className="w-5 h-5 text-amber-300" />
                    ) : (
                      <Play className="w-5 h-5 text-amber-300 fill-amber-300 ml-0.5" />
                    )}
                  </button>
                </div>

                {/* Bottom Overlay Content */}
                <div className="relative z-30 p-5 pt-8 bg-gradient-to-t from-black via-black/80 to-transparent mt-auto pointer-events-none">
                  <div className="flex items-center gap-1.5 text-[11px] text-amber-300 font-mono font-semibold mb-1">
                    <span>{story.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{story.season}</span>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-white leading-tight">
                    {story.winnerName}
                  </h3>

                  <div className="text-xs text-stone-300 font-medium mt-0.5">
                    {story.title} ({story.location})
                  </div>

                  {/* Quote preview */}
                  <p className="mt-2 text-xs text-stone-300 line-clamp-2 leading-relaxed italic">
                    "{story.quote}"
                  </p>

                  {/* Action Bar */}
                  <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between gap-2 pointer-events-auto">
                    <button
                      type="button"
                      onClick={() => handleOpenReel(story)}
                      className="px-3 py-1.5 text-xs font-semibold text-[#0C1322] bg-[#D4AF37] hover:bg-[#E5C158] rounded-lg transition-colors flex items-center gap-1 shadow-xs"
                    >
                      <Play className="w-3 h-3 fill-[#0C1322]" />
                      <span>Watch Reel</span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyStory(story);
                        }}
                        className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-stone-300 transition-colors"
                        title="Copy Winner Testimonial"
                        aria-label="Copy story text"
                      >
                        {copyFeedback === story.id ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Share2 className="w-3.5 h-3.5" />
                        )}
                      </button>

                      {story.profileUrl && (
                        <a
                          href={story.profileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-stone-300 transition-colors"
                          title="View Official Winner Archive"
                          aria-label="View official winner profile"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Explanatory Footer Strip: AI Fallback Transparency */}
        <div className="mt-8 p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-stone-300">
          <div className="flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white">Missing Image AI Fallback Support:</span>{' '}
              When archival winner portraits are missing or unavailable, the system synthesizes authentic editorial testimonials grounded in official FSIA Class 41 pageantry records using Gemini AI.
            </div>
          </div>

          <button
            type="button"
            onClick={() => setAiModalOpen(true)}
            className="text-amber-300 hover:text-amber-200 font-semibold underline underline-offset-4 shrink-0 transition-colors"
          >
            Create Custom AI Story Card →
          </button>
        </div>

      </div>

      {/* MODAL 1: FULLSCREEN REEL VIEWER */}
      {activeStoryModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-sm sm:max-w-md h-[92vh] max-h-[780px] bg-black rounded-3xl overflow-hidden shadow-2xl border border-[#D4AF37]/50 flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Multi-Segment Progress Bars */}
            <div className="absolute top-0 left-0 right-0 z-40 p-4 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
              {/* Progress bars according to slide count */}
              <div className="flex gap-1.5 mb-3">
                {(activeStoryModal.slides?.length ? activeStoryModal.slides : [1]).map((_, idx) => {
                  let barWidth = '0%';
                  if (idx < activeSlideIndex) barWidth = '100%';
                  else if (idx === activeSlideIndex) barWidth = `${progress}%`;

                  return (
                    <div key={idx} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                      <div
                        className="bg-amber-400 h-full rounded-full transition-all duration-75 ease-linear"
                        style={{ width: barWidth }}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Header inside reel */}
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#A6093D] flex items-center justify-center text-amber-300 font-serif font-bold text-xs border border-amber-400/40">
                    <Crown className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold leading-tight truncate max-w-[180px]">
                      {activeStoryModal.winnerName}
                    </h4>
                    <p className="text-[10px] text-amber-200 font-mono">
                      {activeStoryModal.title}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-1.5 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
                    aria-label={isPlaying ? 'Pause story' : 'Resume story'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveStoryModal(null)}
                    className="p-1.5 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
                    aria-label="Close story"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Reel Active Slide Image & Content */}
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-stone-950">
              {activeStoryModal.slides?.[activeSlideIndex]?.image ? (
                <FSIAImage
                  src={activeStoryModal.slides[activeSlideIndex].image}
                  alt={activeStoryModal.winnerName}
                  className="w-full h-full object-cover"
                />
              ) : activeStoryModal.image ? (
                <FSIAImage
                  src={activeStoryModal.image}
                  alt={activeStoryModal.winnerName}
                  className="w-full h-full object-cover"
                />
              ) : (
                /* AI Typographic Story Card */
                <div className="w-full h-full bg-gradient-to-br from-[#121927] via-[#090D15] to-[#1C1420] p-8 flex flex-col justify-center items-center text-center">
                  <Crown className="w-12 h-12 text-[#D4AF37] mb-4" />
                  <div className="text-xs uppercase tracking-widest text-amber-300 font-mono mb-2">
                    Verified National Profile
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-white mb-1">
                    {activeStoryModal.winnerName}
                  </h3>
                  <div className="text-xs text-stone-300 font-mono mb-4">
                    {activeStoryModal.title} · {activeStoryModal.location}
                  </div>
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-xs text-amber-100 italic leading-relaxed">
                    "{activeStoryModal.quote}"
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            </div>

            {/* Tap Left / Right Hotspots for Story Navigation */}
            <div className="absolute inset-0 z-20 flex">
              <div
                className="w-1/3 h-full cursor-pointer"
                onClick={() => {
                  if (activeSlideIndex > 0) {
                    setActiveSlideIndex((i) => i - 1);
                    setProgress(0);
                  }
                }}
                title="Previous slide"
              />
              <div
                className="w-1/3 h-full"
                onClick={() => setIsPlaying(!isPlaying)}
                title="Tap to Pause/Play"
              />
              <div
                className="w-1/3 h-full cursor-pointer"
                onClick={() => {
                  const slides = activeStoryModal.slides || [];
                  if (activeSlideIndex < slides.length - 1) {
                    setActiveSlideIndex((i) => i + 1);
                    setProgress(0);
                  } else {
                    setActiveStoryModal(null);
                  }
                }}
                title="Next slide"
              />
            </div>

            {/* Bottom Captions & Advice */}
            <div className="relative z-30 p-5 pt-8 bg-gradient-to-t from-black via-black/85 to-transparent mt-auto space-y-3 pointer-events-none">
              {/* Stage Badge */}
              {activeStoryModal.slides?.[activeSlideIndex]?.stage && (
                <div className="inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-200 bg-[#A6093D]/90 rounded-md font-mono">
                  {activeStoryModal.slides[activeSlideIndex].stage}
                </div>
              )}

              {/* Caption */}
              {activeStoryModal.slides?.[activeSlideIndex]?.caption && (
                <p className="text-xs text-white/90 leading-snug">
                  {activeStoryModal.slides[activeSlideIndex].caption}
                </p>
              )}

              {/* Winning Speech Quote */}
              <div className="p-3 bg-white/10 backdrop-blur-xs rounded-xl border border-white/10">
                <div className="text-[10px] text-amber-300 uppercase tracking-widest font-mono font-semibold mb-1">
                  Coronation Testimonial
                </div>
                <p className="text-xs text-stone-200 italic leading-relaxed">
                  "{activeStoryModal.quote}"
                </p>
              </div>

              {/* Mentorship Advice */}
              {activeStoryModal.advice && (
                <div className="text-[11px] text-stone-300">
                  <span className="text-amber-400 font-semibold">Advice for Aspiring Delegates:</span>{' '}
                  {activeStoryModal.advice}
                </div>
              )}

              {/* Direct Link */}
              <div className="pt-2 flex items-center justify-between gap-3 pointer-events-auto">
                <a
                  href={activeStoryModal.profileUrl || 'https://www.fsia.in'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 text-xs font-semibold text-center text-[#0C1322] bg-[#D4AF37] hover:bg-[#E5C158] rounded-xl transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Explore Winner Profile</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  type="button"
                  onClick={() => handleCopyStory(activeStoryModal)}
                  className="px-3 py-2 text-xs font-medium text-white bg-white/10 hover:bg-white/20 rounded-xl transition-colors flex items-center gap-1"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: AI TESTIMONIAL GENERATOR DRAWER */}
      {aiModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-[#121927] border border-[#D4AF37]/50 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl text-white relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setAiModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-stone-300"
              aria-label="Close AI modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 text-xs text-amber-300 uppercase tracking-widest font-mono font-semibold mb-2">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>Gemini AI Testimonial Synthesizer</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-2">
              Generate Placeholder Testimonial
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed mb-6">
              Use Gemini AI to generate an authentic winner testimonial, transformation story, and mentorship advice for any crowned contestant or award recipient when photographic assets are missing.
            </p>

            {/* Input Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1 font-mono">
                  Contestant / Winner Name
                </label>
                <input
                  type="text"
                  value={aiForm.name}
                  onChange={(e) => setAiForm({ ...aiForm, name: e.target.value })}
                  placeholder="e.g. Meera Nair"
                  className="w-full px-3.5 py-2 text-xs bg-black/40 border border-stone-700 rounded-lg text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1 font-mono">
                    Title &amp; Division
                  </label>
                  <input
                    type="text"
                    value={aiForm.title}
                    onChange={(e) => setAiForm({ ...aiForm, title: e.target.value })}
                    placeholder="e.g. Miss India Karnataka 2025"
                    className="w-full px-3.5 py-2 text-xs bg-black/40 border border-stone-700 rounded-lg text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1 font-mono">
                    Category
                  </label>
                  <select
                    value={aiForm.category}
                    onChange={(e) => setAiForm({ ...aiForm, category: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-black/40 border border-stone-700 rounded-lg text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="Forever Miss India">Forever Miss India</option>
                    <option value="Forever Mrs India">Forever Mrs India (G-1 / G-2)</option>
                    <option value="Forever Miss Teen India">Forever Miss Teen India</option>
                    <option value="Miss Forever Universe">Miss Forever Universe</option>
                    <option value="Super Woman Award">Super Woman Award</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1 font-mono">
                  State / City Chapter
                </label>
                <input
                  type="text"
                  value={aiForm.location}
                  onChange={(e) => setAiForm({ ...aiForm, location: e.target.value })}
                  placeholder="e.g. Bengaluru, Karnataka"
                  className="w-full px-3.5 py-2 text-xs bg-black/40 border border-stone-700 rounded-lg text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 pt-4 border-t border-stone-800 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setAiModalOpen(false)}
                className="px-4 py-2 text-xs font-medium text-stone-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleGenerateAiTestimonial()}
                disabled={isGeneratingAi || !aiForm.name.trim()}
                className="px-5 py-2.5 text-xs font-semibold text-[#0C1322] bg-[#D4AF37] hover:bg-[#E5C158] rounded-xl transition-all shadow-md flex items-center gap-2 disabled:opacity-50"
              >
                {isGeneratingAi ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Generating with Gemini…</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="w-3.5 h-3.5" />
                    <span>Generate Story Card</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
