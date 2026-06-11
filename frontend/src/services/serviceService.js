import api from './api';

const getAll = async (params = {}) => {
  const response = await api.get('/services', { params });
  return response.data;
};

const getOne = async (id) => {
  const response = await api.get(`/services/${id}`);
  return response.data;
};

const create = async (data) => {
  const response = await api.post('/services', data);
  return response.data;
};

const update = async (id, data) => {
  const response = await api.put(`/services/${id}`, data);
  return response.data;
};

const remove = async (id) => {
  const response = await api.delete(`/services/${id}`);
  return response.data;
};

const toggle = async (id) => {
  const response = await api.patch(`/services/${id}/toggle`);
  return response.data;
};

const serviceService = { getAll, getOne, create, update, remove, toggle };

export default serviceService;
