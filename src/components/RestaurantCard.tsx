import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

interface RestaurantCardProps {
  id: string;
  name: string;
  image: string;
  cuisines: string[];
  rating: number;
  deliveryTime: number;
  priceForTwo: number;
  discount?: string;
  promoted?: boolean;
}

const RestaurantCard = ({
  id,
  name,
  image,
  cuisines,
  rating,
  deliveryTime,
  priceForTwo,
  discount,
  promoted
}: RestaurantCardProps) => {
  return (
    <Link to={`/restaurants/${id}`} className="block group">
      <div className="relative">
        {promoted && (
          <span className="absolute top-3 left-3 bg-black bg-opacity-70 text-white text-xs py-1 px-2 rounded z-10">
            PROMOTED
          </span>
        )}

        <div className="relative rounded-xl overflow-hidden h-48 mb-2">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {discount && (
            <div className="absolute bottom-0 left-0 right-0 bg-swiggy-orange text-white py-2 px-3 font-medium">
              {discount}
            </div>
          )}
        </div>

        <div className="p-2">
          <h3 className="font-bold text-lg text-gray-800 truncate group-hover:text-swiggy-orange transition-colors">{name}</h3>

          <div className="flex items-center mb-1">
            <div className="flex items-center bg-green-600 text-white px-1 py-0.5 rounded text-sm mr-2">
              <Star className="h-3 w-3 fill-white mr-0.5" strokeWidth={0} />
              <span>{rating}</span>
            </div>
            <div className="text-gray-500 text-sm flex items-center space-x-1">
              <span>{deliveryTime} min</span>
              <span>•</span>
              <span>₹{priceForTwo / 100} for two</span>
            </div>
          </div>

          <p className="text-gray-500 text-sm truncate">
            {cuisines.join(", ")}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
