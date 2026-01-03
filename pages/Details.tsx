
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  MapPin, Clock, Star, Users, CheckCircle, XCircle, 
  Hotel, Image as ImageIcon, Calendar, Phone, MessageSquare, 
  ChevronRight, ArrowLeft
} from 'lucide-react';
import { useApp } from '../App';

const Details = () => {
  const { id } = useParams();
  const { packages } = useApp();
  const navigate = useNavigate();
  const pkg = packages.find(p => p.id === id);
  const [activeTab, setActiveTab] = useState('itinerary');

  if (!pkg) return <div className="p-20 text-center">Package not found.</div>;

  return (
    <div className="pb-20">
      {/* Header Image */}
      <div className="relative h-[400px]">
        <img src={pkg.image} className="w-full h-full object-cover" alt={pkg.name} />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/40 transition-all"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="absolute bottom-8 left-0 w-full px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-end justify-between gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-blue-300 font-bold uppercase tracking-widest text-xs">
                <MapPin size={14} />
                <span>{pkg.destination}</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-md">{pkg.name}</h1>
              <div className="flex items-center gap-4 text-slate-200 text-sm">
                <div className="flex items-center gap-1 bg-amber-500/80 px-2 py-0.5 rounded text-white font-bold">
                  <Star size={14} fill="currentColor" />
                  {pkg.rating}
                </div>
                <span>({pkg.reviews} Reviews)</span>
                <span className="text-slate-400">|</span>
                <span className="flex items-center gap-1"><Clock size={16} /> {pkg.duration}</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 min-w-[280px]">
              <div className="text-slate-400 text-xs font-bold uppercase mb-1">Price per person</div>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-bold text-slate-800">₹{pkg.price.toLocaleString()}</span>
                <span className="text-slate-500 text-sm">*Taxes incl.</span>
              </div>
              <Link to={`/book/${pkg.id}`} className="block w-full bg-blue-600 text-white text-center font-bold py-3 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 mb-3">
                Book Now
              </Link>
              <button className="w-full border-2 border-slate-100 text-slate-700 font-bold py-3 rounded-xl hover:bg-slate-50 transition-all">
                Enquire Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          {/* Tabs */}
          <div className="flex border-b border-slate-200">
            {['itinerary', 'inclusions', 'hotels', 'policies'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm font-bold uppercase tracking-wider transition-all border-b-2 ${
                  activeTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            {activeTab === 'itinerary' && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-slate-800">Day-wise Itinerary</h2>
                <div className="space-y-6 relative before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                  {pkg.itinerary.map((day) => (
                    <div key={day.day} className="relative pl-12">
                      <div className="absolute left-0 top-1 w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold z-10 border-4 border-white">
                        {day.day}
                      </div>
                      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                        <h4 className="font-bold text-slate-800 mb-4">{day.title}</h4>
                        <ul className="space-y-3">
                          {day.activities.map((act, i) => (
                            <li key={i} className="flex items-start gap-3 text-slate-600 text-sm">
                              <CheckCircle size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                              {act}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'inclusions' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <CheckCircle className="text-emerald-500" /> What's Included
                  </h3>
                  <ul className="space-y-3">
                    {pkg.inclusions.map((item, i) => (
                      <li key={i} className="text-slate-600 text-sm flex items-center gap-2">• {item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <XCircle className="text-rose-500" /> What's Excluded
                  </h3>
                  <ul className="space-y-3">
                    {pkg.exclusions.map((item, i) => (
                      <li key={i} className="text-slate-600 text-sm flex items-center gap-2">• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'hotels' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-800">Accommodation Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pkg.hotels.map((hotel, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                      <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                        <Hotel size={32} />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800">{hotel}</h4>
                        <div className="flex text-amber-400 mt-1">
                          {[1,2,3,4,5].map(s => <Star key={s} size={14} fill="currentColor" />)}
                        </div>
                        <p className="text-xs text-slate-500 mt-1">Super Deluxe Room</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Support */}
        <div className="flex flex-col gap-6">
          <div className="bg-slate-900 text-white p-8 rounded-[2rem] shadow-xl space-y-6 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2">Need Help?</h3>
              <p className="text-slate-400 text-sm mb-6">Our travel experts are available 24/7 to help you plan the perfect trip.</p>
              <div className="space-y-3">
                <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all">
                  <Phone size={20} /> Call Now
                </button>
                <button className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all">
                  <MessageSquare size={20} /> WhatsApp Us
                </button>
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-600 rounded-full blur-[80px] opacity-20"></div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h4 className="font-bold text-slate-800 mb-4">Why Book This Package?</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm text-slate-600">
                <CheckCircle size={18} className="text-emerald-500" /> Certified by SkyBound
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-600">
                <CheckCircle size={18} className="text-emerald-500" /> Free Cancellation
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-600">
                <CheckCircle size={18} className="text-emerald-500" /> Verified Itinerary
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
