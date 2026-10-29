import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, CheckCircle, ShieldCheck, QrCode, Copy, Check, Download, Zap, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { FestEvent, UniverseData } from '../../lib/multiverseData';
import { soundManager } from '../../lib/audio';

interface RegistrationModalProps {
  event: FestEvent;
  universe: UniverseData;
  onClose: () => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  event,
  universe,
  onClose
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [college, setCollege] = useState('');
  const [studentId, setStudentId] = useState('');
  const [teamName, setTeamName] = useState('');
  const [submittedPass, setSubmittedPass] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const isTeam = event.teamSize.toLowerCase().includes('team') || event.teamSize.toLowerCase().includes('squad') || event.teamSize.toLowerCase().includes('band');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !college) return;

    // Generate unique Pass ID
    const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase();
    const passCode = `M404-${universe.name.substring(0, 3).toUpperCase()}-${Date.now().toString().slice(-4)}-${randomHex}`;

    // Save to localStorage
    const saved = JSON.parse(localStorage.getItem('multiverse404_passes') || '[]');
    saved.push({
      passCode,
      eventName: event.title,
      universeName: universe.name,
      fullName,
      email,
      college,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('multiverse404_passes', JSON.stringify(saved));

    setSubmittedPass(passCode);
    soundManager.playSuccess();

    // Trigger cyber celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: [universe.primaryColor, '#ffffff', '#38bdf8', '#c084fc']
      });
    } catch {
      // Ignored
    }
  };

  const handleCopy = () => {
    if (!submittedPass) return;
    navigator.clipboard.writeText(submittedPass);
    setCopied(true);
    soundManager.playClick();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.94 }}
        className="w-full max-w-lg rounded-2xl glass-panel border border-white/20 p-5 md:p-6 shadow-2xl relative overflow-hidden"
        style={{ borderColor: `${universe.primaryColor}66` }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!submittedPass ? (
          /* REGISTRATION FORM */
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full inline-block"
                  style={{ backgroundColor: universe.primaryColor }}
                />
                <span className="text-[11px] font-mono tracking-widest uppercase text-slate-400">
                  {universe.code} // TOURNAMENT PROTOCOL
                </span>
              </div>
              <h3 className="text-xl font-orbitron font-bold text-white mt-0.5">
                {event.title}
              </h3>
              <p className="text-xs font-mono text-cyan-300">
                Prize Pool: {event.prizePool} &bull; {event.teamSize}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 font-rajdhani">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  CANDIDATE FULL NAME *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Alex Mercer"
                  className="w-full px-3 py-2 rounded-lg bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-base"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    STUDENT / ROLL ID *
                  </label>
                  <input
                    type="text"
                    required
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    placeholder="e.g. 24BCS1088"
                    className="w-full px-3 py-2 rounded-lg bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-base"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    OFFICIAL EMAIL *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@institute.edu"
                    className="w-full px-3 py-2 rounded-lg bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-base"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  COLLEGE / INSTITUTION NAME *
                </label>
                <input
                  type="text"
                  required
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  placeholder="e.g. Institute of Science & Technology"
                  className="w-full px-3 py-2 rounded-lg bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-base"
                />
              </div>

              {isTeam && (
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    TEAM / SQUAD CALLSIGN *
                  </label>
                  <input
                    type="text"
                    required
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="e.g. CyberVanguard-7"
                    className="w-full px-3 py-2 rounded-lg bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-base"
                  />
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl font-orbitron font-bold text-sm tracking-wider flex items-center justify-center gap-2 transition-all transform active:scale-98 shadow-lg text-slate-950"
                  style={{
                    backgroundColor: universe.primaryColor,
                    boxShadow: `0 0 20px ${universe.accentGlow}`
                  }}
                >
                  <Zap className="w-4 h-4 fill-current" />
                  <span>CONFIRM & TRANSMIT CREDENTIALS</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* ISSUED HOLO-PASS CONFIRMATION */
          <div className="space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle className="w-6 h-6" />
            </div>

            <div>
              <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase font-bold">
                REGISTRATION PROTOCOL VERIFIED
              </span>
              <h3 className="text-xl font-orbitron font-extrabold text-white mt-1">
                MULTIVERSE ACCESS PASS ISSUED
              </h3>
            </div>

            {/* Tactical Ticket Holo-Card */}
            <div
              className="p-4 rounded-xl border border-white/20 bg-slate-950/90 text-left space-y-3 relative overflow-hidden"
              style={{
                boxShadow: `0 0 25px ${universe.accentGlow}`
              }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">
                    SECTOR // EVENT
                  </span>
                  <div className="text-sm font-orbitron font-bold text-white">
                    {event.title}
                  </div>
                  <div className="text-xs font-mono text-cyan-300">
                    {universe.name} &bull; {event.realmLocation}
                  </div>
                </div>

                <div className="w-10 h-10 rounded bg-white/5 border border-white/10 flex items-center justify-center text-slate-300">
                  <QrCode className="w-6 h-6" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-2 border-t border-white/10">
                <div>
                  <span className="text-slate-500 text-[10px] block">CANDIDATE</span>
                  <span className="text-slate-200 font-semibold">{fullName}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">AFFILIATION</span>
                  <span className="text-slate-200 font-semibold truncate block">{college}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-slate-500 text-[9px] block">SECURITY PASS ID</span>
                  <span className="text-xs font-mono font-bold text-cyan-300 tracking-wider">
                    {submittedPass}
                  </span>
                </div>

                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-xs font-mono text-white transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" /> Copy Pass
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono font-bold text-white transition-colors"
              >
                RETURN TO EXPLORATION
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
