import React, { useState } from 'react';
import { PageTransition } from '../components/PageTransition';
import { products } from '../lib/mockData';
import { ProductCard } from '../components/ProductCard';
import { motion, AnimatePresence } from 'motion/react';
import { SlidersHorizontal } from 'lucide-react';

export function Shop() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categories = ['All', 'Outerwear', 'Tops', 'Bottoms', 'Footwear', 'Accessories'];

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <PageTransition>
      <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 border-b border-white/10 pb-8">
          <h1 className="text-4xl font-serif tracking-widest uppercase text-white mb-6 md:mb-0">Collection</h1>
          
          <div className="flex items-center w-full md:w-auto justify-between md:justify-end gap-6 overflow-x-auto no-scrollbar pb-2 md:pb-0">
             <div className="flex space-x-6">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`text-xs uppercase tracking-widest whitespace-nowrap transition-colors ${
                      activeCategory === category ? 'text-white font-bold' : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    {category}
                  </button>
                ))}
             </div>
             
             <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="hidden md:flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-400 hover:text-white"
             >
               <SlidersHorizontal size={14} /> Filter
             </button>
          </div>
        </div>

        <AnimatePresence>
          {isFilterOpen && (
             <motion.div 
               initial={{ height: 0, opacity: 0 }}
               animate={{ height: 'auto', opacity: 1 }}
               exit={{ height: 0, opacity: 0 }}
               className="overflow-hidden mb-12"
             >
               <div className="bg-zinc-900 border border-white/5 p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                 <div>
                    <h4 className="text-xs tracking-widest text-zinc-400 mb-4 uppercase">Sort By</h4>
                    <div className="space-y-3 flex flex-col items-start">
                      <button className="text-sm text-zinc-300 hover:text-white transition">Featured</button>
                      <button className="text-sm text-zinc-300 hover:text-white transition">Price: Low to High</button>
                      <button className="text-sm text-zinc-300 hover:text-white transition">Price: High to Low</button>
                      <button className="text-sm text-zinc-300 hover:text-white transition">Newest</button>
                    </div>
                 </div>
                 <div>
                    <h4 className="text-xs tracking-widest text-zinc-400 mb-4 uppercase">Availability</h4>
                    <div className="flex items-center gap-3 mb-3">
                      <input type="checkbox" id="instock" className="bg-zinc-800 border-zinc-700 rounded-sm focus:ring-zinc-500" />
                      <label htmlFor="instock" className="text-sm text-zinc-300">In Stock</label>
                    </div>
                    <div className="flex items-center gap-3">
                      <input type="checkbox" id="outofstock" className="bg-zinc-800 border-zinc-700 rounded-sm focus:ring-zinc-500" />
                      <label htmlFor="outofstock" className="text-sm text-zinc-300">Out of Stock</label>
                    </div>
                 </div>
               </div>
             </motion.div>
          )}
        </AnimatePresence>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-16">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
          <div className="py-32 text-center text-zinc-500 tracking-widest uppercase text-sm">
            No products found in this category.
          </div>
        )}
      </div>
    </PageTransition>
  );
}
