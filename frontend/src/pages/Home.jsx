import React, { useEffect, useState, useRef } from 'react';
import Hero from '../components/Hero';
import MovieCard from '../components/MovieCard';
import { movieService } from '../services/movieService';

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [animeMovies, setAnimeMovies] = useState([]); 
  const [loading, setLoading] = useState(true);

  // Scroll handles
  const popularRowRef = useRef(null);
  const topRatedRowRef = useRef(null);
  const animeRowRef = useRef(null); 

 useEffect(() => {
    const fetchHomeMovies = async () => {
      try {
        setLoading(true);
        
        // Sabhi API calls ko parallelly aur safely run karenge
        const [trendingRes, bollywoodRes, animeRes] = await Promise.allSettled([
          movieService.getTrending(),
          movieService.getTopRatedBollywood(),
          movieService.getAnime()
        ]);
        
        // Agar success hua toh data set karo, nahi toh empty array set karo
        setPopularMovies(trendingRes.status === 'fulfilled' ? trendingRes.value : []);
        setTopRatedMovies(bollywoodRes.status === 'fulfilled' ? bollywoodRes.value : []);
        setAnimeMovies(animeRes.status === 'fulfilled' ? animeRes.value : []);
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching homepage movies:", error);
        setLoading(false);
      }
    };
    fetchHomeMovies();
  }, []);

  const handleScroll = (rowRef, direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      
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
          <div className="relative">
            <h2 className="text-2xl font-bold mb-4 tracking-wide text-white border-l-4 border-red-600 pl-3">
              Popular Movies
            </h2>

            <button 
              onClick={() => handleScroll(popularRowRef, 'left')}
              className="absolute left-0 top-[55%] -translate-y-1/2 z-20 bg-black/60 hover:bg-black/95 text-white h-24 w-10 flex items-center justify-center rounded-r-lg border border-l-0 border-white/10 transition duration-200"
            >
              <span className="text-xl font-bold">❮</span>
            </button>

            <div 
              ref={popularRowRef}
              className="flex gap-5 overflow-x-auto scrollbar-none py-4 px-2 scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {popularMovies.map((movie) => (
                <div key={movie.id} className="min-w-[160px] sm:min-w-[200px] md:min-w-[220px]">
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>

            <button 
              onClick={() => handleScroll(popularRowRef, 'right')}
              className="absolute right-0 top-[55%] -translate-y-1/2 z-20 bg-black/60 hover:bg-black/95 text-white h-24 w-10 flex items-center justify-center rounded-l-lg border border-r-0 border-white/10 transition duration-200"
            >
              <span className="text-xl font-bold">❯</span>
            </button>
          </div>

        {/* Row 2: Updated Heading Title */}
<div className="relative">
  <h2 className="text-2xl font-bold mb-4 tracking-wide text-white border-l-4 border-red-600 pl-3">
    Trending Bollywood
  </h2>

  <button 
    onClick={() => handleScroll(topRatedRowRef, 'left')}
    className="absolute left-0 top-[55%] -translate-y-1/2 z-20 bg-black/60 hover:bg-black/95 text-white h-24 w-10 flex items-center justify-center rounded-r-lg border border-l-0 border-white/10 transition duration-200"
  >
    <span className="text-xl font-bold">❮</span>
  </button>

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

  <button 
    onClick={() => handleScroll(topRatedRowRef, 'right')}
    className="absolute right-0 top-[55%] -translate-y-1/2 z-20 bg-black/60 hover:bg-black/95 text-white h-24 w-10 flex items-center justify-center rounded-l-lg border border-r-0 border-white/10 transition duration-200"
  >
    <span className="text-xl font-bold">❯</span>
  </button>
</div>

          {/* Row 3: Anime Movies */}
          <div className="relative">
            <h2 className="text-2xl font-bold mb-4 tracking-wide text-white border-l-4 border-red-600 pl-3">
              Anime Movies
            </h2>

            <button 
              onClick={() => handleScroll(animeRowRef, 'left')}
              className="absolute left-0 top-[55%] -translate-y-1/2 z-20 bg-black/60 hover:bg-black/95 text-white h-24 w-10 flex items-center justify-center rounded-r-lg border border-l-0 border-white/10 transition duration-200"
            >
              <span className="text-xl font-bold">❮</span>
            </button>

            <div 
              ref={animeRowRef}
              className="flex gap-5 overflow-x-auto scrollbar-none py-4 px-2 scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {animeMovies.map((movie) => (
                <div key={movie.id} className="min-w-[160px] sm:min-w-[200px] md:min-w-[220px]">
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>

            <button 
              onClick={() => handleScroll(animeRowRef, 'right')}
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