import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaBars, FaTimes } from 'react-icons/fa';
import { BusinessData } from '../types';

interface HeaderProps {
  business: BusinessData;
}

const Header: React.FC<HeaderProps> = ({ business }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Create a branded logo name from business name
  const logoName = business.business_name?.split(' ')[0] || 'HVAC';
  
  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <motion.div 
          className="flex items-center" 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={`w-10 h-10 rounded-md flex items-center justify-center mr-2 ${
            isScrolled ? 'bg-primary-600' : 'bg-white'
          }`}>
            <span className={`text-xl font-bold ${
              isScrolled ? 'text-white' : 'text-primary-600'
            }`}>
              {logoName.charAt(0)}
            </span>
          </div>
          <div>
            <h1 className={`font-heading font-bold text-lg md:text-xl transition-colors ${
              isScrolled ? 'text-gray-800' : 'text-white'
            }`}>
              {logoName}
              <span className="text-primary-500">Pro</span>
            </h1>
            <p className={`text-xs transition-colors ${
              isScrolled ? 'text-gray-600' : 'text-gray-200'
            }`}>
              HVAC Professionals
            </p>
          </div>
        </motion.div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <motion.ul 
            className="flex space-x-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {['Home', 'About', 'Services', 'Reviews', 'Contact'].map((item) => (
              <li key={item}>
                <a 
                  href={`#${item.toLowerCase()}`}
                  className={`font-medium transition-colors hover:text-primary-500 ${
                    isScrolled ? 'text-gray-700' : 'text-white'
                  }`}
                >
                  {item}
                </a>
              </li>
            ))}
          </motion.ul>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center"
          >
            <a 
              href={`tel:${business.phone}`}
              className="btn-primary flex items-center"
            >
              <FaPhone className="mr-2" />
              <span className="hidden lg:inline">Call Now</span>
            </a>
          </motion.div>
        </nav>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`p-2 rounded focus:outline-none ${
              isScrolled ? 'text-gray-800' : 'text-white'
            }`}
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white shadow-lg"
        >
          <div className="container-custom py-4">
            <ul className="space-y-4">
              {['Home', 'About', 'Services', 'Reviews', 'Contact'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`}
                    className="block font-medium text-gray-800 hover:text-primary-500"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
            
            <div className="mt-6 flex flex-col space-y-3">
              <a 
                href={`tel:${business.phone}`}
                className="btn-primary justify-center"
              >
                <FaPhone className="mr-2" />
                Call Now
              </a>
              
              {business.email_1 && (
                <a 
                  href={`mailto:${business.email_1}`}
                  className="btn-outline justify-center"
                >
                  <FaEnvelope className="mr-2" />
                  Email Us
                </a>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;