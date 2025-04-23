import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token); // Decode the token to get user info
        setUser(decoded);  // Set user state
        console.log("Decoded User:", decoded); // Check the decoded token
        
        if (decoded.exp * 1000 < Date.now()) {
          logout();
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        logout();  // If there's an issue decoding, log out
      }
    }
  }, [token]);

  const login = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
    const decoded = jwtDecode(token);  // Decode the token
    setUser(decoded);  // Set the decoded user
    console.log("Redirecting based on role:", decoded.role);

    switch(decoded.role) {
      case 'Admin':
        navigate('/admin/dashboard');
        break;
      case 'DeliveryAgent':
        navigate('/agent/dashboard');
        break;
      default:
        navigate('/customer/restaurants');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
