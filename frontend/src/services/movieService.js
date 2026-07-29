//new- 25-07
import api from "./api";

// Helper function to interleave lists cleanly for mixed views
const interleaveMovies = (...lists) => {
  const mixed = [];
  const maxLen = Math.max(...lists.map(l => l ? l.length : 0));
  for (let i = 0; i < maxLen; i++) {
    lists.forEach(list => {
      if (list && list[i]) mixed.push(list[i]);
    });
  }
  return mixed;
};

// Helper function to remove duplicate objects based on item ID
const removeDuplicates = (list) => {
  return Array.from(new Map(list.map(item => [item.id, item])).values());
};

// Helper to standardise TV series object structures
const mapTV = (list) => (list || []).map(item => ({ ...item, isTVSeries: true, media_type: 'tv' }));

export const movieService = {
  // 1. Get Trending Movies
  getTrending: async (timeWindow = "day") => {
    try {
      const response = await api.get(`/trending/movie/${timeWindow}`);
      return response.data.results || [];
    } catch (e) { return []; }
  },

  // 2. Standard Popular Movies
  getPopular: async (page = 1) => {
    try {
      const response = await api.get("/movie/popular", { params: { page } });
      return response.data.results || [];
    } catch (e) { return []; }
  },

  // 3. Standard Top Rated Movies
  getTopRated: async (page = 1) => {
    try {
      const response = await api.get("/movie/top_rated", { params: { page } });
      return response.data.results || [];
    } catch (e) { return []; }
  },

  // 4. Standard Anime Collection
  getAnime: async (page = 1) => {
    try {
      const response = await api.get("/discover/movie", {
        params: { with_genres: 16, with_original_language: "ja", sort_by: "popularity.desc", page }
      });
      return response.data.results || [];
    } catch (e) { return []; }
  },

  // 5. Standard Bollywood Endpoint
  getTopRatedBollywood: async (page = 1) => {
    try {
      const response = await api.get("/discover/movie", {
        params: { page, region: "IN", with_original_language: "hi", sort_by: "popularity.desc" },
      });
      return response.data.results || [];
    } catch (error) { return []; }
  },

  getTrendingSeries2026: async (page = 1) => {
    try {
      const response = await api.get("/discover/tv", {
        params: {
          page,
          sort_by: "popularity.desc",
          first_air_date_year: 2026,
          without_genres: "16",
          include_null_first_air_dates: false
        }
      });
      return mapTV(response.data.results);
    } catch (error) { return []; }
  },

  // ==============================================================
  // MOVIES ENDPOINTS (FIXED DISCOVER VS POPULAR)
  // ==============================================================

  // NEW DISCOVER MOVIES: Shows newly released/discovered films
  discoverAllMixedObject: async (page = 1) => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const response = await api.get("/discover/movie", {
        params: {
          page,
          sort_by: "primary_release_date.desc",
          "primary_release_date.lte": today,
          "vote_count.gte": 15
        }
      });
      return {
        results: removeDuplicates(response.data.results || []),
        total_pages: response.data.total_pages || 500
      };
    } catch (e) { return { results: [], total_pages: 1 }; }
  },

  // MOST POPULAR MOVIES: Direct popular endpoints from TMDB
  getPopularMixedObject: async (page = 1) => {
    try {
      const response = await api.get("/movie/popular", { params: { page } });
      return {
        results: removeDuplicates(response.data.results || []),
        total_pages: response.data.total_pages || 500
      };
    } catch (e) { return { results: [], total_pages: 1 }; }
  },

  getTrendingMoviesMixedObject: async (page = 1) => {
    try {
      const response = await api.get("/trending/movie/day", { params: { page } });
      return {
        results: removeDuplicates(response.data.results || []),
        total_pages: response.data.total_pages || 500
      };
    } catch (e) { return { results: [], total_pages: 1 }; }
  },

  getTopRatedMixedObject: async (page = 1) => {
    try {
      const response = await api.get("/movie/top_rated", { params: { page } });
      return {
        results: removeDuplicates(response.data.results || []),
        total_pages: response.data.total_pages || 500
      };
    } catch (e) { return { results: [], total_pages: 1 }; }
  },

  getAnimeMixedObject: async (page = 1) => {
    try {
      const response = await api.get("/discover/movie", {
        params: { with_genres: 16, with_original_language: "ja", sort_by: "popularity.desc", page }
      });
      return {
        results: response.data.results || [],
        total_pages: response.data.total_pages || 500
      };
    } catch (e) { return { results: [], total_pages: 1 }; }
  },

  // ==============================================================
  // TV SERIES ENDPOINTS (FIXED DISCOVER VS POPULAR)
  // ==============================================================

  // NEW DISCOVER TV SERIES: Recently premiered shows
  getTVDiscoverMixedObject: async (page = 1) => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const response = await api.get("/discover/tv", {
        params: {
          page,
          sort_by: "first_air_date.desc",
          "first_air_date.lte": today,
          "vote_count.gte": 5
        }
      });

      return {
        results: removeDuplicates(mapTV(response.data.results)),
        total_pages: response.data.total_pages || 500
      };
    } catch (e) { return { results: [], total_pages: 1 }; }
  },

  // MOST POPULAR TV SERIES: Global TMDB Popular TV list
  getTVPopularMixedObject: async (page = 1) => {
    try {
      const response = await api.get("/tv/popular", { params: { page } });

      return {
        results: removeDuplicates(mapTV(response.data.results)),
        total_pages: response.data.total_pages || 500
      };
    } catch (e) { return { results: [], total_pages: 1 }; }
  },

  getTrendingTVMixedObject: async (page = 1) => {
    try {
      const response = await api.get("/trending/tv/day", { params: { page } });
      return {
        results: removeDuplicates(mapTV(response.data.results)),
        total_pages: response.data.total_pages || 500
      };
    } catch (e) { return { results: [], total_pages: 1 }; }
  },

  getTVAiringTodayMixedObject: async (page = 1) => {
    try {
      const response = await api.get("/tv/airing_today", { params: { page } });
      return {
        results: removeDuplicates(mapTV(response.data.results)),
        total_pages: response.data.total_pages || 500
      };
    } catch (e) { return { results: [], total_pages: 1 }; }
  },

  getTVTopRatedMixedObject: async (page = 1) => {
    try {
      const response = await api.get("/tv/top_rated", { params: { page } });
      return {
        results: removeDuplicates(mapTV(response.data.results)),
        total_pages: response.data.total_pages || 500
      };
    } catch (e) { return { results: [], total_pages: 1 }; }
  },

  // Details
  getMovieDetails: async (movieId) => {
    try {
      const response = await api.get(`/movie/${movieId}`, {
        params: { append_to_response: "videos,credits,recommendations" },
      });
      return response.data;
    } catch (movieError) { throw movieError; }
  },

  getSeriesDetails: async (seriesId) => {
    try {
      const tvResponse = await api.get(`/tv/${seriesId}`, {
        params: { append_to_response: "videos,credits,recommendations" },
      });
      return {
        ...tvResponse.data,
        title: tvResponse.data.name,
        release_date: tvResponse.data.first_air_date,
        number_of_seasons: tvResponse.data.number_of_seasons,
        number_of_episodes: tvResponse.data.number_of_episodes,
        isTVSeries: true
      };
    } catch (tvError) { throw tvError; }
  },

  getSeasonEpisodes: async (tvId, seasonNumber) => {
    try {
      const response = await api.get(`/tv/${tvId}/season/${seasonNumber}`);
      return response.data.episodes || [];
    } catch (error) { return []; }
  },

  getGenres: async () => {
    try {
      const response = await api.get("/genre/movie/list");
      return response.data.genres || [];
    } catch (e) { return []; }
  },

  searchMulti: async (query) => {
    try {
      if (!query || query.trim() === "") return [];

      const cleanQuery = query.trim();
      const primaryRes = await api.get("/search/multi", {
        params: { query: cleanQuery, include_adult: false }
      });
      let results = primaryRes.data.results || [];

      let filtered = results.filter(
        item => item && (item.media_type === "movie" || item.media_type === "tv" || item.title || item.name)
      );

      return removeDuplicates(filtered);
    } catch (e) { return []; }
  },
};
