import React, { useState } from 'react';
import {
  INCHARGES,
  TEACHING_FACULTY,
  NON_TEACHING_FACULTY,
  HEAD_TEAM,
  HODS,
  UNIVERSES,
  UniverseSystem,
  EventItem
} from './data/multiverseData';
import { ThreeUniverseSection } from './components/ThreeUniverseSection';
import { EventDetailModal } from './components/EventDetailModal';
import { RegistrationModal } from './components/RegistrationModal';
import { ChatbotModal } from './components/ChatbotModal';
import { sound } from './audio/soundSystem';
import {
  Menu,
  X,
  Compass,
  ArrowRight,
  Sparkles,
  ChevronDown,
  Layers,
  Rocket,
  Globe2,
  Calendar,
  ShieldCheck,
  Maximize2
} from 'lucide-react';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [selectedUniverseForReg, setSelectedUniverseForReg] = useState<UniverseSystem | null>(null);
  const [selectedEventForReg, setSelectedEventForReg] = useState<EventItem | null>(null);
  const [detailUniverse, setDetailUniverse] = useState<UniverseSystem | null>(null);
  const [detailEvent, setDetailEvent] = useState<EventItem | null>(null);

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
      {/* Atmospheric Star Background & Deep Space Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#55d9f4]/5 blur-[120px]" />
        <div className="absolute top-[40%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#8b7cff]/5 blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-[#55d9f4]/4 blur-[130px]" />
      </div>

      {/* -------------------- Top Navigation Bar -------------------- */}
      <header className="sticky top-0 z-40 h-20 px-6 md:px-12 flex items-center justify-between bg-[#050811]/85 backdrop-blur-xl border-b border-white/10 transition-all">
        <a href="#home" className="flex items-center gap-3.5 group cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#55d9f4] to-[#8b7cff] flex items-center justify-center text-white font-black text-lg shadow-[0_0_20px_rgba(85,217,244,0.4)] group-hover:scale-105 transition-transform font-['Montserrat']">
            B.
          </div>
          <div>
            <div className="font-bold text-base md:text-lg tracking-tight text-white font-['Montserrat'] flex items-center gap-2">
              BitCA <span className="text-[10px] font-['DM_Mono'] px-2 py-0.5 rounded bg-white/10 text-[#55d9f4]">v2.4</span>
            </div>
            <div className="text-[9px] font-['DM_Mono'] text-white/50 tracking-widest uppercase">
              TECH CLUB • K.C. COLLEGE
            </div>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold font-['DM_Mono'] text-white/70">
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
        <div className="hidden sm:flex items-center gap-4">
          <button
            onClick={handleEnterPortal}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#55d9f4] to-[#8b7cff] text-[#050811] font-['DM_Mono'] font-bold text-xs tracking-wider uppercase hover:shadow-[0_0_25px_rgba(85,217,244,0.6)] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
          >
            <span>ENTER MULTIVERSE</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-white/80 hover:text-white cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed top-20 left-0 right-0 z-40 bg-[#050811]/98 backdrop-blur-2xl border-b border-white/10 p-6 flex flex-col gap-4 font-['DM_Mono'] text-sm">
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
            className="py-2 text-left text-[#55d9f4] font-bold flex items-center gap-2"
          >
            <span>Enter 7 Universes Portal ↗</span>
          </button>
        </div>
      )}

      <main className="relative z-10">
        {/* -------------------- HERO SECTION -------------------- */}
        <section id="home" className="relative min-h-[90vh] px-6 md:px-12 pt-16 pb-20 flex flex-col justify-center max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#55d9f4]/10 border border-[#55d9f4]/30 text-[#55d9f4] text-xs font-['DM_Mono'] font-bold tracking-wider mb-6 w-fit">
            <Sparkles className="w-3.5 h-3.5" />
            VISIONEXA 2025 & 2026 // K.C. COLLEGE
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-white font-['Montserrat'] leading-[1.05] mb-4">
            MULTIVERSE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#55d9f4] via-[#8b7cff] to-[#ff4c78]">404</span>
          </h1>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white/90 font-['Montserrat'] mb-6">
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
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#55d9f4] to-[#8b7cff] text-[#050811] font-['DM_Mono'] font-extrabold text-sm tracking-wider uppercase hover:shadow-[0_0_35px_rgba(85,217,244,0.7)] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2.5"
            >
              <span>EXPLORE THE 7 DIMENSIONS</span>
              <Compass className="w-4 h-4" />
            </button>

            <a
              href="#about"
              className="px-7 py-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 text-white font-['DM_Mono'] text-xs font-semibold tracking-wider transition-all flex items-center gap-2"
            >
              <span>ABOUT BITCA</span>
              <ChevronDown className="w-4 h-4" />
            </a>
          </div>

          {/* Quick Stat Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 pt-10 border-t border-white/10 max-w-4xl">
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <span className="text-3xl font-black text-white font-['Montserrat'] block">07</span>
              <span className="text-[11px] font-['DM_Mono'] text-[#55d9f4] tracking-widest uppercase">Planetary Universes</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <span className="text-3xl font-black text-white font-['Montserrat'] block">24+</span>
              <span className="text-[11px] font-['DM_Mono'] text-[#8b7cff] tracking-widest uppercase">Fest Events</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <span className="text-3xl font-black text-white font-['Montserrat'] block">₹75K+</span>
              <span className="text-[11px] font-['DM_Mono'] text-[#ffcc00] tracking-widest uppercase">Total Prize Pool</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <span className="text-3xl font-black text-white font-['Montserrat'] block">v2.4</span>
              <span className="text-[11px] font-['DM_Mono'] text-[#33ff99] tracking-widest uppercase">Active Edition</span>
            </div>
          </div>
        </section>

        {/* -------------------- 06 / SEVEN UNIVERSES 3D EXPERIENCE (CORE FEATURE) -------------------- */}
        <section id="universes" className="relative py-16 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-6 md:px-12 mb-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
              <div>
                <span className="text-xs font-['DM_Mono'] font-bold text-[#55d9f4] tracking-widest uppercase block mb-2">
                  06 / VISIONEXA EVENT PORTAL
                </span>
                <h2 className="text-3xl sm:text-5xl font-black text-white font-['Montserrat'] tracking-tight">
                  THE SEVEN <span className="text-[#55d9f4]">UNIVERSES</span>
                </h2>
                <p className="text-sm md:text-base text-white/70 max-w-2xl mt-2 leading-relaxed">
                  Enter a vast deep-space multiverse inspired by deep-field astronomy. Navigate through thousands of stars, distant galaxies, and cosmic dust lanes to discover seven unique universe destinations, explore their cosmic environments, and participate in their events.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-['DM_Mono'] text-white/50">
                  {isPortalOpen ? '3D PORTAL ENGINE ACTIVE' : 'PORTAL GATEWAY READY'}
                </span>
                <span className={`w-2.5 h-2.5 rounded-full ${isPortalOpen ? 'bg-[#33ff99] animate-ping' : 'bg-[#55d9f4] animate-pulse'}`} />
              </div>
            </div>
          </div>

          {/* Conditional Portal Rendering: Click-to-Enter Architecture */}
          {isPortalOpen ? (
            <div className="relative">
              <ThreeUniverseSection
                onOpenRegister={handleOpenRegister}
                onOpenEventDetail={handleOpenDetail}
                onClosePortal={handleClosePortal}
              />
            </div>
          ) : (
            <div className="max-w-7xl mx-auto px-6 md:px-12">
              <div className="relative rounded-3xl bg-gradient-to-b from-[#090e1f]/90 via-[#060a16]/95 to-[#02040b] border border-white/10 overflow-hidden shadow-[0_0_80px_rgba(85,217,244,0.08)] p-8 md:p-14 text-center">
                {/* Background Cosmic Glow Highlights */}
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#55d9f4]/15 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#8b7cff]/15 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 max-w-3xl mx-auto">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-['DM_Mono'] text-[#55d9f4] mb-6">
                    <Rocket className="w-3.5 h-3.5" />
                    CATMULL-ROM 3D TRAVEL PHYSICS & WARP READY
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-extrabold text-white font-['Montserrat'] mb-4 tracking-tight">
                    Step Into the 3D Multiverse Portal
                  </h3>

                  <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-8">
                    To maintain standard web browsing performance and avoid scroll trapping, the interactive 3D universe portal is launched on-demand. Click below to initiate the warp sequence into the 7 cosmic dimensions.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                    <button
                      onClick={handleEnterPortal}
                      className="w-full sm:w-auto px-9 py-4.5 rounded-2xl bg-gradient-to-r from-[#55d9f4] via-[#8b7cff] to-[#ec4899] text-[#050811] font-['Montserrat'] font-black text-sm sm:text-base tracking-wider uppercase shadow-[0_0_35px_rgba(85,217,244,0.5)] hover:shadow-[0_0_60px_rgba(139,124,255,0.8)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 cursor-pointer"
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
                          className="p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-[#55d9f4]/40 transition-all cursor-pointer group"
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

        {/* -------------------- 01 / ABOUT BITCA -------------------- */}
        <section id="about" className="py-24 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-20">
          <div className="mb-12">
            <span className="text-xs font-['DM_Mono'] font-bold text-[#55d9f4] tracking-widest uppercase block mb-2">
              01 / ABOUT BITCA
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white font-['Montserrat'] tracking-tight">
              Where innovation meets <span className="text-[#8b7cff]">collaboration.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-t border-b border-white/10 py-12">
            <div className="md:col-span-3">
              <span className="font-['DM_Mono'] text-xs text-[#55d9f4] tracking-widest uppercase block">
                BITCA // v2.4 ARCHITECTURE
              </span>
              <p className="text-xs text-white/50 mt-2 font-['DM_Mono']">
                Department of Computer Applications • K.C. College, HSNC University
              </p>
            </div>

            <div className="md:col-span-9 space-y-6 text-base md:text-lg text-white/80 leading-relaxed font-['Plus_Jakarta_Sans']">
              <p>
                <strong className="text-white">BitCA v2.4</strong> is the official tech club of the Department of Computer Applications at K.C. College, under the auspices of HSNC University. We are a vibrant community of passionate technologists, developers, and designers dedicated to exploring the ever-evolving universe of technology.
              </p>
              <p className="text-white/70">
                Our primary focus spans Artificial Intelligence, autonomous robotics, web engineering, cybersecurity, and practical hands-on technical learning. We regularly host intensive hackathons, industry-led workshops, and multidisciplinary competitions to equip students for real-world impact.
              </p>
              <p className="text-white/70">
                Whether you are writing your first line of code or deploying complex neural architectures, BitCA provides the launchpad to innovate, collaborate, and transcend traditional limitations.
              </p>
            </div>
          </div>
        </section>

        {/* -------------------- 02 / OUR GUIDES -------------------- */}
        <section id="incharges" className="py-24 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-20">
          <div className="mb-14">
            <span className="text-xs font-['DM_Mono'] font-bold text-[#55d9f4] tracking-widest uppercase block mb-2">
              02 / OUR GUIDES
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white font-['Montserrat'] tracking-tight">
              The <span className="text-[#55d9f4]">Guiding Hands</span> of our club.
            </h2>
            <p className="text-sm md:text-base text-white/70 mt-2">
              Distinguished academic leaders mentoring our vision, curriculum, and technological initiatives.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {INCHARGES.map((person, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-[#090e1f]/80 border border-white/10 hover:border-[#55d9f4]/40 transition-all duration-300 group hover:-translate-y-1 shadow-lg"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#55d9f4]/20 to-[#8b7cff]/20 border border-[#55d9f4]/30 flex items-center justify-center text-white font-bold text-xl mb-5 font-['Montserrat'] group-hover:scale-105 transition-transform">
                  {person.initials}
                </div>
                <h3 className="text-lg font-bold text-white font-['Montserrat'] mb-1">
                  {person.name}
                </h3>
                <p className="text-xs text-[#55d9f4] font-['DM_Mono'] mb-3 font-semibold">
                  {person.role}
                </p>
                <p className="text-xs text-white/60 leading-relaxed font-['Plus_Jakarta_Sans']">
                  {person.bio}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* -------------------- 03 / OUR FACULTY -------------------- */}
        <section id="faculty" className="py-24 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-20">
          <div className="mb-14">
            <span className="text-xs font-['DM_Mono'] font-bold text-[#55d9f4] tracking-widest uppercase block mb-2">
              03 / OUR FACULTY
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white font-['Montserrat'] tracking-tight">
              The educators who <span className="text-[#8b7cff]">support our learning.</span>
            </h2>
            <p className="text-sm md:text-base text-white/70 mt-2">
              Meet the teaching and non-teaching faculty of the Department of Computer Applications.
            </p>
          </div>

          {/* Teaching Faculty */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-white/10">
              <span className="text-xs font-['DM_Mono'] text-[#55d9f4] font-bold">03.1</span>
              <h3 className="text-xl font-bold text-white font-['Montserrat']">Teaching Faculty</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {TEACHING_FACULTY.map((f, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-[#090e1f]/60 border border-white/10 hover:border-[#55d9f4]/30 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white font-bold mb-3 font-['Montserrat']">
                    {f.initials}
                  </div>
                  <h4 className="text-base font-bold text-white font-['Montserrat']">{f.name}</h4>
                  <p className="text-xs text-[#55d9f4] font-['DM_Mono'] mt-1">{f.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Non-Teaching Faculty */}
          <div>
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-white/10">
              <span className="text-xs font-['DM_Mono'] text-[#8b7cff] font-bold">03.2</span>
              <h3 className="text-xl font-bold text-white font-['Montserrat']">Non-Teaching Faculty</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {NON_TEACHING_FACULTY.map((f, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-[#090e1f]/60 border border-white/10 hover:border-[#8b7cff]/30 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white font-bold mb-3 font-['Montserrat']">
                    {f.initials}
                  </div>
                  <h4 className="text-base font-bold text-white font-['Montserrat']">{f.name}</h4>
                  <p className="text-xs text-[#8b7cff] font-['DM_Mono'] mt-1">{f.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* -------------------- 04 / HEAD TEAM -------------------- */}
        <section id="team" className="py-24 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-20">
          <div className="mb-14">
            <span className="text-xs font-['DM_Mono'] font-bold text-[#55d9f4] tracking-widest uppercase block mb-2">
              04 / HEAD TEAM
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white font-['Montserrat'] tracking-tight">
              The <span className="text-[#55d9f4]">Leaders</span> of the club.
            </h2>
            <p className="text-sm md:text-base text-white/70 mt-2">
              Student core team directing operations, technical events, and fest coordination.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HEAD_TEAM.map((member, i) => (
              <div
                key={i}
                className="p-6 rounded-3xl bg-gradient-to-b from-[#090e1f] to-[#0d1633] border border-white/10 hover:border-[#55d9f4]/40 transition-all duration-300 hover:-translate-y-1.5 shadow-xl"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#55d9f4]/30 to-[#8b7cff]/30 border border-white/20 flex items-center justify-center text-white font-extrabold text-lg mb-4 font-['Montserrat']">
                  {member.initials}
                </div>
                <h3 className="text-lg font-bold text-white font-['Montserrat']">{member.name}</h3>
                <p className="text-xs text-[#55d9f4] font-['DM_Mono'] mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* -------------------- 05 / HEADS OF DEPARTMENT -------------------- */}
        <section id="departments" className="py-24 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-20">
          <div className="mb-14">
            <span className="text-xs font-['DM_Mono'] font-bold text-[#55d9f4] tracking-widest uppercase block mb-2">
              05 / HEADS OF DEPARTMENT
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white font-['Montserrat'] tracking-tight">
              Teams with <span className="text-[#8b7cff]">purpose.</span>
            </h2>
            <p className="text-sm md:text-base text-white/70 mt-2">
              The 21 dedicated department heads orchestrating technical, logistics, and creative execution.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {HODS.map((hod, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-[#090e1f]/70 border border-white/10 hover:border-[#8b7cff]/40 transition-all flex items-center gap-3.5"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white font-bold text-xs shrink-0 font-['Montserrat']">
                  {hod.initials}
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-white truncate font-['Montserrat']">{hod.name}</h4>
                  <span className="inline-block text-[10px] font-['DM_Mono'] text-[#55d9f4] bg-[#55d9f4]/10 px-2 py-0.5 rounded mt-0.5">
                    {hod.dept}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* -------------------- FOOTER -------------------- */}
      <footer className="border-t border-white/10 bg-[#03060d] py-14 px-6 md:px-12">
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

      {/* Interactive Modals */}
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
