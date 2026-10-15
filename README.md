# Portfólio — Maria Fernanda Melo e Reis (Mafê Melo)

Portfólio profissional desenvolvido para o **Laboratório 01 — Portfólio Profissional** (DIAW · Engenharia de Software · PUC Minas).

🔗 **Site publicado:** `TODO: colar aqui o link da Vercel`
📁 **Repositório:** `TODO: colar aqui o link do GitHub`

---

## Sobre o projeto

Site pessoal que apresenta trajetória, projetos, experiências e formas de contato. A interface usa a metáfora de um **desktop com pastas**: cada pasta abre uma janela com uma seção. Um menu de navegação fixo no cabeçalho dá acesso direto às mesmas seções, e o site funciona em português e inglês.

### Seções

| Seção | O que mostra |
|---|---|
| **Sobre mim** | Apresentação em PT e EN, formação, área de atuação, interesses, objetivos e ferramentas |
| **Projetos** | Linha do tempo (do mais antigo ao mais recente) com nome, descrição, tecnologias, link do GitHub e imagem ou GIF |
| **Experiências** | Estágio atual e formação, com instituição, cargo, período e descrição |
| **Contato** | Ícones (e-mail, WhatsApp, LinkedIn, GitHub) e formulário com envio por e-mail |

## Protótipos

> `TODO: inserir aqui as imagens dos wireframes do Figma (desktop e mobile) e o link do arquivo Figma.`
> Salve as imagens em `docs/images/` e referencie assim: `![Wireframe desktop](docs/images/wireframe-desktop.png)`

## Tecnologias utilizadas

- **React 18** + **TypeScript**
- **Vite 5** (build e servidor de desenvolvimento)
- **i18next / react-i18next** — internacionalização PT/EN
- **EmailJS** — envio de e-mail direto do front-end
- **react-icons** — ícones
- **CSS puro** com variáveis (sem framework de UI)
- **Hanken Grotesk** (Google Fonts)
- **Vercel** — hospedagem

## Dependências

| Pacote | Uso |
|---|---|
| `react`, `react-dom` | Interface |
| `react-i18next`, `i18next` | Tradução PT/EN |
| `@emailjs/browser` | Envio do formulário de contato |
| `react-icons` | Ícones de e-mail, WhatsApp, LinkedIn e GitHub |
| `vite`, `@vitejs/plugin-react`, `typescript` | Build e tipagem (desenvolvimento) |

## Estrutura de diretórios

```
portfolio-mafe/
├── public/
│   └── images/            # foto pessoal e imagens/GIFs dos projetos
├── docs/
│   └── images/            # imagens dos protótipos para este README
├── src/
│   ├── components/
│   │   ├── Header.tsx     # menu de navegação e troca de idioma
│   │   ├── Desktop.tsx    # tela principal com as pastas
│   │   ├── FolderWindow.tsx  # janela com abas das seções
│   │   ├── About.tsx
│   │   ├── Projects.tsx   # linha do tempo
│   │   ├── Experience.tsx
│   │   ├── Contact.tsx    # formulário (EmailJS) e ícones
│   │   ├── Footer.tsx
│   │   └── sections.ts
│   ├── data/
│   │   └── config.ts      # links, projetos, ferramentas, foto
│   ├── locales/
│   │   ├── pt.json        # textos em português
│   │   └── en.json        # textos em inglês
│   ├── styles/global.css
│   ├── i18n.ts
│   ├── App.tsx
│   └── main.tsx
├── .env.example           # modelo das variáveis do EmailJS
├── index.html
├── package.json
└── vite.config.ts
```

## Como executar localmente

Pré-requisito: **Node.js 18 ou superior**.

```bash
# 1. clonar
git clone TODO-link-do-repositorio
cd portfolio-mafe

# 2. instalar dependências
npm install

# 3. configurar o envio de e-mail (opcional em desenvolvimento)
cp .env.example .env
# preencher as 3 variáveis do EmailJS no arquivo .env

# 4. rodar
npm run dev        # http://localhost:5173

# build de produção
npm run build
npm run preview
```

> Sem as variáveis do EmailJS, o formulário abre o programa de e-mail do visitante (`mailto:`) como alternativa.

## Configuração do EmailJS

1. Crie uma conta em https://www.emailjs.com e adicione um **Email Service** (Gmail).
2. Crie um **Email Template** usando as variáveis `{{from_name}}`, `{{from_email}}`, `{{reply_to}}` e `{{message}}`. Em *To email*, coloque o e-mail que vai receber as mensagens.
3. Copie *Service ID*, *Template ID* e *Public Key* para o `.env` (local) e para **Environment Variables** na Vercel (produção).

## Deploy (Vercel)

1. Suba o projeto para o GitHub.
2. Em https://vercel.com, **Add New → Project** e importe o repositório (o Vite é detectado automaticamente).
3. Em **Environment Variables**, adicione `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID` e `VITE_EMAILJS_PUBLIC_KEY`.
4. Clique em **Deploy** e cole o link gerado no topo deste README.

## Como editar o conteúdo

- **Textos (PT/EN):** `src/locales/pt.json` e `src/locales/en.json`
- **Links, projetos, tecnologias, foto e WhatsApp:** `src/data/config.ts`
- **Imagens:** coloque os arquivos em `public/images/` e informe o caminho em `config.ts` (ex.: `/images/aurora.png`)

## Decisões de design

- **Metáfora de desktop com pastas** para dar identidade ao portfólio, com menu explícito no cabeçalho para garantir navegação clara.
- **Paleta terracota e creme** com fonte única (Hanken Grotesk), para um visual limpo.
- **Responsivo:** abaixo de 760px as pastas viram uma grade 2×2 e as janelas ocupam a tela.
- **Acessibilidade:** navegação por teclado, foco visível, janela fecha com `Esc`, rótulos nos ícones e respeito a `prefers-reduced-motion`.

## Autora

**Maria Fernanda Melo e Reis** — Engenharia de Software, PUC Minas
[LinkedIn](https://www.linkedin.com/in/mariafernandameloereis) · [GitHub](https://github.com/mafemelo)
