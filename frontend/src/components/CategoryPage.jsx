import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { movieService } from '../services/movieService'; 
import { SlidersHorizontal, ArrowUpDown, Star } from 'lucide-react';

const CategoryPage = () => {
  const { type } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Formatting Titles for Headers
  const getCategoryTitle = (catType) => {
    const titles = {
      discover: "Discover Movies",
      now_playing: "Now Playing in Theaters",
      top_rated: "Top Rated Masterpieces",
      popular: "Popular Movies Globally",
      upcoming: "Highly Anticipated Upcoming Movies",
      anime: "Anime & Animation Specials",
      tv_discover: "Discover TV Series",
      tv_popular: "Trending Popular Shows",
      tv_airing_today: "Airing Today on Television",
      tv_top_rated: "Critically Acclaimed TV Shows",
      trending_movie: "Trending Movies This Week",
      trending_tv: "Trending TV Shows This Week"
    };
    return titles[catType] || "Explore Movies & Shows";
  };

  const getCategoryDesc = (catType) => {
    return `Explore handpicked high-quality ${catType.includes('tv') ? 'TV Shows' : 'Movies'} streaming directly from TMDB collections. Filtering the best cinematic experiences.`;
  };

  useEffect(() => {
    const fetchCategoryData = async () => {
      setLoading(true);
      try {
        let response = [];
        
        // Exact mapping with your movieService object methods
        if (type === 'anime') {
          response = await movieService.getAnime() || [];
        } else if (type === 'popular') {
          response = await movieService.getPopular() || [];
        } else if (type === 'upcoming') {
          response = await movieService.getUpcoming() || [];
        } else if (type === 'top_rated') {
          response = await movieService.getTopRated() || [];
        } else if (type === 'discover') {
          // Genre 28 (Action) or any fallback for discover
          response = await movieService.getByGenre(28) || [];
        } else {
          // Fallback trending data (Now playing, trending etc.)
          response = await movieService.getTrending() || [];
        }
        
        setItems(response.slice(0, 18)); // Display 18 premium cards
      } catch (error) {
        console.error("Failed fetching category lists:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [type]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d0c0f] pt-32 px-6 md:px-12 text-center text-gray-400">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-white/5 w-1/4 mx-auto rounded"></div>
          <div className="h-4 bg-white/5 w-1/3 mx-auto rounded"></div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 pt-12">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="h-72 bg-white/5 rounded-2xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0c0f] text-white pt-32 px-6 md:px-12 pb-16">
      
      {/* Upper Header block */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-white/5">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2 uppercase">
            {getCategoryTitle(type)}
          </h1>
          <p className="text-sm text-gray-400 max-w-2xl font-light">
            {getCategoryDesc(type)}
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

      {/* Movie Cards Layout */}
      {items.length === 0 ? (
        <div className="text-center py-20 text-gray-500">No titles found for this collection.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {items.map((item) => {
            const title = item.original_title || item.title || item.name || "Untitled";
            const releaseYear = item.release_date?.split('-')[0] || item.first_air_date?.split('-')[0] || "N/A";
            
            return (
              <Link 
                to={`/movie/${item.id}`} 
                key={item.id}
                className="group relative bg-[#131217] rounded-2xl overflow-hidden shadow-lg border border-white/5 hover:border-red-600/30 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col"
              >
                <div className="relative aspect-[2/3] w-full bg-neutral-900 overflow-hidden">
                  <img 
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} 
                    alt={title}
                    className="w-full h-full object-cover transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-2 left-2 bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow">
                    HD
                  </div>
                  {item.vote_average > 0 && (
                    <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-md text-yellow-400 text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5 shadow">
                      <Star className="w-2.5 h-2.5 fill-yellow-400" />
                      {item.vote_average.toFixed(1)}
                    </div>
                  )}
                </div>

                <div className="p-3 flex flex-col flex-grow justify-between">
                  <h3 className="text-sm font-bold text-gray-200 group-hover:text-red-500 transition-colors line-clamp-1 truncate uppercase tracking-wide">
                    {title}
                  </h3>
                  <div className="flex items-center justify-between text-[11px] text-gray-400 mt-1 font-medium">
                    <span>{releaseYear}</span>
                    <span className="border border-white/10 px-1 rounded text-[9px] uppercase tracking-tighter bg-white/5">Movie</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;