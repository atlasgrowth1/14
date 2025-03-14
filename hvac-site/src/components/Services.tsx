import React from 'react';
import { motion } from 'framer-motion';
import { FaSnowflake, FaFire, FaWrench, FaHome, FaBuilding, FaWind } from 'react-icons/fa';
import { ServiceItem } from '../types';

const Services: React.FC = () => {
  // Service items data
  const services: ServiceItem[] = [
    {
      id: 1,
      title: 'AC Repair & Service',
      description: 'Fast, reliable air conditioning repair and maintenance to keep you cool and comfortable.',
      icon: 'snowflake',
      color: 'primary'
    },
    {
      id: 2,
      title: 'Heating Systems',
      description: 'Expert heating system installation, repair, and maintenance for optimal warmth.',
      icon: 'fire',
      color: 'accent'
    },
    {
      id: 3,
      title: 'Maintenance Plans',
      description: 'Regular maintenance programs to prevent breakdowns and extend equipment life.',
      icon: 'wrench',
      color: 'secondary'
    },
    {
      id: 4,
      title: 'Residential HVAC',
      description: 'Complete HVAC solutions tailored for homes of all sizes and needs.',
      icon: 'home',
      color: 'primary'
    },
    {
      id: 5,
      title: 'Commercial HVAC',
      description: 'Specialized HVAC services for businesses, offices, and commercial properties.',
      icon: 'building',
      color: 'secondary'
    },
    {
      id: 6,
      title: 'Air Quality Solutions',
      description: 'Indoor air quality improvement through advanced filtration and purification systems.',
      icon: 'wind',
      color: 'accent'
    }
  ];
  
  // Function to render the appropriate icon
  const renderIcon = (icon: string, color: string) => {
    const iconClasses = `w-10 h-10 text-${color}-500`;
    
    switch (icon) {
      case 'snowflake':
        return <FaSnowflake className={iconClasses} />;
      case 'fire':
        return <FaFire className={iconClasses} />;
      case 'wrench':
        return <FaWrench className={iconClasses} />;
      case 'home':
        return <FaHome className={iconClasses} />;
      case 'building':
        return <FaBuilding className={iconClasses} />;
      case 'wind':
        return <FaWind className={iconClasses} />;
      default:
        return <FaWrench className={iconClasses} />;
    }
  };
  
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };
  
  return (
    <section id="services" className="section bg-gray-50">
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
            Our Professional <span className="text-primary-600">Services</span>
          </motion.h2>
          <motion.p
            className="section-subheading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            We offer a comprehensive range of HVAC services to keep your home and business comfortable year-round.
          </motion.p>
        </div>
        
        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              className="card group hover:bg-primary-600 hover:text-white transition-all duration-300"
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                boxShadow: "0 20px 30px -10px rgba(6, 77, 163, 0.15)"
              }}
            >
              <div className={`w-16 h-16 rounded-lg bg-${service.color}-100 flex items-center justify-center mb-6 group-hover:bg-white transition-all duration-300`}>
                {renderIcon(service.icon, service.color)}
              </div>
              
              <h3 className="text-xl font-bold mb-3 group-hover:text-white transition-colors duration-300">
                {service.title}
              </h3>
              
              <p className="text-gray-600 group-hover:text-white/90 transition-colors duration-300">
                {service.description}
              </p>
              
              <div className="mt-6">
                <a 
                  href="#contact" 
                  className="font-medium text-primary-600 inline-flex items-center group-hover:text-white transition-colors duration-300"
                >
                  Learn More
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform duration-300" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* CTA Section */}
        <motion.div
          className="mt-16 bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-8 md:p-12 text-white text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Need expert HVAC service?
          </h3>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Contact us today for a free consultation and quote on your heating and cooling needs.
          </p>
          <a 
            href="#contact" 
            className="btn bg-white text-primary-600 hover:bg-white/90 transition-colors"
          >
            Get a Free Quote
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;