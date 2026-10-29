
// --------------------------------------------------------
// 1. CUSTOM CURSOR LOGIC
// --------------------------------------------------------
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
const hoverTargets = document.querySelectorAll('.hover-target, a, button, input, .interactive-card');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Move main dot instantly
    cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    
    // Global CSS variables for background radial glow (Hero Section)
    document.documentElement.style.setProperty('--mouse-x', `${(mouseX / window.innerWidth) * 100}%`);
    document.documentElement.style.setProperty('--mouse-y', `${(mouseY / window.innerHeight) * 100}%`);
});

function animateFollower() {
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
    requestAnimationFrame(animateFollower);
}
animateFollower();

hoverTargets.forEach(target => {
    target.addEventListener('mouseenter', () => {
        cursor.classList.add('hovering');
        follower.classList.add('hovering');
    });
    target.addEventListener('mouseleave', () => {
        cursor.classList.remove('hovering');
        follower.classList.remove('hovering');
    });
});

// --------------------------------------------------------
// 2. 3D TILT EFFECT ON CARDS
// --------------------------------------------------------
const interactiveCards = document.querySelectorAll('.interactive-card');

interactiveCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; 
        const y = e.clientY - rect.top;  
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const tiltMax = 12; 
        const rotateX = ((y - centerY) / centerY) * -tiltMax;
        const rotateY = ((x - centerX) / centerX) * tiltMax;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.5s ease';
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        setTimeout(() => {
            card.style.transition = 'transform 0.1s ease, border-color 0.4s ease, box-shadow 0.4s ease';
        }, 500);
    });
});

// --------------------------------------------------------
// 3. NAVBAR LOGIC & SCROLL REVEAL
// --------------------------------------------------------
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
menuBtn.addEventListener('click', () => {
  if(navLinks.style.display === 'flex') {
     navLinks.style.display = 'none';
  } else {
     navLinks.style.display = 'flex';
     navLinks.style.flexDirection = 'column';
     navLinks.style.position = 'absolute';
     navLinks.style.top = '78px';
     navLinks.style.left = '0';
     navLinks.style.width = '100%';
     navLinks.style.background = 'rgba(5, 8, 17, 0.98)';
     navLinks.style.padding = '20px';
  }
});

const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealElements.forEach(el => revealObserver.observe(el));


