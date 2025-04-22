// src/pages/PlaceOrder.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../services/api';

const PlaceOrder = () => {
  const navigate = useNavigate();
  const { state } = useLocation(); // expects { cart, restaurant }
  const [address, setAddress] = useState('');

  const handlePlaceOrder = async () => {
    try {
      const res = await api.post('/orders', {
        restaurantId: state.restaurant._id,
        items: state.cart,
        address,
      });
      alert('Order placed successfully!');
      navigate('/orders');
    } catch (err) {
      console.error('Error placing order:', err);
      alert('Failed to place order.');
    }
  };

  if (!state?.cart?.length) return <div className="p-6 text-white">Cart is empty.</div>;

  return (
    <div className="p-6 bg-[#171717] min-h-screen text-white">
      <h2 className="text-3xl font-bold mb-4">Place Your Order</h2>

      <ul className="mb-4">
        {state.cart.map((item, idx) => (
          <li key={idx}>
            {item.name} - ₹{item.price}
          </li>
        ))}
      </ul>

      <input
        type="text"
        placeholder="Delivery Address"
        className="w-full p-2 rounded mb-4 text-black"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <button
        className="bg-[#DA0037] px-6 py-2 rounded hover:bg-red-700 transition"
        onClick={handlePlaceOrder}
      >
        Confirm Order
      </button>
    </div>
  );
};

export default PlaceOrder;
