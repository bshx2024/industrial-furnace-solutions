import React, { useState, useEffect } from 'react';
import { Menu, X, Flame } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Solutions', href: '/solutions' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'About', href: '/about' },
  ];

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled || location.pathname !== '/' ? 'bg-industrial-900 shadow-lg py-3' : 'bg-transparent py-5'
        }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-furnace-600 p-2 rounded text-white group-hover:bg-furnace-500 transition-colors">
            <Flame size={24} fill="currentColor" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-bold text-xl uppercase tracking-wider leading-none text-white">
              Eco<span className="text-furnace-500">Reheating</span>
            </span>
            <span className={`text-[10px] tracking-widest uppercase ${isScrolled ? 'text-gray-400' : 'text-gray-300'}`}>
              Industrial Solutions
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`text-sm font-semibold transition-colors uppercase tracking-wide ${location.pathname === link.href ? 'text-furnace-500' : 'text-gray-300 hover:text-furnace-500'
                }`}
            >
              {link.name}
            </Link>
          ))}
          <a
            href="/#assessment"
            className="bg-furnace-600 hover:bg-furnace-500 text-white px-6 py-2 rounded font-bold text-sm uppercase tracking-wide transition-all transform hover:scale-105 shadow-lg shadow-furnace-600/30"
          >
            Free Assessment
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-industrial-900 border-t border-gray-800 absolute w-full">
          <div className="flex flex-col p-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`font-semibold uppercase tracking-wide ${location.pathname === link.href ? 'text-furnace-500' : 'text-gray-300 hover:text-furnace-500'
                  }`}
              >
                {link.name}
              </Link>
            ))}
            <a
              href="/#assessment"
              onClick={() => setIsMobileMenuOpen(false)}
              className="bg-furnace-600 text-center text-white px-6 py-3 rounded font-bold uppercase tracking-wide"
            >
              Free Assessment
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;