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
    { name: "Five Machines", href: "#prebuilts", badge: "The 5 Purposes" },
    { name: "Custom Configurator", href: "#pc-builder" },
    { name: "Laptop Service", href: "#laptop-service" },
    { name: "Why Games World", href: "#why-us" },
    { name: "Store & Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0a0e17]/95 backdrop-blur-md border-b border-slate-800">
      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Name with Small G Controller Emblem */}
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
                <span className="text-white">GAMES</span>
                <span className="text-red-500 group-hover:text-teal-400 transition-colors">WORLD</span>
              </div>
              <span className="text-[9px] sm:text-[10px] text-teal-400/80 font-tech tracking-widest-plus uppercase font-bold mt-0.5">
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
                className="relative px-3 py-2 text-xs font-tech font-bold uppercase tracking-wider text-slate-300 hover:text-white transition-colors duration-200 group"
              >
                <span>{link.name}</span>
                {link.badge && (
                  <span className="ml-1.5 px-1.5 py-0.5 text-[9px] font-tech font-bold uppercase rounded bg-teal-500 text-slate-950 tracking-wider">
                    {link.badge}
                  </span>
                )}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-400 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Free Consultation Button */}
            <button
              onClick={onOpenConsultation}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-tech font-extrabold uppercase tracking-wider shadow-cyan-glow transition-all transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-slate-950" />
              <span>Get Free Quote</span>
            </button>

            {/* Cart / Build Summary Trigger */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-teal-500/60 text-slate-200 hover:text-white transition-colors group"
              title="View Build Summary"
            >
              <ShoppingBag className="w-5 h-5 group-hover:text-teal-400 transition-colors" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-teal-500 text-[10px] font-extrabold text-slate-950 shadow-lg animate-bounce">
                  {cartItems.length}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl text-base font-medium text-slate-200 hover:text-white hover:bg-slate-900 border border-transparent hover:border-slate-800"
            >
              <span>{link.name}</span>
              {link.badge && (
                <span className="px-2 py-0.5 text-xs font-bold rounded bg-teal-500 text-slate-950 font-tech">
                  {link.badge}
                </span>
              )}
            </a>
          ))}
          <div className="pt-4 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-teal-500 text-slate-950 font-tech font-extrabold tracking-wider uppercase text-sm shadow-cyan-glow"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Book Free Consultation</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
