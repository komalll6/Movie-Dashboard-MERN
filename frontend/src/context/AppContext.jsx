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

// Both named and default exports for maximum compatibility
export const useAppContext = () => useContext(AppContext);
export default AppContext;

// import { createContext, useContext, useState, useEffect } from "react";
// import { movieService } from "../services/movieService";

// const AuthContext = createContext();

// export const AppProvider = ({ children }) => {
//   // 1. Initial State from localStorage so login persists on page refresh
//   const [user, setUser] = useState(() => {
//     const savedUser = localStorage.getItem("komsify_user");
//     return savedUser ? JSON.parse(savedUser) : null;
//   });

//   const [token, setToken] = useState(() => {
//     return localStorage.getItem("komsify_token") || null;
//   });

//   const [movies, setMovies] = useState([]); 
//   const [searchResults, setSearchResults] = useState([]);
//   const [watchlist, setWatchlist] = useState(() => {
//     const savedWatchlist = localStorage.getItem("movie_hub_watchlist");
//     return savedWatchlist ? JSON.parse(savedWatchlist) : [];
//   });
//   const [loading, setLoading] = useState(false);
//   const [genres, setGenres] = useState([]);

//   // 2. Auth Helper Methods
//   const loginUser = (userData, userToken) => {
//     setUser(userData);
//     setToken(userToken);
//     localStorage.setItem("komsify_user", JSON.stringify(userData));
//     localStorage.setItem("komsify_token", userToken);
//   };

//   const logoutUser = () => {
//     setUser(null);
//     setToken(null);
//     localStorage.removeItem("komsify_user");
//     localStorage.removeItem("komsify_token");
//   };

//   // Local Storage mein watchlist sync
//   useEffect(() => {
//     localStorage.setItem("movie_hub_watchlist", JSON.stringify(watchlist));
//   }, [watchlist]);

//   // Safe Genre Fetching logic
//   useEffect(() => {
//     const fetchGenres = async () => {
//       try {
//         if (movieService && typeof movieService.getGenres === 'function') {
//           const genreList = await movieService.getGenres();
//           setGenres(genreList);
//         } else {
//           console.warn("movieService.getGenres is not defined yet.");
//         }
//       } catch (error) {
//         console.error("Error fetching genres:", error);
//       }
//     };
//     fetchGenres();
//   }, []);

//   // Watchlist Helpers
//   const addToWatchlist = (movie) => {
//     if (!watchlist.some((item) => item.id === movie.id)) {
//       setWatchlist((prev) => [...prev, movie]);
//     }
//   };

//   const removeFromWatchlist = (movieId) => {
//     setWatchlist((prev) => prev.filter((item) => item.id !== movieId));
//   };

//   const value = {
//     user,
//     token,
//     loginUser,
//     logoutUser,
//     isAuthenticated: !!token,
//     movies,
//     setMovies,
//     searchResults,
//     setSearchResults,
//     watchlist,
//     addToWatchlist,
//     removeFromWatchlist,
//     loading,
//     setLoading,
//     genres,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Exporting AuthProvider as an alias so both named imports work without breaking
// export const AuthProvider = AppProvider;

// export const useAuth = () => useContext(AuthContext);
// export const useAppContext = () => useContext(AuthContext);
