import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { UniverseSystem, EventItem } from '../data/multiverseData';
import { X, Calendar, MapPin, Trophy, Users, ShieldAlert, CheckCircle2, ExternalLink } from 'lucide-react';
import { sound } from '../audio/soundSystem';

interface EventDetailModalProps {
  universe: UniverseSystem | null;
  event: EventItem | null;
  onClose: () => void;
  onRegister: (universe: UniverseSystem, event: EventItem) => void;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({
  universe,
  event,
  onClose,
  onRegister,
}) => {
  const [portalTarget, setPortalTarget] = useState<Element | null>(null);

  useEffect(() => {
    setPortalTarget(document.fullscreenElement || document.body);
    const handleFsChange = () => {
      setPortalTarget(document.fullscreenElement || document.body);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  if (!universe || !event || !portalTarget) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-[#02040b]/85 backdrop-blur-xl overflow-y-auto animate-in fade-in duration-200 pointer-events-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-full max-w-2xl glass-modal-v5 rounded-3xl p-6 sm:p-8 my-auto overflow-y-auto max-h-[90vh] pb-8 animate-in zoom-in-95 duration-200 liquid-scrollbar"
        style={{
          borderColor: `${universe.colorStr}40`,
          boxShadow: `0 20px 60px 0 rgba(0,0,0,0.7), 0 0 50px ${universe.glowColor}`,
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Topline Kicker */}
        <div className="flex items-center gap-2 mb-2 font-['DM_Mono'] text-xs text-[#55d9f4]">
          <span>{universe.sector}</span>
          <span>/</span>
          <span>{event.category.toUpperCase()}</span>
        </div>

        {/* Title & Tagline */}
        <h3 className="text-2xl sm:text-3xl font-black text-white font-['Montserrat'] mb-2 tracking-tight apple-heading">
          {event.title}
        </h3>
        <p className="text-xs sm:text-sm text-white/70 italic mb-6">
          "{event.tagline}"
        </p>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl glass-card-v5 mb-6 font-['DM_Mono'] text-xs">
          <div>
            <span className="text-white/40 block mb-1">SCHEDULE</span>
            <span className="text-white font-semibold flex items-center gap-1 truncate">
              <Calendar className="w-3.5 h-3.5 text-[#55d9f4] shrink-0" />
              <span className="truncate">{event.schedule}</span>
            </span>
          </div>

          <div>
            <span className="text-white/40 block mb-1">VENUE</span>
            <span className="text-white font-semibold flex items-center gap-1 truncate">
              <MapPin className="w-3.5 h-3.5 text-[#55d9f4] shrink-0" />
              <span className="truncate">{event.venue}</span>
            </span>
          </div>

          <div>
            <span className="text-white/40 block mb-1">TEAM FORMAT</span>
            <span className="text-white font-semibold flex items-center gap-1 truncate">
              <Users className="w-3.5 h-3.5 text-[#55d9f4] shrink-0" />
              <span className="truncate">{event.teamSize}</span>
            </span>
          </div>

          <div>
            <span className="text-white/40 block mb-1">PRIZE POOL</span>
            <span className="text-[#ffcc00] font-semibold flex items-center gap-1 truncate">
              <Trophy className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{event.prizePool || 'Certificate'}</span>
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h4 className="text-xs font-bold text-[#55d9f4] uppercase tracking-wider font-['DM_Mono'] mb-2">
            EVENT BRIEFING & OVERVIEW
          </h4>
          <p className="text-sm text-white/80 leading-relaxed font-['Plus_Jakarta_Sans']">
            {event.description}
          </p>
        </div>

        {/* Rules */}
        <div className="mb-8">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider font-['DM_Mono'] mb-3 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-[#ffaa00]" />
            CRITICAL RULES & REGULATIONS
          </h4>
          <ul className="space-y-2.5">
            {event.rules.map((rule, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-xs text-white/70 font-['Plus_Jakarta_Sans'] leading-relaxed"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#55d9f4] shrink-0 mt-0.5" />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
          <div className="text-xs font-['DM_Mono'] text-white/50">
            Registration Fee: <span className="text-[#55d9f4] font-bold">{event.entryFee}</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-['DM_Mono'] text-xs font-semibold transition-all cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                sound.playClick();
                onClose();
                onRegister(universe, event);
              }}
              className="liquid-btn flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#55d9f4] to-[#8b7cff] text-[#050811] font-['DM_Mono'] text-xs font-bold transition-all shadow-[0_0_20px_rgba(85,217,244,0.4)] hover:shadow-[0_0_30px_rgba(85,217,244,0.7)] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Initialize Registration</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, portalTarget);
};