// --------------------------------------------------------
// 4. THREE.JS SCENE: EXACT MATCH FROM VIDEO [source: 23]
// Dimensional Nexus Orbit with Background Stars
// --------------------------------------------------------
const container = document.getElementById('canvas-container');
if(container) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const nexusGroup = new THREE.Group();
    scene.add(nexusGroup);

    // --- Starry Background (as seen in the video) ---
    const starGeo = new THREE.BufferGeometry();
    const starCount = 800;
    const starPos = new Float32Array(starCount * 3);
    for(let i=0; i<starCount*3; i++) {
        starPos[i] = (Math.random() - 0.5) * 200;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({color: 0xffffff, size: 0.2, transparent: true, opacity: 0.6});
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // --- Central Blue Planet / Core ---
    const coreGeo = new THREE.SphereGeometry(3.5, 32, 32);
    // Give it a solid glowing look
    const coreMat = new THREE.MeshBasicMaterial({ color: 0x55d9f4, transparent: true, opacity: 0.9 });
    const core = new THREE.Mesh(coreGeo, coreMat);
    
    // Add wireframe over it to match the tech look
    const wireGeo = new THREE.SphereGeometry(3.6, 16, 16);
    const wireMat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.3 });
    const wire = new THREE.Mesh(wireGeo, wireMat);
    core.add(wire);
    
    // Outer Glow sphere
    const glowGeo = new THREE.SphereGeometry(4.2, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({ color: 0x55d9f4, transparent: true, opacity: 0.15, blending: THREE.AdditiveBlending });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    
    nexusGroup.add(core);
    nexusGroup.add(glow);

    // --- Orbital Rings (Matched exactly to video colors/paths) ---
    const rings = [];
    // 1. Purple ring, 2. Green ring, 3. Cyan ring, 4. Thin white ring
    const ringConfigs = [
        { radius: 6.5, color: 0x8b7cff, planetColor: 0x8b7cff, speed: 0.004, rx: 1.2, ry: 0.5 },
        { radius: 8.5, color: 0x33ff99, planetColor: 0x33ff99, speed: 0.003, rx: -0.8, ry: 0.8 },
        { radius: 11, color: 0x55d9f4, planetColor: 0x55d9f4, speed: -0.002, rx: 0.5, ry: -0.5 },
        { radius: 13, color: 0xffffff, planetColor: null, speed: 0.001, rx: 1.5, ry: 0.2 } // Faint outer orbit
    ];
    
    ringConfigs.forEach(conf => {
        const rGroup = new THREE.Group();
        
        // The Ring Path
        const ringGeo = new THREE.TorusGeometry(conf.radius, 0.03, 16, 100);
        const ringMat = new THREE.MeshBasicMaterial({ color: conf.color, transparent: true, opacity: 0.6 });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        
        rGroup.add(ring);
        
        // Add a planet on the ring if configured
        if(conf.planetColor) {
            const planetGeo = new THREE.SphereGeometry(0.7, 16, 16);
            const planetMat = new THREE.MeshBasicMaterial({ color: conf.planetColor });
            const planet = new THREE.Mesh(planetGeo, planetMat);
            planet.position.set(conf.radius, 0, 0); 
            rGroup.add(planet);
        }
        
        // Set fixed orbital tilts to match video
        rGroup.rotation.x = conf.rx;
        rGroup.rotation.y = conf.ry;
        
        nexusGroup.add(rGroup);
        rings.push({ group: rGroup, speed: conf.speed });
    });

    camera.position.z = 32;
    // Shift model slightly to the right to match video composition
    nexusGroup.position.x = 2;
    
    // Mouse tracking for slight parallax
    let modelMouseX = 0, modelMouseY = 0;
    window.addEventListener('mousemove', (e) => {
        modelMouseX = (e.clientX / window.innerWidth) * 2 - 1;
        modelMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate core and background stars
        core.rotation.y += 0.002;
        wire.rotation.x += 0.001;
        stars.rotation.y += 0.0005;
        
        // Spin the individual orbital rings
        rings.forEach(r => {
            r.group.rotation.z += r.speed;
        });
        
        // Very slow overall rotation of the nexus
        nexusGroup.rotation.y += 0.001;
        
        // Camera Parallax
        camera.position.x += (modelMouseX * 5 - camera.position.x) * 0.05;
        camera.position.y += (modelMouseY * 5 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);
        
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        if (!container) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}

// --------------------------------------------------------
// 5. CHATBOT LOGIC
// --------------------------------------------------------
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotContainer = document.getElementById('chatbotContainer');
const closeChatBtn = document.getElementById('closeChatBtn');
const chatInput = document.getElementById('chatInput');
const sendChatBtn = document.getElementById('sendChatBtn');
const chatbotMessages = document.getElementById('chatbotMessages');

chatbotToggle.addEventListener('click', () => {
  chatbotContainer.classList.toggle('active');
});
closeChatBtn.addEventListener('click', () => {
  chatbotContainer.classList.remove('active');
});

const knowledgeBase = {
  "bitca": "BitCA v2.4 is the official tech club of the Department of Computer Applications at K.C. College, under HSNC University.",
  "visionexa": "Visionexa 2025 will be held tentatively on 23rd & 24th December 2025. It includes events like Hackathon, Roboverse, AlgoRush, FIFA, PUBG, and more!",
  "kc college": "K.C. College is a premier educational institution in Mumbai, under HSNC University.",
  "principal": "Dr. Tejashree V. Shanbhag is the I/C Principal of K.C. College. She has three decades of experience and guides numerous scholars.",
  "vc": "Dr. Hemlata K. Baghla is the Vice Chancellor of HSNC University. She holds a Ph.D. at 25, has over 200 published research papers, and holds the honorary rank of Colonel.",
  "geeta": "Ms. Geeta Brijwani is the Coordinator for BCA. With an M.Sc, M.Phil, and MBA, she has been integral in shaping the Computer Applications department.",
  "vice principal": "Our esteemed Vice Principals include Dr. Shalini R. Sinha, Dr. Rajesh Samant, and Dr. Ritika Pathak.",
  "hackathon": "The Hackathon will be on Day 1 at KMK College. Registration is ₹200. Build prototypes and win ₹2500 + a trophy!",
  "roboverse": "Roboverse lets you showcase AI and robotics projects on Day 1. Registration is required.",
  "squid game": "Squid Game is a 5-level challenge event including Ddakji, Blindfold Game, Flip Stones, Marbles, and Escape Room on Day 2!"
};

function addMessage(text, sender) {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('message', sender === 'user' ? 'user-message' : 'bot-message');
  msgDiv.textContent = text;
  chatbotMessages.appendChild(msgDiv);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function processInput() {
  const text = chatInput.value.trim().toLowerCase();
  if (!text) return;
  addMessage(chatInput.value, 'user');
  chatInput.value = '';

  setTimeout(() => {
    let response = "That's an interesting question! I am best equipped to answer questions about BitCA v2.4, Visionexa 2025 events (like Hackathon, Squid Game), K.C. College, and our faculty members. How can I help?";
    for (const key in knowledgeBase) {
      if (text.includes(key)) {
        response = knowledgeBase[key];
        break;
      }
    }
    addMessage(response, 'bot');
  }, 600);
}

sendChatBtn.addEventListener('click', processInput);
chatInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') processInput();
});
// --------------------------------------------------------
// GLOBAL 3D MULTIVERSE BACKGROUND (STARS & GALAXIES)
// --------------------------------------------------------
const bgCanvas = document.getElementById('bg-canvas');
if (bgCanvas) {
    const bgScene = new THREE.Scene();
    // Add some deep space fog to blend the edges smoothly
    bgScene.fog = new THREE.FogExp2(0x050811, 0.015);

    const bgCamera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    const bgRenderer = new THREE.WebGLRenderer({ canvas: bgCanvas, alpha: true, antialias: true });

    bgRenderer.setSize(window.innerWidth, window.innerHeight);
    bgRenderer.setPixelRatio(window.devicePixelRatio);

    const universeGroup = new THREE.Group();
    bgScene.add(universeGroup);

    // --- A. Create Galaxy Star Dust ---
    function createGalaxy(color, count, radius, size) {
        const geo = new THREE.BufferGeometry();
        const pos = new Float32Array(count * 3);
        
        for(let i = 0; i < count * 3; i += 3) {
            // Create a clustered/spherical distribution
            let r = radius * Math.pow(Math.random(), 1.5);
            let theta = Math.random() * 2 * Math.PI;
            let phi = Math.acos(2 * Math.random() - 1);
            
            pos[i] = r * Math.sin(phi) * Math.cos(theta);
            pos[i+1] = r * Math.sin(phi) * Math.sin(theta);
            pos[i+2] = r * Math.cos(phi);
        }

        geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        const mat = new THREE.PointsMaterial({ 
            size: size, 
            color: color, 
            transparent: true, 
            opacity: 0.8,
            blending: THREE.AdditiveBlending 
        });
        return new THREE.Points(geo, mat);
    }

    // Layer 1: Cyan Galaxy
    const cyanGalaxy = createGalaxy(0x55d9f4, 1500, 60, 0.15);
    // Layer 2: Purple Galaxy
    const purpleGalaxy = createGalaxy(0x8b7cff, 1500, 70, 0.1);

    universeGroup.add(cyanGalaxy);
    universeGroup.add(purpleGalaxy);

    // --- B. Create Deep Background Multiverse Orbs ---
    const orbColors = [0x55d9f4, 0x8b7cff, 0xff00c1, 0x33ff99];
    const orbs = [];
    for(let i=0; i<8; i++) {
        const orbGeo = new THREE.SphereGeometry(Math.random() * 3 + 1, 16, 16);
        const orbMat = new THREE.MeshBasicMaterial({
            color: orbColors[Math.floor(Math.random() * orbColors.length)],
            transparent: true,
            opacity: 0.15, // Very faint
            wireframe: true
        });
        const orb = new THREE.Mesh(orbGeo, orbMat);
        
        // Spread them far out in the background
        orb.position.set(
            (Math.random() - 0.5) * 150,
            (Math.random() - 0.5) * 150,
            -50 - Math.random() * 50
        );
        universeGroup.add(orb);
        orbs.push({
            mesh: orb,
            speedX: (Math.random() - 0.5) * 0.02,
            speedY: (Math.random() - 0.5) * 0.02
        });
    }

    bgCamera.position.z = 40;

    // Track mouse exclusively for the background gravity effect
    let bgMouseX = 0;
    let bgMouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    window.addEventListener('mousemove', (e) => {
        // Normalize coordinates from -1 to 1
        bgMouseX = (e.clientX / window.innerWidth) * 2 - 1;
        bgMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
        
        // Calculate how much the galaxy should tilt toward the mouse
        targetRotationY = bgMouseX * 0.5;
        targetRotationX = bgMouseY * 0.5;
    });

    // --- C. Unified Animation Loop ---
    function animateLiveBackground() {
        requestAnimationFrame(animateLiveBackground);
        
        // 1. PASSIVE: Continuous orbit of the galaxies
        cyanGalaxy.rotation.y += 0.001;
        cyanGalaxy.rotation.x += 0.0005;
        
        purpleGalaxy.rotation.y -= 0.0008;
        purpleGalaxy.rotation.z += 0.0004;

        // 2. PASSIVE: Float the background multiverse orbs
        orbs.forEach(orbData => {
            orbData.mesh.position.x += orbData.speedX;
            orbData.mesh.position.y += orbData.speedY;
            orbData.mesh.rotation.x += 0.005;
            orbData.mesh.rotation.y += 0.005;
            
            // Keep them bounded so they don't float away forever
            if(orbData.mesh.position.x > 100 || orbData.mesh.position.x < -100) orbData.speedX *= -1;
            if(orbData.mesh.position.y > 100 || orbData.mesh.position.y < -100) orbData.speedY *= -1;
        });

        // 3. ACTIVE: Cosmic Gravity (Mouse drags the galaxy axis smoothly)
        universeGroup.rotation.x += (targetRotationX - universeGroup.rotation.x) * 0.02;
        universeGroup.rotation.y += (targetRotationY - universeGroup.rotation.y) * 0.02;

        // 4. ACTIVE: Camera Parallax (Slight shift in perspective based on mouse)
        bgCamera.position.x += (bgMouseX * 15 - bgCamera.position.x) * 0.05;
        bgCamera.position.y += (bgMouseY * 15 - bgCamera.position.y) * 0.05;
        bgCamera.lookAt(0, 0, 0);
        
        bgRenderer.render(bgScene, bgCamera);
    }
    animateLiveBackground();

    // Handle Background Resize
    window.addEventListener('resize', () => {
        bgCamera.aspect = window.innerWidth / window.innerHeight;
        bgCamera.updateProjectionMatrix();
        bgRenderer.setSize(window.innerWidth, window.innerHeight);
    });
}
// --------------------------------------------------------
// 7. SEVEN UNIQUE 3D EVENT MODELS
// --------------------------------------------------------
function createMiniUniverse(containerId, modelType, colorHex) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.z = 4.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    let mesh;
    const material = new THREE.MeshBasicMaterial({ 
        color: colorHex, 
        wireframe: true, 
        transparent: true, 
        opacity: 0.8 
    });

    // Generate different geometries based on the Universe theme
    switch(modelType) {
        case 'tech':
            // Techverse: Icosahedron (Complex Tech Node)
            mesh = new THREE.Mesh(new THREE.IcosahedronGeometry(1.4, 0), material);
            break;
        case 'game':
            // Gameverse: Octahedron (RPG Gem / Crystal)
            mesh = new THREE.Mesh(new THREE.OctahedronGeometry(1.5, 0), material);
            break;
        case 'vibe':
            // Vibeverse: Torus Knot (Flowing Music/Vibe)
            mesh = new THREE.Mesh(new THREE.TorusKnotGeometry(0.9, 0.25, 64, 8), material);
            break;
        case 'ai':
            // AIverse: Dodecahedron (AI Logic Brain)
            mesh = new THREE.Mesh(new THREE.DodecahedronGeometry(1.3, 0), material);
            break;
        case 'cyber':
            // Cyberverse: Cylinder (Data Stream / Firewall)
            mesh = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 2.2, 12, 4, true), material);
            break;
        case 'human':
            // Humanverse: Interlocking Rings (DNA / Connection)
            mesh = new THREE.Group();
            const ring1 = new THREE.Mesh(new THREE.TorusGeometry(1, 0.15, 16, 32), material);
            const ring2 = new THREE.Mesh(new THREE.TorusGeometry(1, 0.15, 16, 32), material);
            ring1.rotation.x = Math.PI / 2;
            mesh.add(ring1);
            mesh.add(ring2);
            break;
        case 'meta':
            // Metaverse: Sphere inside a Ring (VR Portal / Eye)
            mesh = new THREE.Group();
            const core = new THREE.Mesh(new THREE.SphereGeometry(0.7, 8, 8), material);
            const outerRing = new THREE.Mesh(new THREE.RingGeometry(1.2, 1.4, 16), material);
            outerRing.rotation.x = Math.PI / 2;
            mesh.add(core);
            mesh.add(outerRing);
            break;
    }

    scene.add(mesh);

    // Give each model a slightly different spin axis
    const speedX = (Math.random() * 0.01) + 0.005;
    const speedY = (Math.random() * 0.015) + 0.01;

    function animate() {
        requestAnimationFrame(animate);
        mesh.rotation.x += speedX;
        mesh.rotation.y += speedY;
        
        // Add a gentle hover effect
        mesh.position.y = Math.sin(Date.now() * 0.003) * 0.15;

        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        if (!container) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}

