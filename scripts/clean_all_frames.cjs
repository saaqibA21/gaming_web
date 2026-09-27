const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function cleanFrame(filePath) {
  const fileBuf = fs.readFileSync(filePath);
  const { data, info } = await sharp(fileBuf)
    .raw()
    .toBuffer({ resolveWithObject: true });
    
  const w = info.width;
  const h = info.height;
  const ch = info.channels;
  const out = Buffer.from(data);
  
  const patchLeft = 1120;
  const patchTop = 560;
  const pw = 80;
  const ph = 80;
  
  // Extract patch data
  const patch = new Uint8Array(pw * ph * ch);
  for (let y = 0; y < ph; y++) {
    for (let x = 0; x < pw; x++) {
      const srcIdx = ((patchTop + y) * w + (patchLeft + x)) * ch;
      const dstIdx = (y * pw + x) * ch;
      patch[dstIdx] = data[srcIdx];
      patch[dstIdx+1] = data[srcIdx+1];
      patch[dstIdx+2] = data[srcIdx+2];
    }
  }

  // Raw mask: circle radius 28 around (40, 40) where brightness > 15
  const rawMask = new Uint8Array(pw * ph);
  for (let y = 0; y < ph; y++) {
    for (let x = 0; x < pw; x++) {
      const dx = x - 40;
      const dy = y - 40;
      if (dx * dx + dy * dy <= 28 * 28) {
        const idx = (y * pw + x) * ch;
        const b = (patch[idx] + patch[idx+1] + patch[idx+2]) / 3;
        if (b > 15) {
          rawMask[y * pw + x] = 1;
        }
      }
    }
  }

  // Dilate by 3px
  const mask = new Uint8Array(pw * ph);
  for (let y = 0; y < ph; y++) {
    for (let x = 0; x < pw; x++) {
      let hit = 0;
      for (let dy = -3; dy <= 3; dy++) {
        for (let dx = -3; dx <= 3; dx++) {
          if (dx*dx + dy*dy <= 9) {
            const ny = y + dy, nx = x + dx;
            if (ny >= 0 && ny < ph && nx >= 0 && nx < pw) {
              if (rawMask[ny * pw + nx] === 1) { hit = 1; break; }
            }
          }
        }
        if (hit) break;
      }
      mask[y * pw + x] = hit;
    }
  }

  // Laplace diffusion
  const r = new Float32Array(pw * ph);
  const g = new Float32Array(pw * ph);
  const b = new Float32Array(pw * ph);

  for (let i = 0; i < pw * ph; i++) {
    r[i] = patch[i * ch];
    g[i] = patch[i * ch + 1];
    b[i] = patch[i * ch + 2];
  }

  for (let iter = 0; iter < 450; iter++) {
    for (let y = 1; y < ph - 1; y++) {
      for (let x = 1; x < pw - 1; x++) {
        const idx = y * pw + x;
        if (mask[idx] === 1) {
          r[idx] = 0.25 * (r[idx - pw] + r[idx + pw] + r[idx - 1] + r[idx + 1]);
          g[idx] = 0.25 * (g[idx - pw] + g[idx + pw] + g[idx - 1] + g[idx + 1]);
          b[idx] = 0.25 * (b[idx - pw] + b[idx + pw] + b[idx - 1] + b[idx + 1]);
        }
      }
    }
  }

  // Paste back into full frame with micro noise
  for (let y = 0; y < ph; y++) {
    for (let x = 0; x < pw; x++) {
      const pIdx = y * pw + x;
      if (mask[pIdx] === 1) {
        const fIdx = ((patchTop + y) * w + (patchLeft + x)) * ch;
        const noise = ((Math.sin(x * 12.9898 + y * 78.233) * 43758.5453) % 1) * 2 - 1;
        out[fIdx] = Math.max(0, Math.min(255, Math.round(r[pIdx] + noise)));
        out[fIdx+1] = Math.max(0, Math.min(255, Math.round(g[pIdx] + noise)));
        out[fIdx+2] = Math.max(0, Math.min(255, Math.round(b[pIdx] + noise)));
      }
    }
  }

  // Convert to WebP buffer and write safely
  const cleanWebp = await sharp(out, { raw: { width: w, height: h, channels: ch } })
    .webp({ quality: 90 })
    .toBuffer();
    
  fs.writeFileSync(filePath, cleanWebp);
}

async function main() {
  const dir = path.join(__dirname, '..', 'public', 'frames');
  // Clean up any stray tmp files first
  const strays = fs.readdirSync(dir).filter(f => f.includes('.tmp.'));
  strays.forEach(f => fs.unlinkSync(path.join(dir, f)));

  const files = fs.readdirSync(dir)
    .filter(f => f.startsWith('frame_') && f.endsWith('.webp'))
    .sort();
    
  console.log(`Found ${files.length} frames to clean in ${dir}...`);
  const start = Date.now();
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const fullPath = path.join(dir, file);
    await cleanFrame(fullPath);
    if ((i + 1) % 25 === 0 || i === files.length - 1) {
      console.log(`Cleaned ${i + 1}/${files.length} frames (${Math.round((i + 1) / files.length * 100)}%)`);
    }
  }
  
  console.log(`All ${files.length} frames cleaned in ${((Date.now() - start) / 1000).toFixed(2)}s!`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
