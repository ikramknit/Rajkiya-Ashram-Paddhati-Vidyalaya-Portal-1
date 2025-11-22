import React from 'react';

export type Language = 'en' | 'hi';

export interface BilingualText {
  en: string;
  hi: string;
}

export interface SiteConfig {
  schoolName: BilingualText;
  subTitle: BilingualText;
  address: BilingualText;
  phone: string;
  email: string;
  heroImages: string[];
  aboutImage: string;
  logo?: string;
}

export interface NewsItem {
  id: number;
  text: BilingualText; // Headline
  content?: BilingualText; // Detailed Description
  image?: string; // Optional Image URL
  date: string;
  link?: string;
}

export interface Topper {
  rank: number;
  name: string;
  percentage: string;
}

export interface ClassResult {
  totalStudents: number;
  passed: number;
  failed: number; // or compartment
  passPercentage: number | string;
  toppers: Topper[];
}

export interface YearResult {
  year: string;
  class10: ClassResult;
  class12: ClassResult;
}

export interface StaffMember {
  id: number;
  name: BilingualText;
  designation: BilingualText;
  subject: BilingualText;
  photo?: string; // URL to staff photo
}

export interface FacultyStream {
  name: BilingualText;
  subjects: BilingualText[];
}

export interface Facility {
  id?: number; // Added optional ID for DB sync
  title: BilingualText;
  description: BilingualText;
  icon: React.ReactNode;
  image: string;
}

export interface EventItem {
  id?: number; // Added optional ID for DB sync
  title: BilingualText;
  desc: BilingualText;
  img: string;
}