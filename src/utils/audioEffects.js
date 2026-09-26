// Synthesized high-tech mechanical audio effects using standard Web Audio API (Zero external assets needed)

let audioCtx = null;
let isMuted = false;

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function toggleAudio() {
  isMuted = !isMuted;
  return !isMuted;
}

export function isAudioMuted() {
  return isMuted;
}

// Crisp mechanical switch click (when browsing / selecting)
export function playClickSound() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.04);
  } catch (e) {
    // Ignore audio autoplay restrictions
  }
}

// Heavy mechanical latch lock / PCIe slot snap sound (when component is mounted)
export function playMountSound() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    // Pulse 1: Mechanical impact
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'square';
    osc1.frequency.setValueAtTime(320, ctx.currentTime);
    osc1.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.08);
    gain1.gain.setValueAtTime(0.15, ctx.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start();
    osc1.stop(ctx.currentTime + 0.08);

    // Pulse 2: Plastic latch snap
    setTimeout(() => {
      if (!ctx) return;
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(1200, ctx.currentTime);
      osc2.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.03);
      gain2.gain.setValueAtTime(0.1, ctx.currentTime);
      gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start();
      osc2.stop(ctx.currentTime + 0.03);
    }, 30);
  } catch (e) {
    // Ignore
  }
}

// Power boot hum (when all components are locked and ready to fire)
export function playBootSound() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(60, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(240, ctx.currentTime + 0.35);

    gain.gain.setValueAtTime(0.01, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.45);
  } catch (e) {
    // Ignore
  }
}
