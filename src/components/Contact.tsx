import React, { useState } from 'react';
import { 
  Mail, 
  Linkedin, 
  Github, 
  MapPin, 
  Send, 
  Check, 
  Copy, 
  FileText, 
  ArrowUpRight,
  Clock,
  AlertCircle,
  Loader2,
  ExternalLink
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { InstagramIcon } from './icons/SocialIcons';

interface ContactProps {
  onOpenResume: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onOpenResume }) => {
  const { personalInfo } = usePortfolio();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    hp_company_field: '', // Honeypot spam trap
  });

  const [formTimestamp] = useState<number>(Date.now());
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error' | 'redirect' | null;
    message: string;
    mailtoUrl?: string;
    gmailUrl?: string;
  }>({ type: null, message: '' });

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const generateMailLinks = (name: string, email: string, subject: string, message: string) => {
    const formattedSubject = subject?.trim() 
      ? `[Portfolio Contact] ${subject.trim()} — from ${name.trim() || 'Visitor'}`
      : `[Portfolio Inquiry] Message from ${name.trim() || 'Visitor'}`;

    const formattedBody = `Hi Subrata,

My name is: ${name.trim()}
My email is: ${email.trim()}
Subject: ${subject.trim() || 'General Collaboration / Opportunity'}

----------------------------------------
MESSAGE DETAILS:
----------------------------------------
${message.trim()}

----------------------------------------
Dispatched via Subrata Roy Portfolio Contact Form
Date: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} (IST)`;

    const encodedSubject = encodeURIComponent(formattedSubject);
    const encodedBody = encodeURIComponent(formattedBody);

    const mailtoUrl = `mailto:roy417996@gmail.com?subject=${encodedSubject}&body=${encodedBody}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=roy417996@gmail.com&su=${encodedSubject}&body=${encodedBody}`;

    return { mailtoUrl, gmailUrl, formattedSubject, formattedBody };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage({ type: null, message: '' });

    // Client-side validations
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName || trimmedName.length < 2) {
      setStatusMessage({
        type: 'error',
        message: 'Please enter your name (at least 2 characters).',
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      setStatusMessage({
        type: 'error',
        message: 'Please enter a valid email address (e.g. name@domain.com).',
      });
      return;
    }

    if (!trimmedMessage || trimmedMessage.length < 5) {
      setStatusMessage({
        type: 'error',
        message: 'Please describe your message details (at least 5 characters).',
      });
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          subject: formData.subject.trim(),
          message: trimmedMessage,
          hp_company_field: formData.hp_company_field,
          timestamp: formTimestamp,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success) {
        setStatusMessage({
          type: 'success',
          message: 'Your message has been transmitted directly to roy417996@gmail.com. I will reply to you promptly.',
        });
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          hp_company_field: '',
        });
      } else {
        // Fallback: automatically redirect to email client with pre-filled template
        const { mailtoUrl, gmailUrl } = generateMailLinks(trimmedName, trimmedEmail, formData.subject, trimmedMessage);

        const opened = window.open(gmailUrl, '_blank');
        if (!opened) {
          try {
            window.location.href = mailtoUrl;
          } catch (err) {}
        }

        setStatusMessage({
          type: 'redirect',
          message: 'Redirecting to your email client with your message pre-filled. If the compose window did not open, click one of the buttons below to dispatch via Gmail or your mail app.',
          mailtoUrl,
          gmailUrl,
        });
      }
    } catch (err: any) {
      console.error('Contact transmission error:', err);
      const { mailtoUrl, gmailUrl } = generateMailLinks(trimmedName, trimmedEmail, formData.subject, trimmedMessage);

      const opened = window.open(gmailUrl, '_blank');
      if (!opened) {
        try {
          window.location.href = mailtoUrl;
        } catch (e) {}
      }

      setStatusMessage({
        type: 'redirect',
        message: 'Redirecting to your email client with your message pre-filled. If the compose window did not open, click one of the buttons below to dispatch via Gmail or your mail app.',
        mailtoUrl,
        gmailUrl,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-16 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 bg-[#09090b] text-white overflow-hidden border-t border-white/5">
      {/* Background radial glow */}
      <div className="absolute bottom-0 left-1/3 w-[600px] h-[600px] bg-brand-orange/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 pb-8 sm:pb-12 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-[11px] sm:text-xs text-brand-orange uppercase tracking-widest font-bold mb-2 sm:mb-3">
              <span className="w-2 h-2 rounded-full bg-brand-orange" />
              <span>06 // INITIATE DIALOGUE</span>
            </div>
            <h2 className="font-display font-black text-2xl sm:text-4xl lg:text-6xl tracking-tight uppercase">
              LET'S <span className="text-brand-orange">CONNECT</span>
            </h2>
          </div>

          <p className="max-w-md text-sm text-zinc-400 font-normal leading-relaxed">
            Interested in collaborating, hiring for .NET engineering roles, or discussing enterprise architecture? Reach out directly.
          </p>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-12 items-start">
          
          {/* Left Column: Direct Info, Socials, Resume Button */}
          <div className="lg:col-span-5 space-y-8">
            
            <div>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-white mb-3">
                Let's Build Something Impactful.
              </h3>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                Whether you have an upcoming project, an engineering opening in .NET/C#, or need high-performance API integration, I look forward to hearing from you.
              </p>
            </div>

            {/* Quick Contact Cards */}
            <div className="space-y-4">
              
              {/* Email Card with Copy button */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#16161a] via-[#111114] to-[#0b0b0d] border border-white/10 hover:border-brand-orange/40 transition-colors flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-orange/15 border border-brand-orange/30 flex items-center justify-center text-brand-orange">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-zinc-500 uppercase block">Direct Email</span>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="font-display font-bold text-sm sm:text-base text-white hover:text-brand-orange transition-colors"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={copyEmail}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-brand-orange hover:text-white text-zinc-400 transition-colors"
                  title="Copy email to clipboard"
                  aria-label="Copy email"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Location Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#16161a] via-[#111114] to-[#0b0b0d] border border-white/10 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-orange/15 border border-brand-orange/30 flex items-center justify-center text-brand-orange">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-[10px] text-zinc-500 uppercase block">Location</span>
                  <span className="font-display font-bold text-sm sm:text-base text-white">
                    {personalInfo.location}
                  </span>
                </div>
              </div>

              {/* Timezone / Availability */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#16161a] via-[#111114] to-[#0b0b0d] border border-white/10 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-orange/15 border border-brand-orange/30 flex items-center justify-center text-brand-orange">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-[10px] text-zinc-500 uppercase block">Work Mode & Timezone</span>
                  <span className="font-display font-bold text-sm sm:text-base text-white">
                    IST (UTC+5:30) • Open for Remote & Onsite
                  </span>
                </div>
              </div>

            </div>

            {/* Social Links & Resume Download Buttons */}
            <div className="pt-2 space-y-4">
              <span className="font-mono text-xs uppercase tracking-widest text-brand-orange font-bold block">
                Connect on Professional Platforms
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* LinkedIn */}
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-[#141418] hover:bg-[#1a1a20] border border-white/10 hover:border-brand-orange transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <Linkedin className="w-5 h-5 text-brand-orange shrink-0" />
                    <span className="font-display font-bold text-xs sm:text-sm">LinkedIn</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                </a>

                {/* GitHub */}
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-[#141418] hover:bg-[#1a1a20] border border-white/10 hover:border-brand-orange transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <Github className="w-5 h-5 text-brand-orange shrink-0" />
                    <span className="font-display font-bold text-xs sm:text-sm">GitHub</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                </a>

                {/* Instagram */}
                <a
                  href={personalInfo.instagram || 'https://www.instagram.com/the.subrata.roy?knvt=MTBhYzZmNTlzaG8xdg%3D%3D'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-[#141418] hover:bg-[#1a1a20] border border-white/10 hover:border-brand-orange transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <InstagramIcon className="w-5 h-5 text-brand-orange shrink-0" />
                    <span className="font-display font-bold text-xs sm:text-sm">Instagram</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                </a>
              </div>

              {/* Download Resume Button */}
              <button
                onClick={onOpenResume}
                className="w-full flex items-center justify-center gap-2.5 px-4 py-3.5 sm:py-4 rounded-2xl bg-brand-orange hover:bg-brand-orange-light text-white font-mono text-xs font-bold uppercase tracking-wider shadow-glow-orange hover:shadow-glow-orange-lg transition-all duration-300 transform hover:-translate-y-0.5 group"
              >
                <FileText className="w-4 h-4 shrink-0" />
                <span className="whitespace-nowrap hidden xs:inline">View & Download Curriculum Vitae</span>
                <span className="whitespace-nowrap xs:hidden">View & Download CV</span>
                <ArrowUpRight className="w-4 h-4 shrink-0 opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>

          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-5 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#16161a] via-[#111114] to-[#0b0b0d] border border-white/10 shadow-2xl relative">
              <h3 className="font-display font-black text-xl sm:text-2xl text-white mb-2">
                Send a Message
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mb-6 font-mono">
                Direct transmission to Subrata Roy's primary inbox.
              </p>

              {/* Success Notification */}
              {statusMessage.type === 'success' && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm font-mono flex items-start gap-3 animate-fade-in">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white">Message Transmitted Successfully!</p>
                    <p className="text-xs text-emerald-300/90 mt-0.5 leading-relaxed">{statusMessage.message}</p>
                  </div>
                </div>
              )}

              {/* Redirect / Email Client Template Notification */}
              {statusMessage.type === 'redirect' && (
                <div className="mb-6 p-5 rounded-2xl bg-gradient-to-r from-brand-orange/15 to-purple-500/10 border border-brand-orange/40 text-white shadow-xl animate-fade-in">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-brand-orange flex items-center justify-center text-white shrink-0 shadow-glow-orange mt-0.5">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <p className="font-display font-bold text-sm text-white">
                        Pre-Filled Email Template Ready
                      </p>
                      <p className="text-xs text-zinc-300 font-mono mt-1 leading-relaxed">
                        {statusMessage.message}
                      </p>

                      <div className="flex flex-wrap items-center gap-2.5 mt-3.5">
                        {statusMessage.gmailUrl && (
                          <a
                            href={statusMessage.gmailUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-orange hover:bg-brand-orange-light text-white font-mono text-xs font-bold uppercase tracking-wider shadow-glow-orange transition-all"
                          >
                            <span>Open in Gmail Web</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}

                        {statusMessage.mailtoUrl && (
                          <a
                            href={statusMessage.mailtoUrl}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-semibold uppercase tracking-wider transition-all border border-white/10"
                          >
                            <span>Open in Mail App</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Error Notification */}
              {statusMessage.type === 'error' && (
                <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm font-mono flex items-start gap-3 animate-fade-in">
                  <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-rose-200">Transmission Note</p>
                    <p className="text-xs text-rose-300/90 mt-0.5 leading-relaxed">{statusMessage.message}</p>
                    <p className="text-[11px] text-zinc-400 mt-2">
                      You can also email directly to{' '}
                      <a href="mailto:roy417996@gmail.com" className="text-brand-orange underline font-semibold">
                        roy417996@gmail.com
                      </a>
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                {/* Honeypot field for invisible spam detection */}
                <div className="opacity-0 absolute -z-50 pointer-events-none select-none h-0 w-0 overflow-hidden" aria-hidden="true" tabIndex={-1}>
                  <input
                    type="text"
                    name="hp_company_field"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.hp_company_field}
                    onChange={(e) => setFormData({ ...formData, hp_company_field: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-zinc-500 text-base sm:text-sm focus:outline-none focus:border-brand-orange transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. john@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-zinc-500 text-base sm:text-sm focus:outline-none focus:border-brand-orange transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                    Subject / Discussion Topic
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. .NET Developer Role / Enterprise Collaboration"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-zinc-500 text-base sm:text-sm focus:outline-none focus:border-brand-orange transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                    Message Details *
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Describe your requirements, system architecture questions, or opportunity details..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-zinc-500 text-base sm:text-sm focus:outline-none focus:border-brand-orange transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-xl bg-brand-orange hover:bg-brand-orange-light disabled:opacity-60 disabled:cursor-not-allowed text-white font-display font-extrabold text-sm uppercase tracking-wider shadow-glow-orange hover:shadow-glow-orange-lg transition-all flex items-center justify-center gap-2 group"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>

                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={() => {
                      const { mailtoUrl, gmailUrl } = generateMailLinks(
                        formData.name || 'Visitor',
                        formData.email || 'visitor@example.com',
                        formData.subject,
                        formData.message || 'I would like to discuss an opportunity with you.'
                      );
                      const opened = window.open(gmailUrl, '_blank');
                      if (!opened) window.location.href = mailtoUrl;

                      setStatusMessage({
                        type: 'redirect',
                        message: 'Composing your message with the pre-filled template. If the window did not open, click below to open in Gmail or your mail app.',
                        mailtoUrl,
                        gmailUrl,
                      });
                    }}
                    className="text-[11px] font-mono text-zinc-400 hover:text-brand-orange transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Prefer composing in Gmail?</span>
                    <span className="text-brand-orange underline font-semibold flex items-center gap-0.5">
                      <span>Open Pre-Filled Template</span>
                      <ExternalLink className="w-3 h-3" />
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
