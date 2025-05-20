
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-skymark-bg/90 border-t border-skymark-dark/20 py-8">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-skymark to-skymark-light flex items-center justify-center">
                <span className="text-white font-bold">S</span>
              </div>
              <span className="text-xl font-bold text-white">Skymark</span>
            </div>
            <p className="text-sm text-gray-400">
              Your AI-powered guide to studying abroad. Get answers to all your questions about education opportunities worldwide.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <NavLink to="/" className="text-gray-400 hover:text-skymark text-sm">Home</NavLink>
              </li>
              <li>
                <NavLink to="/chat" className="text-gray-400 hover:text-skymark text-sm">Chat with Skymark</NavLink>
              </li>
              <li>
                <NavLink to="/about" className="text-gray-400 hover:text-skymark text-sm">About Us</NavLink>
              </li>
              <li>
                <NavLink to="/faqs" className="text-gray-400 hover:text-skymark text-sm">FAQs</NavLink>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-4">Popular Destinations</h4>
            <ul className="space-y-2">
              <li>
                <NavLink to="/destinations?country=usa" className="text-gray-400 hover:text-skymark text-sm">USA</NavLink>
              </li>
              <li>
                <NavLink to="/destinations?country=uk" className="text-gray-400 hover:text-skymark text-sm">United Kingdom</NavLink>
              </li>
              <li>
                <NavLink to="/destinations?country=australia" className="text-gray-400 hover:text-skymark text-sm">Australia</NavLink>
              </li>
              <li>
                <NavLink to="/destinations?country=canada" className="text-gray-400 hover:text-skymark text-sm">Canada</NavLink>
              </li>
              <li>
                <NavLink to="/destinations" className="text-skymark hover:underline text-sm">View All</NavLink>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="text-gray-400 text-sm">
                Email: info@skymark.ai
              </li>
              <li className="text-gray-400 text-sm">
                Hours: 24/7 AI assistance
              </li>
              <li>
                <NavLink to="/contact" className="text-skymark hover:underline text-sm">Get in touch</NavLink>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Skymark. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-skymark text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-skymark text-sm">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
