import React, { useState } from 'react';
import { Bell, Calendar, X, ChevronRight } from 'lucide-react';
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

  // Duplicate news items to create seamless scrolling effect
  const scrollingNews = [...news, ...news, ...news];

  return (
    <div className="bg-white border-b border-gray-200 py-8 relative z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start gap-6">
          
          {/* Header */}
          <div className="md:w-1/4 w-full flex-shrink-0 bg-orange-50 p-6 rounded-xl border-l-4 border-orange-600">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-orange-600 p-2 rounded-full text-white animate-pulse">
                <Bell className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">{UI_LABELS.news[lang]}</h2>
            </div>
            <p className="text-sm text-gray-600">
              {lang === 'en' 
                ? "Stay updated with the latest announcements, exam schedules, and school activities." 
                : "नवीनतम घोषणाओं, परीक्षा कार्यक्रमों और स्कूल गतिविधियों से अपडेट रहें।"}
            </p>
          </div>

          {/* Vertical Ticker Container */}
          <div className="md:w-3/4 w-full h-64 overflow-hidden relative bg-white rounded-xl border border-gray-100 shadow-sm">
            <div className="animate-vertical-scroll absolute w-full">
              {scrollingNews.map((item, index) => (
                <div 
                  key={`${item.id}-${index}`}
                  onClick={() => setSelectedNews(item)}
                  className="p-4 border-b border-gray-100 hover:bg-orange-50 transition-colors cursor-pointer group flex items-start gap-4"
                >
                  {/* Thumbnail (if exists) */}
                  {item.image && (
                    <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden border border-gray-200 hidden sm:block">
                      <img src={item.image} alt="News" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 group-hover:text-orange-700 transition-colors line-clamp-2">
                      {item.text[lang]}
                    </h3>
                    <div className="flex items-center mt-2 text-xs text-gray-500">
                      <Calendar className="w-3 h-3 mr-1" />
                      {item.date}
                      <span className="ml-auto flex items-center text-orange-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        {UI_LABELS.readMore[lang]} <ChevronRight className="w-3 h-3 ml-1" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Gradient overlays to smooth edges */}
            <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none"></div>
          </div>
        </div>
      </div>

      {/* News Modal */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden max-h-[90vh] flex flex-col relative animate-in zoom-in-95 duration-200">
            
            {/* Close Button */}
            <button 
              onClick={() => setSelectedNews(null)}
              className="absolute top-4 right-4 bg-white/80 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            {/* Image Header */}
            {selectedNews.image && (
              <div className="w-full h-56 sm:h-72 bg-gray-100">
                <img 
                  src={selectedNews.image} 
                  alt={selectedNews.text[lang]} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Content */}
            <div className="p-6 sm:p-8 overflow-y-auto">
              <div className="flex items-center gap-2 text-sm text-orange-600 font-semibold mb-3">
                <Calendar className="w-4 h-4" />
                <span>{UI_LABELS.postedOn[lang]}: {selectedNews.date}</span>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                {selectedNews.text[lang]}
              </h3>
              
              <div className="prose prose-orange max-w-none text-gray-600 leading-relaxed">
                <p>
                  {selectedNews.content 
                    ? selectedNews.content[lang] 
                    : (lang === 'en' ? "No detailed description available." : "कोई विस्तृत विवरण उपलब्ध नहीं है।")}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-4 flex justify-end border-t border-gray-100">
              <button 
                onClick={() => setSelectedNews(null)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg text-sm font-medium transition-colors"
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

export default NewsSection;