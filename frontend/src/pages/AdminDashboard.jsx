import React, { useEffect, useState } from 'react';
import api from '../services/api';  // Axios instance

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [agents, setAgents] = useState([]);
  const [analytics, setAnalytics] = useState({ ordersPerDay: 0, avgDeliveryTime: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersRes = await api.get('/orders');
        const usersRes = await api.get('/users');
        const agentsRes = await api.get('/agents');
        const analyticsRes = await api.get('/analytics');

        setOrders(ordersRes.data);
        setUsers(usersRes.data);
        setAgents(agentsRes.data);
        setAnalytics(analyticsRes.data);
      } catch (err) {
        console.error('Error fetching admin data:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 bg-[#171717] text-white min-h-screen">
      <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-3 gap-6">
        {/* Analytics Section */}
        <div className="bg-[#444444] p-4 rounded-xl">
          <h2 className="text-2xl font-semibold mb-4">Analytics</h2>
          <p className="text-lg">Orders per Day: {analytics.ordersPerDay}</p>
          <p className="text-lg">Average Delivery Time: {analytics.avgDeliveryTime} mins</p>
        </div>

        {/* Orders Section */}
        <div className="bg-[#444444] p-4 rounded-xl col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Orders</h2>
          <ul>
            {orders.map(order => (
              <li key={order._id} className="mb-3 flex justify-between">
                <div>
                  <p className="text-lg font-semibold">Order ID: {order._id}</p>
                  <p className="text-gray-300">Customer: {order.customerName}</p>
                </div>
                <button className="bg-[#DA0037] px-4 py-2 rounded-xl hover:bg-red-700 transition">
                  View Details
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Users and Agents Section */}
        <div className="bg-[#444444] p-4 rounded-xl col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Users & Agents</h2>
          <h3 className="text-xl font-semibold mb-2">Users</h3>
          <ul>
            {users.map(user => (
              <li key={user._id} className="mb-3">
                <p className="text-lg">{user.name} ({user.role})</p>
              </li>
            ))}
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-2">Agents</h3>
          <ul>
            {agents.map(agent => (
              <li key={agent._id} className="mb-3">
                <p className="text-lg">{agent.name} ({agent.status})</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
