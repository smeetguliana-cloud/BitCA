import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, Orbit, Compass, Eye, EyeOff, Info, Globe2, ChevronDown, ChevronUp } from 'lucide-react';
import { MULTIVERSE_DATA, FEST_DETAILS } from '../../lib/multiverseData';
import { soundManager } from '../../lib/audio';

interface MultiverseHudProps {
  activeUniverseId: string | null;
  isWarping: boolean;
  cameraCoords: { x: number; y: number; z: number };
  onSelectUniverse: (id: string | null) => void;
  onOpenAbout: () => void;
  scanlinesEnabled: boolean;
  setScanlinesEnabled: (enabled: boolean) => void;
}

export const MultiverseHud: React.FC<MultiverseHudProps> = ({
  activeUniverseId,
  isWarping,
  cameraCoords,
  onSelectUniverse,
  onOpenAbout,
  scanlinesEnabled,
  setScanlinesEnabled
}) => {
  const [isMuted, setIsMuted] = useState(soundManager.isMuted());
  const [dockCollapsed, setDockCollapsed] = useState(false);

  const activeUniverse = MULTIVERSE_DATA.find((u) => u.id === activeUniverseId);

  const handleToggleSound = () => {
    const newMuted = soundManager.toggleMute();
    setIsMuted(newMuted);
    if (!newMuted) soundManager.playClick();
  };

  const handleSelect = (id: string | null) => {
    soundManager.playClick();
    onSelectUniverse(id);
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-3 md:p-6 overflow-hidden">
      {/* TOP TACTICAL HUD BAR */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 w-full pointer-events-auto">
        {/* Brand & Theme Title */}
        <div className="flex items-center gap-3">
          <div
            onClick={() => handleSelect(null)}
            className="cursor-pointer group flex items-center gap-2.5 px-3.5 py-2 rounded border border-cyan-500/30 bg-slate-950/80 backdrop-blur-md hover:border-cyan-400 transition-all shadow-[0_0_15px_rgba(0,243,255,0.15)]"
          >
            <div className="w-8 h-8 rounded bg-cyan-500/10 border border-cyan-400/50 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
              <Orbit className="w-4 h-4 animate-spin" style={{ animationDuration: '14s' }} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-orbitron font-extrabold text-sm md:text-base tracking-wider text-white group-hover:text-cyan-300 transition-colors">
                  {FEST_DETAILS.name}
                </h1>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  REALITY NOT FOUND
                </span>
              </div>
              <p className="text-[10px] font-mono text-slate-400 hidden sm:block tracking-wide">
                &ldquo;{FEST_DETAILS.tagline}&rdquo; &bull; {FEST_DETAILS.dates}
              </p>
            </div>
          </div>
        </div>

        {/* Live Telemetry & Quick Action Controls */}
        <div className="flex items-center gap-2 flex-wrap text-xs font-mono">
          {/* Spatial Coordinates Pill */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded border border-slate-700/60 bg-slate-950/70 backdrop-blur-md text-slate-300">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[11px] text-slate-400">XYZ:</span>
            <span className="text-[11px] text-cyan-300 font-bold tracking-wider">
              [{cameraCoords.x}, {cameraCoords.y}, {cameraCoords.z}]
            </span>
          </div>

          {/* Warp Status Badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded border border-slate-700/60 bg-slate-950/70 backdrop-blur-md text-[11px]">
            <span
              className={`w-2 h-2 rounded-full ${
                isWarping ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'
              }`}
            />
            <span className="text-slate-400 uppercase">WARP:</span>
            <span
              className={`font-bold uppercase tracking-wider ${
                isWarping ? 'text-amber-400' : 'text-emerald-400'
              }`}
            >
              {isWarping ? 'HYPERSPACE >>' : 'CALIBRATED'}
            </span>
          </div>

          {/* Scanlines Overlay Toggle */}
          <button
            onClick={() => {
              soundManager.playClick();
              setScanlinesEnabled(!scanlinesEnabled);
            }}
            title="Toggle Retro Scanline Simulation"
            className={`p-2 rounded border transition-colors flex items-center justify-center ${
              scanlinesEnabled
                ? 'border-cyan-500/50 bg-cyan-950/60 text-cyan-300'
                : 'border-slate-800 bg-slate-950/60 text-slate-500 hover:text-slate-300'
            }`}
          >
            {scanlinesEnabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>

          {/* Audio Synthesizer Toggle */}
          <button
            onClick={handleToggleSound}
            title={isMuted ? 'Unmute Audio Synthesizer' : 'Mute Audio Synthesizer'}
            className={`p-2 rounded border transition-colors flex items-center justify-center ${
              !isMuted
                ? 'border-cyan-500/50 bg-cyan-950/60 text-cyan-300'
                : 'border-slate-800 bg-slate-950/60 text-slate-500 hover:text-slate-300'
            }`}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Fest Lore & Guide Modal Trigger */}
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenAbout();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-cyan-500/40 bg-cyan-950/40 hover:bg-cyan-900/60 text-cyan-300 font-semibold transition-colors"
          >
            <Info className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">ABOUT FEST</span>
          </button>
        </div>
      </header>

      {/* CENTRAL REALITY PROMPT (Visible only at Nexus Hub) */}
      {!activeUniverseId && !isWarping && (
        <div className="self-center text-center max-w-xl mx-auto my-auto px-4 py-3 rounded-lg border border-cyan-500/20 bg-slate-950/50 backdrop-blur-sm pointer-events-none transition-all animate-fade-in">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-[11px] font-mono tracking-widest text-cyan-400 uppercase font-bold">
              CENTRAL 404 NEXUS INITIALIZED
            </span>
            <Sparkles className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-xs md:text-sm text-slate-300 font-rajdhani leading-relaxed">
            Choose any planetary realm to engage hyperspace trajectory or use the Tactical Dock below to inspect competition protocols.
          </p>
        </div>
      )}

      {/* BOTTOM ERGONOMIC QUICK-WARP DOCK */}
      <footer className="w-full flex flex-col items-center pointer-events-auto max-w-4xl mx-auto">
        {/* Collapse / Expand Toggle Button */}
        <button
          onClick={() => {
            soundManager.playClick();
            setDockCollapsed(!dockCollapsed);
          }}
          className="mb-1.5 px-3 py-1 rounded-t border-t border-x border-cyan-500/30 bg-slate-950/90 backdrop-blur-md text-[10px] font-mono text-cyan-300 tracking-wider flex items-center gap-1.5 hover:text-white transition-colors"
        >
          {dockCollapsed ? (
            <>
              <ChevronUp className="w-3 h-3 text-cyan-400" /> SHOW QUICK-WARP DOCK
            </>
          ) : (
            <>
              <ChevronDown className="w-3 h-3 text-cyan-400" /> HIDE DOCK
            </>
          )}
        </button>

        {/* Tactical Dock Tray */}
        {!dockCollapsed && (
          <nav className="w-full glass-panel-glow rounded-xl p-2 md:p-3 transition-all duration-300">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-thin">
              {/* Central Nexus Return Button */}
              <button
                onClick={() => handleSelect(null)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
                  !activeUniverseId
                    ? 'bg-cyan-500/20 border border-cyan-400 text-cyan-200 shadow-[0_0_12px_rgba(0,243,255,0.3)]'
                    : 'bg-slate-900/80 border border-slate-700/60 text-slate-400 hover:text-white hover:border-slate-500'
                }`}
              >
                <Globe2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>404 NEXUS</span>
              </button>

              <div className="h-6 w-px bg-slate-800 flex-shrink-0 mx-1" />

              {/* 7 Universe Selector Tabs */}
              {MULTIVERSE_DATA.map((uni) => {
                const isCurrent = activeUniverseId === uni.id;
                return (
                  <button
                    key={uni.id}
                    onClick={() => handleSelect(uni.id)}
                    className={`flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-lg text-left transition-all ${
                      isCurrent
                        ? 'bg-slate-800/90 border border-white/40 shadow-lg text-white'
                        : 'bg-slate-950/60 border border-white/5 hover:border-white/20 text-slate-400 hover:text-slate-200'
                    }`}
                    style={{
                      borderColor: isCurrent ? uni.primaryColor : undefined,
                      boxShadow: isCurrent ? `0 0 15px ${uni.accentGlow}` : undefined
                    }}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: uni.primaryColor }}
                    />
                    <div className="flex flex-col">
                      <span className="text-[9px] font-mono leading-none tracking-widest text-slate-400 uppercase">
                        {uni.code.replace('UNIVERSE ', 'U-0')}
                      </span>
                      <span className="text-xs font-orbitron font-semibold text-white leading-tight">
                        {uni.name}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </nav>
        )}
      </footer>
    </div>
  );
};
