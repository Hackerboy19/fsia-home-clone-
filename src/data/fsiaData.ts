import {
  PageantItem,
  AwardItem,
  WinnerItem,
  ArticleItem,
  GalleryItem,
  TeamMember,
  SocialPlatformItem,
  TestimonialItem,
  CelebrityItem,
  PartnerItem,
  EventCalendarItem,
  SuccessStoryItem
} from '../types';

export const FSIA_CONTACT = {
  phone: '+91-99832-86999',
  email: 'care@fsia.in',
  altEmail: 'starindiaaward@gmail.com',
  address: '72-77, G-1, Sadguru Apartments 2, Gyan Vihar, Nirman Nagar, Jaipur, Rajasthan 302019, India',
  city: 'Jaipur, Rajasthan',
  workingHours: 'Monday – Saturday: 10:00 AM – 6:30 PM IST',
  trademarkInfo: 'Star Logo is a registered trademark under Class 41 with the Government of India.',
  website: 'https://www.fsia.in',
  applyUrl: 'https://www.fsia.in/quickapply',
  winnersUrl: 'https://www.fsia.in/pageant-winner',
  awardeesUrl: 'https://www.fsia.in/top-awardee-in-india',
  galleryUrl: 'https://www.fsia.in/gallery',
  socials: {
    facebook: 'https://www.facebook.com/Foreverstarindiaawards/',
    instagram: 'https://www.instagram.com/fsia_forever/',
    youtube: 'https://www.youtube.com/c/foreverstarindiaaward',
    linkedin: 'https://www.linkedin.com/company/forever-star-india-awards/',
    twitter: 'https://twitter.com/FsiaAward',
    pinterest: 'https://in.pinterest.com/fsiaaward/'
  }
};

/**
 * Real Published FSIA Figures directly from fsia.in
 */
export const VERIFIED_STATISTICS = [
  {
    label: 'Participants',
    value: '10,000+',
    numericTarget: 10000,
    suffix: '+',
    subtext: 'Aspiring candidates evaluated across India'
  },
  {
    label: 'Cities Covered',
    value: '4,000+',
    numericTarget: 4000,
    suffix: '+',
    subtext: 'Nationwide audition rounds and city chapter selections'
  },
  {
    label: 'Awards Presented',
    value: '5,000+',
    numericTarget: 5000,
    suffix: '+',
    subtext: 'Prestigious national honors and trophies conferred'
  },
  {
    label: 'Contestants Crowned',
    value: '900+',
    numericTarget: 900,
    suffix: '+',
    subtext: 'Selected delegates gracing the state and national stages'
  }
];

export const PAGEANTS: PageantItem[] = [
  {
    id: 'forever-miss-india-2026',
    name: 'Forever Miss India 2026',
    slug: 'forever-miss-india',
    subtitle: 'National Title for Unmarried Women (Ages 18–35)',
    description: 'India’s premier national pageant providing aspiring delegates with city-level auditions, grooming by industry experts, and a high-profile national runway finale at Zee Studio.',
    eligibility: 'Unmarried Indian women aged 18 to 35 years',
    image: 'https://www.fsia.in/static/media/Neeharika%20Bethanapalli%20-%20Miss%20India%202025%20Winner.jpg',
    season: 'Season 2026',
    cityRounds: '4,000+ City Auditions',
    registrationStatus: 'Open for 2026',
    features: ['City Crown & Title', 'National Media Coverage', 'Professional Portfolio Shoot', 'Google Profile Optimization'],
    url: 'https://www.fsia.in/forever-miss-india-new.php'
  },
  {
    id: 'forever-mrs-india-2026',
    name: 'Forever Mrs India 2026',
    slug: 'forever-mrs-india',
    subtitle: 'Celebrating Married Women of Grace & Vision (G-1 & G-2)',
    description: 'Empowering married women, mothers, and working professionals to command the spotlight, showcase leadership, and celebrate their accomplishments on India’s biggest stage.',
    eligibility: 'Married Indian women across two age groups: G-1 (18–38) and G-2 (39+)',
    image: 'https://www.fsia.in/static/media/Anjali%20Sinha%20-%20Mrs%20India%202025%20Winner%20%28G-1%29.jpg',
    season: 'Season 2026',
    cityRounds: 'Pan-India City Rounds',
    registrationStatus: 'Open for 2026',
    features: ['Multi-Category Age Groups', 'Personality Development', 'Leadership Training', 'Brand Endorsement Opportunities'],
    url: 'https://www.fsia.in/forever-mrs-india-new.php'
  },
  {
    id: 'forever-miss-teen-india-2026',
    name: 'Forever Miss Teen India 2026',
    slug: 'forever-miss-teen-india',
    subtitle: 'Nurturing Young Confident Leaders (Ages 13–19)',
    description: 'The premier youth platform designed to groom and inspire ambitious teenagers, building public speaking mastery, runway poise, and community leadership.',
    eligibility: 'Young female talents aged 13 to 19 years',
    image: 'https://www.fsia.in/static/media/Tanvi%20Yatin%20Khairnar%20-%20Miss%20Teen%20India%202025%20Winner.jpg',
    season: 'Season 2026',
    cityRounds: 'Educational & Cultural City Hubs',
    registrationStatus: 'Open for 2026',
    features: ['Youth Mentorship', 'Stage Confidence Training', 'Scholarships & Trophies', 'National Stage Debut'],
    url: 'https://www.fsia.in/forever-miss-teen-india-new.php'
  },
  {
    id: 'miss-world',
    name: 'Miss World',
    slug: 'miss-world',
    subtitle: 'Global Representation & International Crown',
    description: 'Empowering premier titleholders to represent the spirit, intellect, and humanitarian dedication of Indian delegates on the world stage.',
    eligibility: 'Selected FSIA national titleholders and delegates',
    image: 'https://www.fsia.in/static/media/glimp7.4e94b375d70df024292d.webp',
    season: 'International Pageant',
    cityRounds: 'National Roster Qualification',
    registrationStatus: 'Auditions Active',
    features: ['World Stage Runway', 'Global Media Exposure', 'Humanitarian Spotlight', 'International Mentorship'],
    url: 'https://www.fsia.in/miss-world-beauty-pageant.php'
  },
  {
    id: 'mrs-world',
    name: 'Mrs World',
    slug: 'mrs-world',
    subtitle: 'Global Excellence for Accomplished Women',
    description: 'Showcasing dynamic married women leaders on an international platform celebrating wisdom, professional triumphs, and global diplomacy.',
    eligibility: 'Married titleholders with verified achievements',
    image: 'https://www.fsia.in/static/media/glimp3.63ff9e3b97b10fae1ec7.webp',
    season: 'International Pageant',
    cityRounds: 'International Auditions',
    registrationStatus: 'Auditions Active',
    features: ['Global Crown', 'International Media Coverage', 'Leadership Forum', 'Ambassadorial Opportunities'],
    url: 'https://www.fsia.in/mrs-world-beauty-pageant.php'
  },
  {
    id: 'miss-universe',
    name: 'Miss Universe',
    slug: 'miss-universe',
    subtitle: 'Apex Global Pageant Circuit Representation',
    description: 'The pinnacle title representing India across global universe pageant formats, celebrating intellect, eloquence, and charismatic stage presence.',
    eligibility: 'National winners selected through FSIA jury rounds',
    image: 'https://www.fsia.in/static/media/glimp1.119142dd64fdf31b60d6.webp',
    season: 'International Pageant',
    cityRounds: 'National Finalist Roster',
    registrationStatus: 'Auditions Active',
    features: ['Global Representation', 'International Jury Evaluation', 'High-Couture Sashes', 'Prestigious Crown'],
    url: 'https://www.fsia.in/miss-universe-beauty-pageant.php'
  },
  {
    id: 'mrs-universe',
    name: 'Mrs Universe',
    slug: 'mrs-universe',
    subtitle: 'Global Stage for Inspiring Married Women',
    description: 'Elevating inspiring women who drive transformative societal impact, balancing enterprise, family, and social advocacy on the worldwide stage.',
    eligibility: 'Married women delegates with social impact credentials',
    image: 'https://www.fsia.in/static/media/glimp2.613cba0798f90b93bdc2.webp',
    season: 'International Pageant',
    cityRounds: 'Global Nomination Hubs',
    registrationStatus: 'Auditions Active',
    features: ['Worldwide Recognition', 'International Jury Panels', 'Global Brand Tie-ups', 'Philanthropic Support'],
    url: 'https://www.fsia.in/mrs-universe-beauty-pageant.php'
  }
];

