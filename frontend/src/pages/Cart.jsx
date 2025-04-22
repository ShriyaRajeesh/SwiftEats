// src/pages/Cart.jsx
import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const Cart = ({ cart }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const placeOrder = async () => {
    setLoading(true);
    try {
      await api.post('/orders', { items: cart });
      alert('Order placed!');
      navigate('/orders');
    } catch (err) {
      console.error('Error placing order:', err);
    }
    setLoading(false);
  };

  return (
    <div className="p-6 bg-[#171717] text-white min-h-screen">
      <h2 className="text-3xl font-bold mb-6">Your Cart</h2>
      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          <ul className="space-y-4 mb-6">
            {cart.map((item, idx) => (
              <li key={idx} className="bg-[#444444] p-4 rounded-xl">
                {item.name} - ₹{item.price}
              </li>
            ))}
          </ul>
          <h3 className="text-xl mb-4">Total: ₹{total}</h3>
          <button
            className="bg-[#DA0037] px-6 py-2 rounded-xl hover:bg-red-700 transition"
            onClick={placeOrder}
            disabled={loading}
          >
            {loading ? 'Placing Order...' : 'Place Order'}
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
