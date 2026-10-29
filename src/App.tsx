import React, { useState, useCallback } from 'react';
import { CinematicScene } from './components/three/CinematicScene';
import { MultiverseHud } from './components/ui/MultiverseHud';
import { UniverseModal } from './components/ui/UniverseModal';
import { RegistrationModal } from './components/ui/RegistrationModal';
import { AboutFestModal } from './components/ui/AboutFestModal';
import { UniverseData, FestEvent } from './lib/multiverseData';

export default function App() {
  const [activeUniverseId, setActiveUniverseId] = useState<string | null>(null);
  const [previousUniverseId, setPreviousUniverseId] = useState<string | null>(null);
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
    <div className="relative w-screen h-screen bg-[#02040a] overflow-hidden select-none font-rajdhani">
      {/* 3D WebGL Canvas Viewport */}
      <CinematicScene
        activeUniverseId={activeUniverseId}
        isWarping={isWarping}
        setIsWarping={setIsWarping}
        onSelectUniverse={handleSelectUniverse}
        onCameraUpdate={setCameraCoords}
      />

      {/* Cyber Retro Scanlines Layer */}
      {scanlinesEnabled && (
        <div className="absolute inset-0 scanlines pointer-events-none z-10 opacity-70" />
      )}

      {/* Tactical Multiverse HUD Overlay */}
      <MultiverseHud
        activeUniverseId={activeUniverseId}
        isWarping={isWarping}
        cameraCoords={cameraCoords}
        onSelectUniverse={handleSelectUniverse}
        onOpenAbout={() => setAboutOpen(true)}
        scanlinesEnabled={scanlinesEnabled}
        setScanlinesEnabled={setScanlinesEnabled}
      />

      {/* Active Universe Event Console Drawer */}
      {activeUniverseId && !isWarping && (
        <UniverseModal
          universeId={activeUniverseId}
          onClose={handleCloseUniverseModal}
          onWarpToUniverse={handleSelectUniverse}
          onRegisterEvent={handleRegisterEvent}
        />
      )}

      {/* Interactive Registration Terminal Modal */}
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
    </div>
  );
}
