// SearchResults.jsx
// import React, { useEffect, useState } from 'react';
// import { useSearchParams, useNavigate } from 'react-router-dom';
// import { movieService } from '../services/movieService';
// import { Star, Tv, Film } from 'lucide-react';

// const SearchResults = () => {
//   const [searchParams] = useSearchParams();
//   const query = searchParams.get('q') || '';
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchResults = async () => {
//       if (!query.trim()) return;
//       setLoading(true);
//       try {
//         const data = await movieService.searchMulti(query);
//         setResults(data);
//       } catch (error) {
//         console.error("Search Page Error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchResults();
//   }, [query]);

//   const handleCardClick = (item) => {
//     const isTV = item.media_type === 'tv' || item.first_air_date || (item.name && !item.title);
//     if (isTV) {
//       navigate(`/series/${item.id}`);
//     } else {
//       navigate(`/movie/${item.id}`);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#0d0c0f] text-white pt-24 pb-12 px-4 md:px-12">
//       <div className="max-w-7xl mx-auto">
//         <h2 className="text-xl md:text-2xl font-bold mb-6">
//           Search & Reference Results for: <span className="text-red-500">"{query}"</span>
//         </h2>

//         {loading ? (
//           <div className="flex justify-center py-20">
//             <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-red-600"></div>
//           </div>
//         ) : results.length === 0 ? (
//           <div className="text-gray-400 text-center py-20">
//             No movies or series found matching "{query}".
//           </div>
//         ) : (
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
//             {results.map((item) => {
//               const title = item.title || item.name;
//               const isTV = item.media_type === 'tv' || item.first_air_date || (item.name && !item.title);
//               const year = (item.release_date || item.first_air_date)?.split('-')[0];

//               return (
//                 <div
//                   key={item.id}
//                   onClick={() => handleCardClick(item)}
//                   className="bg-[#131217] border border-white/5 hover:border-red-600/50 rounded-xl overflow-hidden cursor-pointer transition duration-300 group shadow-lg"
//                 >
//                   <div className="aspect-[2/3] w-full bg-neutral-900 relative overflow-hidden">
//                     {item.poster_path ? (
//                       <img
//                         src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
//                         alt={title}
//                         className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
//                       />
//                     ) : (
//                       <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">
//                         No Poster Available
//                       </div>
//                     )}
//                     <span className="absolute top-2 left-2 text-[10px] font-bold uppercase px-2 py-0.5 rounded shadow bg-black/70 backdrop-blur-md">
//                       {isTV ? (
//                         <span className="text-purple-400 flex items-center gap-1"><Tv className="w-3 h-3" /> TV</span>
//                       ) : (
//                         <span className="text-red-400 flex items-center gap-1"><Film className="w-3 h-3" /> Movie</span>
//                       )}
//                     </span>
//                   </div>

//                   <div className="p-3">
//                     <h4 className="text-xs font-bold text-gray-100 truncate group-hover:text-red-500 transition">
//                       {title}
//                     </h4>
//                     <div className="flex items-center justify-between mt-2 text-[11px] text-gray-400">
//                       <span>{year || 'N/A'}</span>
//                       {item.vote_average > 0 && (
//                         <span className="flex items-center gap-1 text-yellow-500 font-bold">
//                           <Star className="w-3 h-3 fill-current" />
//                           {item.vote_average.toFixed(1)}
//                         </span>
//                       )}
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

// export default SearchResults;

import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { movieService } from '../services/movieService';
import { Star, Tv, Film } from 'lucide-react';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      if (!query.trim()) return;
      setLoading(true);
      try {
        const data = await movieService.searchMulti(query);
        setResults(data);
      } catch (error) {
        console.error("Search Page Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  const handleCardClick = (item) => {
    const isTV = item.media_type === 'tv' || item.first_air_date || (item.name && !item.title);
    if (isTV) {
      navigate(`/series/${item.id}`);
    } else {
      navigate(`/movie/${item.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0c0f] text-white pt-24 pb-12 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold mb-6">
          Search & Reference Results for: <span className="text-red-500">"{query}"</span>
        </h2>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-red-600"></div>
          </div>
        ) : results.length === 0 ? (
          <div className="text-gray-400 text-center py-20">
            No movies or series found matching "{query}".
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {results.map((item) => {
              const title = item.title || item.name;
              const isTV = item.media_type === 'tv' || item.first_air_date || (item.name && !item.title);
              const year = (item.release_date || item.first_air_date)?.split('-')[0];

              return (
                <div
                  key={item.id}
                  onClick={() => handleCardClick(item)}
                  className="bg-[#131217] border border-white/5 hover:border-red-600/50 rounded-xl overflow-hidden cursor-pointer transition duration-300 group shadow-lg"
                >
                  <div className="aspect-[2/3] w-full bg-neutral-900 relative overflow-hidden">
                    {item.poster_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">
                        No Poster Available
                      </div>
                    )}
                    <span className="absolute top-2 left-2 text-[10px] font-bold uppercase px-2 py-0.5 rounded shadow bg-black/70 backdrop-blur-md">
                      {isTV ? (
                        <span className="text-purple-400 flex items-center gap-1"><Tv className="w-3 h-3" /> TV</span>
                      ) : (
                        <span className="text-red-400 flex items-center gap-1"><Film className="w-3 h-3" /> Movie</span>
                      )}
                    </span>
                  </div>

                  <div className="p-3">
                    <h4 className="text-xs font-bold text-gray-100 truncate group-hover:text-red-500 transition">
                      {title}
                    </h4>
                    <div className="flex items-center justify-between mt-2 text-[11px] text-gray-400">
                      <span>{year || 'N/A'}</span>
                      {item.vote_average > 0 && (
                        <span className="flex items-center gap-1 text-yellow-500 font-bold">
                          <Star className="w-3 h-3 fill-current" />
                          {item.vote_average.toFixed(1)}
                        </span>
                      )}
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

export default SearchResults;