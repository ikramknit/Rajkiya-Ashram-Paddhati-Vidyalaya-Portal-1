import React, { useState, useEffect } from 'react';
import { Menu, X, GraduationCap, Globe, Lock, Phone, Mail, ChevronDown } from 'lucide-react';
import { UI_LABELS } from '../constants';
import type { Language, SiteConfig } from '../types';

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
  onLoginClick: () => void;
  config: SiteConfig;
}

const Navbar: React.FC<NavbarProps> = ({ lang, setLang, onLoginClick, config }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: UI_LABELS.home[lang], href: '#home' },
    { name: UI_LABELS.about[lang], href: '#about' },
    { name: UI_LABELS.facilities[lang], href: '#facilities' },
    { name: UI_LABELS.faculty[lang], href: '#faculty' },
    { name: UI_LABELS.results[lang], href: '#results' },
    { name: UI_LABELS.events[lang], href: '#events' },
  ];

  const toggleLanguage = () => {
    setLang(lang === 'en' ? 'hi' : 'en');
  };

  return (
    <>
      {/* Top Contact Bar - Hidden on mobile, visible on desktop */}
      <div className="hidden md:block bg-orange-900 text-orange-50 py-2 text-xs font-medium z-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-6">
             <span className="flex items-center gap-2">
               <Phone className="w-3.5 h-3.5 text-orange-300" /> {config.phone}
             </span>
             <span className="flex items-center gap-2">
               <Mail className="w-3.5 h-3.5 text-orange-300" /> {config.email}
             </span>
          </div>
          <div className="flex items-center space-x-4">
             <span>{config.subTitle[lang]}</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav 
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/90 backdrop-blur-md shadow-lg py-2 top-0' 
            : 'bg-white py-4 top-0 md:top-8' // Adjust top based on top bar height
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            {/* Logo Section */}
            <div className="flex items-center group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              <div className={`transition-all duration-300 ${scrolled ? 'scale-90' : 'scale-100'}`}>
                {config.logo ? (
                  <img src={config.logo} alt="School Logo" className="h-14 w-14 object-contain drop-shadow-sm" />
                ) : (
                  <div className="bg-gradient-to-br from-orange-500 to-red-600 p-2.5 rounded-lg shadow-lg transform group-hover:rotate-3 transition-transform">
                     <GraduationCap className="h-8 w-8 text-white" />
                  </div>
                )}
              </div>
              <div className="ml-3 flex flex-col">
                <span className={`font-serif font-bold text-lg leading-tight text-gray-900 tracking-wide transition-all ${scrolled ? 'md:text-lg' : 'md:text-xl'}`}>
                  {lang === 'en' ? config.schoolName.en : config.schoolName.hi}
                </span>
                <span className="text-xs text-orange-600 font-bold uppercase tracking-widest mt-0.5">Saharanpur</span>
              </div>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative group px-3 py-2 text-sm font-semibold text-gray-700 hover:text-orange-600 transition-colors"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
              
              <div className="flex items-center gap-3 ml-6 pl-6 border-l border-gray-200">
                <button 
                  onClick={toggleLanguage}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-orange-50 text-orange-700 hover:bg-orange-100 transition-all text-xs font-bold uppercase tracking-wide border border-orange-100 shadow-sm"
                >
                  <Globe className="w-3.5 h-3.5" />
                  {lang === 'en' ? 'हिंदी' : 'ENG'}
                </button>
                
                <button 
                  onClick={onLoginClick}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gray-900 text-white hover:bg-gray-800 transition-all text-xs font-bold uppercase tracking-wide shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  title="Admin Login"
                >
                  <Lock className="w-3.5 h-3.5" />
                  Login
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden gap-4">
              <button 
                onClick={toggleLanguage}
                className="flex items-center gap-1 px-2 py-1 rounded border border-orange-200 text-orange-600 bg-orange-50 text-xs font-bold"
              >
                {lang === 'en' ? 'हिंदी' : 'Eng'}
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-orange-600 hover:bg-gray-50 focus:outline-none"
              >
                {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        <div 
          className={`lg:hidden bg-white border-t border-gray-100 overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-96 opacity-100 shadow-xl' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-gray-600 hover:text-orange-600 hover:bg-orange-50 block px-3 py-3 rounded-lg text-base font-medium border-b border-gray-50 last:border-0"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 mt-2">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onLoginClick();
                }}
                className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white px-4 py-3 rounded-lg font-bold shadow-md active:scale-95 transition-transform"
              >
                <Lock className="w-4 h-4" /> Staff / Admin Login
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;