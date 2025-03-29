import { useState } from 'react';
import LocationSelector from '../components/LocationSelector';
import SearchBar from '../components/SearchBar';
import AppDownload from '../components/AppDownload';
import PopularCities from '../components/PopularCities';
import PopularCategories from '../components/PopularCategories';
import RestaurantList from '../components/RestaurantList';

const Home = () => {
  const [location, setLocation] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLocationSelected, setIsLocationSelected] = useState(false);

  const handleLocationSelect = (selectedLocation: string) => {
    setLocation(selectedLocation);
    setIsLocationSelected(true);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log(`Searching for ${query} in ${location}`);
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-swiggy-orange py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col space-y-6 max-w-3xl mx-auto">
            {/* Location and Search Inputs */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <LocationSelector onLocationSelect={handleLocationSelect} />
              </div>

              <div className="relative flex-1">
                <SearchBar
                  placeholder="Search for restaurant, item or more"
                  onSearch={handleSearch}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section - Either Restaurants + Categories or "Not there yet" message */}
      {isLocationSelected ? (
        <>
          <RestaurantList />
          <PopularCategories />
          <PopularCities />
        </>
      ) : (
        <section className="py-20 flex flex-col items-center justify-center">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="h-64 relative mb-8">
              <div className="absolute inset-0 bg-swiggy-light rounded-xl">
                <div className="grid grid-cols-3 gap-2 p-6 opacity-30">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div key={i} className="h-8 w-8 bg-white rounded-sm"></div>
                  ))}
                </div>
              </div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                <div className="flex items-end justify-center space-x-8">
                  <div className="h-16 w-16 bg-swiggy-cream rounded-full"></div>
                  <div className="h-20 w-20 bg-swiggy-yellow rounded-full"></div>
                  <div className="h-16 w-16 bg-swiggy-cream rounded-full"></div>
                </div>
              </div>
            </div>

            <h1 className="text-4xl font-bold text-gray-800 mb-4">We're not there yet!</h1>
            <p className="text-xl text-gray-600 mb-4">
              Sorry, our services are currently unavailable at this location.
            </p>
            <p className="text-xl text-gray-600">
              We hope to serve you in the future.
            </p>
          </div>
        </section>
      )}

      {/* App Download Section */}
      <AppDownload />
    </div>
  );
};

export default Home;
