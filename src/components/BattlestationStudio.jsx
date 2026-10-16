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
  Check, 
  RotateCcw, 
  Maximize2,
  Sliders,
  Sparkles,
  Layers as LayersIcon
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

  const [explodeFactor, setExplodeFactor] = useState(0.85); // 0 = assembled, 1 = fully exploded
  const [wireframeMode, setWireframeMode] = useState(true);
  const [autoRotate, setAutoRotate] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [badges2D, setBadges2D] = useState({});

  const explodeFactorRef = useRef(0.85);
  explodeFactorRef.current = explodeFactor;

  const wireframeModeRef = useRef(true);
  wireframeModeRef.current = wireframeMode;

  const activeTabRef = useRef(activeTab);
  activeTabRef.current = activeTab;

  const partsGroupsRef = useRef({});
  const rotatingFansRef = useRef([]);
  const clickableMeshesRef = useRef([]);
  const wireframesRef = useRef([]);

  // 1. Dynamic Texture for 3D Gaming Monitor
  const createMonitorTexture = (monitorName, fps, res, brand) => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 576;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#05070e';
    ctx.fillRect(0, 0, 1024, 576);

    // CAD wireframe grid
    ctx.strokeStyle = 'rgba(229, 9, 20, 0.18)';
    ctx.lineWidth = 1;
    for (let x = 0; x < 1024; x += 32) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 576);
      ctx.stroke();
    }
    for (let y = 0; y < 576; y += 32) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(1024, y);
      ctx.stroke();
    }

    // Triangular CAD mesh accent
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    for (let x = 0; x < 1024; x += 64) {
      for (let y = 0; y < 576; y += 64) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + 64, y + 64);
        ctx.stroke();
      }
    }

    // Central Emblem
    ctx.save();
    ctx.translate(512, 250);
    ctx.strokeStyle = '#e50914';
    ctx.lineWidth = 12;
    ctx.beginPath();
    ctx.arc(0, 0, 75, -Math.PI * 0.7, Math.PI * 0.65, false);
    ctx.lineTo(25, 0);
    ctx.stroke();
    ctx.restore();

    // Top Telemetry Card
    ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
    ctx.fillRect(40, 40, 360, 56);
    ctx.strokeStyle = '#e50914';
    ctx.lineWidth = 2;
    ctx.strokeRect(40, 40, 360, 56);

    ctx.fillStyle = '#e50914';
    ctx.font = 'bold 26px sans-serif';
    ctx.fillText(`${fps} FPS`, 60, 78);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '16px sans-serif';
    ctx.fillText(`VALORANT • ${res}`, 190, 78);

    // Monitor Brand & Name
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 30px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText((brand || 'GAMES WORLD').toUpperCase(), 512, 450);

    ctx.fillStyle = '#ef4444';
    ctx.font = 'bold 18px sans-serif';
    ctx.fillText(monitorName || '240Hz FAST IPS GAMING DISPLAY', 512, 490);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  };

  // 2. Initialize Three.js Scene
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 580;

    // SCENE
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x06070a);
    sceneRef.current = scene;

    // CAMERA
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(-2.2, 3.2, 7.5);
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
    renderer.toneMappingExposure = 1.4;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    // ORBIT CONTROLS
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.target.set(0.2, 1.2, 0);
    controls.minDistance = 2.5;
    controls.maxDistance = 12.0;
    controls.maxPolarAngle = Math.PI / 2 - 0.02; // Keep above floor
    controlsRef.current = controls;

    // LIGHTING (Studio High-Contrast CAD Setup)
    const ambientLight = new THREE.AmbientLight(0x202436, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
    keyLight.position.set(5, 8, 6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x64748b, 2.0);
    fillLight.position.set(-6, 4, -3);
    scene.add(fillLight);

    const redRim = new THREE.DirectionalLight(0xe50914, 4.0);
    redRim.position.set(2, -2, -5);
    scene.add(redRim);

    // Trackers
    const clickables = [];
    clickableMeshesRef.current = clickables;
    const rotatingFans = [];
    rotatingFansRef.current = rotatingFans;
    const partGroups = {};
    partsGroupsRef.current = partGroups;
    const wireframes = [];
    wireframesRef.current = wireframes;

    // Helper to create CAD wireframe overlay on geometries (matches user screenshot!)
    const createCadMesh = (geometry, category, customColor = 0x181a24, isWireOnly = false) => {
      const meshMat = new THREE.MeshStandardMaterial({
        color: customColor,
        roughness: 0.35,
        metalness: 0.7,
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1
      });

      const mesh = new THREE.Mesh(geometry, meshMat);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.userData = { category };

      // High-precision CAD wireframe edges (white/silver by default, glows red on active/hover)
      const edgeGeo = new THREE.EdgesGeometry(geometry, 18);
      const edgeMat = new THREE.LineBasicMaterial({
        color: 0x94a3b8, // Crisp CAD line
        linewidth: 1,
        transparent: true,
        opacity: 0.75
      });
      const wireframe = new THREE.LineSegments(edgeGeo, edgeMat);
      wireframe.userData = { category, defaultColor: 0x94a3b8 };
      mesh.add(wireframe);
      wireframes.push(wireframe);

      clickables.push(mesh);
      return { mesh, wireframe };
    };

    // =========================================================================
    // 3. EXPLODED 3D PC COMPONENTS (Matching Reference Image!)
    // =========================================================================

    // Floor Grid (Architectural CAD ground grid)
    const gridHelper = new THREE.GridHelper(14, 28, 0xe50914, 0x1f2333);
    gridHelper.position.set(0, -0.01, 0);
    scene.add(gridHelper);

    // -------------------------------------------------------------------------
    // A. CHASSIS FRAME & INTERNAL BRACKETS (Static anchor)
    // -------------------------------------------------------------------------
    const chassisGroup = new THREE.Group();
    chassisGroup.userData = { category: 'cabinets' };

    // Outer Main Chassis Frame (Hollow tower frame)
    const framePillarsGeo = new THREE.BoxGeometry(0.1, 2.4, 0.1);
    for (const [x, z] of [[-0.8, -0.9], [0.8, -0.9], [-0.8, 0.9], [0.8, 0.9]]) {
      const { mesh } = createCadMesh(framePillarsGeo, 'cabinets', 0x141620);
      mesh.position.set(x, 1.2, z);
      chassisGroup.add(mesh);
    }
    // Top & Bottom Frame Perimeters
    const frameBeamsX = new THREE.BoxGeometry(1.6, 0.08, 0.08);
    for (const [y, z] of [[0.05, -0.9], [0.05, 0.9], [2.35, -0.9], [2.35, 0.9]]) {
      const { mesh } = createCadMesh(frameBeamsX, 'cabinets', 0x141620);
      mesh.position.set(0, y, z);
      chassisGroup.add(mesh);
    }
    const frameBeamsZ = new THREE.BoxGeometry(0.08, 0.08, 1.8);
    for (const [x, y] of [[-0.8, 0.05], [0.8, 0.05], [-0.8, 2.35], [0.8, 2.35]]) {
      const { mesh } = createCadMesh(frameBeamsZ, 'cabinets', 0x141620);
      mesh.position.set(x, y, 0);
      chassisGroup.add(mesh);
    }

    // Rear Solid Metal Panel with I/O cutout & Honeycomb holes
    const rearPanelGeo = new THREE.BoxGeometry(0.04, 2.2, 1.6);
    const { mesh: rearPanel } = createCadMesh(rearPanelGeo, 'cabinets', 0x11131c);
    rearPanel.position.set(0.78, 1.2, 0);
    chassisGroup.add(rearPanel);

    // Front/Side Vertical Fan Pillar with 3 intake fans
    for (let i = -1; i <= 1; i++) {
      const fanGeo = new THREE.CylinderGeometry(0.25, 0.25, 0.08, 24);
      const { mesh: fanMesh } = createCadMesh(fanGeo, 'coolers', 0x1c1e2c);
      fanMesh.position.set(0.7, 1.2 + i * 0.65, 0.45);
      fanMesh.rotation.z = Math.PI / 2;
      chassisGroup.add(fanMesh);

      // Blades
      const bladesGroup = new THREE.Group();
      for (let b = 0; b < 7; b++) {
        const bladeGeo = new THREE.BoxGeometry(0.03, 0.22, 0.02);
        const blade = new THREE.Mesh(bladeGeo, new THREE.MeshStandardMaterial({ color: 0xe50914, emissive: 0x8a030a, emissiveIntensity: 0.6 }));
        blade.position.set(0, 0.11, 0);
        blade.rotation.z = (b * Math.PI * 2) / 7;
        bladesGroup.add(blade);
      }
      bladesGroup.position.copy(fanMesh.position);
      bladesGroup.rotation.z = Math.PI / 2;
      chassisGroup.add(bladesGroup);
      rotatingFans.push(bladesGroup);
    }

    partGroups.cabinets = {
      group: chassisGroup,
      assembledPos: new THREE.Vector3(1.2, 0, 0),
      explodedPos: new THREE.Vector3(1.2, 0, 0)
    };
    chassisGroup.position.set(1.2, 0, 0);
    scene.add(chassisGroup);

    // -------------------------------------------------------------------------
    // B. TOP RADIATOR & FANS (Explodes UPWARD like reference image!)
    // -------------------------------------------------------------------------
    const radGroup = new THREE.Group();
    radGroup.userData = { category: 'coolers' };

    // 360mm Radiator Core
    const radCoreGeo = new THREE.BoxGeometry(1.5, 0.14, 0.55);
    const { mesh: radCore } = createCadMesh(radCoreGeo, 'coolers', 0x181a26);
    radGroup.add(radCore);

    // 3x Top Exhaust Fans attached to Radiator
    for (let i = -1; i <= 1; i++) {
      const fanGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.08, 24);
      const { mesh: fanMesh } = createCadMesh(fanGeo, 'coolers', 0x222638);
      fanMesh.position.set(i * 0.48, -0.09, 0);
      radGroup.add(fanMesh);

      // Radiator Fan Blades
      const radBlades = new THREE.Group();
      for (let b = 0; b < 7; b++) {
        const bladeGeo = new THREE.BoxGeometry(0.03, 0.18, 0.02);
        const blade = new THREE.Mesh(bladeGeo, new THREE.MeshStandardMaterial({ color: 0x00e5ff, emissive: 0x0088cc, emissiveIntensity: 0.6 }));
        blade.position.set(0, 0.09, 0);
        blade.rotation.z = (b * Math.PI * 2) / 7;
        radBlades.add(blade);
      }
      radBlades.position.set(i * 0.48, -0.09, 0);
      radGroup.add(radBlades);
      rotatingFans.push(radBlades);
    }

    // Top Removable Mesh Filter Panel (Exploded even higher)
    const topFilterGeo = new THREE.BoxGeometry(1.6, 0.03, 0.7);
    const { mesh: topFilter } = createCadMesh(topFilterGeo, 'coolers', 0x12131c);
    topFilter.position.set(0, 0.35, 0);
    radGroup.add(topFilter);

    partGroups.coolers = {
      group: radGroup,
      assembledPos: new THREE.Vector3(1.2, 2.3, 0),
      explodedPos: new THREE.Vector3(1.2, 3.4, 0) // Lifted up in exploded view!
    };
    scene.add(radGroup);

    // -------------------------------------------------------------------------
    // C. MOTHERBOARD (Explodes forward & left)
    // -------------------------------------------------------------------------
    const mbGroup = new THREE.Group();
    mbGroup.userData = { category: 'motherboards' };

    // ATX PCB Board
    const mbPcbGeo = new THREE.BoxGeometry(0.04, 1.5, 1.4);
    const { mesh: mbPcb } = createCadMesh(mbPcbGeo, 'motherboards', 0x0f111a);
    mbGroup.add(mbPcb);

    // VRM Heatsinks with Cooling Fins
    const vrm1Geo = new THREE.BoxGeometry(0.12, 0.35, 0.5);
    const { mesh: vrm1 } = createCadMesh(vrm1Geo, 'motherboards', 0x2a2e42);
    vrm1.position.set(-0.06, 0.48, -0.2);
    mbGroup.add(vrm1);

    const vrm2Geo = new THREE.BoxGeometry(0.12, 0.4, 0.3);
    const { mesh: vrm2 } = createCadMesh(vrm2Geo, 'motherboards', 0x2a2e42);
    vrm2.position.set(-0.06, 0.25, -0.48);
    mbGroup.add(vrm2);

    // PCIe 5.0 x16 Slots
    const pcieGeo = new THREE.BoxGeometry(0.06, 0.05, 0.9);
    for (let s = 0; s < 3; s++) {
      const { mesh: pcie } = createCadMesh(pcieGeo, 'motherboards', 0x334155);
      pcie.position.set(-0.04, -0.2 - s * 0.25, 0.1);
      mbGroup.add(pcie);
    }

    // M.2 Armor Shield
    const m2Geo = new THREE.BoxGeometry(0.08, 0.1, 0.55);
    const { mesh: m2 } = createCadMesh(m2Geo, 'storages', 0x1f2333);
    m2.position.set(-0.05, -0.1, 0.15);
    mbGroup.add(m2);

    partGroups.motherboards = {
      group: mbGroup,
      assembledPos: new THREE.Vector3(1.6, 1.25, 0),
      explodedPos: new THREE.Vector3(0.5, 1.25, 0.4) // Shifted out to the front-left!
    };
    scene.add(mbGroup);

    // -------------------------------------------------------------------------
    // D. CPU & AIO PUMP HEAD (Explodes out from motherboard socket)
    // -------------------------------------------------------------------------
    const cpuGroup = new THREE.Group();
    cpuGroup.userData = { category: 'processors' };

    // CPU Socket AM5 Latch Plate
    const socketGeo = new THREE.BoxGeometry(0.04, 0.4, 0.4);
    const { mesh: socketMesh } = createCadMesh(socketGeo, 'processors', 0x475569);
    cpuGroup.add(socketMesh);

    // Cylindrical Liquid Cooler Pump Block with Mounting Wings (Matches reference!)
    const pumpHeadGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.16, 32);
    const { mesh: pumpHead } = createCadMesh(pumpHeadGeo, 'processors', 0x181a28);
    pumpHead.position.set(-0.14, 0, 0);
    pumpHead.rotation.z = Math.PI / 2;
    cpuGroup.add(pumpHead);

    // Glowing Infinity Mirror Ring
    const pumpRingGeo = new THREE.TorusGeometry(0.18, 0.025, 16, 32);
    const pumpRingMat = new THREE.MeshStandardMaterial({
      color: 0xe50914,
      emissive: 0xe50914,
      emissiveIntensity: 1.5
    });
    const pumpRing = new THREE.Mesh(pumpRingGeo, pumpRingMat);
    pumpRing.position.set(-0.23, 0, 0);
    pumpRing.rotation.y = Math.PI / 2;
    cpuGroup.add(pumpRing);

    // Braided Liquid Coolant Tubes
    const tubeCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.18, 0.05, 0),
      new THREE.Vector3(-0.3, 0.35, 0.1),
      new THREE.Vector3(-0.1, 0.8, 0.2),
      new THREE.Vector3(0.2, 1.2, 0.1)
    ]);
    const tubeGeo = new THREE.TubeGeometry(tubeCurve, 20, 0.035, 12, false);
    const tubeMesh = new THREE.Mesh(tubeGeo, new THREE.MeshStandardMaterial({ color: 0x1a1c26, roughness: 0.8 }));
    cpuGroup.add(tubeMesh);

    partGroups.processors = {
      group: cpuGroup,
      assembledPos: new THREE.Vector3(1.5, 1.55, -0.2),
      explodedPos: new THREE.Vector3(-0.4, 1.55, 0.8) // Floats far in front of socket!
    };
    scene.add(cpuGroup);

    // -------------------------------------------------------------------------
    // E. 4X DDR5 RAM STICKS (Floating in row like reference image!)
    // -------------------------------------------------------------------------
    const ramGroup = new THREE.Group();
    ramGroup.userData = { category: 'rams' };

    for (let r = 0; r < 4; r++) {
      const ramStickGeo = new THREE.BoxGeometry(0.04, 0.55, 0.06);
      const { mesh: ramStick } = createCadMesh(ramStickGeo, 'rams', 0x1c1e2c);
      ramStick.position.set(0, 0, r * 0.14 - 0.21);
      ramGroup.add(ramStick);

      // Glowing RGB top strip
      const ramStripGeo = new THREE.BoxGeometry(0.045, 0.08, 0.055);
      const ramStripMat = new THREE.MeshStandardMaterial({
        color: r % 2 === 0 ? 0x00e5ff : 0xe50914,
        emissive: r % 2 === 0 ? 0x00e5ff : 0xe50914,
        emissiveIntensity: 1.2
      });
      const ramStrip = new THREE.Mesh(ramStripGeo, ramStripMat);
      ramStrip.position.set(0, 0.24, r * 0.14 - 0.21);
      ramGroup.add(ramStrip);
    }

    partGroups.rams = {
      group: ramGroup,
      assembledPos: new THREE.Vector3(1.5, 1.55, 0.25),
      explodedPos: new THREE.Vector3(0.8, 1.55, 1.0) // Floating in mid-air!
    };
    scene.add(ramGroup);

    // -------------------------------------------------------------------------
    // F. GRAPHICS CARD (GPU) - Massive Triple Fan GPU in Foreground!
    // -------------------------------------------------------------------------
    const gpuGroup = new THREE.Group();
    gpuGroup.userData = { category: 'graphicsCards' };

    // Heavy GPU Outer Shroud with Radiator Fins
    const gpuShroudGeo = new THREE.BoxGeometry(1.6, 0.65, 0.35);
    const { mesh: gpuShroud } = createCadMesh(gpuShroudGeo, 'graphicsCards', 0x141622);
    gpuGroup.add(gpuShroud);

    // Triple Front Fans
    for (let f = -1; f <= 1; f++) {
      const fanGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.04, 24);
      const { mesh: fanMesh } = createCadMesh(fanGeo, 'graphicsCards', 0x222638);
      fanMesh.position.set(f * 0.5, 0, 0.18);
      fanMesh.rotation.x = Math.PI / 2;
      gpuGroup.add(fanMesh);

      // GPU Fan Blades
      const gpuBlades = new THREE.Group();
      for (let b = 0; b < 9; b++) {
        const bladeGeo = new THREE.BoxGeometry(0.035, 0.2, 0.015);
        const blade = new THREE.Mesh(bladeGeo, new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.8 }));
        blade.position.set(0, 0.1, 0);
        blade.rotation.z = (b * Math.PI * 2) / 9;
        gpuBlades.add(blade);
      }
      gpuBlades.position.set(f * 0.5, 0, 0.18);
      gpuBlades.rotation.x = Math.PI / 2;
      gpuGroup.add(gpuBlades);
      rotatingFans.push(gpuBlades);
    }

    // Brushed Metal Backplate
    const backplateGeo = new THREE.BoxGeometry(1.58, 0.63, 0.03);
    const { mesh: backplate } = createCadMesh(backplateGeo, 'graphicsCards', 0x334155);
    backplate.position.set(0, 0, -0.18);
    gpuGroup.add(backplate);

    // Glowing GEFORCE RTX Side Bar
    const rtxBarGeo = new THREE.BoxGeometry(0.7, 0.1, 0.04);
    const rtxBarMat = new THREE.MeshStandardMaterial({
      color: 0x00e5ff,
      emissive: 0x00e5ff,
      emissiveIntensity: 1.5
    });
    const rtxBar = new THREE.Mesh(rtxBarGeo, rtxBarMat);
    rtxBar.position.set(0.2, 0.28, 0);
    gpuGroup.add(rtxBar);

    partGroups.graphicsCards = {
      group: gpuGroup,
      assembledPos: new THREE.Vector3(1.1, 0.9, 0.1),
      explodedPos: new THREE.Vector3(-0.8, 0.9, 1.6) // Pulled all the way to foreground left!
    };
    scene.add(gpuGroup);

    // -------------------------------------------------------------------------
    // G. POWER SUPPLY UNIT (PSU) with Modular Pin Grid
    // -------------------------------------------------------------------------
    const psuGroup = new THREE.Group();
    psuGroup.userData = { category: 'powerSupplies' };

    // ATX PSU Block
    const psuBlockGeo = new THREE.BoxGeometry(0.85, 0.6, 0.95);
    const { mesh: psuBlock } = createCadMesh(psuBlockGeo, 'powerSupplies', 0x13151f);
    psuGroup.add(psuBlock);

    // Modular Connector Grid Face (Front of PSU)
    const connectorFaceGeo = new THREE.PlaneGeometry(0.75, 0.5);
    const { mesh: connFace } = createCadMesh(connectorFaceGeo, 'powerSupplies', 0x222638);
    connFace.position.set(0, 0, 0.48);
    psuGroup.add(connFace);

    // Individual Modular Socket Plugs
    for (let row = -1; row <= 1; row++) {
      for (let col = -2; col <= 2; col++) {
        const plugGeo = new THREE.BoxGeometry(0.1, 0.08, 0.04);
        const plug = new THREE.Mesh(plugGeo, new THREE.MeshStandardMaterial({ color: 0x000000 }));
        plug.position.set(col * 0.14, row * 0.12, 0.49);
        psuGroup.add(plug);
      }
    }

    partGroups.powerSupplies = {
      group: psuGroup,
      assembledPos: new THREE.Vector3(1.2, 0.35, 0),
      explodedPos: new THREE.Vector3(0.5, 0.3, 1.8) // Sitting pulled forward at the bottom!
    };
    scene.add(psuGroup);

    // -------------------------------------------------------------------------
    // H. TEMPERED GLASS PANELS (Exploded to the side like reference image!)
    // -------------------------------------------------------------------------
    const glassGroup = new THREE.Group();
    glassGroup.userData = { category: 'cabinets' };

    // Side Panoramic Glass Panel
    const glassPanelGeo = new THREE.BoxGeometry(0.04, 2.3, 1.7);
    const glassPanelMat = new THREE.MeshPhysicalMaterial({
      color: 0x1a1c2e,
      transmission: 0.9,
      opacity: 0.4,
      transparent: true,
      roughness: 0.05,
      metalness: 0.1
    });
    const glassPanel = new THREE.Mesh(glassPanelGeo, glassPanelMat);
    glassGroup.add(glassPanel);

    // Glass Mounting Screws (4 corners)
    for (const [y, z] of [[-1.05, -0.75], [1.05, -0.75], [-1.05, 0.75], [1.05, 0.75]]) {
      const screwGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.06, 16);
      const screw = new THREE.Mesh(screwGeo, brushedSilverMat);
      screw.position.set(0, y, z);
      screw.rotation.z = Math.PI / 2;
      glassGroup.add(screw);
    }

    partGroups.glass = {
      group: glassGroup,
      assembledPos: new THREE.Vector3(0.38, 1.2, 0),
      explodedPos: new THREE.Vector3(2.6, 1.2, 0.6) // Floating far right like in reference!
    };
    scene.add(glassGroup);

    // -------------------------------------------------------------------------
    // I. GAMING MONITOR (SCREEN) - Integrated next to the exploded workbench
    // -------------------------------------------------------------------------
    const monitorGroup = new THREE.Group();
    monitorGroup.userData = { category: 'monitors' };
    monitorGroup.position.set(-2.8, 0, 0);

    // Stand
    const standBaseGeo = new THREE.BoxGeometry(0.9, 0.04, 0.7);
    const { mesh: standBase } = createCadMesh(standBaseGeo, 'monitors', 0x334155);
    standBase.position.set(0, 0.02, 0);
    monitorGroup.add(standBase);

    const standArmGeo = new THREE.BoxGeometry(0.14, 1.5, 0.14);
    const { mesh: standArm } = createCadMesh(standArmGeo, 'monitors', 0x334155);
    standArm.position.set(0, 0.75, -0.15);
    monitorGroup.add(standArm);

    // Monitor Bezel Frame
    const screenFrameGeo = new THREE.BoxGeometry(2.8, 1.65, 0.08);
    const { mesh: screenFrame } = createCadMesh(screenFrameGeo, 'monitors', 0x141620);
    screenFrame.position.set(0, 1.5, 0);
    monitorGroup.add(screenFrame);

    // Display Surface
    const screenDisplayGeo = new THREE.PlaneGeometry(2.7, 1.55);
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
      emissiveIntensity: 0.8
    });
    const screenDisplay = new THREE.Mesh(screenDisplayGeo, screenMat);
    screenDisplay.position.set(0, 1.5, 0.045);
    screenDisplay.userData = { category: 'monitors' };
    monitorGroup.add(screenDisplay);
    clickables.push(screenDisplay);

    partGroups.monitors = {
      group: monitorGroup,
      assembledPos: new THREE.Vector3(-2.8, 0, 0),
      explodedPos: new THREE.Vector3(-2.8, 0, 0)
    };
    scene.add(monitorGroup);

    // =========================================================================
    // 4. RAYCASTING & CLICK SELECTION
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
      const h = container.clientHeight || 580;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // =========================================================================
    // 5. ANIMATION & EXPLOSION INTERPOLATION LOOP
    // =========================================================================
    let animId;
    const tempVec = new THREE.Vector3();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Rotate fans
      for (const fan of rotatingFans) {
        fan.rotation.z += 0.06;
      }

      // Smoothly interpolate component positions based on explodeFactor
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

      // Highlight active & hovered wireframes with vivid Games World Red
      const currentActive = activeTabRef.current;
      for (const wf of wireframes) {
        const cat = wf.userData?.category;
        if (cat === currentActive || (hoveredCategory && cat === hoveredCategory)) {
          wf.material.color.setHex(0xe50914); // Glowing red wireframe
          wf.material.opacity = 1.0;
        } else {
          wf.material.color.setHex(wf.userData.defaultColor || 0x94a3b8);
          wf.material.opacity = 0.65;
        }
      }

      controls.update();

      // Project 3D positions to 2D screen coordinates for badges
      const newBadges = {};
      const rect = container.getBoundingClientRect();

      for (const [key, partData] of Object.entries(partGroups)) {
        if (partData.group && key !== 'glass') {
          partData.group.getWorldPosition(tempVec);
          tempVec.y += 0.4;
          tempVec.project(camera);

          if (tempVec.z < 1) {
            const x = ((tempVec.x + 1) * rect.width) / 2;
            const y = ((-tempVec.y + 1) * rect.height) / 2;
            newBadges[key] = { x, y };
          }
        }
      }
      setBadges2D(newBadges);

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

  // Hotspot labels metadata
  const hotspotLabels = [
    { id: 'monitors', label: 'Screen / Monitor', icon: Monitor, tag: 'DISPLAY SCREEN' },
    { id: 'processors', label: 'CPU (Processor)', icon: Cpu, tag: 'CPU SOCKET' },
    { id: 'coolers', label: 'Cooling Fans & AIO', icon: Fan, tag: 'RADIATOR & FANS' },
    { id: 'graphicsCards', label: 'Graphics Card (GPU)', icon: Layers, tag: 'PCIE GPU' },
    { id: 'rams', label: 'Memory (RAM)', icon: Box, tag: 'DDR5 MEMORY' },
    { id: 'motherboards', label: 'Motherboard', icon: CircuitBoard, tag: 'PCB MAIN' },
    { id: 'powerSupplies', label: 'Power Supply', icon: Zap, tag: '80+ GOLD PSU' },
    { id: 'cabinets', label: 'PC Cabinet', icon: Box, tag: 'CHASSIS FRAME' }
  ];

  const handleResetCamera = () => {
    playClickSound();
    if (cameraRef.current && controlsRef.current) {
      cameraRef.current.position.set(-2.2, 3.2, 7.5);
      controlsRef.current.target.set(0.2, 1.2, 0);
      controlsRef.current.update();
    }
  };

  return (
    <div className="mb-10 rounded-2xl bg-gradient-to-b from-[#0a0c14] via-[#07080d] to-[#040508] border border-red-900/50 shadow-2xl overflow-hidden relative">
      
      {/* CAD Studio Header Bar */}
      <div className="px-5 py-4 border-b border-gw-border flex flex-wrap items-center justify-between gap-4 bg-black/80 backdrop-blur-md relative z-20">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-red-500 animate-ping"></div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-display tracking-wider text-white">
                EXPLODED 3D CAD SCHEMATIC WORKBENCH
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-tech font-bold uppercase bg-red-950 text-red-400 border border-red-800">
                REAL 3D EXPLODED VIEW
              </span>
            </div>
            <p className="text-[11px] text-gray-400 font-sans">
              Drag to orbit 360° • Click the <span className="text-red-400 font-bold">Screen</span> for monitors, <span className="text-red-400 font-bold">Fans</span> for cooling, or <span className="text-red-400 font-bold">CPU/GPU</span> to swap parts.
            </p>
          </div>
        </div>

        {/* Studio Controls: Explode Slider & View Reset */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Explode / Assemble Slider */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/60 border border-gw-border text-xs font-tech">
            <span className="text-gray-400 uppercase text-[10px] font-bold">ASSEMBLY VIEW:</span>
            <input 
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={explodeFactor}
              onChange={(e) => setExplodeFactor(parseFloat(e.target.value))}
              className="w-24 accent-red-600 cursor-pointer"
            />
            <span className="text-red-400 font-mono font-bold w-12 text-right">
              {explodeFactor > 0.5 ? 'EXPLODED' : 'MOUNTED'}
            </span>
          </div>

          <button
            onClick={handleResetCamera}
            className="p-2 rounded-xl bg-black/60 hover:bg-black border border-gw-border text-gray-300 hover:text-white transition-colors"
            title="Reset 3D Camera"
          >
            <RotateCcw className="w-4 h-4 text-red-500" />
          </button>
        </div>
      </div>

      {/* 3D WebGL Canvas Container */}
      <div 
        ref={containerRef}
        className="relative w-full h-[500px] sm:h-[600px] select-none overflow-hidden cursor-grab active:cursor-grabbing bg-black"
      >
        <canvas ref={canvasRef} className="w-full h-full block" />

        {/* 3D Projected Floating Hotspot Badges */}
        {hotspotLabels.map((item) => {
          const pos = badges2D[item.id];
          if (!pos) return null;
          const isSelected = activeTab === item.id;
          const isHovered = hoveredCategory === item.id;
          const Icon = item.icon;
          const part = selectedParts[item.id];

          return (
            <button
              key={item.id}
              onClick={(e) => {
                e.stopPropagation();
                playMountSound();
                onSelectCategory(item.id);
              }}
              style={{
                transform: `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`
              }}
              className={`absolute top-0 left-0 transition-transform duration-100 pointer-events-auto z-10 group ${
                isSelected ? 'scale-110 z-20' : 'hover:scale-105'
              }`}
            >
              <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-tech font-bold uppercase transition-all shadow-2xl border ${
                isSelected 
                  ? 'bg-red-600 text-white border-white shadow-lg shadow-red-600/50' 
                  : isHovered
                    ? 'bg-red-950 text-white border-red-500 scale-105'
                    : 'bg-black/90 text-gray-200 border-red-700/60 hover:border-red-400'
              }`}>
                <Icon className="w-3 h-3 text-white" />
                <span className="hidden sm:inline">{item.label.split(' ')[0]}</span>
                {part && (
                  <Check className="w-2.5 h-2.5 text-emerald-400" />
                )}
              </div>

              {/* Tooltip on Active or Hover */}
              <div className={`absolute left-1/2 -translate-x-1/2 mt-1.5 pointer-events-none transition-all duration-200 ${
                isSelected || isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
              }`}>
                <div className="px-2.5 py-1.5 rounded-lg bg-black/95 border border-red-600 text-left whitespace-nowrap shadow-2xl">
                  <div className="text-[9px] font-tech text-red-400 font-bold uppercase">
                    {item.tag}
                  </div>
                  <div className="text-xs font-bold text-white max-w-[190px] truncate">
                    {part?.name || 'Click to Select'}
                  </div>
                  {part?.price !== undefined && (
                    <div className="text-[10px] font-tech text-emerald-400 font-bold">
                      {part.price > 0 ? `₹${part.price.toLocaleString('en-IN')}` : 'Included'}
                    </div>
                  )}
                </div>
              </div>
            </button>
          );
        })}

        {/* Subtle Ambient vignette */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#040508] to-transparent pointer-events-none"></div>
      </div>

      {/* Active Component Focus & Quick Hotspot Navigation */}
      <div className="px-5 py-3.5 bg-[#06070c] border-t border-gw-border flex flex-col md:flex-row items-center justify-between gap-3 relative z-20">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-red-600/20 border border-red-600/60 flex items-center justify-center text-red-500 shrink-0">
            {hotspotLabels.find(h => h.id === activeTab)?.icon && (
              React.createElement(hotspotLabels.find(h => h.id === activeTab).icon, { className: 'w-4 h-4' })
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-tech uppercase tracking-wider text-red-400 font-bold">
                CURRENTLY INSPECTING
              </span>
              <span className="text-xs px-2 py-0.2 rounded bg-red-950/60 text-gray-300 font-tech">
                {hotspotLabels.find(h => h.id === activeTab)?.tag}
              </span>
            </div>
            <div className="text-sm font-display tracking-wider text-white">
              {hotspotLabels.find(h => h.id === activeTab)?.label}: <span className="text-red-400 font-sans font-bold text-xs">{selectedParts[activeTab]?.name || 'Choose from catalog below'}</span>
            </div>
          </div>
        </div>

        {/* Quick Jump Hotspot Pills */}
        <div className="flex overflow-x-auto max-w-full pb-1 scrollbar-none gap-1.5 items-center">
          <span className="text-[10px] font-tech uppercase text-gray-500 shrink-0 mr-1">Hotspots:</span>
          {hotspotLabels.map((h) => {
            const isSelected = activeTab === h.id;
            return (
              <button
                key={h.id}
                onClick={() => {
                  playMountSound();
                  onSelectCategory(h.id);
                }}
                className={`px-2.5 py-1 rounded-md text-[10px] font-tech font-bold uppercase whitespace-nowrap transition-all border ${
                  isSelected 
                    ? 'bg-red-600 text-white border-red-500' 
                    : 'bg-black/60 text-gray-400 border-gw-border hover:border-gray-500 hover:text-white'
                }`}
              >
                {h.label.split(' ')[0]}
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}
