// src/components/RestaurantCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const RestaurantCard = ({ restaurant }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-[#444444] p-4 rounded-2xl shadow-md hover:shadow-lg cursor-pointer transition-transform transform hover:scale-105"
      onClick={() => navigate(`/restaurant/${restaurant._id}`)}
    >
      <img
        src={restaurant.imageUrl || '/placeholder.jpg'} // fallback image
        alt={restaurant.name}
        className="w-full h-40 object-cover rounded-xl"
      />
      <h3 className="text-xl font-semibold mt-3">{restaurant.name}</h3>
      <p className="text-sm text-gray-300">{restaurant.cuisine}</p>
      <p className="text-sm text-[#DA0037] mt-1">⭐ {restaurant.rating}</p>
    </div>
  );
};

export default RestaurantCard;
