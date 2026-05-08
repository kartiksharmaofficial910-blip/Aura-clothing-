import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetails } from './pages/ProductDetails';
import { Checkout } from './pages/Checkout';
import { Wishlist } from './pages/Wishlist';
import { AIStylist } from './pages/AIStylist';

// Placeholder standard pages
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="pt-32 pb-24 text-center text-zinc-400 h-[60vh] flex flex-col items-center justify-center">
    <h2 className="text-3xl font-serif uppercase tracking-widest mb-4 text-white">{title}</h2>
    <p className="text-sm tracking-widest uppercase">This section is currently being curated.</p>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="shop/:id" element={<ProductDetails />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="ai-stylist" element={<AIStylist />} />
          <Route path="lookbook" element={<PlaceholderPage title="Lookbook Gallery" />} />
          <Route path="about" element={<PlaceholderPage title="Our Philosophy" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
