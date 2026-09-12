# 🏭 JSTUDIO App Factory

> **Find. Build. Measure. Scale.**  
> *Descubra. Construa. Meça. Escale.*

O **JSTUDIO App Factory** é uma plataforma e linha de produção para criar, validar, publicar e operar microapps Android e micro-SaaS de forma altamente eficiente, reduzindo continuamente o custo e o tempo de desenvolvimento do próximo produto digital.

---

## 📐 Estrutura do Monorepo

```text
jstudio-app-factory/
│
├── apps/
│   └── quanto-posso-gastar/      # App #1 (Product ID: QPG-001) - React 19 + Capacitor 8
│
├── packages/
│   ├── money/                    # Engine de cálculo financeiro em TypeScript puro
│   ├── storage/                  # Driver de persistência (Capacitor Preferences + LocalStorage)
│   ├── ui/                       # Design System React 19 + Tailwind CSS 4
│   ├── analytics/                # Telemetria anônima com filtro de privacidade
│   ├── ads/                      # Integração AdMob (IDs de teste e produção)
│   ├── consent/                  # Consentimento UMP / GDPR
│   ├── notifications/            # Lembrete diário via Local Notifications
│   └── store-check/              # Quality Gate para conformidade com a Google Play Store
│
├── templates/
│   └── mobile-calculator/        # Template scaffolding para novos microapps de cálculo
│
├── factory/
│   └── cli/                      # CLI da Fábrica (factory check, factory new-app)
│
├── docs/
│   ├── ARCHITECTURE.md           # Arquitetura e DNA de Produtos
│   └── STORE_LISTING_QPG.md      # Textos e metadados de loja para a Google Play Store
│
├── factory-metrics.json          # Métricas oficiais da fábrica (horas, reuso, pacotes)
├── pnpm-workspace.yaml           # Configuração de workspaces pnpm
├── turbo.json                    # Pipeline de compilação incremental Turborepo
└── README.md                     # Documentação principal
```

---

## 🛠️ Tech Stack & Padrões da Fábrica

| Categoria | Tecnologia | Justificativa |
| :--- | :--- | :--- |
| **Framework Web** | React 19 + Vite | Alta performance, suporte a Server/Client Components modernos |
| **Estilização** | Tailwind CSS 4 | Utilitários modernos, variáveis CSS integradas, sem builds pesados |
| **Mobile Runtime** | Capacitor 8 | Acesso nativo Android/iOS, conformidade com **Target SDK 36 (Android 16)** |
| **Linguagem** | TypeScript 5.7+ | Tipagem estrita em todo o monorepo |
| **Orquestrador Monorepo** | pnpm + Turborepo | Cache incremental de builds e gerenciamento de dependências |
| **Testes** | Vitest | Execução ultrarrápida de testes unitários no motor de cálculo |

---

## 🚀 Comandos Principais

### Instalação de Dependências
```bash
npx pnpm install
```

### Rodar o App #1 em Modo Desenvolvimento (Web)
```bash
npx pnpm --filter quanto-posso-gastar dev
```

### Executar Testes Unitários do Monorepo
```bash
npx pnpm test
```

### Executar a Compilação de Produção
```bash
npx pnpm build
```

### Rodar a Auditoria de Qualidade da Fábrica (`factory check`)
```bash
node factory/cli/index.js check
```

---

## 🔒 Princípios de Arquitetura

1. **Reutilização Obrigatória**: Nenhum aplicativo pode reescrever capacidades que pertençam a pacotes compartilhados em `packages/`.
2. **Privacidade Offline-First**: Dados financeiros ou sensíveis permanecem estritamente no armazenamento local do dispositivo do usuário.
3. **Google Play Store Target SDK 36**: Todos os builds Android devem atingir a API 36 (Android 16).
