import React from 'react';
import { DEPARTMENT, UI_LABELS } from '../constants';
import { MapPin, Phone, Mail, Lock } from 'lucide-react';
import type { Language, SiteConfig } from '../types';

interface FooterProps {
  lang: Language;
  onAdminClick: () => void;
  config: SiteConfig;
}

const Footer: React.FC<FooterProps> = ({ lang, onAdminClick, config }) => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* School Info */}
          <div>
            <h3 className="text-lg font-bold text-orange-400 mb-2">{config.schoolName[lang]}</h3>
            <h4 className="text-sm font-semibold text-gray-300 mb-4">{config.subTitle[lang]}</h4>
            <p className="text-gray-400 text-sm mb-4">
              {UI_LABELS.govtInitiative[lang]}
            </p>
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
               <span className="bg-green-700 text-xs px-2 py-1 rounded text-white">{DEPARTMENT[lang]}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">{UI_LABELS.quickLinks[lang]}</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#home" className="hover:text-orange-400 transition">{UI_LABELS.home[lang]}</a></li>
              <li><a href="#about" className="hover:text-orange-400 transition">{UI_LABELS.aboutUs[lang]}</a></li>
              <li><a href="#facilities" className="hover:text-orange-400 transition">{UI_LABELS.facilities[lang]}</a></li>
              <li><a href="#results" className="hover:text-orange-400 transition">{UI_LABELS.academicExcellence[lang]}</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">{UI_LABELS.contactUs[lang]}</h3>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>{config.address[lang]}</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0" />
                <span>{config.phone}</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0" />
                <span>{config.email}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} {config.schoolName[lang]}. {UI_LABELS.rightsReserved[lang]}</p>
          <button 
            onClick={onAdminClick} 
            className="flex items-center gap-1 mt-4 md:mt-0 hover:text-gray-300 transition-colors"
          >
            <Lock className="w-3 h-3" />
            Admin
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;