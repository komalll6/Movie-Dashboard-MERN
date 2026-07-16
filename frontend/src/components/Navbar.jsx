import React, { useState, useEffect } from 'react';
import { 
  Film, Tv, TrendingUp, Search, Compass, Flame, Clock, 
  Calendar, Star, Play, Disc, Tv2, ChevronDown 
} from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll effect to transition navbar background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 md:px-12 py-4 flex items-center justify-between ${
      isScrolled 
        ? 'bg-[#0d0c0f]/80 backdrop-blur-md border-b border-white/5 shadow-lg' 
        : 'bg-gradient-to-b from-black/80 to-transparent'
    }`}>
      
      {/* Left side: Logo & Navigation Links */}
      <div className="flex items-center gap-8">
        {/* Brand Logo */}
        <div className="text-red-600 font-extrabold text-2xl tracking-wider cursor-pointer select-none">
          MovieHub
        </div>

        {/* Nav Links Items */}
        <div className="hidden md:flex items-center gap-2 text-sm font-medium text-gray-300">
          
          {/* 🎬 MOVIES HOVER GROUP */}
          <div className="relative group py-2">
            <button 
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg cursor-pointer transition group-hover:bg-white/10 group-hover:text-white"
            >
              <Film className="w-4 h-4" />
              <span>Movies</span>
              <ChevronDown className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180" />
            </button>

            {/* MEGA MENU: MOVIES (Opens on Hover) */}
            <div className="absolute top-full left-0 w-[550px] bg-[#131217] border border-white/10 rounded-xl p-6 shadow-2xl pointer-events-none opacity-0 translate-y-2 transition-all duration-300 ease-out group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0">
              <div className="flex items-center gap-2 text-white font-bold mb-1">
                <Film className="w-5 h-5 text-red-500" />
                <h3>Movies</h3>
              </div>
              <p className="text-xs text-gray-400 mb-6">Embark on a cinematic adventure with our vast collection of movies.</p>
              
              <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                <div className="space-y-4">
                  <DropdownItem icon={<Compass className="w-4 h-4 text-purple-400" />} title="Discover" desc="Uncover hidden gems and releases." badge="NEW" />
                  <DropdownItem icon={<Play className="w-4 h-4 text-emerald-400" />} title="Now Playing" desc="Catch the latest theater releases." />
                  <DropdownItem icon={<Clock className="w-4 h-4 text-blue-400" />} title="Latest Movies" desc="Fresh arrivals on our network." />
                </div>
                <div className="space-y-4">
                  <Flame className="w-4 h-4 text-orange-400" />
                  <DropdownItem icon={<Flame className="w-4 h-4 text-orange-400" />} title="Popular" desc="Dive into world trending titles." />
                  <DropdownItem icon={<Calendar className="w-4 h-4 text-pink-400" />} title="Upcoming" desc="Be the first to see fresh content." />
                  <DropdownItem icon={<Disc className="w-4 h-4 text-yellow-400" />} title="Anime" desc="Action packed dynamic animation." />
                </div>
              </div>

              {/* OTT Providers Section */}
              <div className="mt-6 pt-4 border-t border-white/5 grid grid-cols-2 gap-4 text-xs text-gray-400">
                <div className="flex items-center gap-2 hover:text-white cursor-pointer"><span className="text-red-500 font-bold">N</span> Netflix Originals</div>
                <div className="flex items-center gap-2 hover:text-white cursor-pointer"><span className="text-blue-400 font-bold">D</span> Disney+ Hotstar</div>
              </div>
            </div>
          </div>

          {/* 📺 SHOWS HOVER GROUP */}
          <div className="relative group py-2">
            <button 
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg cursor-pointer transition group-hover:bg-white/10 group-hover:text-white"
            >
              <Tv className="w-4 h-4" />
              <span>Shows</span>
              <ChevronDown className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180" />
            </button>

            {/* MEGA MENU: SHOWS (Opens on Hover) */}
            <div className="absolute top-full left-0 w-[550px] bg-[#131217] border border-white/10 rounded-xl p-6 shadow-2xl pointer-events-none opacity-0 translate-y-2 transition-all duration-300 ease-out group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0">
              <div className="flex items-center gap-2 text-white font-bold mb-1">
                <Tv className="w-5 h-5 text-blue-500" />
                <h3>Tv Shows</h3>
              </div>
              <p className="text-xs text-gray-400 mb-6">Discover premium web series, television epics and reality shows.</p>
              
              <div className="grid grid-cols-2 gap-4">
                <DropdownItem icon={<Compass className="w-4 h-4 text-purple-400" />} title="Discover" desc="Explore premium dynamic series." badge="NEW" />
                <DropdownItem icon={<Flame className="w-4 h-4 text-orange-400" />} title="Popular" desc="Shows that people love right now." />
                <DropdownItem icon={<Tv2 className="w-4 h-4 text-emerald-400" />} title="Airing Today" desc="Episodes running on air tonight." />
                <DropdownItem icon={<Star className="w-4 h-4 text-yellow-400" />} title="On The Air" desc="Top regular running broadcasts." />
              </div>
            </div>
          </div>

          {/* 🔥 TRENDING HOVER GROUP */}
          <div className="relative group py-2">
            <button 
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg cursor-pointer transition group-hover:bg-white/10 group-hover:text-white"
            >
              <TrendingUp className="w-4 h-4" />
              <span>Trending</span>
              <ChevronDown className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180" />
            </button>

            {/* MEGA MENU: TRENDING (Opens on Hover) */}
            <div className="absolute top-full left-0 w-[400px] bg-[#131217] border border-white/10 rounded-xl p-5 shadow-2xl pointer-events-none opacity-0 translate-y-2 transition-all duration-300 ease-out group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0">
              <div className="flex items-center gap-2 text-white font-bold mb-1">
                <TrendingUp className="w-5 h-5 text-orange-500" />
                <h3>Trending Now</h3>
              </div>
              <p className="text-xs text-gray-400 mb-4">Stay in loop with global internet choices right now.</p>
              
              <div className="space-y-3">
                <DropdownItem icon={<Film className="w-4 h-4 text-red-400" />} title="Trending Movies" desc="Hot movies today." />
                <DropdownItem icon={<Tv className="w-4 h-4 text-blue-400" />} title="Trending Shows" desc="Most watched web-series." />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Right side: Search Input & Profile Actions */}
      <div className="flex items-center gap-4">
        <div className="relative hidden sm:block w-64">
          <input 
            type="text" 
            placeholder="Search movies or series..." 
            className="w-full bg-[#18161c] text-sm text-gray-200 pl-10 pr-4 py-2 rounded-lg border border-white/5 focus:outline-none focus:border-white/20 transition duration-200"
          />
          <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        <button className="bg-red-600 hover:bg-red-700 text-white text-sm px-5 py-2 rounded-lg font-medium transition duration-200 shadow-md shadow-red-600/20 cursor-pointer">
          Sign In
        </button>
      </div>
    </nav>
  );
};

// Reusable Inner Dropdown Component Item
const DropdownItem = ({ icon, title, desc, badge }) => {
  return (
    <div className="flex gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer group/item transition-colors duration-200">
      <div className="mt-1 bg-white/5 w-8 h-8 flex items-center justify-center rounded-md group-hover/item:bg-white/10 transition">
        {icon}
      </div>
      <div>
        <div className="flex items-center gap-2">
          <h4 className="text-sm font-semibold text-gray-200 group-hover/item:text-white transition">{title}</h4>
          {badge && <span className="bg-purple-600 text-[10px] font-bold text-white px-1.5 py-0.5 rounded">{badge}</span>}
        </div>
        <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">{desc}</p>
      </div>
    </div>
  )
}

export default Navbar;