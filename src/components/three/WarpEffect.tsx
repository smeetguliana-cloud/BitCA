import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface WarpEffectProps {
  isWarping: boolean;
}

export const WarpEffect: React.FC<WarpEffectProps> = ({ isWarping }) => {
  const { camera } = useThree();
  const streakMeshRef = useRef<THREE.InstancedMesh>(null);
  const starsRef = useRef<THREE.Points>(null);
  const glitchedFragmentsRef = useRef<THREE.Group>(null);

  // Instanced warp streak particles
  const streakCount = 450;
  const streakData = useMemo(() => {
    const data = [];
    for (let i = 0; i < streakCount; i++) {
      // Cylinder distribution along a wide tunnel around origin
      const angle = Math.random() * Math.PI * 2;
      const radius = 5 + Math.random() * 55;
      const z = (Math.random() - 0.5) * 160;
      const speed = 25 + Math.random() * 45;
      data.push({
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        z,
        speed,
        baseLength: 0.6 + Math.random() * 1.5,
        colorType: i % 4
      });
    }
    return data;
  }, [streakCount]);

  // Static deep background starfield
  const starfieldGeo = useMemo(() => {
    const starCount = 1800;
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);

    const palette = [
      new THREE.Color('#ffffff'),
      new THREE.Color('#38bdf8'),
      new THREE.Color('#c084fc'),
      new THREE.Color('#4ade80')
    ];

    for (let i = 0; i < starCount; i++) {
      // Distribute on a large sphere radius 120-220
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 130 + Math.random() * 90;

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const col = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, []);

  // Floating 404 glitched reality fragments
  const fragments = useMemo(() => {
    const list = [];
    for (let i = 0; i < 24; i++) {
      const angle = (i / 24) * Math.PI * 2;
      const dist = 16 + (i % 5) * 6;
      list.push({
        pos: [
          Math.cos(angle) * dist + (Math.random() - 0.5) * 5,
          (Math.random() - 0.5) * 18,
          Math.sin(angle) * dist + (Math.random() - 0.5) * 5
        ] as [number, number, number],
        rotSpeed: [(Math.random() - 0.5) * 0.8, (Math.random() - 0.5) * 0.8, 0.4] as [number, number, number],
        scale: 0.8 + Math.random() * 1.4,
        type: i % 3
      });
    }
    return list;
  }, []);

  // Pre-allocated matrix & vector for per-frame transforms (Zero GC)
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const forwardVec = useMemo(() => new THREE.Vector3(), []);
  const cameraPos = useMemo(() => new THREE.Vector3(), []);

  // Set initial streak colors
  useMemo(() => {
    if (!streakMeshRef.current) return;
    const colorsList = [
      new THREE.Color('#00f3ff'),
      new THREE.Color('#ec4899'),
      new THREE.Color('#ffffff'),
      new THREE.Color('#a855f7')
    ];
    for (let i = 0; i < streakCount; i++) {
      streakMeshRef.current.setColorAt(i, colorsList[streakData[i].colorType]);
    }
    if (streakMeshRef.current.instanceColor) {
      streakMeshRef.current.instanceColor.needsUpdate = true;
    }
  }, [streakCount, streakData]);

  useFrame((_, delta) => {
    // 1. Warp streaks animation
    if (streakMeshRef.current) {
      camera.getWorldDirection(forwardVec);
      camera.getWorldPosition(cameraPos);

      const speedMultiplier = isWarping ? 4.5 : 0.4;
      const stretchMultiplier = isWarping ? 18.0 : 1.2;

      for (let i = 0; i < streakCount; i++) {
        const item = streakData[i];

        // Move streaks relative to camera
        item.z -= item.speed * speedMultiplier * delta;
        if (item.z < -80) {
          item.z = 80;
        }

        // Align instance along camera orientation
        dummy.position.set(
          cameraPos.x + item.x,
          cameraPos.y + item.y,
          cameraPos.z + item.z
        );

        // Orient streak to look along camera forward vector
        dummy.quaternion.copy(camera.quaternion);

        // Stretch along Z
        const zScale = item.baseLength * stretchMultiplier;
        const xyScale = isWarping ? 0.08 : 0.04;
        dummy.scale.set(xyScale, xyScale, zScale);

        dummy.updateMatrix();
        streakMeshRef.current.setMatrixAt(i, dummy.matrix);
      }
      streakMeshRef.current.instanceMatrix.needsUpdate = true;
    }

    // 2. Slow rotation of cosmic starfield
    if (starsRef.current) {
      starsRef.current.rotation.y += delta * 0.015;
    }

    // 3. Glitched fragments tumbling
    if (glitchedFragmentsRef.current) {
      glitchedFragmentsRef.current.rotation.y += delta * 0.04;
    }
  });

  return (
    <group>
      {/* Background Starfield */}
      <points ref={starsRef} geometry={starfieldGeo}>
        <pointsMaterial
          size={1.2}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>

      {/* Instanced Hyperspace Streaks */}
      <instancedMesh
        ref={streakMeshRef}
        args={[undefined, undefined, streakCount]}
        frustumCulled={false}
      >
        <cylinderGeometry args={[0.08, 0.08, 1, 6]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={isWarping ? 0.9 : 0.25}
          blending={THREE.AdditiveBlending}
        />
      </instancedMesh>

      {/* Floating 404 Glitched Fragments in the Nexus Void */}
      <group ref={glitchedFragmentsRef}>
        {fragments.map((frag, idx) => (
          <group key={idx} position={frag.pos} scale={frag.scale}>
            {frag.type === 0 ? (
              <mesh>
                <octahedronGeometry args={[1, 0]} />
                <meshBasicMaterial
                  color="#00f3ff"
                  wireframe
                  transparent
                  opacity={0.35}
                />
              </mesh>
            ) : frag.type === 1 ? (
              <mesh>
                <tetrahedronGeometry args={[1.2, 0]} />
                <meshBasicMaterial
                  color="#ec4899"
                  wireframe
                  transparent
                  opacity={0.3}
                />
              </mesh>
            ) : (
              <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshBasicMaterial
                  color="#ffffff"
                  wireframe
                  transparent
                  opacity={0.2}
                />
              </mesh>
            )}
          </group>
        ))}
      </group>

      {/* Subtle Cosmic Spatial Grid */}
      <gridHelper
        args={[160, 40, '#00f3ff', '#1e293b']}
        position={[0, -22, 0]}
      >
        <meshBasicMaterial color="#00f3ff" transparent opacity={0.12} />
      </gridHelper>
    </group>
  );
};
