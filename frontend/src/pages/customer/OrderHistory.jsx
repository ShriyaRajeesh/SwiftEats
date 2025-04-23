import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user, token } = useAuth(); // Ensure token is available from context

  useEffect(() => {
    console.log("Token:", token);
    console.log("User:", user);
    if (!user || !token) {
      setError('User not authenticated');
      setLoading(false);
      return;
    }
  
    const fetchOrders = async () => {
      console.log("User ID:", user.userId);
      try {
        const response = await api.get(`/orders/user/${user.userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("API Response:", response.data);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };
  
    fetchOrders();
  }, [user, token]);
  

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-500';
      case 'In Transit':
        return 'bg-blue-500';
      case 'Preparing':
        return 'bg-yellow-500';
      case 'Cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-white mb-6">Order History</h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1DCD9F]"></div>
        </div>
      ) : error ? (
        <div className="bg-red-500 text-white p-4 rounded">{error}</div>
      ) : orders.length === 0 ? (
        <div className="bg-[#222222] rounded-lg p-8 text-center">
          <p className="text-gray-400">You haven't placed any orders yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-[#222222] rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-white">Order #{order.orderNumber}</h3>
                  <p className="text-gray-400">{new Date(order.date).toLocaleString()}</p>
                </div>
                <span className={`${getStatusColor(order.status)} text-white px-3 py-1 rounded-full text-sm`}>
                  {order.status}
                </span>
              </div>

              <div className="border-t border-[#444444] pt-3">
                {order.items.map((item) => (
                  <div key={item._id} className="flex justify-between mb-2">
                    <span className="text-white">{item.quantity} × {item.name}</span>
                    <span className="text-[#1DCD9F]">${item.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#444444] pt-3 mt-3 flex justify-between">
                <span className="text-white font-medium">Total:</span>
                <span className="text-[#1DCD9F] font-bold">${order.total.toFixed(2)}</span>
              </div>

              <div className="mt-3">
                <button className="text-[#1DCD9F] hover:underline mr-4">View Details</button>
                <button className="text-[#1DCD9F] hover:underline">Reorder</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
