import api from './api';

const getAuthHeader = () => {
  const token = localStorage.getItem('access_token');
  const tokenType = localStorage.getItem('token_type');
  return {
    Authorization: `${tokenType} ${token}`
  };
};

const productService = {
  // Cadastrar um novo produto
  createProduct: async (productData) => {
    try {
      const response = await api.post('/products', productData, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Listar todos os produtos
  getAllProducts: async () => {
    try {
      const response = await api.get('/products', {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Buscar um produto por ID
  getProductById: async (id) => {
    try {
      const response = await api.get(`/products/${id}`, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Atualizar um produto
  updateProduct: async (id, productData) => {
    try {
      const response = await api.put(`/products/${id}`, productData, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Deletar um produto
  deleteProduct: async (id) => {
    try {
      const response = await api.delete(`/products/${id}`, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

export default productService;