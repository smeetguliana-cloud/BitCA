import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Zap,
  Trophy,
  Users,
  Calendar,
  Clock,
  MapPin,
  ChevronRight,
  Minimize2,
  Maximize2,
  Sparkles,
  Rocket,
  ShieldCheck,
  Tag
} from 'lucide-react';
import { MULTIVERSE_DATA, UniverseData, FestEvent } from '../../lib/multiverseData';
import { soundManager } from '../../lib/audio';

interface UniverseModalProps {
  universeId: string;
  onClose: () => void;
  onWarpToUniverse: (id: string | null) => void;
  onRegisterEvent: (event: FestEvent, universe: UniverseData) => void;
}

export const UniverseModal: React.FC<UniverseModalProps> = ({
  universeId,
  onClose,
  onWarpToUniverse,
  onRegisterEvent
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [isMinimized, setIsMinimized] = useState(false);

  const universe = MULTIVERSE_DATA.find((u) => u.id === universeId);
  if (!universe) return null;

  // Other 6 universes for the Inter-Planet Warp Switcher
  const otherUniverses = MULTIVERSE_DATA.filter((u) => u.id !== universeId);

  // Filter events
  const categories = ['ALL', ...Array.from(new Set(universe.events.map((e) => e.category)))];
  const filteredEvents =
    selectedCategory === 'ALL'
      ? universe.events
      : universe.events.filter((e) => e.category === selectedCategory);

  const handleWarp = (targetId: string | null) => {
    soundManager.playClick();
    onWarpToUniverse(targetId);
  };

  return (
    <AnimatePresence>
      <div className="absolute inset-0 pointer-events-none z-30 flex items-center justify-end p-3 sm:p-6 md:pr-10">
        {/* Main Glassmorphic Slide-in Console Drawer */}
        <motion.div
          initial={{ opacity: 0, x: 60, scale: 0.98 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 80, scale: 0.95 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto flex flex-col rounded-2xl glass-panel border transition-all duration-300 overflow-hidden shadow-2xl backdrop-blur-xl ${
            isMinimized
              ? 'w-full max-w-sm max-h-[140px]'
              : 'w-full max-w-2xl max-h-[88vh] md:max-h-[85vh]'
          }`}
          style={{ borderColor: `${universe.primaryColor}55` }}
        >
          {/* CONSOLE HEADER */}
          <div
            className="p-4 md:p-5 border-b border-white/10 flex items-start justify-between gap-3 relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${universe.primaryColor}15 0%, rgba(2, 6, 23, 0.9) 100%)`
            }}
          >
            <div className="space-y-1 pr-2">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full inline-block"
                  style={{ backgroundColor: universe.primaryColor }}
                />
                <span
                  className="text-xs font-mono font-bold tracking-widest uppercase"
                  style={{ color: universe.primaryColor }}
                >
                  {universe.code} // ORBITAL DOCK
                </span>
                <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                  {universe.events.length} EVENTS ACTIVE
                </span>
              </div>

              <h2 className="text-xl md:text-2xl font-orbitron font-extrabold text-white tracking-wide">
                {universe.name}: <span className="font-semibold text-slate-200">{universe.title}</span>
              </h2>

              <p className="text-xs font-mono text-slate-300 italic">
                &ldquo;{universe.tagline}&rdquo;
              </p>
            </div>

            {/* Header Action Buttons (Minimize + Close/Return) */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                title={isMinimized ? 'Expand Console' : 'Minimize Console (View 3D Planet)'}
                className="p-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </button>

              <button
                onClick={onClose}
                title="Return to Nexus Hub"
                className="p-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* MINIMIZED SUMMARY VIEW */}
          {isMinimized && (
            <div className="p-3 bg-slate-950/80 flex items-center justify-between text-xs font-mono text-slate-300">
              <span>Docked at {universe.name}. Planet in view.</span>
              <button
                onClick={() => setIsMinimized(false)}
                className="text-xs font-bold text-cyan-300 underline underline-offset-4 hover:text-cyan-200"
              >
                EXPAND DETAILS & EVENTS &rarr;
              </button>
            </div>
          )}

          {/* EXPANDED FULL CONTENT */}
          {!isMinimized && (
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
              {/* Philosophical Lore Card */}
              <div
                className="p-3.5 rounded-xl border border-white/10 bg-slate-950/60 text-slate-300 text-xs md:text-sm font-rajdhani leading-relaxed space-y-2"
                style={{ borderLeft: `4px solid ${universe.primaryColor}` }}
              >
                <div className="flex items-center gap-1.5 text-[11px] font-mono tracking-wider text-slate-400 uppercase font-semibold">
                  <Sparkles className="w-3.5 h-3.5" style={{ color: universe.primaryColor }} />
                  REALITY ARCHITECTURE & PHILOSOPHY
                </div>
                <p>{universe.philosophicalDescription}</p>
                <div className="text-[11px] font-mono text-slate-400 italic">
                  Core Axiom: &ldquo;{universe.corePhilosophy}&rdquo;
                </div>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
                <span className="text-[11px] font-mono text-slate-400 uppercase flex items-center gap-1 mr-1">
                  <Tag className="w-3 h-3" /> FILTER:
                </span>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      soundManager.playClick();
                      setSelectedCategory(cat);
                    }}
                    className={`px-3 py-1 rounded-md text-xs font-mono font-medium transition-all ${
                      selectedCategory === cat
                        ? 'bg-white/20 text-white border border-white/40 shadow-sm'
                        : 'bg-white/5 text-slate-400 hover:text-slate-200 hover:bg-white/10 border border-transparent'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* EVENT CARDS GRID */}
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">
                    OFFICIAL CONTEST PROTOCOLS ({filteredEvents.length})
                  </h3>
                  <span className="text-[11px] font-mono text-cyan-400">
                    STATUS: REGISTRATIONS OPEN
                  </span>
                </div>

                {filteredEvents.map((event) => (
                  <div
                    key={event.id}
                    className="p-4 rounded-xl border border-white/10 bg-slate-950/70 hover:border-white/25 transition-all space-y-3 group"
                  >
                    {/* Event Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className="text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase tracking-wider"
                            style={{
                              backgroundColor: `${universe.primaryColor}20`,
                              color: universe.primaryColor,
                              border: `1px solid ${universe.primaryColor}40`
                            }}
                          >
                            {event.category}
                          </span>
                          {event.isFlagship && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                              <Trophy className="w-2.5 h-2.5" /> FLAGSHIP
                            </span>
                          )}
                        </div>
                        <h4 className="text-base md:text-lg font-orbitron font-bold text-white group-hover:text-cyan-300 transition-colors mt-1">
                          {event.title}
                        </h4>
                      </div>

                      {/* Prize Pool Highlight */}
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 font-mono text-xs font-bold self-start sm:self-auto">
                        <Trophy className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{event.prizePool}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs md:text-sm text-slate-300 font-rajdhani leading-relaxed">
                      {event.description}
                    </p>

                    {/* Metadata Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono text-slate-300 pt-1 border-t border-white/5">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        <span>{event.teamSize}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{event.timeSlot}</span>
                      </div>
                      <div className="flex items-center gap-1.5 truncate">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                        <span className="truncate">{event.realmLocation}</span>
                      </div>
                    </div>

                    {/* Rules Snippet */}
                    <div className="bg-white/5 p-2.5 rounded-lg space-y-1">
                      <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-cyan-400" /> TOURNAMENT DIRECTIVES:
                      </span>
                      <ul className="text-[11px] text-slate-300 list-disc list-inside space-y-0.5 font-rajdhani">
                        {event.rules.slice(0, 2).map((rule, idx) => (
                          <li key={idx} className="truncate">
                            {rule}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Register Button */}
                    <div className="pt-1 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {event.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-slate-400"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={() => {
                          soundManager.playClick();
                          onRegisterEvent(event, universe);
                        }}
                        className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-lg font-orbitron font-bold text-xs tracking-wider transition-all transform active:scale-95 shadow-md"
                        style={{
                          backgroundColor: universe.primaryColor,
                          color: '#020617',
                          boxShadow: `0 0 15px ${universe.accentGlow}`
                        }}
                      >
                        <Zap className="w-3.5 h-3.5 fill-current" />
                        <span>INITIALIZE REGISTRATION</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* CRUCIAL: INTER-PLANET WARP SWITCHER */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Rocket className="w-4 h-4 text-cyan-400" />
                    <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-300 font-bold">
                      JUMP TO OTHER UNIVERSE // WARP DRIVE
                    </h3>
                  </div>
                  <button
                    onClick={() => handleWarp(null)}
                    className="text-[11px] font-mono text-slate-300 hover:text-white underline underline-offset-4 flex items-center gap-1"
                  >
                    RETURN TO 404 NEXUS &rarr;
                  </button>
                </div>

                <p className="text-xs text-slate-400 font-rajdhani">
                  Engage direct planetary warp vector from {universe.name} to any other coordinate:
                </p>

                {/* Grid of the other 6 universes */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {otherUniverses.map((other) => (
                    <button
                      key={other.id}
                      onClick={() => handleWarp(other.id)}
                      className="p-2.5 rounded-lg border border-white/10 bg-slate-950/70 hover:border-white/30 text-left transition-all group flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2 overflow-hidden">
                        <span
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: other.primaryColor }}
                        />
                        <div className="truncate">
                          <div className="text-[9px] font-mono text-slate-400 uppercase truncate">
                            {other.code}
                          </div>
                          <div className="text-xs font-orbitron font-semibold text-white group-hover:text-cyan-300 truncate">
                            {other.name}
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-colors flex-shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
