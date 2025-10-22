// Base API configuration
const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to get auth token
export const getAuthToken = () => {
    return localStorage.getItem('token');
};

// Helper function to get auth headers
export const getAuthHeaders = () => {
    const token = getAuthToken();
    return {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
    };
};

// Generic API request function
export const apiRequest = async (endpoint, method = 'GET', body = null) => {
    const config = {
        method,
        headers: getAuthHeaders(),
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
        }

        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

export default API_BASE_URL;