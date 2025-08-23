import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getCurrentUser: () => api.get('/auth/me'),
};

// Menu API
export const menuAPI = {
  getAll: (params) => api.get('/menu', { params }),
  getById: (id) => api.get(`/menu/${id}`),
  create: (menuItem) => api.post('/menu', menuItem),
  update: (id, menuItem) => api.put(`/menu/${id}`, menuItem),
  delete: (id) => api.delete(`/menu/${id}`),
  getCategories: () => api.get('/menu/categories/list'),
};

// Orders API
export const ordersAPI = {
  getAll: (params) => api.get('/orders', { params }),
  getById: (id) => api.get(`/orders/${id}`),
  create: (order) => api.post('/orders', order),
  updateStatus: (id, status) => api.patch(`/orders/${id}/status`, { status }),
  updatePayment: (id, paymentData) => api.patch(`/orders/${id}/payment`, paymentData),
  cancel: (id) => api.delete(`/orders/${id}`),
  getStats: () => api.get('/orders/stats/summary'),
};

// Users API
export const usersAPI = {
  getAll: (params) => api.get('/users', { params }),
  getById: (id) => api.get(`/users/${id}`),
  update: (id, userData) => api.put(`/users/${id}`, userData),
  delete: (id) => api.delete(`/users/${id}`),
  updateStatus: (id, isActive) => api.patch(`/users/${id}/status`, { isActive }),
};

export default api;
