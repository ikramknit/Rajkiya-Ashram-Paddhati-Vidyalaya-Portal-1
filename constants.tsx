import React from 'react';
import type { YearResult, StaffMember, FacultyStream, Facility, BilingualText, EventItem, NewsItem } from './types';
import { BookOpen, Monitor, Home, Utensils, Activity, HeartPulse, TreePine, FlaskConical } from 'lucide-react';

export const SCHOOL_NAME: BilingualText = {
  en: "Rajkiya Ashram Paddhati Vidyalaya",
  hi: "राजकीय आश्रम पद्धति विद्यालय"
};

export const SCHOOL_NAME_SUB: BilingualText = {
  en: "Samaj Kalyan Vibhag, Uttar Pradesh",
  hi: "समाज कल्याण विभाग, उत्तर प्रदेश"
};

export const ADDRESS: BilingualText = {
  en: "Zila Dindoli, Nagal, Saharanpur, Uttar Pradesh",
  hi: "जिला डिंडोली, नागल, सहारनपुर, उत्तर प्रदेश"
};

export const DEPARTMENT: BilingualText = {
  en: "Samaj Kalyan Vibhag, Uttar Pradesh",
  hi: "समाज कल्याण विभाग, उत्तर प्रदेश"
};

export const INTRO_TEXT: BilingualText = {
  en: "Rajkiya Ashram Paddhati Vidyalaya, District Saharanpur, was established in 2008 and became operational in 2011. The school has a total student capacity of 490. This institution caters specifically to socially and economically weaker sections, providing free education, uniforms, housing, daily necessities, study materials, and computer facilities to students from rural and urban areas.",
  hi: "राजकीय आश्रम पद्धति विद्यालय, जिला डिंडोली, नागल, सहारनपुर का निर्माण वर्ष 2008 में प्रारम्भ हुआ तथा वर्ष 2011 में विद्यालय संचालित हुआ। विद्यालय की कुल छात्र क्षमता 490 है। यह विद्यालय केवल सामाजिक, आर्थिक दृष्टि से कमजोर व शिक्षा से वंचित, ग्रामीण और शहरी क्षेत्रों के बालकों को शिक्षा के साथ-साथ नि:शुल्क यूनिफार्म, आवास, दैनिक प्रयोग की सभी वस्तुए, अध्ययन लेखन सामग्री, गणवेश, खेलकूद व कम्प्यूटर की सुविधा उपलब्ध कराता है।"
};

export const UI_LABELS = {
  home: { en: "Home", hi: "मुख्य पृष्ठ" },
  about: { en: "About", hi: "परिचय" },
  facilities: { en: "Facilities", hi: "सुविधाएं" },
  faculty: { en: "Faculty", hi: "स्टाफ" },
  results: { en: "Results", hi: "परीक्षाफल" },
  events: { en: "Events", hi: "कार्यक्रम" },
  news: { en: "Latest News", hi: "ताजा खबर" },
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
  { id: 1, text: { en: "Admissions open for session 2024-25", hi: "सत्र 2024-25 के लिए प्रवेश प्रारंभ" }, date: "2024-03-01" },
  { id: 2, text: { en: "Annual Sports Meet scheduled for next week", hi: "वार्षिक खेल प्रतियोगिता अगले सप्ताह निर्धारित" }, date: "2024-03-10" },
  { id: 3, text: { en: "Board Exam Results Declared", hi: "बोर्ड परीक्षा परिणाम घोषित" }, date: "2024-04-20" }
];

