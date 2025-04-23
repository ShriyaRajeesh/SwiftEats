import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const AgentOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('/orders?status=assigned');
        const orders = response.data;

        // Fetch restaurant and customer names
        const enrichedOrders = await Promise.all(orders.map(async (order) => {
          let restaurantName = 'Unknown Restaurant';
          let customerName = 'Unknown Customer';

          try {
            const restaurantRes = await api.get(`/restaurants/${order.restaurantId}`);
            restaurantName = restaurantRes.data.name || restaurantName;
          } catch (err) {
            console.warn(`Could not fetch restaurant: ${order.restaurantId}`);
          }

          try {
            const userRes = await api.get(`/users/${order.userId}`);
            customerName = userRes.data.name || customerName;
          } catch (err) {
            console.warn(`Could not fetch user: ${order.userId}`);
          }

          return {
            ...order,
            restaurantName,
            customerName,
          };
        }));

        setOrders(enrichedOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, status) => {
    try {
      await api.patch(`/orders/${orderId}/status`, { status });
      setOrders(orders.map(order =>
        order._id === orderId ? { ...order, status } : order
      ));
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1DCD9F]"></div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-white mb-6">Assigned Orders</h1>

      {orders.length === 0 ? (
        <div className="bg-[#222222] rounded-lg p-8 text-center">
          <p className="text-gray-400">No orders assigned to you currently</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order._id} className="bg-[#222222] rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-white">Order #{order.orderNumber || order._id.slice(-6)}</h3>
                  <p className="text-gray-400">{order.restaurantName}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  order.status === 'Picked' ? 'bg-blue-500' :
                  order.status === 'In Transit' ? 'bg-yellow-500' :
                  order.status === 'Delivered' ? 'bg-green-500' :
                  'bg-[#1DCD9F]'
                }`}>
                  {order.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-gray-400 text-sm">Customer</p>
                  <p className="text-white">{order.customerName}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Delivery Address</p>
                  <p className="text-white">{order.deliveryAddress || 'No Address Provided'}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Total</p>
                  <p className="text-[#1DCD9F]">${order.total?.toFixed(2) || '0.00'}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => updateOrderStatus(order._id, 'Picked')}
                  className={`px-3 py-1 rounded ${order.status === 'Picked' ? 'bg-blue-600' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                  disabled={order.status === 'Picked'}
                >
                  Picked
                </button>
                <button
                  onClick={() => updateOrderStatus(order._id, 'In Transit')}
                  className={`px-3 py-1 rounded ${order.status === 'In Transit' ? 'bg-yellow-600' : 'bg-yellow-500 hover:bg-yellow-600'} text-white`}
                  disabled={order.status === 'In Transit'}
                >
                  In Transit
                </button>
                <button
                  onClick={() => updateOrderStatus(order._id, 'Delivered')}
                  className={`px-3 py-1 rounded ${order.status === 'Delivered' ? 'bg-green-600' : 'bg-green-500 hover:bg-green-600'} text-white`}
                  disabled={order.status === 'Delivered'}
                >
                  Delivered
                </button>
                <Link
                  to={`/agent/map?order=${order._id}`}
                  className="px-3 py-1 rounded bg-[#1DCD9F] hover:bg-[#169976] text-white"
                >
                  View on Map
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AgentOrders;
