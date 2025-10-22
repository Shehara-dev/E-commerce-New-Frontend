// src/services/orderService.js
import api from './api';

const orderService = {
    createOrder: async (orderData) => {
        const response = await api.post('/orders', orderData);
        return response.data;
    },
    
    getMyOrders: async (page = 1, limit = 10) => {
        const response = await api.get(`/orders/${page}/${limit}`);
        return response.data;
    },

    // Admin-only functions
    getAllOrders: async (page = 1, limit = 10) => {
        const response = await api.get(`/orders/${page}/${limit}`);
        return response.data;
    },
    
    updateOrder: async (orderId, status, notes) => {
        const response = await api.put(`/orders/${orderId}`, { status, notes });
        return response.data;
    }
};

export default orderService;