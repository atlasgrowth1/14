import React, { createElement } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaClock, FaTools, FaUserTie } from 'react-icons/fa';
import { BusinessData } from '../types';
import { parseWorkingHours } from '../utils/dataUtils';

interface AboutProps {
  business: BusinessData;
}

const About: React.FC<AboutProps> = ({ business }) => {
  const workingHours = parseWorkingHours(business.working_hours || '{}');
  
  // Features list for about section
  const features = [
    {
      icon: createElement(FaCheckCircle, { className: "w-5 h-5 text-primary-500" }),
      text: 'Licensed & Insured Technicians'
    },
    {
      icon: createElement(FaClock, { className: "w-5 h-5 text-primary-500" }),
      text: '24/7 Emergency Service'
    },
    {
      icon: createElement(FaTools, { className: "w-5 h-5 text-primary-500" }),
      text: 'Full Service HVAC Solutions'
    },
    {
      icon: createElement(FaUserTie, { className: "w-5 h-5 text-primary-500" }),
      text: 'Professional & Friendly Staff'
    }
  ];
  
  return (
    <section id="about" className="section bg-white">
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
            About <span className="text-primary-600">{business.business_name}</span>
          </motion.h2>
          <motion.p
            className="section-subheading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Your trusted partner for all heating, cooling, and air quality needs in {business.city || 'your area'}.
          </motion.p>
        </div>
        
        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary-600 rounded-xl transform translate-x-4 translate-y-4 -z-10"></div>
              <img 
                src={business.photo || "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"} 
                alt={`${business.business_name} HVAC Services`} 
                className="w-full h-auto object-cover rounded-xl shadow-xl"
              />
              
              {/* Experience Badge */}
              <div className="absolute -bottom-6 -right-6 bg-accent-500 text-white p-4 rounded-lg shadow-lg">
                <p className="text-sm font-medium">Trusted Service</p>
                <p className="text-2xl font-bold">15+ Years</p>
              </div>
            </div>
          </motion.div>
          
          {/* Right Column - Text Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                Expert HVAC Services for Your Home & Business
              </h3>
              
              <p className="text-gray-700 mb-6">
                {business.about 
                  ? JSON.parse(business.about).description || "With years of experience in the HVAC industry, we provide top-notch heating and cooling services tailored to your specific needs. Our team of certified technicians are dedicated to ensuring your comfort all year round."
                  : "With years of experience in the HVAC industry, we provide top-notch heating and cooling services tailored to your specific needs. Our team of certified technicians are dedicated to ensuring your comfort all year round."
                }
              </p>
              
              <p className="text-gray-700 mb-6">
                We serve {business.city || 'the local community'} and surrounding areas with prompt, reliable service and competitive rates. From routine maintenance to emergency repairs, we're here when you need us.
              </p>
              
              {/* Features List */}
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {features.map((feature, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                  >
                    <span className="mr-3">{feature.icon}</span>
                    <span className="text-gray-700">{feature.text}</span>
                  </motion.li>
                ))}
              </ul>
              
              {/* Working Hours */}
              {Object.keys(workingHours).length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-gray-50 p-6 rounded-lg border border-gray-100"
                >
                  <h4 className="font-bold text-lg mb-3 flex items-center">
                    {createElement(FaClock, { className: "text-primary-500 mr-2" })} Working Hours
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {Object.entries(workingHours).map(([day, hours]) => (
                      <div key={day} className="flex justify-between">
                        <span className="font-medium">{day}</span>
                        <span className="text-gray-600">{hours}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;