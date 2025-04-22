import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await api.get('/restaurants');
        setRestaurants(response.data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, []);

  const filteredRestaurants = restaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-white mb-6">Restaurants</h1>
      
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search restaurants or cuisines..."
          className="w-full p-3 rounded bg-[#222222] text-white border border-[#444444] focus:outline-none focus:ring-2 focus:ring-[#1DCD9F]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1DCD9F]"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map(restaurant => (
            <Link 
              to={`/customer/restaurants/${restaurant._id}`} 
              key={restaurant._id}
              className="bg-[#222222] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="h-48 bg-[#000000] overflow-hidden">
                <img 
                  src={restaurant.image || 'https://via.placeholder.com/400x300'} 
                  alt={restaurant.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-white">{restaurant.name}</h3>
                <p className="text-[#1DCD9F]">{restaurant.cuisine}</p>
                <div className="flex items-center mt-2">
                  <span className="text-yellow-400">★ {restaurant.rating || '4.5'}</span>
                  <span className="text-gray-400 ml-2">({restaurant.reviews || '100'}+)</span>
                  <span className="text-gray-400 ml-auto">• {restaurant.deliveryTime || '30-45'} min</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Restaurants;