export const FACILITIES_DATA: Facility[] = [
  {
    title: { en: "Smart Class (Digital Education)", hi: "डिजिटल शिक्षा (स्मार्ट क्लास)" },
    description: { 
      en: "Equipped with projectors, tablet labs, and computer labs. Includes Khan Academy online education, Embibe for Science/Social Science, and English Literacy programs.", 
      hi: "विद्यालय में छात्रों हेतु स्मार्ट क्लास संचालित की जाती है। डिजिटल शिक्षा के अंतर्गत छात्रों को प्रोजेक्टर, टैब लैब एवं कंप्यूटर लैब में आधुनिक शिक्षा प्रदान की जाती है।"
    },
    icon: <Monitor className="w-6 h-6" />,
    image: "https://picsum.photos/id/1/800/600"
  },
  {
    title: { en: "Library", hi: "पुस्तकालय" },
    description: { 
      en: "A well-stocked library to foster reading habits and knowledge enhancement among students.", 
      hi: "छात्रों में किताबें पढने की आदत को विकसित करने एवं ज्ञानवर्धन के लिए पुस्तकालय की व्यवस्था है।"
    },
    icon: <BookOpen className="w-6 h-6" />,
    image: "https://picsum.photos/id/24/800/600"
  },
  {
    title: { en: "Laboratories", hi: "प्रयोगशाला" },
    description: { 
      en: "Fully equipped Physics, Chemistry, and Biology laboratories for practical learning.", 
      hi: "विद्यालय में जीव विज्ञान, भौतिक विज्ञान, रसायन विज्ञान प्रयोगशाला की व्यवस्था है।"
    },
    icon: <FlaskConical className="w-6 h-6" />,
    image: "https://picsum.photos/id/20/800/600"
  },
  {
    title: { en: "Hostel", hi: "आवासीय व्यवस्था" },
    description: { 
      en: "A residential school with a separate hostel building for boys with a capacity of 490 students.", 
      hi: "विद्यालय का स्वरूप आवासीय होने के कारण विद्यालय में निर्मित छात्रावास पृथक रूप से बालकों के लिए उपलब्ध है। कुल क्षमता 490 हैं।"
    },
    icon: <Home className="w-6 h-6" />,
    image: "https://picsum.photos/id/129/800/600"
  },
  {
    title: { en: "Mess Facility", hi: "मेस व्यवस्था" },
    description: { 
      en: "Nutritious food provided according to a fixed menu. Managed by a Mess Committee ensuring hygiene and quality.", 
      hi: "विद्यालय में निर्धारित मेन्यू के अनुसार सुव्यवस्थित मेस व्यवस्था सुनिश्चित है। शुद्ध एवं पौष्टिक भोजन की व्यवस्था की जाती है।"
    },
    icon: <Utensils className="w-6 h-6" />,
    image: "https://picsum.photos/id/429/800/600"
  },
  {
    title: { en: "Sports & Yoga", hi: "खेल एवं योग" },
    description: { 
      en: "Daily morning yoga, prayers, and regular sports activities for physical and mental well-being.", 
      hi: "विद्यालय के प्रात: कालीन योगा एवं प्रार्थना स्थल पर प्रतिदिन प्रार्थना, कविता, कहानी एवं पी०टी० कराई जाती है। खेलों का आयोजन भी होता है।"
    },
    icon: <Activity className="w-6 h-6" />,
    image: "https://picsum.photos/id/73/800/600"
  },
  {
    title: { en: "Health Care", hi: "स्वास्थ्य परीक्षण" },
    description: { 
      en: "Regular health checkup camps organized by the Community Health Center.", 
      hi: "विद्यालय में सामुदायिक स्वास्थ्य केंद्र द्वारा छात्रों के स्वास्थ्य परीक्षण हेतु समय समय पर शिविर लगाया जाता है।"
    },
    icon: <HeartPulse className="w-6 h-6" />,
    image: "https://picsum.photos/id/338/800/600"
  },
  {
    title: { en: "Environment", hi: "पर्यावरण" },
    description: { 
      en: "Tree plantation drives and cleanliness campaigns (Swachhata Abhiyan) to maintain a green campus.", 
      hi: "विद्यालय में पर्यावरण को शुद्ध रखने के लिए वृक्षारोपण एवं स्वच्छता अभियान किया जाता है।"
    },
    icon: <TreePine className="w-6 h-6" />,
    image: "https://picsum.photos/id/128/800/600"
  }
];

