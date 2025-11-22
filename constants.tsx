import React from 'react';
import type { YearResult, StaffMember, FacultyStream } from './types';
import { BookOpen, Monitor, Home, Utensils, Activity, HeartPulse, TreePine, FlaskConical } from 'lucide-react';

export const SCHOOL_NAME_HINDI = "राजकीय आश्रम पद्धति विद्यालय";
export const SCHOOL_NAME_ENGLISH = "Rajkiya Ashram Paddhati Vidyalaya";
export const ADDRESS = "Zila Dindoli, Nagal, Saharanpur, Uttar Pradesh";
export const DEPARTMENT = "Samaj Kalyan Vibhag, Uttar Pradesh";

export const INTRO_TEXT = `Rajkiya Ashram Paddhati Vidyalaya, District Saharanpur, was established in 2008 and became operational in 2011. The school has a total student capacity of 490. This institution caters specifically to socially and economically weaker sections, providing free education, uniforms, housing, daily necessities, study materials, and computer facilities to students from rural and urban areas.`;

export const FACILITIES_DATA = [
  {
    title: "Smart Class (Digital Education)",
    description: "Equipped with projectors, tablet labs, and computer labs. Includes Khan Academy online education, Embibe for Science/Social Science, and English Literacy programs.",
    icon: <Monitor className="w-6 h-6" />,
    image: "https://picsum.photos/id/1/800/600"
  },
  {
    title: "Library",
    description: "A well-stocked library to foster reading habits and knowledge enhancement among students.",
    icon: <BookOpen className="w-6 h-6" />,
    image: "https://picsum.photos/id/24/800/600"
  },
  {
    title: "Laboratories",
    description: "Fully equipped Physics, Chemistry, and Biology laboratories for practical learning.",
    icon: <FlaskConical className="w-6 h-6" />,
    image: "https://picsum.photos/id/20/800/600"
  },
  {
    title: "Hostel",
    description: "A residential school with a separate hostel building for boys with a capacity of 490 students.",
    icon: <Home className="w-6 h-6" />,
    image: "https://picsum.photos/id/129/800/600"
  },
  {
    title: "Mess Facility",
    description: "Nutritious food provided according to a fixed menu. Managed by a Mess Committee ensuring hygiene and quality.",
    icon: <Utensils className="w-6 h-6" />,
    image: "https://picsum.photos/id/429/800/600"
  },
  {
    title: "Sports & Yoga",
    description: "Daily morning yoga, prayers, and regular sports activities for physical and mental well-being.",
    icon: <Activity className="w-6 h-6" />,
    image: "https://picsum.photos/id/73/800/600"
  },
  {
    title: "Health Care",
    description: "Regular health checkup camps organized by the Community Health Center.",
    icon: <HeartPulse className="w-6 h-6" />,
    image: "https://picsum.photos/id/338/800/600"
  },
  {
    title: "Environment",
    description: "Tree plantation drives and cleanliness campaigns (Swachhata Abhiyan) to maintain a green campus.",
    icon: <TreePine className="w-6 h-6" />,
    image: "https://picsum.photos/id/128/800/600"
  }
];

export const STAFF_DATA: StaffMember[] = [
  { id: 1, name: "Dr. Dinesh Kumar", designation: "Principal", subject: "History" },
  { id: 2, name: "Shri Pawan Kumar", designation: "Lecturer", subject: "Biology" },
  { id: 3, name: "Shri Sanjeev Kumar Soundarya", designation: "Lecturer", subject: "Sociology" },
  { id: 4, name: "Shri Khalid Ahmed", designation: "Lecturer", subject: "Economics" },
  { id: 5, name: "Shri Anil Kumar", designation: "Lecturer", subject: "Chemistry" },
  { id: 6, name: "Shri Ashu Kumar", designation: "Asst. Teacher", subject: "Science" },
  { id: 7, name: "Shri Hardeep Singh", designation: "Asst. Teacher", subject: "Physical Education" },
  { id: 8, name: "Smt. Priyanka Sharma", designation: "Asst. Teacher", subject: "Hindi" },
  { id: 9, name: "Smt. Karuna Rani", designation: "Asst. Teacher", subject: "Social Science" },
  { id: 10, name: "Smt. Priyanka", designation: "Asst. Teacher", subject: "English" },
  { id: 11, name: "Shri Rajnish Kumar", designation: "Asst. Teacher", subject: "Social Science" },
  { id: 12, name: "Smt. Priyanka Tyagi", designation: "Asst. Teacher", subject: "English" }
];

