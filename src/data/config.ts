// ============================================================
//  PONTOS A PREENCHER — tudo que depende da Mafê fica aqui.
//  Itens marcados com TODO ainda precisam de dado real.
// ============================================================

export const CONTACT = {
  email: 'fernanda.meloereis@gmail.com',
  linkedin: 'https://www.linkedin.com/in/mariafernandameloereis',
  github: 'https://github.com/mafemelo',
  // TODO: número com DDI+DDD, só dígitos. Ex.: '5531999999999'. Vazio = ícone oculto.
  whatsapp: '',
}

export type Project = {
  id: 'aurora' | 'sintoniza'
  year: number
  repo: string // TODO: trocar pelo link real do repositório de cada projeto
  demo?: string // opcional: link do projeto publicado
  techs: string[] // TODO: conferir as tecnologias reais de cada projeto
  image?: string // caminho em /public/images (png, jpg ou gif)
  fit?: 'cover' | 'contain' // contain = mostra a imagem inteira (bom para telas de celular)
  bg?: string // cor de fundo quando fit = contain
}


export const PROJECTS: Project[] = [
  {
    id: 'aurora',
    year: 2025,
    repo: 'https://github.com/davimurta/Aurora.git', 
    techs: ['React Native', 'Expo', 'TypeScript'],
    image: '/images/aurora.gif',
    fit: 'contain',
    bg: '#383a37',
  },
  {
    id: 'sintoniza',
    year: 2026,
    repo: 'https://github.com/ICEI-PUC-Minas-PMGES-TI/pmg-es-2026-1-ti1-0438200-g6-1.git',
    techs: ['JavaScript', 'HTML', 'CSS'],
    image: '/images/sintoniza.jpg',
  },
]

export const TOOLS = [
  'Python', 'Java', 'JavaScript', 'TypeScript', 'HTML', 'CSS',
  'Flutter', 'React', 'SQL', 'MySQL', 'Figma',
]

export const PHOTO = '/images/mafe.jpg'