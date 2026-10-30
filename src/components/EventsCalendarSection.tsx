import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Download,
  Search,
  Check,
  Award,
  Crown,
  Filter,
  CalendarPlus,
  Info,
  X,
  Share2
} from 'lucide-react';
import { UPCOMING_EVENTS as DEFAULT_EVENTS } from '../data/fsiaData';
import { cmsField, cmsHeader, cmsList } from '../lib/cms';
import { linkProps, richText } from '../lib/richText';
import { DEFAULT_CALENDAR_TEXT } from '../data/homeContent';

// Headings and fixed text, edited under Homepage -> Event Calendar.
const HEAD = cmsHeader('calendar_events', DEFAULT_CALENDAR_TEXT);

// Events come from the CMS admin (Homepage -> Event Calendar), sorted by date.
const UPCOMING_EVENTS: EventCalendarItem[] = [...cmsList<EventCalendarItem>('calendar_events', DEFAULT_EVENTS)]
  .filter((e) => e && /^\d{4}-\d{2}-\d{2}$/.test(e.date || ''))
  .map((e) => ({ ...e, highlights: Array.isArray(e.highlights) ? e.highlights : [] }))
  .sort((a, b) => a.date.localeCompare(b.date));

// Event types: the built-in ones plus any added in the CMS (Event Calendar -> Event types).
// Filter buttons and the colour key list only the types some event uses.
type EventType = { id: string; label: string; badge: string; color: string };
const BUILT_IN_TYPES: EventType[] = [
  { id: 'audition', label: 'Auditions & Screenings', badge: 'City Audition', color: '#059669' },
  { id: 'workshop', label: 'Masterclasses & Camps', badge: 'Camp / Masterclass', color: '#059669' },
  { id: 'pageant', label: 'Pageant Finales', badge: 'National Pageant', color: '#A6093D' },
  { id: 'award', label: 'National Awards', badge: 'National Award', color: '#B8860B' },
  { id: 'ceremony', label: 'Coronation Galas', badge: 'Grand Coronation / Ceremony', color: '#A6093D' },
];
const CUSTOM_TYPES: EventType[] = (() => {
  const raw = cmsField<unknown>('calendar_events', 'types', []);
  return (Array.isArray(raw) ? raw : [])
    .filter((t): t is { value: string; label: string; color?: string } =>
      !!t && typeof t.value === 'string' && typeof t.label === 'string' && t.label.trim() !== '' && !BUILT_IN_TYPES.some((b) => b.id === t.value))
    .map((t) => ({
      id: t.value,
      label: t.label.trim(),
      badge: t.label.trim(),
      color: /^#[0-9a-f]{6}$/i.test(t.color || '') ? (t.color as string) : '#64748B',
    }));
})();
const ALL_TYPES = [...BUILT_IN_TYPES, ...CUSTOM_TYPES];
const USED_TYPES = ALL_TYPES.filter((t) => UPCOMING_EVENTS.some((e) => e.type === t.id));
const typeInfo = (id: string): EventType =>
  ALL_TYPES.find((t) => t.id === id) || { id, label: 'Official Event', badge: 'Official Event', color: '#059669' };

// PDF / PPT attached to an event in the CMS (brochure, schedule, rules).
// Clicking opens it inside the page (DocViewer) instead of downloading it.
type DocKind = 'PDF' | 'PPT';
type OpenDoc = { kind: DocKind; url: string; title: string };
const safeDocUrl = (u?: string) => (typeof u === 'string' && /^(https?:\/\/|\/(?!\/))/i.test(u.trim()) ? u.trim() : '');
const DOC_COLOR: Record<DocKind, string> = { PDF: '#DC2626', PPT: '#EA580C' };
const DocLinks: React.FC<{ event: EventCalendarItem; className: string; onOpen: (d: OpenDoc) => void }> = ({ event, className, onOpen }) => (
  <>
    {([['PDF', event.pdfUrl], ['PPT', event.pptUrl]] as [DocKind, string | undefined][]).map(([kind, url]) =>
      safeDocUrl(url) ? (
        <button key={kind} type="button" onClick={() => onOpen({ kind, url: safeDocUrl(url), title: event.title })} className={className} title={`View ${kind}`}>
          <span className="text-[9px] font-extrabold text-white rounded px-1 py-0.5" style={{ backgroundColor: DOC_COLOR[kind] }}>{kind}</span>
          <span>View {kind}</span>
        </button>
      ) : null
    )}
  </>
);

// pdf.js draws each PDF page as an image, so PDFs show the same on phones and computers.
const PDFJS = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/';
type PdfJs = {
  GlobalWorkerOptions: { workerSrc: string };
  getDocument: (url: string) => { promise: Promise<{ numPages: number; getPage: (n: number) => Promise<{
    getViewport: (o: { scale: number }) => { width: number; height: number };
    render: (o: { canvasContext: CanvasRenderingContext2D; viewport: unknown }) => { promise: Promise<void> };
  }> }> };
};
let pdfJsLoading: Promise<PdfJs> | null = null;
function loadPdfJs(): Promise<PdfJs> {
  const w = window as unknown as { pdfjsLib?: PdfJs };
  if (w.pdfjsLib) return Promise.resolve(w.pdfjsLib);
  if (!pdfJsLoading) {
    pdfJsLoading = new Promise((ok, fail) => {
      const sc = document.createElement('script');
      sc.src = `${PDFJS}pdf.min.js`;
      sc.onload = () => { w.pdfjsLib!.GlobalWorkerOptions.workerSrc = `${PDFJS}pdf.worker.min.js`; ok(w.pdfjsLib!); };
      sc.onerror = () => { pdfJsLoading = null; fail(new Error('pdf.js')); };
      document.head.appendChild(sc);
    });
  }
  return pdfJsLoading;
}

