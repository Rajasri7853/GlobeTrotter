
import React, { useState, useMemo } from 'react';
import { User, Mail, Phone, Calendar, MapPin, ChevronRight, Settings, LogOut, Package, Clock, CheckCircle2 as CheckCircleIcon, Star } from 'lucide-react';
import { useApp } from '../App';
import { Booking } from '../types';

const Profile = () => {
  const { user, bookings, setUser } = useApp();
  const [activeBookingTab, setActiveBookingTab] = useState<'upcoming' | 'past'>('upcoming');

  const categorizedBookings = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcoming: Booking[] = [];
    const past: Booking[] = [];

    bookings.forEach(booking => {
      const travelDate = new Date(booking.travelDate);
      if (travelDate >= today) {
        upcoming.push(booking);
      } else {
        past.push(booking);
      }
    });

    // Sort upcoming by earliest first, past by latest first
    upcoming.sort((a, b) => new Date(a.travelDate).getTime() - new Date(b.travelDate).getTime());
    past.sort((a, b) => new Date(b.travelDate).getTime() - new Date(a.travelDate).getTime());

    return { upcoming, past };
  }, [bookings]);

  if (!user) return (
    <div className="p-20 text-center flex flex-col items-center gap-4">
      <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-300">
        <User size={40} />
      </div>
      <h2 className="text-xl font-bold text-slate-800">You are not logged in</h2>
      <p className="text-slate-500">Please login to view your profile and bookings.</p>
      <a href="/#/login" className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-blue-700 transition-all">Login Now</a>
    </div>
  );

  const displayBookings = activeBookingTab === 'upcoming' ? categorizedBookings.upcoming : categorizedBookings.past;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-80 shrink-0">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm space-y-8 text-center sticky top-24">
            <div className="relative inline-block">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mx-auto border-4 border-white shadow-lg">
                <User size={48} />
              </div>
              <div className="absolute bottom-0 right-0 w-8 h-8 bg-emerald-500 border-4 border-white rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">{user.name}</h2>
              <p className="text-slate-500 text-sm font-medium">Elite Traveler Status</p>
            </div>
            
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <div className="p-2 bg-slate-50 rounded-lg text-blue-600"><Mail size={16} /></div>
                <span className="truncate">{user.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <div className="p-2 bg-slate-50 rounded-lg text-blue-600"><Phone size={16} /></div>
                <span>{user.phone}</span>
              </div>
            </div>

            <div className="pt-4 space-y-2">
              <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors text-sm font-bold text-slate-700">
                <div className="flex items-center gap-3"><Settings size={18} className="text-slate-400" /> Settings</div>
                <ChevronRight size={16} className="text-slate-300" />
              </button>
              <button 
                onClick={() => setUser(null)}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-rose-50 transition-colors text-sm font-bold text-rose-600"
              >
                <div className="flex items-center gap-3"><LogOut size={18} /> Logout</div>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-grow space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <h3 className="text-2xl font-extrabold text-slate-800 flex items-center gap-3">
                <Calendar className="text-blue-600" /> My Bookings
              </h3>
              <div className="flex bg-slate-100 p-1 rounded-2xl w-full sm:w-auto">
                <button 
                  onClick={() => setActiveBookingTab('upcoming')}
                  className={`flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeBookingTab === 'upcoming' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  Upcoming ({categorizedBookings.upcoming.length})
                </button>
                <button 
                  onClick={() => setActiveBookingTab('past')}
                  className={`flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeBookingTab === 'past' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  Past ({categorizedBookings.past.length})
                </button>
              </div>
            </div>
            
            {displayBookings.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mx-auto">
                  <Package size={40} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-800">No {activeBookingTab} bookings</h4>
                  <p className="text-slate-500 text-sm max-w-xs mx-auto mt-2">
                    {activeBookingTab === 'upcoming' 
                      ? "Looks like you haven't planned your next adventure yet broh!" 
                      : "You haven't completed any trips with us so far."}
                  </p>
                </div>
                <a href="/#/explore" className="inline-block mt-4 bg-blue-600 text-white font-bold px-8 py-3 rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all active:scale-95">
                  Discover Trips
                </a>
              </div>
            ) : (
              <div className="space-y-6">
                {displayBookings.map((booking) => (
                  <div 
                    key={booking.id} 
                    className="group p-6 border border-slate-100 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-6 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-100 transition-all duration-300"
                  >
                    <div className="flex items-center gap-6 w-full md:w-auto">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${activeBookingTab === 'upcoming' ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-400'}`}>
                        {activeBookingTab === 'upcoming' ? <Clock size={32} /> : <CheckCircleIcon size={32} />}
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-xl font-extrabold text-slate-800 group-hover:text-blue-600 transition-colors">{booking.packageName}</h4>
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-semibold text-slate-500 mt-2">
                          <span className="flex items-center gap-2">
                            <Calendar size={16} className="text-blue-400" /> {new Date(booking.travelDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                          <span className="flex items-center gap-2">
                            <User size={16} className="text-blue-400" /> {booking.people} {booking.people === 1 ? 'Traveler' : 'Travelers'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col md:items-end w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-slate-50">
                      <div className="text-lg font-black text-slate-800">₹{booking.totalPrice.toLocaleString()}</div>
                      <div className={`text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full mt-2 inline-block ${
                        booking.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                      }`}>
                        {booking.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-8 rounded-[2.5rem] text-white space-y-4 shadow-xl shadow-blue-500/20">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                <Star size={24} className="text-amber-300" fill="currentColor" />
              </div>
              <h4 className="text-2xl font-black">Refer & Earn</h4>
              <p className="text-blue-100 text-sm leading-relaxed">Invite your friends to PlanItBroh and get ₹2000 credit for your next trip! Sharing is caring, broh.</p>
              <button className="bg-white text-blue-600 font-bold px-8 py-3 rounded-2xl text-sm shadow-lg hover:bg-slate-50 transition-all active:scale-95">
                Share Referral Link
              </button>
            </div>
            <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white space-y-4 shadow-xl">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                <Phone size={24} className="text-emerald-400" />
              </div>
              <h4 className="text-2xl font-black">Support Center</h4>
              <p className="text-slate-400 text-sm leading-relaxed">Need help with a booking? Our travel brohs are available 24/7 to solve your problems.</p>
              <button className="bg-slate-800 text-white font-bold px-8 py-3 rounded-2xl text-sm border border-slate-700 hover:bg-slate-700 transition-all active:scale-95">
                Talk to a Human
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
