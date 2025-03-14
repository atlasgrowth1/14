import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { BusinessData, ReviewData } from '../types';
import { getTopReviews } from '../utils/dataUtils';

interface ReviewsProps {
  business: BusinessData;
}

const Reviews: React.FC<ReviewsProps> = ({ business }) => {
  const [topReviews, setTopReviews] = useState<ReviewData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    // Get top 5-star reviews
    const reviews = getTopReviews(business, 10);
    setTopReviews(reviews);
    
    // Auto-slide functionality
    const startAutoSlide = () => {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prevIndex => 
          prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);
    };
    
    startAutoSlide();
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [business]);
  
  // Handle manual navigation
  const handlePrev = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    setCurrentIndex(prevIndex => 
      prevIndex === 0 ? topReviews.length - 1 : prevIndex - 1
    );
  };
  
  const handleNext = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    setCurrentIndex(prevIndex => 
      prevIndex === topReviews.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const handleDotClick = (index: number) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    setCurrentIndex(index);
  };
  
  // Format date for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch (error) {
      return dateString; // If date parsing fails, return original string
    }
  };
  
  // If no reviews available, display a placeholder
  if (topReviews.length === 0) {
    return (
      <section id="reviews" className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <motion.h2
              className="section-heading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Customer <span className="text-primary-600">Reviews</span>
            </motion.h2>
            <motion.p
              className="section-subheading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              We're committed to excellence and it shows in what our customers say
            </motion.p>
          </div>
          
          <div className="flex justify-center items-center py-16">
            <p className="text-xl text-gray-500">No reviews available at this time.</p>
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section id="reviews" className="section bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary-100 rounded-full opacity-50"></div>
        <div className="absolute top-1/4 right-0 w-32 h-32 bg-accent-100 rounded-full opacity-50"></div>
        <div className="absolute bottom-10 left-20 w-24 h-24 bg-secondary-100 rounded-full opacity-40"></div>
      </div>
      
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            className="section-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Customer <span className="text-primary-600">Testimonials</span>
          </motion.h2>
          <motion.p
            className="section-subheading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Hear what our satisfied customers have to say about our services
          </motion.p>
        </div>
        
        {/* Reviews Carousel */}
        <div className="relative max-w-4xl mx-auto px-8">
          {/* Navigation Buttons */}
          <button 
            onClick={handlePrev} 
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-lg p-3 z-10 hover:bg-gray-50 transition-colors text-primary-600"
            aria-label="Previous review"
          >
            <FaChevronLeft size={20} />
          </button>
          
          <button 
            onClick={handleNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-lg p-3 z-10 hover:bg-gray-50 transition-colors text-primary-600"
            aria-label="Next review"
          >
            <FaChevronRight size={20} />
          </button>
          
          {/* Testimonial Cards */}
          <div className="overflow-hidden relative">
            <div 
              className="flex transition-transform duration-500 ease-in-out" 
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {topReviews.map((review, index) => (
                <div key={review.review_id} className="w-full flex-shrink-0 px-4">
                  <motion.div
                    className="bg-white rounded-xl shadow-lg p-8 md:p-10 relative"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="absolute -top-5 left-10 w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white">
                      <FaQuoteLeft size={16} />
                    </div>
                    
                    <div className="mb-6 flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {review.reviewer || 'Happy Customer'}
                        </h3>
                        <p className="text-gray-500 text-sm">
                          {formatDate(review.date)}
                        </p>
                      </div>
                      
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <FaStar 
                            key={i} 
                            className="text-yellow-400 mr-1" 
                            size={18} 
                          />
                        ))}
                      </div>
                    </div>
                    
                    <p className="text-gray-700 text-lg font-medium italic">
                      "{review.text}"
                    </p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Dots for navigation */}
          <div className="flex justify-center space-x-2 mt-8">
            {topReviews.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-primary-500' : 'bg-gray-300'
                }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        {/* Review Summary */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="inline-flex items-center bg-gray-50 rounded-full px-6 py-3 shadow-sm">
            <div className="flex mr-3">
              {[...Array(5)].map((_, i) => (
                <FaStar 
                  key={i} 
                  className="text-yellow-400 mr-1" 
                  size={18} 
                />
              ))}
            </div>
            <span className="text-gray-700 font-medium">
              {business.rating || '5.0'} out of 5 based on {business.reviews_count || 'many'} reviews
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Reviews;