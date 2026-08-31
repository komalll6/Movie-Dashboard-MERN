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
// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api/watchlist",
// });

// // Helper function to dynamically check token
// export const getToken = () => {
//   let token =
//     localStorage.getItem("token") ||
//     localStorage.getItem("user_token") ||
//     localStorage.getItem("authToken");

//   if (!token) {
//     const storedUser = localStorage.getItem("user") || localStorage.getItem("userInfo");
//     if (storedUser) {
//       try {
//         const parsed = JSON.parse(storedUser);
//         token = parsed.token || parsed.jwt;
//       } catch (e) {
//         // Fallback
//       }
//     }
//   }

//   if (token) {
//     token = String(token).replace(/^"|"$/g, "").trim();
//   }

//   return token;
// };

// // Request Interceptor
// API.interceptors.request.use(
//   (req) => {
//     const token = getToken();
//     if (token) {
//       req.headers.Authorization = `Bearer ${token}`;
//     }
//     return req;
//   },
//   (error) => Promise.reject(error)
// );

// export const getWatchlistAPI = async () => {
//   const token = getToken();
//   // Don't even send network request if token is missing
//   if (!token) {
//     return { data: { success: false, data: [] } };
//   }
//   return await API.get("/");
// };

// export const addToWatchlistAPI = async (movieData) => {
//   const token = getToken();
//   if (!token) {
//     throw new Error("User not authenticated. Token missing!");
//   }
//   return await API.post("/add", movieData);
// };

// export const removeFromWatchlistAPI = async (mediaId) => {
//   const token = getToken();
//   if (!token) return;
//   return await API.delete(`/remove/${mediaId}`);
// };


//abhi ka code - 12:46
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/watchlist",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("komsify_token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const getWatchlistAPI = () => API.get("/");
export const addToWatchlistAPI = (movieData) => API.post("/add", movieData);
export const removeFromWatchlistAPI = (mediaId) => API.delete(`/remove/${mediaId}`);