export const AWARDS: AwardItem[] = [
  {
    id: 'super-woman-award-2026',
    name: 'Super Woman Award 2026',
    slug: 'super-woman-award',
    subtitle: 'Saluting Unstoppable Female Achievers',
    description: 'Honouring exceptional women across corporate leadership, education, healthcare, arts, social activism, and entrepreneurship who drive positive transformation.',
    image: 'https://www.fsia.in/uploads/Forever-Star-India-award-season-8.webp',
    nominationStatus: 'Nominations Open',
    scope: 'National Honour',
    idealFor: 'Women entrepreneurs, corporate leaders, doctors, educators, and social reform pioneers',
    url: 'https://www.fsia.in/super-woman-award.php'
  },
  {
    id: 'super-hero-award-2026',
    name: 'Super Hero Award 2026',
    slug: 'super-hero-award',
    subtitle: 'Recognising Real-Life Heroes of Society',
    description: 'Bestowed upon individuals whose selfless courage, groundbreaking innovations, or extraordinary humanitarian service make them true national role models.',
    image: 'https://www.fsia.in/uploads/bnpg3.webp',
    nominationStatus: 'Nominations Open',
    scope: 'National Honour',
    idealFor: 'Humanitarians, brave defenders, community saviours, innovative changemakers, and philanthropists',
    url: 'https://www.fsia.in/super-hero-award.php'
  },
  {
    id: 'business-awards-2026',
    name: 'Business Awards 2026',
    slug: 'forever-business-awards',
    subtitle: 'Celebrating Commercial Visionaries & Enterprise Leaders',
    description: 'Acknowledging innovative enterprises, visionary start-up founders, established business icons, and corporate luminaries shaping economic growth.',
    image: 'https://www.fsia.in/static/media/glimp3.d5a6b72c9f458fb3f10c.webp',
    nominationStatus: 'Nominations Open',
    scope: 'National Honour',
    idealFor: 'Start-ups, MSME leaders, corporate executives, franchise heads, and visionary founders',
    url: 'https://www.fsia.in/business-awards.php'
  },
  {
    id: 'bharat-national-awards-2026',
    name: 'Bharat National Awards 2026',
    slug: 'bharat-national-awards',
    subtitle: 'Honouring Contributions to Nation Building',
    description: 'Prestigious national tribute conferred upon eminent personalities from sports, science, arts, literature, and public service.',
    image: 'https://www.fsia.in/static/media/glimp1.119142dd64fdf31b60d6.webp',
    nominationStatus: 'Jury Review',
    scope: 'National Honour',
    idealFor: 'Artists, cultural stalwarts, sports achievers, researchers, and public welfare leaders',
    url: 'https://www.fsia.in/bharat-national-awards.php'
  },
  {
    id: 'international-award',
    name: 'International Award',
    slug: 'international-award',
    subtitle: 'Global Recognition for Cross-Border Excellence',
    description: 'Celebrating international luminaries and Indian diaspora leaders who have achieved global eminence in professional and social fields.',
    image: 'https://www.fsia.in/static/media/glimp3.63ff9e3b97b10fae1ec7.webp',
    nominationStatus: 'Nominations Open',
    scope: 'International Honour',
    idealFor: 'Global professionals, international innovators, and cross-border leaders',
    url: 'https://www.fsia.in/international-award.php'
  }
];

export const WINNERS: WinnerItem[] = [
  {
    id: 'w-1',
    name: 'Neeharika Bethanapalli',
    title: 'Miss India 2025 Winner',
    season: '2025',
    year: '2025',
    category: 'Forever Miss India',
    location: 'Telangana',
    image: 'https://www.fsia.in/static/media/Neeharika%20Bethanapalli%20-%20Miss%20India%202025%20Winner.jpg',
    url: 'https://www.fsia.in/miss-india-2025-winner'
  },
  {
    id: 'w-2',
    name: 'Bhumika Songara',
    title: 'Mrs India 2025 Winner (G-2)',
    season: '2025',
    year: '2025',
    category: 'Forever Mrs India',
    location: 'Rajasthan',
    image: 'https://www.fsia.in/static/media/Bhumika%20Songara%20-%20Mrs%20India%202025%20Winner%20(G-2).jpg',
    url: 'https://www.fsia.in/mrs-india-2025-winner-bhumika'
  },
  {
    id: 'w-3',
    name: 'Anjali Sinha',
    title: 'Mrs India 2025 Winner (G-1)',
    season: '2025',
    year: '2025',
    category: 'Forever Mrs India',
    location: 'Delhi NCR',
    image: 'https://www.fsia.in/static/media/Anjali%20Sinha%20-%20Mrs%20India%202025%20Winner%20%28G-1%29.jpg',
    url: 'https://www.fsia.in/anjali-sinha-mrs-jamshedpur-2025'
  },
  {
    id: 'w-4',
    name: 'Tanvi Yatin Khairnar',
    title: 'Miss Teen India 2025 Winner',
    season: '2025',
    year: '2025',
    category: 'Forever Miss Teen India',
    location: 'Maharashtra',
    image: 'https://www.fsia.in/static/media/Tanvi%20Yatin%20Khairnar%20-%20Miss%20Teen%20India%202025%20Winner.jpg',
    url: 'https://www.fsia.in/miss-teen-india-2025-winner'
  },
  {
    id: 'w-5',
    name: 'Dr Srujana Devi',
    title: 'Miss Forever Universe India 2025',
    season: '2025',
    year: '2025',
    category: 'Miss Forever Universe',
    location: 'Andhra Pradesh',
    image: 'https://www.fsia.in/static/media/Dr%20Srujana%20Devi%20-%20Miss%20Forever%20Universe%20India%202025.jpg',
    url: 'https://www.fsia.in/miss-visakhapatnam-2025-dr-srujana-devi'
  },
  {
    id: 'w-6',
    name: 'Saartha Sameer Gore',
    title: 'Miss Forever Universe 2025 Winner',
    season: '2025',
    year: '2025',
    category: 'Miss Forever Universe',
    location: 'Goa',
    image: 'https://www.fsia.in/static/media/Saartha%20Sameer%20Gore%20-%20Miss%20Forever%20Universe%202025%20Winner.jpg',
    url: 'https://www.fsia.in/miss-universe-2025-winner'
  },
  {
    id: 'w-7',
    name: 'Shweta Parmar',
    title: 'Miss India 2024 Winner',
    season: '2024',
    year: '2024',
    category: 'Forever Miss India',
    location: 'Gujarat',
    image: 'https://www.fsia.in/static/media/glimp7.4e94b375d70df024292d.webp',
    url: 'https://www.fsia.in/pageant-winner'
  },
  {
    id: 'w-8',
    name: 'Priyanka Sharma',
    title: 'Mrs India 2024 Winner (G-1)',
    season: '2024',
    year: '2024',
    category: 'Forever Mrs India',
    location: 'Madhya Pradesh',
    image: 'https://www.fsia.in/static/media/glimp3.63ff9e3b97b10fae1ec7.webp',
    url: 'https://www.fsia.in/pageant-winner'
  },
  {
    id: 'w-9',
    name: 'Aashi Agarwal',
    title: 'Miss Teen India 2024 Winner',
    season: '2024',
    year: '2024',
    category: 'Forever Miss Teen India',
    location: 'Uttar Pradesh',
    image: 'https://www.fsia.in/static/media/exclusive1.webp',
    url: 'https://www.fsia.in/pageant-winner'
  },
  {
    id: 'w-10',
    name: 'Dr. Meenakshi Rao',
    title: 'Mrs India 2023 Winner (G-2)',
    season: '2023',
    year: '2023',
    category: 'Forever Mrs India',
    location: 'Karnataka',
    image: 'https://www.fsia.in/static/media/glimp2.613cba0798f90b93bdc2.webp',
    url: 'https://www.fsia.in/pageant-winner'
  },
  {
    id: 'w-11',
    name: 'Kritika Rathore',
    title: 'Miss India 2023 Winner',
    season: '2023',
    year: '2023',
    category: 'Forever Miss India',
    location: 'Rajasthan',
    image: 'https://www.fsia.in/static/media/glimp1.119142dd64fdf31b60d6.webp',
    url: 'https://www.fsia.in/pageant-winner'
  },
  {
    id: 'w-12',
    name: 'Riya Sen',
    title: 'Miss Teen India 2022 Winner',
    season: '2022',
    year: '2022',
    category: 'Forever Miss Teen India',
    location: 'West Bengal',
    image: 'https://www.fsia.in/static/media/finalestudio1.webp',
    url: 'https://www.fsia.in/pageant-winner'
  }
];

