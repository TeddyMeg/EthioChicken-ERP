import { useState } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { Order } from './useOrders';

export const useAdminOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAllOrders = async () => {
    try {
      setLoading(true);
      const { data } = await api.get<Order[]>('/orders', user?.token);
      setOrders(data);
    } catch (error) {
      toast.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, status: Order['status']) => {
    try {
      const { data } = await api.put<Order>(
        `/orders/${orderId}/status`,
        { status },
        user?.token
      );
      setOrders(prev => prev.map(order => 
        order._id === orderId ? data : order
      ));
      toast.success('Order status updated successfully');
    } catch (error) {
      toast.error('Failed to update order status');
      throw error;
    }
  };

  const updateDeliveryDate = async (orderId: string, deliveryDate: string) => {
    try {
      const { data } = await api.put<Order>(
        `/orders/${orderId}/delivery`,
        { deliveryDate },
        user?.token
      );
      setOrders(prev => prev.map(order => 
        order._id === orderId ? data : order
      ));
      toast.success('Delivery date updated successfully');
    } catch (error) {
      toast.error('Failed to update delivery date');
      throw error;
    }
  };

  const handleShipment = async (orderId: string) => {
    try {
      const { data } = await api.put<Order>(
        `/orders/${orderId}/shipment`,
        {}, // No data needed for shipment, just triggering the action
        user?.token
      );
      setOrders(prev => prev.map(order =>
        order._id === orderId ? data : order
      ));
      toast.success('Order marked as shipped successfully');
    } catch (error) {
      toast.error('Failed to mark order as shipped');
      throw error;
    }
  };

  return {
    orders,
    loading,
    fetchAllOrders,
    updateOrderStatus,
    updateDeliveryDate,
    handleShipment,
  };
};