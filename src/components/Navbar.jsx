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
    { name: "Five Machines", href: "#prebuilts", badge: "The Manifest" },
    { name: "Laptop Service", href: "#laptop-service" },
    { name: "Why Games World", href: "#why-us" },
    { name: "Store & Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Name */}
          <a href="#hero" className="flex items-center gap-3 group flex-shrink-0">
            <div className="relative">
              <img 
                src={COMPANY_INFO.logo} 
                alt="Games World Small G Emblem" 
                className="h-12 w-12 sm:h-14 sm:w-14 object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1 font-display tracking-wider text-xl sm:text-2xl lg:text-3xl leading-none">
                <span className="text-slate-900 font-black">GAMES</span>
                <span className="text-red-600 group-hover:text-red-700 transition-colors">WORLD</span>
              </div>
              <span className="text-[9px] sm:text-[10px] text-slate-500 font-tech tracking-widest-plus uppercase font-bold mt-0.5">
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
                className="relative px-3.5 py-2 text-xs font-tech font-bold uppercase tracking-wider text-slate-700 hover:text-red-600 transition-colors duration-200 group"
              >
                <span>{link.name}</span>
                {link.badge && (
                  <span className="ml-1.5 px-2 py-0.5 text-[9px] font-tech font-bold uppercase rounded-full bg-red-50 text-red-600 border border-red-200 tracking-wider">
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
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-tech font-extrabold uppercase tracking-wider shadow-md hover:shadow-red-btn transition-all transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Get Free Quote</span>
            </button>

            {/* Cart Trigger */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 hover:text-red-600 transition-colors group"
              title="View Cart"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-105 transition-transform" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-extrabold text-white shadow-md animate-bounce">
                  {cartItems.length}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 shadow-xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-tech font-bold text-slate-800 hover:text-red-600 hover:bg-slate-50 border border-transparent hover:border-slate-200"
            >
              <span>{link.name}</span>
              {link.badge && (
                <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-red-50 text-red-600 border border-red-200">
                  {link.badge}
                </span>
              )}
            </a>
          ))}
          <div className="pt-4 border-t border-slate-200 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-red-600 text-white font-tech font-extrabold tracking-wider uppercase text-xs shadow-md"
            >
              <Sparkles className="w-4 h-4" />
              <span>Book Free Consultation</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
