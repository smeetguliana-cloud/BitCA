import * as THREE from 'three';
import { UniverseSystem } from '../data/multiverseData';

/**
 * Deep Space Astronomical Procedural Generation System
 * Produces photorealistic distant galaxies, volumetric nebula clouds,
 * soft circular star points, and 3D logarithmic spiral galaxy formations.
 */

// Simple pseudo-random hash generator
function hash2(x: number, y: number): number {
  const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
  return n - Math.floor(n);
}

// 2D Value Noise with smooth cubic interpolation
function noise2D(x: number, y: number): number {
  const i = Math.floor(x);
  const j = Math.floor(y);
  const fx = x - i;
  const fy = y - j;

  const sx = fx * fx * (3 - 2 * fx);
  const sy = fy * fy * (3 - 2 * fy);

  const n00 = hash2(i, j);
  const n10 = hash2(i + 1, j);
  const n01 = hash2(i, j + 1);
  const n11 = hash2(i + 1, j + 1);

  const nx0 = n00 + sx * (n10 - n00);
  const nx1 = n01 + sx * (n11 - n01);

  return nx0 + sy * (nx1 - nx0);
}

// Fractal Brownian Motion (fBm)
function fbm(x: number, y: number, octaves = 5): number {
  let total = 0;
  let frequency = 1.0;
  let amplitude = 1.0;
  let maxValue = 0;

  for (let i = 0; i < octaves; i++) {
    total += noise2D(x * frequency, y * frequency) * amplitude;
    maxValue += amplitude;
    frequency *= 2.0;
    amplitude *= 0.5;
  }

  return total / maxValue;
}

/**
 * Soft Circular Gaussian Star Sprite Texture (No square stars!)
 */
