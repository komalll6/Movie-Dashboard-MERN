import { Link } from "react-router-dom";
import { Star } from "lucide-react";

function MovieCard({ movie }) {
  const title = movie.title || movie.name || "Untitled Content";
  
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image+Available";

  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";
  
  const releaseYear = movie.release_date 
    ? movie.release_date.split('-')[0] 
    : (movie.first_air_date ? movie.first_air_date.split('-')[0] : '2026');

  // Identifying if it is a show to render Seasons and Episodes badge
  const checkIsShow = movie.is_series || movie.first_air_date !== undefined;

  return (
    <Link 
      to={`/movie/${movie.id}?type=${checkIsShow ? 'tv' : 'movie'}`} 
      className="group relative bg-[#131217] rounded-2xl overflow-hidden shadow-lg border border-white/5 hover:border-red-600/40 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col w-full"
    >
      {/* Image Block & Stickers */}
      <div className="relative aspect-[2/3] w-full bg-neutral-900 overflow-hidden">
        <img 
          src={posterUrl} 
          alt={title}
          className="w-full h-full object-cover transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Quality Sticker (Top-Left) */}
        <div className="absolute top-2 left-2 bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow z-10">
          HD
        </div>
        
        {/* Dynamic Star Rating (Top-Right) */}
        {movie.vote_average > 0 && (
          <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-md text-yellow-400 text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5 shadow z-10">
            <Star className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
            {rating}
          </div>
        )}
      </div>

      {/* Text Info Section */}
      <div className="p-3 flex flex-col flex-grow justify-between bg-[#131217] border-t border-white/5">
        <h3 className="text-sm font-bold text-gray-200 group-hover:text-red-500 transition-colors line-clamp-1 truncate uppercase tracking-wide">
          {title}
        </h3>
        <div className="flex items-center justify-between text-[11px] text-gray-400 mt-1 font-medium">
          {checkIsShow ? (
            <span className="text-purple-400 font-bold bg-purple-500/10 px-1.5 py-0.2 rounded text-[10px]">
              {movie.number_of_seasons || 1} S • {movie.number_of_episodes || 12} E
            </span>
          ) : (
            <span>{releaseYear}</span>
          )}
          <span className="border border-white/10 px-1.5 py-0.2 rounded text-[9px] uppercase tracking-tighter bg-white/5">
            {checkIsShow ? 'Series' : 'Movie'}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;