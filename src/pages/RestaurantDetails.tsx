import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Clock, ArrowLeft, Heart, Share, Search } from 'lucide-react';

// Sample restaurant data (same as in RestaurantList.tsx)
const sampleRestaurants = [
  {
    id: "123456",
    name: "Biryani Paradise",
    image: "https://media.istockphoto.com/id/1345624336/photo/chicken-biryani-with-yogurt-dip-popular-indian-pakistani-non-vegetarian-food.jpg?s=612x612&w=0&k=20&c=XZHbXD0mQoXLivN15SjOd1qdFQjcpZm_aTLbdVuYXJo=",
    cuisines: ["Biryani", "North Indian", "Mughlai"],
    rating: 4.2,
    deliveryTime: 35,
    priceForTwo: 40000,
    discount: "50% OFF up to ₹100",
    promoted: true,
    address: "123 Food Street, Mumbai, Maharashtra",
    offers: [
      "50% OFF up to ₹100",
      "FREE DELIVERY on orders above ₹199"
    ],
    menuItems: [
      { id: 1, name: "Chicken Biryani", price: 25000, description: "Fragrant basmati rice cooked with tender chicken pieces and aromatic spices", veg: false, bestseller: true, image: "https://media.istockphoto.com/id/1345624336/photo/chicken-biryani-with-yogurt-dip-popular-indian-pakistani-non-vegetarian-food.jpg?s=612x612&w=0&k=20&c=XZHbXD0mQoXLivN15SjOd1qdFQjcpZm_aTLbdVuYXJo=" },
      { id: 2, name: "Mutton Biryani", price: 32000, description: "Slow-cooked mutton pieces with basmati rice and secret blend of spices", veg: false, bestseller: false, image: "https://media.istockphoto.com/id/1345624336/photo/chicken-biryani-with-yogurt-dip-popular-indian-pakistani-non-vegetarian-food.jpg?s=612x612&w=0&k=20&c=XZHbXD0mQoXLivN15SjOd1qdFQjcpZm_aTLbdVuYXJo=" },
      { id: 3, name: "Veg Biryani", price: 22000, description: "Mixed vegetables cooked with basmati rice and aromatic spices", veg: true, bestseller: false, image: "https://media.istockphoto.com/id/1345624336/photo/chicken-biryani-with-yogurt-dip-popular-indian-pakistani-non-vegetarian-food.jpg?s=612x612&w=0&k=20&c=XZHbXD0mQoXLivN15SjOd1qdFQjcpZm_aTLbdVuYXJo=" },
      { id: 4, name: "Chicken 65", price: 24000, description: "Spicy, deep-fried chicken dish marinated with red chilis", veg: false, bestseller: true, image: "https://media.istockphoto.com/id/1345624336/photo/chicken-biryani-with-yogurt-dip-popular-indian-pakistani-non-vegetarian-food.jpg?s=612x612&w=0&k=20&c=XZHbXD0mQoXLivN15SjOd1qdFQjcpZm_aTLbdVuYXJo=" },
      { id: 5, name: "Butter Naan", price: 6000, description: "Soft and fluffy Indian bread brushed with butter", veg: true, bestseller: false, image: "https://media.istockphoto.com/id/1345624336/photo/chicken-biryani-with-yogurt-dip-popular-indian-pakistani-non-vegetarian-food.jpg?s=612x612&w=0&k=20&c=XZHbXD0mQoXLivN15SjOd1qdFQjcpZm_aTLbdVuYXJo=" }
    ]
  },
  // Add more restaurants if needed...
];

const RestaurantDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [restaurant, setRestaurant] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState<Record<number, number>>({});

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      const foundRestaurant = sampleRestaurants.find(r => r.id === id);
      setRestaurant(foundRestaurant || null);
      setLoading(false);
    }, 500);
  }, [id]);

  const addToCart = (itemId: number) => {
    setCartItems(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
  };

  const removeFromCart = (itemId: number) => {
    setCartItems(prev => {
      const updatedCart = { ...prev };
      if (updatedCart[itemId] > 1) {
        updatedCart[itemId] -= 1;
      } else {
        delete updatedCart[itemId];
      }
      return updatedCart;
    });
  };

  const getCartCount = () => {
    return Object.values(cartItems).reduce((sum, count) => sum + count, 0);
  };

  const getCartTotal = () => {
    if (!restaurant) return 0;

    return Object.entries(cartItems).reduce((total, [itemId, count]) => {
      const item = restaurant.menuItems.find((i: any) => i.id === parseInt(itemId));
      return total + (item ? item.price * count : 0);
    }, 0);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 flex justify-center">
        <div className="animate-pulse flex flex-col w-full max-w-4xl">
          <div className="h-64 bg-gray-200 rounded-lg mb-6"></div>
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="h-32 bg-gray-200 rounded mb-4"></div>
          <div className="h-32 bg-gray-200 rounded mb-4"></div>
          <div className="h-32 bg-gray-200 rounded mb-4"></div>
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Restaurant not found</h2>
        <p className="mb-6">The restaurant you're looking for doesn't exist or has been removed.</p>
        <Link to="/" className="text-swiggy-orange hover:underline">Go back to home</Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-swiggy-orange mb-6">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to restaurants
        </Link>

        {/* Restaurant Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 mb-6 md:mb-0">
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="w-full h-52 object-cover rounded-lg"
              />
            </div>

            <div className="md:w-2/3 md:pl-6 flex flex-col justify-between">
              <div>
                <h1 className="text-2xl font-bold mb-2">{restaurant.name}</h1>
                <p className="text-gray-600 mb-2">{restaurant.cuisines.join(', ')}</p>
                <p className="text-gray-600 mb-4">{restaurant.address}</p>

                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center bg-green-600 text-white px-2 py-1 rounded">
                    <Star className="h-4 w-4 fill-white mr-1" strokeWidth={0} />
                    <span>{restaurant.rating}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{restaurant.deliveryTime} min</span>
                  </div>
                  <div>
                    <span>₹{restaurant.priceForTwo / 100} for two</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button className="text-gray-600 hover:text-swiggy-orange">
                  <Heart className="h-5 w-5" />
                </button>
                <button className="text-gray-600 hover:text-swiggy-orange">
                  <Share className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Offers Section */}
        {restaurant.offers && restaurant.offers.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-lg font-bold mb-4">Offers</h2>
            <div className="flex flex-wrap gap-4">
              {restaurant.offers.map((offer: string, index: number) => (
                <div key={index} className="border border-swiggy-orange text-swiggy-orange px-4 py-2 rounded-md">
                  {offer}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Menu Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold">Menu</h2>
            <div className="relative w-64">
              <input
                type="text"
                placeholder="Search for dishes..."
                className="w-full py-2 px-4 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-swiggy-orange"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
            </div>
          </div>

          <div className="space-y-6">
            {restaurant.menuItems.map((item: any) => (
              <div key={item.id} className="border-b border-gray-100 pb-6 last:border-b-0 last:pb-0">
                <div className="flex flex-col md:flex-row items-start">
                  <div className="flex-1">
                    <div className="flex items-center">
                      {item.veg ? (
                        <div className="w-4 h-4 border border-green-600 mr-2 flex items-center justify-center">
                          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        </div>
                      ) : (
                        <div className="w-4 h-4 border border-red-600 mr-2 flex items-center justify-center">
                          <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        </div>
                      )}
                      <h3 className="font-medium">{item.name}</h3>
                      {item.bestseller && (
                        <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded">Bestseller</span>
                      )}
                    </div>

                    <p className="text-gray-700 mt-1">₹{item.price / 100}</p>
                    <p className="text-gray-500 text-sm mt-2">{item.description}</p>
                  </div>

                  <div className="relative mt-4 md:mt-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-28 h-28 object-cover rounded-lg"
                    />
                    <div className="absolute bottom-2 right-2">
                      {cartItems[item.id] ? (
                        <div className="flex items-center bg-white border border-gray-300 rounded-md overflow-hidden">
                          <button
                            className="px-2 py-1 text-swiggy-orange hover:bg-gray-100"
                            onClick={() => removeFromCart(item.id)}
                          >
                            -
                          </button>
                          <span className="px-2">{cartItems[item.id]}</span>
                          <button
                            className="px-2 py-1 text-swiggy-orange hover:bg-gray-100"
                            onClick={() => addToCart(item.id)}
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          className="bg-white text-swiggy-orange border border-gray-300 px-4 py-1 rounded-md shadow-sm hover:bg-gray-50"
                          onClick={() => addToCart(item.id)}
                        >
                          ADD
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Button (Fixed at bottom) */}
        {getCartCount() > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
            <div className="container mx-auto">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-bold">{getCartCount()} item{getCartCount() !== 1 ? 's' : ''}</span>
                  <span className="mx-2">|</span>
                  <span>₹{getCartTotal() / 100}</span>
                </div>
                <Link
                  to="/checkout"
                  className="bg-swiggy-orange text-white px-6 py-3 rounded-md hover:bg-opacity-90"
                >
                  View Cart
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantDetails;
