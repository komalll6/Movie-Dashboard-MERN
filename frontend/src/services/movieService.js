//anemi
import api from "./api";

export const movieService = {
  // 1. Get Trending Movies (Used for Hero rotation or main landing page)
  getTrending: async (timeWindow = "day") => {
    const response = await api.get(`/trending/movie/${timeWindow}`);
    return response.data.results;
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

  // 5. Get Movie Details
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
          sort_by: "primary_release_date.desc", // Latest releases sabse pehle aayengi
          "primary_release_date.lte": "2026-07-17", // Aaj ki date tak ke releases
          "vote_count.gte": 15, // Taaki bilkul unknown ya zero rating movies filter ho jayein
        },
      });
      return response.data.results;
    } catch (error) {
      console.error("Error fetching Bollywood movies:", error);
      return [];
    }
  },

  getMovieImages: async (movieId) => {
    const response = await fetch(`${BASE_URL}/movie/${movieId}/images`, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
      }
    });
    return await response.json();
  }
};