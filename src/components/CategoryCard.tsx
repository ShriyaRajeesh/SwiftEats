import { Link } from 'react-router-dom';

interface CategoryCardProps {
  name: string;
  imageUrl: string;
  link: string;
}

const CategoryCard = ({ name, imageUrl, link }: CategoryCardProps) => {
  return (
    <Link to={link} className="group">
      <div className="flex flex-col items-center">
        <div className="w-32 h-32 rounded-full overflow-hidden mb-4 shadow-md group-hover:shadow-lg transition-shadow">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <h3 className="text-center font-medium text-gray-800 group-hover:text-swiggy-orange transition-colors">{name}</h3>
      </div>
    </Link>
  );
};

export default CategoryCard;