export const ARTICLES: ArticleItem[] = [
  {
    id: 'art-1',
    title: 'Forever Miss India, Mrs India & Miss Teen India 2026 Registrations Open',
    category: 'Pageants',
    date: 'January 15, 2026',
    readTime: '3 min read',
    image: 'https://www.fsia.in/uploads/regopenmrsmiss.webp',
    excerpt: 'Audition rounds announced across 4,000+ cities with democratic judging, digital profile creation, and grand crowning at Zee Studio Jaipur.',
    url: 'https://www.fsia.in/forever-miss-india-new.php',
    content: [
      'Forever Star India has officially opened registration for Season 2026 of its flagship pageants: Forever Miss India, Forever Mrs India (G-1 and G-2), and Forever Miss Teen India.',
      'Aspiring participants from all 28 states and union territories can register through the official website at fsia.in to secure auditions in their home cities.',
      'Winners from each city chapter will receive dedicated official crowns, state recognition, and direct entry into the televised national grand finale.'
    ]
  },
  {
    id: 'art-2',
    title: 'Super Woman & Super Hero Awards 2026: Nominations Open Across India',
    category: 'Awards',
    date: 'February 02, 2026',
    readTime: '4 min read',
    image: 'https://www.fsia.in/static/media/new-update.jpg',
    excerpt: 'Honouring inspirational changemakers, entrepreneurs, brave hearts, and community leaders with prestigious Govt. Registered Class 41 trophies.',
    url: 'https://www.fsia.in/super-woman-award.php',
    content: [
      'Nominations are officially active for the Super Woman and Super Hero Awards Season 2026. The awards recognize extraordinary achievements across diverse professional and humanitarian domains.',
      'The evaluation criteria are purely merit-driven, overseen by an independent jury of distinguished public figures, veterans, and senior media editors.',
      'Awardees will receive national news coverage, high-definition telecast archives, and verified Google profile ranking.'
    ]
  },
  {
    id: 'art-3',
    title: 'Bharat Couture Week 2026: Celebrating Master Designers & Runway Artisans',
    category: 'Fashion Shows',
    date: 'February 20, 2026',
    readTime: '3 min read',
    image: 'https://fsia.in/uploads/1780293817Forever Fashion Week 2024.jpeg',
    excerpt: 'Celebrity couturiers and emerging fashion innovators assemble on the grand FSIA runway to showcase rich Indian textile heritage.',
    url: 'https://www.fsia.in/bharat-couture-week-fashion-week.php',
    content: [
      'Bharat Couture Week by Forever Star India returns with an opulent showcase uniting fashion designers, top makeup artists, and delegates.',
      'The showcase puts a spotlight on handlooms, traditional bridal wear, and contemporary Indian luxury design.'
    ]
  },
  {
    id: 'art-4',
    title: 'Zee Studio Jaipur Hosts Grand Finale of Forever Star India',
    category: 'Events',
    date: 'March 04, 2026',
    readTime: '5 min read',
    image: 'https://www.fsia.in/static/media/ee4544.6a2d3bd6bf0b169df07e.webp',
    excerpt: 'State-of-the-art production, multi-camera live broadcast, and 300+ delegates crowned on a momentous national evening.',
    url: 'https://www.fsia.in/news-coverage.php',
    content: [
      'The grandeur of the national finale was witnessed by thousands of live attendees and viewers nationwide from Zee Studio Jaipur.',
      'Founder Rajesh Agarwal congratulated each delegate, reiterating FSIA’s commitment to providing an egalitarian launchpad.'
    ]
  },
  {
    id: 'art-5',
    title: 'International Awards 2026: Global Honours at Bangkok & Dubai',
    category: 'Awards',
    date: 'March 18, 2026',
    readTime: '3 min read',
    image: 'https://www.fsia.in/static/media/glimp3.63ff9e3b97b10fae1ec7.webp',
    excerpt: 'Recognizing global Indian diaspora leaders, cross-border entrepreneurs, and changemakers on prestigious world stages.',
    url: 'https://www.fsia.in/international-award.php',
    content: [
      'FSIA International Awards celebrate Indian luminaries achieving outstanding global milestones across trade, healthcare, arts, and philanthropy.',
      'Nominees are assessed by international panels with diplomatic and corporate dignitaries present at the awards ceremony.'
    ]
  },
  {
    id: 'art-6',
    title: 'Business Leadership Awards 2026: Celebrating Enterprise Excellence',
    category: 'Events',
    date: 'April 05, 2026',
    readTime: '4 min read',
    image: 'https://www.fsia.in/static/media/award-ban.ff53fc6b16262b9a7c49.webp',
    excerpt: 'Honouring innovative startups, MSMEs, corporate visionaries, and ethical enterprises transforming India’s economic ecosystem.',
    url: 'https://www.fsia.in/business-awards.php',
    content: [
      'The Business Leadership Awards provide unmatched national exposure, media telecast, and official certification under Class 41.',
      'Distinguished founders and corporate leaders will convene for keynote panels and felicitations.'
    ]
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Zee Studio Grand Coronation Arena',
    category: 'Stage & Crowning',
    event: 'Grand Finale at Zee Studio Jaipur',
    image: 'https://www.fsia.in/static/media/finalestudio1.webp',
    caption: 'The magnificent stage setup and illumination at Zee Studio Jaipur during the national finale.'
  },
  {
    id: 'gal-2',
    title: 'Stage Lighting & Production Architecture',
    category: 'Stage & Crowning',
    event: 'Broadcast Setup Zee Studio',
    image: 'https://www.fsia.in/static/media/grand-finale-setup1.webp',
    caption: 'State-of-the-art stage architecture engineered for multi-camera live national telecast.'
  },
  {
    id: 'gal-3',
    title: 'Live Telecast Crowning Ceremony',
    category: 'Stage & Crowning',
    event: 'National Coronation Ceremony',
    image: 'https://www.fsia.in/static/media/live-ceremony1.webp',
    caption: 'Official crowning moment of delegates amidst celebratory fanfare and applause.'
  },
  {
    id: 'gal-4',
    title: 'Exclusive Runway Walk Moments',
    category: 'Pageants',
    event: 'National Runway Showcase',
    image: 'https://www.fsia.in/static/media/exclusive1.webp',
    caption: 'Delegates commanding the catwalk in bespoke designer creations and high couture.'
  },
  {
    id: 'gal-5',
    title: 'Celebrating Victory with Families',
    category: 'Coronation',
    event: 'Post-Crowning Celebrations',
    image: 'https://www.fsia.in/static/media/celebrate-with-family1.webp',
    caption: 'Heartfelt emotional reunions with family members and mentors after winning the prestigious title.'
  },
  {
    id: 'gal-6',
    title: 'National Titleholders Runway Presentation',
    category: 'Fashion Shows',
    event: 'Grand Gala Ramp',
    image: 'https://www.fsia.in/static/media/glimp5.ea400be22abb3357da44.webp',
    caption: 'National finalists presenting cultural elegance and contemporary poise before the jury.'
  },
  {
    id: 'gal-7',
    title: 'Backstage Preparation & Trophy Presentations',
    category: 'Awards',
    event: 'Award Ceremony Backstage',
    image: 'https://www.fsia.in/static/media/glimp6.c55625d69c05aad48676.webp',
    caption: 'Pre-show grooming, styling checks, and trophy showcases prior to stage entry.'
  },
  {
    id: 'gal-8',
    title: 'Coronation Grandeur & Golden Celebration',
    category: 'Stage & Crowning',
    event: 'Finale Climax',
    image: 'https://www.fsia.in/static/media/glimp7.4e94b375d70df024292d.webp',
    caption: 'Golden shower confetti celebration marking the triumphant coronation of the new queens.'
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    name: 'Tanvi Yatin Khairnar',
    title: 'Miss Teen India 2025 Winner',
    city: 'Maharashtra',
    quote: 'Winning Miss Teen India on the grand stage of Zee Studio Jaipur transformed my confidence completely. FSIA gave me the guidance, transparent jury evaluation, and national voice I had dreamed of.',
    badge: 'Crowned Queen'
  },
  {
    id: 'test-2',
    name: 'Dr. Srujana Devi',
    title: 'Miss Forever Universe India 2025',
    city: 'Telangana',
    quote: 'As a medical professional, balancing pageantry and purpose was made seamless by the FSIA mentorship team. The democratic city-to-national structure provides a credible platform for empowered women.',
    badge: 'Universe Titleholder'
  },
  {
    id: 'test-3',
    name: 'Anjali Sinha',
    title: 'Mrs India 2025 Winner (G-1)',
    city: 'Delhi NCR',
    quote: 'Forever Mrs India proves that a woman’s journey of self-discovery continues with even greater grace after marriage. The training, production quality at Zee Studio, and media coverage are second to none.',
    badge: 'Crowned Queen'
  },
  {
    id: 'test-4',
    name: 'Yukti & Delegates',
    title: 'FSIA Community & Alumni',
    city: 'Jaipur',
    quote: 'Thanks for this life-changing experience! The grooming sessions, transparent city auditions, and support from the entire team make FSIA the finest platform for upcoming talent in India.',
    badge: 'Verified Feedback'
  }
];

