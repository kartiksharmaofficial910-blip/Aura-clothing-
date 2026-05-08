import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ArrowRight } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Link } from 'react-router-dom';

export function CartDrawer() {
  const { isCartOpen, toggleCart, cart, removeFromCart, cartTotal } = useStore();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm cursor-crosshair"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-zinc-950 border-l border-white/10 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-xs uppercase tracking-[0.2em] font-medium text-white">
                Cart ({cart.reduce((acc, item) => acc + item.quantity, 0)})
              </h2>
              <button 
                onClick={toggleCart} 
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-zinc-500 space-y-4">
                  <p className="text-sm uppercase tracking-widest">Your cart is empty.</p>
                  <Link 
                    to="/shop" 
                    onClick={toggleCart}
                    className="text-xs text-white uppercase tracking-widest pb-1 border-b border-white hover:text-zinc-300 transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={`${item.product.id}-${item.size}`} className="flex gap-4 group">
                    <div className="w-24 h-32 bg-zinc-900 overflow-hidden rounded-sm flex-shrink-0">
                      <img 
                        src={item.product.featuredImage} 
                        alt={item.product.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col py-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-sm text-white">{item.product.name}</h3>
                          <p className="text-xs text-zinc-400 mt-1">Size: {item.size}</p>
                        </div>
                        <p className="text-sm font-medium">${item.product.price}</p>
                      </div>
                      
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center border border-white/20 rounded-sm">
                           <span className="px-3 py-1 text-xs text-zinc-400">Qty: {item.quantity}</span>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.product.id, item.size)}
                          className="text-zinc-500 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={16} strokeWidth={1.5} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-6 bg-zinc-950 border-t border-white/10 space-y-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-400 uppercase tracking-widest">Subtotal</span>
                  <span className="text-white font-medium">${cartTotal().toFixed(2)}</span>
                </div>
                <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Shipping & taxes calculated at checkout.</p>
                <Link 
                  to="/checkout"
                  onClick={toggleCart}
                  className="w-full py-4 bg-white text-black flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors uppercase tracking-widest text-xs font-semibold rounded-sm"
                >
                  Checkout <ArrowRight size={16} />
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
