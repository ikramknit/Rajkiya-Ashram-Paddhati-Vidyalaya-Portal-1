import React from 'react';

export type Language = 'en' | 'hi';

export interface BilingualText {
  en: string;
  hi: string;
}

export interface NewsItem {
  id: number;
  text: BilingualText;
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
}

export interface FacultyStream {
  name: BilingualText;
  subjects: BilingualText[];
}

export interface Facility {
  title: BilingualText;
  description: BilingualText;
  icon: React.ReactNode;
  image: string;
}

export interface EventItem {
  title: BilingualText;
  desc: BilingualText;
  img: string;
}