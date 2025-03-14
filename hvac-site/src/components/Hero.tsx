import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaPhoneAlt, FaSnowflake, FaFire } from 'react-icons/fa';
import { BusinessData } from '../types';

interface HeroProps {
  business: BusinessData;
}

const Hero: React.FC<HeroProps> = ({ business }) => {
  return (
    <section 
      id="home"
      className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden"
      style={{
        backgroundImage: 'linear-gradient(135deg, rgba(2, 41, 89, 0.95) 0%, rgba(6, 117, 186, 0.9) 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Abstract Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -top-16 -right-16 w-64 h-64 bg-primary-300 rounded-full opacity-20"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2]
          }} 
          transition={{ 
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute top-1/4 -left-24 w-48 h-48 bg-white rounded-full opacity-10"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.15, 0.1]
          }} 
          transition={{ 
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/4 w-36 h-36 bg-accent-300 rounded-full opacity-20"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.25, 0.2]
          }} 
          transition={{ 
            duration: 7,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 2
          }}
        />
      </div>
      
      <div className="container-custom relative z-10 flex flex-col md:flex-row items-center justify-between">
        {/* Left Column - Text Content */}
        <motion.div 
          className="w-full md:w-1/2 text-white mb-10 md:mb-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.span 
            className="inline-block bg-accent-500 text-white px-4 py-1 rounded-full text-sm font-medium mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            #1 Rated HVAC Service
          </motion.span>
          
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Professional HVAC Services for Your{' '}
            <span className="text-accent-400">Comfort</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-200 mb-8 max-w-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {business.subtypes || 'Heating, Ventilation & Air Conditioning services for residential and commercial buildings. We keep you comfortable all year round.'}
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <a 
              href="#contact" 
              className="btn-accent group"
            >
              Get a Free Quote
              <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <a 
              href={`tel:${business.phone}`} 
              className="btn-outline bg-white/10 text-white border-white/30 hover:bg-white/20"
            >
              <FaPhoneAlt className="mr-2" />
              {business.phone || 'Call Now'}
            </a>
          </motion.div>
        </motion.div>
        
        {/* Right Column - Feature Cards */}
        <motion.div 
          className="w-full md:w-5/12"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Card 1 */}
            <motion.div 
              className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 text-white"
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary-500 flex items-center justify-center mb-4">
                <FaSnowflake className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Cooling</h3>
              <p className="text-gray-200">Expert AC repair and maintenance to keep you cool all summer.</p>
            </motion.div>
            
            {/* Card 2 */}
            <motion.div 
              className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 text-white"
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.7 }}
            >
              <div className="w-12 h-12 rounded-lg bg-accent-500 flex items-center justify-center mb-4">
                <FaFire className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Heating</h3>
              <p className="text-gray-200">Reliable heating solutions to maintain warmth during winter months.</p>
            </motion.div>
            
            {/* Rating Card */}
            <motion.div 
              className="md:col-span-2 bg-gradient-to-r from-primary-700/80 to-primary-600/80 p-6 rounded-xl border border-white/20 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.8 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-200 mb-1">Customer Rating</p>
                  <div className="flex items-center">
                    <span className="text-3xl font-bold mr-2">{business.rating || '4.9'}</span>
                    <div className="flex">
                      {Array(5).fill(0).map((_, i) => (
                        <svg 
                          key={i} 
                          className={`w-5 h-5 ${i < Math.floor(parseFloat(business.rating as string) || 5) ? 'text-yellow-400' : 'text-gray-400'}`} 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-200 mb-1">Based on</p>
                  <p className="text-2xl font-bold">{business.reviews_count || '100+'} Reviews</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;