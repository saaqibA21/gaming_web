import React, { useState } from 'react';
import { PREBUILT_PCS, COMPANY_INFO } from '../data/mockData';
import { 
  Zap, 
  ShieldCheck, 
  Gamepad2, 
  Check, 
  Share2, 
  ShoppingBag, 
  Sliders, 
  ChevronDown, 
  ChevronUp,
  Cpu,
  Clock,
  Wrench,
  CheckCircle2,
  FileCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playClickSound, playMountSound } from '../utils/audioEffects';

export default function Prebuilts({ onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedBuild, setExpandedBuild] = useState(null);

  const categories = [
    { id: 'all', label: 'All Prebuilts' },
    { id: 'budget', label: '1080p Esports (<₹70k)' },
    { id: 'mid', label: '1440p High FPS (₹1L–₹1.5L)' },
    { id: 'high', label: '4K Extreme (₹2L+)' },
    { id: 'ultra', label: 'RTX 4090 Flagship' }
  ];

  const filteredPcs = activeCategory === 'all' 
    ? PREBUILT_PCS 
    : PREBUILT_PCS.filter(pc => pc.category === activeCategory);

  const handleCategorySelect = (id) => {
    playClickSound();
    setActiveCategory(id);
  };

  const handleWhatsAppOrder = (pc) => {
    playClickSound();
    const text = encodeURIComponent(`Hi Games World! I want to order the prebuilt PC: *${pc.name}* (Price: ₹${pc.price.toLocaleString('en-IN')}). Please confirm stock and delivery timeline.`);
    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  const handleAddToCart = (pc) => {
    playMountSound();
    if (onAddToCart) {
      onAddToCart({
        id: pc.id,
        name: pc.name,
        price: pc.price,
        specs: pc.specs,
        image: pc.image
      });
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
    }
  };

  return (
    <section id="prebuilts" className="py-16 sm:py-20 bg-[#070709]/85 backdrop-blur-md border-b border-gw-border relative assemble-on-scroll">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-red-500 font-tech font-bold tracking-widest-plus text-xs uppercase mb-2 assemble-down assemble-delay-1">
            PRE-ASSEMBLED • BENCHMARKED • READY TO DISPATCH
          </div>
          <h2 className="text-4xl sm:text-6xl font-display tracking-tight text-white assemble-down assemble-delay-2">
            BATTLE-TESTED <span className="text-red-600">PREBUILTS</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-300 font-sans assemble-down assemble-delay-3">
            Assembled by senior technicians, stress-tested under continuous 24-hour FurMark & Cinebench thermal loads, and boxed in custom high-density expanding foam crates.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6 assemble-up assemble-delay-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-tech font-bold uppercase tracking-wider transition-all duration-200 border ${
                  activeCategory === cat.id
                    ? 'bg-red-600 text-white border-red-500 shadow-red-glow'
                    : 'bg-gw-card text-gray-300 border-gw-border hover:border-gray-500'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Prebuilts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPcs.map((pc, idx) => {
            const isExpanded = expandedBuild === pc.id;
            const delayClass = `assemble-delay-${(idx % 4) + 1}`;
            return (
              <div
                key={pc.id}
                className={`rounded-2xl bg-gw-card border transition-all duration-300 flex flex-col justify-between overflow-hidden group assemble-card assemble-up ${delayClass} ${
                  pc.popular 
                    ? 'border-red-600 shadow-red-glow' 
                    : 'border-gw-border hover:border-red-600/50 hover:shadow-lg'
                }`}
              >
                {/* Image Banner */}
                <div className="relative h-56 overflow-hidden bg-black/60">
                  <img 
                    src={pc.image} 
                    alt={pc.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gw-card via-transparent to-transparent"></div>
                  
                  {/* Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-tech font-bold uppercase tracking-wider bg-red-600 text-white shadow-md">
                      {pc.badge}
                    </span>
                  </div>

                  {pc.originalPrice && (
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-tech font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                        SAVE ₹{(pc.originalPrice - pc.price).toLocaleString('en-IN')}
                      </span>
                    </div>
                  )}

                  {/* GPU Pill */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                    <span className="px-2 py-1 rounded bg-black/80 backdrop-blur-sm text-red-400 font-tech font-bold border border-red-900/40 text-[11px]">
                      {pc.specs.gpu}
                    </span>
                    <span className="px-2 py-1 rounded bg-black/80 backdrop-blur-sm text-gray-300 text-[10px] font-sans">
                      {pc.specs.cpu.split(' (')[0]}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-[10px] font-tech font-bold text-red-400 uppercase tracking-widest">
                        BENCH SPEC // READY
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-tech text-emerald-400">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                        PASSED
                      </span>
                    </div>

                    <h3 className="text-xl font-display tracking-wider text-white group-hover:text-red-400 transition-colors">
                      {pc.name}
                    </h3>
                    <p className="text-xs text-gray-400 font-sans mt-0.5 line-clamp-1">
                      {pc.subtitle}
                    </p>

                    {/* Quick Specs List */}
                    <div className="mt-4 space-y-1.5 text-xs text-gray-300 font-sans">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                        <span className="text-gray-400">RAM:</span>
                        <span className="font-semibold text-gray-200">{pc.specs.ram}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                        <span className="text-gray-400">SSD:</span>
                        <span className="font-semibold text-gray-200">{pc.specs.storage}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                        <span className="text-gray-400">Cooler:</span>
                        <span className="font-semibold text-gray-200">{pc.specs.cooler}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                        <span className="text-gray-400">PSU:</span>
                        <span className="font-semibold text-gray-200">{pc.specs.psu}</span>
                      </div>
                    </div>

                    {/* Expandable Details for FPS & Case */}
                    {isExpanded && (
                      <div className="mt-4 pt-3 border-t border-gw-border space-y-3 animate-fadeIn">
                        <div className="text-[10px] font-tech font-bold text-gray-400 uppercase tracking-wider">
                          Verified Game Benchmarks:
                        </div>
                        <div className="space-y-1 font-tech">
                          {Object.entries(pc.fps).map(([game, fpsVal]) => (
                            <div key={game} className="flex justify-between text-[11px]">
                              <span className="text-gray-400">{game.split(' (')[0]}:</span>
                              <span className="font-bold text-emerald-400 font-mono">{fpsVal}</span>
                            </div>
                          ))}
                        </div>
                        <div className="text-[11px] text-gray-400 pt-1 font-sans">
                          Chassis: <span className="text-white font-medium">{pc.specs.cabinet}</span>
                        </div>
                        
                        {/* Assembly Verification Certificate */}
                        <div className="p-2.5 rounded-lg bg-black/60 border border-gw-border space-y-1 text-[10px] font-tech text-gray-300">
                          <div className="text-red-400 font-bold uppercase flex items-center gap-1">
                            <FileCheck className="w-3 h-3" />
                            GAMES WORLD BENCH CERTIFIED
                          </div>
                          <div className="text-gray-400">✓ Thermal Grizzly Kryonaut TIM</div>
                          <div className="text-gray-400">✓ XMP / EXPO Memory Profile Locked</div>
                          <div className="text-gray-400">✓ 24hr Continuous Stress Tested</div>
                        </div>

                        <div className="text-[10px] text-emerald-400 font-tech font-bold uppercase">
                          🛡 {pc.warranty}
                        </div>
                      </div>
                    )}

                    <button
                      onClick={() => {
                        playClickSound();
                        setExpandedBuild(isExpanded ? null : pc.id);
                      }}
                      className="mt-3 text-xs text-gray-400 hover:text-white flex items-center gap-1 font-tech font-bold uppercase tracking-wider transition-colors"
                    >
                      <span>{isExpanded ? "Hide Assembly Specs" : "View Assembly Specs & FPS"}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Pricing and Action Buttons */}
                  <div className="pt-3 border-t border-gw-border/60 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <div className="text-[10px] text-gray-400 font-tech uppercase">Store Price</div>
                        <div className="text-2xl font-display tracking-wider text-white">
                          ₹{pc.price.toLocaleString('en-IN')}
                        </div>
                      </div>
                      {pc.originalPrice && (
                        <div className="text-xs line-through text-gray-500 font-sans">
                          ₹{pc.originalPrice.toLocaleString('en-IN')}
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleWhatsAppOrder(pc)}
                        className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-tech font-bold uppercase tracking-wider transition-colors"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        <span>Order</span>
                      </button>
                      
                      <button
                        onClick={() => handleAddToCart(pc)}
                        className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-tech font-bold uppercase tracking-wider transition-colors"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Cart</span>
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Solid Ad Callout Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-red-950/80 via-gw-card to-black border border-red-900/60 flex flex-col md:flex-row items-center justify-between gap-6 assemble-up assemble-delay-3">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="text-xs font-tech font-bold text-red-500 uppercase tracking-widest-plus">CUSTOM WORKSTATIONS & LIQUID LOOPS</div>
            <h3 className="text-2xl sm:text-3xl font-display tracking-wider text-white">
              NEED A SPECIFIC ARCHITECTURE OR HARDLINE WATER COOLING?
            </h3>
            <p className="text-sm text-gray-300 font-sans max-w-xl">
              From dual-GPU 48GB VRAM AI servers to custom hardline acrylic cooling loops, our senior engineers build to your exact performance budget.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="#pc-builder"
              className="px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-tech font-bold uppercase tracking-wider transition-all shadow-red-glow"
            >
              Open Configurator
            </a>
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=Hi%20Pradhaan!%20I%20need%20a%20workstation/custom%20loop%20quote.`}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 rounded-xl bg-gw-card hover:bg-gw-card-hover border border-gw-border text-white text-xs font-tech font-bold uppercase tracking-wider transition-all"
            >
              Talk to Pradhaan
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
