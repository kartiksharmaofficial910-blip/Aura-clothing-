import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-zinc-950 text-white border-t border-white/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-20">
        <div className="col-span-1 md:col-span-2 space-y-8">
          <h2 className="font-serif text-3xl tracking-widest uppercase">Aura</h2>
          <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
            Architectural garments designed for the modern landscape. Exploring the intersection of utility, geometry, and luxury form.
          </p>
          <div className="pt-4">
            <form className="flex items-end max-w-md border-b border-white/30 pb-2 focus-within:border-white transition-colors">
              <input 
                type="email" 
                placeholder="SUBSCRIBE TO NEW ARRIVALS" 
                className="bg-transparent border-none outline-none text-xs tracking-widest uppercase flex-1 placeholder:text-zinc-600 w-full"
              />
              <button type="submit" className="text-zinc-400 hover:text-white transition">
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-semibold mb-6">Explore</h3>
          <ul className="space-y-4">
            {['Shop', 'Collections', 'AI Stylist', 'Lookbook', 'About'].map(link => (
              <li key={link}>
                <Link to={`/${link.toLowerCase().replace(' ', '-')}`} className="text-sm text-zinc-300 hover:text-white transition-colors tracking-wide">
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <h3 className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-semibold mb-6">Assistance</h3>
          <ul className="space-y-4">
            {['Contact', 'Shipping', 'Returns', 'Terms', 'Privacy'].map(link => (
              <li key={link}>
                <Link to={'#'} className="text-sm text-zinc-300 hover:text-white transition-colors tracking-wide">
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between text-xs text-zinc-600 uppercase tracking-widest pt-8 border-t border-white/5">
        <p>&copy; {new Date().getFullYear()} AURA STUDIO. ALL RIGHTS RESERVED.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-zinc-300 transition-colors">Instagram</a>
          <a href="#" className="hover:text-zinc-300 transition-colors">Twitter</a>
          <a href="#" className="hover:text-zinc-300 transition-colors">Pinterest</a>
        </div>
      </div>
    </footer>
  );
}
