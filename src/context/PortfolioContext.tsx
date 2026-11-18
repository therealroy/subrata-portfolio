import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  PERSONAL_INFO as defaultPersonalInfo, 
  FLOATING_CARDS as defaultFloatingCards,
  EXPERIENCES as defaultExperiences, 
  SKILLS as defaultSkills, 
  PROJECTS as defaultProjects, 
  EDUCATION as defaultEducation,
  CERTIFICATIONS_AND_FOCUS as defaultCertifications,
  DEFAULT_RESUME_DATA as defaultResumeData
} from '../data/portfolioData';
import { SkillItem, ExperienceItem, ProjectItem, EducationItem } from '../types/portfolio';
import { PortfolioTheme, DEFAULT_THEME, applyThemeToDocument, adjustHexBrightness } from '../utils/themeUtils';

const STORAGE_KEY = 'subrata_portfolio_data_v5';
const THEME_STORAGE_KEY = 'subrata_portfolio_theme';
const AUTH_KEY = 'subrata_portfolio_auth_token';

interface PortfolioContextType {
  personalInfo: typeof defaultPersonalInfo;
  floatingCards: typeof defaultFloatingCards;
  experiences: ExperienceItem[];
  skills: SkillItem[];
  projects: ProjectItem[];
  education: EducationItem[];
  certifications: typeof defaultCertifications;
  resumeData: typeof defaultResumeData;
  theme: PortfolioTheme;
  
  // Dev mode, Resume, Palette & Auth
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isResumeOpen: boolean;
  setIsResumeOpen: (open: boolean) => void;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => boolean;
  logout: () => void;

