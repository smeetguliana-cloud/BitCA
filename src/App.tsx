import React, { useState, useCallback, useRef, useEffect } from 'react';
import { MainSiteSections } from './components/ui/MainSiteSections';
import { CinematicScene } from './components/three/CinematicScene';
import { MultiverseHud } from './components/ui/MultiverseHud';
import { UniverseModal } from './components/ui/UniverseModal';
import { RegistrationModal } from './components/ui/RegistrationModal';
import { AboutFestModal } from './components/ui/AboutFestModal';
import { Chatbot } from './components/ui/Chatbot';
import { UniverseData, FestEvent } from './lib/multiverseData';

export default function App() {
  const [activeUniverseId, setActiveUniverseId] = useState<string | null>(null);
  const [, setPreviousUniverseId] = useState<string | null>(null);
  const [isWarping, setIsWarping] = useState<boolean>(false);
  const [cameraCoords, setCameraCoords] = useState<{ x: number; y: number; z: number }>({
    x: 0,
    y: 18,
    z: 55
  });

  const [scanlinesEnabled, setScanlinesEnabled] = useState<boolean>(true);
  const [aboutOpen, setAboutOpen] = useState<boolean>(false);

  // Selected event for registration modal
  const [registeringEvent, setRegisteringEvent] = useState<{
    event: FestEvent;
    universe: UniverseData;
  } | null>(null);

  // Performance Optimization: IntersectionObserver to only mount & render R3F 3D Canvas when #universes is in viewport
  const universesContainerRef = useRef<HTMLDivElement>(null);
  const [isUniversesInView, setIsUniversesInView] = useState<boolean>(false);

  useEffect(() => {
    const el = universesContainerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsUniversesInView(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '250px 0px 250px 0px', // preload right before user scrolls in
        threshold: 0.05
      }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
    };
  }, []);

  const handleSelectUniverse = useCallback(
    (targetUniverseId: string | null) => {
      if (targetUniverseId === activeUniverseId) return;
      setPreviousUniverseId(activeUniverseId);
      setActiveUniverseId(targetUniverseId);
    },
    [activeUniverseId]
  );

  const handleCloseUniverseModal = useCallback(() => {
    setPreviousUniverseId(activeUniverseId);
    setActiveUniverseId(null);
  }, [activeUniverseId]);

  const handleRegisterEvent = useCallback(
    (event: FestEvent, universe: UniverseData) => {
      setRegisteringEvent({ event, universe });
    },
    []
  );

  return (
    <div className="relative w-full min-h-screen bg-[#050811] text-white">
      {/* 1. STATIC PAGES / SECTIONS (NAVBAR, HERO, ABOUT, INCHARGES, FACULTY, HEAD TEAM, HODs) */}
      <MainSiteSections />

      {/* 2. DEDICATED 3D MULTIVERSE WARP PORTAL SECTION (#universes) */}
      <section
        id="universes"
        ref={universesContainerRef}
        className="section features-section universes-section scroll-scene layout-universes relative w-full pt-16 pb-24"
      >
        <div className="section-heading multiverse-heading mb-8 px-4 text-center">
          <span className="eyebrow">06 / VISIONEXA EVENT PORTAL</span>
          <h2 className="text-3xl md:text-5xl font-orbitron font-extrabold text-white tracking-wider my-2">
            Choose your <span className="text-cyan-400">universe.</span>
          </h2>
          <p className="max-w-2xl mx-auto text-slate-300 text-sm md:text-base font-rajdhani">
            Seven worlds. Different challenges. One multiverse. Select a rotating world to discover its events and open registration.
          </p>
          <div className="universe-status mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-slate-950/80 text-xs font-mono text-cyan-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>MULTIVERSE ONLINE</span>
            <span className="opacity-40">/</span>
            <span>07 DIMENSIONS DETECTED</span>
          </div>
        </div>

        {/* 3D PORTAL VIEWPORT WRAPPER */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          <div className="relative w-full h-[620px] md:h-[760px] rounded-2xl overflow-hidden border border-cyan-500/30 bg-[#02040b] shadow-[0_0_50px_rgba(0,243,255,0.15)]">
            {isUniversesInView ? (
              <>
                {/* Single, Performance-Optimized R3F Canvas */}
                <CinematicScene
                  activeUniverseId={activeUniverseId}
                  isWarping={isWarping}
                  setIsWarping={setIsWarping}
                  onSelectUniverse={handleSelectUniverse}
                  onCameraUpdate={setCameraCoords}
                />

                {/* Tactical HUD Overlay with quick warp dock & controls */}
                <MultiverseHud
                  activeUniverseId={activeUniverseId}
                  isWarping={isWarping}
                  cameraCoords={cameraCoords}
                  onSelectUniverse={handleSelectUniverse}
                  onOpenAbout={() => setAboutOpen(true)}
                  scanlinesEnabled={scanlinesEnabled}
                  setScanlinesEnabled={setScanlinesEnabled}
                />

                {/* Scanlines Effect Overlay */}
                {scanlinesEnabled && (
                  <div className="absolute inset-0 scanlines pointer-events-none z-10 opacity-60" />
                )}
              </>
            ) : (
              /* Lightweight Eco-Standby Placeholder (0% GPU/CPU drain while reading top sections) */
              <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 bg-slate-950/90 text-slate-400">
                <div className="w-12 h-12 rounded-full border border-cyan-500/40 bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-3 animate-spin" style={{ animationDuration: '8s' }}>
                  ✦
                </div>
                <span className="text-xs font-mono tracking-widest text-cyan-300 uppercase">
                  3D MULTIVERSE ENGINE IN ECO-STANDBY
                </span>
                <p className="text-xs text-slate-500 mt-1 font-mono">
                  Scroll into view to engage hardware-accelerated portal
                </p>
              </div>
            )}
          </div>
          <p className="text-center text-[11px] font-mono text-cyan-400/80 mt-3 tracking-wider">
            <span>↗</span> CLICK ANY ORBITING PLANET OR USE THE QUICK-WARP DOCK TO ENTER
          </p>
        </div>
      </section>

      {/* 3. FOOTER */}
      <footer className="footer">
        <div className="footer-content">
          <div>
            <a className="brand footer-brand inline-flex items-center gap-2 mb-3" href="#home">
              <span className="logo">B.</span>
              <span>
                BitCA <small className="block text-[9px] text-slate-400 tracking-widest">TECH CLUB</small>
              </span>
            </a>
            <p>
              Department of Computer Applications<br />
              K.C. College · HSNC University
            </p>
          </div>
        </div>
        <p className="copyright">Reality Not Found. Multiverse 404 © 2026 BitCA v2.4 All Rights Reserved.</p>
      </footer>

      {/* 4. MODALS & OVERLAYS */}
      {/* Active Universe Event Console Drawer */}
      {activeUniverseId && !isWarping && (
        <UniverseModal
          universeId={activeUniverseId}
          onClose={handleCloseUniverseModal}
          onWarpToUniverse={handleSelectUniverse}
          onRegisterEvent={handleRegisterEvent}
        />
      )}

      {/* Registration Terminal Modal */}
      {registeringEvent && (
        <RegistrationModal
          event={registeringEvent.event}
          universe={registeringEvent.universe}
          onClose={() => setRegisteringEvent(null)}
        />
      )}

      {/* Festival Lore & Guide Modal */}
      {aboutOpen && (
        <AboutFestModal
          onClose={() => setAboutOpen(false)}
          onSelectUniverse={handleSelectUniverse}
        />
      )}

      {/* 5. INTERACTIVE CHATBOT */}
      <Chatbot />
    </div>
  );
}
