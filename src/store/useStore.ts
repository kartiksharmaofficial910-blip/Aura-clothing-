import { create } from 'zustand';
import { CartItem, Product } from '../types';

interface StoreState {
  cart: CartItem[];
  wishlist: Product[];
  isCartOpen: boolean;
  addToCart: (product: Product, size: string) => void;
  removeFromCart: (productId: string, size: string) => void;
  toggleCart: () => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  cartTotal: () => number;
}

export const useStore = create<StoreState>((set, get) => ({
  cart: [],
  wishlist: [],
  isCartOpen: false,

  addToCart: (product, size) => set((state) => {
    const existingItem = state.cart.find((item) => item.product.id === product.id && item.size === size);
    if (existingItem) {
      return {
        cart: state.cart.map((item) => 
          item.product.id === product.id && item.size === size 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        ),
        isCartOpen: true
      };
    }
    return { cart: [...state.cart, { product, quantity: 1, size }], isCartOpen: true };
  }),

  removeFromCart: (productId, size) => set((state) => ({
    cart: state.cart.filter((item) => !(item.product.id === productId && item.size === size))
  })),

  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

  toggleWishlist: (product) => set((state) => {
    const exists = state.wishlist.some(p => p.id === product.id);
    if (exists) {
      return { wishlist: state.wishlist.filter(p => p.id !== product.id) };
    }
    return { wishlist: [...state.wishlist, product] };
  }),

  isInWishlist: (productId) => {
    return get().wishlist.some(p => p.id === productId);
  },

  cartTotal: () => {
    return get().cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }
}));
