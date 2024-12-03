import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext.tsx';

export interface DashboardStats {
  totalRevenue: number;
  totalAgents: number;
  chicksOrdered: number;
  chicksDelivered: number;
  feedsSold: number;
  stockAvailable: number;
  revenueData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
    }[];
  };
  referralStats: {
    name: string;
    value: number;
    color: string;
  }[];
}

export const useDashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const { data } = await api.get<DashboardStats>('/admin/dashboard', user?.token);
      setStats(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.token && user.role === 'admin') {
      fetchDashboardStats();
    }
  }, [user?.token, user?.role]);

  return {
    stats,
    loading,
    error,
    refreshStats: fetchDashboardStats
  };
};