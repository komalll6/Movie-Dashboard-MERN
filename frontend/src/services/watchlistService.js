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
// import axios from "axios";

// // Base API setup
// const API = axios.create({
//   baseURL: "http://localhost:5000/api/watchlist",
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


//new- 31-08
import axios from "axios";

// Base API setup
const API = axios.create({
  baseURL: "http://localhost:5000/api/watchlist",
});

// Helper function to extract token from all possible LocalStorage keys
const getToken = () => {
  let token =
    localStorage.getItem("token") ||
    localStorage.getItem("user_token") ||
    localStorage.getItem("authToken");

  if (!token) {
    // If stored as an object e.g., localStorage.getItem("user")
    const storedUser = localStorage.getItem("user") || localStorage.getItem("userInfo");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        token = parsed.token || parsed.jwt;
      } catch (e) {
        // Fallback catch
      }
    }
  }
  return token;
};

// Request interceptor to attach JWT Token automatically
API.interceptors.request.use(
  (req) => {
    const token = getToken();
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn("⚠️ No JWT Auth token found in LocalStorage!");
    }
    return req;
  },
  (error) => Promise.reject(error)
);

export const getWatchlistAPI = () => API.get("/");
export const addToWatchlistAPI = (movieData) => API.post("/add", movieData);
export const removeFromWatchlistAPI = (mediaId) => API.delete(`/remove/${mediaId}`);
