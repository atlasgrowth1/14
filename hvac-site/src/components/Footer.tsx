import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { BusinessData } from '../types';

interface FooterProps {
  business: BusinessData;
}

const Footer: React.FC<FooterProps> = ({ business }) => {
  const currentYear = new Date().getFullYear();
  
  // Logo name creation (same as header)
  const logoName = business.business_name?.split(' ')[0] || 'HVAC';
  
  // Get social media links
  const socialLinks = [
    { icon: <FaFacebook />, url: business.facebook || '#', label: 'Facebook' },
    { icon: <FaTwitter />, url: business.twitter || '#', label: 'Twitter' },
    { icon: <FaInstagram />, url: business.instagram || '#', label: 'Instagram' },
    { icon: <FaLinkedin />, url: business.linkedin || '#', label: 'LinkedIn' },
    { icon: <FaYoutube />, url: business.youtube || '#', label: 'YouTube' },
  ].filter(link => link.url !== '#');
  
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Logo and About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-md bg-primary-500 flex items-center justify-center mr-2">
                <span className="text-white text-xl font-bold">{logoName.charAt(0)}</span>
              </div>
              <h2 className="text-xl font-heading font-bold">
                {logoName}
                <span className="text-primary-400">Pro</span>
              </h2>
            </div>
            
            <p className="text-gray-400 mb-6">
              {business.subtypes || 'Professional HVAC services for residential and commercial properties. We provide quality heating, cooling, and air quality solutions.'}
            </p>
            
            {/* Social Media */}
            {socialLinks.length > 0 && (
              <div className="flex space-x-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:text-white transition-colors duration-300"
                    aria-label={link.label}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            )}
          </motion.div>
          
          {/* Column 2: Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-lg font-bold mb-6 text-white">Our Services</h3>
            <ul className="space-y-3">
              {[
                'Air Conditioning Repair',
                'Heating System Installation',
                'HVAC Maintenance',
                'Air Quality Solutions',
                'Emergency Service',
                'Commercial HVAC'
              ].map((service, index) => (
                <li key={index}>
                  <a 
                    href="#services" 
                    className="text-gray-400 hover:text-primary-400 transition-colors"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
          
          {/* Column 3: Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-bold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { label: 'About Us', href: '#about' },
                { label: 'Services', href: '#services' },
                { label: 'Reviews', href: '#reviews' },
                { label: 'Service Areas', href: '#map' },
                { label: 'Contact Us', href: '#contact' },
                { label: 'Request Quote', href: '#contact' }
              ].map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-gray-400 hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
          
          {/* Column 4: Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-lg font-bold mb-6 text-white">Contact Us</h3>
            <ul className="space-y-4">
              {business.full_address && (
                <li className="flex">
                  <FaMapMarkerAlt className="text-primary-400 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-400">
                    {business.full_address}
                  </span>
                </li>
              )}
              
              {business.phone && (
                <li className="flex">
                  <FaPhoneAlt className="text-primary-400 mt-1 mr-3 flex-shrink-0" />
                  <a 
                    href={`tel:${business.phone}`} 
                    className="text-gray-400 hover:text-primary-400 transition-colors"
                  >
                    {business.phone}
                  </a>
                </li>
              )}
              
              {business.email_1 && (
                <li className="flex">
                  <FaEnvelope className="text-primary-400 mt-1 mr-3 flex-shrink-0" />
                  <a 
                    href={`mailto:${business.email_1}`} 
                    className="text-gray-400 hover:text-primary-400 transition-colors"
                  >
                    {business.email_1}
                  </a>
                </li>
              )}
            </ul>
            
            {/* CTA Button */}
            <a 
              href="#contact" 
              className="mt-6 inline-block bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Get a Free Quote
            </a>
          </motion.div>
        </div>
      </div>
      
      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {currentYear} {business.business_name || 'HVAC Pro'}. All rights reserved.
            </p>
            
            <div className="flex space-x-6 text-sm text-gray-500">
              <a href="#" className="hover:text-primary-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary-400 transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;