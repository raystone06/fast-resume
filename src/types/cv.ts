export interface PersonalInfo {
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  summary: string;
  photo?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export type SkillLevel = 'débutant' | 'intermédiaire' | 'avancé' | 'expert';

export interface Skill {
  id: string;
  name: string;
  level: SkillLevel;
  category: string;
}

export type TemplateId = 'modern' | 'classic' | 'minimal' | 'creative' | 'executive' | 'tech';
export type FontFamily = 'Inter' | 'Playfair Display' | 'Roboto';
export type FontSize = 'small' | 'medium' | 'large';

export interface CVStyle {
  template: TemplateId;
  primaryColor: string;
  fontFamily: FontFamily;
  fontSize: FontSize;
}

export interface CVData {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  educations: Education[];
  skills: Skill[];
  style: CVStyle;
}

export type SectionId = 'profile' | 'experience' | 'education' | 'skills' | 'style';
