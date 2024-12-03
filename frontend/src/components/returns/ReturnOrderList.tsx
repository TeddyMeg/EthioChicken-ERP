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
import { ReturnOrder } from '../../hooks/useReturnOrders';

interface ReturnOrderListProps {
  returns: ReturnOrder[];
  isAdmin?: boolean;
  onUpdateStatus?: (returnId: string, status: ReturnOrder['status']) => void;
  onConfirmReceived?: (returnId: string) => void;
}

const statusColors = {
  pending: 'yellow',
  approved: 'blue',
  rejected: 'red',
  completed: 'green'
};

const ReturnOrderList = ({
  returns,
  isAdmin,
  onUpdateStatus,
  onConfirmReceived
}: ReturnOrderListProps) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Return ID</TableHeaderCell>
          <TableHeaderCell>Date</TableHeaderCell>
          <TableHeaderCell>Items</TableHeaderCell>
          <TableHeaderCell>Reason</TableHeaderCell>
          <TableHeaderCell>Refund Amount</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
          {isAdmin && <TableHeaderCell>Actions</TableHeaderCell>}
        </TableRow>
      </TableHead>
      <TableBody>
        {returns.map((returnOrder) => (
          <motion.tr
            key={returnOrder._id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <TableCell>{returnOrder._id.slice(-8)}</TableCell>
            <TableCell>
              {format(new Date(returnOrder.createdAt), 'MMM dd, yyyy')}
            </TableCell>
            <TableCell>
              <ul className="space-y-1">
                {returnOrder.items.map((item, index) => (
                  <li key={index} className="text-sm">
                    {item.quantity}x {item.product.name}
                  </li>
                ))}
              </ul>
            </TableCell>
            <TableCell>{returnOrder.reason}</TableCell>
            <TableCell>
              ETB {returnOrder.refundAmount.toLocaleString()}
            </TableCell>
            <TableCell>
              <Badge color={statusColors[returnOrder.status]}>
                {returnOrder.status.charAt(0).toUpperCase() + returnOrder.status.slice(1)}
              </Badge>
            </TableCell>
            {isAdmin && (
              <TableCell>
                <div className="space-y-2">
                  <Select
                    value={returnOrder.status}
                    onValueChange={(value) => onUpdateStatus?.(
                      returnOrder._id,
                      value as ReturnOrder['status']
                    )}
                  >
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </Select>
                  
                  {returnOrder.status === 'approved' && !returnOrder.productReceived && (
                    <button
                      onClick={() => onConfirmReceived?.(returnOrder._id)}
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      Confirm Receipt
                    </button>
                  )}
                </div>
              </TableCell>
            )}
          </motion.tr>
        ))}
      </TableBody>
    </Table>
  );
};

export default ReturnOrderList;