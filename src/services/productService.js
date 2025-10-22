// src/services/productService.js
import api from './api';

const productService = {
    getProducts: async () => {
        const response = await api.get('/products');
        return response.data;
    },
    
    getProductDetail: async (productId) => {
        const response = await api.get(`/products/${productId}`);
        return response.data;
    },
    
    searchProducts: async (query) => {
        const response = await api.get(`/products/search/${query}`);
        return response.data;
    },

    // Admin-only functions
    createProduct: async (productData) => {
        const response = await api.post('/products', productData);
        return response.data;
    },
    updateProduct: async (productId, productData) => {
        const response = await api.put(`/products/${productId}`, productData);
        return response.data;
    },
    deleteProduct: async (productId) => {
        const response = await api.delete(`/products/${productId}`);
        return response.data;
    }
};

export default productService;