import React from 'react';
import {
  INCHARGES,
  TEACHING_FACULTY,
  NON_TEACHING_FACULTY,
  HEAD_TEAM,
  HODS,
} from '../../data/multiverseData';
import { InteractiveGlassCard } from './InteractiveGlassCard';

export const MainSiteSections: React.FC = () => {
  return (
    <>
      {/* -------------------- 01 / ABOUT BITCA -------------------- */}
      <section
        id="about"
        className="scroll-section-fade py-20 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto scroll-mt-16"
      >
        <div className="mb-10">
          <span className="text-xs font-['DM_Mono'] font-bold text-[#55d9f4] tracking-widest uppercase block mb-2">
            01 / ABOUT BITCA
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white font-['Montserrat'] tracking-tight apple-heading">
            Where innovation meets <span className="text-[#8b7cff]">collaboration.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-t border-b border-white/10 py-10">
          <div className="md:col-span-3">
            <span className="font-['DM_Mono'] text-xs text-[#55d9f4] tracking-widest uppercase block">
              BITCA // v2.4 ARCHITECTURE
            </span>
            <p className="text-xs text-white/50 mt-2 font-['DM_Mono']">
              Department of Computer Applications • K.C. College, HSNC University
            </p>
          </div>

          <div className="md:col-span-9 space-y-5 text-base md:text-lg text-white/80 leading-relaxed font-['Plus_Jakarta_Sans']">
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
      <section
        id="incharges"
        className="scroll-section-fade py-20 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto scroll-mt-16"
      >
        <div className="mb-12">
          <span className="text-xs font-['DM_Mono'] font-bold text-[#55d9f4] tracking-widest uppercase block mb-2">
            02 / OUR GUIDES
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white font-['Montserrat'] tracking-tight apple-heading">
            The <span className="text-[#55d9f4]">Guiding Hands</span> of our club.
          </h2>
          <p className="text-sm md:text-base text-white/70 mt-2">
            Distinguished academic leaders mentoring our vision, curriculum, and technological initiatives.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {INCHARGES.map((person, idx) => (
            <InteractiveGlassCard
              key={idx}
              className="p-6 rounded-3xl"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#55d9f4]/20 to-[#8b7cff]/20 border border-[#55d9f4]/30 flex items-center justify-center text-white font-bold text-xl mb-4 font-['Montserrat'] shadow-inner">
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
            </InteractiveGlassCard>
          ))}
        </div>
      </section>

      {/* -------------------- 03 / OUR FACULTY -------------------- */}
      <section
        id="faculty"
        className="scroll-section-fade py-20 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto scroll-mt-16"
      >
        <div className="mb-12">
          <span className="text-xs font-['DM_Mono'] font-bold text-[#55d9f4] tracking-widest uppercase block mb-2">
            03 / OUR FACULTY
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white font-['Montserrat'] tracking-tight apple-heading">
            The educators who <span className="text-[#8b7cff]">support our learning.</span>
          </h2>
          <p className="text-sm md:text-base text-white/70 mt-2">
            Meet the teaching and non-teaching faculty of the Department of Computer Applications.
          </p>
        </div>

        {/* Teaching Faculty */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-5 pb-3 border-b border-white/10">
            <span className="text-xs font-['DM_Mono'] text-[#55d9f4] font-bold">03.1</span>
            <h3 className="text-xl font-bold text-white font-['Montserrat']">Teaching Faculty</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {TEACHING_FACULTY.map((f, i) => (
              <InteractiveGlassCard
                key={i}
                className="p-5 rounded-2xl"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white font-bold mb-3 font-['Montserrat']">
                  {f.initials}
                </div>
                <h4 className="text-base font-bold text-white font-['Montserrat']">{f.name}</h4>
                <p className="text-xs text-[#55d9f4] font-['DM_Mono'] mt-1">{f.role}</p>
              </InteractiveGlassCard>
            ))}
          </div>
        </div>

        {/* Non-Teaching Faculty */}
        <div>
          <div className="flex items-center gap-3 mb-5 pb-3 border-b border-white/10">
            <span className="text-xs font-['DM_Mono'] text-[#8b7cff] font-bold">03.2</span>
            <h3 className="text-xl font-bold text-white font-['Montserrat']">Non-Teaching Faculty</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            {NON_TEACHING_FACULTY.map((f, i) => (
              <InteractiveGlassCard
                key={i}
                className="p-5 rounded-2xl"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white font-bold mb-3 font-['Montserrat']">
                  {f.initials}
                </div>
                <h4 className="text-base font-bold text-white font-['Montserrat']">{f.name}</h4>
                <p className="text-xs text-[#8b7cff] font-['DM_Mono'] mt-1">{f.role}</p>
              </InteractiveGlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------- 04 / HEAD TEAM -------------------- */}
      <section
        id="team"
        className="scroll-section-fade py-20 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto scroll-mt-16"
      >
        <div className="mb-12">
          <span className="text-xs font-['DM_Mono'] font-bold text-[#55d9f4] tracking-widest uppercase block mb-2">
            04 / HEAD TEAM
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white font-['Montserrat'] tracking-tight apple-heading">
            The <span className="text-[#55d9f4]">Leaders</span> of the club.
          </h2>
          <p className="text-sm md:text-base text-white/70 mt-2">
            Student core team directing operations, technical events, and fest coordination.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {HEAD_TEAM.map((member, i) => (
            <InteractiveGlassCard
              key={i}
              className="p-6 rounded-3xl"
            >
              <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-[#55d9f4]/30 to-[#8b7cff]/30 border border-white/20 flex items-center justify-center text-white font-extrabold text-base mb-4 font-['Montserrat'] shadow-inner">
                {member.initials}
              </div>
              <h3 className="text-lg font-bold text-white font-['Montserrat']">{member.name}</h3>
              <p className="text-xs text-[#55d9f4] font-['DM_Mono'] mt-1">{member.role}</p>
            </InteractiveGlassCard>
          ))}
        </div>
      </section>

      {/* -------------------- 05 / HEADS OF DEPARTMENT -------------------- */}
      <section
        id="departments"
        className="scroll-section-fade py-20 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto scroll-mt-16"
      >
        <div className="mb-12">
          <span className="text-xs font-['DM_Mono'] font-bold text-[#55d9f4] tracking-widest uppercase block mb-2">
            05 / HEADS OF DEPARTMENT
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white font-['Montserrat'] tracking-tight apple-heading">
            Teams with <span className="text-[#8b7cff]">purpose.</span>
          </h2>
          <p className="text-sm md:text-base text-white/70 mt-2">
            The 21 dedicated department heads orchestrating technical, logistics, and creative execution.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          {HODS.map((hod, i) => (
            <InteractiveGlassCard
              key={i}
              className="p-4 rounded-2xl flex items-center gap-3.5"
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
            </InteractiveGlassCard>
          ))}
        </div>
      </section>
    </>
  );
};
