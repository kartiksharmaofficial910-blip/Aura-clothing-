import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, Heart } from 'lucide-react';
import { useStore } from '../store/useStore';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart, toggleCart } = useStore();
  const location = useLocation();

  const isHome = location.pathname === '/';
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  const navLinks = [
    { name: 'Shop', path: '/shop' },
    { name: 'AI Stylist', path: '/ai-stylist' },
    { name: 'Lookbook', path: '/lookbook' },
    { name: 'About', path: '/about' },
  ];

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out',
          isScrolled || !isHome
            ? 'bg-zinc-950/80 backdrop-blur-md border-b border-white/5 py-4'
            : 'bg-transparent py-6'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white hover:text-zinc-400 transition"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} strokeWidth={1.5} />
          </button>

          {/* Desktop Nav Actions (Left) */}
          <nav className="hidden md:flex items-center space-x-8 flex-1">
            {navLinks.slice(0, 2).map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-xs uppercase tracking-[0.2em] font-medium text-zinc-300 hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Center Logo */}
          <Link to="/" className="flex-1 md:flex-none text-center">
            <h1 className="font-serif text-2xl md:text-3xl tracking-widest text-white uppercase">
              Aura
            </h1>
          </Link>

          {/* Desktop Nav Actions & Icons (Right) */}
          <div className="flex items-center justify-end space-x-6 flex-1">
            <nav className="hidden md:flex items-center space-x-8 mr-8">
              {navLinks.slice(2).map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-xs uppercase tracking-[0.2em] font-medium text-zinc-300 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-4 md:space-x-6">
              <button className="text-white hover:text-zinc-400 transition hidden sm:block">
                <Search size={20} strokeWidth={1.5} />
              </button>
              <Link to="/wishlist" className="text-white hover:text-zinc-400 transition hidden sm:block">
                <Heart size={20} strokeWidth={1.5} />
              </Link>
              <button 
                onClick={toggleCart}
                className="text-white hover:text-zinc-400 transition relative"
              >
                <ShoppingBag size={20} strokeWidth={1.5} />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-white text-black text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ type: 'tween', duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            className="fixed inset-0 z-50 bg-zinc-950 flex flex-col pt-24 px-6 pb-6"
          >
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-6 right-6 text-white"
            >
              <X size={28} strokeWidth={1.5} />
            </button>
            
            <nav className="flex flex-col space-y-8 mt-12">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-4xl font-serif tracking-wide text-white hover:text-zinc-400 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-8 border-t border-white/10 flex items-center space-x-6">
                 <Link to="/wishlist" onClick={() => setIsMobileMenuOpen(false)} className="text-sm uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                   <Heart size={16} /> Wishlist
                 </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
