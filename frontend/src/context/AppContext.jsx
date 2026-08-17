import { createContext, useContext, useState, useEffect } from "react";
import { movieService } from "../services/movieService";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [movies, setMovies] = useState([]); 
  const [searchResults, setSearchResults] = useState([]);
  const [watchlist, setWatchlist] = useState(() => {
    const savedWatchlist = localStorage.getItem("movie_hub_watchlist");
    return savedWatchlist ? JSON.parse(savedWatchlist) : [];
  });
  const [loading, setLoading] = useState(false);
  const [genres, setGenres] = useState([]);

  // Local Storage mein watchlist sync
  useEffect(() => {
    localStorage.setItem("movie_hub_watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  // Safe Genre Fetching logic
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        if (movieService && typeof movieService.getGenres === 'function') {
          const genreList = await movieService.getGenres();
          setGenres(genreList);
        } else {
          console.warn("movieService.getGenres is not defined yet.");
        }
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    fetchGenres();
  }, []);

  // Watchlist Helpers
  const addToWatchlist = (movie) => {
    if (!watchlist.some((item) => item.id === movie.id)) {
      setWatchlist((prev) => [...prev, movie]);
    }
  };

  const removeFromWatchlist = (movieId) => {
    setWatchlist((prev) => prev.filter((item) => item.id !== movieId));
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
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
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
