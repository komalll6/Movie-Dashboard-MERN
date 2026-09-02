import React, { createContext, useContext, useState, useEffect } from "react";
import { movieService } from "../services/movieService";
import { useAuth } from "./AuthContext";
import {
  getWatchlistAPI,
  addToWatchlistAPI,
  removeFromWatchlistAPI,
} from "../services/watchlistService";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const { token } = useAuth();
  const [movies, setMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [genres, setGenres] = useState([]);

  // Active token helper
  const getCurrentToken = () => {
    const activeToken = token || localStorage.getItem("komsify_token");
    if (!activeToken || activeToken === "null" || activeToken === "undefined") return null;
    return activeToken.replace(/^"(.*)"$/, "$1").trim();
  };

  // Fetch Watchlist from Backend (MongoDB)
  const fetchBackendWatchlist = async () => {
    const activeToken = getCurrentToken();
    const saved = localStorage.getItem("movie_hub_watchlist");

    if (!activeToken) {
      if (saved) setWatchlist(JSON.parse(saved));
      return;
    }

    try {
      const response = await getWatchlistAPI();
      console.log("MongoDB Watchlist Fetched:", response.data);
      const rawList = response?.data?.data || response?.data || [];

      if (Array.isArray(rawList)) {
        const formattedList = rawList.map((item) => ({
          id: String(item.mediaId || item.id || item.movieId),
          title: item.title || item.name || "Untitled",
          poster_path: item.posterPath || item.poster_path,
          media_type: item.mediaType || item.media_type || "movie",
          vote_average: item.rating || item.vote_average || 0,
        }));
        setWatchlist(formattedList);
        localStorage.setItem(
          "movie_hub_watchlist",
          JSON.stringify(formattedList)
        );
      }
    } catch (error) {
      console.error("Backend Fetch Error:", error?.response?.data || error);
      if (saved) setWatchlist(JSON.parse(saved));
    }
  };

  useEffect(() => {
    fetchBackendWatchlist();
  }, [token]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        if (movieService && typeof movieService.getGenres === "function") {
          const genreList = await movieService.getGenres();
          setGenres(genreList);
        }
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    fetchGenres();
  }, []);

  // Add Item to Watchlist & Backend
  const addToWatchlist = async (movie) => {
    const mediaId = String(movie.id || movie.movieId);

    const exists = watchlist.some((item) => String(item.id) === mediaId);
    const newWatchlist = exists
      ? watchlist
      : [...watchlist, { ...movie, id: mediaId }];

    setWatchlist(newWatchlist);
    localStorage.setItem(
      "movie_hub_watchlist",
      JSON.stringify(newWatchlist)
    );

    const activeToken = getCurrentToken();
    if (activeToken) {
      try {
        const payload = {
          mediaId: mediaId,
          title: movie.title || movie.name || "Untitled",
          posterPath: movie.poster_path || movie.posterPath || "",
          mediaType: movie.media_type || (movie.title ? "movie" : "tv"),
          rating: movie.vote_average || movie.voteAverage || 0,
        };

        console.log("Saving to MongoDB...", payload);
        const res = await addToWatchlistAPI(payload);
        console.log("Successfully saved in MongoDB:", res.data);
      } catch (error) {
        console.error("MongoDB Save Failed:", error?.response?.data || error);
      }
    } else {
      console.warn("No token found. Saved in localStorage only.");
    }
  };

  // Remove Item from Watchlist & Backend
  const removeFromWatchlist = async (movieId) => {
    const stringId = String(movieId);
    const updatedList = watchlist.filter(
      (item) => String(item.id) !== stringId
    );

    setWatchlist(updatedList);
    localStorage.setItem(
      "movie_hub_watchlist",
      JSON.stringify(updatedList)
    );

    const activeToken = getCurrentToken();
    if (activeToken) {
      try {
        const res = await removeFromWatchlistAPI(stringId);
        console.log("Successfully removed from MongoDB:", res.data);
      } catch (error) {
        console.error("MongoDB Remove Failed:", error?.response?.data || error);
      }
    }
  };

  const value = {
    movies,
    setMovies,
    searchResults,
    setSearchResults,
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    loading,
    setLoading,
    genres,
    fetchBackendWatchlist,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
