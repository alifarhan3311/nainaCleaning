import api from './api';

const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

const verify = async () => {
  const response = await api.post('/auth/verify');
  return response.data;
};

const logout = async () => {
  const response = await api.post('/auth/logout');
  return response.data;
};

const forgotPassword = async (email) => {
  const response = await api.post('/auth/forgot-password', { email });
  return response.data;
};

const resetPassword = async (token, newPassword) => {
  const response = await api.post('/auth/reset-password', { token, newPassword });
  return response.data;
};

const changePassword = async (currentPassword, newPassword) => {
  const response = await api.post('/auth/change-password', { currentPassword, newPassword });
  return response.data;
};

const authService = { login, register, verify, logout, forgotPassword, resetPassword, changePassword };

export default authService;
