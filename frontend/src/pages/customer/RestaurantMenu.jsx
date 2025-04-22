import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';

const RestaurantMenu = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const [restaurantRes, menuRes] = await Promise.all([
          api.get(`/restaurants/${id}`),
          api.get(`/restaurants/${id}/menu`)
        ]);
        setRestaurant(restaurantRes.data);
        setMenu(menuRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurant();
  }, [id]);

  const addToCart = (item) => {
    setCart(prev => {
      const existingItem = prev.find(i => i._id === item._id);
      if (existingItem) {
        return prev.map(i => 
          i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCart(prev => prev.filter(item => item._id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(prev => 
      prev.map(item => 
        item._id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1DCD9F]"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4">
      {/* Menu Section */}
      <div className="md:w-2/3">
        <div className="bg-[#222222] rounded-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-white">{restaurant.name}</h1>
          <p className="text-[#1DCD9F]">{restaurant.cuisine}</p>
          <p className="text-gray-400 mt-2">{restaurant.description}</p>
        </div>

        <h2 className="text-xl font-semibold text-white mb-4">Menu</h2>
        <div className="space-y-4">
          {menu.map(category => (
            <div key={category._id} className="bg-[#222222] rounded-lg p-4">
              <h3 className="text-lg font-semibold text-[#1DCD9F] mb-3">{category.name}</h3>
              <div className="space-y-3">
                {category.items.map(item => (
                  <div key={item._id} className="flex justify-between items-start p-3 bg-[#000000] rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-white">{item.name}</h4>
                      <p className="text-gray-400 text-sm">{item.description}</p>
                      <p className="text-[#1DCD9F] mt-1">${item.price.toFixed(2)}</p>
                    </div>
                    <button
                      onClick={() => addToCart(item)}
                      className="bg-[#1DCD9F] text-white px-3 py-1 rounded hover:bg-[#169976] transition"
                    >
                      Add
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Section */}
      <div className="md:w-1/3">
        <div className="bg-[#222222] rounded-lg p-6 sticky top-4">
          <h2 className="text-xl font-semibold text-white mb-4">Your Order</h2>
          
          {cart.length === 0 ? (
            <p className="text-gray-400">Your cart is empty</p>
          ) : (
            <>
              <div className="space-y-3 mb-4 max-h-96 overflow-y-auto">
                {cart.map(item => (
                  <div key={item._id} className="flex justify-between items-center p-3 bg-[#000000] rounded-lg">
                    <div>
                      <h4 className="font-medium text-white">{item.name}</h4>
                      <p className="text-[#1DCD9F]">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center">
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        className="bg-[#222222] text-white w-6 h-6 flex items-center justify-center rounded"
                      >
                        -
                      </button>
                      <span className="mx-2 text-white">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="bg-[#222222] text-white w-6 h-6 flex items-center justify-center rounded"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="ml-2 text-red-500 hover:text-red-400"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#444444] pt-4">
                <div className="flex justify-between text-white mb-2">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white mb-2">
                  <span>Delivery Fee:</span>
                  <span>$2.99</span>
                </div>
                <div className="flex justify-between text-white font-bold text-lg mt-3">
                  <span>Total:</span>
                  <span>${(subtotal + 2.99).toFixed(2)}</span>
                </div>

                <button className="w-full bg-[#1DCD9F] text-white py-2 px-4 rounded-lg mt-4 hover:bg-[#169976] transition">
                  Proceed to Checkout ({totalItems} items)
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;