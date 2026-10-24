import React, { useState } from 'react';
import { COMPANY_INFO, DECLARATION_INFO } from '../data/mockData';
import { adminStorage } from '../utils/adminStorage';
import { Sparkles, Phone, Video, Send, CheckCircle2, X } from 'lucide-react';

export default function ConsultationModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    budget: '₹72,999 (02. Striker)',
    primaryUse: '02. Striker // Entry Gaming & Esports',
    consultationType: 'Direct Call',
    preferredTime: 'Anytime Today'
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Parse numeric amount from budget
    const numericMatch = formData.budget.replace(/[^0-9]/g, '');
    const amount = numericMatch ? Number(numericMatch) : 72999;

    adminStorage.addQuote({
      type: 'consultation',
      customerName: formData.name,
      phone: formData.phone,
      targetBudget: formData.budget,
      machinePurpose: formData.primaryUse,
      consultationMode: formData.consultationType,
      notes: `Requested ${formData.consultationType} for ${formData.primaryUse}`,
      amount
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#0e0e0e] border border-white/[0.1] rounded-2xl max-w-lg w-full p-5 sm:p-8 shadow-2xl relative text-soft-mist max-h-[92vh] overflow-y-auto">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/40 hover:text-soft-mist transition-colors p-1.5 rounded-lg min-h-[36px] min-w-[36px] flex items-center justify-center"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-primary mb-1">
          <Sparkles className="w-4 h-4 text-primary shrink-0" />
          <span className="text-[10px] sm:text-xs font-tech font-bold tracking-widest-plus uppercase">Direct Hardware Consultation</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-display tracking-wider text-soft-mist">
          DISCUSS YOUR MACHINE PURPOSE
        </h3>
        <p className="text-xs text-white/60 font-sans mt-1 mb-5 sm:mb-6">
          "Everyone sells a computer. Nobody sells a purpose." Connect directly with our build team and get verified hardware guidance with zero assembly charge.
        </p>

        {submitted ? (
          <div className="p-6 sm:p-8 text-center space-y-3 bg-primary/10 rounded-xl border border-primary/30">
            <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-400 mx-auto" />
            <h4 className="text-base sm:text-lg font-tech font-bold text-soft-mist uppercase">REQUEST RECEIVED</h4>
            <p className="text-xs text-white/70">
              Our senior build technicians have received your purpose and will call you with your exact machine breakdown.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4 text-xs font-sans">
            <div>
              <label className="block text-white/70 font-semibold mb-1">Your Name</label>
              <input 
                type="text" 
                required
                placeholder="e.g. Pradeep"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3.5 py-3 sm:py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-soft-mist placeholder-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 text-base sm:text-xs min-h-[44px]"
              />
            </div>

            <div>
              <label className="block text-white/70 font-semibold mb-1">Mobile / WhatsApp Number</label>
              <input 
                type="tel" 
                required
                placeholder="+91 9876543210"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-3.5 py-3 sm:py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-soft-mist placeholder-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 text-base sm:text-xs min-h-[44px]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-white/70 font-semibold mb-1">Target Budget</label>
                <select 
                  value={formData.budget}
                  onChange={(e) => setFormData({...formData, budget: e.target.value})}
                  className="w-full px-3.5 py-3 sm:py-2.5 rounded-xl bg-[#141414] border border-white/10 text-soft-mist focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 text-base sm:text-xs min-h-[44px]"
                >
                  <option className="bg-[#141414] text-soft-mist">₹49,999 (01. Workhorse)</option>
                  <option className="bg-[#141414] text-soft-mist">₹72,999 (02. Striker)</option>
                  <option className="bg-[#141414] text-soft-mist">₹1,19,999 (03. Monster)</option>
                  <option className="bg-[#141414] text-soft-mist">₹1,54,999 (04. Forge)</option>
                  <option className="bg-[#141414] text-soft-mist">₹2,09,999+ (05. Oracle / AI)</option>
                </select>
              </div>

              <div>
                <label className="block text-white/70 font-semibold mb-1">Machine Purpose</label>
                <select 
                  value={formData.primaryUse}
                  onChange={(e) => setFormData({...formData, primaryUse: e.target.value})}
                  className="w-full px-3.5 py-3 sm:py-2.5 rounded-xl bg-[#141414] border border-white/10 text-soft-mist focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 text-base sm:text-xs min-h-[44px]"
                >
                  <option className="bg-[#141414] text-soft-mist">01. Workhorse // Office & Corporate</option>
                  <option className="bg-[#141414] text-soft-mist">02. Striker // Entry Gaming & Esports</option>
                  <option className="bg-[#141414] text-soft-mist">03. Monster // Gaming + Editing Hybrid</option>
                  <option className="bg-[#141414] text-soft-mist">04. Forge // Content Creation & 3D</option>
                  <option className="bg-[#141414] text-soft-mist">05. Oracle // Local AI & LLM</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-white/70 font-semibold mb-1">Consultation Mode</label>
              <div className="grid grid-cols-2 gap-3">
                <label className="flex items-center gap-2 p-3 sm:p-2.5 rounded-xl border border-white/10 bg-white/[0.03] cursor-pointer hover:border-white/20 transition-colors min-h-[44px]">
                  <input 
                    type="radio" 
                    name="mode" 
                    checked={formData.consultationType === 'Direct Call'}
                    onChange={() => setFormData({...formData, consultationType: 'Direct Call'})}
                    className="accent-[#FF5123]"
                  />
                  <span className="text-soft-mist font-medium text-xs sm:text-xs">Phone Call</span>
                </label>

                <label className="flex items-center gap-2 p-3 sm:p-2.5 rounded-xl border border-white/10 bg-white/[0.03] cursor-pointer hover:border-white/20 transition-colors min-h-[44px]">
                  <input 
                    type="radio" 
                    name="mode" 
                    checked={formData.consultationType.includes('Video')}
                    onChange={() => setFormData({...formData, consultationType: 'Video Call Consultation'})}
                    className="accent-[#FF5123]"
                  />
                  <span className="text-soft-mist font-medium text-xs sm:text-xs">WhatsApp Video</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 sm:py-4 rounded-xl bg-primary hover:bg-hover text-white font-tech font-extrabold uppercase tracking-wider text-xs sm:text-sm shadow-nuke-glow transition-all flex items-center justify-center gap-2 min-h-[46px]"
            >
              <Send className="w-3.5 h-3.5 text-white" />
              <span>Submit Consultation Request</span>
            </button>
          </form>
        )}

        <div className="mt-4 pt-3 border-t border-white/[0.08] text-center text-[10px] text-white/40">
          ATHIPATTEN STREET, CHENNAI • ZERO ASSEMBLY FEE ON ALL BUILDS
        </div>
      </div>
    </div>
  );
}