export const CELEBRITIES: CelebrityItem[] = [
  {
    id: 'celeb-1',
    name: 'Arbaaz Khan',
    role: 'Celebrity Chief Guest & Dignitary',
    description: 'Bollywood actor, director, and producer gracing the grand stage at Zee Studio Jaipur, felicitating national winners and applauding grassroots talent from across 4,000+ cities.',
    image: 'https://www.fsia.in/static/media/bh22.42ee04cb2d86e02b3fb2.jpg',
    event: 'Grand Finale Ceremony • Zee Studio Jaipur'
  },
  {
    id: 'celeb-2',
    name: 'Malaika Arora',
    role: 'Celebrity Guest of Honour & Style Icon',
    description: 'Indian style icon and celebrated Bollywood personality presenting honours to visionary women, entrepreneurs, and crowned titleholders at the Forever Star India coronation.',
    image: 'https://www.fsia.in/static/media/ml22.e5f4d5434d9182f8ccf8.jpg',
    event: 'Super Hero & Super Woman Awards Ceremony'
  },
  {
    id: 'celeb-3',
    name: 'VIP Guests & National Jury',
    role: 'Distinguished Dignitaries & Mentors',
    description: 'Eminent public figures, veterans, and industry stalwarts gracing the stage to crown achievers and support humanitarian initiatives.',
    image: 'https://www.fsia.in/static/media/guest1.3b03b758489c112db95e.jpg',
    event: 'National Felicitation & Crowning Night'
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Rajesh Agarwal',
    role: 'Founder & CEO',
    designation: 'Founder & CEO (Rajesh Star), Forever Star India',
    bio: 'The visionary architect behind Forever Star India (FSIA). Committed to building a non-discriminatory national and international platform where talent receives opportunity before it is judged.',
    image: 'https://www.fsia.in/static/media/Rajesh-Agarwal-CEO-FSIA1.9c07bfbc9cec7349d15e.jpg'
  },
  {
    name: 'Jaya Chauhan',
    role: 'Director',
    designation: 'Director, Forever Star India',
    bio: 'Guiding executive strategy, nationwide expansion, and institutional partnerships across beauty pageants and prestigious national awards.',
    image: 'https://www.fsia.in/static/media/Jaya-Chauhan-Director-FSIA1.d3b0805254797203b5d6.jpg'
  },
  {
    name: 'Preeti Raikwar',
    role: 'Operations Head',
    designation: 'Core Operations & Pageant Management',
    bio: 'Coordinating pan-India city audition chapters, delegate onboarding, and communications across state teams to ensure flawless event management.',
    image: 'https://www.fsia.in/static/media/vision3.b4e85aa68285559bb0ff.webp'
  },
  {
    name: 'Khushi',
    role: 'Talent Relations',
    designation: 'Talent & Delegate Relations',
    bio: 'Guiding delegates through registration, audition portfolios, and stage etiquette preparation across north and western regions.',
    image: 'https://www.fsia.in/static/media/vision1.b5292677ed5b5447e8e4.webp'
  },
  {
    name: 'Suraj',
    role: 'Event Production',
    designation: 'Stage & Technical Operations',
    bio: 'Leading stage architecture, lighting choreography, and broadcast coordination at Zee Studio Jaipur and live national transmissions.',
    image: 'https://www.fsia.in/static/media/glimp1.d63f0d5718dfd38d3bb1.webp'
  },
  {
    name: 'Harshvardhan',
    role: 'Media & Communications',
    designation: 'Press & Public Relations',
    bio: 'Managing press syndication, media coverage, Google profile optimization for winners, and national publications.',
    image: 'https://www.fsia.in/static/media/glimp4.657abb599cd479f88972.webp'
  }
];

export const PARTNERS: PartnerItem[] = [
  {
    id: 'partner-bolly-orbit',
    name: 'Bolly Orbit',
    logo: 'https://www.fsia.in/static/media/Bolly%20Orbit%20Logo%20(1).dc1aaaef4200c6055ca7.jpg',
    label: 'Official FSIA Partner'
  },
  {
    id: 'partner-bollywood-wave',
    name: 'Bollywood Wave',
    logo: 'https://www.fsia.in/static/media/Bollywood%20Wave%20Logo.3cadba066f8cdd15e94e.jpg',
    label: 'Official FSIA Partner'
  },
  {
    id: 'partner-celebvalley',
    name: 'Celebvalley',
    logo: 'https://www.fsia.in/static/media/Celebvalley%20Logo.ee03d8b5dbaf9550aa0b.jpg',
    label: 'Official FSIA Partner'
  },
  {
    id: 'partner-extreme-web-world',
    name: 'Extreme Web World',
    logo: 'https://www.fsia.in/static/media/Extreme%20Web%20World%20Logo.b43a78ec3e17b66b2c6d.jpg',
    label: 'Official FSIA Partner'
  },
  {
    id: 'partner-forever-fashion',
    name: 'Forever Fashion',
    logo: 'https://www.fsia.in/static/media/Forever%20Fashion%20Logo.760eb1f638f42d556444.jpg',
    label: 'Official FSIA Partner'
  },
  {
    id: 'partner-forever-leaves',
    name: 'Forever Leaves',
    logo: 'https://www.fsia.in/static/media/Forever%20Leaves%20Logo.d355f63514956496a041.jpg',
    label: 'Official FSIA Partner'
  },
  {
    id: 'partner-golden-divine',
    name: 'Golden Divine',
    logo: 'https://www.fsia.in/static/media/Golden%20Divine%20Logo.b65cbb8479b5667673c0.jpg',
    label: 'Official FSIA Partner'
  },
  {
    id: 'partner-intra-life',
    name: 'Intra Life Private Limited',
    logo: 'https://www.fsia.in/static/media/Intra%20Life%20Private%20Limited.5a43f7b635f99819af7a.jpg',
    label: 'Official FSIA Partner'
  },
  {
    id: 'partner-jaipur-mirror',
    name: 'Jaipur Mirror',
    logo: 'https://www.fsia.in/static/media/Jaipur%20Mirror%20Logo.2d6ffb79310b772f5436.jpg',
    label: 'Official FSIA Partner'
  },
  {
    id: 'partner-kp-productions',
    name: 'KP Productions',
    logo: 'https://www.fsia.in/static/media/KP%20Productions%20Logo.87c85e1536ff633a2761.jpg',
    label: 'Official FSIA Partner'
  },
  {
    id: 'partner-leroy-nutrascience',
    name: 'Leroy Nutrascience',
    logo: 'https://www.fsia.in/static/media/Leroy%20Nutrascience.a44747e3e612420759c9.jpg',
    label: 'Official FSIA Partner'
  },
  {
    id: 'partner-news-forever',
    name: 'News Forever',
    logo: 'https://www.fsia.in/static/media/News%20Forever%20Logo.0f0f3b524daf12136124.jpg',
    label: 'Official FSIA Partner'
  },
  {
    id: 'partner-nm-academy',
    name: 'NM Academy',
    logo: 'https://www.fsia.in/static/media/NM%20Academy%20Logo.dcc7f0894b1418eeee24.jpg',
    label: 'Official FSIA Partner'
  },
  {
    id: 'partner-rajasthan-horizon',
    name: 'Rajasthan Horizon',
    logo: 'https://www.fsia.in/static/media/Rajasthan%20Horizon%20Logo.746bd013dbd9b28be579.jpg',
    label: 'Official FSIA Partner'
  },
  {
    id: 'partner-sangri-times',
    name: 'Sangri Times',
    logo: 'https://www.fsia.in/static/media/Sangri%20Times%20Logo.630665438a4edb23dc45.jpg',
    label: 'Official FSIA Partner'
  },
  {
    id: 'partner-sangri-today',
    name: 'Sangri Today',
    logo: 'https://www.fsia.in/static/media/Sangri%20Today%20Logo.2c2fa7461d09b785c355.jpg',
    label: 'Official FSIA Partner'
  },
  {
    id: 'partner-walpar-nutritions',
    name: 'Walpar Nutritions',
    logo: 'https://www.fsia.in/static/media/Walpar%20Nutritions%20Logo.8bb3f713619c18a2f0cd.jpg',
    label: 'Official FSIA Partner'
  }
];

