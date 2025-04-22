import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import BrowseRestaurants from './pages/BrowseRestaurants';
import RestaurantMenu from './pages/RestaurantMenu';
import PlaceOrder from './pages/PlaceOrder';
import OrderHistory from './pages/OrderHistory';
import OrderTracking from './pages/OrderTracking';
import DeliveryAgentDashboard from './pages/DeliveryAgentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        login(token);
        const decoded = jwtDecode(token);
        // Handle navigation after login
        if (decoded.role === "Admin") navigate("/admin/dashboard");
        else if (decoded.role === "Agent") navigate("/agent/dashboard");
      } catch (err) {
        console.error("Invalid token", err);
        localStorage.removeItem('token');
      }
    }
  }, [login, navigate]);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<BrowseRestaurants />} />
      <Route path="/restaurant/:id" element={<RestaurantMenu />} />
      <Route path="/place-order" element={<PlaceOrder />} />
      <Route path="/orders" element={<OrderHistory />} />
      <Route path="/order/:orderId/track" element={<OrderTracking />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Routes */}
      <Route
        path="/agent/dashboard"
        element={
          <ProtectedRoute allowedRoles={['Agent', 'Admin']}>
            <DeliveryAgentDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={['Admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;