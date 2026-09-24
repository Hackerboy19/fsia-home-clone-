import React, { useState, useMemo } from 'react';
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
import { UPCOMING_EVENTS } from '../data/fsiaData';
import { EventCalendarItem } from '../types';
import { FSIAImage } from './FSIAImage';

interface EventsCalendarSectionProps {
  onSelectEvent?: (event: EventCalendarItem) => void;
  onExplorePageants?: () => void;
  onExploreAwards?: () => void;
}

type EventFilterType = 'all' | 'pageant' | 'award' | 'audition' | 'ceremony' | 'workshop';
type ViewMode = 'grid' | 'agenda';

export const EventsCalendarSection: React.FC<EventsCalendarSectionProps> = ({
  onSelectEvent,
  onExplorePageants,
  onExploreAwards
}) => {
  // Current reference date: September 2026
  const [currentYear, setCurrentYear] = useState<number>(2026);
  const [currentMonth, setCurrentMonth] = useState<number>(9); // 0-indexed: 9 = October 2026 (or 8 for Sept)
  const [selectedDate, setSelectedDate] = useState<string>('2026-10-05');
  const [activeFilter, setActiveFilter] = useState<EventFilterType>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [detailModalEvent, setDetailModalEvent] = useState<EventCalendarItem | null>(null);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

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
            event.description.toLowerCase().includes(q);

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

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
    setCurrentYear(2026);
    setCurrentMonth(9); // October 2026
    setSelectedDate('2026-10-05');
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
  const getEventBadgeLabel = (type: EventCalendarItem['type']) => {
    switch (type) {
      case 'pageant':
        return 'National Pageant';
      case 'award':
        return 'National Award';
      case 'audition':
        return 'City Audition';
      case 'ceremony':
        return 'Grand Coronation / Ceremony';
      case 'workshop':
        return 'Camp / Masterclass';
      default:
        return 'Official Event';
    }
  };

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
    const todayStr = '2026-09-24';
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
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#B8860B] font-semibold mb-3">
              <CalendarIcon className="w-4 h-4 text-[#B8860B]" />
              <span>Official Season 2026 &amp; 2027 Schedule</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#A6093D] font-bold">Zee Studio Production Hub</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0C1322] tracking-tight leading-tight">
              Pageant &amp; National Award Calendar
            </h2>
            <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
              Explore official dates for nationwide auditions, teen masterclasses, state semi-finals, jury evaluations, and the grand coronation ceremony at Zee Studio Jaipur. Select any date to inspect the verified itinerary.
            </p>
          </div>

          {/* Quick Metrics / Action Strip */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-stone-600">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#A6093D]" />
              <span className="font-semibold text-stone-900">4,000+</span>
              <span>City Auditions</span>
            </div>
            <span aria-hidden="true" className="text-stone-300">|</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
              <span className="font-semibold text-stone-900">Dec 18</span>
              <span>Grand Coronation</span>
            </div>
            <span aria-hidden="true" className="text-stone-300">|</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#78350F]" />
              <span className="font-semibold text-stone-900">Dec 20</span>
              <span>Gala Felicitation</span>
            </div>
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
              {[
                { id: 'all', label: 'All Dates' },
                { id: 'audition', label: 'Auditions & Screenings' },
                { id: 'workshop', label: 'Masterclasses & Camps' },
                { id: 'pageant', label: 'Pageant Finales' },
                { id: 'award', label: 'National Awards' },
                { id: 'ceremony', label: 'Coronation Galas' }
              ].map((tab) => (
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
                  const isSelected = cell.dateString === selectedDate;
                  const isCurrentDay = cell.dateString === '2026-09-24';

                  // Determine event type color indicator
                  const firstEventType = cell.events[0]?.type;
                  const eventColor =
                    firstEventType === 'pageant' || firstEventType === 'ceremony'
                      ? 'bg-[#A6093D]'
                      : firstEventType === 'award'
                      ? 'bg-[#B8860B]'
                      : 'bg-emerald-600';

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
                      }`}
                      aria-label={`${cell.dateString} ${hasEvents ? `- ${cell.events.length} event(s)` : ''}`}
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
                              className={`text-[10px] font-medium leading-tight truncate px-1 py-0.5 rounded text-white ${eventColor}`}
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
                            <span className={`w-2 h-2 rounded-full ${eventColor}`} />
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
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#A6093D]" />
                    <span>Pageant / Grand Coronation</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#B8860B]" />
                    <span>National Award Ceremonies</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                    <span>Auditions &amp; Masterclasses</span>
                  </div>
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
                      <div className="relative h-32 w-full rounded-lg overflow-hidden mb-4 bg-stone-900">
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
                          <div className="flex flex-wrap items-center gap-2 mb-1.5 text-xs text-stone-500">
                            <span className="font-semibold text-[#A6093D] uppercase tracking-wide">
                              {getEventBadgeLabel(event.type)}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span className="text-stone-700">{event.category}</span>
                            <span aria-hidden="true">·</span>
                            <span className="font-mono text-stone-600">{event.time}</span>
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
                <span>Pan-India City Chapter Inquiries</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                Have questions about your city’s audition or award jury timeline?
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 mt-2 leading-relaxed">
                FSIA manages auditions and award screenings across 4,000+ cities in India. For direct slot confirmations, regional franchise dates, or special delegate accreditations, speak with the central secretariat.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href="https://www.fsia.in/quickapply"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 text-xs font-semibold text-[#0C1322] bg-[#D4AF37] hover:bg-[#E5C158] rounded-xl transition-colors shadow-xs"
              >
                Apply for Auditions 2026
              </a>
              <a
                href="tel:+919983286999"
                className="px-4 py-2.5 text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-colors"
              >
                Call +91-99832-86999
              </a>
            </div>
          </div>
        </div>

      </div>

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
            <div className="relative h-48 sm:h-56 w-full bg-stone-900">
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
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
};
