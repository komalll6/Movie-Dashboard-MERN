import api from "./api";

export const movieService = {
  // 1. Get Trending Movies (Used for Hero rotation or main landing page)
  getTrending: async (timeWindow = "day") => {
    const response = await api.get(`/trending/movie/${timeWindow}`);
    return response.data.results;
  },

  // Aapke baaki methods jaise getTrending wagera ke niche ise add karein:
getAnime: async () => {
  try {
    // TMDB endpoint to discover movies with Animation genre ID (16)
    const response = await axiosInstance.get(`/discover/movie?with_genres=16&sort_by=popularity.desc`);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching anime:", error);
    throw error;
  }
},

  // 2. Get Popular Movies
  getPopular: async (page = 1) => {
    const response = await api.get("/movie/popular", { params: { page } });
    return response.data.results;
  },

  // 3. Get Top Rated Movies
  getTopRated: async (page = 1) => {
    const response = await api.get("/movie/top_rated", { params: { page } });
    return response.data.results;
  },

  // 4. Get Upcoming Movies
  getUpcoming: async (page = 1) => {
    const response = await api.get("/movie/upcoming", { params: { page } });
    return response.data.results;
  },

  // 5. Get Movie Details (Optimized: Ek baar mein details, videos, aur credits laata hai)
  getMovieDetails: async (movieId) => {
    const response = await api.get(`/movie/${movieId}`, {
      params: { append_to_response: "videos,credits,recommendations" },
    });
    return response.data;
  },

  // 6. Search Movies
  searchMovies: async (query, page = 1) => {
    const response = await api.get("/search/movie", {
      params: { query, page, include_adult: false },
    });
    return response.data.results;
  },

  // 7. Discover Movies by Genre ID
  getByGenre: async (genreId, page = 1) => {
    const response = await api.get("/discover/movie", {
      params: { with_genres: genreId, page, sort_by: "popularity.desc" },
    });
    return response.data.results;
  },

  // 8. Fetch Movie Genre Map
  getGenres: async () => {
    const response = await api.get("/genre/movie/list");
    return response.data.genres;
  }, 

  // 9. Fetch Dynamic Anime List (Pure Japanese Animation)
  getAnime: async (page = 1) => {
    const response = await api.get("/discover/movie", {
      params: {
        with_genres: 16,                  // 16 = Animation Genre ID
        with_original_language: "ja",     // ja = Japanese Language (Filters pure Anime)
        sort_by: "popularity.desc",
        page
      }
    });
    return response.data.results;
  },

  // 10. Fetch Fresh & Popular Bollywood Movies (Recent Hits)
  getTopRatedBollywood: async (page = 1) => {
    try {
      const response = await api.get("/discover/movie", {
        params: {
          page,
          region: "IN",
          with_original_language: "hi",
          sort_by: "primary_release_date.desc", 
          "primary_release_date.lte": "2026-07-17", 
          "vote_count.gte": 15, 
        },
      });
      return response.data.results;
    } catch (error) {
      console.error("Error fetching Bollywood movies:", error);
      return [];
    }
  },

  // 11. Fetch Movie Cast / Credits (Top 6 Main Cast)
  getMovieCredits: async (movieId) => {
    const response = await api.get(`/movie/${movieId}/credits`);
    return response.data.cast.slice(0, 6);
  },

  // 12. Fetch YouTube Trailer Videos (Strict Filtering applied to fix infinite loading)
  getMovieVideos: async (movieId) => {
    const response = await api.get(`/movie/${movieId}/videos`);
    
    // Pehle strictly check karega ki pure Official Trailer name ya type ho taaki clip/short skip ho jaye
    const mainTrailer = response.data.results.find(
      (vid) => vid.site === "YouTube" && vid.type === "Trailer" && 
      (vid.name.toLowerCase().includes("official trailer") || vid.name.toLowerCase().includes("trailer"))
    );

    // Agar official trailer na mile, toh koi bhi normal trailer ya teaser uthaye
    const backupTrailer = response.data.results.find(
      (vid) => vid.site === "YouTube" && (vid.type === "Trailer" || vid.type === "Teaser")
    );

    return mainTrailer ? mainTrailer.key : (backupTrailer ? backupTrailer.key : null);
  }
};