// Initialize the 7 unique models with the specific colors of each universe
setTimeout(() => {
    createMiniUniverse('canvas-univ-1', 'tech', 0x55d9f4);  // Cyan
    createMiniUniverse('canvas-univ-2', 'game', 0xff3366);  // Pink
    createMiniUniverse('canvas-univ-3', 'vibe', 0x33ff99);  // Green
    createMiniUniverse('canvas-univ-4', 'ai', 0xffaa00);    // Orange
    createMiniUniverse('canvas-univ-5', 'cyber', 0xaa33ff); // Purple
    createMiniUniverse('canvas-univ-6', 'human', 0xffff33); // Yellow
    createMiniUniverse('canvas-univ-7', 'meta', 0xffffff);  // White
}, 500); // Slight delay to ensure DOM is fully loaded

// --------------------------------------------------------
// 8. SCROLL-DRIVEN EDITORIAL LAYOUT
// Sections subtly scale and shift as they pass through the viewport.
// --------------------------------------------------------
(() => {
  const progress = document.getElementById('scrollProgress');
  const scenes = [...document.querySelectorAll('.scroll-scene')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function updateScrollExperience() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    if (progress) progress.style.width = `${ratio * 100}%`;

    if (reducedMotion) return;
    const viewportCenter = window.innerHeight * 0.52;

    scenes.forEach((scene) => {
      const rect = scene.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const distance = Math.min(1, Math.abs(center - viewportCenter) / (window.innerHeight * 0.9));
      const focus = 1 - distance;
      scene.classList.toggle('scene-active', focus > 0.45);

      const heading = scene.querySelector('.section-heading');
      if (heading) {
        const shift = (rect.top / Math.max(window.innerHeight, 1)) * -8;
        heading.style.transform = `translate3d(0, ${Math.max(-10, Math.min(10, shift))}px, 0) scale(${0.985 + focus * 0.015})`;
      }

      scene.style.setProperty('--scene-progress', focus.toFixed(3));
    });
  }

  let scheduled = false;
  function onScroll() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      updateScrollExperience();
      scheduled = false;
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  updateScrollExperience();
})();
/* ==========================================
   BITCA — LIVE SCROLL ANIMATION ENGINE
   Add this at the END of script.js
========================================== */

