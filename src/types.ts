export interface CategoryItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  slug: string;
  stats?: string;
  url?: string;
}

export interface PageantItem {
  id: string;
  name: string;
  slug: string;
  subtitle: string;
  description: string;
  eligibility: string;
  image: string;
  season: string;
  cityRounds: string;
  registrationStatus: 'Open for 2026' | 'Auditions Active' | 'Upcoming';
  features: string[];
  url?: string;
}

export interface AwardItem {
  id: string;
  name: string;
  slug: string;
  subtitle: string;
  description: string;
  image: string;
  nominationStatus: 'Nominations Open' | 'Jury Review';
  scope: 'National' | 'International' | 'Special Recognition' | 'National Honour' | 'International Honour';
  idealFor: string;
  url?: string;
}

export interface WinnerItem {
  id: string;
  name: string;
  title: string;
  year?: string;
  season?: string;
  category: string;
  location: string;
  image: string;
  url: string;
}

export interface ArticleItem {
  id: string;
  title: string;
  category: 'Pageants' | 'Awards' | 'Fashion Shows' | 'Events' | 'Success Stories' | 'FSIA Updates';
  date: string;
  excerpt: string;
  readTime: string;
  image: string;
  content: string[];
  url: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Pageants' | 'Awards' | 'Fashion Shows' | 'Winners' | 'Stage & Crowning' | 'Coronation';
  event: string;
  image: string;
  caption: string;
}

export interface TeamMember {
  name: string;
  role: string;
  designation: string;
  bio: string;
  image: string;
}

export interface SocialPlatformItem {
  id: string;
  name: string;
  profileName: string;
  iconName: 'instagram' | 'facebook' | 'youtube' | 'linkedin' | 'twitter' | 'pinterest';
  url: string;
  description: string;
  badge: string;
  thumbnail?: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  title: string;
  city: string;
  quote: string;
  image?: string;
  badge?: string;
}

export interface CelebrityItem {
  id: string;
  name: string;
  role: string;
  description: string;
  image: string;
  event: string;
}

export interface PartnerItem {
  id: string;
  name: string;
  logo: string;
  label: string;
}

