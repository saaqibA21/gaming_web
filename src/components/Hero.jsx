import React from 'react';
import { COMPANY_INFO, PILLARS } from '../data/mockData';
import { 
  Gamepad2, 
  Cpu, 
  Laptop, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  MessageSquare,
  ChevronDown,
  Wrench,
  Layers,
  Flame,
  Zap
} from 'lucide-react';
import { playClickSound } from '../utils/audioEffects';

const iconMap = {
  Gamepad2: Gamepad2,
  Cpu: Cpu,
  Laptop: Laptop,
  ShieldCheck: ShieldCheck
};

export default function Hero({ onOpenConsultation }) {
  const scrollToContent = () => {
    playClickSound();
    const el = document.getElementById('hero-details');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* 1. Cinematic Video Stage - Only the clean video plays */}
      <section id="hero" className="relative h-[calc(100vh-80px)] min-h-[500px] flex flex-col justify-end items-center pb-8 select-none overflow-hidden">
        {/* Simple, Elegant Scroll Anchor */}
        <button
          onClick={scrollToContent}
          className="group flex flex-col items-center gap-2 cursor-pointer transition-all hover:scale-105"
          aria-label="Scroll to explore"
        >
          <div className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-black/80 hover:bg-black border border-red-700/60 shadow-2xl transition-all">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            <span className="text-xs font-tech font-bold uppercase tracking-widest-plus text-gray-200 group-hover:text-white">
              EXPLORE WORKBENCH
            </span>
            <ChevronDown className="w-4 h-4 text-red-500 group-hover:translate-y-0.5 transition-transform" />
          </div>
        </button>
      </section>

      {/* 2. All Hero Details Below the Video Screen - Styled as Workbench Overview */}
      <section id="hero-details" className="relative py-16 sm:py-24 border-b border-gw-border bg-transparent assemble-on-scroll">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          
          {/* Main Grid: Left Ad Copy, Right Hardware Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Solid Ad Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Big Impact Headline using Bebas Neue / Space Grotesk */}
              <div>
                <div className="text-red-500 font-tech font-bold tracking-widest-plus text-xs uppercase mb-2 assemble-down assemble-delay-1">
                  // WORKBENCH SPECIFICATION OVERVIEW
                </div>
                <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display tracking-tight leading-[0.92] text-white assemble-left assemble-delay-2">
                  CUSTOM GAMING RIGS. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-amber-500 drop-shadow-[0_0_25px_rgba(229,9,20,0.7)]">
                    BUILT TO DOMINATE.
                  </span>
                </h1>
              </div>

              {/* Clear, Solid Subhead */}
              <p className="text-base sm:text-lg text-gray-200 font-sans max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal assemble-left assemble-delay-3">
                High-performance custom gaming PCs, 240Hz esports arena, and chip-level laptop repairs. Hand-assembled with sealed brand-new components, 24-hour benchmarked, and backed by a 3-year warranty with zero build fee.
              </p>

              {/* Slogan Banner with Official Founder Details */}
              <div className="p-4 rounded-xl bg-black/90 border border-red-900/60 shadow-solid-dark space-y-1 assemble-left assemble-delay-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="text-sm sm:text-base font-tech font-bold text-red-400 uppercase tracking-wide">
                    "{COMPANY_INFO.slogan}"
                  </div>
                  <div className="text-xs text-gray-400 font-sans">
                    Founder: <span className="text-white font-semibold">{COMPANY_INFO.founder}</span>
                  </div>
                </div>
                <div className="text-xs text-gray-400 font-sans truncate">
                  📍 {COMPANY_INFO.address}
                </div>
              </div>

              {/* Solid CTAs */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 assemble-up assemble-delay-5">
                <a
                  href="#pc-builder"
                  onClick={() => playClickSound()}
                  className="flex items-center gap-2.5 px-7 py-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-tech font-bold text-sm tracking-wider uppercase shadow-red-glow hover:shadow-red-glow-lg transition-all transform hover:-translate-y-0.5"
                >
                  <Cpu className="w-5 h-5" />
                  <span>Enter Assembly Bay (PC Builder)</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="#prebuilts"
                  onClick={() => playClickSound()}
                  className="flex items-center gap-2 px-6 py-4 rounded-xl bg-gw-card hover:bg-gw-card-hover border border-gw-border hover:border-red-600/60 text-gray-100 hover:text-white font-tech font-bold text-sm tracking-wider uppercase transition-all"
                >
                  <span>Factory Prebuilts</span>
                </a>

                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=Hi%20Pradhaan!%20I%20want%20to%20inquire%20about%20a%20Gaming%20PC/Laptop%20Service.`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => playClickSound()}
                  className="flex items-center gap-2 px-5 py-4 rounded-xl bg-emerald-700/80 hover:bg-emerald-600 text-white font-tech font-bold text-sm tracking-wider uppercase transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Us</span>
                </a>
              </div>

              {/* 4 Solid Guarantees */}
              <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-2.5 rounded-lg bg-black/60 border border-gw-border text-center assemble-socket assemble-delay-6 assemble-card">
                  <div className="font-tech font-bold text-white text-xs">ZERO BUILD FEE</div>
                  <div className="text-[10px] text-gray-400 mt-0.5 font-sans">Pay only for parts</div>
                </div>
                <div className="p-2.5 rounded-lg bg-black/60 border border-gw-border text-center assemble-socket assemble-delay-7 assemble-card">
                  <div className="font-tech font-bold text-white text-xs">24-HR STRESS TEST</div>
                  <div className="text-[10px] text-gray-400 mt-0.5 font-sans">FurMark logs provided</div>
                </div>
                <div className="p-2.5 rounded-lg bg-black/60 border border-gw-border text-center assemble-socket assemble-delay-8 assemble-card">
                  <div className="font-tech font-bold text-white text-xs">3-YR WARRANTY</div>
                  <div className="text-[10px] text-gray-400 mt-0.5 font-sans">Local walk-in RMA</div>
                </div>
                <div className="p-2.5 rounded-lg bg-black/60 border border-gw-border text-center assemble-socket assemble-delay-9 assemble-card">
                  <div className="font-tech font-bold text-white text-xs">SAME-DAY SERVICE</div>
                  <div className="text-[10px] text-gray-400 mt-0.5 font-sans">Laptop repasting</div>
                </div>
              </div>

            </div>

            {/* Right Solid Ad Showcase */}
            <div className="lg:col-span-5 relative flex justify-center assemble-right assemble-delay-3">
              <div className="relative w-full max-w-md">
                
                {/* Solid Card container */}
                <div className="rounded-2xl bg-[#0d0d14] p-6 border border-red-600/50 shadow-2xl space-y-5">
                  
                  {/* Header row with Logo and Live Status */}
                  <div className="flex items-center justify-between border-b border-gw-border pb-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={COMPANY_INFO.logo} 
                        alt="Games World Logo" 
                        className="w-10 h-10 object-contain filter drop-shadow-[0_0_8px_rgba(229,9,20,0.5)]" 
                      />
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1 font-display tracking-wider text-lg leading-none">
                          <span className="text-white">GAMES</span>
                          <span className="text-red-600">WORLD</span>
                        </div>
                        <span className="text-[9px] text-gray-400 font-tech tracking-widest uppercase font-bold mt-0.5">
                          PLAY • CONNECT • COMPETE
                        </span>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-tech font-bold uppercase">
                      OPEN 7 DAYS
                    </span>
                  </div>

                  {/* Flagship Rig Picture with concrete specifications */}
                  <div className="relative rounded-xl overflow-hidden group border border-gw-border">
                    <img 
                      src="https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&auto=format&fit=crop&q=80" 
                      alt="Games World Gaming PC Build" 
                      className="w-full h-56 object-cover object-center group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="text-[10px] font-tech font-bold text-red-400 uppercase tracking-wider">SAMPLE BENCH SPECIFICATION</div>
                      <div className="text-xl font-display tracking-wider text-white">VALKYRIE 1440P EDITION</div>
                      <div className="text-xs text-gray-200 font-sans">Ryzen 7 7800X3D • RTX 4070 Super 12GB • 32GB DDR5 6000MHz</div>
                    </div>
                  </div>

                  {/* Store Services Quick List */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-black/60 border border-gw-border">
                      <div className="text-[10px] text-gray-400 font-tech uppercase">Gaming Zone</div>
                      <div className="font-bold text-white font-sans mt-0.5">240Hz & PS5 Lounge</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-black/60 border border-gw-border">
                      <div className="text-[10px] text-gray-400 font-tech uppercase">Laptop Repaste</div>
                      <div className="font-bold text-red-400 font-sans mt-0.5">Thermal Grizzly Kryonaut</div>
                    </div>
                  </div>

                  {/* Direct Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => {
                        playClickSound();
                        onOpenConsultation();
                      }}
                      className="w-full py-2.5 px-3 rounded-lg bg-red-600 hover:bg-red-500 text-white font-tech font-bold text-xs uppercase tracking-wider transition-colors"
                    >
                      Free Build Quote
                    </button>
                    <a
                      href={`tel:${COMPANY_INFO.primaryPhone}`}
                      className="w-full py-2.5 px-3 rounded-lg bg-gw-card hover:bg-gw-card-hover border border-gw-border text-center text-white font-tech font-bold text-xs uppercase tracking-wider transition-colors"
                    >
                      Call Store
                    </a>
                  </div>

                </div>

              </div>
            </div>
          </div>

          {/* 4 Pillars Section */}
          <div className="mt-16 pt-12 border-t border-gw-border/60 assemble-on-scroll">
            <div className="text-center mb-8 assemble-down assemble-delay-1">
              <h3 className="text-xs uppercase tracking-widest-plus font-tech font-bold text-red-500">
                OUR 4 CORE DIVISIONS
              </h3>
              <p className="text-3xl sm:text-4xl font-display tracking-wider text-white mt-1">
                THE PILLARS OF GAMES WORLD
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {PILLARS.map((pillar, idx) => {
                const IconComp = iconMap[pillar.icon] || Cpu;
                const delayClass = `assemble-delay-${idx + 2}`;
                return (
                  <div 
                    key={pillar.id}
                    className={`p-5 rounded-2xl bg-gw-card border border-gw-border hover:border-red-600/60 transition-all duration-300 assemble-up ${delayClass} assemble-card`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-red-600/20 text-red-500 flex items-center justify-center mb-4">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h4 className="text-xl font-display tracking-wider text-white">
                      {pillar.title}
                    </h4>
                    <div className="text-[11px] font-tech font-bold text-red-400 uppercase tracking-wider mb-2">
                      {pillar.sub}
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed font-sans">
                      {pillar.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
