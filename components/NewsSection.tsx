import React, { useState } from 'react';
import { Bell, Calendar, X, ChevronRight, Megaphone, ExternalLink } from 'lucide-react';
import type { Language, NewsItem } from '../types';
import { UI_LABELS } from '../constants';

interface NewsSectionProps {
  lang: Language;
  news: NewsItem[];
}

const NewsSection: React.FC<NewsSectionProps> = ({ lang, news }) => {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  // If no news, don't render
  if (!news.length) return null;

  // Helper to check if news is recent (within 7 days)
  const isNew = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 15; // Consider "New" if within 15 days
  };

  // Duplicate news items to create seamless scrolling effect
  // Only duplicate if we have enough items to scroll, otherwise just show them static
  const shouldScroll = news.length > 2;
  const displayNews = shouldScroll ? [...news, ...news, ...news] : news;

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-12 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Static Info Card / Header */}
          <div className="lg:w-1/3 w-full">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 h-full relative">
              <div className="bg-orange-600 p-6 text-white">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                    <Megaphone className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight">{UI_LABELS.news[lang]}</h2>
                </div>
                <p className="text-orange-100 text-sm leading-relaxed">
                  {lang === 'en' 
                    ? "Keep up with the latest announcements, circulars, and upcoming events at our Vidyalaya." 
                    : "हमारे विद्यालय में नवीनतम घोषणाओं, परिपत्रों और आगामी कार्यक्रमों से अपडेट रहें।"}
                </p>
              </div>
              
              <div className="p-6">
                <div className="flex items-start gap-4 mb-6">
                  <div className="bg-blue-50 p-3 rounded-full text-blue-600">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {lang === 'en' ? "Academic Calendar" : "शैक्षणिक कैलेंडर"}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {lang === 'en' ? "Check important dates for exams and holidays." : "परीक्षाओं और छुट्टियों की महत्वपूर्ण तिथियां देखें।"}
                    </p>
                  </div>
                </div>
                
                <div className="border-t border-gray-100 pt-6">
                   <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
                     {lang === 'en' ? "Quick Highlights" : "मुख्य आकर्षण"}
                   </h4>
                   <ul className="space-y-3">
                     {news.slice(0, 3).map((item, i) => (
                       <li key={i} className="flex items-center text-sm text-gray-600">
                         <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>
                         <span className="truncate">{item.text[lang]}</span>
                       </li>
                     ))}
                   </ul>
                </div>
              </div>

              {/* Decorative circle */}
              <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-orange-50 rounded-full z-0"></div>
            </div>
          </div>

          {/* Scrolling List */}
          <div className="lg:w-2/3 w-full bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden flex flex-col h-[500px]">
            <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
              <h3 className="font-bold text-gray-700 flex items-center gap-2">
                <Bell className="w-4 h-4 text-orange-500" />
                {lang === 'en' ? "Notice Board" : "सूचना पट्ट"}
              </h3>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full flex items-center">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1 animate-pulse"></span>
                Live Updates
              </span>
            </div>
            
            <div className="flex-1 overflow-hidden relative bg-white">
               <div className={`${shouldScroll ? 'animate-vertical-scroll hover:[animation-play-state:paused]' : ''} absolute w-full`}>
                {displayNews.map((item, index) => (
                  <div 
                    key={`${item.id}-${index}`}
                    onClick={() => setSelectedNews(item)}
                    className="group p-5 border-b border-gray-50 hover:bg-orange-50/50 transition-all cursor-pointer flex gap-4 relative overflow-hidden"
                  >
                    {/* Left Accent Bar on Hover */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-200"></div>

                    {/* Date Box */}
                    <div className="flex-shrink-0 flex flex-col items-center justify-center bg-gray-100 rounded-lg w-16 h-16 text-gray-600 group-hover:bg-white group-hover:shadow-md transition-all border border-gray-200">
                      <span className="text-xs font-bold uppercase">{new Date(item.date).toLocaleString('default', { month: 'short' })}</span>
                      <span className="text-xl font-bold text-gray-800">{new Date(item.date).getDate()}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 pt-1">
                      <div className="flex items-center gap-2 mb-1">
                        {isNew(item.date) && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-red-100 text-red-600 animate-pulse">
                            NEW
                          </span>
                        )}
                        <h4 className="text-base font-bold text-gray-800 group-hover:text-orange-700 transition-colors truncate">
                          {item.text[lang]}
                        </h4>
                      </div>
                      <p className="text-sm text-gray-500 line-clamp-2 group-hover:text-gray-700">
                        {item.content ? item.content[lang] : item.text[lang]}
                      </p>
                    </div>

                    {/* Arrow */}
                    <div className="flex-shrink-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                      <div className="bg-white p-2 rounded-full shadow-sm text-orange-500">
                         <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Gradients for visual cue of scrolling */}
              {shouldScroll && (
                <>
                  <div className="absolute top-0 left-0 w-full h-6 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none"></div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* News Modal */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden max-h-[90vh] flex flex-col relative animate-in slide-in-from-bottom-10 duration-300">
            
            {/* Header Image */}
            <div className="relative h-64 w-full bg-gray-900">
              {selectedNews.image ? (
                <>
                  <img 
                    src={selectedNews.image} 
                    alt={selectedNews.text[lang]} 
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-orange-500">
                  <Megaphone className="w-16 h-16 text-white opacity-20" />
                </div>
              )}
              
              <button 
                onClick={() => setSelectedNews(null)}
                className="absolute top-4 right-4 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-md transition-colors z-20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-0 left-0 p-8 w-full">
                 <div className="flex items-center gap-3 mb-2">
                   <span className="bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                     {lang === 'en' ? 'Update' : 'अपडेट'}
                   </span>
                   <span className="text-gray-300 text-sm flex items-center gap-1">
                     <Calendar className="w-4 h-4" /> {selectedNews.date}
                   </span>
                 </div>
                 <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight drop-shadow-md">
                   {selectedNews.text[lang]}
                 </h3>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-8 overflow-y-auto bg-white">
              <div className="prose prose-lg prose-orange max-w-none text-gray-600">
                <p className="whitespace-pre-line leading-relaxed">
                  {selectedNews.content 
                    ? selectedNews.content[lang] 
                    : (lang === 'en' ? "No detailed description available for this update." : "इस अपडेट के लिए कोई विस्तृत विवरण उपलब्ध नहीं है।")}
                </p>
              </div>

              {selectedNews.link && (
                 <div className="mt-8 pt-6 border-t border-gray-100">
                   <a 
                     href={selectedNews.link} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="inline-flex items-center gap-2 text-orange-600 font-semibold hover:text-orange-700 transition-colors group"
                   >
                     {UI_LABELS.readMore[lang]} 
                     <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                   </a>
                 </div>
              )}
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-4 flex justify-between items-center border-t border-gray-100">
              <span className="text-xs text-gray-400 italic">
                {SCHOOL_NAME[lang]} Official Update
              </span>
              <button 
                onClick={() => setSelectedNews(null)}
                className="px-5 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-medium transition-colors shadow-sm"
              >
                {UI_LABELS.close[lang]}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper variable for school name since we are inside component
const SCHOOL_NAME: any = {
  en: "Rajkiya Ashram Paddhati Vidyalaya",
  hi: "राजकीय आश्रम पद्धति विद्यालय"
};

export default NewsSection;