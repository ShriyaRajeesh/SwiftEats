import { useState, useEffect } from 'react';
import RestaurantCard from './RestaurantCard';
import { Filter } from 'lucide-react';

// Sample restaurant data
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
    promoted: true
  },
  {
    id: "234567",
    name: "Pizza Hut",
    image: "https://media.istockphoto.com/id/938742222/photo/cheesy-pepperoni-pizza.jpg?s=612x612&w=0&k=20&c=D1z4xPCs-qQIZyUqRcHrnsJSJy_YbUD9udOrXpilNpI=",
    cuisines: ["Pizza", "Fast Food", "Italian"],
    rating: 3.8,
    deliveryTime: 25,
    priceForTwo: 35000,
    discount: "Free Garlic Bread on orders above ₹499"
  },
  {
    id: "345678",
    name: "The Chinese Box",
    image: "https://media.istockphoto.com/id/1175634961/photo/chinese-food-blank-background.jpg?s=612x612&w=0&k=20&c=NuDYCZAQgRu3CP3i5iHQEssjLWDiRgYqMwMflLAGqTE=",
    cuisines: ["Chinese", "Asian", "Thai"],
    rating: 4.5,
    deliveryTime: 40,
    priceForTwo: 45000,
    promoted: true
  },
  {
    id: "456789",
    name: "Dosa Corner",
    image: "https://media.istockphoto.com/id/1024585168/photo/masala-dosa-south-indian-dish.jpg?s=612x612&w=0&k=20&c=plvPfQrpbgEF0pQmrHlRiCC6hUeQkB9sYLHKo1gj1HQ=",
    cuisines: ["South Indian", "Dosa", "Idli"],
    rating: 4.7,
    deliveryTime: 20,
    priceForTwo: 25000,
    discount: "Buy 1 Get 1 Free on Dosas"
  },
  {
    id: "567890",
    name: "Burger King",
    image: "https://media.istockphoto.com/id/1206323282/photo/juicy-hamburger-on-white-background.jpg?s=612x612&w=0&k=20&c=K0DxyiChLwewXcCy8aLjjOqkc8QXPgQMAW-vwRCzqG4=",
    cuisines: ["Burger", "Fast Food", "American"],
    rating: 4.1,
    deliveryTime: 15,
    priceForTwo: 30000,
    discount: "20% OFF on all orders"
  },
  {
    id: "678901",
    name: "Sweet Cravings",
    image: "https://media.istockphoto.com/id/1269987457/photo/homemade-chocolate-brownies-cake-sliced-on-a-white-plate.jpg?s=612x612&w=0&k=20&c=dVnl_JJ6U8Qk_TijKMbPBbj2WpzKf3IcAYUYI7DqWLM=",
    cuisines: ["Desserts", "Ice Cream", "Bakery"],
    rating: 4.9,
    deliveryTime: 30,
    priceForTwo: 20000,
    promoted: true
  },
  {
    id: "789012",
    name: "Health Bowl",
    image: "https://media.istockphoto.com/id/1165399909/photo/delicious-meal-in-a-bowl-on-a-kitchen-counter.jpg?s=612x612&w=0&k=20&c=0Z9-1OWYpTNSpFuMkR7bqKJJ83WmIf2piz-F12Bfxg4=",
    cuisines: ["Healthy", "Salads", "Continental"],
    rating: 4.3,
    deliveryTime: 25,
    priceForTwo: 40000,
    discount: "30% OFF on your first order"
  },
  {
    id: "890123",
    name: "Smoothie King",
    image: "https://media.istockphoto.com/id/1225783065/photo/strawberry-smoothie-in-a-glass-jar-with-a-straw.jpg?s=612x612&w=0&k=20&c=WcS98Vh6LNIGDJ5z_jVTmO4VhJXzvpEGz_VjqJQGMCE=",
    cuisines: ["Beverages", "Juices", "Smoothies"],
    rating: 4.0,
    deliveryTime: 20,
    priceForTwo: 15000
  }
];

const sortOptions = [
  { label: "Popularity", value: "popularity" },
  { label: "Rating: High to Low", value: "rating" },
  { label: "Delivery Time", value: "deliveryTime" },
  { label: "Cost: Low to High", value: "costAsc" },
  { label: "Cost: High to Low", value: "costDesc" }
];

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState(sampleRestaurants);
  const [sortBy, setSortBy] = useState("popularity");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const sortedRestaurants = [...sampleRestaurants];

    switch (sortBy) {
      case "rating":
        sortedRestaurants.sort((a, b) => b.rating - a.rating);
        break;
      case "deliveryTime":
        sortedRestaurants.sort((a, b) => a.deliveryTime - b.deliveryTime);
        break;
      case "costAsc":
        sortedRestaurants.sort((a, b) => a.priceForTwo - b.priceForTwo);
        break;
      case "costDesc":
        sortedRestaurants.sort((a, b) => b.priceForTwo - a.priceForTwo);
        break;
      default:
        // Popularity - default order
        break;
    }

    setRestaurants(sortedRestaurants);
  }, [sortBy]);

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Restaurants Near You</h2>

          <div className="relative">
            <button
              className="flex items-center space-x-1 text-gray-700 hover:text-swiggy-orange"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter className="h-4 w-4" />
              <span>Sort By</span>
            </button>

            {isFilterOpen && (
              <div className="absolute top-full right-0 mt-2 bg-white shadow-lg rounded-md z-20 w-64">
                <ul className="py-2">
                  {sortOptions.map((option) => (
                    <li key={option.value}>
                      <button
                        className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${sortBy === option.value ? 'text-swiggy-orange font-medium' : 'text-gray-700'}`}
                        onClick={() => {
                          setSortBy(option.value);
                          setIsFilterOpen(false);
                        }}
                      >
                        {option.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              id={restaurant.id}
              name={restaurant.name}
              image={restaurant.image}
              cuisines={restaurant.cuisines}
              rating={restaurant.rating}
              deliveryTime={restaurant.deliveryTime}
              priceForTwo={restaurant.priceForTwo}
              discount={restaurant.discount}
              promoted={restaurant.promoted}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RestaurantList;
