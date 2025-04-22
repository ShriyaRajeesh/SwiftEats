import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_BASE}/auth`;

const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

const login = async (credentials) => {
    const response = await axios.post(`${API_URL}/login`, credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      // Store minimal user data in localStorage if needed
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data; // Now contains both token and user
  };

const logout = () => {
  localStorage.removeItem('token');
};

const authService = {
  register,
  login,
  logout,
};

export default authService;