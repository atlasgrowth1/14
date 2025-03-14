import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaPhone, FaHome, FaCheckCircle } from 'react-icons/fa';
import { BusinessData } from '../types';

interface ContactProps {
  business: BusinessData;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

const Contact: React.FC<ContactProps> = ({ business }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  
  // Form field change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };
  
  // Form validation
  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formData.service) {
      newErrors.service = 'Please select a service';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Form submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate form submission
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        
        // Reset form after submission
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: ''
        });
        
        // Clear submission status after a delay
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      }, 1500);
    }
  };
  
  return (
    <section id="contact" className="section bg-white">
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
            Contact <span className="text-primary-600">Us</span>
          </motion.h2>
          <motion.p
            className="section-subheading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Get in touch with our team for all your HVAC needs
          </motion.p>
        </div>
        
        {/* Contact Form and Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {isSubmitted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCheckCircle size={30} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h3>
                <p className="text-gray-600 mb-6">
                  Your message has been successfully sent. We'll get back to you as soon as possible!
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="btn-primary"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Request a Quote</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                      Your Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaUser className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`block w-full pl-10 pr-3 py-2.5 border ${
                          errors.name ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500`}
                        placeholder="John Doe"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                      )}
                    </div>
                  </div>
                  
                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaEnvelope className="text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`block w-full pl-10 pr-3 py-2.5 border ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500`}
                        placeholder="email@example.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Phone Field */}
                  <div>
                    <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaPhone className="text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`block w-full pl-10 pr-3 py-2.5 border ${
                          errors.phone ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500`}
                        placeholder="(123) 456-7890"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                      )}
                    </div>
                  </div>
                  
                  {/* Service Field */}
                  <div>
                    <label htmlFor="service" className="block text-gray-700 font-medium mb-2">
                      Service Needed
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaHome className="text-gray-400" />
                      </div>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className={`block w-full pl-10 pr-3 py-2.5 border ${
                          errors.service ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white`}
                      >
                        <option value="">Select a service</option>
                        <option value="ac_repair">AC Repair</option>
                        <option value="ac_installation">AC Installation</option>
                        <option value="heating_repair">Heating Repair</option>
                        <option value="heating_installation">Heating Installation</option>
                        <option value="maintenance">Regular Maintenance</option>
                        <option value="air_quality">Air Quality Solutions</option>
                        <option value="other">Other (specify in message)</option>
                      </select>
                      {errors.service && (
                        <p className="mt-1 text-sm text-red-600">{errors.service}</p>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Message Field */}
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Please provide details about the service you need..."
                  ></textarea>
                </div>
                
                {/* Submit Button */}
                <button
                  type="submit"
                  className={`btn-primary w-full justify-center ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Submit Request'
                  )}
                </button>
              </form>
            )}
          </motion.div>
          
          {/* Contact Information */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg shadow-lg p-8 text-white h-full flex flex-col">
              <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
              
              <p className="mb-8">
                Have questions about our services? Need emergency HVAC repair? Fill out the form or contact us directly using the information below:
              </p>
              
              <div className="space-y-6 flex-grow">
                {business.phone && (
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-4 flex-shrink-0">
                      <FaPhone className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white mb-1">Call Us</h4>
                      <a 
                        href={`tel:${business.phone}`}
                        className="text-white/90 hover:text-white transition-colors"
                      >
                        {business.phone}
                      </a>
                    </div>
                  </div>
                )}
                
                {business.email_1 && (
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-4 flex-shrink-0">
                      <FaEnvelope className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white mb-1">Email Us</h4>
                      <a 
                        href={`mailto:${business.email_1}`}
                        className="text-white/90 hover:text-white transition-colors"
                      >
                        {business.email_1}
                      </a>
                    </div>
                  </div>
                )}
                
                {business.full_address && (
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-4 flex-shrink-0">
                      <FaMapMarkerAlt className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white mb-1">Visit Us</h4>
                      <address className="not-italic text-white/90">
                        {business.full_address}
                      </address>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Emergency Contact */}
              <div className="mt-12 bg-white/10 rounded-lg p-6">
                <h4 className="text-lg font-bold mb-2 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                  </svg>
                  Emergency Service
                </h4>
                <p className="text-white/90 mb-3">
                  Need urgent help? We offer 24/7 emergency HVAC services.
                </p>
                <a 
                  href={`tel:${business.phone}`}
                  className="inline-flex items-center bg-white text-primary-600 hover:bg-white/90 transition-colors font-medium py-2 px-4 rounded-lg"
                >
                  <FaPhone className="mr-2" />
                  Call for Emergency Service
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;