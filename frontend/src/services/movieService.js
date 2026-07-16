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

  // 5. Get Movie Details (with cast, trailers/videos, and recommendations appended!)
  getMovieDetails: async (movieId) => {
    const response = await api.get(`/movie/${movieId}`, {
      params: { append_to_response: "videos,credits,recommendations" },
    });
    return response.data;
  },

  // 6. Search Movies (Linked with your SearchBar and Dropdown)
  searchMovies: async (query, page = 1) => {
    const response = await api.get("/search/movie", {
      params: { query, page, include_adult: false },
    });
    return response.data.results;
  },

  // 7. Discover Movies by Genre ID (Linked with Sidebar filters)
  getByGenre: async (genreId, page = 1) => {
    const response = await api.get("/discover/movie", {
      params: { with_genres: genreId, page, sort_by: "popularity.desc" },
    });
    return response.data.results;
  },

  // 8. Fetch Movie Genre Map (To link names like "Action" to ID numbers)
  getGenres: async () => {
    const response = await api.get("/genre/movie/list");
    return response.data.genres;
  }
};