  // Mutators
  updatePersonalInfo: (info: Partial<typeof defaultPersonalInfo>) => void;
  updateSkills: (skills: SkillItem[]) => void;
  updateExperiences: (experiences: ExperienceItem[]) => void;
  updateProjects: (projects: ProjectItem[]) => void;
  updateEducation: (education: EducationItem[]) => void;
  updateResumeData: (data: Partial<typeof defaultResumeData>) => void;
  updateTheme: (newTheme: PortfolioTheme) => void;
  resetTheme: () => void;
  saveAll: () => void;
  saveAllData: (data: {
    personalInfo?: typeof defaultPersonalInfo;
    skills?: SkillItem[];
    experiences?: ExperienceItem[];
    projects?: ProjectItem[];
    education?: EducationItem[];
    resumeData?: typeof defaultResumeData;
    theme?: PortfolioTheme;
  }) => void;
  resetToDefault: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [personalInfo, setPersonalInfo] = useState(defaultPersonalInfo);
  const [floatingCards, setFloatingCards] = useState(defaultFloatingCards);
  const [experiences, setExperiences] = useState<ExperienceItem[]>(defaultExperiences);
  const [skills, setSkills] = useState<SkillItem[]>(defaultSkills);
  const [projects, setProjects] = useState<ProjectItem[]>(defaultProjects);
  const [education, setEducation] = useState<EducationItem[]>(defaultEducation);
  const [resumeData, setResumeData] = useState(defaultResumeData);
  const [theme, setTheme] = useState<PortfolioTheme>(DEFAULT_THEME);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load saved data from localStorage on mount
  useEffect(() => {
    try {
      let loadedTheme: PortfolioTheme = DEFAULT_THEME;

      // 1. Try dedicated theme key first for fast, reliable access
      const savedThemeRaw = localStorage.getItem(THEME_STORAGE_KEY);
      if (savedThemeRaw) {
        try {
          const parsedTheme = JSON.parse(savedThemeRaw);
          if (parsedTheme && parsedTheme.accent) {
            loadedTheme = { ...DEFAULT_THEME, ...parsedTheme };
          }
        } catch (e) {}
      }

      // 2. Load from primary portfolio storage
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.personalInfo) setPersonalInfo({ ...defaultPersonalInfo, ...parsed.personalInfo });
        if (parsed.floatingCards) setFloatingCards(parsed.floatingCards);
        if (parsed.experiences) setExperiences(parsed.experiences);
        if (parsed.skills) setSkills(parsed.skills);
        if (parsed.projects) setProjects(parsed.projects);
        if (parsed.education) setEducation(parsed.education);
        if (parsed.resumeData) setResumeData({ ...defaultResumeData, ...parsed.resumeData });
        if (!savedThemeRaw && parsed.theme && parsed.theme.accent) {
          loadedTheme = { ...DEFAULT_THEME, ...parsed.theme };
        }
      }

      setTheme(loadedTheme);
      applyThemeToDocument(loadedTheme);

      const authSaved = sessionStorage.getItem(AUTH_KEY);
      if (authSaved === 'true') {
        setIsAuthenticated(true);
      }
    } catch (e) {
      console.error('Failed to load portfolio storage:', e);
      applyThemeToDocument(DEFAULT_THEME);
    }
  }, []);

  const saveToStorage = (partialData?: any) => {
    try {
      let existing: any = {};
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) existing = JSON.parse(raw);
      } catch (e) {}

      const activeTheme = partialData?.theme || theme || DEFAULT_THEME;

      const dataToSave = {
        personalInfo,
        floatingCards,
        experiences,
        skills,
        projects,
        education,
        resumeData,
        ...existing,
        ...partialData,
        theme: activeTheme,
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
      if (activeTheme) {
        localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(activeTheme));
      }
    } catch (e) {
      console.error('Failed to persist portfolio data:', e);
    }
  };

  const login = (email: string, pass: string): boolean => {
    if (email.trim().toLowerCase() === 'roy417996@gmail.com' && pass === 'subrata@2002') {
      setIsAuthenticated(true);
      sessionStorage.setItem(AUTH_KEY, 'true');
      setIsAuthModalOpen(false);
      setIsAdminOpen(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(AUTH_KEY);
    setIsAdminOpen(false);
  };

  const updatePersonalInfo = (info: Partial<typeof defaultPersonalInfo>) => {
    setPersonalInfo((prev) => {
      const updated = { ...prev, ...info };
      saveToStorage({ personalInfo: updated });
      return updated;
    });
  };

  const updateSkills = (newSkills: SkillItem[]) => {
    setSkills(newSkills);
    saveToStorage({ skills: newSkills });
  };

  const updateExperiences = (newExp: ExperienceItem[]) => {
    setExperiences(newExp);
    saveToStorage({ experiences: newExp });
  };

  const updateProjects = (newProj: ProjectItem[]) => {
    setProjects(newProj);
    saveToStorage({ projects: newProj });
  };

  const updateEducation = (newEdu: EducationItem[]) => {
    setEducation(newEdu);
    saveToStorage({ education: newEdu });
  };

  const updateResumeData = (data: Partial<typeof defaultResumeData>) => {
    setResumeData((prev) => {
      const updated = { 
        ...prev, 
        ...data,
        skills: { ...prev.skills, ...(data.skills || {}) }
      };
      saveToStorage({ resumeData: updated });
      return updated;
    });
  };

  const updateTheme = (newTheme: PortfolioTheme) => {
    const fullTheme: PortfolioTheme = {
      ...newTheme,
      accentHover: newTheme.accentHover || adjustHexBrightness(newTheme.accent, -15),
      accentLight: newTheme.accentLight || adjustHexBrightness(newTheme.accent, 20),
    };
    setTheme(fullTheme);
    applyThemeToDocument(fullTheme);
    saveToStorage({ theme: fullTheme });
  };

  const resetTheme = () => {
    setTheme(DEFAULT_THEME);
    applyThemeToDocument(DEFAULT_THEME);
    saveToStorage({ theme: DEFAULT_THEME });
  };

  const saveAll = () => {
    saveToStorage();
  };

  const saveAllData = (allData: {
    personalInfo?: typeof defaultPersonalInfo;
    skills?: SkillItem[];
    experiences?: ExperienceItem[];
    projects?: ProjectItem[];
    education?: EducationItem[];
    resumeData?: typeof defaultResumeData;
    theme?: PortfolioTheme;
  }) => {
    if (allData.personalInfo) setPersonalInfo(allData.personalInfo);
    if (allData.skills) setSkills(allData.skills);
    if (allData.experiences) setExperiences(allData.experiences);
    if (allData.projects) setProjects(allData.projects);
    if (allData.education) setEducation(allData.education);
    if (allData.resumeData) setResumeData(allData.resumeData);

    let activeTheme = theme;
    if (allData.theme) {
      const fullTheme: PortfolioTheme = {
        ...allData.theme,
        accentHover: allData.theme.accentHover || adjustHexBrightness(allData.theme.accent, -15),
        accentLight: allData.theme.accentLight || adjustHexBrightness(allData.theme.accent, 20),
      };
      setTheme(fullTheme);
      applyThemeToDocument(fullTheme);
      activeTheme = fullTheme;
    }

    saveToStorage({ ...allData, theme: activeTheme });
  };

  const resetToDefault = () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(THEME_STORAGE_KEY);
    setPersonalInfo(defaultPersonalInfo);
    setFloatingCards(defaultFloatingCards);
    setExperiences(defaultExperiences);
    setSkills(defaultSkills);
    setProjects(defaultProjects);
    setEducation(defaultEducation);
    setResumeData(defaultResumeData);
    setTheme(DEFAULT_THEME);
    applyThemeToDocument(DEFAULT_THEME);
  };

  return (
    <PortfolioContext.Provider
      value={{
        personalInfo,
        floatingCards,
        experiences,
        skills,
        projects,
        education,
        certifications: defaultCertifications,
        resumeData,
        theme,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isAdminOpen,
        setIsAdminOpen,
        isResumeOpen,
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
        saveAll,
        saveAllData,
        resetToDefault,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};

