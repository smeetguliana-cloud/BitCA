import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import gsap from 'gsap';
import { MULTIVERSE_DATA, UniverseData } from '../../lib/multiverseData';
import { PlanetNode } from './PlanetNode';
import { WarpEffect } from './WarpEffect';
import { soundManager } from '../../lib/audio';

interface CinematicSceneProps {
  activeUniverseId: string | null;
  isWarping: boolean;
  setIsWarping: (warping: boolean) => void;
  onSelectUniverse: (universeId: string) => void;
  onCameraUpdate?: (coords: { x: number; y: number; z: number }) => void;
}

// Internal Camera Controller managing GSAP Spline Transitions, FOV spikes, and idle orbits
const MultiverseCameraController: React.FC<{
  activeUniverseId: string | null;
  isWarping: boolean;
  setIsWarping: (warping: boolean) => void;
  onCameraUpdate?: (coords: { x: number; y: number; z: number }) => void;
}> = ({ activeUniverseId, setIsWarping, onCameraUpdate }) => {
  const { camera } = useThree();
  const perspectiveCam = camera as THREE.PerspectiveCamera;

  // Track target lookAt coordinate
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));

  // Current idle orbit phase
  const orbitAngle = useRef(0);
  const isTransitioning = useRef(false);

  // Active tween reference for clean cancellation
  const activeTweenRef = useRef<gsap.core.Tween | null>(null);

  // Nexus central vantage coordinates
  const NEXUS_CAM_POS = new THREE.Vector3(0, 18, 55);
  const NEXUS_LOOK_AT = new THREE.Vector3(0, 0, 0);

  // Initialize camera position on mount
  useEffect(() => {
    perspectiveCam.position.copy(NEXUS_CAM_POS);
    perspectiveCam.lookAt(NEXUS_LOOK_AT);
    perspectiveCam.fov = 60;
    perspectiveCam.updateProjectionMatrix();
  }, [perspectiveCam]);

  useEffect(() => {
    // 1. Kill any active camera transitions immediately
    if (activeTweenRef.current) {
      activeTweenRef.current.kill();
      activeTweenRef.current = null;
    }
    gsap.killTweensOf(perspectiveCam.position);
    gsap.killTweensOf(perspectiveCam);
    gsap.killTweensOf(currentLookAt.current);

    isTransitioning.current = true;
    setIsWarping(true);
    soundManager.playWarpJump();

    const startPos = perspectiveCam.position.clone();
    let endPos: THREE.Vector3;
    let endLookAt: THREE.Vector3;

    if (!activeUniverseId) {
      // Returning to Central Nexus Hub
      endPos = NEXUS_CAM_POS.clone();
      endLookAt = NEXUS_LOOK_AT.clone();
    } else {
      // Warping to specific Universe planet
      const targetUni = MULTIVERSE_DATA.find((u) => u.id === activeUniverseId);
      if (!targetUni) return;

      const [px, py, pz] = targetUni.position;
      endLookAt = new THREE.Vector3(px, py, pz);

      // Position camera offset slightly so planet sits majestically on the right/center
      endPos = new THREE.Vector3(
        px - targetUni.planetRadius * 2.2,
        py + targetUni.planetRadius * 0.8,
        pz + targetUni.planetRadius * 3.4
      );
    }

    // Calculate a graceful 3D CatmullRom trajectory arc between start and end
    const midPoint = startPos.clone().lerp(endPos, 0.5);
    // Arc elevation based on distance
    const dist = startPos.distanceTo(endPos);
    midPoint.y += Math.min(12, dist * 0.25);
    // Slight lateral curve arc
    midPoint.x += (Math.random() - 0.5) * 4;

    const flightCurve = new THREE.CatmullRomCurve3([startPos, midPoint, endPos]);

    const animProgress = { t: 0 };

    // GSAP 1.8s spline travel with dynamic FOV dive
    const tween = gsap.to(animProgress, {
      t: 1,
      duration: 1.8,
      ease: 'power3.inOut',
      onUpdate: () => {
        // Move along Catmull-Rom spline
        const pointOnCurve = flightCurve.getPoint(animProgress.t);
        perspectiveCam.position.copy(pointOnCurve);

        // Interpolate lookAt target smoothly
        currentLookAt.current.lerp(endLookAt, 0.12);
        perspectiveCam.lookAt(currentLookAt.current);

        // FOV dive spike: 60 -> 118 at t=0.5 -> 55 on arrival
        const fovSpike = Math.sin(animProgress.t * Math.PI);
        perspectiveCam.fov = 60 + fovSpike * 58 - animProgress.t * 5;
        perspectiveCam.updateProjectionMatrix();

        if (onCameraUpdate) {
          onCameraUpdate({
            x: Math.round(perspectiveCam.position.x * 10) / 10,
            y: Math.round(perspectiveCam.position.y * 10) / 10,
            z: Math.round(perspectiveCam.position.z * 10) / 10
          });
        }
      },
      onComplete: () => {
        perspectiveCam.position.copy(endPos);
        targetLookAt.current.copy(endLookAt);
        currentLookAt.current.copy(endLookAt);
        perspectiveCam.lookAt(endLookAt);

        perspectiveCam.fov = activeUniverseId ? 55 : 60;
        perspectiveCam.updateProjectionMatrix();

        isTransitioning.current = false;
        setIsWarping(false);
      }
    });

    activeTweenRef.current = tween;

    return () => {
      if (activeTweenRef.current) {
        activeTweenRef.current.kill();
      }
    };
  }, [activeUniverseId, setIsWarping, perspectiveCam]);

  // Per-frame idle camera drift & cinematic planet orbit
  useFrame((_, delta) => {
    if (isTransitioning.current) return;

    if (activeUniverseId) {
      // Slow idle orbit around selected planet
      const currentUni = MULTIVERSE_DATA.find((u) => u.id === activeUniverseId);
      if (currentUni) {
        orbitAngle.current += delta * 0.12;
        const [px, py, pz] = currentUni.position;
        const orbitRadius = currentUni.planetRadius * 4.0;

        const targetCamX = px + Math.sin(orbitAngle.current) * orbitRadius * 0.5 - currentUni.planetRadius * 1.5;
        const targetCamZ = pz + Math.cos(orbitAngle.current) * orbitRadius * 0.7 + currentUni.planetRadius * 2.2;
        const targetCamY = py + currentUni.planetRadius * 0.8 + Math.sin(orbitAngle.current * 0.8) * 0.4;

        perspectiveCam.position.x = THREE.MathUtils.damp(perspectiveCam.position.x, targetCamX, 1.8, delta);
        perspectiveCam.position.y = THREE.MathUtils.damp(perspectiveCam.position.y, targetCamY, 1.8, delta);
        perspectiveCam.position.z = THREE.MathUtils.damp(perspectiveCam.position.z, targetCamZ, 1.8, delta);

        currentLookAt.current.set(px, py, pz);
        perspectiveCam.lookAt(currentLookAt.current);
      }
    } else {
      // Subtle cosmic breathing at Nexus Hub
      orbitAngle.current += delta * 0.08;
      const swayX = Math.sin(orbitAngle.current * 0.5) * 1.5;
      const swayY = 18 + Math.cos(orbitAngle.current * 0.3) * 0.8;

      perspectiveCam.position.x = THREE.MathUtils.damp(perspectiveCam.position.x, swayX, 1.2, delta);
      perspectiveCam.position.y = THREE.MathUtils.damp(perspectiveCam.position.y, swayY, 1.2, delta);
      perspectiveCam.lookAt(0, 0, 0);
    }

    if (onCameraUpdate) {
      onCameraUpdate({
        x: Math.round(perspectiveCam.position.x * 10) / 10,
        y: Math.round(perspectiveCam.position.y * 10) / 10,
        z: Math.round(perspectiveCam.position.z * 10) / 10
      });
    }
  });

  return null;
};

