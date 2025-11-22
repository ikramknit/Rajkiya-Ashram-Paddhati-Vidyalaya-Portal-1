import React, { useState } from 'react';
import { LogOut, Plus, Trash2, Calendar, BarChart, Save, Image as ImageIcon, Users, Bell, Edit2, X } from 'lucide-react';
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

  // Editing States
  const [editingEventIndex, setEditingEventIndex] = useState<number | null>(null);
  const [editingStaffId, setEditingStaffId] = useState<number | null>(null);
  const [editingNewsId, setEditingNewsId] = useState<number | null>(null);
  const [editingResultYear, setEditingResultYear] = useState<string | null>(null);

  // Event Form State
  const [newEvent, setNewEvent] = useState({
    titleEn: '', titleHi: '',
    descEn: '', descHi: '',
    img: ''
  });

  // Result Form State
  const [newResult, setNewResult] = useState({
    year: '',
    class10Total: '', class10Pass: '', class10Percent: '',
    class12Total: '', class12Pass: '', class12Percent: ''
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
    contentEn: '', contentHi: '',
    image: '',
    date: ''
  });

  // --- EVENTS Handlers ---
  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const eventData: EventItem = {
      title: { en: newEvent.titleEn, hi: newEvent.titleHi },
      desc: { en: newEvent.descEn, hi: newEvent.descHi },
      img: newEvent.img || 'https://picsum.photos/400/300'
    };

    if (editingEventIndex !== null) {
      const updatedEvents = [...events];
      updatedEvents[editingEventIndex] = eventData;
      setEvents(updatedEvents);
      setEditingEventIndex(null);
    } else {
      setEvents([...events, eventData]);
    }
    setNewEvent({ titleEn: '', titleHi: '', descEn: '', descHi: '', img: '' });
  };

  const handleEditEvent = (index: number) => {
    const event = events[index];
    setNewEvent({
      titleEn: event.title.en,
      titleHi: event.title.hi,
      descEn: event.desc.en,
      descHi: event.desc.hi,
      img: event.img
    });
    setEditingEventIndex(index);
  };

  const handleDeleteEvent = (index: number) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter((_, i) => i !== index));
      if (editingEventIndex === index) {
        setEditingEventIndex(null);
        setNewEvent({ titleEn: '', titleHi: '', descEn: '', descHi: '', img: '' });
      }
    }
  };

  const cancelEditEvent = () => {
    setEditingEventIndex(null);
    setNewEvent({ titleEn: '', titleHi: '', descEn: '', descHi: '', img: '' });
  };

  // --- RESULTS Handlers ---
  const handleSaveResult = (e: React.FormEvent) => {
    e.preventDefault();
    const resultData: YearResult = {
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

    if (editingResultYear) {
      // Update existing
      setExamResults(examResults.map(r => r.year === editingResultYear ? resultData : r));
      setEditingResultYear(null);
    } else {
      // Add new
      setExamResults([...examResults, resultData].sort((a, b) => a.year.localeCompare(b.year)));
    }
    setNewResult({ year: '', class10Total: '', class10Pass: '', class10Percent: '', class12Total: '', class12Pass: '', class12Percent: '' });
  };

  const handleEditResult = (year: string) => {
    const res = examResults.find(r => r.year === year);
    if (res) {
      setNewResult({
        year: res.year,
        class10Total: res.class10.totalStudents.toString(),
        class10Pass: res.class10.passed.toString(),
        class10Percent: res.class10.passPercentage.toString(),
        class12Total: res.class12.totalStudents.toString(),
        class12Pass: res.class12.passed.toString(),
        class12Percent: res.class12.passPercentage.toString()
      });
      setEditingResultYear(year);
    }
  };

  const handleDeleteResult = (year: string) => {
    if (window.confirm('Are you sure?')) {
      setExamResults(examResults.filter(r => r.year !== year));
      if (editingResultYear === year) cancelEditResult();
    }
  };

  const cancelEditResult = () => {
    setEditingResultYear(null);
    setNewResult({ year: '', class10Total: '', class10Pass: '', class10Percent: '', class12Total: '', class12Pass: '', class12Percent: '' });
  };

  // --- FACILITIES Handler ---
  const handleFacilityImageChange = (index: number, newUrl: string) => {
    const updatedFacilities = [...facilities];
    updatedFacilities[index] = { ...updatedFacilities[index], image: newUrl };
    setFacilities(updatedFacilities);
  };

  // --- STAFF Handlers ---
  const handleSaveStaff = (e: React.FormEvent) => {
    e.preventDefault();
    const memberData: StaffMember = {
      id: editingStaffId || Date.now(),
      name: { en: newStaff.nameEn, hi: newStaff.nameHi },
      designation: { en: newStaff.designationEn, hi: newStaff.designationHi },
      subject: { en: newStaff.subjectEn, hi: newStaff.subjectHi }
    };

    if (editingStaffId) {
      setStaff(staff.map(s => s.id === editingStaffId ? memberData : s));
      setEditingStaffId(null);
    } else {
      setStaff([...staff, memberData]);
    }
    setNewStaff({ nameEn: '', nameHi: '', designationEn: '', designationHi: '', subjectEn: '', subjectHi: '' });
  };

  const handleEditStaff = (id: number) => {
    const s = staff.find(s => s.id === id);
    if (s) {
      setNewStaff({
        nameEn: s.name.en, nameHi: s.name.hi,
        designationEn: s.designation.en, designationHi: s.designation.hi,
        subjectEn: s.subject.en, subjectHi: s.subject.hi
      });
      setEditingStaffId(id);
    }
  };

  const handleDeleteStaff = (id: number) => {
    if (window.confirm('Delete this staff member?')) {
      setStaff(staff.filter(s => s.id !== id));
      if (editingStaffId === id) cancelEditStaff();
    }
  };

  const cancelEditStaff = () => {
    setEditingStaffId(null);
    setNewStaff({ nameEn: '', nameHi: '', designationEn: '', designationHi: '', subjectEn: '', subjectHi: '' });
  };

  // --- NEWS Handlers ---
  const handleSaveNews = (e: React.FormEvent) => {
    e.preventDefault();
    const itemData: NewsItem = {
      id: editingNewsId || Date.now(),
      text: { en: newNews.textEn, hi: newNews.textHi },
      content: { en: newNews.contentEn, hi: newNews.contentHi },
      image: newNews.image,
      date: newNews.date
    };

    if (editingNewsId) {
      setNews(news.map(n => n.id === editingNewsId ? itemData : n));
      setEditingNewsId(null);
    } else {
      setNews([...news, itemData]);
    }
    setNewNews({ textEn: '', textHi: '', contentEn: '', contentHi: '', image: '', date: '' });
  };

  const handleEditNews = (id: number) => {
    const n = news.find(n => n.id === id);
    if (n) {
      setNewNews({
        textEn: n.text.en, textHi: n.text.hi,
        contentEn: n.content?.en || '', contentHi: n.content?.hi || '',
        image: n.image || '',
        date: n.date
      });
      setEditingNewsId(id);
    }
  };

  const handleDeleteNews = (id: number) => {
    if (window.confirm('Delete this news item?')) {
      setNews(news.filter(n => n.id !== id));
      if (editingNewsId === id) cancelEditNews();
    }
  };

  const cancelEditNews = () => {
    setEditingNewsId(null);
    setNewNews({ textEn: '', textHi: '', contentEn: '', contentHi: '', image: '', date: '' });
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
      <header className="bg-white shadow sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">CMS Dashboard</h1>
            <p className="text-sm text-gray-500">Admin Panel</p>
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
          <TabButton id="events" label="Events" icon={Calendar} />
          <TabButton id="results" label="Results" icon={BarChart} />
          <TabButton id="staff" label="Staff" icon={Users} />
          <TabButton id="news" label="News" icon={Bell} />
          <TabButton id="media" label="Images" icon={ImageIcon} />
        </div>

        {activeTab === 'events' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Add/Edit Event Form */}
            <div className="bg-white p-6 rounded-xl shadow-sm h-fit border border-gray-200">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center justify-between">
                <span className="flex items-center">
                  {editingEventIndex !== null ? <Edit2 className="w-5 h-5 mr-2 text-orange-600" /> : <Plus className="w-5 h-5 mr-2 text-orange-600" />}
                  {editingEventIndex !== null ? 'Edit Event' : 'Add New Event'}
                </span>
                {editingEventIndex !== null && (
                  <button onClick={cancelEditEvent} className="text-xs text-red-500 hover:underline flex items-center">
                    <X className="w-3 h-3 mr-1" /> Cancel
                  </button>
                )}
              </h2>
              <form onSubmit={handleSaveEvent} className="space-y-4">
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
                  <Save className="w-4 h-4 mr-2" /> {editingEventIndex !== null ? 'Update Event' : 'Save Event'}
                </button>
              </form>
            </div>

            {/* Events List */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {events.map((event, idx) => (
                <div key={idx} className={`bg-white rounded-lg shadow-sm border transition-all flex flex-col ${editingEventIndex === idx ? 'border-orange-500 ring-2 ring-orange-200' : 'border-gray-200'}`}>
                  <div className="relative h-32">
                     <img src={event.img} alt="Event" className="h-full w-full object-cover rounded-t-lg" />
                     {editingEventIndex === idx && <div className="absolute inset-0 bg-orange-500/20 flex items-center justify-center text-white font-bold">Editing...</div>}
                  </div>
                  <div className="p-4 flex-1">
                    <h3 className="font-bold text-gray-800 line-clamp-1">{event.title.en}</h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{event.desc.en}</p>
                  </div>
                  <div className="bg-gray-50 p-3 border-t border-gray-100 flex justify-between items-center">
                    <button onClick={() => handleEditEvent(idx)} className="text-blue-600 hover:text-blue-800 text-sm flex items-center font-medium">
                      <Edit2 className="w-3 h-3 mr-1" /> Edit
                    </button>
                    <button onClick={() => handleDeleteEvent(idx)} className="text-red-600 hover:text-red-800 text-sm flex items-center font-medium">
                      <Trash2 className="w-3 h-3 mr-1" /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'results' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Add/Edit Result Form */}
            <div className="bg-white p-6 rounded-xl shadow-sm h-fit border border-gray-200">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center justify-between">
                <span className="flex items-center">
                  {editingResultYear ? <Edit2 className="w-5 h-5 mr-2 text-orange-600" /> : <Plus className="w-5 h-5 mr-2 text-orange-600" />}
                  {editingResultYear ? `Edit ${editingResultYear}` : 'Add Year Result'}
                </span>
                {editingResultYear && (
                   <button onClick={cancelEditResult} className="text-xs text-red-500 hover:underline flex items-center">
                    <X className="w-3 h-3 mr-1" /> Cancel
                  </button>
                )}
              </h2>
              <form onSubmit={handleSaveResult} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Academic Year (e.g., 2024-25)</label>
                  <input 
                    required 
                    type="text" 
                    value={newResult.year} 
                    onChange={e => setNewResult({...newResult, year: e.target.value})} 
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 border p-2 bg-gray-50"
                    disabled={!!editingResultYear} // Prevent changing year when editing
                  />
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
                  <Save className="w-4 h-4 mr-2" /> {editingResultYear ? 'Update Result' : 'Add Result'}
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
                    <tr key={res.year} className={editingResultYear === res.year ? 'bg-orange-50' : ''}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{res.year}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{res.class10.passPercentage}%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{res.class12.passPercentage}%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button onClick={() => handleEditResult(res.year)} className="text-blue-600 hover:text-blue-900 mr-3" title="Edit">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDeleteResult(res.year)} className="text-red-600 hover:text-red-900" title="Delete">
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
             {/* Add/Edit Staff Form */}
             <div className="bg-white p-6 rounded-xl shadow-sm h-fit border border-gray-200">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center justify-between">
                <span className="flex items-center">
                  {editingStaffId ? <Edit2 className="w-5 h-5 mr-2 text-orange-600" /> : <Plus className="w-5 h-5 mr-2 text-orange-600" />}
                  {editingStaffId ? 'Edit Staff' : 'Add Staff Member'}
                </span>
                {editingStaffId && (
                   <button onClick={cancelEditStaff} className="text-xs text-red-500 hover:underline flex items-center">
                    <X className="w-3 h-3 mr-1" /> Cancel
                  </button>
                )}
              </h2>
              <form onSubmit={handleSaveStaff} className="space-y-4">
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
                  <Save className="w-4 h-4 mr-2" /> {editingStaffId ? 'Update Staff' : 'Add Staff'}
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
                      <tr key={s.id} className={editingStaffId === s.id ? 'bg-orange-50' : ''}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{s.name.en}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{s.designation.en}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{s.subject.en}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button onClick={() => handleEditStaff(s.id)} className="text-blue-600 hover:text-blue-900 mr-3">
                            <Edit2 className="w-4 h-4" />
                          </button>
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
             {/* Add/Edit News Form */}
             <div className="bg-white p-6 rounded-xl shadow-sm h-fit border border-gray-200">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center justify-between">
                <span className="flex items-center">
                  {editingNewsId ? <Edit2 className="w-5 h-5 mr-2 text-orange-600" /> : <Plus className="w-5 h-5 mr-2 text-orange-600" />}
                  {editingNewsId ? 'Edit News' : 'Add News'}
                </span>
                {editingNewsId && (
                   <button onClick={cancelEditNews} className="text-xs text-red-500 hover:underline flex items-center">
                    <X className="w-3 h-3 mr-1" /> Cancel
                  </button>
                )}
              </h2>
              <form onSubmit={handleSaveNews} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Headline (English)</label>
                  <input required type="text" value={newNews.textEn} onChange={e => setNewNews({...newNews, textEn: e.target.value})} className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 border p-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Headline (Hindi)</label>
                  <input required type="text" value={newNews.textHi} onChange={e => setNewNews({...newNews, textHi: e.target.value})} className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 border p-2" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Content (English)</label>
                  <textarea rows={3} value={newNews.contentEn} onChange={e => setNewNews({...newNews, contentEn: e.target.value})} className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 border p-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Content (Hindi)</label>
                  <textarea rows={3} value={newNews.contentHi} onChange={e => setNewNews({...newNews, contentHi: e.target.value})} className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 border p-2" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input type="text" value={newNews.image} onChange={e => setNewNews({...newNews, image: e.target.value})} placeholder="https://..." className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 border p-2" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input required type="date" value={newNews.date} onChange={e => setNewNews({...newNews, date: e.target.value})} className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 border p-2" />
                </div>
                <button type="submit" className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700">
                  <Save className="w-4 h-4 mr-2" /> {editingNewsId ? 'Update News' : 'Add News'}
                </button>
              </form>
             </div>

             {/* News List */}
             <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Headline</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {news.map((n) => (
                      <tr key={n.id} className={editingNewsId === n.id ? 'bg-orange-50' : ''}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{n.date}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          <div className="font-medium">{n.text.en}</div>
                          <div className="text-gray-500 text-xs truncate max-w-xs">{n.content?.en}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {n.image ? (
                            <img src={n.image} alt="thumb" className="h-10 w-10 rounded object-cover border border-gray-200" />
                          ) : (
                            <span className="text-xs text-gray-400">No Img</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button onClick={() => handleEditNews(n.id)} className="text-blue-600 hover:text-blue-900 mr-3">
                            <Edit2 className="w-4 h-4" />
                          </button>
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