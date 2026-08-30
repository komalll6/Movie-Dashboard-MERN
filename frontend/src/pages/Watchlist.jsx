//NEW
// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Star, Trash2, Heart, ArrowLeft } from 'lucide-react';

// const Watchlist = () => {
//   const [watchlist, setWatchlist] = useState([]);
//   const navigate = useNavigate();

//   // Load watchlist items from localStorage
//   const loadWatchlist = () => {
//     try {
//       const saved = JSON.parse(localStorage.getItem('watchlist')) || JSON.parse(localStorage.getItem('favMovies')) || [];
//       // Remove duplicates by ID
//       const uniqueList = Array.from(
//         new Map(saved.map((item) => [item.id, item])).values()
//       );
//       setWatchlist(uniqueList);
//     } catch (error) {
//       console.error("Error loading watchlist", error);
//       setWatchlist([]);
//     }
//   };

//   useEffect(() => {
//     loadWatchlist();

//     window.addEventListener('watchlistUpdated', loadWatchlist);
//     window.addEventListener('favUpdated', loadWatchlist);
//     window.addEventListener('storage', loadWatchlist);

//     return () => {
//       window.removeEventListener('watchlistUpdated', loadWatchlist);
//       window.removeEventListener('favUpdated', loadWatchlist);
//       window.removeEventListener('storage', loadWatchlist);
//     };
//   }, []);

//   const removeFromWatchlist = (id, e) => {
//     e.stopPropagation();
//     const updated = watchlist.filter((item) => String(item.id) !== String(id));
//     setWatchlist(updated);

//     localStorage.setItem('watchlist', JSON.stringify(updated));
//     localStorage.setItem('favMovies', JSON.stringify(updated));

//     window.dispatchEvent(new Event('watchlistUpdated'));
//     window.dispatchEvent(new Event('favUpdated'));
//   };

//   return (
//     <div className="min-h-screen bg-[#0d0c0f] text-white pt-28 pb-16 px-4 md:px-12">
//       <div className="max-w-7xl mx-auto">
        
//         {/* Header */}
//         <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-8">
//           <div className="flex items-center gap-3">
//             <button 
//               onClick={() => navigate(-1)}
//               className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-gray-300 hover:text-white transition cursor-pointer border border-white/5"
//             >
//               <ArrowLeft className="w-5 h-5" />
//             </button>
//             <div>
//               <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight flex items-center gap-2.5">
//                 My Watchlist <Heart className="w-6 h-6 text-red-500 fill-red-500" />
//               </h1>
//               <p className="text-xs text-gray-400 mt-1">Saved movies & TV series collection</p>
//             </div>
//           </div>
          
//           <span className="bg-red-600/10 text-red-400 border border-red-500/20 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide">
//             {watchlist.length} {watchlist.length === 1 ? 'Title' : 'Titles'}
//           </span>
//         </div>

//         {/* Empty State */}
//         {watchlist.length === 0 ? (
//           <div className="flex flex-col items-center justify-center py-20 text-center">
//             <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 shadow-2xl">
//               <Heart className="w-10 h-10 text-gray-600" />
//             </div>
//             <h3 className="text-xl font-bold text-gray-200">Your Watchlist is empty</h3>
//             <p className="text-xs text-gray-400 mt-1 max-w-sm">
//               Explore movies & TV shows and save them to watch later.
//             </p>
//             <Link 
//               to="/" 
//               className="mt-6 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2.5 rounded-xl text-xs tracking-wider transition shadow-lg shadow-red-600/20"
//             >
//               Explore Movies
//             </Link>
//           </div>
//         ) : (
//           /* Cards Grid */
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
//             {watchlist.map((item) => {
//               // Precise Media Type Resolution
//               const isMovie = 
//                 item.media_type === 'movie' || 
//                 Boolean(item.release_date) || 
//                 Boolean(item.title) && item.media_type !== 'tv';

//               const targetRoute = isMovie ? `/movie/${item.id}` : `/series/${item.id}`;
//               const displayTitle = item.title || item.name || 'Untitled';
//               const releaseYear = item.release_date || item.first_air_date 
//                 ? new Date(item.release_date || item.first_air_date).getFullYear() 
//                 : 'N/A';

//               return (
//                 <div 
//                   key={item.id}
//                   onClick={() => navigate(targetRoute)}
//                   className="group bg-[#131217] border border-white/5 hover:border-white/20 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 shadow-xl cursor-pointer flex flex-col justify-between"
//                 >
//                   <div className="aspect-[2/3] w-full bg-neutral-900 overflow-hidden relative">
//                     {item.poster_path ? (
//                       <img 
//                         src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} 
//                         alt={displayTitle}
//                         className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
//                       />
//                     ) : (
//                       <div className="w-full h-full flex items-center justify-center text-xs text-gray-500 font-medium">
//                         No Poster
//                       </div>
//                     )}

//                     <span className="absolute top-2.5 left-2.5 bg-emerald-500 text-black font-black text-[9px] px-1.5 py-0.5 rounded tracking-widest uppercase">
//                       HD
//                     </span>

//                     <div className="absolute top-2.5 right-2.5 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded-md text-[11px] font-bold text-yellow-400 flex items-center gap-1 border border-white/10">
//                       <Star className="w-3 h-3 fill-yellow-400" />
//                       <span>{item.vote_average ? Number(item.vote_average).toFixed(1) : '7.5'}</span>
//                     </div>

