import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { movieService } from '../services/movieService'; 
import { SlidersHorizontal, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';

const CategoryPage = () => {
  const { type } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(500);

  // Dynamic Titles Setup
  const getCategoryTitle = (catType) => {
    const titles = {
      discover: "Discover Movies",
      now_playing: "Now Playing in Theaters",
      top_rated: "Top Rated Masterpieces",
      popular: "Popular Movies Globally",
      upcoming: "Highly Anticipated Upcoming Movies",
      anime: "Anime & Animation Specials"
    };
    return titles[catType] || "Explore Movies";
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [type]);

  useEffect(() => {
    const fetchCategoryData = async () => {
      setLoading(true);
      try {
        let response = [];
        
        if (type === 'anime') {
          response = await movieService.getAnime(currentPage) || [];
        } else if (type === 'popular') {
          response = await movieService.getPopular(currentPage) || [];
        } else if (type === 'upcoming') {
          response = await movieService.getUpcoming(currentPage) || [];
        } else if (type === 'top_rated') {
          response = await movieService.getTopRated(currentPage) || [];
        } else if (type === 'discover') {
          response = await movieService.getByGenre(28, currentPage) || []; 
        } else {
          response = await movieService.getTrending("day") || [];
        }

        setItems(response);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (error) {
        console.error("Failed fetching paginated collections:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [type, currentPage]);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d0c0f] pt-32 px-6 md:px-12 text-center text-gray-400">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-white/5 w-1/4 mx-auto rounded"></div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 pt-12">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="h-80 bg-white/5 rounded-2xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0c0f] text-white pt-32 px-6 md:px-12 pb-16 font-sans">
      
      {/* Upper Header Control Panel */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-white/5">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2 uppercase">
            {getCategoryTitle(type)}
          </h1>
          <p className="text-xs text-gray-400 max-w-2xl font-light">
            Browse premium HD movies streaming across the dynamic TMDB network data wrappers. Only verified cinematic movie data items.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-[#131217] border border-white/5 rounded-xl hover:bg-white/5 transition text-gray-300">
            <SlidersHorizontal className="w-4 h-4 text-gray-400" />
            <span>Filters</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-[#131217] border border-white/5 rounded-xl hover:bg-white/5 transition text-gray-300">
            <ArrowUpDown className="w-4 h-4 text-gray-400" />
            <span>Sort by</span>
          </button>
        </div>
      </div>

      {/* Grid Layout containing Dynamic Movie Cards */}
      {items.length === 0 ? (
        <div className="text-center py-20 text-gray-500">No movies found in this listing zone.</div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {items.map((item) => (
              <MovieCard key={item.id} movie={item} />
            ))}
          </div>

          {/* Premium Pagination Panel */}
          <div className="flex items-center justify-center gap-6 mt-16 pt-8 border-t border-white/5 select-none">
            <button 
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-bold tracking-wide transition-all ${
                currentPage === 1 
                  ? 'border-white/5 bg-white/5 text-gray-600 cursor-not-allowed' 
                  : 'border-white/10 bg-[#131217] text-gray-200 hover:bg-white/5 hover:text-white active:scale-95 cursor-pointer'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <span className="text-sm font-medium text-gray-400">
              Page <span className="text-white font-bold">{currentPage}</span> of <span className="text-white/60">{totalPages}</span>
            </span>

            <button 
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-bold tracking-wide transition-all ${
                currentPage === totalPages 
                  ? 'border-white/5 bg-white/5 text-gray-600 cursor-not-allowed' 
                  : 'border-white/10 bg-[#131217] text-gray-200 hover:bg-white/5 hover:text-white active:scale-95 cursor-pointer'
              }`}
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryPage;