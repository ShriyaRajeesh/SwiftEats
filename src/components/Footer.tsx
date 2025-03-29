import { Link } from 'react-router-dom';
import { Linkedin, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#f7f7f7] pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Column 1 - Logo and Copyright */}
          <div>
            <Link to="/" className="flex items-center mb-4">
              <div className="h-10 w-10 bg-[#f95405] rounded-full flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
                  <path d="M17.6 6.31a8.77 8.77 0 0 0-12.6 0 8.88 8.88 0 0 0-2 9.8l5.9 11.4a2.25 2.25 0 0 0 4 0l5.9-11.4a8.88 8.88 0 0 0-2-9.8zm-.7 8.8L12 23l-4.9-7.89a7.27 7.27 0 0 1 1.6-8.29 7.17 7.17 0 0 1 10.2 0 7.27 7.27 0 0 1 1.6 8.29z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <span className="text-[#f95405] text-2xl font-extrabold ml-2">Swiggy</span>
            </Link>
            <p className="text-sm text-gray-500">© 2025 Swiggy Limited</p>
          </div>

          {/* Column 2 - Company */}
          <div>
            <h3 className="font-bold text-gray-700 mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-600 hover:text-[#f95405]">About Us</Link></li>
              <li><Link to="/corporate" className="text-gray-600 hover:text-[#f95405]">Swiggy Corporate</Link></li>
              <li><Link to="/careers" className="text-gray-600 hover:text-[#f95405]">Careers</Link></li>
              <li><Link to="/team" className="text-gray-600 hover:text-[#f95405]">Team</Link></li>
              <li><Link to="/swiggy-one" className="text-gray-600 hover:text-[#f95405]">Swiggy One</Link></li>
              <li><Link to="/instamart" className="text-gray-600 hover:text-[#f95405]">Swiggy Instamart</Link></li>
              <li><Link to="/dineout" className="text-gray-600 hover:text-[#f95405]">Swiggy Dineout</Link></li>
            </ul>
          </div>

          {/* Column 3 - Contact us */}
          <div>
            <h3 className="font-bold text-gray-700 mb-4">Contact us</h3>
            <ul className="space-y-3">
              <li><Link to="/support" className="text-gray-600 hover:text-[#f95405]">Help & Support</Link></li>
              <li><a href="https://partner.swiggy.com/login" className="text-gray-600 hover:text-[#f95405]">Partner With Us</a></li>
              <li><a href="https://ride.swiggy.com" className="text-gray-600 hover:text-[#f95405]">Ride With Us</a></li>
            </ul>
          </div>

          {/* Column 4 - Available in */}
          <div>
            <h3 className="font-bold text-gray-700 mb-4">Available in:</h3>
            <ul className="space-y-3">
              <li><Link to="/city/bangalore" className="text-gray-600 hover:text-[#f95405]">Bangalore</Link></li>
              <li><Link to="/city/gurgaon" className="text-gray-600 hover:text-[#f95405]">Gurgaon</Link></li>
              <li><Link to="/city/hyderabad" className="text-gray-600 hover:text-[#f95405]">Hyderabad</Link></li>
              <li><Link to="/city/delhi" className="text-gray-600 hover:text-[#f95405]">Delhi</Link></li>
              <li><Link to="/city/mumbai" className="text-gray-600 hover:text-[#f95405]">Mumbai</Link></li>
              <li><Link to="/city/pune" className="text-gray-600 hover:text-[#f95405]">Pune</Link></li>
            </ul>
          </div>

          {/* Column 5 - Life at Swiggy */}
          <div>
            <h3 className="font-bold text-gray-700 mb-4">Life at Swiggy</h3>
            <ul className="space-y-3">
              <li><a href="https://blog.swiggy.com/" className="text-gray-600 hover:text-[#f95405]">Explore With Swiggy</a></li>
              <li><a href="https://blog.swiggy.com/category/swiggy-restaurant-awards/" className="text-gray-600 hover:text-[#f95405]">Swiggy News</a></li>
              <li><a href="https://blog.swiggy.com/category/snackables/campaigns/" className="text-gray-600 hover:text-[#f95405]">Snackables</a></li>
            </ul>

            <h3 className="font-bold text-gray-700 mt-6 mb-4">Social Links</h3>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/company/swiggy-in/" className="text-gray-600 hover:text-[#f95405]" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/swiggyindia/" className="text-gray-600 hover:text-[#f95405]" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://www.facebook.com/swiggy.in/" className="text-gray-600 hover:text-[#f95405]" target="_blank" rel="noopener noreferrer">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com/Swiggy" className="text-gray-600 hover:text-[#f95405]" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-between">
            <p className="text-gray-600 mb-4 md:mb-0">For better experience, download the Swiggy app now</p>
            <div className="flex space-x-4">
              <a href="https://itunes.apple.com/in/app/id989540920" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://ext.same-assets.com/2913897597/3124492574.png"
                  alt="Download on the App Store"
                  className="h-10"
                />
              </a>
              <a href="https://play.google.com/store/apps/details?id=in.swiggy.android" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://ext.same-assets.com/2913897597/2021242949.png"
                  alt="Get it on Google Play"
                  className="h-10"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
