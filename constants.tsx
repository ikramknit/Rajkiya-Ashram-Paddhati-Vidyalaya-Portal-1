import React from 'react';
import type { YearResult, StaffMember, FacultyStream, Facility, BilingualText, EventItem, NewsItem, SiteConfig } from './types';
import { BookOpen, Monitor, Home, Utensils, Activity, HeartPulse, TreePine, FlaskConical } from 'lucide-react';

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  schoolName: {
    en: "Rajkiya Ashram Paddhati Vidyalaya",
    hi: "राजकीय आश्रम पद्धति विद्यालय"
  },
  subTitle: {
    en: "Samaj Kalyan Vibhag, Uttar Pradesh",
    hi: "समाज कल्याण विभाग, उत्तर प्रदेश"
  },
  address: {
    en: "Zila Dindoli, Nagal, Saharanpur, Uttar Pradesh",
    hi: "जिला डिंडोली, नागल, सहारनपुर, उत्तर प्रदेश"
  },
  phone: "+91 123 456 7890",
  email: "contact@rapv-saharanpur.in",
  heroImages: [
    "https://picsum.photos/id/202/1920/1080",
    "https://picsum.photos/id/237/1920/1080",
    "https://picsum.photos/id/129/1920/1080"
  ],
  aboutImage: "https://picsum.photos/id/237/600/800",
  logo: ""
};

export const SCHOOL_NAME: BilingualText = DEFAULT_SITE_CONFIG.schoolName;
export const SCHOOL_NAME_SUB: BilingualText = DEFAULT_SITE_CONFIG.subTitle;
export const ADDRESS: BilingualText = DEFAULT_SITE_CONFIG.address;

export const DEPARTMENT: BilingualText = {
  en: "Samaj Kalyan Vibhag, Uttar Pradesh",
  hi: "समाज कल्याण विभाग, उत्तर प्रदेश"
};

export const INTRO_TEXT: BilingualText = {
  en: "Rajkiya Ashram Paddhati Vidyalaya, District Saharanpur, was established in 2008 and became operational in 2011. The school has a total student capacity of 490. This institution caters specifically to socially and economically weaker sections, providing free education, uniforms, housing, daily necessities, and study materials.",
  hi: "राजकीय आश्रम पद्धति विद्यालय, जिला डिंडोली, नागल, सहारनपुर का निर्माण वर्ष 2008 में प्रारम्भ हुआ तथा वर्ष 2011 में विद्यालय संचालित हुआ। विद्यालय की कुल छात्र क्षमता 490 है। यह विद्यालय केवल सामाजिक, आर्थिक दृष्टि से कमजोर व शिक्षा से वंचित, ग्रामीण और शहरी क्षेत्रों के बालकों को शिक्षा के साथ-साथ नि:शुल्क यूनिफार्म, आवास, दैनिक प्रयोग की सभी वस्तुए, अध्ययन लेखन सामग्री, गणवेश, खेलकूद व कम्प्यूटर की सुविधा उपलब्ध कराता है।"
};

export const UI_LABELS = {
  home: { en: "Home", hi: "मुख्य पृष्ठ" },
  about: { en: "About", hi: "परिचय" },
  facilities: { en: "Facilities", hi: "सुविधाएं" },
  faculty: { en: "Faculty", hi: "स्टाफ" },
  results: { en: "Results", hi: "परीक्षाफल" },
  events: { en: "Events", hi: "कार्यक्रम" },
  news: { en: "Latest News & Updates", hi: "ताजा समाचार और अपडेट" },
  readMore: { en: "Read More", hi: "और पढ़ें" },
  close: { en: "Close", hi: "बंद करें" },
  postedOn: { en: "Posted on", hi: "प्रकाशित तिथि" },
  discoverMore: { en: "Discover More", hi: "और जानें" },
  aboutUs: { en: "About Us", hi: "हमारे बारे में" },
  aboutTitle: { en: "A Legacy of Service & Education", hi: "सेवा और शिक्षा की विरासत" },
  established: { en: "Established", hi: "स्थापना" },
  capacity: { en: "Student Capacity", hi: "छात्र क्षमता" },
  infrastructure: { en: "Infrastructure", hi: "इंफ्रास्ट्रक्चर" },
  facilitiesTitle: { en: "World-Class Facilities", hi: "विश्व स्तरीय सुविधाएं" },
  facilitiesSub: { en: "We provide a nurturing environment with modern amenities to support both academic and physical growth.", hi: "हम शैक्षणिक और शारीरिक विकास का समर्थन करने के लिए आधुनिक सुविधाओं के साथ एक पोषण वातावरण प्रदान करते हैं।" },
  ourStaff: { en: "Our Dedicated Staff", hi: "हमारे समर्पित कर्मचारी" },
  academicStreams: { en: "Academic Streams", hi: "शैक्षणिक संकाय" },
  performance: { en: "Performance", hi: "प्रदर्शन" },
  academicExcellence: { en: "Academic Excellence", hi: "शैक्षणिक उत्कृष्टता" },
  passTrend: { en: "Pass Percentage Trend", hi: "उत्तीर्ण प्रतिशत रुझान" },
  class10: { en: "Class 10 Results", hi: "कक्षा 10 परिणाम" },
  class12: { en: "Class 12 Results", hi: "कक्षा 12 परिणाम" },
  total: { en: "Total", hi: "कुल" },
  passed: { en: "Passed", hi: "उत्तीर्ण" },
  rate: { en: "Rate", hi: "प्रतिशत" },
  toppers: { en: "Toppers", hi: "टॉपर्स" },
  noData: { en: "No data available", hi: "डेटा उपलब्ध नहीं है" },
  lifeAtCampus: { en: "Life at Campus", hi: "परिसर में जीवन" },
  lifeSub: { en: "A glimpse into our daily activities and special occasions", hi: "हमारी दैनिक गतिविधियों और विशेष अवसरों की एक झलक" },
  contactUs: { en: "Contact Us", hi: "संपर्क करें" },
  quickLinks: { en: "Quick Links", hi: "त्वरित लिंक" },
  rightsReserved: { en: "All rights reserved.", hi: "सर्वाधिकार सुरक्षित।" },
  govtInitiative: { en: "A government initiative dedicated to providing quality education and holistic development for students from underprivileged backgrounds.", hi: "वंचित पृष्ठभूमि के छात्रों के लिए गुणवत्तापूर्ण शिक्षा और समग्र विकास प्रदान करने के लिए समर्पित एक सरकारी पहल।" },
  name: { en: "Name", hi: "नाम" },
  designation: { en: "Designation", hi: "पदनाम" },
  subject: { en: "Subject", hi: "विषय" }
};

