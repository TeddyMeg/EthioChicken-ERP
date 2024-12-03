import { useState, useEffect } from 'react';
import { api } from '../services/api';

export interface Product {
  _id: string;
  name: string;
  category: 'chicks' | 'feeds';
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  specifications: Map<string, string>;
  minimumOrder: number;
  isAvailable: boolean;
}

export const useProducts = (category?: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const endpoint = category ? `/products?category=${category}` : '/products';
      const { data } = await api.get<Product[]>(endpoint);
      setProducts(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [category]);

  return {
    products,
    loading,
    error,
    refreshProducts: fetchProducts
  };
};