import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, ShieldCheck, Terminal } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { InstagramIcon } from './icons/SocialIcons';

export const Footer: React.FC = () => {
  const { personalInfo, isAuthenticated, setIsAuthModalOpen, setIsAdminOpen } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDevModeClick = () => {
    if (isAuthenticated) {
      setIsAdminOpen(true);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  return (
    <footer className="relative py-14 px-4 sm:px-6 lg:px-8 bg-[#09090b] text-white border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Brand & Tagline */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-brand-orange flex items-center justify-center font-display font-black text-white text-sm shadow-glow-orange">
              SR
            </div>
            <span className="font-display font-black text-lg tracking-wider uppercase text-white">
              {personalInfo.name}
            </span>
          </div>
          <p className="mt-2 text-xs font-mono text-white/50 max-w-sm">
            {personalInfo.tagline}
          </p>
          <span className="text-[11px] font-mono text-white/30 mt-1">
            {personalInfo.location}
          </span>
        </div>

        {/* Navigation Quick Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-white/70">
          <a href="#skills" className="hover:text-brand-orange transition-colors">Skills</a>
          <a href="#about" className="hover:text-brand-orange transition-colors">About</a>
          <a href="#experience" className="hover:text-brand-orange transition-colors">Experience</a>
          <a href="#projects" className="hover:text-brand-orange transition-colors">Projects</a>
          <a href="#contact" className="hover:text-brand-orange transition-colors">Contact</a>
        </div>

        {/* Socials & Back to Top */}
        <div className="flex items-center gap-4">
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl bg-white/5 hover:bg-brand-orange hover:text-white border border-white/10 flex items-center justify-center text-white/70 transition-all"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl bg-white/5 hover:bg-brand-orange hover:text-white border border-white/10 flex items-center justify-center text-white/70 transition-all"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>

          <a
            href={personalInfo.instagram || 'https://www.instagram.com/the.subrata.roy?knvt=MTBhYzZmNTlzaG8xdg%3D%3D'}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl bg-white/5 hover:bg-brand-orange hover:text-white border border-white/10 flex items-center justify-center text-white/70 transition-all"
            aria-label="Instagram"
          >
            <InstagramIcon className="w-4 h-4" />
          </a>

          <a
            href={`mailto:${personalInfo.email}`}
            className="w-10 h-10 rounded-xl bg-white/5 hover:bg-brand-orange hover:text-white border border-white/10 flex items-center justify-center text-white/70 transition-all"
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
          </a>

          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-xl bg-brand-orange hover:bg-brand-orange-light text-white flex items-center justify-center shadow-glow-orange transition-all"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Bottom Bar with Developer Mode Trigger */}
      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-white/40 gap-3">
        <div className="flex items-center gap-3">
          <span>© {new Date().getFullYear()} Subrata Roy. All rights reserved.</span>
          
          {/* Discreet Developer Mode Button */}
          <button
            onClick={handleDevModeClick}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-brand-orange/20 border border-white/10 hover:border-brand-orange/40 text-[10px] text-zinc-400 hover:text-white transition-all group"
            title="Access Developer Control Center"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange group-hover:animate-ping" />
            <span>Developer Mode</span>
            {isAuthenticated && (
              <span className="text-emerald-400 font-bold ml-0.5">• Admin</span>
            )}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span>Engineered with React, TypeScript & Tailwind CSS</span>
          <span>•</span>
          <span className="text-brand-orange font-bold">.NET Ecosystem</span>
        </div>
      </div>
    </footer>
  );
};
