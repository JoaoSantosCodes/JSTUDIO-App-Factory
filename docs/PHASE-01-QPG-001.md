# 📋 Checklist Operacional de Liberação — Fase 1 (QPG-001)

> **Product ID**: `QPG-001`  
> **Nome do App**: Quanto Posso Gastar?  
> **Package ID**: `com.jstudio.quantopossogastar`  
> **Status da Fase 1**:  
> ✅ Monorepo Foundation (`jstudio-app-factory`)  
> ✅ Core Shared Packages (`@jstudio/*`)  
> ✅ App #1 Funcional (`quanto-posso-gastar`)  
> ✅ Testes Unitários (Vitest 100% PASS)  
> ✅ Quality Gate CLI (`pnpm factory check`)  
> ✅ Target API 36 (Android 16 Google Play Requirement)  
> ⏳ AAB Release & Google Play Console Submission  
> ⏳ Registro do Baseline Real de Esforço (22h)  

---

## 🔒 Rigor da Linha de Produção (Regra dos Gates)

> **Nota de Consistência**: O aplicativo `preco-shopee` (`SHP-002`) foi estruturado como teste técnico do scaffolding CLI, mas **NÃO é um produto nem um requisito de liberação da Fase 1**. A Fase 1 foca 100% no lançamento do **QPG-001** para estabelecer o baseline oficial.

```text
FASE 1 (Foco Total no QPG-001)
├── QPG-001 (Quanto Posso Gastar?)
├── Factory Base & Shared Packages (@jstudio/*)
├── factory check & Testes
└── AAB Release & Google Play Submission
        │
        ▼
     GATE 1 PASS (AAB Submetido + Baseline 22h Registrado)
        │
        ▼
FASE 2 (Início Oficial do SHP-002)
└── Preço Shopee (SHP-002)
      │
      ▼
   ¿ Esforço ≤ 13,2h ?
   ├── ❌ NÃO (FAIL) ──► Parar fábrica & diagnosticar gargalo
   └── ✅ SIM (PASS) ──► Gate 2 Aprovado ──► Avançar para Fase 3
```

---

## ⏱️ Registro do Baseline Oficial da Fase 1 (22 Horas)

| Etapa | Horas Gastas | Descrição |
| :--- | :--- | :--- |
| **Planejamento & Specs** | 3.0h | Definição da arquitetura monorepo, Product DNA e fórmulas financeiras |
| **Desenvolvimento de Pacotes (`packages/`)** | 8.0h | `@jstudio/money`, `storage`, `ui`, `analytics`, `ads`, `consent`, `notifications`, `store-check` |
| **Desenvolvimento do App #1 (`apps/`)** | 4.0h | Telas Onboarding, Hoje, Histórico e Ajustes |
| **Testes & Quality Gate** | 2.0h | Suíte Vitest + script CLI `factory check` (Target SDK 36) |
| **Configuração Android & Capacitor 8** | 3.0h | Gradle, assets e suporte a Android 16 (API 36) |
| **Documentação & Metadados ASO** | 2.0h | Metadados Play Store (`docs/STORE_LISTING_QPG.md`) e Roadmaps |
| **TOTAL BASELINE FASE 1** | **22.0h** | **Referência oficial de cálculo para o Gate da Fase 2 ($\le 13,2$h)** |

---

## 📝 Checklist Final de Lançamento (Google Play Console)

- [x] **Monorepo & Código 100% Prontos**: App `quanto-posso-gastar` e pacotes `@jstudio/*` compilados e testados.
- [x] **Quality Gate PASS**: Executar `node factory/cli/index.js check` (Target API 36 verificado).
- [ ] **Compilar Web Assets**: `npx pnpm --filter quanto-posso-gastar build`.
- [ ] **Gerar Bundle Android**: Criar `app-release.aab` assinado no Android Studio / Gradle.
- [ ] **Cadastrar na Play Console**: Nome: `Quanto Posso Gastar? — Diário`, descrições e ASO de [`docs/STORE_LISTING_QPG.md`](file:///c:/Users/joao.carloos/OneDrive%20-%20DPSP/Documents/ObsidianPortable/Cofre/Antigravity%20IDE/JSTUDIO%20App%20Factory/docs/STORE_LISTING_QPG.md).
- [ ] **Data Safety**: Declarar que o app **não coleta nem compartilha dados financeiros**.
- [ ] **Upload AAB**: Submeter `.aab` para teste interno ou produção.

---

## 🎯 Gatilho Estrito para a Fase 2 (SHP-002)

Com o Gate 1 aprovado, a **Fase 2 (Preço Shopee)** será iniciada com o cronômetro do zero e a meta de eficiência:

$$\text{Meta SHP-002} \le 13,2\text{ horas} \quad (\ge 40\% \text{ de redução do tempo})$$
