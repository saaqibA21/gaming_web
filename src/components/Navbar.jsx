import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/mockData';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  Sparkles 
} from 'lucide-react';

export default function Navbar({ 
  cartItems = [], 
  onOpenCart, 
  onOpenConsultation
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "Custom PC Builder", href: "#pc-builder", badge: "Live Configurator" },
    { name: "Prebuilt PCs", href: "#prebuilts" },
    { name: "Gaming Zone", href: "#gaming-zone" },
    { name: "Laptop Service", href: "#laptop-service" },
    { name: "Why Games World", href: "#why-us" },
    { name: "Store & Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#070709] border-b border-gw-border">
      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Name with Small G Controller Emblem */}
          <a href="#hero" className="flex items-center gap-3 group flex-shrink-0">
            <div className="relative">
              <img 
                src={COMPANY_INFO.logo} 
                alt="Games World Small G Emblem" 
                className="h-12 w-12 sm:h-14 sm:w-14 object-contain filter drop-shadow-[0_0_12px_rgba(229,9,20,0.5)] group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1 font-display tracking-wider text-xl sm:text-2xl lg:text-3xl leading-none">
                <span className="text-white">GAMES</span>
                <span className="text-red-600 group-hover:text-red-500 transition-colors drop-shadow-[0_0_10px_rgba(229,9,20,0.8)]">WORLD</span>
              </div>
              <span className="text-[9px] sm:text-[10px] text-gray-400 font-tech tracking-widest-plus uppercase font-bold mt-0.5">
                PLAY • CONNECT • COMPETE
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative px-3 py-2 text-xs font-tech font-bold uppercase tracking-wider text-gray-300 hover:text-white transition-colors duration-200 group"
              >
                <span>{link.name}</span>
                {link.badge && (
                  <span className="ml-1.5 px-1.5 py-0.5 text-[9px] font-tech font-bold uppercase rounded bg-red-600 text-white tracking-wider animate-pulse">
                    {link.badge}
                  </span>
                )}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Free Consultation Button */}
            <button
              onClick={onOpenConsultation}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-tech font-bold uppercase tracking-wider shadow-red-glow hover:shadow-red-glow-lg transition-all transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Get Free Quote</span>
            </button>

            {/* Cart / Build Summary Trigger */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-lg bg-gw-card border border-gw-border hover:border-red-600/60 text-gray-200 hover:text-white transition-colors group"
              title="View Build Summary"
            >
              <ShoppingBag className="w-5 h-5 group-hover:text-red-500 transition-colors" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white shadow-lg animate-bounce">
                  {cartItems.length}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-gw-card border border-gw-border text-gray-300 hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0c0c12] border-b border-gw-border px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-md text-base font-medium text-gray-200 hover:text-white hover:bg-gw-card border border-transparent hover:border-gw-border"
            >
              <span>{link.name}</span>
              {link.badge && (
                <span className="px-2 py-0.5 text-xs font-bold rounded bg-red-600 text-white">
                  {link.badge}
                </span>
              )}
            </a>
          ))}
          <div className="pt-4 border-t border-gw-border/50 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-red-600 text-white font-bold tracking-wider uppercase text-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>Book Free Consultation</span>
            </button>
            <div className="text-center text-xs text-gray-400 pt-1">
              Founder: {COMPANY_INFO.founder} | {COMPANY_INFO.primaryPhone}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}


