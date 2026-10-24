import React, { useState } from 'react';
import { PREBUILT_PCS, DECLARATION_INFO } from '../data/mockData';
import { 
  Zap, 
  ShieldCheck, 
  Gamepad2, 
  Check, 
  ShoppingBag, 
  ChevronDown, 
  ChevronUp,
  Cpu,
  Layers,
  HardDrive,
  Box,
  CheckCircle2,
  FileCheck,
  Quote,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playClickSound, playMountSound } from '../utils/audioEffects';

export default function Prebuilts({ onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedBuild, setExpandedBuild] = useState(null);

  const categories = [
    { id: 'all', label: 'All 5 Machines', count: '05' },
    { id: 'office', label: '01. Workhorse (Office)', count: '₹49.9k' },
    { id: 'gaming', label: '02. Striker (Esports)', count: '₹72.9k' },
    { id: 'hybrid', label: '03. Monster (Hybrid)', count: '₹1.19L' },
    { id: 'creation', label: '04. Forge (Creator 3D)', count: '₹1.54L' },
    { id: 'ai', label: '05. Oracle (Local AI)', count: '₹2.09L' }
  ];

  const filteredPcs = activeCategory === 'all' 
    ? PREBUILT_PCS 
    : PREBUILT_PCS.filter(pc => pc.category === activeCategory);

  const handleCategorySelect = (id) => {
    playClickSound();
    setActiveCategory(id);
  };

  const handleAddToCart = (pc) => {
    playMountSound();
    if (onAddToCart) {
      onAddToCart({
        id: pc.id,
        name: `[${pc.number}] ${pc.name} (${pc.subtitle})`,
        price: pc.price,
        specs: pc.specs,
        image: pc.image
      });
      confetti({ particleCount: 45, spread: 65, origin: { y: 0.7 } });
    }
  };

  return (
    <section id="prebuilts" className="py-20 sm:py-28 bg-[#0a0e17] border-b border-slate-800/80 relative assemble-on-scroll">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-96 bg-teal-500/5 blur-[140px] pointer-events-none rounded-full"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================================= */}
        {/* THE MANIFESTO HEADER: A DECLARATION, NOT A BUSINESS PLAN */}
        {/* ========================================================================= */}
        <div className="text-center max-w-4xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-950/70 border border-teal-500/30 text-teal-300 font-tech font-bold tracking-widest-plus text-[11px] uppercase assemble-down assemble-delay-1">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
            {DECLARATION_INFO.title}
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-display tracking-tight text-white leading-none assemble-down assemble-delay-2">
            FIVE MACHINES. <span className="text-teal-400">FIVE PURPOSES.</span> ONE VISION.
          </h2>

          <p className="text-base sm:text-lg text-teal-300/90 font-tech italic max-w-2xl mx-auto assemble-down assemble-delay-3">
            "{DECLARATION_INFO.tagline}"
          </p>

          {/* Core Philosophy Box */}
          <div className="mt-6 p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl text-left space-y-4 assemble-up assemble-delay-4">
            <div className="flex items-start gap-4">
              <Quote className="w-8 h-8 text-teal-400 shrink-0 opacity-80" />
              <div>
                <h3 className="text-xl sm:text-2xl font-tech font-bold text-white tracking-wide">
                  "{DECLARATION_INFO.quotePrimary}"
                </h3>
                <p className="mt-2 text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
                  {DECLARATION_INFO.manifestoBody}
                </p>
              </div>
            </div>

            {/* 3 Declaration Pillars */}
            <div className="pt-4 border-t border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs sm:text-sm font-tech">
              {DECLARATION_INFO.corePillars.map((pillar, idx) => (
                <div key={idx} className="flex items-center gap-2 text-teal-300/90 bg-teal-950/40 p-2.5 rounded-xl border border-teal-800/30">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>{pillar}</span>
                </div>
              ))}
            </div>

            <div className="text-right text-[11px] font-tech text-slate-400 uppercase tracking-widest pt-1">
              {DECLARATION_INFO.author}
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-6 assemble-up assemble-delay-5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-tech font-bold uppercase tracking-wider transition-all duration-200 border flex items-center gap-2 ${
                  activeCategory === cat.id
                    ? 'bg-teal-500 text-slate-950 border-teal-400 font-extrabold shadow-cyan-glow'
                    : 'bg-slate-900/90 text-slate-300 border-slate-800 hover:border-teal-500/50 hover:text-white'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                  activeCategory === cat.id ? 'bg-slate-950 text-teal-300' : 'bg-slate-800 text-slate-400'
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* THE 5 MACHINES GRID */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {filteredPcs.map((pc, idx) => {
            const isExpanded = expandedBuild === pc.id;
            const delayClass = `assemble-delay-${(idx % 3) + 1}`;
            return (
              <div
                key={pc.id}
                className={`rounded-2xl bg-slate-900/95 border transition-all duration-300 flex flex-col justify-between overflow-hidden group assemble-card assemble-up ${delayClass} ${
                  pc.popular 
                    ? 'border-teal-500 shadow-cyan-glow' 
                    : 'border-slate-800 hover:border-teal-500/60 hover:shadow-xl'
                }`}
              >
                {/* Image Banner with Watermark Number */}
                <div className="relative h-60 overflow-hidden bg-slate-950">
                  <img 
                    src={pc.image} 
                    alt={pc.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                  
                  {/* Huge Watermark Number from PDF */}
                  <div className="absolute top-3 right-4 text-7xl font-display font-bold text-white/10 select-none pointer-events-none group-hover:text-teal-400/20 transition-colors">
                    {pc.number}
                  </div>

                  {/* Top Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-md text-[11px] font-tech font-bold uppercase tracking-wider bg-teal-500 text-slate-950 shadow-md">
                      {pc.badge}
                    </span>
                  </div>

                  {/* Price Pill: Styled exactly as in PDF */}
                  <div className="absolute bottom-3 left-3">
                    <div className="px-3.5 py-1.5 rounded-full bg-teal-950/90 text-teal-300 border border-teal-500/50 text-xs font-tech font-bold shadow-lg">
                      FROM {pc.displayPrice}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div>
                    {/* Machine Header */}
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-tech font-bold text-teal-400 uppercase tracking-widest">
                        MACHINE {pc.number} // {pc.subtitle}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-tech text-teal-400 bg-teal-950/60 px-2 py-0.5 rounded border border-teal-800/40">
                        <CheckCircle2 className="w-3 h-3 text-teal-400" />
                        CERTIFIED
                      </span>
                    </div>

                    <h3 className="text-3xl font-display tracking-wider text-white group-hover:text-teal-300 transition-colors">
                      {pc.name}
                    </h3>

                    {/* Tagline / Purpose with Cyan Underline Accent (PDF Signature) */}
                    <div className="mt-2.5 pb-2 border-b-2 border-teal-400/80">
                      <p className="text-xs sm:text-sm text-teal-200/90 font-sans italic leading-snug">
                        "{pc.quote}"
                      </p>
                    </div>

                    {/* Core Spec Matrix (Exact 4-row PDF Layout) */}
                    <div className="mt-4 pt-1 space-y-2 text-xs font-tech">
                      {pc.tableSpecs && pc.tableSpecs.map((item, sIdx) => (
                        <div key={sIdx} className="flex items-center justify-between py-1 border-b border-slate-800/60">
                          <span className="text-slate-400 text-[11px] uppercase tracking-wider">{item.label}</span>
                          <span className="text-white font-bold text-right">{item.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Expandable Benchmarks & In-Depth Details */}
                    {isExpanded && (
                      <div className="mt-4 pt-3 border-t border-slate-800 space-y-3 animate-fadeIn">
                        <div className="text-[10px] font-tech font-bold text-teal-400 uppercase tracking-wider">
                          Assembled Architecture & Specs:
                        </div>
                        <div className="space-y-1 text-xs text-slate-300 font-sans">
                          <div><span className="text-slate-400 font-tech">Motherboard:</span> {pc.specs.motherboard}</div>
                          <div><span className="text-slate-400 font-tech">Cooling:</span> {pc.specs.cooler}</div>
                          <div><span className="text-slate-400 font-tech">Power Supply:</span> {pc.specs.psu}</div>
                          <div><span className="text-slate-400 font-tech">Chassis:</span> {pc.specs.cabinet}</div>
                        </div>

                        <div className="text-[10px] font-tech font-bold text-teal-400 uppercase tracking-wider pt-2">
                          Performance Verified Metrics:
                        </div>
                        <div className="space-y-1 font-tech">
                          {Object.entries(pc.fps).map(([metric, val]) => (
                            <div key={metric} className="flex justify-between text-[11px]">
                              <span className="text-slate-400">{metric}:</span>
                              <span className="font-bold text-teal-300 font-mono">{val}</span>
                            </div>
                          ))}
                        </div>

                        {/* Certification Certificate */}
                        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 text-[10px] font-tech text-slate-300">
                          <div className="text-teal-400 font-bold uppercase flex items-center gap-1">
                            <FileCheck className="w-3.5 h-3.5" />
                            GAMES WORLD MANIFESTO COMPLIANT
                          </div>
                          <div className="text-slate-400">
                            • Zero bloatware • BIOS tuned • 24hr load tested
                          </div>
                          <div className="text-emerald-400 flex items-center gap-1 font-bold pt-1">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>{pc.warranty}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <button
                      onClick={() => {
                        playClickSound();
                        setExpandedBuild(isExpanded ? null : pc.id);
                      }}
                      className="mt-3 text-xs text-teal-400 hover:text-teal-300 flex items-center gap-1 font-tech font-bold uppercase tracking-wider transition-colors"
                    >
                      <span>{isExpanded ? "Collapse Details" : "View Full Blueprint & Benchmarks"}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Pricing and Action Buttons */}
                  <div className="pt-4 border-t border-slate-800 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <div className="text-[10px] text-slate-400 font-tech uppercase">All-Inclusive Price</div>
                        <div className="text-2xl font-display tracking-wider text-white">
                          {pc.displayPrice}
                        </div>
                      </div>
                      <div className="text-[10px] font-tech font-bold text-teal-400 uppercase bg-teal-950/60 px-2.5 py-1 rounded border border-teal-800/40">
                        {pc.specs.ram.split(' ')[0]} RAM
                      </div>
                    </div>

                    <div className="pt-1">
                      <button
                        onClick={() => handleAddToCart(pc)}
                        className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-tech font-extrabold uppercase tracking-wider transition-all shadow-cyan-glow"
                      >
                        <ShoppingBag className="w-4 h-4 text-slate-950" />
                        <span>Order Machine {pc.number}</span>
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* CLOSING MANIFESTO CALLOUT: Games World Manifesto */}
        {/* ========================================================================= */}
        <div className="mt-16 p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-teal-950/40 border border-slate-800 flex flex-col lg:flex-row items-center justify-between gap-8 assemble-up assemble-delay-3">
          <div className="space-y-3 text-center lg:text-left max-w-2xl">
            <div className="text-xs font-tech font-bold text-teal-400 uppercase tracking-widest-plus">
              // CLOSING WORD · {DECLARATION_INFO.author}
            </div>
            <h3 className="text-2xl sm:text-4xl font-display tracking-wide text-white leading-tight">
              "{DECLARATION_INFO.closingWord}"
            </h3>
            <p className="text-sm text-slate-300 font-sans">
              No jargon at the counter. Just five names and five purposes. Every custom order beyond these five is proof the shop can build anything. Trust compounds faster than any advertisement.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href="#contact"
              onClick={() => playClickSound()}
              className="px-7 py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-tech font-extrabold text-xs tracking-wider uppercase transition-all shadow-cyan-glow flex items-center gap-2"
            >
              <span>Speak with a Build Specialist</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#pc-builder"
              onClick={() => playClickSound()}
              className="px-6 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-white font-tech font-bold text-xs tracking-wider uppercase transition-all"
            >
              Custom Parts Configurator
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
