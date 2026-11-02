# 🚇 Zyra — Transforme pontos em passagens de metrô

> **Sprint 03 — Front-end:** evolução do projeto original (HTML + CSS) para uma **Single Page Application** construída com **React + Vite + TypeScript**.

## 📃 Descrição do Projeto
O transporte público é uma das principais ações que contribuem para a redução de emissões de carbono nos grandes centros urbanos. Em São Paulo, o metrô é considerado o maior sistema de transporte metropolitano do Brasil e chega a transportar 4 milhões de passageiros por dia. A Zyra parte dessa realidade para propor uma forma sustentável e recompensadora de usar o transporte público na cidade.
 
A Zyra é uma nova funcionalidade proposta para a plataforma [SoulUp](https://soulup.io), que hoje concentra seu sistema de recompensas no Vale Energia e no pagamento de contas de luz com Pontos Soul. Com a Zyra, o usuário passa a poder converter seus Pontos Soul em saldo de transporte, disponível em sua carteira digital e utilizável em todas as estações de metrô, trens da CPTM e da ViaMobilidade/ViaQuatro na cidade de São Paulo.
 
Essa conversão é feita em parceria com a RecargaPay, empresa que já opera um sistema de saldo integrado à bilhetagem eletrônica do transporte público em São Paulo. Diferente de um bilhete com validade fixa, o modelo funciona por saldo: ao converter os Pontos Soul, o valor é creditado na conta de transporte vinculada ao usuário e debitado automaticamente a cada viagem realizada.
 
Para aumentar o engajamento na plataforma, a Zyra também propõe missões e conquistas gamificadas, como check-in de entrada e saída no transporte, selfie usando o transporte público e sequências de dias de uso. Cada viagem realizada é convertida em kg de CO₂ evitado, com base no que seria emitido pelo mesmo trajeto de carro. Esse valor fica acumulado no perfil do usuário, que passa a acompanhar o impacto real das suas escolhas no dia a dia.
 
Nesta etapa do projeto (Sprint 03), a aplicação, que antes era um conjunto de páginas estáticas em HTML, CSS e JavaScript, foi reestruturada como uma aplicação React, organizada em componentes reutilizáveis, rotas dinâmicas com React Router e formulários validados com React Hook Form, mantendo a identidade visual definida nas sprints anteriores.

### ✨ Funcionalidades principais

- Conversão de Pontos Soul em saldo de transporte público (via integração com a RecargaPay)
- Catálogo de missões sustentáveis, com página de detalhe por missão (rota dinâmica)
- Sistema de conquistas por ações ecológicas e uso recorrente do transporte público
- Calculadora de impacto ambiental, com estimativa de CO₂ evitado por viagem
- Perguntas frequentes (FAQ) em formato acordeão
- Formulário de contato com validação em tempo real
- Navegação single-page com menu responsivo (hambúrguer) para mobile

<p align="center">
  <img src="./zyra-app/public/img/zyra.png" width="220" alt="Logotipo da Zyra" />
</p>

## ⚙️ Tecnologias Utilizadas

<p>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" title="React" width="40" height="40" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" title="TypeScript" width="40" height="40" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg" title="Vite" width="40" height="40" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" title="Tailwind CSS" width="40" height="40" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/npm/npm-original-wordmark.svg" title="npm" width="40" height="40" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" title="Git" width="40" height="40" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" title="GitHub" width="40" height="40" />
</p>

| Tecnologia | Função no projeto |
|---|---|
| **React 19** | Biblioteca para construção da interface por componentes |
| **Vite** | Bundler e servidor de desenvolvimento |
| **TypeScript** | Tipagem estática em todo o código, incluindo formulários |
| **Tailwind CSS v4** | Estilização e responsividade de toda a aplicação (tokens customizados via `@theme`) |
| **React Router** | Navegação SPA, rotas estáticas e dinâmicas (`useNavigate`, `useParams`) |
| **React Hook Form** | Criação e validação do formulário de contato |
| **oxlint** | Linting do código |
| **Font Awesome** | Ícones utilizados na interface |
| **Git & GitHub** | Versionamento e histórico de desenvolvimento |

> Não há consumo de API nesta sprint. Nenhuma biblioteca de UI (Bootstrap, Material UI, Chakra UI) ou de requisição HTTP (Axios) foi utilizada.

## 📁 Estrutura de Pastas

```
zyra-app/
│
├── public/
│   └── img/                        # Imagens (logo, fotos da equipe, ilustrações)
│
├── src/
│   ├── main.tsx                    # Ponto de entrada da aplicação e definição das rotas
│   ├── App.tsx                     # Layout raiz (Cabeçalho + Outlet + Rodapé)
│   ├── globals.css                 # Tokens Tailwind (@theme), reset e estilos globais
│   │
│   ├── components/                 # Componentes reutilizáveis (um por pasta)
│   │   ├── Cabecalho/              # Header + menu hambúrguer responsivo
│   │   ├── Rodape/                 # Footer
│   │   ├── BotaoPrimario/
│   │   ├── CabecalhoPagina/
│   │   ├── CalculadoraImpacto/     # Calculadora de impacto (useState)
│   │   ├── CampoTexto/ CampoTextarea/   # Inputs controlados do formulário
│   │   ├── CardConquista/ CardDestaque/ CardInfo/ CardMembro/ CardMissao/
│   │   ├── CardResultadoCalculo/
│   │   ├── ComoFazer/ PassoConversao/ SecaoPassos/
│   │   ├── FormularioContato/      # Formulário com React Hook Form
│   │   ├── HeroInicio/ HeroMissoes/ HeroSobre/
│   │   ├── ItemFaq/ ListaFaq/      # Acordeão de perguntas frequentes (useState)
│   │   ├── LinkSeta/ LinksUteis/
│   │   ├── MensagemRetorno/        # Feedback de envio do formulário
│   │   ├── SecaoAppPrint/ SecaoCalculadora/ SecaoConquistas/
│   │   ├── SecaoDestaques/ SecaoDetalhes/ SecaoMissoes/
│   │   ├── Separador/
│   │   ├── TituloErro/
│   │   └── TituloSecao/
│   │
│   ├── routes/                     # Páginas da aplicação (um componente por rota)
│   │   ├── Home/
│   │   ├── Sobre/
│   │   ├── Missoes/                 # Listagem de missões
│   │   ├── MissaoDetalhe/           # Rota dinâmica (/missoes/:id) — useParams
│   │   ├── Integrantes/
│   │   ├── Faq/
│   │   ├── Contato/
│   │   └── Error/                   # Página de erro (rota inexistente / erro de navegação)
│   │
│   ├── data/                        # Dados estáticos consumidos pelas páginas/componentes
│   │   ├── conquistas.ts  destaques.ts  detalhesConversao.ts
│   │   ├── faq.ts  integrantes.ts  missoes.ts  passosConversao.ts
│   │
│   └── types/                       # Tipagens TypeScript dos dados e props
│       ├── conquista.ts  contato.ts  destaque.ts  detalheConversao.ts
│       ├── faq.ts  integrante.ts  missao.ts  navegacao.ts  passoConversao.ts
│
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json / tsconfig.app.json / tsconfig.node.json
├── .oxlintrc.json
└── README.md
```

## 🗺️ Rotas da aplicação

| Rota | Página | Tipo |
|---|---|---|
| `/` | Home | Estática |
| `/sobre` | Sobre (como funciona a conversão) | Estática |
| `/missoes` | Missões e conquistas | Estática |
| `/missoes/:id` | Detalhe de uma missão específica | **Dinâmica** (`useParams`) |
| `/integrantes` | Integrantes do grupo | Estática |
| `/faq` | Perguntas frequentes | Estática |
| `/contato` | Formulário de contato | Estática |
| `*` | Página de erro (404 / rota inválida) | Estática |

## 💻 Como executar localmente

**Pré-requisitos:** [Node.js](https://nodejs.org/) (versão 18 ou superior) e npm instalados.

```bash
# 1. Clone o repositório
git clone https://github.com/carolinakotz/challenge-front-end-sprint-3.git

# 2. Acesse a pasta do projeto
cd zyra-app

# 3. Instale as dependências
npm install

# 4. Rode o projeto em modo desenvolvimento
npm run dev

# 5. Acesse no navegador o endereço exibido no terminal
# (por padrão: http://localhost:5173)
```

Outros scripts disponíveis:

```bash
npm run build     # Gera a versão de produção (roda tsc -b + vite build)
npm run preview   # Pré-visualiza a build de produção localmente
npm run lint      # Executa o oxlint para checagem de qualidade do código
```

## 📱 Imagens e Representações

| Logotipo Zyra | Ilustração do app SoulUp |
| :-: | :-: |
| <img src="./zyra-app/public/img/zyra.png" width="200"/> | <img src="./zyra-app/public/img/pontos-app.png" width="220"/> |

## 🎬 Vídeo de apresentação

📺 Link do vídeo no YouTube: https://www.youtube.com/watch?v=eI33T0XA65w

## 👥 Autores

| Foto | Nome | RM | Turma | GitHub | LinkedIn |
|:-:|:-:|---|---|---|---|
| <img src="https://github.com/carolinakotz.png" width="60"> | Carolina Kotz Rodrigues | 571876 | 1TDSPH | [carolinakotz](https://github.com/carolinakotz) | [carolina-kotz](https://www.linkedin.com/in/carolina-kotz/) |
| <img src="https://github.com/felipemotitsukitan.png" width="60"> | Felipe Motitsuki Tan | 570770 | 1TDSPH | [felipemotitsukitan](https://github.com/felipemotitsukitan) | [felipe-motitsuki-tan](https://www.linkedin.com/in/felipe-motitsuki-tan/) |
| <img src="https://github.com/gabefeitosa.png" width="60"> | Gabriel Feitosa de Lima | 573026 | 1TDSPH | [gabefeitosa](https://github.com/gabefeitosa) | [gabriel-feitosa-de-lima-915bb6267](https://www.linkedin.com/in/gabriel-feitosa-de-lima-915bb6267/) |
| <img src="https://github.com/Gabrieo367.png" width="60"> | João Gabriel Dantas Moura | 573101 | 1TDSPH | [Gabrieo367](https://github.com/Gabrieo367) | [joão-gabriel-059793310](https://www.linkedin.com/in/jo%C3%A3o-gabriel-059793310/) |
| <img src="https://github.com/Zayon101.png" width="60"> | Záyon Alves Marques | 571205 | 1TDSPH | [Zayon101](https://github.com/Zayon101) | [zayon-marques](https://www.linkedin.com/in/zayon-marques/) |

## 🔗 Repositório

```
https://github.com/carolinakotz/challenge-front-end-sprint-3
```

[![GitHub](https://img.shields.io/badge/Acessar_repositório-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/carolinakotz/challenge-front-end-sprint-3)

## 📬 Contato

Dúvidas ou sugestões? Fale com a equipe:
- 💼 LinkedIn dos autores (links acima)
- 🐙 GitHub dos autores (links acima)