(() => {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const sections = document.querySelectorAll(".scroll-scene");

  if (!sections.length) return;

  // Add interactive classes to existing content.
  sections.forEach((section) => {
    const heading = section.querySelector(".section-heading h2");

    if (heading) {
      heading.classList.add("scroll-live-heading");
    }

    const animatedElements = section.querySelectorAll(
      ".about-content, .person-card, .feature-card"
    );

    animatedElements.forEach((element, index) => {
      element.classList.add("scroll-live");

      // Stagger the entrance animation.
      if (element.classList.contains("person-card") ||
          element.classList.contains("feature-card")) {
        element.classList.add("scroll-live-enter");
        element.style.transitionDelay = `${(index % 4) * 70}ms`;
      }
    });
  });

  // Reveal elements when they enter the viewport.
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("live-entered");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -35px 0px"
    }
  );

  document.querySelectorAll(".scroll-live-enter").forEach((element) => {
    revealObserver.observe(element);
  });

  if (reduceMotion) {
    document.querySelectorAll(".scroll-live-enter").forEach((element) => {
      element.classList.add("live-entered");
    });
    return;
  }

  let animationFrame = null;

  // Keep the current section responsive to scroll position.
  function updateLiveEffects() {
    animationFrame = null;

    const viewportHeight = window.innerHeight;
    const viewportCenter = viewportHeight * 0.5;

    const progress = window.scrollY /
      Math.max(1, document.documentElement.scrollHeight - viewportHeight);

    document.documentElement.style.setProperty(
      "--live-scroll-progress",
      Math.max(0, Math.min(1, progress))
    );

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();

      // Normalized position: -1 above the viewport, 0 at center, +1 below.
      const sectionCenter = rect.top + rect.height / 2;
      const distance = (sectionCenter - viewportCenter) / viewportHeight;
      const proximity = Math.max(0, 1 - Math.abs(distance));

      section.classList.toggle(
        "scene-active",
        rect.top < viewportCenter && rect.bottom > viewportCenter
      );

      section.style.setProperty("--scene-glow", proximity.toFixed(2));

      const sectionElements = section.querySelectorAll(
        ".about-content, .person-card, .feature-card"
      );

      sectionElements.forEach((element, index) => {
        const itemRect = element.getBoundingClientRect();
        const itemCenter = itemRect.top + itemRect.height / 2;
        const itemDistance = (itemCenter - viewportCenter) / viewportHeight;

        // Animate most strongly near the center of the viewport.
        const intensity = Math.max(
          0,
          1 - Math.min(1, Math.abs(itemDistance) / 0.9)
        );

        // Elements gently rise and settle as the viewer scrolls.
        const shift = Math.max(
          -15,
          Math.min(15, itemDistance * -12)
        );

        // A restrained size change prevents distracting jumps.
        const scale = 0.985 + intensity * 0.025;

        // Slightly vary card shapes as they move through the viewport.
        const radius = 12 + intensity * 14;

        // Alternate subtle rotation for a more organic layout.
        const rotation =
          element.classList.contains("person-card") &&
          window.innerWidth > 700
            ? Math.sin(index * 1.7) * intensity * 1.1
            : 0;

        element.style.setProperty("--live-shift", `${shift.toFixed(2)}px`);
        element.style.setProperty("--live-scale", scale.toFixed(3));
        element.style.setProperty("--live-radius", `${radius.toFixed(1)}px`);
        element.style.setProperty("--live-rotate", `${rotation.toFixed(2)}deg`);
      });

      // Make the main heading subtly change its typography.
      const heading = section.querySelector(".section-heading h2");

      if (heading) {
        const spacing = -0.055 + proximity * 0.018;

        heading.style.setProperty(
          "--live-spacing",
          `${spacing.toFixed(3)}em`
        );
      }
    });
  }

  function requestLiveUpdate() {
    if (animationFrame === null) {
      animationFrame = requestAnimationFrame(updateLiveEffects);
    }
  }

  window.addEventListener("scroll", requestLiveUpdate, { passive: true });
  window.addEventListener("resize", requestLiveUpdate, { passive: true });

  // Pointer-responsive glow within each section.
  sections.forEach((section) => {
    section.addEventListener("pointermove", (event) => {
      const rect = section.getBoundingClientRect();

      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;

      section.style.setProperty("--scene-mouse-x", `${x}%`);
      section.style.setProperty("--scene-mouse-y", `${y}%`);
    }, { passive: true });
  });

  // Set correct initial positions when the page loads.
  updateLiveEffects();
})();
/* BITCA — Scroll choreography inspired by Aurora */

