
import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Filter, Search, MapPin, Star, Clock, ChevronRight, SlidersHorizontal, Package as PackageIcon } from 'lucide-react';
import { useApp } from '../App';
import { PackageType, Region } from '../types';
import SearchAutocomplete from '../components/SearchAutocomplete';

const Listing = () => {
  const { packages } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  
  const [activeFilters, setActiveFilters] = useState({
    type: queryParams.get('category') || 'All',
    region: 'All',
    maxPrice: 200000,
  });

  const [searchTerm, setSearchTerm] = useState(queryParams.get('q') || '');

  const filteredPackages = packages.filter(pkg => {
    const q = searchTerm.toLowerCase();
    const matchesSearch = pkg.name.toLowerCase().includes(q) || 
                          pkg.destination.toLowerCase().includes(q) ||
                          pkg.type.toLowerCase().includes(q) ||
                          pkg.description.toLowerCase().includes(q);
    const matchesType = activeFilters.type === 'All' || pkg.type === activeFilters.type;
    const matchesRegion = activeFilters.region === 'All' || pkg.region === activeFilters.region;
    const matchesPrice = pkg.price <= activeFilters.maxPrice;

    return matchesSearch && matchesType && matchesRegion && matchesPrice;
  });

  const handleSearch = (query: string) => {
    setSearchTerm(query);
    navigate(`/explore?q=${encodeURIComponent(query)}`, { replace: true });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
      {/* Sidebar Filters */}
      <aside className="lg:w-72 flex flex-col gap-6 shrink-0">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-6">
          <div className="flex items-center gap-2 border-b pb-4 mb-2">
            <SlidersHorizontal size={20} className="text-blue-600" />
            <h3 className="font-bold text-slate-800 uppercase tracking-wider text-sm">Filters</h3>
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-500 mb-3 block">Package Type</label>
            <div className="flex flex-col gap-2">
              {['All', ...Object.values(PackageType)].map(type => (
                <button 
                  key={type}
                  onClick={() => setActiveFilters({ ...activeFilters, type })}
                  className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${activeFilters.type === type ? 'bg-blue-600 text-white font-bold' : 'hover:bg-slate-50 text-slate-600 font-medium'}`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-500 mb-3 block">Destination Region</label>
            <div className="flex flex-col gap-2">
              {['All', ...Object.values(Region)].map(region => (
                <button 
                  key={region}
                  onClick={() => setActiveFilters({ ...activeFilters, region })}
                  className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${activeFilters.region === region ? 'bg-blue-600 text-white font-bold' : 'hover:bg-slate-50 text-slate-600 font-medium'}`}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm font-semibold text-slate-500 mb-3">
              <span>Budget</span>
              <span className="text-blue-600 font-bold">₹{activeFilters.maxPrice.toLocaleString()}</span>
            </div>
            <input 
              type="range" 
              min="10000" 
              max="200000" 
              step="5000"
              value={activeFilters.maxPrice}
              onChange={(e) => setActiveFilters({ ...activeFilters, maxPrice: parseInt(e.target.value) })}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
        </div>
      </aside>

      {/* Results */}
      <div className="flex-grow flex flex-col gap-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <h1 className="text-2xl font-bold text-slate-800 shrink-0">
            {filteredPackages.length} {filteredPackages.length === 1 ? 'Package' : 'Packages'} Found
          </h1>
          <SearchAutocomplete 
            initialValue={searchTerm}
            onSearch={handleSearch}
            className="w-full md:max-w-md shadow-sm"
            placeholder="Search destination, name or vibe..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPackages.map((pkg) => (
            <Link key={pkg.id} to={`/package/${pkg.id}`} className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all flex flex-col active:scale-[0.98]">
              <div className="relative h-56 overflow-hidden">
                <img src={pkg.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={pkg.name} />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-1.5 rounded-2xl text-[10px] font-bold text-blue-600 uppercase tracking-widest">
                  {pkg.type}
                </div>
              </div>
              <div className="p-6 flex flex-col gap-2">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1 text-slate-400 text-xs font-semibold">
                    <MapPin size={12} />
                    <span>{pkg.destination}</span>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star size={12} fill="currentColor" />
                    <span className="text-xs font-bold text-slate-700">{pkg.rating}</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-1">{pkg.name}</h3>
                <div className="flex items-center gap-3 text-slate-500 text-sm mb-4">
                  <Clock size={14} className="text-blue-500" />
                  <span className="font-medium">{pkg.duration}</span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-tighter text-slate-400 font-bold">Starts from</span>
                    <span className="text-xl font-bold text-slate-800">₹{pkg.price.toLocaleString()}</span>
                  </div>
                  <button className="bg-blue-600 text-white px-6 py-2.5 rounded-2xl text-sm font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-colors">
                    Details
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredPackages.length === 0 && (
          <div className="bg-white p-12 rounded-[2rem] border border-dashed border-slate-200 text-center flex flex-col items-center gap-6">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
              <PackageIcon size={40} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">Oops, We Couldn't Find It!</h3>
              <p className="text-slate-500 max-w-sm mx-auto">Try searching for something broader or clear your filters to see more broh-approved trips.</p>
            </div>
            <button 
              onClick={() => {
                setActiveFilters({ type: 'All', region: 'All', maxPrice: 200000 });
                setSearchTerm('');
                navigate('/explore', { replace: true });
              }}
              className="bg-blue-50 text-blue-600 font-bold px-8 py-3 rounded-2xl hover:bg-blue-100 transition-all"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Listing;
