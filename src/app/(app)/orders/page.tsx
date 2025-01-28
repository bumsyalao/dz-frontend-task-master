import { Order } from '@/types/app';
import getProductNameById from '@/app/(app)/helpers/getProductNameById';

async function getOrders(): Promise<Order[]> {
  const res = await fetch('http://localhost:3000/api/orders');
  if (!res.ok) {
    throw new Error('Failed to fetch orders');
  }
  const data = await res.json();

  return data.data.map((order: Order) => ({
    id: order.id,
    status: order.status,
    user: order.user,
    cart: {
      tax: order.cart.tax,
      subtotal: order.cart.subtotal,
      total: order.cart.total,
      items: order.cart.items.map((item) => ({
        id: item.id,
        referenceId: item.referenceId,
        type: item.type,
        price: item.price,
        quantity: item.quantity,
      })),
    },
    timestamp: order.timestamp ? new Date(order.timestamp).toLocaleString() : 'No Date Available',
  }));
}

export default async function OrdersPage() {
  let orders: Order[] = [];
  try {
    orders = await getOrders();
  } catch (error) {
    console.error('Error fetching orders:', error);
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      {orders.map((order) => (
        <div key={order.id} className="border p-4 rounded-lg mb-4">
          <h2 className="text-xl font-semibold">Order #{order.id}</h2>
          <p className="text-gray-600">Status: {order.status}</p>
          <p className="text-gray-600">User: {order.user.name} (ID: {order.user.id})</p>
          <p className="text-gray-600">
            Date: {order.timestamp ? new Date(order.timestamp).toLocaleString() : 'No Date Available'}
          </p>
          <p className="text-gray-600">Subtotal: {order.cart.subtotal.currency} {order.cart.subtotal.amount.toFixed(2)}</p>
          <p className="text-gray-600">Tax: {order.cart.tax * 100}%</p>
          <p className="text-gray-600">Total: {order.cart.total.currency} {order.cart.total.amount.toFixed(2)}</p>
          <div className="mt-4">
            {order.cart.items?.map((item) => (
              <div key={item.id} className="border p-2 rounded-lg mb-2">
                <p>Item ID: {item.id}</p>
                <p>Name: {getProductNameById(item.referenceId)}</p>
                <p>Type: {item.type}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: {item.price.currency} {item.price.amount.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