export const FSIA_SOCIAL_PLATFORMS: SocialPlatformItem[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    profileName: '@fsia_forever',
    iconName: 'instagram',
    url: 'https://www.instagram.com/fsia_forever/',
    description: 'Follow FSIA on Instagram for live crowning ceremony glimpses, state winner announcements, behind-the-scenes auditions, and official pageant photoshoots.',
    badge: 'Official Pageant Feed',
    thumbnail: 'https://www.fsia.in/static/media/Neeharika%20Bethanapalli%20-%20Miss%20India%202025%20Winner.jpg'
  },
  {
    id: 'facebook',
    name: 'Facebook',
    profileName: '@Foreverstarindiaawards',
    iconName: 'facebook',
    url: 'https://www.facebook.com/Foreverstarindiaawards/',
    description: 'Follow FSIA on Facebook for official press releases, city audition schedules, participant congratulations, jury announcements, and live stream notifications.',
    badge: 'Official Community',
    thumbnail: 'https://www.fsia.in/uploads/Forever-Star-India-Pageant.webp'
  },
  {
    id: 'youtube',
    name: 'YouTube',
    profileName: '@foreverstarindiaaward',
    iconName: 'youtube',
    url: 'https://www.youtube.com/c/foreverstarindiaaward',
    description: 'Subscribe on YouTube for full crowning telecasts, grand finale stage walks, winner interviews, talent performances, and Zee Studio high-definition event archives.',
    badge: 'Official Video Channel',
    thumbnail: 'https://www.fsia.in/uploads/Forever-Star-India-award-season-8.webp'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    profileName: 'Forever Star India Awards',
    iconName: 'linkedin',
    url: 'https://www.linkedin.com/company/forever-star-india-awards/',
    description: 'Connect on LinkedIn for corporate partnerships, industry jury appointments, business awards network, and institutional excellence recognitions.',
    badge: 'Professional Network',
    thumbnail: 'https://www.fsia.in/static/media/glimp7.4e94b375d70df024292d.webp'
  },
  {
    id: 'twitter',
    name: 'Twitter (X)',
    profileName: '@FsiaAward',
    iconName: 'twitter',
    url: 'https://twitter.com/FsiaAward',
    description: 'Official announcements, event notifications, jury alerts, and real-time updates from Forever Star India.',
    badge: 'Official Twitter',
    thumbnail: 'https://www.fsia.in/static/media/glimp1.119142dd64fdf31b60d6.webp'
  },
  {
    id: 'pinterest',
    name: 'Pinterest',
    profileName: 'fsiaaward',
    iconName: 'pinterest',
    url: 'https://in.pinterest.com/fsiaaward/',
    description: 'Pinboards featuring high-fashion runway lookbooks, couture designs, crowns, and coronation moments.',
    badge: 'Visual Board',
    thumbnail: 'https://www.fsia.in/static/media/glimp2.613cba0798f90b93bdc2.webp'
  }
];

export const BRAND_PILLARS = [
  {
    title: 'Transparency',
    description: 'Open, democratic auditions and transparent multi-stage evaluation based strictly on merit with zero bias.'
  },
  {
    title: 'Reach Across 4000+ Cities',
    description: 'Audition rounds and city chapter selections spanning all 28 states and union territories across India.'
  },
  {
    title: 'Support for Women, Youth & Achievers',
    description: 'Dedicated national platforms empowering aspiring women, ambitious teenagers, and community changemakers.'
  },
  {
    title: 'National Recognition',
    description: 'Official crowns, Zee Studio telecasts, Google profile optimization, and Govt. Registered Class 41 trademark trophies.'
  }
];

export interface WhyFsiaPoint {
  title: string;
  description: string;
}

export const WHY_FSIA_POINTS: WhyFsiaPoint[] = [
  {
    title: 'City-Level Representation',
    description: 'Unique format honoring 1 winner from every city, ensuring regional talent receives genuine national and state-level recognition.'
  },
  {
    title: 'Transparent Merit Jury',
    description: 'Uncompromising multi-stage evaluation based strictly on merit, talent, leadership, and stage presence with zero bias.'
  },
  {
    title: 'Nationwide Stage & Telecast',
    description: 'Grand final coronation hosted at iconic venues like Zee Studio Jaipur with professional live stream and broadcast coverage.'
  },
  {
    title: 'Official Government Trademark',
    description: 'Star Logo is a registered trademark under Class 41 with the Government of India, protecting the prestige and validity of your awards.'
  },
  {
    title: 'National & International Pathways',
    description: 'Winners represent India at Miss FSIA International, Mrs FSIA International, Universe and World international editions.'
  },
  {
    title: 'Lifelong Alumni Community',
    description: 'Join a distinguished network of 900+ titleholders and 10,000+ delegates across 4,000+ Indian cities and global chapters.'
  }
];

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Pageant' | 'Award Show' | 'Fashion';
  status: string;
  year: string;
  image: string;
  description: string;
  highlights: string[];
  url: string;
}

export const CURRENT_PROJECTS: ProjectItem[] = [
  {
    id: 'proj-miss-india-2026',
    title: 'Forever Miss India 2026',
    category: 'Pageant',
    status: 'Auditions Open',
    year: '2026',
    image: 'https://www.fsia.in/uploads/Forever-Star-India-Pageant.webp',
    description: 'National beauty pageant celebrating unmarried women aged 18-35 across 4,000+ cities with no arbitrary height restriction.',
    highlights: ['Auditions in 4,000+ Cities', '1 Winner Every City', 'Zee Studio Grand Finale'],
    url: 'https://www.fsia.in/forever-miss-india'
  },
  {
    id: 'proj-mrs-india-2026',
    title: 'Forever Mrs India 2026',
    category: 'Pageant',
    status: 'Auditions Open',
    year: '2026',
    image: 'https://www.fsia.in/static/media/Bhumika%20Songara%20-%20Mrs%20India%202025%20Winner%20(G-2).jpg',
    description: 'Prestigious national platform for married, widowed, and separated women with two age categories: G-1 (18–38) and G-2 (39+).',
    highlights: ['G-1 & G-2 Age Divisions', 'Personality & Leadership Jury', 'International Title Route'],
    url: 'https://www.fsia.in/forever-mrs-india'
  },
  {
    id: 'proj-miss-teen-india-2026',
    title: 'Forever Miss Teen India 2026',
    category: 'Pageant',
    status: 'Auditions Open',
    year: '2026',
    image: 'https://www.fsia.in/static/media/Tanvi%20Yatin%20Khairnar%20-%20Miss%20Teen%20India%202025%20Winner.jpg',
    description: 'Empowering young ambitious teenage girls aged 13-18 with runway grooming, public speaking mentorship, and youth leadership crowns.',
    highlights: ['Ages 13 to 18 Years', 'Runway & Etiquette Grooming', 'National Youth Crown'],
    url: 'https://www.fsia.in/forever-miss-teen-india'
  },
  {
    id: 'proj-super-woman-2026',
    title: 'Super Woman Award 2026',
    category: 'Award Show',
    status: 'Nominations Active',
    year: '2026',
    image: 'https://www.fsia.in/uploads/Forever-Star-India-award-season-8.webp',
    description: 'National award honoring extraordinary women changemakers, entrepreneurs, social crusaders, educators, and artists across India.',
    highlights: ['Season 8 Felicitations', 'Independent Merit Panel', 'Govt. Class 41 Trophy'],
    url: 'https://www.fsia.in/super-woman-award'
  },
  {
    id: 'proj-super-hero-2026',
    title: 'Super Hero Award 2026',
    category: 'Award Show',
    status: 'Nominations Active',
    year: '2026',
    image: 'https://www.fsia.in/static/media/award-ban.ff53fc6b16262b9a7c49.webp',
    description: 'National felicitation celebrating male and female community heroes, bravehearts, medical pioneers, and societal leaders.',
    highlights: ['National Civilian Recognition', 'Celebrity Presentation', 'Zee Studio Jaipur Stage'],
    url: 'https://www.fsia.in/super-hero-award'
  },
  {
    id: 'proj-business-award-2026',
    title: 'Business Award 2026',
    category: 'Award Show',
    status: 'Entries Open',
    year: '2026',
    image: 'https://www.fsia.in/static/media/glimp7.4e94b375d70df024292d.webp',
    description: 'Recognizing corporate excellence, startup innovation, MSME resilience, and visionary entrepreneurs shaping India’s economy.',
    highlights: ['Corporate & SME Verticals', 'Media Syndication', 'Industry Jury Audit'],
    url: 'https://www.fsia.in/business-awards'
  },
  {
    id: 'proj-couture-week-2026',
    title: 'Bharat Couture Week 2026',
    category: 'Fashion',
    status: 'Designer Entries Open',
    year: '2026',
    image: 'https://www.fsia.in/static/media/glimp5.9922245b73aeeb9a6aa4.webp',
    description: 'India’s premier runway showcasing traditional handloom heritage alongside avant-garde couture from designers and master weavers.',
    highlights: ['Top Indian Designers', 'Supermodels Runway', 'National Fashion Press'],
    url: 'https://www.fsia.in/bharat-couture-week'
  }
];

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'Pageants' | 'Awards' | 'General';
}

