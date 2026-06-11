import api from './api';

const getAll = async (params = {}) => {
  const response = await api.get('/messages', { params });
  return response.data;
};

const getOne = async (id) => {
  const response = await api.get(`/messages/${id}`);
  return response.data;
};

const create = async (data) => {
  const response = await api.post('/messages', data);
  return response.data;
};

const updateStatus = async (id, status) => {
  const response = await api.patch(`/messages/${id}/status`, { status });
  return response.data;
};

const remove = async (id) => {
  const response = await api.delete(`/messages/${id}`);
  return response.data;
};

const messageService = { getAll, getOne, create, updateStatus, remove };

export default messageService;
