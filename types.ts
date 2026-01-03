
export enum PackageType {
  HONEYMOON = 'Honeymoon',
  FAMILY = 'Family',
  GROUP = 'Group',
  ADVENTURE = 'Adventure',
  LUXURY = 'Luxury'
}

export enum Region {
  DOMESTIC = 'Domestic',
  INTERNATIONAL = 'International'
}

export interface Package {
  id: string;
  name: string;
  destination: string;
  region: Region;
  type: PackageType;
  duration: string; // e.g., "5 Days / 4 Nights"
  price: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  itinerary: { day: number; title: string; activities: string[] }[];
  inclusions: string[];
  exclusions: string[];
  hotels: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  bookings: Booking[];
}

export interface Booking {
  id: string;
  packageId: string;
  packageName: string;
  travelDate: string;
  people: number;
  status: 'Pending' | 'Confirmed' | 'Cancelled';
  totalPrice: number;
}

export interface Enquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  people: number;
  packageId?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
