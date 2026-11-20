import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  Unlock, 
  ShieldCheck, 
  Save, 
  RotateCcw, 
  LogOut, 
  User, 
  Code2, 
  Briefcase, 
  Layers, 
  GraduationCap, 
  Plus, 
  Trash2, 
  Check, 
  AlertCircle,
  FileText,
  Eye,
  Upload,
  ExternalLink,
  Palette,
  Sparkles,
  RefreshCw,
  Image as ImageIcon,
  Globe,
  Github,
  Type
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { SkillItem, ExperienceItem, ProjectItem, EducationItem } from '../types/portfolio';
import { 
  THEME_PRESETS, 
  DEFAULT_THEME, 
  PortfolioTheme, 
  adjustHexBrightness, 
  applyThemeToDocument,
  FONT_PRESETS,
  POPULAR_DISPLAY_FONTS,
  POPULAR_SANS_FONTS,
  POPULAR_MONO_FONTS,
  FontPreset
} from '../utils/themeUtils';

export const DeveloperModeModal: React.FC = () => {
  const { 
    personalInfo, 
    experiences, 
    skills, 
    projects, 
    education, 
    resumeData,
    theme,
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    isAdminOpen, 
    setIsAdminOpen, 
    setIsResumeOpen,
    isAuthenticated, 
    login, 
    logout, 
    updatePersonalInfo, 
    updateSkills, 
    updateExperiences, 
    updateProjects, 
    updateEducation, 
    updateResumeData,
    updateTheme,
    resetTheme,
    saveAllData,
    resetToDefault 
  } = usePortfolio();

  // Auth form state
  const [emailInput, setEmailInput] = useState('');
  const [passInput, setPassInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Admin active tab
  const [activeTab, setActiveTab] = useState<'profile' | 'resume' | 'palette' | 'fonts' | 'skills' | 'experience' | 'projects' | 'education'>('profile');
  const [saveToast, setSaveToast] = useState(false);

  // Local draft states for editing
  const [profileDraft, setProfileDraft] = useState({ ...personalInfo });
  const [skillsDraft, setSkillsDraft] = useState<SkillItem[]>([...skills]);
  const [expDraft, setExpDraft] = useState<ExperienceItem[]>([...experiences]);
  const [projectsDraft, setProjectsDraft] = useState<ProjectItem[]>([...projects]);
  const [educationDraft, setEducationDraft] = useState<EducationItem[]>([...education]);
  const [resumeDraft, setResumeDraft] = useState({ ...resumeData });
  const [themeDraft, setThemeDraft] = useState<PortfolioTheme>({ ...theme });

  // Sync drafts when modal opens or context changes
  React.useEffect(() => {
    setProfileDraft({ ...personalInfo });
    setSkillsDraft([...skills]);
    setExpDraft([...experiences]);
    setProjectsDraft([...projects]);
    setEducationDraft([...education]);
    setResumeDraft({ ...resumeData });
    setThemeDraft({ ...theme });
  }, [personalInfo, skills, experiences, projects, education, resumeData, theme, isAdminOpen]);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    const success = login(emailInput, passInput);
    if (!success) {
      setAuthError('Invalid credentials. Access is restricted to developer admin.');
    } else {
      setEmailInput('');
      setPassInput('');
    }
  };

  const handleSaveAll = () => {
    saveAllData({
      personalInfo: profileDraft,
      skills: skillsDraft,
      experiences: expDraft,
      projects: projectsDraft,
      education: educationDraft,
      resumeData: resumeDraft,
      theme: themeDraft,
    });

    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  const handleThemeColorChange = (key: keyof PortfolioTheme, val: string) => {
    const updated: PortfolioTheme = {
      ...themeDraft,
      [key]: val,
      presetId: 'custom',
    };
    if (key === 'accent') {
      updated.accentHover = adjustHexBrightness(val, -15);
      updated.accentLight = adjustHexBrightness(val, 20);
    }
    setThemeDraft(updated);
    applyThemeToDocument(updated); // Instant live preview!
  };

  const handleSelectPreset = (preset: PortfolioTheme) => {
    const fullPreset: PortfolioTheme = {
      ...preset,
      accentHover: preset.accentHover || adjustHexBrightness(preset.accent, -15),
      accentLight: preset.accentLight || adjustHexBrightness(preset.accent, 20),
    };
    setThemeDraft(fullPreset);
    applyThemeToDocument(fullPreset); // Instant live preview!
  };

  const handleResetTheme = () => {
    setThemeDraft({ ...DEFAULT_THEME });
    resetTheme();
  };

  const handleSelectFontPreset = (preset: FontPreset) => {
    const updated: PortfolioTheme = {
      ...themeDraft,
      fontPresetId: preset.id,
      fontDisplay: preset.display,
      fontSans: preset.sans,
      fontMono: preset.mono,
    };
    setThemeDraft(updated);
    applyThemeToDocument(updated); // Instant live preview!
  };

  const handleFontChange = (layer: 'fontDisplay' | 'fontSans' | 'fontMono', fontName: string) => {
    const updated: PortfolioTheme = {
      ...themeDraft,
      [layer]: fontName,
      fontPresetId: 'custom',
    };
    setThemeDraft(updated);
    applyThemeToDocument(updated); // Instant live preview!
  };

  const handleResetFonts = () => {
    const updated: PortfolioTheme = {
      ...themeDraft,
      fontPresetId: 'obsidian-tech',
      fontDisplay: 'Syne',
      fontSans: 'Space Grotesk',
      fontMono: 'JetBrains Mono',
    };
    setThemeDraft(updated);
    applyThemeToDocument(updated); // Instant live preview!
  };

  const handleReset = () => {
    if (window.confirm('Reset all portfolio content to factory default?')) {
      resetToDefault();
      setSaveToast(true);
      setTimeout(() => setSaveToast(false), 3000);
    }
  };

  // ==========================================
  // 1. AUTHENTICATION LOGIN MODAL
  // ==========================================
  if (isAuthModalOpen && !isAuthenticated) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
        <div className="relative w-full max-w-md rounded-3xl bg-[#141418] border border-brand-orange/40 shadow-2xl p-6 sm:p-8">
          
          <button
            onClick={() => {
              setIsAuthModalOpen(false);
              setAuthError('');
            }}
            className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-brand-orange/15 border border-brand-orange/30 flex items-center justify-center text-brand-orange shadow-glow-orange">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-extrabold text-lg text-white">
                Developer Mode Login
              </h3>
              <p className="text-xs font-mono text-zinc-400">
                Restricted admin access
              </p>
            </div>
          </div>

          {authError && (
            <div className="mb-5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-mono flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                Admin Email
              </label>
              <input
                type="email"
                required
                placeholder="Enter authorized email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                autoComplete="email"
                className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-brand-orange transition-colors font-mono placeholder:text-zinc-600"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                Admin Password
              </label>
              <input
                type="password"
                required
                placeholder="Enter admin password"
                value={passInput}
                onChange={(e) => setPassInput(e.target.value)}
                autoComplete="current-password"
                className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-brand-orange transition-colors font-mono placeholder:text-zinc-600"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-2 rounded-xl bg-brand-orange hover:bg-brand-orange-light text-white font-display font-bold text-xs uppercase tracking-wider shadow-glow-orange transition-all flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4" />
              <span>Authenticate Developer Mode</span>
            </button>
          </form>

        </div>
      </div>
    );
  }

  // ==========================================
  // 2. ADMIN CMS CONTROL PANEL
  // ==========================================
  if (isAdminOpen && isAuthenticated) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-6 bg-black/90 backdrop-blur-lg animate-fade-in overflow-y-auto">
        <div className="relative w-full max-w-6xl max-h-[92vh] flex flex-col rounded-3xl bg-[#121215] border border-brand-orange/40 shadow-2xl overflow-hidden my-auto">
          
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between p-4 sm:px-8 sm:py-5 border-b border-white/10 bg-[#16161b] gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-brand-orange flex items-center justify-center text-white shadow-glow-orange font-bold text-xs">
                ⚡
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-display font-black text-base sm:text-lg text-white">
                    Developer Control Center
                  </h2>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-[10px]">
                    Admin Active
                  </span>
                </div>
                <div className="text-[11px] font-mono text-zinc-400">
                  Logged in as <span className="text-brand-orange font-semibold">roy417996@gmail.com</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              {saveToast && (
                <div className="px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-xs flex items-center gap-1.5 animate-pulse">
                  <Check className="w-3.5 h-3.5" />
                  <span>Changes Saved!</span>
                </div>
              )}

              <button
                onClick={handleSaveAll}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-orange hover:bg-brand-orange-light text-white font-mono text-xs font-bold uppercase shadow-glow-orange transition-all"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save All</span>
              </button>

              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/10 font-mono text-xs transition-colors"
                title="Reset to original portfolio defaults"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>

              <button
                onClick={logout}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 font-mono text-xs transition-colors"
                title="Log out of developer mode"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>

              <button
                onClick={() => setIsAdminOpen(false)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                aria-label="Close admin modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 px-4 sm:px-8 py-3 bg-[#0f0f13] border-b border-white/10 overflow-x-auto scrollbar-none">
            {[
              { id: 'profile', label: 'Profile & Hero', icon: User },
              { id: 'resume', label: 'Resume / CV', icon: FileText },
              { id: 'palette', label: 'Color Palette', icon: Palette },
              { id: 'fonts', label: 'Typography & Fonts', icon: Type },
              { id: 'skills', label: 'Technical Skills', icon: Code2, count: skillsDraft.length },
              { id: 'experience', label: 'Experience Timeline', icon: Briefcase, count: expDraft.length },
              { id: 'projects', label: 'Featured Projects', icon: Layers, count: projectsDraft.length },
              { id: 'education', label: 'Education & Academics', icon: GraduationCap, count: educationDraft.length },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-mono text-xs whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-brand-orange text-white font-bold shadow-glow-orange'
                      : 'bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/5'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/40">
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Tab Content Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6">
            
            {/* 1. PROFILE & HERO TAB */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                
                {/* Hero Section Portrait Photo Management */}
                <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                        <ImageIcon className="w-4 h-4 text-brand-orange" />
                        <span>Home Section Hero Portrait Photo</span>
                      </h4>
                      <p className="text-[11px] font-mono text-zinc-400 mt-0.5">
                        Change the main portrait photograph displayed in the Home / Hero section.
                      </p>
                    </div>
                    {profileDraft.portraitUrl && profileDraft.portraitUrl !== '/subrata-portrait.jpg?v=3' && (
                      <button
                        type="button"
                        onClick={() => setProfileDraft({ ...profileDraft, portraitUrl: '/subrata-portrait.jpg?v=3' })}
                        className="text-xs font-mono text-zinc-400 hover:text-brand-orange underline flex items-center gap-1.5 transition-colors"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reset to Default Portrait</span>
                      </button>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pt-2">
                    {/* Live Thumbnail Preview */}
                    <div className="relative w-28 h-36 sm:w-32 sm:h-40 rounded-2xl overflow-hidden border-2 border-brand-orange/40 bg-black shrink-0 shadow-glow-orange group">
                      <img
                        src={profileDraft.portraitUrl || '/subrata-portrait.jpg?v=3'}
                        alt="Hero Portrait Preview"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = '/subrata-portrait.jpg?v=3';
                        }}
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[10px] font-mono text-white text-center p-1 font-semibold">
                        Current Hero Photo
                      </div>
                    </div>

                    {/* Upload & URL Controls */}
                    <div className="flex-1 space-y-3 w-full">
                      {/* Option 1: File Upload */}
                      <div>
                        <label className="block text-xs font-mono uppercase text-zinc-300 mb-1.5 font-bold">
                          Upload New Photo from Device
                        </label>
                        <label className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-dashed border-white/20 hover:border-brand-orange cursor-pointer text-xs font-mono text-zinc-200 transition-all group">
                          <Upload className="w-4 h-4 text-brand-orange group-hover:scale-110 transition-transform" />
                          <span>Choose Image File (JPG, PNG, WebP)</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                if (file.size > 8 * 1024 * 1024) {
                                  alert('Image size exceeds 8MB. Please choose a smaller file.');
                                  return;
                                }
                                const reader = new FileReader();
                                reader.onload = (event) => {
                                  const result = event.target?.result as string;
                                  if (result) {
                                    setProfileDraft({ ...profileDraft, portraitUrl: result });
                                  }
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </label>
                      </div>

                      {/* Option 2: Image URL */}
                      <div>
                        <label className="block text-xs font-mono uppercase text-zinc-300 mb-1.5 font-bold">
                          Or Enter Image URL / Local Asset Path
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            placeholder="e.g. /subrata-portrait.jpg or https://images.unsplash.com/..."
                            value={profileDraft.portraitUrl || ''}
                            onChange={(e) => setProfileDraft({ ...profileDraft, portraitUrl: e.target.value })}
                            className="flex-1 px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white font-mono text-xs focus:border-brand-orange focus:outline-none transition-colors"
                          />
                          {profileDraft.portraitUrl && (
                            <button
                              type="button"
                              onClick={() => setProfileDraft({ ...profileDraft, portraitUrl: '' })}
                              className="px-3 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 font-mono text-xs transition-colors shrink-0"
                            >
                              Clear
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={profileDraft.name}
                      onChange={(e) => setProfileDraft({ ...profileDraft, name: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">Watermark First Name</label>
                    <input
                      type="text"
                      value={profileDraft.heroFirstName}
                      onChange={(e) => setProfileDraft({ ...profileDraft, heroFirstName: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">Professional Title</label>
                    <input
                      type="text"
                      value={profileDraft.title}
                      onChange={(e) => setProfileDraft({ ...profileDraft, title: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">Short Hero Subtitle</label>
                    <input
                      type="text"
                      value={profileDraft.shortTitle}
                      onChange={(e) => setProfileDraft({ ...profileDraft, shortTitle: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={profileDraft.email}
                      onChange={(e) => setProfileDraft({ ...profileDraft, email: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">Location</label>
                    <input
                      type="text"
                      value={profileDraft.location}
                      onChange={(e) => setProfileDraft({ ...profileDraft, location: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">LinkedIn Profile URL</label>
                    <input
                      type="text"
                      value={profileDraft.linkedin}
                      onChange={(e) => setProfileDraft({ ...profileDraft, linkedin: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">GitHub Profile URL</label>
                    <input
                      type="text"
                      value={profileDraft.github}
                      onChange={(e) => setProfileDraft({ ...profileDraft, github: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">Instagram Profile URL</label>
                    <input
                      type="text"
                      placeholder="https://www.instagram.com/the.subrata.roy..."
                      value={profileDraft.instagram || ''}
                      onChange={(e) => setProfileDraft({ ...profileDraft, instagram: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">Professional Tagline</label>
                  <input
                    type="text"
                    value={profileDraft.tagline}
                    onChange={(e) => setProfileDraft({ ...profileDraft, tagline: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">About Me Biography</label>
                  <textarea
                    rows={4}
                    value={profileDraft.aboutBio}
                    onChange={(e) => setProfileDraft({ ...profileDraft, aboutBio: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-sm leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">Current Company Name</label>
                    <input
                      type="text"
                      value={profileDraft.currentCompany}
                      onChange={(e) => setProfileDraft({ ...profileDraft, currentCompany: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">Current Company URL</label>
                    <input
                      type="text"
                      value={profileDraft.currentCompanyUrl}
                      onChange={(e) => setProfileDraft({ ...profileDraft, currentCompanyUrl: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-sm"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 2. SKILLS TAB */}
            {activeTab === 'skills' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2">
                  <span className="text-xs font-mono text-zinc-400">
                    Manage all technical competencies & proficiency indicators
                  </span>
                  <button
                    onClick={() => {
                      const newSkill: SkillItem = {
                        name: 'New Technology',
                        category: 'backend',
                        proficiencyLabel: 'Core Expertise',
                        description: 'Detailed description of implementation and production experience.'
                      };
                      setSkillsDraft([newSkill, ...skillsDraft]);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-orange text-white text-xs font-mono font-bold"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Skill</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {skillsDraft.map((skill, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-3 relative group">
                      <div className="flex items-center justify-between gap-2">
                        <input
                          type="text"
                          value={skill.name}
                          onChange={(e) => {
                            const updated = [...skillsDraft];
                            updated[idx].name = e.target.value;
                            setSkillsDraft(updated);
                          }}
                          className="font-bold text-white bg-transparent border-b border-transparent focus:border-brand-orange px-1 py-0.5 text-sm"
                        />
                        <button
                          onClick={() => {
                            setSkillsDraft(skillsDraft.filter((_, i) => i !== idx));
                          }}
                          className="p-1.5 rounded-lg text-zinc-500 hover:text-rose-400 hover:bg-white/5 transition-colors"
                          title="Delete skill"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <select
                          value={skill.category}
                          onChange={(e) => {
                            const updated = [...skillsDraft];
                            updated[idx].category = e.target.value as any;
                            setSkillsDraft(updated);
                          }}
                          className="px-2 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-zinc-300 font-mono text-xs"
                        >
                          <option value="backend">Backend</option>
                          <option value="database">Database</option>
                          <option value="frontend">Frontend</option>
                          <option value="integrations">Integrations</option>
                          <option value="ai-tools">AI Tools</option>
                        </select>

                        <select
                          value={skill.proficiencyLabel}
                          onChange={(e) => {
                            const updated = [...skillsDraft];
                            updated[idx].proficiencyLabel = e.target.value as any;
                            setSkillsDraft(updated);
                          }}
                          className="px-2 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-zinc-300 font-mono text-xs"
                        >
                          <option value="Core Expertise">Core Expertise</option>
                          <option value="Production Grade">Production Grade</option>
                          <option value="Advanced">Advanced</option>
                          <option value="Architectural">Architectural</option>
                          <option value="Daily Driver">Daily Driver</option>
                          <option value="Specialized">Specialized</option>
                        </select>
                      </div>

                      <textarea
                        rows={2}
                        value={skill.description}
                        onChange={(e) => {
                          const updated = [...skillsDraft];
                          updated[idx].description = e.target.value;
                          setSkillsDraft(updated);
                        }}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-900/60 border border-white/5 text-zinc-300 text-xs"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. EXPERIENCE TAB */}
            {activeTab === 'experience' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-2">
                  <span className="text-xs font-mono text-zinc-400">
                    Manage professional company roles and employment history
                  </span>
                  <button
                    onClick={() => {
                      const newExp: ExperienceItem = {
                        id: `exp-${Date.now()}`,
                        role: 'Software Engineer',
                        company: 'Company Name',
                        companyUrl: 'https://example.com',
                        period: '2026 – Present',
                        location: 'India',
                        summary: 'Role summary details...',
                        coreHighlights: ['Key contribution highlight 1', 'Key contribution highlight 2'],
                        techStack: ['C#', 'ASP.NET Core', 'SQL Server']
                      };
                      setExpDraft([newExp, ...expDraft]);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-orange text-white text-xs font-mono font-bold"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Position</span>
                  </button>
                </div>

                {expDraft.map((exp, idx) => (
                  <div key={exp.id} className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="font-mono text-xs text-brand-orange font-bold">
                        Position #{idx + 1}
                      </div>
                      <button
                        onClick={() => setExpDraft(expDraft.filter((_, i) => i !== idx))}
                        className="p-1.5 rounded-lg text-zinc-500 hover:text-rose-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-mono text-zinc-400 mb-1">Role Title</label>
                        <input
                          type="text"
                          value={exp.role}
                          onChange={(e) => {
                            const updated = [...expDraft];
                            updated[idx].role = e.target.value;
                            setExpDraft(updated);
                          }}
                          className="w-full px-3 py-1.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono text-zinc-400 mb-1">Company Name</label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => {
                            const updated = [...expDraft];
                            updated[idx].company = e.target.value;
                            setExpDraft(updated);
                          }}
                          className="w-full px-3 py-1.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono text-zinc-400 mb-1">Period / Duration</label>
                        <input
                          type="text"
                          value={exp.period}
                          onChange={(e) => {
                            const updated = [...expDraft];
                            updated[idx].period = e.target.value;
                            setExpDraft(updated);
                          }}
                          className="w-full px-3 py-1.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono text-zinc-400 mb-1">Company Website URL</label>
                        <input
                          type="text"
                          value={exp.companyUrl}
                          onChange={(e) => {
                            const updated = [...expDraft];
                            updated[idx].companyUrl = e.target.value;
                            setExpDraft(updated);
                          }}
                          className="w-full px-3 py-1.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-zinc-400 mb-1">Summary</label>
                      <textarea
                        rows={2}
                        value={exp.summary}
                        onChange={(e) => {
                          const updated = [...expDraft];
                          updated[idx].summary = e.target.value;
                          setExpDraft(updated);
                        }}
                        className="w-full px-3 py-1.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 4. PROJECTS TAB */}
            {activeTab === 'projects' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-2">
                  <span className="text-xs font-mono text-zinc-400">
                    Manage portfolio case studies & production project architecture
                  </span>
                  <button
                    onClick={() => {
                      const newProj: ProjectItem = {
                        id: `proj-${Date.now()}`,
                        title: 'New Featured Project',
                        tagline: 'Enterprise System Subtitle',
                        description: 'Detailed description of architecture and implementation.',
                        category: 'Enterprise / ERP',
                        featured: true,
                        architectureHighlights: ['High-throughput modular design', 'Optimized data access layer'],
                        metricsOrScope: ['Sub-second latency', 'High reliability'],
                        technologies: ['C#', 'ASP.NET Core', 'SQL Server']
                      };
                      setProjectsDraft([newProj, ...projectsDraft]);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-orange text-white text-xs font-mono font-bold"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Project</span>
                  </button>
                </div>

                {projectsDraft.map((proj, idx) => (
                  <div key={proj.id} className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="font-mono text-xs text-brand-orange font-bold">
                        Project #{idx + 1}
                      </div>
                      <button
                        onClick={() => setProjectsDraft(projectsDraft.filter((_, i) => i !== idx))}
                        className="p-1.5 rounded-lg text-zinc-500 hover:text-rose-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-mono text-zinc-400 mb-1">Project Title</label>
                        <input
                          type="text"
                          value={proj.title}
                          onChange={(e) => {
                            const updated = [...projectsDraft];
                            updated[idx].title = e.target.value;
                            setProjectsDraft(updated);
                          }}
                          className="w-full px-3 py-1.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono text-zinc-400 mb-1">Category</label>
                        <select
                          value={proj.category}
                          onChange={(e) => {
                            const updated = [...projectsDraft];
                            updated[idx].category = e.target.value as any;
                            setProjectsDraft(updated);
                          }}
                          className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs font-mono"
                        >
                          <option value="Enterprise / ERP">Enterprise / ERP</option>
                          <option value="E-Commerce / CMS">E-Commerce / CMS</option>
                          <option value="API & Integration">API & Integration</option>
                          <option value="AI & Automation">AI & Automation</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-zinc-400 mb-1">Tagline</label>
                      <input
                        type="text"
                        value={proj.tagline}
                        onChange={(e) => {
                          const updated = [...projectsDraft];
                          updated[idx].tagline = e.target.value;
                          setProjectsDraft(updated);
                        }}
                        className="w-full px-3 py-1.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm"
                      />
                    </div>

                    {/* Project Live URL & GitHub URL */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-mono text-zinc-400 mb-1 flex items-center gap-1.5">
                          <Globe className="w-3.5 h-3.5 text-brand-orange" />
                          <span>Live Project URL</span>
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. https://myproject.com or https://example.com"
                          value={proj.liveUrl || ''}
                          onChange={(e) => {
                            const updated = [...projectsDraft];
                            updated[idx].liveUrl = e.target.value;
                            setProjectsDraft(updated);
                          }}
                          className="w-full px-3 py-1.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs font-mono focus:border-brand-orange focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono text-zinc-400 mb-1 flex items-center gap-1.5">
                          <Github className="w-3.5 h-3.5 text-brand-orange" />
                          <span>GitHub Repository URL</span>
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. https://github.com/therealroy/project-name"
                          value={proj.githubUrl || ''}
                          onChange={(e) => {
                            const updated = [...projectsDraft];
                            updated[idx].githubUrl = e.target.value;
                            setProjectsDraft(updated);
                          }}
                          className="w-full px-3 py-1.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs font-mono focus:border-brand-orange focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Project Screenshot / Preview Image Manager */}
                    <div className="p-4 rounded-xl bg-black/50 border border-white/10 space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-mono uppercase text-brand-orange font-bold flex items-center gap-1.5">
                          <ImageIcon className="w-4 h-4" />
                          <span>Project Screenshot / Preview Image</span>
                        </label>
                        {proj.image && (
                          <button
                            type="button"
                            onClick={() => {
                              const updated = [...projectsDraft];
                              updated[idx].image = '';
                              setProjectsDraft(updated);
                            }}
                            className="text-[10px] font-mono text-rose-400 hover:text-rose-300 transition-colors"
                          >
                            Remove Screenshot
                          </button>
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row items-start gap-4">
                        {/* Live Thumbnail Preview */}
                        <div className="w-full sm:w-36 h-24 rounded-xl overflow-hidden border border-white/15 bg-zinc-900 shrink-0 flex items-center justify-center relative group">
                          {proj.image ? (
                            <img
                              src={proj.image}
                              alt="Project Preview"
                              className="w-full h-full object-cover object-top"
                              onError={(e) => {
                                (e.currentTarget as HTMLImageElement).style.display = 'none';
                              }}
                            />
                          ) : (
                            <div className="flex flex-col items-center justify-center text-zinc-600 text-center p-2">
                              <ImageIcon className="w-6 h-6 mb-1 opacity-50" />
                              <span className="text-[10px] font-mono">No Image</span>
                            </div>
                          )}
                        </div>

                        {/* Upload & URL Input Controls */}
                        <div className="flex-1 space-y-2 w-full">
                          <label className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-dashed border-white/20 hover:border-brand-orange cursor-pointer text-xs font-mono text-zinc-200 transition-all">
                            <Upload className="w-3.5 h-3.5 text-brand-orange" />
                            <span>Upload Screenshot from Device</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  if (file.size > 8 * 1024 * 1024) {
                                    alert('Image size exceeds 8MB. Please choose a smaller file.');
                                    return;
                                  }
                                  const reader = new FileReader();
                                  reader.onload = (event) => {
                                    const result = event.target?.result as string;
                                    if (result) {
                                      const updated = [...projectsDraft];
                                      updated[idx].image = result;
                                      setProjectsDraft(updated);
                                    }
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                            />
                          </label>

                          <input
                            type="text"
                            placeholder="Or enter image URL (https://... or /subrata-portrait.jpg)"
                            value={proj.image || ''}
                            onChange={(e) => {
                              const updated = [...projectsDraft];
                              updated[idx].image = e.target.value;
                              setProjectsDraft(updated);
                            }}
                            className="w-full px-3 py-1.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs font-mono focus:border-brand-orange focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-zinc-400 mb-1">Description</label>
                      <textarea
                        rows={2}
                        value={proj.description}
                        onChange={(e) => {
                          const updated = [...projectsDraft];
                          updated[idx].description = e.target.value;
                          setProjectsDraft(updated);
                        }}
                        className="w-full px-3 py-1.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs"
                      />
                    </div>

                    {/* Technologies & Metrics */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-mono text-zinc-400 mb-1">Technologies (comma separated)</label>
                        <input
                          type="text"
                          value={(proj.technologies || []).join(', ')}
                          onChange={(e) => {
                            const updated = [...projectsDraft];
                            updated[idx].technologies = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                            setProjectsDraft(updated);
                          }}
                          className="w-full px-3 py-1.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono text-zinc-400 mb-1">Key Scope / Metrics (comma separated)</label>
                        <input
                          type="text"
                          value={(proj.metricsOrScope || []).join(', ')}
                          onChange={(e) => {
                            const updated = [...projectsDraft];
                            updated[idx].metricsOrScope = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                            setProjectsDraft(updated);
                          }}
                          className="w-full px-3 py-1.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs font-mono"
                        />
                      </div>
                    </div>

                    {/* Architecture Highlights */}
                    <div>
                      <label className="block text-[11px] font-mono text-zinc-400 mb-1">
                        Architecture & Engineering Highlights (one per line)
                      </label>
                      <textarea
                        rows={3}
                        value={(proj.architectureHighlights || []).join('\n')}
                        onChange={(e) => {
                          const updated = [...projectsDraft];
                          updated[idx].architectureHighlights = e.target.value.split('\n').filter(s => s.trim() !== '');
                          setProjectsDraft(updated);
                        }}
                        className="w-full px-3 py-1.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs font-mono"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 5. EDUCATION TAB */}
            {activeTab === 'education' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-2">
                  <span className="text-xs font-mono text-zinc-400">
                    Manage degrees, universities, and academic grades
                  </span>
                  <button
                    onClick={() => {
                      const newEdu: EducationItem = {
                        degree: 'New Degree',
                        field: 'Computer Science',
                        institution: 'University / College',
                        duration: '2023 – 2025',
                        location: 'West Bengal, India',
                        gradeOrCgpa: 'CGPA: 9.0',
                        details: ['Coursework highlights and distinction']
                      };
                      setEducationDraft([...educationDraft, newEdu]);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-orange text-white text-xs font-mono font-bold"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Degree</span>
                  </button>
                </div>

                {educationDraft.map((edu, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="font-mono text-xs text-brand-orange font-bold">
                        Academic Degree #{idx + 1}
                      </div>
                      <button
                        onClick={() => setEducationDraft(educationDraft.filter((_, i) => i !== idx))}
                        className="p-1.5 rounded-lg text-zinc-500 hover:text-rose-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-mono text-zinc-400 mb-1">Degree Name</label>
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => {
                            const updated = [...educationDraft];
                            updated[idx].degree = e.target.value;
                            setEducationDraft(updated);
                          }}
                          className="w-full px-3 py-1.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono text-zinc-400 mb-1">Institution / University</label>
                        <input
                          type="text"
                          value={edu.institution}
                          onChange={(e) => {
                            const updated = [...educationDraft];
                            updated[idx].institution = e.target.value;
                            setEducationDraft(updated);
                          }}
                          className="w-full px-3 py-1.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono text-zinc-400 mb-1">Duration / Years</label>
                        <input
                          type="text"
                          value={edu.duration}
                          onChange={(e) => {
                            const updated = [...educationDraft];
                            updated[idx].duration = e.target.value;
                            setEducationDraft(updated);
                          }}
                          className="w-full px-3 py-1.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono text-zinc-400 mb-1">Grade / CGPA</label>
                        <input
                          type="text"
                          value={edu.gradeOrCgpa || ''}
                          onChange={(e) => {
                            const updated = [...educationDraft];
                            updated[idx].gradeOrCgpa = e.target.value;
                            setEducationDraft(updated);
                          }}
                          placeholder="e.g. CGPA: 9.10"
                          className="w-full px-3 py-1.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 6. RESUME / CV EDITOR TAB */}
            {activeTab === 'resume' && (
              <div className="space-y-6">
                
                {/* Header Action Card */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-brand-orange/15 to-transparent border border-brand-orange/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-display font-extrabold text-base text-white flex items-center gap-2">
                      <FileText className="w-4 h-4 text-brand-orange" />
                      <span>Curriculum Vitae & PDF CMS</span>
                    </h3>
                    <p className="text-xs font-mono text-zinc-300 mt-1">
                      Customize executive titles, summaries, technical proficiencies, or upload your own PDF resume.
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => setIsResumeOpen(true)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all"
                    >
                      <Eye className="w-4 h-4 text-brand-orange" />
                      <span>Preview Live CV</span>
                    </button>

                    <button
                      onClick={handleSaveAll}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-orange hover:bg-brand-orange-light text-white font-mono text-xs font-bold uppercase tracking-wider shadow-glow-orange transition-all"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save CV</span>
                    </button>
                  </div>
                </div>

                {/* Resume Headline & Contact Details */}
                <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-4">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-brand-orange font-bold">
                    1. Header & Executive Title
                  </h4>

                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                      Executive Headline on CV
                    </label>
                    <input
                      type="text"
                      value={resumeDraft.headline}
                      onChange={(e) => setResumeDraft({ ...resumeDraft, headline: e.target.value })}
                      placeholder="e.g. .NET Full-Stack Developer | React & Cloud Architect | AI Engineering Enthusiast"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:outline-none focus:border-brand-orange font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                      Professional Executive Summary on CV
                    </label>
                    <textarea
                      rows={4}
                      value={resumeDraft.summary}
                      onChange={(e) => setResumeDraft({ ...resumeDraft, summary: e.target.value })}
                      placeholder="Enter executive career summary for your CV..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:outline-none focus:border-brand-orange resize-none"
                    />
                  </div>
                </div>

                {/* Technical Proficiencies on CV (4 Key Quadrants) */}
                <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-mono text-xs uppercase tracking-wider text-brand-orange font-bold">
                      2. CV Technical Proficiencies (4 Core Quadrants)
                    </h4>
                    <span className="text-[11px] font-mono text-zinc-500">
                      Printed in 2x2 grid on PDF
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                        .NET & Backend Architecture
                      </label>
                      <textarea
                        rows={3}
                        value={resumeDraft.skills.backend}
                        onChange={(e) => setResumeDraft({
                          ...resumeDraft,
                          skills: { ...resumeDraft.skills, backend: e.target.value }
                        })}
                        className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:outline-none focus:border-brand-orange resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                        React & Modern Frontend
                      </label>
                      <textarea
                        rows={3}
                        value={resumeDraft.skills.frontend}
                        onChange={(e) => setResumeDraft({
                          ...resumeDraft,
                          skills: { ...resumeDraft.skills, frontend: e.target.value }
                        })}
                        className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:outline-none focus:border-brand-orange resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                        AI Engineering & Intelligent Systems
                      </label>
                      <textarea
                        rows={3}
                        value={resumeDraft.skills.ai}
                        onChange={(e) => setResumeDraft({
                          ...resumeDraft,
                          skills: { ...resumeDraft.skills, ai: e.target.value }
                        })}
                        className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:outline-none focus:border-brand-orange resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                        Database & Enterprise Integrations
                      </label>
                      <textarea
                        rows={3}
                        value={resumeDraft.skills.database}
                        onChange={(e) => setResumeDraft({
                          ...resumeDraft,
                          skills: { ...resumeDraft.skills, database: e.target.value }
                        })}
                        className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:outline-none focus:border-brand-orange resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Custom PDF File / External Resume Link */}
                <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-4">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-brand-orange font-bold">
                    3. Custom PDF File Attachment (Optional)
                  </h4>
                  <p className="text-xs text-zinc-400">
                    You can provide an external PDF download link (e.g. Google Drive / cloud URL) or upload your custom PDF directly.
                  </p>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                        Custom PDF URL Link
                      </label>
                      <input
                        type="url"
                        value={resumeDraft.customPdfUrl || ''}
                        onChange={(e) => setResumeDraft({ ...resumeDraft, customPdfUrl: e.target.value })}
                        placeholder="https://example.com/subrata-roy-resume.pdf"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:outline-none focus:border-brand-orange font-mono"
                      />
                    </div>

                    <div className="p-4 rounded-xl bg-zinc-900/80 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <span className="block text-xs font-bold text-white mb-0.5">
                          Upload Custom PDF from Computer
                        </span>
                        <span className="text-[11px] font-mono text-zinc-400">
                          {resumeDraft.customPdfUrl?.startsWith('data:') 
                            ? '✓ PDF file attached and stored in browser memory!' 
                            : 'Supports .pdf documents'}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase transition-all">
                          <Upload className="w-3.5 h-3.5 text-brand-orange" />
                          <span>Choose PDF</span>
                          <input
                            type="file"
                            accept="application/pdf"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = () => {
                                  if (typeof reader.result === 'string') {
                                    setResumeDraft({ ...resumeDraft, customPdfUrl: reader.result });
                                  }
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </label>

                        {resumeDraft.customPdfUrl && (
                          <button
                            type="button"
                            onClick={() => setResumeDraft({ ...resumeDraft, customPdfUrl: '' })}
                            className="px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 font-mono text-xs"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Synchronized Sections Note */}
                <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/5 flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span>
                    💡 Professional experiences, projects, and education on your CV are synchronized with their respective tabs.
                  </span>
                  <button
                    onClick={() => setIsResumeOpen(true)}
                    className="text-brand-orange hover:underline shrink-0 ml-4 flex items-center gap-1"
                  >
                    <span>View CV Modal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            )}

            {/* COLOR PALETTE & THEME TAB */}
            {activeTab === 'palette' && (
              <div className="space-y-8 animate-fade-in">
                {/* Intro banner */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-brand-orange/15 via-purple-500/10 to-blue-500/10 border border-brand-orange/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Palette className="w-5 h-5 text-brand-orange" />
                      <h3 className="font-display font-bold text-base text-white">Dynamic Portfolio Color Engine</h3>
                      <span className="px-2 py-0.5 rounded-full bg-brand-orange/20 border border-brand-orange/40 text-brand-orange font-mono text-[10px] font-semibold">
                        Real-time Live Preview
                      </span>
                    </div>
                    <p className="text-xs text-zinc-300 font-mono">
                      Switch presets or customize hex colors for accent glows, backgrounds, cards, and typography. Changes reflect live on the website!
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={handleResetTheme}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10 text-xs font-mono transition-colors"
                      title="Reset colors to default Obsidian Flame"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-brand-orange" />
                      <span>Reset Theme</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        updateTheme(themeDraft);
                        setSaveToast(true);
                        setTimeout(() => setSaveToast(false), 3000);
                      }}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-orange hover:bg-brand-orange-light text-white font-mono text-xs font-bold uppercase shadow-glow-orange transition-all"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Apply & Save</span>
                    </button>
                  </div>
                </div>

                {/* 1. Presets */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-brand-orange" />
                      <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-300">
                        1. One-Click Curated Presets
                      </h4>
                    </div>
                    <span className="text-[11px] font-mono text-zinc-500">
                      Click any preset to preview instantly
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {THEME_PRESETS.map((preset) => {
                      const isSelected = themeDraft.presetId === preset.presetId || 
                        (themeDraft.accent.toLowerCase() === preset.accent.toLowerCase() && 
                         themeDraft.background.toLowerCase() === preset.background.toLowerCase());
                      return (
                        <button
                          key={preset.presetId}
                          type="button"
                          onClick={() => handleSelectPreset(preset)}
                          className={`p-3.5 rounded-2xl border text-left transition-all relative overflow-hidden group flex flex-col justify-between h-32 ${
                            isSelected
                              ? 'border-brand-orange bg-brand-orange/10 shadow-glow-orange ring-1 ring-brand-orange/50'
                              : 'border-white/10 bg-[#15151a] hover:border-white/20 hover:bg-white/5'
                          }`}
                          style={{
                            boxShadow: isSelected ? `0 0 20px -3px ${preset.accent}40` : undefined
                          }}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-mono text-xs font-bold text-white group-hover:text-brand-orange transition-colors">
                                {preset.name}
                              </span>
                              {isSelected && (
                                <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-brand-orange text-white font-mono text-[9px] font-bold">
                                  <Check className="w-2.5 h-2.5" /> Active
                                </span>
                              )}
                            </div>
                            
                            {/* Color preview bars */}
                            <div className="flex items-center gap-1.5 my-2">
                              <div
                                className="h-6 flex-1 rounded-md border border-white/10 flex items-center justify-center text-[10px] font-mono font-bold text-white shadow-sm"
                                style={{ backgroundColor: preset.accent }}
                                title={`Accent: ${preset.accent}`}
                              >
                                Accent
                              </div>
                              <div
                                className="h-6 w-14 rounded-md border border-white/20 flex items-center justify-center text-[9px] font-mono text-zinc-300 shadow-sm"
                                style={{ backgroundColor: preset.background }}
                                title={`BG: ${preset.background}`}
                              >
                                BG
                              </div>
                              <div
                                className="h-6 w-14 rounded-md border border-white/20 flex items-center justify-center text-[9px] font-mono text-zinc-300 shadow-sm"
                                style={{ backgroundColor: preset.card }}
                                title={`Card: ${preset.card}`}
                              >
                                Card
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                            <span>{preset.accent}</span>
                            <span>{preset.background}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Custom Color Pickers */}
                <div className="space-y-4 p-5 rounded-2xl bg-black/40 border border-white/10">
                  <div className="flex items-center justify-between">
                    <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-brand-orange animate-ping" />
                      2. Bespoke Custom Color Tuner
                    </h4>
                    <span className="text-[11px] font-mono text-zinc-400">
                      Type hex or click swatch to open native color picker
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Primary Accent Color */}
                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-mono font-bold text-white uppercase flex items-center gap-1.5">
                          <span>Primary Accent</span>
                        </label>
                        <span className="text-[10px] font-mono text-zinc-400">Buttons, glows, badges</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={themeDraft.accent}
                          onChange={(e) => handleThemeColorChange('accent', e.target.value)}
                          className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0 p-0"
                          title="Click to pick custom accent color"
                        />
                        <input
                          type="text"
                          value={themeDraft.accent}
                          onChange={(e) => handleThemeColorChange('accent', e.target.value)}
                          className="flex-1 px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white font-mono text-xs uppercase"
                          placeholder="#F04B20"
                        />
                      </div>
                    </div>

                    {/* Background Color */}
                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-mono font-bold text-white uppercase flex items-center gap-1.5">
                          <span>Website Background</span>
                        </label>
                        <span className="text-[10px] font-mono text-zinc-400">Main page canvas</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={themeDraft.background}
                          onChange={(e) => handleThemeColorChange('background', e.target.value)}
                          className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0 p-0"
                          title="Click to pick background color"
                        />
                        <input
                          type="text"
                          value={themeDraft.background}
                          onChange={(e) => handleThemeColorChange('background', e.target.value)}
                          className="flex-1 px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white font-mono text-xs uppercase"
                          placeholder="#09090B"
                        />
                      </div>
                    </div>

                    {/* Card Surface Color */}
                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-mono font-bold text-white uppercase flex items-center gap-1.5">
                          <span>Card / Surface</span>
                        </label>
                        <span className="text-[10px] font-mono text-zinc-400">Containers & modal</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={themeDraft.card}
                          onChange={(e) => handleThemeColorChange('card', e.target.value)}
                          className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0 p-0"
                          title="Click to pick card color"
                        />
                        <input
                          type="text"
                          value={themeDraft.card}
                          onChange={(e) => handleThemeColorChange('card', e.target.value)}
                          className="flex-1 px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white font-mono text-xs uppercase"
                          placeholder="#141418"
                        />
                      </div>
                    </div>

                    {/* Primary Text Color */}
                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-mono font-bold text-white uppercase flex items-center gap-1.5">
                          <span>Primary Text</span>
                        </label>
                        <span className="text-[10px] font-mono text-zinc-400">Headings & bold text</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={themeDraft.text}
                          onChange={(e) => handleThemeColorChange('text', e.target.value)}
                          className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0 p-0"
                          title="Click to pick primary text color"
                        />
                        <input
                          type="text"
                          value={themeDraft.text}
                          onChange={(e) => handleThemeColorChange('text', e.target.value)}
                          className="flex-1 px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white font-mono text-xs uppercase"
                          placeholder="#FFFFFF"
                        />
                      </div>
                    </div>

                    {/* Muted Text Color */}
                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-mono font-bold text-white uppercase flex items-center gap-1.5">
                          <span>Muted Text</span>
                        </label>
                        <span className="text-[10px] font-mono text-zinc-400">Paragraphs & metadata</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={themeDraft.textMuted}
                          onChange={(e) => handleThemeColorChange('textMuted', e.target.value)}
                          className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0 p-0"
                          title="Click to pick muted text color"
                        />
                        <input
                          type="text"
                          value={themeDraft.textMuted}
                          onChange={(e) => handleThemeColorChange('textMuted', e.target.value)}
                          className="flex-1 px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white font-mono text-xs uppercase"
                          placeholder="#A1A1AA"
                        />
                      </div>
                    </div>

                    {/* Quick Color Palette info card */}
                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-between">
                      <span className="text-xs font-mono font-bold text-zinc-300 uppercase">
                        Current Palette Token Summary
                      </span>
                      <div className="text-[11px] font-mono text-zinc-400 space-y-1">
                        <div>Accent Hover: <span className="text-white">{themeDraft.accentHover || 'Auto'}</span></div>
                        <div>Accent Glow: <span className="text-white">{themeDraft.accentLight || 'Auto'}</span></div>
                        <div>Preset: <span className="text-brand-orange uppercase">{themeDraft.presetId}</span></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Live Component Preview Box */}
                <div className="space-y-3">
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-300">
                    3. Live Mock Component Preview
                  </h4>

                  <div
                    className="p-6 rounded-2xl border transition-all"
                    style={{
                      backgroundColor: themeDraft.card,
                      borderColor: `${themeDraft.accent}40`,
                      boxShadow: `0 10px 30px -10px ${themeDraft.accent}30`
                    }}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <span
                          className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border"
                          style={{
                            backgroundColor: `${themeDraft.accent}20`,
                            color: themeDraft.accent,
                            borderColor: `${themeDraft.accent}50`
                          }}
                        >
                          ● SYSTEM ONLINE // DEV PREVIEW
                        </span>
                        <span
                          className="text-xs font-mono"
                          style={{ color: themeDraft.textMuted }}
                        >
                          Real-time CSS variable evaluation
                        </span>
                      </div>
                      <div
                        className="text-xs font-mono font-bold"
                        style={{ color: themeDraft.text }}
                      >
                        SUBRATA ROY — PORTFOLIO
                      </div>
                    </div>

                    <h2
                      className="text-2xl font-black font-display tracking-tight mb-2"
                      style={{ color: themeDraft.text }}
                    >
                      Architecting Scalable .NET & Intelligent AI Systems
                    </h2>

                    <p
                      className="text-xs leading-relaxed max-w-2xl mb-6 font-mono"
                      style={{ color: themeDraft.textMuted }}
                    >
                      Testing contrast, readability, and visual glow in real-time. This card simulates how sections, text, cards, and accent buttons appear with your current palette selection.
                    </p>

                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        className="px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase text-white shadow-md transition-transform"
                        style={{
                          backgroundColor: themeDraft.accent,
                          boxShadow: `0 0 15px ${themeDraft.accent}80`
                        }}
                      >
                        Sample Primary Button
                      </button>

                      <button
                        type="button"
                        className="px-4 py-2 rounded-xl text-xs font-mono font-semibold border transition-colors"
                        style={{
                          borderColor: `${themeDraft.accent}60`,
                          color: themeDraft.accent,
                          backgroundColor: `${themeDraft.accent}10`
                        }}
                      >
                        Sample Outlined Action
                      </button>

                      <div
                        className="ml-auto px-3 py-1.5 rounded-lg border text-[11px] font-mono"
                        style={{
                          backgroundColor: themeDraft.background,
                          borderColor: `${themeDraft.accent}30`,
                          color: themeDraft.textMuted
                        }}
                      >
                        Background Token: <span style={{ color: themeDraft.text }}>{themeDraft.background}</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* TYPOGRAPHY & FONTS TAB */}
            {activeTab === 'fonts' && (
              <div className="space-y-8 animate-fade-in">
                {/* Intro Banner */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-brand-orange/15 via-blue-500/10 to-emerald-500/10 border border-brand-orange/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Type className="w-5 h-5 text-brand-orange" />
                      <h3 className="font-display font-bold text-base text-white">Dynamic Portfolio Typography Engine</h3>
                      <span className="px-2 py-0.5 rounded-full bg-brand-orange/20 border border-brand-orange/40 text-brand-orange font-mono text-[10px] font-semibold">
                        Real-time Live Preview
                      </span>
                    </div>
                    <p className="text-xs text-zinc-300 font-mono">
                      Switch font pairings or customize individual typography layers for Headings, Body Text, and Monospace Code. Changes reflect instantly across the entire live website!
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={handleResetFonts}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10 text-xs font-mono transition-colors"
                      title="Reset typography to default Obsidian Tech"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-brand-orange" />
                      <span>Reset Fonts</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        updateTheme(themeDraft);
                        setSaveToast(true);
                        setTimeout(() => setSaveToast(false), 3000);
                      }}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-orange hover:bg-brand-orange-light text-white font-mono text-xs font-bold uppercase shadow-glow-orange transition-all"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Apply & Save</span>
                    </button>
                  </div>
                </div>

                {/* 1. Curated Font Pairings (Presets) */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-brand-orange" />
                      <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-300">
                        1. One-Click Curated Font Pairings
                      </h4>
                    </div>
                    <span className="text-[11px] font-mono text-zinc-500">
                      Click any pairing to preview in real-time
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                    {FONT_PRESETS.map((preset) => {
                      const isSelected = themeDraft.fontPresetId === preset.id ||
                        (themeDraft.fontDisplay === preset.display &&
                         themeDraft.fontSans === preset.sans &&
                         themeDraft.fontMono === preset.mono);

                      return (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => handleSelectFontPreset(preset)}
                          className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden group flex flex-col justify-between h-48 ${
                            isSelected
                              ? 'border-brand-orange bg-brand-orange/10 shadow-glow-orange ring-1 ring-brand-orange/50'
                              : 'border-white/10 bg-[#15151a] hover:border-white/20 hover:bg-white/5'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="font-mono text-xs font-bold text-white group-hover:text-brand-orange transition-colors">
                                {preset.name}
                              </span>
                              {isSelected && (
                                <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-brand-orange text-white font-mono text-[9px] font-bold">
                                  <Check className="w-2.5 h-2.5" /> Active
                                </span>
                              )}
                            </div>

                            <div className="text-[10px] font-mono text-brand-orange uppercase mb-2">
                              {preset.category}
                            </div>

                            {/* Actual Font Rendering Sample */}
                            <div className="p-2.5 rounded-xl bg-black/60 border border-white/10 space-y-1 my-2">
                              <div
                                className="text-base font-bold text-white truncate"
                                style={{ fontFamily: `"${preset.display}", sans-serif` }}
                              >
                                {preset.display}
                              </div>
                              <div
                                className="text-xs text-zinc-300 truncate"
                                style={{ fontFamily: `"${preset.sans}", sans-serif` }}
                              >
                                {preset.sans} body
                              </div>
                            </div>
                          </div>

                          <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-zinc-400">
                            <span style={{ fontFamily: `"${preset.mono}", monospace` }}>
                              {preset.mono}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Bespoke Custom Font Tuner */}
                <div className="space-y-4 p-5 rounded-2xl bg-black/40 border border-white/10">
                  <div className="flex items-center justify-between">
                    <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-brand-orange animate-ping" />
                      2. Bespoke Typography Layer Tuner
                    </h4>
                    <span className="text-[11px] font-mono text-zinc-400">
                      Select curated web fonts or type any Google Font name
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Display / Heading Font */}
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                      <div>
                        <label className="text-xs font-mono font-bold text-white uppercase block mb-1">
                          Headings & Display Font
                        </label>
                        <span className="text-[10px] font-mono text-zinc-400">
                          Hero headline, section titles, case study titles
                        </span>
                      </div>

                      <select
                        value={themeDraft.fontDisplay || 'Syne'}
                        onChange={(e) => handleFontChange('fontDisplay', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white font-mono text-xs focus:border-brand-orange focus:outline-none"
                      >
                        {POPULAR_DISPLAY_FONTS.map((font) => (
                          <option key={font} value={font} className="bg-zinc-900 text-white">
                            {font}
                          </option>
                        ))}
                      </select>

                      <div>
                        <label className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">
                          Or Type Custom Font Name:
                        </label>
                        <input
                          type="text"
                          value={themeDraft.fontDisplay || ''}
                          onChange={(e) => handleFontChange('fontDisplay', e.target.value)}
                          placeholder="e.g. Syne, Orbitron, Cinzel"
                          className="w-full px-3 py-1.5 rounded-xl bg-black/40 border border-white/10 text-white font-mono text-xs focus:border-brand-orange focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Sans / Body Font */}
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                      <div>
                        <label className="text-xs font-mono font-bold text-white uppercase block mb-1">
                          Body & Content Font
                        </label>
                        <span className="text-[10px] font-mono text-zinc-400">
                          Paragraphs, descriptions, resume prose, bio
                        </span>
                      </div>

                      <select
                        value={themeDraft.fontSans || 'Space Grotesk'}
                        onChange={(e) => handleFontChange('fontSans', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white font-mono text-xs focus:border-brand-orange focus:outline-none"
                      >
                        {POPULAR_SANS_FONTS.map((font) => (
                          <option key={font} value={font} className="bg-zinc-900 text-white">
                            {font}
                          </option>
                        ))}
                      </select>

                      <div>
                        <label className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">
                          Or Type Custom Font Name:
                        </label>
                        <input
                          type="text"
                          value={themeDraft.fontSans || ''}
                          onChange={(e) => handleFontChange('fontSans', e.target.value)}
                          placeholder="e.g. Space Grotesk, Inter, Roboto"
                          className="w-full px-3 py-1.5 rounded-xl bg-black/40 border border-white/10 text-white font-mono text-xs focus:border-brand-orange focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Monospace / Code Font */}
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                      <div>
                        <label className="text-xs font-mono font-bold text-white uppercase block mb-1">
                          Monospace & Technical Font
                        </label>
                        <span className="text-[10px] font-mono text-zinc-400">
                          Code snippets, terminal tags, skill labels, badges
                        </span>
                      </div>

                      <select
                        value={themeDraft.fontMono || 'JetBrains Mono'}
                        onChange={(e) => handleFontChange('fontMono', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white font-mono text-xs focus:border-brand-orange focus:outline-none"
                      >
                        {POPULAR_MONO_FONTS.map((font) => (
                          <option key={font} value={font} className="bg-zinc-900 text-white">
                            {font}
                          </option>
                        ))}
                      </select>

                      <div>
                        <label className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">
                          Or Type Custom Font Name:
                        </label>
                        <input
                          type="text"
                          value={themeDraft.fontMono || ''}
                          onChange={(e) => handleFontChange('fontMono', e.target.value)}
                          placeholder="e.g. JetBrains Mono, Fira Code"
                          className="w-full px-3 py-1.5 rounded-xl bg-black/40 border border-white/10 text-white font-mono text-xs focus:border-brand-orange focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Interactive Typography Test Drive Preview */}
                <div className="space-y-3">
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-300">
                    3. Live Interactive Typography Test Drive
                  </h4>

                  <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-white/10 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-brand-orange/10 rounded-full blur-[100px] pointer-events-none" />

                    {/* Technical badge */}
                    <div className="flex items-center gap-2 mb-4">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase border border-brand-orange/30 bg-brand-orange/10 text-brand-orange"
                        style={{ fontFamily: `"${themeDraft.fontMono || 'JetBrains Mono'}", monospace` }}
                      >
                        ✦ 01 // ARCHITECTURAL TYPOGRAPHY SPEC
                      </span>
                    </div>

                    {/* Headline */}
                    <h2
                      className="text-2xl sm:text-4xl font-black tracking-tight text-white mb-3"
                      style={{ fontFamily: `"${themeDraft.fontDisplay || 'Syne'}", sans-serif` }}
                    >
                      Architecting Scalable .NET Backends & AI Copilots
                    </h2>

                    {/* Subtitle / Paragraph */}
                    <p
                      className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-3xl mb-6"
                      style={{ fontFamily: `"${themeDraft.fontSans || 'Space Grotesk'}", sans-serif` }}
                    >
                      This live interactive test drive showcases how your selected fonts render together across headings, body prose, metadata chips, and action buttons. The typography is evaluated dynamically so you can inspect contrast, letterforms, and reading rhythm before applying.
                    </p>

                    {/* Code & Tokens bar */}
                    <div
                      className="p-3.5 rounded-xl bg-black/60 border border-white/10 mb-6 flex flex-wrap items-center gap-3 text-xs"
                      style={{ fontFamily: `"${themeDraft.fontMono || 'JetBrains Mono'}", monospace` }}
                    >
                      <span className="text-brand-orange">var</span>
                      <span className="text-zinc-200">typography</span>
                      <span className="text-zinc-400">=</span>
                      <span className="text-emerald-400">
                        &#123; display: "{themeDraft.fontDisplay || 'Syne'}", sans: "{themeDraft.fontSans || 'Space Grotesk'}", mono: "{themeDraft.fontMono || 'JetBrains Mono'}" &#125;;
                      </span>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase text-white shadow-glow-orange bg-brand-orange"
                        style={{ fontFamily: `"${themeDraft.fontSans || 'Space Grotesk'}", sans-serif` }}
                      >
                        Sample Primary Button
                      </button>

                      <div
                        className="ml-auto px-3.5 py-1.5 rounded-lg border border-white/10 bg-white/5 text-[11px] text-zinc-400"
                        style={{ fontFamily: `"${themeDraft.fontMono || 'JetBrains Mono'}", monospace` }}
                      >
                        Active Font Tokens: <span className="text-white font-bold">{themeDraft.fontDisplay || 'Syne'}</span> / <span className="text-white font-bold">{themeDraft.fontSans || 'Space Grotesk'}</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}

          </div>

          {/* Footer Save Row */}
          <div className="p-4 sm:px-8 border-t border-white/10 bg-[#16161b] flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-400">
              Changes update live and persist in local storage.
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsAdminOpen(false)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 font-mono text-xs uppercase"
              >
                Exit Console
              </button>
              <button
                onClick={handleSaveAll}
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-brand-orange hover:bg-brand-orange-light text-white font-mono text-xs font-bold uppercase shadow-glow-orange transition-all"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save All Changes</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    );
  }

  return null;
};

