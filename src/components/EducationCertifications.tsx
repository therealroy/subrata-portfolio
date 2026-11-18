import React from 'react';
import { GraduationCap, Award, BookOpen, CheckCircle, Calendar, MapPin, Sparkles } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const EducationCertifications: React.FC = () => {
  const { education, certifications } = usePortfolio();

  return (
    <section className="relative py-16 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 bg-[#09090b] text-white overflow-hidden border-t border-white/5">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-brand-orange/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 pb-8 sm:pb-12 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-[11px] sm:text-xs text-brand-orange uppercase tracking-widest font-bold mb-2 sm:mb-3">
              <span className="w-2 h-2 rounded-full bg-brand-orange" />
              <span>05 // ACADEMICS & SPECIALIZATION</span>
            </div>
            <h2 className="font-display font-black text-2xl sm:text-4xl lg:text-6xl tracking-tight uppercase">
              EDUCATION & <span className="text-brand-orange">FOCUS</span>
            </h2>
          </div>

          <p className="max-w-md text-sm text-zinc-400 font-normal leading-relaxed">
            Strong postgraduate computer applications foundation coupled with continuous engineering specialization in backend systems and software design.
          </p>
        </div>

        {/* Two-Column Grid: Education on Left, Certifications/Specializations on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-12 items-start">
          
          {/* Education Column */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="font-mono text-xs uppercase tracking-widest text-brand-orange font-bold flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-brand-orange" />
              <span>Formal Academic Qualification</span>
            </h3>

            {education.map((edu, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#16161a] via-[#111114] to-[#0b0b0d] border border-white/10 relative overflow-hidden shadow-2xl group hover:border-brand-orange/40 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-brand-orange/15 border border-brand-orange/30 text-brand-orange font-mono text-xs font-semibold">
                    {edu.gradeOrCgpa || (idx === 0 ? 'Postgraduate Degree' : 'Undergraduate Degree')}
                  </span>
                  <div className="flex items-center gap-1.5 font-mono text-xs text-zinc-400">
                    <Calendar className="w-3.5 h-3.5 text-brand-orange" />
                    <span>{edu.duration}</span>
                  </div>
                </div>

                <h4 className="font-display font-black text-xl sm:text-2xl text-white mb-2 group-hover:text-brand-orange transition-colors">
                  {edu.degree}
                </h4>

                <div className="text-sm sm:text-base font-bold text-zinc-300 mb-1">
                  {edu.institution}
                </div>

                <div className="flex items-center gap-1.5 font-mono text-xs text-zinc-500 mb-6">
                  <MapPin className="w-3.5 h-3.5 text-brand-orange" />
                  <span>{edu.location}</span>
                </div>

                <div className="space-y-3 pt-4 border-t border-white/10">
                  {edu.details.map((item, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2.5 text-xs text-zinc-400 leading-relaxed">
                      <CheckCircle className="w-3.5 h-3.5 text-brand-orange shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Certifications and Specialized Domains Column */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="font-mono text-xs uppercase tracking-widest text-brand-orange font-bold flex items-center gap-2">
              <Award className="w-4 h-4 text-brand-orange" />
              <span>Technical Specializations & Focus Domains</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certifications.map((cert, cIdx) => (
                <div
                  key={cIdx}
                  className="p-6 rounded-2xl bg-gradient-to-br from-[#141417] to-[#0d0d10] hover:from-[#19191e] hover:to-[#121215] border border-white/10 hover:border-brand-orange/40 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[10px] text-brand-orange uppercase tracking-wider font-semibold">
                      {cert.issuer}
                    </span>
                    <Sparkles className="w-3.5 h-3.5 text-brand-orange/60 group-hover:text-brand-orange transition-colors" />
                  </div>

                  <h4 className="font-display font-bold text-base text-white mb-2 group-hover:text-brand-orange transition-colors">
                    {cert.title}
                  </h4>

                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {cert.focus}
                  </p>
                </div>
              ))}
            </div>

            {/* AI Engineering Highlight */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-brand-orange/15 via-[#111114] to-[#141418] border border-brand-orange/30 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-orange flex items-center justify-center text-white shrink-0 shadow-glow-orange">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h5 className="font-display font-bold text-sm text-white">
                  Continuous AI & Software Engineering Mastery
                </h5>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  Actively studying and implementing state-of-the-art developer tooling: GitHub Copilot, Cursor AI workflows, and LLM orchestration APIs in modern software systems.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