export const FSIA_FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'What is the eligibility criteria for Forever Miss India 2026?',
    answer: 'Forever Miss India is open to unmarried Indian women aged 18 to 35. FSIA does not impose arbitrary height or weight restrictions — contestants are judged on grace, confidence, intelligence, stage presence, and communication skills.',
    category: 'Pageants'
  },
  {
    id: 'faq-2',
    question: 'What are the two age groups for Forever Mrs India?',
    answer: 'Forever Mrs India is divided into two distinct groups to provide fair evaluation: Group 1 (G-1) covers ages 18 to 38, and Group 2 (G-2) is for ages 39 and above. Both groups compete for city, state, and national titles.',
    category: 'Pageants'
  },
  {
    id: 'faq-3',
    question: 'How does the city-level audition and selection format work?',
    answer: 'FSIA conducts digital and physical city auditions across 4,000+ Indian cities. One winner is crowned from every participating city, who then represents her city at the state level before advancing to the Grand Finale at Zee Studio Jaipur.',
    category: 'Pageants'
  },
  {
    id: 'faq-4',
    question: 'How are Super Woman and Super Hero Award nominations evaluated?',
    answer: 'Award nominations are reviewed by an independent jury of distinguished professionals. Nominees are evaluated strictly on their demonstrated contributions, professional accomplishments, societal impact, and verified portfolio credentials.',
    category: 'Awards'
  },
  {
    id: 'faq-5',
    question: 'Where is the Grand Finale held and is it televised?',
    answer: 'The FSIA Grand Finale and Coronation Ceremony is hosted at iconic studio facilities such as Zee Studio Jaipur, Rajasthan, featuring world-class stage production, celebrity guest felicitations, and comprehensive live streaming and broadcast media coverage.',
    category: 'General'
  },
  {
    id: 'faq-6',
    question: 'Is Forever Star India an officially registered trademark organization?',
    answer: 'Yes. Forever Star India (FSIA) and the Star Logo are registered trademarks under Class 41 with the Government of India, ensuring all awarded titles, certificates, and trophies hold legal protection and verifiable prestige.',
    category: 'General'
  }
];

