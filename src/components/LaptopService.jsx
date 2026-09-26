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
  Send,
  Microscope,
  ThermometerSnowflake,
  Activity,
  Layers
} from 'lucide-react';
import { playClickSound, playMountSound } from '../utils/audioEffects';

const iconMap = {
  Flame,
  CircuitBoard,
  Cpu,
  Monitor,
  Wrench,
  Zap
};

const TEARDOWN_STEPS = [
  {
    step: '01',
    title: 'ESD-Safe Micro-Teardown',
    detail: 'Torque-calibrated disassembly on grounded antistatic mat. High-frequency ultrasonic chassis & dual turbine fan de-oxidation.',
    spec: '0.1mm indexing / 0.35Nm torque limit',
    icon: Wrench
  },
  {
    step: '02',
    title: 'Chip-Level Rail & MOSFET Tracing',
    detail: 'Thermal camera infrared hotspot isolation. Micro-soldering of shorted capacitors, PWM controllers, and DrMOS power stages under 40x magnification.',
    spec: 'FLIR IR <0.5°C delta / 40x Trinocular Microscope',
    icon: Microscope
  },
  {
    step: '03',
    title: 'Phase-Change Kryonaut Repasting',
    detail: 'Mirror-finish vapor chamber polishing. Application of Thermal Grizzly Kryonaut Extreme + K5 Pro viscous thermal pads across VRAM & VRMs.',
    spec: '14.2 W/m-K thermal conductivity / Zero void spread',
    icon: ThermometerSnowflake
  },
  {
    step: '04',
    title: '24-Hour Thermal Burn-In & QA',
    detail: 'Simultaneous 100% CPU Cinebench R23 and 3DMark Time Spy loops. Verified delta-T below 75°C without acoustic fan throttling.',
    spec: '24h loop log provided / 90-day chip warranty',
    icon: Activity
  }
];

export default function LaptopService() {
  const [activeTeardownStep, setActiveTeardownStep] = useState(0);
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
    playMountSound();
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
    <section id="laptop-service" className="py-16 sm:py-20 bg-transparent border-b border-gw-border relative assemble-on-scroll">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-700/60 text-red-500 font-tech font-bold tracking-widest-plus text-xs uppercase mb-2 assemble-down assemble-delay-1">
            <Microscope className="w-3.5 h-3.5 text-red-400 animate-pulse" />
            <span>CHIP-LEVEL MOTHERBOARD & THERMAL REPAIR LAB</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-display tracking-tight text-white assemble-down assemble-delay-2">
            SURGICAL TEARDOWN & <span className="text-red-600">REBUILD BAY</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-300 font-sans assemble-down assemble-delay-3">
            Thermal throttling? Artifacting GPU? Dead power rail? Microscopic chip-level repair and liquid metal repasting for ASUS ROG, Lenovo Legion, Dell Alienware, MSI, HP Omen, and Acer Predator.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* SURGICAL TEARDOWN PIPELINE SCHEMATIC */}
        {/* ========================================================================= */}
        <div className="mb-14 p-5 sm:p-7 rounded-2xl bg-[#0a0a10]/95 border border-red-900/50 shadow-2xl relative overflow-hidden assemble-down assemble-delay-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-gw-border/80 mb-6">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
              <div>
                <h3 className="text-xl font-display tracking-wider text-white flex items-center gap-2">
                  <span>CLEAN-ROOM REBUILD PROTOCOL</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-red-950 text-red-400 border border-red-800 font-tech font-bold uppercase">
                    STAGE {TEARDOWN_STEPS[activeTeardownStep].step} ACTIVE
                  </span>
                </h3>
                <p className="text-[11px] text-gray-400 font-sans">
                  Click any stage below to inspect the microscopic teardown process.
                </p>
              </div>
            </div>
            <div className="text-xs font-tech text-gray-400">
              LAB ENVIRONMENT: <span className="text-emerald-400 font-bold">ESD CLASS 1 • ISO CLASS 7</span>
            </div>
          </div>

          {/* Stepper Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {TEARDOWN_STEPS.map((step, idx) => {
              const StepIcon = step.icon;
              const isActive = activeTeardownStep === idx;
              const delayClass = `assemble-delay-${idx + 1}`;
              return (
                <button
                  key={step.step}
                  onClick={() => {
                    playClickSound();
                    setActiveTeardownStep(idx);
                  }}
                  className={`p-3.5 rounded-xl border text-left transition-all relative assemble-socket ${delayClass} ${
                    isActive
                      ? 'bg-red-950/60 border-red-500 shadow-red-glow text-white'
                      : 'bg-gw-card/80 border-gw-border hover:border-gray-500 text-gray-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-tech font-bold text-red-400">
                      STEP {step.step}
                    </span>
                    <StepIcon className={`w-4 h-4 ${isActive ? 'text-red-400' : 'text-gray-500'}`} />
                  </div>
                  <div className="text-xs font-display tracking-wider text-white font-bold leading-tight">
                    {step.title}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Step Deep Dive Panel */}
          <div className="p-4 sm:p-5 rounded-xl bg-gw-card/90 border border-gw-border/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-xs font-tech font-bold text-red-400 uppercase tracking-wider">
                STAGE SPECIFICATION // {TEARDOWN_STEPS[activeTeardownStep].title}
              </div>
              <p className="text-xs sm:text-sm text-gray-200 font-sans">
                {TEARDOWN_STEPS[activeTeardownStep].detail}
              </p>
            </div>
            <div className="whitespace-nowrap px-3.5 py-2 rounded-lg bg-black/70 border border-red-900/50 text-[11px] font-tech text-red-300">
              TOLERANCE: <span className="font-bold text-white">{TEARDOWN_STEPS[activeTeardownStep].spec}</span>
            </div>
          </div>
        </div>

        {/* Services Grid & Interactive Booking Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Services Cards (Left 7 Cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 assemble-left assemble-delay-3">
            {LAPTOP_SERVICES.map((srv, idx) => {
              const Icon = iconMap[srv.icon] || Wrench;
              const delayClass = `assemble-delay-${(idx % 4) + 1}`;
              return (
                <div 
                  key={srv.id}
                  onClick={playClickSound}
                  className={`p-5 rounded-2xl bg-gw-card border border-gw-border hover:border-red-600/50 transition-all duration-300 flex flex-col justify-between group hover:shadow-lg cursor-pointer assemble-card assemble-up ${delayClass}`}
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
          <div className="lg:col-span-5 bg-gw-card rounded-2xl p-6 sm:p-8 border border-gw-border relative shadow-xl assemble-right assemble-delay-4">
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
