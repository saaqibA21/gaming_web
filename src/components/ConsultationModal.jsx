import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/mockData';
import { Sparkles, Phone, Video, Send, CheckCircle2, X } from 'lucide-react';

export default function ConsultationModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    budget: '₹80,000 - ₹1,20,000',
    primaryUse: 'Competitive Esports (Valorant, CS2, Apex)',
    consultationType: 'WhatsApp Chat & Call',
    preferredTime: 'Anytime Today'
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = `*GAMES WORLD FREE EXPERT CONSULTATION REQUEST*
Name: ${formData.name}
Phone: ${formData.phone}
Target Budget: ${formData.budget}
Primary Workload: ${formData.primaryUse}
Mode: ${formData.consultationType}
Preferred Time: ${formData.preferredTime}
---------------------------------
Please connect me with a hardware specialist for build guidance.`;

    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#0f0f16] border border-red-600/50 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-red-500 mb-1">
          <Sparkles className="w-4 h-4" />
          <span className="text-xs font-tech font-bold tracking-widest-plus uppercase">Direct Hardware Consultation</span>
        </div>

        <h3 className="text-3xl font-display tracking-wider text-white">
          TALK TO PRADHAAN & TEAM
        </h3>
        <p className="text-xs text-gray-300 font-sans mt-1 mb-6">
          Avoid overpaying on mismatched parts. Get a solid component quotation with zero assembly charge.
        </p>

        {submitted ? (
          <div className="p-8 text-center space-y-3 bg-red-950/20 rounded-xl border border-red-800/40">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h4 className="text-lg font-black font-gamer text-white">REQUEST DISPATCHED!</h4>
            <p className="text-xs text-gray-300">
              Opening WhatsApp with your consultation details. Our founder & team will assist you immediately.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-gray-300 font-semibold mb-1">Your Name</label>
              <input 
                type="text" 
                required
                placeholder="e.g. Pradeep"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-gw-border text-white focus:outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-semibold mb-1">WhatsApp Mobile Number</label>
              <input 
                type="tel" 
                required
                placeholder="+91 9876543210"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-gw-border text-white focus:outline-none focus:border-red-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-gray-300 font-semibold mb-1">Approx. Budget</label>
                <select 
                  value={formData.budget}
                  onChange={(e) => setFormData({...formData, budget: e.target.value})}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-gw-border text-white focus:outline-none focus:border-red-500"
                >
                  <option>Under ₹50,000</option>
                  <option>₹50,000 - ₹80,000</option>
                  <option>₹80,000 - ₹1,20,000</option>
                  <option>₹1,20,000 - ₹2,00,000</option>
                  <option>₹2,00,000 - ₹3,50,000+</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Primary Purpose</label>
                <select 
                  value={formData.primaryUse}
                  onChange={(e) => setFormData({...formData, primaryUse: e.target.value})}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-gw-border text-white focus:outline-none focus:border-red-500"
                >
                  <option>Competitive Esports (Valorant, CS2)</option>
                  <option>AAA 1440p / 4K Gaming</option>
                  <option>Game Streaming & Content Creation</option>
                  <option>AI Deep Learning & LLMs</option>
                  <option>3D Architecture & Video Editing</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-gray-300 font-semibold mb-1">Consultation Mode</label>
              <div className="grid grid-cols-2 gap-3">
                <label className="flex items-center gap-2 p-2.5 rounded-lg border border-gw-border bg-black/40 cursor-pointer">
                  <input 
                    type="radio" 
                    name="mode" 
                    checked={formData.consultationType.includes('WhatsApp')}
                    onChange={() => setFormData({...formData, consultationType: 'WhatsApp Chat & Call'})}
                    className="accent-red-600"
                  />
                  <span className="text-gray-200">WhatsApp / Call</span>
                </label>

                <label className="flex items-center gap-2 p-2.5 rounded-lg border border-gw-border bg-black/40 cursor-pointer">
                  <input 
                    type="radio" 
                    name="mode" 
                    checked={formData.consultationType.includes('Video')}
                    onChange={() => setFormData({...formData, consultationType: 'Video Call Consultation'})}
                    className="accent-red-600"
                  />
                  <span className="text-gray-200">Video Call</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-tech font-bold uppercase tracking-wider text-xs shadow-red-glow transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Connect with Expert</span>
            </button>
          </form>
        )}

        <div className="mt-4 pt-3 border-t border-gw-border/50 text-[11px] text-gray-400 text-center">
          Founder: {COMPANY_INFO.founder} • Direct Line: {COMPANY_INFO.primaryPhone}
        </div>

      </div>
    </div>
  );
}
