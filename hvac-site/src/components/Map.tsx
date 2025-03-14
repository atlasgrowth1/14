import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';
import { BusinessData } from '../types';
import { parseWorkingHours } from '../utils/dataUtils';

interface MapProps {
  business: BusinessData;
}

const Map: React.FC<MapProps> = ({ business }) => {
  const workingHours = parseWorkingHours(business.working_hours || '{}');
  
  // Create OpenStreetMap URL based on coordinates
  const mapUrl = business.latitude && business.longitude
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${parseFloat(business.longitude as string) - 0.01},${parseFloat(business.latitude as string) - 0.01},${parseFloat(business.longitude as string) + 0.01},${parseFloat(business.latitude as string) + 0.01}&layer=mapnik&marker=${business.latitude},${business.longitude}`
    : 'https://www.openstreetmap.org/export/embed.html?bbox=-118.50,33.80,-118.30,34.00&layer=mapnik';

  return (
    <section id="map" className="section bg-gray-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            className="section-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Service <span className="text-primary-600">Area</span>
          </motion.h2>
          <motion.p
            className="section-subheading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            We proudly serve {business.city || 'the local area'} and surrounding communities
          </motion.p>
        </div>
        
        {/* Map and Contact Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information Card */}
          <motion.div
            className="card bg-white shadow-lg lg:col-span-1 order-2 lg:order-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-gray-900">Contact Information</h3>
            
            <ul className="space-y-6">
              {/* Address */}
              {business.full_address && (
                <li className="flex">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mr-4 flex-shrink-0">
                    <FaMapMarkerAlt className="text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Address</h4>
                    <address className="not-italic text-gray-600">
                      {business.full_address}
                    </address>
                    {business.location_link && (
                      <a 
                        href={business.location_link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-primary-600 hover:text-primary-700 transition-colors"
                      >
                        Get Directions
                      </a>
                    )}
                  </div>
                </li>
              )}
              
              {/* Phone */}
              {business.phone && (
                <li className="flex">
                  <div className="w-10 h-10 rounded-full bg-accent-100 flex items-center justify-center mr-4 flex-shrink-0">
                    <FaPhone className="text-accent-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Phone</h4>
                    <a 
                      href={`tel:${business.phone}`} 
                      className="text-gray-600 hover:text-primary-600 transition-colors"
                    >
                      {business.phone}
                    </a>
                  </div>
                </li>
              )}
              
              {/* Email */}
              {business.email_1 && (
                <li className="flex">
                  <div className="w-10 h-10 rounded-full bg-secondary-100 flex items-center justify-center mr-4 flex-shrink-0">
                    <FaEnvelope className="text-secondary-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Email</h4>
                    <a 
                      href={`mailto:${business.email_1}`} 
                      className="text-gray-600 hover:text-primary-600 transition-colors"
                    >
                      {business.email_1}
                    </a>
                  </div>
                </li>
              )}
              
              {/* Hours */}
              {Object.keys(workingHours).length > 0 && (
                <li className="flex">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mr-4 flex-shrink-0">
                    <FaClock className="text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Business Hours</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {Object.entries(workingHours).slice(0, 3).map(([day, hours]) => (
                        <li key={day} className="flex justify-between">
                          <span className="font-medium mr-3">{day}:</span>
                          <span>{hours}</span>
                        </li>
                      ))}
                      {Object.keys(workingHours).length > 3 && (
                        <li className="text-primary-600 cursor-pointer hover:text-primary-700 transition-colors">
                          View All Hours
                        </li>
                      )}
                    </ul>
                  </div>
                </li>
              )}
            </ul>
          </motion.div>
          
          {/* Map */}
          <motion.div
            className="bg-white rounded-lg shadow-lg overflow-hidden lg:col-span-2 order-1 lg:order-2 h-[400px] lg:h-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <iframe
              title="Location Map"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '400px' }}
              loading="lazy"
              src={mapUrl}
            ></iframe>
          </motion.div>
        </div>
        
        {/* Service Area Description */}
        <motion.div
          className="mt-16 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold mb-4 text-gray-900">Our Service Coverage</h3>
          <p className="text-gray-700 mb-6">
            We provide HVAC services to residential and commercial customers in {business.city || 'the local area'} and surrounding areas, including:
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
            {[
              'Residential Properties', 
              'Commercial Buildings', 
              'Retail Stores',
              'Office Spaces', 
              'Restaurants', 
              'Healthcare Facilities'
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-gray-100 rounded-lg py-3 px-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                <span className="text-gray-800 font-medium">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Map;