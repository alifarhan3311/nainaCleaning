import api from './api';

const getServices = async (params = {}) => {
  const response = await api.get('/services', { params });
  return response.data;
};

const getOne = async (id) => {
  const response = await api.get(`/services/${id}`);
  return response.data;
};

const createService = async (data) => {
  const response = await api.post('/services', data);
  return response.data;
};

const updateService = async (id, data) => {
  const response = await api.put(`/services/${id}`, data);
  return response.data;
};

const deleteService = async (id) => {
  const response = await api.delete(`/services/${id}`);
  return response.data;
};

const toggleService = async (id) => {
  const response = await api.patch(`/services/${id}/toggle`);
  return response.data;
};

const serviceService = { getServices, getOne, createService, updateService, deleteService, toggleService };

export default serviceService;
