// src/components/MenuItem.jsx
import React from 'react';

const MenuItem = ({ item, onAdd }) => {
  return (
    <div className="bg-[#444444] p-4 rounded-xl flex justify-between items-center shadow-md">
      <div>
        <h4 className="text-xl font-semibold">{item.name}</h4>
        <p className="text-gray-300">₹{item.price}</p>
      </div>
      <button
        className="bg-[#DA0037] px-4 py-2 rounded-xl hover:bg-red-700 transition"
        onClick={() => onAdd(item)}
      >
        Add
      </button>
    </div>
  );
};

export default MenuItem;
