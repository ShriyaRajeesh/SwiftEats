import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import api from '../../services/api';

// Create custom icon for markers
const createIcon = (type) => {
  return new L.Icon({
    iconUrl: type === 'restaurant' 
      ? 'https://cdn-icons-png.flaticon.com/512/149/149059.png' 
      : 'https://cdn-icons-png.flaticon.com/512/149/149060.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });
};

const AgentMap = () => {
  const [searchParams] = useSearchParams();
  const [orders, setOrders] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  const orderId = searchParams.get('order');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get assigned orders
        const ordersRes = await api.get('/orders?status=assigned');
        setOrders(ordersRes.data);
        
        // Get current location (mock for demo)
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCurrentLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            });
          },
          () => {
            // Default to New York if geolocation fails
            setCurrentLocation({ lat: 40.7128, lng: -74.0060 });
          }
        );
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading || !currentLocation) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1DCD9F]"></div>
      </div>
    );
  }

  // Filter to specific order if orderId is provided
  const displayOrders = orderId 
    ? orders.filter(order => order._id === orderId)
    : orders;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-white mb-6">Live Order Map</h1>
      
      <div className="bg-[#222222] rounded-lg p-4 h-[calc(100vh-180px)]">
        <MapContainer 
          center={[currentLocation.lat, currentLocation.lng]} 
          zoom={13} 
          style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {/* Current location marker */}
          <Marker 
            position={[currentLocation.lat, currentLocation.lng]}
            icon={createIcon('agent')}
          >
            <Popup>Your Location</Popup>
          </Marker>
          
          {/* Restaurant markers */}
          {displayOrders.map(order => (
            <Marker
              key={`rest-${order._id}`}
              position={[order.restaurant.lat, order.restaurant.lng]}
              icon={createIcon('restaurant')}
            >
              <Popup>
                <div className="text-black">
                  <strong>{order.restaurant.name}</strong><br />
                  Order #{order.orderNumber}<br />
                  Status: {order.status}
                </div>
              </Popup>
            </Marker>
          ))}
          
          {/* Delivery location markers */}
          {displayOrders.map(order => (
            <Marker
              key={`deliv-${order._id}`}
              position={[order.deliveryLat, order.deliveryLng]}
              icon={createIcon('delivery')}
            >
              <Popup>
                <div className="text-black">
                  <strong>Delivery for {order.customer.name}</strong><br />
                  {order.deliveryAddress}<br />
                  <a 
                    href={`tel:${order.customer.phone}`}
                    className="text-blue-500 hover:underline"
                  >
                    Call Customer
                  </a>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default AgentMap;