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
      `*GAMES WORLD - ORDER INQUIRY*\n\nSelected Machines:\n${itemsList}\n\n*Total Estimate: ₹${totalAmount.toLocaleString('en-IN')}*\n\nHello Games World, I would like to confirm availability and dispatch for this build!`
    );
    window.open(`https://wa.me/919840000000?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0a0a0a] border-l border-white/[0.08] p-6 shadow-2xl flex flex-col justify-between font-sans">
          
          {/* Header */}
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <h3 className="text-2xl font-display tracking-wider text-soft-mist">YOUR CART ({cartItems.length})</h3>
              </div>
              <button 
                onClick={onClose}
                className="p-1.5 rounded-lg text-white/50 hover:text-soft-mist hover:bg-white/[0.06] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items List */}
            <div className="mt-6 space-y-4 max-h-[60vh] overflow-y-auto pr-1">
              {cartItems.length === 0 ? (
                <div className="text-center py-16 text-white/50 space-y-3">
                  <ShoppingBag className="w-12 h-12 mx-auto text-white/20" />
                  <p className="text-sm font-medium">Your cart is currently empty.</p>
                  <a
                    href="#prebuilts"
                    onClick={onClose}
                    className="inline-block mt-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-hover text-white font-tech font-bold text-xs uppercase tracking-wider shadow-nuke-glow transition-all"
                  >
                    Explore The 5 Machines
                  </a>
                </div>
              ) : (
                cartItems.map((item, idx) => (
                  <div 
                    key={item.id || idx}
                    className="p-3.5 rounded-xl animate-glass border border-white/[0.08] flex items-start gap-3 relative group"
                  >
                    {item.image && (
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-16 h-16 rounded-lg object-cover bg-black/40 flex-shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0 pr-6">
                      <h4 className="text-xs font-bold text-soft-mist leading-snug truncate">
                        {item.name}
                      </h4>
                      <div className="text-xl font-display tracking-wider text-primary mt-1">
                        ₹{item.price.toLocaleString('en-IN')}
                      </div>
                      <span className="text-[10px] text-white/40 font-tech uppercase font-semibold">3-Year Hardware Warranty</span>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id || idx)}
                      className="absolute top-3 right-3 text-white/40 hover:text-primary transition-colors"
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
            <div className="pt-4 border-t border-white/[0.08] space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-white/50 font-tech uppercase font-semibold">Total (GST Included):</span>
                <span className="text-3xl font-display tracking-wider text-soft-mist">
                  ₹{totalAmount.toLocaleString('en-IN')}
                </span>
              </div>

              {orderSubmitted ? (
                <div className="p-4 rounded-xl bg-primary/10 border border-primary/30 text-center space-y-1">
                  <div className="flex items-center justify-center gap-1.5 text-primary font-tech font-bold text-sm uppercase">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>ORDER TICKET GENERATED!</span>
                  </div>
                  <div className="text-xs text-white/70">
                    Your build configuration invoice has been prepared for dispatch processing.
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <button
                    onClick={handleCheckout}
                    className="w-full py-3.5 rounded-xl bg-primary hover:bg-hover text-white font-tech font-extrabold text-xs uppercase tracking-wider shadow-nuke-glow flex items-center justify-center gap-2 transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Order Request</span>
                  </button>

                  <button
                    onClick={handleWhatsAppOrder}
                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-tech font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send Order to WhatsApp</span>
                  </button>
                </div>
              )}

              <button
                onClick={onClearCart}
                className="w-full py-2 text-center text-xs text-white/40 hover:text-soft-mist font-tech uppercase transition-colors"
              >
                Clear Entire Cart
              </button>

              <div className="text-[10px] text-white/40 text-center font-sans">
                PAN-India Insured Shipping • High-Density Foam Wooden Crating
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
