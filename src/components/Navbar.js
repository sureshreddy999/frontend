// src/components/Navbar.js
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, signOut } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(); // ✅ Sign out from context
    navigate('/signin');
  };

  const baseLinks = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
  ];

  const signedOutLinks = [
    { name: 'Sign In', path: '/signin' },
    { name: 'Sign Up', path: '/signup' },
  ];

  const signedInLinks = [
    { name: 'Generate Diet Plan', path: '/current-diet-plan' },
    { name: 'Plan History', path: '/diet-plan-history' },
    { name: 'Profile', path: '/user-details' }, 
    { name: 'Sign Out', action: handleSignOut },
  ];

  const renderLink = (link) =>
    link.action ? (
      <button
        key={link.name}
        onClick={link.action}
        className="text-red-600 hover:text-red-800 font-semibold"
      >
        {link.name}
      </button>
    ) : (
      <Link
        key={link.name}
        to={link.path}
        className="text-purple-600 hover:text-purple-800 font-medium"
      >
        {link.name}
      </Link>
    );

  return (
    <nav className="bg-white shadow fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-purple-600">FitAI</Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {baseLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-gray-700 hover:text-purple-600 font-medium"
            >
              {link.name}
            </Link>
          ))}
          {(isAuthenticated ? signedInLinks : signedOutLinks).map(renderLink)}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-700 focus:outline-none"
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-4 space-y-4">
          {baseLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-700 hover:text-purple-600 font-medium"
            >
              {link.name}
            </Link>
          ))}
          {(isAuthenticated ? signedInLinks : signedOutLinks).map((link) =>
            link.action ? (
              <button
                key={link.name}
                onClick={() => {
                  link.action();
                  setMobileMenuOpen(false);
                }}
                className="block text-red-600 hover:text-red-800 font-semibold"
              >
                {link.name}
              </button>
            ) : (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-purple-600 hover:text-purple-800 font-medium"
              >
                {link.name}
              </Link>
            )
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
