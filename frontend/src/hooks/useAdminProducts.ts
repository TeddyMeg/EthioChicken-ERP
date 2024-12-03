import { useState } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { Product } from './useProducts';

export const useAdminProducts = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const createProduct = async (productData: Partial<Product>) => {
    try {
      setLoading(true);
      const { data } = await api.post<Product>('/products', productData, user?.token);
      toast.success('Product created successfully');
      return data;
    } catch (error) {
      toast.error('Failed to create product');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (id: string, productData: Partial<Product>) => {
    try {
      setLoading(true);
      const { data } = await api.put<Product>(`/products/${id}`, productData, user?.token);
      toast.success('Product updated successfully');
      return data;
    } catch (error) {
      toast.error('Failed to update product');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      setLoading(true);
      await api.delete(`/products/${id}`, user?.token);
      toast.success('Product deleted successfully');
    } catch (error) {
      toast.error('Failed to delete product');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateStock = async (id: string, stock: number) => {
    try {
      setLoading(true);
      const { data } = await api.put<Product>(`/products/${id}/stock`, { stock }, user?.token);
      toast.success('Stock updated successfully');
      return data;
    } catch (error) {
      toast.error('Failed to update stock');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    createProduct,
    updateProduct,
    deleteProduct,
    updateStock,
    loading
  };
};