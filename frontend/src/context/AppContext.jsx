import { createContext, useContext, useState, useEffect } from "react";
import { movieService } from "../services/movieService";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [movies, setMovies] = useState([]); // Trending/Featured movies
  const [searchResults, setSearchResults] = useState([]);
  const [watchlist, setWatchlist] = useState(() => {
    // Watchlist ko local storage se load karenge taaki refresh par delete na ho
    const savedWatchlist = localStorage.getItem("movie_hub_watchlist");
    return savedWatchlist ? JSON.parse(savedWatchlist) : [];
  });
  const [loading, setLoading] = useState(false);
  const [genres, setGenres] = useState([]);

  // Local Storage mein watchlist ko save rakhne ke liye
  useEffect(() => {
    localStorage.setItem("movie_hub_watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  // Genres (Action, Comedy, etc.) load karna
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genreList = await movieService.getGenres();
        setGenres(genreList);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    fetchGenres();
  }, []);

  // Watchlist functions
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