export const CinematicScene: React.FC<CinematicSceneProps> = ({
  activeUniverseId,
  isWarping,
  setIsWarping,
  onSelectUniverse,
  onCameraUpdate
}) => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-auto">
      <Canvas
        camera={{ position: [0, 18, 55], fov: 60, near: 0.1, far: 800 }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance'
        }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#02040b']} />
        <fog attach="fog" args={['#02040b', 70, 260]} />

        {/* Cinematic Studio Lighting Rig */}
        <ambientLight intensity={0.4} />
        <hemisphereLight args={['#38bdf8', '#020617', 0.6]} />
        <directionalLight
          position={[30, 45, 30]}
          intensity={1.2}
          color="#ffffff"
        />
        <directionalLight
          position={[-30, -20, -30]}
          intensity={0.4}
          color="#a855f7"
        />

        {/* Warp Streak Tunnel & Cosmic Starfield */}
        <WarpEffect isWarping={isWarping} />

        {/* 7 Planetary Universes */}
        {MULTIVERSE_DATA.map((uni: UniverseData) => (
          <PlanetNode
            key={uni.id}
            universe={uni}
            isActive={activeUniverseId === uni.id}
            isWarping={isWarping}
            onSelect={onSelectUniverse}
          />
        ))}

        {/* Dynamic GSAP Spline Camera Controller */}
        <MultiverseCameraController
          activeUniverseId={activeUniverseId}
          isWarping={isWarping}
          setIsWarping={setIsWarping}
          onCameraUpdate={onCameraUpdate}
        />

        {/* Post-Processing Effects with Warp Bloom Surge */}
        <EffectComposer enableNormalPass={false}>
          <Bloom
            intensity={isWarping ? 2.4 : 0.85}
            luminanceThreshold={0.25}
            luminanceSmoothing={0.7}
            mipmapBlur
          />
          <Vignette eskil={false} offset={0.15} darkness={1.1} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};
