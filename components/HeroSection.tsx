import React, { useState, useEffect } from 'react';
import type { Language, SiteConfig } from '../types';

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
    <div id="home" className="relative bg-gray-900 overflow-hidden w-full h-screen">
      {/* Slideshow Background */}
      <div className="absolute inset-0 w-full h-full">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        {/* Subtle gradient at bottom only for slider dots visibility */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
      </div>

      {/* Slider Indicators */}
      {images.length > 1 && (
          <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2 z-10">
              {images.map((_, idx) => (
                  <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition-all shadow-sm ${currentImageIndex === idx ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/80'}`}
                      aria-label={`Go to slide ${idx + 1}`}
                  />
              ))}
          </div>
      )}
    </div>
  );
};

export default HeroSection;