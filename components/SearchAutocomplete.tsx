
import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Package, History, ArrowRight } from 'lucide-react';
import { useApp } from '../App';

interface SearchAutocompleteProps {
  initialValue?: string;
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchAutocomplete: React.FC<SearchAutocompleteProps> = ({ 
  initialValue = '', 
  onSearch, 
  placeholder = "Search destination, package, or broh vibes...",
  className = ""
}) => {
  const [query, setQuery] = useState(initialValue);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const { packages } = useApp();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length > 1) {
      const q = query.toLowerCase();
      const pkgMatches = packages.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.destination.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q)
      ).map(p => ({ type: 'package', label: p.name, sub: p.destination, id: p.id }));

      const uniqueDestinations = Array.from(new Set(packages.map(p => p.destination)))
        .filter(d => d.toLowerCase().includes(q))
        .map(d => ({ type: 'destination', label: d, sub: 'Popular Spot' }));

      setSuggestions([...pkgMatches, ...uniqueDestinations].slice(0, 6));
      setIsOpen(true);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [query, packages]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (item: any) => {
    setQuery(item.label);
    setIsOpen(false);
    onSearch(item.label);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOpen(false);
    onSearch(query);
  };

  return (
    <div ref={wrapperRef} className={`relative w-full ${className}`}>
      <form onSubmit={handleSubmit} className="flex gap-3 bg-white/10 backdrop-blur-2xl p-2 md:p-3 rounded-3xl border border-white/20 shadow-2xl">
        <div className="flex-grow flex items-center gap-3 bg-white rounded-2xl px-4 py-3">
          <Search className="text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder={placeholder}
            className="w-full bg-transparent outline-none text-slate-800 font-semibold placeholder:text-slate-400"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.length > 1 && setIsOpen(true)}
          />
        </div>
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-2xl transition-all shadow-xl active:scale-95">
          Go!
        </button>
      </form>

      {isOpen && suggestions.length > 0 && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
          {suggestions.map((item, idx) => (
            <button 
              key={idx}
              onClick={() => handleSelect(item)}
              className="w-full flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors border-b last:border-0 border-slate-50 text-left"
            >
              <div className={`p-2 rounded-lg ${item.type === 'package' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'}`}>
                {item.type === 'package' ? <Package size={18} /> : <MapPin size={18} />}
              </div>
              <div className="flex-grow">
                <div className="font-bold text-slate-800">{item.label}</div>
                <div className="text-xs text-slate-500 font-medium">{item.sub}</div>
              </div>
              <ArrowRight size={16} className="text-slate-300" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchAutocomplete;
