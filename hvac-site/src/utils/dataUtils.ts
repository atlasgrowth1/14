import { BusinessData, ReviewData } from '../types';

// Import the JSON data
import businessData from '../data/hvac_contractors.json';
import reviewsData from '../data/cleaned_reviews.json';

// Merge the data into a combined dataset
export const getMergedBusinessData = (): BusinessData[] => {
  const combinedData: BusinessData[] = [];
  
  // Map through the business data
  businessData.forEach((business: any) => {
    // Find corresponding reviews data
    const reviewsMatch = reviewsData.find((review: any) => 
      review.place_id === business.place_id
    );
    
    // Merge the data
    const mergedBusiness: BusinessData = {
      business_name: business.name || '',
      place_id: business.place_id || '',
      s: business.s || '',
      
      // Business details
      phone: business.phone || '',
      email_1: business.email_1 || '',
      website: business.site || '',
      full_address: business.full_address || '',
      city: business.city || '',
      state: business.state || '',
      postal_code: business.postal_code || '',
      latitude: business.latitude || '',
      longitude: business.longitude || '',
      location_link: business.location_link || '',
      
      // Business metadata
      rating: parseFloat(business.rating) || 0,
      reviews_count: parseInt(business.reviews) || 0,
      working_hours: business.working_hours || '',
      subtypes: business.subtypes || '',
      photo: business.photo || '',
      about: business.about || '',
      
      // Social media links
      facebook: business.facebook || '',
      instagram: business.instagram || '',
      twitter: business.twitter || '',
      linkedin: business.linkedin || '',
      youtube: business.youtube || '',
      
      // Reviews data
      reviews: reviewsMatch ? reviewsMatch.reviews.map((review: any) => ({
        review_id: review.review_id,
        date: review.date,
        reviewer: review.reviewer,
        rating: review.rating,
        text: review.text
      })) : [],
      
      total_reviews: reviewsMatch ? reviewsMatch.total_reviews : 0,
      overall_rating: reviewsMatch ? reviewsMatch.rating : 0
    };
    
    combinedData.push(mergedBusiness);
  });
  
  return combinedData;
};

// Filter businesses with good ratings
export const getTopRatedBusinesses = (minRating: number = 4.5): BusinessData[] => {
  const allBusinesses = getMergedBusinessData();
  return allBusinesses.filter(business => 
    parseFloat(business.rating as string) >= minRating && 
    parseInt(business.reviews_count as string) > 5
  );
};

// Get top reviews (5 star) for a business
export const getTopReviews = (business: BusinessData, limit: number = 5): ReviewData[] => {
  if (!business.reviews || business.reviews.length === 0) {
    return [];
  }
  
  // Filter for 5-star reviews with text
  return business.reviews
    .filter(review => review.rating === 5 && review.text && review.text.trim() !== '')
    .slice(0, limit);
};

// Parse working hours for display
export const parseWorkingHours = (workingHoursJson: string): Record<string, string> => {
  try {
    if (!workingHoursJson) return {};
    return JSON.parse(workingHoursJson);
  } catch (error) {
    console.error('Error parsing working hours:', error);
    return {};
  }
};