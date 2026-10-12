/**
 * Homepage text blocks that the FSIA CMS admin can edit (Homepage tabs).
 * These defaults are exactly what the live page showed before the CMS; a block
 * that was never saved in the admin keeps using them.
 */
import { PARTNERS, TEAM_MEMBERS, VERIFIED_STATISTICS } from './fsiaData';

export interface LinkItem { label: string; value: string; link?: string; note?: string }

export const DEFAULT_HERO_TEXT = {
  eyebrow: 'BEAUTY PAGEANTS • NATIONAL AWARDS • FASHION',
  line1: 'REAL PEOPLE.',
  line2: 'REAL STORIES.',
  line3: 'A Forever INDIA.',
  intro:
    'Forever Star India (FSIA) is a premier national beauty pageant and honors institution, officially protected under Trademark Class 41 by the Government of India. Operating grassroots talent evaluations across **4,000+ Indian cities** with **1 crowned winner from every city**, delegates experience masterclass runway training and grand crowning ceremonies televised at Zee Studio Jaipur.',
  button1Text: 'QUICK APPLY • 2026 AUDITIONS',
  button1Url: 'https://www.fsia.in/quickapply',
  button2Text: 'EXPLORE TITLES & AWARDS',
  button2Url: '', // empty = scroll to the event calendar
  items: [
    { label: 'Trademark Class 41:', value: 'Govt. of India Registered' },
    { label: 'Grand Finale Arena:', value: 'Zee Studio Jaipur' },
    { label: 'Reach:', value: '4,000+ Cities Nationwide' },
  ] as LinkItem[],
};

export interface StatItem { label: string; value: number; suffix: string; subtext: string }

export const DEFAULT_STATS = {
  items: VERIFIED_STATISTICS.map((s) => ({ label: s.label, value: s.numericTarget, suffix: s.suffix, subtext: s.subtext })) as StatItem[],
  footerTitle: 'Democratic Grassroots Model:',
  footerText: 'Auditioning talent across 28 States & Union Territories without bias.',
  source: 'Source: Official FSIA Registered Trademark Documentation (Class 41)',
};

export const DEFAULT_TEAM = {
  badge: 'LEADERSHIP & EXPERT JURY PANEL',
  title: 'OUR TEAM & MENTORS',
  subtitle: 'Guiding Forever Star India with dedication, national industry pedigree, and a commitment to unlocking human potential.',
  // The homepage features only the Founder & CEO; the full team is on our-teams.php.
  items: TEAM_MEMBERS.filter((m) => /\bCEO\b/.test(m.role)).slice(0, 1),
  cardFooter: 'Official FSIA Board',
  buttonText: 'VIEW COMPLETE LEADERSHIP DIRECTORY →',
  buttonUrl: 'https://www.fsia.in/our-teams.php',
};

export const DEFAULT_PARTNERS = {
  badge: 'OFFICIAL ALLIANCES & BROADCAST COLLABORATORS',
  title: 'OFFICIAL PARTNERS',
  subtitle: 'Leading media networks, state tourism initiatives, production houses, and lifestyle brands collaborating with Forever Star India.',
  items: PARTNERS,
  noticeTitle: 'Documented FSIA Sponsors & Institutional Partners',
  noticeText: 'Displaying verified organizations and broadcasting partners affiliated with the official portal.',
  buttonText: 'ALL SPONSORS DIRECTORY →',
  buttonUrl: 'https://www.fsia.in/sponsors.php',
};

export const DEFAULT_FINAL_CTA = {
  badge: 'SEASON 2026 AUDITIONS & NOMINATIONS ACTIVE',
  heading: 'STEP ONTO THE NATIONAL STAGE',
  text: 'Join India’s premier talent and achievement movement across 4,000+ cities. Secure your city chapter audition, master runway grooming, and grand coronation stage at Zee Studio Jaipur.',
  background: 'https://www.fsia.in/uploads/Forever-Star-India-Pageant.webp',
  button1Text: 'QUICK APPLY • 2026 SEASON',
  button1Url: 'https://www.fsia.in/quickapply',
  button2Text: 'CALL HELPLINE: +91-99832-86999',
  button2Url: 'tel:+919983286999',
  items: [
    { label: 'Direct Helpline', value: '+91-99832-86999', link: 'tel:+919983286999', note: 'Mon–Sat, 10am–7pm IST' },
    { label: 'Official Email', value: 'care@fsia.in', link: 'mailto:care@fsia.in', note: 'starindiaaward@gmail.com' },
    { label: 'Headquarters', value: 'Jaipur, Rajasthan', link: '', note: 'Govt. Trademark Class 41' },
  ] as LinkItem[],
};
