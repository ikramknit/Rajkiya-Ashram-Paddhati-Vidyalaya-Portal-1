import React, { useState } from 'react';
import { LogOut, Plus, Trash2, Calendar, BarChart, Save, Image as ImageIcon, Users, Bell } from 'lucide-react';
import type { EventItem, YearResult, Facility, StaffMember, NewsItem } from '../types';

interface AdminDashboardProps {
  events: EventItem[];
  setEvents: React.Dispatch<React.SetStateAction<EventItem[]>>;
  examResults: YearResult[];
  setExamResults: React.Dispatch<React.SetStateAction<YearResult[]>>;
  facilities: Facility[];
  setFacilities: React.Dispatch<React.SetStateAction<Facility[]>>;
  staff: StaffMember[];
  setStaff: React.Dispatch<React.SetStateAction<StaffMember[]>>;
  news: NewsItem[];
  setNews: React.Dispatch<React.SetStateAction<NewsItem[]>>;
  heroImage: string;
  setHeroImage: (url: string) => void;
  aboutImage: string;
  setAboutImage: (url: string) => void;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({
  events,
  setEvents,
  examResults,
  setExamResults,
  facilities,
  setFacilities,
  staff,
  setStaff,
  news,
  setNews,
  heroImage,
  setHeroImage,
  aboutImage,
  setAboutImage,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<'events' | 'results' | 'media' | 'staff' | 'news'>('events');

  // Event Form State
  const [newEvent, setNewEvent] = useState({
    titleEn: '',
    titleHi: '',
    descEn: '',
    descHi: '',
    img: ''
  });

  // Result Form State
  const [newResult, setNewResult] = useState({
    year: '',
    class10Total: '',
    class10Pass: '',
    class10Percent: '',
    class12Total: '',
    class12Pass: '',
    class12Percent: ''
  });

  // Staff Form State
  const [newStaff, setNewStaff] = useState({
    nameEn: '', nameHi: '',
    designationEn: '', designationHi: '',
    subjectEn: '', subjectHi: ''
  });

  // News Form State
  const [newNews, setNewNews] = useState({
    textEn: '', textHi: '',
    date: ''
  });

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const event: EventItem = {
      title: { en: newEvent.titleEn, hi: newEvent.titleHi },
      desc: { en: newEvent.descEn, hi: newEvent.descHi },
      img: newEvent.img || 'https://picsum.photos/400/300'
    };
    setEvents([...events, event]);
    setNewEvent({ titleEn: '', titleHi: '', descEn: '', descHi: '', img: '' });
  };

  const handleDeleteEvent = (index: number) => {
    setEvents(events.filter((_, i) => i !== index));
  };

  const handleAddResult = (e: React.FormEvent) => {
    e.preventDefault();
    const result: YearResult = {
      year: newResult.year,
      class10: {
        totalStudents: Number(newResult.class10Total),
        passed: Number(newResult.class10Pass),
        failed: Number(newResult.class10Total) - Number(newResult.class10Pass),
        passPercentage: newResult.class10Percent,
        toppers: []
      },
      class12: {
        totalStudents: Number(newResult.class12Total),
        passed: Number(newResult.class12Pass),
        failed: Number(newResult.class12Total) - Number(newResult.class12Pass),
        passPercentage: newResult.class12Percent,
        toppers: []
      }
    };
    setExamResults([...examResults, result].sort((a, b) => a.year.localeCompare(b.year)));
    setNewResult({ year: '', class10Total: '', class10Pass: '', class10Percent: '', class12Total: '', class12Pass: '', class12Percent: '' });
  };

  const handleDeleteResult = (year: string) => {
    setExamResults(examResults.filter(r => r.year !== year));
  };

  const handleFacilityImageChange = (index: number, newUrl: string) => {
    const updatedFacilities = [...facilities];
    updatedFacilities[index] = { ...updatedFacilities[index], image: newUrl };
    setFacilities(updatedFacilities);
  };

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    const member: StaffMember = {
      id: Date.now(),
      name: { en: newStaff.nameEn, hi: newStaff.nameHi },
      designation: { en: newStaff.designationEn, hi: newStaff.designationHi },
      subject: { en: newStaff.subjectEn, hi: newStaff.subjectHi }
    };
    setStaff([...staff, member]);
    setNewStaff({ nameEn: '', nameHi: '', designationEn: '', designationHi: '', subjectEn: '', subjectHi: '' });
  };

  const handleDeleteStaff = (id: number) => {
    setStaff(staff.filter(s => s.id !== id));
  };

  const handleAddNews = (e: React.FormEvent) => {
    e.preventDefault();
    const item: NewsItem = {
      id: Date.now(),
      text: { en: newNews.textEn, hi: newNews.textHi },
      date: newNews.date
    };
    setNews([...news, item]);
    setNewNews({ textEn: '', textHi: '', date: '' });
  };

  const handleDeleteNews = (id: number) => {
    setNews(news.filter(n => n.id !== id));
  };

