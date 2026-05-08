import React from 'react';
import { PageTransition } from '../components/PageTransition';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { products } from '../lib/mockData';
import { ProductCard } from '../components/ProductCard';
import { Link } from 'react-router-dom';

export function Home() {
  const featuredProducts = products.slice(0, 4);

  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] w-full bg-zinc-900 flex items-center justify-center overflow-hidden">
        {/* Abstract/Cinematic Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2000&auto=format&fit=crop" 
            alt="Cinematic Fashion" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-zinc-950" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif text-white tracking-widest uppercase mb-6"
          >
            Noir Era
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-sm md:text-base text-zinc-300 max-w-lg tracking-widest uppercase mb-10"
          >
            Redefining luxury streetwear through architectural silhouettes and minimalist precision.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link 
              to="/shop" 
              className="group flex items-center gap-4 bg-white text-black px-10 py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-zinc-200 transition-all rounded-sm"
            >
              Explore Collection
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-16">
          <div>
            <h2 className="text-3xl font-serif uppercase tracking-widest">New Arrivals</h2>
            <p className="text-zinc-500 uppercase tracking-widest text-xs mt-2">The latest elements of design.</p>
          </div>
          <Link to="/shop" className="hidden md:flex items-center gap-2 text-xs uppercase tracking-widest border-b border-zinc-700 pb-1 hover:border-white hover:text-white text-zinc-400 transition-colors">
            View All <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {featuredProducts.map((product, idx) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* AI Lookbook Teaser */}
      <section className="relative py-32 bg-zinc-900 border-y border-white/5 overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full hidden lg:block opacity-40 mix-blend-luminosity">
            <img 
              src="https://images.unsplash.com/photo-1509631179647-0c7729b17912?q=80&w=1200&auto=format&fit=crop" 
              className="w-full h-full object-cover" 
              alt="AI Fashion" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex text-left">
           <div className="max-w-xl">
              <span className="text-xs font-mono text-zinc-500 tracking-widest mb-6 block">// SYSTEM: ACTIVE</span>
              <h2 className="text-4xl md:text-5xl font-serif text-white tracking-widest uppercase mb-8">AI Stylist</h2>
              <p className="text-zinc-400 leading-relaxed tracking-wide mb-10">
                Experience the frontier of personal styling. Our integrated AI analyzes your aesthetic preferences, climate, and upcoming events to curate distinctive ensembles from our latest collection.
              </p>
              <Link to="/ai-stylist" className="inline-flex items-center border border-white/20 hover:border-white px-8 py-4 text-xs tracking-[0.2em] uppercase text-white transition-all backdrop-blur-sm group rounded-sm">
                Initiate Styling Session 
                <ArrowRight size={16} className="ml-4 group-hover:translate-x-1 transition-transform" />
              </Link>
           </div>
        </div>
      </section>

      {/* Editorial Split Section */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="aspect-[4/5] bg-zinc-900 relative overflow-hidden"
          >
             <img 
               src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop" 
               className="w-full h-full object-cover grayscale mix-blend-overlay hover:mix-blend-normal hover:grayscale-0 transition-all duration-1000"
               alt="Editorial Model" 
             />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="pl-0 md:pl-12"
          >
            <h2 className="text-3xl font-serif uppercase tracking-widest mb-6">The Process</h2>
            <p className="text-zinc-400 tracking-wide leading-relaxed mb-6">
              Our garments are conceived through a meticulous process of deconstruction and refinement. We source proprietary fabrics from the finest technical mills in Japan and Italy, focusing on drape, structure, and longevity.
            </p>
            <p className="text-zinc-400 tracking-wide leading-relaxed mb-10">
              Each silhouette is a meditation on the human form, designed to exist outside of seasonal trends.
            </p>
            <Link to="/about" className="text-xs uppercase tracking-widest text-white border-b border-white pb-1 hover:text-zinc-300 transition-colors">
              Discover Our Philosophy
            </Link>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