(() => {
  const sections = [...document.querySelectorAll(".scroll-scene")];

  if (!sections.length) return;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // Reveal existing content in a staggered sequence.
  const revealItems = document.querySelectorAll(
    ".scroll-scene .section-heading, " +
    ".scroll-scene .about-content, " +
    ".scroll-scene .person-card, " +
    ".scroll-scene .feature-card"
  );

  revealItems.forEach((item, index) => {
    item.classList.add("scroll-reveal-item");
    item.style.transitionDelay = `${(index % 5) * 65}ms`;
  });

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -25px 0px"
    }
  );

  revealItems.forEach((item) => revealObserver.observe(item));

  if (reduceMotion) return;

  let framePending = false;

  function updateChoreography() {
    framePending = false;

    const viewportHeight = window.innerHeight;
    const viewportCenter = viewportHeight * 0.5;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const center = rect.top + rect.height * 0.5;

      // 1 = section near viewport center; 0 = far away.
      const focus = Math.max(
        0,
        1 - Math.abs(center - viewportCenter) / (viewportHeight * 0.85)
      );

      section.style.setProperty("--scene-focus", focus.toFixed(3));

      section.classList.toggle(
        "scene-active",
        rect.top < viewportCenter && rect.bottom > viewportCenter
      );

      // Keep typography motion subtle and avoid layout jumps.
      const heading = section.querySelector(".section-heading");

      if (heading) {
        const offset = Math.max(
          -12,
          Math.min(12, (rect.top / viewportHeight) * -10)
        );

        heading.style.translate = `0 ${offset * focus}px`;
      }

      // Add gentle depth to event and profile content.
      section.querySelectorAll(
        ".person-card, .feature-card"
      ).forEach((card, index) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.top + cardRect.height * 0.5;
        const distance = (cardCenter - viewportCenter) / viewportHeight;

        const depth = Math.max(-7, Math.min(7, distance * -7));
        const scale = 0.99 + Math.max(0, 1 - Math.abs(distance)) * 0.012;

        // Individual CSS properties preserve the existing 3D tilt transform.
        card.style.translate = `0 ${depth}px`;
        card.style.scale = `${scale}`;

        if (card.classList.contains("feature-card")) {
          card.style.setProperty(
            "--card-scroll-focus",
            Math.max(0, 1 - Math.abs(distance)).toFixed(2)
          );
        }
      });
    });
  }

  function requestUpdate() {
    if (framePending) return;

    framePending = true;
    requestAnimationFrame(updateChoreography);
  }

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate, { passive: true });

  // Pointer glow follows the visitor inside each section.
  sections.forEach((section) => {
    section.addEventListener("pointermove", (event) => {
      const rect = section.getBoundingClientRect();

      section.style.setProperty(
        "--glow-x",
        `${((event.clientX - rect.left) / rect.width) * 100}%`
      );

      section.style.setProperty(
        "--glow-y",
        `${((event.clientY - rect.top) / rect.height) * 100}%`
      );
    }, { passive: true });
  });

  updateChoreography();
})();

