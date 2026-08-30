//NEW - 30-08-26
// import axios from "axios";

// // Base API setup
// const API = axios.create({
//   baseURL: "http://localhost:5000/api/watchlist", // Aapke backend port ke according adapt karein
// });

// // Request interceptor to attach JWT Token automatically
// API.interceptors.request.use((req) => {
//   const token = localStorage.getItem("token") || localStorage.getItem("user_token");
//   if (token) {
//     req.headers.Authorization = `Bearer ${token}`;
//   }
//   return req;
// });

// export const getWatchlistAPI = () => API.get("/");
// export const addToWatchlistAPI = (movieData) => API.post("/add", movieData);
// export const removeFromWatchlistAPI = (mediaId) => API.delete(`/remove/${mediaId}`);


// nya code
import axios from "axios";

// Base API setup
const API = axios.create({
  baseURL: "http://localhost:5000/api/watchlist",
});

// Request interceptor to attach JWT Token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token") || localStorage.getItem("user_token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const getWatchlistAPI = () => API.get("/");
export const addToWatchlistAPI = (movieData) => API.post("/add", movieData);
export const removeFromWatchlistAPI = (mediaId) => API.delete(`/remove/${mediaId}`);