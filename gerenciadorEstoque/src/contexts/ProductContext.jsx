import React, { createContext, useState, useContext } from 'react';
import productService from '../services/productService';

const ProductContext = createContext();

// Definindo o hook useProduct antes do Provider
const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getAllProducts();
      console.log('Fetched products:', data);
      setProducts(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (productData) => {
    try {
      setLoading(true);
      const newProduct = await productService.createProduct(productData);
      setProducts(prev => [...prev, newProduct]);
      setError(null);
      return newProduct;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (id, productData) => {
    try {
      setLoading(true);
      const updatedProduct = await productService.updateProduct(id, productData);
      setProducts(prev => prev.map(product => 
        product.id === id ? updatedProduct : product
      ));
      setError(null);
      return updatedProduct;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    try {
      setLoading(true);
      await productService.deleteProduct(id);
      setProducts(prev => prev.filter(product => product.id !== id));
      setError(null);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProductContext.Provider value={{
      products,
      loading,
      error,
      fetchProducts,
      createProduct,
      updateProduct,
      deleteProduct
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export { useProduct }; 