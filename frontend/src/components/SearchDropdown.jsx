import { Link } from "react-router-dom";

function SearchDropdown({ results }) {
  return (
    <div className="absolute top-12 left-0 w-full bg-slate-900 border border-slate-800 rounded-lg shadow-2xl z-50 overflow-hidden">
      <div className="flex flex-col">
        {results.map((movie) => (
          <Link
            key={movie.id}
            to={`/movie/${movie.id}`}
            className="flex justify-between items-center px-4 py-3 hover:bg-slate-800 transition text-sm border-b border-slate-800/50 last:border-0"
          >
            <div>
              <p className="font-semibold text-white">{movie.title}</p>
              <p className="text-xs text-slate-400">{movie.year}</p>
            </div>
            <span className="text-yellow-400 font-medium">⭐ {movie.rating}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SearchDropdown;