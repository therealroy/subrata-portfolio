import React from 'react';
import { ArrowDown, ArrowUpRight, Building2 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { CrosshairGrid } from './CrosshairGrid';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const { personalInfo, floatingCards } = usePortfolio();

  return (
    <section className="relative min-h-[90vh] sm:min-h-screen pt-20 sm:pt-24 pb-12 sm:pb-16 px-3 sm:px-6 lg:px-8 flex items-center justify-center bg-[#09090b] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[320px] sm:w-[600px] lg:w-[800px] h-[300px] sm:h-[500px] bg-brand-orange/10 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-subtle opacity-20 pointer-events-none" />

      {/* Outer Framing */}
      <div className="max-w-[1400px] w-full mx-auto relative z-10">
        
        {/* Top Technical Metadata Bar */}
        <div className="flex items-center justify-between pb-2.5 px-2 font-mono text-[10px] sm:text-[11px] text-zinc-500 tracking-wider">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
            <span className="truncate">SUBRATA.ROY // PORTFOLIO</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 text-zinc-500 text-[10px] sm:text-[11px]">
            <span className="hidden xs:inline">.NET • REACT • AI</span>
            <span className="hidden sm:inline">•</span>
            <span>DURGAPUR, IN</span>
          </div>
        </div>

        {/* =========================================================================
            CENTRAL HERO CANVAS
           ========================================================================= */}
        <div className="relative w-full rounded-2xl sm:rounded-[32px] lg:rounded-[36px] bg-gradient-to-br from-[#16161a] via-[#111114] to-[#0b0b0d] p-5 sm:p-8 lg:p-14 overflow-hidden border border-white/10 shadow-[0_15px_50px_rgba(0,0,0,0.8)]">
          
          {/* Subtle noise and texture */}
          <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none mix-blend-overlay" />
          
          {/* Warm orange top-right rim glow inside card */}
          <div className="absolute -top-16 -right-16 sm:-top-24 sm:-right-24 w-60 sm:w-96 h-60 sm:h-96 bg-brand-orange/15 rounded-full blur-2xl sm:blur-3xl pointer-events-none" />
          
          {/* Crosshairs & Grid Accents inside Hero */}
          <CrosshairGrid />

          {/* =========================================================================
              OVERSIZED BACKGROUND TYPOGRAPHY: "SUBRATA"
             ========================================================================= */}
          <div 
            aria-hidden="true" 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center select-none pointer-events-none z-0 overflow-hidden"
          >
            <span className="font-display font-black text-[22vw] sm:text-[20vw] lg:text-[220px] leading-none tracking-tighter text-white/[0.03] block whitespace-nowrap">
              {personalInfo.heroFirstName}
            </span>
          </div>

          {/* Main Grid: Content Left, Portrait Right */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* LEFT COLUMN: Headline, Identity, CTAs */}
            <div className="lg:col-span-7 flex flex-col justify-between h-full py-1 sm:py-4 order-2 lg:order-1">
              
              {/* Minimalist Status Badge */}
              <div className="flex items-center gap-2 mb-4 sm:mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/90 border border-white/10 text-zinc-300 text-[11px] sm:text-xs font-mono tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
                  <span>{personalInfo.shortTitle || '.NET • REACT • AI SYSTEMS'}</span>
                </div>
              </div>

              {/* Headline */}
              <div className="my-auto py-2 sm:py-3">
                <h1 className="font-display font-extrabold text-xl sm:text-3xl lg:text-[32px] leading-snug tracking-tight text-white">
                  BUILDING INTELLIGENT <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-orange-light">.NET, REACT & AI</span> SOLUTIONS THAT MAKE AN IMPACT.
                </h1>
              </div>

              {/* Bottom Identity & CTA Row */}
              <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-white/10">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 sm:gap-6">
                  <div>
                    <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-[40px] tracking-tight text-white uppercase leading-none">
                      {personalInfo.name}
                    </h2>
                    <p className="mt-2 font-mono text-[11px] sm:text-xs text-zinc-400 tracking-wider">
                      C# • ASP.NET Core • React • SQL Server • AI Integrations
                    </p>
                  </div>

                  {/* Two Action Buttons */}
                  <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
                    <a
                      href="#projects"
                      className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-brand-orange hover:bg-brand-orange-light text-white font-display font-bold text-xs sm:text-sm tracking-wide shadow-glow-orange hover:shadow-glow-orange-lg transition-all duration-300"
                    >
                      <span>Explore Work</span>
                      <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-y-1 transition-transform" />
                    </a>

                    <a
                      href="#contact"
                      className="group inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white border border-white/10 font-display font-semibold text-xs sm:text-sm tracking-wide transition-all duration-300"
                    >
                      <span>Let's Connect</span>
                      <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Studio Portrait & Badges */}
            <div className="lg:col-span-5 relative flex items-center justify-center lg:justify-end order-1 lg:order-2">
              
              {/* Outer Warm Glow */}
              <div className="absolute w-52 h-52 sm:w-72 sm:h-72 rounded-full bg-brand-orange/15 blur-3xl pointer-events-none" />

              {/* Portrait Container */}
              <div className="relative w-full max-w-[280px] xs:max-w-[320px] sm:max-w-[360px] aspect-[4/5] rounded-2xl sm:rounded-[24px] overflow-hidden border border-white/15 shadow-2xl bg-black">
                <img
                  src={personalInfo.portraitUrl || '/subrata-portrait.jpg?v=3'}
                  alt={`${personalInfo.name} — .NET Backend Developer`}
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                />

                {/* Subtle bottom fade */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />

                {/* Floating Bottom Status Pill */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-2.5 sm:p-3 rounded-xl bg-zinc-950/85 backdrop-blur-md border border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-white font-display font-bold text-xs sm:text-sm">Subrata Roy</div>
                    <div className="text-zinc-400 font-mono text-[9px] sm:text-[10px]">MCA • Vidyasagar Univ</div>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[9px] sm:text-[10px] font-mono text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>Open for Hire</span>
                  </div>
                </div>
              </div>

              {/* Floating Badge: Currently Working */}
              <a
                href={personalInfo.currentCompanyUrl || floatingCards.card3.link}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute -top-3 right-0 sm:-right-4 p-2.5 sm:p-3 rounded-xl bg-zinc-900/90 backdrop-blur-xl border border-white/15 text-white shadow-xl transition-all duration-300 hover:scale-105 hover:border-brand-orange z-20 group"
              >
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="font-mono text-[8px] sm:text-[9px] text-brand-orange uppercase tracking-wider font-semibold">
                    Current Company
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <div className="font-display font-extrabold text-xs sm:text-sm text-white flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                  <span className="group-hover:text-brand-orange transition-colors">
                    {personalInfo.currentCompany || 'Code Galaxy ITES'}
                  </span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-500 group-hover:text-white transition-colors" />
                </div>
              </a>

              {/* Floating Badge: Core Stack */}
              <div
                className="absolute top-1/2 -left-2 sm:-left-6 -translate-y-1/2 p-2.5 sm:p-3 rounded-xl bg-zinc-900/90 backdrop-blur-xl border border-white/15 text-white shadow-xl hidden xs:flex flex-col z-20 group hover:border-brand-orange transition-all"
              >
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="font-mono text-[8px] sm:text-[9px] text-brand-orange uppercase tracking-wider font-semibold">
                    Core Specialization
                  </span>
                </div>
                <div className="font-display font-extrabold text-xs sm:text-sm text-white flex items-center gap-1.5">
                  <span className="text-brand-orange font-mono">⚡</span>
                  <span>.NET 8 • React • AI</span>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Bottom Ticker */}
        <div className="mt-6 sm:mt-8 border-y border-white/5 py-2.5 sm:py-3 overflow-hidden bg-zinc-950/40 backdrop-blur-sm">
          <div className="animate-marquee-left whitespace-nowrap flex items-center gap-6 sm:gap-8 font-mono text-[11px] sm:text-xs text-zinc-500 uppercase tracking-widest">
            <span className="flex items-center gap-2"><span className="text-brand-orange">✦</span> .NET 8/9 & ASP.NET CORE</span>
            <span className="flex items-center gap-2"><span className="text-brand-orange">✦</span> REACT 18 & TYPESCRIPT</span>
            <span className="flex items-center gap-2"><span className="text-brand-orange">✦</span> AI ENGINEERING & SEMANTIC KERNEL</span>
            <span className="flex items-center gap-2"><span className="text-brand-orange">✦</span> RAG & VECTOR SEARCH</span>
            <span className="flex items-center gap-2"><span className="text-brand-orange">✦</span> MS SQL SERVER & EF CORE</span>
            <span className="flex items-center gap-2"><span className="text-brand-orange">✦</span> OPENAI & GEMINI APIS</span>
            <span className="flex items-center gap-2"><span className="text-brand-orange">✦</span> MICROSERVICES & REST APIS</span>
          </div>
        </div>

      </div>
    </section>
  );
};
