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

export interface Skill {
  name: string;
  level: number;
  color: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: Skill[];
}