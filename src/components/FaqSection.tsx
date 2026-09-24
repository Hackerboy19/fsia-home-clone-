import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FSIA_FAQS, FSIA_CONTACT } from '../data/fsiaData';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 md:py-24 bg-white relative border-b border-[#EADBAC]/60">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FAF7F0] border border-[#D4AF37]/40 text-[#7E591B] text-[11px] font-semibold tracking-widest uppercase mb-4 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B]" />
            <span>CLARIFICATIONS &amp; PARTICIPATION GUIDELINES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#0C1322] tracking-tight">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="text-base text-[#475569] mt-3 font-sans leading-relaxed">
            Official guidelines regarding eligibility criteria, city auditions, age categories, grooming schedules, and coronation ceremonies.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FSIA_FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="border border-[#EADBAC] bg-[#FAF9F5] transition-colors"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FAF7F0] transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-bold text-base sm:text-lg text-[#0C1322] leading-snug">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 flex items-center justify-center text-[#B8860B] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#0C1322]' : ''
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-sm text-[#475569] font-sans leading-relaxed border-t border-[#EADBAC] bg-white">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Helpline Action Strip */}
        <div className="mt-12 bg-[#FAF8F2] border border-[#D4AF37]/40 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-display font-bold text-[#0C1322]">
              Need further assistance regarding 2026 applications?
            </h3>
            <p className="text-xs text-[#64748B] font-sans mt-0.5">
              Contact our candidate desk at Jaipur headquarters.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`tel:${FSIA_CONTACT.phone}`}
              className="px-5 py-2.5 bg-[#0C1322] hover:bg-[#1A253E] text-[#EADBAC] hover:text-white text-xs font-bold tracking-wider uppercase border border-[#D4AF37]/40 transition-colors"
            >
              CALL {FSIA_CONTACT.phone}
            </a>
            <a
              href="https://www.fsia.in/FAQ.php"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-white hover:bg-[#FAF7F0] text-[#0C1322] text-xs font-bold tracking-wider uppercase border border-[#EADBAC] hover:border-[#D4AF37] transition-colors"
            >
              ALL FAQS &rarr;
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
