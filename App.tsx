import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ResultChart from './components/ResultChart';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import NewsSection from './components/NewsSection';
import HeroSection from './components/HeroSection';
import { 
  DEFAULT_SITE_CONFIG,
  INTRO_TEXT, 
  FACULTY_STREAMS, 
  UI_LABELS,
  FACILITIES_DATA as DEFAULT_FACILITIES // Keep as fallback structure only
} from './constants';
import { Users, ChevronRight, Quote, UserCircle2, Loader } from 'lucide-react';
import type { Language, EventItem, YearResult, Facility, StaffMember, NewsItem, SiteConfig } from './types';
import { supabase, isSupabaseConfigured } from './supabaseClient';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [isLoading, setIsLoading] = useState(true);
  
  // App State - Initialized as empty to avoid showing local placeholders
  const [events, setEvents] = useState<EventItem[]>([]);
  const [examResults, setExamResults] = useState<YearResult[]>([]);
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  
  // Settings State
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(DEFAULT_SITE_CONFIG);
  
  // View State
  const [view, setView] = useState<'public' | 'login' | 'admin'>('public');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedYear, setSelectedYear] = useState("2023-24");

  // Fetch Data from Supabase
  useEffect(() => {
    const fetchData = async () => {
      if (!isSupabaseConfigured()) {
        setIsLoading(false);
        return;
      }

      try {
        // 1. Fetch Settings
        const { data: settingsData } = await supabase.from('jola_settings').select('*');
        if (settingsData) {
          const newConfig = { ...DEFAULT_SITE_CONFIG };
          settingsData.forEach(item => {
            if (item.key === 'school_name_en') newConfig.schoolName.en = item.value;
            if (item.key === 'school_name_hi') newConfig.schoolName.hi = item.value;
            if (item.key === 'school_sub_en') newConfig.subTitle.en = item.value;
            if (item.key === 'school_sub_hi') newConfig.subTitle.hi = item.value;
            if (item.key === 'address_en') newConfig.address.en = item.value;
            if (item.key === 'address_hi') newConfig.address.hi = item.value;
            if (item.key === 'phone') newConfig.phone = item.value;
            if (item.key === 'email') newConfig.email = item.value;
            if (item.key === 'about_image') newConfig.aboutImage = item.value;
            if (item.key === 'logo') newConfig.logo = item.value;
            if (item.key === 'hero_images') {
              try {
                newConfig.heroImages = JSON.parse(item.value);
              } catch (e) {
                console.error("Error parsing hero images", e);
              }
            }
          });
          setSiteConfig(newConfig);
        }

        // 2. Fetch Events
        const { data: eventsData } = await supabase.from('jola_events').select('*').order('created_at', { ascending: false });
        if (eventsData) {
          setEvents(eventsData.map((e: any) => ({
            id: e.id,
            title: { en: e.title_en, hi: e.title_hi },
            desc: { en: e.desc_en, hi: e.desc_hi },
            img: e.img
          })));
        }

        // 3. Fetch Staff
        const { data: staffData } = await supabase.from('jola_staff').select('*').order('id', { ascending: true });
        if (staffData) {
          setStaff(staffData.map((s: any) => ({
            id: s.id,
            name: { en: s.name_en, hi: s.name_hi },
            designation: { en: s.designation_en, hi: s.designation_hi },
            subject: { en: s.subject_en, hi: s.subject_hi },
            photo: s.photo
          })));
        }

        // 4. Fetch News
        const { data: newsData } = await supabase.from('jola_news').select('*').order('date', { ascending: false });
        if (newsData) {
          setNews(newsData.map((n: any) => ({
            id: n.id,
            text: { en: n.text_en, hi: n.text_hi },
            content: { en: n.content_en, hi: n.content_hi },
            image: n.image,
            date: n.date,
            link: n.link
          })));
        }
        
        // 5. Fetch Results
        const { data: resultsData } = await supabase.from('jola_results').select('*').order('year', { ascending: true });
        if (resultsData && resultsData.length > 0) {
          setExamResults(resultsData.map((r: any) => ({
            year: r.year,
            class10: r.class10,
            class12: r.class12
          })));
          setSelectedYear(resultsData[resultsData.length - 1].year);
        }

        // 6. Fetch Facilities
        const { data: facilitiesData } = await supabase.from('jola_facilities').select('*');
        if (facilitiesData) {
           const mergedFacilities = facilitiesData.map((f: any, index: number) => ({
             id: f.id,
             title: { en: f.title_en, hi: f.title_hi },
             description: { en: f.description_en, hi: f.description_hi },
             image: f.image,
             // Fallback to default icons cyclically
             icon: DEFAULT_FACILITIES[index % DEFAULT_FACILITIES.length]?.icon || DEFAULT_FACILITIES[0].icon
           }));
           setFacilities(mergedFacilities);
        }
      } catch (error) {
        console.error("Error fetching data from Supabase:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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

  // Routing & Loading Views
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-orange-600">
        <Loader className="w-12 h-12 animate-spin mb-4" />
        <h2 className="text-xl font-semibold animate-pulse">Loading School Portal...</h2>
        <p className="text-sm text-gray-400 mt-2">Fetching data from server</p>
      </div>
    );
  }

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
        staff={staff}
        setStaff={setStaff}
        news={news}
        setNews={setNews}
        siteConfig={siteConfig}
        setSiteConfig={setSiteConfig}
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
        config={siteConfig}
      />

      {/* Hero Section */}
      <HeroSection lang={lang} config={siteConfig} />

      {/* News Section (Below Hero) */}
      {news.length > 0 && <NewsSection lang={lang} news={news} />}

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
                src={siteConfig.aboutImage} 
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
      {facilities.length > 0 && (
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
      )}

      {/* Faculty Section */}
      {staff.length > 0 && (
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
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Photo</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{UI_LABELS.name[lang]}</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{UI_LABELS.designation[lang]}</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{UI_LABELS.subject[lang]}</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {staff.map((member) => (
                        <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            {member.photo ? (
                              <img src={member.photo} alt={member.name[lang]} className="h-10 w-10 rounded-full object-cover border border-gray-200" />
                            ) : (
                              <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 border border-orange-200">
                                <UserCircle2 className="w-6 h-6" />
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{member.name[lang]}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{member.designation[lang]}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-orange-600 font-medium">{member.subject[lang]}</td>
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
      )}

      {/* Results Section */}
      {examResults.length > 0 && (
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
            {currentResult && (
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
            )}
          </div>
        </section>
      )}

      {/* Events Ticker/Grid Section */}
      {events.length > 0 && (
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
      )}

      <Footer lang={lang} onAdminClick={() => setView('login')} config={siteConfig} />
    </div>
  );
};

export default App;