import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { TrustStatsSection } from './components/TrustStatsSection';
import { EventsCalendarSection } from './components/EventsCalendarSection';
import { AdvertisementSection } from './components/AdvertisementSection';
import { SocialMediaSection } from './components/SocialMediaSection';
import { CelebritiesRecognitionSection } from './components/CelebritiesRecognitionSection';
import { TeamSection } from './components/TeamSection';
import { OfficialPartnersSection } from './components/OfficialPartnersSection';
import { FinalCtaSection } from './components/FinalCtaSection';
import { Footer } from './components/Footer';

// Modals
import { SearchModal } from './components/SearchModal';
import { DetailModal } from './components/DetailModal';
import { LegalModal } from './components/LegalModal';
import { WinnersModal } from './components/WinnersModal';
import { TeamModal } from './components/TeamModal';

// Types
import { PageantItem, AwardItem, WinnerItem, ArticleItem } from './types';

// Links whose section is not on the homepage open these pages.
const PAGE_FALLBACKS: Record<string, string> = {
  about: 'https://www.fsia.in/about.php',
  contact: 'https://www.fsia.in/contact.php',
  faq: 'https://www.fsia.in/FAQ.php',
};

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

  // Navigation smoothly scrolls to designated section or opens modal
  const handleNavigate = (sectionId: string) => {
    if (sectionId === 'categories') {
      sectionId = 'pageants';
    }
    if (sectionId === 'calendar' || sectionId === 'dates' || sectionId === 'events') {
      sectionId = 'schedule';
    }
    if (sectionId === 'stories' || sectionId === 'reels' || sectionId === 'success') {
      sectionId = 'success-stories';
    }
    if (sectionId === 'winners') {
      const el = document.getElementById('winners');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        setIsWinnersOpen(true);
      }
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
    } else if (PAGE_FALLBACKS[sectionId]) {
      // No such section on the homepage: open the matching page instead.
      window.location.href = PAGE_FALLBACKS[sectionId];
    }
  };

  // Select item handlers
  const handleSelectPageant = (pageant: PageantItem) => {
    setDetailModalState({
      isOpen: true,
      type: 'pageant',
      data: pageant
    });
  };

  const handleSelectAward = (award: AwardItem) => {
    setDetailModalState({
      isOpen: true,
      type: 'award',
      data: award
    });
  };

  const handleSelectWinner = (winner: WinnerItem) => {
    setDetailModalState({
      isOpen: true,
      type: 'winner',
      data: winner
    });
  };

  const handleReadArticle = (article: ArticleItem) => {
    setDetailModalState({
      isOpen: true,
      type: 'article',
      data: article
    });
  };

  // Search item handler
  const handleSearchResult = (type: 'pageant' | 'award' | 'article' | 'winner', item: any) => {
    setDetailModalState({
      isOpen: true,
      type,
      data: item
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-[#0C1322] font-sans antialiased selection:bg-[#D4AF37]/20 selection:text-[#0C1322]">
      {/* 1 & 2. CANONICAL FSIA HEADER (Locked from header1806.php, namespace: .fsia-mh) */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* Main Content Area - Scoped under .fsia-home for CSS isolation */}
      <main id="main-content" className="fsia-home flex-1">
        {/* 1. HERO */}
        <HeroSection
          onExploreEvents={() => handleNavigate('schedule')}
        />

        {/* 2. STATISTICS */}
        <TrustStatsSection />

        {/* 3. UPCOMING PAGEANT & AWARD DATES CALENDAR */}
        <EventsCalendarSection
          onExplorePageants={() => handleNavigate('schedule')}
          onExploreAwards={() => handleNavigate('schedule')}
        />

        {/* 4. ADVERTISEMENT (CMS: advertisement) */}
        <AdvertisementSection />

        {/* 5. FSIA ON SOCIAL MEDIA */}
        <SocialMediaSection />

        {/* 6. CELEBRITY JURY & GUESTS */}
        <CelebritiesRecognitionSection />

        {/* 7. OFFICIAL PARTNERS */}
        <OfficialPartnersSection />

        {/* 8. OUR TEAM */}
        <TeamSection />

        {/* 16. FINAL CTA */}
        <FinalCtaSection
          onExploreEvents={() => handleNavigate('schedule')}
        />
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
