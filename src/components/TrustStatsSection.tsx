import React, { useState, useEffect, useRef } from 'react';
import { VERIFIED_STATISTICS } from '../data/fsiaData';

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  duration?: number;
  delay?: number;
  isVisible: boolean;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  target,
  suffix = '',
  duration = 2000,
  delay = 0,
  isVisible
}) => {
  const [displayValue, setDisplayValue] = useState<number>(0);
  const [isFinished, setIsFinished] = useState(false);
  const startTimeRef = useRef<number | null>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // If not visible yet, keep at 0
    if (!isVisible) return;

    // Check prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayValue(target);
      setIsFinished(true);
      return;
    }

    let timeoutId: number | undefined;

    const startAnimation = () => {
      const step = (timestamp: number) => {
        if (!startTimeRef.current) startTimeRef.current = timestamp;
        const elapsed = timestamp - startTimeRef.current;
        const progress = Math.min(elapsed / duration, 1);

        // Smooth cubic ease-out for majestic deceleration
        const easeOutProgress = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(target * easeOutProgress);

        setDisplayValue(current);

        if (progress < 1) {
          animFrameRef.current = requestAnimationFrame(step);
        } else {
          setDisplayValue(target);
          setIsFinished(true);
        }
      };

      animFrameRef.current = requestAnimationFrame(step);
    };

    if (delay > 0) {
      timeoutId = window.setTimeout(startAnimation, delay);
    } else {
      startAnimation();
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isVisible, target, duration, delay]);

  const formattedNumber = displayValue.toLocaleString('en-IN');

  return (
    <span className="inline-flex items-baseline font-mono tracking-tight font-bold">
      <span className="tabular-nums">{formattedNumber}</span>
      <span className={`text-[#B8860B] ml-0.5 transition-opacity duration-700 ${isFinished ? 'opacity-100 scale-105' : 'opacity-85'}`}>
        {suffix}
      </span>
    </span>
  );
};

export const TrustStatsSection: React.FC = () => {
  const [hasScrolledIntoView, setHasScrolledIntoView] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setHasScrolledIntoView(true);
          // Disconnect once triggered to avoid unnecessary re-triggers
          observer.disconnect();
        }
      },
      {
        threshold: 0.25,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#FFFFFF] border-b border-[#EADBAC]/60 py-10 sm:py-12 relative overflow-hidden"
      aria-label="Verified Institutional Statistics"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Grid: High contrast typography with staggered dynamic counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {VERIFIED_STATISTICS.map((stat, idx) => {
            // Determine numeric target and suffix
            const numeric =
              'numericTarget' in stat && typeof stat.numericTarget === 'number'
                ? stat.numericTarget
                : parseInt(stat.value.replace(/[^0-9]/g, ''), 10) || 0;
            const suffix = 'suffix' in stat && typeof stat.suffix === 'string' ? stat.suffix : '+';

            return (
              <div
                key={stat.label}
                className={`flex flex-col py-2 transition-all duration-700 ${
                  idx !== 0 ? 'md:border-l md:border-[#EADBAC] md:pl-8' : ''
                }`}
              >
                {/* Dynamic animated counter */}
                <div className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#0C1322] tracking-tight min-h-[1.2em] flex items-center">
                  <AnimatedCounter
                    target={numeric}
                    suffix={suffix}
                    duration={1800}
                    delay={idx * 120} // subtle staggered delay for each column
                    isVisible={hasScrolledIntoView}
                  />
                </div>

                {/* Metric Title Label */}
                <div className="text-xs sm:text-sm font-sans font-bold text-[#7E591B] uppercase tracking-wider mt-1.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B] shrink-0" />
                  <span>{stat.label}</span>
                </div>

                {/* Metric Subtext Description */}
                <p className="text-xs text-[#526077] font-sans mt-1 leading-relaxed">
                  {stat.subtext}
                </p>
              </div>
            );
          })}
        </div>

        {/* Verified Institutional Statement Footer */}
        <div className="mt-8 pt-6 border-t border-[#EADBAC]/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-[#526077] font-sans">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#B8860B] shrink-0" />
            <span className="font-semibold text-[#0C1322]">
              Democratic Grassroots Model:
            </span>
            <span>Auditioning talent across 28 States &amp; Union Territories without bias.</span>
          </div>

          <div className="text-[11px] text-[#7E591B] font-medium tracking-wide">
            Source: Official FSIA Registered Trademark Documentation (Class 41)
          </div>
        </div>

      </div>
    </section>
  );
};
