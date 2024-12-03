import { useState } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

export interface ReturnOrder {
  _id: string;
  order: string;
  reason: string;
  items: {
    product: {
      _id: string;
      name: string;
    };
    quantity: number;
  }[];
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  deliveryMethod: 'company_pickup' | 'agent_delivery';
  refundStatus: 'pending' | 'processing' | 'completed';
  refundAmount: number;
  createdAt: string;
  productReceived?: boolean;
}

export const useReturnOrders = () => {
  const { user } = useAuth();
  const [returns, setReturns] = useState<ReturnOrder[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMyReturns = async () => {
    try {
      setLoading(true);
      const { data } = await api.get<ReturnOrder[]>('/returns/myreturns', user?.token);
      setReturns(data);
    } catch (error) {
      toast.error('Failed to fetch return orders');
    } finally {
      setLoading(false);
    }
  };

  const createReturnOrder = async (returnData: {
    orderId: string;
    reason: string;
    items: { product: string; quantity: number }[];
    deliveryMethod: 'company_pickup' | 'agent_delivery';
  }) => {
    try {
      const { data } = await api.post<ReturnOrder>(
        '/returns',
        returnData,
        user?.token
      );
      setReturns(prev => [data, ...prev]);
      toast.success('Return request submitted successfully');
    } catch (error) {
      toast.error('Failed to submit return request');
      throw error;
    }
  };

  return {
    returns,
    loading,
    fetchMyReturns,
    createReturnOrder
  };
};