import api from './api';

export const messageService = {
  getMessages: async (params = {}) => {
    const response = await api.get('/messages', { params });
    return response;
  },

  getMessage: async (id) => {
    const response = await api.get(`/messages/${id}`);
    return response;
  },

  sendMessage: async (data) => {
    const response = await api.post('/messages', data);
    return response;
  },

  updateMessageStatus: async (id, status) => {
    const response = await api.patch(`/messages/${id}/status`, { status });
    return response;
  },

  deleteMessage: async (id) => {
    const response = await api.delete(`/messages/${id}`);
    return response;
  },
};
