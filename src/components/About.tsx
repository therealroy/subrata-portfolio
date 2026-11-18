import React from 'react';
import { MapPin, GraduationCap, Sparkles, Terminal, Database, Cpu, ShieldCheck, ArrowRight } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface AboutProps {
  onOpenResume: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenResume }) => {
  const { personalInfo, education } = usePortfolio();

  const pillars = [
    {
      icon: Terminal,
      title: 'Enterprise .NET & C# Architecture',
      description: 'Designing resilient domain models, dependency-injected Web APIs, and microservices in C# with ASP.NET Core & EF Core.'
    },
    {
      icon: ShieldCheck,
      title: 'Modern React & TypeScript Systems',
      description: 'Crafting responsive, component-driven user interfaces with React, TypeScript, Tailwind CSS, and seamless REST integration.'
    },
    {
      icon: Cpu,
      title: 'AI Engineering & Semantic Kernel',
      description: 'Leveraging LLMs (Gemini, OpenAI), prompt engineering, RAG architectures, and intelligent agent workflows in .NET applications.'
    },
    {
      icon: Database,
      title: 'Database Performance & Modeling',
      description: 'Engineering optimized schemas in MS SQL Server with indexing strategies, execution plan tuning, and transactional integrity.'
    }
  ];

  return (
    <section id="about" className="relative py-16 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 bg-[#09090b] text-white overflow-hidden border-t border-white/5">
      {/* Decorative background ambient warmth */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 pb-8 sm:pb-12 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-[11px] sm:text-xs text-brand-orange uppercase tracking-widest font-bold mb-2 sm:mb-3">
              <span className="w-2 h-2 rounded-full bg-brand-orange" />
              <span>02 // BIOGRAPHY & MISSION</span>
            </div>
            <h2 className="font-display font-black text-2xl sm:text-4xl lg:text-6xl tracking-tight uppercase">
              ABOUT <span className="text-brand-orange">{personalInfo.name.toUpperCase()}</span>
            </h2>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
            <MapPin className="w-4 h-4 text-brand-orange" />
            <span>{personalInfo.location}</span>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-12 items-start">
          
          {/* Left Column: Official Introduction Bio & Tagline */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Tagline Callout */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#16161a] via-[#111114] to-[#0b0b0d] border border-white/10 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <Sparkles className="w-24 h-24 text-brand-orange" />
              </div>
              <span className="font-mono text-[11px] text-brand-orange uppercase tracking-widest font-semibold block mb-2">
                Professional Tagline
              </span>
              <p className="font-display font-extrabold text-xl sm:text-2xl text-white leading-snug">
                "{personalInfo.tagline}"
              </p>
            </div>

            {/* Official Introduction Text */}
            <div className="space-y-6 text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
              <p className="text-white text-lg sm:text-xl font-medium border-l-2 border-brand-orange pl-4 italic">
                "{personalInfo.aboutBio}"
              </p>

              <p className="text-zinc-400">
                My professional journey centers on architecting clean, maintainable, and high-performance server-side systems. Whether developing enterprise resource platforms, high-throughput REST APIs, or automating financial ledgers with third-party software like Zoho Books, my focus remains constant: delivering solid business value through bulletproof code.
              </p>
            </div>

            {/* Core Pillars */}
            <div className="pt-4">
              <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-500 mb-6 flex items-center gap-2">
                <span>Core Engineering Tenets</span>
                <span className="w-12 h-px bg-white/10" />
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {pillars.map((pillar, idx) => {
                  const Icon = pillar.icon;
                  return (
                    <div 
                      key={idx}
                      className="p-5 rounded-2xl bg-gradient-to-br from-[#141417] to-[#0d0d10] hover:from-[#19191e] hover:to-[#121215] border border-white/10 hover:border-brand-orange/40 transition-all duration-300 group"
                    >
                      <div className="w-9 h-9 rounded-xl bg-brand-orange/15 border border-brand-orange/30 flex items-center justify-center text-brand-orange mb-3 group-hover:scale-110 transition-transform">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h4 className="font-display font-bold text-sm text-white mb-1.5 group-hover:text-brand-orange transition-colors">
                        {pillar.title}
                      </h4>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Education & Professional Credentials Card */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Education Card: Featuring both MCA & B.Sc Computer Science */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#16161a] via-[#111114] to-[#0b0b0d] border border-white/10 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-2xl bg-brand-orange/15 border border-brand-orange/30 flex items-center justify-center text-brand-orange shadow-glow-orange">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <span className="font-mono text-xs text-brand-orange uppercase tracking-wider font-semibold">
                  Academic Foundation
                </span>
              </div>

              {/* Degrees Stack */}
              <div className="space-y-6">
                {education.map((edu, idx) => (
                  <div key={idx} className={idx > 0 ? "pt-5 border-t border-white/10" : ""}>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="font-mono text-[10px] text-zinc-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">
                        {edu.duration}
                      </span>
                      {edu.gradeOrCgpa && (
                        <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-bold">
                          {edu.gradeOrCgpa}
                        </span>
                      )}
                    </div>
                    <h3 className="font-display font-extrabold text-base sm:text-lg text-white group-hover:text-brand-orange transition-colors">
                      {edu.degree}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-zinc-300">
                      {edu.institution}
                    </p>
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-500 mt-1">
                      <MapPin className="w-3 h-3 text-brand-orange shrink-0" />
                      <span>{edu.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fast Quick Facts / At a Glance */}
            <div className="p-6 rounded-3xl bg-[#121215] border border-white/10 space-y-4">
              <h4 className="font-mono text-xs uppercase tracking-widest text-brand-orange font-bold">
                Developer Identity Overview
              </h4>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                  <div className="text-zinc-500 font-mono text-[10px] uppercase">Primary Stack</div>
                  <div className="font-bold text-white mt-1">.NET • React • AI Systems</div>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                  <div className="text-zinc-500 font-mono text-[10px] uppercase">Current Organization</div>
                  <div className="font-bold text-brand-orange mt-1">{personalInfo.currentCompany}</div>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                  <div className="text-zinc-500 font-mono text-[10px] uppercase">Location</div>
                  <div className="font-bold text-white mt-1">{personalInfo.location}</div>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                  <div className="text-zinc-500 font-mono text-[10px] uppercase">Availability</div>
                  <div className="font-bold text-emerald-400 mt-1">Open for Hire</div>
                </div>
              </div>

              <button
                onClick={onOpenResume}
                className="w-full mt-2 py-3 rounded-xl bg-white/5 hover:bg-brand-orange text-white font-mono text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 group border border-white/10 hover:border-transparent"
              >
                <span>Review Full Resume Details</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
