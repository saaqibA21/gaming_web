import React, { useState, useMemo } from 'react';
import { PC_PARTS, COMPANY_INFO } from '../data/mockData';
import { 
  Cpu, 
  CircuitBoard, 
  Layers, 
  HardDrive, 
  Fan, 
  Zap, 
  Box, 
  Check, 
  AlertTriangle, 
  Share2, 
  Printer, 
  ShoppingBag, 
  RotateCcw, 
  Sparkles,
  Gamepad2,
  ChevronRight,
  ShieldCheck,
  Flame,
  Wrench,
  Power,
  Sliders,
  CheckCircle2,
  FileText,
  X,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playClickSound, playMountSound, playBootSound } from '../utils/audioEffects';

const CATEGORIES = [
  { id: 'processors', label: '1. Processor (CPU)', slotName: 'CPU SOCKET', icon: Cpu },
  { id: 'motherboards', label: '2. Motherboard', slotName: 'MOTHERBOARD PCB', icon: CircuitBoard },
  { id: 'graphicsCards', label: '3. Graphics Card (GPU)', slotName: 'PCIE 5.0 X16', icon: Layers },
  { id: 'rams', label: '4. Memory (RAM)', slotName: 'DIMM 2 & 4', icon: Box },
  { id: 'storages', label: '5. Storage (NVMe SSD)', slotName: 'M.2 GEN4 SLOT', icon: HardDrive },
  { id: 'coolers', label: '6. CPU Cooler', slotName: 'COLDPLATE & AIO', icon: Fan },
  { id: 'powerSupplies', label: '7. Power Supply (PSU)', slotName: 'PSU COMPARTMENT', icon: Zap },
  { id: 'cabinets', label: '8. Cabinet / Case', slotName: 'CHASSIS FRAME', icon: Box }
];