const PdfPages: React.FC<{ url: string }> = ({ url }) => {
  const box = React.useRef<HTMLDivElement>(null);
  const [state, setState] = useState<'loading' | 'ok' | 'error'>('loading');
  React.useEffect(() => {
    let alive = true;
    const host = box.current;
    if (!host) return undefined;
    host.textContent = '';
    loadPdfJs()
      .then((lib) => lib.getDocument(url).promise)
      .then(async (pdf) => {
        if (alive) setState('ok');
        const scale = Math.min(2, (window.devicePixelRatio || 1) * 1.5);
        for (let n = 1; n <= pdf.numPages && alive; n++) {
          const pg = await pdf.getPage(n);
          const vp = pg.getViewport({ scale });
          const cv = document.createElement('canvas');
          cv.width = vp.width; cv.height = vp.height;
          cv.style.width = `${vp.width / scale}px`;
          cv.className = 'block max-w-full !h-auto mx-auto mb-3 bg-white shadow-md';
          host.appendChild(cv);
          await pg.render({ canvasContext: cv.getContext('2d')!, viewport: vp }).promise;
        }
      })
      .catch(() => alive && setState('error'));
    return () => { alive = false; };
  }, [url]);
  return (
    <div className="flex-1 overflow-auto bg-stone-200 p-3 text-center">
      {state === 'loading' && <p className="py-10 text-sm text-stone-600">Loading…</p>}
      {state === 'error' && <p className="py-10 text-sm text-stone-600">This file could not be shown here. Use Download to open it.</p>}
      <div ref={box} />
    </div>
  );
};

