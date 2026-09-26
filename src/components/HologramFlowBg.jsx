import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Eye, Pause, Play, RotateCcw } from 'lucide-react';

const TOTAL_FRAMES = 150;

export default function HologramFlowBg() {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [flowMode, setFlowMode] = useState('hybrid'); // 'hybrid' (scroll + ambient), 'auto', 'scroll'
  
  // Animation state refs for 60fps smoothness without re-render lag
  const stateRef = useRef({
    currentFrame: 0,
    targetFrame: 0,
    lastScrollY: 0,
    scrollSpeed: 0,
    ambientTimer: 0,
    isUserScrolling: false,
    scrollTimeout: null,
  });

  // Preload frames
  useEffect(() => {
    let isCancelled = false;
    const images = [];
    let loaded = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const numStr = String(i).padStart(4, '0');
      img.src = `/frames/frame_${numStr}.webp`;
      img.onload = () => {
        if (!isCancelled) {
          loaded++;
          if (loaded % 15 === 0 || loaded === TOTAL_FRAMES) {
            setLoadedCount(loaded);
          }
        }
      };
      images.push(img);
    }
    imagesRef.current = images;

    return () => {
      isCancelled = true;
    };
  }, []);

  // Canvas drawing & animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Scroll listener for the scroll-flow effect
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(1, Math.max(0, scrollY / docHeight)) : 0;
      
      const s = stateRef.current;
      s.targetFrame = progress * (TOTAL_FRAMES - 1);
      s.isUserScrolling = true;
      s.scrollSpeed = Math.abs(scrollY - s.lastScrollY);
      s.lastScrollY = scrollY;

      clearTimeout(s.scrollTimeout);
      s.scrollTimeout = setTimeout(() => {
        s.isUserScrolling = false;
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Render loop
    let lastTime = performance.now();
    const render = (time) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;
      const s = stateRef.current;
      const images = imagesRef.current;

      if (images.length > 0) {
        if (!s.isUserScrolling || flowMode === 'auto') {
          if (isPlaying) {
            // Smooth natural video playback (20 frames per second)
            s.currentFrame = (s.currentFrame + delta * 20) % TOTAL_FRAMES;
            s.targetFrame = s.currentFrame;
          }
        } else {
          // Smooth interpolation when scrolling
          const lerpFactor = 0.15;
          const diff = s.targetFrame - s.currentFrame;
          s.currentFrame = (s.currentFrame + diff * lerpFactor + TOTAL_FRAMES) % TOTAL_FRAMES;
        }

        const frameIndex = Math.floor(s.currentFrame) % TOTAL_FRAMES;
        const img = images[frameIndex];

        if (img && img.complete && img.naturalWidth > 0) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // "Cover" aspect ratio scaling
          const hRatio = canvas.width / img.width;
          const vRatio = canvas.height / img.height;
          const ratio = Math.max(hRatio, vRatio);
          const centerShiftX = (canvas.width - img.width * ratio) / 2;
          const centerShiftY = (canvas.height - img.height * ratio) / 2;

          ctx.drawImage(
            img,
            0,
            0,
            img.width,
            img.height,
            centerShiftX,
            centerShiftY,
            img.width * ratio,
            img.height * ratio
          );
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isPlaying, flowMode]);

  return (
    <>
      {/* Fixed Background Canvas for Hologram Flow - Crystal Clear */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover"
        />

        {/* Subtle Edge Vignette only at the very bottom to transition smoothly */}
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#070709] to-transparent pointer-events-none"></div>
      </div>

      {/* Discreet Flow Effect Control Widget */}
      <aside aria-label="Hologram Controls" className="fixed bottom-6 left-6 z-40 hidden sm:flex items-center gap-2 p-1.5 px-3 rounded-full bg-black/90 border border-red-900/60 shadow-lg shadow-black/80 text-xs">
        <div className="flex items-center gap-1.5 text-red-500 font-gamer font-bold tracking-wider text-[10px] uppercase">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
          <span>HOLOGRAM FLOW</span>
        </div>

        <span className="text-gray-600">|</span>

        {/* Mode Selector */}
        <button
          onClick={() => setFlowMode(prev => prev === 'hybrid' ? 'scroll' : prev === 'scroll' ? 'auto' : 'hybrid')}
          className="px-2 py-0.5 rounded-md bg-gw-card hover:bg-gw-card-hover border border-gw-border text-gray-300 hover:text-white text-[10px] font-semibold transition-colors"
          title="Click to toggle flow mode"
        >
          {flowMode === 'hybrid' ? '⚡ Scroll + Flow' : flowMode === 'scroll' ? '📜 Scroll Scrub' : '▶ Auto Flow'}
        </button>

        {/* Play/Pause */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-1 rounded-md text-gray-400 hover:text-white transition-colors"
          title={isPlaying ? "Pause Flow" : "Play Flow"}
        >
          {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
        </button>

        {loadedCount < TOTAL_FRAMES && (
          <span className="text-[9px] text-gray-500 font-mono">
            {Math.round((loadedCount / TOTAL_FRAMES) * 100)}%
          </span>
        )}
      </aside>
    </>
  );
}
