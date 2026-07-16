import { useState } from "react";
import SearchDropdown from "./SearchDropdown";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Hardcoded mock results for testing before we hook up the backend service
  const mockMovies = [
    { id: 1, title: "Interstellar", rating: 8.7, year: 2014 },
    { id: 2, title: "The Dark Knight", rating: 9.0, year: 2008 },
    { id: 3, title: "Inception", rating: 8.8, year: 2010 }
  ];

  const filteredMovies = query
    ? mockMovies.filter((movie) =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search movies or series..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)} // Delay to let clicks register
        className="bg-slate-800 text-white placeholder-slate-400 px-4 py-2 rounded-lg outline-none w-72 border border-slate-700 focus:border-red-500 transition-all"
      />

      {isOpen && filteredMovies.length > 0 && (
        <SearchDropdown results={filteredMovies} />
      )}
    </div>
  );
}

export default SearchBar;