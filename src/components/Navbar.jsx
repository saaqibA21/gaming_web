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
    { name: "Five Machines", href: "#prebuilts" },
    { name: "Laptop Service", href: "#laptop-service" },
    { name: "Why Games World", href: "#why-us" },
    { name: "Store & Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[rgb(0,0,0)]/90 backdrop-blur-lg border-b border-[rgba(255,255,255,0.08)]">
      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo & Name */}
          <a href="#hero" className="flex items-center gap-2 sm:gap-3 group flex-shrink-0">
            <div className="relative">
              <img 
                src={COMPANY_INFO.logo} 
                alt="Games World Small G Emblem" 
                className="h-9 w-9 sm:h-12 sm:w-12 object-contain group-hover:scale-105 transition-transform duration-300" 
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1 font-display tracking-wider text-lg sm:text-2xl leading-none">
                <span className="text-soft-mist font-bold">GAMES</span>
                <span className="text-primary group-hover:text-primary-hover transition-colors font-bold">WORLD</span>
              </div>
              <span className="hidden xs:block text-[8px] sm:text-[10px] text-[rgba(255,255,255,0.5)] font-tech tracking-widest-plus uppercase font-bold mt-0.5">
                FIVE MACHINES • FIVE PURPOSES
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative px-3.5 py-2 text-xs font-tech font-bold uppercase tracking-wider text-[rgba(255,255,255,0.7)] hover:text-primary transition-colors duration-200 group"
              >
                <span>{link.name}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Free Consultation Button */}
            <button
              onClick={onOpenConsultation}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-tech font-extrabold uppercase tracking-wider shadow-nuke-glow transition-all transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Get Free Quote</span>
            </button>

            {/* Cart Trigger */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-xl bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] hover:border-primary/50 text-soft-mist hover:text-primary transition-colors group min-h-[42px] min-w-[42px] flex items-center justify-center"
              title="View Cart"
              aria-label="View shopping cart"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-105 transition-transform" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-primary text-[9px] sm:text-[10px] font-extrabold text-white shadow-md animate-bounce">
                  {cartItems.length}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-soft-mist min-h-[42px] min-w-[42px] flex items-center justify-center"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 top-16 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative z-50 lg:hidden bg-[rgb(5,5,5)]/95 backdrop-blur-xl border-b border-[rgba(255,255,255,0.08)] px-4 pt-3 pb-6 space-y-1 shadow-2xl animate-fadeIn">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-tech font-bold text-soft-mist hover:text-primary hover:bg-[rgba(255,255,255,0.04)] border border-transparent hover:border-[rgba(255,255,255,0.08)] min-h-[46px]"
              >
                <span>{link.name}</span>
              </a>
            ))}
            <div className="pt-3 border-t border-[rgba(255,255,255,0.08)] flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-primary text-white font-tech font-extrabold tracking-wider uppercase text-xs shadow-nuke-glow min-h-[46px]"
              >
                <Sparkles className="w-4 h-4" />
                <span>Book Free Consultation</span>
              </button>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
