import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { UniverseSystem, EventItem } from '../data/multiverseData';
import { X, CheckCircle, AlertCircle, Send, Sparkles, QrCode, Copy, Check } from 'lucide-react';
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
  const [passId, setPassId] = useState('');
  const [copied, setCopied] = useState(false);
  const [portalTarget, setPortalTarget] = useState<Element | null>(null);

  useEffect(() => {
    // Target active fullscreen element or fallback to document.body
    const target = document.fullscreenElement || document.body;
    setPortalTarget(target);

    const handleFsChange = () => {
      setPortalTarget(document.fullscreenElement || document.body);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  if (!universe || !event || !portalTarget) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.college.trim()) {
      setErrorMsg('Please fill in all mandatory fields.');
      return;
    }

    sound.playSuccess();
    const code = `VX404-${universe.name.substring(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setPassId(code);

    try {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
        colors: [universe.colorStr, '#55d9f4', '#8b7cff', '#ffffff'],
      });
    } catch {
      // Fallback
    }
    setSubmitted(true);
    setErrorMsg('');
  };

  const handleCopyPass = () => {
    if (!passId) return;
    navigator.clipboard.writeText(passId);
    setCopied(true);
    sound.playClick();
    setTimeout(() => setCopied(false), 2000);
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-[#02040b]/85 backdrop-blur-xl overflow-y-auto animate-in fade-in duration-200 pointer-events-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-full max-w-lg glass-modal-v5 rounded-3xl p-6 sm:p-8 my-auto overflow-hidden animate-in zoom-in-95 duration-200"
        style={{
          borderColor: `${universe.colorStr}40`,
          boxShadow: `0 20px 60px 0 rgba(0,0,0,0.7), 0 0 45px ${universe.glowColor}`,
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

        {/* Topline Header */}
        <div className="flex items-center gap-2 mb-2 font-['DM_Mono'] text-xs text-[#55d9f4]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>VISIONEXA // PROTOCOL REGISTRATION</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-black text-white font-['Montserrat'] mb-1 tracking-tight apple-heading">
          {event.title}
        </h3>
        <p className="text-xs text-white/60 mb-6 font-['DM_Mono'] flex items-center gap-2">
          <span>{universe.sector}</span>
          <span>•</span>
          <span className="text-[#55d9f4]">Entry: {event.entryFee}</span>
          <span>•</span>
          <span>{event.teamSize}</span>
        </p>

        {submitted ? (
          /* CONFIRMED PASS VIEW */
          <div className="p-6 rounded-2xl glass-card-v5 border border-[#33ff99]/30 text-center animate-in zoom-in-95 space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#33ff99]/20 border border-[#33ff99]/40 flex items-center justify-center mx-auto text-[#33ff99]">
              <CheckCircle className="w-6 h-6" />
            </div>

            <div>
              <h4 className="text-lg font-bold text-white font-['Montserrat']">
                Registration Confirmed!
              </h4>
              <p className="text-xs text-white/70 mt-1 font-['Plus_Jakarta_Sans'] leading-relaxed">
                Welcome aboard, <strong className="text-white">{formData.fullName}</strong>. Your credential pass has been issued for <span className="text-[#55d9f4] font-semibold">{event.title}</span>.
              </p>
            </div>

            {/* Tactical Holo-Pass Card */}
            <div className="p-4 rounded-xl bg-black/60 border border-white/10 text-left font-['DM_Mono'] space-y-2">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-[10px] text-white/40 uppercase">ACCESS TICKET CODE</span>
                <span className="text-xs font-bold text-[#55d9f4]">{passId}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                <div>
                  <span className="text-white/40 block text-[9px]">PARTICIPANT</span>
                  <span className="text-white truncate block">{formData.fullName}</span>
                </div>
                <div>
                  <span className="text-white/40 block text-[9px]">INSTITUTION</span>
                  <span className="text-white truncate block">{formData.college}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2 pb-2">
              <button
                onClick={handleCopyPass}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-['DM_Mono'] text-white flex items-center gap-1.5 transition-all cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#33ff99]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Pass Copied' : 'Copy Pass ID'}</span>
              </button>

              <button
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-[#33ff99] text-[#050811] font-['DM_Mono'] text-xs font-bold transition-all cursor-pointer hover:shadow-[0_0_15px_rgba(51,255,153,0.5)]"
              >
                Back to Universe
              </button>
            </div>
          </div>
        ) : (
          /* REGISTRATION FORM (16PX INPUTS TO PREVENT MOBILE AUTO-ZOOM) */
          <form onSubmit={handleSubmit} className="space-y-4 pb-6">
            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-['DM_Mono'] text-white/70 mb-1.5 uppercase tracking-wider">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="e.g. Alex Mercer"
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-white placeholder-white/30 focus:border-[#55d9f4] focus:outline-none text-base transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-['DM_Mono'] text-white/70 mb-1.5 uppercase tracking-wider">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@college.edu"
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-white placeholder-white/30 focus:border-[#55d9f4] focus:outline-none text-base transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-['DM_Mono'] text-white/70 mb-1.5 uppercase tracking-wider">
                  Phone / WhatsApp
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-white placeholder-white/30 focus:border-[#55d9f4] focus:outline-none text-base transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-['DM_Mono'] text-white/70 mb-1.5 uppercase tracking-wider">
                College / Institution *
              </label>
              <input
                type="text"
                required
                value={formData.college}
                onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                placeholder="e.g. K.C. College, Churchgate"
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-white placeholder-white/30 focus:border-[#55d9f4] focus:outline-none text-base transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-['DM_Mono'] text-white/70 mb-1.5 uppercase tracking-wider">
                Team Callsign <span className="text-white/40 normal-case">(if applicable)</span>
              </label>
              <input
                type="text"
                value={formData.teamName}
                onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                placeholder="e.g. CyberVanguard-7"
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-white placeholder-white/30 focus:border-[#55d9f4] focus:outline-none text-base transition-colors"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="liquid-btn w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#55d9f4] via-[#8b7cff] to-[#ff4c78] text-[#050811] font-['DM_Mono'] font-extrabold text-sm tracking-wider uppercase shadow-[0_0_25px_rgba(85,217,244,0.4)] hover:shadow-[0_0_40px_rgba(85,217,244,0.7)] active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>TRANSMIT APPLICATION</span>
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );

  return createPortal(modalContent, portalTarget);
};
