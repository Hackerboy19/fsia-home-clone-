import React, { useState, useRef } from 'react';
import {
  X,
  Clock,
  Calendar,
  Check,
  RotateCcw,
  Play,
  Pause,
  Eye,
  Link2,
  ExternalLink,
  Image as ImageIcon,
  Plus,
  Trash2,
  Upload,
  Sparkles
} from 'lucide-react';

export interface SlideTimerConfig {
  id: string;
  image: string;
  title: string;
  categoryTag: string;
  venue: string;
  subtitle: string;
  badge: string;
  alt?: string;
  ctaText: string;
  ctaUrl: string;
  fitMode: 'contain' | 'cover' | 'auto';
  startDate: string; // ISO date string e.g. "2026-08-01T00:00"
  endDate: string;   // ISO date string e.g. "2026-11-30T23:59"
  timerDuration: number; // in seconds (display timer)
  showCountdown: boolean;
}

export const FSIA_LIBRARY_PRESETS = [
  {
    name: 'National Pageant 2026 Poster',
    url: 'https://www.fsia.in/uploads/Forever-Star-India-Pageant.webp',
    tag: 'Auditions Poster',
    fitMode: 'contain' as const
  },
  {
    name: 'Awards Season 8 Flyer',
    url: 'https://www.fsia.in/uploads/Forever-Star-India-award-season-8.webp',
    tag: 'National Honors Flyer',
    fitMode: 'contain' as const
  },
  {
    name: 'Zee Studio Grand Arena',
    url: 'https://www.fsia.in/static/media/ee4544.6a2d3bd6bf0b169df07e.webp',
    tag: 'Stage Architecture',
    fitMode: 'cover' as const
  },
  {
    name: 'Exclusive Runway Walk',
    url: 'https://www.fsia.in/static/media/exclusive1.webp',
    tag: 'Couture Ramp Walk',
    fitMode: 'cover' as const
  },
  {
    name: 'Broadcast Production Set',
    url: 'https://www.fsia.in/static/media/grand-finale-setup1.webp',
    tag: 'Zee Studio Broadcast',
    fitMode: 'cover' as const
  },
  {
    name: 'Zee Studio Catwalk Lights',
    url: 'https://www.fsia.in/static/media/finalestudio1.webp',
    tag: 'Coronation Stage',
    fitMode: 'cover' as const
  },
  {
    name: 'Super Hero & Star Achievers',
    url: 'https://www.fsia.in/uploads/bnpg3.webp',
    tag: 'Awards Banner',
    fitMode: 'contain' as const
  },
  {
    name: 'Miss India 2025 Winner',
    url: 'https://www.fsia.in/static/media/Neeharika%20Bethanapalli%20-%20Miss%20India%202025%20Winner.jpg',
    tag: 'Crowned Winner',
    fitMode: 'contain' as const
  },
  {
    name: 'Mrs India 2025 Winner',
    url: 'https://www.fsia.in/static/media/Anjali%20Sinha%20-%20Mrs%20India%202025%20Winner%20%28G-1%29.jpg',
    tag: 'Crowned Winner',
    fitMode: 'contain' as const
  },
  {
    name: 'Miss Teen India 2025 Winner',
    url: 'https://www.fsia.in/static/media/Tanvi%20Yatin%20Khairnar%20-%20Miss%20Teen%20India%202025%20Winner.jpg',
    tag: 'Crowned Winner',
    fitMode: 'contain' as const
  }
];

interface SliderTimerOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  slides: SlideTimerConfig[];
  onSave: (updatedSlides: SlideTimerConfig[]) => void;
  onReset: () => void;
  isAutoPlayActive: boolean;
  onToggleAutoPlay: () => void;
  initialSlideId?: string;
}

