import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { TrustStatsSection } from './components/TrustStatsSection';
import { PageantsSection } from './components/PageantsSection';
import { AwardsSection } from './components/AwardsSection';
import { LatestNewsSection } from './components/LatestNewsSection';
import { AboutFsiaSection } from './components/AboutFsiaSection';
import { WinnersSection } from './components/WinnersSection';
import { GallerySection } from './components/GallerySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { SocialMediaSection } from './components/SocialMediaSection';
import { CelebritiesRecognitionSection } from './components/CelebritiesRecognitionSection';
import { TeamSection } from './components/TeamSection';
import { OfficialPartnersSection } from './components/OfficialPartnersSection';
import { FaqSection } from './components/FaqSection';
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
          onExploreEvents={() => handleNavigate('pageants')}
        />

        {/* 2. STATISTICS */}
        <TrustStatsSection />

        {/* 3. OUR PAGEANTS */}
        <PageantsSection
          onSelectPageant={handleSelectPageant}
        />

        {/* 5. OUR AWARDS */}
        <AwardsSection
          onSelectAward={handleSelectAward}
        />

        {/* 6. LATEST FROM FSIA */}
        <LatestNewsSection onReadArticle={handleReadArticle} />

        {/* 7. ABOUT FSIA */}
        <AboutFsiaSection />

        {/* 8. WINNERS */}
        <WinnersSection onSelectWinner={handleSelectWinner} />

        {/* 9. MOMENTS THAT INSPIRE */}
        <GallerySection />

        {/* 10. TESTIMONIALS */}
        <TestimonialsSection />

        {/* 11. FSIA ON SOCIAL MEDIA */}
        <SocialMediaSection />

        {/* 12. CELEBRITIES / EVENTS */}
        <CelebritiesRecognitionSection />

        {/* 13. OUR TEAM */}
        <TeamSection />

        {/* 14. OFFICIAL PARTNERS */}
        <OfficialPartnersSection />

        {/* 15. FREQUENTLY ASKED QUESTIONS */}
        <FaqSection />

        {/* 16. FINAL CTA */}
        <FinalCtaSection
          onExploreEvents={() => handleNavigate('pageants')}
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
