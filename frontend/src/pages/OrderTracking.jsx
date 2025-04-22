// src/pages/OrderTracking.jsx
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import L from 'leaflet';
import api from '../services/api';
import 'leaflet/dist/leaflet.css';

// Custom icon
const deliveryIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

const OrderTracking = ({ orderId }) => {
  const [order, setOrder] = useState(null);
  const [agentLocation, setAgentLocation] = useState(null);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    const fetchOrderStatus = async () => {
      try {
        const res = await api.get(`/orders/${orderId}/tracking`);
        setOrder(res.data.order);
        setAgentLocation(res.data.agentLocation);
      } catch (err) {
        console.error('Error fetching order tracking:', err);
      }
    };

    fetchOrderStatus();

    // Refresh location every 5 seconds
    const id = setInterval(fetchOrderStatus, 5000);
    setIntervalId(id);

    return () => clearInterval(id);
  }, [orderId]);

  if (!order || !agentLocation) return <div className="p-4 text-white">Loading map...</div>;

  return (
    <div className="h-screen bg-[#171717] text-white">
      <h2 className="text-2xl font-bold p-4">Tracking Order #{order._id}</h2>
      <MapContainer center={agentLocation} zoom={15} style={{ height: '80vh', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={agentLocation} icon={deliveryIcon}>
        </Marker>

        <Marker position={order.destination} icon={L.icon({ iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', iconSize: [30, 30] })}>
        </Marker>

        <Polyline positions={[agentLocation, order.destination]} color="red" />
      </MapContainer>
    </div>
  );
};

export default OrderTracking;
