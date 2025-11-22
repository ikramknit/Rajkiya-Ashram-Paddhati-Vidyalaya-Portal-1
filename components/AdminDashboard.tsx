import React, { useState, useEffect } from 'react';
import { LogOut, Plus, Trash2, Calendar, BarChart, Save, Image as ImageIcon, Users, Bell, Edit2, X, Upload, Building2, Copy, Check, RefreshCw, Loader, Settings, GripVertical } from 'lucide-react';
import type { EventItem, YearResult, Facility, StaffMember, NewsItem, SiteConfig } from '../types';
import { supabase, isSupabaseConfigured } from '../supabaseClient';

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
  siteConfig: SiteConfig;
  setSiteConfig: React.Dispatch<React.SetStateAction<SiteConfig>>;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({
  events, setEvents,
  examResults, setExamResults,
  facilities, setFacilities,
  staff, setStaff,
  news, setNews,
  siteConfig, setSiteConfig,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<'events' | 'results' | 'media' | 'staff' | 'news' | 'facilities' | 'settings'>('events');
  const [uploading, setUploading] = useState(false);
  const [globalUploadUrl, setGlobalUploadUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);

  // Gallery State
  const [galleryImages, setGalleryImages] = useState<{name: string, url: string}[]>([]);
  const [loadingGallery, setLoadingGallery] = useState(false);

  // Editing States
  const [editingEventIndex, setEditingEventIndex] = useState<number | null>(null);
  const [editingStaffId, setEditingStaffId] = useState<number | null>(null);
  const [editingNewsId, setEditingNewsId] = useState<number | null>(null);
  const [editingFacilityId, setEditingFacilityId] = useState<number | null>(null);
  const [editingResultYear, setEditingResultYear] = useState<string | null>(null);

  // Forms State
  const [newEvent, setNewEvent] = useState({ titleEn: '', titleHi: '', descEn: '', descHi: '', img: '' });
  const [newResult, setNewResult] = useState({ year: '', class10Total: '', class10Pass: '', class10Percent: '', class12Total: '', class12Pass: '', class12Percent: '' });
  const [newStaff, setNewStaff] = useState({ nameEn: '', nameHi: '', designationEn: '', designationHi: '', subjectEn: '', subjectHi: '', photo: '' });
  const [newNews, setNewNews] = useState({ textEn: '', textHi: '', contentEn: '', contentHi: '', image: '', date: '' });
  const [newFacility, setNewFacility] = useState({ titleEn: '', titleHi: '', descEn: '', descHi: '', image: '' });

  // Fetch Gallery Images
  const fetchGalleryImages = async () => {
    if (!isSupabaseConfigured()) return;
    setLoadingGallery(true);
    try {
      const { data, error } = await supabase.storage.from('jolaschoolBucket').list('', {
        limit: 100,
        offset: 0,
        sortBy: { column: 'created_at', order: 'desc' },
      });
      
      if (error) {
        console.error('Error fetching gallery:', error);
      } else if (data) {
        const images = data
          .filter(file => file.name !== '.emptyFolderPlaceholder') 
          .map(file => {
          const { data: { publicUrl } } = supabase.storage.from('jolaschoolBucket').getPublicUrl(file.name);
          return { name: file.name, url: publicUrl };
        });
        setGalleryImages(images);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoadingGallery(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'media') {
      fetchGalleryImages();
    }
  }, [activeTab]);

  // Helper: Upload Image
  const handleImageUpload = async (file: File): Promise<string | null> => {
    if (!isSupabaseConfigured()) {
      alert("Supabase Credentials missing in supabaseClient.ts");
      return null;
    }
    try {
      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('jolaschoolBucket')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('jolaschoolBucket')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading image: ', error);
      alert('Error uploading image!');
      return null;
    } finally {
      setUploading(false);
    }
  };

  // Helper: Delete Image
  const handleDeleteImage = async (imageName: string) => {
    if(!window.confirm("Are you sure you want to delete this image? If it is used on the website, the link will break.")) return;
    try {
      const { error } = await supabase.storage.from('jolaschoolBucket').remove([imageName]);
      if (error) throw error;
      fetchGalleryImages(); // Refresh
    } catch (error) {
      alert("Error deleting image");
      console.error(error);
    }
  };

  // Helper: Rename Image (Edit)
  const handleRenameImage = async (oldName: string) => {
    const newName = prompt("Enter new filename (keep the extension, e.g., image.jpg):", oldName);
    if(!newName || newName === oldName) return;

    try {
        const { error } = await supabase.storage.from('jolaschoolBucket').move(oldName, newName);
        if(error) throw error;
        fetchGalleryImages(); // Refresh
    } catch (error) {
        alert("Error renaming image. Ensure the name is unique.");
        console.error(error);
    }
  };

  // Helper: Copy to Clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // --- EVENTS Handlers ---
  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    const eventData = {
      title: { en: newEvent.titleEn, hi: newEvent.titleHi },
      desc: { en: newEvent.descEn, hi: newEvent.descHi },
      img: newEvent.img || 'https://picsum.photos/400/300'
    };

    if (isSupabaseConfigured()) {
      const dbPayload = {
        title_en: newEvent.titleEn, title_hi: newEvent.titleHi,
        desc_en: newEvent.descEn, desc_hi: newEvent.descHi,
        img: eventData.img
      };
      
      if (editingEventIndex !== null && events[editingEventIndex].id) {
         await supabase.from('jola_events').update(dbPayload).eq('id', events[editingEventIndex].id);
      } else {
         await supabase.from('jola_events').insert([dbPayload]);
      }
    }

    if (editingEventIndex !== null) {
      const updatedEvents = [...events];
      updatedEvents[editingEventIndex] = { ...events[editingEventIndex], ...eventData };
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
      titleEn: event.title.en, titleHi: event.title.hi,
      descEn: event.desc.en, descHi: event.desc.hi,
      img: event.img
    });
    setEditingEventIndex(index);
  };

  const handleDeleteEvent = async (index: number) => {
    if (window.confirm('Delete this event?')) {
      if (isSupabaseConfigured() && events[index].id) {
         await supabase.from('jola_events').delete().eq('id', events[index].id);
      }
      setEvents(events.filter((_, i) => i !== index));
      if (editingEventIndex === index) { setEditingEventIndex(null); setNewEvent({ titleEn: '', titleHi: '', descEn: '', descHi: '', img: '' }); }
    }
  };

  // --- RESULTS Handlers ---
  const handleSaveResult = async (e: React.FormEvent) => {
    e.preventDefault();
    const resultData: YearResult = {
      year: newResult.year,
      class10: {
        totalStudents: Number(newResult.class10Total), passed: Number(newResult.class10Pass),
        failed: Number(newResult.class10Total) - Number(newResult.class10Pass),
        passPercentage: newResult.class10Percent, toppers: []
      },
      class12: {
        totalStudents: Number(newResult.class12Total), passed: Number(newResult.class12Pass),
        failed: Number(newResult.class12Total) - Number(newResult.class12Pass),
        passPercentage: newResult.class12Percent, toppers: []
      }
    };

    if (isSupabaseConfigured()) {
      const dbPayload = { year: resultData.year, class10: resultData.class10, class12: resultData.class12 };
      if (editingResultYear) {
        await supabase.from('jola_results').update(dbPayload).eq('year', editingResultYear);
      } else {
        await supabase.from('jola_results').insert([dbPayload]);
      }
    }

    if (editingResultYear) {
      setExamResults(examResults.map(r => r.year === editingResultYear ? resultData : r));
      setEditingResultYear(null);
    } else {
      setExamResults([...examResults, resultData].sort((a, b) => a.year.localeCompare(b.year)));
    }
    setNewResult({ year: '', class10Total: '', class10Pass: '', class10Percent: '', class12Total: '', class12Pass: '', class12Percent: '' });
  };

  const handleEditResult = (year: string) => {
    const res = examResults.find(r => r.year === year);
    if (res) {
      setNewResult({
        year: res.year,
        class10Total: res.class10.totalStudents.toString(), class10Pass: res.class10.passed.toString(), class10Percent: res.class10.passPercentage.toString(),
        class12Total: res.class12.totalStudents.toString(), class12Pass: res.class12.passed.toString(), class12Percent: res.class12.passPercentage.toString()
      });
      setEditingResultYear(year);
    }
  };

  const handleDeleteResult = async (year: string) => {
    if (window.confirm('Are you sure?')) {
      if (isSupabaseConfigured()) {
         await supabase.from('jola_results').delete().eq('year', year);
      }
      setExamResults(examResults.filter(r => r.year !== year));
      if (editingResultYear === year) setEditingResultYear(null);
    }
  };

  // --- STAFF Handlers ---
  const handleSaveStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    const memberData: StaffMember = {
      id: editingStaffId || Date.now(),
      name: { en: newStaff.nameEn, hi: newStaff.nameHi },
      designation: { en: newStaff.designationEn, hi: newStaff.designationHi },
      subject: { en: newStaff.subjectEn, hi: newStaff.subjectHi },
      photo: newStaff.photo
    };

    if (isSupabaseConfigured()) {
      const dbPayload = {
        name_en: newStaff.nameEn, name_hi: newStaff.nameHi,
        designation_en: newStaff.designationEn, designation_hi: newStaff.designationHi,
        subject_en: newStaff.subjectEn, subject_hi: newStaff.subjectHi,
        photo: newStaff.photo
      };
      if (editingStaffId) {
        await supabase.from('jola_staff').update(dbPayload).eq('id', editingStaffId);
      } else {
        const { data } = await supabase.from('jola_staff').insert([dbPayload]).select();
        if (data) memberData.id = data[0].id;
      }
    }

    if (editingStaffId) {
      setStaff(staff.map(s => s.id === editingStaffId ? memberData : s));
      setEditingStaffId(null);
    } else {
      setStaff([...staff, memberData]);
    }
    setNewStaff({ nameEn: '', nameHi: '', designationEn: '', designationHi: '', subjectEn: '', subjectHi: '', photo: '' });
  };

  const handleEditStaff = (id: number) => {
    const s = staff.find(s => s.id === id);
    if (s) {
      setNewStaff({
        nameEn: s.name.en, nameHi: s.name.hi,
        designationEn: s.designation.en, designationHi: s.designation.hi,
        subjectEn: s.subject.en, subjectHi: s.subject.hi,
        photo: s.photo || ''
      });
      setEditingStaffId(id);
    }
  };

  const handleDeleteStaff = async (id: number) => {
    if (window.confirm('Delete this staff member?')) {
      if (isSupabaseConfigured()) {
        await supabase.from('jola_staff').delete().eq('id', id);
      }
      setStaff(staff.filter(s => s.id !== id));
      if (editingStaffId === id) setEditingStaffId(null);
    }
  };

  // --- NEWS Handlers ---
  const handleSaveNews = async (e: React.FormEvent) => {
    e.preventDefault();
    const itemData: NewsItem = {
      id: editingNewsId || Date.now(),
      text: { en: newNews.textEn, hi: newNews.textHi },
      content: { en: newNews.contentEn, hi: newNews.contentHi },
      image: newNews.image,
      date: newNews.date
    };

    if (isSupabaseConfigured()) {
      const dbPayload = {
        text_en: newNews.textEn, text_hi: newNews.textHi,
        content_en: newNews.contentEn, content_hi: newNews.contentHi,
        image: newNews.image, date: newNews.date
      };
      if (editingNewsId) {
        await supabase.from('jola_news').update(dbPayload).eq('id', editingNewsId);
      } else {
        const { data } = await supabase.from('jola_news').insert([dbPayload]).select();
        if (data) itemData.id = data[0].id;
      }
    }

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

  const handleDeleteNews = async (id: number) => {
    if (window.confirm('Delete this news item?')) {
      if (isSupabaseConfigured()) {
        await supabase.from('jola_news').delete().eq('id', id);
      }
      setNews(news.filter(n => n.id !== id));
      if (editingNewsId === id) setEditingNewsId(null);
    }
  };

  // --- FACILITIES Handlers ---
  const handleSaveFacility = async (e: React.FormEvent) => {
    e.preventDefault();
    const facData: Facility = {
      id: editingFacilityId || Date.now(),
      title: { en: newFacility.titleEn, hi: newFacility.titleHi },
      description: { en: newFacility.descEn, hi: newFacility.descHi },
      image: newFacility.image,
      icon: <Building2 className="w-6 h-6" /> // Default icon for dynamic items
    };

    if (isSupabaseConfigured()) {
      const dbPayload = {
        title_en: newFacility.titleEn, title_hi: newFacility.titleHi,
        description_en: newFacility.descEn, description_hi: newFacility.descHi,
        image: newFacility.image
      };
      if (editingFacilityId) {
        await supabase.from('jola_facilities').update(dbPayload).eq('id', editingFacilityId);
      } else {
        const { data } = await supabase.from('jola_facilities').insert([dbPayload]).select();
        if (data) facData.id = data[0].id;
      }
    }

    if (editingFacilityId) {
      setFacilities(facilities.map(f => f.id === editingFacilityId ? { ...f, ...facData, icon: f.icon } : f));
      setEditingFacilityId(null);
    } else {
      setFacilities([...facilities, facData]);
    }
    setNewFacility({ titleEn: '', titleHi: '', descEn: '', descHi: '', image: '' });
  };

  const handleEditFacility = (id: number) => {
    const f = facilities.find(fac => fac.id === id);
    if (f) {
      setNewFacility({
        titleEn: f.title.en, titleHi: f.title.hi,
        descEn: f.description.en, descHi: f.description.hi,
        image: f.image
      });
      setEditingFacilityId(id);
    }
  };

  const handleDeleteFacility = async (id: number) => {
    if (window.confirm('Delete this facility?')) {
      if (isSupabaseConfigured()) {
        await supabase.from('jola_facilities').delete().eq('id', id);
      }
      setFacilities(facilities.filter(f => f.id !== id));
      if (editingFacilityId === id) setEditingFacilityId(null);
    }
  };

  // --- SETTINGS Handlers ---
  const handleSaveSettings = async () => {
    if (isSupabaseConfigured()) {
      // We must save each key individually in jola_settings
      const upserts = [
        { key: 'school_name_en', value: siteConfig.schoolName.en },
        { key: 'school_name_hi', value: siteConfig.schoolName.hi },
        { key: 'school_sub_en', value: siteConfig.subTitle.en },
        { key: 'school_sub_hi', value: siteConfig.subTitle.hi },
        { key: 'address_en', value: siteConfig.address.en },
        { key: 'address_hi', value: siteConfig.address.hi },
        { key: 'phone', value: siteConfig.phone },
        { key: 'email', value: siteConfig.email },
        { key: 'hero_images', value: JSON.stringify(siteConfig.heroImages) },
        { key: 'about_image', value: siteConfig.aboutImage },
      ];
      
      const { error } = await supabase.from('jola_settings').upsert(upserts);
      if (error) {
        console.error("Settings save error:", error);
        alert("Error saving settings");
      } else {
        alert('Website settings updated successfully!');
      }
    } else {
      alert('Supabase not configured');
    }
  };

  // Helper for hero images array
  const addHeroImage = () => {
    setSiteConfig({...siteConfig, heroImages: [...siteConfig.heroImages, ""]});
  };
  const updateHeroImage = (idx: number, val: string) => {
    const newImages = [...siteConfig.heroImages];
    newImages[idx] = val;
    setSiteConfig({...siteConfig, heroImages: newImages});
  };
  const removeHeroImage = (idx: number) => {
    const newImages = siteConfig.heroImages.filter((_, i) => i !== idx);
    setSiteConfig({...siteConfig, heroImages: newImages});
  };

  const TabButton = ({ id, label, icon: Icon }: { id: string, label: string, icon: any }) => (
    <button
      onClick={() => setActiveTab(id as any)}
      className={`pb-4 px-4 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
        activeTab === id ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700'
      }`}
    >
      <div className="flex items-center"><Icon className="w-4 h-4 mr-2" /> {label}</div>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div><h1 className="text-2xl font-bold text-gray-900">CMS Dashboard</h1></div>
          <button onClick={onLogout} className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700">
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex space-x-4 border-b border-gray-200 overflow-x-auto scrollbar-hide">
          <TabButton id="events" label="Events" icon={Calendar} />
          <TabButton id="results" label="Results" icon={BarChart} />
          <TabButton id="staff" label="Staff" icon={Users} />
          <TabButton id="news" label="News" icon={Bell} />
          <TabButton id="facilities" label="Facilities" icon={Building2} />
          <TabButton id="settings" label="General Settings" icon={Settings} />
          <TabButton id="media" label="Media Library" icon={ImageIcon} />
        </div>

        {/* --- GENERAL SETTINGS TAB --- */}
        {activeTab === 'settings' && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center"><Settings className="w-5 h-5 mr-2 text-orange-600" /> Website Configuration</h2>
            
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                   <label className="block text-xs font-medium text-gray-500 uppercase mb-1">School Name (English)</label>
                   <input type="text" value={siteConfig.schoolName.en} onChange={(e) => setSiteConfig({...siteConfig, schoolName: {...siteConfig.schoolName, en: e.target.value}})} className="w-full border p-2 rounded" />
                 </div>
                 <div>
                   <label className="block text-xs font-medium text-gray-500 uppercase mb-1">School Name (Hindi)</label>
                   <input type="text" value={siteConfig.schoolName.hi} onChange={(e) => setSiteConfig({...siteConfig, schoolName: {...siteConfig.schoolName, hi: e.target.value}})} className="w-full border p-2 rounded" />
                 </div>
                 <div>
                   <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Subtitle / Dept (English)</label>
                   <input type="text" value={siteConfig.subTitle.en} onChange={(e) => setSiteConfig({...siteConfig, subTitle: {...siteConfig.subTitle, en: e.target.value}})} className="w-full border p-2 rounded" />
                 </div>
                 <div>
                   <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Subtitle / Dept (Hindi)</label>
                   <input type="text" value={siteConfig.subTitle.hi} onChange={(e) => setSiteConfig({...siteConfig, subTitle: {...siteConfig.subTitle, hi: e.target.value}})} className="w-full border p-2 rounded" />
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t pt-6">
                 <div>
                   <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Address (English)</label>
                   <input type="text" value={siteConfig.address.en} onChange={(e) => setSiteConfig({...siteConfig, address: {...siteConfig.address, en: e.target.value}})} className="w-full border p-2 rounded" />
                 </div>
                 <div>
                   <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Address (Hindi)</label>
                   <input type="text" value={siteConfig.address.hi} onChange={(e) => setSiteConfig({...siteConfig, address: {...siteConfig.address, hi: e.target.value}})} className="w-full border p-2 rounded" />
                 </div>
                 <div>
                   <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Phone</label>
                   <input type="text" value={siteConfig.phone} onChange={(e) => setSiteConfig({...siteConfig, phone: e.target.value})} className="w-full border p-2 rounded" />
                 </div>
                 <div>
                   <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Email</label>
                   <input type="text" value={siteConfig.email} onChange={(e) => setSiteConfig({...siteConfig, email: e.target.value})} className="w-full border p-2 rounded" />
                 </div>
              </div>

              {/* About Image */}
              <div className="border-t pt-6">
                 <h3 className="font-medium text-gray-900 mb-3">About Section Image</h3>
                 <div className="flex gap-2">
                    <input type="text" value={siteConfig.aboutImage} onChange={(e) => setSiteConfig({...siteConfig, aboutImage: e.target.value})} className="flex-1 border p-2 rounded" />
                    <label className="cursor-pointer bg-gray-100 border p-2 rounded hover:bg-gray-200"><Upload className="w-5 h-5" />
                        <input type="file" className="hidden" accept="image/*" onChange={async(e) => {
                          if(e.target.files?.[0]) {
                            const url = await handleImageUpload(e.target.files[0]);
                            if(url) setSiteConfig({...siteConfig, aboutImage: url});
                          }
                        }} />
                    </label>
                 </div>
                 <img src={siteConfig.aboutImage} className="h-24 w-auto object-cover mt-2 rounded bg-gray-50" />
              </div>

              {/* Hero Slideshow */}
              <div className="border-t pt-6">
                 <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium text-gray-900">Hero Slideshow Images</h3>
                    <button onClick={addHeroImage} className="text-xs flex items-center text-blue-600 hover:text-blue-800 font-medium"><Plus className="w-3 h-3 mr-1"/> Add Slide</button>
                 </div>
                 <div className="space-y-3">
                   {siteConfig.heroImages.map((img, idx) => (
                     <div key={idx} className="flex items-center gap-2 p-2 bg-gray-50 rounded border border-gray-100">
                       <span className="text-xs text-gray-400 font-mono w-4">{idx+1}</span>
                       <img src={img} className="w-10 h-8 object-cover rounded bg-gray-200" />
                       <input type="text" value={img} onChange={(e) => updateHeroImage(idx, e.target.value)} className="flex-1 border p-1 rounded text-sm" />
                       <label className="cursor-pointer p-1 hover:bg-gray-200 rounded text-gray-500"><Upload className="w-4 h-4" />
                          <input type="file" className="hidden" accept="image/*" onChange={async(e) => {
                            if(e.target.files?.[0]) {
                              const url = await handleImageUpload(e.target.files[0]);
                              if(url) updateHeroImage(idx, url);
                            }
                          }} />
                       </label>
                       <button onClick={() => removeHeroImage(idx)} className="p-1 hover:bg-red-100 text-red-500 rounded"><Trash2 className="w-4 h-4" /></button>
                     </div>
                   ))}
                 </div>
              </div>

              <div className="pt-4">
                 <button onClick={handleSaveSettings} className="w-full md:w-auto bg-orange-600 text-white px-6 py-3 rounded shadow hover:bg-orange-700 font-medium flex items-center justify-center">
                   <Save className="w-4 h-4 mr-2" /> Save Configuration
                 </button>
              </div>
            </div>
          </div>
        )}

        {/* --- STAFF TAB --- */}
        {activeTab === 'staff' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             <div className="bg-white p-6 rounded-xl shadow-sm h-fit border border-gray-200">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center justify-between">
                <span className="flex items-center">{editingStaffId ? <Edit2 className="w-5 h-5 mr-2 text-orange-600" /> : <Plus className="w-5 h-5 mr-2 text-orange-600" />} {editingStaffId ? 'Edit Staff' : 'Add Staff Member'}</span>
                {editingStaffId && <button onClick={() => {setEditingStaffId(null); setNewStaff({ nameEn: '', nameHi: '', designationEn: '', designationHi: '', subjectEn: '', subjectHi: '', photo: '' })}} className="text-xs text-red-500 hover:underline flex items-center"><X className="w-3 h-3 mr-1" /> Cancel</button>}
              </h2>
              <form onSubmit={handleSaveStaff} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <input required placeholder="Name (En)" type="text" value={newStaff.nameEn} onChange={e => setNewStaff({...newStaff, nameEn: e.target.value})} className="w-full rounded-md border-gray-300 border p-2 text-sm" />
                  <input required placeholder="Name (Hi)" type="text" value={newStaff.nameHi} onChange={e => setNewStaff({...newStaff, nameHi: e.target.value})} className="w-full rounded-md border-gray-300 border p-2 text-sm" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input required placeholder="Designation (En)" type="text" value={newStaff.designationEn} onChange={e => setNewStaff({...newStaff, designationEn: e.target.value})} className="w-full rounded-md border-gray-300 border p-2 text-sm" />
                  <input required placeholder="Designation (Hi)" type="text" value={newStaff.designationHi} onChange={e => setNewStaff({...newStaff, designationHi: e.target.value})} className="w-full rounded-md border-gray-300 border p-2 text-sm" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input required placeholder="Subject (En)" type="text" value={newStaff.subjectEn} onChange={e => setNewStaff({...newStaff, subjectEn: e.target.value})} className="w-full rounded-md border-gray-300 border p-2 text-sm" />
                  <input required placeholder="Subject (Hi)" type="text" value={newStaff.subjectHi} onChange={e => setNewStaff({...newStaff, subjectHi: e.target.value})} className="w-full rounded-md border-gray-300 border p-2 text-sm" />
                </div>
                
                <div className="pt-2 border-t border-gray-100">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Photo URL or Upload</label>
                  <div className="flex gap-2">
                    <input type="text" value={newStaff.photo} onChange={e => setNewStaff({...newStaff, photo: e.target.value})} placeholder="https://..." className="flex-1 rounded-md border-gray-300 border p-2 text-sm" />
                    <label className={`cursor-pointer bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-md px-3 py-2 flex items-center ${uploading ? 'opacity-50 cursor-wait' : ''}`}>
                      <Upload className="w-4 h-4 text-gray-600" />
                      <input type="file" className="hidden" accept="image/*" disabled={uploading} onChange={async (e) => {
                        if(e.target.files?.[0]) {
                           const url = await handleImageUpload(e.target.files[0]);
                           if(url) {
                              setNewStaff(prev => ({...prev, photo: url}));
                           }
                        }
                      }} />
                    </label>
                  </div>
                </div>

                <button type="submit" className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 mt-2">
                  <Save className="w-4 h-4 mr-2" /> {editingStaffId ? 'Update Staff' : 'Add Staff'}
                </button>
              </form>
             </div>
             <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Photo</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {staff.map((s) => (
                      <tr key={s.id} className={editingStaffId === s.id ? 'bg-orange-50' : ''}>
                        <td className="px-6 py-4 whitespace-nowrap">
                           {s.photo ? <img src={s.photo} className="w-8 h-8 rounded-full object-cover" /> : <div className="w-8 h-8 bg-gray-200 rounded-full"></div>}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{s.name.en}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button onClick={() => handleEditStaff(s.id)} className="text-blue-600 hover:text-blue-900 mr-3"><Edit2 className="w-4 h-4" /></button>
                          <button onClick={() => handleDeleteStaff(s.id)} className="text-red-600 hover:text-red-900"><Trash2 className="w-4 h-4" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
          </div>
        )}

        {/* --- EVENTS TAB --- */}
        {activeTab === 'events' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm h-fit border border-gray-200">
               <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center justify-between">
                <span className="flex items-center">{editingEventIndex !== null ? <Edit2 className="w-5 h-5 mr-2 text-orange-600" /> : <Plus className="w-5 h-5 mr-2 text-orange-600" />} {editingEventIndex !== null ? 'Edit Event' : 'Add New Event'}</span>
                {editingEventIndex !== null && <button onClick={() => {setEditingEventIndex(null); setNewEvent({ titleEn: '', titleHi: '', descEn: '', descHi: '', img: '' })}} className="text-xs text-red-500 hover:underline flex items-center"><X className="w-3 h-3 mr-1" /> Cancel</button>}
              </h2>
              <form onSubmit={handleSaveEvent} className="space-y-4">
                <input required placeholder="Title (En)" type="text" value={newEvent.titleEn} onChange={e => setNewEvent({...newEvent, titleEn: e.target.value})} className="w-full rounded-md border-gray-300 border p-2" />
                <input required placeholder="Title (Hi)" type="text" value={newEvent.titleHi} onChange={e => setNewEvent({...newEvent, titleHi: e.target.value})} className="w-full rounded-md border-gray-300 border p-2" />
                <textarea required placeholder="Description (En)" rows={2} value={newEvent.descEn} onChange={e => setNewEvent({...newEvent, descEn: e.target.value})} className="w-full rounded-md border-gray-300 border p-2" />
                <textarea required placeholder="Description (Hi)" rows={2} value={newEvent.descHi} onChange={e => setNewEvent({...newEvent, descHi: e.target.value})} className="w-full rounded-md border-gray-300 border p-2" />
                
                <div className="flex gap-2">
                    <input type="text" value={newEvent.img} onChange={e => setNewEvent({...newEvent, img: e.target.value})} placeholder="Image URL" className="flex-1 rounded-md border-gray-300 border p-2 text-sm" />
                    <label className={`cursor-pointer bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-md px-3 py-2 flex items-center ${uploading ? 'opacity-50 cursor-wait' : ''}`}>
                      <Upload className="w-4 h-4 text-gray-600" />
                      <input type="file" className="hidden" accept="image/*" disabled={uploading} onChange={async (e) => {
                        if(e.target.files?.[0]) {
                           const url = await handleImageUpload(e.target.files[0]);
                           if(url) {
                              setNewEvent(prev => ({...prev, img: url}));
                           }
                        }
                      }} />
                    </label>
                </div>

                <button type="submit" className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700">
                  <Save className="w-4 h-4 mr-2" /> {editingEventIndex !== null ? 'Update Event' : 'Save Event'}
                </button>
              </form>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {events.map((event, idx) => (
                <div key={idx} className={`bg-white rounded-lg shadow-sm border transition-all flex flex-col ${editingEventIndex === idx ? 'border-orange-500 ring-2 ring-orange-200' : 'border-gray-200'}`}>
                  <div className="relative h-32"><img src={event.img} alt="Event" className="h-full w-full object-cover rounded-t-lg" /></div>
                  <div className="p-4 flex-1"><h3 className="font-bold text-gray-800 line-clamp-1">{event.title.en}</h3></div>
                  <div className="bg-gray-50 p-3 border-t border-gray-100 flex justify-between items-center">
                    <button onClick={() => handleEditEvent(idx)} className="text-blue-600 hover:text-blue-800 text-sm flex items-center font-medium"><Edit2 className="w-3 h-3 mr-1" /> Edit</button>
                    <button onClick={() => handleDeleteEvent(idx)} className="text-red-600 hover:text-red-800 text-sm flex items-center font-medium"><Trash2 className="w-3 h-3 mr-1" /> Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- RESULTS TAB --- */}
        {activeTab === 'results' && (
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             <div className="bg-white p-6 rounded-xl shadow-sm h-fit border border-gray-200">
               <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center justify-between">
                <span className="flex items-center">{editingResultYear ? <Edit2 className="w-5 h-5 mr-2 text-orange-600" /> : <Plus className="w-5 h-5 mr-2 text-orange-600" />} {editingResultYear ? `Edit ${editingResultYear}` : 'Add Result'}</span>
                {editingResultYear && <button onClick={() => {setEditingResultYear(null); setNewResult({ year: '', class10Total: '', class10Pass: '', class10Percent: '', class12Total: '', class12Pass: '', class12Percent: '' });}} className="text-xs text-red-500 hover:underline flex items-center"><X className="w-3 h-3 mr-1" /> Cancel</button>}
              </h2>
              <form onSubmit={handleSaveResult} className="space-y-4">
                 <input required type="text" value={newResult.year} onChange={e => setNewResult({...newResult, year: e.target.value})} disabled={!!editingResultYear} placeholder="Year (2024-25)" className="w-full rounded-md border-gray-300 border p-2 bg-gray-50" />
                 <div className="border-t border-gray-100 pt-4">
                  <h3 className="text-sm font-bold text-gray-900 mb-2">Class 10</h3>
                  <div className="grid grid-cols-3 gap-2">
                    <input required placeholder="Total" type="number" value={newResult.class10Total} onChange={e => setNewResult({...newResult, class10Total: e.target.value})} className="border p-2 rounded text-sm" />
                    <input required placeholder="Pass" type="number" value={newResult.class10Pass} onChange={e => setNewResult({...newResult, class10Pass: e.target.value})} className="border p-2 rounded text-sm" />
                    <input required placeholder="%" type="number" step="0.01" value={newResult.class10Percent} onChange={e => setNewResult({...newResult, class10Percent: e.target.value})} className="border p-2 rounded text-sm" />
                  </div>
                </div>
                <div className="border-t border-gray-100 pt-4">
                  <h3 className="text-sm font-bold text-gray-900 mb-2">Class 12</h3>
                  <div className="grid grid-cols-3 gap-2">
                    <input required placeholder="Total" type="number" value={newResult.class12Total} onChange={e => setNewResult({...newResult, class12Total: e.target.value})} className="border p-2 rounded text-sm" />
                    <input required placeholder="Pass" type="number" value={newResult.class12Pass} onChange={e => setNewResult({...newResult, class12Pass: e.target.value})} className="border p-2 rounded text-sm" />
                    <input required placeholder="%" type="number" step="0.01" value={newResult.class12Percent} onChange={e => setNewResult({...newResult, class12Percent: e.target.value})} className="border p-2 rounded text-sm" />
                  </div>
                </div>
                <button type="submit" className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700">
                  <Save className="w-4 h-4 mr-2" /> Save Result
                </button>
              </form>
             </div>
             <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Year</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">10th %</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">12th %</th><th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Action</th></tr></thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {examResults.slice().reverse().map((res) => (
                      <tr key={res.year} className={editingResultYear === res.year ? 'bg-orange-50' : ''}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{res.year}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{res.class10.passPercentage}%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{res.class12.passPercentage}%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button onClick={() => handleEditResult(res.year)} className="text-blue-600 hover:text-blue-900 mr-3"><Edit2 className="w-4 h-4" /></button>
                          <button onClick={() => handleDeleteResult(res.year)} className="text-red-600 hover:text-red-900"><Trash2 className="w-4 h-4" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
           </div>
        )}

        {/* --- NEWS TAB --- */}
        {activeTab === 'news' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             <div className="bg-white p-6 rounded-xl shadow-sm h-fit border border-gray-200">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center justify-between">
                <span className="flex items-center">{editingNewsId ? <Edit2 className="w-5 h-5 mr-2 text-orange-600" /> : <Plus className="w-5 h-5 mr-2 text-orange-600" />} {editingNewsId ? 'Edit News' : 'Add News'}</span>
                {editingNewsId && <button onClick={() => {setEditingNewsId(null); setNewNews({ textEn: '', textHi: '', contentEn: '', contentHi: '', image: '', date: '' });}} className="text-xs text-red-500 hover:underline flex items-center"><X className="w-3 h-3 mr-1" /> Cancel</button>}
              </h2>
              <form onSubmit={handleSaveNews} className="space-y-4">
                <input required placeholder="Headline (En)" type="text" value={newNews.textEn} onChange={e => setNewNews({...newNews, textEn: e.target.value})} className="w-full rounded-md border-gray-300 border p-2" />
                <input required placeholder="Headline (Hi)" type="text" value={newNews.textHi} onChange={e => setNewNews({...newNews, textHi: e.target.value})} className="w-full rounded-md border-gray-300 border p-2" />
                <textarea placeholder="Content (En)" rows={3} value={newNews.contentEn} onChange={e => setNewNews({...newNews, contentEn: e.target.value})} className="w-full rounded-md border-gray-300 border p-2" />
                <textarea placeholder="Content (Hi)" rows={3} value={newNews.contentHi} onChange={e => setNewNews({...newNews, contentHi: e.target.value})} className="w-full rounded-md border-gray-300 border p-2" />
                
                 <div className="flex gap-2">
                    <input type="text" value={newNews.image} onChange={e => setNewNews({...newNews, image: e.target.value})} placeholder="Image URL" className="flex-1 rounded-md border-gray-300 border p-2 text-sm" />
                    <label className={`cursor-pointer bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-md px-3 py-2 flex items-center ${uploading ? 'opacity-50 cursor-wait' : ''}`}>
                      <Upload className="w-4 h-4 text-gray-600" />
                      <input type="file" className="hidden" accept="image/*" disabled={uploading} onChange={async (e) => {
                        if(e.target.files?.[0]) {
                           const url = await handleImageUpload(e.target.files[0]);
                           if(url) {
                              setNewNews(prev => ({...prev, image: url}));
                           }
                        }
                      }} />
                    </label>
                </div>
                
                <input required type="date" value={newNews.date} onChange={e => setNewNews({...newNews, date: e.target.value})} className="w-full rounded-md border-gray-300 border p-2" />
                <button type="submit" className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700">
                  <Save className="w-4 h-4 mr-2" /> {editingNewsId ? 'Update News' : 'Add News'}
                </button>
              </form>
             </div>
             <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Headline</th><th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Action</th></tr></thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {news.map((n) => (
                      <tr key={n.id} className={editingNewsId === n.id ? 'bg-orange-50' : ''}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{n.date}</td>
                        <td className="px-6 py-4 text-sm text-gray-900"><div className="font-medium">{n.text.en}</div></td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button onClick={() => handleEditNews(n.id)} className="text-blue-600 hover:text-blue-900 mr-3"><Edit2 className="w-4 h-4" /></button>
                          <button onClick={() => handleDeleteNews(n.id)} className="text-red-600 hover:text-red-900"><Trash2 className="w-4 h-4" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
          </div>
        )}

        {/* --- FACILITIES TAB --- */}
        {activeTab === 'facilities' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm h-fit border border-gray-200">
               <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center justify-between">
                <span className="flex items-center">{editingFacilityId ? <Edit2 className="w-5 h-5 mr-2 text-orange-600" /> : <Plus className="w-5 h-5 mr-2 text-orange-600" />} {editingFacilityId ? 'Edit Facility' : 'Add Facility'}</span>
                {editingFacilityId && <button onClick={() => {setEditingFacilityId(null); setNewFacility({ titleEn: '', titleHi: '', descEn: '', descHi: '', image: '' })}} className="text-xs text-red-500 hover:underline flex items-center"><X className="w-3 h-3 mr-1" /> Cancel</button>}
              </h2>
              <form onSubmit={handleSaveFacility} className="space-y-4">
                <input required placeholder="Title (En)" type="text" value={newFacility.titleEn} onChange={e => setNewFacility({...newFacility, titleEn: e.target.value})} className="w-full rounded-md border-gray-300 border p-2" />
                <input required placeholder="Title (Hi)" type="text" value={newFacility.titleHi} onChange={e => setNewFacility({...newFacility, titleHi: e.target.value})} className="w-full rounded-md border-gray-300 border p-2" />
                <textarea required placeholder="Description (En)" rows={2} value={newFacility.descEn} onChange={e => setNewFacility({...newFacility, descEn: e.target.value})} className="w-full rounded-md border-gray-300 border p-2" />
                <textarea required placeholder="Description (Hi)" rows={2} value={newFacility.descHi} onChange={e => setNewFacility({...newFacility, descHi: e.target.value})} className="w-full rounded-md border-gray-300 border p-2" />
                
                <div className="flex gap-2">
                    <input type="text" value={newFacility.image} onChange={e => setNewFacility({...newFacility, image: e.target.value})} placeholder="Image URL" className="flex-1 rounded-md border-gray-300 border p-2 text-sm" />
                    <label className={`cursor-pointer bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-md px-3 py-2 flex items-center ${uploading ? 'opacity-50 cursor-wait' : ''}`}>
                      <Upload className="w-4 h-4 text-gray-600" />
                      <input type="file" className="hidden" accept="image/*" disabled={uploading} onChange={async (e) => {
                        if(e.target.files?.[0]) {
                           const url = await handleImageUpload(e.target.files[0]);
                           if(url) {
                             setNewFacility(prev => ({...prev, image: url}));
                           }
                        }
                      }} />
                    </label>
                </div>

                <button type="submit" className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700">
                  <Save className="w-4 h-4 mr-2" /> {editingFacilityId ? 'Update Facility' : 'Save Facility'}
                </button>
              </form>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {facilities.map((fac, idx) => (
                <div key={idx} className={`bg-white rounded-lg shadow-sm border transition-all flex flex-col ${editingFacilityId === fac.id ? 'border-orange-500 ring-2 ring-orange-200' : 'border-gray-200'}`}>
                  <div className="relative h-32"><img src={fac.image} alt="Facility" className="h-full w-full object-cover rounded-t-lg" /></div>
                  <div className="p-4 flex-1"><h3 className="font-bold text-gray-800 line-clamp-1">{fac.title.en}</h3></div>
                  <div className="bg-gray-50 p-3 border-t border-gray-100 flex justify-between items-center">
                    <button onClick={() => handleEditFacility(fac.id!)} className="text-blue-600 hover:text-blue-800 text-sm flex items-center font-medium"><Edit2 className="w-3 h-3 mr-1" /> Edit</button>
                    <button onClick={() => handleDeleteFacility(fac.id!)} className="text-red-600 hover:text-red-800 text-sm flex items-center font-medium"><Trash2 className="w-3 h-3 mr-1" /> Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- MEDIA TAB --- */}
        {activeTab === 'media' && (
          <div className="space-y-8">
            {/* Global Uploader */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-orange-200 bg-orange-50/30">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center"><Upload className="w-5 h-5 mr-2 text-orange-600" /> Global Image Uploader & Library</h2>
              <p className="text-sm text-gray-600 mb-4">Upload new images here. Below is your image library where you can view, copy links, rename, or delete images.</p>
              
              <div className="flex flex-col md:flex-row gap-4 items-start">
                 <div className="flex-1 w-full">
                    <label className={`w-full flex flex-col items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-white hover:bg-gray-50 transition-colors ${uploading ? 'opacity-50 cursor-wait' : ''}`}>
                       <div className="flex flex-col items-center justify-center pt-5 pb-6">
                           <Upload className="w-8 h-8 text-gray-400 mb-2" />
                           <p className="text-sm text-gray-500">{uploading ? 'Uploading...' : 'Click to upload image'}</p>
                       </div>
                       <input type="file" className="hidden" accept="image/*" disabled={uploading} onChange={async (e) => {
                          if(e.target.files?.[0]) {
                            const url = await handleImageUpload(e.target.files[0]);
                            if(url) {
                              setGlobalUploadUrl(url);
                              fetchGalleryImages(); // Auto refresh gallery
                            }
                          }
                       }} />
                    </label>
                 </div>
                 
                 {globalUploadUrl && (
                   <div className="flex-1 w-full bg-white p-4 rounded-lg border border-green-200">
                      <p className="text-xs font-bold text-green-700 mb-2 uppercase tracking-wide">Upload Successful!</p>
                      <div className="flex gap-2">
                         <input type="text" readOnly value={globalUploadUrl} className="flex-1 bg-gray-50 border border-gray-200 rounded p-2 text-sm text-gray-600" />
                         <button onClick={() => copyToClipboard(globalUploadUrl)} className={`p-2 rounded border transition-colors ${copied ? 'bg-green-100 text-green-700 border-green-200' : 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200'}`}>
                           {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                         </button>
                      </div>
                      <div className="mt-2 h-16 w-16 rounded overflow-hidden border border-gray-200">
                        <img src={globalUploadUrl} alt="Uploaded" className="w-full h-full object-cover" />
                      </div>
                   </div>
                 )}
              </div>
            </div>

            {/* Gallery Grid */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-bold text-gray-900 flex items-center"><ImageIcon className="w-5 h-5 mr-2 text-orange-600" /> Image Library</h2>
                    <button onClick={fetchGalleryImages} className="text-sm text-blue-600 hover:underline flex items-center bg-blue-50 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors">
                      {loadingGallery ? <Loader className="w-3 h-3 mr-1 animate-spin" /> : <RefreshCw className="w-3 h-3 mr-1"/>} 
                      Refresh
                    </button>
                </div>

                {loadingGallery && galleryImages.length === 0 ? (
                  <div className="text-center py-12 text-gray-500"><Loader className="w-8 h-8 animate-spin mx-auto mb-2 text-orange-500" /> Loading library...</div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {galleryImages.map((img) => (
                          <div key={img.name} className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all">
                              <div className="aspect-square bg-gray-100 relative overflow-hidden">
                                  <img src={img.url} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                      <button onClick={() => copyToClipboard(img.url)} className="p-2 bg-white rounded-full hover:bg-gray-100 text-gray-800 transition-colors" title="Copy Link"><Copy className="w-4 h-4"/></button>
                                      <button onClick={() => handleRenameImage(img.name)} className="p-2 bg-white rounded-full hover:bg-blue-50 text-blue-600 transition-colors" title="Rename"><Edit2 className="w-4 h-4"/></button>
                                      <button onClick={() => handleDeleteImage(img.name)} className="p-2 bg-white rounded-full hover:bg-red-50 text-red-600 transition-colors" title="Delete"><Trash2 className="w-4 h-4"/></button>
                                  </div>
                              </div>
                              <div className="p-2 bg-white border-t border-gray-100">
                                <p className="text-xs text-gray-500 truncate font-mono select-all" title={img.name}>{img.name}</p>
                              </div>
                          </div>
                      ))}
                      {galleryImages.length === 0 && !loadingGallery && (
                        <div className="col-span-full text-center py-12 text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
                          No images found in library. Upload one above.
                        </div>
                      )}
                  </div>
                )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;