import React from 'react';
import { COMPANY_INFO } from '../data/mockData';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Shield, 
  ArrowUp, 
  MessageSquare,
  Cpu,
  Gamepad2,
  Laptop,
  CheckCircle2
} from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-[#050508] border-t border-gw-border text-gray-300 font-sans">
      
      {/* Upper Store & Business Card Showcase */}
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
                Test our 240Hz tournament battle stations, try out the PlayStation 5 4K 120Hz VIP couch lounge, or consult directly with our founder on custom liquid-cooled rigs.
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

            {/* Right: Business Card Visual Showcase */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative rounded-2xl overflow-hidden border border-red-900/60 shadow-red-glow p-2 bg-gradient-to-br from-red-950/40 to-black max-w-md w-full">
                <img 
                  src={COMPANY_INFO.cardImages[0]} 
                  alt="Games World Business Card" 
                  className="w-full h-auto rounded-xl object-contain shadow-2xl hover:scale-[1.02] transition-transform duration-300"
                />
                <div className="mt-2 text-center text-[11px] text-gray-400 font-sans">
                  Founder: <span className="text-white font-bold">{COMPANY_INFO.founder}</span> • Official Games World Membership Card
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
            <div className="flex items-center gap-2">
              <img 
                src={COMPANY_INFO.logo} 
                alt="Games World" 
                className="h-10 w-auto object-contain" 
              />
              <span className="font-display text-2xl text-white tracking-wider">
                GAMES <span className="text-red-600">WORLD</span>
              </span>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed font-sans">
              "{COMPANY_INFO.slogan}"
            </p>
            <p className="text-xs text-gray-400 leading-relaxed font-sans">
              Custom PC builds, 240Hz esports gaming arena, and chip-level laptop repairs. Athipatten Street, Chennai.
            </p>

            <div className="text-xs font-tech font-bold text-red-400 tracking-widest-plus uppercase">
              {COMPANY_INFO.tagline}
            </div>
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
                <a href="#gaming-zone" className="hover:text-red-400 transition-colors flex items-center gap-1.5">
                  <Gamepad2 className="w-3.5 h-3.5 text-red-500" />
                  <span>240Hz Esports Arena & PS5 Lounge</span>
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
              CONTACT STORE
            </h4>
            
            <div className="space-y-2.5 text-xs font-sans">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-red-500 flex-shrink-0" />
                <div>
                  <a href={`tel:${COMPANY_INFO.primaryPhone}`} className="hover:text-white font-bold block text-sm font-tech">
                    {COMPANY_INFO.primaryPhone}
                  </a>
                  <a href={`tel:${COMPANY_INFO.phones[1]}`} className="hover:text-white text-gray-400 block text-xs font-tech">
                    {COMPANY_INFO.phones[1]}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-red-500 flex-shrink-0" />
                <div>
                  <a href={`mailto:${COMPANY_INFO.emails[0]}`} className="hover:text-white block truncate">
                    {COMPANY_INFO.emails[0]}
                  </a>
                  <a href={`mailto:${COMPANY_INFO.emails[1]}`} className="hover:text-white text-gray-400 block truncate">
                    {COMPANY_INFO.emails[1]}
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=Hi%20Games%20World!%20I%20have%20an%20inquiry.`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-tech font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gw-border/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400 font-sans">
          <div>
            © {new Date().getFullYear()} <span className="text-white font-bold">GAMES WORLD</span>. Founder: {COMPANY_INFO.founder}. All Rights Reserved.
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
