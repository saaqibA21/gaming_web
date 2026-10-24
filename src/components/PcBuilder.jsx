import React, { useState, useMemo } from 'react';
import { PC_PARTS, COMPANY_INFO } from '../data/mockData';
import { 
  Monitor,
  Cpu, 
  CircuitBoard, 
  Layers, 
  HardDrive, 
  Fan, 
  Zap, 
  Box, 
  Check, 
  AlertTriangle, 
  Printer, 
  ShoppingBag, 
  RotateCcw, 
  Sparkles,
  Gamepad2,
  ChevronRight,
  ShieldCheck,
  Wrench,
  Power,
  CheckCircle2,
  FileText,
  X,
  Plus
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playClickSound, playMountSound, playBootSound } from '../utils/audioEffects';

const CATEGORIES = [
  { id: 'monitors', label: '1. Gaming Screen', slotName: 'DISPLAY SCREEN', icon: Monitor },
  { id: 'processors', label: '2. Processor (CPU)', slotName: 'CPU SOCKET', icon: Cpu },
  { id: 'coolers', label: '3. Cooling Fans & AIO', slotName: 'FANS & COOLER', icon: Fan },
  { id: 'graphicsCards', label: '4. Graphics Card (GPU)', slotName: 'PCIE 5.0 X16', icon: Layers },
  { id: 'motherboards', label: '5. Motherboard', slotName: 'MOTHERBOARD PCB', icon: CircuitBoard },
  { id: 'rams', label: '6. Memory (RAM)', slotName: 'DIMM 2 & 4', icon: Box },
  { id: 'storages', label: '7. Storage (NVMe SSD)', slotName: 'M.2 GEN4 SLOT', icon: HardDrive },
  { id: 'powerSupplies', label: '8. Power Supply (PSU)', slotName: 'PSU COMPARTMENT', icon: Zap },
  { id: 'cabinets', label: '9. Cabinet / Case', slotName: 'CHASSIS FRAME', icon: Box }
];

