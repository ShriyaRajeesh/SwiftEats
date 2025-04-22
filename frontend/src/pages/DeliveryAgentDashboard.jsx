import React, { useState, useEffect } from "react";
import OrderCard from "../components/OrderCard";
import Map from "../components/Map";
import api from "../services/api";  // Axios instance

const DeliveryAgentDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });
  const [orderLocation, setOrderLocation] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    // Fetch orders assigned to this delivery agent
    const fetchOrders = async () => {
      try {
        const res = await api.get("/orders/assigned"); // Example API to fetch orders
        setOrders(res.data.orders);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    // Fetch live location of the delivery agent
    const fetchLocation = async () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (err) => {
          console.error("Error getting location:", err);
        }
      );
    };

    fetchOrders();
    fetchLocation();
  }, []);

  const updateOrderStatus = async (orderId, status) => {
    try {
      const updatedOrder = await api.put(`/orders/${orderId}/status`, { status });
      setOrders(orders.map(order => order.id === orderId ? { ...order, status: updatedOrder.data.status } : order));
    } catch (err) {
      console.error("Error updating order status:", err);
    }
  };

  return (
    <div className="p-6 bg-[#171717] text-white min-h-screen">
      <h2 className="text-3xl font-bold mb-6">Delivery Agent Dashboard</h2>

      {/* Show live map */}
      {orders.length > 0 && (
        <Map
          currentLocation={currentLocation}
          orderLocation={orders[0].location} // Just showing the location of the first order for simplicity
        />
      )}

      {/* Orders list */}
      <div className="mt-6">
        {orders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            updateOrderStatus={updateOrderStatus}
          />
        ))}
      </div>
    </div>
  );
};

export default DeliveryAgentDashboard;