export const SliderTimerOptionsModal: React.FC<SliderTimerOptionsModalProps> = ({
  isOpen,
  onClose,
  slides,
  onSave,
  onReset,
  isAutoPlayActive,
  onToggleAutoPlay,
  initialSlideId
}) => {
  const [formData, setFormData] = useState<SlideTimerConfig[]>(slides);
  const [activeTab, setActiveTab] = useState<string>(initialSlideId || slides[0]?.id || '');
  const [saveFeedback, setSaveFeedback] = useState<string | null>(null);
  const [customUrlInput, setCustomUrlInput] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Sync formData when modal opens or slides update
  React.useEffect(() => {
    setFormData(slides);
    if (initialSlideId) {
      setActiveTab(initialSlideId);
    } else if (!activeTab && slides.length > 0) {
      setActiveTab(slides[0].id);
    }
  }, [slides, isOpen, initialSlideId, activeTab]);

  if (!isOpen) return null;

  const currentActiveSlide = formData.find((s) => s.id === activeTab) || formData[0];

  const handleFieldChange = (
    slideId: string,
    field: keyof SlideTimerConfig,
    value: string | number | boolean
  ) => {
    setFormData((prev) =>
      prev.map((slide) =>
        slide.id === slideId ? { ...slide, [field]: value } : slide
      )
    );
  };

  const handleAddSlide = () => {
    const newIndex = formData.length + 1;
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
      fitMode: 'contain',
      startDate: new Date().toISOString().slice(0, 16),
      endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
      timerDuration: 6,
      showCountdown: true
    };
    setFormData((prev) => [...prev, newSlide]);
    setActiveTab(newSlide.id);
    setSaveFeedback('Added new slider image. Configure details below and click Save.');
    setTimeout(() => setSaveFeedback(null), 3000);
  };

  const handleDeleteSlide = (slideId: string) => {
    if (formData.length <= 1) {
      alert('The slider must have at least one image.');
      return;
    }
    const remaining = formData.filter((s) => s.id !== slideId);
    setFormData(remaining);
    if (activeTab === slideId) {
      setActiveTab(remaining[0].id);
    }
  };

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>, slideId: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size exceeds 5MB limit. Please select a smaller image file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        handleFieldChange(slideId, 'image', event.target.result);
        setSaveFeedback('Image uploaded successfully from your device!');
        setTimeout(() => setSaveFeedback(null), 2500);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleApplyCustomUrl = (slideId: string) => {
    if (!customUrlInput.trim()) return;
    handleFieldChange(slideId, 'image', customUrlInput.trim());
    setCustomUrlInput('');
    setSaveFeedback('Image URL updated successfully!');
    setTimeout(() => setSaveFeedback(null), 2500);
  };

  const handleSelectPreset = (slideId: string, presetUrl: string, presetFit: 'contain' | 'cover') => {
    setFormData((prev) =>
      prev.map((s) =>
        s.id === slideId
          ? { ...s, image: presetUrl, fitMode: presetFit }
          : s
      )
    );
    setSaveFeedback('Applied official FSIA library image!');
    setTimeout(() => setSaveFeedback(null), 2000);
  };

  const handleSave = () => {
    onSave(formData);
    setSaveFeedback('All slider images, schedules & timers updated successfully!');
    setTimeout(() => {
      setSaveFeedback(null);
      onClose();
    }, 1200);
  };

  const handleResetToDefault = () => {
    onReset();
    setSaveFeedback('Restored official FSIA announcement timeline.');
    setTimeout(() => {
      setSaveFeedback(null);
      onClose();
    }, 1200);
  };

  // Helper to compute live preview of countdown/status for a slide
  const computeStatus = (startDateStr: string, endDateStr: string) => {
    const now = new Date().getTime();
    const start = new Date(startDateStr).getTime();
    const end = new Date(endDateStr).getTime();

    if (isNaN(start) || isNaN(end)) {
      return { text: 'Invalid Dates', color: 'text-neutral-500' };
    }

    if (now < start) {
      const diff = Math.max(0, start - now);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      return {
        text: `Upcoming (Starts in ${days}d ${hours}h)`,
        color: 'text-amber-700 bg-amber-50 border-amber-300'
      };
    }

    if (now > end) {
      return {
        text: 'Timeline Concluded',
        color: 'text-neutral-600 bg-neutral-100 border-neutral-300'
      };
    }

    const diff = Math.max(0, end - now);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    return {
      text: `Active Announcement (${days}d ${hours}h left)`,
      color: 'text-emerald-800 bg-emerald-50 border-emerald-300 font-semibold'
    };
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-[#0C1322]/85 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="timer-modal-title"
    >
      <div className="relative w-full max-w-5xl bg-white border border-[#D4AF37] shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-3.5 sm:p-4 bg-[#FAF8F2] border-b border-[#EADBAC] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-sm bg-[#0C1322] border border-[#D4AF37] flex items-center justify-center text-[#EADBAC] shrink-0">
              <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37]" />
            </div>
            <div>
              <h2 id="timer-modal-title" className="text-base sm:text-lg md:text-xl font-display font-bold text-[#0C1322]">
                Slider Images, Schedules &amp; Timer Management
              </h2>
              <p className="text-[11px] sm:text-xs text-[#526077] font-sans">
                Add more slider images, update existing images, customize start/end timers and redirect URLs as per need.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 sm:p-2 text-[#526077] hover:text-[#0C1322] hover:bg-neutral-100 rounded-sm transition-colors cursor-pointer"
            aria-label="Close Options"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Global Controls Strip */}
        <div className="px-3 sm:px-4 py-2 bg-neutral-50 border-b border-neutral-200 flex flex-wrap items-center justify-between gap-2.5 text-xs font-sans shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[#526077] font-medium">Auto-Advance Slider:</span>
            <button
              type="button"
              onClick={onToggleAutoPlay}
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm border font-semibold transition-colors cursor-pointer ${
                isAutoPlayActive
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                  : 'bg-neutral-200 border-neutral-300 text-neutral-700'
              }`}
            >
              {isAutoPlayActive ? (
                <>
                  <Pause className="w-3 h-3" />
                  <span>Timer Running</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3" />
                  <span>Timer Paused</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleAddSlide}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#0C1322] hover:bg-[#1A253E] text-[#EADBAC] text-xs font-bold rounded-sm border border-[#D4AF37]/60 shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>+ Add More Slider Image</span>
            </button>
          </div>
        </div>

        {/* Modal Body: Slide Tabs (Left) + Config Form (Right) */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-12 min-h-0">
          
          {/* Left Slide Selector Tabs & Add Slide Button */}
          <div className="md:col-span-4 border-r border-[#EADBAC] bg-[#FAF9F5] p-3 space-y-2 overflow-y-auto flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between px-1 pb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#7E591B] block">
                  Slider Images ({formData.length})
                </span>
                <span className="text-[10px] text-[#64748B]">Click to Edit</span>
              </div>

              {/* Add New Slide Button */}
              <button
                type="button"
                onClick={handleAddSlide}
                className="w-full py-2 px-3 border border-dashed border-[#B8860B] bg-[#FFFDF7] hover:bg-[#FAF6EC] text-[#7E591B] text-xs font-bold rounded-sm flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-2xs"
              >
                <Plus className="w-4 h-4 text-[#B8860B]" />
                <span>+ Add More Slider Image</span>
              </button>

              {/* List of current slides */}
              {formData.map((slide, index) => {
                const status = computeStatus(slide.startDate, slide.endDate);
                const isSelected = slide.id === activeTab;
                return (
                  <div
                    key={slide.id}
                    className={`group relative rounded-sm border transition-all flex items-start gap-2 p-2 ${
                      isSelected
                        ? 'bg-white border-[#B8860B] shadow-sm ring-1 ring-[#B8860B]'
                        : 'bg-white/70 hover:bg-white border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveTab(slide.id)}
                      className="flex-1 flex items-start gap-2 text-left cursor-pointer min-w-0"
                    >
                      <div className="w-12 h-12 bg-neutral-900 shrink-0 border border-neutral-300 overflow-hidden relative">
                        <img
                          src={slide.image}
                          alt=""
                          className={`w-full h-full ${slide.fitMode === 'contain' ? 'object-contain' : 'object-cover'}`}
                          loading="lazy"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1 mb-0.5">
                          <span className="text-[10px] font-mono font-bold text-[#B8860B]">
                            Image {String(index + 1).padStart(2, '0')}
                          </span>
                          <span className="text-[9px] px-1 py-0.2 bg-neutral-50 border rounded-xs font-semibold">
                            {slide.timerDuration}s
                          </span>
                        </div>

                        <h4 className="text-xs font-semibold text-[#0C1322] font-display truncate">
                          {slide.title}
                        </h4>

                        <span className={`inline-block text-[9px] px-1.5 py-0.5 border rounded-xs mt-1 truncate max-w-full ${status.color}`}>
                          {status.text}
                        </span>
                      </div>
                    </button>

                    {/* Delete slide button (if more than 1 slide) */}
                    {formData.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleDeleteSlide(slide.id)}
                        title="Delete this slider image"
                        className="p-1 text-neutral-400 hover:text-rose-600 hover:bg-rose-50 rounded-xs transition-colors cursor-pointer shrink-0 mt-0.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom quick add button */}
            <div className="pt-3 border-t border-[#EADBAC]/60">
              <button
                type="button"
                onClick={handleAddSlide}
                className="w-full py-1.5 px-3 bg-neutral-100 hover:bg-neutral-200 text-[#0C1322] text-xs font-semibold rounded-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-[#B8860B]" />
                <span>Add Another Slide</span>
              </button>
            </div>
          </div>

          {/* Right: Selected Slide Configuration Details */}
          <div className="md:col-span-8 p-4 sm:p-5 overflow-y-auto bg-white">
            {currentActiveSlide && (
              <div className="space-y-5">
                
                {/* Active Slide Header Strip */}
                <div className="p-3 bg-[#FAF8F2] border border-[#EADBAC] flex flex-wrap items-center justify-between gap-3">
                  <div className="min-w-0">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#B8860B] block">
                      Currently Editing • Image {formData.findIndex((s) => s.id === currentActiveSlide.id) + 1} of {formData.length}
                    </span>
                    <h3 className="text-sm sm:text-base font-display font-bold text-[#0C1322] truncate mt-0.5">
                      {currentActiveSlide.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`inline-block text-[11px] px-2 py-0.5 border rounded-xs ${computeStatus(currentActiveSlide.startDate, currentActiveSlide.endDate).color}`}>
                      {computeStatus(currentActiveSlide.startDate, currentActiveSlide.endDate).text}
                    </span>

                    {formData.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleDeleteSlide(currentActiveSlide.id)}
                        className="inline-flex items-center gap-1 px-2 py-1 text-xs text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-sm transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Delete</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* 1. UPDATE IMAGE OPTION (Custom URL, File Upload, or FSIA Library Presets) */}
                <div className="border border-[#D4AF37]/60 p-4 rounded-sm space-y-4 bg-[#FAF9F6]">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#0C1322] flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-[#B8860B]" />
                      <span>Update Slider Image Option</span>
                    </h4>
                    <span className="text-[10px] text-[#7E591B] font-semibold bg-white px-2 py-0.5 border border-[#D4AF37]/40">
                      Active: {currentActiveSlide.fitMode === 'auto' ? 'Auto Adaptive' : currentActiveSlide.fitMode === 'contain' ? 'Uncropped (Full)' : 'Fill Bleed'}
                    </span>
                  </div>

                  {/* Current Image Preview & Fit Mode Toggle */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center bg-white p-3 border border-neutral-200">
                    <div className="sm:col-span-4 h-28 sm:h-32 bg-[#0B1220] border border-[#D4AF37]/40 overflow-hidden relative flex items-center justify-center">
                      <img
                        src={currentActiveSlide.image}
                        alt="Current slide preview"
                        className={`w-full h-full ${
                          currentActiveSlide.fitMode === 'contain'
                            ? 'object-contain'
                            : currentActiveSlide.fitMode === 'cover'
                            ? 'object-cover'
                            : 'object-contain sm:object-cover'
                        }`}
                      />
                    </div>

                    <div className="sm:col-span-8 space-y-2 min-w-0">
                      <div>
                        <span className="text-xs font-semibold text-[#0C1322] block">
                          Current Image URL:
                        </span>
                        <p className="text-[11px] font-mono text-[#526077] break-all line-clamp-2 bg-neutral-50 p-1.5 border border-neutral-200">
                          {currentActiveSlide.image}
                        </p>
                      </div>

                      <div className="flex flex-col gap-1.5 pt-1">
                        <label className="text-xs font-semibold text-[#334155]">Display Size Sizing Mode:</label>
                        <div className="grid grid-cols-3 gap-1">
                          <button
                            type="button"
                            onClick={() => handleFieldChange(currentActiveSlide.id, 'fitMode', 'auto')}
                            className={`px-2 py-1 text-[11px] font-semibold border rounded-xs transition-colors cursor-pointer text-center ${
                              (currentActiveSlide.fitMode as string) === 'auto'
                                ? 'bg-[#0C1322] text-[#EADBAC] border-[#D4AF37]'
                                : 'bg-[#FAF8F2] text-[#526077] border-neutral-200 hover:border-[#D4AF37]'
                            }`}
                          >
                            Auto-Adaptive
                          </button>
                          <button
                            type="button"
                            onClick={() => handleFieldChange(currentActiveSlide.id, 'fitMode', 'contain')}
                            className={`px-2 py-1 text-[11px] font-semibold border rounded-xs transition-colors cursor-pointer text-center ${
                              currentActiveSlide.fitMode === 'contain'
                                ? 'bg-[#0C1322] text-[#EADBAC] border-[#D4AF37]'
                                : 'bg-[#FAF8F2] text-[#526077] border-neutral-200 hover:border-[#D4AF37]'
                            }`}
                          >
                            Full (Contain)
                          </button>
                          <button
                            type="button"
                            onClick={() => handleFieldChange(currentActiveSlide.id, 'fitMode', 'cover')}
                            className={`px-2 py-1 text-[11px] font-semibold border rounded-xs transition-colors cursor-pointer text-center ${
                              currentActiveSlide.fitMode === 'cover'
                                ? 'bg-[#0C1322] text-[#EADBAC] border-[#D4AF37]'
                                : 'bg-[#FAF8F2] text-[#526077] border-neutral-200 hover:border-[#D4AF37]'
                            }`}
                          >
                            Fill (Cover)
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Option A: Enter Custom Image URL */}
                  <div>
                    <label className="block text-xs font-semibold text-[#334155] mb-1">
                      Option A: Paste New Image Web URL
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        placeholder="https://www.fsia.in/... or any https:// image URL"
                        value={customUrlInput}
                        onChange={(e) => setCustomUrlInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleApplyCustomUrl(currentActiveSlide.id);
                          }
                        }}
                        className="flex-1 px-3 py-1.5 text-xs border border-neutral-300 rounded-sm focus:outline-none focus:border-[#B8860B] font-mono text-[#0C1322]"
                      />
                      <button
                        type="button"
                        onClick={() => handleApplyCustomUrl(currentActiveSlide.id)}
                        className="px-3 py-1.5 bg-[#0C1322] text-[#EADBAC] hover:text-white text-xs font-semibold rounded-sm border border-[#D4AF37]/50 cursor-pointer shrink-0"
                      >
                        Apply URL
                      </button>
                    </div>
                  </div>

                  {/* Option B: Upload from Computer/Phone Device */}
                  <div>
                    <label className="block text-xs font-semibold text-[#334155] mb-1">
                      Option B: Upload Image from Device (Computer/Mobile)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={(e) => handleImageFileUpload(e, currentActiveSlide.id)}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-neutral-50 text-[#0C1322] text-xs font-semibold rounded-sm border border-neutral-300 hover:border-[#D4AF37] cursor-pointer shadow-2xs"
                      >
                        <Upload className="w-3.5 h-3.5 text-[#B8860B]" />
                        <span>Choose Image File...</span>
                      </button>
                      <span className="text-[11px] text-[#64748B]">
                        JPG, PNG, WebP supported (Client-side instant preview)
                      </span>
                    </div>
                  </div>

                  {/* Option C: Select from FSIA Official Photo Library Presets */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-semibold text-[#334155] flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#B8860B]" />
                        <span>Option C: Select from Official FSIA Library Presets</span>
                      </label>
                      <span className="text-[10px] text-[#64748B]">Click to Apply</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 max-h-48 overflow-y-auto p-1 bg-white border border-neutral-200">
                      {FSIA_LIBRARY_PRESETS.map((preset) => {
                        const isPresetActive = currentActiveSlide.image === preset.url;
                        return (
                          <button
                            key={preset.url}
                            type="button"
                            onClick={() =>
                              handleSelectPreset(currentActiveSlide.id, preset.url, preset.fitMode)
                            }
                            title={`Select ${preset.name}`}
                            className={`p-1 text-left rounded-xs border transition-all cursor-pointer relative group ${
                              isPresetActive
                                ? 'border-[#B8860B] bg-[#FAF8F2] ring-1 ring-[#B8860B]'
                                : 'border-neutral-200 hover:border-[#B8860B] bg-white'
                            }`}
                          >
                            <div className="h-16 bg-[#0B1220] overflow-hidden relative">
                              <img
                                src={preset.url}
                                alt={preset.name}
                                className={`w-full h-full ${preset.fitMode === 'contain' ? 'object-contain' : 'object-cover'}`}
                                loading="lazy"
                              />
                              {isPresetActive && (
                                <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#B8860B] text-white flex items-center justify-center">
                                  <Check className="w-2.5 h-2.5" />
                                </div>
                              )}
                            </div>
                            <span className="text-[9px] font-sans font-semibold text-[#0C1322] block truncate mt-1">
                              {preset.name}
                            </span>
                            <span className="text-[8px] text-[#7E591B] block truncate">
                              {preset.tag}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* 2. DATE & TIMER SCHEDULE SETTINGS */}
                <div className="border border-neutral-200 p-4 rounded-sm space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#0C1322] flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#B8860B]" />
                    <span>Start &amp; End Announcement Schedule (Dates &amp; Times)</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Start Date / Time */}
                    <div>
                      <label className="block text-xs font-semibold text-[#334155] mb-1">
                        Start Date &amp; Time
                      </label>
                      <input
                        type="datetime-local"
                        value={currentActiveSlide.startDate}
                        onChange={(e) =>
                          handleFieldChange(currentActiveSlide.id, 'startDate', e.target.value)
                        }
                        className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-sm focus:outline-none focus:border-[#B8860B] focus:ring-1 focus:ring-[#B8860B] font-mono text-[#0C1322]"
                      />
                      <span className="text-[10px] text-[#64748B] mt-1 block">
                        When this announcement officially opens/starts.
                      </span>
                    </div>

                    {/* End Date / Time */}
                    <div>
                      <label className="block text-xs font-semibold text-[#334155] mb-1">
                        End Date &amp; Time (Countdown Target)
                      </label>
                      <input
                        type="datetime-local"
                        value={currentActiveSlide.endDate}
                        onChange={(e) =>
                          handleFieldChange(currentActiveSlide.id, 'endDate', e.target.value)
                        }
                        className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-sm focus:outline-none focus:border-[#B8860B] focus:ring-1 focus:ring-[#B8860B] font-mono text-[#0C1322]"
                      />
                      <span className="text-[10px] text-[#64748B] mt-1 block">
                        When auditions/nominations conclude for this slide.
                      </span>
                    </div>
                  </div>
                </div>

                {/* 3. SLIDE DISPLAY DURATION & COUNTDOWN OPTIONS */}
                <div className="border border-neutral-200 p-4 rounded-sm space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#0C1322] flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#B8860B]" />
                    <span>Per-Slide Display Duration &amp; Visual Options</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                    {/* Display Duration Slider */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-semibold text-[#334155]">
                          Slide Display Duration
                        </label>
                        <span className="text-xs font-mono font-bold text-[#B8860B] px-2 py-0.5 bg-[#FAF8F2] border border-[#EADBAC]">
                          {currentActiveSlide.timerDuration} Seconds
                        </span>
                      </div>

                      <input
                        type="range"
                        min="3"
                        max="15"
                        step="1"
                        value={currentActiveSlide.timerDuration}
                        onChange={(e) =>
                          handleFieldChange(
                            currentActiveSlide.id,
                            'timerDuration',
                            parseInt(e.target.value, 10)
                          )
                        }
                        className="w-full accent-[#B8860B] cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-[#64748B]">
                        <span>3s (Fast)</span>
                        <span>7s (Recommended for Posters)</span>
                        <span>15s (Detailed)</span>
                      </div>
                    </div>

                    {/* Toggle: Show Countdown Ribbon */}
                    <div className="pt-2 sm:pt-0">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xs font-semibold text-[#0C1322] block">
                            Live Countdown Ribbon
                          </span>
                          <span className="text-[10px] text-[#526077]">
                            Shows ticking countdown to end date.
                          </span>
                        </div>

                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={currentActiveSlide.showCountdown}
                            onChange={(e) =>
                              handleFieldChange(
                                currentActiveSlide.id,
                                'showCountdown',
                                e.target.checked
                              )
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#B8860B]"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. REDIRECT URL & ACTION DESTINATION */}
                <div className="border border-neutral-200 p-4 rounded-sm space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#0C1322] flex items-center gap-2">
                    <Link2 className="w-4 h-4 text-[#B8860B]" />
                    <span>Redirect URL &amp; Action Destination</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#334155] mb-1">
                        Slide Redirect Destination URL
                      </label>
                      <input
                        type="url"
                        value={currentActiveSlide.ctaUrl}
                        onChange={(e) =>
                          handleFieldChange(currentActiveSlide.id, 'ctaUrl', e.target.value)
                        }
                        placeholder="https://www.fsia.in/..."
                        className="w-full px-3 py-1.5 text-xs border border-neutral-300 rounded-sm focus:outline-none focus:border-[#B8860B] font-mono text-[#0C1322]"
                      />
                      <span className="text-[10px] text-[#64748B] mt-1 block">
                        Clicking anywhere on this slide image or button redirects to this address.
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#334155] mb-1">
                        Button Label / Action Text
                      </label>
                      <input
                        type="text"
                        value={currentActiveSlide.ctaText}
                        onChange={(e) =>
                          handleFieldChange(currentActiveSlide.id, 'ctaText', e.target.value)
                        }
                        placeholder="e.g. Quick Apply 2026"
                        className="w-full px-3 py-1.5 text-xs border border-neutral-300 rounded-sm focus:outline-none focus:border-[#B8860B] text-[#0C1322]"
                      />
                      <span className="text-[10px] text-[#64748B] mt-1 block">
                        Displayed on the announcement CTA button.
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-[#526077]">
                      Redirect target: <strong className="text-[#0C1322] font-mono">{currentActiveSlide.ctaUrl || 'None'}</strong>
                    </span>
                    {currentActiveSlide.ctaUrl && (
                      <a
                        href={currentActiveSlide.ctaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#B8860B] hover:text-[#7E591B]"
                      >
                        <span>Test Redirect Link</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>

                {/* 5. ANNOUNCEMENT TEXT CUSTOMIZATION */}
                <div className="border border-neutral-200 p-4 rounded-sm space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#0C1322] flex items-center gap-2">
                    <Eye className="w-4 h-4 text-[#B8860B]" />
                    <span>Announcement Copy &amp; Details</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#334155] mb-1">
                        Category Tag / Badge
                      </label>
                      <input
                        type="text"
                        value={currentActiveSlide.categoryTag}
                        onChange={(e) =>
                          handleFieldChange(currentActiveSlide.id, 'categoryTag', e.target.value)
                        }
                        className="w-full px-3 py-1.5 text-xs border border-neutral-300 rounded-sm focus:outline-none focus:border-[#B8860B] text-[#0C1322]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#334155] mb-1">
                        Venue / Location
                      </label>
                      <input
                        type="text"
                        value={currentActiveSlide.venue}
                        onChange={(e) =>
                          handleFieldChange(currentActiveSlide.id, 'venue', e.target.value)
                        }
                        className="w-full px-3 py-1.5 text-xs border border-neutral-300 rounded-sm focus:outline-none focus:border-[#B8860B] text-[#0C1322]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#334155] mb-1">
                      Announcement Headline
                    </label>
                    <input
                      type="text"
                      value={currentActiveSlide.title}
                      onChange={(e) =>
                        handleFieldChange(currentActiveSlide.id, 'title', e.target.value)
                      }
                      className="w-full px-3 py-1.5 text-xs border border-neutral-300 rounded-sm focus:outline-none focus:border-[#B8860B] font-display font-bold text-[#0C1322]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#334155] mb-1">
                      Announcement Description
                    </label>
                    <textarea
                      rows={2}
                      value={currentActiveSlide.subtitle}
                      onChange={(e) =>
                        handleFieldChange(currentActiveSlide.id, 'subtitle', e.target.value)
                      }
                      className="w-full px-3 py-1.5 text-xs border border-neutral-300 rounded-sm focus:outline-none focus:border-[#B8860B] font-sans text-[#334155]"
                    />
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 sm:p-4 bg-[#FAF8F2] border-t border-[#EADBAC] flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleResetToDefault}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#7E591B] hover:text-[#0C1322] hover:bg-neutral-100 rounded-sm border border-transparent hover:border-neutral-300 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Official Schedule</span>
            </button>

            {saveFeedback && (
              <span className="text-xs text-emerald-800 font-semibold flex items-center gap-1 bg-emerald-50 px-2 py-1 border border-emerald-200 rounded-xs">
                <Check className="w-3.5 h-3.5" />
                {saveFeedback}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs font-semibold text-[#334155] hover:text-[#0C1322] bg-white border border-neutral-300 hover:bg-neutral-50 rounded-sm transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-1.5 px-5 py-1.5 text-xs font-bold tracking-wider uppercase text-white bg-[#0C1322] hover:bg-[#1A253E] border border-[#D4AF37] rounded-sm shadow-sm transition-colors cursor-pointer"
            >
              <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Save &amp; Apply Changes</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
