import React from 'react';
import { SCHOOL_NAME_ENGLISH, SCHOOL_NAME_HINDI, ADDRESS, DEPARTMENT } from '../constants';
import { MapPin, Phone, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* School Info */}
          <div>
            <h3 className="text-lg font-bold text-orange-400 mb-2">{SCHOOL_NAME_ENGLISH}</h3>
            <h4 className="text-sm font-semibold text-gray-300 mb-4">{SCHOOL_NAME_HINDI}</h4>
            <p className="text-gray-400 text-sm mb-4">
              A government initiative dedicated to providing quality education and holistic development for students from underprivileged backgrounds.
            </p>
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
               <span className="bg-green-700 text-xs px-2 py-1 rounded text-white">{DEPARTMENT}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#home" className="hover:text-orange-400 transition">Home</a></li>
              <li><a href="#about" className="hover:text-orange-400 transition">About Us</a></li>
              <li><a href="#facilities" className="hover:text-orange-400 transition">Facilities</a></li>
              <li><a href="#results" className="hover:text-orange-400 transition">Academic Results</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>{ADDRESS}</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0" />
                <span>+91 123 456 7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0" />
                <span>contact@rapv-saharanpur.in</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Rajkiya Ashram Paddhati Vidyalaya. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;