import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AgentDashboard = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname.includes(path);

  return (
    <div className="min-h-screen bg-[#000000] text-white">
      {/* Navigation Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-[#222222] p-4 hidden md:block">
        <div className="flex flex-col h-full">
          <div className="mb-8">
            <h1 className="text-xl font-bold text-[#1DCD9F]">FoodDelivery</h1>
            <p className="text-gray-400 text-sm">Agent Dashboard</p>
            <div className="mt-2 p-2 bg-[#000000] rounded">
              <p className="text-white">Hi, {user?.name}</p>
              <p className="text-[#1DCD9F] text-sm">On Duty</p>
            </div>
          </div>
          
          <nav className="flex-1">
            <ul className="space-y-2">
              <li>
                <Link
                  to="/agent/orders"
                  className={`flex items-center p-3 rounded-lg ${isActive('orders') ? 'bg-[#1DCD9F] text-white' : 'text-gray-300 hover:bg-[#333333]'}`}
                >
                  <span className="mr-3">📦</span>
                  <span>Assigned Orders</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/agent/map"
                  className={`flex items-center p-3 rounded-lg ${isActive('map') ? 'bg-[#1DCD9F] text-white' : 'text-gray-300 hover:bg-[#333333]'}`}
                >
                  <span className="mr-3">🗺️</span>
                  <span>Live Map</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/agent/exchanges"
                  className={`flex items-center p-3 rounded-lg ${isActive('exchanges') ? 'bg-[#1DCD9F] text-white' : 'text-gray-300 hover:bg-[#333333]'}`}
                >
                  <span className="mr-3">🔄</span>
                  <span>Package Exchanges</span>
                </Link>
              </li>
            </ul>
          </nav>

          <div className="mt-auto">
            <button
              onClick={logout}
              className="w-full flex items-center p-3 rounded-lg text-gray-300 hover:bg-[#333333]"
            >
              <span className="mr-3">🚪</span>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden bg-[#222222] p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-[#1DCD9F]">Agent Dashboard</h1>
        <div className="flex items-center space-x-4">
          <span className="text-white">Hi, {user?.name}</span>
          <button
            onClick={logout}
            className="bg-[#1DCD9F] text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#222222] p-2 flex justify-around border-t border-[#444444]">
        <Link
          to="/agent/orders"
          className={`p-3 rounded-full ${isActive('orders') ? 'bg-[#1DCD9F]' : ''}`}
        >
          📦
        </Link>
        <Link
          to="/agent/map"
          className={`p-3 rounded-full ${isActive('map') ? 'bg-[#1DCD9F]' : ''}`}
        >
          🗺️
        </Link>
        <Link
          to="/agent/exchanges"
          className={`p-3 rounded-full ${isActive('exchanges') ? 'bg-[#1DCD9F]' : ''}`}
        >
          🔄
        </Link>
      </div>

      {/* Main Content */}
      <div className="md:ml-64 pb-16 md:pb-0">
        <Outlet />
      </div>
    </div>
  );
};

export default AgentDashboard;