import api from './api';

export const productService = {
  getAll: async () => {
    const { data } = await api.get('/products');
    // API trả về { statusCode, message, data: [...] }
    return data.data;
  },
  create: async (payload) => {
    const { data } = await api.post('/products', payload);
    return data.data; 
  },
  update: async (id, payload) => {
    const { data } = await api.put(`/products/${id}`, payload);
    return data.data; 
  },

  remove: async (id) => {
    await api.delete(`/products/${id}`);
  },
};