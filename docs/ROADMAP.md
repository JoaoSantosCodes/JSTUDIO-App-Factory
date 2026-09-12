# 🗺️ JSTUDIO App Factory — Roadmap Estratégico (v1.0 - CONGELADO)

> **Slogan**: *Descubra. Construa. Meça. Escale.*  
> **Métrica Core**: Redução contínua do custo/tempo por experimento e maximização do **Factory ROI**.  
> **Princípio Estrutural**: **ZERO-COST VALIDATION FIRST** (Validação a Custo Zero Primeiro).  
> **Conceito Chave**: *Um aplicativo não é automaticamente um produto. É um experimento que pode se transformar em produto.*

---

## 🏛️ A Arquitetura do Sistema da Fábrica

```text
                 JSTUDIO APP FACTORY
                         │
                         ▼
                  ┌─────────────┐
                  │   EVIDENCE  │
                  └──────┬──────┘
                         ▼
                       SCORE
                         │
                         ▼
                 ZERO-COST TEST (Pré-Código)
                         │
                ┌────────┴────────┐
                │                 │
             🔴 KILL           🟢 PROCEED
                │                 │
                │                 ▼
                │              BUILD (Reuso @jstudio/*)
                │                 │
                │                 ▼
                │              LAUNCH (Google Play)
                │                 │
                │                 ▼
                │             MEASURE (Retention & Usage)
                │                 │
                │                 ▼
                │              DECIDE
                │                 │
                │       ┌─────────┼─────────┐
                │       ▼         ▼         ▼
                │     SCALE    OPTIMIZE    KILL
                │       │         │
                └───────┴─────────┴──────► LEARN (Taxa de Aprendizado)
                                             │
                                             ▼
                                      PRÓXIMO EXPERIMENTO
```

---

## ⚖️ As Duas Métricas Supremas da Fábrica

### 1. Factory Learning Rate (Taxa de Aprendizado)
Reflete quanto a fábrica fica mais eficiente a cada aplicativo criado.
- **App #1 (QPG-001)**: 22.0 horas (Baseline de Infraestrutura).
- **App #2 (SHP-002)**: **Meta Estrita $\le 13,2$ horas** ($22\text{h} \times 0.6 = 13,2\text{h}$, representando $\ge 40\%$ de redução).

### 2. Factory ROI (Retorno sobre Investimento da Fábrica)
Responde se o tempo e o dinheiro investidos na linha de produção se transformam em retorno financeiro real.

$$\text{Factory ROI} = \text{Build Efficiency} + \text{Validation Efficiency} + \text{Monetization}$$

#### Tabela Oficial de Rastreio em `factory-metrics.json`
| Experimento | Horas Dev | Custo Validação (R$) | Receita (90D) | Status |
| :--- | :--- | :--- | :--- | :--- |
| **QPG-001** | 22h | R$ 0,00 | *Medindo* | 🟢 Em Operação |
| **SHP-002** | $\le 13,2$h | R$ 0,00 | *A Iniciar* | 🟡 Gate Fase 2 |

---

## 🚪 Regra dos Gates de Fase & Parada de Emergência

Nenhuma fase avança por mero calendário. Se um Gate falhar, **a fábrica é paralisada** para diagnóstico imediato do gargalo antes de escalar a complexidade.

```text
FASE 1 (QPG-001) ──► Publicação AAB + Baseline 22h
                        │
                        ▼
FASE 2 (SHP-002) ──► Meta: Esforço ≤ 13,2h (40% redução)
                        │
         ┌──────────────┴──────────────┐
         ▼                             ▼
    ✅ PASS (≤13,2h)              ❌ FAIL (>13,2h)
         │                             │
         ▼                             ▼
   Avançar para FASE 3          PARAR A FÁBRICA
  (Evidence Engine)             Diagnosticar onde as horas
                                foram gastas ──► Melhorar ──► Repetir
```

---

## 🧪 Validação vs Lançamento (Não Confundir)

- **Validação (Zero-Cost Test)**: Medir intenção de mercado **antes** de escrever o aplicativo nativo (Landing Page + CTA + Pré-cadastro + Tráfego Orgânico). Se ninguém demonstrar interesse, a ideia morre (🔴 **KILL**) com **0 horas de build nativo gastas**.
- **Lançamento (Launch)**: Publicação do APK/AAB na Play Store via automação da fábrica **apenas** para experimentos aprovados na etapa de validação.

---

## 📌 Congelamento da Versão v1.0

Esta especificação está oficializada e **CONGELADA em v1.0**. Não serão adicionadas novas automações complexas, dashboards visuais (Console) ou recursos de IA até que o **App #2 (SHP-002)** cumpra o Gate de $\le 13,2$ horas.
