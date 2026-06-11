import api from './api';

export const adminService = {
  getAdmins: async () => {
    const response = await api.get('/admins');
    return response;
  },

  createAdmin: async (data) => {
    const response = await api.post('/admins', data);
    return response;
  },

  updateAdmin: async (id, data) => {
    const response = await api.put(`/admins/${id}`, data);
    return response;
  },

  deleteAdmin: async (id) => {
    const response = await api.delete(`/admins/${id}`);
    return response;
  },
};
