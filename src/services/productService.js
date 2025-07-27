import api from './api';

export const productService = {
  getAll: async () => {
    try {
      const { data } = await api.get('/products');
      return data.data;
    } catch (error) {
      console.error('Lỗi lấy tất cả sản phẩm:', error);
      throw error;
    }
  },

  create: async (payload) => {
    try {
      const { data } = await api.post('/products', payload);
      return data.data;
    } catch (error) {
      console.error('Lỗi tạo sản phẩm:', error);
      throw error;
    }
  },

  update: async (id, payload) => {
    try {
      const { data } = await api.put(`/products/${id}`, payload);
      return data.data;
    } catch (error) {
      console.error('Lỗi cập nhật sản phẩm:', error);
      throw error;
    }
  },

  remove: async (id) => {
    try {
      await api.delete(`/products/${id}`);
      return { success: true, message: 'Xóa sản phẩm thành công' };
    } catch (error) {
      console.error('Lỗi xóa sản phẩm:', error);
      return { success: false, message: 'Lỗi xóa sản phẩm' };
    }
  },
};