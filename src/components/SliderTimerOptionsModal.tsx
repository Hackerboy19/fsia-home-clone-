import React, { useState } from 'react';
import { X, Clock, Calendar, Check, RotateCcw, Play, Pause, Eye, Link2, ExternalLink } from 'lucide-react';

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
  fitMode: 'contain' | 'cover';
  startDate: string; // ISO date string e.g. "2026-08-01T00:00"
  endDate: string;   // ISO date string e.g. "2026-11-30T23:59"
  timerDuration: number; // in seconds (display timer)
  showCountdown: boolean;
}

interface SliderTimerOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  slides: SlideTimerConfig[];
  onSave: (updatedSlides: SlideTimerConfig[]) => void;
  onReset: () => void;
  isAutoPlayActive: boolean;
  onToggleAutoPlay: () => void;
}

export const SliderTimerOptionsModal: React.FC<SliderTimerOptionsModalProps> = ({
  isOpen,
  onClose,
  slides,
  onSave,
  onReset,
  isAutoPlayActive,
  onToggleAutoPlay
}) => {
  const [formData, setFormData] = useState<SlideTimerConfig[]>(slides);
  const [activeTab, setActiveTab] = useState<string>(slides[0]?.id || '');
  const [saveFeedback, setSaveFeedback] = useState<string | null>(null);

  // Sync formData when modal opens or slides update
  React.useEffect(() => {
    setFormData(slides);
    if (!activeTab && slides.length > 0) {
      setActiveTab(slides[0].id);
    }
  }, [slides, isOpen, activeTab]);

  if (!isOpen) return null;

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

  const handleSave = () => {
    onSave(formData);
    setSaveFeedback('Announcement schedule & timers updated successfully!');
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

  const currentActiveSlide = formData.find((s) => s.id === activeTab) || formData[0];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#0C1322]/80 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="timer-modal-title"
    >
      <div className="relative w-full max-w-4xl bg-white border border-[#D4AF37] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-[#FAF8F2] border-b border-[#EADBAC] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm bg-[#0C1322] border border-[#D4AF37] flex items-center justify-center text-[#EADBAC]">
              <Clock className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <div>
              <h2 id="timer-modal-title" className="text-lg sm:text-xl font-display font-bold text-[#0C1322]">
                Announcement Schedule &amp; Slider Timer Options
              </h2>
              <p className="text-xs text-[#526077] font-sans">
                Set individual start and end dates, countdown timers, and slide durations as per need.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-[#526077] hover:text-[#0C1322] hover:bg-neutral-100 rounded-sm transition-colors cursor-pointer"
            aria-label="Close Options"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Global Controls Strip */}
        <div className="px-4 py-2.5 bg-neutral-50 border-b border-neutral-200 flex flex-wrap items-center justify-between gap-3 text-xs font-sans shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[#526077] font-medium">Auto-Advance Slider:</span>
            <button
              type="button"
              onClick={onToggleAutoPlay}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-sm border font-semibold transition-colors cursor-pointer ${
                isAutoPlayActive
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                  : 'bg-neutral-200 border-neutral-300 text-neutral-700'
              }`}
            >
              {isAutoPlayActive ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>Timer Running</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Timer Paused</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center gap-2 text-[#526077]">
            <Calendar className="w-3.5 h-3.5 text-[#B8860B]" />
            <span>Pan-India Class 41 Timeline Scheduler</span>
          </div>
        </div>

        {/* Modal Body: Slide Tabs + Config Form */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-12 min-h-0">
          
          {/* Left Slide Selector Tabs */}
          <div className="md:col-span-4 border-r border-[#EADBAC] bg-[#FAF9F5] p-3 space-y-2 overflow-y-auto">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#7E591B] block px-2 pb-1">
              Select Announcement Slide
            </span>

            {formData.map((slide, index) => {
              const status = computeStatus(slide.startDate, slide.endDate);
              const isSelected = slide.id === activeTab;
              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setActiveTab(slide.id)}
                  className={`w-full text-left p-2.5 rounded-sm border transition-all cursor-pointer flex items-start gap-2.5 ${
                    isSelected
                      ? 'bg-white border-[#B8860B] shadow-sm'
                      : 'bg-white/60 hover:bg-white border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className="w-12 h-12 bg-neutral-900 shrink-0 border border-neutral-300 overflow-hidden relative">
                    <img
                      src={slide.image}
                      alt=""
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <span className="text-[10px] font-mono font-bold text-[#B8860B]">
                        Slide {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="text-[9px] px-1.5 py-0.2 border rounded-xs font-semibold truncate max-w-[110px]">
                        {slide.timerDuration}s duration
                      </span>
                    </div>

                    <h4 className="text-xs font-semibold text-[#0C1322] font-display truncate">
                      {slide.title}
                    </h4>

                    <span className={`inline-block text-[9px] px-1.5 py-0.5 border rounded-xs mt-1 truncate ${status.color}`}>
                      {status.text}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Slide Configuration Details */}
          <div className="md:col-span-8 p-4 sm:p-6 overflow-y-auto bg-white">
            {currentActiveSlide && (
              <div className="space-y-6">
                
                {/* Active Slide Header & Preview */}
                <div className="p-3 bg-[#FAF8F2] border border-[#EADBAC] flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#B8860B] block">
                      Currently Editing • {currentActiveSlide.categoryTag}
                    </span>
                    <h3 className="text-base font-display font-bold text-[#0C1322] truncate mt-0.5">
                      {currentActiveSlide.title}
                    </h3>
                  </div>

                  <div className="shrink-0 text-right">
                    <span className="text-[10px] text-[#526077] block font-sans">Active Status</span>
                    <span className={`inline-block text-[11px] px-2 py-0.5 border rounded-xs mt-0.5 ${computeStatus(currentActiveSlide.startDate, currentActiveSlide.endDate).color}`}>
                      {computeStatus(currentActiveSlide.startDate, currentActiveSlide.endDate).text}
                    </span>
                  </div>
                </div>

                {/* Date & Timer Schedule Settings */}
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

                {/* Slide Display Duration & Countdown Options */}
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

                    {/* Image Fit Mode */}
                    <div>
                      <label className="block text-xs font-semibold text-[#334155] mb-1">
                        Image Fit Mode
                      </label>
                      <select
                        value={currentActiveSlide.fitMode}
                        onChange={(e) =>
                          handleFieldChange(
                            currentActiveSlide.id,
                            'fitMode',
                            e.target.value as 'contain' | 'cover'
                          )
                        }
                        className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-sm focus:outline-none focus:border-[#B8860B] text-[#0C1322]"
                      >
                        <option value="contain">
                          Full View (Contain - No Poster Cropping)
                        </option>
                        <option value="cover">
                          Fill Container (Cover - Stage Vista)
                        </option>
                      </select>
                      <span className="text-[10px] text-[#64748B] mt-1 block">
                        Contain preserves 100% of flyer and poster text without cropping.
                      </span>
                    </div>
                  </div>

                  {/* Toggle: Show Countdown Ribbon */}
                  <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold text-[#0C1322] block">
                        Display Live Countdown Timer on Slide
                      </span>
                      <span className="text-[11px] text-[#526077]">
                        Shows ticking countdown (Days : Hours : Mins : Secs) to the end date.
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

                {/* Announcement Headline & Venue Text Customization */}
                <div className="border border-neutral-200 p-4 rounded-sm space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#0C1322] flex items-center gap-2">
                    <Eye className="w-4 h-4 text-[#B8860B]" />
                    <span>Announcement Copy &amp; Details</span>
                  </h4>

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
                      Venue &amp; Audition Details
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

                {/* Redirect URL & Action Destination Settings */}
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
                      <div className="relative">
                        <input
                          type="url"
                          value={currentActiveSlide.ctaUrl}
                          onChange={(e) =>
                            handleFieldChange(currentActiveSlide.id, 'ctaUrl', e.target.value)
                          }
                          placeholder="https://www.fsia.in/..."
                          className="w-full px-3 py-1.5 text-xs border border-neutral-300 rounded-sm focus:outline-none focus:border-[#B8860B] font-mono text-[#0C1322]"
                        />
                      </div>
                      <span className="text-[10px] text-[#64748B] mt-1 block">
                        Clicking anywhere on this slide image or button redirects to this web address.
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

                  {/* Quick test link */}
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
                        <span>Test Link</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#FAF8F2] border-t border-[#EADBAC] flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleResetToDefault}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#7E591B] hover:text-[#0C1322] hover:bg-neutral-100 rounded-sm border border-transparent hover:border-neutral-300 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Official Schedule</span>
            </button>

            {saveFeedback && (
              <span className="text-xs text-emerald-800 font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                {saveFeedback}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-[#334155] hover:text-[#0C1322] bg-white border border-neutral-300 hover:bg-neutral-50 rounded-sm transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold tracking-wider uppercase text-white bg-[#0C1322] hover:bg-[#1A253E] border border-[#D4AF37] rounded-sm shadow-sm transition-colors cursor-pointer"
            >
              <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Save &amp; Apply Schedule</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
