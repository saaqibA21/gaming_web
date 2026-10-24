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
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        phone: '',
        laptopModel: '',
        issue: 'Overheating & Thermal Throttling (Thermal Repaste)',
        notes: ''
      });
    }, 4000);
  };

  return (
    <section id="laptop-service" className="py-20 sm:py-28 bg-mode-black border-b border-white/[0.08] relative assemble-on-scroll">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-tech font-bold tracking-widest-plus text-xs uppercase mb-3 assemble-down assemble-delay-1">
            <Microscope className="w-3.5 h-3.5 text-primary" />
            <span>CHIP-LEVEL MOTHERBOARD & THERMAL REPAIR LAB</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-display tracking-tight text-soft-mist assemble-down assemble-delay-2">
            SURGICAL TEARDOWN & <span className="text-primary">REBUILD BAY</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-white/60 font-sans assemble-down assemble-delay-3">
            Thermal throttling? Artifacting GPU? Dead power rail? Microscopic chip-level repair and liquid metal repasting for ASUS ROG, Lenovo Legion, Dell Alienware, MSI, HP Omen, and Acer Predator.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* SURGICAL TEARDOWN PIPELINE SCHEMATIC */}
        {/* ========================================================================= */}
        <div className="mb-14 p-6 sm:p-8 rounded-2xl animate-glass border border-white/[0.08] relative overflow-hidden assemble-down assemble-delay-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.08] mb-6">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
              <div>
                <h3 className="text-xl font-display tracking-wider text-soft-mist flex items-center gap-2">
                  <span>CLEAN-ROOM REBUILD PROTOCOL</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/30 font-tech font-bold uppercase">
                    STAGE {TEARDOWN_STEPS[activeTeardownStep].step} ACTIVE
                  </span>
                </h3>
                <p className="text-[11px] text-white/50 font-sans mt-0.5">
                  Click any stage below to inspect the microscopic teardown process.
                </p>
              </div>
            </div>
            <div className="text-xs font-tech text-white/60">
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
                  className={`p-4 rounded-xl border text-left transition-all relative assemble-socket ${delayClass} ${
                    isActive
                      ? 'bg-primary/15 border-primary shadow-nuke-glow text-soft-mist ring-1 ring-primary/40'
                      : 'bg-white/[0.02] border-white/[0.08] hover:border-white/20 text-white/60 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-tech font-bold ${isActive ? 'text-primary' : 'text-white/40'}`}>
                      STEP {step.step}
                    </span>
                    <StepIcon className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-white/40'}`} />
                  </div>
                  <div className="text-xs font-display tracking-wider font-bold leading-tight text-soft-mist">
                    {step.title}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Step Deep Dive Panel */}
          <div className="p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/[0.08] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-xs font-tech font-bold text-primary uppercase tracking-wider">
                STAGE SPECIFICATION // {TEARDOWN_STEPS[activeTeardownStep].title}
              </div>
              <p className="text-xs sm:text-sm text-white/70 font-sans">
                {TEARDOWN_STEPS[activeTeardownStep].detail}
              </p>
            </div>
            <div className="whitespace-nowrap px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[11px] font-tech text-white/80">
              TOLERANCE: <span className="font-bold text-primary">{TEARDOWN_STEPS[activeTeardownStep].spec}</span>
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
                  className={`p-5 rounded-2xl animate-glass border border-white/[0.08] hover:border-primary/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 cursor-pointer assemble-card assemble-up ${delayClass}`}
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform border border-primary/20">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-display tracking-wider text-soft-mist leading-snug group-hover:text-primary transition-colors">
                      {srv.title}
                    </h3>
                    <p className="text-xs text-white/60 font-sans mt-2 leading-relaxed">
                      {srv.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs font-tech">
                    <span className="flex items-center gap-1 text-white/50 font-semibold">
                      <Clock className="w-3.5 h-3.5 text-white/40" />
                      {srv.time}
                    </span>
                    <span className="font-bold text-primary">
                      {srv.price}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Service Booking Card (Right 5 Cols) */}
          <div className="lg:col-span-5 animate-glass rounded-2xl p-6 sm:p-8 border border-white/[0.08] relative assemble-right assemble-delay-4">
            <div className="space-y-1 mb-6">
              <span className="text-[10px] font-tech font-bold uppercase text-primary tracking-widest-plus">Direct Diagnostics</span>
              <h3 className="text-3xl font-display tracking-wider text-soft-mist">
                BOOK A DIAGNOSTIC
              </h3>
              <p className="text-xs text-white/50 font-sans">
                Free initial diagnosis. Walk-in at Athipatten Street, Chennai or talk to our technician.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 text-center space-y-3 bg-primary/10 rounded-xl border border-primary/30">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-tech font-bold text-soft-mist uppercase">SERVICE TICKET LOGGED!</h4>
                <p className="text-xs text-white/70">
                  Our lab diagnostic technician will inspect your ticket and prepare testing apparatus prior to your store visit.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
                <div>
                  <label className="block text-white/70 font-semibold mb-1">Full Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Anand Kumar"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-soft-mist placeholder-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 text-xs font-sans"
                  />
                </div>

                <div>
                  <label className="block text-white/70 font-semibold mb-1">Contact Phone Number</label>
                  <input 
                    type="tel" 
                    required
                    placeholder="+91 9876543210"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-soft-mist placeholder-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 text-xs font-sans"
                  />
                </div>

                <div>
                  <label className="block text-white/70 font-semibold mb-1">Laptop Model & Brand</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. ASUS ROG Strix G15 / Lenovo Legion 5"
                    value={formData.laptopModel}
                    onChange={(e) => setFormData({...formData, laptopModel: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-soft-mist placeholder-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 text-xs font-sans"
                  />
                </div>

                <div>
                  <label className="block text-white/70 font-semibold mb-1">Primary Problem</label>
                  <select 
                    value={formData.issue}
                    onChange={(e) => setFormData({...formData, issue: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#121212] border border-white/10 text-soft-mist focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 text-xs font-sans"
                  >
                    <option className="bg-[#121212] text-soft-mist">Overheating & Thermal Throttling (Thermal Repaste)</option>
                    <option className="bg-[#121212] text-soft-mist">Dead Laptop / Not Powering On (Motherboard Repair)</option>
                    <option className="bg-[#121212] text-soft-mist">GPU Artifacting / BSOD Code 43 (GPU Repair)</option>
                    <option className="bg-[#121212] text-soft-mist">Broken / Flickering Display Screen</option>
                    <option className="bg-[#121212] text-soft-mist">Broken Hinges or Body Damage</option>
                    <option className="bg-[#121212] text-soft-mist">Liquid Spill / Water Damage</option>
                    <option className="bg-[#121212] text-soft-mist">RAM / SSD Speed Upgrade</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/70 font-semibold mb-1">Additional Symptoms (Optional)</label>
                  <textarea 
                    rows={2}
                    placeholder="Describe when the issue occurs..."
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    className="w-full px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-soft-mist placeholder-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 text-xs resize-none font-sans"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-primary hover:bg-hover text-white font-tech font-extrabold uppercase tracking-wider text-xs shadow-nuke-glow transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5 text-white" />
                  <span>Submit Diagnostic Request</span>
                </button>
              </form>
            )}

            <div className="mt-6 pt-4 border-t border-white/[0.08] space-y-1.5 text-[11px] text-white/60 font-sans">
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
