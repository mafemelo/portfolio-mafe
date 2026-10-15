export type SectionId = 'about' | 'projects' | 'experience' | 'contact'
export const SECTIONS: SectionId[] = ['about', 'projects', 'experience', 'contact']

// Matiz (oklch) de cada pasta: roxo, coral, verde-água, ocre
export const HUE: Record<SectionId, number> = { about: 295, projects: 30, experience: 190, contact: 80 }