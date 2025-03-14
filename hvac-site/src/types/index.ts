export interface BusinessData {
  business_name: string;
  place_id: string;
  total_reviews?: number;
  overall_rating?: number;
  s?: string;
  reviews: ReviewData[];
  
  // Business details
  phone?: string;
  email_1?: string;
  website?: string;
  full_address?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  latitude?: string;
  longitude?: string;
  location_link?: string;
  
  // Business metadata
  rating?: number | string;
  reviews_count?: number | string;
  working_hours?: string;
  subtypes?: string;
  photo?: string;
  about?: string;
  
  // Social media links
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  youtube?: string;
}

export interface ReviewData {
  review_id: string;
  date?: string;
  reviewer?: string;
  rating?: number;
  text?: string;
}

export interface ServiceItem {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
}