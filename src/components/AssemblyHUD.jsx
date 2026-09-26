import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Wrench, Shield, CheckCircle, Cpu, Layers } from 'lucide-react';
import { toggleAudio, isAudioMuted, playClickSound } from '../utils/audioEffects';

const ASSEMBLY_STAGES = [
  { percent: 0, label: "STAGE 01: CHASSIS & ANCHOR PROFILE", icon: Layers, detail: "Dual-Chamber Airflow Alignment" },
  { percent: 20, label: "STAGE 02: SOCKET INSERTION & RETENTION", icon: Cpu, detail: "AM5 / LGA1700 Clamped" },
  { percent: 45, label: "STAGE 03: 360MM AIO COLDPLATE MOUNT", icon: Wrench, detail: "Kryonaut Paste Dispensed" },
  { percent: 70, label: "STAGE 04: PCIE 5.0 X16 GPU RETENTION", icon: Layers, detail: "Anti-Sag Bracket Anchored" },
  { percent: 90, label: "STAGE 05: POWER HARNESS & 24HR BURN-IN", icon: Shield, detail: "FurMark & Cinebench Active" },
];

export default function AssemblyHUD() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [muted, setMuted] = useState(isAudioMuted());
  const [currentStage, setCurrentStage] = useState(ASSEMBLY_STAGES[0]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(100, Math.max(0, (scrollY / docHeight) * 100)) : 0;
      setScrollProgress(Math.round(progress));

      // Determine active stage
      for (let i = ASSEMBLY_STAGES.length - 1; i >= 0; i--) {
        if (progress >= ASSEMBLY_STAGES[i].percent) {
          setCurrentStage(ASSEMBLY_STAGES[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleSound = () => {
    const active = toggleAudio();
    setMuted(!active);
    if (active) {
      playClickSound();
    }
  };

  const IconComp = currentStage.icon || Wrench;

  return (
    <aside 
      aria-label="Assembly Telemetry HUD" 
      className="fixed top-20 right-4 z-40 hidden md:flex items-center gap-3 select-none pointer-events-auto"
    >
      <div className="flex items-center gap-3 p-2 px-3.5 rounded-xl bg-black/85 border border-red-900/60 backdrop-blur-md shadow-2xl shadow-black/90">
        
        {/* Assembly Stage Progress indicator */}
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
          <div className="flex flex-col">
            <div className="text-[9px] font-tech text-red-500 font-bold uppercase tracking-widest-plus flex items-center gap-1.5">
              <IconComp className="w-3 h-3 text-red-500" />
              <span>{currentStage.label}</span>
            </div>
            <div className="text-[10px] font-tech text-gray-300 font-medium">
              {currentStage.detail} • <span className="text-white font-mono font-bold">{scrollProgress}%</span>
            </div>
          </div>
        </div>

        <div className="h-5 w-px bg-gw-border"></div>

        {/* Assembly Audio Switch */}
        <button
          onClick={handleToggleSound}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gw-card hover:bg-gw-card-hover border border-gw-border text-gray-300 hover:text-white text-[10px] font-tech font-bold uppercase tracking-wider transition-colors"
          title={muted ? "Enable Assembly Sound Effects" : "Mute Assembly Sound Effects"}
        >
          {muted ? (
            <>
              <VolumeX className="w-3.5 h-3.5 text-gray-500" />
              <span>Audio: OFF</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span className="text-emerald-400">Audio: ON</span>
            </>
          )}
        </button>

      </div>
    </aside>
  );
}
