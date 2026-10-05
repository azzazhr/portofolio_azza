export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription?: string;
  image: string;
  category: "Web Development" | "Web Development & IoT" | "Data Analytics" | "Mobile / Desktop";
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  isOngoing?: boolean;
}

export interface SkillCategory {
  categoryName: string;
  description: string;
  skills: {
    name: string;
    level?: string;
    iconName?: string;
    badgeColor?: string;
  }[];
}

export interface ExperienceItem {
  id: string;
  position: string;
  organization: string;
  type: string; // e.g. "Project-Based", "Scholarship", "Volunteer", "Bootcamp"
  period: string;
  description: string;
  technologies?: string[];
  achievements?: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  period: string;
  details: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  registrationNo?: string;
  description: string;
  skillsValidated: string[];
  image?: string;
  images?: string[];
  badge?: string;
}

export interface PersonalInfo {
  name: string;
  role: string;
  secondaryRole: string;
  tagline: string;
  bio: string;
  fullBio: string;
  email: string;
  location: string;
  github: string;
  linkedin: string;
  instagram?: string;
  whatsapp: string;
  whatsappMessage: string;
  stats: {
    label: string;
    value: string;
    numericValue: number;
    suffix: string;
  }[];
}
