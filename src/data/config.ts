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
  image?: string // TODO: caminho em /public/images, ex.: '/images/aurora.png' (png, jpg ou gif)
}

// Ordem: do mais antigo para o mais recente (exigência do enunciado)
export const PROJECTS: Project[] = [
  {
    id: 'aurora',
    year: 2025,
    repo: 'https://github.com/mafemelo',
    techs: ['Flutter', 'Dart'],
    image: undefined,
  },
  {
    id: 'sintoniza',
    year: 2026,
    repo: 'https://github.com/mafemelo',
    techs: ['React', 'TypeScript', 'JavaScript', 'HTML', 'CSS'],
    image: undefined,
  },
]

export const TOOLS = [
  'Python', 'Java', 'JavaScript', 'TypeScript', 'HTML', 'CSS',
  'Flutter', 'React', 'SQL', 'MySQL', 'Figma',
]

export const PHOTO = '' // TODO: '/images/mafe.jpg' (coloque o arquivo em /public/images)
