import { useState } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { ReturnOrder } from './useReturnOrders';

export const useAdminReturns = () => {
  const { user } = useAuth();
  const [returns, setReturns] = useState<ReturnOrder[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAllReturns = async () => {
    try {
      setLoading(true);
      const { data } = await api.get<ReturnOrder[]>('/returns', user?.token);
      setReturns(data);
    } catch (error) {
      toast.error('Failed to fetch return orders');
    } finally {
      setLoading(false);
    }
  };

  const updateReturnStatus = async (returnId: string, status: ReturnOrder['status']) => {
    try {
      const { data } = await api.put<ReturnOrder>(
        `/returns/${returnId}/status`,
        { status },
        user?.token
      );
      setReturns(prev => prev.map(ret => 
        ret._id === returnId ? data : ret
      ));
      toast.success('Return status updated successfully');
    } catch (error) {
      toast.error('Failed to update return status');
      throw error;
    }
  };

  const confirmProductReceived = async (returnId: string) => {
    try {
      const { data } = await api.put<ReturnOrder>(
        `/returns/${returnId}/received`,
        {},
        user?.token
      );
      setReturns(prev => prev.map(ret => 
        ret._id === returnId ? data : ret
      ));
      toast.success('Product receipt confirmed');
    } catch (error) {
      toast.error('Failed to confirm product receipt');
      throw error;
    }
  };

  return {
    returns,
    loading,
    fetchAllReturns,
    updateReturnStatus,
    confirmProductReceived
  };
};