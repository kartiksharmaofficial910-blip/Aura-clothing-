import React from 'react';
import { PageTransition } from '../components/PageTransition';
import { useStore } from '../store/useStore';
import { ProductCard } from '../components/ProductCard';
import { Link } from 'react-router-dom';

export function Wishlist() {
  const { wishlist } = useStore();

  return (
    <PageTransition>
      <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-[80vh]">
        <h1 className="text-4xl font-serif tracking-widest uppercase text-white mb-16 border-b border-white/10 pb-8">Wishlist</h1>
        
        {wishlist.length === 0 ? (
          <div className="text-center py-20 text-zinc-500">
            <p className="tracking-widest uppercase text-sm mb-8">Your wishlist is currently empty.</p>
            <Link to="/shop" className="text-xs text-white border-b border-white pb-1 hover:text-zinc-300 transition-colors uppercase tracking-widest">
              Explore Collection
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16">
            {wishlist.map(product => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  );
}
