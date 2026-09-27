const fs = require('fs');
const path = require('path');
const cp = require('child_process');
const sharp = require('sharp');
const ffmpeg = require('@ffmpeg-installer/ffmpeg');

const ffmpegPath = ffmpeg.path;
const rootDir = path.resolve(__dirname, '..');
const inputVideo = path.join(rootDir, 'Gaming_PC_hologram_reveal_20260923210706.mp4');
const outputVideo = path.join(rootDir, 'Gaming_PC_hologram_reveal_clean.mp4');
const tempDir = path.join(rootDir, 'temp_video_pipeline');

async function inpaintPatch(data, w, h, ch) {
  const patchLeft = 1120;
  const patchTop = 560;
  const pw = 80;
  const ph = 80;
  
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

  for (let y = 0; y < ph; y++) {
    for (let x = 0; x < pw; x++) {
      const pIdx = y * pw + x;
      if (mask[pIdx] === 1) {
        const fIdx = ((patchTop + y) * w + (patchLeft + x)) * ch;
        const noise = ((Math.sin(x * 12.9898 + y * 78.233) * 43758.5453) % 1) * 2 - 1;
        data[fIdx] = Math.max(0, Math.min(255, Math.round(r[pIdx] + noise)));
        data[fIdx+1] = Math.max(0, Math.min(255, Math.round(g[pIdx] + noise)));
        data[fIdx+2] = Math.max(0, Math.min(255, Math.round(b[pIdx] + noise)));
      }
    }
  }
}

async function main() {
  console.log(`Starting video watermark removal pipeline...`);
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  const rawDir = path.join(tempDir, 'raw');
  const cleanDir = path.join(tempDir, 'clean');
  if (!fs.existsSync(rawDir)) fs.mkdirSync(rawDir);
  if (!fs.existsSync(cleanDir)) fs.mkdirSync(cleanDir);

  const audioPath = path.join(tempDir, 'audio.aac');

  // Step 1: Extract audio
  console.log(`Step 1: Extracting audio stream...`);
  cp.execFileSync(ffmpegPath, ['-y', '-i', inputVideo, '-vn', '-c:a', 'copy', audioPath]);

  // Step 2: Extract raw frames as PNG
  console.log(`Step 2: Extracting video frames...`);
  cp.execFileSync(ffmpegPath, ['-y', '-i', inputVideo, path.join(rawDir, 'frame_%05d.png')]);

  const frameFiles = fs.readdirSync(rawDir).filter(f => f.endsWith('.png')).sort();
  console.log(`Extracted ${frameFiles.length} frames.`);

  // Step 3: Inpaint watermark on each frame
  console.log(`Step 3: Removing watermark across all frames...`);
  const start = Date.now();
  for (let i = 0; i < frameFiles.length; i++) {
    const fName = frameFiles[i];
    const rawPath = path.join(rawDir, fName);
    const cleanPath = path.join(cleanDir, fName);
    
    const fileBuf = fs.readFileSync(rawPath);
    const { data, info } = await sharp(fileBuf).raw().toBuffer({ resolveWithObject: true });
    
    await inpaintPatch(data, info.width, info.height, info.channels);
    
    const cleanPng = await sharp(data, { raw: { width: info.width, height: info.height, channels: info.channels } })
      .png({ compressionLevel: 4 })
      .toBuffer();
      
    fs.writeFileSync(cleanPath, cleanPng);
    
    if ((i + 1) % 40 === 0 || i === frameFiles.length - 1) {
      console.log(`  Processed ${i + 1}/${frameFiles.length} frames (${Math.round((i + 1) / frameFiles.length * 100)}%)`);
    }
  }
  console.log(`Finished cleaning frames in ${((Date.now() - start) / 1000).toFixed(2)}s.`);

  // Step 4: Reassemble video with original audio at 24fps
  console.log(`Step 4: Reassembling final clean MP4 with FFmpeg...`);
  cp.execFileSync(ffmpegPath, [
    '-y',
    '-framerate', '24',
    '-i', path.join(cleanDir, 'frame_%05d.png'),
    '-i', audioPath,
    '-c:v', 'libx264',
    '-crf', '18',
    '-preset', 'slow',
    '-pix_fmt', 'yuv420p',
    '-c:a', 'aac',
    '-b:a', '192k',
    outputVideo
  ]);

  console.log(`Successfully created clean video: ${outputVideo}`);

  // Clean up temp directory
  console.log(`Cleaning up temporary frames...`);
  fs.rmSync(tempDir, { recursive: true, force: true });
  console.log(`All done! Clean video ready.`);
}

main().catch(err => {
  console.error('Error in pipeline:', err);
  process.exit(1);
});
