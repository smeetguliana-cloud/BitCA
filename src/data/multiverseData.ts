export interface EventItem {
  id: string;
  title: string;
  category: 'Competition' | 'Workshop' | 'Exhibition' | 'Challenge';
  tagline: string;
  description: string;
  schedule: string;
  venue: string;
  prizePool?: string;
  teamSize: string;
  entryFee: string;
  rules: string[];
  status: 'Conducted' | 'Registrations Open' | 'Upcoming';
  coordinator?: string;
}

export interface UniverseSystem {
  id: string;
  number: string;
  name: string;
  sector: string;
  title: string;
  colorHex: number;
  colorStr: string;
  accentStr: string;
  glowColor: string;
  shortDesc: string;
  lore: string;
  stats: {
    syncRate: string;
    atmosphere: string;
    gravitationalPull: string;
    eventsConducted: number;
  };
  // 3D Spatial Multiverse Coordinates
  position: [number, number, number];
  targetCameraOffset: [number, number, number];
  astronomicalClass: string;
  phenomenon: 'barred_spiral' | 'colliding_starburst' | 'resonant_nebula' | 'neural_cluster' | 'gravitational_void' | 'grand_spiral' | 'prismatic_rift';
  galaxyRadius: number;
  coreRadius: number;
  armCount: number;
  starCount: number;
  rotationSpeed: number; // slow majestic rotation of the galaxy
  tiltX: number;
  tiltZ: number;
  events: EventItem[];
}

