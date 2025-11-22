
import React, { useState, useEffect } from 'react';
import { Menu, X, GraduationCap, Globe, Lock, Phone, Mail, LogIn, ChevronRight } from 'lucide-react';
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

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
      {/* Premium Top Bar */}
      <div className="hidden lg:block bg-slate-900 text-slate-300 text-xs font-medium tracking-wide py-2.5 z-50 relative border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-6">
             <span className="flex items-center gap-2 hover:text-white transition-colors cursor-default">
               <Phone className="w-3.5 h-3.5 text-orange-500" /> {config.phone}
             </span>
             <span className="flex items-center gap-2 hover:text-white transition-colors cursor-default">
               <Mail className="w-3.5 h-3.5 text-orange-500" /> {config.email}
             </span>
          </div>
          <div className="flex items-center space-x-4">
             <span className="text-orange-500 font-bold">|</span>
             <span className="uppercase tracking-wider opacity-80 hover:opacity-100 transition-opacity cursor-default">
               {config.subTitle[lang]}
             </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav 
        className={`fixed w-full z-50 transition-all duration-500 ease-in-out ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg py-2 top-0' 
            : 'bg-white/90 backdrop-blur-sm py-4 top-0 lg:top-[37px]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            {/* Logo Section */}
            <div className="flex items-center gap-4 cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              <div className={`relative transition-all duration-500 ${scrolled ? 'scale-90' : 'scale-100'}`}>
                {config.logo ? (
                  <img src={config.logo} alt="School Logo" className="h-14 w-14 object-contain drop-shadow-md" />
                ) : (
                  <div className="bg-gradient-to-br from-orange-600 to-red-600 p-3 rounded-xl shadow-lg transform group-hover:rotate-6 transition-transform duration-300">
                     <GraduationCap className="h-8 w-8 text-white" />
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <span className={`font-serif font-bold text-slate-900 tracking-tight leading-none transition-all duration-300 ${scrolled ? 'text-lg md:text-xl' : 'text-xl md:text-2xl'}`}>
                  {lang === 'en' ? config.schoolName.en : config.schoolName.hi}
                </span>
                <span className="text-xs text-orange-600 font-bold uppercase tracking-[0.2em] mt-1 group-hover:text-orange-700 transition-colors">
                  Saharanpur
                </span>
              </div>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-8">
              <div className="flex items-center gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="relative px-3 py-2 text-sm font-semibold text-slate-600 hover:text-orange-600 transition-colors group overflow-hidden"
                  >
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                  </a>
                ))}
              </div>
              
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <button 
                  onClick={toggleLanguage}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 text-gray-700 hover:bg-orange-50 hover:text-orange-700 hover:border-orange-200 border border-transparent transition-all text-xs font-bold uppercase tracking-wide"
                >
                  <Globe className="w-3.5 h-3.5" />
                  {lang === 'en' ? 'HI' : 'EN'}
                </button>
                
                <button 
                  onClick={onLoginClick}
                  className="flex items-center gap-2 px-5 py-2 rounded-full bg-slate-900 text-white hover:bg-orange-600 transition-all duration-300 text-xs font-bold uppercase tracking-wide shadow-md hover:shadow-lg transform hover:-translate-y-0.5 group"
                >
                  <Lock className="w-3 h-3 group-hover:hidden" />
                  <LogIn className="w-3 h-3 hidden group-hover:block" />
                  Login
                </button>
              </div>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(true)}
              className="lg:hidden p-2 rounded-md text-slate-700 hover:text-orange-600 hover:bg-orange-50 transition-colors focus:outline-none"
            >
              <Menu className="w-7 h-7" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Side Drawer (Overlay) */}
      <div 
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`} 
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Side Drawer (Panel) */}
      <div 
        className={`fixed inset-y-0 right-0 z-[70] w-[300px] bg-white shadow-2xl transform transition-transform duration-300 ease-out lg:hidden flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
          <div className="font-serif font-bold text-lg tracking-wide">Menu</div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Drawer Links */}
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          {navLinks.map((link, idx) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between px-4 py-3.5 rounded-xl text-slate-700 hover:bg-orange-50 hover:text-orange-700 font-medium transition-all group"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <span className="text-base">{link.name}</span>
              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 text-orange-500 transition-opacity" />
            </a>
          ))}
        </div>

        {/* Drawer Footer (Actions) */}
        <div className="p-6 border-t border-gray-100 bg-gray-50 space-y-4">
          <button 
            onClick={() => {
              toggleLanguage();
              setIsOpen(false);
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-gray-200 bg-white text-slate-700 hover:border-orange-300 hover:text-orange-700 transition-all font-bold text-sm shadow-sm"
          >
            <Globe className="w-4 h-4" />
            Switch to {lang === 'en' ? 'Hindi' : 'English'}
          </button>
          
          <button
            onClick={() => {
              setIsOpen(false);
              onLoginClick();
            }}
            className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white px-4 py-3 rounded-xl font-bold shadow-lg active:scale-95 transition-transform hover:bg-orange-600"
          >
            <Lock className="w-4 h-4" /> Admin Login
          </button>

          <div className="text-center pt-4">
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">
              Rajkiya Ashram Paddhati Vidyalaya
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
