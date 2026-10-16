import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { 
  Monitor, 
  Cpu, 
  Layers, 
  Fan, 
  CircuitBoard, 
  Box, 
  HardDrive, 
  Zap, 
  RotateCcw,
  Sliders,
  CheckCircle2,
  Sparkles
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
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);

  const [explodeFactor, setExplodeFactor] = useState(0.85); // 0 = fully assembled, 1 = exploded
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const explodeFactorRef = useRef(0.85);
  explodeFactorRef.current = explodeFactor;

  const activeTabRef = useRef(activeTab);
  activeTabRef.current = activeTab;

  const hoveredCategoryRef = useRef(null);
  hoveredCategoryRef.current = hoveredCategory;

  const partsGroupsRef = useRef({});
  const rotatingFansRef = useRef([]);
  const clickableMeshesRef = useRef([]);
  const highlightableMaterialsRef = useRef([]);

  // 1. Dynamic Texture for 3D Gaming Monitor Screen
  const createMonitorTexture = (monitorName, fps, res, brand) => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 576;
    const ctx = canvas.getContext('2d');

    // Solid dark cyber aesthetic background
    const bgGrad = ctx.createLinearGradient(0, 0, 1024, 576);
    bgGrad.addColorStop(0, '#05070e');
    bgGrad.addColorStop(0.5, '#0c1020');
    bgGrad.addColorStop(1, '#20050a');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1024, 576);

    // Subtle technical grid
    ctx.strokeStyle = 'rgba(229, 9, 20, 0.2)';
    ctx.lineWidth = 1;
    for (let x = 0; x < 1024; x += 36) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 576);
      ctx.stroke();
    }
    for (let y = 0; y < 576; y += 36) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(1024, y);
      ctx.stroke();
    }

    // Glowing Central Games World Controller Logo
    ctx.save();
    ctx.translate(512, 240);
    ctx.fillStyle = 'rgba(229, 9, 20, 0.2)';
    ctx.beginPath();
    ctx.arc(0, 0, 130, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#e50914';
    ctx.lineWidth = 18;
    ctx.beginPath();
    ctx.arc(0, 0, 85, -Math.PI * 0.72, Math.PI * 0.68, false);
    ctx.lineTo(35, 0);
    ctx.stroke();
    ctx.restore();

    // Top Telemetry Card
    ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
    ctx.fillRect(40, 40, 380, 60);
    ctx.strokeStyle = '#e50914';
    ctx.lineWidth = 2.5;
    ctx.strokeRect(40, 40, 380, 60);

    ctx.fillStyle = '#e50914';
    ctx.font = 'bold 28px sans-serif';
    ctx.fillText(`${fps} FPS`, 60, 80);

    ctx.fillStyle = '#cbd5e1';
    ctx.font = 'bold 18px sans-serif';
    ctx.fillText(`VALORANT • ${res}`, 190, 80);

    // Screen Brand & Model Name at Bottom
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText((brand || 'GAMES WORLD').toUpperCase(), 512, 450);

    ctx.fillStyle = '#ef4444';
    ctx.font = 'bold 22px sans-serif';
    ctx.fillText(monitorName || '240Hz FAST IPS GAMING DISPLAY', 512, 495);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  };

  // 2. Initialize Three.js 3D Solid Scene
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 620;

    // SCENE
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x06070a);
    sceneRef.current = scene;

    // CAMERA - Close up, large, heroic perspective
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(-0.8, 2.6, 6.2);
    cameraRef.current = camera;

    // RENDERER
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.45;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    // CONTROLS - Static stable camera (no auto-rotation, smooth manual orbit if desired)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.target.set(0.1, 1.25, 0);
    controls.minDistance = 3.0;
    controls.maxDistance = 10.0;
    controls.maxPolarAngle = Math.PI / 2 - 0.02;
    controls.autoRotate = false; // NO ROTATION
    controlsRef.current = controls;

    // LIGHTING: Dramatic Solid PBR Studio Lighting
    const ambientLight = new THREE.AmbientLight(0x283048, 1.5);
    scene.add(ambientLight);

    const mainKeyLight = new THREE.DirectionalLight(0xffffff, 3.8);
    mainKeyLight.position.set(5, 8, 6);
    mainKeyLight.castShadow = true;
    mainKeyLight.shadow.mapSize.width = 1024;
    mainKeyLight.shadow.mapSize.height = 1024;
    scene.add(mainKeyLight);

    const frontFillLight = new THREE.DirectionalLight(0x94a3b8, 2.2);
    frontFillLight.position.set(-5, 4, 5);
    scene.add(frontFillLight);

    const redBackLight = new THREE.DirectionalLight(0xe50914, 4.5);
    redBackLight.position.set(3, 1, -4);
    scene.add(redBackLight);

    // Trackers
    const clickables = [];
    clickableMeshesRef.current = clickables;
    const rotatingFans = [];
    rotatingFansRef.current = rotatingFans;
    const partGroups = {};
    partsGroupsRef.current = partGroups;
    const highlightables = [];
    highlightableMaterialsRef.current = highlightables;

    // =========================================================================
    // SOLID PBR MATERIALS PALETTE
    // =========================================================================
    const solidBlackMat = new THREE.MeshStandardMaterial({
      color: 0x14151e,
      roughness: 0.35,
      metalness: 0.75
    });

    const solidTitaniumMat = new THREE.MeshStandardMaterial({
      color: 0x222432,
      roughness: 0.25,
      metalness: 0.85
    });

    const brushedSilverMat = new THREE.MeshStandardMaterial({
      color: 0x64748b,
      roughness: 0.2,
      metalness: 0.9
    });

    const redAccentMat = new THREE.MeshStandardMaterial({
      color: 0xe50914,
      roughness: 0.2,
      metalness: 0.5,
      emissive: 0x8a030a,
      emissiveIntensity: 0.5
    });

    const cyanGlowMat = new THREE.MeshStandardMaterial({
      color: 0x00e5ff,
      emissive: 0x00e5ff,
      emissiveIntensity: 1.2,
      roughness: 0.2
    });

    const goldPsuMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      emissive: 0xb45309,
      emissiveIntensity: 0.6,
      roughness: 0.3,
      metalness: 0.8
    });

    const darkPcbMat = new THREE.MeshStandardMaterial({
      color: 0x0c0e14,
      roughness: 0.6,
      metalness: 0.4
    });

    const temperedGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0x181a28,
      transmission: 0.88,
      opacity: 0.45,
      transparent: true,
      roughness: 0.08,
      metalness: 0.15
    });

    // Helper to register solid clickable meshes
    const registerClickable = (mesh, category, baseMat) => {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.userData = { category };
      clickables.push(mesh);

      // Clone material so active highlight doesn't bleed to unselected parts
      const activeMat = baseMat.clone();
      mesh.material = activeMat;
      highlightables.push({ mesh, category, originalMat: activeMat, originalEmissive: activeMat.emissive ? activeMat.emissive.getHex() : 0 });
      return mesh;
    };

    // =========================================================================
    // 3. SOLID 3D PC & MONITOR (Large, Substantial, Highly Detailed!)
    // =========================================================================

    // Solid Carbon Gaming Floor
    const floorGeo = new THREE.PlaneGeometry(16, 12);
    const floorMat = new THREE.MeshStandardMaterial({ color: 0x07080e, roughness: 0.7, metalness: 0.3 });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = -0.01;
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);

    // Red Geometric Stage Perimeter Line
    const stageLineGeo = new THREE.BoxGeometry(9.0, 0.02, 0.04);
    const stageLine = new THREE.Mesh(stageLineGeo, redAccentMat);
    stageLine.position.set(0, 0.01, 2.4);
    scene.add(stageLine);

    // -------------------------------------------------------------------------
    // A. SOLID GAMING MONITOR (SCREEN) - Left Side, Large & Vivid!
    // -------------------------------------------------------------------------
    const monitorGroup = new THREE.Group();
    monitorGroup.userData = { category: 'monitors' };
    monitorGroup.position.set(-2.5, 0, 0.2);

    // Solid Heavy Base Stand
    const standBaseGeo = new THREE.BoxGeometry(1.2, 0.05, 0.8);
    const standBase = registerClickable(new THREE.Mesh(standBaseGeo, brushedSilverMat), 'monitors', brushedSilverMat);
    standBase.position.set(0, 0.025, 0);
    monitorGroup.add(standBase);

    // Solid Angled Stand Arm
    const standArmGeo = new THREE.BoxGeometry(0.18, 1.8, 0.18);
    const standArm = registerClickable(new THREE.Mesh(standArmGeo, brushedSilverMat), 'monitors', brushedSilverMat);
    standArm.position.set(0, 0.9, -0.2);
    standArm.rotation.x = -0.06;
    monitorGroup.add(standArm);

    // Solid Monitor Bezel Frame
    const screenFrameGeo = new THREE.BoxGeometry(3.6, 2.15, 0.12);
    const screenFrame = registerClickable(new THREE.Mesh(screenFrameGeo, solidBlackMat), 'monitors', solidBlackMat);
    screenFrame.position.set(0, 1.7, 0);
    monitorGroup.add(screenFrame);

    // Bright High-Res Display Surface
    const screenDisplayGeo = new THREE.PlaneGeometry(3.48, 2.03);
    const screenTex = createMonitorTexture(
      selectedParts.monitors?.name,
      gameFps?.valorant || 380,
      targetResolution || '1440p',
      selectedParts.monitors?.brand
    );
    const screenMat = new THREE.MeshStandardMaterial({
      map: screenTex,
      roughness: 0.1,
      metalness: 0.1,
      emissive: 0xffffff,
      emissiveMap: screenTex,
      emissiveIntensity: 0.85
    });
    const screenDisplay = registerClickable(new THREE.Mesh(screenDisplayGeo, screenMat), 'monitors', screenMat);
    screenDisplay.position.set(0, 1.7, 0.065);
    monitorGroup.add(screenDisplay);

    partGroups.monitors = {
      group: monitorGroup,
      assembledPos: new THREE.Vector3(-2.5, 0, 0.2),
      explodedPos: new THREE.Vector3(-2.5, 0, 0.2)
    };
    scene.add(monitorGroup);

    // -------------------------------------------------------------------------
    // B. SOLID CHASSIS FRAME (PC Cabinet)
    // -------------------------------------------------------------------------
    const chassisGroup = new THREE.Group();
    chassisGroup.userData = { category: 'cabinets' };

    // Solid Pillars
    const pillarGeo = new THREE.BoxGeometry(0.12, 2.6, 0.12);
    for (const [x, z] of [[-0.9, -1.0], [0.9, -1.0], [-0.9, 1.0], [0.9, 1.0]]) {
      const pillar = registerClickable(new THREE.Mesh(pillarGeo, solidBlackMat), 'cabinets', solidBlackMat);
      pillar.position.set(x, 1.3, z);
      chassisGroup.add(pillar);
    }
    // Solid Beams
    const beamXGeo = new THREE.BoxGeometry(1.8, 0.1, 0.1);
    for (const [y, z] of [[0.05, -1.0], [0.05, 1.0], [2.55, -1.0], [2.55, 1.0]]) {
      const beam = registerClickable(new THREE.Mesh(beamXGeo, solidBlackMat), 'cabinets', solidBlackMat);
      beam.position.set(0, y, z);
      chassisGroup.add(beam);
    }
    const beamZGeo = new THREE.BoxGeometry(0.1, 0.1, 2.0);
    for (const [x, y] of [[-0.9, 0.05], [0.9, 0.05], [-0.9, 2.55], [0.9, 2.55]]) {
      const beam = registerClickable(new THREE.Mesh(beamZGeo, solidBlackMat), 'cabinets', solidBlackMat);
      beam.position.set(x, y, 0);
      chassisGroup.add(beam);
    }

    // Rear Solid Motherboard Tray Panel
    const trayGeo = new THREE.BoxGeometry(0.05, 2.4, 1.8);
    const tray = registerClickable(new THREE.Mesh(trayGeo, solidTitaniumMat), 'cabinets', solidTitaniumMat);
    tray.position.set(0.85, 1.3, 0);
    chassisGroup.add(tray);

    // 3x Front Intake Fans Mounted to Chassis Frame
    for (let i = -1; i <= 1; i++) {
      const frontFanGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.09, 28);
      const frontFan = registerClickable(new THREE.Mesh(frontFanGeo, solidBlackMat), 'coolers', solidBlackMat);
      frontFan.position.set(0.78, 1.3 + i * 0.72, 0.45);
      frontFan.rotation.z = Math.PI / 2;
      chassisGroup.add(frontFan);

      // Vibrant Red ARGB Fan Blades
      const bladesGroup = new THREE.Group();
      for (let b = 0; b < 7; b++) {
        const bladeGeo = new THREE.BoxGeometry(0.04, 0.24, 0.02);
        const blade = new THREE.Mesh(bladeGeo, redAccentMat);
        blade.position.set(0, 0.12, 0);
        blade.rotation.z = (b * Math.PI * 2) / 7;
        bladesGroup.add(blade);
      }
      bladesGroup.position.copy(frontFan.position);
      bladesGroup.rotation.z = Math.PI / 2;
      chassisGroup.add(bladesGroup);
      rotatingFans.push(bladesGroup);
    }

    partGroups.cabinets = {
      group: chassisGroup,
      assembledPos: new THREE.Vector3(1.3, 0, 0),
      explodedPos: new THREE.Vector3(1.3, 0, 0)
    };
    chassisGroup.position.set(1.3, 0, 0);
    scene.add(chassisGroup);

    // -------------------------------------------------------------------------
    // C. TOP 360mm RADIATOR & ARGB FANS ("Fan") - Solid, Vibrant, Explodes Up!
    // -------------------------------------------------------------------------
    const radGroup = new THREE.Group();
    radGroup.userData = { category: 'coolers' };

    // Solid Black Aluminum Radiator Body
    const radGeo = new THREE.BoxGeometry(1.8, 0.18, 0.65);
    const radMesh = registerClickable(new THREE.Mesh(radGeo, solidBlackMat), 'coolers', solidBlackMat);
    radGroup.add(radMesh);

    // 3x 120mm ARGB Fans with Glowing Cyan/Red Blades
    for (let i = -1; i <= 1; i++) {
      const fanHousingGeo = new THREE.CylinderGeometry(0.26, 0.26, 0.09, 28);
      const fanHousing = registerClickable(new THREE.Mesh(fanHousingGeo, solidTitaniumMat), 'coolers', solidTitaniumMat);
      fanHousing.position.set(i * 0.55, -0.12, 0);
      radGroup.add(fanHousing);

      // Rotating Blades
      const fanBlades = new THREE.Group();
      for (let b = 0; b < 7; b++) {
        const bladeGeo = new THREE.BoxGeometry(0.04, 0.22, 0.02);
        const blade = new THREE.Mesh(bladeGeo, cyanGlowMat);
        blade.position.set(0, 0.11, 0);
        blade.rotation.z = (b * Math.PI * 2) / 7;
        fanBlades.add(blade);
      }
      fanBlades.position.set(i * 0.55, -0.12, 0);
      radGroup.add(fanBlades);
      rotatingFans.push(fanBlades);
    }

    // Top Dust Filter Panel (Lifts above radiator)
    const topFilterGeo = new THREE.BoxGeometry(1.9, 0.04, 0.8);
    const topFilter = registerClickable(new THREE.Mesh(topFilterGeo, solidTitaniumMat), 'coolers', solidTitaniumMat);
    topFilter.position.set(0, 0.45, 0);
    radGroup.add(topFilter);

    partGroups.coolers = {
      group: radGroup,
      assembledPos: new THREE.Vector3(1.3, 2.5, 0),
      explodedPos: new THREE.Vector3(1.3, 3.7, 0) // Lifts up high!
    };
    scene.add(radGroup);

    // -------------------------------------------------------------------------
    // D. SOLID MOTHERBOARD (PCB, Silver Heatsinks, PCIe Slots)
    // -------------------------------------------------------------------------
    const mbGroup = new THREE.Group();
    mbGroup.userData = { category: 'motherboards' };

    // Solid Multi-layer Black PCB
    const pcbGeo = new THREE.BoxGeometry(0.06, 1.7, 1.55);
    const pcb = registerClickable(new THREE.Mesh(pcbGeo, darkPcbMat), 'motherboards', darkPcbMat);
    mbGroup.add(pcb);

    // Heavy Brushed Silver VRM Heatsinks
    const vrm1Geo = new THREE.BoxGeometry(0.16, 0.45, 0.55);
    const vrm1 = registerClickable(new THREE.Mesh(vrm1Geo, brushedSilverMat), 'motherboards', brushedSilverMat);
    vrm1.position.set(-0.08, 0.52, -0.22);
    mbGroup.add(vrm1);

    const vrm2Geo = new THREE.BoxGeometry(0.16, 0.45, 0.35);
    const vrm2 = registerClickable(new THREE.Mesh(vrm2Geo, brushedSilverMat), 'motherboards', brushedSilverMat);
    vrm2.position.set(-0.08, 0.28, -0.52);
    mbGroup.add(vrm2);

    // Reinforced PCIe 5.0 x16 Slots
    const pcieGeo = new THREE.BoxGeometry(0.08, 0.06, 1.0);
    for (let s = 0; s < 3; s++) {
      const pcie = registerClickable(new THREE.Mesh(pcieGeo, brushedSilverMat), 'motherboards', brushedSilverMat);
      pcie.position.set(-0.05, -0.2 - s * 0.3, 0.1);
      mbGroup.add(pcie);
    }

    partGroups.motherboards = {
      group: mbGroup,
      assembledPos: new THREE.Vector3(1.7, 1.4, 0),
      explodedPos: new THREE.Vector3(0.5, 1.4, 0.5) // Explodes forward-left
    };
    scene.add(mbGroup);

    // -------------------------------------------------------------------------
    // E. CPU & LIQUID COOLER PUMP HEAD ("CPU") - Solid Red AIO Infinity Mirror!
    // -------------------------------------------------------------------------
    const cpuGroup = new THREE.Group();
    cpuGroup.userData = { category: 'processors' };

    // Solid Socket Latch
    const socketGeo = new THREE.BoxGeometry(0.06, 0.45, 0.45);
    const socket = registerClickable(new THREE.Mesh(socketGeo, brushedSilverMat), 'processors', brushedSilverMat);
    cpuGroup.add(socket);

    // Heavy Cylindrical Pump Block
    const pumpGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.18, 32);
    const pumpMesh = registerClickable(new THREE.Mesh(pumpGeo, solidTitaniumMat), 'processors', solidTitaniumMat);
    pumpMesh.position.set(-0.16, 0, 0);
    pumpMesh.rotation.z = Math.PI / 2;
    cpuGroup.add(pumpMesh);

    // Glowing Deep Red Illuminated Infinity Ring
    const pumpRingGeo = new THREE.TorusGeometry(0.22, 0.035, 16, 32);
    const pumpRing = registerClickable(new THREE.Mesh(pumpRingGeo, redAccentMat), 'processors', redAccentMat);
    pumpRing.position.set(-0.26, 0, 0);
    pumpRing.rotation.y = Math.PI / 2;
    cpuGroup.add(pumpRing);

    // Solid Coolant Hoses Connecting to Radiator
    const hoseCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.2, 0.08, 0),
      new THREE.Vector3(-0.4, 0.5, 0.2),
      new THREE.Vector3(-0.1, 1.0, 0.3),
      new THREE.Vector3(0.3, 1.4, 0.2)
    ]);
    const hoseGeo = new THREE.TubeGeometry(hoseCurve, 24, 0.045, 12, false);
    const hoseMesh = registerClickable(new THREE.Mesh(hoseGeo, solidBlackMat), 'processors', solidBlackMat);
    cpuGroup.add(hoseMesh);

    partGroups.processors = {
      group: cpuGroup,
      assembledPos: new THREE.Vector3(1.6, 1.7, -0.2),
      explodedPos: new THREE.Vector3(-0.5, 1.7, 1.0) // Floating prominently in front!
    };
    scene.add(cpuGroup);

    // -------------------------------------------------------------------------
    // F. 4X SOLID DDR5 RAM STICKS with Glowing RGB Lightbars
    // -------------------------------------------------------------------------
    const ramGroup = new THREE.Group();
    ramGroup.userData = { category: 'rams' };

    for (let r = 0; r < 4; r++) {
      const ramGeo = new THREE.BoxGeometry(0.05, 0.65, 0.07);
      const ram = registerClickable(new THREE.Mesh(ramGeo, solidTitaniumMat), 'rams', solidTitaniumMat);
      ram.position.set(0, 0, r * 0.16 - 0.24);
      ramGroup.add(ram);

      // Solid Vibrant RGB Lightbar Top
      const ramRgbGeo = new THREE.BoxGeometry(0.06, 0.1, 0.065);
      const ramRgb = registerClickable(new THREE.Mesh(ramRgbGeo, r % 2 === 0 ? cyanGlowMat : redAccentMat), 'rams', r % 2 === 0 ? cyanGlowMat : redAccentMat);
      ramRgb.position.set(0, 0.3, r * 0.16 - 0.24);
      ramGroup.add(ramRgb);
    }

    partGroups.rams = {
      group: ramGroup,
      assembledPos: new THREE.Vector3(1.6, 1.7, 0.3),
      explodedPos: new THREE.Vector3(0.9, 1.75, 1.2) // Floating in mid-air row!
    };
    scene.add(ramGroup);

    // -------------------------------------------------------------------------
    // G. SOLID TRIPLE-FAN GRAPHICS CARD (GPU) - Massive Foreground Flagship!
    // -------------------------------------------------------------------------
    const gpuGroup = new THREE.Group();
    gpuGroup.userData = { category: 'graphicsCards' };

    // Solid Heavy Titanium-Black Outer Shroud
    const gpuShroudGeo = new THREE.BoxGeometry(1.85, 0.75, 0.42);
    const gpuShroud = registerClickable(new THREE.Mesh(gpuShroudGeo, solidBlackMat), 'graphicsCards', solidBlackMat);
    gpuGroup.add(gpuShroud);

    // Triple Front Cooling Fans
    for (let f = -1; f <= 1; f++) {
      const fanGeo = new THREE.CylinderGeometry(0.26, 0.26, 0.05, 28);
      const fan = registerClickable(new THREE.Mesh(fanGeo, solidTitaniumMat), 'graphicsCards', solidTitaniumMat);
      fan.position.set(f * 0.58, 0, 0.22);
      fan.rotation.x = Math.PI / 2;
      gpuGroup.add(fan);

      // Rotating Blades
      const blades = new THREE.Group();
      for (let b = 0; b < 9; b++) {
        const bladeGeo = new THREE.BoxGeometry(0.04, 0.23, 0.02);
        const blade = new THREE.Mesh(bladeGeo, brushedSilverMat);
        blade.position.set(0, 0.11, 0);
        blade.rotation.z = (b * Math.PI * 2) / 9;
        blades.add(blade);
      }
      blades.position.set(f * 0.58, 0, 0.22);
      blades.rotation.x = Math.PI / 2;
      gpuGroup.add(blades);
      rotatingFans.push(blades);
    }

    // Heavy Brushed Aluminum Backplate
    const backplateGeo = new THREE.BoxGeometry(1.82, 0.72, 0.04);
    const backplate = registerClickable(new THREE.Mesh(backplateGeo, brushedSilverMat), 'graphicsCards', brushedSilverMat);
    backplate.position.set(0, 0, -0.22);
    gpuGroup.add(backplate);

    // Glowing GEFORCE RTX Side Badge
    const rtxBadgeGeo = new THREE.BoxGeometry(0.8, 0.12, 0.05);
    const rtxBadge = registerClickable(new THREE.Mesh(rtxBadgeGeo, cyanGlowMat), 'graphicsCards', cyanGlowMat);
    rtxBadge.position.set(0.2, 0.33, 0);
    gpuGroup.add(rtxBadge);

    partGroups.graphicsCards = {
      group: gpuGroup,
      assembledPos: new THREE.Vector3(1.2, 0.95, 0.15),
      explodedPos: new THREE.Vector3(-1.0, 0.95, 1.8) // Exploded far forward in foreground!
    };
    scene.add(gpuGroup);

    // -------------------------------------------------------------------------
    // H. SOLID POWER SUPPLY (PSU) with Gold 80+ Badge & Modular Sockets
    // -------------------------------------------------------------------------
    const psuGroup = new THREE.Group();
    psuGroup.userData = { category: 'powerSupplies' };

    // Solid Black Steel PSU Casing
    const psuBlockGeo = new THREE.BoxGeometry(1.0, 0.7, 1.1);
    const psuBlock = registerClickable(new THREE.Mesh(psuBlockGeo, solidBlackMat), 'powerSupplies', solidBlackMat);
    psuGroup.add(psuBlock);

    // Gold 80+ Certification Badge on Side
    const psuBadgeGeo = new THREE.BoxGeometry(0.04, 0.28, 0.4);
    const psuBadge = registerClickable(new THREE.Mesh(psuBadgeGeo, goldPsuMat), 'powerSupplies', goldPsuMat);
    psuBadge.position.set(-0.51, 0.1, 0);
    psuGroup.add(psuBadge);

    // Modular Connector Faceplate
    const connFaceGeo = new THREE.PlaneGeometry(0.88, 0.58);
    const connFace = registerClickable(new THREE.Mesh(connFaceGeo, solidTitaniumMat), 'powerSupplies', solidTitaniumMat);
    connFace.position.set(0, 0, 0.56);
    psuGroup.add(connFace);

    // Modular Plugs
    for (let r = -1; r <= 1; r++) {
      for (let c = -2; c <= 2; c++) {
        const plugGeo = new THREE.BoxGeometry(0.12, 0.09, 0.05);
        const plug = new THREE.Mesh(plugGeo, new THREE.MeshStandardMaterial({ color: 0x050508 }));
        plug.position.set(c * 0.16, r * 0.14, 0.58);
        psuGroup.add(plug);
      }
    }

    partGroups.powerSupplies = {
      group: psuGroup,
      assembledPos: new THREE.Vector3(1.3, 0.4, 0),
      explodedPos: new THREE.Vector3(0.5, 0.35, 2.1) // Pulled forward at bottom!
    };
    scene.add(psuGroup);

    // -------------------------------------------------------------------------
    // I. TEMPERED GLASS PANEL (Floats outward to the right)
    // -------------------------------------------------------------------------
    const glassGroup = new THREE.Group();
    glassGroup.userData = { category: 'cabinets' };

    const glassGeo = new THREE.BoxGeometry(0.05, 2.5, 1.9);
    const glassMesh = registerClickable(new THREE.Mesh(glassGeo, temperedGlassMat), 'cabinets', temperedGlassMat);
    glassGroup.add(glassMesh);

    partGroups.glass = {
      group: glassGroup,
      assembledPos: new THREE.Vector3(0.4, 1.3, 0),
      explodedPos: new THREE.Vector3(2.8, 1.3, 0.7) // Floating to the right!
    };
    scene.add(glassGroup);

    // =========================================================================
    // 4. RAYCASTING: CLICKING DIRECTLY ON SOLID COMPONENTS
    // =========================================================================
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const getIntersectedCategory = (e) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(clickables, true);

      if (intersects.length > 0) {
        let cat = intersects[0].object.userData.category;
        let parent = intersects[0].object.parent;
        while (!cat && parent) {
          cat = parent.userData?.category;
          parent = parent.parent;
        }
        return cat;
      }
      return null;
    };

    const onPointerMove = (e) => {
      const cat = getIntersectedCategory(e);
      if (cat) {
        container.style.cursor = 'pointer';
        setHoveredCategory(cat);
      } else {
        container.style.cursor = 'default';
        setHoveredCategory(null);
      }
    };

    const onPointerDown = (e) => {
      const cat = getIntersectedCategory(e);
      if (cat) {
        playMountSound();
        onSelectCategory(cat);
      }
    };

    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('pointerdown', onPointerDown);

    const onResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 620;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // =========================================================================
    // 5. ANIMATION & EXPLOSION POSITION INTERPOLATION LOOP
    // =========================================================================
    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Rotate cooling fan blades
      for (const fan of rotatingFans) {
        fan.rotation.z += 0.05;
      }

      // Explode / Assemble interpolation
      const factor = explodeFactorRef.current;
      for (const [key, partData] of Object.entries(partGroups)) {
        if (partData.assembledPos && partData.explodedPos) {
          partData.group.position.lerpVectors(
            partData.assembledPos,
            partData.explodedPos,
            factor
          );
        }
      }

      // Highlight active component with vivid Games World Red emissive glow
      const currentActive = activeTabRef.current;
      const currentHover = hoveredCategoryRef.current;

      for (const item of highlightables) {
        const cat = item.category;
        if (cat === currentActive || cat === currentHover) {
          item.mesh.material.emissive.setHex(0xe50914);
          item.mesh.material.emissiveIntensity = 0.7;
        } else {
          item.mesh.material.emissive.setHex(item.originalEmissive);
          item.mesh.material.emissiveIntensity = 0.2;
        }
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      controls.dispose();
    };
  }, []);

  const handleResetCamera = () => {
    playClickSound();
    if (cameraRef.current && controlsRef.current) {
      cameraRef.current.position.set(-0.8, 2.6, 6.2);
      controlsRef.current.target.set(0.1, 1.25, 0);
      controlsRef.current.update();
    }
  };

  const categoryLabels = [
    { id: 'monitors', label: '1. Gaming Screen', icon: Monitor, tag: 'DISPLAY SCREEN' },
    { id: 'processors', label: '2. Processor (CPU)', icon: Cpu, tag: 'CPU SOCKET' },
    { id: 'coolers', label: '3. Cooling Fans & AIO', icon: Fan, tag: 'FANS & RADIATOR' },
    { id: 'graphicsCards', label: '4. Graphics Card (GPU)', icon: Layers, tag: 'PCIE GPU' },
    { id: 'rams', label: '5. Memory (RAM)', icon: Box, tag: 'DDR5 MEMORY' },
    { id: 'motherboards', label: '6. Motherboard', icon: CircuitBoard, tag: 'PCB MAIN' },
    { id: 'powerSupplies', label: '7. Power Supply', icon: Zap, tag: '80+ GOLD PSU' },
    { id: 'cabinets', label: '8. PC Cabinet', icon: Box, tag: 'CHASSIS FRAME' }
  ];

  const activeCategoryInfo = categoryLabels.find(c => c.id === activeTab);

  return (
    <div className="mb-10 rounded-2xl bg-gradient-to-b from-[#0c0d14] via-[#08090e] to-[#040508] border border-red-900/60 shadow-2xl overflow-hidden relative">
      
      {/* Studio Header Controls */}
      <div className="px-5 py-4 border-b border-gw-border flex flex-wrap items-center justify-between gap-4 bg-black/85 backdrop-blur-md relative z-20">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-red-500 animate-ping"></div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-display tracking-wider text-white">
                3D EXPLODED PC & BATTLESTATION WORKBENCH
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-tech font-bold uppercase bg-red-950 text-red-400 border border-red-800">
                SOLID 3D HARDWARE
              </span>
            </div>
            <p className="text-[11px] text-gray-400 font-sans">
              Click any 3D component directly: <span className="text-red-400 font-bold">Screen</span>, <span className="text-red-400 font-bold">Fans</span>, <span className="text-red-400 font-bold">CPU</span>, or <span className="text-red-400 font-bold">GPU</span> to inspect and swap.
            </p>
          </div>
        </div>

        {/* View Controls: Explode Slider & Reset */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Explode / Assemble Slider */}
          <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-black/70 border border-gw-border text-xs font-tech">
            <span className="text-gray-400 uppercase text-[10px] font-bold">ASSEMBLY VIEW:</span>
            <input 
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={explodeFactor}
              onChange={(e) => setExplodeFactor(parseFloat(e.target.value))}
              className="w-28 accent-red-600 cursor-pointer"
            />
            <span className="text-red-400 font-mono font-bold w-16 text-right">
              {explodeFactor > 0.6 ? 'EXPLODED' : explodeFactor < 0.2 ? 'MOUNTED' : 'PARTIAL'}
            </span>
          </div>

          <button
            onClick={handleResetCamera}
            className="p-2.5 rounded-xl bg-black/70 hover:bg-black border border-gw-border text-gray-300 hover:text-white transition-colors"
            title="Reset 3D Camera View"
          >
            <RotateCcw className="w-4 h-4 text-red-500" />
          </button>
        </div>
      </div>

      {/* 3D WebGL Canvas - Large, Solid, Clean with ZERO Floating Tags! */}
      <div 
        ref={containerRef}
        className="relative w-full h-[520px] sm:h-[640px] select-none overflow-hidden cursor-grab active:cursor-grabbing bg-[#05060a]"
      >
        <canvas ref={canvasRef} className="w-full h-full block" />

        {/* Subtle Bottom Vignette */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#040508] to-transparent pointer-events-none"></div>
      </div>

      {/* Active Component Focus & Quick Category Navigation */}
      <div className="px-5 py-3.5 bg-[#07080f] border-t border-gw-border flex flex-col md:flex-row items-center justify-between gap-3 relative z-20">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-red-600/20 border border-red-600/60 flex items-center justify-center text-red-500 shrink-0">
            {activeCategoryInfo?.icon && (
              React.createElement(activeCategoryInfo.icon, { className: 'w-4 h-4' })
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-tech uppercase tracking-wider text-red-400 font-bold">
                CLICKED 3D COMPONENT
              </span>
              <span className="text-xs px-2 py-0.2 rounded bg-red-950/60 text-gray-300 font-tech">
                {activeCategoryInfo?.tag}
              </span>
            </div>
            <div className="text-sm font-display tracking-wider text-white">
              {activeCategoryInfo?.label}: <span className="text-red-400 font-sans font-bold text-xs">{selectedParts[activeTab]?.name || 'Choose from catalog below'}</span>
            </div>
          </div>
        </div>

        {/* Quick Component Selection Buttons */}
        <div className="flex overflow-x-auto max-w-full pb-1 scrollbar-none gap-1.5 items-center">
          <span className="text-[10px] font-tech uppercase text-gray-500 shrink-0 mr-1">Components:</span>
          {categoryLabels.map((c) => {
            const isSelected = activeTab === c.id;
            return (
              <button
                key={c.id}
                onClick={() => {
                  playMountSound();
                  onSelectCategory(c.id);
                }}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-tech font-bold uppercase whitespace-nowrap transition-all border ${
                  isSelected 
                    ? 'bg-red-600 text-white border-red-500 shadow-sm' 
                    : 'bg-black/60 text-gray-400 border-gw-border hover:border-gray-500 hover:text-white'
                }`}
              >
                {c.label.split('. ')[1]?.split(' ')[0] || c.label}
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}
