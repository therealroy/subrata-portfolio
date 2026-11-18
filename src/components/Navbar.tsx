import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Code2, FileText, Send } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface NavbarProps {
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume }) => {
  const { personalInfo } = usePortfolio();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Skills', href: '#skills' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#09090b]/90 backdrop-blur-md border-b border-white/10 py-3 shadow-lg'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            className="group flex items-center gap-3 transition-transform hover:scale-105"
          >
            <div className="w-10 h-10 rounded-xl bg-brand-orange flex items-center justify-center font-display font-black text-white text-base shadow-glow-orange group-hover:rotate-6 transition-all duration-300">
              SR
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-display font-extrabold text-xs sm:text-base tracking-wider uppercase text-white group-hover:text-brand-orange transition-colors truncate">
                {personalInfo.name}
              </span>
              <span className="font-mono text-[8px] sm:text-[10px] text-white/50 tracking-widest uppercase truncate">
                .NET • React • AI // Durgapur, IN
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-full px-5 py-1.5 backdrop-blur-sm">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-3.5 py-1 text-xs font-medium text-white/75 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Availability Pill */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[11px] font-mono text-emerald-300 tracking-tight">
                Open for Hire
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={onOpenResume}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium text-white/80 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 transition-all"
                title="View Resume"
              >
                <FileText className="w-3.5 h-3.5 text-brand-orange" />
                <span>CV</span>
              </button>

              <a
                href="#contact"
                className="group relative inline-flex items-center gap-2 px-5 py-2 rounded-full bg-brand-orange hover:bg-brand-orange-light text-white text-xs font-bold tracking-wider uppercase transition-all duration-200 shadow-glow-orange hover:shadow-glow-orange-lg hover:scale-105"
              >
                <span>Let's Talk</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onOpenResume}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/80 text-xs font-mono"
            >
              CV
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#141418]/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 shadow-2xl transition-all">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-xs font-mono text-emerald-300">
                Available for .NET & Software Engineering
              </span>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-white/85 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <ArrowUpRight className="w-4 h-4 text-brand-orange" />
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-mono font-semibold uppercase tracking-wider transition-colors"
              >
                <FileText className="w-4 h-4 text-brand-orange" />
                <span>View Full Curriculum Vitae</span>
              </button>

              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-orange hover:bg-brand-orange-light text-white text-xs font-bold uppercase tracking-wider shadow-glow-orange transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Let's Connect</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

