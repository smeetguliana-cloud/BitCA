import React, { useState } from 'react';
import { UniverseSystem, EventItem } from '../data/multiverseData';
import { X, CheckCircle, AlertCircle, Send, Sparkles } from 'lucide-react';
import { sound } from '../audio/soundSystem';
import confetti from 'canvas-confetti';

interface RegistrationModalProps {
  universe: UniverseSystem | null;
  event: EventItem | null;
  onClose: () => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  universe,
  event,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    college: '',
    teamName: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!universe || !event) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.college.trim()) {
      setErrorMsg('Please fill in all mandatory fields.');
      return;
    }
    sound.playSuccess();
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: [universe.colorStr, '#55d9f4', '#8b7cff', '#ffffff']
      });
    } catch {
      // Confetti fallback
    }
    setSubmitted(true);
    setErrorMsg('');
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050811]/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-[#090e1f] border rounded-3xl p-6 md:p-8 shadow-2xl"
        style={{ borderColor: `${universe.colorStr}55`, boxShadow: `0 0 60px ${universe.glowColor}` }}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2 font-['DM_Mono'] text-xs text-[#55d9f4]">
          <span>VISIONEXA // REGISTRATION PORTAL</span>
        </div>

        <h3 className="text-2xl font-black text-white font-['Montserrat'] mb-1">
          {event.title}
        </h3>
        <p className="text-xs text-white/60 mb-6 font-['DM_Mono']">
          {universe.sector} • Entry: {event.entryFee}
        </p>

        {submitted ? (
          <div className="p-6 rounded-2xl bg-[#33ff99]/10 border border-[#33ff99]/30 text-center animate-in zoom-in-95">
            <CheckCircle className="w-12 h-12 text-[#33ff99] mx-auto mb-3" />
            <h4 className="text-lg font-bold text-white mb-2 font-['Montserrat']">
              Registration Recorded!
            </h4>
            <p className="text-xs text-white/80 leading-relaxed mb-4">
              Thank you, <span className="text-[#33ff99] font-bold">{formData.fullName}</span>. Your event application preview for <span className="font-semibold text-white">{event.title}</span> has been confirmed. Detailed instructions will be shared with <span className="text-white underline">{formData.email}</span>.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-[#33ff99] text-[#050811] font-['DM_Mono'] text-xs font-bold transition-all cursor-pointer hover:shadow-[0_0_15px_rgba(51,255,153,0.5)]"
            >
              Back to Universe
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-['DM_Mono'] text-white/70 mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="e.g. Alex Morgan"
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 focus:border-[#55d9f4] text-white text-sm outline-none transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-['DM_Mono'] text-white/70 mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@college.edu"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 focus:border-[#55d9f4] text-white text-sm outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-['DM_Mono'] text-white/70 mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 focus:border-[#55d9f4] text-white text-sm outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-['DM_Mono'] text-white/70 mb-1.5">
                College / Institution Name *
              </label>
              <input
                type="text"
                required
                value={formData.college}
                onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                placeholder="e.g. K.C. College, Mumbai"
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 focus:border-[#55d9f4] text-white text-sm outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-['DM_Mono'] text-white/70 mb-1.5">
                Team Name (If applicable)
              </label>
              <input
                type="text"
                value={formData.teamName}
                onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                placeholder="e.g. CyberKnights"
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 focus:border-[#55d9f4] text-white text-sm outline-none transition-colors"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#55d9f4] to-[#8b7cff] text-[#050811] font-['DM_Mono'] font-bold text-xs tracking-wider uppercase hover:shadow-[0_0_20px_rgba(85,217,244,0.6)] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>CONFIRM REGISTRATION</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