  const TabButton = ({ id, label, icon: Icon }: { id: string, label: string, icon: any }) => (
    <button
      onClick={() => setActiveTab(id as any)}
      className={`pb-4 px-4 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
        activeTab === id
          ? 'border-orange-500 text-orange-600'
          : 'border-transparent text-gray-500 hover:text-gray-700'
      }`}
    >
      <div className="flex items-center">
        <Icon className="w-4 h-4 mr-2" /> {label}
      </div>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">CMS Dashboard</h1>
            <p className="text-sm text-gray-500">Welcome, Administrator</p>
          </div>
          <button
            onClick={onLogout}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex space-x-4 border-b border-gray-200 overflow-x-auto scrollbar-hide">
          <TabButton id="events" label="Manage Events" icon={Calendar} />
          <TabButton id="results" label="Manage Results" icon={BarChart} />
          <TabButton id="staff" label="Manage Staff" icon={Users} />
          <TabButton id="news" label="Manage News" icon={Bell} />
          <TabButton id="media" label="Manage Images" icon={ImageIcon} />
        </div>

        {activeTab === 'events' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Add Event Form */}
            <div className="bg-white p-6 rounded-xl shadow-sm h-fit">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <Plus className="w-5 h-5 mr-2 text-orange-600" /> Add New Event
              </h2>
              <form onSubmit={handleAddEvent} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title (English)</label>
                  <input required type="text" value={newEvent.titleEn} onChange={e => setNewEvent({...newEvent, titleEn: e.target.value})} className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 border p-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title (Hindi)</label>
                  <input required type="text" value={newEvent.titleHi} onChange={e => setNewEvent({...newEvent, titleHi: e.target.value})} className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 border p-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description (English)</label>
                  <textarea required rows={2} value={newEvent.descEn} onChange={e => setNewEvent({...newEvent, descEn: e.target.value})} className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 border p-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description (Hindi)</label>
                  <textarea required rows={2} value={newEvent.descHi} onChange={e => setNewEvent({...newEvent, descHi: e.target.value})} className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 border p-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input type="text" value={newEvent.img} onChange={e => setNewEvent({...newEvent, img: e.target.value})} placeholder="https://..." className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 border p-2" />
                </div>
                <button type="submit" className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700">
                  <Save className="w-4 h-4 mr-2" /> Save Event
                </button>
              </form>
            </div>

            {/* Events List */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {events.map((event, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                  <img src={event.img} alt="Event" className="h-32 w-full object-cover" />
                  <div className="p-4 flex-1">
                    <h3 className="font-bold text-gray-800">{event.title.en}</h3>
                    <p className="text-sm text-gray-600 mb-2">{event.desc.en}</p>
                  </div>
                  <div className="bg-gray-50 p-3 border-t border-gray-100 flex justify-end">
                    <button onClick={() => handleDeleteEvent(idx)} className="text-red-600 hover:text-red-800 text-sm flex items-center">
                      <Trash2 className="w-4 h-4 mr-1" /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'results' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Add Result Form */}
            <div className="bg-white p-6 rounded-xl shadow-sm h-fit">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <Plus className="w-5 h-5 mr-2 text-orange-600" /> Add Year Result
              </h2>
              <form onSubmit={handleAddResult} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Academic Year (e.g., 2024-25)</label>
                  <input required type="text" value={newResult.year} onChange={e => setNewResult({...newResult, year: e.target.value})} className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 border p-2" />
                </div>
                
                <div className="border-t border-gray-100 pt-4">
                  <h3 className="text-sm font-bold text-gray-900 mb-2">Class 10</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <input required placeholder="Total" type="number" value={newResult.class10Total} onChange={e => setNewResult({...newResult, class10Total: e.target.value})} className="border p-2 rounded text-sm" />
                    <input required placeholder="Passed" type="number" value={newResult.class10Pass} onChange={e => setNewResult({...newResult, class10Pass: e.target.value})} className="border p-2 rounded text-sm" />
                    <input required placeholder="Percent %" type="number" step="0.01" value={newResult.class10Percent} onChange={e => setNewResult({...newResult, class10Percent: e.target.value})} className="col-span-2 border p-2 rounded text-sm" />
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <h3 className="text-sm font-bold text-gray-900 mb-2">Class 12</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <input required placeholder="Total" type="number" value={newResult.class12Total} onChange={e => setNewResult({...newResult, class12Total: e.target.value})} className="border p-2 rounded text-sm" />
                    <input required placeholder="Passed" type="number" value={newResult.class12Pass} onChange={e => setNewResult({...newResult, class12Pass: e.target.value})} className="border p-2 rounded text-sm" />
                    <input required placeholder="Percent %" type="number" step="0.01" value={newResult.class12Percent} onChange={e => setNewResult({...newResult, class12Percent: e.target.value})} className="col-span-2 border p-2 rounded text-sm" />
                  </div>
                </div>

                <button type="submit" className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 mt-4">
                  <Save className="w-4 h-4 mr-2" /> Add Result
                </button>
              </form>
            </div>

            {/* Results Table */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class 10 %</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class 12 %</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {examResults.slice().reverse().map((res) => (
                    <tr key={res.year}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{res.year}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{res.class10.passPercentage}%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{res.class12.passPercentage}%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button onClick={() => handleDeleteResult(res.year)} className="text-red-600 hover:text-red-900">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'staff' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             {/* Add Staff Form */}
             <div className="bg-white p-6 rounded-xl shadow-sm h-fit">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <Plus className="w-5 h-5 mr-2 text-orange-600" /> Add Staff Member
              </h2>
              <form onSubmit={handleAddStaff} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Name (En)</label>
                    <input required type="text" value={newStaff.nameEn} onChange={e => setNewStaff({...newStaff, nameEn: e.target.value})} className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 border p-2 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Name (Hi)</label>
                    <input required type="text" value={newStaff.nameHi} onChange={e => setNewStaff({...newStaff, nameHi: e.target.value})} className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 border p-2 text-sm" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Designation (En)</label>
                    <input required type="text" value={newStaff.designationEn} onChange={e => setNewStaff({...newStaff, designationEn: e.target.value})} className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 border p-2 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Designation (Hi)</label>
                    <input required type="text" value={newStaff.designationHi} onChange={e => setNewStaff({...newStaff, designationHi: e.target.value})} className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 border p-2 text-sm" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Subject (En)</label>
                    <input required type="text" value={newStaff.subjectEn} onChange={e => setNewStaff({...newStaff, subjectEn: e.target.value})} className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 border p-2 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Subject (Hi)</label>
                    <input required type="text" value={newStaff.subjectHi} onChange={e => setNewStaff({...newStaff, subjectHi: e.target.value})} className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 border p-2 text-sm" />
                  </div>
                </div>
                <button type="submit" className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 mt-2">
                  <Save className="w-4 h-4 mr-2" /> Add Staff
                </button>
              </form>
             </div>

             {/* Staff List */}
             <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Designation</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {staff.map((s) => (
                      <tr key={s.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{s.name.en}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{s.designation.en}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{s.subject.en}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button onClick={() => handleDeleteStaff(s.id)} className="text-red-600 hover:text-red-900">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
          </div>
        )}

        {activeTab === 'news' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             {/* Add News Form */}
             <div className="bg-white p-6 rounded-xl shadow-sm h-fit">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <Plus className="w-5 h-5 mr-2 text-orange-600" /> Add News
              </h2>
              <form onSubmit={handleAddNews} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">News Text (English)</label>
                  <input required type="text" value={newNews.textEn} onChange={e => setNewNews({...newNews, textEn: e.target.value})} className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 border p-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">News Text (Hindi)</label>
                  <input required type="text" value={newNews.textHi} onChange={e => setNewNews({...newNews, textHi: e.target.value})} className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 border p-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input required type="date" value={newNews.date} onChange={e => setNewNews({...newNews, date: e.target.value})} className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 border p-2" />
                </div>
                <button type="submit" className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700">
                  <Save className="w-4 h-4 mr-2" /> Add News
                </button>
              </form>
             </div>

             {/* News List */}
             <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">News Content</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {news.map((n) => (
                      <tr key={n.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{n.date}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{n.text.en}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button onClick={() => handleDeleteNews(n.id)} className="text-red-600 hover:text-red-900">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
          </div>
        )}

        {activeTab === 'media' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* General Site Images */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center border-b pb-2">
                <ImageIcon className="w-5 h-5 mr-2 text-orange-600" /> General Site Images
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hero Background Image URL</label>
                  <input 
                    type="text" 
                    value={heroImage} 
                    onChange={(e) => setHeroImage(e.target.value)} 
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 border p-2 mb-3"
                  />
                  <div className="relative h-48 w-full rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                    <img src={heroImage} alt="Hero Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/10 flex items-end p-2">
                      <span className="text-xs text-white bg-black/50 px-2 py-1 rounded">Preview</span>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">About Section Image URL</label>
                  <input 
                    type="text" 
                    value={aboutImage} 
                    onChange={(e) => setAboutImage(e.target.value)} 
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 border p-2 mb-3"
                  />
                  <div className="relative h-48 w-full rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                    <img src={aboutImage} alt="About Preview" className="w-full h-full object-cover" />
                     <div className="absolute inset-0 bg-black/10 flex items-end p-2">
                      <span className="text-xs text-white bg-black/50 px-2 py-1 rounded">Preview</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Facilities Images */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center border-b pb-2">
                <ImageIcon className="w-5 h-5 mr-2 text-orange-600" /> Facilities Images
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {facilities.map((facility, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50/50">
                    <h3 className="font-semibold text-gray-800 text-sm mb-3">{facility.title.en} / {facility.title.hi}</h3>
                    <div className="space-y-3">
                      <input 
                        type="text" 
                        value={facility.image} 
                        onChange={(e) => handleFacilityImageChange(index, e.target.value)}
                        placeholder="Image URL"
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 border p-2 text-xs"
                      />
                      <div className="h-32 w-full rounded overflow-hidden bg-gray-100 border border-gray-200">
                        <img 
                          src={facility.image} 
                          alt={facility.title.en} 
                          className="w-full h-full object-cover hover:scale-105 transition-transform"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;