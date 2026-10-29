import React, { useState, useEffect } from 'react';
import {
  UNIVERSES,
  UniverseSystem,
  EventItem
} from './data/multiverseData';
import { ThreeUniverseSection } from './components/ThreeUniverseSection';
import { EventDetailModal } from './components/EventDetailModal';
import { RegistrationModal } from './components/RegistrationModal';
import { ChatbotModal } from './components/ChatbotModal';
import { MainSiteSections } from './components/ui/MainSiteSections';
import { sound } from './audio/soundSystem';
import {
  Menu,
  X,
  Compass,
  ArrowRight,
  Sparkles,
  ChevronDown,
  Rocket,
  Globe2,
} from 'lucide-react';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [selectedUniverseForReg, setSelectedUniverseForReg] = useState<UniverseSystem | null>(null);
  const [selectedEventForReg, setSelectedEventForReg] = useState<EventItem | null>(null);
  const [detailUniverse, setDetailUniverse] = useState<UniverseSystem | null>(null);
  const [detailEvent, setDetailEvent] = useState<EventItem | null>(null);

  // Smooth scroll fade-in / fade-out intersection observer
  useEffect(() => {
    const sections = document.querySelectorAll('.scroll-section-fade');
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('section-in-view');
            entry.target.classList.remove('section-dimmed');
          } else {
            const rect = entry.boundingClientRect;
            if (rect.bottom < 0) {
              entry.target.classList.add('section-dimmed');
            } else if (rect.top > window.innerHeight) {
              entry.target.classList.remove('section-in-view');
            }
          }
        });
      },
      {
        threshold: [0.08, 0.25, 0.5],
        rootMargin: '0px 0px -40px 0px',
      }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  const handleOpenRegister = (universe: UniverseSystem, event: EventItem) => {
    sound.playClick();
    setSelectedUniverseForReg(universe);
    setSelectedEventForReg(event);
  };

  const handleOpenDetail = (universe: UniverseSystem, event: EventItem) => {
    sound.playClick();
    setDetailUniverse(universe);
    setDetailEvent(event);
  };

  const handleEnterPortal = () => {
    sound.playWarp();
    setIsPortalOpen(true);
    const el = document.getElementById('universes');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClosePortal = () => {
    sound.playReturn();
    setIsPortalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#050811] text-[#f4f6ff] font-['Plus_Jakarta_Sans'] selection:bg-[#55d9f4] selection:text-[#050811] relative overflow-hidden">
      {/* Atmospheric Star Background & Deep Space Gradients (Lightweight CSS, Zero GPU Throttle) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#55d9f4]/5 blur-[120px]" />
        <div className="absolute top-[40%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#8b7cff]/5 blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-[#55d9f4]/4 blur-[130px]" />
      </div>

      {/* -------------------- Top Navigation Bar (Glassy V5) -------------------- */}
      <header className="sticky top-0 z-40 h-16 sm:h-20 px-4 sm:px-8 md:px-12 flex items-center justify-between glass-panel-v5 border-b border-white/10 transition-all">
        <a href="#home" className="flex items-center gap-3 group cursor-pointer">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#55d9f4] to-[#8b7cff] flex items-center justify-center text-white font-black text-base sm:text-lg shadow-[0_0_20px_rgba(85,217,244,0.4)] group-hover:scale-105 transition-transform font-['Montserrat']">
            B.
          </div>
          <div>
            <div className="font-bold text-sm sm:text-base tracking-tight text-white font-['Montserrat'] flex items-center gap-1.5 sm:gap-2">
              BitCA <span className="text-[10px] font-['DM_Mono'] px-1.5 py-0.5 rounded bg-white/10 text-[#55d9f4]">v2.4</span>
            </div>
            <div className="text-[8px] sm:text-[9px] font-['DM_Mono'] text-white/50 tracking-widest uppercase">
              TECH CLUB • K.C. COLLEGE
            </div>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs font-semibold font-['DM_Mono'] text-white/70">
          <a href="#home" className="hover:text-[#55d9f4] transition-colors">HOME</a>
          <a href="#about" className="hover:text-[#55d9f4] transition-colors">ABOUT</a>
          <a href="#incharges" className="hover:text-[#55d9f4] transition-colors">GUIDES</a>
          <a href="#faculty" className="hover:text-[#55d9f4] transition-colors">FACULTY</a>
          <a href="#team" className="hover:text-[#55d9f4] transition-colors">LEADERSHIP</a>
          <a href="#departments" className="hover:text-[#55d9f4] transition-colors">HODS</a>
          <button
            onClick={handleEnterPortal}
            className="hover:text-[#55d9f4] text-[#55d9f4] transition-colors flex items-center gap-1.5 cursor-pointer font-bold"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#55d9f4] animate-pulse" />
            7 UNIVERSES PORTAL
          </button>
        </nav>

        {/* Action Button */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={handleEnterPortal}
            className="liquid-btn px-4.5 py-2.5 rounded-xl bg-gradient-to-r from-[#55d9f4] to-[#8b7cff] text-[#050811] font-['DM_Mono'] font-bold text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(85,217,244,0.4)] hover:shadow-[0_0_30px_rgba(85,217,244,0.65)] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
          >
            <span>ENTER MULTIVERSE</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-white/80 hover:text-white cursor-pointer"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile Drawer (Glassy V5 Modal Style) */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed top-16 left-0 right-0 z-40 glass-modal-v5 border-b border-white/10 p-6 flex flex-col gap-4 font-['DM_Mono'] text-sm animate-in fade-in slide-in-from-top-3 duration-200">
          <a href="#home" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-[#55d9f4]">Home</a>
          <a href="#about" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-[#55d9f4]">About</a>
          <a href="#incharges" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-[#55d9f4]">Guides</a>
          <a href="#faculty" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-[#55d9f4]">Faculty</a>
          <a href="#team" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-[#55d9f4]">Head Team</a>
          <a href="#departments" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-[#55d9f4]">HODs</a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              handleEnterPortal();
            }}
            className="liquid-btn py-2.5 text-left text-[#55d9f4] font-bold flex items-center gap-2 border-t border-white/10 mt-2"
          >
            <span>Enter 7 Universes Portal ↗</span>
          </button>
        </div>
      )}

      <main className="relative z-10">
        {/* -------------------- HERO SECTION -------------------- */}
        <section
          id="home"
          className="scroll-section-fade relative min-h-[85vh] px-4 sm:px-8 md:px-12 pt-12 sm:pt-16 pb-16 flex flex-col justify-center max-w-7xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card-v5 text-[#55d9f4] text-xs font-['DM_Mono'] font-bold tracking-wider mb-6 w-fit">
            <Sparkles className="w-3.5 h-3.5" />
            VISIONEXA 2025 & 2026 // K.C. COLLEGE
          </div>

          <h1 className="text-4xl sm:text-7xl md:text-8xl font-black tracking-tight text-white font-['Montserrat'] leading-[1.05] mb-4 apple-heading">
            MULTIVERSE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#55d9f4] via-[#8b7cff] to-[#ff4c78]">404</span>
          </h1>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white/90 font-['Montserrat'] mb-6 apple-heading">
            REALITY <span className="text-[#8b7cff] drop-shadow-[0_0_20px_rgba(139,124,255,0.6)]">NOT FOUND.</span>
          </h2>

          <p className="max-w-2xl text-base md:text-lg text-white/70 leading-relaxed mb-4 font-['Plus_Jakarta_Sans']">
            In a world where AI can generate content and predict human behavior, how do we preserve our individuality? Explore the intersection of cutting-edge technology, culture, and humanity.
          </p>

          <p className="text-sm md:text-base text-[#55d9f4] italic font-['Plus_Jakarta_Sans'] mb-10">
            "When your mirror starts thinking, is it still a reflection?"
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={handleEnterPortal}
              className="liquid-btn px-7 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-[#55d9f4] to-[#8b7cff] text-[#050811] font-['DM_Mono'] font-extrabold text-xs sm:text-sm tracking-wider uppercase shadow-[0_0_30px_rgba(85,217,244,0.5)] hover:shadow-[0_0_45px_rgba(139,124,255,0.7)] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2.5"
            >
              <span>EXPLORE THE 7 DIMENSIONS</span>
              <Compass className="w-4 h-4" />
            </button>

            <a
              href="#about"
              className="px-6 sm:px-7 py-3.5 sm:py-4 rounded-2xl glass-card-v5 text-white font-['DM_Mono'] text-xs font-semibold tracking-wider hover:border-[#55d9f4]/40 transition-all flex items-center gap-2"
            >
              <span>ABOUT BITCA</span>
              <ChevronDown className="w-4 h-4" />
            </a>
          </div>

          {/* Quick Stat Badges (Glassy Dashboard V5) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4 mt-14 pt-8 border-t border-white/10 max-w-4xl">
            <div className="p-4 rounded-2xl glass-card-v5">
              <span className="text-2xl sm:text-3xl font-black text-white font-['Montserrat'] block">07</span>
              <span className="text-[10px] sm:text-[11px] font-['DM_Mono'] text-[#55d9f4] tracking-widest uppercase">Planetary Universes</span>
            </div>
            <div className="p-4 rounded-2xl glass-card-v5">
              <span className="text-2xl sm:text-3xl font-black text-white font-['Montserrat'] block">24+</span>
              <span className="text-[10px] sm:text-[11px] font-['DM_Mono'] text-[#8b7cff] tracking-widest uppercase">Fest Events</span>
            </div>
            <div className="p-4 rounded-2xl glass-card-v5">
              <span className="text-2xl sm:text-3xl font-black text-white font-['Montserrat'] block">₹75K+</span>
              <span className="text-[10px] sm:text-[11px] font-['DM_Mono'] text-[#ffcc00] tracking-widest uppercase">Total Prize Pool</span>
            </div>
            <div className="p-4 rounded-2xl glass-card-v5">
              <span className="text-2xl sm:text-3xl font-black text-white font-['Montserrat'] block">v2.4</span>
              <span className="text-[10px] sm:text-[11px] font-['DM_Mono'] text-[#33ff99] tracking-widest uppercase">Active Edition</span>
            </div>
          </div>
        </section>

        {/* -------------------- 06 / SEVEN UNIVERSES 3D EXPERIENCE (CORE PORTAL) -------------------- */}
        <section
          id="universes"
          className="scroll-section-fade relative py-12 sm:py-16 scroll-mt-16"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 mb-6 sm:mb-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 pb-6 border-b border-white/10">
              <div>
                <span className="text-xs font-['DM_Mono'] font-bold text-[#55d9f4] tracking-widest uppercase block mb-2">
                  06 / VISIONEXA EVENT PORTAL
                </span>
                <h2 className="text-3xl sm:text-5xl font-black text-white font-['Montserrat'] tracking-tight">
                  THE SEVEN <span className="text-[#55d9f4]">UNIVERSES</span>
                </h2>
                <p className="text-sm md:text-base text-white/70 max-w-2xl mt-2 leading-relaxed">
                  Enter a vast deep-space multiverse inspired by astronomical exploration. Navigate through stellar systems, cosmic nebulae, and warp portals to discover seven planetary realms, their rules, and live competition registrations.
                </p>
              </div>

              <div className="flex items-center gap-3 glass-card-v5 px-3.5 py-1.5 rounded-full w-fit">
                <span className="text-xs font-['DM_Mono'] text-white/70">
                  {isPortalOpen ? '3D PORTAL ENGINE ACTIVE' : 'PORTAL GATEWAY READY'}
                </span>
                <span className={`w-2.5 h-2.5 rounded-full ${isPortalOpen ? 'bg-[#33ff99] animate-ping' : 'bg-[#55d9f4] animate-pulse'}`} />
              </div>
            </div>
          </div>

          {/* Conditional Portal Rendering: Seamless Auto-Fitting Viewport */}
          {isPortalOpen ? (
            <div className="relative w-full">
              <ThreeUniverseSection
                onOpenRegister={handleOpenRegister}
                onOpenEventDetail={handleOpenDetail}
                onClosePortal={handleClosePortal}
              />
            </div>
          ) : (
            <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12">
              <div className="relative rounded-3xl glass-panel-v5 overflow-hidden p-6 sm:p-10 md:p-14 text-center">
                {/* Background Cosmic Glow Highlights */}
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#55d9f4]/15 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#8b7cff]/15 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 max-w-3xl mx-auto">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card-v5 text-xs font-['DM_Mono'] text-[#55d9f4] mb-6">
                    <Rocket className="w-3.5 h-3.5" />
                    CATMULL-ROM 3D TRAVEL PHYSICS & WARP READY
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-extrabold text-white font-['Montserrat'] mb-4 tracking-tight">
                    Step Into the 3D Multiverse Portal
                  </h3>

                  <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-8 font-['Plus_Jakarta_Sans']">
                    Launch the interactive 3D universe portal with relativistic camera dive, instanced warp particles, and glassmorphic tactical HUD to inspect competition directives and initialize registrations.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
                    <button
                      onClick={handleEnterPortal}
                      className="w-full sm:w-auto px-8 sm:px-10 py-4 rounded-2xl bg-gradient-to-r from-[#55d9f4] via-[#8b7cff] to-[#ec4899] text-[#050811] font-['Montserrat'] font-black text-sm sm:text-base tracking-wider uppercase shadow-[0_0_35px_rgba(85,217,244,0.5)] hover:shadow-[0_0_55px_rgba(139,124,255,0.8)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>ENTER EVENT PORTAL ↗</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* 7 Universes Quick Overview Grid */}
                  <div className="pt-8 border-t border-white/10 text-left">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-['DM_Mono'] text-white/60 uppercase tracking-wider flex items-center gap-2">
                        <Globe2 className="w-3.5 h-3.5 text-[#55d9f4]" />
                        7 Discovered Cosmic Destinations:
                      </span>
                      <span className="text-[11px] font-['DM_Mono'] text-[#55d9f4]">
                        24 Events Total
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
                      {UNIVERSES.map((u) => (
                        <div
                          key={u.id}
                          onClick={handleEnterPortal}
                          className="p-3.5 rounded-2xl glass-card-v5 hover:border-[#55d9f4]/50 transition-all cursor-pointer group"
                        >
                          <div className="flex items-center gap-1.5 mb-1.5">
                            <span
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: u.colorStr }}
                            />
                            <span className="text-xs font-bold text-white group-hover:text-[#55d9f4] transition-colors truncate font-['Montserrat']">
                              {u.name}
                            </span>
                          </div>
                          <p className="text-[10px] text-white/50 font-['DM_Mono'] truncate">
                            {u.title}
                          </p>
                          <span className="text-[9px] text-[#55d9f4]/80 font-['DM_Mono'] block mt-1">
                            {u.events.length} Events
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* -------------------- MAIN SITE SECTIONS (ABOUT, GUIDES, FACULTY, HEAD TEAM, HODS) -------------------- */}
        <MainSiteSections />
      </main>

      {/* -------------------- FOOTER (Glassy V5) -------------------- */}
      <footer className="border-t border-white/10 glass-panel-v5 py-12 px-4 sm:px-8 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#55d9f4] to-[#8b7cff] flex items-center justify-center text-white font-black text-lg font-['Montserrat']">
              B.
            </div>
            <div>
              <div className="font-bold text-white font-['Montserrat'] text-sm">
                BitCA TECH CLUB <span className="text-[#55d9f4]">v2.4</span>
              </div>
              <div className="text-xs text-white/50 font-['DM_Mono']">
                Department of Computer Applications • K.C. College, HSNC University
              </div>
            </div>
          </div>

          <div className="text-xs text-white/50 font-['DM_Mono']">
            Reality Not Found. Multiverse 404 © 2026 BitCA All Rights Reserved.
          </div>
        </div>
      </footer>

      {/* Interactive Modals (Rendered via React Portal with z-[100] Topmost Priority) */}
      <EventDetailModal
        universe={detailUniverse}
        event={detailEvent}
        onClose={() => {
          setDetailUniverse(null);
          setDetailEvent(null);
        }}
        onRegister={handleOpenRegister}
      />

      <RegistrationModal
        universe={selectedUniverseForReg}
        event={selectedEventForReg}
        onClose={() => {
          setSelectedUniverseForReg(null);
          setSelectedEventForReg(null);
        }}
      />

      <ChatbotModal />
    </div>
  );
}
