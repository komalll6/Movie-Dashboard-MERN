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
