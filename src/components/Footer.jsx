import React from 'react';
import { COMPANY_INFO } from '../data/mockData';
import { 
  MapPin, 
  Clock, 
  Shield, 
  ArrowUp, 
  Cpu, 
  Laptop, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export default function Footer({ onOpenConsultation }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-[#050508] border-t border-gw-border text-gray-300 font-sans">
      
      {/* Upper Store Showcase - Solid & Clear */}
      <div className="border-b border-gw-border/60 bg-[#08080d] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Info */}
            <div className="lg:col-span-7 space-y-4">
              <div className="text-red-500 font-tech font-bold tracking-widest-plus text-xs uppercase">
                EXPERIENCE STORE & SERVICE CENTER
              </div>
              <h3 className="text-3xl sm:text-4xl font-display tracking-wider text-white">
                VISIT GAMES WORLD IN CHENNAI
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed max-w-xl font-sans">
                Consult directly with our expert hardware technicians on custom liquid-cooled rigs, high-FPS workstation builds, and chip-level motherboard service.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
                <div className="p-4 rounded-xl bg-gw-card border border-gw-border flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-tech font-bold text-white uppercase text-xs">Store Address</div>
                    <div className="text-gray-300 mt-1 leading-snug font-sans">{COMPANY_INFO.address}</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-gw-card border border-gw-border flex items-start gap-3">
                  <Clock className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-tech font-bold text-white uppercase text-xs">Business Hours</div>
                    <div className="text-gray-300 mt-1 leading-snug font-sans">{COMPANY_INFO.hours}</div>
                    <div className="text-emerald-400 font-tech font-bold uppercase text-[10px] mt-1">Open All 7 Days</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Solid Store & Quality Standards Panel */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-gw-border p-6 bg-[#0c0c14] space-y-4">
                <div className="border-b border-gw-border pb-3">
                  <div className="text-xs font-tech font-bold text-red-500 uppercase tracking-widest-plus">BENCHMARK STANDARDS</div>
                  <h4 className="text-xl font-display tracking-wider text-white mt-0.5">STORE BUILD ASSURANCE</h4>
                </div>

                <div className="space-y-3 text-xs font-sans">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-white font-semibold">100% Sealed Genuine Components</span>
                      <p className="text-gray-400 text-[11px] mt-0.5">Boxes unsealed on workbench with direct brand warranties.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-white font-semibold">24-Hour Thermal Burn-In</span>
                      <p className="text-gray-400 text-[11px] mt-0.5">FurMark and Cinebench stress verified before handover.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-white font-semibold">3-Year Assembly Warranty</span>
                      <p className="text-gray-400 text-[11px] mt-0.5">Local walk-in RMA support & zero assembly charges.</p>
                    </div>
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
                  <span className="text-white">GAMES</span>
                  <span className="text-red-600">WORLD</span>
                </div>
                <span className="text-[10px] text-gray-400 font-tech tracking-widest-plus uppercase font-bold mt-1">
                  PLAY • CONNECT • COMPETE
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed font-sans">
              "{COMPANY_INFO.slogan}"
            </p>
            <p className="text-xs text-gray-400 leading-relaxed font-sans">
              Custom PC builds and chip-level laptop repairs. Athipatten Street, Chennai.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-base font-display tracking-wider text-white uppercase">
              OUR DIVISIONS
            </h4>
            <ul className="space-y-2 text-xs font-sans">
              <li>
                <a href="#pc-builder" className="hover:text-red-400 transition-colors flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-red-500" />
                  <span>Custom PC Configurator</span>
                </a>
              </li>
              <li>
                <a href="#prebuilts" className="hover:text-red-400 transition-colors flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-red-500" />
                  <span>Curated Prebuilt Rigs</span>
                </a>
              </li>
              <li>
                <a href="#laptop-service" className="hover:text-red-400 transition-colors flex items-center gap-1.5">
                  <Laptop className="w-3.5 h-3.5 text-red-500" />
                  <span>Chip-Level Laptop Repair</span>
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-red-400 transition-colors flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-red-500" />
                  <span>Benchmarking Guarantee</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Policies & Assurance */}
          <div className="space-y-3">
            <h4 className="text-base font-display tracking-wider text-white uppercase">
              WARRANTY & ASSURANCE
            </h4>
            <ul className="space-y-2 text-xs text-gray-400 font-sans">
              <li>
                <span className="text-gray-200 font-semibold block">Insured Crate Shipping:</span>
                Expanding foam + double wooden crate across India.
              </li>
              <li>
                <span className="text-gray-200 font-semibold block">3-Year Build Warranty:</span>
                Direct brand replacement with Games World concierge RMA.
              </li>
              <li>
                <span className="text-gray-200 font-semibold block">Zero Assembly Charges:</span>
                Pay purely for genuine boxed components.
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-base font-display tracking-wider text-white uppercase">
              STORE ASSISTANCE
            </h4>
            
            <div className="space-y-3 text-xs font-sans">
              <div className="p-3 rounded-lg bg-gw-card border border-gw-border">
                <div className="font-tech font-bold text-gray-300 uppercase text-[11px]">Walk-In Desk</div>
                <div className="text-gray-400 mt-1 leading-relaxed">
                  Athipatten Street, Chennai (Back side Bharat Petroleum)
                </div>
              </div>

              <div className="p-3 rounded-lg bg-gw-card border border-gw-border">
                <div className="font-tech font-bold text-gray-300 uppercase text-[11px]">Hours of Operation</div>
                <div className="text-gray-400 mt-1 leading-relaxed">
                  Monday – Sunday: 10:30 AM – 9:30 PM
                </div>
              </div>

              <div className="pt-1">
                <button
                  onClick={onOpenConsultation}
                  className="w-full flex items-center justify-center gap-2 py-3 px-3 rounded-lg bg-red-600 hover:bg-red-500 text-white font-tech font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Request Hardware Quote</span>
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gw-border/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400 font-sans">
          <div>
            © {new Date().getFullYear()} <span className="text-white font-bold">GAMES WORLD</span>. All Rights Reserved.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gw-card hover:bg-gw-card-hover border border-gw-border text-gray-300 hover:text-white font-tech font-bold uppercase text-xs transition-colors"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
