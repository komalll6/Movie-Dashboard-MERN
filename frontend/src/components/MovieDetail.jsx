import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { movieService } from '../services/movieService';
import { Play, Heart, Star, Clock, X, Tv, ChevronDown } from 'lucide-react';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null); 
  const [showTrailer, setShowTrailer] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  // States for dynamic Season & Episode dropdown selection
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [episodes, setEpisodes] = useState([]);
  const [loadingEpisodes, setLoadingEpisodes] = useState(false);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        setLoading(true);
        const details = await movieService.getMovieDetails(id);
        setMovie(details);

        if (details.credits && details.credits.cast) {
          setCast(details.credits.cast.slice(0, 16)); 
        }

        if (details.videos && details.videos.results) {
          const mainTrailer = details.videos.results.find(
            (vid) => vid.site === "YouTube" && vid.type === "Trailer" && 
            (vid.name.toLowerCase().includes("official trailer") || vid.name.toLowerCase().includes("trailer"))
          );
          const backupTrailer = details.videos.results.find(
            (vid) => vid.site === "YouTube" && (vid.type === "Trailer" || vid.type === "Teaser")
          );
          const finalKey = mainTrailer ? mainTrailer.key : (backupTrailer ? backupTrailer.key : null);
          setTrailerKey(finalKey);
        }

        const currentFavs = JSON.parse(localStorage.getItem('favMovies')) || [];
        const exists = currentFavs.some(item => item.id === details.id);
        setIsFavorite(exists);

        // If it is a series, automatically pull Season 1 episodes list initially
        if (details.isTVSeries) {
          setLoadingEpisodes(true);
          const epData = await movieService.getSeasonEpisodes(id, 1);
          setEpisodes(epData);
          setLoadingEpisodes(false);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error loading movie details:", error);
        setLoading(false);
      }
    };

    fetchMovieData();
    setShowTrailer(false);
    setSelectedSeason(1);
  }, [id]);

  // Handler function for when the user picks another season from dropdown selection box
  const handleSeasonChange = async (seasonNum) => {
    setSelectedSeason(seasonNum);
    setLoadingEpisodes(true);
    const epData = await movieService.getSeasonEpisodes(id, seasonNum);
    setEpisodes(epData);
    setLoadingEpisodes(false);
  };

  const toggleFavorite = () => {
    let currentFavs = JSON.parse(localStorage.getItem('favMovies')) || [];
    if (isFavorite) {
      currentFavs = currentFavs.filter(item => item.id !== movie.id);
      setIsFavorite(false);
    } else {
      currentFavs.push({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        vote_average: movie.vote_average
      });
      setIsFavorite(true);
    }
    localStorage.setItem('favMovies', JSON.stringify(currentFavs));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d0c0f] flex items-center justify-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!movie) return <div className="text-white text-center mt-20">Movie not found!</div>;

  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : "";

  return (
    <div className="min-h-screen bg-[#0d0c0f] text-gray-200 pt-20 pb-12 px-4 md:px-12 relative overflow-hidden">
      
      {/* Background Backdrop Poster */}
      <div className="absolute top-0 left-0 w-full h-[60vh] opacity-15 pointer-events-none">
        <img 
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} 
          alt="" 
          className="w-full h-full object-cover blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0c0f] to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 mt-6">
        <div className="flex flex-col sm:flex-row gap-6 md:gap-8">
          
          {/* Poster Card */}
          <div className="w-full sm:w-[240px] shrink-0 mx-auto sm:mx-0">
            <div className="rounded-xl overflow-hidden border border-white/10 shadow-xl shadow-black/40">
              <img 
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                alt={movie.title}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Text Info Block */}
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              {movie.title} {releaseYear && <span className="text-gray-500 font-normal">({releaseYear})</span>}
            </h1>

            <div className="flex flex-wrap items-center gap-3 mt-4 text-xs font-semibold">
              <span className="bg-yellow-500 text-black px-2 py-0.5 rounded flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-black" /> {movie.vote_average?.toFixed(1)}
              </span>
              
              {movie.isTVSeries ? (
                <span className="bg-purple-600 text-white px-2.5 py-0.5 rounded flex items-center gap-1 uppercase tracking-wider text-[10px]">
                  <Tv className="w-3 h-3" /> TV Show
                </span>
              ) : (
                movie.runtime > 0 && (
                  <span className="bg-white/5 border border-white/10 px-2.5 py-0.5 rounded flex items-center gap-1 text-gray-400">
                    <Clock className="w-3.5 h-3.5" /> {movie.runtime} min
                  </span>
                )
              )}

              <span className="text-red-500 tracking-wider">
                {movie.genres?.map(g => g.name).join(', ')}
              </span>
            </div>

            {/* Control Action Buttons */}
            <div className="flex flex-wrap gap-3 mt-6">
              <button 
                type="button" 
                disabled={!trailerKey}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowTrailer(true);
                }}
                className={`font-semibold text-sm px-6 py-2.5 rounded-lg flex items-center gap-2 transition shadow-lg ${
                  trailerKey 
                    ? 'bg-red-600 hover:bg-red-700 text-white cursor-pointer shadow-red-600/10' 
                    : 'bg-neutral-800 text-gray-500 cursor-not-allowed shadow-none'
                }`}
              >
                <Play className="w-4 h-4 fill-current" />
                {trailerKey ? 'Watch Trailer' : 'No Trailer Available'}
              </button>

              <button 
                onClick={toggleFavorite}
                className={`font-semibold text-sm px-5 py-2.5 rounded-lg flex items-center gap-2 cursor-pointer transition border ${
                  isFavorite 
                    ? 'bg-pink-600/10 border-pink-500/30 text-pink-500 hover:bg-pink-600/20' 
                    : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-pink-500' : ''}`} />
                {isFavorite ? 'Favorited' : 'Like'}
              </button>
            </div>

            {/* Overview Text */}
            <div className="mt-6">
              <p className="text-sm md:text-base leading-relaxed text-gray-300 font-light">
                {movie.overview || "No overview details found."}
              </p>
            </div>

            {/* INTERACTIVE DROPDOWN COMPONENT BLOCK FOR TV SHOWS */}
            {movie.isTVSeries && (
              <div className="mt-8 p-5 rounded-2xl bg-[#131217] border border-white/5 max-w-2xl shadow-xl flex flex-col md:flex-row gap-5 items-start md:items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white mb-1 tracking-wide">Seasons & Episode Browser</h4>
                  <p className="text-xs text-gray-400">Select a season to view details and runtime logs instantly.</p>
                </div>
                
                <div className="flex flex-wrap gap-3 w-full md:w-auto">
                  {/* Season Dropdown */}
                  <div className="relative flex-1 md:flex-initial min-w-[140px]">
                    <select
                      value={selectedSeason}
                      onChange={(e) => handleSeasonChange(Number(e.target.value))}
                      className="w-full bg-[#1c1b22] text-white text-xs font-bold pl-4 pr-10 py-2.5 rounded-xl border border-white/10 focus:border-purple-500 outline-none appearance-none cursor-pointer transition"
                    >
                      {Array.from({ length: movie.number_of_seasons || 1 }, (_, idx) => (
                        <option key={idx + 1} value={idx + 1}>
                          Season {idx + 1}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-purple-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>

                  {/* Episodes Counter Box (Read only info) */}
                  <div className="bg-emerald-500/5 border border-emerald-500/20 px-4 py-2.5 rounded-xl flex flex-col justify-center min-w-[110px]">
                    <span className="text-[10px] text-emerald-400/70 font-bold uppercase tracking-widest">Total Ep</span>
                    <span className="text-xs font-black text-emerald-400 mt-0.5">{movie.number_of_episodes || 0} Episodes</span>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* DYNAMIC EPISODES CARDS LIST DISPLAY PANEL */}
        {movie.isTVSeries && (
          <div className="mt-12">
            <h3 className="text-lg md:text-xl font-bold text-[#e5e5e5] mb-6 tracking-wide pl-1 border-l-4 border-purple-600">
              Season {selectedSeason} Episodes ({episodes.length})
            </h3>

            {loadingEpisodes ? (
              <div className="flex py-10 justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-purple-500"></div>
              </div>
            ) : episodes.length === 0 ? (
              <p className="text-xs text-gray-500">No episodes data published for this season yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {episodes.map((ep) => (
                  <div key={ep.id} className="bg-[#131217] border border-white/5 rounded-xl p-3 flex gap-3 items-center group hover:border-purple-500/30 transition duration-300">
                    <div className="w-20 aspect-video rounded-lg overflow-hidden bg-neutral-900 shrink-0 border border-white/5">
                      {ep.still_path ? (
                        <img 
                          src={`https://image.tmdb.org/t/p/w185${ep.still_path}`} 
                          alt="" 
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-600 font-bold">EP {ep.episode_number}</div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold text-purple-400 tracking-wider uppercase block">Episode {ep.episode_number}</span>
                      <h4 className="text-xs font-bold text-gray-200 truncate mt-0.5 group-hover:text-white transition">{ep.name || `Episode ${ep.episode_number}`}</h4>
                      <p className="text-[10px] text-gray-400 truncate mt-1">{ep.air_date || "Coming Soon"}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ELEGANT NETFLIX-STYLE HORIZONTAL CAROUSEL */}
        {cast && cast.length > 0 && (
          <div className="mt-16 pt-4 relative w-full group/carousel">
            <h3 className="text-lg md:text-xl font-bold text-[#e5e5e5] mb-6 tracking-wide pl-1 border-l-4 border-red-600 inline-block transition-colors duration-300">
              Cast & Crew
            </h3>
            
            <div className="relative w-full">
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#0d0c0f] to-transparent z-20 pointer-events-none opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#0d0c0f] to-transparent z-20 pointer-events-none opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300"></div>

              <div className="flex flex-row items-start justify-start gap-x-6 overflow-x-auto pb-6 scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {cast.map((actor) => (
                  <div 
                    key={actor.id} 
                    className="text-center w-[105px] sm:w-[125px] flex flex-col items-center shrink-0 snap-start group/item transition-transform duration-300 hover:-translate-y-1.5"
                  >
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border border-white/10 bg-neutral-900 shadow-xl shadow-black/80 transition-all duration-300 group-hover/item:border-white/40 group-hover/item:shadow-black/90">
                      {actor.profile_path ? (
                        <img 
                          src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`} 
                          alt={actor.name}
                          className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover/item:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xl text-neutral-500 font-semibold bg-neutral-900">
                          {actor.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    
                    <p className="text-xs sm:text-sm font-medium text-[#f5f5f5] mt-3.5 w-full truncate px-1 transition-colors duration-200 group-hover/item:text-white">
                      {actor.name}
                    </p>
                    <p className="text-[11px] sm:text-xs text-[#a3a3a3] mt-0.5 w-full truncate px-1 font-normal tracking-wide">
                      {actor.character || "Cast"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* OVERLAY TRAILER MODAL LIGHTBOX */}
      {showTrailer && trailerKey && (
        <div 
          className="fixed inset-0 w-full h-full z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setShowTrailer(false)}
        >
          <div 
            className="relative w-full max-w-4xl aspect-video rounded-xl overflow-hidden bg-black shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-4 right-4 z-50">
              <button 
                onClick={() => setShowTrailer(false)}
                className="bg-black/60 hover:bg-red-600 text-white p-2 rounded-full transition border border-white/20 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0&modestbranding=1`}
              title="Trailer Player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

    </div>
  );
};

export default MovieDetail;