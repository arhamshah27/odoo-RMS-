import axios from 'axios';

// The base URL should point to your running FastAPI backend
const API_URL = 'http://localhost:8000/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// You can add an interceptor to attach the auth token to requests
// apiClient.interceptors.request.use(config => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export const getProducts = () => {
  return apiClient.get('/products/');
};

export const getProductById = (id) => {
  return apiClient.get(`/products/${id}`);
};

export const createOrder = (orderData) => {
    return apiClient.post('/orders/', orderData);
}

// Export apiClient for use in other modules
export { apiClient };

// Add other API functions for users, orders, payments etc.