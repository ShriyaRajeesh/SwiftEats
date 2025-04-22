// src/pages/OrderHistory.jsx
import React, { useEffect, useState } from 'react';
import api from '../services/api';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get('/orders/history');
        setOrders(res.data.orders);
      } catch (err) {
        console.error('Failed to load order history:', err);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="p-6 bg-[#171717] min-h-screen text-white">
      <h2 className="text-3xl font-bold mb-6">Order History</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="bg-[#444444] p-4 rounded-xl mb-4">
            <p><strong>Restaurant:</strong> {order.restaurant?.name}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Items:</strong> {order.items.map(i => i.name).join(', ')}</p>
            <p><strong>Address:</strong> {order.address}</p>
            <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderHistory;
