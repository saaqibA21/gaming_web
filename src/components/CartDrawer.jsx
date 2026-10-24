import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, CheckCircle2, Send, MessageSquare } from 'lucide-react';

export default function CartDrawer({ isOpen, onClose, cartItems = [], onRemoveItem, onClearCart }) {
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  if (!isOpen) return null;

  const totalAmount = cartItems.reduce((acc, item) => acc + (item.price || 0), 0);

  const handleCheckout = () => {
    setOrderSubmitted(true);
    setTimeout(() => {
      onClearCart();
      setOrderSubmitted(false);
      onClose();
    }, 3000);
  };

  const handleWhatsAppOrder = () => {
    const itemsList = cartItems.map(item => `• ${item.name} - ₹${item.price.toLocaleString('en-IN')}`).join('\n');
    const message = encodeURIComponent(
      `*GAMES WORLD - ORDER INQUIRY*\n\nItems in Cart:\n${itemsList}\n\n*Total Estimate: ₹${totalAmount.toLocaleString('en-IN')}*\n\nHello Games World, I would like to confirm availability and dispatch for this build!`
    );
    window.open(`https://wa.me/919840000000?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/85 animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 p-6 shadow-2xl flex flex-col justify-between font-sans">
          
          {/* Header */}
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-teal-400" />
                <h3 className="text-2xl font-display tracking-wider text-white">YOUR CART ({cartItems.length})</h3>
              </div>
              <button 
                onClick={onClose}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items List */}
            <div className="mt-6 space-y-4 max-h-[60vh] overflow-y-auto pr-1">
              {cartItems.length === 0 ? (
                <div className="text-center py-16 text-slate-400 space-y-3">
                  <ShoppingBag className="w-12 h-12 mx-auto text-slate-600" />
                  <p className="text-sm">Your cart is currently empty.</p>
                  <a
                    href="#prebuilts"
                    onClick={onClose}
                    className="inline-block mt-2 px-5 py-2.5 rounded-xl bg-teal-500 text-slate-950 font-tech font-bold text-xs uppercase tracking-wider shadow-cyan-glow"
                  >
                    Explore The 5 Machines
                  </a>
                </div>
              ) : (
                cartItems.map((item, idx) => (
                  <div 
                    key={item.id || idx}
                    className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3 relative group"
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
                      <div className="text-xl font-display tracking-wider text-teal-400 mt-1">
                        ₹{item.price.toLocaleString('en-IN')}
                      </div>
                      <span className="text-[10px] text-slate-400 font-tech uppercase">3-Year Hardware Warranty</span>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id || idx)}
                      className="absolute top-3 right-3 text-slate-500 hover:text-red-400 transition-colors"
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
            <div className="pt-4 border-t border-slate-800 space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-slate-400 font-tech uppercase">Total (GST Included):</span>
                <span className="text-3xl font-display tracking-wider text-teal-400">
                  ₹{totalAmount.toLocaleString('en-IN')}
                </span>
              </div>

              {orderSubmitted ? (
                <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800 text-center space-y-1">
                  <div className="flex items-center justify-center gap-1.5 text-teal-300 font-tech font-bold text-sm uppercase">
                    <CheckCircle2 className="w-4 h-4 text-teal-400" />
                    <span>ORDER TICKET GENERATED!</span>
                  </div>
                  <div className="text-xs text-slate-300">
                    Your configuration invoice has been prepared for dispatch processing.
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <button
                    onClick={handleCheckout}
                    className="w-full py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-tech font-extrabold text-xs uppercase tracking-wider shadow-cyan-glow flex items-center justify-center gap-2 transition-all"
                  >
                    <Send className="w-4 h-4 text-slate-950" />
                    <span>Submit Order Request</span>
                  </button>

                  <button
                    onClick={handleWhatsAppOrder}
                    className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-teal-300 font-tech font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                  >
                    <MessageSquare className="w-4 h-4 text-teal-400" />
                    <span>Send Order to WhatsApp</span>
                  </button>
                </div>
              )}

              <button
                onClick={onClearCart}
                className="w-full py-2 text-center text-xs text-slate-400 hover:text-white font-tech uppercase transition-colors"
              >
                Clear Entire Cart
              </button>

              <div className="text-[10px] text-slate-500 text-center font-sans">
                PAN-India Insured Shipping • High-Density Foam Wooden Crating
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
