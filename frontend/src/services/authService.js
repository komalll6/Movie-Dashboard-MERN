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