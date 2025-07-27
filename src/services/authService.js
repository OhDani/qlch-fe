import api from './api';

export const authService = {
  login: async ({ username, password }) => {
    const { data } = await api.post('/auth/login', { username, password });
    // API trả về { statusCode, message, data: { access_token } }
    console.log({ username, password });
    return data.data.access_token;
  },
};