export default function PcBuilder({ onAddToCart }) {
  // Initial default build (high-performance balanced rig)
  const [selectedParts, setSelectedParts] = useState({
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
  const [lastMountedSlot, setLastMountedSlot] = useState('processors');
  const [benchmarking, setBenchmarking] = useState(false);
  const [systemFired, setSystemFired] = useState(false);
  const [targetResolution, setTargetResolution] = useState('1440p'); // '1080p', '1440p', '4k'
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
    setLastMountedSlot(category);
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
      processors: PC_PARTS.processors[0],
      motherboards: PC_PARTS.motherboards[0],
      graphicsCards: PC_PARTS.graphicsCards[0],
      rams: PC_PARTS.rams[0],
      storages: PC_PARTS.storages[0],
      coolers: PC_PARTS.coolers[0],
      powerSupplies: PC_PARTS.powerSupplies[0],
      cabinets: PC_PARTS.cabinets[0]
    });
    setSystemFired(false);
  };

  const handleLoadFlagship = () => {
    playMountSound();
    setSelectedParts({
      processors: PC_PARTS.processors[2], // 9800X3D
      motherboards: PC_PARTS.motherboards[1],
      graphicsCards: PC_PARTS.graphicsCards[4], // RTX 4080 Super
      rams: PC_PARTS.rams[2],
      storages: PC_PARTS.storages[3],
      coolers: PC_PARTS.coolers[3],
      powerSupplies: PC_PARTS.powerSupplies[2],
      cabinets: PC_PARTS.cabinets[1]
    });
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
  };

  const handleFireUpBench = () => {
    playBootSound();
    setBenchmarking(true);
    setTimeout(() => {
      setBenchmarking(false);
      setSystemFired(true);
      confetti({ particleCount: 70, spread: 80, origin: { y: 0.5 } });
    }, 2200);
  };

  const generateSpecText = () => {
    return `*GAMES WORLD CHENNAI - HARDWARE ASSEMBLY QUOTATION*
Date: ${new Date().toLocaleDateString('en-IN')}
---------------------------------
[ASSEMBLY BAY SPECIFICATION]
• 01. CPU: ${selectedParts.processors?.name || 'Not mounted'}
• 02. Motherboard: ${selectedParts.motherboards?.name || 'Not mounted'}
• 03. GPU: ${selectedParts.graphicsCards?.name || 'Not mounted'}
• 04. RAM: ${selectedParts.rams?.name || 'Not mounted'}
• 05. NVMe Storage: ${selectedParts.storages?.name || 'Not mounted'}
• 06. CPU Cooler: ${selectedParts.coolers?.name || 'Not mounted'}
• 07. Power Supply: ${selectedParts.powerSupplies?.name || 'Not mounted'}
• 08. Case Chassis: ${selectedParts.cabinets?.name || 'Not mounted'}
---------------------------------
*TOTAL ESTIMATE: ₹${totalPrice.toLocaleString('en-IN')}* (GST Included)
• Zero Assembly Charge
• Cable Management & 24hr Burn-In Included
• 3-Year Hardware Warranty
---------------------------------
Games World - Athipatten Street, Chennai
Contact: ${COMPANY_INFO.primaryPhone}`;
  };

  const handleCopySpec = () => {
    playClickSound();
    const text = generateSpecText();
    navigator.clipboard.writeText(text);
    setCopiedQuote(true);
    setTimeout(() => setCopiedQuote(false), 3000);
  };

  const handleWhatsAppOrder = () => {
    playClickSound();
    const text = encodeURIComponent(`Hi Games World! I configured this PC on your website assembly bay and want to confirm stock & delivery:\n\n${generateSpecText()}`);
    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  const handleAddToCartClick = () => {
    playMountSound();
    if (onAddToCart) {
      onAddToCart({
        id: `custom-build-${Date.now()}`,
        name: `Custom PC: ${selectedParts.processors?.name?.split(' ')[2] || 'Custom'} + ${selectedParts.graphicsCards?.name?.split(' ')[3] || 'RTX'}`,
        price: totalPrice,
        specs: selectedParts,
        image: selectedParts.cabinets?.image || "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400"
      });
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.7 } });
    }
  };

  return (
    <section id="pc-builder" className="py-16 sm:py-24 bg-[#0a0a0f]/90 backdrop-blur-md border-b border-gw-border relative blueprint-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Assembly Bay Branding */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-700/60 text-red-400 text-xs font-tech font-bold tracking-widest-plus uppercase mb-2">
            <Wrench className="w-3.5 h-3.5 text-red-500 animate-pulse" />
            <span>INTERACTIVE HARDWARE ASSEMBLY BAY</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-display tracking-tight text-white">
            ASSEMBLE YOUR <span className="text-red-600">BATTLE RIG</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-300 font-sans">
            Slot in each component step-by-step. Our engine validates pinout socket matching, power rail wattage headroom, and real-world frame rates in real time.
          </p>

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-5">
            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-lg bg-gw-card hover:bg-gw-card-hover border border-gw-border text-xs font-tech font-bold uppercase tracking-wider text-gray-300 flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-gray-400" />
              <span>Clear Workbench</span>
            </button>
            <button
              onClick={handleLoadFlagship}
              className="px-4 py-2 rounded-lg bg-red-950/80 hover:bg-red-900 border border-red-600/50 text-xs font-tech font-bold uppercase tracking-wider text-red-300 flex items-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-red-400" />
              <span>Load 4K Flagship Preset</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* VIRTUAL MOTHERBOARD & CHASSIS ASSEMBLY BAY SCHEMATIC */}
        {/* ========================================================================= */}
        <div className="mb-10 p-5 sm:p-6 rounded-2xl bg-black/80 border border-red-900/50 shadow-2xl relative overflow-hidden backdrop-blur-md">
          
          {/* Laser scanning line animation across the workbench */}
          <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-500/40 to-transparent pointer-events-none animate-laser-scan"></div>

          {/* Header row of schematic */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-gw-border mb-5">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-ping"></div>
              <div>
                <h3 className="text-xl font-display tracking-wider text-white flex items-center gap-2">
                  <span>LIVE HARDWARE BENCH SCHEMATIC</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-red-950 text-red-400 border border-red-800 font-tech font-bold">
                    BAY 01
                  </span>
                </h3>
                <p className="text-[11px] text-gray-400 font-sans">
                  Click any slot to switch category and mount/swap components.
                </p>
              </div>
            </div>

            {/* Assembly Progress Meter */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="flex-1 sm:w-48 bg-gray-900 rounded-full h-3 border border-gw-border overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-red-600 to-amber-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${(installedCount / 8) * 100}%` }}
                ></div>
              </div>
              <span className="text-xs font-tech font-bold text-white whitespace-nowrap">
                {installedCount}/8 SLOTS ({Math.round((installedCount / 8) * 100)}%)
              </span>
            </div>
          </div>

          {/* 8 Schematic Slot Panels */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
            {CATEGORIES.map((cat) => {
              const isSelected = activeTab === cat.id;
              const item = selectedParts[cat.id];
              const isLastMounted = lastMountedSlot === cat.id;

              return (
                <div
                  key={cat.id}
                  onClick={() => handleTabChange(cat.id)}
                  className={`p-3 rounded-xl cursor-pointer border transition-all relative flex flex-col justify-between min-h-[110px] ${
                    isLastMounted ? 'animate-slot-snap' : ''
                  } ${
                    isSelected 
                      ? 'bg-red-950/40 border-red-500 shadow-red-glow' 
                      : item 
                        ? 'bg-gw-card/90 border-gw-border hover:border-gray-500' 
                        : 'bg-black/50 border-dashed border-gray-700 hover:border-red-500/50'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-[9px] font-tech text-gray-400 uppercase tracking-wider mb-1">
                      <span>{cat.slotName.split(' ')[0]}</span>
                      {item ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <span className="text-amber-500 font-bold">EMPTY</span>
                      )}
                    </div>
                    <div className="text-xs font-bold text-white leading-tight font-sans line-clamp-2">
                      {item ? item.name : `Slot ${cat.label.split('. ')[1]}`}
                    </div>
                  </div>

                  <div className="pt-2 text-[10px] font-tech font-bold">
                    {item ? (
                      <span className="text-red-400 font-mono">₹{item.price.toLocaleString('en-IN')}</span>
                    ) : (
                      <span className="text-gray-500 uppercase">+ Click to slot</span>
                    )}
                  </div>
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
          <div className="lg:col-span-8 space-y-6">
            
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
                        ? 'bg-red-600 text-white border-red-500 shadow-red-glow' 
                        : isFilled 
                          ? 'bg-gw-card text-gray-200 border-gw-border hover:border-gray-500' 
                          : 'bg-black/50 text-gray-500 border-gw-border/50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{cat.label.split('. ')[1]}</span>
                    {isFilled && (
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Selected Component Header in Active Tab */}
            <div className="p-4 rounded-xl bg-gw-card border border-gw-border flex items-center justify-between">
              <div>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-tech">Mounting Into Slot</span>
                <h3 className="text-xl font-display tracking-wider text-white">
                  {CATEGORIES.find(c => c.id === activeTab)?.label}
                </h3>
              </div>
              {selectedParts[activeTab] && (
                <div className="text-right">
                  <span className="text-[10px] text-emerald-400 font-tech uppercase font-bold flex items-center gap-1 justify-end">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    Slot Latched
                  </span>
                  <div className="text-xs font-bold text-red-400 font-sans truncate max-w-[200px] sm:max-w-xs">
                    {selectedParts[activeTab].name}
                  </div>
                </div>
              )}
            </div>

            {/* Component Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PC_PARTS[activeTab]?.map((item) => {
                const isCurrentChoice = selectedParts[activeTab]?.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => handleSelectPart(activeTab, item)}
                    className={`p-4 rounded-xl cursor-pointer transition-all duration-200 border relative group ${
                      isCurrentChoice
                        ? 'bg-gradient-to-br from-red-950/60 to-gw-card border-red-600 shadow-red-glow'
                        : 'bg-gw-card hover:bg-gw-card-hover border-gw-border hover:border-gray-600'
                    }`}
                  >
                    {item.popular && (
                      <span className="absolute top-3 right-3 px-2 py-0.5 rounded text-[9px] font-tech font-bold uppercase bg-amber-500/20 text-amber-400 border border-amber-500/30">
                        Top Pick
                      </span>
                    )}

                    <div className="flex items-start gap-3">
                      <div className="w-14 h-14 rounded-lg bg-black/60 overflow-hidden flex-shrink-0 border border-gw-border">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] text-red-500 font-tech font-bold uppercase tracking-wider">{item.brand}</div>
                        <h4 className="text-sm font-bold text-white leading-snug group-hover:text-red-300 transition-colors font-sans">
                          {item.name}
                        </h4>
                        
                        {/* Specs badge list */}
                        <div className="flex flex-wrap gap-1.5 mt-2 text-[10px] font-tech text-gray-300">
                          {item.cores && <span className="px-1.5 py-0.5 bg-black/50 rounded border border-gw-border">{item.cores}</span>}
                          {item.socket && <span className="px-1.5 py-0.5 bg-black/50 rounded border border-gw-border">Socket {item.socket}</span>}
                          {item.vram && <span className="px-1.5 py-0.5 bg-black/50 rounded border border-gw-border">{item.vram}</span>}
                          {item.capacity && <span className="px-1.5 py-0.5 bg-black/50 rounded border border-gw-border">{item.capacity}</span>}
                          {item.wattage && <span className="px-1.5 py-0.5 bg-black/50 rounded border border-gw-border">~{item.wattage}W</span>}
                          {item.wattageOutput && <span className="px-1.5 py-0.5 bg-black/50 rounded border border-gw-border">{item.wattageOutput}W Output</span>}
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-gw-border/50 flex items-center justify-between">
                      <div className="text-xl font-display tracking-wider text-white">
                        ₹{item.price.toLocaleString('en-IN')}
                      </div>
                      <button
                        className={`px-3 py-1 rounded-lg text-xs font-tech font-bold uppercase tracking-wider transition-colors flex items-center gap-1 ${
                          isCurrentChoice
                            ? 'bg-red-600 text-white'
                            : 'bg-black/60 text-gray-300 group-hover:bg-red-600 group-hover:text-white'
                        }`}
                      >
                        {isCurrentChoice ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Slot Latched</span>
                          </>
                        ) : (
                          <span>Slot In</span>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Next Category Quick Advance */}
            <div className="flex justify-between items-center pt-2">
              <span className="text-xs text-gray-400 font-sans">Technician direct line: <span className="text-white font-semibold">{COMPANY_INFO.primaryPhone}</span></span>
              {activeTab !== 'cabinets' && (
                <button
                  onClick={() => {
                    playClickSound();
                    const currentIndex = CATEGORIES.findIndex(c => c.id === activeTab);
                    if (currentIndex < CATEGORIES.length - 1) {
                      setActiveTab(CATEGORIES[currentIndex + 1].id);
                    }
                  }}
                  className="flex items-center gap-1 px-4 py-2 rounded-lg bg-gw-card hover:bg-gw-card-hover border border-gw-border text-xs font-tech font-bold uppercase text-gray-200 hover:text-white"
                >
                  <span>Next Assembly Step</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>

          {/* Right Column: Assembly Summary, Wattage, FPS, and Checkout */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            
            {/* Summary Box */}
            <div className="bg-gw-card rounded-2xl p-6 border border-gw-border shadow-xl space-y-5">
              
              <div className="flex items-center justify-between border-b border-gw-border pb-4">
                <div>
                  <h3 className="text-xl font-display tracking-wider text-white">ASSEMBLY TELEMETRY</h3>
                  <p className="text-xs text-gray-400 font-sans">Zero Assembly Fee Included</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-display tracking-wider text-red-500 drop-shadow-[0_0_10px_rgba(229,9,20,0.5)]">
                    ₹{totalPrice.toLocaleString('en-IN')}
                  </div>
                  <span className="text-[10px] text-gray-400 font-tech uppercase">GST & Invoice Included</span>
                </div>
              </div>

              {/* Compatibility Check Banner */}
              {compatibilityIssues.length === 0 ? (
                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/60 flex items-start gap-2.5">
                  <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-tech font-bold uppercase text-emerald-400">100% Circuit Compatibility</div>
                    <div className="text-[11px] text-gray-300 font-sans">Socket pinout, VRM power delivery, and cooling are fully matched.</div>
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
              <div className="p-4 rounded-xl bg-black/50 border border-gw-border space-y-2">
                <div className="flex justify-between items-center text-xs font-tech">
                  <span className="text-gray-400 flex items-center gap-1.5 uppercase">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    System Power Load:
                  </span>
                  <span className="font-bold text-white font-mono">~{estimatedWattage} W</span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (estimatedWattage / (selectedParts.powerSupplies?.wattageOutput || 750)) * 100)}%` }}
                  ></div>
                </div>

                <div className="flex justify-between text-[10px] font-tech text-gray-400">
                  <span>PSU Output: {selectedParts.powerSupplies?.wattageOutput || 0}W</span>
                  <span className="text-emerald-400 font-bold">Recommended: {recommendedPsu}W+</span>
                </div>
              </div>

              {/* Real-time Estimated Gaming FPS with Resolution Switcher */}
              <div className="p-4 rounded-xl bg-black/50 border border-gw-border space-y-3">
                <div className="flex items-center justify-between text-xs font-tech font-bold uppercase text-gray-200">
                  <div className="flex items-center gap-1.5">
                    <Gamepad2 className="w-4 h-4 text-red-500" />
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
                            ? 'bg-red-600 text-white' 
                            : 'bg-gw-card text-gray-400 hover:text-white'
                        }`}
                      >
                        {res}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-tech">
                  <div className="p-2 rounded bg-[#111118] border border-gw-border flex justify-between items-center">
                    <span className="text-gray-400">Valorant:</span>
                    <span className="font-bold text-emerald-400 font-mono">{gameFps.valorant}+ FPS</span>
                  </div>
                  <div className="p-2 rounded bg-[#111118] border border-gw-border flex justify-between items-center">
                    <span className="text-gray-400">Cyberpunk:</span>
                    <span className="font-bold text-amber-400 font-mono">{gameFps.cyberpunk}+ FPS</span>
                  </div>
                  <div className="p-2 rounded bg-[#111118] border border-gw-border flex justify-between items-center">
                    <span className="text-gray-400">GTA V:</span>
                    <span className="font-bold text-emerald-400 font-mono">{gameFps.gta5}+ FPS</span>
                  </div>
                  <div className="p-2 rounded bg-[#111118] border border-gw-border flex justify-between items-center">
                    <span className="text-gray-400">Warzone:</span>
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
                      ? 'bg-emerald-950/80 text-emerald-400 border-emerald-600 shadow-lg shadow-emerald-950/40'
                      : 'bg-black/60 hover:bg-black text-gray-200 hover:text-white border-gw-border'
                }`}
              >
                <Power className="w-4 h-4 text-red-500" />
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
                
                {/* 1-Click WhatsApp Order */}
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-tech font-bold text-xs uppercase tracking-wider shadow-lg transition-all transform hover:-translate-y-0.5"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Send Spec Sheet to WhatsApp</span>
                </button>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCartClick}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-tech font-bold text-xs uppercase tracking-wider shadow-red-glow transition-all"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add Assembled Rig to Cart</span>
                </button>

                {/* Official Blueprint / PDF Quotation Sheet Button */}
                <button
                  onClick={() => {
                    playMountSound();
                    setBlueprintModalOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-red-950 via-[#181822] to-black hover:border-red-500 border border-red-800/60 text-white font-tech font-bold text-xs uppercase tracking-wider transition-all shadow-md group"
                >
                  <FileText className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
                  <span>Open Official Blueprint & Quotation (PDF)</span>
                </button>

                {/* Copy Spec / Print / Call Store */}
                <div className="flex gap-2">
                  <button
                    onClick={handleCopySpec}
                    className="flex-1 py-2.5 px-3 rounded-lg bg-gw-card hover:bg-gw-card-hover border border-gw-border text-xs font-tech font-bold uppercase tracking-wider text-gray-300 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5 text-gray-400" />
                    <span>{copiedQuote ? "Copied!" : "Quick Copy"}</span>
                  </button>
                  <a
                    href={`tel:${COMPANY_INFO.primaryPhone}`}
                    className="py-2.5 px-4 rounded-lg bg-gw-card hover:bg-gw-card-hover border border-gw-border text-xs font-tech font-bold uppercase tracking-wider text-gray-300 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Call Store</span>
                  </a>
                </div>

              </div>

              {/* Included Services Badges */}
              <div className="border-t border-gw-border/60 pt-3 text-[11px] text-gray-300 font-sans space-y-1">
                <div>✔ Free Assembly & Master Cable Management</div>
                <div>✔ 24-Hour Stress Testing & OS Configuration</div>
                <div>✔ 3-Year Hardware Warranty + Safe Transit Packaging</div>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* OFFICIAL ASSEMBLY BLUEPRINT & QUOTATION MODAL */}
      {/* ========================================================================= */}
      {blueprintModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
          <div 
            id="blueprint-quotation-print"
            className="bg-[#0e0e14] border border-red-600/60 rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative text-white my-auto"
          >
            {/* Top Close Bar (hidden on print) */}
            <div className="flex items-center justify-between pb-4 border-b border-gw-border mb-6 print-hide">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
                <span className="text-xs font-tech font-bold uppercase tracking-widest text-red-500">
                  OFFICIAL STORE BLUEPRINT SPECIFICATION
                </span>
              </div>
              <button 
                onClick={() => setBlueprintModalOpen(false)}
                className="w-8 h-8 rounded-lg bg-gw-card hover:bg-red-600/30 text-gray-400 hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Document Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-gray-800">
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-display tracking-wider text-white flex items-center gap-2">
                  <span>GAMES WORLD</span>
                  <span className="text-red-600 text-xs px-2 py-0.5 rounded bg-red-950/80 border border-red-800 font-tech font-bold uppercase">
                    CHENNAI
                  </span>
                </div>
                <p className="text-xs text-gray-400 font-sans">
                  Athipatten Street, 3rd Floor, Landmark - Bharat Petroleum Back Side, Chennai
                </p>
                <p className="text-xs text-gray-400 font-tech">
                  Phone: {COMPANY_INFO.primaryPhone} | {COMPANY_INFO.secondaryPhone}
                </p>
              </div>

              <div className="text-left sm:text-right space-y-1 font-tech text-xs">
                <div className="text-red-400 font-bold">DOC REF: GW-{Date.now().toString().slice(-6)}</div>
                <div className="text-gray-400">DATE: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                <div className="text-emerald-400 font-bold uppercase">BURN-IN: CERTIFIED 24-HR</div>
              </div>
            </div>

            {/* Itemized Hardware Table */}
            <div className="my-6 overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead>
                  <tr className="border-b border-gray-800 text-[11px] font-tech uppercase text-gray-400">
                    <th className="pb-2">Assembly Slot</th>
                    <th className="pb-2">Component Model</th>
                    <th className="pb-2 text-center">Load</th>
                    <th className="pb-2 text-right">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/60">
                  {CATEGORIES.map((cat) => {
                    const part = selectedParts[cat.id];
                    if (!part) return null;
                    return (
                      <tr key={cat.id} className="text-xs">
                        <td className="py-2.5 font-tech font-bold text-red-400 whitespace-nowrap">
                          {cat.slotName}
                        </td>
                        <td className="py-2.5 text-gray-200 font-medium">
                          {part.name}
                        </td>
                        <td className="py-2.5 text-center font-mono text-gray-400">
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
            <div className="p-4 rounded-xl bg-black/60 border border-gw-border space-y-2 mb-6">
              <div className="flex justify-between items-center text-xs font-tech">
                <span className="text-gray-400">Total System TDP Load:</span>
                <span className="font-bold text-white font-mono">~{estimatedWattage} W (Recommended PSU: {recommendedPsu}W+)</span>
              </div>
              <div className="flex justify-between items-center text-xs font-tech">
                <span className="text-gray-400">Professional Bench Assembly:</span>
                <span className="font-bold text-emerald-400 uppercase">FREE (₹0)</span>
              </div>
              <div className="flex justify-between items-center text-xs font-tech">
                <span className="text-gray-400">Thermal Grizzly Kryonaut TIM Application:</span>
                <span className="font-bold text-emerald-400 uppercase">INCLUDED</span>
              </div>
              <div className="pt-2 border-t border-gray-800 flex justify-between items-baseline">
                <span className="text-sm font-tech font-bold text-white uppercase tracking-wider">Total Quotation Value:</span>
                <div className="text-3xl font-display tracking-wider text-red-500">
                  ₹{totalPrice.toLocaleString('en-IN')}
                </div>
              </div>
            </div>

            {/* QA Verification Seal */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-red-950/20 border border-red-900/40 text-xs text-gray-300">
              <div className="space-y-0.5">
                <div className="font-tech font-bold text-white uppercase flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>3-YEAR ON-SITE HARDWARE WARRANTY COVERAGE</span>
                </div>
                <p className="text-[11px] text-gray-400 font-sans">
                  Official GST invoice provided for individual brand warranties (Intel/AMD, NVIDIA, Corsair, Samsung).
                </p>
              </div>
              <div className="text-[10px] font-tech text-red-400 font-bold uppercase whitespace-nowrap border border-red-800/80 px-2.5 py-1 rounded">
                GAMES WORLD QA PASSED
              </div>
            </div>

            {/* Action Bar (hidden on print) */}
            <div className="mt-6 pt-4 border-t border-gw-border flex flex-wrap items-center justify-end gap-3 print-hide">
              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 rounded-xl bg-gw-card hover:bg-gw-card-hover border border-gw-border text-white text-xs font-tech font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
              >
                <Printer className="w-4 h-4 text-red-500" />
                <span>Print Document (PDF)</span>
              </button>

              <button
                onClick={handleCopySpec}
                className="px-5 py-2.5 rounded-xl bg-gw-card hover:bg-gw-card-hover border border-gw-border text-white text-xs font-tech font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
              >
                <span>{copiedQuote ? "Copied to Clipboard!" : "Copy Text"}</span>
              </button>

              <button
                onClick={handleWhatsAppOrder}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-tech font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-lg"
              >
                <Share2 className="w-4 h-4" />
                <span>Send to WhatsApp</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
