import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  Lock, 
  CheckCircle, 
  X, 
  ShieldCheck, 
  Terminal,
  ExternalLink,
  Github,
  Globe,
  Image as ImageIcon
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { ProjectItem } from '../types/portfolio';

export const Projects: React.FC = () => {
  const { projects } = usePortfolio();
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', 'Enterprise / ERP', 'E-Commerce / CMS', 'API & Integration', 'AI & Automation'];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="relative py-16 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 bg-[#09090b] text-white overflow-hidden border-t border-white/5">
      {/* Background accents */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 pb-8 sm:pb-12 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-[11px] sm:text-xs text-brand-orange uppercase tracking-widest font-bold mb-2 sm:mb-3">
              <span className="w-2 h-2 rounded-full bg-brand-orange" />
              <span>04 // PORTFOLIO ARCHITECTURE</span>
            </div>
            <h2 className="font-display font-black text-2xl sm:text-4xl lg:text-6xl tracking-tight uppercase">
              FEATURED <span className="text-brand-orange">PROJECTS</span>
            </h2>
          </div>

          <p className="max-w-md text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed">
            Enterprise platforms, business management engines, e-commerce architectures, and API gateways developed with high-throughput backend standards.
          </p>
        </div>

        {/* Filter categories */}
        <div className="pt-8 pb-10 flex items-center gap-2 overflow-x-auto scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-all duration-200 ${
                filter === cat
                  ? 'bg-brand-orange text-white font-bold shadow-glow-orange'
                  : 'bg-[#141418] hover:bg-[#1a1a20] text-zinc-400 hover:text-white border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`group rounded-3xl bg-gradient-to-br from-[#16161a] via-[#111114] to-[#0b0b0d] border border-white/10 hover:border-brand-orange/50 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-2xl hover:-translate-y-1 ${
                index === 0 && filter === 'All' ? 'lg:col-span-2' : ''
              }`}
            >
              {/* Project Visual Canvas / Architectural Mockup */}
              <div className="relative p-6 sm:p-8 bg-black/40 border-b border-white/10 min-h-[220px] flex flex-col justify-between overflow-hidden">
                {/* Subtle visual grid background */}
                <div className="absolute inset-0 bg-grid-subtle opacity-20 pointer-events-none" />

                {/* Top Bar inside Canvas */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-brand-orange/15 border border-brand-orange/30 text-brand-orange text-[11px] font-mono font-semibold uppercase tracking-wider">
                    {project.category}
                  </span>

                  <div className="flex items-center gap-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                        title="Live Deployment"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Live Demo</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                    {project.confidentialityNote && (
                      <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/60 border border-white/10 text-[10px] font-mono text-zinc-400">
                        <Lock className="w-3 h-3 text-brand-orange" />
                        <span>Authorized Showcase</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Screenshot Preview OR Architecture Mockup */}
                {project.image ? (
                  <div className="relative z-10 my-3 rounded-2xl overflow-hidden border border-white/10 bg-black/60 aspect-video max-h-[220px] shadow-lg group/img">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 pointer-events-none" />
                    <div className="absolute bottom-2.5 left-3 z-10 flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[10px] font-mono text-zinc-300 border border-white/10 flex items-center gap-1.5">
                        <ImageIcon className="w-3 h-3 text-brand-orange" />
                        Screenshot Preview
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="relative z-10 my-4 p-4 rounded-2xl bg-[#0d0d10] border border-white/10 backdrop-blur-md">
                    <div className="flex items-center justify-between font-mono text-[11px] text-zinc-500 pb-2 border-b border-white/10 mb-2">
                      <span className="flex items-center gap-1.5 text-zinc-400">
                        <Terminal className="w-3 h-3 text-brand-orange" />
                        {project.id}.api // ARCHITECTURE_V1
                      </span>
                      <span className="text-emerald-400">STATUS: PRODUCTION</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 font-mono text-[11px]">
                      {project.metricsOrScope.map((metric, mIdx) => (
                        <div key={mIdx} className="p-2 rounded bg-white/5 text-zinc-300">
                          <span className="text-brand-orange mr-1.5">✦</span>
                          {metric}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Bottom Bar inside Canvas */}
                <div className="relative z-10 flex items-center justify-between font-mono text-[10px] text-zinc-500">
                  <span>BACKEND SYSTEM ARCHITECTURE</span>
                  <span className="group-hover:text-brand-orange transition-colors">CLICK TO EXPLORE CASE STUDY →</span>
                </div>
              </div>

              {/* Project Content Information */}
              <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="font-display font-black text-2xl sm:text-3xl text-white group-hover:text-brand-orange transition-colors mb-2">
                    {project.title}
                  </h3>

                  <p className="font-mono text-xs text-brand-orange uppercase tracking-wider mb-4">
                    {project.tagline}
                  </p>

                  <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Architecture Highlights bullet points */}
                  <div className="space-y-2 mb-6">
                    {project.architectureHighlights.slice(0, 3).map((hl, hlIdx) => (
                      <div key={hlIdx} className="flex items-start gap-2 text-xs text-zinc-400">
                        <CheckCircle className="w-3.5 h-3.5 text-brand-orange shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer: Tech Badges & Action Buttons */}
                <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {project.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-lg bg-zinc-900 text-[11px] font-mono text-zinc-300 border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-200 hover:text-white border border-white/10 text-xs font-mono font-medium transition-all"
                        title="Open Live Website"
                      >
                        <Globe className="w-3.5 h-3.5 text-brand-orange" />
                        <span>Live</span>
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 text-xs transition-all"
                        title="View GitHub Repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-brand-orange hover:bg-brand-orange-light text-white text-xs font-mono font-bold uppercase tracking-wider shadow-glow-orange transition-all whitespace-nowrap"
                    >
                      <span>Inspect Specs</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* DETAILED PROJECT CASE STUDY MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#121215] border border-white/15 shadow-2xl p-6 sm:p-10">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close project modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="mb-6">
              <span className="px-3 py-1 rounded-full bg-brand-orange/20 border border-brand-orange/40 text-brand-orange text-xs font-mono font-semibold uppercase tracking-wider">
                {selectedProject.category}
              </span>
              <h3 className="font-display font-black text-2xl sm:text-4xl text-white mt-3">
                {selectedProject.title}
              </h3>
              <p className="font-mono text-xs sm:text-sm text-brand-orange uppercase tracking-wider mt-1">
                {selectedProject.tagline}
              </p>
            </div>

            {/* Project Screenshot Showcase (if available) */}
            {selectedProject.image && (
              <div className="relative mb-8 rounded-2xl overflow-hidden border border-white/15 bg-black/60 shadow-2xl group">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full max-h-[400px] object-cover object-top transition-transform duration-500 group-hover:scale-[1.01]"
                />
                <div className="absolute top-3 right-3 flex items-center gap-2">
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-brand-orange text-white text-xs font-mono font-bold shadow-glow-orange hover:bg-brand-orange-light transition-all backdrop-blur-md"
                    >
                      <span>Live Site</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Description */}
            <div className="space-y-4 text-sm sm:text-base text-zinc-300 leading-relaxed mb-8">
              <p>{selectedProject.description}</p>
            </div>

            {/* Architectural Highlights */}
            <div className="p-6 rounded-2xl bg-[#09090b] border border-white/10 mb-8 space-y-3">
              <div className="font-mono text-xs uppercase tracking-widest text-brand-orange font-bold flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-orange" />
                <span>Architecture & Engineering Design</span>
              </div>
              {selectedProject.architectureHighlights.map((hl, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  <span className="text-brand-orange font-bold">•</span>
                  <span>{hl}</span>
                </div>
              ))}
            </div>

            {/* Scope & Performance Indicators */}
            <div className="mb-8">
              <div className="font-mono text-xs uppercase tracking-widest text-zinc-400 mb-3">
                Key Deliverables & Performance Scope
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedProject.metricsOrScope.map((metric, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-zinc-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
                    <span>{metric}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div className="mb-8">
              <div className="font-mono text-xs uppercase tracking-widest text-zinc-400 mb-3">
                Technology Stack & Components
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-white/15 text-xs font-mono text-white font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Confidentiality Notice */}
            {selectedProject.confidentialityNote && (
              <div className="p-4 rounded-xl bg-brand-orange/10 border border-brand-orange/20 text-xs text-zinc-400 font-mono mb-8 flex items-center gap-3">
                <Lock className="w-4 h-4 text-brand-orange shrink-0" />
                <span>{selectedProject.confidentialityNote}</span>
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-5 border-t border-white/10">
              <div className="flex flex-wrap items-center gap-2">
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-brand-orange hover:bg-brand-orange-light text-white text-xs font-mono font-bold uppercase shadow-glow-orange transition-all"
                  >
                    <span>Visit Live Project</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/15 text-xs font-mono font-medium transition-all"
                  >
                    <Github className="w-4 h-4 text-brand-orange" />
                    <span>View Repository</span>
                  </a>
                )}
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-mono font-bold uppercase transition-colors"
                >
                  Close View
                </button>
                <a
                  href="#contact"
                  onClick={() => setSelectedProject(null)}
                  className="px-5 py-2.5 rounded-xl bg-brand-orange/20 hover:bg-brand-orange/30 text-brand-orange border border-brand-orange/30 text-xs font-mono font-bold uppercase transition-all"
                >
                  Discuss Similar Architecture
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
