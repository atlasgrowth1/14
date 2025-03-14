import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getTopRatedBusinesses } from './utils/dataUtils';
import { BusinessData } from './types';

// Components
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Reviews from './components/Reviews';
import Map from './components/Map';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [business, setBusiness] = useState<BusinessData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Get a top-rated business
    const businesses = getTopRatedBusinesses();
    if (businesses.length > 0) {
      setBusiness(businesses[0]); // Use the first business
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!business) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-700">No business data available.</p>
      </div>
    );
  }

  return (
    <div className="App">
      <Header business={business} />
      
      <main>
        <Hero business={business} />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <About business={business} />
          <Services />
          <Reviews business={business} />
          <Map business={business} />
          <Contact business={business} />
        </motion.div>
      </main>
      
      <Footer business={business} />
    </div>
  );
}

export default App;
