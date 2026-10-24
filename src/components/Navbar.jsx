import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/mockData';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  Sparkles,
  ShieldAlert
} from 'lucide-react';

export default function Navbar({ 
  cartItems = [], 
  onOpenCart, 
  onOpenConsultation,
  onOpenAdmin
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
    <header className="sticky top-0 z-50 bg-[rgb(0,0,0)]/85 backdrop-blur-lg border-b border-[rgba(255,255,255,0.08)]">
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
                <span className="text-soft-mist font-bold">GAMES</span>
                <span className="text-primary group-hover:text-primary-hover transition-colors font-bold">WORLD</span>
              </div>
              <span className="text-[9px] sm:text-[10px] text-[rgba(255,255,255,0.5)] font-tech tracking-widest-plus uppercase font-bold mt-0.5">
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
                {link.badge && (
                  <span className="ml-1.5 px-2 py-0.5 text-[9px] font-tech font-bold uppercase rounded-full bg-primary/10 text-primary border border-primary/30 tracking-wider">
                    {link.badge}
                  </span>
                )}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Free Consultation Button */}
            <button
              onClick={onOpenConsultation}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-tech font-extrabold uppercase tracking-wider shadow-nuke-glow transition-all transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Get Free Quote</span>
            </button>

            {/* Admin Console Quick Trigger */}
            <button
              onClick={onOpenAdmin}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 hover:border-primary/40 text-white/60 hover:text-primary text-xs font-tech font-bold uppercase tracking-wider transition-colors"
              title="Open Admin Console"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-primary" />
              <span>Admin</span>
            </button>

            {/* Cart Trigger */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-xl bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] hover:border-primary/50 text-soft-mist hover:text-primary transition-colors group"
              title="View Cart"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-105 transition-transform" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-extrabold text-white shadow-md animate-bounce">
                  {cartItems.length}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-soft-mist"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[rgb(0,0,0)]/95 backdrop-blur-xl border-b border-[rgba(255,255,255,0.08)] px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-tech font-bold text-soft-mist hover:text-primary hover:bg-[rgba(255,255,255,0.04)] border border-transparent hover:border-[rgba(255,255,255,0.08)]"
            >
              <span>{link.name}</span>
              {link.badge && (
                <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-primary/10 text-primary border border-primary/30">
                  {link.badge}
                </span>
              )}
            </a>
          ))}
          <div className="pt-4 border-t border-[rgba(255,255,255,0.08)] flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-primary text-white font-tech font-extrabold tracking-wider uppercase text-xs shadow-nuke-glow"
            >
              <Sparkles className="w-4 h-4" />
              <span>Book Free Consultation</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white/70 font-tech font-bold tracking-wider uppercase text-xs hover:border-primary/40 hover:text-primary transition-colors"
            >
              <ShieldAlert className="w-4 h-4 text-primary" />
              <span>Admin Console (Quotes, Pricing & Deals)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
