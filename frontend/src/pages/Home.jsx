import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-[#000000] text-white">
      <nav className="bg-[#222222] p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-[#1DCD9F]">
            SWIFTEATS
          </Link>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-white">Hello, {user.name}</span>
                <button
                  onClick={logout}
                  className="bg-[#1DCD9F] text-white px-4 py-2 rounded hover:bg-[#169976] transition duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white hover:text-[#1DCD9F] transition duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-[#1DCD9F] text-white px-4 py-2 rounded hover:bg-[#169976] transition duration-200"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
      
      <main className="container mx-auto p-4">
        <div className="text-center py-20">
          <h1 className="text-5xl font-bold mb-6">Delicious Food Delivered to Your Doorstep</h1>
          <p className="text-xl mb-8">Order from your favorite restaurants with just a few clicks</p>
          
          {!user && (
            <Link
              to="/signup"
              className="bg-[#1DCD9F] text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-[#169976] transition duration-200"
            >
              Get Started
            </Link>
          )}
          {user && (
            <Link
              to={user.role === 'customer' ? '/customer/restaurants' : 
                  user.role === 'agent' ? '/agent/dashboard' : '/admin/dashboard'}
              className="bg-[#1DCD9F] text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-[#169976] transition duration-200"
            >
              Go to Dashboard
            </Link>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;