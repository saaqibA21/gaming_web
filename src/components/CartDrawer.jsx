import React from 'react';
import { COMPANY_INFO } from '../data/mockData';
import { X, Trash2, ShoppingBag, Share2 } from 'lucide-react';

export default function CartDrawer({ isOpen, onClose, cartItems = [], onRemoveItem, onClearCart }) {
  if (!isOpen) return null;

  const totalAmount = cartItems.reduce((acc, item) => acc + (item.price || 0), 0);

  const handleCheckoutWhatsApp = () => {
    let msg = `*GAMES WORLD CHENNAI - CART CHECKOUT*\nDate: ${new Date().toLocaleDateString('en-IN')}\n\n`;
    cartItems.forEach((item, idx) => {
      msg += `${idx + 1}. *${item.name}* - ₹${item.price.toLocaleString('en-IN')}\n`;
    });
    msg += `\n*TOTAL ESTIMATE: ₹${totalAmount.toLocaleString('en-IN')}*\n`;
    msg += `• GST & Invoice Included\n• 3-Year Hardware Warranty\n\nPlease confirm stock and dispatch!`;

    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0f0f16] border-l border-gw-border p-6 shadow-2xl flex flex-col justify-between font-sans">
          
          {/* Header */}
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-gw-border">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-red-500" />
                <h3 className="text-2xl font-display tracking-wider text-white">YOUR CART ({cartItems.length})</h3>
              </div>
              <button 
                onClick={onClose}
                className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gw-card transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items List */}
            <div className="mt-6 space-y-4 max-h-[60vh] overflow-y-auto pr-1">
              {cartItems.length === 0 ? (
                <div className="text-center py-16 text-gray-400 space-y-3">
                  <ShoppingBag className="w-12 h-12 mx-auto text-gray-600" />
                  <p className="text-sm">Your cart is currently empty.</p>
                  <a
                    href="#pc-builder"
                    onClick={onClose}
                    className="inline-block mt-2 px-5 py-2.5 rounded-lg bg-red-600 text-white font-tech font-bold text-xs uppercase tracking-wider"
                  >
                    Open PC Configurator
                  </a>
                </div>
              ) : (
                cartItems.map((item, idx) => (
                  <div 
                    key={item.id || idx}
                    className="p-3.5 rounded-xl bg-gw-card border border-gw-border flex items-start gap-3 relative group"
                  >
                    {item.image && (
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-16 h-16 rounded-lg object-cover bg-black flex-shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0 pr-6">
                      <h4 className="text-xs font-bold text-white leading-snug truncate">
                        {item.name}
                      </h4>
                      <div className="text-xl font-display tracking-wider text-red-500 mt-1">
                        ₹{item.price.toLocaleString('en-IN')}
                      </div>
                      <span className="text-[10px] text-gray-400 font-tech uppercase">3-Year Hardware Warranty</span>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id || idx)}
                      className="absolute top-3 right-3 text-gray-500 hover:text-red-400 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Footer Checkout */}
          {cartItems.length > 0 && (
            <div className="pt-4 border-t border-gw-border space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-gray-400 font-tech uppercase">Total (GST Included):</span>
                <span className="text-3xl font-display tracking-wider text-red-500">
                  ₹{totalAmount.toLocaleString('en-IN')}
                </span>
              </div>

              <button
                onClick={handleCheckoutWhatsApp}
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-tech font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all"
              >
                <Share2 className="w-4 h-4" />
                <span>Complete Order via WhatsApp</span>
              </button>

              <button
                onClick={onClearCart}
                className="w-full py-2 text-center text-xs text-gray-400 hover:text-white font-tech uppercase transition-colors"
              >
                Clear Entire Cart
              </button>

              <div className="text-[10px] text-gray-500 text-center font-sans">
                PAN-India Free Insured Shipping • Safe Transit Wooden Packaging
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
