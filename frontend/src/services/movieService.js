import api from "./api";

// Helper function to interleave lists cleanly for Category Page mixed views
const interleaveMovies = (...lists) => {
  const mixed = [];
  const maxLen = Math.max(...lists.map(l => l.length));
  for (let i = 0; i < maxLen; i++) {
    lists.forEach(list => {
      if (list[i]) mixed.push(list[i]);
    });
  }
  return mixed;
};

export const movieService = {
  // 1. Get Trending Movies (Returns pure array for Home component)
  getTrending: async (timeWindow = "day") => {
    try {
      const response = await api.get(`/trending/movie/${timeWindow}`);
      return response.data.results || [];
    } catch (e) {
      return [];
    }
  },

  // 2. Standard Popular Movies (Returns pure array to keep Home page safe)
  getPopular: async (page = 1) => {
    try {
      const response = await api.get("/movie/popular", { params: { page } });
      return response.data.results || [];
    } catch (e) {
      return [];
    }
  },

  // 3. Standard Top Rated Movies (Returns pure array to keep Home page safe)
  getTopRated: async (page = 1) => {
    try {
      const response = await api.get("/movie/top_rated", { params: { page } });
      return response.data.results || [];
    } catch (e) {
      return [];
    }
  },

  // 4. Standard Anime Collection (Returns pure array to completely fix the Home.jsx crash)
  getAnime: async (page = 1) => {
    try {
      const response = await api.get("/discover/movie", {
        params: {
          with_genres: 16,
          with_original_language: "ja",
          sort_by: "popularity.desc",
          page
        }
      });
      return response.data.results || [];
    } catch (e) {
      return [];
    }
  },

  // 5. Standard Bollywood Endpoint (Returns pure array for Home Page sliders)
  getTopRatedBollywood: async (page = 1) => {
    try {
      const response = await api.get("/discover/movie", {
        params: {
          page,
          region: "IN",
          with_original_language: "hi",
          sort_by: "popularity.desc"
        },
      });
      return response.data.results || [];
    } catch (error) {
      return [];
    }
  },

  // ==========================================
  // DEDICATED MULTI-INDUSTRY MIXED METHODS FOR CATEGORY PAGE (WITH TOTAL_PAGES OBJECTS)
  // ==========================================

  getPopularMixedObject: async (page = 1) => {
    try {
      const [hollywood, bollywood, south] = await Promise.all([
        api.get("/discover/movie", { params: { page, sort_by: "popularity.desc", with_original_language: "en" } }),
        api.get("/discover/movie", { params: { page, sort_by: "popularity.desc", with_original_language: "hi" } }),
        api.get("/discover/movie", { params: { page, sort_by: "popularity.desc", with_original_language: "te|ta|ml|kn" } })
      ]);
      return {
        results: interleaveMovies(hollywood.data.results || [], bollywood.data.results || [], south.data.results || []),
        total_pages: Math.max(hollywood.data.total_pages || 1, bollywood.data.total_pages || 1, south.data.total_pages || 1)
      };
    } catch (e) {
      return { results: [], total_pages: 1 };
    }
  },

  getTopRatedMixedObject: async (page = 1) => {
    try {
      const [hollywood, bollywood, south] = await Promise.all([
        api.get("/movie/top_rated", { params: { page, with_original_language: "en" } }),
        api.get("/discover/movie", { params: { page, sort_by: "vote_average.desc", "vote_count.gte": 100, with_original_language: "hi" } }),
        api.get("/discover/movie", { params: { page, sort_by: "vote_average.desc", "vote_count.gte": 100, with_original_language: "te|ta|ml|kn" } })
      ]);
      return {
        results: interleaveMovies(hollywood.data.results || [], bollywood.data.results || [], south.data.results || []),
        total_pages: Math.max(hollywood.data.total_pages || 1, bollywood.data.total_pages || 1, south.data.total_pages || 1)
      };
    } catch (e) {
      return { results: [], total_pages: 1 };
    }
  },

  discoverAllMixedObject: async (page = 1) => {
    try {
      const [hollywood, bollywood, south] = await Promise.all([
        api.get("/discover/movie", { params: { page, sort_by: "revenue.desc", with_original_language: "en" } }),
        api.get("/discover/movie", { params: { page, sort_by: "popularity.desc", with_original_language: "hi" } }),
        api.get("/discover/movie", { params: { page, sort_by: "popularity.desc", with_original_language: "te|ta" } })
      ]);
      return {
        results: interleaveMovies(hollywood.data.results || [], bollywood.data.results || [], south.data.results || []),
        total_pages: Math.max(hollywood.data.total_pages || 1, bollywood.data.total_pages || 1, south.data.total_pages || 1)
      };
    } catch (e) {
      return { results: [], total_pages: 1 };
    }
  },

  getAnimeMixedObject: async (page = 1) => {
    try {
      const response = await api.get("/discover/movie", {
        params: { with_genres: 16, with_original_language: "ja", sort_by: "popularity.desc", page }
      });
      return {
        results: response.data.results || [],
        total_pages: response.data.total_pages || 1
      };
    } catch (e) {
      return { results: [], total_pages: 1 };
    }
  },

  // 6. Polymorphic Details Fetcher (Movie Details OR TV Series Details dynamically)
  getMovieDetails: async (movieId) => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const contentType = urlParams.get('type');

      if (contentType === 'tv') {
        const tvResponse = await api.get(`/tv/${movieId}`, {
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
      }

      const response = await api.get(`/movie/${movieId}`, {
        params: { append_to_response: "videos,credits,recommendations" },
      });
      return response.data;
    } catch (movieError) {
      try {
        const tvResponse = await api.get(`/tv/${movieId}`, {
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
      } catch (tvError) {
        throw tvError;
      }
    }
  },

  // 7. Dynamic Episodes Fetcher for Specific Season Dropdown Click
  getSeasonEpisodes: async (tvId, seasonNumber) => {
    try {
      const response = await api.get(`/tv/${tvId}/season/${seasonNumber}`);
      return response.data.episodes || [];
    } catch (error) {
      console.error("Error fetching season episodes:", error);
      return [];
    }
  },

  // 8. Fetch 2026 Trending TV Series 
  getTrendingSeries2026: async (page = 1) => {
    try {
      const response = await api.get("/discover/tv", {
        params: {
          page,
          first_air_date_year: 2026,
          sort_by: "popularity.desc",
          include_adult: false
        }
      });
      
      const detailedPromises = (response.data.results || []).map(async (show) => {
        try {
          const detailRes = await api.get(`/tv/${show.id}`);
          return {
            ...show,
            number_of_seasons: detailRes.data.number_of_seasons || 1,
            number_of_episodes: detailRes.data.number_of_episodes || 0,
            is_series: true
          };
        } catch {
          return { ...show, number_of_seasons: 1, number_of_episodes: 0, is_series: true };
        }
      });

      return await Promise.all(detailedPromises);
    } catch (error) {
      console.error("Error loading trending series:", error);
      return [];
    }
  }
};