import React from 'react';
import { COMPANY_INFO, PILLARS, DECLARATION_INFO } from '../data/mockData';
import { 
  Gamepad2, 
  Cpu, 
  Laptop, 
  ShieldCheck, 
  ArrowRight, 
  ChevronDown, 
  MapPin,
  Sparkles,
  CheckCircle2
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
      {/* 1. Cinematic Interactive Assembly Stage */}
      <section id="hero" className="relative h-[300vh]">
        <div className="sticky top-0 h-screen w-full flex flex-col justify-end items-center pb-8 select-none pointer-events-none">
          <button
            onClick={scrollToContent}
            className="group pointer-events-auto flex items-center gap-2 px-6 py-2.5 rounded-full bg-slate-950/80 hover:bg-slate-900 border border-teal-500/40 shadow-cyan-glow transition-all cursor-pointer hover:border-teal-400"
            aria-label="Skip to details"
          >
            <span className="text-xs font-tech font-bold uppercase tracking-widest text-teal-300 group-hover:text-white">
              EXPLORE THE MANIFESTO & MACHINES
            </span>
            <ChevronDown className="w-4 h-4 text-teal-400 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </section>

      {/* 2. All Hero Details Below the Video Screen - Solid Workbench Overview */}
      <section id="hero-details" className="relative py-20 sm:py-28 border-b border-slate-800/80 bg-[#0a0e17] assemble-on-scroll">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          
          {/* Main Grid: Left Ad Copy, Right Hardware Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Solid Ad Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Big Impact Headline using Bebas Neue / Space Grotesk */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/60 border border-teal-500/30 text-teal-300 font-tech font-bold tracking-widest-plus text-[11px] uppercase mb-3 assemble-down assemble-delay-1">
                  <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
                  {DECLARATION_INFO.title}
                </div>
                <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display tracking-tight leading-[0.92] text-white assemble-left assemble-delay-2">
                  FIVE MACHINES. <br />
                  <span className="text-teal-400">
                    FIVE PURPOSES.
                  </span>
                </h1>
              </div>

              {/* Clear, Solid Subhead */}
              <p className="text-base sm:text-lg text-slate-300 font-sans max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal assemble-left assemble-delay-3">
                "{DECLARATION_INFO.tagline}" Games World does not move generic components. We build the exact machine your ambition demands — whether that is a spreadsheet, a scoreboard, a timeline, or an AI model that thinks.
              </p>

              {/* Slogan Banner */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-1 assemble-left assemble-delay-4">
                <div className="text-sm sm:text-base font-tech font-bold text-teal-300 uppercase tracking-wide">
                  "{COMPANY_INFO.slogan}"
                </div>
                <div className="text-xs text-slate-400 font-sans flex items-center gap-1.5 truncate">
                  <MapPin className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />
                  <span>{COMPANY_INFO.address}</span>
                </div>
              </div>

              {/* Solid CTAs */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 assemble-up assemble-delay-5">
                <a
                  href="#prebuilts"
                  onClick={() => playClickSound()}
                  className="flex items-center gap-2.5 px-7 py-4 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-tech font-extrabold text-sm tracking-wider uppercase shadow-cyan-glow transition-all transform hover:-translate-y-0.5"
                >
                  <Cpu className="w-5 h-5 text-slate-950" />
                  <span>Explore The 5 Machines</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </a>

                <a
                  href="#pc-builder"
                  onClick={() => playClickSound()}
                  className="flex items-center gap-2 px-6 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-teal-500/50 text-slate-100 hover:text-white font-tech font-bold text-sm tracking-wider uppercase transition-all"
                >
                  <span>Custom Parts Configurator</span>
                </a>
              </div>

              {/* 4 Solid Guarantees */}
              <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center assemble-socket assemble-delay-6 assemble-card">
                  <div className="font-tech font-bold text-white text-xs">ZERO BUILD FEE</div>
                  <div className="text-[10px] text-slate-400 mt-0.5 font-sans">Pay only for parts</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center assemble-socket assemble-delay-7 assemble-card">
                  <div className="font-tech font-bold text-teal-400 text-xs">24-HR STRESS TEST</div>
                  <div className="text-[10px] text-slate-400 mt-0.5 font-sans">FurMark verified</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center assemble-socket assemble-delay-8 assemble-card">
                  <div className="font-tech font-bold text-white text-xs">3-YR WARRANTY</div>
                  <div className="text-[10px] text-slate-400 mt-0.5 font-sans">Walk-in local RMA</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center assemble-socket assemble-delay-9 assemble-card">
                  <div className="font-tech font-bold text-teal-400 text-xs">FIVE IDENTITIES</div>
                  <div className="text-[10px] text-slate-400 mt-0.5 font-sans">Zero confusion</div>
                </div>
              </div>

            </div>

            {/* Right Solid Ad Showcase */}
            <div className="lg:col-span-5 relative flex justify-center assemble-right assemble-delay-3">
              <div className="relative w-full max-w-md">
                
                {/* Solid Card container */}
                <div className="rounded-2xl bg-slate-900 p-6 border border-slate-800 hover:border-teal-500/50 shadow-2xl space-y-5 transition-all">
                  
                  {/* Header row with Logo and Live Status */}
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={COMPANY_INFO.logo} 
                        alt="Games World Logo" 
                        className="w-10 h-10 object-contain" 
                      />
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1 font-display tracking-wider text-lg leading-none">
                          <span className="text-white">GAMES</span>
                          <span className="text-red-500">WORLD</span>
                        </div>
                        <span className="text-[9px] text-teal-400 font-tech tracking-widest uppercase font-bold mt-0.5">
                          PLAY • CONNECT • COMPETE
                        </span>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-teal-950 text-teal-400 border border-teal-800 text-[10px] font-tech font-bold uppercase">
                      OPEN 7 DAYS
                    </span>
                  </div>

                  {/* Flagship Rig Picture with concrete specifications */}
                  <div className="relative rounded-xl overflow-hidden group border border-slate-800">
                    <img 
                      src="https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800&auto=format&fit=crop&q=80" 
                      alt="Games World Gaming PC Build" 
                      className="w-full h-56 object-cover object-center group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded text-[10px] font-tech font-bold uppercase bg-teal-500 text-slate-950">
                        FEATURED BUILD // 03
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="text-[10px] font-tech font-bold text-teal-400 uppercase tracking-wider">HYBRID POWERHOUSE</div>
                      <div className="text-xl font-display tracking-wider text-white">03. MONSTER (HYBRID)</div>
                      <div className="text-xs text-slate-300 font-sans">Ryzen 5 9600 • RTX 5060 Ti 16GB • 32GB DDR5 • From Rs. 1,19,999</div>
                    </div>
                  </div>

                  {/* Store Services Quick List */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="text-[10px] text-slate-400 font-tech uppercase">Assembly Policy</div>
                      <div className="font-bold text-teal-400 font-sans mt-0.5">Zero Build Fee</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="text-[10px] text-slate-400 font-tech uppercase">Laptop Repaste</div>
                      <div className="font-bold text-white font-sans mt-0.5">Thermal Grizzly Kryonaut</div>
                    </div>
                  </div>

                  {/* Direct Action Buttons */}
                  <div className="pt-1">
                    <button
                      onClick={() => {
                        playClickSound();
                        onOpenConsultation();
                      }}
                      className="w-full py-3.5 px-4 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-tech font-extrabold text-xs uppercase tracking-wider transition-all shadow-cyan-glow"
                    >
                      Request Free Hardware Consultation
                    </button>
                  </div>

                </div>

              </div>
            </div>
          </div>

          {/* Core Hardware Pillars Section */}
          <div className="mt-20 pt-16 border-t border-slate-800/80 assemble-on-scroll">
            <div className="text-center mb-10 assemble-down assemble-delay-1">
              <h3 className="text-xs uppercase tracking-widest-plus font-tech font-bold text-teal-400">
                OUR CORE DIVISIONS
              </h3>
              <p className="text-3xl sm:text-5xl font-display tracking-wider text-white mt-1">
                THE PILLARS OF GAMES WORLD
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PILLARS.map((pillar, idx) => {
                const IconComp = iconMap[pillar.icon] || Cpu;
                const delayClass = `assemble-delay-${idx + 2}`;
                return (
                  <div 
                    key={pillar.id}
                    className={`p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-teal-500/50 transition-all duration-300 assemble-up ${delayClass} assemble-card`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/30 flex items-center justify-center mb-4">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h4 className="text-2xl font-display tracking-wider text-white">
                      {pillar.title}
                    </h4>
                    <div className="text-[11px] font-tech font-bold text-teal-400 uppercase tracking-wider mb-2">
                      {pillar.sub}
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
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
