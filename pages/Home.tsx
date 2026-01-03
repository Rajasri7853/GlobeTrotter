
import React, { useState } from 'react';
import { ChevronRight, MapPin, Star, TrendingUp, Sparkles, Map, Clock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { CATEGORIES, POPULAR_DESTINATIONS } from '../constants';
import { useApp } from '../App';
import SearchAutocomplete from '../components/SearchAutocomplete';

const Home = () => {
  const { packages } = useApp();
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    navigate(`/explore?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="flex flex-col gap-12 pb-20">
      {/* Hero Banner */}
      <section className="relative h-[550px] flex items-center justify-center text-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=2000" 
          className="absolute inset-0 w-full h-full object-cover brightness-50 scale-105"
          alt="Adventure Awaits"
        />
        <div className="relative z-10 max-w-4xl px-4 flex flex-col gap-6 items-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight drop-shadow-2xl">
            Oops <span className="text-blue-400 italic">We Booked It!</span>
          </h1>
          <p className="text-lg md:text-2xl text-slate-100 max-w-2xl mx-auto font-medium drop-shadow-md">
            The world is waiting. Plan it with your Broh and explore hidden gems locally and internationally.
          </p>
          
          <SearchAutocomplete 
            onSearch={handleSearch} 
            className="max-w-2xl mt-4" 
            placeholder="Where to, Broh? (e.g. Bali, Ladakh...)"
          />
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto w-full px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-800">Trip Categories</h2>
            <p className="text-slate-500">Pick your vibe for the next journey</p>
          </div>
          <Link to="/explore" className="text-blue-600 font-bold flex items-center hover:gap-1 transition-all group">
            See All Packages <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {CATEGORIES.map((cat) => (
            <Link 
              to={`/explore?category=${cat.name}`} 
              key={cat.name}
              className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all text-center group active:scale-95"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{cat.icon}</div>
              <span className="font-bold text-slate-700 text-lg">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Destinations Section */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-slate-800">Popular Destinations</h2>
            <p className="text-slate-500">Most loved spots by the PlanIt Broh community</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {POPULAR_DESTINATIONS.map((dest) => (
              <div 
                key={dest.name} 
                onClick={() => navigate(`/explore?q=${dest.name}`)}
                className="relative group h-72 rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all active:scale-95"
              >
                <img src={dest.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={dest.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h4 className="text-2xl font-bold mb-1">{dest.name}</h4>
                  <p className="text-sm text-slate-300 font-medium">{dest.count}+ Packages Available</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local Gems & Domestic */}
      <section className="max-w-7xl mx-auto w-full px-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
            <Map size={24} />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-slate-800">Local Hidden Gems</h2>
            <p className="text-slate-500">Discover the magic in your own backyard</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {packages.filter(p => p.region === 'Domestic').slice(0, 2).map((pkg) => (
            <Link key={pkg.id} to={`/package/${pkg.id}`} className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all flex flex-col md:flex-row h-full">
              <div className="md:w-1/2 relative overflow-hidden">
                <img src={pkg.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 min-h-[250px]" alt={pkg.name} />
                <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  Domestic
                </div>
              </div>
              <div className="md:w-1/2 p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">{pkg.type}</span>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star size={14} fill="currentColor" />
                      <span className="text-sm font-bold text-slate-700">{pkg.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">{pkg.name}</h3>
                  <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
                    <MapPin size={16} />
                    <span>{pkg.destination}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-400 font-bold uppercase">Price</span>
                    <span className="text-xl font-bold text-slate-800">₹{pkg.price.toLocaleString()}</span>
                  </div>
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <ChevronRight size={20} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Packages */}
      <section className="max-w-7xl mx-auto w-full px-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-rose-100 rounded-lg text-rose-600">
            <TrendingUp size={24} />
          </div>
          <h2 className="text-3xl font-bold text-slate-800">Trending Right Now</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.slice(0, 3).map((pkg) => (
            <Link key={pkg.id} to={`/package/${pkg.id}`} className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all flex flex-col active:scale-[0.98]">
              <div className="relative h-64 overflow-hidden">
                <img src={pkg.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={pkg.name} />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-1.5 rounded-2xl text-[10px] font-bold text-blue-600 uppercase tracking-widest">
                  {pkg.type}
                </div>
                <div className="absolute bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-2xl text-sm font-extrabold shadow-lg">
                  ₹{pkg.price.toLocaleString()}
                </div>
              </div>
              <div className="p-6 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-slate-400 text-xs font-semibold">
                    <MapPin size={14} />
                    <span>{pkg.destination}</span>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star size={14} fill="currentColor" />
                    <span className="text-sm font-bold text-slate-700">{pkg.rating}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-1">{pkg.name}</h3>
                <div className="flex items-center justify-between mt-2 pt-4 border-t border-slate-50">
                  <div className="flex items-center gap-2 text-slate-500 text-xs font-medium uppercase tracking-tight">
                    <Clock size={16} className="text-blue-500" />
                    {pkg.duration}
                  </div>
                  <button className="text-blue-600 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                    View Package <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-blue-600 py-20 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
          <div className="flex-1 space-y-8">
            <div className="inline-block bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white text-xs font-bold uppercase tracking-widest">
              PlanIt Broh Advantage
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">Why Book with your <span className="underline decoration-blue-300">Broh?</span></h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                { title: 'AI Travel Guru', desc: 'Smarter planning with Gemini AI integration.' },
                { title: 'Broh Prices', desc: 'Negotiated deals that save you heavy cash.' },
                { title: 'Always Awake', desc: '24/7 human and bot support for your peace of mind.' },
                { title: 'Verified Stays', desc: 'No crappy hotels. We personally check em.' }
              ].map((item) => (
                <div key={item.title} className="bg-white/10 p-6 rounded-3xl border border-white/10 hover:bg-white/15 transition-all">
                  <h4 className="text-white font-extrabold text-lg mb-2">{item.title}</h4>
                  <p className="text-blue-100 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-white/10 rounded-[3rem] blur-2xl animate-pulse"></div>
              <img 
                src="https://images.unsplash.com/photo-1539635278303-d4002c07dee3?auto=format&fit=crop&q=80&w=600" 
                className="w-80 h-[450px] object-cover rounded-[3rem] shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500"
                alt="Happy Travelers"
              />
              <div className="absolute -bottom-8 -left-10 bg-white p-6 rounded-[2rem] shadow-2xl flex items-center gap-4 animate-bounce hover:animate-none">
                <div className="p-3 bg-amber-100 rounded-2xl">
                  <Sparkles className="text-amber-500" />
                </div>
                <div>
                  <div className="font-extrabold text-slate-800">AI Concierge</div>
                  <div className="text-xs text-slate-500">Oops, we booked it!</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Decor */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-[150px] opacity-30 -translate-y-1/2 translate-x-1/2"></div>
      </section>
    </div>
  );
};

export default Home;
