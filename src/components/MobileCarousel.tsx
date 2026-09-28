import React from 'react';

interface MobileCarouselProps {
  /** Grid-column classes applied from the md breakpoint up, e.g. "md:grid-cols-4 lg:grid-cols-5". */
  gridClassName: string;
  /** Gap used in both modes. */
  gapClassName?: string;
  /** How wide one card is while swiping. Leaving a margin lets the next card peek in, which is what signals the row scrolls. */
  cardWidth?: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * Below md this is a swipeable, snapping row; from md up it is the plain grid
 * the section always used, so desktop layout is unchanged.
 *
 * Built on CSS scroll-snap rather than a carousel library: no JS runs while
 * scrolling, nothing is duplicated in the DOM, and native momentum scrolling
 * and keyboard/screen-reader behaviour are kept. Cards are targeted through
 * [&>*] so callers keep rendering their existing markup untouched.
 *
 * The negative margin with matching padding lets the row bleed to the screen
 * edges while the first and last cards still line up with the section gutter.
 */
export const MobileCarousel: React.FC<MobileCarouselProps> = ({
  gridClassName,
  gapClassName = 'gap-5',
  cardWidth = '82%',
  className = '',
  children
}) => {
  return (
    <div
      style={{ '--fsia-card-w': cardWidth } as React.CSSProperties}
      className={[
        // mobile: snapping carousel
        'flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth',
        '-mx-4 px-4 pb-4 sm:-mx-6 sm:px-6',
        '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
        '[&>*]:shrink-0 [&>*]:snap-center [&>*]:w-[var(--fsia-card-w)]',
        // md and up: the original grid, untouched
        'md:grid md:overflow-visible md:mx-0 md:px-0 md:pb-0 md:snap-none',
        'md:[&>*]:w-auto md:[&>*]:shrink',
        gapClassName,
        gridClassName,
        className
      ].join(' ')}
    >
      {children}
    </div>
  );
};
