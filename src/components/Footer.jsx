import React from 'react';
import { COMPANY_INFO, DECLARATION_INFO } from '../data/mockData';
import { 
  MapPin, 
  Clock, 
  Shield, 
  ArrowUp, 
  Cpu, 
  Laptop, 
  CheckCircle2, 
  Sparkles,
  Quote
} from 'lucide-react';

export default function Footer({ onOpenConsultation }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-[#050505] border-t border-white/[0.08] text-white/60 font-sans">
      
      {/* Upper Store Showcase */}
      <div className="border-b border-white/[0.08] bg-mode-black/80 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Info */}
            <div className="lg:col-span-7 space-y-3 sm:space-y-4">
              <div className="text-primary font-tech font-bold tracking-widest-plus text-[10px] sm:text-xs uppercase">
                EXPERIENCE STORE & SERVICE BENCH
              </div>
              <h3 className="text-2xl sm:text-4xl font-display tracking-wider text-soft-mist">
                VISIT GAMES WORLD IN CHENNAI
              </h3>
              <p className="text-xs sm:text-sm text-white/60 leading-relaxed max-w-xl font-sans">
                Consult directly with our expert hardware technicians on custom purpose-built rigs, high-FPS workstations, and chip-level motherboard service.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-1 sm:pt-2 text-xs">
                <div className="p-3.5 sm:p-4 rounded-2xl animate-glass border border-white/[0.08] flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-tech font-bold text-soft-mist uppercase text-[11px] sm:text-xs">Store Address</div>
                    <div className="text-white/60 mt-1 leading-snug font-sans text-xs">{COMPANY_INFO.address}</div>
                  </div>
                </div>

                <div className="p-3.5 sm:p-4 rounded-2xl animate-glass border border-white/[0.08] flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-tech font-bold text-soft-mist uppercase text-[11px] sm:text-xs">Business Hours</div>
                    <div className="text-white/60 mt-1 leading-snug font-sans text-xs">{COMPANY_INFO.hours}</div>
                    <div className="text-emerald-400 font-tech font-bold uppercase text-[10px] mt-1">Open All 7 Days</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: The Declaration Word */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-white/[0.08] p-4 sm:p-6 animate-glass space-y-3.5 sm:space-y-4">
                <div className="border-b border-white/[0.08] pb-3 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] sm:text-xs font-tech font-bold text-primary uppercase tracking-widest-plus">PURPOSE-BUILT RIGS</div>
                    <h4 className="text-lg sm:text-xl font-display tracking-wider text-soft-mist mt-0.5">FIVE MACHINES • FIVE PURPOSES</h4>
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-tech font-bold uppercase px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/30">
                    ONE VISION
                  </span>
                </div>

                <div className="space-y-2.5 sm:space-y-3 text-xs font-sans">
                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <Quote className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-soft-mist font-semibold">"{DECLARATION_INFO.closingWord}"</span>
                      <p className="text-primary font-tech text-[10px] sm:text-[11px] mt-1 font-bold">{DECLARATION_INFO.authorSignature}</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/[0.08] space-y-1.5 text-[10px] sm:text-[11px] text-white/50">
                    <div>• 100% Genuine retail sealed components</div>
                    <div>• Zero assembly fee — pay only for hardware</div>
                    <div>• 24-Hour continuous stress test on every rig</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src={COMPANY_INFO.logo} 
                alt="Games World Logo" 
                className="h-12 w-auto object-contain" 
              />
              <div className="flex flex-col">
                <div className="flex items-center gap-1 font-display tracking-wider text-2xl leading-none">
                  <span className="text-soft-mist font-bold">GAMES</span>
                  <span className="text-primary">WORLD</span>
                </div>
                <span className="text-[10px] text-white/40 font-tech tracking-widest-plus uppercase font-bold mt-1">
                  PLAY • CONNECT • COMPETE
                </span>
              </div>
            </div>

            <p className="text-xs text-white/60 leading-relaxed font-sans">
              "{COMPANY_INFO.slogan}"
            </p>
            <p className="text-xs text-white/40 leading-relaxed font-sans">
              Custom purpose-built gaming rigs and chip-level laptop repairs. Athipatten Street, Chennai.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-base font-display tracking-wider text-soft-mist uppercase">
              FIVE MACHINES
            </h4>
            <ul className="space-y-2 text-xs font-sans">
              <li>
                <a href="#prebuilts" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  <span>01. Workhorse (Office & Corporate)</span>
                </a>
              </li>
              <li>
                <a href="#prebuilts" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  <span>02. Striker (Esports Gaming)</span>
                </a>
              </li>
              <li>
                <a href="#prebuilts" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  <span>03. Monster (Gaming + Editing)</span>
                </a>
              </li>
              <li>
                <a href="#prebuilts" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  <span>04. Forge (Content Creation & 3D)</span>
                </a>
              </li>
              <li>
                <a href="#prebuilts" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  <span>05. Oracle (Local AI Workstation)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Policies & Assurance */}
          <div className="space-y-3">
            <h4 className="text-base font-display tracking-wider text-soft-mist uppercase">
              WARRANTY & ASSURANCE
            </h4>
            <ul className="space-y-2 text-xs text-white/60 font-sans">
              <li>
                <span className="text-soft-mist font-semibold block">Insured Crate Shipping:</span>
                Expanding foam + double wooden crate across India.
              </li>
              <li>
                <span className="text-soft-mist font-semibold block">3-Year Build Warranty:</span>
                Direct brand replacement with Games World concierge RMA.
              </li>
              <li>
                <span className="text-soft-mist font-semibold block">Zero Assembly Charges:</span>
                Pay purely for genuine boxed components.
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-base font-display tracking-wider text-soft-mist uppercase">
              STORE ASSISTANCE
            </h4>
            
            <div className="space-y-3 text-xs font-sans">
              <div className="p-3.5 rounded-2xl animate-glass border border-white/[0.08]">
                <div className="font-tech font-bold text-primary uppercase text-[11px]">Walk-In Desk</div>
                <div className="text-white/60 mt-1 leading-relaxed">
                  Athipatten Street, Chennai (Back side Bharat Petroleum)
                </div>
              </div>

              <div className="p-3.5 rounded-2xl animate-glass border border-white/[0.08]">
                <div className="font-tech font-bold text-primary uppercase text-[11px]">Hours of Operation</div>
                <div className="text-white/60 mt-1 leading-relaxed">
                  Monday – Sunday: 10:30 AM – 9:30 PM
                </div>
              </div>

              <div className="pt-1">
                <button
                  onClick={onOpenConsultation}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-primary hover:bg-hover text-white font-tech font-extrabold text-xs uppercase tracking-wider transition-all shadow-nuke-glow min-h-[46px]"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Request Hardware Quote</span>
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40 font-sans text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} <span className="text-soft-mist font-bold">GAMES WORLD</span>. All Rights Reserved.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl animate-glass hover:bg-white/[0.08] border border-white/[0.1] text-soft-mist font-tech font-bold uppercase text-xs transition-colors min-h-[40px]"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-primary" />
          </button>
        </div>

      </div>
    </footer>
  );
}
