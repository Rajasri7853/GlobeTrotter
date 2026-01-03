
import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Search, 
  Menu, 
  X, 
  User, 
  ChevronRight, 
  Star, 
  MapPin, 
  Clock, 
  Tag, 
  Phone, 
  MessageSquare,
  Home as HomeIcon,
  Compass,
  Heart,
  Settings,
  LogIn
} from 'lucide-react';
import { MOCK_PACKAGES, CATEGORIES, POPULAR_DESTINATIONS } from './constants';
import { Package, User as UserType, Booking, Enquiry } from './types';
import Home from './pages/Home';
import Listing from './pages/Listing';
import Details from './pages/Details';
import BookingPage from './pages/Booking';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import Login from './pages/Login';
import AIChatbot from './components/AIChatbot';

// Context for global state
interface AppContextType {
  packages: Package[];
  user: UserType | null;
  bookings: Booking[];
  enquiries: Enquiry[];
  setUser: (user: UserType | null) => void;
  addBooking: (booking: Booking) => void;
  addEnquiry: (enquiry: Enquiry) => void;
  setPackages: (pkgs: Package[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useApp();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: <HomeIcon size={18} /> },
    { name: 'Explore', path: '/explore', icon: <Compass size={18} /> },
    { name: 'Wishlist', path: '/profile', icon: <Heart size={18} /> },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">PIB</div>
          <span className="text-xl font-bold tracking-tight text-slate-800">PlanIt Broh</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path}
              className={`text-sm font-medium transition-colors ${location.pathname === link.path ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/admin" className="text-sm font-medium text-slate-400 hover:text-slate-600">Admin</Link>
        </nav>

        <div className="flex items-center gap-4">
          {user ? (
            <Link to="/profile" className="hidden md:flex items-center gap-2 bg-slate-100 hover:bg-slate-200 p-2 rounded-full transition-colors">
              <User size={20} className="text-slate-600" />
              <span className="text-sm font-medium text-slate-700 pr-2">{user.name}</span>
            </Link>
          ) : (
            <Link to="/login" className="hidden md:flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all">
              <LogIn size={18} />
              <span>Login</span>
            </Link>
          )}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-slate-600">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-xl p-4 flex flex-col gap-4 animate-in slide-in-from-top-2 duration-300">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <span className="text-blue-600">{link.icon}</span>
              <span className="font-medium text-slate-700">{link.name}</span>
            </Link>
          ))}
          {user ? (
            <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 text-blue-700 font-medium">
              <User size={18} />
              <span>My Profile</span>
            </Link>
          ) : (
            <Link to="/login" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-lg bg-blue-600 text-white font-medium">
              <LogIn size={18} />
              <span>Login / Sign Up</span>
            </Link>
          )}
          <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-lg text-slate-500 font-medium">
            <Settings size={18} />
            <span>Admin Panel</span>
          </Link>
        </div>
      )}
    </header>
  );
};

const Footer = () => (
  <footer className="bg-slate-900 text-slate-300 py-12 px-4">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
      <div className="col-span-1 md:col-span-2">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">PIB</div>
          <span className="text-xl font-bold text-white tracking-tight">PlanIt Broh</span>
        </div>
        <p className="max-w-md text-slate-400">
          PlanIt Broh: Oops We Booked It! Your ultimate travel partner for curated local and international experiences.
        </p>
      </div>
      <div>
        <h4 className="text-white font-semibold mb-4">Quick Links</h4>
        <ul className="space-y-2 text-sm">
          <li><Link to="/" className="hover:text-blue-400">Home</Link></li>
          <li><Link to="/explore" className="hover:text-blue-400">Tour Packages</Link></li>
          <li><a href="#" className="hover:text-blue-400">About Us</a></li>
          <li><a href="#" className="hover:text-blue-400">Contact Us</a></li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-semibold mb-4">Support</h4>
        <ul className="space-y-2 text-sm">
          <li><a href="#" className="hover:text-blue-400">Privacy Policy</a></li>
          <li><a href="#" className="hover:text-blue-400">Terms & Conditions</a></li>
          <li><a href="#" className="hover:text-blue-400">Refund Policy</a></li>
          <li><a href="#" className="hover:text-blue-400">FAQs</a></li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
      <p>© 2024 PlanIt Broh Travels. All Rights Reserved.</p>
      <div className="flex items-center gap-6">
        <a href="#" className="hover:text-white transition-colors text-xs">Facebook</a>
        <a href="#" className="hover:text-white transition-colors text-xs">Instagram</a>
        <a href="#" className="hover:text-white transition-colors text-xs">Twitter</a>
      </div>
    </div>
  </footer>
);

const App = () => {
  const [packages, setPackages] = useState<Package[]>(MOCK_PACKAGES);
  const [user, setUser] = useState<UserType | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);

  const addBooking = (booking: Booking) => setBookings([...bookings, booking]);
  const addEnquiry = (enquiry: Enquiry) => setEnquiries([...enquiries, enquiry]);

  return (
    <AppContext.Provider value={{ packages, user, bookings, enquiries, setUser, addBooking, addEnquiry, setPackages }}>
      <HashRouter>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<Listing />} />
              <Route path="/package/:id" element={<Details />} />
              <Route path="/book/:id" element={<BookingPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
          <Footer />
          <AIChatbot />
        </div>
      </HashRouter>
    </AppContext.Provider>
  );
};

export default App;
