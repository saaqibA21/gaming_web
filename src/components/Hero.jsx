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
            className="group pointer-events-auto flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/90 hover:bg-white border border-slate-300 shadow-md transition-all cursor-pointer hover:border-slate-400"
            aria-label="Skip to details"
          >
            <span className="text-xs font-tech font-bold uppercase tracking-widest text-slate-800 group-hover:text-red-600">
              EXPLORE THE MANIFEST & 5 MACHINES
            </span>
            <ChevronDown className="w-4 h-4 text-red-600 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </section>

      {/* 2. All Hero Details Below the Video Screen - Clean Light Theme */}
      <section id="hero-details" className="relative py-20 sm:py-28 border-b border-slate-200 bg-slate-50 assemble-on-scroll">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          
          {/* Main Grid: Left Ad Copy, Right Hardware Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Solid Ad Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Big Impact Headline */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-600 font-tech font-bold tracking-widest-plus text-[11px] uppercase mb-3 assemble-down assemble-delay-1">
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                  {DECLARATION_INFO.title}
                </div>
                <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display tracking-tight leading-[0.92] text-slate-900 assemble-left assemble-delay-2">
                  FIVE MACHINES. <br />
                  <span className="text-red-600">
                    FIVE PURPOSES.
                  </span>
                </h1>
              </div>

              {/* Clear, Solid Subhead */}
              <p className="text-base sm:text-lg text-slate-600 font-sans max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal assemble-left assemble-delay-3">
                "{DECLARATION_INFO.tagline}" Games World does not move generic components. We build the exact machine your ambition demands — whether that is a spreadsheet, a scoreboard, a timeline, or an AI model that thinks.
              </p>

              {/* Slogan Banner */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1 assemble-left assemble-delay-4">
                <div className="text-sm sm:text-base font-tech font-bold text-red-600 uppercase tracking-wide">
                  "{COMPANY_INFO.slogan}"
                </div>
                <div className="text-xs text-slate-500 font-sans flex items-center gap-1.5 truncate">
                  <MapPin className="w-3.5 h-3.5 text-red-600 flex-shrink-0" />
                  <span>{COMPANY_INFO.address}</span>
                </div>
              </div>

              {/* Solid CTAs */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 assemble-up assemble-delay-5">
                <a
                  href="#prebuilts"
                  onClick={() => playClickSound()}
                  className="flex items-center gap-2.5 px-7 py-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-tech font-extrabold text-sm tracking-wider uppercase shadow-red-btn transition-all transform hover:-translate-y-0.5"
                >
                  <Cpu className="w-5 h-5 text-white" />
                  <span>Explore The 5 Machines</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </a>

                <a
                  href="#laptop-service"
                  onClick={() => playClickSound()}
                  className="flex items-center gap-2 px-6 py-4 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 hover:text-red-600 font-tech font-bold text-sm tracking-wider uppercase shadow-sm transition-all"
                >
                  <Laptop className="w-4 h-4 text-slate-600" />
                  <span>Chip-Level Laptop Repair</span>
                </a>
              </div>

              {/* 4 Solid Guarantees */}
              <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm text-center assemble-socket assemble-delay-6 assemble-card">
                  <div className="font-tech font-bold text-slate-900 text-xs">ZERO BUILD FEE</div>
                  <div className="text-[10px] text-slate-500 mt-0.5 font-sans">Pay only for parts</div>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm text-center assemble-socket assemble-delay-7 assemble-card">
                  <div className="font-tech font-bold text-red-600 text-xs">24-HR STRESS TEST</div>
                  <div className="text-[10px] text-slate-500 mt-0.5 font-sans">FurMark verified</div>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm text-center assemble-socket assemble-delay-8 assemble-card">
                  <div className="font-tech font-bold text-slate-900 text-xs">3-YR WARRANTY</div>
                  <div className="text-[10px] text-slate-500 mt-0.5 font-sans">Walk-in local RMA</div>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm text-center assemble-socket assemble-delay-9 assemble-card">
                  <div className="font-tech font-bold text-red-600 text-xs">FIVE IDENTITIES</div>
                  <div className="text-[10px] text-slate-500 mt-0.5 font-sans">Zero confusion</div>
                </div>
              </div>

            </div>

            {/* Right Solid Ad Showcase */}
            <div className="lg:col-span-5 relative flex justify-center assemble-right assemble-delay-3">
              <div className="relative w-full max-w-md">
                
                {/* Clean White Card container */}
                <div className="rounded-2xl bg-white p-6 border border-slate-200 shadow-xl space-y-5">
                  
                  {/* Header row with Logo and Live Status */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={COMPANY_INFO.logo} 
                        alt="Games World Logo" 
                        className="w-10 h-10 object-contain" 
                      />
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1 font-display tracking-wider text-lg leading-none">
                          <span className="text-slate-900 font-bold">GAMES</span>
                          <span className="text-red-600">WORLD</span>
                        </div>
                        <span className="text-[9px] text-slate-500 font-tech tracking-widest uppercase font-bold mt-0.5">
                          PLAY • CONNECT • COMPETE
                        </span>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-tech font-bold uppercase">
                      OPEN 7 DAYS
                    </span>
                  </div>

                  {/* Flagship Rig Picture with concrete specifications */}
                  <div className="relative rounded-xl overflow-hidden group border border-slate-200">
                    <img 
                      src="https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800&auto=format&fit=crop&q=80" 
                      alt="Games World Gaming PC Build" 
                      className="w-full h-56 object-cover object-center group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent"></div>
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded text-[10px] font-tech font-bold uppercase bg-red-600 text-white shadow-sm">
                        FEATURED BUILD // 03
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="text-[10px] font-tech font-bold text-red-400 uppercase tracking-wider">HYBRID WORKHORSE</div>
                      <div className="text-xl font-display tracking-wider text-white">03. MONSTER (HYBRID)</div>
                      <div className="text-xs text-slate-200 font-sans">Ryzen 5 9600 • RTX 5060 Ti 16GB • 32GB DDR5 • From Rs. 1,19,999</div>
                    </div>
                  </div>

                  {/* Store Services Quick List */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="text-[10px] text-slate-500 font-tech uppercase font-bold">Assembly Policy</div>
                      <div className="font-bold text-red-600 font-sans mt-0.5">Zero Build Fee</div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="text-[10px] text-slate-500 font-tech uppercase font-bold">Laptop Repaste</div>
                      <div className="font-bold text-slate-900 font-sans mt-0.5">Thermal Grizzly TIM</div>
                    </div>
                  </div>

                  {/* Direct Action Buttons */}
                  <div className="pt-1">
                    <button
                      onClick={() => {
                        playClickSound();
                        onOpenConsultation();
                      }}
                      className="w-full py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-tech font-extrabold text-xs uppercase tracking-wider transition-all shadow-md"
                    >
                      Request Free Hardware Consultation
                    </button>
                  </div>

                </div>

              </div>
            </div>
          </div>

          {/* Core Hardware Pillars Section */}
          <div className="mt-20 pt-16 border-t border-slate-200 assemble-on-scroll">
            <div className="text-center mb-10 assemble-down assemble-delay-1">
              <h3 className="text-xs uppercase tracking-widest-plus font-tech font-bold text-red-600">
                OUR CORE DIVISIONS
              </h3>
              <p className="text-3xl sm:text-5xl font-display tracking-wider text-slate-900 mt-1">
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
                    className={`p-6 rounded-2xl bg-white border border-slate-200 hover:border-red-300 transition-all duration-300 hover:shadow-md assemble-up ${delayClass} assemble-card`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 border border-red-200 flex items-center justify-center mb-4">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h4 className="text-2xl font-display tracking-wider text-slate-900">
                      {pillar.title}
                    </h4>
                    <div className="text-[11px] font-tech font-bold text-red-600 uppercase tracking-wider mb-2">
                      {pillar.sub}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-sans">
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
