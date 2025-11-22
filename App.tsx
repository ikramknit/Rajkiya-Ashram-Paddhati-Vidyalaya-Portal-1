import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ResultChart from './components/ResultChart';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import { 
  SCHOOL_NAME, 
  SCHOOL_NAME_SUB, 
  INTRO_TEXT, 
  FACILITIES_DATA, 
  STAFF_DATA, 
  FACULTY_STREAMS, 
  EXAM_RESULTS,
  EVENTS_DATA,
  UI_LABELS
} from './constants';
import { Users, ChevronRight, Quote } from 'lucide-react';
import type { Language, EventItem, YearResult, Facility } from './types';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  
  // App State (Lifted from constants to support CMS)
  const [events, setEvents] = useState<EventItem[]>(EVENTS_DATA);
  const [examResults, setExamResults] = useState<YearResult[]>(EXAM_RESULTS);
  
  // Image State
  const [heroImage, setHeroImage] = useState("https://picsum.photos/id/202/1920/1080");
  const [aboutImage, setAboutImage] = useState("https://picsum.photos/id/237/600/800");
  const [facilities, setFacilities] = useState<Facility[]>(FACILITIES_DATA);
  
  // View State
  const [view, setView] = useState<'public' | 'login' | 'admin'>('public');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedYear, setSelectedYear] = useState(examResults[examResults.length - 1].year);

  // Handlers
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setView('admin');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setView('public');
  };

  // Derived Data
  const currentResult = examResults.find(r => r.year === selectedYear) || examResults[examResults.length - 1];

  // Routing
  if (view === 'login') {
    return <Login onLogin={handleLoginSuccess} onCancel={() => setView('public')} />;
  }

  if (view === 'admin' && isAuthenticated) {
    return (
      <AdminDashboard 
        events={events} 
        setEvents={setEvents}
        examResults={examResults}
        setExamResults={setExamResults}
        facilities={facilities}
        setFacilities={setFacilities}
        heroImage={heroImage}
        setHeroImage={setHeroImage}
        aboutImage={aboutImage}
        setAboutImage={setAboutImage}
        onLogout={handleLogout} 
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        lang={lang} 
        setLang={setLang} 
        onLoginClick={() => setView('login')} 
      />

      {/* Hero Section */}
      <div id="home" className="relative bg-gray-900 text-white">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="School Building" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/90"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-48 flex flex-col items-center text-center">
          <h2 className="text-orange-400 font-semibold tracking-wider uppercase text-sm md:text-base mb-4 animate-fade-in-up">
            {SCHOOL_NAME_SUB[lang]}
          </h2>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 font-serif leading-tight animate-fade-in-up delay-100">
            {lang === 'en' ? SCHOOL_NAME.hi : SCHOOL_NAME.en} <br />
            <span className="text-2xl md:text-4xl lg:text-5xl mt-2 block text-gray-200 font-sans">
              {SCHOOL_NAME[lang]}
            </span>
          </h1>
          <p className="max-w-2xl text-lg text-gray-300 mb-8 animate-fade-in-up delay-200">
            {UI_LABELS.govtInitiative[lang]}
          </p>
          <a href="#about" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-orange-500/30 animate-fade-in-up delay-300">
            {UI_LABELS.discoverMore[lang]}
          </a>
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-1 w-12 bg-orange-600 rounded"></div>
                <span className="text-orange-600 font-semibold uppercase text-sm">{UI_LABELS.aboutUs[lang]}</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{UI_LABELS.aboutTitle[lang]}</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6 text-justify">
                {INTRO_TEXT[lang]}
              </p>
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                  <h4 className="font-bold text-3xl text-orange-700 mb-1">2008</h4>
                  <p className="text-sm text-gray-600">{UI_LABELS.established[lang]}</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-bold text-3xl text-blue-700 mb-1">490</h4>
                  <p className="text-sm text-gray-600">{UI_LABELS.capacity[lang]}</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src={aboutImage} 
                alt="Students" 
                className="rounded-2xl shadow-2xl w-full h-[500px] object-cover z-10 relative"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl z-20 max-w-xs hidden md:block">
                <Quote className="h-8 w-8 text-orange-500 mb-2" />
                <p className="text-gray-800 font-medium italic">"Education is the most powerful weapon which you can use to change the world."</p>
              </div>
              <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-orange-100 rounded-full -z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section id="facilities" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-orange-600 font-semibold uppercase text-sm tracking-wider">{UI_LABELS.infrastructure[lang]}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">{UI_LABELS.facilitiesTitle[lang]}</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              {UI_LABELS.facilitiesSub[lang]}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {facilities.map((facility, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={facility.image} 
                    alt={facility.title[lang]} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <div className="p-2 bg-orange-100 text-orange-600 rounded-lg mr-3">
                      {facility.icon}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">{facility.title[lang]}</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {facility.description[lang]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty Section */}
      <section id="faculty" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Staff List */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                <Users className="mr-3 text-orange-600" /> {UI_LABELS.ourStaff[lang]}
              </h2>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{UI_LABELS.name[lang]}</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{UI_LABELS.designation[lang]}</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{UI_LABELS.subject[lang]}</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {STAFF_DATA.map((staff) => (
                      <tr key={staff.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{staff.name[lang]}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{staff.designation[lang]}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-orange-600 font-medium">{staff.subject[lang]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Faculties Info */}
            <div className="bg-slate-800 text-white rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold mb-6 border-b border-slate-700 pb-4">{UI_LABELS.academicStreams[lang]}</h3>
              <div className="space-y-8">
                {FACULTY_STREAMS.map((stream, idx) => (
                  <div key={idx}>
                    <h4 className="text-lg font-semibold text-orange-400 mb-3">{stream.name[lang]}</h4>
                    <ul className="space-y-2">
                      {stream.subjects.map((sub, i) => (
                        <li key={i} className="flex items-center text-slate-300 text-sm">
                          <ChevronRight className="h-4 w-4 text-slate-500 mr-2" />
                          {sub[lang]}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section id="results" className="py-20 bg-orange-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
             <span className="text-orange-600 font-semibold uppercase text-sm tracking-wider">{UI_LABELS.performance[lang]}</span>
             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">{UI_LABELS.academicExcellence[lang]}</h2>
          </div>
          
          {/* Chart */}
          <div className="mb-12">
            <ResultChart lang={lang} results={examResults} />
          </div>

          {/* Year Selector */}
          <div className="flex overflow-x-auto pb-4 mb-8 gap-2 scrollbar-hide">
            {examResults.map((res) => (
              <button
                key={res.year}
                onClick={() => setSelectedYear(res.year)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedYear === res.year
                    ? 'bg-orange-600 text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {res.year}
              </button>
            ))}
          </div>

          {/* Detailed Results Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Class 10 */}
            <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-orange-500">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">{UI_LABELS.class10[lang]}</h3>
                <span className="bg-orange-100 text-orange-800 text-xs px-3 py-1 rounded-full font-bold">{selectedYear}</span>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-gray-800">{currentResult.class10.totalStudents}</div>
                  <div className="text-xs text-gray-500 uppercase">{UI_LABELS.total[lang]}</div>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{currentResult.class10.passed}</div>
                  <div className="text-xs text-green-600 uppercase">{UI_LABELS.passed[lang]}</div>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{currentResult.class10.passPercentage === 'NA' ? 'N/A' : `${currentResult.class10.passPercentage}%`}</div>
                  <div className="text-xs text-blue-600 uppercase">{UI_LABELS.rate[lang]}</div>
                </div>
              </div>

              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">{UI_LABELS.toppers[lang]}</h4>
              <div className="space-y-3">
                {currentResult.class10.toppers.length > 0 ? (
                  currentResult.class10.toppers.map((topper, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <div className="flex items-center">
                        <div className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold mr-3 ${i===0 ? 'bg-yellow-100 text-yellow-700' : i===1 ? 'bg-gray-200 text-gray-700' : 'bg-orange-100 text-orange-700'}`}>
                          {topper.rank}
                        </div>
                        <span className="font-medium text-gray-800">{topper.name}</span>
                      </div>
                      <span className="font-bold text-orange-600">{topper.percentage}%</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-center text-sm italic">{UI_LABELS.noData[lang]}</p>
                )}
              </div>
            </div>

            {/* Class 12 */}
            <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-green-600">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">{UI_LABELS.class12[lang]}</h3>
                <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-bold">{selectedYear}</span>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-gray-800">{currentResult.class12.totalStudents}</div>
                  <div className="text-xs text-gray-500 uppercase">{UI_LABELS.total[lang]}</div>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{currentResult.class12.passed}</div>
                  <div className="text-xs text-green-600 uppercase">{UI_LABELS.passed[lang]}</div>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{currentResult.class12.passPercentage === 'NA' ? 'N/A' : `${currentResult.class12.passPercentage}%`}</div>
                  <div className="text-xs text-blue-600 uppercase">{UI_LABELS.rate[lang]}</div>
                </div>
              </div>

              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">{UI_LABELS.toppers[lang]}</h4>
              <div className="space-y-3">
                {currentResult.class12.toppers.length > 0 ? (
                  currentResult.class12.toppers.map((topper, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <div className="flex items-center">
                        <div className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold mr-3 ${i===0 ? 'bg-yellow-100 text-yellow-700' : i===1 ? 'bg-gray-200 text-gray-700' : 'bg-orange-100 text-orange-700'}`}>
                          {topper.rank}
                        </div>
                        <span className="font-medium text-gray-800">{topper.name}</span>
                      </div>
                      <span className="font-bold text-green-600">{topper.percentage}%</span>
                    </div>
                  ))
                ) : (
                   <p className="text-gray-400 text-center text-sm italic">{UI_LABELS.noData[lang]}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Ticker/Grid Section */}
      <section id="events" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">{UI_LABELS.lifeAtCampus[lang]}</h2>
            <p className="text-gray-500 mt-2">{UI_LABELS.lifeSub[lang]}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, i) => (
               <div key={i} className="group relative overflow-hidden rounded-xl cursor-pointer">
                 <img src={event.img} alt={event.title[lang]} className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110" />
                 <div className="absolute inset-0 bg-black bg-opacity-40 hover:bg-opacity-30 transition-opacity flex flex-col justify-end p-6 text-white">
                   <h3 className="font-bold text-xl">{event.title[lang]}</h3>
                   <p className="text-sm text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">{event.desc[lang]}</p>
                 </div>
               </div>
            ))}
          </div>
        </div>
      </section>

      <Footer lang={lang} onAdminClick={() => setView('login')} />
    </div>
  );
};

export default App;