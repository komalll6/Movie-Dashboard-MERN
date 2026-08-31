// import { createContext, useContext, useState, useEffect } from "react";
// import { movieService } from "../services/movieService";

// const AppContext = createContext();

// export const AppProvider = ({ children }) => {
//   const [movies, setMovies] = useState([]); 
//   const [searchResults, setSearchResults] = useState([]);
//   const [watchlist, setWatchlist] = useState(() => {
//     const savedWatchlist = localStorage.getItem("movie_hub_watchlist");
//     return savedWatchlist ? JSON.parse(savedWatchlist) : [];
//   });
//   const [loading, setLoading] = useState(false);
//   const [genres, setGenres] = useState([]);

//   useEffect(() => {
//     localStorage.setItem("movie_hub_watchlist", JSON.stringify(watchlist));
//   }, [watchlist]);

//   useEffect(() => {
//     const fetchGenres = async () => {
//       try {
//         if (movieService && typeof movieService.getGenres === 'function') {
//           const genreList = await movieService.getGenres();
//           setGenres(genreList);
//         }
//       } catch (error) {
//         console.error("Error fetching genres:", error);
//       }
//     };
//     fetchGenres();
//   }, []);

//   const addToWatchlist = (movie) => {
//     if (!watchlist.some((item) => item.id === movie.id)) {
//       setWatchlist((prev) => [...prev, movie]);
//     }
//   };

//   const removeFromWatchlist = (movieId) => {
//     setWatchlist((prev) => prev.filter((item) => item.id !== movieId));
//   };

//   const value = {
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
//     <AppContext.Provider value={value}>
//       {children}
//     </AppContext.Provider>
//   );
// };

// export const useAppContext = () => useContext(AppContext);
// export default AppContext;

//NEW - 30-08
// import { createContext, useContext, useState, useEffect } from "react";
// import { movieService } from "../services/movieService";
// import {
//   getWatchlistAPI,
//   addToWatchlistAPI,
//   removeFromWatchlistAPI,
// } from "../services/watchlistService";

// const AppContext = createContext();

// export const AppProvider = ({ children }) => {
//   const [movies, setMovies] = useState([]);
//   const [searchResults, setSearchResults] = useState([]);
//   const [watchlist, setWatchlist] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [genres, setGenres] = useState([]);

//   // Fetch Watchlist from Backend on Mount
//   const fetchBackendWatchlist = async () => {
//     try {
//       const response = await getWatchlistAPI();
//       if (response.data && response.data.success) {
//         // Map backend response fields to frontend structure
//         const formattedList = response.data.data.map((item) => ({
//           id: item.mediaId,
//           title: item.title,
//           poster_path: item.posterPath,
//           media_type: item.mediaType,
//           vote_average: item.rating,
//         }));
//         setWatchlist(formattedList);
//       }
//     } catch (error) {
//       console.error("Backend Watchlist fetch failed, fallback to local:", error);
//       const saved = localStorage.getItem("movie_hub_watchlist");
//       if (saved) setWatchlist(JSON.parse(saved));
//     }
//   };

//   useEffect(() => {
//     fetchBackendWatchlist();
//   }, []);

//   useEffect(() => {
//     const fetchGenres = async () => {
//       try {
//         if (movieService && typeof movieService.getGenres === "function") {
//           const genreList = await movieService.getGenres();
//           setGenres(genreList);
//         }
//       } catch (error) {
//         console.error("Error fetching genres:", error);
//       }
//     };
//     fetchGenres();
//   }, []);

//   const addToWatchlist = async (movie) => {
//     const mediaId = String(movie.id);
//     if (!watchlist.some((item) => String(item.id) === mediaId)) {
//       // Optimistic UI Update
//       setWatchlist((prev) => [...prev, movie]);

//       // API Call to MongoDB Backend
//       try {
//         await addToWatchlistAPI({
//           mediaId: mediaId,
//           title: movie.title || movie.name || "Untitled",
//           posterPath: movie.poster_path || "",
//           mediaType: movie.media_type || (movie.title ? "movie" : "tv"),
//           rating: movie.vote_average || 0,
//         });
//       } catch (error) {
//         console.error("Failed to add to database:", error);
//       }
//     }
//   };

//   const removeFromWatchlist = async (movieId) => {
//     setWatchlist((prev) => prev.filter((item) => String(item.id) !== String(movieId)));

//     try {
//       await removeFromWatchlistAPI(movieId);
//     } catch (error) {
//       console.error("Failed to remove from database:", error);
//     }
//   };

//   const value = {
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

//   return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
// };

// export const useAppContext = () => useContext(AppContext);
// export default AppContext;



//new- 31-08
// import React, { createContext, useContext, useState, useEffect } from "react";
// import { movieService } from "../services/movieService";
// import {
//   getWatchlistAPI,
//   addToWatchlistAPI,
//   removeFromWatchlistAPI,
//   getToken,
// } from "../services/watchlistService";

// const AppContext = createContext();

// export const AppProvider = ({ children }) => {
//   const [movies, setMovies] = useState([]);
//   const [searchResults, setSearchResults] = useState([]);
//   const [watchlist, setWatchlist] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [genres, setGenres] = useState([]);

//   // Fetch Watchlist Safely
//   const fetchBackendWatchlist = async () => {
//     const token = getToken();

//     // STOP HERE if user is not logged in. Do NOT call backend API.
//     if (!token) {
//       const saved = localStorage.getItem("movie_hub_watchlist");
//       if (saved) setWatchlist(JSON.parse(saved));
//       return;
//     }