export const NEWS_DATA: NewsItem[] = [
  { 
    id: 1, 
    text: { en: "Admissions open for session 2024-25", hi: "सत्र 2024-25 के लिए प्रवेश प्रारंभ" }, 
    content: { 
      en: "Applications are now being accepted for the upcoming academic session.", 
      hi: "आगामी शैक्षणिक सत्र के लिए आवेदन स्वीकार किए जा रहे हैं।" 
    },
    date: "2024-03-01",
    image: "https://picsum.photos/id/20/600/400"
  }
];

export const FACILITIES_DATA: Facility[] = [
  {
    id: 1,
    title: { en: "Smart Class (Digital Education)", hi: "डिजिटल शिक्षा (स्मार्ट क्लास)" },
    description: { 
      en: "Equipped with projectors, tablet labs, and computer labs.", 
      hi: "विद्यालय में छात्रों हेतु स्मार्ट क्लास संचालित की जाती है।"
    },
    icon: <Monitor className="w-6 h-6" />,
    image: "https://picsum.photos/id/1/800/600"
  },
  // ... other facilities can be re-added if needed, currently managed by App state defaults or DB
];

export const STAFF_DATA: StaffMember[] = [
  { id: 1, name: { en: "Dr. Dinesh Kumar", hi: "डॉ. दिनेश कुमार" }, designation: { en: "Principal", hi: "प्रधानाचार्य" }, subject: { en: "History", hi: "इतिहास" } }
];

export const FACULTY_STREAMS: FacultyStream[] = [
  { 
    name: { en: "Arts Faculty", hi: "कला संकाय" }, 
    subjects: [
      { en: "Hindi", hi: "हिंदी" },
      { en: "English", hi: "अंग्रेजी" },
      { en: "Sociology", hi: "समाजशास्त्र" },
      { en: "Economics", hi: "अर्थशास्त्र" },
      { en: "History", hi: "इतिहास" },
      { en: "Physical Education", hi: "शारीरिक शिक्षा" }
    ] 
  },
  { 
    name: { en: "Science Faculty", hi: "विज्ञान संकाय" }, 
    subjects: [
      { en: "Hindi", hi: "हिंदी" },
      { en: "English", hi: "अंग्रेजी" },
      { en: "Physics", hi: "भौतिक विज्ञान" },
      { en: "Chemistry", hi: "रसायन विज्ञान" },
      { en: "Biology / Mathematics", hi: "जीव विज्ञान / गणित" },
      { en: "Physical Education", hi: "शारीरिक शिक्षा" }
    ] 
  }
];

export const EVENTS_DATA: EventItem[] = [
  { 
    id: 1,
    title: { en: "Winter Cloth Distribution", hi: "शीतकालीन वस्त्र वितरण" }, 
    desc: { en: "Distribution by Hon. District Magistrate", hi: "माननीय जिलाधिकारी द्वारा वितरण" }, 
    img: "https://picsum.photos/id/1060/400/300" 
  }
];

export const EXAM_RESULTS: YearResult[] = [
  {
    year: "2023-24",
    class10: { totalStudents: 15, passed: 8, failed: 7, passPercentage: 53.33, toppers: [{ rank: 1, name: "Nitin Kumar", percentage: "70.20" }, { rank: 2, name: "Kartik Saini", percentage: "58.80" }, { rank: 3, name: "Vinit Kumar", percentage: "51.80" }] },
    class12: { totalStudents: 4, passed: 4, failed: 0, passPercentage: 100, toppers: [{ rank: 1, name: "Shivam", percentage: "70.80" }, { rank: 2, name: "Saurabh", percentage: "69.00" }, { rank: 3, name: "Akshay Kumar", percentage: "62.40" }] }
  }
];