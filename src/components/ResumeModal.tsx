import React from 'react';
import { X, Printer, Download, MapPin, Mail, Linkedin, Github } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { InstagramIcon } from './icons/SocialIcons';

interface ResumeModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen: propIsOpen, onClose: propOnClose }) => {
  const { 
    personalInfo, 
    experiences, 
    education, 
    projects, 
    resumeData, 
    isResumeOpen, 
    setIsResumeOpen 
  } = usePortfolio();

  const isOpen = propIsOpen !== undefined ? propIsOpen : isResumeOpen;
  const handleClose = propOnClose !== undefined ? propOnClose : () => setIsResumeOpen(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div 
      id="resume-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto"
    >
      <div 
        id="resume-document-card"
        className="relative w-full max-w-4xl max-h-[94vh] overflow-y-auto rounded-2xl sm:rounded-3xl bg-zinc-950 text-zinc-100 border border-brand-orange/40 shadow-2xl p-4 sm:p-8 lg:p-12 my-auto"
      >
        
        {/* Floating Actions (Hidden on Print) */}
        <div className="sticky top-0 right-0 flex items-center justify-between gap-3 pb-6 border-b border-zinc-800 print:hidden z-20 bg-zinc-950/90 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
            <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider">
              Curriculum Vitae Preview
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            {resumeData.customPdfUrl && (
              <a
                href={resumeData.customPdfUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold uppercase tracking-wider transition-all"
              >
                <Download className="w-4 h-4 text-brand-orange" />
                <span className="hidden sm:inline">Download File</span>
              </a>
            )}

            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-orange text-white text-xs font-mono font-bold uppercase tracking-wider hover:bg-brand-orange-light shadow-glow-orange transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </button>

            <button
              onClick={handleClose}
              className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
              aria-label="Close resume modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* =========================================================================
            RESUME DOCUMENT CONTENT
           ========================================================================= */}
        <div className="pt-6 space-y-6 print:pt-0 print:space-y-4">
          
          {/* Header */}
          <div className="border-b border-zinc-800 pb-5 print:border-zinc-300 print:pb-3 resume-section-item">
            <h1 className="text-2xl sm:text-4xl font-display font-black text-white print:text-black tracking-tight uppercase">
              {personalInfo.name}
            </h1>
            <p className="text-brand-orange font-mono text-xs sm:text-sm font-bold uppercase tracking-wider mt-1 print:text-[#c2410c]">
              {resumeData.headline || personalInfo.title}
            </p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 mt-3 text-xs font-mono text-zinc-400 print:text-zinc-700">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-brand-orange print:text-[#c2410c]" />
                {personalInfo.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-brand-orange print:text-[#c2410c]" />
                {personalInfo.email}
              </span>
              <a 
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-brand-orange print:text-zinc-800"
              >
                <Linkedin className="w-3.5 h-3.5 text-brand-orange print:text-[#c2410c]" />
                {personalInfo.linkedin ? personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '') : 'linkedin.com/in/subrataaroy'}
              </a>
              <a 
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-brand-orange print:text-zinc-800"
              >
                <Github className="w-3.5 h-3.5 text-brand-orange print:text-[#c2410c]" />
                {personalInfo.github ? personalInfo.github.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '') : 'github.com/therealroy'}
              </a>
              {personalInfo.instagram && (
                <a 
                  href={personalInfo.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 hover:text-brand-orange print:text-zinc-800"
                >
                  <InstagramIcon className="w-3.5 h-3.5 text-brand-orange print:text-[#c2410c]" />
                  instagram.com/the.subrata.roy
                </a>
              )}
            </div>
          </div>

          {/* Professional Summary */}
          <div className="resume-section-item">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-brand-orange print:text-[#c2410c] print:border-b print:border-zinc-300 print:pb-0.5 mb-1.5">
              Professional Summary
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 print:text-zinc-800 leading-relaxed">
              {resumeData.summary || personalInfo.aboutBio}
            </p>
          </div>

          {/* Technical Skills */}
          <div className="resume-section-item">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-brand-orange print:text-[#c2410c] print:border-b print:border-zinc-300 print:pb-0.5 mb-2">
              Technical Proficiencies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              <div className="p-2.5 rounded-xl bg-zinc-900/60 print:bg-white border border-zinc-800 print:border-zinc-300">
                <span className="font-mono font-bold text-brand-orange print:text-[#c2410c] block mb-0.5">
                  .NET & Backend Architecture:
                </span>
                <span className="text-zinc-300 print:text-zinc-800">
                  {resumeData.skills.backend}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-900/60 print:bg-white border border-zinc-800 print:border-zinc-300">
                <span className="font-mono font-bold text-brand-orange print:text-[#c2410c] block mb-0.5">
                  React & Modern Frontend:
                </span>
                <span className="text-zinc-300 print:text-zinc-800">
                  {resumeData.skills.frontend}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-900/60 print:bg-white border border-zinc-800 print:border-zinc-300">
                <span className="font-mono font-bold text-brand-orange print:text-[#c2410c] block mb-0.5">
                  AI Engineering & Intelligent Systems:
                </span>
                <span className="text-zinc-300 print:text-zinc-800">
                  {resumeData.skills.ai}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-900/60 print:bg-zinc-100 border border-zinc-800 print:border-zinc-300">
                <span className="font-mono font-bold text-brand-orange print:text-[#c2410c] block mb-0.5">
                  Database & Enterprise Integrations:
                </span>
                <span className="text-zinc-300 print:text-zinc-800">
                  {resumeData.skills.database}
                </span>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-brand-orange print:text-[#c2410c] print:border-b print:border-zinc-300 print:pb-0.5 mb-3">
              Professional Experience
            </h2>
            <div className="space-y-4 print:space-y-3">
              {experiences.map((exp) => (
                <div key={exp.id} className="resume-section-item border-l-2 border-brand-orange/40 pl-3.5 space-y-1.5 print:border-l-2 print:border-[#c2410c] print:pl-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-0.5">
                    <h3 className="text-sm sm:text-base font-bold text-white print:text-black">
                      {exp.role} <span className="text-brand-orange print:text-[#c2410c]">@ {exp.company}</span>
                    </h3>
                    <span className="text-xs font-mono text-zinc-400 print:text-zinc-600">
                      {exp.period} {exp.durationApprox && `(${exp.durationApprox})`}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 print:text-zinc-700 italic">
                    {exp.summary}
                  </p>
                  <ul className="space-y-1 pt-0.5">
                    {exp.coreHighlights.map((hl, i) => (
                      <li key={i} className="text-xs text-zinc-300 print:text-zinc-800 flex items-start gap-2">
                        <span className="text-brand-orange print:text-[#c2410c] font-bold">•</span>
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-0.5 flex flex-wrap gap-1.5 text-[11px] font-mono text-zinc-400 print:text-zinc-600">
                    <span className="text-brand-orange print:text-[#c2410c] font-semibold">Stack:</span>
                    {exp.techStack.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Project Highlights */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-brand-orange print:text-[#c2410c] print:border-b print:border-zinc-300 print:pb-0.5 mb-2.5">
              Selected Production Project Architecture
            </h2>
            <div className="space-y-2.5">
              {projects.slice(0, 3).map((p) => (
                <div key={p.id} className="resume-section-item text-xs p-2 rounded-lg bg-zinc-900/40 print:bg-transparent border border-zinc-800/60 print:border-zinc-200">
                  <div className="font-bold text-white print:text-black flex items-center justify-between flex-wrap gap-1">
                    <span>{p.title}</span>
                    <span className="font-mono font-normal text-zinc-400 print:text-zinc-600 text-[10px]">[{p.technologies.slice(0, 5).join(', ')}]</span>
                  </div>
                  <div className="text-zinc-400 print:text-zinc-700 mt-0.5">
                    {p.description}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="resume-section-item">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-brand-orange print:text-[#c2410c] print:border-b print:border-zinc-300 print:pb-0.5 mb-2">
              Education & Academic Credentials
            </h2>
            {education.map((edu, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs py-1.5 border-b border-zinc-800/60 last:border-none print:border-zinc-200">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-white print:text-black">{edu.degree}</span>
                    {edu.gradeOrCgpa && (
                      <span className="text-[10px] font-mono text-emerald-400 print:text-emerald-700 font-bold px-1.5 py-0.2 rounded bg-emerald-500/10 print:bg-emerald-50 border border-emerald-500/20 print:border-emerald-300">
                        {edu.gradeOrCgpa}
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-zinc-400 print:text-zinc-600 mt-0.5">
                    {edu.institution} — {edu.location}
                  </div>
                </div>
                <span className="text-xs font-mono text-zinc-400 print:text-zinc-600 shrink-0">
                  {edu.duration}
                </span>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};

