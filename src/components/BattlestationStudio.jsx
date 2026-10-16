import React, { useState } from 'react';
import { 
  Monitor, 
  Cpu, 
  Layers, 
  Fan, 
  CircuitBoard, 
  Box, 
  HardDrive, 
  Zap, 
  Check, 
  CheckCircle2, 
  Power, 
  Sliders, 
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Eye
} from 'lucide-react';
import { playClickSound, playMountSound } from '../utils/audioEffects';

export default function BattlestationStudio({
  selectedParts,
  activeTab,
  onSelectCategory,
  totalPrice,
  estimatedWattage,
  gameFps,
  targetResolution
}) {
  const [rgbEnabled, setRgbEnabled] = useState(true);
  const [hoveredHotspot, setHoveredHotspot] = useState(null);

  const toggleRgb = () => {
    playClickSound();
    setRgbEnabled(!rgbEnabled);
  };

  const handleHotspotClick = (catId) => {
    playMountSound();
    onSelectCategory(catId);
  };

  // Hotspot definitions mapped to Battlestation coordinates
  const hotspots = [
    {
      id: 'monitors',
      name: 'SCREEN / MONITOR',
      icon: Monitor,
      part: selectedParts.monitors,
      tag: 'DISPLAY SCREEN',
      desc: 'Gaming monitor & refresh rate',
      pos: { top: '32%', left: '26%' }
    },
    {
      id: 'processors',
      name: 'PROCESSOR (CPU)',
      icon: Cpu,
      part: selectedParts.processors,
      tag: 'CPU SOCKET',
      desc: 'Central computing processor',
      pos: { top: '42%', left: '72%' }
    },
    {
      id: 'coolers',
      name: 'COOLING FANS & AIO',
      icon: Fan,
      part: selectedParts.coolers,
      tag: 'FANS & COOLER',
      desc: 'Radiator & ARGB case fans',
      pos: { top: '22%', left: '74%' }
    },
    {
      id: 'graphicsCards',
      name: 'GRAPHICS CARD (GPU)',
      icon: Layers,
      part: selectedParts.graphicsCards,
      tag: 'PCIE GPU',
      desc: 'High-FPS ray tracing GPU',
      pos: { top: '56%', left: '76%' }
    },
    {
      id: 'rams',
      name: 'MEMORY (RAM)',
      icon: Box,
      part: selectedParts.rams,
      tag: 'DDR5 MEMORY',
      desc: 'High-speed dual channel RAM',
      pos: { top: '38%', left: '84%' }
    },
    {
      id: 'motherboards',
      name: 'MOTHERBOARD',
      icon: CircuitBoard,
      part: selectedParts.motherboards,
      tag: 'PCB CIRCUIT',
      desc: 'Power VRM & PCIe motherboard',
      pos: { top: '50%', left: '66%' }
    },
    {
      id: 'cabinets',
      name: 'PC CABINET (CHASSIS)',
      icon: Box,
      part: selectedParts.cabinets,
      tag: 'PANORAMIC CHASSIS',
      desc: 'Dual-chamber tempered glass case',
      pos: { top: '75%', left: '86%' }
    },
    {
      id: 'powerSupplies',
      name: 'POWER SUPPLY (PSU)',
      icon: Zap,
      part: selectedParts.powerSupplies,
      tag: '80+ PSU',
      desc: 'Gold rated modular PSU',
      pos: { top: '78%', left: '68%' }
    }
  ];

  const activeHotspotInfo = hotspots.find(h => h.id === activeTab);

  return (
    <div className="mb-10 rounded-2xl bg-gradient-to-b from-[#0c0d14] via-[#090a0f] to-[#070709] border border-red-900/40 shadow-2xl overflow-hidden relative">
      
      {/* Studio Header Bar */}
      <div className="px-5 py-4 border-b border-gw-border flex flex-wrap items-center justify-between gap-4 bg-black/60 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-red-500 animate-ping"></div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-display tracking-wider text-white">
                3D INTERACTIVE BATTLESTATION BENCH
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-tech font-bold uppercase bg-red-950/80 text-red-400 border border-red-800">
                LIVE 3D WORKBENCH
              </span>
            </div>
            <p className="text-[11px] text-gray-400 font-sans">
              Click the <span className="text-red-400 font-semibold">Screen</span> to choose monitors, click <span className="text-red-400 font-semibold">Fans</span> for cooling, or click the <span className="text-red-400 font-semibold">CPU tower</span> to swap hardware.
            </p>
          </div>
        </div>

        {/* Studio Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleRgb}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-tech font-bold uppercase transition-all border ${
              rgbEnabled 
                ? 'bg-red-600/20 text-red-400 border-red-600/60 shadow-sm' 
                : 'bg-black/40 text-gray-400 border-gw-border hover:border-gray-500'
            }`}
          >
            <Power className="w-3.5 h-3.5" />
            <span>RGB SYSTEM: {rgbEnabled ? 'ON' : 'OFF'}</span>
          </button>

          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/40 border border-gw-border text-xs font-tech text-gray-300">
            <span className="text-gray-400">LOAD:</span>
            <span className="text-amber-400 font-mono font-bold">{estimatedWattage}W</span>
          </div>
        </div>
      </div>

      {/* 3D Visualizer Canvas Stage */}
      <div className="relative min-h-[420px] sm:min-h-[500px] w-full select-none overflow-hidden flex items-center justify-center p-4">
        
        {/* Subtle Ambient Studio Lighting */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-950/15 via-transparent to-transparent pointer-events-none"></div>

        {/* ========================================================================= */}
        {/* 3D ISOMETRIC DESKTOP SETUP SVG SCENE */}
        {/* ========================================================================= */}
        <div className="relative w-full max-w-4xl aspect-[16/9] max-h-[520px]">
          <svg 
            viewBox="0 0 1000 560" 
            className="w-full h-full filter drop-shadow-2xl"
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Linear and Radial Gradients for 3D realism */}
              <linearGradient id="deskGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1e1e24" />
                <stop offset="40%" stopColor="#121318" />
                <stop offset="100%" stopColor="#0a0a0e" />
              </linearGradient>

              <linearGradient id="deskEdgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#e50914" />
                <stop offset="50%" stopColor="#8a030a" />
                <stop offset="100%" stopColor="#e50914" />
              </linearGradient>

              <linearGradient id="screenFrameGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#252630" />
                <stop offset="50%" stopColor="#171820" />
                <stop offset="100%" stopColor="#0d0e13" />
              </linearGradient>

              <linearGradient id="screenGlassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0f172a" />
                <stop offset="50%" stopColor="#020617" />
                <stop offset="100%" stopColor="#1e1014" />
              </linearGradient>

              <linearGradient id="caseGlassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2b2d3c" stopOpacity="0.4" />
                <stop offset="40%" stopColor="#0b0c12" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#151622" stopOpacity="0.6" />
              </linearGradient>

              <linearGradient id="metalBevelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#475569" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>

              <linearGradient id="gpuGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#181822" />
                <stop offset="50%" stopColor="#2a2b38" />
                <stop offset="100%" stopColor="#14141c" />
              </linearGradient>

              <radialGradient id="rgbFanGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ff0055" stopOpacity={rgbEnabled ? "0.9" : "0.1"} />
                <stop offset="60%" stopColor="#00e5ff" stopOpacity={rgbEnabled ? "0.6" : "0.05"} />
                <stop offset="100%" stopColor="#e50914" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* 1. DESK SURFACE (Isometric Perspective) */}
            <polygon points="50,420 950,420 860,540 140,540" fill="url(#deskGrad)" stroke="#232430" strokeWidth="2" />
            <polygon points="140,540 860,540 860,550 140,550" fill="url(#deskEdgeGrad)" />
            {/* Desk Mat */}
            <polygon points="120,435 620,435 580,515 160,515" fill="#0d0e14" stroke="#e50914" strokeWidth="1.5" strokeOpacity="0.4" />

            {/* Keyboard & Mouse on Desk */}
            <g transform="translate(240, 455)">
              <rect x="0" y="0" width="160" height="42" rx="4" fill="#181922" stroke="#333544" strokeWidth="1" />
              <rect x="5" y="5" width="150" height="32" rx="2" fill="#0d0e14" />
              {/* Keyboard RGB Key lines */}
              <line x1="10" y1="13" x2="145" y2="13" stroke={rgbEnabled ? "#e50914" : "#444"} strokeWidth="2" strokeDasharray="4 2" />
              <line x1="10" y1="21" x2="145" y2="21" stroke={rgbEnabled ? "#00e5ff" : "#333"} strokeWidth="2" strokeDasharray="4 2" />
              <line x1="10" y1="29" x2="145" y2="29" stroke={rgbEnabled ? "#e50914" : "#444"} strokeWidth="2" strokeDasharray="4 2" />
            </g>
            {/* Esports Mouse */}
            <g transform="translate(430, 460)">
              <ellipse cx="20" cy="20" rx="14" ry="20" fill="#1c1d28" stroke="#333544" strokeWidth="1" />
              <line x1="20" y1="5" x2="20" y2="20" stroke={rgbEnabled ? "#e50914" : "#444"} strokeWidth="1.5" />
            </g>

            {/* ================================================================= */}
            {/* 2. GAMING MONITOR / SCREEN (Center-Left) */}
            {/* ================================================================= */}
            <g 
              onClick={() => handleHotspotClick('monitors')}
              className="cursor-pointer group"
              onMouseEnter={() => setHoveredHotspot('monitors')}
              onMouseLeave={() => setHoveredHotspot(null)}
            >
              {/* Monitor Stand Base */}
              <polygon points="310,430 410,430 430,445 290,445" fill="url(#metalBevelGrad)" stroke="#334155" strokeWidth="1" />
              {/* Stand Arm */}
              <rect x="350" y="270" width="20" height="160" fill="#1e2230" stroke="#334155" strokeWidth="1" />

              {/* Monitor Outer Bezel */}
              <rect 
                x="140" 
                y="90" 
                width="440" 
                height="270" 
                rx="10" 
                fill="url(#screenFrameGrad)" 
                stroke={activeTab === 'monitors' ? "#e50914" : hoveredHotspot === 'monitors' ? "#ff4d55" : "#334155"} 
                strokeWidth={activeTab === 'monitors' ? "3.5" : "2"} 
                className="transition-all duration-300"
              />

              {/* Monitor Glass Display Surface */}
              <rect x="150" y="100" width="420" height="250" rx="6" fill="url(#screenGlassGrad)" />

              {/* Screen Wallpaper / UI Telemetry Graphic */}
              <g opacity={rgbEnabled ? "1" : "0.3"}>
                {/* Wallpaper grid and gaming artwork */}
                <circle cx="360" cy="210" r="65" fill="#e50914" fillOpacity="0.12" />
                <path d="M 330 190 L 360 170 L 390 190 L 360 250 Z" fill="#e50914" fillOpacity="0.3" stroke="#e50914" strokeWidth="1.5" />
                
                {/* On-Screen HUD Telemetry */}
                <rect x="165" y="115" width="130" height="28" rx="4" fill="#000000" fillOpacity="0.75" stroke="#222" strokeWidth="1" />
                <text x="175" y="132" fill="#e50914" fontSize="11" fontFamily="sans-serif" fontWeight="bold">
                  {gameFps.valorant} FPS
                </text>
                <text x="240" y="132" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">
                  {targetResolution} • 240Hz
                </text>

                {/* Display Brand Emblem */}
                <text x="360" y="275" textAnchor="middle" fill="#ffffff" fontSize="13" fontFamily="sans-serif" fontWeight="bold" letterSpacing="1.5">
                  {selectedParts.monitors?.brand ? selectedParts.monitors.brand.toUpperCase() : 'GAMES WORLD'}
                </text>
                <text x="360" y="292" textAnchor="middle" fill="#e50914" fontSize="10" fontFamily="sans-serif" letterSpacing="2">
                  {selectedParts.monitors?.refreshRate || '240Hz FAST IPS'}
                </text>
              </g>

              {/* Screen Glare Sheen Reflection */}
              <polygon points="150,100 290,100 210,350 150,350" fill="#ffffff" fillOpacity="0.03" />
            </g>

            {/* ================================================================= */}
            {/* 3. PC CABINET / CPU TOWER (Right Side on Desk) */}
            {/* ================================================================= */}
            <g>
              {/* Chassis Main Exterior Frame */}
              <polygon 
                points="660,110 880,110 930,160 930,440 710,440 660,390" 
                fill="#0e0f17" 
                stroke={activeTab === 'cabinets' ? "#e50914" : "#2a2c3d"} 
                strokeWidth={activeTab === 'cabinets' ? "3" : "2"}
                onClick={() => handleHotspotClick('cabinets')}
                className="cursor-pointer"
              />

              {/* Top Fan Exhaust Mesh / Radiator */}
              <polygon 
                points="660,110 880,110 930,160 710,160" 
                fill="#161722" 
                stroke="#2a2c3d" 
                strokeWidth="1.5"
                onClick={() => handleHotspotClick('coolers')}
                className="cursor-pointer"
              />

              {/* Triple Top ARGB Fans */}
              <g onClick={() => handleHotspotClick('coolers')} className="cursor-pointer">
                {/* Fan 1 */}
                <ellipse cx="730" cy="135" rx="20" ry="12" fill={rgbEnabled ? "url(#rgbFanGlow)" : "#1a1b24"} stroke={activeTab === 'coolers' ? "#e50914" : "#3b3d4f"} strokeWidth="1.5" />
                {/* Fan 2 */}
                <ellipse cx="785" cy="135" rx="20" ry="12" fill={rgbEnabled ? "url(#rgbFanGlow)" : "#1a1b24"} stroke={activeTab === 'coolers' ? "#e50914" : "#3b3d4f"} strokeWidth="1.5" />
                {/* Fan 3 */}
                <ellipse cx="840" cy="135" rx="20" ry="12" fill={rgbEnabled ? "url(#rgbFanGlow)" : "#1a1b24"} stroke={activeTab === 'coolers' ? "#e50914" : "#3b3d4f"} strokeWidth="1.5" />
                {/* Fan Center Hubs */}
                <ellipse cx="730" cy="135" rx="6" ry="4" fill="#0b0c10" />
                <ellipse cx="785" cy="135" rx="6" ry="4" fill="#0b0c10" />
                <ellipse cx="840" cy="135" rx="6" ry="4" fill="#0b0c10" />
              </g>

              {/* Main Panoramic Tempered Glass Chamber */}
              <polygon 
                points="660,160 880,160 880,410 660,410" 
                fill="url(#caseGlassGrad)" 
                stroke={activeTab === 'cabinets' ? "#e50914" : "#333548"} 
                strokeWidth="1.5"
              />

              {/* MOTHERBOARD PCB (Internal) */}
              <g onClick={() => handleHotspotClick('motherboards')} className="cursor-pointer">
                <rect 
                  x="675" 
                  y="180" 
                  width="180" 
                  height="180" 
                  rx="4" 
                  fill="#0b0d13" 
                  stroke={activeTab === 'motherboards' ? "#e50914" : "#1f2230"} 
                  strokeWidth="1.5" 
                />
                {/* Motherboard Heatsinks & VRM */}
                <rect x="682" y="188" width="45" height="28" rx="2" fill="#1e212f" stroke="#33384c" strokeWidth="1" />
                <rect x="735" y="188" width="55" height="18" rx="2" fill="#1e212f" stroke="#33384c" strokeWidth="1" />
              </g>

              {/* CPU & COOLER COLDPLATE / PUMP HEAD */}
              <g onClick={() => handleHotspotClick('processors')} className="cursor-pointer group">
                <circle 
                  cx="745" 
                  cy="245" 
                  r="26" 
                  fill="#12131b" 
                  stroke={activeTab === 'processors' ? "#e50914" : hoveredHotspot === 'processors' ? "#ff4d55" : "#383c50"} 
                  strokeWidth={activeTab === 'processors' ? "3" : "1.5"} 
                />
                <circle 
                  cx="745" 
                  cy="245" 
                  r="18" 
                  fill={rgbEnabled ? "#e50914" : "#222"} 
                  fillOpacity={rgbEnabled ? "0.85" : "0.3"} 
                />
                <text x="745" y="249" textAnchor="middle" fill="#ffffff" fontSize="8" fontFamily="sans-serif" fontWeight="bold">
                  CPU
                </text>
                {/* Coolant Sleeved Tubing curving to top radiator */}
                <path d="M 735 225 Q 710 170 730 145" fill="none" stroke="#222533" strokeWidth="5" strokeLinecap="round" />
                <path d="M 755 225 Q 770 170 780 145" fill="none" stroke="#222533" strokeWidth="5" strokeLinecap="round" />
              </g>

              {/* DDR5 RAM SLOTS */}
              <g onClick={() => handleHotspotClick('rams')} className="cursor-pointer">
                {/* RAM Stick 1 */}
                <rect 
                  x="782" 
                  y="215" 
                  width="7" 
                  height="50" 
                  rx="1.5" 
                  fill="#171822" 
                  stroke={activeTab === 'rams' ? "#e50914" : "#333"} 
                  strokeWidth="1" 
                />
                <rect x="783" y="217" width="5" height="15" rx="1" fill={rgbEnabled ? "#00e5ff" : "#444"} />
                {/* RAM Stick 2 */}
                <rect 
                  x="793" 
                  y="215" 
                  width="7" 
                  height="50" 
                  rx="1.5" 
                  fill="#171822" 
                  stroke={activeTab === 'rams' ? "#e50914" : "#333"} 
                  strokeWidth="1" 
                />
                <rect x="794" y="217" width="5" height="15" rx="1" fill={rgbEnabled ? "#e50914" : "#444"} />
              </g>

              {/* GRAPHICS CARD (GPU) */}
              <g onClick={() => handleHotspotClick('graphicsCards')} className="cursor-pointer group">
                <rect 
                  x="675" 
                  y="295" 
                  width="190" 
                  height="45" 
                  rx="4" 
                  fill="url(#gpuGrad)" 
                  stroke={activeTab === 'graphicsCards' ? "#e50914" : hoveredHotspot === 'graphicsCards' ? "#ff4d55" : "#383c50"} 
                  strokeWidth={activeTab === 'graphicsCards' ? "3" : "1.5"} 
                />
                {/* GPU Triple Fans representation */}
                <circle cx="705" cy="317" r="14" fill="#0d0e14" stroke="#2a2c3a" strokeWidth="1" />
                <circle cx="750" cy="317" r="14" fill="#0d0e14" stroke="#2a2c3a" strokeWidth="1" />
                <circle cx="795" cy="317" r="14" fill="#0d0e14" stroke="#2a2c3a" strokeWidth="1" />
                {/* Illuminated GPU Side Logo */}
                <rect x="825" y="307" width="32" height="12" rx="2" fill="#000000" />
                <text x="841" y="316" textAnchor="middle" fill={rgbEnabled ? "#00e5ff" : "#666"} fontSize="6.5" fontFamily="sans-serif" fontWeight="bold">
                  GEFORCE
                </text>
              </g>

              {/* Front Intake Fans (Right side of case) */}
              <g onClick={() => handleHotspotClick('coolers')} className="cursor-pointer">
                <polygon points="880,160 930,160 930,410 880,410" fill="#0c0d14" stroke="#222432" strokeWidth="1" />
                {/* Front Fan 1 */}
                <ellipse cx="905" cy="210" rx="16" ry="24" fill={rgbEnabled ? "url(#rgbFanGlow)" : "#161720"} stroke="#333" strokeWidth="1" />
                {/* Front Fan 2 */}
                <ellipse cx="905" cy="285" rx="16" ry="24" fill={rgbEnabled ? "url(#rgbFanGlow)" : "#161720"} stroke="#333" strokeWidth="1" />
                {/* Front Fan 3 */}
                <ellipse cx="905" cy="360" rx="16" ry="24" fill={rgbEnabled ? "url(#rgbFanGlow)" : "#161720"} stroke="#333" strokeWidth="1" />
              </g>

              {/* Bottom PSU Shroud & Compartment */}
              <g onClick={() => handleHotspotClick('powerSupplies')} className="cursor-pointer">
                <rect 
                  x="660" 
                  y="370" 
                  width="220" 
                  height="40" 
                  fill="#0c0d12" 
                  stroke={activeTab === 'powerSupplies' ? "#e50914" : "#222432"} 
                  strokeWidth="1.5" 
                />
                <text x="675" y="394" fill="#64748b" fontSize="8" fontFamily="sans-serif" fontWeight="bold">
                  POWER UNIT // {selectedParts.powerSupplies?.wattageOutput || 750}W
                </text>
              </g>

              {/* Case Feet */}
              <rect x="680" y="440" width="30" height="8" rx="2" fill="#1e2230" />
              <rect x="880" y="440" width="30" height="8" rx="2" fill="#1e2230" />
            </g>

          </svg>

          {/* ================================================================= */}
          {/* INTERACTIVE HOTSPOT TARGET PINS OVER THE 3D SCENE */}
          {/* ================================================================= */}
          {hotspots.map((h) => {
            const isSelected = activeTab === h.id;
            const Icon = h.icon;
            return (
              <button
                key={h.id}
                onClick={() => handleHotspotClick(h.id)}
                style={{ top: h.pos.top, left: h.pos.left }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-all duration-300 z-20 ${
                  isSelected ? 'scale-110 z-30' : 'hover:scale-105'
                }`}
                aria-label={`Configure ${h.name}`}
              >
                {/* Target Pulsing Beacon */}
                <div className="relative flex items-center justify-center">
                  <span className={`absolute w-8 h-8 rounded-full ${isSelected ? 'bg-red-500 animate-ping opacity-75' : 'bg-red-500/20 group-hover:animate-ping'}`}></span>
                  
                  {/* Pin Core */}
                  <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-tech font-bold uppercase transition-all shadow-xl border ${
                    isSelected 
                      ? 'bg-red-600 text-white border-white shadow-red-glow' 
                      : 'bg-black/90 text-gray-200 border-red-700/60 hover:border-red-500 group-hover:bg-red-950/90'
                  }`}>
                    <Icon className="w-3 h-3 text-white" />
                    <span className="hidden sm:inline">{h.name.split(' ')[0]}</span>
                    {h.part && (
                      <Check className="w-2.5 h-2.5 text-emerald-400" />
                    )}
                  </div>
                </div>

                {/* Hover / Active Telemetry Tooltip */}
                <div className={`absolute left-1/2 -translate-x-1/2 mt-1.5 pointer-events-none transition-all duration-200 ${
                  isSelected || hoveredHotspot === h.id 
                    ? 'opacity-100 translate-y-0 scale-100' 
                    : 'opacity-0 translate-y-1 scale-95'
                }`}>
                  <div className="px-2.5 py-1.5 rounded-lg bg-black/95 border border-red-600 text-left whitespace-nowrap shadow-2xl">
                    <div className="text-[9px] font-tech text-red-400 font-bold uppercase flex items-center gap-1">
                      <span>{h.tag}</span>
                    </div>
                    <div className="text-xs font-bold text-white max-w-[180px] truncate">
                      {h.part?.name || 'Not Selected'}
                    </div>
                    {h.part?.price !== undefined && (
                      <div className="text-[10px] font-tech text-emerald-400 font-bold">
                        {h.part.price > 0 ? `₹${h.part.price.toLocaleString('en-IN')}` : 'Included'}
                      </div>
                    )}
                  </div>
                </div>
              </button>
            );
          })}

        </div>

      </div>

      {/* Active Component Focus Banner & Quick Switch Tabs */}
      <div className="px-5 py-3.5 bg-[#0a0b12] border-t border-gw-border flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-red-600/20 border border-red-600/60 flex items-center justify-center text-red-500 shrink-0">
            {activeHotspotInfo && <activeHotspotInfo.icon className="w-4 h-4" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-tech uppercase tracking-wider text-red-400 font-bold">
                CURRENTLY INSPECTING
              </span>
              <span className="text-xs px-2 py-0.2 rounded bg-red-950/60 text-gray-300 font-tech">
                {activeHotspotInfo?.tag}
              </span>
            </div>
            <div className="text-sm font-display tracking-wider text-white">
              {activeHotspotInfo?.name}: <span className="text-red-400 font-sans font-bold text-xs">{selectedParts[activeTab]?.name || 'Choose from catalog below'}</span>
            </div>
          </div>
        </div>

        {/* Quick Jump Hotspot Pills */}
        <div className="flex overflow-x-auto max-w-full pb-1 scrollbar-none gap-1.5 items-center">
          <span className="text-[10px] font-tech uppercase text-gray-500 shrink-0 mr-1">Hotspots:</span>
          {hotspots.map((h) => {
            const isSelected = activeTab === h.id;
            return (
              <button
                key={h.id}
                onClick={() => handleHotspotClick(h.id)}
                className={`px-2.5 py-1 rounded-md text-[10px] font-tech font-bold uppercase whitespace-nowrap transition-all border ${
                  isSelected 
                    ? 'bg-red-600 text-white border-red-500' 
                    : 'bg-black/60 text-gray-400 border-gw-border hover:border-gray-500 hover:text-white'
                }`}
              >
                {h.name.split(' ')[0]}
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}
