import { create } from 'zustand';
import { CVData, CVStyle, Education, Experience, PersonalInfo, Skill, SectionId } from '../types/cv';

const defaultCV: CVData = {
  personalInfo: {
    firstName: 'Jean',
    lastName: 'Dupont',
    title: 'Développeur Full-Stack Senior',
    email: 'jean.dupont@email.com',
    phone: '+33 6 12 34 56 78',
    location: 'Paris, France',
    website: 'jeandupont.dev',
    linkedin: 'linkedin.com/in/jeandupont',
    summary:
      'Développeur Full-Stack passionné avec 8 ans d\'expérience dans la conception et le développement d\'applications web scalables. Expertise en React, Node.js et architecture cloud.',
  },
  experiences: [
    {
      id: '1',
      company: 'TechCorp SAS',
      position: 'Lead Développeur Full-Stack',
      startDate: '2021-01',
      endDate: '',
      current: true,
      description: 'Direction technique d\'une équipe de 5 développeurs. Architecture et développement de microservices.',
      achievements: [
        'Réduction de 40% du temps de chargement des pages',
        'Mise en place CI/CD avec GitHub Actions',
        'Mentoring de 3 développeurs juniors',
      ],
    },
  ],
  educations: [
    {
      id: '1',
      institution: 'École Polytechnique',
      degree: 'Master',
      field: 'Informatique et Systèmes Distribués',
      startDate: '2013-09',
      endDate: '2015-06',
      current: false,
      description: 'Spécialisation en architecture logicielle et systèmes distribués.',
    },
  ],
  skills: [
    { id: '1', name: 'React / TypeScript', level: 'expert', category: 'Frontend' },
    { id: '2', name: 'Node.js / Express', level: 'expert', category: 'Backend' },
    { id: '3', name: 'Docker / Kubernetes', level: 'avancé', category: 'DevOps' },
    { id: '4', name: 'PostgreSQL', level: 'avancé', category: 'Base de données' },
  ],
  style: {
    template: 'modern',
    primaryColor: '#2563eb',
    fontFamily: 'Inter',
    fontSize: 'medium',
  },
};

interface CVStore {
  cv: CVData;
  activeSection: SectionId;
  setActiveSection: (section: SectionId) => void;
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  addExperience: (exp: Experience) => void;
  updateExperience: (id: string, exp: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  addEducation: (edu: Education) => void;
  updateEducation: (id: string, edu: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  addSkill: (skill: Skill) => void;
  updateSkill: (id: string, skill: Partial<Skill>) => void;
  removeSkill: (id: string) => void;
  updateStyle: (style: Partial<CVStyle>) => void;
  importCV: (data: CVData) => void;
}

export const useCVStore = create<CVStore>((set) => ({
  cv: defaultCV,
  activeSection: 'profile',

  setActiveSection: (section) => set({ activeSection: section }),

  updatePersonalInfo: (info) =>
    set((s) => ({ cv: { ...s.cv, personalInfo: { ...s.cv.personalInfo, ...info } } })),

  addExperience: (exp) =>
    set((s) => ({ cv: { ...s.cv, experiences: [...s.cv.experiences, exp] } })),

  updateExperience: (id, exp) =>
    set((s) => ({
      cv: {
        ...s.cv,
        experiences: s.cv.experiences.map((e) => (e.id === id ? { ...e, ...exp } : e)),
      },
    })),

  removeExperience: (id) =>
    set((s) => ({
      cv: { ...s.cv, experiences: s.cv.experiences.filter((e) => e.id !== id) },
    })),

  addEducation: (edu) =>
    set((s) => ({ cv: { ...s.cv, educations: [...s.cv.educations, edu] } })),

  updateEducation: (id, edu) =>
    set((s) => ({
      cv: {
        ...s.cv,
        educations: s.cv.educations.map((e) => (e.id === id ? { ...e, ...edu } : e)),
      },
    })),

  removeEducation: (id) =>
    set((s) => ({
      cv: { ...s.cv, educations: s.cv.educations.filter((e) => e.id !== id) },
    })),

  addSkill: (skill) =>
    set((s) => ({ cv: { ...s.cv, skills: [...s.cv.skills, skill] } })),

  updateSkill: (id, skill) =>
    set((s) => ({
      cv: {
        ...s.cv,
        skills: s.cv.skills.map((sk) => (sk.id === id ? { ...sk, ...skill } : sk)),
      },
    })),

  removeSkill: (id) =>
    set((s) => ({ cv: { ...s.cv, skills: s.cv.skills.filter((sk) => sk.id !== id) } })),

  updateStyle: (style) =>
    set((s) => ({ cv: { ...s.cv, style: { ...s.cv.style, ...style } } })),

  importCV: (data) => set({ cv: data }),
}));
