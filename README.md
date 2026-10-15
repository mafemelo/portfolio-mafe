# Portfólio — Maria Fernanda Melo e Reis

Portfólio profissional desenvolvido para o Laboratório 01 (DIAW · Engenharia de Software · PUC Minas).

**Site:** https://mafemelo.vercel.app/

## Sobre

Site pessoal com quatro seções, em português e inglês: **Sobre mim**, **Projetos** (linha do tempo), **Experiências** e **Contato** (com envio de e-mail). A navegação usa a ideia de um desktop com pastas, e também há um menu no topo.

<!-- Protótipos: adicionar aqui as imagens dos wireframes
![Wireframe desktop](docs/images/wireframe-desktop.png)
-->

## Tecnologias

- React 18 e TypeScript
- Vite
- i18next (tradução PT/EN)
- EmailJS (envio do formulário de contato)
- react-icons
- CSS puro
- Vercel (hospedagem)

## Dependências

| Pacote | Uso |
|---|---|
| `react`, `react-dom` | Interface |
| `i18next`, `react-i18next` | Tradução |
| `@emailjs/browser` | Envio de e-mail |
| `react-icons` | Ícones |
| `vite`, `typescript` | Build e tipagem |

## Estrutura

```
public/images/       fotos e imagens dos projetos
src/
  components/        telas e seções do site
  data/config.ts     links, projetos e tecnologias
  locales/           textos em português (pt.json) e inglês (en.json)
  styles/global.css  estilos e cores
  i18n.ts            configuração da tradução
  App.tsx, main.tsx
```

## Como rodar

Requer Node.js 18 ou superior.

```bash
git clone https://github.com/mafemelo/portfolio-mafe.git
cd portfolio-mafe
npm install
cp .env.example .env   # preencher com as chaves do EmailJS
npm run dev
```

O site abre em http://localhost:5173.

Variáveis do `.env`: `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_TEMPLATE_REPLY_ID` e `VITE_EMAILJS_PUBLIC_KEY`.

## Autora

Maria Fernanda Melo e Reis · [LinkedIn](https://www.linkedin.com/in/mariafernandameloereis) · [GitHub](https://github.com/mafemelo)