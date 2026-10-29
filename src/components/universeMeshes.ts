import * as THREE from 'three';
import { UniverseSystem } from '../data/multiverseData';

/**
 * Creates distinct, photorealistic 3D celestial bodies for the Seven Universes.
 * Zero solar systems, zero conventional planets, zero grids.
 * Pure authentic sci-fi cosmological destinations.
 */
export function createUniverseCelestialBody(
  universe: UniverseSystem,
  softStarTexture: THREE.CanvasTexture
): THREE.Group {
  const group = new THREE.Group();
  group.position.set(...universe.position);
  group.name = `universe_${universe.id}`;

  const primaryCol = new THREE.Color(universe.colorHex);
  const secondaryCol = new THREE.Color(universe.accentStr || '#ffffff');
  const baseRadius = 3.2;

  // 1. Core Celestial Sphere
  let coreGeo: THREE.BufferGeometry;
  let coreMat: THREE.Material;

  switch (universe.id) {
    case 'tech': {
      // Crystalline Silicon Core with Geodesic Lattice
      coreGeo = new THREE.IcosahedronGeometry(baseRadius * 0.9, 2);
      coreMat = new THREE.MeshStandardMaterial({
        color: 0x051b2c,
        emissive: primaryCol,
        emissiveIntensity: 1.1,
        roughness: 0.2,
        metalness: 0.9,
      });
      const core = new THREE.Mesh(coreGeo, coreMat);
      group.add(core);

      // Outer Geodesic Wireframe Shell
      const shellGeo = new THREE.IcosahedronGeometry(baseRadius * 1.25, 1);
      const shellMat = new THREE.MeshBasicMaterial({
        color: primaryCol,
        wireframe: true,
        transparent: true,
        opacity: 0.65,
      });
      const shell = new THREE.Mesh(shellGeo, shellMat);
      shell.name = 'rotating_shell';
      group.add(shell);

      // Data Streaming Ring
      const ringGeo = new THREE.RingGeometry(baseRadius * 1.5, baseRadius * 1.7, 48);
      const ringMat = new THREE.MeshBasicMaterial({
        color: primaryCol,
        side: THREE.DoubleSide,
        wireframe: true,
        transparent: true,
        opacity: 0.5,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2.8;
      ring.name = 'rotating_ring';
      group.add(ring);
      break;
    }

    case 'game': {
      // Polyhedral Arcade Hologram Core
      coreGeo = new THREE.DodecahedronGeometry(baseRadius * 0.85, 0);
      coreMat = new THREE.MeshStandardMaterial({
        color: 0x220538,
        emissive: primaryCol,
        emissiveIntensity: 1.3,
        roughness: 0.15,
        metalness: 0.95,
      });
      const core = new THREE.Mesh(coreGeo, coreMat);
      group.add(core);

      // Surrounding Neon Pulsing Shields
      const shieldGeo = new THREE.OctahedronGeometry(baseRadius * 1.28, 0);
      const shieldMat = new THREE.MeshBasicMaterial({
        color: secondaryCol,
        wireframe: true,
        transparent: true,
        opacity: 0.7,
      });
      const shield = new THREE.Mesh(shieldGeo, shieldMat);
      shield.name = 'rotating_shell';
      group.add(shield);

      // Dual Crossed Neon Rings
      const ring1 = new THREE.Mesh(
        new THREE.TorusGeometry(baseRadius * 1.55, 0.04, 16, 64),
        new THREE.MeshBasicMaterial({ color: primaryCol })
      );
      ring1.rotation.x = 0.8;
      ring1.name = 'rotating_ring';
      group.add(ring1);

      const ring2 = new THREE.Mesh(
        new THREE.TorusGeometry(baseRadius * 1.85, 0.035, 16, 64),
        new THREE.MeshBasicMaterial({ color: secondaryCol, transparent: true, opacity: 0.7 })
      );
      ring2.rotation.y = 0.6;
      ring2.name = 'rotating_ring_2';
      group.add(ring2);
      break;
    }

    case 'vibe': {
      // Chromatic Sonic Pulsating Sphere
      coreGeo = new THREE.SphereGeometry(baseRadius * 0.92, 36, 36);
      coreMat = new THREE.MeshStandardMaterial({
        color: 0x3b0722,
        emissive: primaryCol,
        emissiveIntensity: 1.2,
        roughness: 0.3,
        metalness: 0.8,
      });
      const core = new THREE.Mesh(coreGeo, coreMat);
      group.add(core);

      // Undulating Audio Frequency Wave Rings
      const ringCurve = new THREE.CatmullRomCurve3(
        Array.from({ length: 48 }, (_, i) => {
          const angle = (i / 48) * Math.PI * 2;
          const r = baseRadius * 1.6 + Math.sin(angle * 7) * 0.22;
          return new THREE.Vector3(Math.cos(angle) * r, Math.sin(angle * 5) * 0.15, Math.sin(angle) * r);
        }),
        true
      );
      const wavePoints = ringCurve.getPoints(96);
      const waveGeo = new THREE.BufferGeometry().setFromPoints(wavePoints);
      const waveLine = new THREE.Line(
        waveGeo,
        new THREE.LineBasicMaterial({ color: primaryCol, transparent: true, opacity: 0.85 })
      );
      waveLine.name = 'rotating_ring';
      group.add(waveLine);

      // Outer harmonic halo
      const haloGeo = new THREE.RingGeometry(baseRadius * 1.8, baseRadius * 1.95, 48);
      const haloMat = new THREE.MeshBasicMaterial({
        color: secondaryCol,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.45,
        wireframe: true,
      });
      const halo = new THREE.Mesh(haloGeo, haloMat);
      halo.rotation.x = Math.PI / 3;
      halo.name = 'rotating_shell';
      group.add(halo);
      break;
    }

    case 'ai': {
      // Deep Learning Synaptic Node Core
      coreGeo = new THREE.IcosahedronGeometry(baseRadius * 0.85, 3);
      coreMat = new THREE.MeshStandardMaterial({
        color: 0x022c22,
        emissive: primaryCol,
        emissiveIntensity: 1.4,
        roughness: 0.2,
        metalness: 0.9,
      });
      const core = new THREE.Mesh(coreGeo, coreMat);
      group.add(core);

      // 3D Neural Synaptic Connections & Satellite Nodes
      const neuralGroup = new THREE.Group();
      neuralGroup.name = 'rotating_shell';
      const nodeCount = 18;
      const nodes: THREE.Vector3[] = [];

      for (let i = 0; i < nodeCount; i++) {
        const u = Math.random();
        const v = Math.random();
        const theta = u * 2.0 * Math.PI;
        const phi = Math.acos(2.0 * v - 1.0);
        const r = baseRadius * (1.2 + Math.random() * 0.55);

        const pos = new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi)
        );
        nodes.push(pos);

        const nodeMesh = new THREE.Mesh(
          new THREE.SphereGeometry(0.12, 12, 12),
          new THREE.MeshBasicMaterial({ color: primaryCol })
        );
        nodeMesh.position.copy(pos);
        neuralGroup.add(nodeMesh);
      }

      // Connect nearby nodes with synaptic lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          if (nodes[i].distanceTo(nodes[j]) < baseRadius * 1.1) {
            const lineGeo = new THREE.BufferGeometry().setFromPoints([nodes[i], nodes[j]]);
            const line = new THREE.Line(
              lineGeo,
              new THREE.LineBasicMaterial({
                color: primaryCol,
                transparent: true,
                opacity: 0.45,
              })
            );
            neuralGroup.add(line);
          }
        }
      }
      group.add(neuralGroup);

      // Concentric orbital code ring
      const codeRing = new THREE.Mesh(
        new THREE.RingGeometry(baseRadius * 1.5, baseRadius * 1.62, 36),
        new THREE.MeshBasicMaterial({ color: secondaryCol, side: THREE.DoubleSide, wireframe: true, transparent: true, opacity: 0.6 })
      );
      codeRing.rotation.x = 0.7;
      codeRing.name = 'rotating_ring';
      group.add(codeRing);
      break;
    }

    case 'cyber': {
      // Armored Stealth Core
      coreGeo = new THREE.SphereGeometry(baseRadius * 0.9, 36, 36);
      coreMat = new THREE.MeshStandardMaterial({
        color: 0x1f0205,
        emissive: 0x450a0a,
        emissiveIntensity: 0.8,
        roughness: 0.4,
        metalness: 0.95,
      });
      const core = new THREE.Mesh(coreGeo, coreMat);
      group.add(core);

      // Hexagonal Defensive Shield Lattice
      const hexGeo = new THREE.IcosahedronGeometry(baseRadius * 1.15, 2);
      const hexMat = new THREE.MeshStandardMaterial({
        color: primaryCol,
        wireframe: true,
        transparent: true,
        opacity: 0.75,
        emissive: primaryCol,
        emissiveIntensity: 0.8,
      });
      const hexShield = new THREE.Mesh(hexGeo, hexMat);
      hexShield.name = 'rotating_shell';
      group.add(hexShield);

      // Rotating Laser Scanner Rings
      const scanRing1 = new THREE.Mesh(
        new THREE.TorusGeometry(baseRadius * 1.6, 0.045, 12, 64),
        new THREE.MeshBasicMaterial({ color: primaryCol })
      );
      scanRing1.rotation.x = 0.85;
      scanRing1.name = 'rotating_ring';
      group.add(scanRing1);

      const scanRing2 = new THREE.Mesh(
        new THREE.RingGeometry(baseRadius * 1.7, baseRadius * 1.85, 32),
        new THREE.MeshBasicMaterial({ color: secondaryCol, side: THREE.DoubleSide, wireframe: true, transparent: true, opacity: 0.45 })
      );
      scanRing2.rotation.y = 0.5;
      scanRing2.name = 'rotating_ring_2';
      group.add(scanRing2);
      break;
    }

    case 'human': {
      // Warm Organic Core
      coreGeo = new THREE.SphereGeometry(baseRadius * 0.9, 40, 40);
      coreMat = new THREE.MeshStandardMaterial({
        color: 0x3d2402,
        emissive: primaryCol,
        emissiveIntensity: 0.9,
        roughness: 0.35,
        metalness: 0.3,
      });
      const core = new THREE.Mesh(coreGeo, coreMat);
      group.add(core);

      // Atmospheric Backside Aura
      const auraGeo = new THREE.SphereGeometry(baseRadius * 1.12, 32, 32);
      const auraMat = new THREE.MeshBasicMaterial({
        color: primaryCol,
        transparent: true,
        opacity: 0.22,
        side: THREE.BackSide,
      });
      group.add(new THREE.Mesh(auraGeo, auraMat));

      // Intertwined Double-Helix Rings
      const helix1Points: THREE.Vector3[] = [];
      const helix2Points: THREE.Vector3[] = [];
      const steps = 64;
      for (let s = 0; s <= steps; s++) {
        const angle = (s / steps) * Math.PI * 4;
        const r = baseRadius * 1.55;
        const h = ((s / steps) - 0.5) * baseRadius * 1.8;
        helix1Points.push(new THREE.Vector3(Math.cos(angle) * r, h, Math.sin(angle) * r));
        helix2Points.push(new THREE.Vector3(Math.cos(angle + Math.PI) * r, h, Math.sin(angle + Math.PI) * r));
      }
      const helix1 = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(helix1Points),
        new THREE.LineBasicMaterial({ color: primaryCol })
      );
      const helix2 = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(helix2Points),
        new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.75 })
      );
      const helixGroup = new THREE.Group();
      helixGroup.rotation.x = 0.5;
      helixGroup.name = 'rotating_ring';
      helixGroup.add(helix1);
      helixGroup.add(helix2);
      group.add(helixGroup);
      break;
    }

    case 'meta':
    default: {
      // Chronos Singularity Core
      coreGeo = new THREE.SphereGeometry(baseRadius * 0.75, 36, 36);
      coreMat = new THREE.MeshStandardMaterial({
        color: 0x0a0c2e,
        emissive: primaryCol,
        emissiveIntensity: 1.4,
        roughness: 0.1,
        metalness: 0.95,
      });
      const core = new THREE.Mesh(coreGeo, coreMat);
      group.add(core);

      // Multi-Axis Astrolabe Gyroscopic Rings
      const gyroRing1 = new THREE.Mesh(
        new THREE.TorusGeometry(baseRadius * 1.35, 0.05, 16, 64),
        new THREE.MeshStandardMaterial({
          color: primaryCol,
          emissive: primaryCol,
          emissiveIntensity: 0.6,
          metalness: 0.8,
          roughness: 0.2,
        })
      );
      gyroRing1.name = 'rotating_ring';
      group.add(gyroRing1);

      const gyroRing2 = new THREE.Mesh(
        new THREE.TorusGeometry(baseRadius * 1.65, 0.045, 16, 64),
        new THREE.MeshStandardMaterial({
          color: secondaryCol,
          emissive: secondaryCol,
          emissiveIntensity: 0.6,
          metalness: 0.8,
          roughness: 0.2,
        })
      );
      gyroRing2.rotation.x = Math.PI / 2;
      gyroRing2.name = 'rotating_ring_2';
      group.add(gyroRing2);

      const gyroRing3 = new THREE.Mesh(
        new THREE.TorusGeometry(baseRadius * 1.95, 0.035, 16, 64),
        new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.4 })
      );
      gyroRing3.rotation.set(0, Math.PI / 4, Math.PI / 4);
      gyroRing3.name = 'rotating_shell';
      group.add(gyroRing3);
      break;
    }
  }

  // 2. Point Light emanating from the destination
  const light = new THREE.PointLight(universe.colorHex, 3.5, baseRadius * 7, 2);
  group.add(light);

  // 3. Ambient Interstellar Glow Sprite around the Universe
  const glowMat = new THREE.SpriteMaterial({
    map: softStarTexture,
    color: primaryCol,
    transparent: true,
    opacity: 0.4,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const glowSprite = new THREE.Sprite(glowMat);
  glowSprite.scale.set(baseRadius * 4.2, baseRadius * 4.2, 1);
  group.add(glowSprite);

  return group;
}
