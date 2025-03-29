import CityCard from './CityCard';

const PopularCities = () => {
  const cities = [
    {
      name: 'Mumbai',
      imageUrl: 'https://media.istockphoto.com/id/539018660/photo/gateway-of-india-mumbai-maharashtra-monument-landmark.jpg?s=612x612&w=0&k=20&c=NnvSB6-U_ctPF6AsMOGo7rhFXXblZ6yvjV3o9Zy9ss0=',
      link: '/city/mumbai'
    },
    {
      name: 'Delhi',
      imageUrl: 'https://media.istockphoto.com/id/148293752/photo/india-gate-in-new-delhi.jpg?s=612x612&w=0&k=20&c=B98RIpbDXCaBu0OEmN9AzW3QVInw30ZJWzQiKSSpFFc=',
      link: '/city/delhi'
    },
    {
      name: 'Bangalore',
      imageUrl: 'https://media.istockphoto.com/id/172418033/photo/bengaluru-landmark-vidhana-soudha.jpg?s=612x612&w=0&k=20&c=MzKmZrKa10-QNbLEh60jXKYABGsWiACY0NKbjiMLIQ4=',
      link: '/city/bangalore'
    },
    {
      name: 'Hyderabad',
      imageUrl: 'https://media.istockphoto.com/id/1010240018/photo/char-minar.jpg?s=612x612&w=0&k=20&c=kwFv-9xqRl7hPN_8k4_Q5Lmw6_1zIZWs2e8jYtbmQP4=',
      link: '/city/hyderabad'
    },
    {
      name: 'Chennai',
      imageUrl: 'https://media.istockphoto.com/id/1215274990/photo/kapaleeswarar-temple-in-chennai-tamil-nadu-india.jpg?s=612x612&w=0&k=20&c=1Bl1UKP0NaT4R6eUlLRbGQdTXlXFBnANJjdf9kgYaRo=',
      link: '/city/chennai'
    },
    {
      name: 'Kolkata',
      imageUrl: 'https://media.istockphoto.com/id/1218021407/photo/the-howrah-bridge-at-night.jpg?s=612x612&w=0&k=20&c=exxGXqjT7cXE3V9cT9Dp5xQJ9GqxbPGKNEeAVHQ_ZoY=',
      link: '/city/kolkata'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-3">Popular Cities</h2>
        <p className="text-gray-600 mb-8">Find the best restaurants, cafés, and bars in your city</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cities.map((city) => (
            <CityCard
              key={city.name}
              name={city.name}
              imageUrl={city.imageUrl}
              link={city.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCities;
