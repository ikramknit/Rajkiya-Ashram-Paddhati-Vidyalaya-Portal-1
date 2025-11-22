import React, { useState } from 'react';
import { Menu, X, GraduationCap, Globe } from 'lucide-react';
import { SCHOOL_NAME, UI_LABELS } from '../constants';
import type { Language } from '../types';

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
}

const Navbar: React.FC<NavbarProps> = ({ lang, setLang }) => {
  const [isOpen, setIsOpen] = useState(false);

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
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center gap-2">
              <div className="bg-orange-600 p-2 rounded-full">
                 <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-tight text-gray-800 tracking-tight md:text-xl">
                  {SCHOOL_NAME[lang]}
                </span>
                <span className="text-xs text-gray-500 font-medium">Saharanpur, Uttar Pradesh</span>
              </div>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-orange-600 px-2 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-3 py-1 rounded-full border border-orange-200 text-orange-600 hover:bg-orange-50 transition-colors text-sm font-semibold"
            >
              <Globe className="w-4 h-4" />
              {lang === 'en' ? 'हिंदी' : 'English'}
            </button>
          </div>

          <div className="flex items-center md:hidden gap-4">
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-3 py-1 rounded-full border border-orange-200 text-orange-600 hover:bg-orange-50 transition-colors text-sm font-semibold"
            >
              {lang === 'en' ? 'हिंदी' : 'Eng'}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-orange-600 block px-3 py-2 rounded-md text-base font-medium"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
