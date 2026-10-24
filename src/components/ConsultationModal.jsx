import React, { useState } from 'react';
import { COMPANY_INFO, DECLARATION_INFO } from '../data/mockData';
import { Sparkles, Phone, Video, Send, CheckCircle2, X } from 'lucide-react';

export default function ConsultationModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    budget: '₹80,000 - ₹1,20,000',
    primaryUse: '02. Striker // Entry Gaming & Esports',
    consultationType: 'Direct Call',
    preferredTime: 'Anytime Today'
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 animate-fadeIn">
      <div className="bg-slate-900 border border-teal-500/50 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative text-white">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-teal-400 mb-1">
          <Sparkles className="w-4 h-4 text-teal-400" />
          <span className="text-xs font-tech font-bold tracking-widest-plus uppercase">Direct Hardware Consultation</span>
        </div>

        <h3 className="text-3xl font-display tracking-wider text-white">
          DISCUSS YOUR MACHINE PURPOSE
        </h3>
        <p className="text-xs text-slate-300 font-sans mt-1 mb-6">
          "Everyone sells a computer. Nobody sells a purpose." Connect directly with Raakesh and get verified hardware guidance with zero assembly charge.
        </p>

        {submitted ? (
          <div className="p-8 text-center space-y-3 bg-teal-950/40 rounded-xl border border-teal-800/40">
            <CheckCircle2 className="w-12 h-12 text-teal-400 mx-auto" />
            <h4 className="text-lg font-tech font-bold text-white uppercase">REQUEST RECEIVED</h4>
            <p className="text-xs text-slate-300">
              Raakesh and our senior build technicians have received your purpose and will call you with your exact machine breakdown.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Your Name</label>
              <input 
                type="text" 
                required
                placeholder="e.g. Pradeep"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-teal-400"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Mobile / WhatsApp Number</label>
              <input 
                type="tel" 
                required
                placeholder="+91 9876543210"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-teal-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Target Budget</label>
                <select 
                  value={formData.budget}
                  onChange={(e) => setFormData({...formData, budget: e.target.value})}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-teal-400"
                >
                  <option>₹49,999 (01. Workhorse)</option>
                  <option>₹72,999 (02. Striker)</option>
                  <option>₹1,19,999 (03. Monster)</option>
                  <option>₹1,54,999 (04. Forge)</option>
                  <option>₹2,09,999+ (05. Oracle / AI)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Machine Purpose</label>
                <select 
                  value={formData.primaryUse}
                  onChange={(e) => setFormData({...formData, primaryUse: e.target.value})}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-teal-400"
                >
                  <option>01. Workhorse // Office & Corporate</option>
                  <option>02. Striker // Entry Gaming & Esports</option>
                  <option>03. Monster // Gaming + Editing Hybrid</option>
                  <option>04. Forge // Content Creation & 3D</option>
                  <option>05. Oracle // Local AI & LLM</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Consultation Mode</label>
              <div className="grid grid-cols-2 gap-3">
                <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-800 bg-slate-950 cursor-pointer">
                  <input 
                    type="radio" 
                    name="mode" 
                    checked={formData.consultationType === 'Direct Call'}
                    onChange={() => setFormData({...formData, consultationType: 'Direct Call'})}
                    className="accent-teal-500"
                  />
                  <span className="text-slate-200">Phone Call</span>
                </label>

                <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-800 bg-slate-950 cursor-pointer">
                  <input 
                    type="radio" 
                    name="mode" 
                    checked={formData.consultationType.includes('Video')}
                    onChange={() => setFormData({...formData, consultationType: 'Video Call Consultation'})}
                    className="accent-teal-500"
                  />
                  <span className="text-slate-200">WhatsApp Video Call</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-tech font-extrabold uppercase tracking-wider text-xs shadow-cyan-glow transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5 text-slate-950" />
              <span>Submit Consultation Request</span>
            </button>
          </form>
        )}

        <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 text-center font-tech uppercase tracking-wider">
          Games World Hardware Desk • Athipatten Street, Chennai
        </div>

      </div>
    </div>
  );
}
