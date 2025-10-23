// src/services/authService.js
import api from './api.js';

export const login = (credentials) => {
  return api.post('/user/login', credentials);
};

export const register = (userData) => {
  return api.post('/user', userData);
};

export const getProfile = () => {
  return api.get('/user');
};