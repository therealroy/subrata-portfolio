import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { TechLogo } from './TechLogos';

export const Skills: React.FC = () => {
  const { skills } = usePortfolio();

  // Split into two thematic tracks just like in the user's reference screenshot
  const backendAndDbSkills = skills.filter(
    (s) => s.category === 'backend' || s.category === 'database'
  );

  const integrationsAndAiSkills = skills.filter(
    (s) => s.category === 'integrations' || s.category === 'ai-tools' || s.category === 'frontend'
  );

  // Duplicate arrays to create continuous infinite marquee loop
  const track1 = [...backendAndDbSkills, ...backendAndDbSkills];
  const track2 = [...integrationsAndAiSkills, ...integrationsAndAiSkills];

  return (
    <section id="skills" className="relative py-28 bg-[#09090b] text-white overflow-hidden border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-brand-orange/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-brand-orange uppercase tracking-widest font-bold mb-3">
              <span className="w-2 h-2 rounded-full bg-brand-orange" />
              <span>01 // CAPABILITIES & STACK</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight uppercase">
              TECHNICAL <span className="text-brand-orange">ECOSYSTEM</span>
            </h2>
          </div>

          <p className="max-w-md text-sm text-zinc-400 font-normal leading-relaxed">
            Continuous enterprise .NET architectures, dynamic React component systems, and AI developer tooling powering resilient production software.
          </p>
        </div>
      </div>

      {/* =========================================================================
          TRACK 1: BACKEND & DATABASE ARCHITECTURE (Automatic Horizontal Marquee)
         ========================================================================= */}
      <div className="relative mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 flex items-center justify-between">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-zinc-400 uppercase tracking-wider">
            <span className="text-brand-orange">✦</span>
            <span className="font-bold text-white">Backend & Database Architecture</span>
            <span className="text-zinc-600">• Enterprise Core</span>
          </div>
          <span className="hidden sm:inline-block font-mono text-[11px] text-zinc-500">
            Auto-scrolling track →
          </span>
        </div>

        {/* Gradient edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#09090b] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#09090b] to-transparent z-10 pointer-events-none" />

        {/* Continuous Auto-Scrolling Track */}
        <div className="overflow-hidden py-2">
          <div className="animate-marquee-left flex items-center gap-4">
            {track1.map((skill, idx) => (
              <div
                key={`t1-${idx}`}
                className="group flex items-center gap-4 px-5 py-4 rounded-2xl bg-gradient-to-br from-[#16161a] to-[#0f0f13] hover:from-[#1d1d24] hover:to-[#16161c] border border-white/10 hover:border-brand-orange/50 transition-all duration-300 min-w-[240px] sm:min-w-[280px] shadow-lg hover:shadow-2xl hover:-translate-y-0.5 cursor-pointer"
              >
                {/* Tech Logo */}
                <div className="w-12 h-12 rounded-xl bg-black/60 border border-white/10 p-2.5 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:border-brand-orange/40 transition-transform shadow-inner">
                  <TechLogo name={skill.name} className="w-full h-full object-contain" />
                </div>

                {/* Tech Info */}
                <div className="flex-1 min-w-0">
                  <div className="font-display font-extrabold text-sm sm:text-base text-white group-hover:text-brand-orange transition-colors truncate">
                    {skill.name}
                  </div>
                  <div className="text-[11px] font-mono text-zinc-400 flex items-center gap-1.5 mt-0.5 truncate">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
                    <span>{skill.proficiencyLabel}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* =========================================================================
          TRACK 2: INTEGRATIONS, FRONTEND & AI (Automatic Reverse Marquee)
         ========================================================================= */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 flex items-center justify-between">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-zinc-400 uppercase tracking-wider">
            <span className="text-brand-orange">✦</span>
            <span className="font-bold text-white">React, AI Engineering & Cloud Suite</span>
            <span className="text-zinc-600">• Modern Frontend & Intelligent Tooling</span>
          </div>
          <span className="hidden sm:inline-block font-mono text-[11px] text-zinc-500">
            ← Auto-scrolling track
          </span>
        </div>

        {/* Gradient edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#09090b] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#09090b] to-transparent z-10 pointer-events-none" />

        {/* Continuous Reverse Auto-Scrolling Track */}
        <div className="overflow-hidden py-2">
          <div className="animate-marquee-right flex items-center gap-4">
            {track2.map((skill, idx) => (
              <div
                key={`t2-${idx}`}
                className="group flex items-center gap-4 px-5 py-4 rounded-2xl bg-gradient-to-br from-[#16161a] to-[#0f0f13] hover:from-[#1d1d24] hover:to-[#16161c] border border-white/10 hover:border-brand-orange/50 transition-all duration-300 min-w-[240px] sm:min-w-[280px] shadow-lg hover:shadow-2xl hover:-translate-y-0.5 cursor-pointer"
              >
                {/* Tech Logo */}
                <div className="w-12 h-12 rounded-xl bg-black/60 border border-white/10 p-2.5 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:border-brand-orange/40 transition-transform shadow-inner">
                  <TechLogo name={skill.name} className="w-full h-full object-contain" />
                </div>

                {/* Tech Info */}
                <div className="flex-1 min-w-0">
                  <div className="font-display font-extrabold text-sm sm:text-base text-white group-hover:text-brand-orange transition-colors truncate">
                    {skill.name}
                  </div>
                  <div className="text-[11px] font-mono text-zinc-400 flex items-center gap-1.5 mt-0.5 truncate">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>{skill.proficiencyLabel}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
