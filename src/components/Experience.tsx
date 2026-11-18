import React from 'react';
import { Building2, ArrowUpRight, Calendar, CheckCircle2 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Experience: React.FC = () => {
  const { experiences } = usePortfolio();

  return (
    <section id="experience" className="relative py-16 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 bg-[#09090b] text-white overflow-hidden border-t border-white/5">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-brand-orange/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 pb-8 sm:pb-12 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-[11px] sm:text-xs text-brand-orange uppercase tracking-widest font-bold mb-2 sm:mb-3">
              <span className="w-2 h-2 rounded-full bg-brand-orange" />
              <span>03 // CAREER EVOLUTION</span>
            </div>
            <h2 className="font-display font-black text-2xl sm:text-4xl lg:text-6xl tracking-tight uppercase">
              PROFESSIONAL <span className="text-brand-orange">EXPERIENCE</span>
            </h2>
          </div>

          <p className="max-w-md text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed">
            Hands-on software engineering track record delivering scalable business systems, transactional database architectures, and secure third-party integrations.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="pt-10 sm:pt-16 max-w-4xl mx-auto relative">
          
          {/* Vertical timeline accent line */}
          <div className="absolute left-3 sm:left-6 top-12 bottom-12 w-0.5 bg-gradient-to-b from-brand-orange via-zinc-800 to-zinc-900" />

          <div className="space-y-8 sm:space-y-12">
            {experiences.map((exp) => (
              <div key={exp.id} className="relative pl-8 sm:pl-16 lg:pl-20 group">
                
                {/* Timeline node icon */}
                <div className={`absolute left-3 sm:left-6 top-1 -translate-x-1/2 w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center transition-transform group-hover:scale-125 duration-300 ${
                  exp.isCurrent 
                    ? 'border-brand-orange bg-brand-orange shadow-glow-orange' 
                    : 'border-zinc-600 bg-zinc-900'
                }`}>
                  <div className={`w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full ${exp.isCurrent ? 'bg-white animate-ping' : 'bg-zinc-400'}`} />
                </div>

                {/* Experience Card */}
                <div className="p-5 sm:p-7 lg:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#16161a] via-[#111114] to-[#0b0b0d] border border-white/10 hover:border-brand-orange/40 transition-all duration-300 shadow-xl group-hover:shadow-2xl">
                  
                  {/* Top Bar: Period & Current Status Pill */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                      <Calendar className="w-3.5 h-3.5 text-brand-orange" />
                      <span>{exp.period}</span>
                      {exp.durationApprox && (
                        <span className="text-zinc-500">• {exp.durationApprox}</span>
                      )}
                    </div>

                    {exp.isCurrent ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 font-mono text-[11px] text-emerald-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Current Position
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-[11px] text-zinc-400">
                        Previous Role (~8 Months)
                      </span>
                    )}
                  </div>

                  {/* Role Title */}
                  <h3 className="font-display font-black text-2xl sm:text-3xl text-white mb-2">
                    {exp.role}
                  </h3>

                  {/* Company Link */}
                  <div className="mb-6 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-brand-orange" />
                    <a
                      href={exp.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link inline-flex items-center gap-1 font-display font-extrabold text-base sm:text-lg text-brand-orange hover:text-white transition-colors"
                      title={`Visit ${exp.company} official website`}
                    >
                      <span>{exp.company}</span>
                      <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>

                  {/* Summary */}
                  <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-6">
                    {exp.summary}
                  </p>

                  {/* Core Responsibilities & Technical Highlights */}
                  <div className="space-y-3 mb-6 pt-4 border-t border-white/10">
                    <div className="font-mono text-xs uppercase tracking-wider text-brand-orange font-semibold">
                      Key Engineering Contributions
                    </div>
                    {exp.coreHighlights.map((highlight, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-mono text-zinc-500 uppercase mr-1">Stack:</span>
                    {exp.techStack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-white/10 text-xs font-mono text-zinc-300 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
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
