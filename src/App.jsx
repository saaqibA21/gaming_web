import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Prebuilts from './components/Prebuilts';
import LaptopService from './components/LaptopService';
import WhyUs from './components/WhyUs';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import ConsultationModal from './components/ConsultationModal';
import CartDrawer from './components/CartDrawer';
import HologramFlowBg from './components/HologramFlowBg';
import { initGlobalAssemblyObserver } from './utils/useAssemble';

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [consultationOpen, setConsultationOpen] = useState(false);

  useEffect(() => {
    const cleanup = initGlobalAssemblyObserver();
    return cleanup;
  }, []);

  const handleAddToCart = (item) => {
    setCartItems(prev => [...prev, item]);
    setCartOpen(true);
  };

  const handleRemoveItem = (id) => {
    setCartItems(prev => prev.filter((item, index) => (item.id || index) !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans relative selection:bg-red-600 selection:text-white">
      
      {/* Hologram Flow Canvas Background from video frames */}
      <HologramFlowBg />

      {/* Navigation Bar */}
      <Navbar 
        cartItems={cartItems}
        onOpenCart={() => setCartOpen(true)}
        onOpenConsultation={() => setConsultationOpen(true)}
      />

      {/* Main Content Sections: Strictly focused on the 5 Machines & Services */}
      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <Hero onOpenConsultation={() => setConsultationOpen(true)} />

        {/* Five Machines: The Core Manifest */}
        <Prebuilts onAddToCart={handleAddToCart} />

        {/* Laptop Service: Microscopic Chip-Level Overhaul Lab */}
        <LaptopService />

        {/* Why Games World: 24-Hr Benchmark & Assembly Standards */}
        <WhyUs />

        {/* Community & Benchmarked Rig Showcase */}
        <Testimonials />
      </main>

      {/* Footer */}
      <div className="relative z-10">
        <Footer onOpenConsultation={() => setConsultationOpen(true)} />
      </div>

      {/* Modals & Drawers */}
      <ConsultationModal 
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
      />

      <CartDrawer 
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

    </div>
  );
}