const DocViewer: React.FC<{ doc: OpenDoc; onClose: () => void }> = ({ doc, onClose }) => {
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [onClose]);
  // Rendered on <body> so the site header and ticker never sit on top of it.
  return createPortal(
    <div style={{ zIndex: 2147483646 }} className="fixed inset-0 flex items-center justify-center p-2 sm:p-6 bg-black/70" role="dialog" aria-modal="true" aria-label={`${doc.kind}: ${doc.title}`} onClick={onClose}>
      <div className="flex flex-col w-full max-w-5xl h-[92vh] bg-white rounded-2xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 px-4 py-3 border-b border-stone-200">
          <span className="text-[10px] font-extrabold text-white rounded px-1.5 py-0.5" style={{ backgroundColor: DOC_COLOR[doc.kind] }}>{doc.kind}</span>
          <span className="flex-1 min-w-0 truncate text-sm font-semibold text-[#0C1322]">{doc.title}</span>
          <a href={doc.url} download target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 text-xs font-medium text-stone-700 border border-stone-200 rounded-lg hover:bg-stone-50 flex items-center gap-1.5">
            <Download className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Download</span>
          </a>
          <button type="button" onClick={onClose} aria-label="Close" className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center">
            <X className="w-4 h-4" />
          </button>
        </div>
        {doc.kind === 'PPT' ? (
          // PowerPoint has no viewer in the browser: Microsoft's free Office viewer shows it (the file must be public).
          <iframe
            src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(new URL(doc.url, window.location.href).href)}`}
            title={`${doc.kind}: ${doc.title}`}
            className="flex-1 w-full bg-stone-100"
          />
        ) : (
          <PdfPages url={new URL(doc.url, window.location.href).href} />
        )}
      </div>
    </div>,
    document.body
  );
};

const pad = (n: number) => String(n).padStart(2, '0');
const TODAY = (() => { const d = new Date(); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; })();
// Open on the next upcoming event (or today when nothing is scheduled ahead).
const START_DATE = (UPCOMING_EVENTS.find((e) => e.date >= TODAY) || { date: TODAY }).date;
import { EventCalendarItem } from '../types';
import { FSIAImage } from './FSIAImage';

interface EventsCalendarSectionProps {
  onSelectEvent?: (event: EventCalendarItem) => void;
  onExplorePageants?: () => void;
  onExploreAwards?: () => void;
}

type EventFilterType = string;
type ViewMode = 'grid' | 'agenda';

export const EventsCalendarSection: React.FC<EventsCalendarSectionProps> = ({
  onSelectEvent,
  onExplorePageants,
  onExploreAwards
}) => {
  // Current reference date: September 2026
  const [currentYear, setCurrentYear] = useState<number>(Number(START_DATE.slice(0, 4)));
  const [currentMonth, setCurrentMonth] = useState<number>(Number(START_DATE.slice(5, 7)) - 1); // 0-indexed
  const [selectedDate, setSelectedDate] = useState<string>(START_DATE);
  const [activeFilter, setActiveFilter] = useState<EventFilterType>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [detailModalEvent, setDetailModalEvent] = useState<EventCalendarItem | null>(null);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  const [openDoc, setOpenDoc] = useState<OpenDoc | null>(null);
  const closeDoc = React.useCallback(() => setOpenDoc(null), []);

  // Month names
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Filter events based on active category filter and search query
  const filteredEvents = useMemo(() => {
    return UPCOMING_EVENTS.filter((event) => {
      const matchesFilter =
        activeFilter === 'all' ? true : event.type === activeFilter;

      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        q === ''
          ? true
          : event.title.toLowerCase().includes(q) ||
            event.category.toLowerCase().includes(q) ||
            event.city.toLowerCase().includes(q) ||
            event.venue.toLowerCase().includes(q) ||
            event.description.toLowerCase().includes(q) ||
            (event.keywords || []).some((k) => k.toLowerCase().includes(q));

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  // Days that match the active category filter or search keyword
  const isFiltering = activeFilter !== 'all' || searchQuery.trim() !== '';
  const matchingDates = useMemo(() => new Set(filteredEvents.map((e) => e.date)), [filteredEvents]);

  // Map of events by date string "YYYY-MM-DD"
  const eventsByDate = useMemo(() => {
    const map: Record<string, EventCalendarItem[]> = {};
    UPCOMING_EVENTS.forEach((item) => {
      if (!map[item.date]) {
        map[item.date] = [];
      }
      map[item.date].push(item);
    });
    return map;
  }, []);

  // Filtered events on the currently selected date
  const selectedDateEvents = useMemo(() => {
    return (eventsByDate[selectedDate] || []).filter((event) => {
      if (activeFilter === 'all') return true;
      return event.type === activeFilter;
    });
  }, [eventsByDate, selectedDate, activeFilter]);

  // Navigate to previous month
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  // Navigate to next month
  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  // Jump to today / reference date (September/October 2026)
  const handleJumpToCurrent = () => {
    // "Season Peak" = first upcoming event marked Featured in the CMS, else the next event.
    const peak = (UPCOMING_EVENTS.find((e) => e.highlight && e.date >= TODAY) || UPCOMING_EVENTS.find((e) => e.date >= TODAY))?.date || START_DATE;
    setCurrentYear(Number(peak.slice(0, 4)));
    setCurrentMonth(Number(peak.slice(5, 7)) - 1);
    setSelectedDate(peak);
  };

  // Calculate calendar grid days
  const calendarGrid = useMemo(() => {
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

    const days = [];

    // Previous month trailing days
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const dayNum = daysInPrevMonth - i;
      const prevMonthIndex = currentMonth === 0 ? 11 : currentMonth - 1;
      const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
      const dateStr = `${prevYear}-${String(prevMonthIndex + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
      days.push({
        dayNumber: dayNum,
        dateString: dateStr,
        isCurrentMonth: false,
        events: eventsByDate[dateStr] || []
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      days.push({
        dayNumber: i,
        dateString: dateStr,
        isCurrentMonth: true,
        events: eventsByDate[dateStr] || []
      });
    }

    // Next month leading days to complete the 35 or 42 grid cells
    const remainingCells = (7 - (days.length % 7)) % 7;
    for (let i = 1; i <= remainingCells; i++) {
      const nextMonthIndex = currentMonth === 11 ? 0 : currentMonth + 1;
      const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
      const dateStr = `${nextYear}-${String(nextMonthIndex + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      days.push({
        dayNumber: i,
        dateString: dateStr,
        isCurrentMonth: false,
        events: eventsByDate[dateStr] || []
      });
    }

    return days;
  }, [currentYear, currentMonth, eventsByDate]);

  // Helper to format date display (e.g. "Monday, October 5, 2026")
  const formatFullDate = (dateStr: string) => {
    try {
      const [year, month, day] = dateStr.split('-').map(Number);
      const d = new Date(year, month - 1, day);
      return d.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  // Helper to get relative label or countdown text
  const getEventBadgeLabel = (type: EventCalendarItem['type']) => typeInfo(type).badge;

  // Generate Google Calendar Link
  const getGoogleCalendarUrl = (event: EventCalendarItem) => {
    const dateCompact = event.date.replace(/-/g, '');
    const title = encodeURIComponent(event.title);
    const details = encodeURIComponent(
      `${event.description}\n\nCategory: ${event.category}\nTime: ${event.time}\nHighlights: ${event.highlights.join('; ')}\nOfficial Portal: ${event.ctaUrl}`
    );
    const location = encodeURIComponent(`${event.venue}, ${event.city}`);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dateCompact}/${dateCompact}&details=${details}&location=${location}`;
  };

  // Download iCal (.ics) file
  const handleDownloadIcs = (event: EventCalendarItem) => {
    const dateCompact = event.date.replace(/-/g, '');
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Forever Star India Awards & Pageants//Event Calendar//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:fsia-${event.id}-${dateCompact}@fsia.in`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `DTSTART;VALUE=DATE:${dateCompact}`,
      `DTEND;VALUE=DATE:${dateCompact}`,
      `SUMMARY:${event.title.replace(/[,;]/g, ' ')}`,
      `DESCRIPTION:${event.description.replace(/\n/g, ' ')} - Category: ${event.category} - Time: ${event.time}`,
      `LOCATION:${event.venue.replace(/[,;]/g, ' ')}, ${event.city}`,
      `URL:${event.ctaUrl}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `FSIA-${event.id}-${dateCompact}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Copy shareable event info
  const handleCopyEvent = (event: EventCalendarItem) => {
    const text = `FSIA Event: ${event.title}\nDate: ${formatFullDate(event.date)}\nTime: ${event.time}\nVenue: ${event.venue}, ${event.city}\nOfficial Link: ${event.ctaUrl}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopyFeedback(event.id);
      setTimeout(() => setCopyFeedback(null), 2400);
    }
  };

  // Quick jump to next event
  const handleJumpToNextUpcoming = () => {
    const todayStr = TODAY;
    const next = UPCOMING_EVENTS.find((e) => e.date >= todayStr);
    if (next) {
      const [y, m] = next.date.split('-').map(Number);
      setCurrentYear(y);
      setCurrentMonth(m - 1);
      setSelectedDate(next.date);
    }
  };

  return (
    <section
      id="schedule"
      className="py-20 md:py-24 bg-[#FAF9F5] relative border-b border-[#EADBAC]/60 scroll-mt-24"
      aria-label="Official FSIA Event Calendar"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 pb-6 border-b border-[#EADBAC]/80">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs uppercase tracking-widest text-[#B8860B] font-semibold mb-3">
              <CalendarIcon className="w-4 h-4 text-[#B8860B]" />
              <span>{HEAD.badge}</span>
              {HEAD.badge2 && <span className="text-[#A6093D] font-bold">{HEAD.badge2}</span>}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0C1322] tracking-tight leading-tight">
              {HEAD.title}
            </h2>
            <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {richText(HEAD.subtitle)}
            </p>
          </div>

          {/* Quick Metrics (no "|" separators: they dangle when the row wraps) */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-stone-600">
            {(Array.isArray(HEAD.highlights) ? HEAD.highlights : []).map((h, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: h.color || '#D4AF37' }} />
                <span className="font-semibold text-stone-900">{h.value}</span>
                <span>{h.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Control Strip: View Mode & Category Filters */}
        <div className="bg-white border border-[#EADBAC]/80 rounded-2xl p-4 sm:p-5 shadow-sm mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* View Mode Segmented Controls */}
            <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-xl w-fit">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                  viewMode === 'grid'
                    ? 'bg-white text-[#0C1322] shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
                aria-pressed={viewMode === 'grid'}
              >
                <CalendarIcon className="w-3.5 h-3.5 text-[#B8860B]" />
                <span>Month Calendar</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('agenda')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                  viewMode === 'agenda'
                    ? 'bg-white text-[#0C1322] shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
                aria-pressed={viewMode === 'agenda'}
              >
                <Clock className="w-3.5 h-3.5 text-[#B8860B]" />
                <span>Agenda Timeline ({UPCOMING_EVENTS.length})</span>
              </button>
            </div>

            {/* Category Filter Buttons */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {[{ id: 'all', label: 'All Dates' }, ...USED_TYPES].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveFilter(tab.id as EventFilterType)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                    activeFilter === tab.id
                      ? 'bg-[#A6093D] text-white shadow-xs'
                      : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200/80'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Keyword Search Input */}
            <div className="relative min-w-[220px] sm:w-64">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search city, award, pageant…"
                className="w-full pl-8 pr-7 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-[#B8860B] focus:bg-white text-stone-800 placeholder-stone-400 transition-colors"
                aria-label="Filter events by search"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                  aria-label="Clear search"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* VIEW 1: MONTH CALENDAR GRID + DAY EVENT INSPECTOR */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column (7 cols): Interactive Calendar Grid */}
            <div className="lg:col-span-7 bg-white border border-[#EADBAC]/80 rounded-2xl p-5 sm:p-6 shadow-sm">
              
              {/* Month Navigation Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-100">
                <div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#0C1322] tracking-tight">
                    {monthNames[currentMonth]} {currentYear}
                  </h3>
                  <div className="text-xs text-stone-500 mt-0.5">
                    Click any highlighted day to inspect scheduled official activities
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleJumpToCurrent}
                    className="px-2.5 py-1 text-xs font-medium text-[#B8860B] hover:text-[#A6093D] hover:bg-stone-50 rounded-md border border-stone-200 transition-colors"
                    title="Jump to Season Peak"
                  >
                    Season Peak
                  </button>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={handlePrevMonth}
                      className="p-1.5 rounded-lg border border-stone-200 hover:bg-stone-50 text-stone-700 hover:text-[#0C1322] transition-colors"
                      aria-label="Previous Month"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextMonth}
                      className="p-1.5 rounded-lg border border-stone-200 hover:bg-stone-50 text-stone-700 hover:text-[#0C1322] transition-colors"
                      aria-label="Next Month"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Day-of-Week Column Headers */}
              <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2 text-center">
                {daysOfWeek.map((day) => (
                  <div
                    key={day}
                    className="py-1.5 text-xs font-semibold tracking-wider text-stone-400 uppercase font-mono"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Day Cells Grid */}
              <div className="grid grid-cols-7 gap-1 sm:gap-2" role="grid">
                {calendarGrid.map((cell, idx) => {
                  const hasEvents = cell.events.length > 0;
                  const isMatch = isFiltering && matchingDates.has(cell.dateString);
                  const isDimmed = isFiltering && hasEvents && !isMatch;
                  const isFeatured = cell.events.some((e) => e.highlight);
                  const isSelected = cell.dateString === selectedDate;
                  const isCurrentDay = cell.dateString === TODAY;

                  // Determine event type color indicator
                  const eventColor = typeInfo(cell.events[0]?.type || '').color;

                  return (
                    <button
                      key={`${cell.dateString}-${idx}`}
                      type="button"
                      onClick={() => setSelectedDate(cell.dateString)}
                      className={`min-h-[54px] sm:min-h-[70px] p-1.5 sm:p-2 rounded-xl flex flex-col justify-between items-start text-left transition-all relative border ${
                        isSelected
                          ? 'bg-[#A6093D]/10 border-[#A6093D] shadow-sm ring-2 ring-[#A6093D]/20'
                          : hasEvents
                          ? 'bg-amber-50/40 hover:bg-amber-50 border-[#EADBAC] hover:border-[#B8860B]'
                          : cell.isCurrentMonth
                          ? 'bg-white hover:bg-stone-50 border-stone-100 text-stone-800'
                          : 'bg-stone-50/60 border-transparent text-stone-300'
                      } ${isMatch && !isSelected ? 'ring-2 ring-[#D4AF37] border-[#B8860B]' : ''} ${isDimmed ? 'opacity-40' : ''}`}
                      aria-label={`${cell.dateString} ${hasEvents ? `- ${cell.events.length} event(s)` : ''}${isFeatured ? ' (featured)' : ''}`}
                    >
                      {/* Day Number and Today Indicator */}
                      <div className="w-full flex items-center justify-between">
                        <span
                          className={`text-xs sm:text-sm font-mono tabular-nums font-semibold ${
                            isSelected
                              ? 'text-[#A6093D] font-bold'
                              : cell.isCurrentMonth
                              ? 'text-stone-800'
                              : 'text-stone-400'
                          }`}
                        >
                          {cell.dayNumber}
                        </span>

                        {isFeatured && !isCurrentDay && (
                          <span className="text-[10px] leading-none text-[#B8860B]" title="Featured event" aria-hidden="true">★</span>
                        )}
                        {isCurrentDay && (
                          <span
                            className="text-[9px] uppercase font-bold px-1 py-0.2 bg-[#A6093D] text-white rounded"
                            title="Reference Date: Today"
                          >
                            Today
                          </span>
                        )}
                      </div>

                      {/* Event Indicator Pills / Titles */}
                      {hasEvents && (
                        <div className="w-full mt-1">
                          <div className="hidden sm:block">
                            <div
                              className="text-[10px] font-medium leading-tight truncate px-1 py-0.5 rounded text-white"
                              style={{ backgroundColor: eventColor }}
                            >
                              {cell.events[0].category.replace('Forever ', '')}
                            </div>
                            {cell.events.length > 1 && (
                              <div className="text-[9px] text-stone-500 font-medium mt-0.5">
                                +{cell.events.length - 1} more
                              </div>
                            )}
                          </div>

                          {/* Mobile compact dot indicator */}
                          <div className="sm:hidden flex items-center gap-1 mt-auto">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: eventColor }} />
                            {cell.events.length > 1 && (
                              <span className="text-[9px] font-bold text-stone-600">
                                {cell.events.length}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Calendar Legend & Key */}
              <div className="mt-6 pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-600">
                <div className="flex flex-wrap items-center gap-4">
                  {USED_TYPES.map((t) => (
                    <div key={t.id} className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: t.color }} />
                      <span>{t.label}</span>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleJumpToNextUpcoming}
                  className="text-[#B8860B] hover:text-[#A6093D] font-medium flex items-center gap-1 transition-colors"
                >
                  <span>Next Upcoming Date</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right Column (5 cols): Selected Day Event Inspector */}
            <div className="lg:col-span-5 bg-white border border-[#EADBAC]/80 rounded-2xl p-5 sm:p-6 shadow-sm">
              
              {/* Day Header */}
              <div className="border-b border-stone-100 pb-4 mb-5">
                <div className="text-xs uppercase tracking-widest text-[#B8860B] font-semibold font-mono">
                  Event Day Inspector
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#0C1322] mt-1">
                  {formatFullDate(selectedDate)}
                </h3>
                <div className="text-xs text-stone-500 mt-1">
                  {selectedDateEvents.length === 0
                    ? 'No scheduled official sessions on this selected date.'
                    : `${selectedDateEvents.length} official event scheduled for this date.`}
                </div>
              </div>

              {/* Events for this day */}
              {selectedDateEvents.length > 0 ? (
                <div className="space-y-6">
                  {selectedDateEvents.map((event) => (
                    <div
                      key={event.id}
                      className="border border-stone-200/90 rounded-xl p-4 bg-stone-50/40 hover:bg-white hover:border-[#B8860B]/60 transition-all duration-200 group"
                    >
                      {/* Event Banner / Thumbnail */}
                      <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden mb-4 bg-stone-900">
                        <FSIAImage
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs">
                          <span className="font-semibold truncate pr-2">
                            {event.category}
                          </span>
                          <span className="text-[11px] px-2 py-0.5 bg-black/60 backdrop-blur-xs rounded text-amber-200 font-mono shrink-0">
                            {event.status.replace('_', ' ').toUpperCase()}
                          </span>
                        </div>
                      </div>

                      {/* Event Title */}
                      <h4 className="text-lg font-serif font-bold text-[#0C1322] leading-snug group-hover:text-[#A6093D] transition-colors">
                        {event.title}
                      </h4>

                      {/* Metadata: Time & Venue */}
                      <div className="mt-3 space-y-1.5 text-xs text-stone-600">
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-[#B8860B] shrink-0" />
                          <span className="font-medium text-stone-800 font-mono">{event.time}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin className="w-3.5 h-3.5 text-[#A6093D] shrink-0 mt-0.5" />
                          <span>{event.venue}, <b>{event.city}</b></span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="mt-3 text-xs text-stone-600 leading-relaxed">
                        {event.description}
                      </p>

                      {/* Key Highlights */}
                      <div className="mt-4 pt-3 border-t border-stone-200/80">
                        <div className="text-[11px] uppercase tracking-wider font-semibold text-stone-500 mb-2 font-mono">
                          Key Program Highlights
                        </div>
                        <ul className="space-y-1.5">
                          {event.highlights.map((h, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-stone-700">
                              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Action Handlers */}
                      <div className="mt-5 pt-3 border-t border-stone-200 flex flex-wrap items-center gap-2">
                        <a
                          href={event.ctaUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 min-w-[130px] px-3.5 py-2 text-xs font-semibold text-center text-white bg-[#A6093D] hover:bg-[#880732] rounded-lg transition-colors shadow-xs flex items-center justify-center gap-1.5"
                        >
                          <span>{event.ctaText}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>

                        {/* Add to Google Calendar */}
                        <a
                          href={getGoogleCalendarUrl(event)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-xs font-medium text-stone-700 bg-white hover:bg-stone-100 border border-stone-200 rounded-lg transition-colors flex items-center gap-1.5"
                          title="Add to Google Calendar"
                          aria-label="Add to Google Calendar"
                        >
                          <CalendarPlus className="w-4 h-4 text-[#B8860B]" />
                          <span className="hidden sm:inline">Google Cal</span>
                        </a>

                        {/* Download .ics */}
                        <button
                          type="button"
                          onClick={() => handleDownloadIcs(event)}
                          className="p-2 text-xs font-medium text-stone-700 bg-white hover:bg-stone-100 border border-stone-200 rounded-lg transition-colors flex items-center gap-1.5"
                          title="Download Apple / Outlook iCal (.ics)"
                          aria-label="Download Apple or Outlook Calendar (.ics)"
                        >
                          <Download className="w-4 h-4 text-stone-600" />
                          <span className="hidden sm:inline">.ICS</span>
                        </button>

                        <DocLinks event={event} onOpen={setOpenDoc} className="p-2 text-xs font-medium text-stone-700 bg-white hover:bg-stone-100 border border-stone-200 rounded-lg transition-colors flex items-center gap-1.5" />

                        {/* Copy / Share */}
                        <button
                          type="button"
                          onClick={() => handleCopyEvent(event)}
                          className="p-2 text-xs font-medium text-stone-700 bg-white hover:bg-stone-100 border border-stone-200 rounded-lg transition-colors"
                          title="Share Event Details"
                          aria-label="Copy event details"
                        >
                          {copyFeedback === event.id ? (
                            <Check className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Share2 className="w-4 h-4 text-stone-600" />
                          )}
                        </button>

                        {/* Open Detailed Modal */}
                        <button
                          type="button"
                          onClick={() => setDetailModalEvent(event)}
                          className="w-full mt-1.5 py-1.5 text-xs text-[#B8860B] hover:text-[#A6093D] font-medium border border-stone-200 hover:border-[#B8860B] bg-white rounded-lg transition-colors flex items-center justify-center gap-1"
                        >
                          <Info className="w-3.5 h-3.5" />
                          <span>View Comprehensive Day Schedule</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Empty state when no events on selected date */
                <div className="py-12 px-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-3 text-stone-400">
                    <CalendarIcon className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-serif font-bold text-stone-800">
                    No Public Sessions Scheduled
                  </h4>
                  <p className="mt-1 text-xs text-stone-500 max-w-xs mx-auto leading-relaxed">
                    This day is reserved for city-level screening processing and technical stage preparation. Jump to our next active event date below.
                  </p>
                  <button
                    type="button"
                    onClick={handleJumpToNextUpcoming}
                    className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#A6093D] bg-[#A6093D]/10 hover:bg-[#A6093D]/20 rounded-lg transition-colors"
                  >
                    <span>Inspect Next Upcoming Event</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* VIEW 2: AGENDA TIMELINE (Chronological Stream View) */}
        {viewMode === 'agenda' && (
          <div className="bg-white border border-[#EADBAC]/80 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-100">
              <div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#0C1322]">
                  Chronological Event Timeline
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Showing {filteredEvents.length} official dates matching your selected criteria.
                </p>
              </div>

              {activeFilter !== 'all' && (
                <button
                  type="button"
                  onClick={() => setActiveFilter('all')}
                  className="text-xs text-[#A6093D] hover:underline font-medium"
                >
                  Clear Filters
                </button>
              )}
            </div>

            {filteredEvents.length > 0 ? (
              <div className="space-y-6">
                {filteredEvents.map((event) => {
                  const [y, m, d] = event.date.split('-');
                  const monthShort = monthNames[parseInt(m, 10) - 1]?.slice(0, 3).toUpperCase();

                  return (
                    <div
                      key={event.id}
                      className="border border-stone-200/90 rounded-xl p-4 sm:p-6 bg-stone-50/40 hover:bg-white hover:border-[#B8860B] transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-6 group"
                    >
                      {/* Left: Date Block & Event Info */}
                      <div className="flex items-start gap-4 sm:gap-6">
                        {/* Big Date Block */}
                        <div className="flex flex-col items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gradient-to-br from-[#0C1322] to-[#1E293B] text-white shrink-0 shadow-xs">
                          <span className="text-[10px] sm:text-xs font-bold tracking-widest text-amber-300 font-mono">
                            {monthShort}
                          </span>
                          <span className="text-xl sm:text-3xl font-serif font-bold leading-none my-0.5">
                            {d}
                          </span>
                          <span className="text-[9px] text-stone-400 font-mono">
                            {y}
                          </span>
                        </div>

                        {/* Title and Metadata */}
                        <div>
                          {/* Inline text, "·" glued to the previous part: it never starts or ends a wrapped line alone. */}
                          <div className="mb-1.5 text-xs text-stone-500">
                            <span className="font-semibold text-[#A6093D] uppercase tracking-wide">
                              {getEventBadgeLabel(event.type)}
                            </span>
                            {event.category && <>{'\u00A0· '}<span className="text-stone-700">{event.category}</span></>}
                            {event.time && <>{'\u00A0· '}<span className="font-mono text-stone-600">{event.time}</span></>}
                          </div>

                          <h4 className="text-lg sm:text-xl font-serif font-bold text-[#0C1322] group-hover:text-[#A6093D] transition-colors">
                            {event.title}
                          </h4>

                          <div className="flex items-center gap-2 mt-2 text-xs text-stone-600">
                            <MapPin className="w-3.5 h-3.5 text-[#A6093D] shrink-0" />
                            <span>{event.venue}, <b>{event.city}</b></span>
                          </div>

                          <p className="mt-2 text-xs sm:text-sm text-stone-600 max-w-3xl line-clamp-2">
                            {event.description}
                          </p>
                        </div>
                      </div>

                      {/* Right: Actions */}
                      <div className="flex flex-wrap md:flex-col items-stretch justify-end gap-2 md:w-48 shrink-0">
                        <a
                          href={event.ctaUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 md:flex-none px-4 py-2 text-xs font-semibold text-center text-white bg-[#A6093D] hover:bg-[#880732] rounded-lg transition-colors flex items-center justify-center gap-1.5"
                        >
                          <span>{event.ctaText}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>

                        <div className="flex items-center gap-2">
                          <a
                            href={getGoogleCalendarUrl(event)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 px-3 py-1.5 text-xs font-medium text-center text-stone-700 bg-white hover:bg-stone-100 border border-stone-200 rounded-lg transition-colors flex items-center justify-center gap-1"
                            title="Add to Google Calendar"
                          >
                            <CalendarPlus className="w-3.5 h-3.5 text-[#B8860B]" />
                            <span>Google Cal</span>
                          </a>

                          <button
                            type="button"
                            onClick={() => handleDownloadIcs(event)}
                            className="p-1.5 text-xs text-stone-700 bg-white hover:bg-stone-100 border border-stone-200 rounded-lg transition-colors"
                            title="Download .ics"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {(safeDocUrl(event.pdfUrl) || safeDocUrl(event.pptUrl)) && (
                          <div className="flex items-center gap-2">
                            <DocLinks event={event} onOpen={setOpenDoc} className="flex-1 px-3 py-1.5 text-xs font-medium text-center text-stone-700 bg-white hover:bg-stone-100 border border-stone-200 rounded-lg transition-colors flex items-center justify-center gap-1" />
                          </div>
                        )}

                        <button
                          type="button"
                          onClick={() => setDetailModalEvent(event)}
                          className="w-full py-1 text-xs text-[#B8860B] hover:text-[#A6093D] font-medium transition-colors text-center"
                        >
                          View Day Itinerary →
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-16 text-center">
                <p className="text-stone-500 text-sm">No events match your current filter or query.</p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveFilter('all');
                    setSearchQuery('');
                  }}
                  className="mt-3 px-4 py-2 text-xs font-semibold text-[#A6093D] bg-[#A6093D]/10 rounded-lg"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* Institutional Assurance & Direct Audition Helpline Callout */}
        <div className="mt-10 bg-gradient-to-r from-[#0C1322] via-[#1A2333] to-[#0C1322] rounded-2xl p-6 sm:p-8 text-white shadow-md border border-amber-900/30">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-xs text-amber-300 font-mono uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{HEAD.helpBadge}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                {HEAD.helpTitle}
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 mt-2 leading-relaxed whitespace-pre-line">
                {richText(HEAD.helpText)}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 md:justify-end md:max-w-[50%]">
              {HEAD.helpButton1Text && <a
                {...linkProps(HEAD.helpButton1Url)}
                className="max-w-full text-center px-5 py-2.5 text-xs font-semibold text-[#0C1322] bg-[#D4AF37] hover:bg-[#E5C158] rounded-xl transition-colors shadow-xs"
              >
                {HEAD.helpButton1Text}
              </a>}
              {HEAD.helpButton2Text && <a
                {...linkProps(HEAD.helpButton2Url)}
                className="max-w-full text-center px-4 py-2.5 text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-colors"
              >
                {HEAD.helpButton2Text}
              </a>}
            </div>
          </div>
        </div>

      </div>

      {openDoc && <DocViewer doc={openDoc} onClose={closeDoc} />}

      {/* DETAILED DAY EVENT MODAL */}
      {detailModalEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#EADBAC] relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              type="button"
              onClick={() => setDetailModalEvent(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/60 text-white hover:bg-black/80 flex items-center justify-center transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Hero Banner */}
            <div className="relative aspect-[16/9] max-h-[45vh] w-full bg-stone-900">
              <FSIAImage
                src={detailModalEvent.image}
                alt={detailModalEvent.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
              <div className="absolute bottom-4 left-6 right-6 text-white">
                <div className="text-xs uppercase tracking-wider text-amber-300 font-mono font-semibold">
                  {detailModalEvent.category} · {getEventBadgeLabel(detailModalEvent.type)}
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mt-1 leading-snug">
                  {detailModalEvent.title}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Date, Time & Venue Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-stone-50 rounded-xl border border-stone-200">
                <div className="space-y-1">
                  <div className="text-[11px] text-stone-500 uppercase tracking-wider font-mono">
                    Official Date &amp; Timing
                  </div>
                  <div className="text-sm font-semibold text-stone-900">
                    {formatFullDate(detailModalEvent.date)}
                  </div>
                  <div className="text-xs text-[#B8860B] font-mono">
                    {detailModalEvent.time}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-[11px] text-stone-500 uppercase tracking-wider font-mono">
                    Official Venue
                  </div>
                  <div className="text-sm font-semibold text-stone-900">
                    {detailModalEvent.venue}
                  </div>
                  <div className="text-xs text-stone-600">
                    {detailModalEvent.city}
                  </div>
                </div>
              </div>

              {/* Full Description */}
              <div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-400 mb-2 font-mono">
                  Event Briefing &amp; Scope
                </h4>
                <p className="text-sm text-stone-700 leading-relaxed">
                  {detailModalEvent.description}
                </p>
              </div>

              {/* Eligibility */}
              {detailModalEvent.eligibility && (
                <div className="p-3.5 bg-amber-50/60 border border-amber-200/80 rounded-xl">
                  <div className="text-xs font-semibold text-amber-900 mb-1">
                    Delegate Eligibility &amp; Criteria
                  </div>
                  <div className="text-xs text-amber-800 leading-relaxed">
                    {detailModalEvent.eligibility}
                  </div>
                </div>
              )}

              {/* Program Highlights */}
              <div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-400 mb-2.5 font-mono">
                  Program Schedule &amp; Deliverables
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {detailModalEvent.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-stone-700 p-2.5 bg-stone-50 rounded-lg">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center gap-3">
                <a
                  href={detailModalEvent.ctaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[160px] px-5 py-2.5 text-xs font-semibold text-center text-white bg-[#A6093D] hover:bg-[#880732] rounded-xl transition-colors shadow-xs flex items-center justify-center gap-1.5"
                >
                  <span>{detailModalEvent.ctaText}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href={getGoogleCalendarUrl(detailModalEvent)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 text-xs font-medium text-stone-700 bg-white hover:bg-stone-100 border border-stone-200 rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <CalendarPlus className="w-4 h-4 text-[#B8860B]" />
                  <span>Google Calendar</span>
                </a>

                <button
                  type="button"
                  onClick={() => handleDownloadIcs(detailModalEvent)}
                  className="px-4 py-2.5 text-xs font-medium text-stone-700 bg-white hover:bg-stone-100 border border-stone-200 rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4 text-stone-600" />
                  <span>Download .ICS</span>
                </button>

                <DocLinks event={detailModalEvent} onOpen={setOpenDoc} className="px-4 py-2.5 text-xs font-medium text-stone-700 bg-white hover:bg-stone-100 border border-stone-200 rounded-xl transition-colors flex items-center gap-1.5" />
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
};
