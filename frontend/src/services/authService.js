//new- 27-07-26 (new file)

import axios from 'axios';

const API_URL = "http://localhost:5000/api/auth";

export const register = async (userData) => {
  try {
    return await axios.post(`${API_URL}/signup`, userData);
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};

export const login = async (userData) => {
  try {
    return await axios.post(`${API_URL}/signin`, userData);
  } catch (error) {
    console.error("Signin error:", error);
    throw error;
  }
};
