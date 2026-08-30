//OLD

import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Film, Tv, TrendingUp, Compass, Flame, Star, ChevronDown, Disc, Tv2, Heart, LogOut } from 'lucide-react';
import SearchBar from './SearchBar';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [favCount, setFavCount] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const auth = useAuth() || {};
  const { user, logoutUser } = auth;
  const navigate = useNavigate();

  const userInitial = user?.userName ? user.userName.charAt(0).toUpperCase() : "U";

  const handleLogout = () => {
    if (logoutUser) logoutUser();
    setDropdownOpen(false);
    navigate('/signin');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  useEffect(() => {
    const updateCount = () => {
      const favs = JSON.parse(localStorage.getItem('favMovies')) || [];
      setFavCount(favs.length);
    };

    updateCount();
    window.addEventListener('storage', updateCount);
    window.addEventListener('favUpdated', updateCount);

    return () => {
      window.removeEventListener('storage', updateCount);
      window.removeEventListener('favUpdated', updateCount);
    };
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 md:px-12 py-4 flex items-center justify-between ${
      isScrolled 
        ? 'bg-[#0d0c0f]/80 backdrop-blur-md border-b border-white/5 shadow-lg' 
        : 'bg-gradient-to-b from-black/80 to-transparent'
    }`}>

      <div className="flex items-center gap-8">
        <Link 
          to="/" 
          className="text-red-600 font-extrabold text-2xl tracking-wider cursor-pointer select-none block"
        >
          KOMSIFY
        </Link>

        <div className="hidden md:flex items-center gap-2 text-sm font-medium text-gray-300">

          <div className="relative group py-2">
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg cursor-pointer transition group-hover:bg-white/10 group-hover:text-white">
              <Film className="w-4 h-4" />
              <span>Movies</span>
              <ChevronDown className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180" />
            </button>

            <div className="absolute top-full left-0 w-[550px] bg-[#131217] border border-white/10 rounded-xl p-6 shadow-2xl pointer-events-none opacity-0 translate-y-2 transition-all duration-300 ease-out group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0">
              <div className="flex items-center gap-2 text-white font-bold mb-1">
                <Film className="w-5 h-5 text-red-500" />
                <h3>Movies</h3>
              </div>
              <p className="text-xs text-gray-400 mb-6">Embark on a cinematic adventure with our vast collection of movies.</p>

              <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                <div className="space-y-4">
                  <Link to="/movie/category/discover"><DropdownItem icon={<Compass className="w-4 h-4 text-purple-400" />} title="Discover" desc="Uncover hidden gems and releases." badge="NEW" /></Link>
                  <Link to="/movie/category/top_rated"><DropdownItem icon={<Star className="w-4 h-4 text-blue-400" />} title="Top Rated" desc="Highest rated global movies." /></Link>
                </div>
                <div className="space-y-4">
                  <Link to="/movie/category/popular"><DropdownItem icon={<Flame className="w-4 h-4 text-orange-400" />} title="Popular" desc="Dive into world trending titles." /></Link>
                  <Link to="/movie/category/anime"><DropdownItem icon={<Disc className="w-4 h-4 text-yellow-400" />} title="Anime Collection" desc="Action packed dynamic animation." /></Link>
                </div>
              </div>
            </div>
          </div>

          <div className="relative group py-2">
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg cursor-pointer transition group-hover:bg-white/10 group-hover:text-white">
              <Tv className="w-4 h-4" />
              <span>Series</span>
              <ChevronDown className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180" />
            </button>

            <div className="absolute top-full left-0 w-[550px] bg-[#131217] border border-white/10 rounded-xl p-6 shadow-2xl pointer-events-none opacity-0 translate-y-2 transition-all duration-300 ease-out group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0">
              <div className="flex items-center gap-2 text-white font-bold mb-1">
                <Tv className="w-5 h-5 text-blue-500" />
                <h3>OTT Series</h3>
              </div>
              <p className="text-xs text-gray-400 mb-6">Discover premium web series, television epics and reality shows.</p>

              <div className="grid grid-cols-2 gap-4">
                <Link to="/series/category/tv_discover"><DropdownItem icon={<Compass className="w-4 h-4 text-purple-400" />} title="Discover" desc="Explore premium dynamic series." badge="NEW" /></Link>
                <Link to="/series/category/tv_popular"><DropdownItem icon={<Flame className="w-4 h-4 text-orange-400" />} title="Popular" desc="Shows that people love right now." /></Link>
                <Link to="/series/category/tv_airing_today"><DropdownItem icon={<Tv2 className="w-4 h-4 text-emerald-400" />} title="Airing Today" desc="Episodes running on air tonight." /></Link>
                <Link to="/series/category/tv_top_rated"><DropdownItem icon={<Star className="w-4 h-4 text-yellow-400" />} title="Top Rated" desc="Top regular running broadcasts." /></Link>
              </div>
            </div>
          </div>

          <div className="relative group py-2">
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg cursor-pointer transition group-hover:bg-white/10 group-hover:text-white">
              <TrendingUp className="w-4 h-4" />
              <span>Trending</span>
              <ChevronDown className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180" />
            </button>

            <div className="absolute top-full left-0 w-[400px] bg-[#131217] border border-white/10 rounded-xl p-5 shadow-2xl pointer-events-none opacity-0 translate-y-2 transition-all duration-300 ease-out group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0">
              <div className="flex items-center gap-2 text-white font-bold mb-1">
                <TrendingUp className="w-5 h-5 text-orange-500" />
                <h3>Trending Now</h3>
              </div>
              <p className="text-xs text-gray-400 mb-4">Stay in loop with global internet choices right now.</p>

              <div className="space-y-3">
                <Link to="/movie/category/trending_movie">
                  <DropdownItem icon={<Film className="w-4 h-4 text-red-400" />} title="Trending Movies" desc="Hot movies today." />
                </Link>
                <Link to="/movie/category/trending_tv">
                  <DropdownItem icon={<Tv className="w-4 h-4 text-blue-400" />} title="Trending Shows" desc="Most watched web-series." />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:block">
          <SearchBar />
        </div>

        <button 
          onClick={() => navigate('/watchlist')}
          className="relative p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-gray-300 hover:text-red-500 transition duration-200 cursor-pointer flex items-center justify-center"
          title="Watchlist"
        >
          <Heart className="w-4 h-4" />
          {favCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-md">
              {favCount}
            </span>
          )}
        </button>

        {user ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-10 h-10 rounded-full bg-red-600 text-white font-bold text-base flex items-center justify-center hover:bg-red-700 transition cursor-pointer shadow-lg border border-white/20 select-none"
              title={user.userName}
            >
              {userInitial}
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-48 bg-[#131217] border border-white/10 rounded-xl shadow-2xl py-2 z-50 text-sm animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-4 py-2 border-b border-white/10">
                  <p className="font-semibold text-white truncate">{user.userName}</p>
                  <p className="text-xs text-gray-400 truncate">{user.email}</p>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-400 hover:bg-red-600/10 hover:text-red-500 transition font-medium flex items-center gap-2 cursor-pointer mt-1"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <button 
            onClick={() => navigate('/signin')}
            className="bg-red-600 hover:bg-red-700 text-white text-sm px-5 py-2 rounded-lg font-medium transition duration-200 shadow-md shadow-red-600/20 cursor-pointer"
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
};

const DropdownItem = ({ icon, title, desc, badge }) => {
  return (
    <div className="flex gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer group/item transition-colors duration-200 w-full text-left">
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
  );
};

export default Navbar;
