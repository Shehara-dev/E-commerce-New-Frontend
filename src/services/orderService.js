// src/services/orderService.js
import api from './api.js';

export const createOrder = (orderData) => {
  return api.post('/orders', orderData);
};

export const getMyOrders = (page = 1, limit = 10) => {
  return api.get(`/orders/${page}/${limit}`);
};

// --- Admin Only ---

export const getAllOrders = (page = 1, limit = 10) => {
  return api.get(`/orders/${page}/${limit}`);
};

export const updateOrderStatus = (orderId, statusData) => {
  return api.put(`/orders/${orderId}`, statusData);
};