export const UNIVERSES: UniverseSystem[] = [
  {
    id: 'tech',
    number: '01',
    name: 'Techverse',
    sector: 'SECTOR-01 // INNOVATION & CODE',
    title: 'The Crystalline Forge of Code',
    colorHex: 0x55d9f4,
    colorStr: '#55d9f4',
    accentStr: '#80e9ff',
    glowColor: 'rgba(85, 217, 244, 0.45)',
    shortDesc: 'Build, break, debug and create. A glowing cybernetic planet dedicated to programming, algorithms, and prototype development.',
    lore: 'Forged from living algorithmic crystals and interconnected computing lattices, Techverse serves as the primary computational mainframe of the Multiverse.',
    stats: {
      syncRate: '99.4%',
      atmosphere: 'Nitrogen-Silicon Vapor',
      gravitationalPull: '1.02 G',
      eventsConducted: 4,
    },
    position: [-75, 22, -95],
    targetCameraOffset: [0, 8, 22],
    astronomicalClass: 'Barred Starburst Spiral Galaxy',
    phenomenon: 'barred_spiral',
    galaxyRadius: 18,
    coreRadius: 3.2,
    armCount: 2,
    starCount: 2200,
    rotationSpeed: 0.04,
    tiltX: 0.35,
    tiltZ: -0.22,
    events: [
      {
        id: 'hackathon',
        title: 'Visionexa 24h Hackathon',
        category: 'Competition',
        tagline: 'Turn ambitious ideas into functional prototypes within 24 hours.',
        description: 'A team-based prototype development sprint where students solve real-world problems using modern tech stacks, AI, and scalable cloud architectures.',
        schedule: 'Day 1 • 10:00 AM – Day 2 • 10:00 AM',
        venue: 'KMK College Labs / HSNC Innovation Hub',
        prizePool: '₹15,000 + Trophy + Certificate',
        teamSize: '2 - 4 Members',
        entryFee: '₹200 per team',
        rules: [
          'All code must be created during the official hackathon duration.',
          'Open-source libraries and APIs are permitted; pre-built proprietary software is not.',
          'Live working prototype presentation before the judging panel.'
        ],
        status: 'Registrations Open',
        coordinator: 'Shania Gomez & Samuel Bhowmik'
      },
      {
        id: 'algorush',
        title: 'AlgoRush Speed Coding',
        category: 'Competition',
        tagline: 'High-velocity algorithm sprint against the clock.',
        description: 'Compete in rapid-fire algorithmic problem solving, logic puzzles, and computational speed tests across multiple difficulty brackets.',
        schedule: 'Day 1 • 2:00 PM – 4:30 PM',
        venue: 'BCA Lab 304',
        prizePool: '₹6,000 + Tech Merch',
        teamSize: 'Solo',
        entryFee: '₹50',
        rules: [
          'Languages accepted: C++, Java, Python, JavaScript.',
          'Strict plagiarism checking via automatic AST analysis.',
          'Points awarded based on correctness, space, and time complexity.'
        ],
        status: 'Registrations Open'
      },
      {
        id: 'code-breach',
        title: 'Code Breach: Bug Bounty',
        category: 'Challenge',
        tagline: 'Hunt, dissect, and patch critical vulnerabilities in broken systems.',
        description: 'Participants are provided buggy codebases and live broken endpoints. The objective: detect memory leaks, race conditions, logic errors, and patch them.',
        schedule: 'Day 2 • 11:30 AM – 1:30 PM',
        venue: 'Tech Arena 2',
        prizePool: '₹4,500',
        teamSize: 'Solo / Duo',
        entryFee: '₹100',
        rules: [
          'Fixes must pass all regression unit tests.',
          'Bonus points for clean refactoring and security explanations.'
        ],
        status: 'Registrations Open'
      },
      {
        id: 'web3-forge',
        title: 'NextGen Web & Cloud Workshop',
        category: 'Workshop',
        tagline: 'Hands-on masterclass building edge-deployed applications.',
        description: 'Master modern full-stack development, distributed edge computing, and AI-assisted engineering with industry leaders.',
        schedule: 'Day 1 • 11:00 AM – 1:00 PM',
        venue: 'Seminar Hall 1',
        teamSize: 'Open to All',
        entryFee: 'Free for BitCA Members',
        rules: [
          'Bring your own laptop with Node.js and Git installed.',
          'Certificate of participation awarded to all attendees.'
        ],
        status: 'Conducted'
      }
    ]
  },
  {
    id: 'game',
    number: '02',
    name: 'Gameverse',
    sector: 'SECTOR-02 // PLAY & ESPORTS ARENA',
    title: 'The Crucible of Tactical Combat',
    colorHex: 0xff3b69,
    colorStr: '#ff3b69',
    accentStr: '#ff6b8f',
    glowColor: 'rgba(255, 59, 105, 0.45)',
    shortDesc: 'Enter the competitive battleground for console esports, battle royale showdowns, and tactical survival challenges.',
    lore: 'A volcanic planet of radiant magma rivers and kinetic arena platforms where reflexes, team coordination, and strategic grit define victory.',
    stats: {
      syncRate: '98.7%',
      atmosphere: 'Ionized Plasma Glow',
      gravitationalPull: '1.15 G',
      eventsConducted: 4,
    },
    position: [95, -28, -125],
    targetCameraOffset: [0, 9, 24],
    astronomicalClass: 'Interacting Starburst Galaxy Pair',
    phenomenon: 'colliding_starburst',
    galaxyRadius: 20,
    coreRadius: 3.6,
    armCount: 3,
    starCount: 2400,
    rotationSpeed: 0.05,
    tiltX: -0.42,
    tiltZ: 0.28,
    events: [
      {
        id: 'fifa-championship',
        title: 'Console Esports: FIFA 25',
        category: 'Competition',
        tagline: 'The ultimate virtual football tournament on PlayStation 5 consoles.',
        description: 'Knockout bracket tournament on 4K tournament monitors with commentary, custom squads, and standard competitive settings.',
        schedule: 'Day 1 • 12:00 PM onwards',
        venue: 'Esports Arena Stage',
        prizePool: '₹8,000 + Golden Boots Trophy',
        teamSize: '1v1',
        entryFee: '₹150',
        rules: [
          'Match duration: 6 minutes half length, Legendary difficulty.',
          'Club teams only; 95 overall mode activated for parity.'
        ],
        status: 'Registrations Open'
      },
      {
        id: 'tekken-clash',
        title: 'Tekken 8: Iron Fist Showdown',
        category: 'Competition',
        tagline: 'Double-elimination arcade fighting championship.',
        description: 'Bring your fight sticks or controllers and battle through intense best-of-3 rounds for the Iron Fist Championship crown.',
        schedule: 'Day 2 • 1:00 PM – 4:00 PM',
        venue: 'Esports Arena Stage',
        prizePool: '₹5,000',
        teamSize: '1v1',
        entryFee: '₹100',
        rules: ['Double elimination format; winners and losers brackets.'],
        status: 'Registrations Open'
      },
      {
        id: 'battle-royale',
        title: 'Battle Royale Squad Blitz (BGMI / PUBG)',
        category: 'Competition',
        tagline: 'Survival of the quickest squad in Erangel and Sanhok.',
        description: 'Custom lobby tournament featuring 25 squads battling across classic maps with live projector spectator feeds and casters.',
        schedule: 'Day 1 • 3:30 PM – 6:30 PM',
        venue: 'Main Auditorium Gaming Wing',
        prizePool: '₹10,000',
        teamSize: '4 Players Squad',
        entryFee: '₹200 per squad',
        rules: [
          'Mobile devices only (no emulators or triggers permitted).',
          'Official scoring: Placement points + kill multipliers.'
        ],
        status: 'Registrations Open'
      },
      {
        id: 'retro-arcade',
        title: 'Retro Arcade Marathon',
        category: 'Challenge',
        tagline: 'High-score speedruns of 90s arcade classics.',
        description: 'Pac-Man, Street Fighter II, and Tetris score battles on vintage arcade cabinets.',
        schedule: 'Day 2 • All Day',
        venue: 'Club Lounge',
        prizePool: 'Arcade Souvenirs',
        teamSize: 'Solo',
        entryFee: 'Free',
        rules: ['Unlimited attempts during open session hours.'],
        status: 'Conducted'
      }
    ]
  },
  {
    id: 'vibe',
    number: '03',
    name: 'Vibeverse',
    sector: 'SECTOR-03 // EXPRESSION & BEATS',
    title: 'The Harmonic Sanctuary of Sound',
    colorHex: 0x33ff99,
    colorStr: '#33ff99',
    accentStr: '#70ffb7',
    glowColor: 'rgba(51, 255, 153, 0.45)',
    shortDesc: 'A dimension for musical synergy, performance, movement, and creative expression under shimmering emerald auroras.',
    lore: 'An ethereal planet encircled by resonant sonic rings. Waves of light and color pulse in tune with the sound frequencies generated on its surface.',
    stats: {
      syncRate: '97.2%',
      atmosphere: 'Bioluminescent Aurora',
      gravitationalPull: '0.94 G',
      eventsConducted: 3,
    },
    position: [-110, -18, 55],
    targetCameraOffset: [0, 8, 22],
    astronomicalClass: 'Harmonic Ring Galaxy & Emission Nebula',
    phenomenon: 'resonant_nebula',
    galaxyRadius: 19,
    coreRadius: 2.8,
    armCount: 2,
    starCount: 2100,
    rotationSpeed: 0.035,
    tiltX: 0.52,
    tiltZ: 0.15,
    events: [
      {
        id: 'spotlight',
        title: 'Visionexa Spotlight: Live Jam',
        category: 'Exhibition',
        tagline: 'A stage for musicians, solo instrumentalists, and vocalists.',
        description: 'The premier live stage performance featuring acoustic duos, beatboxers, vocalists, and electric guitarists.',
        schedule: 'Day 1 • 5:00 PM – 8:00 PM',
        venue: 'Open Air Amphitheatre',
        prizePool: '₹7,000 + Studio Recording Session',
        teamSize: 'Solo / Band (up to 5)',
        entryFee: '₹150',
        rules: [
          'Time slot: 6 minutes performance + 2 minutes setup.',
          'All musical genres welcome; original compositions score bonus points.'
        ],
        status: 'Registrations Open'
      },
      {
        id: 'cypher-battle',
        title: 'Street Cypher: Dance Battle',
        category: 'Competition',
        tagline: '1v1 all-styles street dance and crew choreography.',
        description: 'Popping, locking, breaking, and hip-hop cyphers judged by distinguished underground choreographers.',
        schedule: 'Day 2 • 3:00 PM – 6:00 PM',
        venue: 'Campus Quadrangle',
        prizePool: '₹6,000',
        teamSize: 'Solo / Crew',
        entryFee: '₹100',
        rules: ['Random DJ music drops; 45 seconds per round.'],
        status: 'Registrations Open'
      },
      {
        id: 'band-wars',
        title: 'Acoustic & Band Showcase',
        category: 'Exhibition',
        tagline: 'College rock and indie bands take over the main stage.',
        description: 'A collaborative evening of original songwriting, classic covers, and acoustic harmony.',
        schedule: 'Day 2 • 6:30 PM',
        venue: 'Main Auditorium',
        prizePool: 'Memento & Fest Featured Band',
        teamSize: 'Full Band',
        entryFee: 'Free',
        rules: ['Sound check begins at 4:30 PM.'],
        status: 'Conducted'
      }
    ]
  },
  {
    id: 'ai',
    number: '04',
    name: 'AIverse',
    sector: 'SECTOR-04 // SYNTHETIC INTELLIGENCE',
    title: 'The Neural Matrix of Artificial Mind',
    colorHex: 0xffaa00,
    colorStr: '#ffaa00',
    accentStr: '#ffcc66',
    glowColor: 'rgba(255, 170, 0, 0.45)',
    shortDesc: 'Explore the creative and technical horizon of generative AI, robotics, neural networks, and human-machine collaboration.',
    lore: 'A pulsing amber world traversed by synaptic lightning arcs and autonomous neural models calculating the infinite possibilities of intelligence.',
    stats: {
      syncRate: '99.9%',
      atmosphere: 'Electromagnetic Field Matrix',
      gravitationalPull: '1.08 G',
      eventsConducted: 4,
    },
    position: [48, 45, -60],
    targetCameraOffset: [0, 7, 20],
    astronomicalClass: 'Ultra-Dense Globular Neural Cluster',
    phenomenon: 'neural_cluster',
    galaxyRadius: 17,
    coreRadius: 4.2,
    armCount: 4,
    starCount: 2600,
    rotationSpeed: 0.03,
    tiltX: -0.18,
    tiltZ: -0.32,
    events: [
      {
        id: 'roboverse',
        title: 'Roboverse & Autonomous Tech Expo',
        category: 'Exhibition',
        tagline: 'Showcase robotics, IoT hardware, and autonomous rovers.',
        description: 'Student engineering teams showcase wheeled robots, line-followers, AI computer-vision systems, and IoT environmental sensors.',
        schedule: 'Day 1 • 11:00 AM – 4:00 PM',
        venue: 'Tech Exhibition Hall',
        prizePool: '₹12,000 + Hardware Kits',
        teamSize: '1 - 4 Members',
        entryFee: '₹200',
        rules: [
          'Prototypes must be demonstrated live with a physical hardware component.',
          'Safety standards must be verified by the BitCA Technical team.'
        ],
        status: 'Registrations Open'
      },
      {
        id: 'prompt-jam',
        title: 'Prompt & Generative Art Jam',
        category: 'Competition',
        tagline: 'Human-AI co-creation speed challenge.',
        description: 'Craft evocative visual narratives and solve design briefs using multimodal generative AI models under tight constraints.',
        schedule: 'Day 2 • 10:30 AM – 12:30 PM',
        venue: 'Computer Center 2',
        prizePool: '₹5,000',
        teamSize: 'Solo',
        entryFee: '₹100',
        rules: [
          'No external image editors; raw model outputs and prompt logs required.'
        ],
        status: 'Registrations Open'
      },
      {
        id: 'turing-debate',
        title: 'Turing Limit: Ethics & Superintelligence',
        category: 'Challenge',
        tagline: 'Oxford-style parliamentary debate on AI singularity.',
        description: 'Debate topics covering AGI safety, neural copyright, synthetic consciousness, and automated labor.',
        schedule: 'Day 2 • 2:00 PM – 4:00 PM',
        venue: 'Conference Room A',
        prizePool: '₹4,000 + Book Hampers',
        teamSize: 'Duo',
        entryFee: '₹100',
        rules: ['3 minutes constructive speech, 2 minutes cross-examination.'],
        status: 'Registrations Open'
      },
      {
        id: 'llm-agents-workshop',
        title: 'Building Autonomous AI Agents',
        category: 'Workshop',
        tagline: 'From prompt engineering to autonomous tool-using agents.',
        description: 'Hands-on session building LangChain and Gemini SDK agents with web search and code execution skills.',
        schedule: 'Day 1 • 2:00 PM',
        venue: 'Lab 301',
        teamSize: 'Individual',
        entryFee: 'Free',
        rules: ['Hands-on notebook provided.'],
        status: 'Conducted'
      }
    ]
  },
  {
    id: 'cyber',
    number: '05',
    name: 'Cyberverse',
    sector: 'SECTOR-05 // DIGITAL SURVIVAL & OPSEC',
    title: 'The Fortress of Zero-Trust Security',
    colorHex: 0xaa55ff,
    colorStr: '#aa55ff',
    accentStr: '#c68cff',
    glowColor: 'rgba(170, 85, 255, 0.45)',
    shortDesc: 'Think like an ethical hacker. Navigate cryptographic puzzles, digital forensics, escape rooms, and campus treasure hunts.',
    lore: 'A mysterious world wrapped in impenetrable ultraviolet firewall shells, where data is the only currency and anonymity is the ultimate shield.',
    stats: {
      syncRate: '96.5%',
      atmosphere: 'Encrypted Quantum Mist',
      gravitationalPull: '1.05 G',
      eventsConducted: 4,
    },
    position: [-45, -38, 125],
    targetCameraOffset: [0, 8, 23],
    astronomicalClass: 'Gravitational Singularity & Accretion Vortex',
    phenomenon: 'gravitational_void',
    galaxyRadius: 19,
    coreRadius: 3.0,
    armCount: 2,
    starCount: 2000,
    rotationSpeed: 0.065,
    tiltX: 0.44,
    tiltZ: -0.38,
    events: [
      {
        id: 'ctf-breach',
        title: 'Capture The Flag (CTF) 2025',
        category: 'Competition',
        tagline: 'Jeopardy-style cybersecurity and penetration testing challenge.',
        description: 'Solve cryptography riddles, reverse engineer binaries, perform web exploits, and analyze network packet dumps to capture secret flags.',
        schedule: 'Day 1 • 1:00 PM – 6:00 PM',
        venue: 'Security Sandbox Lab 402',
        prizePool: '₹10,000 + Certified Ethical Hacker Vouchers',
        teamSize: '1 - 3 Members',
        entryFee: '₹150',
        rules: [
          'Attacking tournament infrastructure or fellow teams will result in instant disqualification.',
          'Dynamic flag scoring system based on solve counts.'
        ],
        status: 'Registrations Open'
      },
      {
        id: 'treasure-hunt',
        title: 'Hidden Trail: Tech Campus Treasure Hunt',
        category: 'Challenge',
        tagline: 'Clue-led cryptographic hunt across KC College campus.',
        description: 'Follow QR codes, decode cipher text on physical flyers, decrypt Wi-Fi beacons, and locate the ultimate hidden ledger.',
        schedule: 'Day 2 • 11:00 AM – 2:00 PM',
        venue: 'Campus-wide',
        prizePool: '₹7,500',
        teamSize: '3 - 4 Members',
        entryFee: '₹200 per team',
        rules: ['Team members must stay together; no running in administrative zones.'],
        status: 'Registrations Open'
      },
      {
        id: 'cyber-escape',
        title: 'Cyber Escape Room 404',
        category: 'Challenge',
        tagline: 'Locked in a compromised server room. 30 minutes to disarm.',
        description: 'A physical + digital escape room experience where teams must reconstruct corrupted memory arrays to unlock the door.',
        schedule: 'Day 1 & Day 2 • Slots every 45 mins',
        venue: 'Room 205 (Blackout Chamber)',
        prizePool: 'Fastest Escape Trophy + Cash ₹3,000',
        teamSize: '3 Members',
        entryFee: '₹150 per team',
        rules: ['Phones must be deposited in faraday cage pouches.'],
        status: 'Registrations Open'
      },
      {
        id: 'opsec-workshop',
        title: 'Digital Footprint & Privacy Defense',
        category: 'Workshop',
        tagline: 'Safeguarding personal identity in the age of pervasive tracking.',
        description: 'Interactive demonstration on OSINT detection, password vaulting, and hardware-key two-factor authentication.',
        schedule: 'Day 2 • 2:30 PM',
        venue: 'Room 302',
        teamSize: 'Open',
        entryFee: 'Free',
        rules: ['Open session.'],
        status: 'Conducted'
      }
    ]
  },
  {
    id: 'human',
    number: '06',
    name: 'Humanverse',
    sector: 'SECTOR-06 // HUMAN INSTINCT & IDENTITY',
    title: 'The Cradle of Instinct and Empathy',
    colorHex: 0xffdd44,
    colorStr: '#ffdd44',
    accentStr: '#ffe97a',
    glowColor: 'rgba(255, 221, 68, 0.45)',
    shortDesc: 'Challenge instinct, teamwork, psychology, and artistic storytelling through live reality games and creative competition.',
    lore: 'A lush, radiant world reminding all entities of our shared biology, resilience, and emotional truth in an increasingly synthetic cosmos.',
    stats: {
      syncRate: '95.8%',
      atmosphere: 'Oxygen-Argon Pristine',
      gravitationalPull: '1.00 G',
      eventsConducted: 3,
    },
    position: [105, 30, 85],
    targetCameraOffset: [0, 8, 24],
    astronomicalClass: 'Luminous Grand Design Spiral Galaxy',
    phenomenon: 'grand_spiral',
    galaxyRadius: 22,
    coreRadius: 3.4,
    armCount: 2,
    starCount: 2500,
    rotationSpeed: 0.025,
    tiltX: -0.35,
    tiltZ: 0.18,
    events: [
      {
        id: 'squid-game',
        title: 'Squid Game 5-Level Survival Trials',
        category: 'Challenge',
        tagline: '5 intense levels: Ddakji, Blindfold Maze, Flip Stones, Marbles, Escape.',
        description: 'Inspired by traditional games with high-stakes psychological twists. Eliminate rivals round-by-round to become the sole survivor.',
        schedule: 'Day 2 • 12:00 PM – 4:00 PM',
        venue: 'College Gymnasium Arena',
        prizePool: '₹8,000 + Golden Piggy Bank Trophy',
        teamSize: 'Solo Players',
        entryFee: '₹100',
        rules: [
          'Failure in any level results in elimination to the spectator gallery.',
          'Strict adherence to referee and game-master signals.'
        ],
        status: 'Registrations Open'
      },
      {
        id: 'visioncraft-art',
        title: 'VisionCraft: Digital Art & Poster Showcase',
        category: 'Exhibition',
        tagline: 'Express the tension between human empathy and AI automation.',
        description: 'Digital illustrations, matte paintings, and conceptual poster designs evaluated on theme originality and visual mastery.',
        schedule: 'Day 1 • Submissions due 4:00 PM',
        venue: 'Art Corridor Gallery',
        prizePool: '₹5,000',
        teamSize: 'Solo',
        entryFee: '₹80',
        rules: ['Original high-res artwork with layered file verification.'],
        status: 'Registrations Open'
      },
      {
        id: 'creative-writing',
        title: 'Nexus: Sci-Fi Micro-Fiction',
        category: 'Competition',
        tagline: 'Tell a universe-bending story in under 500 words.',
        description: 'Prompt given on the spot: write a gripping narrative answering "When your mirror starts thinking, is it still a reflection?".',
        schedule: 'Day 2 • 11:00 AM',
        venue: 'Library Reading Hall',
        prizePool: '₹3,000 + Published in BitCA Gazette',
        teamSize: 'Solo',
        entryFee: '₹50',
        rules: ['Hand-written or typed without predictive autocomplete.'],
        status: 'Conducted'
      }
    ]
  },
  {
    id: 'meta',
    number: '07',
    name: 'Metaverse',
    sector: 'SECTOR-07 // MIXED REALITY & SPATIAL WEB',
    title: 'The Interdimensional Gate to Spatial Web',
    colorHex: 0xf1f5ff,
    colorStr: '#f1f5ff',
    accentStr: '#ffffff',
    glowColor: 'rgba(241, 245, 255, 0.45)',
    shortDesc: 'Step beyond flat screens into virtual realities, augmented spatial computing, and interactive 3D multidimensional models.',
    lore: 'A crystalline holographic singularity where physical reality and digital simulations intertwine without boundaries.',
    stats: {
      syncRate: '99.1%',
      atmosphere: 'Photonic Holographic Grid',
      gravitationalPull: '0.85 G',
      eventsConducted: 3,
    },
    position: [15, -12, 175],
    targetCameraOffset: [0, 8, 22],
    astronomicalClass: 'Prismatic Interdimensional Spatial Rift',
    phenomenon: 'prismatic_rift',
    galaxyRadius: 18,
    coreRadius: 3.5,
    armCount: 3,
    starCount: 2300,
    rotationSpeed: 0.045,
    tiltX: 0.15,
    tiltZ: 0.42,
    events: [
      {
        id: 'vr-experience',
        title: 'VR Experience Zone: Deep Dive',
        category: 'Exhibition',
        tagline: 'Experience Meta Quest 3 and HTC Vive immersive environments.',
        description: 'Explore interactive 3D architectural spaces, gravity-defying flight simulators, and spatial painting experiences.',
        schedule: 'All Day (Both Days)',
        venue: 'XR Innovation Lab',
        prizePool: 'Certificates of Immersion',
        teamSize: 'Individual Experience',
        entryFee: '₹50 per 15-min slot',
        rules: ['Follow VR technician instructions for safety bounds.'],
        status: 'Registrations Open'
      },
      {
        id: 'mixed-reality-showcase',
        title: 'Mixed Reality Web Showcase',
        category: 'Workshop',
        tagline: 'Developing interactive WebXR and WebGPU 3D apps in the browser.',
        description: 'Master Three.js, WebGL shader pipelines, and real-time hand-tracking web experiences without app installs.',
        schedule: 'Day 2 • 3:30 PM – 5:30 PM',
        venue: 'Smart Classroom 101',
        teamSize: 'Open Session',
        entryFee: 'Free',
        rules: ['WebXR enabled Chrome browsers supported.'],
        status: 'Registrations Open'
      },
      {
        id: 'spatial-challenge',
        title: 'Spatial World Builder Hack',
        category: 'Competition',
        tagline: 'Design an interactive 3D low-poly universe in 3 hours.',
        description: 'Using Blender or Three.js primitives, construct an original planetary ecosystem or space station module.',
        schedule: 'Day 1 • 2:00 PM – 5:00 PM',
        venue: '3D Graphics Lab',
        prizePool: '₹6,000 + 3D Asset Packs',
        teamSize: 'Duo / Solo',
        entryFee: '₹100',
        rules: ['Asset polygon count must not exceed 25,000 triangles.'],
        status: 'Conducted'
      }
    ]
  }
];

