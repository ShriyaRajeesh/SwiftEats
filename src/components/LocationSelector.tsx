import { useState } from 'react';
import { MapPin, ChevronDown } from 'lucide-react';

interface LocationSelectorProps {
  onLocationSelect: (location: string) => void;
}

const LocationSelector = ({ onLocationSelect }: LocationSelectorProps) => {
  const [location, setLocation] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [popularCities] = useState([
    'Mumbai', 'Delhi', 'Bangalore', 'Kolkata', 'Chennai',
    'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Surat'
  ]);

  const handleLocationSelect = (city: string) => {
    setLocation(city);
    onLocationSelect(city);
    setIsModalOpen(false);
  };

  return (
    <div className="relative">
      <div
        className="flex items-center bg-white rounded-md overflow-hidden shadow-md cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="flex items-center p-4 text-gray-500">
          <MapPin className="h-5 w-5 text-swiggy-orange" />
        </div>
        <input
          type="text"
          placeholder="Enter your delivery location"
          className="p-4 w-full outline-none cursor-pointer"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onClick={() => setIsModalOpen(true)}
          readOnly
        />
        <button className="p-4 text-gray-500">
          <ChevronDown className="h-5 w-5" />
        </button>
      </div>

      {/* Location Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-lg">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Enter your delivery location</h2>

              <div className="relative mb-6">
                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                  <div className="flex items-center p-3 text-gray-500">
                    <MapPin className="h-5 w-5 text-swiggy-orange" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search for area, street name..."
                    className="p-3 w-full outline-none"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-500 mb-3">POPULAR CITIES</h3>
                <div className="flex flex-wrap gap-2">
                  {popularCities.map((city) => (
                    <button
                      key={city}
                      className="px-3 py-1 border border-gray-300 rounded-full text-sm hover:bg-gray-100"
                      onClick={() => handleLocationSelect(city)}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  className="px-6 py-2 bg-gray-200 rounded-md mr-2"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-6 py-2 bg-swiggy-orange text-white rounded-md"
                  onClick={() => {
                    onLocationSelect(location);
                    setIsModalOpen(false);
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;
