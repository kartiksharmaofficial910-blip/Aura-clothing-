import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';

export function ProductCard({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link 
      to={`/shop/${product.id}`}
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900 mb-4 rounded-sm">
        {product.isNewArrival && (
          <span className="absolute top-4 left-4 z-10 bg-white text-black text-[10px] font-bold tracking-widest uppercase px-2 py-1">
            New
          </span>
        )}
        {product.isLimitedEdition && (
          <span className="absolute max-w-fit max-h-fit top-4 right-4 z-10 border border-white/50 text-white text-[10px] uppercase font-bold tracking-widest px-2 py-1 backdrop-blur-md">
            Limited
          </span>
        )}
        <img 
          src={isHovered && product.galleryImages.length > 0 ? product.galleryImages[0] : product.featuredImage} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      
      <div className="flex flex-col space-y-1">
        <span className="text-[10px] uppercase tracking-widest text-zinc-500">
          {product.category}
        </span>
        <div className="flex justify-between items-start">
          <h3 className="text-sm font-medium tracking-wide text-zinc-200 group-hover:text-white transition-colors">
            {product.name}
          </h3>
          <span className="text-sm font-medium tracking-wide text-white">
            ${product.price}
          </span>
        </div>
      </div>
    </Link>
  );
}
