import axios from 'axios';
import { API_URL, TOKEN_KEY } from '../utils/constants';

const api = axios.create({
  baseURL: 'http://localhost:5001/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle token expiry
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      (error.response.data?.error === 'Token expired' ||
        error.response.data?.error === 'Token is invalid' ||
        error.response.data?.error === 'No token provided, authorization denied')
    ) {
      // Clear auth data
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem('sparkle_user');

      // Redirect to login if not already there
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
