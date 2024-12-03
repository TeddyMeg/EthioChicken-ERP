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
  Select,
  SelectItem,
} from '@tremor/react';
import { Calendar } from 'lucide-react';
import { Order } from '../../hooks/useOrders';

interface OrderListProps {
  orders: Order[];
  onUpdateStatus: (orderId: string, status: Order['status']) => void;
  onUpdateDeliveryDate: (orderId: string, date: string) => void;
}

const statusColors = {
  pending: 'yellow',
  confirmed: 'blue',
  processing: 'orange',
  shipped: 'purple',
  delivered: 'green',
  cancelled: 'red'
};

const OrderList = ({ orders, onUpdateStatus, onUpdateDeliveryDate }: OrderListProps) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Order ID</TableHeaderCell>
          <TableHeaderCell>Date</TableHeaderCell>
          <TableHeaderCell>Customer</TableHeaderCell>
          <TableHeaderCell>Products</TableHeaderCell>
          <TableHeaderCell>Total</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
          <TableHeaderCell>Delivery Date</TableHeaderCell>
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
              <div>
                <p className="font-medium">{order.user.name}</p>
                <p className="text-sm text-gray-500">{order.user.company}</p>
              </div>
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
              <Badge color={statusColors[order.status]}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex items-center space-x-2">
                <span>{format(new Date(order.deliveryDate), 'MMM dd, yyyy')}</span>
                <button
                  onClick={() => {
                    const date = prompt('Enter new delivery date (YYYY-MM-DD)');
                    if (date) {
                      onUpdateDeliveryDate(order._id, date);
                    }
                  }}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <Calendar size={16} className="text-gray-500" />
                </button>
              </div>
            </TableCell>
            <TableCell>
              <Select
                value={order.status}
                onValueChange={(value) => onUpdateStatus(order._id, value as Order['status'])}
              >
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </Select>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default OrderList;