// --------------------------------------------------------
// 9. MULTIVERSE EVENT PORTAL + REGISTRATION APPLICATION
// --------------------------------------------------------
(() => {
  const universes = {
    tech: { name:'Techverse', number:'01', label:'INNOVATION', color:'#55d9f4', desc:'Build, break, debug and create. Techverse brings together coders and problem-solvers ready to turn ideas into working prototypes.', events:[
      ['Visionexa Hackathon','A team-based prototype development sprint.'],['AlgoRush','Speed coding, algorithms and logical problem-solving.'],['Code Breach','A code analysis and debugging challenge.'] ]},
    game: { name:'Gameverse', number:'02', label:'PLAY & COMPETITION', color:'#ff4c78', desc:'Enter the arena for console competition, tactical play and survival-based gaming challenges.', events:[
      ['Console Esports (FIFA / Tekken)','Console knockout competition.'],['Battle Royale Showdown','Squad-based battle royale tournament.'],['FIFA / PUBG / Squid Game','Gaming and survival challenges across formats.'] ]},
    vibe: { name:'Vibeverse', number:'03', label:'EXPRESSION', color:'#33ff99', desc:'A dimension for performance, sound, movement and creative expression. Bring your energy to the stage.', events:[
      ['Visionexa Spotlight','Open stage for music, dance and talent.'],['Street Cypher & Crew Battle','Solo and crew choreography showdown.'],['Acoustic & Band Jam','Live vocal and instrumental showcase.'] ]},
    ai: { name:'AIverse', number:'04', label:'INTELLIGENCE', color:'#ffaa45', desc:'Explore the creative and technical edge of artificial intelligence, robotics and human-AI collaboration.', events:[
      ['Roboverse & AI Showcase','AI projects, robotics and hardware showcase.'],['Prompt & Generative Jam','Human-AI co-creation challenge.'],['Turing Limit Debate','Debate AI capabilities, limits and ethics.'] ]},
    cyber: { name:'Cyberverse', number:'05', label:'DIGITAL SURVIVAL', color:'#aa80ff', desc:'Think like an investigator. Navigate digital clues, privacy puzzles and security challenges.', events:[
      ['Hidden Trail Treasure Hunt','Clue-led treasure hunt across the campus.'],['Capture The Flag (CTF)','Cryptography, OSINT and security puzzles.'],['Cyber Escape Room','Solve the breach before time runs out.'],['Digital Footprint Lab','Explore privacy and identity protection.'] ]},
    human: { name:'Humanverse', number:'06', label:'HUMAN IDENTITY', color:'#ffe45e', desc:'Challenge instinct, teamwork, creativity and human decision-making through live experiences and creative competition.', events:[
      ['Squid & Survival Trials','A multi-stage survival and strategy challenge.'],['Hidden Trail Treasure Hunt','Follow clues, solve riddles and reach the finish.'],['VisionCraft Poster & Art','Original visual storytelling and art challenge.'] ]},
    meta: { name:'Metaverse', number:'07', label:'MIXED REALITY', color:'#f1f5ff', desc:'Step beyond the screen into immersive experiences, virtual worlds and interactive reality demonstrations.', events:[
      ['VR Experience Zone','Explore immersive virtual reality experiences.'],['Mixed Reality Showcase','Discover interactive AR and mixed-reality demos.'],['Immersive World Challenge','Explore a virtual environment through guided tasks.'] ]}
  };
  const panel = document.getElementById('universePanel');
  const scrim = document.getElementById('universeScrim');
  const modal = document.getElementById('registrationModal');
  if (!panel || !modal) return;
  let activeUniverse = null;
  const closePanel = () => { panel.classList.remove('open'); scrim.classList.remove('open'); panel.setAttribute('aria-hidden','true'); };
  const closeRegistration = () => { modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); document.body.classList.remove('modal-open'); };
  function openUniverse(id, sourcePlanet) {
    const data = universes[id]; if (!data) return;
    activeUniverse = id;
    panel.style.setProperty('--panel-color', data.color);
    document.getElementById('panelKicker').textContent = `UNIVERSE ${data.number} / ${data.label}`;
    document.getElementById('panelTitle').textContent = data.name;
    document.getElementById('panelDescription').textContent = data.desc;
    document.getElementById('panelOrb').textContent = ['✦','◈','♫','⌘','⬡','✧','◎'][Number(data.number)-1];
    document.getElementById('panelEventCount').textContent = `${String(data.events.length).padStart(2,'0')} EVENTS`;
    const list = document.getElementById('panelEvents'); list.replaceChildren();
    data.events.forEach((event, index) => {
      const article = document.createElement('article'); article.className = 'panel-event';
      const info = document.createElement('div'); const title = document.createElement('h4'); title.textContent = event[0];
      const desc = document.createElement('p'); desc.textContent = event[1]; info.append(title, desc);
      const btn = document.createElement('button'); btn.type='button'; btn.className='event-register'; btn.textContent='REGISTER ↗';btn.addEventListener('click', () =>openRegistration(id, event[0], index + 1, article));
      article.append(info, btn); list.appendChild(article);
    });
    panel.classList.add('open');
    
    // Calculate the clicked planet's position relative to the panel
    if (sourcePlanet) {
      const planetRect = sourcePlanet.getBoundingClientRect();

      const originX =
        panel.offsetWidth / 2 +
        planetRect.left +
        planetRect.width / 2 -
        window.innerWidth / 2;

      const originY =
        panel.offsetHeight / 2 +
        planetRect.top +
        planetRect.height / 2 -
        window.innerHeight / 2;

      panel.style.setProperty('--origin-x', `${originX}px`);
      panel.style.setProperty('--origin-y', `${originY}px`);
    }
 
    scrim.classList.add('open'); panel.setAttribute('aria-hidden','false');
  }
  function openRegistration(id, eventName, eventNo, sourceEvent) {
    const data = universes[id];
    if (!data) return;

    document.getElementById('registrationUniverse').textContent =
      `${data.name.toUpperCase()} / EVENT ${String(eventNo).padStart(2, '0')}`;
    document.getElementById('registrationTitle').textContent = eventName;
    document.getElementById('registrationEvent').value = `${data.name} — ${eventName}`;
    document.getElementById('registrationFeedback').textContent = '';
    modal.style.setProperty('--panel-color', data.color);

    // Expand the registration card from the event that was clicked.
    const card = modal.querySelector('.registration-card');
    if (sourceEvent && card) {
      const eventRect = sourceEvent.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();

      card.style.setProperty(
        '--origin-x',
        `${eventRect.left + eventRect.width / 2 - cardRect.left}px`
      );
      card.style.setProperty(
        '--origin-y',
        `${eventRect.top + eventRect.height / 2 - cardRect.top}px`
      );
    }

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');

    setTimeout(() => {
      modal.querySelector('input[name="fullName"]')?.focus();
    }, 80);
  }
  document.querySelectorAll('.universe-node').forEach(node => {
  node.addEventListener('click', () => {
    openUniverse(node.dataset.universe, node);
  });
});
  document.getElementById('panelClose').addEventListener('click', closePanel);
  document.getElementById('panelReturn').addEventListener('click', closePanel);
  scrim.addEventListener('click', closePanel);
  document.getElementById('registrationClose').addEventListener('click', closeRegistration);
  modal.addEventListener('click', e => { if (e.target === modal) closeRegistration(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeRegistration(); closePanel(); } });
  document.getElementById('eventRegistrationForm').addEventListener('submit', e => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    const values = Object.fromEntries(new FormData(form).entries());
    document.getElementById('registrationFeedback').textContent = `Application preview ready for ${values.fullName}. No data was sent or saved; connect an official registration form or backend to receive registrations.`;
  });
})();


