import React from 'react';
import { COMPANY_INFO } from '../data/mockData';
import { ShoppingBag } from 'lucide-react';

export default function Navbar({ 
  cartItems = [], 
  onOpenCart
}) {
  return (
    <header className="sticky top-0 z-50 bg-[#070709] border-b border-gw-border">
      {/* Main Navigation Bar - Only Logo and Words */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Words */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="relative">
              <img 
                src={COMPANY_INFO.logo} 
                alt="Games World Logo" 
                className="h-14 w-auto object-contain filter drop-shadow-[0_0_12px_rgba(229,9,20,0.5)] group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1 font-display tracking-wider text-2xl sm:text-3xl leading-none">
                <span className="text-white">GAMES</span>
                <span className="text-red-600 group-hover:text-red-500 transition-colors drop-shadow-[0_0_10px_rgba(229,9,20,0.8)]">WORLD</span>
              </div>
              <span className="text-[10px] sm:text-xs text-gray-300 font-tech tracking-widest-plus uppercase font-bold mt-1">
                PLAY • CONNECT • COMPETE
              </span>
            </div>
          </a>

          {/* Cart Trigger (shown when items are present) */}
          {cartItems.length > 0 && (
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-lg bg-gw-card border border-gw-border hover:border-red-600/60 text-gray-200 hover:text-white transition-colors group"
              title="View Build Summary"
            >
              <ShoppingBag className="w-5 h-5 text-red-500 transition-colors" />
              <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white shadow-lg animate-bounce">
                {cartItems.length}
              </span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

