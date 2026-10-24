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
    <footer id="contact" className="bg-slate-100 border-t border-slate-200 text-slate-600 font-sans">
      
      {/* Upper Store Showcase */}
      <div className="border-b border-slate-200 bg-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Info */}
            <div className="lg:col-span-7 space-y-4">
              <div className="text-red-600 font-tech font-bold tracking-widest-plus text-xs uppercase">
                EXPERIENCE STORE & SERVICE BENCH
              </div>
              <h3 className="text-3xl sm:text-4xl font-display tracking-wider text-slate-900">
                VISIT GAMES WORLD IN CHENNAI
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed max-w-xl font-sans">
                Consult directly with our expert hardware technicians on custom purpose-built rigs, high-FPS workstations, and chip-level motherboard service.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-tech font-bold text-slate-900 uppercase text-xs">Store Address</div>
                    <div className="text-slate-600 mt-1 leading-snug font-sans">{COMPANY_INFO.address}</div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <Clock className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-tech font-bold text-slate-900 uppercase text-xs">Business Hours</div>
                    <div className="text-slate-600 mt-1 leading-snug font-sans">{COMPANY_INFO.hours}</div>
                    <div className="text-emerald-700 font-tech font-bold uppercase text-[10px] mt-1">Open All 7 Days</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: The Declaration Word */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-slate-200 p-6 bg-slate-50 space-y-4 shadow-sm">
                <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-tech font-bold text-red-600 uppercase tracking-widest-plus">THE MANIFEST</div>
                    <h4 className="text-xl font-display tracking-wider text-slate-900 mt-0.5">FIVE MACHINES • FIVE PURPOSES</h4>
                  </div>
                  <span className="text-[10px] font-tech font-bold uppercase px-2.5 py-0.5 rounded-full bg-red-50 text-red-600 border border-red-200">
                    ONE VISION
                  </span>
                </div>

                <div className="space-y-3 text-xs font-sans">
                  <div className="flex items-start gap-3">
                    <Quote className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-900 font-semibold">"{DECLARATION_INFO.closingWord}"</span>
                      <p className="text-red-600 font-tech text-[11px] mt-1 font-bold">{DECLARATION_INFO.authorSignature}</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200 space-y-1.5 text-[11px] text-slate-500">
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
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
                  <span className="text-slate-900 font-bold">GAMES</span>
                  <span className="text-red-600">WORLD</span>
                </div>
                <span className="text-[10px] text-slate-500 font-tech tracking-widest-plus uppercase font-bold mt-1">
                  PLAY • CONNECT • COMPETE
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              "{COMPANY_INFO.slogan}"
            </p>
            <p className="text-xs text-slate-500 leading-relaxed font-sans">
              Custom purpose-built gaming rigs and chip-level laptop repairs. Athipatten Street, Chennai.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-base font-display tracking-wider text-slate-900 uppercase">
              FIVE MACHINES
            </h4>
            <ul className="space-y-2 text-xs font-sans">
              <li>
                <a href="#prebuilts" className="hover:text-red-600 transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                  <span>01. Workhorse (Office & Corporate)</span>
                </a>
              </li>
              <li>
                <a href="#prebuilts" className="hover:text-red-600 transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                  <span>02. Striker (Esports Gaming)</span>
                </a>
              </li>
              <li>
                <a href="#prebuilts" className="hover:text-red-600 transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                  <span>03. Monster (Gaming + Editing)</span>
                </a>
              </li>
              <li>
                <a href="#prebuilts" className="hover:text-red-600 transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                  <span>04. Forge (Content Creation & 3D)</span>
                </a>
              </li>
              <li>
                <a href="#prebuilts" className="hover:text-red-600 transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                  <span>05. Oracle (Local AI Workstation)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Policies & Assurance */}
          <div className="space-y-3">
            <h4 className="text-base font-display tracking-wider text-slate-900 uppercase">
              WARRANTY & ASSURANCE
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 font-sans">
              <li>
                <span className="text-slate-900 font-semibold block">Insured Crate Shipping:</span>
                Expanding foam + double wooden crate across India.
              </li>
              <li>
                <span className="text-slate-900 font-semibold block">3-Year Build Warranty:</span>
                Direct brand replacement with Games World concierge RMA.
              </li>
              <li>
                <span className="text-slate-900 font-semibold block">Zero Assembly Charges:</span>
                Pay purely for genuine boxed components.
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-base font-display tracking-wider text-slate-900 uppercase">
              STORE ASSISTANCE
            </h4>
            
            <div className="space-y-3 text-xs font-sans">
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200">
                <div className="font-tech font-bold text-red-600 uppercase text-[11px]">Walk-In Desk</div>
                <div className="text-slate-600 mt-1 leading-relaxed">
                  Athipatten Street, Chennai (Back side Bharat Petroleum)
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-slate-200">
                <div className="font-tech font-bold text-red-600 uppercase text-[11px]">Hours of Operation</div>
                <div className="text-slate-600 mt-1 leading-relaxed">
                  Monday – Sunday: 10:30 AM – 9:30 PM
                </div>
              </div>

              <div className="pt-1">
                <button
                  onClick={onOpenConsultation}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-tech font-extrabold text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-red-btn"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Request Hardware Quote</span>
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-sans">
          <div>
            © {new Date().getFullYear()} <span className="text-slate-900 font-bold">GAMES WORLD</span>. All Rights Reserved.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 hover:text-slate-900 font-tech font-bold uppercase text-xs transition-colors shadow-sm"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-red-600" />
          </button>
        </div>

      </div>
    </footer>
  );
}
