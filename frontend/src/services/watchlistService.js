import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/watchlist",
});

// Interceptor to attach correct Bearer token dynamically
API.interceptors.request.use(
  (config) => {
    let token =
      localStorage.getItem("komsify_token") ||
      localStorage.getItem("token") ||
      localStorage.getItem("authToken");

    if (token && token !== "undefined" && token !== "null") {
      // 1. Remove quotes if JSON.stringified
      try {
        const parsed = JSON.parse(token);
        if (typeof parsed === "string") token = parsed;
      } catch (e) {
        // Already a normal string
      }

      // Clean outer quotes and spaces
      token = token.replace(/^"(.*)"$/, "$1").trim();

      // Ensure single 'Bearer ' prefix
      if (token.startsWith("Bearer ")) {
        config.headers.Authorization = token;
      } else {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("🔒 Unauthorized response received from backend.");
    }
    return Promise.reject(error);
  }
);

export const getWatchlistAPI = () => API.get("/");
export const addToWatchlistAPI = (movieData) => API.post("/add", movieData);
export const removeFromWatchlistAPI = (mediaId) =>
  API.delete(`/remove/${mediaId}`);