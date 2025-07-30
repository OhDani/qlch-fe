import api from './api';
// const api = axios.create({ baseURL: 'http://localhost:3000' });
export const categoryService = {
  getAll: async () => {
    try {
      const { data } = await api.get('/categories');
      console.log('🔍 Categories API response:', data); // Debug
      
      // API trả về { statusCode, message, data: [...] }
      return data.data || data; // Lấy data.data hoặc fallback về data
    } catch (error) {
      console.error('❌ Lỗi get categories:', error.response?.data);
      throw error;
    }
  },

  create: async (payload) => {
    try {
      console.log('🚀 Category payload:', payload); // Debug
      const { data } = await api.post('/categories', payload);
      return data.data || data;
    } catch (error) {
      console.error('❌ Lỗi create category:', error.response?.data);
      throw error;
    }
  },

  update: async (id, payload) => {
    try {
      const { data } = await api.patch(`/categories/${id}`, payload);
      return data.data || data;
    } catch (error) {
      console.error('❌ Lỗi update category:', error.response?.data);
      throw error;
    }
  },

  remove: async (id) => {
    try {
      await api.delete(`/categories/${id}`);
    } catch (error) {
      console.error('❌ Lỗi delete category:', error.response?.data);
      throw error;
    }
  }
};

// Export default để tương thích
export default categoryService;

// Giữ lại named exports cũ để không break code hiện tại
export const getCategories = () => categoryService.getAll();
export const createCategory = (data) => categoryService.create(data);
export const updateCategory = (id, data) => categoryService.update(id, data);
export const deleteCategory = (id) => categoryService.remove(id);