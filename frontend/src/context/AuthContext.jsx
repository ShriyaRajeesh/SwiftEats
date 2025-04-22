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
      const decoded = jwtDecode(token);
      setUser(decoded);
      
      if (decoded.exp * 1000 < Date.now()) {
        logout();
      }
    }
  }, [token]);

  const login = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
    const decoded = jwtDecode(token);
    setUser(decoded);
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