// src/services/productService.js
import api from './api.js';

export const getAllProducts = () => {
  return api.get('/products');
};

export const getProductById = (productId) => {
  return api.get(`/products/${productId}`);
};

export const searchProducts = (query) => {
  return api.get(`/products/search/${query}`);
};

// --- Admin Only ---

export const createProduct = (productData) => {
  return api.post('/products', productData);
};

export const updateProduct = (productId, productData) => {
  return api.put(`/products/${productId}`, productData);
};

export const deleteProduct = (productId) => {
  return api.delete(`/products/${productId}`);
};