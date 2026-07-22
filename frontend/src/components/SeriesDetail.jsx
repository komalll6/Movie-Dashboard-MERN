import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { movieService } from '../services/movieService';
import { Play, Heart, Star, X, Tv, ChevronDown } from 'lucide-react';

const SeriesDetail = () => {
  const { id } = useParams();
  const [series, setSeries] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null); 
  const [showTrailer, setShowTrailer] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  const [selectedSeason, setSelectedSeason] = useState(1);
  const [episodes, setEpisodes] = useState([]);
  const [loadingEpisodes, setLoadingEpisodes] = useState(false);

  useEffect(() => {
    const fetchSeriesData = async () => {
      try {
        setLoading(true);
        const details = await movieService.getSeriesDetails(id);
        setSeries(details);

        if (details.credits && details.credits.cast) {
          setCast(details.credits.cast.slice(0, 16)); 
        }

        if (details.videos && details.videos.results) {
          const mainTrailer = details.videos.results.find(
            (vid) => vid.site === "YouTube" && vid.type === "Trailer"
          );
          setTrailerKey(mainTrailer ? mainTrailer.key : details.videos.results[0]?.key || null);
        }

        const currentFavs = JSON.parse(localStorage.getItem('favMovies')) || [];
        setIsFavorite(currentFavs.some(item => item.id === details.id));

        setLoadingEpisodes(true);
        const epData = await movieService.getSeasonEpisodes(id, 1);
        setEpisodes(epData);
        setLoadingEpisodes(false);

        setLoading(false);
      } catch (error) {
        console.error("Error loading TV series details:", error);
        setLoading(false);
      }
    };

    fetchSeriesData();
    setShowTrailer(false);
    setSelectedSeason(1);
  }, [id]);

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
      currentFavs = currentFavs.filter(item => item.id !== series.id);
      setIsFavorite(false);
    } else {
      currentFavs.push({
        id: series.id,
        title: series.title,
        poster_path: series.poster_path,
        vote_average: series.vote_average,
        is_series: true
      });
      setIsFavorite(true);
    }
    localStorage.setItem('favMovies', JSON.stringify(currentFavs));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d0c0f] flex items-center justify-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!series) return <div className="text-white text-center mt-20">TV Series not found!</div>;

  const releaseYear = series.release_date ? new Date(series.release_date).getFullYear() : "";

  return (
    <div className="min-h-screen bg-[#0d0c0f] text-gray-200 pt-20 pb-12 px-4 md:px-12 relative overflow-hidden">
      
      {/* Background Poster */}
      <div className="absolute top-0 left-0 w-full h-[60vh] opacity-15 pointer-events-none">
        <img 
          src={`https://image.tmdb.org/t/p/original${series.backdrop_path}`} 
          alt="" 
          className="w-full h-full object-cover blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0c0f] to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 mt-6">
        <div className="flex flex-col sm:flex-row gap-6 md:gap-8">
          
          <div className="w-full sm:w-[240px] shrink-0 mx-auto sm:mx-0">
            <div className="rounded-xl overflow-hidden border border-white/10 shadow-xl shadow-black/40">
              <img 
                src={`https://image.tmdb.org/t/p/w500${series.poster_path}`} 
                alt={series.title}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              {series.title} {releaseYear && <span className="text-gray-500 font-normal">({releaseYear})</span>}
            </h1>

            <div className="flex flex-wrap items-center gap-3 mt-4 text-xs font-semibold">
              <span className="bg-yellow-500 text-black px-2 py-0.5 rounded flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-black" /> {series.vote_average?.toFixed(1)}
              </span>
              
              <span className="bg-purple-600 text-white px-2.5 py-0.5 rounded flex items-center gap-1 uppercase tracking-wider text-[10px]">
                <Tv className="w-3 h-3" /> TV Series
              </span>

              <span className="text-purple-400 tracking-wider">
                {series.genres?.map(g => g.name).join(', ')}
              </span>
            </div>

            <div className="flex flex-wrap gap-3 mt-6">
              <button 
                type="button" 
                disabled={!trailerKey}
                onClick={() => setShowTrailer(true)}
                className={`font-semibold text-sm px-6 py-2.5 rounded-lg flex items-center gap-2 transition shadow-lg ${
                  trailerKey 
                    ? 'bg-purple-600 hover:bg-purple-700 text-white cursor-pointer' 
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

            <div className="mt-6">
              <p className="text-sm md:text-base leading-relaxed text-gray-300 font-light">
                {series.overview || "No overview details found."}
              </p>
            </div>

            {/* SEASONS & EPISODES DROPDOWN */}
            <div className="mt-8 p-5 rounded-2xl bg-[#131217] border border-white/5 max-w-2xl shadow-xl flex flex-col md:flex-row gap-5 items-start md:items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white mb-1 tracking-wide">Seasons & Episode Browser</h4>
                <p className="text-xs text-gray-400">Select a season to view episodes and release logs.</p>
              </div>
              
              <div className="flex flex-wrap gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:flex-initial min-w-[140px]">
                  <select
                    value={selectedSeason}
                    onChange={(e) => handleSeasonChange(Number(e.target.value))}
                    className="w-full bg-[#1c1b22] text-white text-xs font-bold pl-4 pr-10 py-2.5 rounded-xl border border-white/10 focus:border-purple-500 outline-none appearance-none cursor-pointer transition"
                  >
                    {Array.from({ length: series.number_of_seasons || 1 }, (_, idx) => (
                      <option key={idx + 1} value={idx + 1}>
                        Season {idx + 1}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-purple-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                <div className="bg-purple-500/10 border border-purple-500/20 px-4 py-2.5 rounded-xl flex flex-col justify-center min-w-[110px]">
                  <span className="text-[10px] text-purple-400/70 font-bold uppercase tracking-widest">Total Ep</span>
                  <span className="text-xs font-black text-purple-400 mt-0.5">{series.number_of_episodes || 0} Episodes</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* EPISODES GRID */}
        <div className="mt-12">
          <h3 className="text-lg md:text-xl font-bold text-[#e5e5e5] mb-6 tracking-wide pl-1 border-l-4 border-purple-600">
            Season {selectedSeason} Episodes ({episodes.length})
          </h3>

          {loadingEpisodes ? (
            <div className="flex py-10 justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-purple-500"></div>
            </div>
          ) : episodes.length === 0 ? (
            <p className="text-xs text-gray-500">No episodes found for this season.</p>
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
                    <p className="text-[10px] text-gray-400 truncate mt-1">{ep.air_date || "N/A"}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CAST CAROUSEL */}
        {cast && cast.length > 0 && (
          <div className="mt-16 pt-4 relative w-full">
            <h3 className="text-lg md:text-xl font-bold text-[#e5e5e5] mb-6 tracking-wide pl-1 border-l-4 border-purple-600">
              Cast & Crew
            </h3>
            
            <div className="flex flex-row items-start justify-start gap-x-6 overflow-x-auto pb-6 scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {cast.map((actor) => (
                <div key={actor.id} className="text-center w-[105px] sm:w-[125px] flex flex-col items-center shrink-0">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border border-white/10 bg-neutral-900 shadow-xl">
                    {actor.profile_path ? (
                      <img 
                        src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`} 
                        alt={actor.name}
                        className="w-full h-full object-cover object-top"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xl text-neutral-500 font-semibold bg-neutral-900">
                        {actor.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-[#f5f5f5] mt-3.5 w-full truncate">{actor.name}</p>
                  <p className="text-[11px] sm:text-xs text-[#a3a3a3] mt-0.5 w-full truncate">{actor.character || "Cast"}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* TRAILER LIGHTBOX */}
      {showTrailer && trailerKey && (
        <div 
          className="fixed inset-0 w-full h-full z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setShowTrailer(false)}
        >
          <div className="relative w-full max-w-4xl aspect-video rounded-xl overflow-hidden bg-black shadow-2xl border border-white/10" onClick={(e) => e.stopPropagation()}>
            <div className="absolute top-4 right-4 z-50">
              <button onClick={() => setShowTrailer(false)} className="bg-black/60 hover:bg-purple-600 text-white p-2 rounded-full transition cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0`}
              title="Trailer"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

    </div>
  );
};

export default SeriesDetail;