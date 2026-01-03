
import { Package, PackageType, Region } from './types';

export const MOCK_PACKAGES: Package[] = [
  {
    id: '1',
    name: 'Eternal Bali Getaway',
    destination: 'Bali, Indonesia',
    region: Region.INTERNATIONAL,
    type: PackageType.HONEYMOON,
    duration: '6 Days / 5 Nights',
    price: 45000,
    rating: 4.8,
    reviews: 124,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800',
    description: 'Experience the magic of Bali with private pool villas and sunset beach dinners.',
    itinerary: [
      { day: 1, title: 'Arrival & Transfer', activities: ['Arrival at Denpasar Airport', 'Transfer to Ubud Villa', 'Leisure evening'] },
      { day: 2, title: 'Ubud Exploration', activities: ['Tegallalang Rice Terrace', 'Monkey Forest', 'Local Art Market'] },
      { day: 3, title: 'Kintamani Tour', activities: ['Mount Batur View', 'Tirta Empul Temple', 'Coffee Plantation'] }
    ],
    inclusions: ['Private Villa with Pool', 'Daily Breakfast', 'Private Airport Transfers', 'Local Tour Guide'],
    exclusions: ['International Flights', 'Visa on Arrival', 'Personal Expenses'],
    hotels: ['Ubud Serenity Villas', 'Seminyak Beach Resort']
  },
  {
    id: '2',
    name: 'Swiss Alps Majesty',
    destination: 'Lucerne, Switzerland',
    region: Region.INTERNATIONAL,
    type: PackageType.LUXURY,
    duration: '7 Days / 6 Nights',
    price: 185000,
    rating: 4.9,
    reviews: 86,
    image: 'https://images.unsplash.com/photo-1531310197839-ccf54634509e?auto=format&fit=crop&q=80&w=800',
    description: 'Luxury travel through the snow-capped mountains of Switzerland.',
    itinerary: [
      { day: 1, title: 'Welcome to Zurich', activities: ['Airport pickup', 'First class train to Lucerne', 'Lake dinner cruise'] },
      { day: 2, title: 'Mount Pilatus', activities: ['World steepst cogwheel railway', 'Panoramic cable car ride'] }
    ],
    inclusions: ['5-Star Hotels', 'Swiss Travel Pass Premier', 'Private Sightseeing', 'Gourmet Dining'],
    exclusions: ['Airfare', 'Insurance', 'Laundry'],
    hotels: ['Bürgenstock Resort', 'The Dolder Grand']
  },
  {
    id: '3',
    name: 'Mystical Ladakh Adventure',
    destination: 'Leh-Ladakh, India',
    region: Region.DOMESTIC,
    type: PackageType.ADVENTURE,
    duration: '8 Days / 7 Nights',
    price: 32000,
    rating: 4.7,
    reviews: 215,
    image: 'https://images.unsplash.com/photo-1581791534721-e599df440794?auto=format&fit=crop&q=80&w=800',
    description: 'Ride through the highest motorable passes and witness the serenity of Pangong Tso.',
    itinerary: [
      { day: 1, title: 'Acclimatization in Leh', activities: ['Pickup from Leh Airport', 'Full day rest', 'Shanti Stupa visit'] }
    ],
    inclusions: ['Oxygen cylinders in cabs', 'Bike rentals (optional)', 'Camp stays', 'All Meals'],
    exclusions: ['Flight to Leh', 'Inner Line Permit fees'],
    hotels: ['The Grand Dragon', 'Pangong Deluxe Camp']
  },
  {
    id: '4',
    name: 'Golden Triangle Tour',
    destination: 'Delhi-Agra-Jaipur, India',
    region: Region.DOMESTIC,
    type: PackageType.FAMILY,
    duration: '6 Days / 5 Nights',
    price: 24500,
    rating: 4.6,
    reviews: 310,
    image: 'https://images.unsplash.com/photo-1524492707947-519cad9f9ec2?auto=format&fit=crop&q=80&w=800',
    description: 'Explore India\'s rich history from the Taj Mahal to the Pink City.',
    itinerary: [
      { day: 1, title: 'Historic Delhi', activities: ['Red Fort', 'Qutub Minar', 'India Gate'] }
    ],
    inclusions: ['Private AC Sedan', 'Monument entry fees', 'Buffet Breakfast'],
    exclusions: ['Lunches and Dinners', 'Tips'],
    hotels: ['The Lodhi Delhi', 'Oberoi Amarvilas Agra']
  },
  {
    id: '5',
    name: 'Goan Beach Paradise',
    destination: 'Goa, India',
    region: Region.DOMESTIC,
    type: PackageType.GROUP,
    duration: '4 Days / 3 Nights',
    price: 15500,
    rating: 4.5,
    reviews: 520,
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=800',
    description: 'The ultimate party and relaxation destination in India.',
    itinerary: [
      { day: 1, title: 'South Goa Beaches', activities: ['Colva Beach', 'Sunset at Palolem'] }
    ],
    inclusions: ['Breakfast', 'Airport Transfers', 'North Goa Tour'],
    exclusions: ['Water sports charges', 'Alcohol'],
    hotels: ['Taj Exotica Resort']
  },
  {
    id: '6',
    name: 'Kerala Backwaters & Hill Stations',
    destination: 'Kerala, India',
    region: Region.DOMESTIC,
    type: PackageType.FAMILY,
    duration: '6 Days / 5 Nights',
    price: 28000,
    rating: 4.8,
    reviews: 420,
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=800',
    description: 'Relax in the serene backwaters of Alleppey and explore the tea gardens of Munnar.',
    itinerary: [
      { day: 1, title: 'Arrival in Kochi', activities: ['Pickup from Kochi Airport', 'Fort Kochi sightseeing', 'Chinese Fishing Nets'] },
      { day: 2, title: 'Munnar Tea Gardens', activities: ['Drive to Munnar', 'Visit Tea Museum', 'Eravikulam National Park'] }
    ],
    inclusions: ['Private Houseboat Stay', 'Breakfast & Dinner', 'Private Cab for Sightseeing'],
    exclusions: ['Lunch', 'Entrance fees'],
    hotels: ['The Zuri Kumarakom', 'Blanket Hotel Munnar']
  },
  {
    id: '7',
    name: 'Romantic Paris Tour',
    destination: 'Paris, France',
    region: Region.INTERNATIONAL,
    type: PackageType.HONEYMOON,
    duration: '5 Days / 4 Nights',
    price: 125000,
    rating: 4.9,
    reviews: 180,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800',
    description: 'Experience the City of Lights from the Eiffel Tower to hidden cafes.',
    itinerary: [
      { day: 1, title: 'Arrival in Paris', activities: ['Airport pickup', 'River Seine cruise'] }
    ],
    inclusions: ['Hotel with Eiffel view', 'Skip-the-line Louvre tickets', 'Breakfast'],
    exclusions: ['Personal shopping', 'Lunches'],
    hotels: ['Hotel Ritz Paris']
  }
];

export const CATEGORIES = [
  { name: 'Honeymoon', icon: '❤️' },
  { name: 'Family', icon: '👨‍👩‍👧‍👦' },
  { name: 'Group', icon: '🚌' },
  { name: 'International', icon: '✈️' },
  { name: 'Domestic', icon: '🇮🇳' }
];

export const POPULAR_DESTINATIONS = [
  { name: 'Bali', count: 12, image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800' },
  { name: 'Switzerland', count: 8, image: 'https://images.unsplash.com/photo-1531310197839-ccf54634509e?auto=format&fit=crop&q=80&w=800' },
  { name: 'Ladakh', count: 15, image: 'https://images.unsplash.com/photo-1581791534721-e599df440794?auto=format&fit=crop&q=80&w=800' },
  { name: 'Dubai', count: 20, image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800' },
  { name: 'Goa', count: 18, image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=800' },
  { name: 'Paris', count: 10, image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800' },
  { name: 'Tokyo', count: 6, image: 'https://images.unsplash.com/photo-1540959733332-e94e270b4d82?auto=format&fit=crop&q=80&w=800' },
  { name: 'Kerala', count: 22, image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=800' }
];
