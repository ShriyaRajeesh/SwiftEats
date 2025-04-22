import React from "react";

const OrderCard = ({ order, updateOrderStatus }) => {
  return (
    <div className="bg-[#444444] p-4 rounded-xl mb-4 flex justify-between items-center">
      <div className="text-white">
        <h4 className="text-xl font-bold">{order.restaurantName}</h4>
        <p>Order Number: {order.orderNumber}</p>
        <p>Status: {order.status}</p>
      </div>
      <div className="flex items-center">
        <button
          onClick={() => updateOrderStatus(order.id, "Picked")}
          className="bg-[#DA0037] text-white px-4 py-2 rounded-xl mx-2"
        >
          Picked
        </button>
        <button
          onClick={() => updateOrderStatus(order.id, "Exchanged")}
          className="bg-[#DA0037] text-white px-4 py-2 rounded-xl mx-2"
        >
          Exchanged
        </button>
        <button
          onClick={() => updateOrderStatus(order.id, "Delivered")}
          className="bg-[#DA0037] text-white px-4 py-2 rounded-xl mx-2"
        >
          Delivered
        </button>
      </div>
    </div>
  );
};

export default OrderCard;