export const FACULTY_STREAMS: FacultyStream[] = [
  { name: "Arts Faculty", subjects: ["Hindi", "English", "Sociology", "Economics", "History", "Physical Education"] },
  { name: "Science Faculty", subjects: ["Hindi", "English", "Physics", "Chemistry", "Biology / Mathematics", "Physical Education"] }
];

export const EXAM_RESULTS: YearResult[] = [
  {
    year: "2012-13",
    class10: { totalStudents: 19, passed: 19, failed: 0, passPercentage: 100, toppers: [{ rank: 1, name: "Ashutosh Raj", percentage: "78.50" }, { rank: 2, name: "Vinit Kumar", percentage: "77.00" }, { rank: 3, name: "Vijay Kumar", percentage: "74.30" }] },
    class12: { totalStudents: 7, passed: 7, failed: 0, passPercentage: 100, toppers: [{ rank: 1, name: "Govinda", percentage: "74.33" }, { rank: 2, name: "Salim", percentage: "73.16" }, { rank: 3, name: "Sachin", percentage: "68.16" }] }
  },
  {
    year: "2013-14",
    class10: { totalStudents: 19, passed: 19, failed: 0, passPercentage: 100, toppers: [{ rank: 1, name: "Nitin Kumar", percentage: "83.67" }, { rank: 2, name: "Kuldeep Kumar", percentage: "83.67" }, { rank: 3, name: "Deepak Kumar", percentage: "82.83" }] },
    class12: { totalStudents: 0, passed: 0, failed: 0, passPercentage: 0, toppers: [] }
  },
  {
    year: "2014-15",
    class10: { totalStudents: 16, passed: 16, failed: 0, passPercentage: 100, toppers: [{ rank: 1, name: "Vibhor", percentage: "85.17" }, { rank: 2, name: "Saurabh Kumar", percentage: "82.50" }, { rank: 3, name: "Suraj", percentage: "81.00" }] },
    class12: { totalStudents: 2, passed: 2, failed: 0, passPercentage: 100, toppers: [{ rank: 1, name: "Ajeet", percentage: "69.16" }, { rank: 2, name: "Nitin Kumar", percentage: "65.00" }] }
  },
  {
    year: "2015-16",
    class10: { totalStudents: 20, passed: 20, failed: 0, passPercentage: 100, toppers: [{ rank: 1, name: "Vishal Saini", percentage: "79.33" }, { rank: 2, name: "Harish Kumar", percentage: "76.83" }, { rank: 3, name: "Ajay Kumar", percentage: "76.33" }] },
    class12: { totalStudents: 1, passed: 1, failed: 0, passPercentage: 100, toppers: [{ rank: 1, name: "Arshad", percentage: "56.70" }] }
  },
  {
    year: "2016-17",
    class10: { totalStudents: 26, passed: 25, failed: 1, passPercentage: 96.15, toppers: [{ rank: 1, name: "Ishant", percentage: "84.50" }, { rank: 2, name: "Ritik Kumar", percentage: "78.33" }, { rank: 3, name: "Joni Kumar", percentage: "75.33" }] },
    class12: { totalStudents: 12, passed: 11, failed: 1, passPercentage: 91.67, toppers: [{ rank: 1, name: "Virendra", percentage: "66.50" }, { rank: 2, name: "Vikas", percentage: "66.00" }, { rank: 3, name: "Sunil", percentage: "64.16" }] }
  },
  {
    year: "2017-18",
    class10: { totalStudents: 18, passed: 18, failed: 0, passPercentage: 100, toppers: [{ rank: 1, name: "Manish Saini", percentage: "76.00" }, { rank: 2, name: "Arjun", percentage: "75.50" }, { rank: 3, name: "Gaurav Kumar", percentage: "74.16" }] },
    class12: { totalStudents: 7, passed: 7, failed: 0, passPercentage: 100, toppers: [{ rank: 1, name: "Vishal Saini", percentage: "68.16" }, { rank: 2, name: "Arpit Kumar", percentage: "59.83" }, { rank: 3, name: "Ashu Kumar", percentage: "58.67" }] }
  },
  {
    year: "2018-19",
    class10: { totalStudents: 18, passed: 16, failed: 2, passPercentage: 88.88, toppers: [{ rank: 1, name: "Abhishek", percentage: "67.50" }, { rank: 2, name: "Rohit", percentage: "67.00" }, { rank: 3, name: "Deepanshu", percentage: "63.16" }] },
    class12: { totalStudents: 9, passed: 7, failed: 2, passPercentage: 77.77, toppers: [{ rank: 1, name: "Tanveer", percentage: "61.83" }, { rank: 2, name: "Sachin", percentage: "60.83" }, { rank: 3, name: "Arun Saini", percentage: "55.66" }] }
  },
  {
    year: "2019-20",
    class10: { totalStudents: 18, passed: 11, failed: 7, passPercentage: 61.11, toppers: [{ rank: 1, name: "Akil Chaudhary", percentage: "71.20" }, { rank: 2, name: "Ankit Kumar", percentage: "65.40" }, { rank: 3, name: "Sonu Kumar Saini", percentage: "58.20" }] },
    class12: { totalStudents: 12, passed: 8, failed: 4, passPercentage: 66.66, toppers: [{ rank: 1, name: "Junaid", percentage: "76.16" }, { rank: 2, name: "Vikas Kumar", percentage: "61.83" }, { rank: 3, name: "Ankit Saini", percentage: "52.66" }] }
  },
  {
    year: "2020-21",
    class10: { totalStudents: 15, passed: 15, failed: 0, passPercentage: 100, toppers: [{ rank: 1, name: "Sonu", percentage: "75.20" }, { rank: 2, name: "Rahul Sehgal", percentage: "52.80" }, { rank: 3, name: "Akash Kumar", percentage: "44.60" }] },
    class12: { totalStudents: 2, passed: 2, failed: 0, passPercentage: 100, toppers: [{ rank: 1, name: "Vikas Kumar", percentage: "55.67" }, { rank: 2, name: "Kunal", percentage: "50.00" }] }
  },
  {
    year: "2021-22",
    class10: { totalStudents: 24, passed: 24, failed: 0, passPercentage: 100, toppers: [{ rank: 1, name: "Akash Kumar", percentage: "75.60" }, { rank: 2, name: "Kanhaiya Lal", percentage: "63.60" }, { rank: 3, name: "Mayank Kumar Brahmgautam", percentage: "59.80" }] },
    class12: { totalStudents: 6, passed: 6, failed: 0, passPercentage: 100, toppers: [{ rank: 1, name: "Sonu Saini", percentage: "70.16" }, { rank: 2, name: "Ishant", percentage: "66.66" }, { rank: 3, name: "Shivlal", percentage: "62.16" }] }
  },
  {
    year: "2022-23",
    class10: { totalStudents: 26, passed: 21, failed: 5, passPercentage: 80.76, toppers: [{ rank: 1, name: "Vishal Sharma", percentage: "65.60" }, { rank: 2, name: "Piyush Dhiman", percentage: "62.00" }, { rank: 3, name: "Nitin Prabhat", percentage: "55.80" }] },
    class12: { totalStudents: 8, passed: 7, failed: 1, passPercentage: 87.50, toppers: [{ rank: 1, name: "Ajay", percentage: "75.83" }, { rank: 2, name: "Akash", percentage: "71.50" }, { rank: 3, name: "Sonu", percentage: "68.83" }] }
  },
  {
    year: "2023-24",
    class10: { totalStudents: 15, passed: 8, failed: 7, passPercentage: 53.33, toppers: [{ rank: 1, name: "Nitin Kumar", percentage: "70.20" }, { rank: 2, name: "Kartik Saini", percentage: "58.80" }, { rank: 3, name: "Vinit Kumar", percentage: "51.80" }] },
    class12: { totalStudents: 4, passed: 4, failed: 0, passPercentage: 100, toppers: [{ rank: 1, name: "Shivam", percentage: "70.80" }, { rank: 2, name: "Saurabh", percentage: "69.00" }, { rank: 3, name: "Akshay Kumar", percentage: "62.40" }] }
  }
];