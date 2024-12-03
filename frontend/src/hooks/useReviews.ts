import { useState } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

export interface Review {
  _id: string;
  user: {
    name: string;
    company: string;
  };
  product: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export const useReviews = (productId?: string) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProductReviews = async () => {
    try {
      setLoading(true);
      const { data } = await api.get<Review[]>(`/reviews/product/${productId}`);
      setReviews(data);
    } catch (error) {
      toast.error('Failed to fetch reviews');
    } finally {
      setLoading(false);
    }
  };

  const createReview = async (reviewData: { rating: number; comment: string }) => {
    try {
      const { data } = await api.post<Review>(
        '/reviews',
        { ...reviewData, product: productId },
        user?.token
      );
      setReviews(prev => [data, ...prev]);
      toast.success('Review submitted successfully');
    } catch (error) {
      toast.error('Failed to submit review');
      throw error;
    }
  };

  return {
    reviews,
    loading,
    fetchProductReviews,
    createReview
  };
};