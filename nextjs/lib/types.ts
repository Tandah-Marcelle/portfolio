export interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  stats: {
    stars: number;
    forks: number;
  };
}

export interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
}

export interface Achievement {
  id?: string;
  title: string;
  organization: string;
  date: string;
  location: string;
  description: string;
  category: string;
  icon: any;
  color: string;
  bgColor: string;
  borderColor: string;
}

export interface BackendAchievement {
  id: string;
  title: string;
  organization: string;
  date: string;
  location?: string | null;
  description: string;
  category?: string | null;
  imageUrl?: string | null;
  images: string[];
  order: number;
}

export interface Skill {
  name: string;
  level: number;
  color: string;
}

export interface BackendSkill {
  id: string;
  category: string;
  name: string;
  level: number;
  color?: string | null;
  order: number;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: Skill[];
}

export interface BackendCertificate {
  id: string;
  name: string;
  displayName: string;
  path: string;
  type: string;
  verified: boolean;
  order: number;
}

export interface BackendContact {
  email?: string | null;
  phone?: string | null;
  location?: string | null;
  github?: string | null;
  linkedin?: string | null;
  whatsapp?: string | null;
}

export interface BackendHero {
  id?: string;
  name?: string | null;
  title?: string | null;
  subtitle?: string | null;
  description?: string | null;
  avatarUrl?: string | null;
  cvPath?: string | null;
  cvPath2?: string | null;
  roleBadge?: string | null;
  chipOne?: string | null;
  chipTwo?: string | null;
  linkedinUrl?: string | null;
  streamTitle?: string | null;
  streamHint?: string | null;
}

export interface BackendPillar {
  kicker?: string;
  title?: string;
  text?: string;
}

export interface BackendAbout {
  description?: string;
  secondaryDescription?: string | null;
  imageUrl?: string | null;
  badgeText?: string | null;
  titlePrefix?: string | null;
  titleAccent?: string | null;
  quote?: string | null;
  pillars?: BackendPillar[];
  motionKicker?: string | null;
  motionTitle?: string | null;
  motionBadge?: string | null;
  interpretTitle?: string | null;
  interpretText?: string | null;
}

export interface BackendVolunteering {
  id: string;
  role: string;
  organization: string;
  period: string;
  location?: string | null;
  description: string;
  logoUrl?: string | null;
  images: string[];
  order: number;
}
