import React, { useEffect, useState, useRef } from 'react';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import MovieCard from '../components/MovieCard';
import { movieService } from '../services/movieService';

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Scroll handle karne ke liye refs
  const popularRowRef = useRef(null);
  const topRatedRowRef = useRef(null);

  useEffect(() => {
    const fetchHomeMovies = async () => {
      try {
        setLoading(true);
        const trending = await movieService.getTrending();
        setPopularMovies(trending);
        setTopRatedMovies(trending.slice().reverse()); // Temporary second row
        setLoading(false);
      } catch (error) {
        console.error("Error fetching homepage movies:", error);
        setLoading(false);
      }
    };
    fetchHomeMovies();
  }, []);

  // Left/Right Slide Scroll Function
  const handleScroll = (rowRef, direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      
      // Calculate scroll distance (80% of current screen width)
      const scrollAmount = direction === 'left' 
        ? scrollLeft - clientWidth * 0.8 
        : scrollLeft + clientWidth * 0.8;

      rowRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#0d0c0f] px-8 md:px-12 py-6 text-white overflow-x-hidden">
      {/* 1. Hero Banner */}
      <Hero />

      {/* 2. Slider Rows */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
        </div>
      ) : (
        <div className="space-y-12 pb-16">
          
          {/* Row 1: Popular Blockbusters */}
          {/* NOTE: Is main wrapper se 'group' class hata di hai taaki cards global event se trigger na hon */}
          <div className="relative">
            <h2 className="text-2xl font-bold mb-4 tracking-wide text-white border-l-4 border-red-600 pl-3">
              Popular Movies
            </h2>

            {/* Left Slider Arrow (Ab yeh slide hover par nahi, hamesha dikhega ya CSS se standard smooth background ke sath ready hai) */}
            <button 
              onClick={() => handleScroll(popularRowRef, 'left')}
              className="absolute left-0 top-[55%] -translate-y-1/2 z-20 bg-black/60 hover:bg-black/95 text-white h-24 w-10 flex items-center justify-center rounded-r-lg border border-l-0 border-white/10 transition duration-200"
            >
              <span className="text-xl font-bold">❮</span>
            </button>

            {/* Horizontal Scrollable Container */}
            <div 
              ref={popularRowRef}
              className="flex gap-5 overflow-x-auto scrollbar-none py-4 px-2 scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // Hide scrollbar for Firefox/IE
            >
              {popularMovies.map((movie) => (
                <div key={movie.id} className="min-w-[160px] sm:min-w-[200px] md:min-w-[220px]">
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>

            {/* Right Slider Arrow */}
            <button 
              onClick={() => handleScroll(popularRowRef, 'right')}
              className="absolute right-0 top-[55%] -translate-y-1/2 z-20 bg-black/60 hover:bg-black/95 text-white h-24 w-10 flex items-center justify-center rounded-l-lg border border-r-0 border-white/10 transition duration-200"
            >
              <span className="text-xl font-bold">❯</span>
            </button>
          </div>

          {/* Row 2: Highly Rated */}
          {/* NOTE: Is wrapper se bhi 'group' aur 'transition-transform' clean kar diya hai */}
          <div className="relative">
            <h2 className="text-2xl font-bold mb-4 tracking-wide text-white border-l-4 border-red-600 pl-3">
              Highly Rated
            </h2>

            {/* Left Slider Arrow */}
            <button 
              onClick={() => handleScroll(topRatedRowRef, 'left')}
              className="absolute left-0 top-[55%] -translate-y-1/2 z-20 bg-black/60 hover:bg-black/95 text-white h-24 w-10 flex items-center justify-center rounded-r-lg border border-l-0 border-white/10 transition duration-200"
            >
              <span className="text-xl font-bold">❮</span>
            </button>

            {/* Horizontal Scrollable Container */}
            <div 
              ref={topRatedRowRef}
              className="flex gap-5 overflow-x-auto scrollbar-none py-4 px-2 scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {topRatedMovies.map((movie) => (
                <div key={movie.id} className="min-w-[160px] sm:min-w-[200px] md:min-w-[220px]">
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>

            {/* Right Slider Arrow */}
            <button 
              onClick={() => handleScroll(topRatedRowRef, 'right')}
              className="absolute right-0 top-[55%] -translate-y-1/2 z-20 bg-black/60 hover:bg-black/95 text-white h-24 w-10 flex items-center justify-center rounded-l-lg border border-r-0 border-white/10 transition duration-200"
            >
              <span className="text-xl font-bold">❯</span>
            </button>
          </div>

        </div>
      )}
    </div>
  );
};

export default Home;