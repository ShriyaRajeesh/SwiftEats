// src/pages/RestaurantMenu.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import api from '../services/api';
import MenuItem from '../components/MenuItem';

const RestaurantMenu = () => {
  const { id } = useParams(); // restaurant ID
  const [menu, setMenu] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await api.get(`/restaurants/${id}`);
        setRestaurant(res.data.restaurant);
        setMenu(res.data.menu);
      } catch (err) {
        console.error('Error fetching menu:', err);
      }
    };
    fetchMenu();
  }, [id]);

  const addToCart = (item) => {
    setCart(prev => [...prev, item]);
  };

  return (
    <div className="p-6 bg-[#171717] text-white min-h-screen">
      <h2 className="text-3xl font-bold mb-6">{restaurant?.name} Menu</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menu.length > 0 ? (
          menu.map(item => (
            <MenuItem key={item._id} item={item} onAdd={addToCart} />
          ))
        ) : (
          <p className="text-gray-400">No menu items available.</p>
        )}
      </div>
      {cart.length > 0 && (
  <div className="fixed bottom-4 right-4">
    <button
      onClick={() => navigate('/place-order', { state: { cart, restaurant } })}
      className="bg-[#DA0037] text-white px-6 py-3 rounded-xl hover:bg-red-700 transition"
    >
      Checkout ({cart.length})
    </button>
  </div>
)}
    </div>
  );
};

export default RestaurantMenu;
