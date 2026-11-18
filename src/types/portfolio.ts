export interface SkillItem {
  name: string;
  category: 'backend' | 'database' | 'frontend' | 'integrations' | 'ai-tools';
  proficiencyLabel: 'Core Expertise' | 'Production Grade' | 'Advanced' | 'Architectural' | 'Daily Driver' | 'Specialized';
  description: string;
  iconName?: string;
  highlight?: boolean;
}

export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  company: string;
  companyUrl: string;
  durationApprox?: string;
  isCurrent?: boolean;
  location: string;
  summary: string;
  coreHighlights: string[];
  techStack: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: 'Enterprise / ERP' | 'E-Commerce / CMS' | 'API & Integration' | 'AI & Automation';
  featured: boolean;
  image?: string;
  architectureHighlights: string[];
  metricsOrScope: string[];
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  confidentialityNote?: string;
}

export interface EducationItem {
  degree: string;
  field: string;
  institution: string;
  duration: string;
  location: string;
  gradeOrCgpa?: string;
  details: string[];
}
