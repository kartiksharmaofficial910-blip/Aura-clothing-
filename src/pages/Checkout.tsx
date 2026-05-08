import React from 'react';
import { PageTransition } from '../components/PageTransition';
import { useStore } from '../store/useStore';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';

export function Checkout() {
  const { cart, cartTotal, removeFromCart } = useStore();

  return (
    <PageTransition>
      <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-[80vh]">
        <h1 className="text-4xl font-serif tracking-widest uppercase text-white mb-16 text-center">Secure Checkout</h1>
        
        {cart.length === 0 ? (
          <div className="text-center">
            <p className="tracking-widest uppercase text-zinc-400 mb-8">Your cart is empty.</p>
            <Link to="/shop" className="bg-white text-black px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors inline-block rounded-sm">
              Return to Shop
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
             {/* Form Section */}
             <div className="space-y-12">
               <div>
                  <h2 className="text-sm uppercase tracking-widest border-b border-white/20 pb-4 mb-6">Contact Information</h2>
                  <div className="space-y-4">
                    <input type="email" placeholder="Email" className="w-full bg-zinc-900 border border-white/10 p-4 text-sm focus:border-white outline-none rounded-sm transition-colors" />
                    <div className="flex items-center gap-3 mt-4">
                      <input type="checkbox" id="newsletter" className="bg-zinc-900 border-white/20 rounded-sm" />
                      <label htmlFor="newsletter" className="text-xs text-zinc-400 uppercase tracking-wider">Keep me up to date on news and exclusive offers</label>
                    </div>
                  </div>
               </div>

               <div>
                  <h2 className="text-sm uppercase tracking-widest border-b border-white/20 pb-4 mb-6">Shipping Address</h2>
                  <div className="grid grid-cols-2 gap-4">
                     <input type="text" placeholder="First Name" className="w-full bg-zinc-900 border border-white/10 p-4 text-sm focus:border-white outline-none rounded-sm transition-colors" />
                     <input type="text" placeholder="Last Name" className="w-full bg-zinc-900 border border-white/10 p-4 text-sm focus:border-white outline-none rounded-sm transition-colors" />
                     <input type="text" placeholder="Address" className="w-full bg-zinc-900 border border-white/10 p-4 text-sm focus:border-white outline-none rounded-sm transition-colors col-span-2" />
                     <input type="text" placeholder="Apartment, suite, etc. (optional)" className="w-full bg-zinc-900 border border-white/10 p-4 text-sm focus:border-white outline-none rounded-sm transition-colors col-span-2" />
                     <input type="text" placeholder="City" className="w-full bg-zinc-900 border border-white/10 p-4 text-sm focus:border-white outline-none rounded-sm transition-colors" />
                     <input type="text" placeholder="Postal Code" className="w-full bg-zinc-900 border border-white/10 p-4 text-sm focus:border-white outline-none rounded-sm transition-colors" />
                  </div>
               </div>

               <div>
                  <h2 className="text-sm uppercase tracking-widest border-b border-white/20 pb-4 mb-6">Payment Method</h2>
                  <div className="bg-zinc-900 border border-white/10 p-6 space-y-4 rounded-sm">
                     <div className="flex justify-between items-center bg-black border border-white/20 p-4 rounded-sm">
                        <span className="text-sm font-medium tracking-wide">Credit Card</span>
                        <div className="flex gap-2">
                          <div className="w-8 h-5 bg-white/20 rounded-sm"></div>
                          <div className="w-8 h-5 bg-white/20 rounded-sm"></div>
                        </div>
                     </div>
                     <input type="text" placeholder="Card Number" className="w-full bg-black border border-white/10 p-4 text-sm focus:border-white outline-none rounded-sm transition-colors" />
                     <div className="grid grid-cols-2 gap-4">
                       <input type="text" placeholder="MM/YY" className="w-full bg-black border border-white/10 p-4 text-sm focus:border-white outline-none rounded-sm transition-colors" />
                       <input type="text" placeholder="CVC" className="w-full bg-black border border-white/10 p-4 text-sm focus:border-white outline-none rounded-sm transition-colors" />
                     </div>
                  </div>
               </div>

               <button className="w-full bg-white text-black py-5 text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors rounded-sm">
                 Complete Order
               </button>
             </div>

             {/* Order Summary */}
             <div className="bg-zinc-900/50 p-8 rounded-sm self-start sticky top-32">
                <h2 className="text-sm uppercase tracking-widest border-b border-white/10 pb-4 mb-8">Order Summary</h2>
                <div className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto no-scrollbar pr-2">
                  {cart.map((item) => (
                    <div key={`${item.product.id}-${item.size}`} className="flex gap-4">
                      <div className="w-16 h-20 bg-zinc-800 rounded-sm overflow-hidden flex-shrink-0 relative">
                        <img src={item.product.featuredImage} alt={item.product.name} className="w-full h-full object-cover" />
                        <span className="absolute -top-1 -right-1 bg-zinc-700 w-5 h-5 flex items-center justify-center text-[10px] rounded-full border border-zinc-900">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 text-sm">
                        <h4 className="font-medium text-white mb-1 text-xs truncate max-w-[150px]">{item.product.name}</h4>
                        <p className="text-zinc-500 text-xs">Size: {item.size}</p>
                      </div>
                      <div className="text-sm font-medium">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 text-sm border-t border-white/10 pt-6">
                  <div className="flex justify-between text-zinc-400">
                     <span>Subtotal</span>
                     <span className="text-white">${cartTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                     <span>Shipping</span>
                     <span className="text-white text-xs uppercase tracking-widest">Calculated next step</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                     <span>Taxes</span>
                     <span className="text-white text-xs uppercase tracking-widest">Calculated next step</span>
                  </div>
                  <div className="flex justify-between text-lg font-medium pt-4 border-t border-white/20">
                     <span>Total</span>
                     <span>${cartTotal().toFixed(2)}</span>
                  </div>
                </div>
             </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