// --------------------------------------------------------
// 9. EVENT MULTIVERSE — home-scene style 3D orbital system
// Each world follows its own inclined ellipse and rotation direction.
// Pointer movement tilts the complete system and the individual orbit planes.
// --------------------------------------------------------
(() => {
  const stage = document.querySelector('.universe-stage');
  if (!stage) return;

  const nodes = [...stage.querySelectorAll('.universe-node')];
  if (nodes.length !== 7) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
  const scroll = { progress: 0, target: 0, impulse: 0, lastY: window.scrollY };
  const core = stage.querySelector('.universe-core');
  const orbitSpecs = [
  { rx:  1.10, ry:  0.25, rz: -0.20, speed:  0.0030, radius: 1.00, phase: 0.0 },
  { rx: -0.85, ry:  0.75, rz:  0.35, speed: -0.0025, radius: 0.88, phase: 0.9 },
  { rx:  0.55, ry: -0.90, rz: -0.55, speed:  0.0022, radius: 0.76, phase: 1.8 },
  { rx:  1.35, ry:  0.15, rz:  0.65, speed: -0.0028, radius: 0.64, phase: 2.7 },
  { rx: -0.50, ry: -1.05, rz:  0.25, speed:  0.0024, radius: 0.52, phase: 3.6 },
  { rx:  0.90, ry:  0.85, rz: -0.75, speed: -0.0020, radius: 0.40, phase: 4.5 },
  { rx: -1.20, ry:  0.40, rz:  0.80, speed:  0.0018, radius: 0.28, phase: 5.4 }
];
  const orbitColors = ['#55d9f4','#ff4c78','#33ff99','#ffaa45','#aa80ff','#ffe45e','#f1f5ff'];
  const orbitEls = [];
  const worlds = nodes.map((node, index) => {
    const spec = orbitSpecs[index];
    const orbit = document.createElement('div');
    orbit.className = 'world-orbit-path';
    orbit.setAttribute('aria-hidden', 'true');
    orbit.style.setProperty('--orbit-color', orbitColors[index]);
    stage.insertBefore(orbit, node);
    orbitEls.push(orbit);
    node.style.setProperty('--node-color', orbitColors[index]);
    node.dataset.hoverScale = '1';
    node.addEventListener('pointerenter', () => { node.dataset.hoverScale = '1.10'; });
    node.addEventListener('pointerleave', () => { node.dataset.hoverScale = '1'; });
    node.addEventListener('focusin', () => { node.dataset.hoverScale = '1.10'; });
    node.addEventListener('focusout', () => { node.dataset.hoverScale = '1'; });
    return { node, orbit, spec, angle: spec.phase, index, hoverScale: 1 };
  });

  stage.addEventListener('pointermove', event => {
    const rect = stage.getBoundingClientRect();
    pointer.targetX = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width - .5) * 2));
    pointer.targetY = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height - .5) * 2));
  }, { passive: true });
  stage.addEventListener('pointerleave', () => { pointer.targetX = 0; pointer.targetY = 0; });

  function updateScroll() {
    const rect = stage.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    scroll.target = Math.max(0, Math.min(1, (vh - rect.top) / (vh + rect.height)));
    const delta = window.scrollY - scroll.lastY;
    scroll.impulse = Math.max(-1, Math.min(1, delta / 40));
    scroll.lastY = window.scrollY;
  }
  window.addEventListener('scroll', updateScroll, { passive: true });
  window.addEventListener('resize', updateScroll, { passive: true });
  updateScroll();

  function rotatePoint(x, y, z, rx, ry, rz) {
    // Match the CSS transform order used by .world-orbit-path.
    // CSS applies the right-most rotation first: Z, then Y, then X.
    const cz = Math.cos(rz), sz = Math.sin(rz);
    const x1 = x * cz - y * sz;
    const y1 = x * sz + y * cz;

    const cy = Math.cos(ry), sy = Math.sin(ry);
    const x2 = x1 * cy + z * sy;
    const z2 = -x1 * sy + z * cy;

    const cx = Math.cos(rx), sx = Math.sin(rx);
    return {
      x: x2,
      y: y1 * cx - z2 * sx,
      z: y1 * sx + z2 * cx
    };
  }

  let lastTime = 0;
  function animate(time) {
    requestAnimationFrame(animate);
    const dt = Math.min(2.5, (time - (lastTime || time)) / 16.67);
    lastTime = time;
    pointer.x += (pointer.targetX - pointer.x) * .045;
    pointer.y += (pointer.targetY - pointer.y) * .045;
    scroll.progress += (scroll.target - scroll.progress) * .035;
    scroll.impulse *= .91;

    const rect = stage.getBoundingClientRect();
    const compact = window.innerWidth < 700;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const baseRX = Math.min(rect.width * (compact ? .39 : .43), compact ? 205 : 470);
    const baseRY = Math.min(rect.height * (compact ? .35 : .39), compact ? 205 : 265);
    const mouseTiltX = reduceMotion ? 0 : pointer.y * 0.85;
    const mouseTiltY = reduceMotion ? 0 : pointer.x * 1.00;
    const mouseTiltZ = reduceMotion ? 0 : pointer.x * 0.20; 

    stage.style.transform = reduceMotion ? 'none' :
      `perspective(1300px) rotateX(${pointer.y * -5.5}deg) rotateY(${pointer.x * 7}deg) scale(${.99 + scroll.progress * .025})`;

    worlds.forEach(({ node, orbit, spec }, index) => {
      if (!reduceMotion) {
        spec && (worlds[index].angle += spec.speed * dt * (1 + scroll.progress * .65 + Math.abs(scroll.impulse) * .25));
      }
      const a = worlds[index].angle;
      const rx = spec.rx + mouseTiltX * .62;
      const ry = spec.ry + mouseTiltY * .62;
      const rz = spec.rz + mouseTiltZ + pointer.x * .06 * (index % 2 ? -1 : 1);
      const radiusX = baseRX * spec.radius;
      const radiusY = baseRY * (1.08 - spec.radius * .18);

      // Each orbit is its own tilted 3D ellipse, like the homepage nexus rings.
      orbit.style.width = `${radiusX * 2}px`;
      orbit.style.height = `${radiusY * 2}px`;
      // Use the exact same angles as the planet position calculation.
      orbit.style.transform = `translate(-50%, -50%) rotateX(${rx * 57.2958}deg) rotateY(${ry * 57.2958}deg) rotateZ(${rz * 57.2958}deg)`;
      orbit.style.opacity = String(.34 + (Math.sin(a) + 1) * .12);

      const point = rotatePoint(Math.cos(a) * radiusX, Math.sin(a) * radiusY, 0, rx, ry, rz);
      // Preserve the calculated 3D depth so front/back sizing follows the orbit.
      const depth = Math.max(-1, Math.min(1, point.z / Math.max(baseRX, baseRY)));
      const depth01 = (depth + 1) / 2;

      // Back planets are smaller; front planets are larger
      const minScale = compact ? 0.48 : 0.56;
      const maxScale = compact ? 0.90 : 1.02;

      const baseScale =
        minScale +
        depth01 * (maxScale - minScale) +
        scroll.progress * 0.025;
      // Ease hover scaling in/out without interrupting the orbital motion.
      const targetHoverScale = Number(node.dataset.hoverScale || 1);
      worlds[index].hoverScale += (targetHoverScale - worlds[index].hoverScale) * (reduceMotion ? 1 : 0.16 * dt);
      const scale = baseScale * worlds[index].hoverScale;
      node.style.setProperty('transform', `translate(-50%, -50%) scale(${scale})`, 'important');
      node.style.left = `${cx + point.x}px`;
      node.style.top = `${cy + point.y}px`;
      node.style.right = 'auto';
      node.style.bottom = 'auto';
      node.style.zIndex = String(4 + Math.round(depth01 * 8));
      node.style.opacity = String(.76 + depth01 * .24);
      node.style.filter = `brightness(${.78 + depth01 * .32}) drop-shadow(0 0 ${9 + depth01 * 15}px ${orbitColors[index]}35)`;
      node.style.pointerEvents = 'auto';
    });

    if (core) {
      core.style.transform = `translate(calc(-50% + ${pointer.x * 8}px), calc(-50% + ${pointer.y * 7}px)) scale(${1 + scroll.progress * .05})`;
    }
  }
  requestAnimationFrame(animate);
})();