import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../services/auth';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer',
    phone: '',
    address: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      await authService.register(formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#000000]">
      <div className="bg-[#222222] p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-white text-center">Create Account</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-[#000000] border border-[#444444] text-white focus:outline-none focus:ring-2 focus:ring-[#1DCD9F]"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-[#000000] border border-[#444444] text-white focus:outline-none focus:ring-2 focus:ring-[#1DCD9F]"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-[#000000] border border-[#444444] text-white focus:outline-none focus:ring-2 focus:ring-[#1DCD9F]"
              required
            />
          </div>
          
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-white mb-1">
              Register as
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-[#000000] border border-[#444444] text-white focus:outline-none focus:ring-2 focus:ring-[#1DCD9F]"
            >
              <option value="customer">Customer</option>
              <option value="agent">Delivery Agent</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-white mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-[#000000] border border-[#444444] text-white focus:outline-none focus:ring-2 focus:ring-[#1DCD9F]"
              required
            />
          </div>
          
          {formData.role === 'agent' && (
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-white mb-1">
                Address
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-[#000000] border border-[#444444] text-white focus:outline-none focus:ring-2 focus:ring-[#1DCD9F]"
                required
              />
            </div>
          )}
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#1DCD9F] text-white py-2 px-4 rounded hover:bg-[#169976] transition duration-200 disabled:opacity-50 mt-4"
          >
            {isLoading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <p className="text-white">
            Already have an account?{' '}
            <Link to="/login" className="text-[#1DCD9F] hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;