// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { movieService } from '../services/movieService'; 
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import MovieCard from './MovieCard';

// const CategoryPage = () => {
//   const { type } = useParams();
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   // Pagination States
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(500);

//   const getCategoryTitle = (catType) => {
//     const titles = {
//       discover: "Discover Movies",
//       now_playing: "Now Playing in Theaters",
//       top_rated: "Top Rated Masterpieces",
//       popular: "Popular Movies Globally",
//       upcoming: "Highly Anticipated Upcoming Movies",
//       anime: "Anime & Animation Specials"
//     };
//     return titles[catType] || "Explore Movies";
//   };

//   // Jab bhi navbar se route change ho, reset page state to 1 instantly
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [type]);

//   useEffect(() => {
//     const fetchCategoryData = async () => {
//       setLoading(true);
//       try {
//         let response = [];
        
//         if (type === 'anime') {
//           response = await movieService.getAnime(currentPage) || [];
//         } else if (type === 'popular') {
//           response = await movieService.getPopular(currentPage) || [];
//         } else if (type === 'upcoming') {
//           response = await movieService.getUpcoming(currentPage) || [];
//         } else if (type === 'top_rated') {
//           response = await movieService.getTopRated(currentPage) || [];
//         } else if (type === 'discover') {
//           response = await movieService.getByGenre(28, currentPage) || []; 
//         } else if (type === 'now_playing') {
//           // Clean dynamic extraction using your core service instance
//           const rawData = await movieService.getNowPlaying(currentPage) || [];
          
//           // Strict 2026 filter mapping
//           const verified2026 = rawData.filter(item => {
//             const releaseYear = item.release_date?.split('-')[0];
//             return releaseYear === '2026';
//           });

//           // Backup protection logic so screen is NEVER blank
//           response = verified2026.length > 0 ? verified2026 : rawData;
//         } else {
//           response = await movieService.getTrending("day") || [];
//         }

//         setItems(response);
//         setTotalPages(500);
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//       } catch (error) {
//         console.error("Error hydrating clean layout view component:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCategoryData();
//   }, [type, currentPage]);

//   const handleNext = () => {
//     if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
//   };

//   const handlePrev = () => {
//     if (currentPage > 1) setCurrentPage(prev => prev - 1);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#0d0c0f] pt-32 px-6 md:px-12 text-center text-gray-400">
//         <div className="animate-pulse space-y-4">
//           <div className="h-8 bg-white/5 w-1/4 mx-auto rounded"></div>
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 pt-12">
//             {[...Array(12)].map((_, i) => (
//               <div key={i} className="h-80 bg-white/5 rounded-2xl"></div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#0d0c0f] text-white pt-32 px-6 md:px-12 pb-16 font-sans">
      
//       {/* Clean Header - All Dropdowns & Extra Filter buttons completely removed */}
//       <div className="mb-10 pb-6 border-b border-white/5">
//         <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2 uppercase">
//           {getCategoryTitle(type)}
//         </h1>
//         <p className="text-xs text-gray-400 font-light">
//           Viewing dynamically sorted cinema catalogue. Fast client hydration active.
//         </p>
//       </div>

//       {/* Grid rendering structure */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
//         {items.map((item) => (
//           <MovieCard key={item.id} movie={item} />
//         ))}
//       </div>

//       {/* Pagination component controls */}
//       <div className="flex items-center justify-center gap-6 mt-16 pt-8 border-t border-white/5 select-none">
//         <button 
//           onClick={handlePrev}
//           disabled={currentPage === 1}
//           className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-bold transition-all ${
//             currentPage === 1 
//               ? 'border-white/5 bg-white/5 text-gray-600 cursor-not-allowed' 
//               : 'border-white/10 bg-[#131217] text-gray-200 hover:bg-white/5 cursor-pointer'
//           }`}
//         >
//           <ChevronLeft className="w-4 h-4" />
//           <span>Previous</span>
//         </button>

//         <span className="text-sm font-medium text-gray-400">
//           Page <span className="text-white font-bold">{currentPage}</span> of <span className="text-white/60">{totalPages}</span>
//         </span>

//         <button 
//           onClick={handleNext}
//           disabled={currentPage >= totalPages}
//           className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-bold transition-all ${
//             currentPage >= totalPages 
//               ? 'border-white/5 bg-white/5 text-gray-600 cursor-not-allowed' 
//               : 'border-white/10 bg-[#131217] text-gray-200 hover:bg-white/5 cursor-pointer'
//           }`}
//         >
//           <span>Next</span>
//           <ChevronRight className="w-4 h-4" />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CategoryPage;



import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { movieService } from '../services/movieService'; 
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';

const CategoryPage = () => {
  const { type } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getCategoryTitle = (catType) => {
    const titles = {
      discover: "Discover Global Movies",
      top_rated: "Top Rated Global Masterpieces",
      popular: "Popular Movies Globally",
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
        let responsePayload;
        
        // Dynamic redirection to separate targeted object wrapper schemas
        if (type === 'anime') {
          responsePayload = await movieService.getAnimeMixedObject(currentPage);
        } else if (type === 'popular') {
          responsePayload = await movieService.getPopularMixedObject(currentPage);
        } else if (type === 'top_rated') {
          responsePayload = await movieService.getTopRatedMixedObject(currentPage);
        } else if (type === 'discover') {
          responsePayload = await movieService.discoverAllMixedObject(currentPage); 
        } else {
          const rawTrending = await movieService.getTrending("day");
          responsePayload = { results: rawTrending, total_pages: 1 };
        }

        if (responsePayload && responsePayload.results) {
          setItems(responsePayload.results);
          setTotalPages(responsePayload.total_pages || 1);
        } else {
          setItems([]);
          setTotalPages(1);
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (error) {
        console.error("Critical Component State Hydration Failure: ", error);
        setItems([]);
        setTotalPages(1);
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
      
      <div className="mb-10 pb-6 border-b border-white/5">
        <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2 uppercase">
          {getCategoryTitle(type)}
        </h1>
        <p className="text-xs text-gray-400 font-light">
          Viewing dynamically sorted multi-industry mixed cinema database catalogues.
        </p>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20 text-gray-500 text-sm">
          No records found for the requested context pipeline.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {items.map((item, index) => (
              <MovieCard key={`${item.id}-${index}`} movie={item} />
            ))}
          </div>

          <div className="flex items-center justify-center gap-6 mt-16 pt-8 border-t border-white/5 select-none">
            <button 
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-bold transition-all ${
                currentPage === 1 
                  ? 'border-white/5 bg-white/5 text-gray-600 cursor-not-allowed' 
                  : 'border-white/10 bg-[#131217] text-gray-200 hover:bg-white/5 cursor-pointer'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <span className="text-sm font-medium text-gray-400">
              Page <span className="text-white font-bold">{currentPage}</span> of <span className="text-white/60 font-bold">{totalPages}</span>
            </span>

            <button 
              onClick={handleNext}
              disabled={currentPage >= totalPages}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-bold transition-all ${
                currentPage >= totalPages 
                  ? 'border-white/5 bg-white/5 text-gray-600 cursor-not-allowed' 
                  : 'border-white/10 bg-[#131217] text-gray-200 hover:bg-white/5 cursor-pointer'
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