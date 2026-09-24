import React, { useEffect } from 'react';

interface FooterProps {
  onNavigate?: (sectionId: string) => void;
  onOpenLegalModal?: (title: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenLegalModal
}) => {
  useEffect(() => {
    // Accordion on mobile (≤ 560px) as defined in footer1806.php
    const heads = document.querySelectorAll('.fsia-ft .ft-col h4');
    const listeners: Array<{ el: Element; fn: () => void }> = [];

    heads.forEach((h) => {
      const fn = () => {
        if (window.innerWidth <= 560 && h.parentElement) {
          h.parentElement.classList.toggle('open');
        }
      };
      h.addEventListener('click', fn);
      listeners.push({ el: h, fn });
    });

    return () => {
      listeners.forEach(({ el, fn }) => el.removeEventListener('click', fn));
    };
  }, []);

  const handleLegalClick = (title: string, e: React.MouseEvent) => {
    if (onOpenLegalModal) {
      e.preventDefault();
      onOpenLegalModal(title);
    }
  };

  const handleNavClick = (sectionId: string, e: React.MouseEvent) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(sectionId);
    }
  };

  return (
    <>
      {/* Canonical FSIA footer CSS from footer1806.php */}
      <style>{`
        .fsia-ft{ all:unset; display:block !important; width:100% !important; box-sizing:border-box !important;
          font-family:'Poppins',system-ui,Segoe UI,Arial,sans-serif !important;
          --mar:#A6093D; --mar-dk:#7a062c; --gold:#D4AF37; --gold-dk:#b8860b;
          background:#120a10 !important; color:#cdd2dc !important; position:relative !important; overflow:hidden !important;
          border-top:3px solid transparent !important;
          border-image:linear-gradient(90deg,var(--mar),var(--gold),var(--mar)) 1 !important; }
        .fsia-ft *{ box-sizing:border-box !important; }
        .fsia-ft a{ text-decoration:none !important; color:inherit !important; }
        .fsia-ft::before{ content:"" !important; position:absolute !important; inset:0 !important; pointer-events:none !important;
          background:
            radial-gradient(700px 300px at 12% 0%, rgba(166,9,61,.28), transparent 70%),
            radial-gradient(620px 280px at 92% 8%, rgba(212,175,55,.12), transparent 70%) !important; }
        .fsia-ft .ftw{ position:relative !important; max-width:1240px !important; margin:0 auto !important; padding:54px 22px 22px !important; }

        .fsia-ft .ft-grid{ display:grid !important; grid-template-columns:1.5fr 1fr 1fr 1.1fr !important; gap:38px !important; }

        /* Brand column */
        .fsia-ft .ft-brand .bm{ display:inline-flex !important; align-items:center !important; gap:11px !important; margin-bottom:14px !important; }
        .fsia-ft .ft-brand .bm-img{ height:46px !important; width:auto !important; max-width:160px !important; object-fit:contain !important;
          background:#fff !important; border-radius:10px !important; padding:5px 8px !important; }
        .fsia-ft .ft-brand .bm i{ width:42px !important; height:42px !important; border-radius:12px !important; font-style:normal !important;
          display:inline-flex !important; align-items:center !important; justify-content:center !important;
          background:linear-gradient(135deg,var(--mar),var(--mar-dk)) !important; border:1px solid rgba(212,175,55,.55) !important;
          color:var(--gold) !important; font-family:'Playfair Display',Georgia,serif !important; font-weight:700 !important; font-size:18px !important; }
        .fsia-ft .ft-brand .bm strong{ font-family:'Playfair Display',Georgia,serif !important; font-size:18px !important; color:#fff !important; letter-spacing:.4px !important; }
        .fsia-ft .ft-brand .bm span{ display:block !important; font-size:9.5px !important; letter-spacing:2.2px !important;
          text-transform:uppercase !important; color:#9aa1ad !important; margin-top:2px !important; }
        .fsia-ft .ft-brand p{ font-size:13px !important; line-height:1.7 !important; color:#aeb4bf !important; max-width:330px !important; margin:0 0 18px !important; }
        .fsia-ft .ft-socials{ display:flex !important; gap:9px !important; }
        .fsia-ft .ft-socials a{ width:38px !important; height:38px !important; border-radius:50% !important; display:inline-flex !important;
          align-items:center !important; justify-content:center !important; color:#cdd2dc !important;
          background:rgba(255,255,255,.05) !important; border:1px solid rgba(255,255,255,.1) !important; transition:all .18s ease !important; }
        .fsia-ft .ft-socials a:hover{ background:var(--mar) !important; color:#fff !important; border-color:var(--gold) !important; transform:translateY(-2px) !important; }

        /* Link columns */
        .fsia-ft h4{ font-family:'Playfair Display',Georgia,serif !important; font-size:15px !important; color:#fff !important;
          margin:0 0 16px !important; padding-bottom:10px !important; position:relative !important; }
        .fsia-ft h4::after{ content:"" !important; position:absolute !important; left:0 !important; bottom:0 !important;
          width:38px !important; height:2px !important; border-radius:2px !important; background:linear-gradient(90deg,var(--mar),var(--gold)) !important; }
        .fsia-ft .ft-list{ display:flex !important; flex-direction:column !important; gap:9px !important; }
        .fsia-ft .ft-list a{ font-size:13px !important; color:#aeb4bf !important; display:inline-flex !important; align-items:center !important;
          gap:7px !important; transition:color .15s ease,transform .15s ease !important; }
        .fsia-ft .ft-list a::before{ content:"\\203A" !important; color:var(--gold) !important; font-weight:700 !important; opacity:.7 !important; }
        .fsia-ft .ft-list a:hover{ color:#fff !important; transform:translateX(3px) !important; }

        /* Contact */
        .fsia-ft .ft-contact a{ display:flex !important; align-items:center !important; gap:10px !important; font-size:13px !important;
          color:#cdd2dc !important; margin-bottom:12px !important; }
        .fsia-ft .ft-contact a .ci{ width:34px !important; height:34px !important; border-radius:9px !important; flex:0 0 auto !important;
          display:inline-flex !important; align-items:center !important; justify-content:center !important;
          background:rgba(212,175,55,.12) !important; color:var(--gold) !important; border:1px solid rgba(212,175,55,.25) !important; }
        .fsia-ft .ft-contact a:hover{ color:#fff !important; }
        .fsia-ft .ft-contact small{ display:block !important; color:#8c93a0 !important; font-size:10.5px !important; }

        /* Bottom bar */
        .fsia-ft .ft-base{ position:relative !important; border-top:1px solid rgba(255,255,255,.08) !important; margin-top:40px !important;
          padding-top:18px !important; display:flex !important; align-items:center !important; justify-content:space-between !important; gap:14px !important; flex-wrap:wrap !important; }
        .fsia-ft .ft-base p{ margin:0 !important; font-size:12px !important; color:#8c93a0 !important; }
        .fsia-ft .ft-base .ft-legal{ display:flex !important; gap:18px !important; flex-wrap:wrap !important; }
        .fsia-ft .ft-base .ft-legal a{ font-size:12px !important; color:#aeb4bf !important; }
        .fsia-ft .ft-base .ft-legal a:hover{ color:var(--gold) !important; }

        @media (max-width:900px){
          .fsia-ft .ft-grid{ grid-template-columns:1fr 1fr !important; gap:30px 24px !important; }
          .fsia-ft .ft-brand{ grid-column:1 / -1 !important; }
        }
        .fsia-ft .ft-cv{ display:none !important; }
        @media (max-width:560px){
          .fsia-ft .ftw{ padding:40px 16px 18px !important; }
          .fsia-ft .ft-grid{ grid-template-columns:1fr !important; gap:0 !important; }
          .fsia-ft .ft-base{ flex-direction:column !important; align-items:flex-start !important; }
          .fsia-ft .ft-col h4{ cursor:pointer !important; display:flex !important; align-items:center !important;
            justify-content:space-between !important; margin-bottom:0 !important; padding:15px 0 !important;
            border-bottom:1px solid rgba(255,255,255,.09) !important; -webkit-tap-highlight-color:transparent !important; }
          .fsia-ft .ft-col h4::after{ display:none !important; }
          .fsia-ft .ft-cv{ display:inline-block !important; color:var(--gold) !important; font-size:22px !important;
            line-height:1 !important; transform:rotate(90deg) !important; transition:transform .2s ease !important; }
          .fsia-ft .ft-col.open .ft-cv{ transform:rotate(-90deg) !important; }
          .fsia-ft .ft-col .ft-list{ display:none !important; }
          .fsia-ft .ft-contact.ft-col > a{ display:none !important; }
          .fsia-ft .ft-col.open .ft-list{ display:flex !important; padding:14px 0 6px !important; }
          .fsia-ft .ft-contact.ft-col.open > a{ display:flex !important; margin-top:14px !important; }
          .fsia-ft .ft-brand{ margin-bottom:8px !important; }
        }
      `}</style>

      {/* Canonical footer markup from footer1806.php */}
      <footer className="fsia-ft">
        <div className="ftw">
          <div className="ft-grid">

            {/* Brand */}
            <div className="ft-brand">
              <a href="https://www.fsia.in/" className="bm" aria-label="Forever Star India">
                <img
                  src="https://www.fsia.in/assets-new/media/logo.gif"
                  alt="Forever Star India"
                  className="bm-img"
                  onError={(e) => {
                    e.currentTarget.src = 'https://www.fsia.in/favicon.ico';
                  }}
                />
                <span><strong>FOREVER STAR INDIA</strong><span>Beauty Pageants &amp; Awards</span></span>
              </a>
              <p>India&apos;s Biggest Platform for Beauty Pageants and Award Shows - bringing City Auditions, Training and a National Stage to Talent from every corner of the Country.</p>
              <div className="ft-socials">
                <a href="https://www.facebook.com/Foreverstarindiaawards/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
                <a href="https://twitter.com/FsiaAward" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M22 5.8a8.3 8.3 0 0 1-2.4.7 4.2 4.2 0 0 0 1.8-2.3 8.3 8.3 0 0 1-2.6 1A4.1 4.1 0 0 0 12 8.8 11.7 11.7 0 0 1 3.5 4.5a4.1 4.1 0 0 0 1.3 5.5 4 4 0 0 1-1.9-.5v.1a4.1 4.1 0 0 0 3.3 4 4.1 4.1 0 0 1-1.9.1 4.1 4.1 0 0 0 3.8 2.9A8.3 8.3 0 0 1 2 18.6 11.7 11.7 0 0 0 8.3 20c7.5 0 11.6-6.2 11.6-11.6v-.5A8.2 8.2 0 0 0 22 5.8z"/></svg></a>
                <a href="https://www.instagram.com/fsia_forever/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
                <a href="https://in.pinterest.com/fsiaaward/" target="_blank" rel="noopener noreferrer" aria-label="Pinterest"><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 4 5.7 4 8.9c0 1.9.7 3.7 2.3 4.3.3.1.5 0 .5-.2l.2-.9c.1-.3 0-.4-.2-.6-.5-.6-.8-1.3-.8-2.4 0-3 2.3-5.7 5.9-5.7 3.2 0 5 2 5 4.6 0 3.5-1.5 6.4-3.8 6.4-1.3 0-2.2-1-1.9-2.3.4-1.5 1-3 1-4.1 0-1-.5-1.8-1.6-1.8-1.3 0-2.3 1.3-2.3 3.1 0 1.1.4 1.9.4 1.9l-1.5 6.4c-.4 1.9-.1 4.2 0 4.4 0 .1.2.2.3.1.1-.2 1.9-2.3 2.4-4.5l.9-3.6c.5.9 1.8 1.6 3.2 1.6 4.2 0 7.1-3.9 7.1-9C20 5.3 16.6 2 12 2z"/></svg></a>
                <a href="https://www.youtube.com/c/foreverstarindiaaward" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 0 0 1.96-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#120a10"/></svg></a>
              </div>
            </div>

            {/* Registration */}
            <div className="ft-col">
              <h4>Registration<span className="ft-cv">›</span></h4>
              <div className="ft-list">
                <a href="https://www.fsia.in/forever-miss-india-new.php">Forever Miss India</a>
                <a href="https://www.fsia.in/forever-mrs-india-new.php">Forever Mrs India</a>
                <a href="https://www.fsia.in/forever-miss-teen-india-new.php">Miss Teen India</a>
                <a href="https://www.fsia.in/super-hero-award.php">Super Hero Award</a>
                <a href="https://www.fsia.in/super-woman-award.php">Super Woman Award</a>
                <a href="https://www.fsia.in/business-awards.php">Business Awards</a>
                <a href="https://www.fsia.in/miss-universe-beauty-pageant.php">Miss Universe</a>
                <a href="https://www.fsia.in/mrs-universe-beauty-pageant.php">Mrs Universe</a>
                <a href="https://www.fsia.in/miss-world-beauty-pageant.php">Miss World</a>
                <a href="https://www.fsia.in/mrs-world-beauty-pageant.php">Mrs World</a>
                <a href="https://www.fsia.in/star-india-kids-contest.php">Forever Star Kids</a>
                <a href="https://www.fsia.in/register-nominate.php">Nominate Yourself</a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="ft-col">
              <h4>Quick Links<span className="ft-cv">›</span></h4>
              <div className="ft-list">
                <a href="#about" onClick={(e) => handleNavClick('about', e)}>About FSIA</a>
                <a href="https://www.fsia.in/contact.php">Contact Us</a>
                <a href="#refund-policy" onClick={(e) => handleLegalClick('Refund Policy', e)}>Refund Policy</a>
                <a href="#privacy-policy" onClick={(e) => handleLegalClick('Privacy Policy', e)}>Privacy Policy</a>
                <a href="#termscondition" onClick={(e) => handleLegalClick('Terms & Conditions', e)}>Terms &amp; Conditions</a>
                <a href="https://www.fsia.in/FAQ.php">FAQ</a>
                <a href="#team" onClick={(e) => handleNavClick('team', e)}>Our Team</a>
                <a href="https://www.fsia.in/news.php">News Coverage</a>
                <a href="https://www.fsia.in/online-franchise-application" target="_blank" rel="noopener noreferrer">Apply for Franchise</a>
                <a href="/admin-preview.html" target="_blank" rel="noopener noreferrer" style={{ color: '#D4AF37', fontWeight: 600 }}>★ Admin Panel Preview (Dev)</a>
                <a href="https://www.fsia.in/sitemap.php" target="_blank" rel="noopener noreferrer">Sitemap</a>
              </div>
            </div>

            {/* Contact */}
            <div className="ft-contact ft-col">
              <h4>Get In Touch<span className="ft-cv">›</span></h4>
              <a href="tel:+919983286999">
                <span className="ci"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3.09 4.18 2 2 0 0 1 5.07 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L9.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></span>
                <span>+91-99832-86999<small>Mon–Sat, 10am–7pm</small></span>
              </a>
              <a href="mailto:care@fsia.in">
                <span className="ci"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg></span>
                <span>care@fsia.in<small>We reply within 24 hours</small></span>
              </a>
              <a href="https://wa.me/919983286999" target="_blank" rel="noopener noreferrer">
                <span className="ci"><svg width="15" height="15" viewBox="0 0 32 32" fill="currentColor"><path d="M16 4C9.9 4 5 8.9 5 15c0 1.9.5 3.8 1.5 5.5L5 27l6.8-1.8A11 11 0 1 0 16 4zm0 20a9 9 0 0 1-4.6-1.3l-.3-.2-3.6.9.9-3.5-.2-.4A9 9 0 1 1 16 24z"/></svg></span>
                <span>Chat on WhatsApp<small>Fastest response</small></span>
              </a>
            </div>

          </div>

          <div className="ft-base">
            <p>© 2026 Forever Star India Pvt. Ltd. All rights reserved.</p>
            <div className="ft-legal">
              <a href="https://www.fsia.in/termscondition.php" target="_blank" rel="noopener noreferrer" onClick={(e) => handleLegalClick('Terms & Conditions', e)}>Terms &amp; Conditions</a>
              <a href="https://www.fsia.in/privacy-policy.php" target="_blank" rel="noopener noreferrer" onClick={(e) => handleLegalClick('Privacy Policy', e)}>Privacy Policy</a>
              <a href="https://www.fsia.in/refund-policy" target="_blank" rel="noopener noreferrer" onClick={(e) => handleLegalClick('Refund Policy', e)}>Refund Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
