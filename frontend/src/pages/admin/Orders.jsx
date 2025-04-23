import { useState, useEffect } from 'react';
import api from '../../services/api';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: '',
    dateFrom: '',
    dateTo: ''
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const params = new URLSearchParams();
        if (filters.status) params.append('status', filters.status);
        if (filters.dateFrom) params.append('dateFrom', filters.dateFrom);
        if (filters.dateTo) params.append('dateTo', filters.dateTo);

        const response = await api.get(`/adminOrders?${params.toString()}`);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-green-500';
      case 'Picked up': return 'bg-yellow-500';
      case 'Exchanged': return 'bg-purple-500';
      case 'Placed': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const calculateTotal = (items = []) =>
    items.reduce((sum, item) => sum + (item.quantity ?? 0) * 10, 0); // assume fixed price for now

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1DCD9F]"></div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-white mb-6">All Orders</h1>

      {/* Filters */}
      <div className="bg-[#222222] rounded-lg p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-gray-400 text-sm mb-1">Status</label>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="w-full p-2 rounded bg-[#000000] border border-[#444444] text-white"
            >
              <option value="">All Statuses</option>
              <option value="Placed">Placed</option>
              <option value="Picked up">Picked up</option>
              <option value="Exchanged">Exchanged</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">From Date</label>
            <input
              type="date"
              name="dateFrom"
              value={filters.dateFrom}
              onChange={handleFilterChange}
              className="w-full p-2 rounded bg-[#000000] border border-[#444444] text-white"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">To Date</label>
            <input
              type="date"
              name="dateTo"
              value={filters.dateTo}
              onChange={handleFilterChange}
              className="w-full p-2 rounded bg-[#000000] border border-[#444444] text-white"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={() => setFilters({ status: '', dateFrom: '', dateTo: '' })}
              className="w-full bg-[#444444] hover:bg-[#555555] text-white py-2 px-4 rounded"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-[#222222] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-[#1DCD9F]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">User ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Restaurant ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Items</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Total (est)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#444444]">
              {orders.map(order => (
                <tr key={order._id} className="hover:bg-[#333333]">
                  <td className="px-6 py-4 text-white">{order._id}</td>
                  <td className="px-6 py-4 text-white">{order.userId}</td>
                  <td className="px-6 py-4 text-white">{order.restaurantId}</td>
                  <td className="px-6 py-4 text-white">
                    {Array.isArray(order.items) && order.items.length > 0
                      ? order.items.map((item, idx) => (
                          <div key={idx}>
                            {item.name} x {item.quantity}
                          </div>
                        ))
                      : <em>No items</em>}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#1DCD9F]">
                    ₹{calculateTotal(order.items).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-gray-400">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
