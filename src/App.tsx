import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { TrustStatsSection } from './components/TrustStatsSection';
import { EventsCalendarSection } from './components/EventsCalendarSection';
import { AdvertisementSection } from './components/AdvertisementSection';
import { SocialMediaSection } from './components/SocialMediaSection';
import { CelebritiesRecognitionSection } from './components/CelebritiesRecognitionSection';
import { OfficialPartnersSection } from './components/OfficialPartnersSection';
import { TeamSection } from './components/TeamSection';
import { FinalCtaSection } from './components/FinalCtaSection';
import { SuccessStoriesSection } from './components/SuccessStoriesSection';
import { Footer } from './components/Footer';

// Modals
import { SearchModal } from './components/SearchModal';
import { DetailModal } from './components/DetailModal';
import { LegalModal } from './components/LegalModal';
import { WinnersModal } from './components/WinnersModal';
import { TeamModal } from './components/TeamModal';

// Types
import { WinnerItem } from './types';

export default function App() {
  // Modal states
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWinnersOpen, setIsWinnersOpen] = useState(false);
  const [isTeamOpen, setIsTeamOpen] = useState(false);

  const [detailModalState, setDetailModalState] = useState<{
    isOpen: boolean;
    type: 'pageant' | 'award' | 'article' | 'winner' | null;
    data: any;
  }>({
    isOpen: false,
    type: null,
    data: null
  });

  const [legalModalState, setLegalModalState] = useState<{
    isOpen: boolean;
    title: string;
  }>({
    isOpen: false,
    title: ''
  });

  // Navigation smoothly scrolls to designated section or opens modal.
  //
  // The pageants, awards, news, about, winners, gallery, testimonials and faq
  // sections have been removed from the page. Header and Footer still link to
  // some of those anchors; getElementById returns null for them and the scroll
  // is simply skipped, so nothing throws. Winners and Team fall back to their
  // modals, which is now the only way to reach that content in-page.
  const handleNavigate = (sectionId: string) => {
    if (sectionId === 'calendar' || sectionId === 'dates' || sectionId === 'events') {
      sectionId = 'schedule';
    }
    if (sectionId === 'stories' || sectionId === 'reels' || sectionId === 'success') {
      sectionId = 'success-stories';
    }
    if (sectionId === 'winners') {
      setIsWinnersOpen(true);
      return;
    }
    if (sectionId === 'team') {
      const el = document.getElementById('team');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        setIsTeamOpen(true);
      }
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectWinner = (winner: WinnerItem) => {
    setDetailModalState({
      isOpen: true,
      type: 'winner',
      data: winner
    });
  };

  // Search still indexes pageants, awards, articles and winners, so the detail
  // modal keeps handling all four types even though those sections are gone.
  const handleSearchResult = (type: 'pageant' | 'award' | 'article' | 'winner', item: any) => {
    setDetailModalState({
      isOpen: true,
      type,
      data: item
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-[#0C1322] font-sans antialiased selection:bg-[#D4AF37]/20 selection:text-[#0C1322]">
      {/* CANONICAL FSIA HEADER (Locked from header1806.php, namespace: .fsia-mh) */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* Main Content Area - Scoped under .fsia-home for CSS isolation */}
      <main id="main-content" className="fsia-home flex-1">
        {/* 1. HERO & STATISTICS */}
        <HeroSection
          onExploreEvents={() => handleNavigate('schedule')}
        />
        <TrustStatsSection />

        {/* 2. PAGEANT & NATIONAL AWARD CALENDAR */}
        <EventsCalendarSection />

        {/* 3. ADVERTISEMENT */}
        <AdvertisementSection />

        {/* 4. CONNECT WITH FSIA */}
        <SocialMediaSection />

        {/* 5. CELEBRITY JURY & GUESTS */}
        <CelebritiesRecognitionSection />

        {/* 6. OFFICIAL PARTNERS */}
        <OfficialPartnersSection />

        {/* 7. OUR TEAM & MENTORS */}
        <TeamSection />

        {/* 8. FINAL CTA */}
        <FinalCtaSection
          onExploreEvents={() => handleNavigate('schedule')}
        />

        {/*
          WINNER SUCCESS STORIES — kept mounted but hidden from public view.
          Placed last so the visible running order above is unaffected.
          Remove the wrapper's `hidden` class to bring it back.
        */}
        <div hidden className="hidden" aria-hidden="true">
          <SuccessStoriesSection />
        </div>
      </main>

      {/* CANONICAL FSIA FOOTER (Locked from footer1806.php, namespace: .fsia-ft) */}
      <Footer
        onNavigate={handleNavigate}
        onOpenLegalModal={(title) => setLegalModalState({ isOpen: true, title })}
      />

      {/* Interactive Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectResult={handleSearchResult}
      />

      <DetailModal
        isOpen={detailModalState.isOpen}
        onClose={() => setDetailModalState({ isOpen: false, type: null, data: null })}
        type={detailModalState.type}
        data={detailModalState.data}
      />

      <WinnersModal
        isOpen={isWinnersOpen}
        onClose={() => setIsWinnersOpen(false)}
        onSelectWinner={handleSelectWinner}
      />

      <TeamModal
        isOpen={isTeamOpen}
        onClose={() => setIsTeamOpen(false)}
      />

      <LegalModal
        isOpen={legalModalState.isOpen}
        onClose={() => setLegalModalState({ isOpen: false, title: '' })}
        title={legalModalState.title}
      />
    </div>
  );
}
