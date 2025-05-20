
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Chat', path: '/chat' },
    { label: 'Destinations', path: '/destinations' },
    { label: 'About', path: '/about' },
    { label: 'FAQs', path: '/faqs' },
    { label: 'Contact', path: '/contact' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-skymark-bg/80 backdrop-blur-md border-b border-skymark-dark/20">
      <div className="container px-4 mx-auto flex justify-between items-center h-16">
        <NavLink to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-skymark to-skymark-light flex items-center justify-center">
            <span className="text-white font-bold">S</span>
          </div>
          <span className="text-xl font-bold text-white">Skymark</span>
        </NavLink>

        {isMobile ? (
          <>
            <Button
              variant="ghost" 
              size="icon"
              onClick={toggleMenu}
              className="text-white"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </Button>

            {isMenuOpen && (
              <div className="fixed inset-0 top-16 z-40 bg-skymark-bg/95 backdrop-blur-sm">
                <div className="flex flex-col space-y-4 p-6 animate-fade-in">
                  {navItems.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={({ isActive }) =>
                        `py-2 px-4 rounded-md transition-colors ${
                          isActive
                            ? 'bg-skymark/20 text-skymark'
                            : 'text-gray-300 hover:bg-skymark/10 hover:text-skymark'
                        }`
                      }
                      onClick={closeMenu}
                    >
                      {item.label}
                    </NavLink>
                  ))}
                  <div className="pt-4 flex flex-col space-y-2">
                    <NavLink to="/login">
                      <Button variant="outline" className="w-full">Login</Button>
                    </NavLink>
                    <NavLink to="/signup">
                      <Button className="w-full">Sign Up</Button>
                    </NavLink>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center space-x-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `py-1 px-3 rounded-md text-sm transition-colors ${
                    isActive
                      ? 'bg-skymark/20 text-skymark'
                      : 'text-gray-300 hover:bg-skymark/10 hover:text-skymark'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <div className="ml-4 flex items-center space-x-2">
              <NavLink to="/login">
                <Button variant="outline" size="sm">Login</Button>
              </NavLink>
              <NavLink to="/signup">
                <Button size="sm">Sign Up</Button>
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
