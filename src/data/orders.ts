// Shared order data and status styling (replace `orders` with your API data)
export type OrderStatus = 'Delivered' | 'Processing' | 'Cancelled';

export interface Order {
  id: number;
  customer: string;
  date: string; // ISO date
  amount: number;
  status: OrderStatus;
}

export const orders: Order[] = [
  { id: 1, customer: 'John Doe', date: '2023-05-01', amount: 120, status: 'Delivered' },
  { id: 2, customer: 'Jane Smith', date: '2023-05-02', amount: 80, status: 'Processing' },
  { id: 3, customer: 'Robert Johnson', date: '2023-05-03', amount: 210, status: 'Delivered' },
  { id: 4, customer: 'Emily Davis', date: '2023-05-04', amount: 65, status: 'Cancelled' },
  { id: 5, customer: 'Michael Brown', date: '2023-05-05', amount: 175, status: 'Delivered' },
];

export const ORDER_STATUSES: OrderStatus[] = ['Delivered', 'Processing', 'Cancelled'];

// Theme palette key for each status
export const statusColor: Record<OrderStatus, 'success' | 'warning' | 'error'> = {
  Delivered: 'success',
  Processing: 'warning',
  Cancelled: 'error',
};