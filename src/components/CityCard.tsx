import { Link } from 'react-router-dom';

interface CityCardProps {
  name: string;
  imageUrl: string;
  link: string;
}

const CityCard = ({ name, imageUrl, link }: CityCardProps) => {
  return (
    <Link to={link} className="block group">
      <div className="relative overflow-hidden rounded-lg h-48 mb-2">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4">
          <h3 className="text-white font-bold text-xl">{name}</h3>
        </div>
      </div>
    </Link>
  );
};

export default CityCard;
