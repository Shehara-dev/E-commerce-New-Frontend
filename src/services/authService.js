// src/services/authService.js
import api from './api';

const authService = {
    login: async (email, password) => {
        try {
            const response = await api.post('/user/login', { email, password });
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
            }
            return response.data;
        } catch (error) {
            throw error.response.data || { message: "Login failed" };
        }
    },

    register: async (name, email, password) => {
        try {
            const response = await api.post('/user', { name, email, password });
            return response.data;
        } catch (error) {
            throw error.response.data || { message: "Registration failed" };
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }
};

export default authService;