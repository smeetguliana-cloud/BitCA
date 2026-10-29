export interface FestEvent {
  id: string;
  title: string;
  category: 'Coding' | 'Gaming' | 'Cultural' | 'AI & Tech' | 'Cybersecurity' | 'Creative' | 'Innovation';
  tagline: string;
  description: string;
  teamSize: string;
  prizePool: string;
  date: string;
  timeSlot: string;
  realmLocation: string;
  rules: string[];
  tags: string[];
  isFlagship?: boolean;
}

export interface UniverseData {
  id: string;
  index: number;
  code: string;
  name: string;
  title: string;
  tagline: string;
  philosophicalDescription: string;
  corePhilosophy: string;
  primaryColor: string;
  secondaryColor: string;
  accentGlow: string;
  ringColor: string;
  position: [number, number, number];
  planetRadius: number;
  rotationSpeed: number;
  visualType: 'techverse' | 'gameverse' | 'vibeverse' | 'aiverse' | 'cyberverse' | 'humanverse' | 'futureverse';
  events: FestEvent[];
}

export const MULTIVERSE_DATA: UniverseData[] = [
  {
    id: 'techverse',
    index: 1,
    code: 'UNIVERSE 01',
    name: 'Techverse',
    title: 'The Universe of Innovation',
    tagline: 'Code is the bedrock of constructed reality.',
    philosophicalDescription:
      'In a dimension woven from infinite logic gates, every line of syntax shapes physical law. Yet code without human ingenuity is merely static noise. Here, programmers dismantle digital illusions and compile tomorrow.',
    corePhilosophy: 'Logic builds worlds; creativity gives them purpose.',
    primaryColor: '#00f3ff',
    secondaryColor: '#0284c7',
    accentGlow: 'rgba(0, 243, 255, 0.45)',
    ringColor: '#38bdf8',
    position: [-36, 6, -18],
    planetRadius: 3.2,
    rotationSpeed: 0.4,
    visualType: 'techverse',
    events: [
      {
        id: 'code-matrix',
        title: 'Code Matrix // Speed Algorithmics',
        category: 'Coding',
        tagline: 'Algorithmic speedrun across quantum test matrices',
        description:
          'High-octane competitive programming sprint where competitors solve complex computational paradoxes across dynamic edge cases under strict real-time telemetry.',
        teamSize: 'Solo (1 Member)',
        prizePool: '$1,500 + Nexus Trophy',
        date: 'Day 1 — Nov 14',
        timeSlot: '10:00 AM - 1:00 PM',
        realmLocation: 'Matrix Chamber // Terminal Alpha',
        rules: [
          '3 rounds of escalating algorithmic complexity (Greedy, Dynamic Programming, Graph flows)',
          'Automated judge evaluation with sub-second execution timeouts',
          'Languages supported: C++, Rust, Python, Go, Java'
        ],
        tags: ['Algorithms', 'Data Structures', 'Competitive', 'Fast-Paced'],
        isFlagship: true
      },
      {
        id: '404-hackathon',
        title: '404 Hackathon // Full-Stack Sprint',
        category: 'Innovation',
        tagline: '24-hour reality engineering hackathon',
        description:
          'Build functional distributed web applications, decentralized solutions, or spatial tools addressing reality-bending challenges in healthcare, education, or climate systems.',
        teamSize: 'Teams of 2 to 4',
        prizePool: '$3,500 + Incubator Grant',
        date: 'Day 1 to Day 2 — Nov 14-15',
        timeSlot: '24 Hours Non-Stop (Starts 2:00 PM)',
        realmLocation: 'Hacker Sanctum // Node 7',
        rules: [
          'Codebases must be created during the sprint timeframe',
          'Open-source libraries permitted; hardware sensors provided on-site',
          'Live 5-minute interactive jury pitch + source code audit'
        ],
        tags: ['Hackathon', 'Full-Stack', 'Web3', 'System Design'],
        isFlagship: true
      },
      {
        id: 'bug-hunter',
        title: 'Bug Hunter Protocol // Reverse Debugging',
        category: 'Coding',
        tagline: 'Diagnose and remediate catastrophic software failures',
        description:
          'Step into intentionally broken production architectures. Trace memory leaks, race conditions, concurrency deadlocks, and silent logic corruptions before the system crashes.',
        teamSize: 'Solo or Duo (1-2 Members)',
        prizePool: '$1,000 + Tech Swag',
        date: 'Day 2 — Nov 15',
        timeSlot: '11:00 AM - 1:30 PM',
        realmLocation: 'Core Debug Lab // Vault 3',
        rules: [
          'Time-attack elimination format with 5 corrupted code repositories',
          'Points awarded for patch elegance, test coverage, and speed',
          'No external LLM agents permitted inside the debug sandbox'
        ],
        tags: ['Debugging', 'Reverse Engineering', 'Profiling', 'Systems']
      }
    ]
  },
  {
    id: 'gameverse',
    index: 2,
    code: 'UNIVERSE 02',
    name: 'Gameverse',
    title: 'The Universe of Play',
    tagline: 'When realities dissolve, the game is the only truth.',
    philosophicalDescription:
      'A prismatic kaleidoscope of neon polygon realms where instinct, spatial mastery, and teamwork transcend physical boundaries. Win or lose, every respawn is a reincarnation of spirit.',
    corePhilosophy: 'Play is not escapism; it is the rehearsal of human resilience.',
    primaryColor: '#ec4899',
    secondaryColor: '#a855f7',
    accentGlow: 'rgba(236, 72, 153, 0.45)',
    ringColor: '#c084fc',
    position: [-22, 14, -34],
    planetRadius: 3.0,
    rotationSpeed: 0.55,
    visualType: 'gameverse',
    events: [
      {
        id: 'valorant-nexus',
        title: 'Valorant Nexus Showdown // 5v5 Tactical',
        category: 'Gaming',
        tagline: 'Elite tactical FPS tournament on 240Hz tournament rigs',
        description:
          'Clash in the ultimate 5v5 tactical shooter arena. Coordinated utility executes, map control, clutch defuses, and frame-perfect aim decide the Multiverse champion.',
        teamSize: 'Squad of 5 (+1 Sub)',
        prizePool: '$2,400 + Custom Peripherals',
        date: 'Day 1 & 2 — Nov 14-15',
        timeSlot: '11:00 AM Onwards (Bracket Finals 6 PM)',
        realmLocation: 'Arcade Arena // Main Stage',
        rules: [
          'Standard competitive ruleset with map ban/pick veto protocol',
          'Single elimination preliminaries leading to BO3 Grand Finals',
          'BYOP (Bring Your Own Peripherals) supported'
        ],
        tags: ['Esports', 'Tactical FPS', '5v5', 'Competitive'],
        isFlagship: true
      },
      {
        id: 'bgmi-survival',
        title: 'BGMI Survival Drop // Battle Royale',
        category: 'Gaming',
        tagline: 'Last squad standing in intense high-stakes battlegrounds',
        description:
          'Squads parachute into contested territories, scavenging equipment, securing high ground, and outlasting the shrinking blue zone across custom scrim lobbies.',
        teamSize: 'Squad of 4',
        prizePool: '$1,600 Cash Pool',
        date: 'Day 2 — Nov 15',
        timeSlot: '2:30 PM - 5:30 PM',
        realmLocation: 'LAN Colosseum // Zone B',
        rules: [
          'Points based on official esports placement + kill weight matrix',
          '4 custom matches: Erangel, Miramar, Sanhok, Erangel',
          'Official devices and anti-cheat client inspection required'
        ],
        tags: ['Battle Royale', 'Mobile Esports', 'Strategy', 'Survival']
      },
      {
        id: 'virtual-escape-404',
        title: 'Virtual Escape Room: Level 404',
        category: 'Gaming',
        tagline: 'Spatial logic puzzles and cipher decoding under 45 minutes',
        description:
          'A multi-stage holographic escape room where players solve laser deflections, cryptographic ciphers, and physical riddle triggers to unlock the reality gateway.',
        teamSize: 'Teams of 3 to 4',
        prizePool: '$900 + Mystery Quest Relics',
        date: 'Continuous Slots — Nov 14-15',
        timeSlot: '10:00 AM - 5:00 PM (Hourly Waves)',
        realmLocation: 'Enigma Chambers // Level 0',
        rules: [
          '45-minute countdown clock with penalty minutes for hints',
          'Zero mobile phones inside the enclosure',
          'Fastest clean escape time wins the championship tier'
        ],
        tags: ['Escape Room', 'Puzzles', 'Teamwork', 'Immersive']
      }
    ]
  },
  {
    id: 'vibeverse',
    index: 3,
    code: 'UNIVERSE 03',
    name: 'Vibeverse',
    title: 'The Universe of Expression',
    tagline: 'Where rhythm breaks the simulation.',
    philosophicalDescription:
      'Soundwaves that bend space-time and kinetic movement that defies gravity. In Vibeverse, raw emotion, stage charisma, and acoustic resonance dismantle the synthetic barrier between souls.',
    corePhilosophy: 'When words fail and algorithms fall short, rhythm speaks.',
    primaryColor: '#f59e0b',
    secondaryColor: '#ff2a85',
    accentGlow: 'rgba(245, 158, 11, 0.45)',
    ringColor: '#fb7185',
    position: [6, 18, -38],
    planetRadius: 3.4,
    rotationSpeed: 0.6,
    visualType: 'vibeverse',
    events: [
      {
        id: 'rhythm-glitch',
        title: 'Rhythm Glitch // Street & Crew Dance Battle',
        category: 'Cultural',
        tagline: 'High-voltage hip-hop, popping, locking, and crew choreo',
        description:
          'Crews and solo dancers battle with syncopated pop-and-lock grooves, breaking, urban choreography, and electrifying stage presence to unseat the defending titans.',
        teamSize: 'Solo OR Crew (6-16 Members)',
        prizePool: '$2,800 + Golden Boombox',
        date: 'Day 1 — Nov 14',
        timeSlot: '5:30 PM - 9:30 PM',
        realmLocation: 'Open Amphitheatre // Stage Prime',
        rules: [
          'Crew routine: 6-10 minutes with minimum 1 stylistic transition',
          '1v1 All-Styles freestyle cypher round for finalists',
          'Judged on choreography, musicality, synchronization, and crowd hype'
        ],
        tags: ['Dance', 'Hip-Hop', 'Stage Performance', 'Crowd Favorite'],
        isFlagship: true
      },
      {
        id: 'echoes-in-void',
        title: 'Echoes in the Void // Battle of the Bands',
        category: 'Cultural',
        tagline: 'Live rock, metal, fusion, and electronic band duel',
        description:
          'Live amps, roaring drums, and soaring vocals. Bands electrify the cosmos with original compositions and soul-stirring covers that shake the arena rafters.',
        teamSize: 'Bands of 3 to 8 Members',
        prizePool: '$3,000 + Studio Recording Session',
        date: 'Day 2 — Nov 15',
        timeSlot: '6:00 PM - 10:00 PM',
        realmLocation: 'Grand Auditorium // Sound Stage',
        rules: [
          '18-minute stage slot including 3-minute line check',
          'Must include at least 1 original composition',
          'Standard drum kit, bass amp, and PA provided; bring guitars/synths'
        ],
        tags: ['Music', 'Live Band', 'Acoustic & Electric', 'Concert'],
        isFlagship: true
      },
      {
        id: 'neon-runway',
        title: 'Neon Runway // Cyberpunk Cosplay & Fashion',
        category: 'Cultural',
        tagline: 'Multiverse haute couture and sci-fi cosplay showcase',
        description:
          'Strut the chromatic runway in artisanal costumes, futuristic attire, anime interpretations, or handmade robotic gear celebrating visual creativity.',
        teamSize: 'Solo or Duo (1-2 Models)',
        prizePool: '$1,200 + Fashion Crown',
        date: 'Day 2 — Nov 15',
        timeSlot: '3:00 PM - 5:30 PM',
        realmLocation: 'Prism Walkway // Center Atrium',
        rules: [
          'Runway walk + 90-second prop/character dialogue performance',
          'Original craft and recycled materials receive bonus aesthetic marks',
          'Custom background soundtrack must be submitted 2 hours prior'
        ],
        tags: ['Cosplay', 'Fashion', 'Costume Design', 'Runway']
      }
    ]
  },
  {
    id: 'aiverse',
    index: 4,
    code: 'UNIVERSE 04',
    name: 'AIverse',
    title: 'The Universe of Artificial Intelligence',
    tagline: 'Neural constellations dreaming in silicon.',
    philosophicalDescription:
      'Where billions of synaptic weights converge to generate language, imagery, and consciousness simulations. Is the machine discovering truth, or merely mirroring human desire?',
    corePhilosophy: 'AI is our mirror: what it becomes reflects who we are.',
    primaryColor: '#39ff14',
    secondaryColor: '#10b981',
    accentGlow: 'rgba(57, 255, 20, 0.45)',
    ringColor: '#6ee7b7',
    position: [32, 10, -26],
    planetRadius: 3.1,
    rotationSpeed: 0.35,
    visualType: 'aiverse',
    events: [
      {
        id: 'prompt-craft-arena',
        title: 'Prompt Craft Arena // Generative AI Duel',
        category: 'AI & Tech',
        tagline: 'Real-time multi-modal prompt engineering and generation showdown',
        description:
          'Contestants command LLMs and diffusion models under mystery constraints to generate precision code architectures, photorealistic concept art, and narrative scripts.',
        teamSize: 'Solo (1 Member)',
        prizePool: '$1,400 + Model Compute Credits',
        date: 'Day 1 — Nov 14',
        timeSlot: '2:00 PM - 4:30 PM',
        realmLocation: 'Neural Chamber // Pod 4',
        rules: [
          'Blind creative prompts with strict semantic and token constraints',
          'Evaluated on fidelity to prompt, zero-shot accuracy, and aesthetics',
          'Official compute environments and APIs provided'
        ],
        tags: ['Generative AI', 'Prompt Engineering', 'LLM', 'Creative AI']
      },
      {
        id: 'turing-test-live',
        title: 'Turing Test Live // Human vs AI Debate',
        category: 'AI & Tech',
        tagline: 'Can an audience distinguish human debaters from neural agents?',
        description:
          'Blind adversarial debates on ethics, consciousness, philosophy, and future society. Audiences and expert judges attempt to unmask which speaker is human and which is an AI voice persona.',
        teamSize: 'Teams of 2',
        prizePool: '$1,800 + Philosophy Fellowship',
        date: 'Day 2 — Nov 15',
        timeSlot: '1:30 PM - 3:30 PM',
        realmLocation: 'Synapse Hall // Room 201',
        rules: [
          'Debate topics revealed 15 minutes before the round',
          'Real-time synthesis voice masking for both participants',
          'Audience voting telemetry via mobile web terminal'
        ],
        tags: ['Debate', 'Turing Test', 'Ethics', 'Consciousness'],
        isFlagship: true
      },
      {
        id: 'ai-copilot-buildathon',
        title: 'AI Co-Pilot Buildathon // Agentic Systems',
        category: 'AI & Tech',
        tagline: 'Architect autonomous multi-agent systems that solve real dilemmas',
        description:
          'Build practical autonomous agents leveraging tool-use, RAG pipelines, and reasoning loops to automate civic assistance, research summarization, or disaster triage.',
        teamSize: 'Teams of 2 to 3',
        prizePool: '$2,500 + Venture Fast-Track',
        date: 'Day 1 — Nov 14',
        timeSlot: '10:30 AM - 5:00 PM',
        realmLocation: 'Intelligence Lab // Cluster X',
        rules: [
          'System must deploy at least 2 coordinated agents with tool-calling',
          'Live demonstration handling unpredictable injected test data',
          'Must document failure edge cases and safety guardrails'
        ],
        tags: ['Autonomous Agents', 'RAG', 'Function Calling', 'Buildathon'],
        isFlagship: true
      }
    ]
  },
  {
    id: 'cyberverse',
    index: 5,
    code: 'UNIVERSE 05',
    name: 'Cyberverse',
    title: 'The Universe of Digital Survival',
    tagline: 'Zero trust in a universe of infinite deception.',
    philosophicalDescription:
      'Behind every glowing interface lies an adversarial battlefield. In Cyberverse, privacy is currency, firewalls are ramparts, and only those who question every packet retain their identity.',
    corePhilosophy: 'Trust nothing, verify everything, defend your digital essence.',
    primaryColor: '#ef4444',
    secondaryColor: '#06b6d4',
    accentGlow: 'rgba(239, 68, 68, 0.45)',
    ringColor: '#f87171',
    position: [38, -6, 2],
    planetRadius: 3.3,
    rotationSpeed: 0.45,
    visualType: 'cyberverse',
    events: [
      {
        id: 'ctf-zero-day',
        title: 'Capture The Flag // Zero Day Protocol',
        category: 'Cybersecurity',
        tagline: 'Jeopardy & Attack-Defense cybersecurity tournament',
        description:
          'Exploit buffer overflows, crack cryptographic handshakes, dissect firmware, and reverse malware binaries in an adrenaline-pumping capture-the-flag arena.',
        teamSize: 'Teams of 2 to 4',
        prizePool: '$3,200 + Security Certifications',
        date: 'Day 1 — Nov 14',
        timeSlot: '9:30 AM - 4:30 PM (7-Hour Gauntlet)',
        realmLocation: 'Red Team Vault // Sector 9',
        rules: [
          'Categories: Web Exploitation, Reverse Engineering, Cryptography, Forensics, Pwn',
          'Flags formatted as FLAG{...}; strictly no DoS against competition servers',
          'Live scoreboard with dynamic blood points for first solves'
        ],
        tags: ['CTF', 'Ethical Hacking', 'Reverse Engineering', 'Cryptography'],
        isFlagship: true
      },
      {
        id: 'digital-footprint-forensics',
        title: 'Digital Footprint Forensics // OSINT Hunt',
        category: 'Cybersecurity',
        tagline: 'Track phantom actors using open-source intelligence puzzles',
        description:
          'Piece together satellite telemetry, metadata signatures, social breadcrumbs, and leaked archives to uncover a rogue entity before their target is compromised.',
        teamSize: 'Solo or Duo (1-2 Members)',
        prizePool: '$1,200 + Hardware Tokens',
        date: 'Day 2 — Nov 15',
        timeSlot: '10:00 AM - 1:00 PM',
        realmLocation: 'Sentinel Lab // Room 104',
        rules: [
          'Only public internet intelligence allowed; no illegal intrusive scanning',
          'Time-scored mystery trail with 8 distinct geo-chronological checkpoints',
          'Detailed investigative report submission required for tie-breaks'
        ],
        tags: ['OSINT', 'Investigation', 'Metadata', 'Privacy']
      },
      {
        id: 'firewall-breach',
        title: 'Firewall Breach Simulation // Live Defense',
        category: 'Cybersecurity',
        tagline: 'Defend enterprise infrastructure against coordinated attacks',
        description:
          'Blue team specialists patch vulnerable server clusters, monitor Wireshark network streams, and contain simulated ransomware outbreaks under intense siege conditions.',
        teamSize: 'Teams of 3',
        prizePool: '$1,500 + Firewall Badges',
        date: 'Day 2 — Nov 15',
        timeSlot: '2:00 PM - 5:00 PM',
        realmLocation: 'Defense Bunker // Operations Room',
        rules: [
          'Teams must keep web and database services active during attacks',
          'SLA downtime directly reduces total security score',
          'Automated attack scripts increase in ferocity every 30 minutes'
        ],
        tags: ['Blue Team', 'Incident Response', 'Network Defense', 'Live Siege']
      }
    ]
  },
  {
    id: 'humanverse',
    index: 6,
    code: 'UNIVERSE 06',
    name: 'Humanverse',
    title: 'The Universe of Human Identity',
    tagline: 'The heart cannot be simulated.',
    philosophicalDescription:
      'Amid the roar of silicon and synthetic constructs stands the irreplaceable spark of organic human intuition: empathy, spontaneous laughter, handmade imperfections, and unfiltered truth.',
    corePhilosophy: 'We build technology to amplify our humanity, not surrender it.',
    primaryColor: '#fbbf24',
    secondaryColor: '#ffffff',
    accentGlow: 'rgba(251, 191, 36, 0.45)',
    ringColor: '#fde68a',
    position: [18, -14, 28],
    planetRadius: 2.9,
    rotationSpeed: 0.3,
    visualType: 'humanverse',
    events: [
      {
        id: 'unplugged-canvas',
        title: 'Unplugged Canvas // Analog Art & Storytelling',
        category: 'Creative',
        tagline: 'Zero screens. Pure charcoal, acrylic, and spoken word.',
        description:
          'Artists and writers construct physical murals and literary narratives using tactile mediums—celebrating spontaneous human strokes, raw pigment, and un-prompted vision.',
        teamSize: 'Solo (1 Creator)',
        prizePool: '$1,500 + Gallery Exhibition',
        date: 'Day 1 — Nov 14',
        timeSlot: '11:00 AM - 3:00 PM',
        realmLocation: 'Artisan Courtyard // Pavilion Green',
        rules: [
          'All digital devices, tablets, and phones strictly barred during creation',
          'Canvas, sketchboards, acrylics, and charcoal provided on-site',
          'Judged on thematic depth, emotional resonance, and artisanal technique'
        ],
        tags: ['Fine Art', 'Traditional Media', 'Storytelling', 'Human Soul'],
        isFlagship: true
      },
      {
        id: 'philosophy-404',
        title: 'Philosophy 404 // Identity Symposium',
        category: 'Creative',
        tagline: 'What happens to the soul when memories are synthetic?',
        description:
          'An open round-table intellectual symposium dissecting consciousness, digital legacy, the ethics of transhumanism, and whether love can survive algorithmic prediction.',
        teamSize: 'Solo (1 Speaker)',
        prizePool: '$1,000 + Published Essay Monograph',
        date: 'Day 2 — Nov 15',
        timeSlot: '10:30 AM - 1:00 PM',
        realmLocation: 'Socrates Grove // Open Lounge',
        rules: [
          '7-minute philosophical thesis presentation + 5 minutes peer rebuttal',
          'Interdisciplinary judging panel from humanities and computer science',
          'Audience interactive Q&A round included in scoring matrix'
        ],
        tags: ['Philosophy', 'Ethics', 'Consciousness', 'Discourse']
      },
      {
        id: 'raw-frame',
        title: 'Raw Frame // Spot Street Photography',
        category: 'Creative',
        tagline: 'Capture the fleeting candid beauty of the festival in real-time',
        description:
          'Photographers roam campus capturing unscripted moments of wonder, exhaustion, triumph, and genuine human connection with zero post-processing generative overlays.',
        teamSize: 'Solo (1 Photographer)',
        prizePool: '$1,100 + Lens Kit',
        date: 'Day 1 & 2 — Nov 14-15',
        timeSlot: 'Full Fest Timeline (Submissions close 4 PM Day 2)',
        realmLocation: 'Full Campus Realm',
        rules: [
          'Raw EXIF data verification required for all submitted entries',
          'Only standard color grading and crop permitted; no generative inpainting',
          'Best 3 photographs curated into the festival commemorative archive'
        ],
        tags: ['Photography', 'Candid', 'Visual Story', 'Humanity']
      }
    ]
  },
  {
    id: 'futureverse',
    index: 7,
    code: 'UNIVERSE 07',
    name: 'Futureverse',
    title: 'The Universe of Possibilities',
    tagline: 'Tomorrow is an unwritten quantum wavefunction.',
    philosophicalDescription:
      'A swirling singularity of divergent timelines: what if global networks collapsed tomorrow? What if biology and robotics fused completely? The future is not a destination we reach—it is a reality we forge.',
    corePhilosophy: 'The best way to predict the future is to prototype it.',
    primaryColor: '#6366f1',
    secondaryColor: '#38bdf8',
    accentGlow: 'rgba(99, 102, 241, 0.45)',
    ringColor: '#a5b4fc',
    position: [-20, -8, 30],
    planetRadius: 3.3,
    rotationSpeed: 0.5,
    visualType: 'futureverse',
    events: [
      {
        id: 'blackout-2050',
        title: 'Blackout 2050 // The World Without Internet',
        category: 'Innovation',
        tagline: 'Disaster management simulation: when the worldwide web vanishes',
        description:
          'A planetary crisis scenario where undersea cables sever simultaneously. Teams design decentralized mesh radios, local barter economies, and offline governance systems.',
        teamSize: 'Teams of 3 to 4',
        prizePool: '$2,200 + Resilience Grant',
        date: 'Day 1 — Nov 14',
        timeSlot: '1:00 PM - 5:00 PM',
        realmLocation: 'Crisis Control Room // Bunker 1',
        rules: [
          'Simulated real-time crisis bulletins injected every 25 minutes',
          'Solutions must be physically feasible using low-tech or mesh hardware',
          'Judged on operational resilience, community equity, and fail-safes'
        ],
        tags: ['Crisis Simulation', 'Decentralized', 'Off-Grid', 'Systems Thinking'],
        isFlagship: true
      },
      {
        id: 'robot-ethics-tribunal',
        title: 'Robot Ethics Tribunal // Speculative Trial',
        category: 'Innovation',
        tagline: 'Prosecute or defend autonomous machines in landmark moral dilemmas',
        description:
          'Courtroom simulation adjudicating an autonomous drone fleet or medical surgical bot involved in a fatal ethical dilemma. Law, engineering, and morality collide.',
        teamSize: 'Teams of 2 to 3 (Prosecution or Defense)',
        prizePool: '$1,300 + Legal Tech Award',
        date: 'Day 2 — Nov 15',
        timeSlot: '11:00 AM - 1:30 PM',
        realmLocation: 'Moot Court Hall // Wing C',
        rules: [
          'Mock trial format with real legal and engineering principles',
          'Cross-examination of expert witness roles',
          'Scored on evidentiary argumentation, legal precedent, and ethical rigor'
        ],
        tags: ['Robotics', 'Legal Tech', 'Ethics', 'Court Simulation']
      },
      {
        id: 'tomorrows-blueprint',
        title: "Tomorrow's Blueprint // Future-Tech Ideathon",
        category: 'Innovation',
        tagline: 'Pitch radical prototypes for energy, space, and human longevity',
        description:
          'Present high-impact speculative engineering concepts: orbital solar collectors, CRISPR cellular repair, fusion micro-reactors, or ocean carbon scrubbers to venture jurors.',
        teamSize: 'Teams of 1 to 4',
        prizePool: '$2,500 + Seed Mentorship',
        date: 'Day 2 — Nov 15',
        timeSlot: '2:30 PM - 6:00 PM',
        realmLocation: 'Innovation Spire // 5th Floor Auditorium',
        rules: [
          '8-minute pitch deck + 4 minutes prototype demonstration or 3D render',
          'Must include techno-economic feasibility and 10-year roadmaps',
          'Open to both software, physical hardware, and bio-tech submissions'
        ],
        tags: ['Ideathon', 'CleanTech', 'DeepTech', 'Speculative Design'],
        isFlagship: true
      }
    ]
  }
];

export const FEST_DETAILS = {
  name: 'MULTIVERSE 404',
  edition: '2026 ANNUAL TECH-CULTURAL EXTRAVAGANZA',
  tagline: 'What If Reality Was Never Real?',
  subtagline: 'Technology creates new realities, but human creativity gives them meaning.',
  dates: 'November 14 – 15, 2026',
  venue: 'Main Campus & Holographic Cyber Quad, Tech Institute of Excellence',
  stats: [
    { label: 'Parallel Universes', value: '7' },
    { label: 'Elite Events', value: '21+' },
    { label: 'Total Prize Pool', value: '$35,000+' },
    { label: 'Campus Contenders', value: '5,000+' },
  ],
  nexusOverview: {
    title: 'THE 404 NEXUS // REALITY COORDINATE HUB',
    description:
      'You are suspended in the zero-gravity coordinate center of the Multiverse. Before you float seven planetary spheres—each housing distinct disciplines of innovation, combat, artistry, and ethical foresight. Select any planet or use the Quick-Warp Drive below to engage hyperspace trajectory.',
  }
};