//                     <button 
//                       onClick={(e) => removeFromWatchlist(item.id, e)}
//                       className="absolute bottom-2.5 right-2.5 bg-black/80 hover:bg-red-600 text-white p-2 rounded-xl opacity-90 group-hover:opacity-100 transition border border-white/10 cursor-pointer"
//                       title="Remove from Watchlist"
//                     >
//                       <Trash2 className="w-3.5 h-3.5" />
//                     </button>
//                   </div>

//                   <div className="p-3 bg-[#131217]">
//                     <h4 className="text-xs font-bold text-gray-200 truncate group-hover:text-white transition uppercase tracking-wide">
//                       {displayTitle}
//                     </h4>
                    
//                     <div className="flex items-center justify-between mt-2 text-[10px] text-gray-400 font-semibold">
//                       <span>{releaseYear}</span>
//                       <span className="bg-white/5 border border-white/10 px-2 py-0.5 rounded text-[9px] uppercase tracking-wider text-gray-300">
//                         {isMovie ? 'MOVIE' : 'TV SHOW'}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}

//       </div>
//     </div>
//   );
// };

// export default Watchlist;


//NEW - 30-08
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, Trash2, Heart, ArrowLeft } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Watchlist = () => {
  const { watchlist, removeFromWatchlist } = useAppContext();
  const navigate = useNavigate();

  const handleRemove = (id, e) => {
    e.stopPropagation();
    removeFromWatchlist(id);
  };

  return (
    <div className="min-h-screen bg-[#0d0c0f] text-white pt-28 pb-16 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-8">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate(-1)}
              className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-gray-300 hover:text-white transition cursor-pointer border border-white/5"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight flex items-center gap-2.5">
                My Watchlist <Heart className="w-6 h-6 text-red-500 fill-red-500" />
              </h1>
              <p className="text-xs text-gray-400 mt-1">Saved movies & TV series collection</p>
            </div>
          </div>
          
          <span className="bg-red-600/10 text-red-400 border border-red-500/20 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide">
            {watchlist.length} {watchlist.length === 1 ? 'Title' : 'Titles'}
          </span>
        </div>

        {/* Empty State */}
        {watchlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 shadow-2xl">
              <Heart className="w-10 h-10 text-gray-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-200">Your Watchlist is empty</h3>
            <p className="text-xs text-gray-400 mt-1 max-w-sm">
              Explore movies & TV shows and save them to watch later.
            </p>
            <Link 
              to="/" 
              className="mt-6 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2.5 rounded-xl text-xs tracking-wider transition shadow-lg shadow-red-600/20"
            >
              Explore Movies
            </Link>
          </div>
        ) : (
          /* Cards Grid */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {watchlist.map((item) => {
              const isMovie = 
                item.media_type === 'movie' || 
                Boolean(item.release_date) || 
                (Boolean(item.title) && item.media_type !== 'tv');

              const targetRoute = isMovie ? `/movie/${item.id}` : `/series/${item.id}`;
              const displayTitle = item.title || item.name || 'Untitled';
              const releaseYear = item.release_date || item.first_air_date 
                ? new Date(item.release_date || item.first_air_date).getFullYear() 
                : 'N/A';

              return (
                <div 
                  key={item.id}
                  onClick={() => navigate(targetRoute)}
                  className="group bg-[#131217] border border-white/5 hover:border-white/20 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 shadow-xl cursor-pointer flex flex-col justify-between"
                >
                  <div className="aspect-[2/3] w-full bg-neutral-900 overflow-hidden relative">
                    {item.poster_path ? (
                      <img 
                        src={item.poster_path.startsWith('http') ? item.poster_path : `https://image.tmdb.org/t/p/w500${item.poster_path}`} 
                        alt={displayTitle}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-gray-500 font-medium">
                        No Poster
                      </div>
                    )}

                    <span className="absolute top-2.5 left-2.5 bg-emerald-500 text-black font-black text-[9px] px-1.5 py-0.5 rounded tracking-widest uppercase">
                      HD
                    </span>

                    <div className="absolute top-2.5 right-2.5 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded-md text-[11px] font-bold text-yellow-400 flex items-center gap-1 border border-white/10">
                      <Star className="w-3 h-3 fill-yellow-400" />
                      <span>{item.vote_average ? Number(item.vote_average).toFixed(1) : '7.5'}</span>
                    </div>

                    <button 
                      onClick={(e) => handleRemove(item.id, e)}
                      className="absolute bottom-2.5 right-2.5 bg-black/80 hover:bg-red-600 text-white p-2 rounded-xl opacity-90 group-hover:opacity-100 transition border border-white/10 cursor-pointer"
                      title="Remove from Watchlist"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="p-3 bg-[#131217]">
                    <h4 className="text-xs font-bold text-gray-200 truncate group-hover:text-white transition uppercase tracking-wide">
                      {displayTitle}
                    </h4>
                    
                    <div className="flex items-center justify-between mt-2 text-[10px] text-gray-400 font-semibold">
                      <span>{releaseYear}</span>
                      <span className="bg-white/5 border border-white/10 px-2 py-0.5 rounded text-[9px] uppercase tracking-wider text-gray-300">
                        {isMovie ? 'MOVIE' : 'TV SHOW'}
                      </span>
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