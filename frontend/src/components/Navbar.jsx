// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { Film, Tv, TrendingUp, Search, Compass, Flame, Clock, Calendar, Disc, Tv2, Star, ChevronDown, Play } from 'lucide-react';

// const Navbar = () => {
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 20) {
//         setIsScrolled(true);
//       } else {
//         setIsScrolled(false);
//       }
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 md:px-12 py-4 flex items-center justify-between ${
//       isScrolled 
//         ? 'bg-[#0d0c0f]/80 backdrop-blur-md border-b border-white/5 shadow-lg' 
//         : 'bg-gradient-to-b from-black/80 to-transparent'
//     }`}>
      
//       {/* Left side: Logo & Navigation Links */}
//       <div className="flex items-center gap-8">
//         <Link 
//           to="/" 
//           className="text-red-600 font-extrabold text-2xl tracking-wider cursor-pointer select-none display-block"
//         >
//           MovieHub
//         </Link>

//         {/* Nav Links Items */}
//         <div className="hidden md:flex items-center gap-2 text-sm font-medium text-gray-300">
          
//           {/* 🎬 MOVIES HOVER GROUP */}
//           <div className="relative group py-2">
//             <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg cursor-pointer transition group-hover:bg-white/10 group-hover:text-white">
//               <Film className="w-4 h-4" />
//               <span>Movies</span>
//               <ChevronDown className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180" />
//             </button>

//             {/* MEGA MENU: MOVIES */}
//             <div className="absolute top-full left-0 w-[550px] bg-[#131217] border border-white/10 rounded-xl p-6 shadow-2xl pointer-events-none opacity-0 translate-y-2 transition-all duration-300 ease-out group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0">
//               <div className="flex items-center gap-2 text-white font-bold mb-1">
//                 <Film className="w-5 h-5 text-red-500" />
//                 <h3>Movies</h3>
//               </div>
//               <p className="text-xs text-gray-400 mb-6">Embark on a cinematic adventure with our vast collection of movies.</p>
              
//               <div className="grid grid-cols-2 gap-y-4 gap-x-6">
//                 <div className="space-y-4">
//                   <Link to="/movie/category/discover"><DropdownItem icon={<Compass className="w-4 h-4 text-purple-400" />} title="Discover" desc="Uncover hidden gems and releases." badge="NEW" /></Link>
//                   <Link to="/movie/category/now_playing"><DropdownItem icon={<Play className="w-4 h-4 text-emerald-400" />} title="Now Playing" desc="Catch the latest theater releases." /></Link>
//                   <Link to="/movie/category/top_rated"><DropdownItem icon={<Star className="w-4 h-4 text-blue-400" />} title="Top Rated" desc="Highest rated global movies." /></Link>
//                 </div>
//                 <div className="space-y-4">
//                   <Link to="/movie/category/popular"><DropdownItem icon={<Flame className="w-4 h-4 text-orange-400" />} title="Popular" desc="Dive into world trending titles." /></Link>
//                   <Link to="/movie/category/upcoming"><DropdownItem icon={<Calendar className="w-4 h-4 text-pink-400" />} title="Upcoming" desc="Be the first to see fresh content." /></Link>
//                   <Link to="/movie/category/anime"><DropdownItem icon={<Disc className="w-4 h-4 text-yellow-400" />} title="Anime Collection" desc="Action packed dynamic animation." /></Link>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* 📺 SHOWS HOVER GROUP */}
//           <div className="relative group py-2">
//             <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg cursor-pointer transition group-hover:bg-white/10 group-hover:text-white">
//               <Tv className="w-4 h-4" />
//               <span>Shows</span>
//               <ChevronDown className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180" />
//             </button>

//             <div className="absolute top-full left-0 w-[550px] bg-[#131217] border border-white/10 rounded-xl p-6 shadow-2xl pointer-events-none opacity-0 translate-y-2 transition-all duration-300 ease-out group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0">
//               <div className="flex items-center gap-2 text-white font-bold mb-1">
//                 <Tv className="w-5 h-5 text-blue-500" />
//                 <h3>Tv Shows</h3>
//               </div>
//               <p className="text-xs text-gray-400 mb-6">Discover premium web series, television epics and reality shows.</p>
              
//               <div className="grid grid-cols-2 gap-4">
//                 <Link to="/movie/category/tv_discover"><DropdownItem icon={<Compass className="w-4 h-4 text-purple-400" />} title="Discover" desc="Explore premium dynamic series." badge="NEW" /></Link>
//                 <Link to="/movie/category/tv_popular"><DropdownItem icon={<Flame className="w-4 h-4 text-orange-400" />} title="Popular" desc="Shows that people love right now." /></Link>
//                 <Link to="/movie/category/tv_airing_today"><DropdownItem icon={<Tv2 className="w-4 h-4 text-emerald-400" />} title="Airing Today" desc="Episodes running on air tonight." /></Link>
//                 <Link to="/movie/category/tv_top_rated"><DropdownItem icon={<Star className="w-4 h-4 text-yellow-400" />} title="Top Rated" desc="Top regular running broadcasts." /></Link>
//               </div>
//             </div>
//           </div>

//           {/* 🔥 TRENDING HOVER GROUP */}
//           <div className="relative group py-2">
//             <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg cursor-pointer transition group-hover:bg-white/10 group-hover:text-white">
//               <TrendingUp className="w-4 h-4" />
//               <span>Trending</span>
//               <ChevronDown className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180" />
//             </button>

//             <div className="absolute top-full left-0 w-[400px] bg-[#131217] border border-white/10 rounded-xl p-5 shadow-2xl pointer-events-none opacity-0 translate-y-2 transition-all duration-300 ease-out group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0">
//               <div className="flex items-center gap-2 text-white font-bold mb-1">
//                 <TrendingUp className="w-5 h-5 text-orange-500" />
//                 <h3>Trending Now</h3>
//               </div>
//               <p className="text-xs text-gray-400 mb-4">Stay in loop with global internet choices right now.</p>
              
//               <div className="space-y-3">
//                 <Link to="/movie/category/trending_movie"><DropdownItem icon={<Film className="w-4 h-4 text-red-400" />} title="Trending Movies" desc="Hot movies today." /></Link>
//                 <Link to="/movie/category/trending_tv"><DropdownItem icon={<Tv className="w-4 h-4 text-blue-400" />} title="Trending Shows" desc="Most watched web-series." /></Link>
//               </div>
//             </div>
//           </div>

//         </div>
//       </div>

//       {/* Right side */}
//       <div className="flex items-center gap-4">
//         <div className="relative hidden sm:block w-64">
//           <input 
//             type="text" 
//             placeholder="Search movies or series..." 
//             className="w-full bg-[#18161c] text-sm text-gray-200 pl-10 pr-4 py-2 rounded-lg border border-white/5 focus:outline-none focus:border-white/20 transition duration-200"
//           />
//           <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
//         </div>

//         <button className="bg-red-600 hover:bg-red-700 text-white text-sm px-5 py-2 rounded-lg font-medium transition duration-200 shadow-md shadow-red-600/20 cursor-pointer">
//           Sign In
//         </button>
//       </div>
//     </nav>
//   );
// };

// const DropdownItem = ({ icon, title, desc, badge }) => {
//   return (
//     <div className="flex gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer group/item transition-colors duration-200 w-full text-left">
//       <div className="mt-1 bg-white/5 w-8 h-8 flex items-center justify-center rounded-md group-hover/item:bg-white/10 transition">
//         {icon}
//       </div>
//       <div>
//         <div className="flex items-center gap-2">
//           <h4 className="text-sm font-semibold text-gray-200 group-hover/item:text-white transition">{title}</h4>
//           {badge && <span className="bg-purple-600 text-[10px] font-bold text-white px-1.5 py-0.5 rounded">{badge}</span>}
//         </div>
//         <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">{desc}</p>
//       </div>
//     </div>
//   );
// };

// export default Navbar;



//old
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { Film, Tv, TrendingUp, Search, Compass, Flame, Star, ChevronDown, Disc, Tv2 } from 'lucide-react';

// const Navbar = () => {
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 20) {
//         setIsScrolled(true);
//       } else {
//         setIsScrolled(false);
//       }
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 md:px-12 py-4 flex items-center justify-between ${
//       isScrolled 
//         ? 'bg-[#0d0c0f]/80 backdrop-blur-md border-b border-white/5 shadow-lg' 
//         : 'bg-gradient-to-b from-black/80 to-transparent'
//     }`}>
      
//       {/* Left side: Logo & Navigation Links */}
//       <div className="flex items-center gap-8">
//         <Link 
//           to="/" 
//           className="text-red-600 font-extrabold text-2xl tracking-wider cursor-pointer select-none block"
//         >
//           MovieHub
//         </Link>

//         {/* Nav Links Items */}
//         <div className="hidden md:flex items-center gap-2 text-sm font-medium text-gray-300">
          
//           {/* 🎬 MOVIES HOVER GROUP */}
//           <div className="relative group py-2">
//             <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg cursor-pointer transition group-hover:bg-white/10 group-hover:text-white">
//               <Film className="w-4 h-4" />
//               <span>Movies</span>
//               <ChevronDown className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180" />
//             </button>

//             {/* MEGA MENU: MOVIES */}
//             <div className="absolute top-full left-0 w-[550px] bg-[#131217] border border-white/10 rounded-xl p-6 shadow-2xl pointer-events-none opacity-0 translate-y-2 transition-all duration-300 ease-out group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0">
//               <div className="flex items-center gap-2 text-white font-bold mb-1">
//                 <Film className="w-5 h-5 text-red-500" />
//                 <h3>Movies</h3>
//               </div>
//               <p className="text-xs text-gray-400 mb-6">Embark on a cinematic adventure with our vast collection of movies.</p>
              
//               <div className="grid grid-cols-2 gap-y-4 gap-x-6">
//                 <div className="space-y-4">
//                   <Link to="/movie/category/discover"><DropdownItem icon={<Compass className="w-4 h-4 text-purple-400" />} title="Discover" desc="Uncover hidden gems and releases." badge="NEW" /></Link>
//                   <Link to="/movie/category/top_rated"><DropdownItem icon={<Star className="w-4 h-4 text-blue-400" />} title="Top Rated" desc="Highest rated global movies." /></Link>
//                 </div>
//                 <div className="space-y-4">
//                   <Link to="/movie/category/popular"><DropdownItem icon={<Flame className="w-4 h-4 text-orange-400" />} title="Popular" desc="Dive into world trending titles." /></Link>
//                   <Link to="/movie/category/anime"><DropdownItem icon={<Disc className="w-4 h-4 text-yellow-400" />} title="Anime Collection" desc="Action packed dynamic animation." /></Link>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* 📺 SHOWS HOVER GROUP */}
//           <div className="relative group py-2">
//             <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg cursor-pointer transition group-hover:bg-white/10 group-hover:text-white">
//               <Tv className="w-4 h-4" />
//               <span>Series</span>
//               <ChevronDown className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180" />
//             </button>

//             <div className="absolute top-full left-0 w-[550px] bg-[#131217] border border-white/10 rounded-xl p-6 shadow-2xl pointer-events-none opacity-0 translate-y-2 transition-all duration-300 ease-out group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0">
//               <div className="flex items-center gap-2 text-white font-bold mb-1">
//                 <Tv className="w-5 h-5 text-blue-500" />
//                 <h3>OTT Series</h3>
//               </div>
//               <p className="text-xs text-gray-400 mb-6">Discover premium web series, television epics and reality shows.</p>
              
//               <div className="grid grid-cols-2 gap-4">
//                 <Link to="/series/category/tv_discover"><DropdownItem icon={<Compass className="w-4 h-4 text-purple-400" />} title="Discover" desc="Explore premium dynamic series." badge="NEW" /></Link>
//                 <Link to="/series/category/tv_popular"><DropdownItem icon={<Flame className="w-4 h-4 text-orange-400" />} title="Popular" desc="Shows that people love right now." /></Link>
//                 <Link to="/series/category/tv_airing_today"><DropdownItem icon={<Tv2 className="w-4 h-4 text-emerald-400" />} title="Airing Today" desc="Episodes running on air tonight." /></Link>
//                 <Link to="/series/category/tv_top_rated"><DropdownItem icon={<Star className="w-4 h-4 text-yellow-400" />} title="Top Rated" desc="Top regular running broadcasts." /></Link>
//               </div>
//             </div>
//           </div>

//           {/* 🔥 TRENDING HOVER GROUP */}
//           <div className="relative group py-2">
//             <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg cursor-pointer transition group-hover:bg-white/10 group-hover:text-white">
//               <TrendingUp className="w-4 h-4" />
//               <span>Trending</span>
//               <ChevronDown className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180" />
//             </button>

//             <div className="absolute top-full left-0 w-[400px] bg-[#131217] border border-white/10 rounded-xl p-5 shadow-2xl pointer-events-none opacity-0 translate-y-2 transition-all duration-300 ease-out group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0">
//               <div className="flex items-center gap-2 text-white font-bold mb-1">
//                 <TrendingUp className="w-5 h-5 text-orange-500" />
//                 <h3>Trending Now</h3>
//               </div>
//               <p className="text-xs text-gray-400 mb-4">Stay in loop with global internet choices right now.</p>
              
//               {/* 🔥 TRENDING HOVER GROUP inside Navbar.jsx */}
// <div className="space-y-3">
//   <Link to="/movie/category/trending_movie">
//     <DropdownItem icon={<Film className="w-4 h-4 text-red-400" />} title="Trending Movies" desc="Hot movies today." />
//   </Link>
  
//   {/* BAD: /series/category/trending_tv */}
//   {/* GOOD: /movie/category/trending_tv */}
//   <Link to="/movie/category/trending_tv">
//     <DropdownItem icon={<Tv className="w-4 h-4 text-blue-400" />} title="Trending Shows" desc="Most watched web-series." />
//   </Link>
// </div>
//             </div>
//           </div>

//         </div>
//       </div>

//       {/* Right side */}
//       <div className="flex items-center gap-4">
//         <div className="relative hidden sm:block w-64">
//           <input 
//             type="text" 
//             placeholder="Search movies or series..." 
//             className="w-full bg-[#18161c] text-sm text-gray-200 pl-10 pr-4 py-2 rounded-lg border border-white/5 focus:outline-none focus:border-white/20 transition duration-200"
//           />
//           <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
//         </div>

//         <button className="bg-red-600 hover:bg-red-700 text-white text-sm px-5 py-2 rounded-lg font-medium transition duration-200 shadow-md shadow-red-600/20 cursor-pointer">
//           Sign In
//         </button>
//       </div>
//     </nav>
//   );
// };

// const DropdownItem = ({ icon, title, desc, badge }) => {
//   return (
//     <div className="flex gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer group/item transition-colors duration-200 w-full text-left">
//       <div className="mt-1 bg-white/5 w-8 h-8 flex items-center justify-center rounded-md group-hover/item:bg-white/10 transition">
//         {icon}
//       </div>
//       <div>
//         <div className="flex items-center gap-2">
//           <h4 className="text-sm font-semibold text-gray-200 group-hover/item:text-white transition">{title}</h4>
//           {badge && <span className="bg-purple-600 text-[10px] font-bold text-white px-1.5 py-0.5 rounded">{badge}</span>}
//         </div>
//         <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">{desc}</p>
//       </div>
//     </div>
//   );
// };

// export default Navbar;


//search bar
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { movieService } from '../services/movieService';
import { Search, Film, Tv, Star, X } from 'lucide-react';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  
  const navigate = useNavigate();
  const searchRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced multi-search call (fetches both movies & TV series)
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.trim().length > 1) {
        setIsLoading(true);
        try {
          // If movieService has searchMulti/searchMovies/searchSeries
          let results = [];
          if (typeof movieService.searchMulti === 'function') {
            results = await movieService.searchMulti(searchQuery);
          } else if (typeof movieService.searchMovies === 'function') {
            results = await movieService.searchMovies(searchQuery);
          }

          // Filter out person/actor results and limit to 7 items
          const filtered = (results || []).filter(
            item => item.media_type === 'movie' || item.media_type === 'tv' || item.title || item.name
          ).slice(0, 7);

          setSearchResults(filtered);
          setShowDropdown(true);
        } catch (error) {
          console.error("Search error:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSearchResults([]);
        setShowDropdown(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Navigate to proper Route based on media_type
  const handleItemClick = (item) => {
    setShowDropdown(false);
    setSearchQuery('');
    
    // Detect if item is a TV Series or Movie
    const isTV = item.media_type === 'tv' || item.first_air_date || item.name && !item.title;

    if (isTV) {
      navigate(`/series/${item.id}`);
    } else {
      navigate(`/movie/${item.id}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      setShowDropdown(false);
      // Optional: navigate to dedicated search page
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0d0c0f]/90 backdrop-blur-md border-b border-white/10 px-4 md:px-12 py-3 flex items-center justify-between">
      
      {/* Brand Logo */}
      <Link to="/" className="text-2xl font-black text-red-600 tracking-wider flex items-center gap-1">
        MovieHub
      </Link>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-gray-300">
        <Link to="/" className="hover:text-white transition">Movies</Link>
        <Link to="/series" className="hover:text-white transition">Series</Link>
        <Link to="/trending" className="hover:text-white transition">Trending</Link>
      </div>

      {/* Search Input & Dropdown Container */}
      <div className="relative w-full max-w-xs sm:max-w-sm" ref={searchRef}>
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search movies or series..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => searchQuery.trim().length > 1 && setShowDropdown(true)}
            className="w-full bg-[#17161b] text-white text-xs rounded-xl pl-9 pr-8 py-2.5 border border-white/10 focus:border-red-600 outline-none transition placeholder-gray-500 shadow-inner"
          />
          {searchQuery && (
            <button 
              onClick={() => { setSearchQuery(''); setShowDropdown(false); }}
              className="absolute right-2.5 text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Live Search Results Dropdown */}
        {showDropdown && (
          <div className="absolute top-full left-0 w-full mt-2 bg-[#131217] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-[100] max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="p-4 text-center text-xs text-gray-400 flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-red-600"></div>
                Searching...
              </div>
            ) : searchResults.length === 0 ? (
              <div className="p-4 text-center text-xs text-gray-400">
                No matching movies or series found.
              </div>
            ) : (
              <div className="divide-y divide-white/5">
                {searchResults.map((item) => {
                  const title = item.title || item.name;
                  const isTV = item.media_type === 'tv' || item.first_air_date || item.name && !item.title;
                  const releaseYear = (item.release_date || item.first_air_date)?.split('-')[0];

                  return (
                    <div
                      key={item.id}
                      onClick={() => handleItemClick(item)}
                      className="flex items-center gap-3 p-3 hover:bg-white/5 cursor-pointer transition group"
                    >
                      {/* Thumbnail */}
                      <div className="w-10 h-14 bg-neutral-800 rounded overflow-hidden shrink-0 border border-white/5">
                        {item.poster_path ? (
                          <img
                            src={`https://image.tmdb.org/t/p/w92${item.poster_path}`}
                            alt={title}
                            className="w-full h-full object-cover group-hover:scale-105 transition"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-500">
                            No Img
                          </div>
                        )}
                      </div>

                      {/* Content Info */}
                      <div className="flex-1 min-w-0">
                        <h5 className="text-xs font-bold text-gray-200 truncate group-hover:text-red-500 transition">
                          {title}
                        </h5>
                        <div className="flex items-center gap-2 mt-1 text-[10px] text-gray-400">
                          {isTV ? (
                            <span className="bg-purple-600/20 text-purple-400 px-1.5 py-0.5 rounded flex items-center gap-0.5 border border-purple-500/30 font-semibold">
                              <Tv className="w-2.5 h-2.5" /> Series
                            </span>
                          ) : (
                            <span className="bg-red-600/20 text-red-400 px-1.5 py-0.5 rounded flex items-center gap-0.5 border border-red-500/30 font-semibold">
                              <Film className="w-2.5 h-2.5" /> Movie
                            </span>
                          )}

                          {releaseYear && <span>{releaseYear}</span>}

                          {item.vote_average > 0 && (
                            <span className="flex items-center gap-0.5 text-yellow-500 font-bold ml-auto">
                              <Star className="w-2.5 h-2.5 fill-current" />
                              {item.vote_average.toFixed(1)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Auth Actions */}
      <button className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition shadow-md shadow-red-600/20">
        Sign In
      </button>
    </nav>
  );
};

export default Navbar;