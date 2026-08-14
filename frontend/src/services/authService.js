//new- 27-07-26 (new file)

// import axios from 'axios';

// const API_URL = "http://localhost:5000/api/auth";

// export const register = async (userData) => {
//   try {
//     return await axios.post(`${API_URL}/signup`, userData);
//   } catch (error) {
//     console.error("Signup error:", error);
//     throw error;
//   }
// };

// export const login = async (userData) => {
//   try {
//     return await axios.post(`${API_URL}/signin`, userData);
//   } catch (error) {
//     console.error("Signin error:", error);
//     throw error;
//   }
// };




// import axios from "axios";

// // Base Axios Instance Configured for Port 5000
// const API = axios.create({
//   baseURL: "http://localhost:5000/api/auth",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Auto-attach JWT Token to requests if logged in
// API.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Register / Signup Function
// export const register = async (userData) => {
//   try {
//     const response = await API.post("/signup", userData);
//     return response;
//   } catch (error) {
//     console.error("Signup Service Error:", error.response?.data || error.message);
//     throw error;
//   }
// };

// // Login / Signin Function
// export const login = async (userData) => {
//   try {
//     const response = await API.post("/signin", userData);
//     return response;
//   } catch (error) {
//     console.error("Signin Service Error:", error.response?.data || error.message);
//     throw error;
//   }
// };

// export default API;


import axios from "axios";

// Base API URL (Fallback to localhost:5000)
const API_URL = import.meta.env?.VITE_API_URL || "http://localhost:5000/api/auth";

// Common Axios Config
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

// 1. Register / Signup Service
export const register = async (userData) => {
  return await axios.post(`${API_URL}/signup`, userData, config);
};

// 2. Login / Signin Service
export const login = async (userData) => {
  return await axios.post(`${API_URL}/signin`, userData, config);
};

// 3. Verify Current Session User (/me)
export const getCurrentUser = async (token) => {
  return await axios.get(`${API_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};