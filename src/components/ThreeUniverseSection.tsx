import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { UNIVERSES, UniverseSystem, EventItem } from '../data/multiverseData';
import {
  createSoftStarTexture,
  createDistantGalaxyTexture,
  createGalaxy3DSystem,
} from './galaxyGenerators';
import { sound } from '../audio/soundSystem';
import {
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Calendar,
  MapPin,
  Trophy,
  Users,
  ExternalLink,
  Info,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Compass,
  X,
  LogOut,
} from 'lucide-react';

interface ThreeUniverseSectionProps {
  onOpenRegister?: (universe: UniverseSystem, event: EventItem) => void;
  onOpenEventDetail?: (universe: UniverseSystem, event: EventItem) => void;
  onClosePortal?: () => void;
}

export const ThreeUniverseSection: React.FC<ThreeUniverseSectionProps> = ({
  onOpenRegister,
  onOpenEventDetail,
  onClosePortal,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedUniverse, setSelectedUniverse] = useState<UniverseSystem | null>(null);
  const [hoveredUniverse, setHoveredUniverse] = useState<UniverseSystem | null>(null);
  const [hoverScreenPos, setHoverScreenPos] = useState<{ x: number; y: number } | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [eventCategoryFilter, setEventCategoryFilter] = useState<string>('All');
  const [dockCollapsed, setDockCollapsed] = useState(false);
  const [isWarping, setIsWarping] = useState<boolean>(false);

  // Central Nexus coordinate reference from BitCA reference repository
  const NEXUS_CAM_POS = useRef(new THREE.Vector3(0, 18, 55));
  const NEXUS_LOOK_AT = useRef(new THREE.Vector3(0, 0, 0));

  // Mutable state for the 60fps render loop
  const stateRef = useRef<{
    selectedUniverse: UniverseSystem | null;
    isWarping: boolean;
    transitionProgress: number; // 0 to 1
    flightCurve: THREE.CatmullRomCurve3 | null;
    targetLookAt: THREE.Vector3;
    currentLookAt: THREE.Vector3;
    orbitAngle: number;
    // Interactive mouse drag
    isDragging: boolean;
    previousMousePosition: { x: number; y: number };
    userRotX: number;
    userRotY: number;
    mouseNDC: THREE.Vector2;
  }>({
    selectedUniverse: null,
    isWarping: false,
    transitionProgress: 1.0,
    flightCurve: null,
    targetLookAt: new THREE.Vector3(0, 0, 0),
    currentLookAt: new THREE.Vector3(0, 0, 0),
    orbitAngle: 0,
    isDragging: false,
    previousMousePosition: { x: 0, y: 0 },
    userRotX: 0,
    userRotY: 0,
    mouseNDC: new THREE.Vector2(-999, -999),
  });

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const galaxiesMapRef = useRef<Map<string, { group: THREE.Group; spec: UniverseSystem }>>(new Map());

  // Instanced Warp Streaks from GitHub reference repository
  const streakMeshRef = useRef<THREE.InstancedMesh | null>(null);
  const streakCount = 450;
  const streakDataRef = useRef<
    Array<{ x: number; y: number; z: number; speed: number; baseLength: number; colorType: number }>
  >([]);

  // Pre-generate streak data
  useEffect(() => {
    const list = [];
    for (let i = 0; i < streakCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 5 + Math.random() * 55;
      const z = (Math.random() - 0.5) * 160;
      const speed = 25 + Math.random() * 45;
      list.push({
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        z,
        speed,
        baseLength: 0.6 + Math.random() * 1.5,
        colorType: i % 4,
      });
    }
    streakDataRef.current = list;
  }, [streakCount]);

  // Sync selected universe
  useEffect(() => {
    stateRef.current.selectedUniverse = selectedUniverse;
  }, [selectedUniverse]);

  // Handle keyboard shortcuts (Escape returns to deep space overview or exits portal)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedUniverse) {
          handleReturnToNexus();
        } else if (onClosePortal) {
          onClosePortal();
        }
      } else if (e.key === 'm' || e.key === 'M') {
        handleToggleAudio();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedUniverse, onClosePortal]);

  // =========================================================================
  // TRAVEL PHYSICS ANIMATION (From GitHub reference: smeetguliana-cloud/BitCA)
  // 3D Catmull-Rom spline trajectory arc with dynamic midpoint elevation,
  // cubic ease-in-out interpolation, and relativistic FOV dive (60 -> 118 -> 55 deg)
  // =========================================================================
  const initiateFlight = useCallback((endPos: THREE.Vector3, endLookAt: THREE.Vector3) => {
    const cam = cameraRef.current;
    if (!cam) return;

    sound.playWarp();
    setIsWarping(true);
    stateRef.current.isWarping = true;
    stateRef.current.transitionProgress = 0;
    stateRef.current.targetLookAt.copy(endLookAt);

    const startPos = cam.position.clone();

    // 1. Calculate a graceful 3D CatmullRom trajectory arc between start and end
    const midPoint = startPos.clone().lerp(endPos, 0.5);
    const dist = startPos.distanceTo(endPos);
    midPoint.y += Math.min(12, dist * 0.25);
    midPoint.x += (Math.random() - 0.5) * 4;

    const flightCurve = new THREE.CatmullRomCurve3([startPos, midPoint, endPos]);
    stateRef.current.flightCurve = flightCurve;

    // Reset user view adjustment offsets for clean arrival
    stateRef.current.userRotX = 0;
    stateRef.current.userRotY = 0;

    // Flight duration: 1.8 seconds (matching GitHub repo's GSAP duration)
    const flightDurationMs = 1800;
    const startTime = performance.now();

    const updateFlight = () => {
      const now = performance.now();
      const elapsed = (now - startTime) / flightDurationMs;
      const t = Math.min(1.0, elapsed);

      // power3.inOut cubic ease
      const easeT = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      // Position along Catmull-Rom 3D curve
      const pointOnCurve = flightCurve.getPoint(easeT);
      cam.position.copy(pointOnCurve);

      // Interpolate lookAt target smoothly
      stateRef.current.currentLookAt.lerp(endLookAt, 0.12);
      cam.lookAt(stateRef.current.currentLookAt);

      // Relativistic FOV dive spike: 60 -> 118 at t=0.5 -> 55 on arrival!
      const fovSpike = Math.sin(t * Math.PI);
      cam.fov = 60 + fovSpike * 58 - t * 5;
      cam.updateProjectionMatrix();

      stateRef.current.transitionProgress = t;

      if (t < 1.0) {
        requestAnimationFrame(updateFlight);
      } else {
        cam.position.copy(endPos);
        stateRef.current.currentLookAt.copy(endLookAt);
        cam.lookAt(endLookAt);
        cam.fov = 55;
        cam.updateProjectionMatrix();
        stateRef.current.isWarping = false;
        setIsWarping(false);
      }
    };

    requestAnimationFrame(updateFlight);
  }, []);

  // Return to Nexus central vantage
  const handleReturnToNexus = useCallback(() => {
    sound.playReturn();
    setSelectedUniverse(null);
    stateRef.current.selectedUniverse = null;

    initiateFlight(NEXUS_CAM_POS.current, NEXUS_LOOK_AT.current);
  }, [initiateFlight]);

  // Travel to a specific universe destination
  const handleTravelToUniverse = useCallback(
    (targetUni: UniverseSystem) => {
      setSelectedUniverse(targetUni);
      stateRef.current.selectedUniverse = targetUni;

      const [px, py, pz] = targetUni.position;
      const endLookAt = new THREE.Vector3(px, py, pz);

      // Position camera offset slightly so galaxy/phenomenon sits majestically in view
      const radius = targetUni.galaxyRadius || 18;
      const endPos = new THREE.Vector3(
        px - radius * 1.8,
        py + radius * 0.7,
        pz + radius * 2.6
      );

      initiateFlight(endPos, endLookAt);
    },
    [initiateFlight]
  );

  const handleToggleAudio = () => {
    const active = sound.toggleMute();
    setIsMuted(!active);
  };

  const handleToggleFullscreen = () => {
    if (!mountRef.current?.parentElement) return;
    const container = mountRef.current.parentElement;
    if (!document.fullscreenElement) {
      container.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Main Three.js Scene Setup & Render Loop
  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // 1. Deep Space Scene & Camera (Zero Grid)
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x02040b); // Deep astronomical black
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 2400);
    camera.position.copy(NEXUS_CAM_POS.current);
    camera.lookAt(NEXUS_LOOK_AT.current);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: false,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Cinematic Studio Lighting Rig (as in GitHub repository)
    const ambientLight = new THREE.AmbientLight(0x0a1428, 0.65);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0x38bdf8, 0x020617, 0.6);
    scene.add(hemiLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight1.position.set(30, 45, 30);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xa855f7, 0.4);
    dirLight2.position.set(-30, -20, -30);
    scene.add(dirLight2);

    // 2. Cosmic Starfield (Deep Astronomical Distribution)
    const softStarTexture = createSoftStarTexture();
    const starCount = 5200;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const palette = [
      new THREE.Color('#ffffff'),
      new THREE.Color('#38bdf8'),
      new THREE.Color('#c084fc'),
      new THREE.Color('#4ade80'),
      new THREE.Color('#fcd34d'),
    ];

    for (let i = 0; i < starCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 160 + Math.random() * 750;

      starPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = r * Math.cos(phi);

      const col = palette[Math.floor(Math.random() * palette.length)];
      const lum = 0.5 + Math.random() * 0.5;
      starColors[i * 3] = col.r * lum;
      starColors[i * 3 + 1] = col.g * lum;
      starColors[i * 3 + 2] = col.b * lum;
    }

    const starfieldGeo = new THREE.BufferGeometry();
    starfieldGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starfieldGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starfieldMat = new THREE.PointsMaterial({
      size: 1.3,
      map: softStarTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const starfield = new THREE.Points(starfieldGeo, starfieldMat);
    scene.add(starfield);

    // 3. Distant Background Galaxies (Hubble Ultra-Deep Field Style)
    const distantGalaxiesGroup = new THREE.Group();
    scene.add(distantGalaxiesGroup);

    const galaxyTextures = [
      createDistantGalaxyTexture(0),
      createDistantGalaxyTexture(1),
      createDistantGalaxyTexture(2),
      createDistantGalaxyTexture(3),
    ];

    for (let g = 0; g < 48; g++) {
      const gTex = galaxyTextures[g % galaxyTextures.length];
      const gMat = new THREE.SpriteMaterial({
        map: gTex,
        transparent: true,
        opacity: 0.35 + Math.random() * 0.35,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const sprite = new THREE.Sprite(gMat);

      const dist = 450 + Math.random() * 500;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      sprite.position.set(
        dist * Math.sin(phi) * Math.cos(theta),
        dist * Math.sin(phi) * Math.sin(theta),
        dist * Math.cos(phi)
      );

      const gScale = 14 + Math.random() * 26;
      sprite.scale.set(gScale, gScale, 1);
      distantGalaxiesGroup.add(sprite);
    }

    // 4. Instanced Hyperspace Streaks Mesh (From GitHub WarpEffect.tsx)
    const streakCylinderGeo = new THREE.CylinderGeometry(0.08, 0.08, 1, 6);
    const streakMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const streakMesh = new THREE.InstancedMesh(streakCylinderGeo, streakMat, streakCount);
    streakMesh.frustumCulled = false;

    const streakColorPalette = [
      new THREE.Color('#00f3ff'),
      new THREE.Color('#ec4899'),
      new THREE.Color('#ffffff'),
      new THREE.Color('#a855f7'),
    ];

    for (let i = 0; i < streakCount; i++) {
      streakMesh.setColorAt(i, streakColorPalette[i % 4]);
    }
    if (streakMesh.instanceColor) {
      streakMesh.instanceColor.needsUpdate = true;
    }

    scene.add(streakMesh);
    streakMeshRef.current = streakMesh;

    // 5. The Seven Universe Galactic Formations
    const galaxiesMap = new Map<string, { group: THREE.Group; spec: UniverseSystem }>();

    UNIVERSES.forEach((univ) => {
      const galaxyGroup = createGalaxy3DSystem(univ, softStarTexture);
      scene.add(galaxyGroup);
      galaxiesMap.set(univ.id, { group: galaxyGroup, spec: univ });
    });

    galaxiesMapRef.current = galaxiesMap;

    // 6. Raycasting & Interaction Handlers
    const raycaster = new THREE.Raycaster();
    raycaster.params.Points = { threshold: 4.5 };
    const mouseNDC = new THREE.Vector2(-999, -999);

    const updatePointer = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((clientY - rect.top) / rect.height) * 2 + 1;
      mouseNDC.set(x, y);
      stateRef.current.mouseNDC.set(x, y);
      return { x: clientX - rect.left, y: clientY - rect.top };
    };

    const handlePointerDown = (clientX: number, clientY: number) => {
      stateRef.current.isDragging = true;
      stateRef.current.previousMousePosition = { x: clientX, y: clientY };
    };

    const handlePointerMove = (clientX: number, clientY: number) => {
      const screenPos = updatePointer(clientX, clientY);

      if (stateRef.current.isDragging && !stateRef.current.isWarping) {
        const deltaX = clientX - stateRef.current.previousMousePosition.x;
        const deltaY = clientY - stateRef.current.previousMousePosition.y;

        stateRef.current.userRotX += deltaX * 0.005;
        stateRef.current.userRotY = Math.max(
          -Math.PI / 2.3,
          Math.min(Math.PI / 2.3, stateRef.current.userRotY + deltaY * 0.005)
        );

        stateRef.current.previousMousePosition = { x: clientX, y: clientY };
      }

      // Check hover over universes
      raycaster.setFromCamera(mouseNDC, camera);
      let found: UniverseSystem | null = null;

      for (const [, { group, spec }] of galaxiesMap.entries()) {
        const dist = raycaster.ray.distanceToPoint(group.position);
        if (dist < spec.galaxyRadius * 0.85) {
          found = spec;
          break;
        }
      }

      setHoveredUniverse(found);
      setHoverScreenPos(found ? screenPos : null);
    };

    const handlePointerUp = () => {
      stateRef.current.isDragging = false;
    };

    const onMouseDown = (e: MouseEvent) => {
      handlePointerDown(e.clientX, e.clientY);
    };

    const onMouseMove = (e: MouseEvent) => {
      handlePointerMove(e.clientX, e.clientY);
    };

    const onMouseUp = () => {
      handlePointerUp();
    };

    const onClick = (e: MouseEvent) => {
      updatePointer(e.clientX, e.clientY);
      raycaster.setFromCamera(mouseNDC, camera);

      let closest: UniverseSystem | null = null;
      let minDistance = Infinity;

      for (const [, { group, spec }] of galaxiesMap.entries()) {
        const dist = raycaster.ray.distanceToPoint(group.position);
        if (dist < spec.galaxyRadius * 0.85 && dist < minDistance) {
          minDistance = dist;
          closest = spec;
        }
      }

      if (closest) {
        handleTravelToUniverse(closest);
      }
    };

    container.addEventListener('mousedown', onMouseDown);
    container.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('click', onClick);

    // Window Resize
    const onResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // 7. Per-Frame Animation & Idle Drift Loop (Matching reference repo)
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const dummyObj = new THREE.Object3D();
    const forwardVec = new THREE.Vector3();
    const camWorldPos = new THREE.Vector3();

    const renderLoop = () => {
      animationFrameId = requestAnimationFrame(renderLoop);
      const delta = Math.min(0.1, clock.getDelta());
      const elapsed = clock.getElapsedTime();

      // Rotate cosmic starfield slowly
      starfield.rotation.y = elapsed * 0.00015;
      distantGalaxiesGroup.rotation.y = elapsed * 0.0001;

      // Rotate each universe galaxy
      galaxiesMap.forEach(({ group, spec }) => {
        group.rotation.y += delta * spec.rotationSpeed;
      });

      // Warp Streaks Animation (From WarpEffect.tsx)
      if (streakMeshRef.current && streakDataRef.current.length > 0) {
        camera.getWorldDirection(forwardVec);
        camera.getWorldPosition(camWorldPos);

        const speedMultiplier = stateRef.current.isWarping ? 4.5 : 0.4;
        const stretchMultiplier = stateRef.current.isWarping ? 18.0 : 1.2;

        (streakMeshRef.current.material as THREE.MeshBasicMaterial).opacity = stateRef.current.isWarping ? 0.9 : 0.25;

        for (let i = 0; i < streakCount; i++) {
          const item = streakDataRef.current[i];
          // Move streaks relative to camera
          item.z -= item.speed * speedMultiplier * delta;
          if (item.z < -80) {
            item.z = 80;
          }

          dummyObj.position.set(
            camWorldPos.x + item.x,
            camWorldPos.y + item.y,
            camWorldPos.z + item.z
          );

          dummyObj.quaternion.copy(camera.quaternion);

          const zScale = item.baseLength * stretchMultiplier;
          const xyScale = stateRef.current.isWarping ? 0.08 : 0.04;
          dummyObj.scale.set(xyScale, xyScale, zScale);
          dummyObj.updateMatrix();

          streakMeshRef.current.setMatrixAt(i, dummyObj.matrix);
        }

        streakMeshRef.current.instanceMatrix.needsUpdate = true;
      }

      // Idle Camera Drift & Cinematic Planet Orbit (Matching CinematicScene.tsx useFrame)
      if (!stateRef.current.isWarping) {
        if (stateRef.current.selectedUniverse) {
          // Slow idle orbit around selected universe
          stateRef.current.orbitAngle += delta * 0.12;

          const currentUni = stateRef.current.selectedUniverse;
          const [px, py, pz] = currentUni.position;
          const orbitRadius = currentUni.galaxyRadius * 3.2;

          const targetCamX =
            px +
            Math.sin(stateRef.current.orbitAngle + stateRef.current.userRotX) * orbitRadius * 0.5 -
            currentUni.galaxyRadius * 1.5;

          const targetCamZ =
            pz +
            Math.cos(stateRef.current.orbitAngle + stateRef.current.userRotX) * orbitRadius * 0.7 +
            currentUni.galaxyRadius * 2.2;

          const targetCamY =
            py +
            currentUni.galaxyRadius * 0.7 +
            Math.sin(stateRef.current.orbitAngle * 0.8) * 0.4 +
            stateRef.current.userRotY * 10;

          camera.position.x = THREE.MathUtils.damp(camera.position.x, targetCamX, 1.8, delta);
          camera.position.y = THREE.MathUtils.damp(camera.position.y, targetCamY, 1.8, delta);
          camera.position.z = THREE.MathUtils.damp(camera.position.z, targetCamZ, 1.8, delta);

          stateRef.current.currentLookAt.set(px, py, pz);
          camera.lookAt(stateRef.current.currentLookAt);
        } else {
          // Subtle cosmic breathing at Nexus Hub
          stateRef.current.orbitAngle += delta * 0.08;

          const swayX = Math.sin(stateRef.current.orbitAngle * 0.5) * 1.5 + stateRef.current.userRotX * 12;
          const swayY = 18 + Math.cos(stateRef.current.orbitAngle * 0.3) * 0.8 + stateRef.current.userRotY * 8;

          camera.position.x = THREE.MathUtils.damp(camera.position.x, swayX, 1.2, delta);
          camera.position.y = THREE.MathUtils.damp(camera.position.y, swayY, 1.2, delta);
          camera.lookAt(0, 0, 0);
        }
      }

      renderer.render(scene, camera);
    };

    renderLoop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousedown', onMouseDown);
      container.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('click', onClick);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [handleTravelToUniverse]);

  return (
    <div className="relative w-full h-[780px] md:h-[880px] bg-[#02040b] overflow-hidden select-none border-y border-white/10 shadow-[0_0_120px_rgba(0,0,0,1)_inset]">
      {/* 3D WebGL Deep Space Canvas */}
      <div ref={mountRef} className="absolute inset-0 z-0" />

      {/* Top Status & Controls Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        <div className="flex items-center gap-3 bg-[#050811]/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 pointer-events-auto shadow-xl">
          <Sparkles className="w-4 h-4 text-[#55d9f4]" />
          <div className="flex items-center gap-2">
            <span className="font-['DM_Mono'] text-xs font-bold text-white tracking-wider">
              MULTIVERSE 404
            </span>
            <span className="text-white/30 text-xs">/</span>
            <span className="font-['DM_Mono'] text-[11px] text-white/70">
              {selectedUniverse
                ? `${selectedUniverse.name.toUpperCase()} // ${selectedUniverse.astronomicalClass.toUpperCase()}`
                : 'CENTRAL NEXUS HUB // 7 UNIVERSE DESTINATIONS'}
            </span>
          </div>
        </div>

        {/* Global Action Controls */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {selectedUniverse && (
            <button
              onClick={handleReturnToNexus}
              className="px-3.5 py-2 rounded-xl bg-[#090e1f]/85 border border-white/15 hover:border-[#55d9f4] text-xs font-['DM_Mono'] text-white font-medium flex items-center gap-1.5 shadow-lg transition-all cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5 text-[#55d9f4]" />
              <span>Nexus Hub</span>
            </button>
          )}

          <button
            onClick={handleToggleAudio}
            className="p-2.5 rounded-xl bg-[#090e1f]/85 border border-white/10 hover:border-[#55d9f4] text-white/80 hover:text-[#55d9f4] transition-all cursor-pointer shadow-lg"
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            onClick={handleToggleFullscreen}
            className="p-2.5 rounded-xl bg-[#090e1f]/85 border border-white/10 hover:border-[#55d9f4] text-white/80 hover:text-[#55d9f4] transition-all cursor-pointer shadow-lg"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {onClosePortal && (
            <button
              onClick={onClosePortal}
              className="px-3.5 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-200 text-xs font-['DM_Mono'] font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              title="Exit 3D Portal and return to page"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Exit Portal</span>
            </button>
          )}
        </div>
      </div>

      {/* Floating Guidance Banner */}
      <div className="absolute top-20 left-4 z-10 pointer-events-auto">
        <div className="bg-[#050811]/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 flex items-center gap-3 shadow-xl">
          <span className="text-xs text-white/70 font-['DM_Mono']">
            Drag to pan view • Click any galaxy to initiate Catmull-Rom warp flight
          </span>
        </div>
      </div>

      {/* Destination Selection Dock at Bottom */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 max-w-[95vw] overflow-x-auto p-1.5 bg-[#050811]/85 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center gap-1.5 shadow-2xl pointer-events-auto">
        {UNIVERSES.map((univ) => (
          <button
            key={univ.id}
            onClick={() => handleTravelToUniverse(univ)}
            onMouseEnter={() => {
              setHoveredUniverse(univ);
              sound.playHover(univ.colorHex % 1000);
            }}
            onMouseLeave={() => setHoveredUniverse(null)}
            className={`px-3.5 py-2 rounded-xl text-xs font-['DM_Mono'] font-medium transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              selectedUniverse?.id === univ.id
                ? 'bg-white/20 text-white border border-[#55d9f4] shadow-[0_0_15px_rgba(85,217,244,0.3)]'
                : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: univ.colorStr, boxShadow: `0 0 8px ${univ.colorStr}` }}
            />
            <span>{univ.name}</span>
            <span className="text-[10px] text-white/40">{univ.number}</span>
          </button>
        ))}
      </div>

      {/* Hover Inspection Tooltip */}
      {hoveredUniverse && !isWarping && (
        <div
          className="absolute z-30 pointer-events-none transition-all duration-150"
          style={{
            left: hoverScreenPos ? Math.min(window.innerWidth - 320, hoverScreenPos.x + 20) : '50%',
            top: hoverScreenPos ? Math.min(window.innerHeight - 240, hoverScreenPos.y + 20) : '40%',
            transform: hoverScreenPos ? 'none' : 'translate(-50%, -50%)',
          }}
        >
          <div
            className="w-72 bg-[#050811]/90 backdrop-blur-xl p-4 rounded-2xl border shadow-2xl animate-in fade-in zoom-in-95"
            style={{ borderColor: hoveredUniverse.colorStr, boxShadow: `0 0 35px ${hoveredUniverse.glowColor}` }}
          >
            <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-2">
              <span className="text-[10px] font-['DM_Mono'] text-white/50 tracking-wider">
                {hoveredUniverse.sector}
              </span>
              <span
                className="text-[10px] font-['DM_Mono'] px-2 py-0.5 rounded font-bold"
                style={{ backgroundColor: hoveredUniverse.colorStr, color: '#050811' }}
              >
                SYNC {hoveredUniverse.stats.syncRate}
              </span>
            </div>

            <h4 className="text-lg font-bold text-white font-['Montserrat'] mb-1">
              {hoveredUniverse.name}
            </h4>
            <p className="text-[11px] text-[#55d9f4] font-['DM_Mono'] mb-1">
              {hoveredUniverse.astronomicalClass}
            </p>
            <p className="text-xs text-white/70 line-clamp-2 mb-3">
              {hoveredUniverse.shortDesc}
            </p>

            <div className="grid grid-cols-2 gap-2 text-[11px] font-['DM_Mono'] bg-white/5 p-2 rounded-lg mb-3">
              <div>
                <span className="text-white/40 block">EVENTS</span>
                <span className="text-[#55d9f4] font-semibold">
                  {hoveredUniverse.events.length} ACTIVE
                </span>
              </div>
              <div>
                <span className="text-white/40 block">COORDINATES</span>
                <span className="text-white font-semibold">
                  [{hoveredUniverse.position.join(', ')}]
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] font-['DM_Mono'] text-[#55d9f4]">
              <span>CLICK TO WARP</span>
              <span className="animate-pulse">→</span>
            </div>
          </div>
        </div>
      )}

      {/* Destination Arrival HUD: Event Explorer Dock */}
      {selectedUniverse && !isWarping && (
        <div className="absolute inset-x-4 bottom-18 z-20 pointer-events-none flex flex-col items-center">
          <div className="w-full max-w-4xl pointer-events-auto">
            {/* Collapse / Expand Toggle */}
            <div className="flex justify-center mb-2">
              <button
                onClick={() => setDockCollapsed(!dockCollapsed)}
                className="px-4 py-1 rounded-full bg-[#050811]/85 backdrop-blur-md border border-white/15 text-white/70 hover:text-white font-['DM_Mono'] text-xs flex items-center gap-1.5 shadow-lg transition-all cursor-pointer"
              >
                {dockCollapsed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                <span>{dockCollapsed ? `Expand ${selectedUniverse.name} Events` : 'Collapse Dock (Cinema Mode)'}</span>
              </button>
            </div>

            {!dockCollapsed && (
              <div className="bg-[#050811]/90 backdrop-blur-2xl p-4 md:p-5 rounded-3xl border border-white/15 shadow-[0_20px_80px_rgba(0,0,0,0.85)] max-h-[310px] md:max-h-[280px] flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-300">
                {/* Header with Universe details & category filter */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10 mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: selectedUniverse.colorStr, boxShadow: `0 0 8px ${selectedUniverse.colorStr}` }}
                      />
                      <h3 className="text-lg font-bold text-white font-['Montserrat']">
                        {selectedUniverse.name}
                      </h3>
                      <span className="text-[10px] text-white/50 font-['DM_Mono']">
                        ({selectedUniverse.astronomicalClass})
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    {['All', 'Competition', 'Challenge', 'Workshop', 'Exhibition'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setEventCategoryFilter(cat)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-['DM_Mono'] transition-all cursor-pointer ${
                          eventCategoryFilter === cat
                            ? 'bg-[#55d9f4] text-[#050811] font-bold shadow-[0_0_10px_rgba(85,217,244,0.4)]'
                            : 'text-white/60 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Event list */}
                <div className="overflow-y-auto pr-1 space-y-2.5">
                  {selectedUniverse.events
                    .filter((e) => eventCategoryFilter === 'All' || e.category === eventCategoryFilter)
                    .map((event) => (
                      <div
                        key={event.id}
                        className="p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-[#55d9f4]/50 transition-all duration-200 group flex flex-col md:flex-row items-start md:items-center justify-between gap-3"
                      >
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span
                              className="text-[9px] font-['DM_Mono'] px-2 py-0.5 rounded font-bold uppercase"
                              style={{
                                backgroundColor: `${selectedUniverse.colorStr}22`,
                                color: selectedUniverse.colorStr,
                                border: `1px solid ${selectedUniverse.colorStr}44`,
                              }}
                            >
                              {event.category}
                            </span>
                            <span className="text-[10px] font-['DM_Mono'] text-white/50">
                              {event.status}
                            </span>
                          </div>

                          <h4 className="text-sm font-bold text-white font-['Montserrat'] group-hover:text-[#55d9f4] transition-colors">
                            {event.title}
                          </h4>
                          <p className="text-xs text-white/60 mt-0.5 line-clamp-1">
                            {event.description}
                          </p>

                          <div className="flex flex-wrap items-center gap-3 text-[10px] font-['DM_Mono'] text-white/50 mt-1.5">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-[#55d9f4]" />
                              {event.schedule}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-[#55d9f4]" />
                              {event.venue}
                            </span>
                            {event.prizePool && (
                              <span className="flex items-center gap-1 text-[#ffcc00] font-semibold">
                                <Trophy className="w-3 h-3" />
                                {event.prizePool}
                              </span>
                            )}
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {event.teamSize}
                            </span>
                          </div>
                        </div>

                        {/* Event actions */}
                        <div className="flex items-center gap-2 w-full md:w-auto">
                          <button
                            onClick={() => onOpenEventDetail?.(selectedUniverse, event)}
                            className="flex-1 md:flex-initial px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-['DM_Mono'] text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                          >
                            <Info className="w-3 h-3" />
                            <span>Briefing</span>
                          </button>
                          <button
                            onClick={() => onOpenRegister?.(selectedUniverse, event)}
                            className="flex-1 md:flex-initial px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#55d9f4] to-[#8b7cff] text-[#050811] font-['DM_Mono'] text-xs font-bold transition-all shadow-[0_0_15px_rgba(85,217,244,0.3)] hover:shadow-[0_0_25px_rgba(85,217,244,0.6)] cursor-pointer flex items-center justify-center gap-1.5"
                          >
                            <span>Register</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
