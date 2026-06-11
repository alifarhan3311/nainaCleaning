import api from './api';

export const authService = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response;
  },

  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response;
  },

  verifyToken: async () => {
    const response = await api.post('/auth/verify');
    return response;
  },

  logout: async () => {
    const response = await api.post('/auth/logout');
    return response;
  },
};
