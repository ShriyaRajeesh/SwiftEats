import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-[#f95405] py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center">
          <Link to="/" className="mr-8">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#f95405]" fill="currentColor">
                  <path d="M17.6 6.31a8.77 8.77 0 0 0-12.6 0 8.88 8.88 0 0 0-2 9.8l5.9 11.4a2.25 2.25 0 0 0 4 0l5.9-11.4a8.88 8.88 0 0 0-2-9.8zm-.7 8.8L12 23l-4.9-7.89a7.27 7.27 0 0 1 1.6-8.29 7.17 7.17 0 0 1 10.2 0 7.27 7.27 0 0 1 1.6 8.29z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <span className="text-white text-2xl font-extrabold ml-2">Swiggy</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center">
            <Link to="/corporate" className="text-white mr-6 hover:underline">Swiggy Corporate</Link>
            <a href="https://partner.swiggy.com/login" target="_blank" rel="noopener noreferrer" className="text-white mr-6 hover:underline">Partner with us</a>
          </nav>
        </div>

        <div className="flex items-center">
          <Link to="/app" className="hidden md:flex items-center text-white bg-transparent border border-white rounded-md px-4 py-2 mr-4 hover:bg-white hover:text-[#f95405] transition-colors">
            Get the App <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link to="/login" className="text-white bg-black px-6 py-2 rounded-md hover:bg-gray-800 transition-colors">Sign in</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
