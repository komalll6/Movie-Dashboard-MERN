// SearchDropdown.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

function SearchDropdown({ results, loading, onSelect }) {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="absolute top-12 left-0 w-full bg-slate-900 border border-slate-800 rounded-lg shadow-2xl z-50 p-4 text-center text-xs text-slate-400">
        Searching references & media...
      </div>
    );
  }

  if (!results || results.length === 0) {
    return (
      <div className="absolute top-12 left-0 w-full bg-slate-900 border border-slate-800 rounded-lg shadow-2xl z-50 p-4 text-center text-xs text-slate-400">
        No relative movies or series found.
      </div>
    );
  }

  const handleItemClick = (item) => {
    onSelect();
    const isTV = item.media_type === "tv" || item.first_air_date || (item.name && !item.title);
    if (isTV) {
      navigate(`/series/${item.id}`);
    } else {
      navigate(`/movie/${item.id}`);
    }
  };

  return (
    <div className="absolute top-12 left-0 w-full bg-slate-900 border border-slate-800 rounded-lg shadow-2xl z-50 overflow-hidden max-h-96 overflow-y-auto">
      <div className="flex flex-col divide-y divide-slate-800/60">
        {results.map((item) => {
          const title = item.title || item.name;
          const year = (item.release_date || item.first_air_date)?.split("-")[0];
          const isTV = item.media_type === "tv" || item.first_air_date || (item.name && !item.title);

          return (
            <div
              key={item.id}
              onClick={() => handleItemClick(item)}
              className="flex justify-between items-center px-4 py-2.5 hover:bg-slate-800 transition text-sm cursor-pointer group"
            >
              <div className="flex items-center gap-3 min-w-0 pr-2">
                {/* Poster Thumbnail */}
                <div className="w-9 h-12 bg-slate-800 rounded overflow-hidden shrink-0 border border-slate-700/50">
                  {item.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w92${item.poster_path}`}
                      alt={title}
                      className="w-full h-full object-cover group-hover:scale-105 transition"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[9px] text-slate-500 text-center leading-tight">No Image</div>
                  )}
                </div>

                <div className="min-w-0">
                  <p className="font-semibold text-white truncate text-xs group-hover:text-red-400 transition">{title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${isTV ? 'bg-purple-900/80 text-purple-200' : 'bg-red-900/80 text-red-200'}`}>
                      {isTV ? 'TV Series' : 'Movie'}
                    </span>
                    {year && <span className="text-[11px] text-slate-400">{year}</span>}
                  </div>
                </div>
              </div>

              {item.vote_average > 0 && (
                <span className="text-yellow-400 font-bold text-xs shrink-0 flex items-center gap-0.5">
                  ★ {item.vote_average.toFixed(1)}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SearchDropdown;