import { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Badge,
  Card,
  Title
} from '@tremor/react';
import { Loader2, Edit2, Trash2, Plus } from 'lucide-react';
import { useOrders } from '../../hooks/useOrders';
import { useProducts } from '../../hooks/useProducts';
import OrderEditModal from '../../components/orders/OrderEditModal.tsx';
import CreateOrderModal from '../../components/orders/CreateOrderModal.tsx';
import { toast } from 'react-toastify';

const statusColors = {
  pending: 'yellow',
  confirmed: 'blue',
  processing: 'orange',
  shipped: 'purple',
  delivered: 'green',
  cancelled: 'red'
};

const Orders = () => {
  const { orders, loading, error, updateOrder, deleteOrder, createOrder } = useOrders();
  const { products } = useProducts();
  const [editingOrder, setEditingOrder] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [deletingOrder, setDeletingOrder] = useState<string | null>(null);

  const handleDelete = async (orderId: string) => {
    if (!window.confirm('Are you sure you want to delete this order?')) {
      return;
    }

    setDeletingOrder(orderId);
    try {
      await deleteOrder(orderId);
    } finally {
      setDeletingOrder(null);
    }
  };

  if (error) {
    toast.error(error);
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="animate-spin text-red-600" size={40} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-600 mt-2">
            Track and manage your orders
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          <Plus size={20} className="mr-2" />
          New Order
        </button>
      </motion.div>

      <Card>
        <Title>Recent Orders</Title>
        <Table className="mt-6">
          <TableHead>
            <TableRow>
              <TableHeaderCell>Order ID</TableHeaderCell>
              <TableHeaderCell>Date</TableHeaderCell>
              <TableHeaderCell>Products</TableHeaderCell>
              <TableHeaderCell>Total</TableHeaderCell>
              <TableHeaderCell>Delivery Date</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order._id.slice(-8)}</TableCell>
                <TableCell>
                  {format(new Date(order.createdAt), 'MMM dd, yyyy')}
                </TableCell>
                <TableCell>
                  <ul className="space-y-1">
                    {order.orderItems.map((item, index) => (
                      <li key={index} className="text-sm">
                        {item.quantity}x {item.product.name}
                      </li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell>
                  ETB {order.totalPrice.toLocaleString()}
                </TableCell>
                <TableCell>
                  {format(new Date(order.deliveryDate), 'MMM dd, yyyy')}
                </TableCell>
                <TableCell>
                  <Badge color={statusColors[order.status]}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingOrder(order._id)}
                      disabled={order.status !== 'pending'}
                      className="p-1 text-blue-600 hover:text-blue-700 disabled:opacity-50"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(order._id)}
                      disabled={deletingOrder === order._id || order.status !== 'pending'}
                      className="p-1 text-red-600 hover:text-red-700 disabled:opacity-50"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {editingOrder && (
        <OrderEditModal
          order={orders.find(o => o._id === editingOrder)!}
          products={products}
          onSubmit={async (data) => {
            await updateOrder(editingOrder, data);
            setEditingOrder(null);
          }}
          onClose={() => setEditingOrder(null)}
        />
      )}

      {showCreateModal && (
        <CreateOrderModal
          products={products}
          onSubmit={async (data) => {
            await createOrder(data);
            setShowCreateModal(false);
          }}
          onClose={() => setShowCreateModal(false)}
        />
      )}
    </div>
  );
};

export default Orders;