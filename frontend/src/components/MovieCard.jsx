import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image+Available";

  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";
  
  const releaseYear = movie.release_date 
    ? movie.release_date.split('-')[0] 
    : (movie.first_air_date ? movie.first_air_date.split('-')[0] : '');

  return (
    <Link to={`/movie/${movie.id}`} className="block w-full">
      {/* Humne is main div par 'group' lagaya hai taaki hover effects isi ke relative rahein */}
      <div className="group relative aspect-[2/3] w-full rounded-lg overflow-hidden bg-[#181818] transition-all duration-300 ease-out hover:scale-105 hover:shadow-2xl hover:shadow-black/80">
        
        {/* Movie Poster Image */}
        <img
          src={posterUrl}
          alt={movie.title || movie.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Info Overlay (Sirf tabhi dikhega jab is specific individual card par hover hoga) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          
          {/* Play Icon */}
          <div className="mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <span className="w-10 h-10 bg-white hover:bg-red-600 hover:text-white text-black rounded-full flex items-center justify-center shadow-lg transition duration-200">
              <span className="text-sm pl-0.5">▶</span>
            </span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-white text-base leading-tight mb-1 drop-shadow-md transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
            {movie.title || movie.name}
          </h3>

          {/* Metadata */}
          <div className="flex items-center gap-3 text-xs font-semibold text-gray-300 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
            <span className="text-emerald-400">
              ★ {rating}
            </span>
            {releaseYear && (
              <>
                <span className="text-gray-600">•</span>
                <span>{releaseYear}</span>
              </>
            )}
          </div>
        </div>
        
      </div>
    </Link>
  );
}

export default MovieCard;