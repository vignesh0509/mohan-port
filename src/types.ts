export interface Project {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  description: string;
  tags: string[];
  imageUrl: string;
  status: 'STABLE_V1.0' | 'ACTIVE_DEV' | 'COMPLETED' | 'PLANNING';
  refCode?: string;
}

export interface SkillGroup {
  languages: string[];
  toolsAndTech: string[];
  softSkills: string[];
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  description: string;
  iconName: string;
}

export interface TimelineEvent {
  id: string;
  company: string;
  role: string;
  location: string;
  date: string;
  description: string;
  isProjected?: boolean;
}

export interface SystemLog {
  id: string;
  timestamp: string;
  type: 'INFO' | 'WARN' | 'SUCCESS' | 'ERROR';
  source: string;
  message: string;
}

export interface ProfileInfo {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  location: string;
  title: string;
  objective: string;
  coreTools: string;
  systemVersion: string;
  uptimeDays: number;
  uptimeHours: number;
  uptimeMins: number;
  imageUrl: string;
}
