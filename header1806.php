<!-- ===== FSIA header v4 — professional / mobile-first / animated ===== -->
<style>
  /* Isolation: stop Tailwind/global CSS from leaking into the header */
  .fsia-mh{ all: unset; display:block !important; width:100% !important; box-sizing:border-box !important;
    background:#fff !important; font-family:'Poppins',system-ui,Segoe UI,Arial,sans-serif !important;
    --mar:#A6093D; --mar-dk:#7a062c; --gold:#D4AF37; --gold-dk:#b8860b;
    --ink:#1f2937; --ink-soft:#64748b; --line:#e8eaee; --paper:#ffffff; --mist:#f8fafc;
    position:relative !important; z-index:50 !important;
  }
  .fsia-mh *{ box-sizing:border-box !important; }
  .fsia-mh a{ text-decoration:none !important; color:inherit !important; }
  .fsia-mh .wrap{ width:100% !important; max-width:1240px !important; margin:0 auto !important; padding:0 22px !important; }

  /* ---------- 1. Announcement ---------- */
  .fsia-mh .anc{ background:linear-gradient(90deg,var(--mar),var(--mar-dk)) !important;
    color:#fff !important; font-size:12.5px !important; line-height:1.4 !important;
    border-bottom:1px solid rgba(212,175,55,.45) !important; overflow:hidden !important; }
  .fsia-mh .anc-in{ display:flex !important; align-items:center !important; justify-content:center !important;
    gap:10px !important; padding:7px 40px 7px 16px !important; position:relative !important; text-align:center !important; }
  .fsia-mh .anc-in b{ font-weight:600 !important; color:#fde8c4 !important; }
  .fsia-mh .anc-in a{ color:var(--gold) !important; font-weight:700 !important; white-space:nowrap !important;
    display:inline-flex !important; align-items:center !important; gap:4px !important; }
  .fsia-mh .anc-in a .arrow{ display:inline-block !important; transition:transform .2s ease !important; }
  .fsia-mh .anc-in a:hover .arrow{ transform:translateX(4px) !important; }
  .fsia-mh .anc-live{ width:7px !important; height:7px !important; border-radius:50% !important;
    background:var(--gold) !important; flex:0 0 auto !important; }
  .fsia-mh .anc-x{ position:absolute !important; right:12px !important; top:50% !important; transform:translateY(-50%) !important;
    background:transparent !important; border:0 !important; color:rgba(255,255,255,.7) !important;
    font-size:16px !important; line-height:1 !important; cursor:pointer !important; padding:4px !important;
    transition:color .15s ease,transform .15s ease !important; }
  .fsia-mh .anc-x:hover{ color:#fff !important; transform:translateY(-50%) rotate(90deg) !important; }

  /* ---------- 2. Main nav ---------- */
  /* display + width are pinned: Bootstrap (loaded by some pages) also styles .nav and .wrap,
     which otherwise shrink-wraps this row and centres the logo. */
  .fsia-mh .nav{ display:block !important; border-bottom:1px solid var(--line) !important; background:#fff !important;
    box-shadow:0 1px 0 rgba(16,24,40,.02) !important;
    position:sticky !important; top:0 !important; z-index:55 !important;
    padding:0 !important; margin:0 !important; list-style:none !important;
    transition:box-shadow .3s ease !important; }
  .fsia-mh .nav-in{ display:flex !important; align-items:center !important; gap:18px !important; height:68px !important;
    transition:height .3s cubic-bezier(.22,.61,.36,1) !important; }
  .fsia-mh.is-scrolled .nav-in{ height:58px !important; }
  .fsia-mh.is-scrolled .nav{ box-shadow:0 10px 24px -16px rgba(31,41,55,.35) !important; }

  /* Brand */
  .fsia-mh .brand{ display:flex !important; align-items:center !important; gap:11px !important; flex:0 0 auto !important; }
  .fsia-mh .brand-img{ height:44px !important; width:auto !important; max-width:150px !important; object-fit:contain !important; display:block !important; }
  .fsia-mh.is-scrolled .brand-img{ height:36px !important; }
  .fsia-mh .brand-mark{ width:40px !important; height:40px !important; border-radius:11px !important;
    display:flex !important; align-items:center !important; justify-content:center !important;
    background:linear-gradient(135deg,var(--mar),var(--mar-dk)) !important;
    border:1px solid rgba(212,175,55,.55) !important; box-shadow:0 4px 12px -4px rgba(166,9,61,.5) !important;
    color:var(--gold) !important; font-family:'Playfair Display',Georgia,serif !important; font-weight:700 !important;
    font-size:17px !important; letter-spacing:.5px !important; transition:width .3s ease,height .3s ease !important; }
  .fsia-mh.is-scrolled .brand-mark{ width:34px !important; height:34px !important; }
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
  .fsia-mh .links > a:hover, .fsia-mh .reg-btn:hover{ color:var(--mar) !important; background:rgba(166,9,61,.05) !important; }
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
    background:rgba(166,9,61,.08) !important; color:var(--mar) !important; transition:transform .2s ease !important; }
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
    box-shadow:0 24px 60px -18px rgba(16,24,40,.28) !important; padding:20px !important; z-index:60 !important;
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
    color:var(--mar) !important; padding-left:14px !important; }

  /* Mega-menu columns cascade in one after another (desktop only) */
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
    transition:border-color .2s ease,box-shadow .2s ease !important; }
  .fsia-mh .search:focus-within{ border-color:var(--gold) !important; box-shadow:0 0 0 3px rgba(212,175,55,.16) !important; }
  .fsia-mh .search input{ border:0 !important; outline:0 !important; background:transparent !important; font-size:12.5px !important;
    width:100% !important; color:var(--ink) !important; font-family:inherit !important; }
  .fsia-mh .pills{ flex:none !important; min-width:0 !important; width:100% !important; overflow-x:auto !important; scrollbar-width:none !important; }
  .fsia-mh .brand-socials{ display:flex !important; align-items:center !important; gap:6px !important; flex:0 0 auto !important; }
  .fsia-mh .brand-socials a{ width:30px !important; height:30px !important; border-radius:50% !important; display:inline-flex !important;
    align-items:center !important; justify-content:center !important; color:#64748b !important; background:#fff !important;
    border:1px solid #dfe3e9 !important; transition:all .16s ease !important; }
  .fsia-mh .brand-socials a:hover{ color:var(--mar) !important; border-color:var(--mar) !important; transform:translateY(-1px) !important; }
  .fsia-mh .pills::-webkit-scrollbar{ display:none !important; }
  .fsia-mh .pills-in{ display:flex !important; gap:8px !important; white-space:nowrap !important; width:max-content !important; }
  .fsia-mh .pills-in a{ display:inline-block !important; font-size:11.5px !important; font-weight:500 !important; color:#475569 !important;
    background:#fff !important; border:1px solid #dfe3e9 !important; border-radius:20px !important; padding:5px 14px !important;
    transition:all .16s ease !important; }
  .fsia-mh .pills-in a:hover{ border-color:var(--mar) !important; color:var(--mar) !important; transform:translateY(-1px) !important; }
  .fsia-mh .pills-in a.active{ background:linear-gradient(135deg,var(--mar),var(--mar-dk)) !important; color:#fff !important;
    border-color:var(--gold) !important; box-shadow:0 4px 12px -4px rgba(166,9,61,.45) !important; }

  /* Scroll affordance: fades + arrows tell the visitor there are more tabs sideways */
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

  /* First-visit nudge: the row rocks once so the extra tabs are obviously reachable */
  @media (prefers-reduced-motion:no-preference){
    @keyframes fsiaPillsHint{ 0%,100%{ transform:translateX(0); } 45%{ transform:translateX(-16px); } }
    .fsia-mh .pills.hint .pills-in{ animation:fsiaPillsHint 1.1s ease-in-out 1 !important; }
  }

  /* ---------- Mobile ---------- */
  @media (max-width:1100px){
    .fsia-mh .nav-in{ height:60px !important; gap:10px !important; }
    .fsia-mh.is-scrolled .nav-in{ height:54px !important; }
    .fsia-mh .links, .fsia-mh .phone, .fsia-mh .cta{ display:none !important; }
    .fsia-mh .burger{ display:inline-flex !important; margin-left:0 !important; }
    /* icons stay between the brand and the burger; burger stays pinned to the far right */
    .fsia-mh .brand-socials{ display:flex !important; flex:0 0 auto !important; margin-left:8px !important; }
    .fsia-mh .right{ margin-left:auto !important; }
    .fsia-mh .brand{ min-width:0 !important; flex:1 1 auto !important; }
    .fsia-mh .brand-tx{ min-width:0 !important; flex:1 1 auto !important; }
    .fsia-mh .brand-tx strong{ display:block !important; width:100% !important; white-space:nowrap !important; overflow:hidden !important; text-overflow:ellipsis !important; max-width:none !important; }
    .fsia-mh .search{ display:flex !important; width:100% !important; }

    /* Slide-down panel */
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

    /* Mobile phone inside the panel */
    .fsia-mh .links .m-phone{ display:inline-flex !important; gap:8px !important; color:var(--mar) !important; font-weight:600 !important; }

    /* Mega-menu becomes an in-place accordion (override desktop hover/focus transforms) */
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

    /* Category strip full-bleed scroll */
    .fsia-mh .strip-in{ padding:8px 0 !important; }
  }
  @media (max-width:560px){
    .fsia-mh .wrap{ padding:0 14px !important; }
    .fsia-mh .brand-tx{ display:flex !important; min-width:0 !important; }
    .fsia-mh .brand-tx span{ display:none !important; } /* hide tagline only */
    .fsia-mh .brand-tx strong{ font-size:13px !important; letter-spacing:.2px !important; }
    .fsia-mh .anc-in{ font-size:11.5px !important; }
    .fsia-mh .brand-socials{ gap:5px !important; }
    .fsia-mh .brand-socials a{ width:26px !important; height:26px !important; }
    .fsia-mh .brand-socials a svg{ width:12px !important; height:12px !important; }
  }
  @media (max-width:400px){
    /* icons already live in the slide-down menu (.m-socials) — drop the duplicate row here
       so the brand name always has full width on the smallest phones */
    .fsia-mh .brand-socials{ display:none !important; }
  }
  @media (max-width:380px){
    .fsia-mh .brand-socials a{ width:24px !important; height:24px !important; }
    .fsia-mh .brand-mark, .fsia-mh .brand-img{ height:34px !important; }
  }

  /* ---------- Motion: entrance + ambient animation ---------- */
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
</style>

<!-- ===== FSIA 3D design layer — premium elevation system =====
     Single light source (top), shadows fall down/right. Depth hierarchy:
     mega-menu (highest) > raised pills > nav surface > recessed search. -->
<style>
  /* Header floats above the page content */
  .fsia-mh{ box-shadow:0 14px 32px -18px rgba(31,41,55,.32) !important; }
  .fsia-mh .nav{ box-shadow:inset 0 1px 0 rgba(255,255,255,.75), 0 8px 18px -14px rgba(31,41,55,.28) !important; }
  .fsia-mh.is-scrolled .nav{ box-shadow:inset 0 1px 0 rgba(255,255,255,.75), 0 14px 28px -18px rgba(31,41,55,.38) !important; }

  /* Announcement — embossed bar with gold under-edge */
  .fsia-mh .anc{ box-shadow:inset 0 1px 0 rgba(255,255,255,.18), 0 4px 10px -5px rgba(122,6,44,.5) !important; }

  /* Logo lifts off the surface */
  .fsia-mh .brand-img{ filter:drop-shadow(0 5px 12px rgba(166,9,61,.30)) !important; transition:transform .2s ease, filter .2s ease, height .3s cubic-bezier(.22,.61,.36,1) !important; }
  .fsia-mh .brand:hover .brand-img{ transform:translateY(-1px) scale(1.03) !important; filter:drop-shadow(0 9px 18px rgba(166,9,61,.4)) !important; }
  .fsia-mh .brand-mark{ box-shadow:0 8px 16px -6px rgba(166,9,61,.55), inset 0 1px 0 rgba(255,255,255,.3) !important; }

  /* Nav links + Registration lift into a soft 3D chip on hover */
  .fsia-mh .links > a:hover, .fsia-mh .reg-btn:hover{
    box-shadow:inset 0 1px 0 rgba(255,255,255,.85), 0 5px 12px -5px rgba(166,9,61,.3) !important; }

  /* Phone chip — domed */
  .fsia-mh .phone .pic{ box-shadow:inset 0 1px 1px rgba(255,255,255,.8), 0 4px 9px -3px rgba(166,9,61,.4) !important; }

  /* Search — recessed (inset) field */
  .fsia-mh .search{ box-shadow:inset 0 2px 5px rgba(16,24,40,.10), 0 1px 0 rgba(255,255,255,.85) !important; }

  /* Category pills — subtle depth; hover lifts; active raised with gold rim */
  .fsia-mh .pills-in a{ box-shadow:0 2px 5px rgba(16,24,40,.07), inset 0 1px 0 rgba(255,255,255,.7) !important; }
  .fsia-mh .pills-in a:hover{ transform:translateY(-1px) !important; box-shadow:0 7px 14px -5px rgba(166,9,61,.3), inset 0 1px 0 rgba(255,255,255,.85) !important; }
  .fsia-mh .pills-in a.active{
    box-shadow:0 6px 14px -4px rgba(166,9,61,.5), 0 2px 0 rgba(122,6,44,.6), inset 0 1px 0 rgba(255,255,255,.32) !important;
    transform:translateY(-1px) !important; }

  /* Brand-line socials — depth + lift */
  .fsia-mh .brand-socials a{ box-shadow:0 2px 5px rgba(16,24,40,.08), inset 0 1px 0 rgba(255,255,255,.7) !important; }
  .fsia-mh .brand-socials a:hover{ box-shadow:0 8px 16px -4px rgba(166,9,61,.42) !important; transform:translateY(-2px) !important; }

  /* Registration mega-menu — most-elevated floating panel (desktop only) */
  @media (min-width:1101px){
    .fsia-mh .reg-menu{
      box-shadow:0 32px 70px -22px rgba(16,24,40,.42), 0 12px 26px -14px rgba(166,9,61,.28),
                 inset 0 1px 0 rgba(255,255,255,.9) !important; }
    .fsia-mh .reg-menu a:hover{ box-shadow:inset 0 1px 0 rgba(255,255,255,.85), 0 4px 10px -4px rgba(166,9,61,.22) !important; }
  }
  .fsia-mh .search{ position:relative !important; }
.fsia-mh .search-results{ position:absolute !important; top:calc(100% + 8px) !important; left:0 !important; right:0 !important;
  background:#fff !important; border:1px solid var(--line) !important; border-radius:14px !important;
  box-shadow:0 20px 45px -18px rgba(16,24,40,.3) !important; max-height:340px !important; overflow-y:auto !important;
  z-index:65 !important; padding:6px !important; list-style:none !important; margin:0 !important; display:none !important; }
.fsia-mh .search-results.open{ display:block !important; }
.fsia-mh .search-results li{ display:flex !important; align-items:center !important; gap:10px !important;
  padding:8px 10px !important; border-radius:10px !important; cursor:pointer !important; font-size:12.5px !important;
  color:#334155 !important; transition:background .14s ease !important; }
.fsia-mh .search-results li:hover{ background:rgba(166,9,61,.06) !important; color:var(--mar) !important; }
.fsia-mh .search-results li img{ width:32px !important; height:32px !important; border-radius:8px !important;
  object-fit:cover !important; flex:0 0 auto !important; background:#f1f5f9 !important; }
.fsia-mh .search-results li .sr-empty{ color:#94a3b8 !important; padding:8px 10px !important; display:block !important; }
</style>


<!-- Hide the legacy Contact Account Manager bar site-wide (support now lives in the Need Assistance panel) -->
<style>.contact-manager-bar{display:none !important;visibility:hidden !important;}</style>
<!-- The old header was position:fixed, so main.css / newstylenew.css reserve space with
     body{padding-top:…}. This header sits in the normal flow, so that spacer is a blank gap. -->
<style>body{ padding-top:0 !important; }</style>
<div class="fsia-mh" id="fsiaMH">
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-T3674CM" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>

  <!-- 1. ANNOUNCEMENT -->
  <div class="anc" id="fsiaAnc">
    <div class="wrap">
      <div class="anc-in">
        <span class="anc-live" aria-hidden="true"></span>
        <span><b>Now open:</b> Auditions Miss India, Mrs India &amp; Miss Teen India 2026 - Limited Entries</span>
        <a href="https://www.fsia.in/quickapply">Register <span class="arrow">→</span></a>
        <button class="anc-x" aria-label="Dismiss" onclick="var a=document.getElementById('fsiaAnc'); if(a) a.style.display='none';">✕</button>
      </div>
    </div>
  </div>

  <!-- 2. MAIN NAV -->
  <nav class="nav">
    <div class="wrap">
      <div class="nav-in">
        <a href="/index.php" class="brand" aria-label="Forever Star India home">
          <img src="/assets-new/media/logo.gif" alt="Forever Star India" class="brand-img">
          <span class="brand-tx">
            <strong>FOREVER STAR INDIA</strong>
            <span>Beauty Pageants &amp; Awards</span>
          </span>
        </a>

        <div class="brand-socials">
          <a href="https://www.facebook.com/Foreverstarindiaawards/" target="_blank" rel="noopener" aria-label="Facebook"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
          <a href="https://www.instagram.com/fsia_forever/" target="_blank" rel="noopener" aria-label="Instagram"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
          <a href="https://www.youtube.com/c/foreverstarindiaaward" target="_blank" rel="noopener" aria-label="YouTube"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 0 0 1.96-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#fff"/></svg></a>
        </div>

        <div class="links" id="fsiaLinks">
          <a href="/index.php">Home</a>
          <a href="/about.php">About</a>
          <div class="reg" id="fsiaReg">
            <button class="reg-btn" type="button">
              Registration
              <svg class="chev" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg>
            </button>
            <div class="reg-menu">
              <div>
                <div class="rm-head">Beauty Pageants</div>
                <a href="/forever-miss-india-new.php">Forever Miss India</a>
                <a href="/forever-mrs-india-new.php">Forever Mrs India</a>
                <a href="/forever-miss-teen-india-new.php">Forever Miss Teen India</a>
                <a href="/miss-fsia-international-2024.php">Miss FSIA International</a>
                <a href="/mrs-fsia-international-2024.php">Mrs FSIA International</a>
              </div>
              <div>
                <div class="rm-head">International</div>
                <a href="/miss-world-beauty-pageant.php">Miss World</a>
                <a href="/mrs-world-beauty-pageant.php">Mrs World</a>
                <a href="/miss-universe-beauty-pageant.php">Miss Universe</a>
                <a href="/mrs-universe-beauty-pageant.php">Mrs Universe</a>
              </div>
              <div>
                <div class="rm-head">Award Shows</div>
                <a href="/super-hero-award.php">Super Hero Award</a>
                <a href="/super-woman-award.php">Super Woman Award</a>
                <a href="/business-awards.php">Business Awards</a>
                <a href="/bharat-national-awards.php">Bharat National Awards</a>
                <a href="/international-award.php">International Award</a>
                <a href="/infinity-achievers">Infinity Achievers</a>
				  <a href="/forever-achievers">Forever Achievers</a>
                <a href="/nominate-yourself">Nominate Yourself</a>
              </div>
              <div>
                <div class="rm-head">Creative &amp; Pro</div>
                <a href="star-india-kids-contest.php">Forever Star Kids</a>
                <a href="fashion-designer.php">Fashion Designers</a>
                <a href="makeup-artist.php">Makeup Artists</a>
                <a href="bharat-couture-week-fashion-week.php">Bharat Couture Week</a>
                <a href="channel-partner">Channel Partner</a>
              </div>
            </div>
          </div>
          <a href="/FAQ.php">FAQ</a>
          <a href="/contact.php">Contact</a>
          <a href="/our-teams.php">Our Team</a>
          <a href="/news-coverage.php">News</a>
          <a href="online-franchise-application" target="_blank" rel="noopener">Franchise</a>

          <!-- shown only inside the mobile panel -->
          <a class="m-phone" href="tel:+919983286999">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3.09 4.18 2 2 0 0 1 5.07 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L9.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            +91-99832-86999
          </a>
          <a class="m-phone" href="mailto:care@fsia.in">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>
            care@fsia.in
          </a>

          <!-- shown only inside the mobile panel -->
          <div class="m-socials">
            <a href="https://www.facebook.com/Foreverstarindiaawards/" target="_blank" rel="noopener" aria-label="Facebook"><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
            <a href="https://www.instagram.com/fsia_forever/" target="_blank" rel="noopener" aria-label="Instagram"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
            <a href="https://www.youtube.com/c/foreverstarindiaaward" target="_blank" rel="noopener" aria-label="YouTube"><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 0 0 1.96-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#fff"/></svg></a>
          </div>
        </div>

        <div class="right">
          <a class="phone" href="tel:+919983286999">
            <span class="pic"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3.09 4.18 2 2 0 0 1 5.07 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L9.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></span>
            +91-99832-86999
          </a>
          <button class="burger" id="fsiaBurger" aria-label="Open menu" aria-expanded="false">
            <span class="bln"></span>
            <span class="bln"></span>
            <span class="bln"></span>
          </button>
        </div>
      </div>
    </div>
  </nav>

  <!-- 3. CATEGORY STRIP -->
  <div class="strip">
    <div class="wrap">
      <div class="strip-in">
        <div class="search">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2.4"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="search" id="fsiaSearchInput" autocomplete="off" placeholder="Search FSIA…" aria-label="Search">
        </div>
        <div class="pills-wrap" id="fsiaPillsWrap">
        <button class="pills-arrow prev" type="button" aria-label="Scroll tabs left">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <button class="pills-arrow next" type="button" aria-label="Scroll tabs right">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M9 18l6-6-6-6"/></svg>
        </button>
        <nav class="pills" id="fsiaPills" aria-label="Quick links">
          <div class="pills-in">
            <a href="https://www.fsia.in/best-achievers-in-india" class="active">Achievers</a>
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
</div>

<!-- ===== Header behaviour: sticky shrink + hamburger + registration accordion ===== -->
<script>
(function () {
  function ready(fn){ document.readyState !== 'loading' ? fn() : document.addEventListener('DOMContentLoaded', fn); }
  ready(function () {
    var header = document.getElementById('fsiaMH');
    var burger = document.getElementById('fsiaBurger');
    var links  = document.getElementById('fsiaLinks');

    // Shrink + deepen shadow once the page has scrolled past the announcement bar
    if (header) {
      var ticking = false;
      function applyScrollState() {
        header.classList.toggle('is-scrolled', window.scrollY > 12);
        ticking = false;
      }
      window.addEventListener('scroll', function () {
        if (!ticking) { window.requestAnimationFrame(applyScrollState); ticking = true; }
      }, { passive: true });
      applyScrollState();
    }

    if (burger && links) {
      burger.addEventListener('click', function () {
        var open = links.classList.toggle('open');
        burger.classList.toggle('open', open);
        burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    }
    var reg = document.getElementById('fsiaReg');
    var regBtn = reg ? reg.querySelector('.reg-btn') : null;
    if (reg && regBtn) {
      regBtn.addEventListener('click', function (e) {
        if (window.innerWidth <= 1100) { e.preventDefault(); reg.classList.toggle('reg-open'); }
      });
    }
    // Quick-links strip: fades + arrows so it is obvious the row scrolls to more tabs
    var pills = document.getElementById('fsiaPills');
    var pillsWrap = document.getElementById('fsiaPillsWrap');
    if (pills && pillsWrap) {
      function syncPills() {
        var max = pills.scrollWidth - pills.clientWidth;
        pillsWrap.classList.toggle('can-left', pills.scrollLeft > 4);
        pillsWrap.classList.toggle('can-right', max > 4 && pills.scrollLeft < max - 4);
      }
      pills.addEventListener('scroll', syncPills, { passive: true });
      window.addEventListener('resize', syncPills);
      syncPills();

      Array.prototype.forEach.call(pillsWrap.querySelectorAll('.pills-arrow'), function (btn) {
        btn.addEventListener('click', function () {
          var step = Math.max(pills.clientWidth * 0.6, 140);
          pills.scrollBy({ left: btn.classList.contains('prev') ? -step : step, behavior: 'smooth' });
        });
      });

      // Nudge the row once per browser session so phone users see there is more to the right
      try {
        if (pills.scrollWidth - pills.clientWidth > 20 && !sessionStorage.getItem('fsiaPillsHinted')) {
          sessionStorage.setItem('fsiaPillsHinted', '1');
          setTimeout(function () {
            pills.classList.add('hint');
            setTimeout(function () { pills.classList.remove('hint'); }, 1300);
          }, 900);
        }
      } catch (e) {}
    }

    // Close the mobile panel after tapping a real destination link
    Array.prototype.forEach.call(document.querySelectorAll('#fsiaLinks a'), function (a) {
      a.addEventListener('click', function () {
        if (window.innerWidth <= 1100 && links) {
          links.classList.remove('open');
          if (burger) { burger.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); }
        }
      });
    });
        // Live search: dropdown suggestions + Enter to browse full results
    var searchInput = document.getElementById('fsiaSearchInput');
    if (searchInput) {
      var searchBox = searchInput.closest('.search');
      var resultsList = document.createElement('ul');
      resultsList.className = 'search-results';
      searchBox.appendChild(resultsList);

      var debounceTimer = null;
      var currentController = null;

      function closeResults() { resultsList.classList.remove('open'); resultsList.innerHTML = ''; }

      function renderResults(items) {
        resultsList.innerHTML = '';
        if (!items || !items.length) {
          resultsList.innerHTML = '<li class="sr-empty">No matches found</li>';
          resultsList.classList.add('open');
          return;
        }
        items.forEach(function (item) {
          var li = document.createElement('li');
          var img = item.profile ? item.profile : 'uploads/' + item.og_image;
          var label = (item.url ? item.name : item.mtitle) || '';
          var dest = item.url || item.murl || '#';
          var imgEl = document.createElement('img');
          imgEl.src = img; imgEl.alt = label;
          var span = document.createElement('span');
          span.textContent = label;
          li.appendChild(imgEl); li.appendChild(span);
          li.addEventListener('click', function () { window.location.href = dest; });
          resultsList.appendChild(li);
        });
        resultsList.classList.add('open');
      }

      function runSearch(term) {
        if (currentController) currentController.abort();
        currentController = new AbortController();
        fetch('/feach_search_data.php?searchkeyword=' + encodeURIComponent(term), { signal: currentController.signal })
          .then(function (r) { return r.json(); })
          .then(function (data) { renderResults(Array.isArray(data) ? data : []); })
          .catch(function (err) { if (err.name !== 'AbortError') closeResults(); });
      }

      searchInput.addEventListener('input', function () {
        var term = searchInput.value.trim();
        clearTimeout(debounceTimer);
        if (!term) { closeResults(); return; }
        debounceTimer = setTimeout(function () { runSearch(term); }, 220);
      });

      searchInput.addEventListener('focus', function () {
        if (searchInput.value.trim() && resultsList.children.length) resultsList.classList.add('open');
      });

      searchInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          var term = searchInput.value.trim();
          if (!term) return;
          try { sessionStorage.setItem('searchkeyword', encodeURIComponent(term)); } catch (err) {}
          window.location.href = 'https://www.fsia.in/all-india-pageant-contestant';
        }
      });

      document.addEventListener('click', function (e) {
        if (!searchBox.contains(e.target)) closeResults();
      });
    }
  });
})();
</script>

<!-- ===== Global button style: Send Verification Code (.fsia-otp-btn) ===== -->
<style>
  .fsia-otp-btn{
    background:linear-gradient(135deg,#e0bd47 0%,#c2941b 52%,#9c6f17 100%) !important;
    color:#fff !important;
    border:1px solid rgba(156,111,23,.55) !important;
    box-shadow:0 10px 22px -8px rgba(168,121,26,.6),inset 0 1px 0 rgba(255,255,255,.45) !important;
    transition:transform .15s ease,box-shadow .2s ease,filter .2s ease !important;
    letter-spacing:.02em;
  }
  .fsia-otp-btn:hover{
    filter:brightness(1.06) !important;
    transform:translateY(-1px) !important;
    box-shadow:0 14px 30px -8px rgba(168,121,26,.7),inset 0 1px 0 rgba(255,255,255,.5) !important;
  }
  .fsia-otp-btn:active{transform:translateY(0) !important;filter:brightness(.98) !important;}
  .fsia-otp-btn:disabled{opacity:.6 !important;cursor:not-allowed !important;filter:grayscale(.2) !important;transform:none !important;}
</style>

<!-- ===== Site-wide interactive grid background (inline — no external file needed) =====
     Activates only on pages that contain .form-section or .page-grid-on. -->
<script>
(function () {
  function init() {
    if (window.__fsiaPageGrid) return; window.__fsiaPageGrid = true;
    var sections = document.querySelectorAll('.form-section, .page-grid-on');
    if (!sections.length) return;

    /* ---- tunable config ---- */
    var SIZE = 56, GRID_LINE = 'rgba(120,120,120,.10)', PAGE_COLOR = '#f8fafc',
        TRAIL_OPACITY = 0.28, FLASH_OPACITY = 0.42;
    var PALETTE = window.GRID_FX_COLORS ||
        ['#D4AF37', '#A6093D', '#ff3d6e', '#e8c45a', '#b8860b', '#e11d54'];
    /* ------------------------- */

    var style = document.createElement('style');
    style.textContent =
      'html,body{background:transparent !important;}' +
      '#page-grid-bg{position:fixed;inset:0;z-index:-1;pointer-events:none;overflow:hidden;' +
        'background-color:' + PAGE_COLOR + ';' +
        'background-image:linear-gradient(' + GRID_LINE + ' 1px,transparent 1px),' +
          'linear-gradient(90deg,' + GRID_LINE + ' 1px,transparent 1px);' +
        'background-size:' + SIZE + 'px ' + SIZE + 'px;}' +
      '#page-grid-bg span{position:absolute;width:' + SIZE + 'px;height:' + SIZE + 'px;will-change:opacity}';
    document.head.appendChild(style);

    function clearBg(el) {
      el.style.setProperty('background-color', 'transparent', 'important');
      el.style.setProperty('background-image', 'none', 'important');
    }
    // walk up from each target to <html>
    sections.forEach(function (fs) {
      var el = fs;
      while (el) { clearBg(el); if (el === document.documentElement) break; el = el.parentElement; }
    });
    // clear known opaque wrappers anywhere (incl. inside the section)
    ['.tailwind-sandbox-container'].concat(window.PAGE_GRID_TRANSPARENT || [])
      .forEach(function (sel) { document.querySelectorAll(sel).forEach(clearBg); });

    var layer = document.createElement('div');
    layer.id = 'page-grid-bg';
    document.body.insertBefore(layer, document.body.firstChild);

    var last = -1;
    function nextColor() {
      if (PALETTE.length < 2) return PALETTE[0];
      var i; do { i = Math.floor(Math.random() * PALETTE.length); } while (i === last);
      last = i; return PALETTE[i];
    }
    function cellAt(x, y) { var c = Math.floor(x / SIZE), r = Math.floor(y / SIZE); return { x: c * SIZE, y: r * SIZE, c: c, r: r }; }
    function makeBlock(cell, color, opacity) {
      var b = document.createElement('span');
      b.style.left = cell.x + 'px'; b.style.top = cell.y + 'px';
      b.style.background = color; b.style.opacity = opacity;
      layer.appendChild(b); return b;
    }
    var lastCell = '';
    window.addEventListener('pointermove', function (e) {
      var cell = cellAt(e.clientX, e.clientY), key = cell.c + ',' + cell.r;
      if (key === lastCell) return; lastCell = key;
      var t = makeBlock(cell, nextColor(), TRAIL_OPACITY);
      t.animate([{ opacity: TRAIL_OPACITY }, { opacity: 0 }], { duration: 700, easing: 'ease-out' });
      setTimeout(function () { t.remove(); }, 690);
    }, { passive: true });
    window.addEventListener('pointerdown', function (e) {
      var cell = cellAt(e.clientX, e.clientY);
      var f = makeBlock(cell, nextColor(), FLASH_OPACITY);
      f.animate([{ opacity: FLASH_OPACITY, transform: 'scale(.7)' }, { opacity: 0, transform: 'none' }],
                { duration: 550, easing: 'ease-out' });
      setTimeout(function () { f.remove(); }, 560);
    }, { passive: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
</script>

<!-- ===== FSIA scroll effects: reveal-on-scroll + count-up (no library) ===== -->
<style id="fsia-fx-css">
  html.fsia-fx [data-fx]{ opacity:0; transform:translateY(30px); will-change:opacity,transform;
    transition:opacity .7s cubic-bezier(.22,.61,.36,1), transform .7s cubic-bezier(.22,.61,.36,1); }
  html.fsia-fx [data-fx="left"]{ transform:translateX(-38px); }
  html.fsia-fx [data-fx="right"]{ transform:translateX(38px); }
  html.fsia-fx [data-fx="zoom"]{ transform:scale(.92); }
  html.fsia-fx [data-fx].fx-in{ opacity:1 !important; transform:none !important; }
  @media (prefers-reduced-motion: reduce){
    html.fsia-fx [data-fx]{ opacity:1 !important; transform:none !important; transition:none !important; }
  }
</style>
<script>
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) return;   // graceful: content stays visible
  document.documentElement.classList.add('fsia-fx');

  function ready(fn){ document.readyState !== 'loading' ? fn() : document.addEventListener('DOMContentLoaded', fn); }

  ready(function () {
    var AUTO = window.FSIA_FX_SELECTORS || [
      'main h1','main h2','main h3','section h2','section h3',
      'section > p','section img','figure',
      '[class*="card"]','.fsia-s3d','.grid > *','.stat','.counter'
    ];
    function skip(el){
      return !el || el.closest('.fsia-mh') || el.closest('.fsia-ft') ||
             el.closest('form') || el.hasAttribute('data-fx') || el.closest('[data-fx]');
    }
    try {
      AUTO.forEach(function (sel) {
        document.querySelectorAll(sel).forEach(function (el) { if (!skip(el)) el.setAttribute('data-fx',''); });
      });
    } catch (e) {}

    var seen = new WeakMap();   // per-parent stagger counter
    var NUM  = /^(\d{1,3}(,\d{3})+(\.\d+)?|\d+(\.\d+)?[KkMm]|\d+)\+?$/;
    function eligible(t){ t = (t||'').trim(); return NUM.test(t) && (/[,KkMm]/.test(t) || /\+$/.test(t)); }

    function animateCount(node){
      var raw = node.getAttribute('data-count') || node.textContent.trim();
      var m = raw.match(/^([\d,]*\.?\d+)\s*([KkMm]?)\+?$/); if (!m) return;
      var target = parseFloat(m[1].replace(/,/g,'')); if (isNaN(target)) return;
      var suf = (m[2]||''), plus = /\+$/.test(raw) ? '+' : '', comma = /,/.test(raw);
      var dur = 1400, t0 = performance.now();
      function fmt(v){
        if (suf) return (Math.round(v*10)/10).toString().replace(/\.0$/,'') + suf + plus;
        return (comma ? Math.round(v).toLocaleString('en-IN') : Math.round(v).toString()) + plus;
      }
      (function step(now){
        var p = Math.min((now-t0)/dur,1), e = 1-Math.pow(1-p,3);
        node.textContent = fmt(target*e);
        if (p < 1) requestAnimationFrame(step);
      })(t0);
    }
    function countUpIn(root){
      var nodes = [];
      if (root.matches && root.matches('[data-count]')) nodes.push(root);
      root.querySelectorAll && root.querySelectorAll('[data-count]').forEach(function(n){ nodes.push(n); });
      if (!nodes.length) {
        if (root.children && root.children.length === 0 && eligible(root.textContent)) nodes.push(root);
        root.querySelectorAll && root.querySelectorAll('*').forEach(function(n){
          if (n.children.length === 0 && eligible(n.textContent)) nodes.push(n);
        });
      }
      nodes.forEach(function(n){ if (!n.__c){ n.__c = true; animateCount(n); } });
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target, p = el.parentElement, idx = 0;
        if (p) { idx = seen.get(p) || 0; seen.set(p, idx + 1); }
        el.style.transitionDelay = Math.min(idx * 80, 480) + 'ms';
        el.classList.add('fx-in');
        countUpIn(el);
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    document.querySelectorAll('[data-fx]').forEach(function (el) { io.observe(el); });

    // Failsafe: never leave content hidden if something goes wrong
    setTimeout(function () {
      document.querySelectorAll('[data-fx]:not(.fx-in)').forEach(function (el) { el.classList.add('fx-in'); });
    }, 3000);
  });
})();
</script>

