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
  Flame
} from 'lucide-react';
import confetti from 'canvas-confetti';

const CATEGORIES = [
  { id: 'processors', label: '1. Processor (CPU)', icon: Cpu },
  { id: 'motherboards', label: '2. Motherboard', icon: CircuitBoard },
  { id: 'graphicsCards', label: '3. Graphics Card (GPU)', icon: Layers },
  { id: 'rams', label: '4. Memory (RAM)', icon: Box },
  { id: 'storages', label: '5. Storage (NVMe SSD)', icon: HardDrive },
  { id: 'coolers', label: '6. CPU Cooler', icon: Fan },
  { id: 'powerSupplies', label: '7. Power Supply (PSU)', icon: Zap },
  { id: 'cabinets', label: '8. Cabinet / Case', icon: Box }
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

  // Calculations
  const totalPrice = useMemo(() => {
    return Object.values(selectedParts).reduce((sum, part) => sum + (part ? part.price : 0), 0);
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

  // FPS calculations
  const gameFps = useMemo(() => {
    const gpuMult = selectedParts.graphicsCards ? selectedParts.graphicsCards.fpsMultiplier : 1.0;
    return {
      valorant: Math.round(340 * gpuMult),
      cyberpunk: Math.round(55 * gpuMult),
      gta5: Math.round(110 * gpuMult),
      warzone: Math.round(85 * gpuMult)
    };
  }, [selectedParts.graphicsCards]);

  const handleSelectPart = (category, part) => {
    setSelectedParts(prev => ({
      ...prev,
      [category]: part
    }));
  };

  const handleReset = () => {
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
  };

  const handleLoadFlagship = () => {
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

  const generateSpecText = () => {
    return `*GAMES WORLD CHENNAI - OFFICIAL PC QUOTATION*
Date: ${new Date().toLocaleDateString('en-IN')}
---------------------------------
• CPU: ${selectedParts.processors?.name || 'Not selected'}
• Motherboard: ${selectedParts.motherboards?.name || 'Not selected'}
• GPU: ${selectedParts.graphicsCards?.name || 'Not selected'}
• RAM: ${selectedParts.rams?.name || 'Not selected'}
• Storage: ${selectedParts.storages?.name || 'Not selected'}
• Cooler: ${selectedParts.coolers?.name || 'Not selected'}
• Power Supply: ${selectedParts.powerSupplies?.name || 'Not selected'}
• Case: ${selectedParts.cabinets?.name || 'Not selected'}
---------------------------------
*TOTAL ESTIMATE: ₹${totalPrice.toLocaleString('en-IN')}* (GST Included)
• Zero Assembly Fee
• 24-Hour Stress Testing Included
• 3-Year Hardware Warranty
---------------------------------
Games World - Athipatten Street, Chennai
Contact: ${COMPANY_INFO.primaryPhone}`;
  };

  const handleCopySpec = () => {
    const text = generateSpecText();
    navigator.clipboard.writeText(text);
    setCopiedQuote(true);
    setTimeout(() => setCopiedQuote(false), 3000);
  };

  const handleWhatsAppOrder = () => {
    const text = encodeURIComponent(`Hi Games World! I configured this PC on your website and want to confirm stock & delivery:\n\n${generateSpecText()}`);
    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  const handleAddToCartClick = () => {
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
    <section id="pc-builder" className="py-16 sm:py-20 bg-[#0a0a0f]/85 backdrop-blur-md border-b border-gw-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-red-500 font-tech font-bold tracking-widest-plus text-xs uppercase mb-2">
            FACTORY-DIRECT HARDWARE PICKER
          </div>
          <h2 className="text-4xl sm:text-6xl font-display tracking-tight text-white">
            CUSTOM PC <span className="text-red-600">CONFIGURATOR</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-300 font-sans">
            Build with guaranteed AM5 / LGA1700 socket compatibility, dynamic power supply wattage calculation, and verified gaming frame rates. Zero build fee.
          </p>

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-5">
            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-lg bg-gw-card hover:bg-gw-card-hover border border-gw-border text-xs font-tech font-bold uppercase tracking-wider text-gray-300 flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-gray-400" />
              <span>Reset Configuration</span>
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

        {/* Builder Layout */}
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
                    onClick={() => setActiveTab(cat.id)}
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
                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-tech">Selecting</span>
                <h3 className="text-xl font-display tracking-wider text-white">
                  {CATEGORIES.find(c => c.id === activeTab)?.label}
                </h3>
              </div>
              {selectedParts[activeTab] && (
                <div className="text-right">
                  <span className="text-[10px] text-gray-400 font-tech uppercase">Current Choice</span>
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
                            <span>Selected</span>
                          </>
                        ) : (
                          <span>Select Part</span>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Next Category Quick Advance */}
            <div className="flex justify-between items-center pt-2">
              <span className="text-xs text-gray-400 font-sans">Direct technician advice: <span className="text-white font-semibold">{COMPANY_INFO.primaryPhone}</span></span>
              {activeTab !== 'cabinets' && (
                <button
                  onClick={() => {
                    const currentIndex = CATEGORIES.findIndex(c => c.id === activeTab);
                    if (currentIndex < CATEGORIES.length - 1) {
                      setActiveTab(CATEGORIES[currentIndex + 1].id);
                    }
                  }}
                  className="flex items-center gap-1 px-4 py-2 rounded-lg bg-gw-card hover:bg-gw-card-hover border border-gw-border text-xs font-tech font-bold uppercase text-gray-200 hover:text-white"
                >
                  <span>Next Component</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>

          {/* Right Column: Build Summary, Wattage, FPS, and Checkout */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            
            {/* Summary Box */}
            <div className="bg-gw-card rounded-2xl p-6 border border-gw-border shadow-xl space-y-5">
              
              <div className="flex items-center justify-between border-b border-gw-border pb-4">
                <div>
                  <h3 className="text-xl font-display tracking-wider text-white">HARDWARE ESTIMATE</h3>
                  <p className="text-xs text-gray-400 font-sans">Zero Build Fee Included</p>
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
                    <div className="text-xs font-tech font-bold uppercase text-emerald-400">100% Compatible Build</div>
                    <div className="text-[11px] text-gray-300 font-sans">Socket pinout, VRM power delivery, and cooling are fully matched.</div>
                  </div>
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-800/60 space-y-1.5">
                  <div className="flex items-center gap-2 text-amber-400 font-tech font-bold uppercase text-xs">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Socket / Power Alert</span>
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
                  <span>Selected: {selectedParts.powerSupplies?.wattageOutput || 0}W</span>
                  <span className="text-emerald-400 font-bold">Recommended: {recommendedPsu}W+</span>
                </div>
              </div>

              {/* Real-time Estimated Gaming FPS */}
              <div className="p-4 rounded-xl bg-black/50 border border-gw-border space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-tech font-bold uppercase text-gray-200">
                  <Gamepad2 className="w-4 h-4 text-red-500" />
                  <span>ESTIMATED FRAME RATES (1080p / 1440p)</span>
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
                  <span>Add Custom Rig to Cart</span>
                </button>

                {/* Copy Spec / Print */}
                <div className="flex gap-2">
                  <button
                    onClick={handleCopySpec}
                    className="flex-1 py-2.5 px-3 rounded-lg bg-gw-card hover:bg-gw-card-hover border border-gw-border text-xs font-tech font-bold uppercase tracking-wider text-gray-300 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5 text-gray-400" />
                    <span>{copiedQuote ? "Copied!" : "Copy Spec Sheet"}</span>
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
    </section>
  );
}
