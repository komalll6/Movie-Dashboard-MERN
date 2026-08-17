//new- 27-07-26 (new file)

// import { useContext } from "react";
// import { createContext, useEffect, useState } from "react";

// const AuthContext = createContext(); // creating a context

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const getUser = localStorage.getItem("user");
//     if (getUser) {
//       setUser(JSON.parse(getUser)); //set user variable everytime website renders
//     }
//     setLoading(false);
//   }, []);

//   const loginUser = (userData) => {
//     setUser(userData);
//     localStorage.setItem("user", JSON.stringify(userData));
//   };

//   return (
//     <>
//       <AuthContext.Provider value={{ user, loginUser, loading }}>
//         {children}
//       </AuthContext.Provider>
//     </>
//   );
// };

// export const useAuth = () => {
//     const context = useContext(AuthContext);
//     return context;
// }

//new- 06-08-26
// 

import React, { createContext, useContext, useState, useEffect } from "react";
import { movieService } from "../services/movieService";

const AuthContext = createContext();

export const AppProvider = ({ children }) => {
  // User state for persistent login
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("komsify_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("komsify_token") || null;
  });

  const [movies, setMovies] = useState([]); 
  const [searchResults, setSearchResults] = useState([]);
  const [watchlist, setWatchlist] = useState(() => {
    const savedWatchlist = localStorage.getItem("movie_hub_watchlist");
    return savedWatchlist ? JSON.parse(savedWatchlist) : [];
  });
  const [loading, setLoading] = useState(false);
  const [genres, setGenres] = useState([]);

  // Auth methods
  const loginUser = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    localStorage.setItem("komsify_user", JSON.stringify(userData));
    localStorage.setItem("komsify_token", userToken);
  };

  const logoutUser = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("komsify_user");
    localStorage.removeItem("komsify_token");
  };

  // Watchlist persistence
  useEffect(() => {
    localStorage.setItem("movie_hub_watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  // Safe Genre Fetching
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

  const addToWatchlist = (movie) => {
    if (!watchlist.some((item) => item.id === movie.id)) {
      setWatchlist((prev) => [...prev, movie]);
    }
  };

  const removeFromWatchlist = (movieId) => {
    setWatchlist((prev) => prev.filter((item) => item.id !== movieId));
  };

  const value = {
    user,
    token,
    loginUser,
    logoutUser,
    isAuthenticated: !!token,
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
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const AuthProvider = AppProvider;
export default AppProvider;

export const useAuth = () => useContext(AuthContext);
export const useAppContext = () => useContext(AuthContext);