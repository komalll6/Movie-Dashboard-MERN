import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Heart, Trash2, Star, Play, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Watchlist = () => {
  const navigate = useNavigate();
  const { watchlist: contextWatchlist = [], removeFromWatchlist } =
    useAppContext() || {};
  const [movies, setMovies] = useState([]);

  // Sync data between AppContext and LocalStorage
  const loadWatchlistData = () => {
    const localFavs =
      JSON.parse(localStorage.getItem("favMovies")) ||
      JSON.parse(localStorage.getItem("watchlist")) ||
      JSON.parse(localStorage.getItem("movie_hub_watchlist")) ||
      [];

    const combinedMap = new Map();

    localFavs.forEach((item) => {
      if (item && (item.id || item.movieId)) {
        combinedMap.set(String(item.id || item.movieId), item);
      }
    });

    if (Array.isArray(contextWatchlist)) {
      contextWatchlist.forEach((item) => {
        if (item && (item.id || item.movieId)) {
          combinedMap.set(String(item.id || item.movieId), item);
        }
      });
    }

    setMovies(Array.from(combinedMap.values()));
  };

  useEffect(() => {
    loadWatchlistData();

    window.addEventListener("favUpdated", loadWatchlistData);
    window.addEventListener("watchlistUpdated", loadWatchlistData);

    return () => {
      window.removeEventListener("favUpdated", loadWatchlistData);
      window.removeEventListener("watchlistUpdated", loadWatchlistData);
    };
  }, [contextWatchlist]);

  const handleRemove = async (e, movieId) => {
    e.preventDefault();
    e.stopPropagation();

    if (removeFromWatchlist) {
      await removeFromWatchlist(movieId);
    }

    let localFavs =
      JSON.parse(localStorage.getItem("favMovies")) ||
      JSON.parse(localStorage.getItem("watchlist")) ||
      JSON.parse(localStorage.getItem("movie_hub_watchlist")) ||
      [];

    localFavs = localFavs.filter(
      (item) => String(item.id || item.movieId) !== String(movieId)
    );

    localStorage.setItem("favMovies", JSON.stringify(localFavs));
    localStorage.setItem("watchlist", JSON.stringify(localFavs));
    localStorage.setItem("movie_hub_watchlist", JSON.stringify(localFavs));

    setMovies(localFavs);
    window.dispatchEvent(new Event("favUpdated"));
    window.dispatchEvent(new Event("watchlistUpdated"));
  };

  return (
    <div className="min-h-screen bg-[#0d0c0f] text-white pt-24 pb-16 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl md:text-3xl font-black flex items-center gap-2">
                My Watchlist <Heart className="w-6 h-6 text-red-500 fill-red-500" />
              </h1>
              <p className="text-xs text-gray-400 mt-0.5">
                Saved movies & TV series collection
              </p>
            </div>
          </div>
          <span className="bg-red-600/10 border border-red-500/20 text-red-400 font-bold px-3 py-1 rounded-full text-xs">
            {movies.length} Titles
          </span>
        </div>

        {/* Empty State */}
        {movies.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
              <Heart className="w-10 h-10 text-gray-600" />
            </div>
            <h3 className="text-xl font-bold mb-1">Your Watchlist is empty</h3>
            <p className="text-xs text-gray-400 mb-6">
              Explore movies & TV shows and save them to watch later.
            </p>
            <Link
              to="/"
              className="bg-red-600 hover:bg-red-700 text-white font-semibold text-xs px-6 py-3 rounded-xl transition shadow-lg shadow-red-600/20"
            >
              Explore Movies
            </Link>
          </div>
        ) : (
          /* Movie Cards Grid */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {movies.map((item) => {
              const movieId = item.id || item.movieId;
              const displayTitle = item.title || item.name || "Untitled";
              const posterPath = item.poster_path || item.posterPath;
              const isSeries = item.media_type === "series" || item.isTVSeries;
              const rating = item.vote_average || item.voteAverage || 7.0;

              return (
                <div
                  key={movieId}
                  className="group relative bg-[#131217] border border-white/5 rounded-xl overflow-hidden shadow-lg transition duration-300 hover:-translate-y-1 hover:border-white/20"
                >
                  <Link
                    to={isSeries ? `/series/${movieId}` : `/movie/${movieId}`}
                    className="block"
                  >
                    <div className="aspect-[2/3] w-full relative bg-neutral-900 overflow-hidden">
                      <img
                        src={
                          posterPath
                            ? posterPath.startsWith("http")
                              ? posterPath
                              : `https://image.tmdb.org/t/p/w500${posterPath}`
                            : "/placeholder.png"
                        }
                        alt={displayTitle}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                        <span className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg">
                          <Play className="w-4 h-4 fill-current ml-0.5" />
                        </span>
                      </div>
                    </div>
                  </Link>

                  <div className="p-3">
                    <h3 className="text-xs font-bold text-gray-200 truncate group-hover:text-white transition">
                      {displayTitle}
                    </h3>

                    <div className="flex items-center justify-between mt-2">
                      <span className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400" />{" "}
                        {Number(rating).toFixed(1)}
                      </span>

                      <button
                        onClick={(e) => handleRemove(e, movieId)}
                        className="text-gray-400 hover:text-red-500 p-1 rounded-md hover:bg-white/5 transition cursor-pointer"
                        title="Remove from Watchlist"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Watchlist;