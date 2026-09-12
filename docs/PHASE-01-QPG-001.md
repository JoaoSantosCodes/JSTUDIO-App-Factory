# 📋 Checklist Operacional de Liberação — Fase 1 (QPG-001)

> **Product ID**: `QPG-001`  
> **Nome do App**: Quanto Posso Gastar?  
> **Package ID**: `com.jstudio.quantopossogastar`  
> **Status da Fase**: 🟢 Monorepo Concluído | 🟡 Aguardando Lançamento AAB na Play Console  

---

## ⏱️ Registro do Baseline Oficial de Horas (22 Horas)

A Fase 1 serviu para construir toda a infraestrutura da fábrica e o primeiro produto funcional. Este esforço foi contabilizado como o **baseline oficial da JSTUDIO App Factory**:

| Etapa | Horas Gastas | Descrição |
| :--- | :--- | :--- |
| **Planejamento & Specs** | 3.0h | Definição da arquitetura monorepo, Product DNA e fórmulas financeiras |
| **Desenvolvimento de Pacotes (`packages/`)** | 8.0h | `@jstudio/money`, `storage`, `ui`, `analytics`, `ads`, `consent`, `notifications`, `store-check` |
| **Desenvolvimento do App #1 (`apps/`)** | 4.0h | Telas Onboarding, Hoje, Histórico e Ajustes |
| **Testes & Quality Gate** | 2.0h | Suíte Vitest + script CLI `factory check` (Target SDK 36) |
| **Configuração Android & Capacitor 8** | 3.0h | Gradle, assets e suporte a Android 16 (API 36) |
| **Documentação & Metadados ASO** | 2.0h | Metadados Play Store (`docs/STORE_LISTING_QPG.md`) e Roadmaps |
| **TOTAL BASELINE** | **22.0h** | **Referência de cálculo para o Gate da Fase 2 ($\le 13,2$h)** |

---

## 📝 Checklist de Publicação no Google Play Console

### 1. Preparação do Build Android (AAB)
- [ ] Executar o quality gate da fábrica: `node factory/cli/index.js check` (Garantir **PASS**).
- [ ] Compilar o bundle de produção web: `npx pnpm --filter quanto-posso-gastar build`.
- [ ] Gerar o arquivo Android App Bundle (`app-release.aab`) assinado via Android Studio ou Gradle.

### 2. Configuração na Google Play Console
- [ ] Criar a aplicação no Console com o nome: `Quanto Posso Gastar? — Diário`.
- [ ] Copiar o Título, Descrição Curta e Descrição Completa contidos em [`docs/STORE_LISTING_QPG.md`](file:///c:/Users/joao.carloos/OneDrive%20-%20DPSP/Documents/ObsidianPortable/Cofre/Antigravity%20IDE/JSTUDIO%20App%20Factory/docs/STORE_LISTING_QPG.md).
- [ ] Configurar a **Declaração de Segurança dos Dados (Data Safety)**: Marcar que o app **não coleta nem compartilha dados financeiros**.
- [ ] Upload do ícone oficial ($512 \times 512$) e Feature Graphic ($1024 \times 500$).
- [ ] Upload das Screenshots do app em alta resolução.
- [ ] Submeter o arquivo `.aab` para a faixa de teste interno ou produção.

---

## 🎯 Critérios Objetivos para Declarar a Fase 1 Concluída

A **Fase 1 será oficialmente encerrada** assim que as 3 condições abaixo forem atendidas:

1. [x] **Código e Testes Validados**: Monorepo compilando sem erros e testes com 100% de aprovação.
2. [ ] **AAB Submetido**: Upload do arquivo `.aab` realizado com sucesso na Google Play Console.
3. [x] **Métricas Registradas**: Baseline de 22 horas devidamente salvo em `factory-metrics.json`.

---

## 🚪 Gatilho para a Fase 2 (SHP-002)

Com a Fase 1 concluída, a **Fase 2 (Preço Shopee)** é iniciada com a meta estrita de tempo:

$$\text{Meta SHP-002} \le 13,2\text{ horas} \quad (\ge 40\% \text{ de redução de esforço})$$