export default function PcBuilder({ onAddToCart }) {
  // Initial default build (high-performance balanced rig with monitor)
  const [selectedParts, setSelectedParts] = useState({
    monitors: PC_PARTS.monitors[1], // LG UltraGear 27" 240Hz
    processors: PC_PARTS.processors[1], // 7800X3D
    motherboards: PC_PARTS.motherboards[0], // MSI B650
    graphicsCards: PC_PARTS.graphicsCards[2], // RTX 4070 Super
    rams: PC_PARTS.rams[1], // 32GB G.Skill
    storages: PC_PARTS.storages[1], // 1TB Samsung 980 Pro
    coolers: PC_PARTS.coolers[2], // 360mm DeepCool
    powerSupplies: PC_PARTS.powerSupplies[1], // Corsair RM750e
    cabinets: PC_PARTS.cabinets[1] // Lian Li O11
  });

  const [activeTab, setActiveTab] = useState('processors');
  const [copiedQuote, setCopiedQuote] = useState(false);
  const [benchmarking, setBenchmarking] = useState(false);
  const [systemFired, setSystemFired] = useState(false);
  const [targetResolution, setTargetResolution] = useState('1440p');
  const [blueprintModalOpen, setBlueprintModalOpen] = useState(false);

  // Calculations
  const totalPrice = useMemo(() => {
    return Object.values(selectedParts).reduce((sum, part) => sum + (part ? part.price : 0), 0);
  }, [selectedParts]);

  const installedCount = useMemo(() => {
    return Object.values(selectedParts).filter(Boolean).length;
  }, [selectedParts]);

  const estimatedWattage = useMemo(() => {
    let watts = 50; // base fans & motherboard
    if (selectedParts.processors) watts += selectedParts.processors.wattage || 100;
    if (selectedParts.graphicsCards) watts += selectedParts.graphicsCards.wattage || 150;
    if (selectedParts.rams) watts += selectedParts.rams.wattage || 15;
    if (selectedParts.storages) watts += selectedParts.storages.wattage || 10;
    if (selectedParts.coolers) watts += selectedParts.coolers.wattage || 20;
    if (selectedParts.monitors) watts += selectedParts.monitors.wattage || 0;
    return watts;
  }, [selectedParts]);

  const recommendedPsu = useMemo(() => {
    return Math.ceil((estimatedWattage + 150) / 50) * 50;
  }, [estimatedWattage]);

  // Compatibility checking
  const compatibilityIssues = useMemo(() => {
    const issues = [];
    const cpu = selectedParts.processors;
    const mb = selectedParts.motherboards;
    const psu = selectedParts.powerSupplies;

    if (cpu && mb && cpu.socket !== mb.socket) {
      issues.push(`Socket Mismatch: ${cpu.name} (${cpu.socket}) requires a ${cpu.socket} motherboard, but ${mb.name} (${mb.socket}) is selected.`);
    }

    if (psu && psu.wattageOutput < estimatedWattage) {
      issues.push(`Insufficient Power: Estimated load is ${estimatedWattage}W, but selected PSU is only ${psu.wattageOutput}W. Recommend ${recommendedPsu}W+ Gold.`);
    }

    return issues;
  }, [selectedParts, estimatedWattage, recommendedPsu]);

  // Dynamic FPS scaling based on chosen resolution
  const gameFps = useMemo(() => {
    const gpuMult = selectedParts.graphicsCards ? selectedParts.graphicsCards.fpsMultiplier : 1.0;
    const resFactor = targetResolution === '1080p' ? 1.35 : targetResolution === '1440p' ? 1.0 : 0.62;

    return {
      valorant: Math.round(380 * gpuMult * (targetResolution === '4k' ? 0.75 : 1)),
      cyberpunk: Math.round(55 * gpuMult * resFactor),
      gta5: Math.round(110 * gpuMult * resFactor),
      warzone: Math.round(85 * gpuMult * resFactor)
    };
  }, [selectedParts.graphicsCards, targetResolution]);

  const handleSelectPart = (category, part) => {
    playMountSound();
    setSelectedParts(prev => ({
      ...prev,
      [category]: part
    }));
  };

  const handleTabChange = (catId) => {
    playClickSound();
    setActiveTab(catId);
  };

  const handleReset = () => {
    playClickSound();
    setSelectedParts({
      monitors: null,
      processors: null,
      motherboards: null,
      graphicsCards: null,
      rams: null,
      storages: null,
      coolers: null,
      powerSupplies: null,
      cabinets: null
    });
    setSystemFired(false);
  };

  const handleLoadFlagship = () => {
    playBootSound();
    setSelectedParts({
      monitors: PC_PARTS.monitors[2], // Samsung 4K 144Hz
      processors: PC_PARTS.processors[2], // Ryzen 7 9800X3D
      motherboards: PC_PARTS.motherboards[1], // ASUS ROG B650-A
      graphicsCards: PC_PARTS.graphicsCards[4], // RTX 4080 Super
      rams: PC_PARTS.rams[2], // Corsair Titanium 32GB
      storages: PC_PARTS.storages[3], // 2TB Samsung 990 Pro
      coolers: PC_PARTS.coolers[3], // Lian Li LCD 360mm
      powerSupplies: PC_PARTS.powerSupplies[2], // Corsair RM850x
      cabinets: PC_PARTS.cabinets[1] // Lian Li O11 EVO
    });
    confetti({ particleCount: 60, spread: 80, origin: { y: 0.6 } });
  };

  const handleFireUpBench = () => {
    if (benchmarking) return;
    setBenchmarking(true);
    playBootSound();

    setTimeout(() => {
      setBenchmarking(false);
      setSystemFired(true);
      confetti({ particleCount: 75, spread: 90, origin: { y: 0.6 } });
    }, 1800);
  };

  const generateSpecText = () => {
    return `*GAMES WORLD CHENNAI - HARDWARE ASSEMBLY QUOTATION*
Date: ${new Date().toLocaleDateString('en-IN')}
---------------------------------
[CUSTOM BATTLESTATION SPECIFICATION]
• 01. Screen / Monitor: ${selectedParts.monitors?.name || 'Tower Only'}
• 02. CPU: ${selectedParts.processors?.name || 'Not mounted'}
• 03. Motherboard: ${selectedParts.motherboards?.name || 'Not mounted'}
• 04. GPU: ${selectedParts.graphicsCards?.name || 'Not mounted'}
• 05. RAM: ${selectedParts.rams?.name || 'Not mounted'}
• 06. NVMe Storage: ${selectedParts.storages?.name || 'Not mounted'}
• 07. Cooling Fans & AIO: ${selectedParts.coolers?.name || 'Not mounted'}
• 08. Power Supply: ${selectedParts.powerSupplies?.name || 'Not mounted'}
• 09. Case Chassis: ${selectedParts.cabinets?.name || 'Not mounted'}
---------------------------------
*TOTAL ESTIMATE: ₹${totalPrice.toLocaleString('en-IN')}* (GST Included)
• Zero Assembly Charge
• Cable Management & 24hr Burn-In Included
• 3-Year Hardware Warranty
---------------------------------
Games World - Athipatten Street, Chennai
Official Hardware Specification Sheet`;
  };

  const handleCopySpec = () => {
    playClickSound();
    const text = generateSpecText();
    navigator.clipboard.writeText(text);
    setCopiedQuote(true);
    setTimeout(() => setCopiedQuote(false), 3000);
  };

  const handleAddToCartClick = () => {
    playMountSound();
    if (onAddToCart) {
      onAddToCart({
        id: `custom-build-${Date.now()}`,
        name: `Custom Rig: ${selectedParts.processors?.name?.split(' ')[2] || 'Custom'} + ${selectedParts.graphicsCards?.name?.split(' ')[3] || 'RTX'}${selectedParts.monitors?.price > 0 ? ` + ${selectedParts.monitors?.brand} Screen` : ''}`,
        price: totalPrice,
        specs: selectedParts,
        image: selectedParts.cabinets?.image || "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400"
      });
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.7 } });
    }
  };

  return (
    <section id="pc-builder" className="py-20 sm:py-28 bg-[#0a0e17] border-b border-slate-800/80 relative assemble-on-scroll">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-950/70 border border-teal-500/30 text-teal-300 text-xs font-tech font-bold tracking-widest-plus uppercase mb-2 assemble-down assemble-delay-1">
            <Wrench className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
            <span>CUSTOM HARDWARE CONFIGURATOR</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-display tracking-tight text-white assemble-down assemble-delay-2">
            ASSEMBLE YOUR <span className="text-teal-400">HARDWARE RIG</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-300 font-sans assemble-down assemble-delay-3">
            Select individual components from our verified catalog. Real-time pinout socket matching, power rail headroom calculations, and frame rate estimations.
          </p>

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-5 assemble-up assemble-delay-4">
            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-tech font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              <span>Clear Workbench</span>
            </button>
            <button
              onClick={handleLoadFlagship}
              className="px-4 py-2 rounded-xl bg-teal-950/80 hover:bg-teal-900 border border-teal-500/40 text-xs font-tech font-bold uppercase tracking-wider text-teal-300 flex items-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              <span>Load 4K Flagship Preset</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE 2D BLUEPRINT RACK (REPLACES 3D VIEW) */}
        {/* ========================================================================= */}
        <div className="mb-12 rounded-2xl bg-slate-900/90 border border-slate-800 p-6 shadow-xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800 mb-6">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse"></span>
              <span className="text-xs font-tech font-bold uppercase tracking-widest text-teal-400">
                ACTIVE BLUEPRINT RACK // {installedCount} OF 9 SLOTS MOUNTED
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs font-tech">
              <span className="text-slate-400">Total TDP: <strong className="text-white">~{estimatedWattage}W</strong></span>
              <span className="text-slate-400">Estimate: <strong className="text-teal-300 font-display text-base">₹{totalPrice.toLocaleString('en-IN')}</strong></span>
            </div>
          </div>

          {/* 9 Component Slots Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {CATEGORIES.map((cat, idx) => {
              const part = selectedParts[cat.id];
              const isSelected = activeTab === cat.id;
              const Icon = cat.icon;
              return (
                <div
                  key={cat.id}
                  onClick={() => handleTabChange(cat.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all duration-200 flex items-center gap-3 relative group ${
                    isSelected
                      ? 'bg-teal-950/40 border-teal-400 ring-2 ring-teal-400/20 shadow-cyan-glow'
                      : part
                        ? 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                        : 'bg-slate-950/30 border-dashed border-slate-800 hover:border-teal-500/40 opacity-70'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border ${
                    isSelected
                      ? 'bg-teal-500 text-slate-950 border-teal-400'
                      : part
                        ? 'bg-slate-800 text-teal-400 border-slate-700'
                        : 'bg-slate-900 text-slate-600 border-slate-800'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-tech font-bold text-slate-400 uppercase tracking-wider">
                        {cat.label}
                      </span>
                      {part && (
                        <span className="text-[10px] font-tech text-teal-400 font-bold">
                          ₹{part.price.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-semibold text-white truncate font-sans mt-0.5">
                      {part ? part.name : <span className="text-slate-500 font-normal italic">Empty — click to select</span>}
                    </div>
                  </div>

                  {isSelected && (
                    <span className="w-1.5 h-6 rounded-full bg-teal-400 shrink-0"></span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MAIN BUILDER WORKSPACE: Component Picker & Summary Telemetry */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Category Tabs & Component Picker */}
          <div className="lg:col-span-8 space-y-6 assemble-left assemble-delay-2">
            
            {/* Category Navigation Pills */}
            <div className="flex overflow-x-auto pb-2 scrollbar-none gap-2">
              {CATEGORIES.map((cat) => {
                const isSelected = activeTab === cat.id;
                const isFilled = !!selectedParts[cat.id];
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleTabChange(cat.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-tech font-bold uppercase whitespace-nowrap transition-all border ${
                      isSelected 
                        ? 'bg-teal-500 text-slate-950 border-teal-400 font-extrabold shadow-cyan-glow' 
                        : isFilled 
                          ? 'bg-slate-900 text-slate-200 border-slate-800 hover:border-teal-500/50' 
                          : 'bg-slate-950/60 text-slate-500 border-slate-800/60'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{cat.label.split('. ')[1]}</span>
                    {isFilled && (
                      <span className="w-2 h-2 rounded-full bg-teal-400"></span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Selected Component Header in Active Tab */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-teal-400 uppercase tracking-widest font-tech font-bold">Mounting Into Slot</span>
                <h3 className="text-xl font-display tracking-wider text-white">
                  {CATEGORIES.find(c => c.id === activeTab)?.label}
                </h3>
              </div>
              {selectedParts[activeTab] && (
                <div className="text-right">
                  <span className="text-[10px] text-teal-400 font-tech uppercase font-bold flex items-center gap-1 justify-end">
                    <CheckCircle2 className="w-3 h-3 text-teal-400" />
                    Mounted
                  </span>
                  <div className="text-xs font-bold text-slate-200 font-sans truncate max-w-[200px] sm:max-w-xs">
                    {selectedParts[activeTab].name}
                  </div>
                </div>
              )}
            </div>

            {/* Component Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PC_PARTS[activeTab]?.map((item, idx) => {
                const isCurrentChoice = selectedParts[activeTab]?.id === item.id;
                const delayClass = `assemble-delay-${(idx % 4) + 1}`;
                return (
                  <div
                    key={item.id}
                    onClick={() => handleSelectPart(activeTab, item)}
                    className={`p-4 rounded-xl cursor-pointer transition-all duration-200 border relative group assemble-card assemble-up ${delayClass} ${
                      isCurrentChoice
                        ? 'bg-teal-950/30 border-teal-400 shadow-cyan-glow'
                        : 'bg-slate-900/80 hover:bg-slate-800 border-slate-800 hover:border-teal-500/50'
                    }`}
                  >
                    {item.popular && (
                      <span className="absolute top-3 right-3 px-2 py-0.5 rounded text-[9px] font-tech font-bold uppercase bg-amber-500/20 text-amber-400 border border-amber-500/30">
                        Top Pick
                      </span>
                    )}

                    <div className="flex items-start gap-3">
                      <div className="w-14 h-14 rounded-lg bg-slate-950 overflow-hidden flex-shrink-0 border border-slate-800">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] text-teal-400 font-tech font-bold uppercase tracking-wider">{item.brand}</div>
                        <h4 className="text-sm font-bold text-white leading-snug group-hover:text-teal-300 transition-colors font-sans">
                          {item.name}
                        </h4>
                        
                        {/* Specs badge list */}
                        <div className="flex flex-wrap gap-1.5 mt-2 text-[10px] font-tech text-slate-300">
                          {item.cores && <span className="px-1.5 py-0.5 bg-slate-950 rounded border border-slate-800">{item.cores}</span>}
                          {item.socket && <span className="px-1.5 py-0.5 bg-slate-950 rounded border border-slate-800">Socket {item.socket}</span>}
                          {item.vram && <span className="px-1.5 py-0.5 bg-slate-950 rounded border border-slate-800">{item.vram}</span>}
                          {item.capacity && <span className="px-1.5 py-0.5 bg-slate-950 rounded border border-slate-800">{item.capacity}</span>}
                          {item.size && <span className="px-1.5 py-0.5 bg-slate-950 rounded border border-slate-800">{item.size}</span>}
                          {item.resolution && <span className="px-1.5 py-0.5 bg-slate-950 rounded border border-slate-800">{item.resolution}</span>}
                          {item.refreshRate && <span className="px-1.5 py-0.5 bg-teal-950/80 rounded border border-teal-800/50 text-teal-300 font-bold">{item.refreshRate}</span>}
                          {item.panel && <span className="px-1.5 py-0.5 bg-slate-950 rounded border border-slate-800">{item.panel}</span>}
                          {item.type && <span className="px-1.5 py-0.5 bg-slate-950 rounded border border-slate-800">{item.type}</span>}
                          {item.wattage && item.wattage > 0 && <span className="px-1.5 py-0.5 bg-slate-950 rounded border border-slate-800">~{item.wattage}W</span>}
                          {item.wattageOutput && <span className="px-1.5 py-0.5 bg-slate-950 rounded border border-slate-800">{item.wattageOutput}W Output</span>}
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between">
                      <div className="text-xl font-display tracking-wider text-white">
                        ₹{item.price.toLocaleString('en-IN')}
                      </div>
                      <button
                        className={`px-3 py-1 rounded-lg text-xs font-tech font-bold uppercase tracking-wider transition-colors flex items-center gap-1 ${
                          isCurrentChoice
                            ? 'bg-teal-500 text-slate-950 font-bold'
                            : 'bg-slate-800 text-slate-300 group-hover:bg-teal-500 group-hover:text-slate-950'
                        }`}
                      >
                        {isCurrentChoice ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Mounted</span>
                          </>
                        ) : (
                          <span>Select Component</span>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Next Category Quick Advance */}
            <div className="flex justify-between items-center pt-2">
              <span className="text-xs text-slate-400 font-sans">Zero assembly fee • 100% Genuine sealed retail parts</span>
              {activeTab !== 'cabinets' && (
                <button
                  onClick={() => {
                    playClickSound();
                    const currentIndex = CATEGORIES.findIndex(c => c.id === activeTab);
                    if (currentIndex < CATEGORIES.length - 1) {
                      setActiveTab(CATEGORIES[currentIndex + 1].id);
                    }
                  }}
                  className="flex items-center gap-1 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-tech font-bold uppercase text-slate-200 hover:text-white"
                >
                  <span>Next Step</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>

          {/* Right Column: Assembly Summary, Wattage, FPS, and Checkout */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24 assemble-right assemble-delay-3">
            
            {/* Summary Box */}
            <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-5">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-xl font-display tracking-wider text-white">SYSTEM TELEMETRY</h3>
                  <p className="text-xs text-slate-400 font-sans">Zero Assembly Fee Included</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-display tracking-wider text-teal-400">
                    ₹{totalPrice.toLocaleString('en-IN')}
                  </div>
                  <span className="text-[10px] text-slate-400 font-tech uppercase">GST & Invoice Included</span>
                </div>
              </div>

              {/* Compatibility Check Banner */}
              {compatibilityIssues.length === 0 ? (
                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/60 flex items-start gap-2.5">
                  <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-tech font-bold uppercase text-emerald-400">100% Circuit Compatibility</div>
                    <div className="text-[11px] text-slate-300 font-sans">Socket pinout, VRM power delivery, and cooling are fully matched.</div>
                  </div>
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-800/60 space-y-1.5">
                  <div className="flex items-center gap-2 text-amber-400 font-tech font-bold uppercase text-xs">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Socket / Power Warning</span>
                  </div>
                  {compatibilityIssues.map((issue, idx) => (
                    <p key={idx} className="text-[11px] text-amber-200/90 font-sans leading-tight">
                      • {issue}
                    </p>
                  ))}
                </div>
              )}

              {/* Power Consumption Meter */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-xs font-tech">
                  <span className="text-slate-400 flex items-center gap-1.5 uppercase">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    System Power Load:
                  </span>
                  <span className="font-bold text-white font-mono">~{estimatedWattage} W</span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-teal-500 via-amber-500 to-red-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (estimatedWattage / (selectedParts.powerSupplies?.wattageOutput || 750)) * 100)}%` }}
                  ></div>
                </div>

                <div className="flex justify-between text-[10px] font-tech text-slate-400">
                  <span>PSU Output: {selectedParts.powerSupplies?.wattageOutput || 0}W</span>
                  <span className="text-teal-400 font-bold">Recommended: {recommendedPsu}W+</span>
                </div>
              </div>

              {/* Real-time Estimated Gaming FPS with Resolution Switcher */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs font-tech font-bold uppercase text-slate-200">
                  <div className="flex items-center gap-1.5">
                    <Gamepad2 className="w-4 h-4 text-teal-400" />
                    <span>ESTIMATED FRAME RATES</span>
                  </div>

                  {/* Resolution Selector */}
                  <div className="flex gap-1">
                    {['1080p', '1440p', '4k'].map((res) => (
                      <button
                        key={res}
                        onClick={() => {
                          playClickSound();
                          setTargetResolution(res);
                        }}
                        className={`px-1.5 py-0.5 rounded text-[9px] font-tech font-bold uppercase transition-colors ${
                          targetResolution === res 
                            ? 'bg-teal-500 text-slate-950 font-bold' 
                            : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {res}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-tech">
                  <div className="p-2 rounded bg-slate-900 border border-slate-800 flex justify-between items-center">
                    <span className="text-slate-400">Valorant:</span>
                    <span className="font-bold text-teal-300 font-mono">{gameFps.valorant}+ FPS</span>
                  </div>
                  <div className="p-2 rounded bg-slate-900 border border-slate-800 flex justify-between items-center">
                    <span className="text-slate-400">Cyberpunk:</span>
                    <span className="font-bold text-amber-400 font-mono">{gameFps.cyberpunk}+ FPS</span>
                  </div>
                  <div className="p-2 rounded bg-slate-900 border border-slate-800 flex justify-between items-center">
                    <span className="text-slate-400">GTA V:</span>
                    <span className="font-bold text-teal-300 font-mono">{gameFps.gta5}+ FPS</span>
                  </div>
                  <div className="p-2 rounded bg-slate-900 border border-slate-800 flex justify-between items-center">
                    <span className="text-slate-400">Warzone:</span>
                    <span className="font-bold text-amber-400 font-mono">{gameFps.warzone}+ FPS</span>
                  </div>
                </div>
              </div>

              {/* Test Bench Button (Fire Up Rig) */}
              <button
                onClick={handleFireUpBench}
                disabled={benchmarking}
                className={`w-full py-3 px-4 rounded-xl font-tech font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 border ${
                  benchmarking 
                    ? 'bg-amber-950 text-amber-300 border-amber-600 animate-pulse' 
                    : systemFired
                      ? 'bg-teal-950/80 text-teal-300 border-teal-500 shadow-cyan-glow'
                      : 'bg-slate-950 hover:bg-slate-800 text-slate-200 hover:text-white border-slate-800'
                }`}
              >
                <Power className="w-4 h-4 text-teal-400" />
                <span>
                  {benchmarking 
                    ? "RUNNING BENCHMARK SIMULATION..." 
                    : systemFired 
                      ? "SYSTEM TESTED • 100% OPERATIONAL" 
                      : "TEST BENCH & FIRE UP SYSTEM"}
                </span>
              </button>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                {/* Add to Cart */}
                <button
                  onClick={handleAddToCartClick}
                  className="w-full flex items-center justify-center gap-2 py-4 px-4 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-tech font-extrabold text-xs uppercase tracking-wider shadow-cyan-glow transition-all transform hover:-translate-y-0.5"
                >
                  <ShoppingBag className="w-4 h-4 text-slate-950" />
                  <span>Add Assembled Rig to Cart</span>
                </button>

                {/* Official Blueprint / PDF Quotation Sheet Button */}
                <button
                  onClick={() => {
                    playMountSound();
                    setBlueprintModalOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-tech font-bold text-xs uppercase tracking-wider transition-all shadow-md group"
                >
                  <FileText className="w-4 h-4 text-teal-400 group-hover:scale-110 transition-transform" />
                  <span>Open Official Blueprint & Quotation (PDF)</span>
                </button>

                {/* Copy Spec / Print */}
                <div className="flex gap-2">
                  <button
                    onClick={handleCopySpec}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-tech font-bold uppercase tracking-wider text-slate-300 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5 text-slate-400" />
                    <span>{copiedQuote ? "Copied Spec Sheet!" : "Quick Copy Spec Sheet"}</span>
                  </button>
                </div>

              </div>

              {/* Included Services Badges */}
              <div className="border-t border-slate-800 pt-3 text-[11px] text-slate-300 font-sans space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span>Free Assembly & Cable Grooming</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span>24-Hour Stress Testing & OS Configuration</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span>3-Year Hardware Warranty + Pan-India Shipping</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* OFFICIAL ASSEMBLY BLUEPRINT & QUOTATION MODAL */}
      {/* ========================================================================= */}
      {blueprintModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 animate-fadeIn overflow-y-auto">
          <div 
            id="blueprint-quotation-print"
            className="bg-slate-900 border border-teal-500/50 rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative text-white my-auto"
          >
            {/* Top Close Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6 print-hide">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-ping"></span>
                <span className="text-xs font-tech font-bold uppercase tracking-widest text-teal-400">
                  OFFICIAL STORE BLUEPRINT SPECIFICATION
                </span>
              </div>
              <button 
                onClick={() => setBlueprintModalOpen(false)}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Document Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-display tracking-wider text-white flex items-center gap-2">
                  <span>GAMES WORLD</span>
                  <span className="text-teal-400 text-xs px-2 py-0.5 rounded bg-teal-950/80 border border-teal-800 font-tech font-bold uppercase">
                    CHENNAI
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-sans">
                  Athipatten Street, 3rd Floor, Landmark - Bharat Petroleum Back Side, Chennai
                </p>
                <p className="text-xs text-slate-400 font-tech">
                  Store Hours: {COMPANY_INFO.hours}
                </p>
              </div>

              <div className="text-left sm:text-right space-y-1 font-tech text-xs">
                <div className="text-teal-400 font-bold">DOC REF: GW-{Date.now().toString().slice(-6)}</div>
                <div className="text-slate-400">DATE: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                <div className="text-emerald-400 font-bold uppercase">BURN-IN: CERTIFIED 24-HR</div>
              </div>
            </div>

            {/* Itemized Hardware Table */}
            <div className="my-6 overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead>
                  <tr className="border-b border-slate-800 text-[11px] font-tech uppercase text-slate-400">
                    <th className="pb-2">Assembly Slot</th>
                    <th className="pb-2">Component Model</th>
                    <th className="pb-2 text-center">Load</th>
                    <th className="pb-2 text-right">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {CATEGORIES.map((cat) => {
                    const part = selectedParts[cat.id];
                    if (!part) return null;
                    return (
                      <tr key={cat.id} className="text-xs">
                        <td className="py-2.5 font-tech font-bold text-teal-400 whitespace-nowrap">
                          {cat.slotName}
                        </td>
                        <td className="py-2.5 text-slate-200 font-medium">
                          {part.name}
                        </td>
                        <td className="py-2.5 text-center font-mono text-slate-400">
                          {part.wattage ? `${part.wattage}W` : '—'}
                        </td>
                        <td className="py-2.5 text-right font-display text-base text-white tracking-wider">
                          ₹{part.price.toLocaleString('en-IN')}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Total Wattage and Pricing Summary */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 mb-6">
              <div className="flex justify-between items-center text-xs font-tech">
                <span className="text-slate-400">Total System TDP Load:</span>
                <span className="font-bold text-white font-mono">~{estimatedWattage} W (Recommended PSU: {recommendedPsu}W+)</span>
              </div>
              <div className="flex justify-between items-center text-xs font-tech">
                <span className="text-slate-400">Professional Bench Assembly:</span>
                <span className="font-bold text-emerald-400 uppercase">FREE (₹0)</span>
              </div>
              <div className="flex justify-between items-center text-xs font-tech">
                <span className="text-slate-400">Thermal Grizzly Kryonaut TIM Application:</span>
                <span className="font-bold text-emerald-400 uppercase">INCLUDED</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between items-baseline">
                <span className="text-sm font-tech font-bold text-white uppercase tracking-wider">Total Quotation Value:</span>
                <div className="text-3xl font-display tracking-wider text-teal-400">
                  ₹{totalPrice.toLocaleString('en-IN')}
                </div>
              </div>
            </div>

            {/* QA Verification Seal */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-teal-950/30 border border-teal-800/40 text-xs text-slate-300">
              <div className="space-y-0.5">
                <div className="font-tech font-bold text-white uppercase flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>3-YEAR ON-SITE HARDWARE WARRANTY COVERAGE</span>
                </div>
                <p className="text-[11px] text-slate-400 font-sans">
                  Official GST invoice provided for individual brand warranties.
                </p>
              </div>
              <div className="text-[10px] font-tech text-teal-400 font-bold uppercase whitespace-nowrap border border-teal-800 px-2.5 py-1 rounded">
                GAMES WORLD QA PASSED
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-end gap-3 print-hide">
              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs font-tech font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
              >
                <Printer className="w-4 h-4 text-teal-400" />
                <span>Print Document (PDF)</span>
              </button>

              <button
                onClick={handleCopySpec}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs font-tech font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
              >
                <span>{copiedQuote ? "Copied to Clipboard!" : "Copy Text"}</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