export const INCHARGES = [
  {
    name: 'Dr. Tejashree V. Shanbhag',
    role: 'I/C Principal, K.C. College',
    initials: 'TS',
    bio: 'Guiding visionary with three decades of academic leadership and transformative collegiate governance.'
  },
  {
    name: 'Dr. Hemlata K. Baghla',
    role: 'Vice Chancellor, HSNC University',
    initials: 'HB',
    bio: 'Honorary Colonel, distinguished researcher with over 200 published papers, spearheading university innovation.'
  },
  {
    name: 'Dr. Shalini R. Sinha',
    role: 'Vice-Principal',
    initials: 'SS',
    bio: 'Dedicated academic mentor shaping institutional excellence and research-driven initiatives.'
  },
  {
    name: 'Dr. Rajesh Samant',
    role: 'Vice-Principal',
    initials: 'RS',
    bio: 'Pillar of student empowerment, department operations, and cultural festival execution.'
  },
  {
    name: 'Dr. Ritika Pathak',
    role: 'Vice-Principal',
    initials: 'RP',
    bio: 'Champion of modern pedagogical methods, interdisciplinary education, and industry liaison.'
  },
  {
    name: 'Ms. Geeta Brijwani',
    role: 'Coordinator for BCA',
    initials: 'GB',
    bio: 'Pioneer of the Computer Applications department (M.Sc, M.Phil, MBA), mentoring students into technology leaders.'
  }
];