export const UPCOMING_EVENTS: EventCalendarItem[] = [
  {
    id: 'ev-1',
    title: 'Forever Miss & Mrs India 2026 – North India Auditions',
    date: '2026-09-28',
    time: '10:00 AM – 6:00 PM IST',
    type: 'audition',
    category: 'Forever Miss & Mrs India',
    venue: 'FSIA Cultural Center / Hub, Connaught Place',
    city: 'New Delhi',
    description: 'Preliminary audition round and personal poise evaluation for northern states delegates. Successful candidates earn official city titles and qualification for state rounds.',
    eligibility: 'Unmarried (Miss) 18–35 yrs, Married (Mrs) G-1 (18–38) & G-2 (39+).',
    highlights: [
      'Personal introduction & ramp walk test',
      'Professional headshot & portfolio review',
      'Direct city crowning qualification',
      'Mentorship & media coaching introduction'
    ],
    status: 'active',
    ctaText: 'Quick Apply 2026',
    ctaUrl: 'https://www.fsia.in/quickapply',
    image: 'https://www.fsia.in/uploads/Forever-Star-India-Pageant.webp'
  },
  {
    id: 'ev-2',
    title: 'Forever Miss Teen India 2026 – Poise & Runway Masterclass',
    date: '2026-10-05',
    time: '11:00 AM – 3:30 PM IST',
    type: 'workshop',
    category: 'Forever Miss Teen India',
    venue: 'Digital Production Hub & Jaipur Studio',
    city: 'Jaipur & Online Telecast',
    description: 'Intensive digital and hybrid ramp-walk masterclass conducted by national choreographers and former titleholders for registered teen contestants across India.',
    eligibility: 'Young female talents aged 13 to 19 years across all Indian states.',
    highlights: [
      'Ramp walk posture and camera projection',
      'Public speaking and stage microphone mastery',
      'Confidence building and poise development',
      'One-on-one feedback from celebrity jury'
    ],
    status: 'upcoming',
    ctaText: 'Teen Pageant Details',
    ctaUrl: 'https://www.fsia.in/forever-miss-teen-india-new.php',
    image: 'https://www.fsia.in/static/media/Tanvi%20Yatin%20Khairnar%20-%20Miss%20Teen%20India%202025%20Winner.jpg'
  },
  {
    id: 'ev-3',
    title: 'Western Zone Pageant Screening & City Crowning (Mumbai Hub)',
    date: '2026-10-12',
    time: '10:30 AM – 5:30 PM IST',
    type: 'audition',
    category: 'Forever Miss & Mrs India',
    venue: 'Bandra Cultural Arts Center, Mumbai',
    city: 'Mumbai, Maharashtra',
    description: 'Western region offline jury evaluation for Maharashtra, Gujarat, and Goa candidates. Official sashes and city titles awarded during the evening session.',
    eligibility: 'Registered candidates from western zone city chapters.',
    highlights: [
      'Western India city crowning ceremony',
      'Fashion designer couture presentation',
      'Televised red carpet interview clips',
      'Golden Ticket to Zee Studio National Finale'
    ],
    status: 'upcoming',
    ctaText: 'Join Western Audition',
    ctaUrl: 'https://www.fsia.in/quickapply',
    image: 'https://www.fsia.in/static/media/exclusive1.webp'
  },
  {
    id: 'ev-4',
    title: 'Super Woman Award 2026 – Season 8 Nominations Final Deadline',
    date: '2026-10-25',
    time: '11:59 PM IST (Online Portal Closes)',
    type: 'award',
    category: 'Super Woman Award (Season 8)',
    venue: 'FSIA National Secretariat & Online Portal',
    city: 'Jaipur, Rajasthan',
    description: 'Final submission deadline for Season 8 Super Woman national honors under Class 41 registered trademark. Independent jury evaluation convenes immediately following closure.',
    eligibility: 'Women entrepreneurs, corporate leaders, doctors, educators, and social reform pioneers.',
    highlights: [
      'Government of India Class 41 trademark citation',
      'National jury verification & credential audit',
      'Shortlist publication of top national achievers',
      'Televised feature profile during grand felicitation'
    ],
    status: 'closing_soon',
    ctaText: 'Submit Nomination',
    ctaUrl: 'https://www.fsia.in/super-woman-award.php',
    image: 'https://www.fsia.in/uploads/Forever-Star-India-award-season-8.webp'
  },
  {
    id: 'ev-5',
    title: 'South India Regional Rounds & City Title Crowns (Bengaluru Hub)',
    date: '2026-11-04',
    time: '10:00 AM – 6:30 PM IST',
    type: 'audition',
    category: 'Forever Miss, Mrs & Teen India',
    venue: 'The Grand Pavilion, MG Road',
    city: 'Bengaluru, Karnataka',
    description: 'Southern regional audition rounds bringing together delegates from Karnataka, Tamil Nadu, Telangana, Andhra Pradesh, and Kerala. Finalists crowned live with city tiaras.',
    eligibility: 'South zone registered delegates for Miss, Mrs (G-1 & G-2), and Teen categories.',
    highlights: [
      'Bilingual eloquence and cultural round',
      'City crown and sash conferment',
      'Official video documentary filming',
      'State-level qualification announcement'
    ],
    status: 'upcoming',
    ctaText: 'Register for South Hub',
    ctaUrl: 'https://www.fsia.in/quickapply',
    image: 'https://www.fsia.in/static/media/Neeharika%20Bethanapalli%20-%20Miss%20India%202025%20Winner.jpg'
  },
  {
    id: 'ev-6',
    title: 'Super Hero & Business Awards 2026 – Laureates Announcement',
    date: '2026-11-14',
    time: '4:00 PM – 6:00 PM IST',
    type: 'award',
    category: 'Business & Super Hero Awards',
    venue: 'National Press Guild & Live Telecast',
    city: 'Jaipur & Pan-India Broadcast',
    description: 'Official press conference and digital broadcast revealing the verified laureates for Super Hero and Business Excellence Awards across healthcare, defense, startups, and education.',
    eligibility: 'Verified nominees selected by the FSIA national jury.',
    highlights: [
      'Announcement of 100+ national commercial visionaries',
      'Humanitarian courage citations broadcast live',
      'National news publication features across 50+ portals',
      'VIP invitation release for Zee Studio Grand Gala'
    ],
    status: 'upcoming',
    ctaText: 'View Awardees',
    ctaUrl: 'https://www.fsia.in/business-awards.php',
    image: 'https://www.fsia.in/uploads/bnpg3.webp'
  },
  {
    id: 'ev-7',
    title: 'Bharat National Awards 2026 – Season 8 Grand Conferment',
    date: '2026-11-22',
    time: '5:00 PM – 9:30 PM IST',
    type: 'ceremony',
    category: 'Bharat National Awards',
    venue: 'Zee Studio Grand Auditorium, Jaipur',
    city: 'Jaipur, Rajasthan',
    description: 'High-profile national felicitation ceremony honouring distinguished personalities in science, sports, literature, arts, and civil services with official FSIA gold mementos.',
    eligibility: 'Award laureates, jury dignitaries, media guests, and invited delegates.',
    highlights: [
      'Conferment by national dignitaries and celebrities',
      'Red carpet media photography and live TV feed',
      'Gold trophy and verified certificate presentation',
      'Commemorative national yearbook distribution'
    ],
    status: 'upcoming',
    ctaText: 'Nomination Details',
    ctaUrl: 'https://www.fsia.in/bharat-national-awards.php',
    image: 'https://www.fsia.in/static/media/glimp1.119142dd64fdf31b60d6.webp'
  },
  {
    id: 'ev-8',
    title: 'National Finalists Camp: Grand Choreography & Camera Fitting',
    date: '2026-12-05',
    time: '9:00 AM – 7:00 PM IST',
    type: 'workshop',
    category: 'National Finale Grooming',
    venue: 'Zee Studio Production Set, Jaipur',
    city: 'Jaipur, Rajasthan',
    description: 'All crowned city finalists report to Zee Studio Jaipur for professional ramp staging, multi-camera lighting checks, haute couture trials, and jury rehearsal sessions.',
    eligibility: 'Officially qualified city and state titleholders advancing to the national stage.',
    highlights: [
      'Runway alignment on the national broadcast stage',
      'Haute couture evening gown and ethnic wear fittings',
      'Jury Q&A masterclass and media presence workshop',
      'Official national portfolio photo shoot'
    ],
    status: 'upcoming',
    ctaText: 'View Stage Gallery',
    ctaUrl: 'https://www.fsia.in/gallery',
    image: 'https://www.fsia.in/static/media/ee4544.6a2d3bd6bf0b169df07e.webp'
  },
  {
    id: 'ev-9',
    title: 'Forever Star India National Pageant 2026 – Grand Finale & Coronation',
    date: '2026-12-18',
    time: '5:30 PM – 11:00 PM IST',
    type: 'ceremony',
    category: 'Forever Star India Pageant 2026',
    venue: 'Grand Coronation Arena, Zee Studio Jaipur',
    city: 'Jaipur, Rajasthan',
    description: 'The pinnacle event of the season: 900+ delegates take the national stage before a celebrity jury panel. Crowning of Forever Miss India, Forever Mrs India (G-1 & G-2), and Forever Miss Teen India 2026.',
    eligibility: 'National finalists and accredited attendees.',
    highlights: [
      'Live televised broadcast with multi-camera setup',
      '1 winner crowned from every represented city',
      'Celebrity guest performances and crowning moments',
      'Direct ticket to international world pageant circuit'
    ],
    status: 'upcoming',
    ctaText: 'Coronation Details',
    ctaUrl: 'https://www.fsia.in/quickapply',
    image: 'https://www.fsia.in/static/media/grand-finale-setup1.webp'
  },
  {
    id: 'ev-10',
    title: 'Forever Star India National Awards 2026 – Red Carpet Gala Banquet',
    date: '2026-12-20',
    time: '6:30 PM – 11:30 PM IST',
    type: 'ceremony',
    category: 'FSIA Awards Season 8',
    venue: 'Zee Studio Grand Ballroom & Banquet Arena',
    city: 'Jaipur, Rajasthan',
    description: 'Exclusive red-carpet celebration honoring 2026 awardees of Super Woman, Super Hero, and Business Excellence trophies in the presence of industry leaders and film personalities.',
    eligibility: 'Verified awardees, VIP sponsors, and media partners.',
    highlights: [
      'Red carpet photo call with national press',
      'Gold trophy conferment under Class 41 trademark',
      'VIP networking dinner and gala dinner banquet',
      'National television and digital media broadcast'
    ],
    status: 'upcoming',
    ctaText: 'Award Overview',
    ctaUrl: 'https://www.fsia.in/super-woman-award.php',
    image: 'https://www.fsia.in/uploads/Forever-Star-India-award-season-8.webp'
  },
  {
    id: 'ev-11',
    title: 'International Pageant Delegation Orientation (Miss & Mrs World)',
    date: '2027-01-10',
    time: '11:00 AM – 4:00 PM IST',
    type: 'pageant',
    category: 'Miss & Mrs World Circuit',
    venue: 'FSIA International Wing, Jaipur',
    city: 'Jaipur & Global Circuit',
    description: 'Orientation briefing for newly crowned 2026 winners preparing for international representation in Miss World, Mrs World, and Miss Universe circuits.',
    eligibility: 'National crown titleholders selected for international representation.',
    highlights: [
      'International pageant protocol and diplomacy briefing',
      'Global runway choreography and wardrobe planning',
      'Sponsorship endorsement allocations',
      'Official India flag-bearer ceremony'
    ],
    status: 'upcoming',
    ctaText: 'International Pageants',
    ctaUrl: 'https://www.fsia.in/miss-world-beauty-pageant.php',
    image: 'https://www.fsia.in/static/media/glimp7.4e94b375d70df024292d.webp'
  },
  {
    id: 'ev-12',
    title: 'FSIA 2027 Nationwide Audition Tour Launch & City Director Meet',
    date: '2027-01-24',
    time: '10:00 AM – 5:00 PM IST',
    type: 'workshop',
    category: 'Season 2027 Kickoff',
    venue: 'Hotel Clarks Amer / FSIA HQ, Jaipur',
    city: 'Jaipur, Rajasthan',
    description: 'Official rollout of the 2027 audition calendar spanning 4,000+ cities with state franchise heads, regional coordinators, and brand sponsors.',
    eligibility: 'City directors, state coordinators, and franchise partners.',
    highlights: [
      'Announcement of 4,000+ city chapter coordinators',
      'New digital scoring system demonstration',
      'Franchise partner recognitions',
      'Season 2027 audition handbook release'
    ],
    status: 'upcoming',
    ctaText: 'Franchise Inquiries',
    ctaUrl: 'https://www.fsia.in/online-franchise-application',
    image: 'https://www.fsia.in/uploads/Forever-Star-India-Pageant.webp'
  }
];

