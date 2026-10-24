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
    <section id="prebuilts" className="py-20 sm:py-28 bg-slate-50 border-b border-slate-200 relative assemble-on-scroll">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================================= */}
        {/* THE MANIFESTO HEADER: A DECLARATION, NOT A BUSINESS PLAN */}
        {/* ========================================================================= */}
        <div className="text-center max-w-4xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-600 font-tech font-bold tracking-widest-plus text-[11px] uppercase assemble-down assemble-delay-1">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
            {DECLARATION_INFO.title}
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-display tracking-tight text-slate-900 leading-none assemble-down assemble-delay-2">
            FIVE MACHINES. <span className="text-red-600">FIVE PURPOSES.</span> ONE VISION.
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-tech italic max-w-2xl mx-auto assemble-down assemble-delay-3">
            "{DECLARATION_INFO.tagline}"
          </p>

          {/* Core Philosophy Box */}
          <div className="mt-6 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-md text-left space-y-4 assemble-up assemble-delay-4">
            <div className="flex items-start gap-4">
              <Quote className="w-8 h-8 text-red-600 shrink-0 opacity-80" />
              <div>
                <h3 className="text-xl sm:text-2xl font-tech font-bold text-slate-900 tracking-wide">
                  "{DECLARATION_INFO.quotePrimary}"
                </h3>
                <p className="mt-2 text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
                  {DECLARATION_INFO.manifestoBody}
                </p>
              </div>
            </div>

            {/* 3 Declaration Pillars */}
            <div className="pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs sm:text-sm font-tech">
              {DECLARATION_INFO.corePillars.map((pillar, idx) => (
                <div key={idx} className="flex items-center gap-2 text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
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
                    ? 'bg-slate-900 text-white border-slate-900 font-extrabold shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400 hover:bg-slate-100'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] ${
                  activeCategory === cat.id ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-600'
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
                className={`rounded-2xl bg-white border transition-all duration-300 flex flex-col justify-between overflow-hidden group assemble-card assemble-up ${delayClass} ${
                  pc.popular 
                    ? 'border-red-500 shadow-xl ring-1 ring-red-500/30' 
                    : 'border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-xl'
                }`}
              >
                {/* Image Banner with Watermark Number */}
                <div className="relative h-60 overflow-hidden bg-slate-100">
                  <img 
                    src={pc.image} 
                    alt={pc.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
                  
                  {/* Huge Watermark Number from PDF */}
                  <div className="absolute top-3 right-4 text-7xl font-display font-bold text-white/20 select-none pointer-events-none group-hover:text-red-400/40 transition-colors">
                    {pc.number}
                  </div>

                  {/* Top Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-md text-[11px] font-tech font-bold uppercase tracking-wider bg-slate-900 text-white shadow-md">
                      {pc.badge}
                    </span>
                  </div>

                  {/* Price Pill: Styled cleanly */}
                  <div className="absolute bottom-3 left-3">
                    <div className="px-3.5 py-1.5 rounded-full bg-white/95 text-slate-900 border border-slate-200 text-xs font-tech font-extrabold shadow-md">
                      FROM {pc.displayPrice}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div>
                    {/* Machine Header */}
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-tech font-bold text-red-600 uppercase tracking-widest">
                        MACHINE {pc.number} // {pc.subtitle}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-tech text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        CERTIFIED
                      </span>
                    </div>

                    <h3 className="text-3xl font-display tracking-wider text-slate-900 group-hover:text-red-600 transition-colors">
                      {pc.name}
                    </h3>

                    {/* Tagline / Purpose with Red Underline Accent */}
                    <div className="mt-2.5 pb-2 border-b-2 border-red-500">
                      <p className="text-xs sm:text-sm text-slate-700 font-sans italic leading-snug">
                        "{pc.quote}"
                      </p>
                    </div>

                    {/* Core Spec Matrix (Exact 4-row PDF Layout) */}
                    <div className="mt-4 pt-1 space-y-2 text-xs font-tech">
                      {pc.tableSpecs && pc.tableSpecs.map((item, sIdx) => (
                        <div key={sIdx} className="flex items-center justify-between py-1.5 border-b border-slate-100">
                          <span className="text-slate-500 text-[11px] uppercase tracking-wider font-semibold">{item.label}</span>
                          <span className="text-slate-900 font-bold text-right">{item.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Expandable Benchmarks & In-Depth Details */}
                    {isExpanded && (
                      <div className="mt-4 pt-3 border-t border-slate-100 space-y-3 animate-fadeIn">
                        <div className="text-[10px] font-tech font-bold text-red-600 uppercase tracking-wider">
                          Assembled Architecture & Specs:
                        </div>
                        <div className="space-y-1 text-xs text-slate-700 font-sans">
                          <div><span className="text-slate-400 font-tech font-semibold">Motherboard:</span> {pc.specs.motherboard}</div>
                          <div><span className="text-slate-400 font-tech font-semibold">Cooling:</span> {pc.specs.cooler}</div>
                          <div><span className="text-slate-400 font-tech font-semibold">Power Supply:</span> {pc.specs.psu}</div>
                          <div><span className="text-slate-400 font-tech font-semibold">Chassis:</span> {pc.specs.cabinet}</div>
                        </div>

                        <div className="text-[10px] font-tech font-bold text-red-600 uppercase tracking-wider pt-2">
                          Performance Verified Metrics:
                        </div>
                        <div className="space-y-1 font-tech">
                          {Object.entries(pc.fps).map(([metric, val]) => (
                            <div key={metric} className="flex justify-between text-[11px]">
                              <span className="text-slate-500">{metric}:</span>
                              <span className="font-bold text-slate-900 font-mono">{val}</span>
                            </div>
                          ))}
                        </div>

                        {/* Certification Certificate */}
                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-[10px] font-tech text-slate-700">
                          <div className="text-slate-900 font-bold uppercase flex items-center gap-1">
                            <FileCheck className="w-3.5 h-3.5 text-red-600" />
                            GAMES WORLD MANIFEST COMPLIANT
                          </div>
                          <div className="text-slate-500">
                            • Zero bloatware • BIOS tuned • 24hr load tested
                          </div>
                          <div className="text-emerald-700 flex items-center gap-1 font-bold pt-1">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
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
                      className="mt-3 text-xs text-red-600 hover:text-red-700 flex items-center gap-1 font-tech font-bold uppercase tracking-wider transition-colors"
                    >
                      <span>{isExpanded ? "Collapse Details" : "View Full Specs & Benchmarks"}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Pricing and Action Buttons */}
                  <div className="pt-4 border-t border-slate-100 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <div className="text-[10px] text-slate-500 font-tech uppercase">All-Inclusive Price</div>
                        <div className="text-2xl font-display tracking-wider text-slate-900">
                          {pc.displayPrice}
                        </div>
                      </div>
                      <div className="text-[10px] font-tech font-bold text-slate-700 uppercase bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                        {pc.specs.ram.split(' ')[0]} RAM
                      </div>
                    </div>

                    <div className="pt-1">
                      <button
                        onClick={() => handleAddToCart(pc)}
                        className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-tech font-extrabold uppercase tracking-wider transition-all shadow-md hover:shadow-red-btn"
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
        <div className="mt-16 p-8 sm:p-10 rounded-2xl bg-white border border-slate-200 shadow-md flex flex-col lg:flex-row items-center justify-between gap-8 assemble-up assemble-delay-3">
          <div className="space-y-3 text-center lg:text-left max-w-2xl">
            <div className="text-xs font-tech font-bold text-red-600 uppercase tracking-widest-plus">
              // CLOSING WORD · {DECLARATION_INFO.author}
            </div>
            <h3 className="text-2xl sm:text-4xl font-display tracking-wide text-slate-900 leading-tight">
              "{DECLARATION_INFO.closingWord}"
            </h3>
            <p className="text-sm text-slate-600 font-sans">
              No jargon at the counter. Just five names and five purposes. Every custom order beyond these five is proof the shop can build anything. Trust compounds faster than any advertisement.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href="#contact"
              onClick={() => playClickSound()}
              className="px-7 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-tech font-extrabold text-xs tracking-wider uppercase transition-all shadow-red-btn flex items-center gap-2"
            >
              <span>Speak with a Build Specialist</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#laptop-service"
              onClick={() => playClickSound()}
              className="px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 font-tech font-bold text-xs tracking-wider uppercase transition-all"
            >
              Laptop Service Lab
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
