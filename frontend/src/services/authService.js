//new- 27-07-26 (new file)

import axios from 'axios';

export const register = async (userData) => {
    try {
        return await axios.post("http://localhost:5000/api/auth/signup", userData);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const login = async (userData) => {
    try {
        return await axios.post("http://localhost:5000/api/auth/signin", userData);
    } catch (error) {
        console.log(error);
        throw error;
    }
}