import React, { useState, useEffect } from 'react';
import { movieService } from '../services/movieService';
import { useAppContext } from '../context/AppContext';

const Hero = () => {
  const { genres } = useAppContext();
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Step 1: Ek hi baar mein saari 5 movies ke details aur logos pre-fetch karna
  useEffect(() => {
    const fetchTrendingAndAssets = async () => {
      try {
        const rawData = await movieService.getTrending();
        const topFive = rawData.slice(0, 5);

        // Sabhi 5 movies ke logos aur details ko ek sath (parallelly) load karna
        const fullyLoadedMovies = await Promise.all(
          topFive.map(async (movie) => {
            try {
              // 1. Fetch runtime
              const details = await movieService.getMovieDetails(movie.id);
              
              // 2. Fetch logos
              const imageRes = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/images`, {
                headers: {
                  accept: 'application/json',
                  Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`
                }
              });
              const imageData = await imageRes.json();
              const englishLogo = imageData.logos?.find(l => l.iso_639_1 === 'en');
              
              return {
                ...movie,
                runtime: details?.runtime || null,
                logoUrl: englishLogo ? `https://image.tmdb.org/t/p/w500${englishLogo.file_path}` : null
              };
            } catch (err) {
              console.error(`Error pre-fetching assets for movie ${movie.id}:`, err);
              return { ...movie, runtime: null, logoUrl: null };
            }
          })
        );

        setTrendingMovies(fullyLoadedMovies);
        setLoading(false);
      } catch (error) {
        console.error("Error loading trending movies:", error);
        setLoading(false);
      }
    };
    
    fetchTrendingAndAssets();
  }, []);

  // Step 2: Exact 5-Second Interval Slider
  useEffect(() => {
    if (trendingMovies.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % trendingMovies.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [trendingMovies]);

  if (loading) {
    return (
      <div className="h-[550px] w-full bg-[#0d0c0f] animate-pulse flex items-center justify-center rounded-2xl">
        <p className="text-gray-500 font-medium">Preparing cinematic experience...</p>
      </div>
    );
  }

  if (trendingMovies.length === 0) return null;

  const currentMovie = trendingMovies[currentIndex];
  const imageUrl = `https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`;

  const releaseYear = currentMovie.release_date 
    ? currentMovie.release_date.split('-')[0] 
    : (currentMovie.first_air_date ? currentMovie.first_air_date.split('-')[0] : 'N/A');

  const movieGenres = currentMovie.genre_ids
    ? currentMovie.genre_ids
        .map((id) => genres.find((g) => g.id === id)?.name)
        .filter(Boolean)
        .slice(0, 3)
        .join(' | ')
    : '';

  const formatRuntime = (minutes) => {
    if (!minutes) return '';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    // 'key={currentIndex}' lagane se background transition aur fade animations aapas mein perfect sync ho jaayengi
    <div key={currentIndex} className="relative h-[550px] w-full rounded-3xl overflow-hidden mb-12 shadow-2xl group animate-fadeIn">
      
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={imageUrl} 
          alt={currentMovie.title || currentMovie.name} 
          className="w-full h-full object-cover transition-transform duration-[5000ms] ease-out scale-100 group-hover:scale-105"
        />
      </div>
      
      {/* Premium Cinematic Vignette Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/55 to-transparent animate-fadeIn" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0c0f] via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-l from-black/20 via-transparent to-transparent" />

      {/* Main Content Container */}
      <div className="absolute bottom-12 left-12 md:left-16 max-w-2xl z-10 select-none">
        
        {/* Elegant Metadata Row */}
        <div className="flex flex-wrap items-center gap-3 text-gray-300 text-sm font-medium mb-3 tracking-wide">
          {movieGenres && <span>{movieGenres}</span>}
          {movieGenres && <span className="text-gray-600">•</span>}
          <span className="flex items-center gap-1">
            <span className="border border-gray-500/30 px-1.5 py-0.2 rounded text-[11px] uppercase bg-white/5">Year</span>
            {releaseYear}
          </span>
          {currentMovie.runtime && (
            <>
              <span className="text-gray-600">•</span>
              <span>{formatRuntime(currentMovie.runtime)}</span>
            </>
          )}
        </div>

        {/* Dynamic Title / Logo Container (Ekdam sync mein render hoga, koi gap nahi) */}
        <div className="mb-6 flex items-center h-auto min-h-[60px]">
          {currentMovie.logoUrl ? (
            <img 
              src={currentMovie.logoUrl} 
              alt={currentMovie.title || currentMovie.name} 
              className="max-h-[100px] max-w-[320px] md:max-w-[400px] object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)]"
            />
          ) : (
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-lg font-sans">
              {currentMovie.title || currentMovie.name}
            </h1>
          )}
        </div>

        {/* Italicized & Deep Description */}
        <p className="text-gray-300/90 text-base md:text-lg italic font-light leading-relaxed mb-8 line-clamp-3 max-w-xl border-l-2 border-red-600 pl-4">
          "{currentMovie.overview}"
        </p>

        {/* Action Button */}
        <div className="flex gap-4">
          <button className="bg-red-600 hover:bg-red-700 hover:scale-[1.03] active:scale-95 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 flex items-center gap-3 shadow-lg shadow-red-600/20">
            <span>Explore Movies</span>
            <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
        </div>
      </div>

      {/* Slide Dots Indicator */}
      <div className="absolute bottom-6 right-12 flex gap-2.5 z-10">
        {trendingMovies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2.5 rounded-full transition-all duration-500 ${
              index === currentIndex 
                ? 'w-10 bg-red-600 shadow-lg shadow-red-600/40' 
                : 'w-2.5 bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;