export type SectionId = 'about' | 'projects' | 'experience' | 'contact'
export const SECTIONS: SectionId[] = ['about', 'projects', 'experience', 'contact']


export const HUE: Record<SectionId, number> = { about: 295, projects: 30, experience: 190, contact: 80 }