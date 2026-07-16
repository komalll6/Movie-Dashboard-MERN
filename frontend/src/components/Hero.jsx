import React, { useState, useEffect } from 'react';
import { movieService } from '../services/movieService';
import { useAppContext } from '../context/AppContext';

const Hero = () => {
  const { genres } = useAppContext();
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [movieDetails, setMovieDetails] = useState(null); // Runtime fetch karne ke liye

  // Step 1: TMDB se trending movies fetch karna
  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const data = await movieService.getTrending();
        setTrendingMovies(data.slice(0, 5));
        setLoading(false);
      } catch (error) {
        console.error("Error loading trending movies:", error);
        setLoading(false);
      }
    };
    fetchTrending();
  }, []);

  // Step 2: Current movie ka runtime fetch karne ke liye API call
  useEffect(() => {
    if (trendingMovies.length === 0) return;
    
    const fetchCurrentMovieDetails = async () => {
      try {
        const currentId = trendingMovies[currentIndex].id;
        const details = await movieService.getMovieDetails(currentId);
        setMovieDetails(details);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchCurrentMovieDetails();
  }, [currentIndex, trendingMovies]);

  // Step 3: Exact 5-Second Interval Slider
  useEffect(() => {
    if (trendingMovies.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % trendingMovies.length);
    }, 5000); // 5000ms = 5 Seconds
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

  // Release Year extract karna
  const releaseYear = currentMovie.release_date 
    ? currentMovie.release_date.split('-')[0] 
    : (currentMovie.first_air_date ? currentMovie.first_air_date.split('-')[0] : 'N/A');

  // Genres Name map karna (e.g., Action | Sci-Fi)
  const movieGenres = currentMovie.genre_ids
    ? currentMovie.genre_ids
        .map((id) => genres.find((g) => g.id === id)?.name)
        .filter(Boolean)
        .slice(0, 3)
        .join(' | ')
    : '';

  // Runtime format karna (e.g., 2h 12m)
  const formatRuntime = (minutes) => {
    if (!minutes) return '';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="relative h-[550px] w-full rounded-3xl overflow-hidden mb-12 shadow-2xl group transition-all duration-1000">
      
      {/* Background Image with Smooth Cross-Fade Transition */}
      <div className="absolute inset-0 transition-all duration-1000 ease-in-out">
        <img 
          src={imageUrl} 
          alt={currentMovie.title || currentMovie.name} 
          className="w-full h-full object-cover transition-transform duration-[5000ms] ease-out scale-100 group-hover:scale-105"
        />
      </div>
      
      {/* Premium Cinematic Vignette Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/55 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0c0f] via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-l from-black/20 via-transparent to-transparent" />

      {/* Main Content Container */}
      <div className="absolute bottom-12 left-12 md:left-16 max-w-2xl z-10 select-none animate-fadeIn">
        
        {/* Elegant Metadata Row (Genres | Year | Duration) */}
        <div className="flex flex-wrap items-center gap-3 text-gray-300 text-sm font-medium mb-4 tracking-wide">
          {movieGenres && <span>{movieGenres}</span>}
          {movieGenres && <span className="text-gray-600">•</span>}
          <span className="flex items-center gap-1">
            <span className="border border-gray-500/30 px-1.5 py-0.2 rounded text-[11px] uppercase bg-white/5">Year</span>
            {releaseYear}
          </span>
          {movieDetails?.runtime && (
            <>
              <span className="text-gray-600">•</span>
              <span>{formatRuntime(movieDetails.runtime)}</span>
            </>
          )}
        </div>

        {/* Cinematic Bold Title with Elegant Kerning */}
        <h1 className="text-5xl md:text-6xl font-black text-white mb-5 tracking-tight leading-[1.1] drop-shadow-lg font-sans">
          {currentMovie.title || currentMovie.name}
        </h1>

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