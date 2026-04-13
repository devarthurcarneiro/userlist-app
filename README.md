# UserList App — Desafio Front-End Júnior

Aplicação React + Vite + TypeScript que consome a API pública JSONPlaceholder e exibe uma lista de usuários com busca e modal de detalhes.

## ✅ Requisitos atendidos

- [x] Listagem de usuários via `https://jsonplaceholder.typicode.com/users`
- [x] Exibição de nome e e-mail em cada card
- [x] Campo de busca com filtro por nome (tempo real)
- [x] Modal ao clicar no usuário com: Nome, E-mail, Telefone, Empresa e Cidade
- [x] Estado de carregamento com skeleton animado
- [x] Estado de erro com botão de retry
- [x] Código organizado, componentizado e 100% tipado com TypeScript

## 🏆 Diferenciais implementados

- [x] **Tailwind CSS** com tema customizado (dark mode, cores, animações)
- [x] **UI/UX refinada**: avatares com iniciais coloridas, animações de entrada, hover states, fechar modal com ESC ou clique no backdrop
- [x] Fonte customizada (Syne + DM Sans + JetBrains Mono via Google Fonts)
- [x] Hook customizado `useUsers` com AbortController para cancelar requisições
- [x] `useMemo` e `useCallback` para performance

## 🚀 Como rodar

```bash
npm install
npm run dev
```

Acesse: [http://localhost:5173](http://localhost:5173)

## 🗂️ Estrutura do projeto

```
src/
├── components/
│   ├── ErrorState.tsx    # Tela de erro com retry
│   ├── LoadingState.tsx  # Skeleton cards animados
│   ├── SearchBar.tsx     # Input de busca com contador
│   ├── UserCard.tsx      # Card clicável de usuário
│   ├── UserList.tsx      # Grid de cards + empty state
│   └── UserModal.tsx     # Modal com detalhes completos
├── hooks/
│   └── useUsers.ts       # Fetch da API com loading/error
├── types/
│   └── user.ts           # Interfaces TypeScript da API
├── App.tsx               # Componente raiz com estado global
├── main.tsx              # Entry point
└── index.css             # Tailwind + utilitários globais
```

## 🛠️ Tecnologias

- React 18
- Vite 5
- TypeScript 5
- Tailwind CSS 3
