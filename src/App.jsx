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
import AdminPage from './components/AdminPage';
import { adminStorage } from './utils/adminStorage';
import { initGlobalAssemblyObserver } from './utils/useAssemble';
import { Sparkles, Tag, ArrowRight } from 'lucide-react';

export default function App() {
  const [isAdminView, setIsAdminView] = useState(() => {
    return window.location.hash === '#admin' || window.location.pathname === '/admin';
  });
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [packs, setPacks] = useState(() => adminStorage.getPacks());
  const [activeOffer, setActiveOffer] = useState(() => {
    const offers = adminStorage.getOffers();
    return offers.find(o => o.active) || null;
  });

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setIsAdminView(true);
      } else if (isAdminView && window.location.hash !== '#admin') {
        setIsAdminView(false);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [isAdminView]);

  useEffect(() => {
    if (!isAdminView) {
      // Refresh packs and active offers whenever switching back to storefront
      setPacks(adminStorage.getPacks());
      const offers = adminStorage.getOffers();
      setActiveOffer(offers.find(o => o.active) || null);
    }
  }, [isAdminView]);

  useEffect(() => {
    const cleanup = initGlobalAssemblyObserver();
    return cleanup;
  }, []);

  const handleOpenAdmin = () => {
    window.location.hash = '#admin';
    setIsAdminView(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToStore = () => {
    window.location.hash = '#hero';
    setIsAdminView(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

  // If in Admin view, render full Admin Portal
  if (isAdminView) {
    return (
      <AdminPage onBackToStore={handleBackToStore} />
    );
  }

  return (
    <div className="min-h-screen bg-mode-black text-soft-mist flex flex-col font-sans relative selection:bg-primary selection:text-white">
      
      {/* Active Promotional Offer Top Ribbon */}
      {activeOffer && (
        <div className="bg-gradient-to-r from-primary/90 via-primary to-primary-hover text-white text-xs py-2 px-4 text-center font-tech font-bold uppercase tracking-wider relative z-50 flex items-center justify-center gap-2 shadow-md">
          <Tag className="w-3.5 h-3.5 shrink-0" />
          <span>{activeOffer.badgeText}: {activeOffer.title} — {activeOffer.tagline}</span>
          <span className="hidden sm:inline bg-black text-primary px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-normal">
            USE CODE: {activeOffer.code}
          </span>
        </div>
      )}

      {/* Hologram Flow Canvas Background from video frames */}
      <HologramFlowBg />

      {/* Navigation Bar */}
      <Navbar 
        cartItems={cartItems}
        onOpenCart={() => setCartOpen(true)}
        onOpenConsultation={() => setConsultationOpen(true)}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Main Content Sections: Strictly focused on the Purpose-Built Machines & Services */}
      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <Hero onOpenConsultation={() => setConsultationOpen(true)} />

        {/* Five Machines: The Core Manifest */}
        <Prebuilts 
          packs={packs} 
          onAddToCart={handleAddToCart} 
        />

        {/* Laptop Service: Microscopic Chip-Level Overhaul Lab */}
        <LaptopService />

        {/* Why Games World: 24-Hr Benchmark & Assembly Standards */}
        <WhyUs />

        {/* Community & Benchmarked Rig Showcase */}
        <Testimonials />
      </main>

      {/* Footer */}
      <div className="relative z-10">
        <Footer 
          onOpenConsultation={() => setConsultationOpen(true)}
          onOpenAdmin={handleOpenAdmin}
        />
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
