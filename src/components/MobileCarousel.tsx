import React, { useCallback, useEffect, useRef, useState } from 'react';

interface MobileCarouselProps {
  /** Grid-column classes applied from the md breakpoint up, e.g. "md:grid-cols-4 lg:grid-cols-5". */
  gridClassName: string;
  /** Gap used in both modes. */
  gapClassName?: string;
  /** How wide one card is while swiping. Leaving a margin lets the next card peek in, which is what signals the row scrolls. */
  cardWidth?: string;
  /** Describes the row for screen readers, e.g. "Official partners". */
  label: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * Below md this is a swipeable, snapping row; from md up it is the plain grid
 * the section always used, so desktop layout is unchanged.
 *
 * The row itself is CSS scroll-snap rather than a carousel library: nothing is
 * duplicated in the DOM and native momentum scrolling is kept. The only JS is
 * a passive, rAF-throttled scroll listener driving the position indicator, and
 * it short-circuits as soon as the row stops being scrollable (i.e. at md and
 * up, where it is a grid).
 *
 * The negative margin with matching padding lets the row bleed to the screen
 * edges while the first and last cards still line up with the section gutter.
 */
export const MobileCarousel: React.FC<MobileCarouselProps> = ({
  gridClassName,
  gapClassName = 'gap-5',
  cardWidth = '82%',
  label,
  className = '',
  children
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  // thumb = how much of the row is on screen, pos = how far along we are
  const [{ thumb, pos }, setBar] = useState({ thumb: 0, pos: 0 });

  const measure = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    // Not scrollable means we are in grid mode; hide the indicator entirely.
    if (max <= 2) {
      setBar((b) => (b.thumb === 0 ? b : { thumb: 0, pos: 0 }));
      return;
    }
    setBar({
      thumb: (el.clientWidth / el.scrollWidth) * 100,
      pos: el.scrollLeft / max
    });
  }, []);

  const onScroll = useCallback(() => {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(measure);
  }, [measure]);

  useEffect(() => {
    measure();
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => {
      cancelAnimationFrame(frame.current);
      ro.disconnect();
    };
  }, [measure]);

  return (
    <div className={className}>
      <div
        ref={ref}
        onScroll={onScroll}
        role="region"
        aria-label={label}
        // Focusable only while it actually scrolls, so the grid at md and up
        // does not add a tab stop that goes nowhere.
        tabIndex={thumb > 0 ? 0 : -1}
        style={{ '--fsia-card-w': cardWidth } as React.CSSProperties}
        className={[
          // mobile: snapping carousel
          'flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain motion-safe:scroll-smooth',
          '-mx-4 px-4 pb-4 sm:-mx-6 sm:px-6',
          '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
          '[&>*]:shrink-0 [&>*]:snap-center [&>*]:w-[var(--fsia-card-w)]',
          // keyboard users get a visible target, since the row is focusable and arrow-scrollable
          'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B8860B]',
          // md and up: the original grid, untouched
          'md:grid md:overflow-visible md:mx-0 md:px-0 md:pb-0 md:snap-none',
          'md:[&>*]:w-auto md:[&>*]:shrink',
          gapClassName,
          gridClassName
        ].join(' ')}
      >
        {children}
      </div>

      {/* Position indicator — mobile only, and only once the row actually scrolls. */}
      {thumb > 0 && (
        <div className="md:hidden h-[3px] w-full max-w-[9rem] mx-auto rounded-full bg-[#EADBAC]/70 overflow-hidden" aria-hidden="true">
          <div
            className="h-full rounded-full bg-[#B8860B] motion-safe:transition-transform motion-safe:duration-150"
            style={{
              width: `${thumb}%`,
              // translateX is a percentage of the thumb's own width, so the
              // full travel (100 - thumb) of the track is (100 - thumb) / thumb of itself.
              transform: `translateX(${pos * ((100 - thumb) / thumb) * 100}%)`
            }}
          />
        </div>
      )}
    </div>
  );
};
