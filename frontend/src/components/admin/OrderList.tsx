// import { motion } from 'framer-motion';
import { format } from 'date-fns';
import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
} from '@tremor/react';
import { Calendar } from 'lucide-react';
import { Order } from '../../hooks/useOrders';
import { Select } from '@tremor/react';

interface OrderListProps {
  orders: Order[];
  onUpdateStatus: (orderId: string, status: Order['status']) => void;
  onUpdateDeliveryDate: (orderId: string, date: string) => void;
  onHandleShipment: (orderId: string) => void;
}
type OrderStatus = Order['status'];
const statusColors = {
  pending: 'gray',
  confirmed: 'blue',
  processing: 'orange',
  shipped: 'purple',
  delivered: 'green',
  cancelled: 'red'
};

const statusOptions: { value: OrderStatus; label: string }[] = [
  { value: 'pending', label: 'Pending' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'processing', label: 'Processing' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'cancelled', label: 'Cancelled' },
];


const customStyles = {
  select: {
    padding: '5px',
    borderRadius: '5px',
    // border: '1px solid #ccc',
    backgroundColor: '#f9f9f9', // Dark gray background
    fontSize: '14px', // Smaller font size
    color: '#333', // White text color
    width: '200px', // Smaller width
  },
  option: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    margin: '5px 0',
    cursor: 'pointer',
    backgroundColor: '#f9f9f9',
  },
};



const OrderList = ({
  orders,
  onUpdateStatus,
  onUpdateDeliveryDate,
  onHandleShipment,
}: OrderListProps) => {
  return (
    <Table className="mt-5 border-separate border-spacing-y-2">
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
          <TableRow key={order._id} className="bg-white rounded-lg shadow-sm">
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
            {/* <TableCell>
              <Badge color={statusColors[order.status]}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </Badge>
            </TableCell> */}
             <TableCell className="flex">
             <Select defaultValue={order.status} 
             onValueChange={(value) => onUpdateStatus(order._id, value as OrderStatus)} style={customStyles.select} > 
                {statusOptions.map((option) => 
                  ( 
                  <option 
                  key={option.value} 
                  value={option.value} 
                  style={{ ...customStyles.option, color: statusColors[option.value] }} > 
                  {option.label} </option> ))} 
              </Select>
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
              {order.status === 'processing' && (
                <button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to mark this order as shipped?')) {
                        onHandleShipment(order._id);
                      }
                    }}
                    className="px-3 py-1.5 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2" 
                  >
                    Ship Now
                  </button>
              )}
            </TableCell>
            <TableCell>
              {/* <div className="flex space-x-2">
                {statusOptions.map((option) => (
                  <label key={option.value} className="flex items-center space-x-1 cursor-pointer">
                    <input
                      type="radio"
                      value={option.value}
                      checked={order.status === option.value}
                      onChange={() => onUpdateStatus(order._id, option.value)}
                      className="text-primary-600 border-gray-300 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div> */}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default OrderList;
