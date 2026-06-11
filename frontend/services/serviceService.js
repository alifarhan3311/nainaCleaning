import api from './api';

export const serviceService = {
  getServices: async (params = {}) => {
    const response = await api.get('/services', { params });
    return response;
  },

  getService: async (id) => {
    const response = await api.get(`/services/${id}`);
    return response;
  },

  createService: async (data) => {
    const response = await api.post('/services', data);
    return response;
  },

  updateService: async (id, data) => {
    const response = await api.put(`/services/${id}`, data);
    return response;
  },

  deleteService: async (id) => {
    const response = await api.delete(`/services/${id}`);
    return response;
  },

  toggleService: async (id) => {
    const response = await api.patch(`/services/${id}/toggle`);
    return response;
  },
};
