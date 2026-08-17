// import { useState } from "react";
// import SearchDropdown from "./SearchDropdown";

// function SearchBar() {
//   const [query, setQuery] = useState("");
//   const [isOpen, setIsOpen] = useState(false);

//   // Hardcoded mock results for testing before we hook up the backend service
//   const mockMovies = [
//     { id: 1, title: "Interstellar", rating: 8.7, year: 2014 },
//     { id: 2, title: "The Dark Knight", rating: 9.0, year: 2008 },
//     { id: 3, title: "Inception", rating: 8.8, year: 2010 }
//   ];

//   const filteredMovies = query
//     ? mockMovies.filter((movie) =>
//         movie.title.toLowerCase().includes(query.toLowerCase())
//       )
//     : [];

//   return (
//     <div className="relative">
//       <input
//         type="text"
//         placeholder="Search movies or series..."
//         value={query}
//         onChange={(e) => {
//           setQuery(e.target.value);
//           setIsOpen(true);
//         }}
//         onFocus={() => setIsOpen(true)}
//         onBlur={() => setTimeout(() => setIsOpen(false), 200)} // Delay to let clicks register
//         className="bg-slate-800 text-white placeholder-slate-400 px-4 py-2 rounded-lg outline-none w-72 border border-slate-700 focus:border-red-500 transition-all"
//       />

//       {isOpen && filteredMovies.length > 0 && (
//         <SearchDropdown results={filteredMovies} />
//       )}
//     </div>
//   );
// }

// export default SearchBar;


// SearchBar.jsx
// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { movieService } from "../services/movieService";
// import SearchDropdown from "./SearchDropdown";

// function SearchBar() {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState([]);
//   const [isOpen, setIsOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
  
//   const searchRef = useRef(null);
//   const navigate = useNavigate();

//   // Outside click handles auto-close
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (searchRef.current && !searchRef.current.contains(e.target)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Fetch search results dynamically as user types
//   useEffect(() => {
//     const timer = setTimeout(async () => {
//       const trimmed = query.trim();
//       if (trimmed.length > 0) {
//         setLoading(true);
//         const data = await movieService.searchMulti(trimmed);

//         // 💡 FILTER: Sirf Movies & TV Shows filter karein jinke paas Poster image hai
//         const validResults = (data || []).filter((item) => {
//           const isMovieOrTv = item.media_type === "movie" || item.media_type === "tv";
//           const hasPoster = Boolean(item.poster_path);
//           return isMovieOrTv && hasPoster;
//         });

//         setResults(validResults.slice(0, 8)); // Top 8 relative matches with images
//         setIsOpen(true);
//         setLoading(false);
//       } else {
//         setResults([]);
//         setIsOpen(false);
//       }
//     }, 300);

//     return () => clearTimeout(timer);
//   }, [query]);

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter" && query.trim()) {
//       setIsOpen(false);
//       navigate(`/search?q=${encodeURIComponent(query.trim())}`);
//     }
//   };

//   return (
//     <div className="relative w-full max-w-xs sm:max-w-sm" ref={searchRef}>
//       <input
//         type="text"
//         placeholder="Search movies, series, keywords..."
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         onKeyDown={handleKeyDown}
//         onFocus={() => query.trim().length > 0 && setIsOpen(true)}
//         className="bg-slate-800/90 text-white placeholder-slate-400 px-4 py-2 rounded-lg outline-none w-full border border-slate-700 focus:border-red-500 transition-all text-sm shadow-md"
//       />

//       {isOpen && (
//         <SearchDropdown 
//           results={results} 
//           loading={loading} 
//           onSelect={() => setIsOpen(false)} 
//         />
//       )}
//     </div>
//   );
// }

// export default SearchBar;

//new - 25-07 searchbar
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { movieService } from "../services/movieService";
import SearchDropdown from "./SearchDropdown";
import { Search } from "lucide-react";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Outside click handles auto-close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch search results dynamically with debouncing
  useEffect(() => {
    const timer = setTimeout(async () => {
      const trimmed = query.trim();
      if (trimmed.length > 0) {
        setLoading(true);
        const data = await movieService.searchMulti(trimmed);

        const validResults = (data || []).filter((item) => {
          const isMovieOrTv = item.media_type === "movie" || item.media_type === "tv";
          const hasPoster = Boolean(item.poster_path);
          return isMovieOrTv && hasPoster;
        });

        setResults(validResults.slice(0, 8));
        setIsOpen(true);
        setLoading(false);
      } else {
        setResults([]);
        setIsOpen(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // 🟢 UPDATED: Direct redirect to top result on Enter press
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query.trim()) {
      setIsOpen(false);

      if (results && results.length > 0) {
        const topMatch = results[0];
        const isTV = topMatch.media_type === "tv" || topMatch.first_air_date || (topMatch.name && !topMatch.title);

        if (isTV) {
          navigate(`/series/${topMatch.id}`);
        } else {
          navigate(`/movie/${topMatch.id}`);
        }
      } else {
        // Fallback to search list if no results fetched yet
        navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      }
    }
  };

  return (
    <div className="relative w-64" ref={searchRef}>
      <input
        type="text"
        placeholder="Search movies or series..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => query.trim().length > 0 && setIsOpen(true)}
        className="w-full bg-[#18161c] text-sm text-gray-200 pl-10 pr-4 py-2 rounded-lg border border-white/5 focus:outline-none focus:border-white/20 transition duration-200"
      />
      <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />

      {isOpen && (
        <SearchDropdown 
          results={results} 
          loading={loading} 
          onSelect={() => setIsOpen(false)} 
        />
      )}
    </div>
  );
}

export default SearchBar;
