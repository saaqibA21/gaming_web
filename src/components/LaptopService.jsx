import React, { useState } from 'react';
import { LAPTOP_SERVICES, COMPANY_INFO } from '../data/mockData';
import { 
  Laptop, 
  Flame, 
  CircuitBoard, 
  Cpu, 
  Monitor, 
  Wrench, 
  Zap, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  ArrowRight,
  Send
} from 'lucide-react';

const iconMap = {
  Flame,
  CircuitBoard,
  Cpu,
  Monitor,
  Wrench,
  Zap
};

export default function LaptopService() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    laptopModel: '',
    issue: 'Overheating & Thermal Throttling (Thermal Repaste)',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = `*GAMES WORLD CHENNAI - LAPTOP SERVICE REQUEST*
Name: ${formData.name}
Phone: ${formData.phone}
Laptop Model: ${formData.laptopModel}
Reported Issue: ${formData.issue}
Notes: ${formData.notes || 'None'}
---------------------------------
Please arrange a diagnostic consultation / walk-in slot.`;

    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="laptop-service" className="py-16 sm:py-20 bg-[#070709]/85 backdrop-blur-md border-b border-gw-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-red-500 font-tech font-bold tracking-widest-plus text-xs uppercase mb-2">
            CHIP-LEVEL MOTHERBOARD & THERMAL REPAIR LAB
          </div>
          <h2 className="text-4xl sm:text-6xl font-display tracking-tight text-white">
            GAMING LAPTOP <span className="text-red-600">SERVICE</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-300 font-sans">
            Thermal throttling? Artifacting GPU? Dead power rail? Microscopic chip-level repair for ASUS ROG, Lenovo Legion, Dell Alienware, MSI, HP Omen, and Acer Predator.
          </p>
        </div>

        {/* Services Grid & Interactive Booking Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Services Cards (Left 7 Cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {LAPTOP_SERVICES.map((srv) => {
              const Icon = iconMap[srv.icon] || Wrench;
              return (
                <div 
                  key={srv.id}
                  className="p-5 rounded-2xl bg-gw-card border border-gw-border hover:border-red-600/50 transition-all duration-300 flex flex-col justify-between group hover:shadow-lg"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-red-600/15 text-red-500 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-display tracking-wider text-white leading-snug group-hover:text-red-400 transition-colors">
                      {srv.title}
                    </h3>
                    <p className="text-xs text-gray-300 font-sans mt-2 leading-relaxed">
                      {srv.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gw-border/60 flex items-center justify-between text-xs font-tech">
                    <span className="flex items-center gap-1 text-gray-400">
                      <Clock className="w-3.5 h-3.5 text-red-500" />
                      {srv.time}
                    </span>
                    <span className="font-bold text-red-400">
                      {srv.price}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Service Booking Card (Right 5 Cols) */}
          <div className="lg:col-span-5 bg-gw-card rounded-2xl p-6 sm:p-8 border border-gw-border relative shadow-xl">
            <div className="space-y-1 mb-6">
              <span className="text-[10px] font-tech font-bold uppercase text-red-500 tracking-widest-plus">Direct Diagnostics</span>
              <h3 className="text-3xl font-display tracking-wider text-white">
                BOOK A DIAGNOSTIC
              </h3>
              <p className="text-xs text-gray-400 font-sans">
                Free initial diagnosis. Walk-in at Athipatten Street, Chennai or talk to our technician.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
              <div>
                <label className="block text-gray-300 font-semibold mb-1">Full Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Anand Kumar"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-gw-border text-white focus:outline-none focus:border-red-500 text-xs font-sans"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">WhatsApp Phone Number</label>
                <input 
                  type="tel" 
                  required
                  placeholder="+91 9876543210"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-gw-border text-white focus:outline-none focus:border-red-500 text-xs font-sans"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Laptop Model & Brand</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. ASUS ROG Strix G15 / Lenovo Legion 5"
                  value={formData.laptopModel}
                  onChange={(e) => setFormData({...formData, laptopModel: e.target.value})}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-gw-border text-white focus:outline-none focus:border-red-500 text-xs font-sans"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Primary Problem</label>
                <select 
                  value={formData.issue}
                  onChange={(e) => setFormData({...formData, issue: e.target.value})}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-gw-border text-white focus:outline-none focus:border-red-500 text-xs font-sans"
                >
                  <option>Overheating & Thermal Throttling (Thermal Repaste)</option>
                  <option>Dead Laptop / Not Powering On (Motherboard Repair)</option>
                  <option>GPU Artifacting / BSOD Code 43 (GPU Repair)</option>
                  <option>Broken / Flickering Display Screen</option>
                  <option>Broken Hinges or Body Damage</option>
                  <option>Liquid Spill / Water Damage</option>
                  <option>RAM / SSD Speed Upgrade</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Additional Symptoms (Optional)</label>
                <textarea 
                  rows={2}
                  placeholder="Describe when the issue occurs..."
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-gw-border text-white focus:outline-none focus:border-red-500 text-xs resize-none font-sans"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-tech font-bold uppercase tracking-wider text-xs shadow-red-glow transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Service Request via WhatsApp</span>
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-gw-border/60 space-y-1.5 text-[11px] text-gray-300 font-sans">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Genuine Thermal Grizzly Kryonaut & OEM thermal pads</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Up to 90 days repair warranty on motherboard fixes</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
