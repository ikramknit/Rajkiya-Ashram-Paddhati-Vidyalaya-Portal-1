import React from 'react';

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
  name: string;
  designation: string;
  subject: string;
}

export interface FacultyStream {
  name: string;
  subjects: string[];
}

export interface Facility {
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
}