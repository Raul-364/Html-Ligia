import api from './api';

const authService = {
  // Cadastro de usuário
  register: async (userData) => {
    try {
      const response = await api.post('/users/register/', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Login
  login: async (credentials) => {
    try {
      const formData = new URLSearchParams();
      formData.append('username', credentials.username);
      formData.append('password', credentials.password);

      const response = await api.post('/users/login/', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      const { access_token, token_type } = response.data;
      
      // Armazena o token e seu tipo
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('token_type', token_type);
      
      return { access_token, token_type };
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error.response?.data || error.message;
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('token_type');
  },

  // Verificar se está autenticado
  isAuthenticated: () => {
    return !!localStorage.getItem('access_token');
  },

  // Obter usuário atual
  getCurrentUser: () => {
    const access_token = localStorage.getItem('access_token');
    if (!access_token) return null;

    try {
      // Decodifica o token JWT (apenas a parte do payload)
      const base64Url = access_token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Erro ao decodificar token:', error);
      return null;
    }
  }
};

export default authService; 