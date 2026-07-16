import axios from "axios";

// TMDB base URLs for API queries and image assets
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

// Get token from Vite environment variables (.env file)
const TMDB_TOKEN = import.meta.env.VITE_TMDB_API_KEY || "";

const api = axios.create({
  baseURL: TMDB_BASE_URL,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TMDB_TOKEN}`,
  },
});

// Helper functions to generate beautiful high-res image paths
export const getPosterUrl = (path, size = "w500") => 
  path ? `${IMAGE_BASE_URL}/${size}${path}` : "https://via.placeholder.com/500x750?text=No+Poster";

export const getBackdropUrl = (path, size = "original") => 
  path ? `${IMAGE_BASE_URL}/${size}${path}` : "https://via.placeholder.com/1920x1080?text=No+Backdrop";

export default api;