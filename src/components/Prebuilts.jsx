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
    <section id="prebuilts" className="py-20 sm:py-28 bg-mode-black border-b border-[rgba(255,255,255,0.08)] relative overflow-hidden assemble-on-scroll">
      
      {/* NukePC Radial Glow */}
      <div className="hero-sunrise-glow w-[900px] h-[500px] top-10 left-1/2 -translate-x-1/2 pointer-events-none rounded-full blur-3xl opacity-60"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================================= */}
        {/* THE MANIFESTO HEADER: A DECLARATION, NOT A BUSINESS PLAN */}
        {/* ========================================================================= */}
        <div className="text-center max-w-4xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary font-tech font-bold tracking-widest-plus text-[11px] uppercase assemble-down assemble-delay-1">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            {DECLARATION_INFO.title}
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-display tracking-tight text-soft-mist leading-none assemble-down assemble-delay-2">
            FIVE MACHINES. <span className="text-primary">FIVE PURPOSES.</span> ONE VISION.
          </h2>

          <p className="text-base sm:text-lg text-[rgba(255,255,255,0.7)] font-tech italic max-w-2xl mx-auto assemble-down assemble-delay-3">
            "{DECLARATION_INFO.tagline}"
          </p>

          {/* Core Philosophy Box with NukePC Glassmorphism */}
          <div className="mt-6 p-6 sm:p-8 rounded-2xl animate-glass border border-[rgba(255,255,255,0.08)] text-left space-y-4 assemble-up assemble-delay-4">
            <div className="flex items-start gap-4">
              <Quote className="w-8 h-8 text-primary shrink-0 opacity-80" />
              <div>
                <h3 className="text-xl sm:text-2xl font-tech font-bold text-soft-mist tracking-wide">
                  "{DECLARATION_INFO.quotePrimary}"
                </h3>
                <p className="mt-2 text-sm sm:text-base text-[rgba(255,255,255,0.7)] font-sans leading-relaxed">
                  {DECLARATION_INFO.manifestoBody}
                </p>
              </div>
            </div>

            {/* 3 Declaration Pillars */}
            <div className="pt-4 border-t border-[rgba(255,255,255,0.08)] grid grid-cols-1 md:grid-cols-3 gap-3 text-xs sm:text-sm font-tech">
              {DECLARATION_INFO.corePillars.map((pillar, idx) => (
                <div key={idx} className="flex items-center gap-2 text-soft-mist bg-[rgba(255,255,255,0.03)] p-3 rounded-xl border border-[rgba(255,255,255,0.06)]">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span>{pillar}</span>
                </div>
              ))}
            </div>

            <div className="text-right text-[11px] font-tech text-[rgba(255,255,255,0.4)] uppercase tracking-widest pt-1">
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
                    ? 'bg-primary text-white border-primary font-extrabold shadow-nuke-glow'
                    : 'animate-glass text-[rgba(255,255,255,0.7)] hover:border-primary/40 hover:text-soft-mist'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] ${
                  activeCategory === cat.id ? 'bg-black text-primary font-bold' : 'bg-[rgba(255,255,255,0.06)] text-[rgba(255,255,255,0.5)]'
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* THE 5 MACHINES GRID: NukePC Card Structure */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {filteredPcs.map((pc, idx) => {
            const isExpanded = expandedBuild === pc.id;
            const delayClass = `assemble-delay-${(idx % 3) + 1}`;
            return (
              <div
                key={pc.id}
                className={`rounded-2xl animate-glass border transition-all duration-300 flex flex-col justify-between overflow-hidden group assemble-card assemble-up ${delayClass} ${
                  pc.popular 
                    ? 'border-primary shadow-nuke-glow' 
                    : 'border-[rgba(255,255,255,0.08)] hover:border-primary/50 hover:shadow-2xl'
                }`}
              >
                {/* Image Banner with Watermark Number */}
                <div className="relative h-60 overflow-hidden bg-black">
                  <img 
                    src={pc.image} 
                    alt={pc.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-85 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                  
                  {/* Watermark Number */}
                  <div className="absolute top-3 right-4 text-7xl font-display font-bold text-white/10 select-none pointer-events-none group-hover:text-primary/20 transition-colors">
                    {pc.number}
                  </div>

                  {/* Top Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-md text-[11px] font-tech font-bold uppercase tracking-wider bg-primary text-white shadow-md">
                      {pc.badge}
                    </span>
                  </div>

                  {/* Price Pill: NukePC Starts style */}
                  <div className="absolute bottom-3 left-3">
                    <div className="px-3.5 py-1.5 rounded-full bg-black/90 border border-primary/40 text-xs font-tech font-extrabold shadow-lg flex items-baseline gap-1">
                      <span className="text-xs text-[rgba(255,255,255,0.5)]">starts</span>
                      <span className="text-primary font-bold">₹</span>
                      <span className="text-soft-mist font-bold">{pc.displayPrice.replace('Rs. ', '')}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div>
                    {/* Machine Header */}
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-tech font-bold text-primary uppercase tracking-widest">
                        MACHINE {pc.number} // {pc.subtitle}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-tech text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40 font-bold">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        48H STRESS TESTED
                      </span>
                    </div>

                    <h3 className="text-3xl font-display tracking-wider text-soft-mist group-hover:text-primary transition-colors">
                      {pc.name}
                    </h3>

                    {/* Tagline with Primary Orange Underline Accent */}
                    <div className="mt-2.5 pb-2 border-b-2 border-primary">
                      <p className="text-xs sm:text-sm text-[rgba(255,255,255,0.8)] font-sans italic leading-snug">
                        "{pc.quote}"
                      </p>
                    </div>

                    {/* Core Spec Matrix */}
                    <div className="mt-4 pt-1 space-y-2 text-xs font-tech">
                      {pc.tableSpecs && pc.tableSpecs.map((item, sIdx) => (
                        <div key={sIdx} className="flex items-center justify-between py-1.5 border-b border-[rgba(255,255,255,0.06)]">
                          <span className="text-[rgba(255,255,255,0.5)] text-[11px] uppercase tracking-wider">{item.label}</span>
                          <span className="text-soft-mist font-bold text-right">{item.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Expandable Benchmarks & In-Depth Details */}
                    {isExpanded && (
                      <div className="mt-4 pt-3 border-t border-[rgba(255,255,255,0.08)] space-y-3 animate-fadeIn">
                        <div className="text-[10px] font-tech font-bold text-primary uppercase tracking-wider">
                          Assembled Architecture & Specs:
                        </div>
                        <div className="space-y-1 text-xs text-[rgba(255,255,255,0.7)] font-sans">
                          <div><span className="text-[rgba(255,255,255,0.4)] font-tech">Motherboard:</span> {pc.specs.motherboard}</div>
                          <div><span className="text-[rgba(255,255,255,0.4)] font-tech">Cooling:</span> {pc.specs.cooler}</div>
                          <div><span className="text-[rgba(255,255,255,0.4)] font-tech">Power Supply:</span> {pc.specs.psu}</div>
                          <div><span className="text-[rgba(255,255,255,0.4)] font-tech">Chassis:</span> {pc.specs.cabinet}</div>
                        </div>

                        <div className="text-[10px] font-tech font-bold text-primary uppercase tracking-wider pt-2">
                          Performance Verified Metrics:
                        </div>
                        <div className="space-y-1 font-tech">
                          {Object.entries(pc.fps).map(([metric, val]) => (
                            <div key={metric} className="flex justify-between text-[11px]">
                              <span className="text-[rgba(255,255,255,0.5)]">{metric}:</span>
                              <span className="font-bold text-primary font-mono">{val}</span>
                            </div>
                          ))}
                        </div>

                        {/* Certification Certificate */}
                        <div className="p-3 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] space-y-1.5 text-[10px] font-tech text-[rgba(255,255,255,0.7)]">
                          <div className="text-primary font-bold uppercase flex items-center gap-1">
                            <FileCheck className="w-3.5 h-3.5" />
                            GAMES WORLD MANIFEST COMPLIANT
                          </div>
                          <div className="text-[rgba(255,255,255,0.4)]">
                            • Zero bloatware • BIOS memory profile locked • 48hr thermal stress test
                          </div>
                          <div className="text-emerald-400 flex items-center gap-1 font-bold pt-1">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
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
                      className="mt-3 text-xs text-primary hover:text-primary-hover flex items-center gap-1 font-tech font-bold uppercase tracking-wider transition-colors"
                    >
                      <span>{isExpanded ? "Collapse Details" : "View Full Specs & Benchmarks"}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Pricing and Action Buttons */}
                  <div className="pt-4 border-t border-[rgba(255,255,255,0.08)] space-y-3">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <div className="text-[10px] text-[rgba(255,255,255,0.4)] font-tech uppercase">All-Inclusive Price</div>
                        <div className="text-2xl font-display tracking-wider text-soft-mist">
                          <span className="text-primary font-bold mr-1">₹</span>
                          {pc.displayPrice.replace('Rs. ', '')}
                        </div>
                      </div>
                      <div className="text-[10px] font-tech font-bold text-primary uppercase bg-primary/10 px-2.5 py-1 rounded-md border border-primary/20">
                        {pc.specs.ram.split(' ')[0]} RAM
                      </div>
                    </div>

                    <div className="pt-1">
                      <button
                        onClick={() => handleAddToCart(pc)}
                        className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-tech font-extrabold uppercase tracking-wider transition-all shadow-nuke-glow"
                      >
                        <ShoppingBag className="w-4 h-4 text-white" />
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
        {/* CLOSING MANIFESTO CALLOUT */}
        {/* ========================================================================= */}
        <div className="mt-16 p-8 sm:p-10 rounded-2xl animate-glass border border-[rgba(255,255,255,0.08)] flex flex-col lg:flex-row items-center justify-between gap-8 assemble-up assemble-delay-3">
          <div className="space-y-3 text-center lg:text-left max-w-2xl">
            <div className="text-xs font-tech font-bold text-primary uppercase tracking-widest-plus">
              // CLOSING WORD · {DECLARATION_INFO.author}
            </div>
            <h3 className="text-2xl sm:text-4xl font-display tracking-wide text-soft-mist leading-tight">
              "{DECLARATION_INFO.closingWord}"
            </h3>
            <p className="text-sm text-[rgba(255,255,255,0.7)] font-sans">
              No jargon at the counter. Just five names and five purposes. Every custom order beyond these five is proof the shop can build anything. Trust compounds faster than any advertisement.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href="#contact"
              onClick={() => playClickSound()}
              className="px-7 py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-tech font-extrabold text-xs tracking-wider uppercase transition-all shadow-nuke-glow flex items-center gap-2"
            >
              <span>Speak with a Build Specialist</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#laptop-service"
              onClick={() => playClickSound()}
              className="px-6 py-3.5 rounded-xl bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.1)] text-soft-mist font-tech font-bold text-xs tracking-wider uppercase transition-all"
            >
              Laptop Service Lab
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
