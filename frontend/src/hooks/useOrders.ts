import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

export interface OrderItem {
  product: {
    _id: string;
    name: string;
    price: number;
    category: string;
    imageUrl: string;
  };
  quantity: number;
  price: number;
}

export interface Order {
  _id: string;
  orderItems: OrderItem[];
  shippingAddress: {
    street: string;
    city: string;
    region: string;
    country: string;
  };
  paymentMethod: 'CBE_TRANSFER' | 'TELEBIRR';
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  deliveryDate: string;
  createdAt: string;
  user: {
    name: string;
    email: string;
    company: string;
  };
}

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await api.get<Order[]>('/orders/myorders', user?.token);
      setOrders(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch orders');
      toast.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (orderData: Partial<Order>) => {
    try {
      const { data } = await api.post<Order>('/orders', orderData, user?.token);
      setOrders(prev => [...prev, data]);
      toast.success('Order placed successfully');
      return data;
    } catch (err) {
      toast.error('Failed to place order');
      throw err;
    }
  };

  const updateOrder = async (orderId: string, orderData: Partial<Order>) => {
    try {
      const { data } = await api.put<Order>(`/orders/${orderId}`, orderData, user?.token);
      setOrders(prev => prev.map(order => order._id === orderId ? data : order));
      toast.success('Order updated successfully');
      return data;
    } catch (err) {
      toast.error('Failed to update order');
      throw err;
    }
  };

  const deleteOrder = async (orderId: string) => {
    try {
      await api.delete(`/orders/${orderId}`, user?.token);
      setOrders(prev => prev.filter(order => order._id !== orderId));
      toast.success('Order deleted successfully');
    } catch (err) {
      toast.error('Failed to delete order');
      throw err;
    }
  };

  useEffect(() => {
    if (user?.token) {
      fetchOrders();
    }
  }, [user?.token]);

  return {
    orders,
    loading,
    error,
    createOrder,
    updateOrder,
    deleteOrder,
    refreshOrders: fetchOrders
  };
};