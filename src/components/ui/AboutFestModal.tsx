import React from 'react';
import { motion } from 'motion/react';
import { X, Globe2, Sparkles, MapPin, Calendar, Award, ShieldAlert, Cpu, Heart, Code2 } from 'lucide-react';
import { FEST_DETAILS, MULTIVERSE_DATA } from '../../lib/multiverseData';

interface AboutFestModalProps {
  onClose: () => void;
  onSelectUniverse: (id: string) => void;
}

export const AboutFestModal: React.FC<AboutFestModalProps> = ({
  onClose,
  onSelectUniverse
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.94 }}
        className="w-full max-w-3xl max-h-[90vh] rounded-2xl glass-panel border border-cyan-500/40 p-5 md:p-8 shadow-2xl overflow-y-auto relative text-slate-200"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Fest Header */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 uppercase font-bold tracking-widest">
              ANNUAL TECH-CULTURAL EXTRAVAGANZA
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-orbitron font-extrabold text-white tracking-wider">
            {FEST_DETAILS.name} — <span className="text-cyan-400">REALITY NOT FOUND</span>
          </h2>

          <p className="text-base font-orbitron text-cyan-300 font-semibold italic">
            &ldquo;{FEST_DETAILS.tagline}&rdquo;
          </p>

          <p className="text-sm font-rajdhani text-slate-300 max-w-2xl leading-relaxed">
            {FEST_DETAILS.subtagline} MULTIVERSE 404 is an immersive, multi-dimensional tech-cultural fest exploring what happens when conventional reality breaks down and seven parallel spheres of human creativity, competitive warfare, and ethical inquiry take flight.
          </p>
        </div>

        {/* Fest Key Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {FEST_DETAILS.stats.map((stat, i) => (
            <div
              key={i}
              className="p-3 rounded-xl border border-white/10 bg-slate-950/70 text-center"
            >
              <div className="text-xl md:text-2xl font-orbitron font-extrabold text-cyan-300">
                {stat.value}
              </div>
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mt-0.5">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* The 7 Dimensions Grid */}
        <div className="space-y-3 mb-6">
          <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold flex items-center gap-1.5">
            <Globe2 className="w-3.5 h-3.5 text-cyan-400" /> THE SEVEN PLANETARY REALMS
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {MULTIVERSE_DATA.map((uni) => (
              <div
                key={uni.id}
                onClick={() => {
                  onSelectUniverse(uni.id);
                  onClose();
                }}
                className="p-3.5 rounded-xl border border-white/10 bg-slate-950/60 hover:border-white/30 cursor-pointer transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span
                      className="text-[10px] font-mono font-bold uppercase tracking-wider"
                      style={{ color: uni.primaryColor }}
                    >
                      {uni.code}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {uni.events.length} Events
                    </span>
                  </div>

                  <h4 className="text-sm font-orbitron font-bold text-white group-hover:text-cyan-300 transition-colors mt-0.5">
                    {uni.name}: {uni.title}
                  </h4>

                  <p className="text-xs text-slate-400 font-rajdhani mt-1 line-clamp-2">
                    {uni.philosophicalDescription}
                  </p>
                </div>

                <div className="mt-2 text-[10px] font-mono text-cyan-400 flex items-center gap-1">
                  WARP TO REALM &rarr;
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Date & Campus Venue Coordinates */}
        <div className="p-4 rounded-xl border border-white/10 bg-slate-950/70 space-y-2 text-xs font-mono mb-6">
          <div className="flex items-center gap-2 text-slate-300">
            <Calendar className="w-4 h-4 text-cyan-400 flex-shrink-0" />
            <span>TIMELINE: {FEST_DETAILS.dates} (48 Hours of Continuous Matrix Hackathons & Concerts)</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0" />
            <span>CAMPUS LOCATION: {FEST_DETAILS.venue}</span>
          </div>
        </div>

        {/* Navigation Prompt */}
        <div className="text-center pt-2">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-orbitron font-bold text-xs tracking-wider transition-colors shadow-[0_0_15px_rgba(0,243,255,0.4)]"
          >
            ENTER THE MULTIVERSE SIMULATION
          </button>
        </div>
      </motion.div>
    </div>
  );
};