export const STAFF_DATA: StaffMember[] = [
  { id: 1, name: { en: "Dr. Dinesh Kumar", hi: "डॉ. दिनेश कुमार" }, designation: { en: "Principal", hi: "प्रधानाचार्य" }, subject: { en: "History", hi: "इतिहास" } },
  { id: 2, name: { en: "Shri Pawan Kumar", hi: "श्री पवन कुमार" }, designation: { en: "Lecturer", hi: "प्रवक्ता" }, subject: { en: "Biology", hi: "जीव विज्ञान" } },
  { id: 3, name: { en: "Shri Sanjeev Kumar Soundarya", hi: "श्री संजीव कुमार सौंदर्य" }, designation: { en: "Lecturer", hi: "प्रवक्ता" }, subject: { en: "Sociology", hi: "समाजशास्त्र" } },
  { id: 4, name: { en: "Shri Khalid Ahmed", hi: "श्री खालिद अहमद" }, designation: { en: "Lecturer", hi: "प्रवक्ता" }, subject: { en: "Economics", hi: "अर्थशास्त्र" } },
  { id: 5, name: { en: "Shri Anil Kumar", hi: "श्री अनिल कुमार" }, designation: { en: "Lecturer", hi: "प्रवक्ता" }, subject: { en: "Chemistry", hi: "रसायन विज्ञान" } },
  { id: 6, name: { en: "Shri Ashu Kumar", hi: "श्री आशु कुमार" }, designation: { en: "Asst. Teacher", hi: "सहायक अध्यापक" }, subject: { en: "Science", hi: "विज्ञान" } },
  { id: 7, name: { en: "Shri Hardeep Singh", hi: "श्री हरदीप सिंह" }, designation: { en: "Asst. Teacher", hi: "सहायक अध्यापक" }, subject: { en: "Physical Education", hi: "व्यायाम शिक्षक" } },
  { id: 8, name: { en: "Smt. Priyanka Sharma", hi: "श्रीमती प्रियंका शर्मा" }, designation: { en: "Asst. Teacher", hi: "सहायक अध्यापक" }, subject: { en: "Hindi", hi: "हिंदी" } },
  { id: 9, name: { en: "Smt. Karuna Rani", hi: "श्रीमती करुणा रानी" }, designation: { en: "Asst. Teacher", hi: "सहायक अध्यापक" }, subject: { en: "Social Science", hi: "सामाजिक विज्ञान" } },
  { id: 10, name: { en: "Smt. Priyanka", hi: "श्रीमती प्रियंका" }, designation: { en: "Asst. Teacher", hi: "सहायक अध्यापक" }, subject: { en: "English", hi: "अंग्रेजी" } },
  { id: 11, name: { en: "Shri Rajnish Kumar", hi: "श्री रजनीश कुमार" }, designation: { en: "Asst. Teacher", hi: "सहायक अध्यापक" }, subject: { en: "Social Science", hi: "सामाजिक विज्ञान" } },
  { id: 12, name: { en: "Smt. Priyanka Tyagi", hi: "श्रीमती प्रियंका त्यागी" }, designation: { en: "Asst. Teacher", hi: "सहायक अध्यापक" }, subject: { en: "English", hi: "अंग्रेजी" } }
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
    title: { en: "Winter Cloth Distribution", hi: "शीतकालीन वस्त्र वितरण" }, 
    desc: { en: "Distribution by Hon. District Magistrate", hi: "माननीय जिलाधिकारी द्वारा वितरण" }, 
    img: "https://picsum.photos/id/1060/400/300" 
  },
  { 
    title: { en: "Welcome Ceremony", hi: "स्वागत समारोह" }, 
    desc: { en: "Welcoming newly admitted students", hi: "नवप्रवेशित छात्रों का स्वागत" }, 
    img: "https://picsum.photos/id/1059/400/300" 
  },
  { 
    title: { en: "Scouts & Guides", hi: "स्काउट (Scout)" }, 
    desc: { en: "Leadership and discipline training", hi: "नेतृत्व और अनुशासन प्रशिक्षण" }, 
    img: "https://picsum.photos/id/103/400/300" 
  },
  { 
    title: { en: "Tree Plantation", hi: "वृक्षारोपण" }, 
    desc: { en: "Keeping the environment clean and green", hi: "पर्यावरण को स्वच्छ और हरा-भरा रखना" }, 
    img: "https://picsum.photos/id/1047/400/300" 
  },
  { 
    title: { en: "Cleanliness Drive", hi: "स्वच्छता अभियान" }, 
    desc: { en: "Shramdaan and Swachhata Abhiyan", hi: "श्रमदान और स्वच्छता अभियान" }, 
    img: "https://picsum.photos/id/1080/400/300" 
  },
  { 
    title: { en: "Cultural Programs", hi: "सांस्कृतिक कार्यक्रम" }, 
    desc: { en: "Celebrating Jayantis and National Festivals", hi: "जयंती और राष्ट्रीय त्योहारों का उत्सव" }, 
    img: "https://picsum.photos/id/1015/400/300" 
  },
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