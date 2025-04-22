import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Home from './pages/Home';
import Unauthorized from './pages/Unauthorized';

// Customer Components
import CustomerDashboard from './pages/customer/Dashboard';
import Restaurants from './pages/customer/Restaurants';
import RestaurantMenu from './pages/customer/RestaurantMenu';
import OrderHistory from './pages/customer/OrderHistory';
import OrderTracking from './pages/customer/OrderTracking';

// Admin Components
import AdminDashboard from './pages/admin/Dashboard';
import AnalyticsDashboard from './pages/admin/Analytics';
import AdminOrders from './pages/admin/Orders';
import AdminUsers from './pages/admin/Users';
import AdminAgents from './pages/admin/Agents';

// Delivery Agent Components
import AgentDashboard from './pages/agent/Dashboard';
import AgentOrders from './pages/agent/Orders';
import AgentMap from './pages/agent/Map';
import AgentExchanges from './pages/agent/Exchanges';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Customer Routes */}
          <Route element={<ProtectedRoute allowedRoles={['Customer']} />}>
            <Route path="/customer" element={<CustomerDashboard />}>
              <Route path="restaurants" element={<Restaurants />} />
              <Route path="restaurants/:id" element={<RestaurantMenu />} />
              <Route path="orders" element={<OrderHistory />} />
              <Route path="orders/:id" element={<OrderTracking />} />
              <Route path="favorites" element={<div className="p-4">Favorites Page</div>} />
              <Route index element={<Restaurants />} />
            </Route>
          </Route>

         {/* Delivery Agent Routes */}
          <Route element={<ProtectedRoute allowedRoles={['DeliveryAgent']} />}>
            <Route path="/agent" element={<AgentDashboard />}>
              <Route path="dashboard" element={<AgentOrders />} /> {/* Add this line */}
              <Route path="orders" element={<AgentOrders />} />
              <Route path="map" element={<AgentMap />} />
              <Route path="exchanges" element={<AgentExchanges />} />
              <Route index element={<AgentOrders />} /> {/* Default route */}
            </Route>
          </Route>

          // Add to your existing routes
          {/* Admin Routes - Updated Structure */}
          <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
            <Route path="/admin" element={<AdminDashboard />}>
              <Route path="dashboard" element={<AnalyticsDashboard />} />
              <Route path="analytics" element={<AnalyticsDashboard />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="agents" element={<AdminAgents />} />
              <Route index element={<AnalyticsDashboard />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;