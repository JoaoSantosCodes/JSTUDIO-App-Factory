# 🗺️ JSTUDIO App Factory — Roadmap Estratégico & Operacional

> **Slogan**: *Descubra. Construa. Meça. Escale.*  
> **Métrica Core**: Redução contínua do custo e tempo de construção do próximo produto digital.  
> **Princípio Estrutural**: **ZERO-COST VALIDATION FIRST** (Validação a Custo Zero Primeiro).

---

## 🏛️ A Arquitetura Estratégica da Fábrica

```text
                  JSTUDIO APP FACTORY
                         │
          ┌──────────────┴──────────────┐
          │                             │
       EVIDENCE                       FACTORY
          │                             │
   ┌──────┼──────┐             ┌────────┼────────┐
   │      │      │             │        │        │
 Trends  Play  Reviews       Templates Packages  CLI
   │      │      │             │        │        │
   └──────┴──────┘             └────────┴────────┘
          │                             │
          ▼                             ▼
       SCORE                         BUILD
          │                             │
          └─────────────┬───────────────┘
                        ▼
                     VALIDATE
                        │
                        ▼
                      LAUNCH
                        │
                        ▼
                     ANALYZE
                        │
                        ▼
                  DECISION ENGINE
                        │
             ┌──────────┼──────────┐
             ▼          ▼          ▼
           SCALE     OPTIMIZE     KILL
             │          │
             └────┬─────┘
                  ▼
              LEARNING (Taxa de Aprendizado)
                  │
                  └──────────► Próximo App
```

---

## 🚪 Regra dos Gates de Fase

Nenhuma fase seguinte começa porque "chegou a hora". Cada fase só é iniciada quando a fase anterior **comprovar numericamente sua hipótese central**.

| Fase | Nome | Hipótese Central | Gate para Avançar (Critério de Liberação) |
| :--- | :--- | :--- | :--- |
| **Fase 1** | **QPG-001 (Quanto Posso Gastar?)** | Consigo construir e publicar um microapp usando a base monorepo compartilhada. | **AAB publicado no Google Play + métricas de esforço registradas em `factory-metrics.json`**. |
| **Fase 2** | **SHP-002 (Preço Shopee)** | A base reutilizável reduz o custo/tempo do próximo aplicativo. | **Esforço $\ge$ 40% menor em horas do que no App #1**. |
| **Fase 3** | **Discover & Score Engine** | Coleta de evidências (Trends, Play, Reviews) melhora a escolha das ideias. | **Score 0-100 reproduzível e evidências gravadas no sistema**. |
| **Fase 4** | **Validate (Landing Pages)** | Posso eliminar ideias ruins a custo zero antes de escrever código nativo. | **Landing pages gratuitas com taxa de conversão calibrada**. |
| **Fase 5** | **Factory Console** | Centralização visual melhora a operação e decisão do portfólio. | **Pipeline funcional + Decision Engine aos 60/90 dias (Scale/Kill)**. |
| **Fase 6** | **AI Opportunity Analyst** | IA reduz tempo humano de pesquisa e build sem perder qualidade. | **Redução de tempo humano comprovada por MVP**. |
| **Fase 7** | **Factory SaaS** | A plataforma resolve problemas reais para terceiros (indie hackers). | **Usuários externos pagantes dispostos a assinar**. |

---

## 🆓 Princípio Estrutural: Zero-Cost Validation First

Antes de investir qualquer dinheiro em um produto, a fábrica utiliza estritamente **recursos gratuitos** para validar a demanda do mercado.

```text
IDEIA
  ↓
🔎 Discover (Evidências gratuitas)
  ↓
📊 Score
  ↓
🆓 VALIDAR COM CUSTO ≈ R$ 0
  │  ├── Cloudflare Pages / GitHub Pages
  │  ├── Firebase / Analytics (Free Tier)
  │  ├── Google Trends
  │  ├── Tráfego Orgânico / SEO / Reddit
  │  └── Google Play Organic
  ↓
Existe Demanda Real?
  │
  ├── ❌ NÃO ──► 🔴 KILL (Perda R$ 0)
  │
  └── ✅ SIM
        ↓
      BUILD (Reuso da Fábrica)
        ↓
      LAUNCH (AdMob / Monetização)
```

### Regra de Investimento Gradual (3 Níveis)

1. 🟢 **Nível 0 — R$ 0 (Validação Inicial)**:
   - Zero gastos em Google/Meta Ads, servidores pagos, domínios ou SaaS desnecessários.
   - Objetivo: Prove demanda real com custo zero.
2. 🟡 **Nível 1 — Baixo Investimento (R$ 50 – R$ 200)**:
   - Acionado **apenas** após o app demonstrar retenção e primeiros sinais de uso diário.
   - Experimentos de tráfego pago controlado, domínio próprio ou assets ASO profissionais.
3. 🔴 **Nível 2 — Investimento de Escala**:
   - Acionado quando o produto comprovar **ROI positivo e receita**.
   - Investir para acelerar um mercado que já provou sua existência.

---

## 🎯 Calibração do Score de Validação (Fase 4)

A taxa de conversão não é tratada de forma rígida, mas sim calibrada pela fórmula:

$$\text{Validation Score} = f(\text{Conversão \%}, \text{Qualidade da Intenção}, \text{Custo de Aquisição}, \text{Tamanho da Amostra})$$

### Faixas de Decisão Calibradas
- **$< 5\%$**: 🔴 **KILL** (Ideia descontinuada com R$ 0 perdido)
- **$5\% - 10\%$**: 🟡 **INVESTIGAR** (Ajustar proposta de valor ou público)
- **$10\% - 15\%$**: 🔵 **OPORTUNIDADE DE NICHO** (Rentável para nichos específicos)
- **$> 15\%$**: 🟢 **FORTE CANDIDATA** (Avança imediatamente para BUILD)

---

## 🧠 Métrica Core: Factory Learning Rate

 A fábrica deve obrigatoriamente registrar o aprendizado contínuo a cada novo lançamento no arquivo `factory-metrics.json`.

```text
APP #001 (QPG) ────► APP #002 (SHP) ────► APP #003 (ED)
  22 horas              13 horas              8 horas
 (100% base)           (-40.9%)              (-63.6%)
```

### Indicadores Registrados em `factory-metrics.json`
- `cost_per_app` (Horas totais por MVP)
- `time_to_mvp` (Dias do Discover até o Build)
- `time_to_release` (Tempo de submissão na Play Store)
- `reusable_code_percentage` (% de código importado de `@jstudio/*`)
- `cost_per_validated_product` (Custo total investido por produto validado)
- `build_failures` & `store_rejection_rate` (Qualidade do pipeline)

---

## 🛑 Regra de Ouro da Linha de Produção

> **NÃO construir o Factory Console (painel web) agora.**

O foco atual é estritamente **Fase 1 (Publicação do QPG-001) $\rightarrow$ Fase 2 (Execução do SHP-002)** para validar o gate de $\ge 40\%$ de redução de horas. Se a redução não for atingida no App #2, a infraestrutura pára e o pipeline é diagnosticado antes de adicionar novos recursos.
