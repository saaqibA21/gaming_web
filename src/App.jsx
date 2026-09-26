import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PcBuilder from './components/PcBuilder';
import Prebuilts from './components/Prebuilts';
import GamingZone from './components/GamingZone';
import LaptopService from './components/LaptopService';
import WhyUs from './components/WhyUs';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import ConsultationModal from './components/ConsultationModal';
import CartDrawer from './components/CartDrawer';
import StickyWhatsApp from './components/StickyWhatsApp';
import HologramFlowBg from './components/HologramFlowBg';
import AssemblyHUD from './components/AssemblyHUD';
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
    <div className="min-h-screen bg-[#070709] text-gray-100 flex flex-col font-sans relative">
      
      {/* Hologram Flow Canvas Background from video frames */}
      <HologramFlowBg />

      {/* Assembly Telemetry HUD & Audio Controller */}
      <AssemblyHUD />

      {/* Navigation Bar */}
      <Navbar 
        cartItems={cartItems}
        onOpenCart={() => setCartOpen(true)}
        onOpenConsultation={() => setConsultationOpen(true)}
      />

      {/* Main Content Sections with depth layering */}
      <main className="flex-1 relative z-10">
        {/* Hero Section: Live Assembly Bay 01 & Workbench Overview */}
        <Hero onOpenConsultation={() => setConsultationOpen(true)} />

        {/* Custom PC Builder: Interactive Hardware Assembly Bench */}
        <PcBuilder onAddToCart={handleAddToCart} />

        {/* Prebuilt Systems: Factory-Assembled Rigs */}
        <Prebuilts onAddToCart={handleAddToCart} />

        {/* Gaming Zone: 240Hz Battle Station Deployment */}
        <GamingZone />

        {/* Laptop Service: Microscopic Chip-Level Overhaul Lab */}
        <LaptopService />

        {/* Why Games World: 24-Hr Benchmark & Assembly Standards */}
        <WhyUs />

        {/* Community & Benchmarked Rig Showcase */}
        <Testimonials />
      </main>

      {/* Footer */}
      <div className="relative z-10">
        <Footer />
      </div>

      {/* Floating Sticky WhatsApp Widget */}
      <StickyWhatsApp />

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
