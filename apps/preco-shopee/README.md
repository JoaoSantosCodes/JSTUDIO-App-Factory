# 🛍️ Preço Shopee — Documentação do Aplicativo

> **Product ID**: `SHP-002`  
> **Package Identifier**: `com.jstudio.precoshopee`  
> **Categoria**: Ferramentas / Business / Marketplace  
> **Stack**: React 19 + Tailwind CSS 4 + Capacitor 8 + TypeScript  

---

## 🎯 Problema que o App Resolve

Muitos vendedores da Shopee no Brasil não sabem como precificar seus produtos de forma a garanitir lucro real após descontar:
- Comissão base da Shopee (14%).
- Taxa de Programa de Frete Grátis Extra (6% adicionais, totalizando 20%).
- Taxa fixa de R$ 4,00 por item vendido.
- Teto limite de comissão máxima (R$ 100,00 por item).
- Embalagem e custos de insumos.

O **Preço Shopee** faz o cálculo inverso automático em tempo real:
> O vendedor digita o **Custo do Produto** e a **Margem de Lucro Desejada (%)**, e o aplicativo calcula instantaneamente o **Preço Recomendado de Venda (R$)** e o **Lucro Líquido Real (R$)**.

---

## 🧮 Fórmula de Precificação (`@jstudio/shopee-math`)

```text
Preço Sugerido de Venda = (Custo Produto + Outros Custos + Taxa Fixa R$ 4,00) / (1 - Taxa Comissão - Margem Desejada)
```

---

## 🚀 Reutilização da Fábrica

O App #2 reutiliza 100% dos pacotes do monorepo JSTUDIO:
- `@jstudio/ui` (Design System React 19 / Tailwind 4)
- `@jstudio/storage` (Persistência local)
- `@jstudio/analytics` (Telemetria anônima)
- `@jstudio/ads` (Banners AdMob)
- `@jstudio/consent` (Consentimento UMP / GDPR)
- `@jstudio/store-check` (Quality gate API 36)