export function createSoftStarTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;

  const center = 32;
  const grad = ctx.createRadialGradient(center, center, 0, center, center, 30);
  grad.addColorStop(0.0, 'rgba(255, 255, 255, 1.0)');
  grad.addColorStop(0.12, 'rgba(235, 245, 255, 0.9)');
  grad.addColorStop(0.35, 'rgba(170, 210, 255, 0.35)');
  grad.addColorStop(0.7, 'rgba(110, 160, 255, 0.08)');
  grad.addColorStop(1.0, 'rgba(0, 0, 0, 0.0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Galactic Core Luminous Nucleus Texture
 */
export function createGalaxyCoreTexture(colorHex: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  const center = 128;
  const col = new THREE.Color(colorHex);

  const grad = ctx.createRadialGradient(center, center, 0, center, center, 120);
  grad.addColorStop(0.0, 'rgba(255, 255, 255, 1.0)');
  grad.addColorStop(0.15, `rgba(${Math.floor(col.r * 255)}, ${Math.floor(col.g * 255)}, ${Math.floor(col.b * 255)}, 0.9)`);
  grad.addColorStop(0.45, `rgba(${Math.floor(col.r * 200)}, ${Math.floor(col.g * 200)}, ${Math.floor(col.b * 200)}, 0.35)`);
  grad.addColorStop(0.75, `rgba(${Math.floor(col.r * 120)}, ${Math.floor(col.g * 120)}, ${Math.floor(col.b * 120)}, 0.08)`);
  grad.addColorStop(1.0, 'rgba(0, 0, 0, 0.0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Volumetric Interstellar Nebula Dust Texture
 */
export function createNebulaDustTexture(colorHex: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  const center = 128;
  const col = new THREE.Color(colorHex);

  const grad = ctx.createRadialGradient(center, center, 0, center, center, 120);
  grad.addColorStop(0.0, `rgba(${Math.floor(col.r * 255)}, ${Math.floor(col.g * 255)}, ${Math.floor(col.b * 255)}, 0.35)`);
  grad.addColorStop(0.4, `rgba(${Math.floor(col.r * 220)}, ${Math.floor(col.g * 220)}, ${Math.floor(col.b * 220)}, 0.18)`);
  grad.addColorStop(0.75, `rgba(${Math.floor(col.r * 150)}, ${Math.floor(col.g * 150)}, ${Math.floor(col.b * 150)}, 0.04)`);
  grad.addColorStop(1.0, 'rgba(0, 0, 0, 0.0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Organic turbulence
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imgData.data;
  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const idx = (y * canvas.width + x) * 4;
      const dist = Math.hypot(x - center, y - center) / 120;
      if (dist < 1.0) {
        const n = fbm(x * 0.02, y * 0.02, 3);
        data[idx + 3] = Math.floor(data[idx + 3] * (0.6 + n * 0.5));
      }
    }
  }
  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Procedural Distant Deep-Field Galaxy Textures (Spirals, Ellipticals, Mergers)
 */
export function createDistantGalaxyTexture(typeIndex: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;

  const center = 64;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Types: 0: Grand Spiral, 1: Barred Spiral, 2: Elliptical, 3: Ring/Lenticular
  const type = typeIndex % 4;

  if (type === 0 || type === 1) {
    // Spiral Galaxy
    const armCount = type === 0 ? 2 : 2;
    const baseColor = typeIndex % 2 === 0 ? '#b8d6ff' : '#ffe1b8';

    // Core bulge
    const coreGrad = ctx.createRadialGradient(center, center, 0, center, center, 22);
    coreGrad.addColorStop(0.0, 'rgba(255, 255, 255, 0.95)');
    coreGrad.addColorStop(0.4, baseColor);
    coreGrad.addColorStop(1.0, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = coreGrad;
    ctx.beginPath();
    ctx.arc(center, center, 22, 0, Math.PI * 2);
    ctx.fill();

    // Spiral arms
    ctx.strokeStyle = baseColor;
    ctx.lineWidth = 3.5;
    for (let a = 0; a < armCount; a++) {
      const armOffset = (a / armCount) * Math.PI * 2;
      ctx.beginPath();
      for (let step = 0; step < 60; step++) {
        const theta = (step / 60) * Math.PI * 2.8 + armOffset;
        const r = Math.pow(step / 60, 1.2) * 50;
        const x = center + Math.cos(theta) * r;
        const y = center + Math.sin(theta) * r * 0.65; // Inclined perspective

        if (step === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
  } else if (type === 2) {
    // Smooth Elliptical Galaxy
    const grad = ctx.createRadialGradient(center, center, 0, center, center, 45);
    grad.addColorStop(0.0, 'rgba(255, 250, 235, 0.9)');
    grad.addColorStop(0.3, 'rgba(240, 210, 170, 0.5)');
    grad.addColorStop(0.7, 'rgba(180, 140, 100, 0.15)');
    grad.addColorStop(1.0, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = grad;
    ctx.save();
    ctx.translate(center, center);
    ctx.rotate((typeIndex * 45 * Math.PI) / 180);
    ctx.scale(1.0, 0.65);
    ctx.beginPath();
    ctx.arc(0, 0, 45, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  } else {
    // Ring / Irregular Galaxy
    const grad = ctx.createRadialGradient(center, center, 14, center, center, 46);
    grad.addColorStop(0.0, 'rgba(0, 0, 0, 0)');
    grad.addColorStop(0.35, 'rgba(160, 220, 255, 0.6)');
    grad.addColorStop(0.65, 'rgba(190, 150, 255, 0.35)');
    grad.addColorStop(1.0, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(center, center, 46, 0, Math.PI * 2);
    ctx.fill();

    // Central starburst core
    const coreGrad = ctx.createRadialGradient(center, center, 0, center, center, 10);
    coreGrad.addColorStop(0.0, 'rgba(255, 255, 255, 0.9)');
    coreGrad.addColorStop(1.0, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = coreGrad;
    ctx.beginPath();
    ctx.arc(center, center, 10, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * 3D Logarithmic Spiral Galaxy Particle System
 * Builds thousands of individual stars arranged in swirling spiral arms and dense core bulge.
 */
export function createGalaxy3DSystem(universe: UniverseSystem, softStarTexture: THREE.CanvasTexture): THREE.Group {
  const galaxyGroup = new THREE.Group();
  galaxyGroup.position.set(...universe.position);

  const starCount = universe.starCount;
  const positions = new Float32Array(starCount * 3);
  const colors = new Float32Array(starCount * 3);
  const sizes = new Float32Array(starCount);

  const baseColor = new THREE.Color(universe.colorHex);
  const coreColor = new THREE.Color(0xffffff);
  const armColor = new THREE.Color(universe.accentStr || universe.colorStr);
  const dustColor = new THREE.Color(0x334466);

  const armCount = universe.armCount;
  const maxRadius = universe.galaxyRadius;

  for (let i = 0; i < starCount; i++) {
    const idx = i * 3;

    // 35% of stars concentrated in the dense nuclear bulge
    const isCore = i < starCount * 0.35;

    let x = 0, y = 0, z = 0;
    let starColor = coreColor;

    if (isCore) {
      // Exponential spherical bulge
      const r = Math.pow(Math.random(), 2.2) * universe.coreRadius;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      x = r * Math.sin(phi) * Math.cos(theta);
      y = r * Math.sin(phi) * Math.sin(theta) * 0.55; // Flattened spheroidal core
      z = r * Math.cos(phi);

      // Core stars are bright white to warm yellow
      const t = r / universe.coreRadius;
      starColor = coreColor.clone().lerp(baseColor, t * 0.6);
      sizes[i] = 1.4 + (1 - t) * 1.6;
    } else {
      // Logarithmic spiral arms
      const armIndex = i % armCount;
      const armAngleOffset = (armIndex / armCount) * Math.PI * 2;

      // Distance from center with cubic distribution for smooth density gradient
      const r = universe.coreRadius * 0.8 + Math.pow(Math.random(), 1.4) * (maxRadius - universe.coreRadius);

      // Logarithmic spiral equation: theta = b * ln(r)
      const spiralTheta = r * 0.45 + armAngleOffset;

      // Random dispersion around the arm center
      const spread = Math.pow(r / maxRadius, 1.2) * 2.8;
      const randomOffsetTheta = (Math.random() - 0.5) * spread;
      const randomOffsetR = (Math.random() - 0.5) * spread;

      const finalTheta = spiralTheta + randomOffsetTheta;
      const finalR = Math.max(1, r + randomOffsetR);

      x = Math.cos(finalTheta) * finalR;
      // Thin galactic disk with Gaussian vertical scale height
      y = (Math.random() + Math.random() - 1.0) * (0.8 + (finalR / maxRadius) * 1.4);
      z = Math.sin(finalTheta) * finalR;

      // Outer arm stars transition to universe theme color & blue/young star clusters
      const t = finalR / maxRadius;
      if (Math.random() > 0.4) {
        starColor = armColor.clone().lerp(baseColor, Math.random() * 0.5);
      } else {
        starColor = dustColor.clone().lerp(armColor, t);
      }

      sizes[i] = 0.8 + Math.random() * 1.4;
    }

    positions[idx] = x;
    positions[idx + 1] = y;
    positions[idx + 2] = z;

    colors[idx] = starColor.r;
    colors[idx + 1] = starColor.g;
    colors[idx + 2] = starColor.b;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 1.5,
    map: softStarTexture,
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const particleMesh = new THREE.Points(geometry, material);
  galaxyGroup.add(particleMesh);

  // Add Luminous Galactic Core Sprite
  const coreTexture = createGalaxyCoreTexture(universe.colorHex);
  const coreSpriteMat = new THREE.SpriteMaterial({
    map: coreTexture,
    color: 0xffffff,
    transparent: true,
    opacity: 0.95,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const coreSprite = new THREE.Sprite(coreSpriteMat);
  coreSprite.scale.set(universe.coreRadius * 4.5, universe.coreRadius * 4.5, 1);
  galaxyGroup.add(coreSprite);

  // Add Ambient Interstellar Dust Clouds inside Galaxy
  const dustTexture = createNebulaDustTexture(universe.colorHex);
  for (let d = 0; d < 6; d++) {
    const dMat = new THREE.SpriteMaterial({
      map: dustTexture,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const dSprite = new THREE.Sprite(dMat);
    const dAngle = (d / 6) * Math.PI * 2;
    const dDist = universe.coreRadius * 1.5 + (d / 6) * (universe.galaxyRadius * 0.6);
    dSprite.position.set(Math.cos(dAngle) * dDist, (Math.random() - 0.5) * 2, Math.sin(dAngle) * dDist);
    const dScale = universe.coreRadius * 3.5;
    dSprite.scale.set(dScale, dScale, 1);
    galaxyGroup.add(dSprite);
  }

  // Apply individual 3D spatial orientation tilts
  galaxyGroup.rotation.x = universe.tiltX;
  galaxyGroup.rotation.z = universe.tiltZ;

  return galaxyGroup;
}
