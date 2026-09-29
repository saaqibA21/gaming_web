import React, { useEffect, useRef, useState } from 'react';

const TOTAL_FRAMES = 240;

export default function HologramFlowBg() {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const [loadedCount, setLoadedCount] = useState(0);
  
  // Animation state refs for 60fps smoothness without re-render lag
  const stateRef = useRef({
    currentFrame: 0,
    targetFrame: 0,
    lastScrollY: 0,
    scrollSpeed: 0,
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
          if (loaded % 20 === 0 || loaded === TOTAL_FRAMES) {
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

    const updateTargetFrame = () => {
      const hero = document.getElementById('hero');
      const scrollY = window.scrollY;
      let progress = 0;
      if (hero) {
        const maxScroll = Math.max(1, hero.offsetHeight - window.innerHeight);
        progress = Math.min(1, Math.max(0, scrollY / maxScroll));
      } else {
        const heroThreshold = window.innerHeight * 1.5;
        progress = Math.min(1, Math.max(0, scrollY / heroThreshold));
      }
      stateRef.current.targetFrame = progress * (TOTAL_FRAMES - 1);
    };

    updateTargetFrame();
    window.addEventListener('scroll', updateTargetFrame, { passive: true });

    // Render loop - strictly driven by scroll position
    const render = () => {
      const s = stateRef.current;
      const images = imagesRef.current;

      if (images.length > 0) {
        // Smoothly interpolate towards targetFrame based purely on scroll
        const diff = s.targetFrame - s.currentFrame;
        if (Math.abs(diff) > 0.01) {
          s.currentFrame += diff * 0.22;
        } else {
          s.currentFrame = s.targetFrame;
        }

        const frameIndex = Math.min(
          TOTAL_FRAMES - 1,
          Math.max(0, Math.round(s.currentFrame))
        );
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
      window.removeEventListener('scroll', updateTargetFrame);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover"
      />
      {/* Crisp dark vignette at base */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#070709] via-[#070709]/80 to-transparent pointer-events-none"></div>
    </div>
  );
}
