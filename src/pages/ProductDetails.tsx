import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../lib/mockData';
import { useStore } from '../store/useStore';
import { PageTransition } from '../components/PageTransition';
import { Heart, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = products.find(p => p.id === id);
  const { addToCart, toggleWishlist, isInWishlist } = useStore();

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  if (!product) {
    return (
      <div className="pt-32 pb-24 text-center text-zinc-400 h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-serif uppercase tracking-widest mb-4">Product Not Found</h2>
        <button className="text-xs uppercase tracking-widest border-b pb-1" onClick={() => navigate('/shop')}>Return to Shop</button>
      </div>
    );
  }

  const images = [product.featuredImage, ...product.galleryImages].filter((v, i, a) => a.indexOf(v) === i); // Unique

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes.length > 0) {
      alert('Please select a size first');
      return;
    }
    addToCart(product, selectedSize || 'O/S');
  };

  const nextImage = () => setCurrentImageIdx((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImageIdx((prev) => (prev - 1 + images.length) % images.length);

  return (
    <PageTransition>
      <div className="pt-24 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
         {/* Breadcrumbs */}
         <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-8 flex items-center space-x-2">
            <button onClick={() => navigate('/')} className="hover:text-white transition">Home</button>
            <span>/</span>
            <button onClick={() => navigate('/shop')} className="hover:text-white transition">Shop</button>
            <span>/</span>
            <span className="text-zinc-300">{product.name}</span>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            {/* Image Gallery */}
            <div className="relative group">
               <div className="aspect-[3/4] bg-zinc-900 overflow-hidden relative rounded-sm">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImageIdx}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      src={images[currentImageIdx]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </AnimatePresence>

                  {images.length > 1 && (
                    <>
                      <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                        <ChevronLeft size={20} />
                      </button>
                      <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}
               </div>
               
               {/* Thumbnails */}
               {images.length > 1 && (
                 <div className="flex gap-4 mt-4 overflow-x-auto no-scrollbar pb-2">
                   {images.map((img, idx) => (
                     <button 
                       key={idx}
                       onClick={() => setCurrentImageIdx(idx)}
                       className={`w-20 h-24 flex-shrink-0 relative rounded-sm overflow-hidden border-2 transition-colors ${
                         idx === currentImageIdx ? 'border-white' : 'border-transparent'
                       }`}
                     >
                       <img src={img} className="w-full h-full object-cover" alt="Thumbnail" />
                     </button>
                   ))}
                 </div>
               )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col py-0 md:py-10">
               <div className="flex justify-between items-start mb-6">
                 <div>
                   <h1 className="text-3xl lg:text-4xl font-serif uppercase tracking-widest text-white mb-2">{product.name}</h1>
                   <p className="text-xs uppercase tracking-widest text-zinc-500">{product.category}</p>
                 </div>
                 <span className="text-2xl tracking-wider">${product.price}</span>
               </div>

               <p className="text-zinc-400 tracking-wide leading-relaxed text-sm mb-10">
                 {product.description}
               </p>

               {/* Variations / Sizes */}
               <div className="space-y-8 mb-12">
                 <div>
                    <h3 className="text-[10px] uppercase tracking-widest text-zinc-500 mb-4 flex justify-between">
                      <span>Color</span> 
                      <span className="text-white">{product.colors[0]}</span>
                    </h3>
                 </div>

                 {product.sizes.length > 0 && (
                   <div>
                      <h3 className="text-[10px] uppercase tracking-widest text-zinc-500 mb-4 flex justify-between">
                        <span>Select Size</span>
                        <button className="underline hover:text-white transition">Size Guide</button>
                      </h3>
                      <div className="grid grid-cols-4 gap-3">
                         {product.sizes.map(size => (
                           <button
                             key={size}
                             onClick={() => setSelectedSize(size)}
                             className={`py-3 border text-xs tracking-widest transition-all rounded-sm ${
                               selectedSize === size 
                                 ? 'border-white bg-white text-black' 
                                 : 'border-white/20 text-zinc-300 hover:border-white'
                             }`}
                           >
                             {size}
                           </button>
                         ))}
                      </div>
                   </div>
                 )}
               </div>

               {/* Actions */}
               <div className="flex gap-4 mt-auto">
                 <button
                   onClick={handleAddToCart}
                   className="flex-1 bg-white text-black py-4 text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors rounded-sm shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                 >
                   Add to Cart
                 </button>
                 <button
                   onClick={() => toggleWishlist(product)}
                   className={`w-14 flex items-center justify-center border transition-all rounded-sm ${
                     isInWishlist(product.id) ? 'border-red-500 text-red-500 bg-red-500/10' : 'border-white/20 text-zinc-300 hover:border-white'
                   }`}
                 >
                   <Heart size={20} className={isInWishlist(product.id) ? 'fill-current' : ''} strokeWidth={1.5} />
                 </button>
               </div>

               {/* Details Accordion style standard */}
               <div className="mt-16 border-t border-white/10 pt-8 space-y-6">
                 <div>
                   <h3 className="text-xs uppercase tracking-widest text-white mb-4">Details</h3>
                   <ul className="list-disc list-inside text-sm text-zinc-400 space-y-2">
                      {product.details.map((detail, idx) => (
                        <li key={idx} className="tracking-wide">
                          <span className="ml-2">{detail}</span>
                        </li>
                      ))}
                   </ul>
                 </div>
                 <div className="border-t border-white/5 pt-6">
                   <h3 className="text-xs uppercase tracking-widest text-white mb-2">Shipping & Returns</h3>
                   <p className="text-sm text-zinc-500 tracking-wide">
                      Complimentary worldwide shipping on orders above $500. Returns accepted within 14 days of delivery.
                   </p>
                 </div>
               </div>
            </div>
         </div>
      </div>
    </PageTransition>
  );
}
