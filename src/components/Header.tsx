import React, { useEffect, useRef, useState } from 'react';

interface HeaderProps {
  onOpenSearch?: () => void;
  onNavigate?: (sectionId: string) => void;
}

const TICKER_ITEMS = [
  {
    icon: '🟡',
    title: 'Now Open:',
    text: 'Auditions Miss India, Mrs India (G-1 & G-2) & Miss Teen India 2026 — Limited City Entries',
    link: 'https://www.fsia.in/quickapply',
    linkText: 'Register Online →',
    isExternal: true
  },
  {
    icon: '👑',
    title: 'Zee Studio Finale:',
    text: 'Grand National Coronation Gala 2026 at Zee Studio Jaipur — Live Nationwide Broadcast',
    link: '#schedule',
    linkText: 'View Dates Calendar →',
    isExternal: false,
    section: 'schedule'
  },
  {
    icon: '🏆',
    title: 'Award Nominations:',
    text: 'Super Woman Award (Season 8) & Super Hero Award 2026 — Nominations Open',
    link: 'https://www.fsia.in/super-woman-award.php',
    linkText: 'Nominate Now →',
    isExternal: true
  },
  {
    icon: '▶',
    title: 'Winner Reels:',
    text: 'Watch Video Success Journeys of Crowned Titleholders Across India',
    link: '#success-stories',
    linkText: 'Watch Stories →',
    isExternal: false,
    section: 'success-stories'
  },
  {
    icon: '🇮🇳',
    title: 'National Recognition:',
    text: 'Bharat National Awards honoring Achievers & Leaders across 4,000+ Cities & 28 States',
    link: 'https://www.fsia.in/top-awardee-in-india',
    linkText: 'Explore Awardees →',
    isExternal: true
  },
  {
    icon: '📞',
    title: 'Delegate Helpline:',
    text: '+91-99832-86999 (Mon–Sat, 10 AM – 7 PM IST) for Auditions & Registration Inquiries',
    link: 'tel:+919983286999',
    linkText: 'Call Helpline →',
    isExternal: true
  },
  {
    icon: '🎖️',
    title: 'Govt. Certified:',
    text: 'Govt. of India Class 41 Registered Trademark Organization for Pageantry & Awards',
    link: 'https://www.fsia.in/about-us.php',
    linkText: 'Verify Credential →',
    isExternal: true
  }
];

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onNavigate
}) => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isTickerPaused, setIsTickerPaused] = useState(false);
  const [isTickerDismissed, setIsTickerDismissed] = useState(false);

  useEffect(() => {
    const header = document.getElementById('fsiaMH');
    const burger = document.getElementById('fsiaBurger');
    const links = document.getElementById('fsiaLinks');

    // Sticky shrink on scroll
    let ticking = false;
    const applyScrollState = () => {
      if (header) {
        header.classList.toggle('is-scrolled', window.scrollY > 12);
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(applyScrollState);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    applyScrollState();

    // Hamburger toggle
    const handleBurgerClick = () => {
      if (burger && links) {
        const open = links.classList.toggle('open');
        burger.classList.toggle('open', open);
        burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      }
    };
    if (burger) {
      burger.addEventListener('click', handleBurgerClick);
    }

    // Mobile registration accordion
    const reg = document.getElementById('fsiaReg');
    const regBtn = reg ? reg.querySelector('.reg-btn') : null;
    const handleRegClick = (e: Event) => {
      if (window.innerWidth <= 1100 && reg) {
        e.preventDefault();
        reg.classList.toggle('reg-open');
      }
    };
    if (regBtn) {
      regBtn.addEventListener('click', handleRegClick);
    }

    // Quick-links pills strip swipe & arrows
    const pills = document.getElementById('fsiaPills');
    const pillsWrap = document.getElementById('fsiaPillsWrap');
    let handlePillsScroll: (() => void) | null = null;
    let arrowListeners: Array<{ el: Element; fn: () => void }> = [];

    if (pills && pillsWrap) {
      handlePillsScroll = () => {
        const max = pills.scrollWidth - pills.clientWidth;
        pillsWrap.classList.toggle('can-left', pills.scrollLeft > 4);
        pillsWrap.classList.toggle('can-right', max > 4 && pills.scrollLeft < max - 4);
      };

      pills.addEventListener('scroll', handlePillsScroll, { passive: true });
      window.addEventListener('resize', handlePillsScroll);
      handlePillsScroll();

      const arrows = pillsWrap.querySelectorAll('.pills-arrow');
      arrows.forEach((btn) => {
        const fn = () => {
          const step = Math.max(pills.clientWidth * 0.6, 140);
          pills.scrollBy({ left: btn.classList.contains('prev') ? -step : step, behavior: 'smooth' });
        };
        btn.addEventListener('click', fn);
        arrowListeners.push({ el: btn, fn });
      });

      try {
        if (pills.scrollWidth - pills.clientWidth > 20 && !sessionStorage.getItem('fsiaPillsHinted')) {
          sessionStorage.setItem('fsiaPillsHinted', '1');
          setTimeout(() => {
            pills.classList.add('hint');
            setTimeout(() => { pills.classList.remove('hint'); }, 1300);
          }, 900);
        }
      } catch (e) {
        // Ignore sessionStorage restrictions
      }
    }

    // Close mobile panel after clicking a link
    const linkItems = document.querySelectorAll('#fsiaLinks a');
    const handleLinkClick = () => {
      if (window.innerWidth <= 1100 && links) {
        links.classList.remove('open');
        if (burger) {
          burger.classList.remove('open');
          burger.setAttribute('aria-expanded', 'false');
        }
      }
    };
    linkItems.forEach((a) => a.addEventListener('click', handleLinkClick));

    // Search input enter or focus handling
    const searchInput = document.getElementById('fsiaSearchInput') as HTMLInputElement | null;
    const handleSearchKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const term = searchInput?.value.trim();
        if (term) {
          try {
            sessionStorage.setItem('searchkeyword', encodeURIComponent(term));
          } catch (err) {}
          if (onOpenSearch) {
            onOpenSearch();
          } else {
            window.location.href = 'https://www.fsia.in/all-india-pageant-contestant';
          }
        }
      }
    };
    searchInput?.addEventListener('keydown', handleSearchKeyDown);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (burger) burger.removeEventListener('click', handleBurgerClick);
      if (regBtn) regBtn.removeEventListener('click', handleRegClick);
      if (pills && handlePillsScroll) {
        pills.removeEventListener('scroll', handlePillsScroll);
        window.removeEventListener('resize', handlePillsScroll);
      }
      arrowListeners.forEach(({ el, fn }) => el.removeEventListener('click', fn));
      linkItems.forEach((a) => a.removeEventListener('click', handleLinkClick));
      searchInput?.removeEventListener('keydown', handleSearchKeyDown);
    };
  }, [onOpenSearch]);

  const handleNavClick = (sectionId: string, e: React.MouseEvent) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(sectionId);
    }
  };

  return (
    <>
      {/* Canonical FSIA header CSS scoped directly to .fsia-mh */}
      <style>{`
        .fsia-mh{ all: unset; display:block !important; width:100% !important; box-sizing:border-box !important;
          background:#fff !important; font-family:'Poppins',system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Arial,sans-serif !important;
          --mar:#A6093D; --mar-dk:#7a062c; --gold:#D4AF37; --gold-dk:#b8860b;
          --ink:#1f2937; --ink-soft:#64748b; --line:#e8eaee; --paper:#ffffff; --mist:#f8fafc;
          position:sticky !important; top:0 !important; z-index:50 !important;
          box-shadow:0 14px 32px -18px rgba(31,41,55,.32) !important;
        }
        .fsia-mh *{ box-sizing:border-box !important; }
        .fsia-mh a{ text-decoration:none !important; color:inherit !important; }
        .fsia-mh .wrap{ width:100% !important; max-width:1240px !important; margin:0 auto !important; padding:0 22px !important; }

        /* ---------- 1. Announcement Continuous Flowing Ticker ---------- */
        .fsia-mh .anc{ background:linear-gradient(90deg,#6b0526,#a6093d 40%,#6b0526) !important;
          color:#fff !important; font-size:12px !important; line-height:1.4 !important;
          border-bottom:1px solid rgba(212,175,55,.4) !important; overflow:hidden !important;
          box-shadow:inset 0 1px 0 rgba(255,255,255,.18), 0 4px 10px -5px rgba(122,6,44,.5) !important;
          display:flex !important; align-items:center !important; height:36px !important; position:relative !important;
        }
        .fsia-mh .anc-badge{ display:flex !important; align-items:center !important; gap:6px !important;
          padding:0 12px !important; height:100% !important; background:rgba(0,0,0,.35) !important;
          border-right:1px solid rgba(212,175,55,.3) !important; color:#fde8c4 !important;
          font-size:11px !important; font-weight:700 !important; letter-spacing:.8px !important;
          text-transform:uppercase !important; flex-shrink:0 !important; z-index:4 !important; white-space:nowrap !important;
        }
        .fsia-mh .anc-pulse{ width:7px !important; height:7px !important; border-radius:50% !important;
          background:#d4af37 !important; animation:ancPulse 2s infinite !important; flex-shrink:0 !important; }
        @keyframes ancPulse{
          0%{ transform:scale(0.95); box-shadow:0 0 0 0 rgba(212,175,55,.7); }
          70%{ transform:scale(1.15); box-shadow:0 0 0 6px rgba(212,175,55,0); }
          100%{ transform:scale(0.95); box-shadow:0 0 0 0 rgba(212,175,55,0); }
        }
        .fsia-mh .anc-marquee{ flex:1 1 auto !important; overflow:hidden !important; position:relative !important;
          display:flex !important; align-items:center !important; white-space:nowrap !important; height:100% !important;
          mask-image:linear-gradient(90deg,transparent,black 16px,black calc(100% - 24px),transparent) !important;
          -webkit-mask-image:linear-gradient(90deg,transparent,black 16px,black calc(100% - 24px),transparent) !important;
        }
        .fsia-mh .anc-track{ display:inline-flex !important; align-items:center !important; white-space:nowrap !important;
          animation:fsiaMarquee 42s linear infinite !important; will-change:transform !important; }
        .fsia-mh .anc:hover .anc-track, .fsia-mh .anc-track.is-paused{ animation-play-state:paused !important; }
        @keyframes fsiaMarquee{
          0%{ transform:translate3d(0,0,0); }
          100%{ transform:translate3d(-50%,0,0); }
        }
        .fsia-mh .anc-item{ display:inline-flex !important; align-items:center !important; gap:7px !important;
          padding:0 18px !important; font-size:12px !important; color:#ffffff !important; white-space:nowrap !important; }
        .fsia-mh .anc-item b{ color:#fde8c4 !important; font-weight:600 !important; }
        .fsia-mh .anc-item a{ color:var(--gold) !important; font-weight:700 !important; text-decoration:underline !important;
          text-underline-offset:3px !important; display:inline-flex !important; align-items:center !important; gap:3px !important;
          transition:color .15s ease !important; cursor:pointer !important; }
        .fsia-mh .anc-item a:hover{ color:#ffffff !important; text-decoration:none !important; }
        .fsia-mh .anc-sep{ color:rgba(212,175,55,.6) !important; font-size:11px !important; padding:0 4px !important; user-select:none !important; }
        .fsia-mh .anc-ctrls{ display:flex !important; align-items:center !important; gap:3px !important;
          padding:0 10px !important; height:100% !important; background:linear-gradient(90deg,transparent,rgba(107,5,38,.94) 35%) !important;
          z-index:5 !important; flex-shrink:0 !important; }
        .fsia-mh .anc-btn{ background:transparent !important; border:0 !important; color:rgba(255,255,255,.75) !important;
          cursor:pointer !important; padding:4px 6px !important; display:flex !important; align-items:center !important;
          justify-content:center !important; border-radius:4px !important; transition:color .15s ease,background .15s ease !important; }
        .fsia-mh .anc-btn:hover{ color:#fff !important; background:rgba(255,255,255,.18) !important; }
        @media (max-width:540px){
          .fsia-mh .anc-badge{ padding:0 8px !important; font-size:10px !important; letter-spacing:.4px !important; }
          .fsia-mh .anc-item{ padding:0 12px !important; font-size:11.5px !important; }
        }

        /* ---------- 2. Main nav ---------- */
        .fsia-mh .nav{ display:block !important; border-bottom:1px solid var(--line) !important; background:#fff !important;
          box-shadow:inset 0 1px 0 rgba(255,255,255,.75), 0 8px 18px -14px rgba(31,41,55,.28) !important;
          padding:0 !important; margin:0 !important; list-style:none !important;
          transition:box-shadow .3s ease !important; }
        .fsia-mh .nav-in{ display:flex !important; align-items:center !important; gap:18px !important; height:68px !important;
          transition:height .3s cubic-bezier(.22,.61,.36,1) !important; }
        .fsia-mh.is-scrolled .nav-in{ height:58px !important; }
        .fsia-mh.is-scrolled .nav{ box-shadow:inset 0 1px 0 rgba(255,255,255,.75), 0 14px 28px -18px rgba(31,41,55,.38) !important; }

        /* Brand */
        .fsia-mh .brand{ display:flex !important; align-items:center !important; gap:11px !important; flex:0 0 auto !important; }
        .fsia-mh .brand-img{ height:44px !important; width:auto !important; max-width:150px !important; object-fit:contain !important; display:block !important;
          filter:drop-shadow(0 5px 12px rgba(166,9,61,.30)) !important; transition:transform .2s ease, filter .2s ease, height .3s cubic-bezier(.22,.61,.36,1) !important;
        }
        .fsia-mh .brand:hover .brand-img{ transform:translateY(-1px) scale(1.03) !important; filter:drop-shadow(0 9px 18px rgba(166,9,61,.4)) !important; }
        .fsia-mh.is-scrolled .brand-img{ height:36px !important; }
        .fsia-mh .brand-tx{ display:flex !important; flex-direction:column !important; line-height:1.05 !important; }
        .fsia-mh .brand-tx strong{ font-family:'Playfair Display',Georgia,serif !important; font-weight:700 !important;
          font-size:16px !important; letter-spacing:.4px !important;
          background:linear-gradient(90deg,var(--mar),#c2185b) !important; -webkit-background-clip:text !important;
          background-clip:text !important; color:transparent !important; }
        .fsia-mh .brand-tx span{ font-size:9px !important; text-transform:uppercase !important; letter-spacing:2.4px !important;
          color:var(--ink-soft) !important; font-weight:600 !important; margin-top:2px !important; }

        /* Primary links */
        .fsia-mh .links{ display:flex !important; align-items:center !important; gap:4px !important; margin-left:8px !important; }
        .fsia-mh .links > a, .fsia-mh .reg-btn{ position:relative !important; display:inline-flex !important; align-items:center !important;
          gap:5px !important; font-size:14px !important; font-weight:500 !important; color:var(--ink) !important; white-space:nowrap !important;
          padding:9px 11px !important; border-radius:9px !important; background:transparent !important; border:0 !important;
          cursor:pointer !important; font-family:inherit !important; transition:background .15s ease,color .15s ease !important; }
        .fsia-mh .links > a:hover, .fsia-mh .reg-btn:hover{ color:var(--mar) !important; background:rgba(166,9,61,.05) !important;
          box-shadow:inset 0 1px 0 rgba(255,255,255,.85), 0 5px 12px -5px rgba(166,9,61,.3) !important;
        }
        .fsia-mh .links > a::after{ content:"" !important; position:absolute !important; left:11px !important; right:11px !important;
          bottom:5px !important; height:2px !important; border-radius:2px !important;
          background:linear-gradient(90deg,var(--mar),var(--gold)) !important; transform:scaleX(0) !important;
          transform-origin:left !important; transition:transform .2s ease !important; }
        .fsia-mh .links > a:hover::after{ transform:scaleX(1) !important; }

        /* Right cluster */
        .fsia-mh .right{ margin-left:auto !important; display:flex !important; align-items:center !important; gap:14px !important; flex:0 0 auto !important; }
        .fsia-mh .phone{ display:inline-flex !important; align-items:center !important; gap:7px !important;
          font-size:13.5px !important; font-weight:600 !important; color:var(--ink) !important; white-space:nowrap !important; }
        .fsia-mh .phone .pic{ width:30px !important; height:30px !important; border-radius:50% !important;
          display:inline-flex !important; align-items:center !important; justify-content:center !important;
          background:rgba(166,9,61,.08) !important; color:var(--mar) !important; transition:transform .2s ease !important;
          box-shadow:inset 0 1px 1px rgba(255,255,255,.8), 0 4px 9px -3px rgba(166,9,61,.4) !important;
        }
        .fsia-mh .phone:hover{ color:var(--mar) !important; }
        .fsia-mh .phone:hover .pic{ transform:scale(1.1) rotate(-8deg) !important; }
        .fsia-mh .cta{ position:relative !important; overflow:hidden !important; display:inline-flex !important; align-items:center !important; gap:7px !important;
          background:linear-gradient(135deg,var(--mar),#c2185b 60%,var(--mar-dk)) !important; color:#fff !important;
          font-size:13.5px !important; font-weight:700 !important; padding:10px 20px !important; border-radius:30px !important;
          border:1px solid rgba(212,175,55,.55) !important;
          box-shadow:0 8px 18px -7px rgba(166,9,61,.55),inset 0 1px 0 rgba(255,255,255,.25) !important;
          transition:transform .15s ease,box-shadow .2s ease,filter .2s ease !important; white-space:nowrap !important; }
        .fsia-mh .cta > *{ position:relative !important; z-index:1 !important; }
        .fsia-mh .cta::before{ content:"" !important; position:absolute !important; top:0 !important; left:-60% !important;
          width:35% !important; height:100% !important; pointer-events:none !important;
          background:linear-gradient(115deg,transparent,rgba(255,255,255,.55),transparent) !important;
          transform:skewX(-20deg) !important; }
        .fsia-mh .cta:hover{ filter:brightness(1.06) !important; transform:translateY(-1px) !important;
          box-shadow:0 12px 24px -7px rgba(166,9,61,.62),inset 0 1px 0 rgba(255,255,255,.32) !important; }

        /* Registration mega-menu */
        .fsia-mh .reg{ position:relative !important; }
        .fsia-mh .reg-btn .chev{ transition:transform .2s ease !important; }
        .fsia-mh .reg-menu{ position:absolute !important; top:calc(100% + 10px) !important; left:50% !important;
          transform:translateX(-50%) translateY(6px) !important; width:760px !important; max-width:92vw !important;
          background:#fff !important; border:1px solid var(--line) !important; border-radius:16px !important;
          box-shadow:0 32px 70px -22px rgba(16,24,40,.42), 0 12px 26px -14px rgba(166,9,61,.28), inset 0 1px 0 rgba(255,255,255,.9) !important;
          padding:20px !important; z-index:60 !important;
          display:grid !important; grid-template-columns:repeat(4,1fr) !important; gap:6px 18px !important;
          opacity:0 !important; visibility:hidden !important; pointer-events:none !important;
          transition:opacity .18s ease,transform .18s ease,visibility .18s !important; }
        .fsia-mh .reg-menu::before{ content:"" !important; position:absolute !important; top:-3px !important; left:24px !important; right:24px !important;
          height:3px !important; border-radius:3px !important; background:linear-gradient(90deg,var(--mar),var(--gold),var(--mar)) !important; }
        .fsia-mh .reg:hover .reg-menu, .fsia-mh .reg:focus-within .reg-menu{ opacity:1 !important; visibility:visible !important;
          pointer-events:auto !important; transform:translateX(-50%) translateY(0) !important; }
        .fsia-mh .reg:hover .reg-btn .chev{ transform:rotate(180deg) !important; }
        .fsia-mh .rm-head{ font-size:10.5px !important; font-weight:700 !important; text-transform:uppercase !important;
          letter-spacing:1.2px !important; color:var(--mar) !important; padding:6px 10px 4px !important;
          border-bottom:1px solid var(--line) !important; margin-bottom:4px !important; }
        .fsia-mh .reg-menu a{ display:block !important; font-size:12.5px !important; color:#334155 !important;
          padding:7px 10px !important; border-radius:8px !important; transition:background .14s ease,color .14s ease,padding .14s ease !important; }
        .fsia-mh .reg-menu a:hover{ background:linear-gradient(90deg,rgba(166,9,61,.07),rgba(212,175,55,.07)) !important;
          color:var(--mar) !important; padding-left:14px !important; box-shadow:inset 0 1px 0 rgba(255,255,255,.85), 0 4px 10px -4px rgba(166,9,61,.22) !important; }

        @media (min-width:1101px){
          .fsia-mh .reg-menu > div{ opacity:0 !important; transform:translateY(8px) !important;
            transition:opacity .28s ease,transform .28s ease !important; }
          .fsia-mh .reg:hover .reg-menu > div, .fsia-mh .reg:focus-within .reg-menu > div{ opacity:1 !important; transform:translateY(0) !important; }
          .fsia-mh .reg:hover .reg-menu > div:nth-child(1), .fsia-mh .reg:focus-within .reg-menu > div:nth-child(1){ transition-delay:.02s !important; }
          .fsia-mh .reg:hover .reg-menu > div:nth-child(2), .fsia-mh .reg:focus-within .reg-menu > div:nth-child(2){ transition-delay:.06s !important; }
          .fsia-mh .reg:hover .reg-menu > div:nth-child(3), .fsia-mh .reg:focus-within .reg-menu > div:nth-child(3){ transition-delay:.10s !important; }
          .fsia-mh .reg:hover .reg-menu > div:nth-child(4), .fsia-mh .reg:focus-within .reg-menu > div:nth-child(4){ transition-delay:.14s !important; }
        }

        /* Hamburger + mobile socials (hidden on desktop) */
        .fsia-mh .burger, .fsia-mh .m-socials, .fsia-mh .links .m-phone, .fsia-mh .links .m-cta{ display:none !important; }
        .fsia-mh .burger{ background:transparent !important; border:1px solid var(--line) !important; border-radius:10px !important;
          width:42px !important; height:42px !important; align-items:center !important; justify-content:center !important;
          flex-direction:column !important; gap:5px !important; cursor:pointer !important; color:var(--ink) !important;
          transition:border-color .2s ease,background .2s ease !important; }
        .fsia-mh .burger:hover{ border-color:var(--mar) !important; background:rgba(166,9,61,.05) !important; }
        .fsia-mh .burger .bln{ width:19px !important; height:2px !important; border-radius:2px !important;
          background:var(--ink) !important; transition:transform .3s cubic-bezier(.22,.61,.36,1),opacity .2s ease,width .2s ease !important; }
        .fsia-mh .burger.open .bln:nth-child(1){ transform:translateY(7px) rotate(45deg) !important; }
        .fsia-mh .burger.open .bln:nth-child(2){ opacity:0 !important; width:0 !important; }
        .fsia-mh .burger.open .bln:nth-child(3){ transform:translateY(-7px) rotate(-45deg) !important; }

        /* ---------- 3. Category strip ---------- */
        .fsia-mh .strip{ background:linear-gradient(180deg,#fcfdfe,#f4f6f9) !important; border-bottom:1px solid var(--line) !important; }
        .fsia-mh .strip-in{ display:flex !important; flex-direction:column !important; align-items:stretch !important; gap:10px !important; padding:10px 0 !important; }
        .fsia-mh .search{ display:flex !important; align-items:center !important; gap:8px !important; width:100% !important; flex:none !important;
          background:#fff !important; border:1px solid #dfe3e9 !important; border-radius:24px !important; padding:9px 16px !important;
          box-shadow:inset 0 2px 5px rgba(16,24,40,.10), 0 1px 0 rgba(255,255,255,.85) !important;
          transition:border-color .2s ease,box-shadow .2s ease !important; }
        .fsia-mh .search:focus-within{ border-color:var(--gold) !important; box-shadow:0 0 0 3px rgba(212,175,55,.16) !important; }
        .fsia-mh .search input{ border:0 !important; outline:0 !important; background:transparent !important; font-size:12.5px !important;
          width:100% !important; color:var(--ink) !important; font-family:inherit !important; }
        .fsia-mh .pills{ flex:none !important; min-width:0 !important; width:100% !important; overflow-x:auto !important; scrollbar-width:none !important; }
        .fsia-mh .brand-socials{ display:flex !important; align-items:center !important; gap:6px !important; flex:0 0 auto !important; }
        .fsia-mh .brand-socials a{ width:30px !important; height:30px !important; border-radius:50% !important; display:inline-flex !important;
          align-items:center !important; justify-content:center !important; color:#64748b !important; background:#fff !important;
          border:1px solid #dfe3e9 !important; box-shadow:0 2px 5px rgba(16,24,40,.08), inset 0 1px 0 rgba(255,255,255,.7) !important;
          transition:all .16s ease !important; }
        .fsia-mh .brand-socials a:hover{ color:var(--mar) !important; border-color:var(--mar) !important; transform:translateY(-2px) !important;
          box-shadow:0 8px 16px -4px rgba(166,9,61,.42) !important; }
        .fsia-mh .pills::-webkit-scrollbar{ display:none !important; }
        .fsia-mh .pills-in{ display:flex !important; gap:8px !important; white-space:nowrap !important; width:max-content !important; }
        .fsia-mh .pills-in a{ display:inline-block !important; font-size:11.5px !important; font-weight:500 !important; color:#475569 !important;
          background:#fff !important; border:1px solid #dfe3e9 !important; border-radius:20px !important; padding:5px 14px !important;
          box-shadow:0 2px 5px rgba(16,24,40,.07), inset 0 1px 0 rgba(255,255,255,.7) !important;
          transition:all .16s ease !important; }
        .fsia-mh .pills-in a:hover{ border-color:var(--mar) !important; color:var(--mar) !important; transform:translateY(-1px) !important;
          box-shadow:0 7px 14px -5px rgba(166,9,61,.3), inset 0 1px 0 rgba(255,255,255,.85) !important; }
        .fsia-mh .pills-in a.active{ background:linear-gradient(135deg,var(--mar),var(--mar-dk)) !important; color:#fff !important;
          border-color:var(--gold) !important; box-shadow:0 6px 14px -4px rgba(166,9,61,.5), 0 2px 0 rgba(122,6,44,.6), inset 0 1px 0 rgba(255,255,255,.32) !important;
          transform:translateY(-1px) !important; }

        .fsia-mh .pills-wrap{ position:relative !important; width:100% !important; min-width:0 !important; }
        .fsia-mh .pills-wrap::before, .fsia-mh .pills-wrap::after{ content:"" !important; position:absolute !important;
          top:0 !important; bottom:0 !important; width:38px !important; pointer-events:none !important; z-index:2 !important;
          opacity:0 !important; transition:opacity .2s ease !important; }
        .fsia-mh .pills-wrap::before{ left:0 !important; background:linear-gradient(90deg,#f6f8fb 15%,rgba(246,248,251,0)) !important; }
        .fsia-mh .pills-wrap::after{ right:0 !important; background:linear-gradient(270deg,#f6f8fb 15%,rgba(246,248,251,0)) !important; }
        .fsia-mh .pills-wrap.can-left::before{ opacity:1 !important; }
        .fsia-mh .pills-wrap.can-right::after{ opacity:1 !important; }

        .fsia-mh .pills-arrow{ position:absolute !important; top:50% !important; transform:translateY(-50%) !important;
          width:26px !important; height:26px !important; border-radius:50% !important; z-index:3 !important;
          display:none !important; align-items:center !important; justify-content:center !important;
          background:#fff !important; border:1px solid #dfe3e9 !important; color:var(--mar) !important;
          cursor:pointer !important; padding:0 !important; font-family:inherit !important;
          box-shadow:0 4px 10px -3px rgba(16,24,40,.25) !important; transition:transform .15s ease,border-color .15s ease !important; }
        .fsia-mh .pills-arrow:hover{ border-color:var(--mar) !important; transform:translateY(-50%) scale(1.08) !important; }
        .fsia-mh .pills-arrow.prev{ left:0 !important; }
        .fsia-mh .pills-arrow.next{ right:0 !important; }
        .fsia-mh .pills-wrap.can-left .pills-arrow.prev{ display:inline-flex !important; }
        .fsia-mh .pills-wrap.can-right .pills-arrow.next{ display:inline-flex !important; }

        /* ---------- Mobile ---------- */
        @media (max-width:1100px){
          .fsia-mh .nav-in{ height:60px !important; gap:10px !important; }
          .fsia-mh.is-scrolled .nav-in{ height:54px !important; }
          .fsia-mh .links, .fsia-mh .phone, .fsia-mh .cta{ display:none !important; }
          .fsia-mh .burger{ display:inline-flex !important; margin-left:0 !important; }
          .fsia-mh .brand-socials{ display:flex !important; flex:0 0 auto !important; margin-left:8px !important; }
          .fsia-mh .right{ margin-left:auto !important; }
          .fsia-mh .brand{ min-width:0 !important; flex:1 1 auto !important; }
          .fsia-mh .brand-tx{ min-width:0 !important; flex:1 1 auto !important; }
          .fsia-mh .brand-tx strong{ display:block !important; width:100% !important; white-space:nowrap !important; overflow:hidden !important; text-overflow:ellipsis !important; max-width:none !important; }
          .fsia-mh .search{ display:flex !important; width:100% !important; }

          .fsia-mh .links{ position:absolute !important; left:0 !important; right:0 !important; top:100% !important;
            flex-direction:column !important; align-items:stretch !important; gap:2px !important; background:#fff !important;
            border-top:1px solid var(--line) !important; box-shadow:0 16px 30px -12px rgba(16,24,40,.2) !important;
            padding:10px !important; max-height:calc(100vh - 110px) !important; overflow-y:auto !important; z-index:70 !important;
            opacity:0 !important; transform:translateY(-8px) !important; visibility:hidden !important;
            transition:opacity .22s ease,transform .22s ease,visibility .22s !important; }
          .fsia-mh .links.open{ display:flex !important; opacity:1 !important; transform:translateY(0) !important; visibility:visible !important; }
          .fsia-mh .links > a, .fsia-mh .reg-btn{ width:100% !important; justify-content:flex-start !important; padding:13px 14px !important;
            font-size:15px !important; border-radius:10px !important; }
          .fsia-mh .links > a::after{ display:none !important; }

          .fsia-mh .links .m-phone{ display:inline-flex !important; gap:8px !important; color:var(--mar) !important; font-weight:600 !important; }

          .fsia-mh .reg-menu{ position:static !important; transform:none !important; width:100% !important; max-width:100% !important;
            grid-template-columns:1fr !important; box-shadow:none !important; border:0 !important; padding:0 6px 6px !important;
            opacity:1 !important; visibility:visible !important; pointer-events:auto !important; display:none !important; }
          .fsia-mh .reg-menu::before{ display:none !important; }
          .fsia-mh .reg-menu > div{ opacity:1 !important; transform:none !important; }
          .fsia-mh .reg:hover .reg-menu,
          .fsia-mh .reg:focus-within .reg-menu{ transform:none !important; display:none !important; }
          .fsia-mh .reg.reg-open .reg-menu,
          .fsia-mh .reg.reg-open:hover .reg-menu,
          .fsia-mh .reg.reg-open:focus-within .reg-menu{ display:block !important; transform:none !important;
            opacity:1 !important; visibility:visible !important; pointer-events:auto !important; }
          .fsia-mh .reg.reg-open .reg-btn .chev{ transform:rotate(180deg) !important; }

          .fsia-mh .m-socials{ display:flex !important; gap:10px !important; padding:12px 14px 4px !important; }
          .fsia-mh .m-socials a{ width:38px !important; height:38px !important; border-radius:50% !important; display:inline-flex !important;
            align-items:center !important; justify-content:center !important; background:var(--mist) !important; border:1px solid var(--line) !important;
            color:var(--mar) !important; transition:transform .15s ease !important; }
          .fsia-mh .m-socials a:hover{ transform:translateY(-2px) !important; }

          .fsia-mh .strip-in{ padding:8px 0 !important; }
        }

        @media (max-width:560px){
          .fsia-mh .wrap{ padding:0 14px !important; }
          .fsia-mh .brand-tx{ display:flex !important; min-width:0 !important; }
          .fsia-mh .brand-tx span{ display:none !important; }
          .fsia-mh .brand-tx strong{ font-size:13px !important; letter-spacing:.2px !important; }
          .fsia-mh .anc-in{ font-size:11.5px !important; }
          .fsia-mh .brand-socials{ gap:5px !important; }
          .fsia-mh .brand-socials a{ width:26px !important; height:26px !important; }
          .fsia-mh .brand-socials a svg{ width:12px !important; height:12px !important; }
        }
        @media (max-width:400px){
          .fsia-mh .brand-socials{ display:none !important; }
        }
        @media (max-width:380px){
          .fsia-mh .brand-socials a{ width:24px !important; height:24px !important; }
          .fsia-mh .brand-mark, .fsia-mh .brand-img{ height:34px !important; }
        }

        @media (prefers-reduced-motion:no-preference){
          @keyframes fsiaDropIn{ from{ opacity:0; transform:translateY(-12px); } to{ opacity:1; transform:translateY(0); } }
          @keyframes fsiaPulseDot{ 0%{ box-shadow:0 0 0 0 rgba(212,175,55,.55); } 70%{ box-shadow:0 0 0 6px rgba(212,175,55,0); } 100%{ box-shadow:0 0 0 0 rgba(212,175,55,0); } }
          @keyframes fsiaShimmer{ 0%,55%{ left:-60%; } 100%{ left:130%; } }
          .fsia-mh .anc{ animation:fsiaDropIn .5s cubic-bezier(.22,.61,.36,1) both !important; }
          .fsia-mh .nav{ animation:fsiaDropIn .55s .08s cubic-bezier(.22,.61,.36,1) both !important; }
          .fsia-mh .strip{ animation:fsiaDropIn .6s .14s cubic-bezier(.22,.61,.36,1) both !important; }
          .fsia-mh .anc-live{ animation:fsiaPulseDot 1.8s ease-in-out infinite !important; }
          .fsia-mh .cta::before{ animation:fsiaShimmer 4.5s ease-in-out infinite !important; }
        }
      `}</style>

      {/* Canonical FSIA Header Element (.fsia-mh) */}
      <header className="fsia-mh" id="fsiaMH">
        {/* 1. CONTINUOUS FLOWING ANNOUNCEMENT TICKER */}
        {!isTickerDismissed && (
          <div
            className="anc"
            id="fsiaAnc"
            role="region"
            aria-label="Official Announcements Ticker"
          >
            {/* Live Badge */}
            <div className="anc-badge">
              <span className="anc-pulse" aria-hidden="true" />
              <span>LIVE UPDATES</span>
            </div>

            {/* Marquee Viewport */}
            <div
              className="anc-marquee"
              title="Continuous announcement ticker (Hover to pause)"
            >
              <div className={`anc-track ${isTickerPaused ? 'is-paused' : ''}`}>
                {/* Render two identical sets of items for seamless infinite loop */}
                {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
                  <div key={idx} className="anc-item">
                    <span>{item.icon}</span>
                    <span>
                      <b>{item.title}</b> {item.text}
                    </span>
                    {item.isExternal ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.linkText}
                      </a>
                    ) : (
                      <a
                        href={item.link}
                        onClick={(e) => {
                          if (item.section) {
                            handleNavClick(item.section, e);
                          }
                        }}
                      >
                        {item.linkText}
                      </a>
                    )}
                    <span className="anc-sep" aria-hidden="true">✦</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Action Controls: Pause & Close */}
            <div className="anc-ctrls">
              <button
                className="anc-btn"
                type="button"
                onClick={() => setIsTickerPaused(!isTickerPaused)}
                aria-label={isTickerPaused ? 'Resume ticker movement' : 'Pause ticker movement'}
                title={isTickerPaused ? 'Resume scroll' : 'Pause scroll'}
              >
                {isTickerPaused ? (
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                ) : (
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </svg>
                )}
              </button>

              <button
                className="anc-btn"
                type="button"
                onClick={() => setIsTickerDismissed(true)}
                aria-label="Dismiss Announcement Bar"
                title="Dismiss bar"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* 2. MAIN NAV */}
        <nav className="nav">
          <div className="wrap">
            <div className="nav-in">
              <a href="https://www.fsia.in/" className="brand" aria-label="Forever Star India home">
                <img
                  src="https://www.fsia.in/assets-new/media/logo.gif"
                  alt="Forever Star India"
                  className="brand-img"
                  onError={(e) => {
                    e.currentTarget.src = 'https://www.fsia.in/favicon.ico';
                  }}
                />
                <span className="brand-tx">
                  <strong>FOREVER STAR INDIA</strong>
                  <span>Beauty Pageants &amp; Awards</span>
                </span>
              </a>

              <div className="brand-socials">
                <a href="https://www.facebook.com/Foreverstarindiaawards/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a href="https://www.instagram.com/fsia_forever/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </a>
                <a href="https://www.youtube.com/c/foreverstarindiaaward" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 0 0 1.96-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#fff"/></svg>
                </a>
              </div>

              <div className="links" id="fsiaLinks">
                <a href="#hero" onClick={(e) => handleNavClick('hero', e)}>Home</a>
                <a href="#about" onClick={(e) => handleNavClick('about', e)}>About</a>
                <div className="reg" id="fsiaReg">
                  <button className="reg-btn" type="button" aria-expanded="false">
                    Registration
                    <svg className="chev" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg>
                  </button>
                  <div className="reg-menu">
                    <div>
                      <div className="rm-head">Beauty Pageants</div>
                      <a href="https://www.fsia.in/quickapply" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)', fontWeight: 700 }}>⚡ Quick Apply (All Events)</a>
                      <a href="https://www.fsia.in/forever-miss-india-new.php">Forever Miss India</a>
                      <a href="https://www.fsia.in/forever-mrs-india-new.php">Forever Mrs India</a>
                      <a href="https://www.fsia.in/forever-miss-teen-india-new.php">Forever Miss Teen India</a>
                      <a href="https://www.fsia.in/miss-fsia-international-2024.php">Miss FSIA International</a>
                      <a href="https://www.fsia.in/mrs-fsia-international-2024.php">Mrs FSIA International</a>
                    </div>
                    <div>
                      <div className="rm-head">International</div>
                      <a href="https://www.fsia.in/miss-world-beauty-pageant.php">Miss World</a>
                      <a href="https://www.fsia.in/mrs-world-beauty-pageant.php">Mrs World</a>
                      <a href="https://www.fsia.in/miss-universe-beauty-pageant.php">Miss Universe</a>
                      <a href="https://www.fsia.in/mrs-universe-beauty-pageant.php">Mrs Universe</a>
                    </div>
                    <div>
                      <div className="rm-head">Award Shows</div>
                      <a href="https://www.fsia.in/super-hero-award.php">Super Hero Award</a>
                      <a href="https://www.fsia.in/super-woman-award.php">Super Woman Award</a>
                      <a href="https://www.fsia.in/business-awards.php">Business Awards</a>
                      <a href="https://www.fsia.in/bharat-national-awards.php">Bharat National Awards</a>
                      <a href="https://www.fsia.in/international-award.php">International Award</a>
                      <a href="https://www.fsia.in/infinity-achievers">Infinity Achievers</a>
                      <a href="https://www.fsia.in/forever-achievers">Forever Achievers</a>
                      <a href="https://www.fsia.in/nominate-yourself">Nominate Yourself</a>
                    </div>
                    <div>
                      <div className="rm-head">Creative &amp; Pro</div>
                      <a href="https://www.fsia.in/star-india-kids-contest.php">Forever Star Kids</a>
                      <a href="https://www.fsia.in/fashion-designer.php">Fashion Designers</a>
                      <a href="https://www.fsia.in/makeup-artist.php">Makeup Artists</a>
                      <a href="https://www.fsia.in/bharat-couture-week-fashion-week.php">Bharat Couture Week</a>
                      <a href="https://www.fsia.in/channel-partner">Channel Partner</a>
                    </div>
                  </div>
                </div>
                <a href="#pageants" onClick={(e) => handleNavClick('pageants', e)}>Pageants</a>
                <a href="#awards" onClick={(e) => handleNavClick('awards', e)}>Awards</a>
                <a href="#schedule" onClick={(e) => handleNavClick('schedule', e)}>Dates Calendar</a>
                <a href="#winners" onClick={(e) => handleNavClick('winners', e)}>Winners</a>
                <a href="#success-stories" onClick={(e) => handleNavClick('success-stories', e)}>Success Stories</a>
                <a href="#team" onClick={(e) => handleNavClick('team', e)}>Our Team</a>
                <a href="https://www.fsia.in/news-coverage.php" target="_blank" rel="noopener noreferrer">News</a>
                <a href="https://www.fsia.in/online-franchise-application" target="_blank" rel="noopener noreferrer">Franchise</a>

                {/* Mobile panel phone links */}
                <a className="m-phone" href="tel:+919983286999">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3.09 4.18 2 2 0 0 1 5.07 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L9.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  +91-99832-86999
                </a>
                <a className="m-phone" href="mailto:care@fsia.in">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>
                  care@fsia.in
                </a>

                {/* Mobile panel socials */}
                <div className="m-socials">
                  <a href="https://www.facebook.com/Foreverstarindiaawards/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  </a>
                  <a href="https://www.instagram.com/fsia_forever/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                  </a>
                  <a href="https://www.youtube.com/c/foreverstarindiaaward" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 0 0 1.96-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#fff"/></svg>
                  </a>
                </div>
              </div>

              <div className="right">
                <a className="phone" href="tel:+919983286999" title="Call Official FSIA Helpline">
                  <span className="pic">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3.09 4.18 2 2 0 0 1 5.07 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L9.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  </span>
                  +91-99832-86999
                </a>
                <a
                  href="https://www.fsia.in/quickapply"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta"
                  aria-label="Quick Apply for FSIA 2026"
                >
                  <span>Quick Apply</span>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
                <button className="burger" id="fsiaBurger" aria-label="Open menu" aria-expanded="false" type="button">
                  <span className="bln"></span>
                  <span className="bln"></span>
                  <span className="bln"></span>
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* 3. CATEGORY STRIP */}
        <div className="strip">
          <div className="wrap">
            <div className="strip-in">
              <div className="search">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.4"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input
                  ref={searchInputRef}
                  type="search"
                  id="fsiaSearchInput"
                  autoComplete="off"
                  placeholder="Search FSIA…"
                  aria-label="Search"
                  onFocus={() => {
                    if (onOpenSearch) onOpenSearch();
                  }}
                />
              </div>
              <div className="pills-wrap" id="fsiaPillsWrap">
                <button className="pills-arrow prev" type="button" aria-label="Scroll tabs left">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M15 18l-6-6 6-6"/></svg>
                </button>
                <button className="pills-arrow next" type="button" aria-label="Scroll tabs right">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M9 18l6-6-6-6"/></svg>
                </button>
                <nav className="pills" id="fsiaPills" aria-label="Quick links">
                  <div className="pills-in">
                    <a
                      href="#schedule"
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate?.('schedule');
                      }}
                      className="active"
                      title="View Upcoming Pageant & Award Dates Calendar"
                    >
                      ★ 2026/27 Calendar
                    </a>
                    <a
                      href="#success-stories"
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate?.('success-stories');
                      }}
                      title="Watch Winner Video Reels & Success Stories"
                    >
                      ▶ Video Reels
                    </a>
                    <a href="https://www.fsia.in/best-achievers-in-india">Achievers</a>
                    <a href="https://www.fsia.in/all-india-pageant-contestant">Contestants</a>
                    <a href="https://www.fsia.in/top-awardee-in-india">Awardees</a>
                    <a href="https://www.fsia.in/model-gallery">Gallery</a>
                    <a href="https://www.fsia.in/national-award">National Award</a>
                    <a href="https://www.fsia.in/fashion-gallery">Fashion Gallery</a>
                    <a href="https://www.fsia.in/pageant-winner">Winners</a>
                    <a href="https://www.fsia.in/pageant-winner">Finalists</a>
                    <a href="https://www.fsia.in/achievers-gallery">Achievers Gallery</a>
                    <a href="https://www.fsia.in/international-award-gallery">International Award Gallery</a>
                    <a href="https://www.fsia.in/miss-india-fashion-designer">Miss India Fashion Designers</a>
                    <a href="https://www.fsia.in/miss-india-makeup-artist">Miss India Makeup Artists</a>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
