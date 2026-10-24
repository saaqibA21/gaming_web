import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Prebuilts from './components/Prebuilts';
import WhyUs from './components/WhyUs';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import ConsultationModal from './components/ConsultationModal';
import CartDrawer from './components/CartDrawer';
import HologramFlowBg from './components/HologramFlowBg';
import AdminPage from './components/AdminPage';
import { adminStorage } from './utils/adminStorage';
import { initGlobalAssemblyObserver } from './utils/useAssemble';

export default function App() {
  const checkIsAdmin = () => {
    const hash = window.location.hash.toLowerCase();
    const path = window.location.pathname.toLowerCase().replace(/\/+$/, '');
    return hash === '#admin' || path === '/admin';
  };

  const [isAdminView, setIsAdminView] = useState(checkIsAdmin);
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [packs, setPacks] = useState(() => adminStorage.getPacks());

  useEffect(() => {
    const handleLocationChange = () => {
      setIsAdminView(checkIsAdmin());
    };

    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  useEffect(() => {
    if (!isAdminView) {
      // Refresh packs whenever switching back to storefront
      setPacks(adminStorage.getPacks());
    }
  }, [isAdminView]);

  useEffect(() => {
    const cleanup = initGlobalAssemblyObserver();
    return cleanup;
  }, []);

  const handleBackToStore = () => {
    const path = window.location.pathname.toLowerCase().replace(/\/+$/, '');
    if (path === '/admin') {
      window.history.pushState(null, '', '/');
    }
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

  // If in secret Admin view (via URL #admin or /admin), render full Admin Portal
  if (isAdminView) {
    return (
      <AdminPage onBackToStore={handleBackToStore} />
    );
  }

  return (
    <div className="min-h-screen bg-mode-black text-soft-mist flex flex-col font-sans relative selection:bg-primary selection:text-white">
      
      {/* Hologram Flow Canvas Background from video frames */}
      <HologramFlowBg />

      {/* Navigation Bar */}
      <Navbar 
        cartItems={cartItems}
        onOpenCart={() => setCartOpen(true)}
        onOpenConsultation={() => setConsultationOpen(true)}
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

        {/* Why Games World: 24-Hr Benchmark & Assembly Standards */}
        <WhyUs />

        {/* Community & Benchmarked Rig Showcase */}
        <Testimonials />
      </main>

      {/* Footer */}
      <div className="relative z-10">
        <Footer 
          onOpenConsultation={() => setConsultationOpen(true)}
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
