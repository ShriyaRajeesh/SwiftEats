import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Create custom icon for markers
const createLeafletIcon = () => {
  return new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

const OrderTracking = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [driverLocation, setDriverLocation] = useState(null);

  // Mock delivery locations
  const deliveryLocations = [
    { lat: 40.7128, lng: -74.0060, status: 'Preparing', time: '10:00 AM' },
    { lat: 40.7150, lng: -74.0080, status: 'On the way', time: '10:20 AM' },
    { lat: 40.7170, lng: -74.0100, status: 'Nearby', time: '10:40 AM' },
    { lat: 40.7180, lng: -74.0120, status: 'Arriving soon', time: '10:50 AM' },
  ];

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await api.get(`/orders/${id}`);
        setOrder(response.data);
        
        // Simulate driver movement
        let currentIndex = 0;
        const interval = setInterval(() => {
          if (currentIndex < deliveryLocations.length - 1) {
            currentIndex++;
            setDriverLocation(deliveryLocations[currentIndex]);
          } else {
            clearInterval(interval);
          }
        }, 10000);
        
        setDriverLocation(deliveryLocations[0]);
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1DCD9F]"></div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-white mb-6">Track Your Order</h1>
      
      <div className="bg-[#222222] rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-semibold text-white">Order #{order.orderNumber}</h2>
            <p className="text-gray-400">Estimated delivery: 30-45 min</p>
          </div>
          <span className="bg-[#1DCD9F] text-white px-3 py-1 rounded-full">
            {driverLocation?.status || 'Preparing'}
          </span>
        </div>

        <div className="h-64 rounded-lg overflow-hidden mb-6">
          <MapContainer 
            center={[40.7128, -74.0060]} 
            zoom={15} 
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {driverLocation && (
              <Marker 
                position={[driverLocation.lat, driverLocation.lng]}
                icon={createLeafletIcon()}
              >
                <Popup>Your food is on the way!</Popup>
              </Marker>
            )}
          </MapContainer>
        </div>

        {/* Rest of your component remains the same */}
        {/* ... */}
      </div>
    </div>
  );
};

export default OrderTracking;