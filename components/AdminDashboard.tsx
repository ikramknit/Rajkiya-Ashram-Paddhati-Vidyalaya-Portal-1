import React, { useState } from 'react';
import { LogOut, Plus, Trash2, Calendar, BarChart, Save } from 'lucide-react';
import type { EventItem, YearResult } from '../types';

interface AdminDashboardProps {
  events: EventItem[];
  setEvents: React.Dispatch<React.SetStateAction<EventItem[]>>;
  examResults: YearResult[];
  setExamResults: React.Dispatch<React.SetStateAction<YearResult[]>>;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({
  events,
  setEvents,
  examResults,
  setExamResults,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<'events' | 'results'>('events');

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
    // Basic mock data for toppers to avoid complex form
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
        <div className="mb-6 flex space-x-4 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('events')}
            className={`pb-4 px-4 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'events'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" /> Manage Events
            </div>
          </button>
          <button
            onClick={() => setActiveTab('results')}
            className={`pb-4 px-4 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'results'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center">
              <BarChart className="w-4 h-4 mr-2" /> Manage Results
            </div>
          </button>
        </div>

        {activeTab === 'events' ? (
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
        ) : (
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
      </main>
    </div>
  );
};

export default AdminDashboard;