export const SUCCESS_STORIES: SuccessStoryItem[] = [
  {
    id: 'story-1',
    winnerName: 'Neeharika Bethanapalli',
    title: 'Miss India 2025 Winner',
    category: 'Forever Miss India',
    location: 'Telangana',
    season: '2025',
    image: 'https://www.fsia.in/static/media/Neeharika%20Bethanapalli%20-%20Miss%20India%202025%20Winner.jpg',
    quote: 'Standing on the Zee Studio grand stage with the national sash was surreal. FSIA recognized my authentic voice and gave me a platform with nationwide credibility.',
    story: 'From the initial city audition screening to the intensive runway camp at Jaipur, Neeharika honed her oratorical clarity and catwalk poise, culminating in a unanimous coronation victory.',
    advice: 'Never let self-doubt dim your ambition. Authenticity and discipline always outshine pretense on the national runway.',
    profileUrl: 'https://www.fsia.in/miss-india-2025-winner',
    videoSimDuration: 15,
    slides: [
      {
        image: 'https://www.fsia.in/static/media/Neeharika%20Bethanapalli%20-%20Miss%20India%202025%20Winner.jpg',
        caption: 'City Crowning: Representing Telangana with elegance and poise.',
        stage: 'City Audition'
      },
      {
        image: 'https://www.fsia.in/static/media/grand-finale-setup1.webp',
        caption: 'Zee Studio Staging: Navigating high-fashion choreography under studio lights.',
        stage: 'Ramp Finale'
      },
      {
        image: 'https://www.fsia.in/static/media/ee4544.6a2d3bd6bf0b169df07e.webp',
        caption: 'National Coronation: Conferred the official Class 41 registered Star Crown.',
        stage: 'Coronation Speech'
      }
    ]
  },
  {
    id: 'story-2',
    winnerName: 'Anjali Sinha',
    title: 'Mrs India 2025 Winner (G-1)',
    category: 'Forever Mrs India',
    location: 'Delhi NCR',
    season: '2025',
    image: 'https://www.fsia.in/static/media/Anjali%20Sinha%20-%20Mrs%20India%202025%20Winner%20%28G-1%29.jpg',
    quote: 'FSIA proved that marriage and motherhood are not pauses, but powerful accelerators of our strength, poise, and societal leadership.',
    story: 'Anjali balanced family responsibilities with rigorous preparation, impressing the celebrity jury with her eloquence during the intellectual and personality evaluation rounds.',
    advice: 'Your achievements as a married woman deserve the grandest spotlight. Never hesitate to claim your stage.',
    profileUrl: 'https://www.fsia.in/anjali-sinha-mrs-jamshedpur-2025',
    videoSimDuration: 18,
    slides: [
      {
        image: 'https://www.fsia.in/static/media/Anjali%20Sinha%20-%20Mrs%20India%202025%20Winner%20%28G-1%29.jpg',
        caption: 'G-1 Titleholder: Exemplifying grace and contemporary leadership.',
        stage: 'City Audition'
      },
      {
        image: 'https://www.fsia.in/static/media/exclusive1.webp',
        caption: 'Haute Couture Round: Custom bridal couture runway showcase.',
        stage: 'Ramp Finale'
      },
      {
        image: 'https://www.fsia.in/static/media/glimp3.63ff9e3b97b10fae1ec7.webp',
        caption: 'National Felicitation: Celebrated with family and mentors at Zee Studio.',
        stage: 'Coronation Speech'
      }
    ]
  },
  {
    id: 'story-3',
    winnerName: 'Bhumika Songara',
    title: 'Mrs India 2025 Winner (G-2)',
    category: 'Forever Mrs India',
    location: 'Rajasthan',
    season: '2025',
    image: 'https://www.fsia.in/static/media/Bhumika%20Songara%20-%20Mrs%20India%202025%20Winner%20(G-2).jpg',
    quote: 'At 40+, FSIA gave me the grandest runway in India. True beauty is forged in life experience, confidence, and resilience.',
    story: 'Representing Group-2 (Ages 39+), Bhumika inspired delegates nationwide by demonstrating that age brings unmatched depth, elegance, and stage command.',
    advice: 'Age is an asset of wisdom. Celebrate every milestone with pride on the national stage.',
    profileUrl: 'https://www.fsia.in/mrs-india-2025-winner-bhumika',
    videoSimDuration: 15,
    slides: [
      {
        image: 'https://www.fsia.in/static/media/Bhumika%20Songara%20-%20Mrs%20India%202025%20Winner%20(G-2).jpg',
        caption: 'Rajasthan Pride: Winning the G-2 state coronation.',
        stage: 'City Audition'
      },
      {
        image: 'https://www.fsia.in/static/media/glimp2.613cba0798f90b93bdc2.webp',
        caption: 'Runway Command: Effortless stride on the 60-foot Zee Studio ramp.',
        stage: 'Ramp Finale'
      },
      {
        image: 'https://www.fsia.in/static/media/glimp1.119142dd64fdf31b60d6.webp',
        caption: 'Crown Conferment: Gold sash presentation by national dignitaries.',
        stage: 'Coronation Speech'
      }
    ]
  },
  {
    id: 'story-4',
    winnerName: 'Tanvi Yatin Khairnar',
    title: 'Miss Teen India 2025 Winner',
    category: 'Forever Miss Teen India',
    location: 'Maharashtra',
    season: '2025',
    image: 'https://www.fsia.in/static/media/Tanvi%20Yatin%20Khairnar%20-%20Miss%20Teen%20India%202025%20Winner.jpg',
    quote: 'As a teenager, having access to national media coaching and runway mentors gave me the courage to advocate for education and youth empowerment.',
    story: 'Tanvi emerged as a youth role model across 4,000 cities, combining poise, academic dedication, and public speaking mastery to earn the Teen India national title.',
    advice: 'Start young, stay curious, and let your inner conviction be your loudest voice.',
    profileUrl: 'https://www.fsia.in/miss-teen-india-2025-winner',
    videoSimDuration: 14,
    slides: [
      {
        image: 'https://www.fsia.in/static/media/Tanvi%20Yatin%20Khairnar%20-%20Miss%20Teen%20India%202025%20Winner.jpg',
        caption: 'Youth Pioneer: The vibrant face of young India.',
        stage: 'City Audition'
      },
      {
        image: 'https://www.fsia.in/static/media/exclusive1.webp',
        caption: 'Choreography Masterclass: Perfecting runway turns and camera poise.',
        stage: 'National Camp'
      },
      {
        image: 'https://www.fsia.in/static/media/glimp7.4e94b375d70df024292d.webp',
        caption: 'Crowning Moment: Conferred the Miss Teen India national tiara.',
        stage: 'Coronation Speech'
      }
    ]
  },
  {
    id: 'story-5',
    winnerName: 'Dr Srujana Devi',
    title: 'Miss Forever Universe India 2025',
    category: 'Miss Forever Universe',
    location: 'Andhra Pradesh',
    season: '2025',
    image: 'https://www.fsia.in/static/media/Dr%20Srujana%20Devi%20-%20Miss%20Forever%20Universe%20India%202025.jpg',
    quote: 'As a medical professional, FSIA provided the bridge between science and advocacy, demonstrating that intelligence and elegance walk hand in hand.',
    story: 'Dr. Srujana captivated the jury panel with her humanitarian vision and medical advocacy, proving that modern pageantry elevates accomplished professionals to global ambassadors.',
    advice: 'Use the pageant platform to amplify your professional calling and serve society.',
    profileUrl: 'https://www.fsia.in/miss-visakhapatnam-2025-dr-srujana-devi',
    videoSimDuration: 16,
    slides: [
      {
        image: 'https://www.fsia.in/static/media/Dr%20Srujana%20Devi%20-%20Miss%20Forever%20Universe%20India%202025.jpg',
        caption: 'Doctor & Titleholder: A shining example of purposeful beauty.',
        stage: 'City Audition'
      },
      {
        image: 'https://www.fsia.in/static/media/glimp1.119142dd64fdf31b60d6.webp',
        caption: 'Global Circuit: Preparing for international Universe delegation.',
        stage: 'Ramp Finale'
      }
    ]
  },
  {
    id: 'story-6',
    winnerName: 'Saartha Sameer Gore',
    title: 'Miss Forever Universe 2025 Winner',
    category: 'Miss Forever Universe',
    location: 'Goa',
    season: '2025',
    image: 'https://www.fsia.in/static/media/Saartha%20Sameer%20Gore%20-%20Miss%20Forever%20Universe%202025%20Winner.jpg',
    quote: 'From Goa’s coastal auditions to the national spotlight, FSIA transformed my self-belief into an unstoppable force on the runway.',
    story: 'Saartha brought radiant charisma and environmental advocacy to the stage, winning high marks across all five rounds of competition.',
    advice: 'Own your narrative. No one can represent your story better than yourself.',
    profileUrl: 'https://www.fsia.in/miss-universe-2025-winner',
    videoSimDuration: 15,
    slides: [
      {
        image: 'https://www.fsia.in/static/media/Saartha%20Sameer%20Gore%20-%20Miss%20Forever%20Universe%202025%20Winner.jpg',
        caption: 'Universe Crown: Triumphant coronation on the Zee Studio set.',
        stage: 'Coronation Speech'
      }
    ]
  },
  {
    id: 'story-7',
    winnerName: 'Kavita Chawla',
    title: 'Miss India Regional Titleholder',
    category: 'Forever Miss India',
    location: 'Karnataka',
    season: '2025',
    image: '', // Intentionally missing image to showcase AI placeholder testimonial!
    hasMissingImage: true,
    quote: 'When media archives are incomplete, your work and dedication still speak with clarity. FSIA provided me with a verified digital identity and national validation.',
    story: 'Kavita advanced through the Bengaluru regional screening, establishing herself as an entrepreneur and runway talent through perseverance and community work.',
    advice: 'Never wait for external validation; build your portfolio with courage and clarity.',
    profileUrl: 'https://www.fsia.in/pageant-winner',
    videoSimDuration: 15,
    slides: []
  },
  {
    id: 'story-8',
    winnerName: 'Sunita Mehra',
    title: 'Super Woman National Awardee',
    category: 'Super Woman Award',
    location: 'Punjab',
    season: '2025',
    image: '', // Intentionally missing image to showcase AI placeholder testimonial!
    hasMissingImage: true,
    quote: 'Receiving the Super Woman trophy under Class 41 trademark was a testament that grassroot social reform deserves national celebration.',
    story: 'Sunita spearheaded rural literacy campaigns across 40 villages before being nominated and recognized by the FSIA national jury panel.',
    advice: 'Service to others is the highest form of personal achievement.',
    profileUrl: 'https://www.fsia.in/super-woman-award.php',
    videoSimDuration: 15,
    slides: []
  }
];

