import { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  placeholder: string;
  onSearch: (query: string) => void;
}

const SearchBar = ({ placeholder, onSearch }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center bg-white rounded-md overflow-hidden shadow-md">
      <input
        type="text"
        placeholder={placeholder}
        className="p-4 w-full outline-none"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        className="p-4 text-gray-500 hover:text-swiggy-orange transition-colors"
        onClick={handleSearch}
      >
        <Search className="h-5 w-5" />
      </button>
    </div>
  );
};

export default SearchBar;