//     try {
//       const response = await getWatchlistAPI();
//       const rawList = response?.data?.data || response?.data || [];

//       if (Array.isArray(rawList)) {
//         const formattedList = rawList.map((item) => ({
//           id: String(item.mediaId || item.id),
//           title: item.title,
//           poster_path: item.posterPath || item.poster_path,
//           media_type: item.mediaType || item.media_type || "movie",
//           vote_average: item.rating || item.vote_average || 0,
//         }));
//         setWatchlist(formattedList);
//       }
//     } catch (error) {
//       // Fallback silently without throwing unhandled exceptions
//       const saved = localStorage.getItem("movie_hub_watchlist");
//       if (saved) setWatchlist(JSON.parse(saved));
//     }
//   };

//   useEffect(() => {
//     fetchBackendWatchlist();
//   }, []);

//   useEffect(() => {
//     const fetchGenres = async () => {
//       try {
//         if (movieService && typeof movieService.getGenres === "function") {
//           const genreList = await movieService.getGenres();
//           setGenres(genreList);
//         }
//       } catch (error) {
//         console.error("Error fetching genres:", error);
//       }
//     };
//     fetchGenres();
//   }, []);

//   const addToWatchlist = async (movie) => {
//     const mediaId = String(movie.id || movie.movieId);

//     if (!watchlist.some((item) => String(item.id) === mediaId)) {
//       const newWatchlist = [...watchlist, { ...movie, id: mediaId }];
//       setWatchlist(newWatchlist);
//       localStorage.setItem("movie_hub_watchlist", JSON.stringify(newWatchlist));

//       const token = getToken();
//       if (!token) return; // Skip API call if not logged in

//       try {
//         await addToWatchlistAPI({
//           mediaId: mediaId,
//           title: movie.title || movie.name || "Untitled",
//           posterPath: movie.poster_path || movie.posterPath || "",
//           mediaType: movie.media_type || (movie.title ? "movie" : "tv"),
//           rating: movie.vote_average || movie.voteAverage || 0,
//         });
//       } catch (error) {
//         // Silently caught
//       }
//     }
//   };

//   const removeFromWatchlist = async (movieId) => {
//     const stringId = String(movieId);
//     const updatedList = watchlist.filter((item) => String(item.id) !== stringId);

//     setWatchlist(updatedList);
//     localStorage.setItem("movie_hub_watchlist", JSON.stringify(updatedList));

//     const token = getToken();
//     if (!token) return;

//     try {
//       await removeFromWatchlistAPI(stringId);
//     } catch (error) {
//       // Silently caught
//     }
//   };

//   const value = {
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
//     fetchBackendWatchlist,
//   };

//   return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
// };

// export const useAppContext = () => useContext(AppContext);
// export default AppContext;




import React, { createContext, useContext, useState, useEffect } from "react";
import { movieService } from "../services/movieService";
import {
  getWatchlistAPI,
  addToWatchlistAPI,
  removeFromWatchlistAPI,
} from "../services/watchlistService";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [genres, setGenres] = useState([]);

  // Fetch Watchlist from Backend (MongoDB)
  const fetchBackendWatchlist = async () => {
    const token = localStorage.getItem("komsify_token");
    if (!token) {
      const saved = localStorage.getItem("movie_hub_watchlist");
      if (saved) setWatchlist(JSON.parse(saved));
      return;
    }

    try {
      const response = await getWatchlistAPI();
      const rawList = response?.data?.data || response?.data || [];

      if (Array.isArray(rawList)) {
        const formattedList = rawList.map((item) => ({
          id: String(item.mediaId || item.id),
          title: item.title,
          poster_path: item.posterPath || item.poster_path,
          media_type: item.mediaType || item.media_type || "movie",
          vote_average: item.rating || item.vote_average || 0,
        }));
        setWatchlist(formattedList);
      }
    } catch (error) {
      const saved = localStorage.getItem("movie_hub_watchlist");
      if (saved) setWatchlist(JSON.parse(saved));
    }
  };

  useEffect(() => {
    fetchBackendWatchlist();
  }, []);

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

    if (!watchlist.some((item) => String(item.id) === mediaId)) {
      const newWatchlist = [...watchlist, { ...movie, id: mediaId }];
      setWatchlist(newWatchlist);
      localStorage.setItem("movie_hub_watchlist", JSON.stringify(newWatchlist));

      const token = localStorage.getItem("komsify_token");
      if (token) {
        try {
          await addToWatchlistAPI({
            mediaId: mediaId,
            title: movie.title || movie.name || "Untitled",
            posterPath: movie.poster_path || movie.posterPath || "",
            mediaType: movie.media_type || (movie.title ? "movie" : "tv"),
            rating: movie.vote_average || movie.voteAverage || 0,
          });
        } catch (error) {
          console.error("Backend Save Error:", error);
        }
      }
    }
  };

  // Remove Item from Watchlist & Backend
  const removeFromWatchlist = async (movieId) => {
    const stringId = String(movieId);
    const updatedList = watchlist.filter((item) => String(item.id) !== stringId);

    setWatchlist(updatedList);
    localStorage.setItem("movie_hub_watchlist", JSON.stringify(updatedList));

    const token = localStorage.getItem("komsify_token");
    if (token) {
      try {
        await removeFromWatchlistAPI(stringId);
      } catch (error) {
        console.error("Backend Remove Error:", error);
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
