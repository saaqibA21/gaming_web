import React from 'react';
import { COMPANY_INFO } from '../data/mockData';
import { MessageSquare } from 'lucide-react';

export default function StickyWhatsApp() {
  return (
    <aside aria-label="Quick contact" className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Tooltip bubble on hover */}
      <div className="hidden md:flex items-center px-3 py-1.5 rounded-xl bg-black/90 border border-gw-border text-xs text-gray-200 shadow-xl backdrop-blur-sm">
        <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-ping"></span>
        <span>Chat with PC Architect</span>
      </div>

      <a
        href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=Hi%20Games%20World!%20I'm%20visiting%20your%20website%20and%20want%20to%20discuss%20a%20PC%20build/service.`}
        target="_blank"
        rel="noreferrer"
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white flex items-center justify-center shadow-lg shadow-emerald-950/70 hover:scale-110 transition-transform duration-300 relative group"
        title="Chat with Games World on WhatsApp"
      >
        <MessageSquare className="w-7 h-7" />
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 text-[9px] font-bold text-white items-center justify-center">1</span>
        </span>
      </a>
    </aside>
  );
}