export const TEACHING_FACULTY = [
  { name: 'Divya Menon', role: 'Teaching Faculty', initials: 'DM' },
  { name: 'Shahid Ansari', role: 'Teaching Faculty', initials: 'SA' },
  { name: 'Maunash Jani', role: 'Teaching Faculty', initials: 'MJ' },
  { name: 'Ismail H.P', role: 'Teaching Faculty', initials: 'IH' },
];

export const NON_TEACHING_FACULTY = [
  { name: 'Ashsih Gawde', role: 'Non-Teaching Faculty', initials: 'AG' },
  { name: 'Rakesh Sharma', role: 'Non-Teaching Faculty', initials: 'RS' },
  { name: 'Aditya Pandey', role: 'Non-Teaching Faculty', initials: 'AP' },
];

export const HEAD_TEAM = [
  { name: 'Pratham Shikotra', role: 'Core Member & Lead', initials: 'PS' },
  { name: 'Yashvi Mehta', role: 'Core Member', initials: 'YM' },
  { name: 'Sumaiya Khan', role: 'Core Member', initials: 'SK' },
  { name: 'Shreya Chindarkar', role: 'Core Member', initials: 'SC' },
];

export const HODS = [
  { name: 'Zafreen Pithawala', dept: 'Social Media', initials: 'ZP' },
  { name: 'Mayuresh Pandey', dept: 'Social Media', initials: 'MP' },
  { name: 'Shania Gomez', dept: 'Technical', initials: 'SG' },
  { name: 'Samuel Bhowmik', dept: 'Technical', initials: 'SB' },
  { name: 'Riya Ramane', dept: 'Decor', initials: 'RR' },
  { name: 'Kainaat Sayyed', dept: 'Administration', initials: 'KS' },
  { name: 'Vedant Darji', dept: 'Security', initials: 'VD' },
  { name: 'Sanjivani Pandey', dept: 'Security', initials: 'SP' },
  { name: 'Aditya Erande', dept: 'Security', initials: 'AE' },
  { name: 'Aafridi Choudhari', dept: 'Logistics', initials: 'AC' },
  { name: 'Majid Shaikh', dept: 'Logistics', initials: 'MS' },
  { name: 'Anas Ansari', dept: 'Logistics', initials: 'AA' },
  { name: 'Rabab Kanwarsaheb', dept: 'Hospitality', initials: 'RK' },
  { name: 'Arpit Choubey', dept: 'Editing & Graphics', initials: 'AC' },
  { name: 'Uddish Bakshi', dept: 'Editing & Graphics', initials: 'UB' },
  { name: 'Kavyam Shah', dept: 'Marketing & PR', initials: 'KS' },
  { name: 'Anchal Kaur', dept: 'Marketing & PR', initials: 'AK' },
  { name: 'Riya Raisinghani', dept: 'Creative Writing', initials: 'RR' },
  { name: 'Ishaan Keluskar', dept: 'Coverage', initials: 'IK' },
  { name: 'Shreyash Toraskar', dept: 'Coverage', initials: 'ST' },
  { name: 'Pushkar Umesh Modak', dept: 'Editing', initials: 'PM' },
];
