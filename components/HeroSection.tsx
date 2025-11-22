import React, { useState, useEffect } from 'react';
import type { Language, SiteConfig } from '../types';
import { UI_LABELS } from '../constants';

interface HeroSectionProps {
  lang: Language;
  config: SiteConfig;
}

const HeroSection: React.FC<HeroSectionProps> = ({ lang, config }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = config.heroImages && config.heroImages.length > 0 
    ? config.heroImages 
    : ["https://picsum.photos/id/202/1920/1080"];

  useEffect(() => {
    if (images.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div id="home" className="relative bg-gray-900 text-white overflow-hidden">
      {/* Slideshow Background */}
      <div className="absolute inset-0 w-full h-full">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? 'opacity-40' : 'opacity-0'
            }`}
          >
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/90"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-48 flex flex-col items-center text-center">
        <h2 className="text-orange-400 font-semibold tracking-wider uppercase text-sm md:text-base mb-4 animate-fade-in-up">
          {config.subTitle[lang]}
        </h2>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 font-serif leading-tight animate-fade-in-up delay-100 drop-shadow-lg">
          {lang === 'en' ? config.schoolName.hi : config.schoolName.en} <br />
          <span className="text-2xl md:text-4xl lg:text-5xl mt-2 block text-gray-100 font-sans">
            {config.schoolName[lang]}
          </span>
        </h1>
        <p className="max-w-2xl text-lg text-gray-300 mb-8 animate-fade-in-up delay-200 drop-shadow">
          {UI_LABELS.govtInitiative[lang]}
        </p>
        <a
          href="#about"
          className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-orange-500/30 animate-fade-in-up delay-300"
        >
          {UI_LABELS.discoverMore[lang]}
        </a>

        {/* Slider Indicators */}
        {images.length > 1 && (
            <div className="absolute bottom-8 flex space-x-2">
                {images.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${currentImageIndex === idx ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/80'}`}
                    />
                ))}
            </div>
        )}
      </div>
    </div>
  );
};

export default HeroSection;