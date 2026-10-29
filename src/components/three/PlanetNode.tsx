import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { UniverseData } from '../../lib/multiverseData';
import { soundManager } from '../../lib/audio';

interface PlanetNodeProps {
  universe: UniverseData;
  isActive: boolean;
  isWarping: boolean;
  onSelect: (universeId: string) => void;
}

export const PlanetNode: React.FC<PlanetNodeProps> = ({
  universe,
  isActive,
  isWarping,
  onSelect
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ringsRef = useRef<THREE.Group>(null);
  const secondaryRingsRef = useRef<THREE.Group>(null);
  const accentsRef = useRef<THREE.Group>(null);

  const [hovered, setHovered] = useState(false);

  // Pre-generate procedural geometries and colors to prevent GC overhead
  const colors = useMemo(() => {
    return {
      primary: new THREE.Color(universe.primaryColor),
      secondary: new THREE.Color(universe.secondaryColor),
      ring: new THREE.Color(universe.ringColor),
      white: new THREE.Color('#ffffff')
    };
  }, [universe]);

  // AIverse neural network points & lines
  const neuralData = useMemo(() => {
    if (universe.visualType !== 'aiverse') return null;
    const count = 18;
    const points: [number, number, number][] = [];
    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = (universe.planetRadius * 0.75) * Math.cbrt(Math.random() * 0.7 + 0.3);
      points.push([
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      ]);
    }
    const lineIndices: [number, number][] = [];
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const p1 = new THREE.Vector3(...points[i]);
        const p2 = new THREE.Vector3(...points[j]);
        if (p1.distanceTo(p2) < universe.planetRadius * 0.9) {
          lineIndices.push([i, j]);
        }
      }
    }
    return { points, lineIndices };
  }, [universe]);

  // Vibeverse dynamic equalizer ring segments
  const soundwaveBars = useMemo(() => {
    if (universe.visualType !== 'vibeverse') return null;
    const bars = [];
    const count = 36;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const baseRadius = universe.planetRadius * 1.6;
      bars.push({ angle, baseRadius, phase: i * 0.25 });
    }
    return bars;
  }, [universe]);

  // Gameverse floating polyhedrons
  const floatingPolys = useMemo(() => {
    if (universe.visualType !== 'gameverse') return null;
    const polys = [];
    for (let i = 0; i < 7; i++) {
      const angle = (i / 7) * Math.PI * 2;
      const dist = universe.planetRadius * (1.7 + Math.sin(i * 1.5) * 0.4);
      polys.push({
        position: [
          Math.cos(angle) * dist,
          (Math.sin(i * 2) * 1.2),
          Math.sin(angle) * dist
        ] as [number, number, number],
        scale: 0.35 + (i % 3) * 0.15,
        type: i % 2 === 0 ? 'octa' : 'tetra',
        rotSpeed: 0.8 + i * 0.2
      });
    }
    return polys;
  }, [universe]);

  // Humanverse double helix points
  const doubleHelixCurve = useMemo(() => {
    if (universe.visualType !== 'humanverse') return null;
    const points1: THREE.Vector3[] = [];
    const points2: THREE.Vector3[] = [];
    const turns = 2.5;
    const steps = 70;
    const radius = universe.planetRadius * 1.55;
    const height = universe.planetRadius * 2.2;
    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) - 0.5;
      const y = t * height;
      const angle = t * turns * Math.PI * 2;
      points1.push(new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius));
      points2.push(new THREE.Vector3(Math.cos(angle + Math.PI) * radius, y, Math.sin(angle + Math.PI) * radius));
    }
    return {
      geo1: new THREE.BufferGeometry().setFromPoints(points1),
      geo2: new THREE.BufferGeometry().setFromPoints(points2)
    };
  }, [universe]);

  // Animation frame loop
  useFrame((state, delta) => {
    const elapsed = state.clock.getElapsedTime();

    if (groupRef.current) {
      // Idle rotation around Y axis
      groupRef.current.rotation.y += delta * universe.rotationSpeed * 0.4;
      
      // Floating bobbing motion
      const bob = Math.sin(elapsed * 1.2 + universe.index) * 0.15;
      groupRef.current.position.y = universe.position[1] + bob;

      // Scale smoothly when hovered or active
      const targetScale = isActive ? 1.12 : (hovered ? 1.08 : 1.0);
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 8);
    }

    // Custom rotations for planet components
    if (ringsRef.current) {
      ringsRef.current.rotation.z += delta * 0.3;
      ringsRef.current.rotation.x = Math.sin(elapsed * 0.4) * 0.15 + 0.35;
    }

    if (secondaryRingsRef.current) {
      secondaryRingsRef.current.rotation.y -= delta * 0.45;
      secondaryRingsRef.current.rotation.z += delta * 0.25;
    }

    // Specific planetary animation nuances
    if (universe.visualType === 'vibeverse' && accentsRef.current) {
      const pulse = 1 + Math.sin(elapsed * 6) * 0.12 + Math.cos(elapsed * 11) * 0.08;
      accentsRef.current.scale.set(pulse, pulse, pulse);
    }

    if (universe.visualType === 'futureverse' && ringsRef.current && secondaryRingsRef.current) {
      ringsRef.current.rotation.x += delta * 0.8;
      secondaryRingsRef.current.rotation.y += delta * 0.9;
    }

    if (coreRef.current && universe.visualType === 'techverse') {
      coreRef.current.rotation.x += delta * 0.2;
      coreRef.current.rotation.z -= delta * 0.25;
    }
  });

  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    soundManager.playSelect();
    onSelect(universe.id);
  };

  const handlePointerOver = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setHovered(true);
    soundManager.playClick();
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    setHovered(false);
    document.body.style.cursor = 'auto';
  };

  return (
    <group
      position={[universe.position[0], universe.position[1], universe.position[2]]}
      ref={groupRef}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      {/* Visual Type Specific Renders */}
      {universe.visualType === 'techverse' && (
        <>
          {/* Inner Glowing Core */}
          <mesh ref={coreRef}>
            <sphereGeometry args={[universe.planetRadius * 0.72, 32, 32]} />
            <meshStandardMaterial
              color="#001827"
              emissive={universe.primaryColor}
              emissiveIntensity={hovered || isActive ? 1.6 : 0.8}
              roughness={0.2}
              metalness={0.9}
            />
          </mesh>

          {/* Outer Geodesic Wireframe Sphere */}
          <mesh>
            <icosahedronGeometry args={[universe.planetRadius, 2]} />
            <meshStandardMaterial
              color={universe.primaryColor}
              wireframe
              transparent
              opacity={0.7}
              emissive={universe.primaryColor}
              emissiveIntensity={0.5}
            />
          </mesh>

          {/* Orbiting Circuit-Board Ring Segments */}
          <group ref={ringsRef} rotation={[0.45, 0.2, 0]}>
            <mesh>
              <ringGeometry args={[universe.planetRadius * 1.35, universe.planetRadius * 1.55, 48]} />
              <meshBasicMaterial
                color={universe.ringColor}
                side={THREE.DoubleSide}
                wireframe
                transparent
                opacity={0.75}
              />
            </mesh>
            <mesh rotation={[0, 0, Math.PI / 3]}>
              <ringGeometry args={[universe.planetRadius * 1.7, universe.planetRadius * 1.85, 32]} />
              <meshBasicMaterial
                color={universe.primaryColor}
                side={THREE.DoubleSide}
                transparent
                opacity={0.4}
              />
            </mesh>
          </group>
        </>
      )}

      {universe.visualType === 'gameverse' && (
        <>
          {/* Faceted Crystal Planet */}
          <mesh ref={coreRef}>
            <dodecahedronGeometry args={[universe.planetRadius, 1]} />
            <meshStandardMaterial
              color="#2a0845"
              emissive={universe.primaryColor}
              emissiveIntensity={hovered || isActive ? 1.8 : 0.9}
              roughness={0.15}
              metalness={0.8}
              flatShading
            />
          </mesh>

          {/* Outer Crystal Facet Cage */}
          <mesh>
            <icosahedronGeometry args={[universe.planetRadius * 1.15, 1]} />
            <meshStandardMaterial
              color={universe.secondaryColor}
              wireframe
              transparent
              opacity={0.65}
              emissive={universe.secondaryColor}
              emissiveIntensity={0.4}
            />
          </mesh>

          {/* Floating Geometric Polyhedrons */}
          {floatingPolys && (
            <group ref={accentsRef}>
              {floatingPolys.map((poly, idx) => (
                <mesh key={idx} position={poly.position} scale={poly.scale}>
                  {poly.type === 'octa' ? (
                    <octahedronGeometry args={[1, 0]} />
                  ) : (
                    <tetrahedronGeometry args={[1, 0]} />
                  )}
                  <meshStandardMaterial
                    color={idx % 2 === 0 ? universe.primaryColor : universe.secondaryColor}
                    emissive={universe.primaryColor}
                    emissiveIntensity={0.8}
                    roughness={0.2}
                    metalness={0.6}
                    flatShading
                  />
                </mesh>
              ))}
            </group>
          )}

          {/* Dual Tilted Neon Rings */}
          <group ref={ringsRef} rotation={[0.6, 0.4, 0]}>
            <mesh>
              <torusGeometry args={[universe.planetRadius * 1.7, 0.05, 16, 64]} />
              <meshBasicMaterial color={universe.primaryColor} />
            </mesh>
          </group>
          <group ref={secondaryRingsRef} rotation={[-0.4, 0.5, 0.3]}>
            <mesh>
              <torusGeometry args={[universe.planetRadius * 1.95, 0.04, 16, 64]} />
              <meshBasicMaterial color={universe.secondaryColor} />
            </mesh>
          </group>
        </>
      )}

      {universe.visualType === 'vibeverse' && (
        <>
          {/* Smooth Iridescent Sphere */}
          <mesh ref={coreRef}>
            <sphereGeometry args={[universe.planetRadius, 48, 48]} />
            <meshStandardMaterial
              color="#3b0718"
              emissive={universe.primaryColor}
              emissiveIntensity={hovered || isActive ? 1.5 : 0.75}
              roughness={0.1}
              metalness={0.85}
            />
          </mesh>

          {/* Equalizer Soundwave Rings */}
          <group ref={ringsRef} rotation={[0.4, 0, 0]}>
            <mesh>
              <ringGeometry args={[universe.planetRadius * 1.35, universe.planetRadius * 1.4, 64]} />
              <meshBasicMaterial color={universe.ringColor} side={THREE.DoubleSide} transparent opacity={0.6} />
            </mesh>
            <mesh>
              <ringGeometry args={[universe.planetRadius * 1.7, universe.planetRadius * 1.76, 64]} />
              <meshBasicMaterial color={universe.primaryColor} side={THREE.DoubleSide} transparent opacity={0.4} />
            </mesh>
          </group>

          {/* Pulsing Soundwave Nodes */}
          {soundwaveBars && (
            <group ref={accentsRef}>
              {soundwaveBars.map((bar, i) => (
                <mesh
                  key={i}
                  position={[
                    Math.cos(bar.angle) * bar.baseRadius,
                    Math.sin(bar.angle * 3) * 0.3,
                    Math.sin(bar.angle) * bar.baseRadius
                  ]}
                  scale={[0.12, 0.12, 0.12]}
                >
                  <sphereGeometry args={[1, 12, 12]} />
                  <meshBasicMaterial color={i % 2 === 0 ? universe.primaryColor : universe.secondaryColor} />
                </mesh>
              ))}
            </group>
          )}
        </>
      )}

      {universe.visualType === 'aiverse' && (
        <>
          {/* Translucent Outer Shell */}
          <mesh>
            <sphereGeometry args={[universe.planetRadius, 40, 40]} />
            <meshPhysicalMaterial
              color="#022c1d"
              emissive={universe.primaryColor}
              emissiveIntensity={hovered || isActive ? 0.9 : 0.4}
              transparent
              opacity={0.4}
              roughness={0.1}
              transmission={0.65}
              ior={1.4}
            />
          </mesh>

          {/* Glowing Neural-Network Node Cluster */}
          {neuralData && (
            <group ref={accentsRef}>
              {neuralData.points.map((pt, i) => (
                <mesh key={i} position={pt} scale={0.14}>
                  <sphereGeometry args={[1, 16, 16]} />
                  <meshStandardMaterial
                    color={universe.primaryColor}
                    emissive={universe.primaryColor}
                    emissiveIntensity={2.0}
                    roughness={0.1}
                  />
                </mesh>
              ))}

              {/* Synaptic Connection Lines */}
              {neuralData.lineIndices.map(([i, j], idx) => {
                const p1 = new THREE.Vector3(...neuralData.points[i]);
                const p2 = new THREE.Vector3(...neuralData.points[j]);
                const lineGeo = new THREE.BufferGeometry().setFromPoints([p1, p2]);
                return (
                  <primitive
                    key={idx}
                    object={new THREE.Line(
                      lineGeo,
                      new THREE.LineBasicMaterial({
                        color: universe.primaryColor,
                        transparent: true,
                        opacity: 0.5
                      })
                    )}
                  />
                );
              })}
            </group>
          )}

          {/* Surrounding Orbital Code Ring */}
          <group ref={ringsRef} rotation={[0.7, 0.2, 0]}>
            <mesh>
              <ringGeometry args={[universe.planetRadius * 1.4, universe.planetRadius * 1.5, 48]} />
              <meshBasicMaterial color={universe.secondaryColor} side={THREE.DoubleSide} wireframe transparent opacity={0.65} />
            </mesh>
          </group>
        </>
      )}

      {universe.visualType === 'cyberverse' && (
        <>
          {/* Dark Armored Core */}
          <mesh ref={coreRef}>
            <sphereGeometry args={[universe.planetRadius * 0.9, 36, 36]} />
            <meshStandardMaterial
              color="#1a0205"
              emissive="#3b080d"
              emissiveIntensity={0.6}
              roughness={0.4}
              metalness={0.9}
            />
          </mesh>

          {/* Hexagonal Shield Mesh */}
          <mesh>
            <icosahedronGeometry args={[universe.planetRadius * 1.05, 3]} />
            <meshStandardMaterial
              color={universe.primaryColor}
              wireframe
              transparent
              opacity={hovered || isActive ? 0.95 : 0.65}
              emissive={universe.primaryColor}
              emissiveIntensity={hovered || isActive ? 1.4 : 0.6}
            />
          </mesh>

          {/* Rotating Laser-Scanner Rings */}
          <group ref={ringsRef} rotation={[0.8, -0.3, 0]}>
            <mesh>
              <torusGeometry args={[universe.planetRadius * 1.5, 0.045, 12, 64]} />
              <meshBasicMaterial color={universe.primaryColor} />
            </mesh>
            <mesh rotation={[0.4, 0, 0]}>
              <ringGeometry args={[universe.planetRadius * 1.6, universe.planetRadius * 1.72, 32]} />
              <meshBasicMaterial color={universe.secondaryColor} side={THREE.DoubleSide} wireframe transparent opacity={0.4} />
            </mesh>
          </group>
        </>
      )}

      {universe.visualType === 'humanverse' && (
        <>
          {/* Organic Warm Glowing Core */}
          <mesh ref={coreRef}>
            <sphereGeometry args={[universe.planetRadius * 0.9, 44, 44]} />
            <meshStandardMaterial
              color="#3a2503"
              emissive={universe.primaryColor}
              emissiveIntensity={hovered || isActive ? 1.4 : 0.85}
              roughness={0.3}
              metalness={0.3}
            />
          </mesh>

          {/* Atmospheric Aura */}
          <mesh>
            <sphereGeometry args={[universe.planetRadius * 1.08, 36, 36]} />
            <meshBasicMaterial
              color={universe.primaryColor}
              transparent
              opacity={0.18}
              side={THREE.BackSide}
            />
          </mesh>

          {/* Intertwined Double-Helix Rings */}
          {doubleHelixCurve && (
            <group ref={ringsRef} rotation={[0.4, 0.2, 0]}>
              <primitive
                object={new THREE.Line(
                  doubleHelixCurve.geo1,
                  new THREE.LineBasicMaterial({ color: universe.primaryColor, linewidth: 2 })
                )}
              />
              <primitive
                object={new THREE.Line(
                  doubleHelixCurve.geo2,
                  new THREE.LineBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.8 })
                )}
              />
            </group>
          )}
        </>
      )}

      {universe.visualType === 'futureverse' && (
        <>
          {/* Chronos Singularity Core */}
          <mesh ref={coreRef}>
            <sphereGeometry args={[universe.planetRadius * 0.7, 36, 36]} />
            <meshStandardMaterial
              color="#0e0f2b"
              emissive={universe.primaryColor}
              emissiveIntensity={hovered || isActive ? 2.0 : 1.1}
              roughness={0.1}
              metalness={0.95}
            />
          </mesh>

          {/* Multi-Axis Rotating Gyroscope Astrolabe Rings */}
          <group ref={ringsRef}>
            <mesh>
              <torusGeometry args={[universe.planetRadius * 1.25, 0.05, 16, 64]} />
              <meshStandardMaterial
                color={universe.primaryColor}
                emissive={universe.primaryColor}
                emissiveIntensity={0.6}
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
          </group>

          <group ref={secondaryRingsRef}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[universe.planetRadius * 1.55, 0.045, 16, 64]} />
              <meshStandardMaterial
                color={universe.secondaryColor}
                emissive={universe.secondaryColor}
                emissiveIntensity={0.6}
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
            <mesh rotation={[0, Math.PI / 4, Math.PI / 4]}>
              <torusGeometry args={[universe.planetRadius * 1.85, 0.04, 16, 64]} />
              <meshBasicMaterial color="#ffffff" transparent opacity={0.4} />
            </mesh>
          </group>
        </>
      )}

      {/* Point Light emanating from the planet */}
      <pointLight
        color={colors.primary}
        intensity={hovered || isActive ? 4.5 : 2.0}
        distance={universe.planetRadius * 6}
        decay={2}
      />

      {/* 3D Holographic Label / Blueprint Marker */}
      <Html
        position={[0, universe.planetRadius * 1.7, 0]}
        center
        distanceFactor={45}
        zIndexRange={[100, 0]}
        style={{
          pointerEvents: 'auto',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          opacity: isWarping ? 0 : 1,
          transform: `scale(${hovered ? 1.08 : 1.0})`
        }}
      >
        <div
          onClick={handleClick}
          className={`cursor-pointer px-3 py-1.5 rounded border transition-all duration-300 backdrop-blur-md select-none whitespace-nowrap flex flex-col items-center ${
            isActive
              ? 'bg-cyan-950/80 border-cyan-400 shadow-[0_0_20px_rgba(0,243,255,0.4)]'
              : hovered
              ? 'bg-slate-900/90 border-slate-300 shadow-[0_0_15px_rgba(255,255,255,0.2)]'
              : 'bg-black/60 border-white/20 hover:border-white/40'
          }`}
          style={{ borderColor: hovered || isActive ? universe.primaryColor : undefined }}
        >
          <div className="flex items-center gap-1.5">
            <span
              className="w-1.5 h-1.5 rounded-full inline-block"
              style={{ backgroundColor: universe.primaryColor }}
            />
            <span
              className="text-[10px] tracking-widest font-mono uppercase font-bold"
              style={{ color: universe.primaryColor }}
            >
              {universe.code}
            </span>
          </div>

          <span className="text-xs font-orbitron font-bold text-white tracking-wider">
            {universe.name}
          </span>

          <span className="text-[9px] font-mono text-slate-300 max-w-[150px] truncate">
            {universe.events.length} Events // {universe.tagline.slice(0, 24)}...
          </span>

          <div
            className={`mt-1 text-[8px] font-mono tracking-widest uppercase py-0.5 px-2 rounded transition-opacity ${
              hovered || isActive ? 'opacity-100 bg-white/10 text-cyan-300' : 'opacity-0 h-0 overflow-hidden'
            }`}
          >
            {isActive ? 'CURRENT DOCK' : 'CLICK TO WARP >>'}
          </div>
        </div>
      </Html>
    </group>
  );
};
