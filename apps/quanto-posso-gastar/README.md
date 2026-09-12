# 💰 Quanto Posso Gastar? — Documentação do Aplicativo

> **Product ID**: `QPG-001`  
> **Package Identifier**: `com.jstudio.quantopossogastar`  
> **Categoria**: Finanças Pessoais / Calculadoras Utilitárias  
> **Stack**: React 19 + Tailwind CSS 4 + Capacitor 8 + TypeScript  

---

## 🎯 Problema que o App Resolve

A maioria das pessoas que tenta controlar gastos diários desiste de utilizar planilhas complexas ou aplicativos de orçamento tradicional porque eles exigem:
- Categorização exaustiva de cada centavo.
- Conexão bancária ou sincronização na nuvem com senhas.
- Curva de aprendizado longa.

O **Quanto Posso Gastar?** simplifica isso a uma única pergunta direta:
> *"Quanto dinheiro posso gastar HOJE sem comprometer minhas contas e minha meta de economia do mês?"*

---

## 🧮 Motor de Cálculo Financeiro (`@jstudio/money`)

### Fórmula do Orçamento Diário
```text
Renda Líquida do Período = Renda Mensal - (Gastos Fixos Mensais + Meta de Economia)

Orçamento Diário de Hoje = (Renda Líquida do Período - Gastos Acumulados no Ciclo + Gastos de Hoje) / Dias Restantes no Ciclo

Saldo Restante de Hoje = Orçamento Diário de Hoje - Gastos de Hoje
```

### Exemplo Prático
- **Renda Mensal**: R$ 3.000,00
- **Dia do Recebimento**: Dia 5 de cada mês
- **Gastos Fixos**: R$ 1.000,00
- **Meta de Economia**: R$ 200,00
- **Renda Líquida do Ciclo**: R$ 1.800,00
- **Total de Dias no Ciclo (5 Set a 4 Out)**: 30 dias

1. **Início do dia (5 Set)**:
   - Orçamento diário base = `1.800 / 30` = **R$ 60,00/dia**.
2. **Gasto registrado no dia**: R$ 30,00 (Almoço).
   - Saldo restante para o dia de hoje = `60 - 30` = **R$ 30,00**.
3. **Projeção para o dia seguinte (6 Set)**:
   - Saldo restante no ciclo = `1.800 - 30` = R$ 1.770,00.
   - Dias restantes = 29 dias.
   - Orçamento estimado para amanhã = `1.770 / 29` = **R$ 61,03/dia**.

> Se o usuário gastar menos hoje, seu orçamento diário dos próximos dias **aumenta**. Se gastar a mais, o excesso é diluído suavemente nos dias restantes.

---

## 📱 Telas e Fluxos do Usuário

### 1. Onboarding (`OnboardingPage.tsx`)
- Exibido apenas no primeiro acesso.
- Coleta: Renda Mensal, Dia do Recebimento, Gastos Fixos e Meta de Economia.
- Armazena as configurações localmente via `@jstudio/storage`.

### 2. Tela "Hoje" (`TodayPage.tsx`)
- Card Principal em gradiente indicando o valor exato disponível para o dia.
- Cores dinâmicas: verde quando dentro do orçamento, vermelho quando excedido.
- Métricas secundárias: Orçamento inicial do dia e Estimativa para amanhã.
- Botão de Ação Central `+ Registrar Gasto`.
- Lista resumida dos lançamentos de hoje com opção de exclusão rápida.

### 3. Tela "Histórico" (`HistoryPage.tsx`)
- Agrupamento cronológico dos gastos por data.
- Totalizadores do ciclo (Teto do período vs Total acumulado).
- Exclusão de gastos passados.

### 4. Tela "Ajustes" (`SettingsPage.tsx`)
- Edição de parâmetros financeiros a qualquer momento.
- Alternador do Lembrete Diário (dispara notificação às 20:00).
- Garantia explícita de privacidade (Offline-First).
- Exibição de metadados do aplicativo e fábrica (`QPG-001`, `Target SDK 36`).
- Botão para zerar dados e reiniciar a experiência.

---

## 🛡️ Salvaguardas de Privacidade e Telemetria

- **Zero Cloud Storage**: Nenhum valor de renda, saldo ou gasto é enviado para servidores.
- **Firebase Analytics (`@jstudio/analytics`)**: Registra apenas eventos quantitativos anônimos (`app_open`, `budget_created`, `expense_added`, `history_opened`, `settings_opened`), removendo automaticamente qualquer parâmetro financeiro antes do envio.

---

## 🤖 Guia de Build Android (Capacitor 8)

### Requisitos
- Android Studio Ladybug ou superior
- JDK 17+
- Android SDK 36 (Android 16)

### Passos de Build
```bash
# 1. Compilar o frontend web
npx pnpm --filter quanto-posso-gastar build

# 2. Adicionar o projeto Android (se ainda não adicionado)
cd apps/quanto-posso-gastar
npx cap add android

# 3. Sincronizar os assets compilados com o Android
npx cap sync android

# 4. Abrir no Android Studio para compilação do AAB/APK
npx cap open android
```

### Configuração Gradle (`android/app/build.gradle`)
```groovy
android {
    compileSdkVersion 36
    defaultConfig {
        applicationId "com.jstudio.quantopossogastar"
        minSdkVersion 24
        targetSdkVersion 36
        versionCode 1
        versionName "1.0.0"
    }
}
```
