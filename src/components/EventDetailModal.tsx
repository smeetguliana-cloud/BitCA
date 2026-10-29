import React from 'react';
import { UniverseSystem, EventItem } from '../data/multiverseData';
import { X, Calendar, MapPin, Trophy, Users, ShieldAlert, CheckCircle2, ExternalLink } from 'lucide-react';

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
  if (!universe || !event) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050811]/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-[#090e1f] border rounded-3xl p-6 md:p-8 shadow-2xl overflow-y-auto max-h-[90vh]"
        style={{ borderColor: `${universe.colorStr}55`, boxShadow: `0 0 60px ${universe.glowColor}` }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all cursor-pointer"
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
        <h3 className="text-2xl md:text-3xl font-extrabold text-white font-['Montserrat'] mb-2">
          {event.title}
        </h3>
        <p className="text-sm text-white/70 italic mb-6">
          "{event.tagline}"
        </p>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/10 mb-6 font-['DM_Mono'] text-xs">
          <div>
            <span className="text-white/40 block mb-1">SCHEDULE</span>
            <span className="text-white font-semibold flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#55d9f4]" />
              {event.schedule}
            </span>
          </div>

          <div>
            <span className="text-white/40 block mb-1">VENUE</span>
            <span className="text-white font-semibold flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#55d9f4]" />
              {event.venue}
            </span>
          </div>

          <div>
            <span className="text-white/40 block mb-1">TEAM FORMAT</span>
            <span className="text-white font-semibold flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-[#55d9f4]" />
              {event.teamSize}
            </span>
          </div>

          <div>
            <span className="text-white/40 block mb-1">PRIZE POOL</span>
            <span className="text-[#ffcc00] font-semibold flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5" />
              {event.prizePool || 'Certificate'}
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider font-['DM_Mono'] mb-2 text-[#55d9f4]">
            EVENT BRIEFING & OVERVIEW
          </h4>
          <p className="text-sm text-white/80 leading-relaxed font-['Plus_Jakarta_Sans']">
            {event.description}
          </p>
        </div>

        {/* Rules */}
        <div className="mb-8">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider font-['DM_Mono'] mb-3 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-[#ffaa00]" />
            CRITICAL RULES & REGULATIONS
          </h4>
          <ul className="space-y-2">
            {event.rules.map((rule, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-white/70">
                <CheckCircle2 className="w-4 h-4 text-[#33ff99] shrink-0 mt-0.5" />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
          <div className="text-xs text-white/50 font-['DM_Mono']">
            Entry Fee: <span className="text-white font-bold">{event.entryFee}</span>
            {event.coordinator && ` • Lead: ${event.coordinator}`}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-['DM_Mono'] font-semibold transition-all cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onRegister(universe, event);
              }}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#55d9f4] to-[#8b7cff] text-[#050811] text-xs font-['DM_Mono'] font-bold hover:shadow-[0_0_20px_rgba(85,217,244,0.5)] transition-all cursor-pointer flex items-center gap-2"
            >
              <span>REGISTER NOW</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
