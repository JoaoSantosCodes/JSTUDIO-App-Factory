import React, { useState } from 'react';
import { Button, Card, Header } from '@jstudio/ui';
import { BudgetSettings } from '@jstudio/money';

export interface OnboardingPageProps {
  onComplete: (settings: BudgetSettings) => void;
}

export const OnboardingPage: React.FC<OnboardingPageProps> = ({ onComplete }) => {
  const [income, setIncome] = useState('3000');
  const [payDay, setPayDay] = useState('5');
  const [fixedExpenses, setFixedExpenses] = useState('1000');
  const [savingsGoal, setSavingsGoal] = useState('200');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const settings: BudgetSettings = {
      monthlyIncome: parseFloat(income) || 0,
      payDay: parseInt(payDay, 10) || 5,
      fixedExpenses: parseFloat(fixedExpenses) || 0,
      savingsGoal: parseFloat(savingsGoal) || 0,
    };
    onComplete(settings);
  };

  return (
    <div className="min-h-screen bg-slate-950 p-5 flex flex-col justify-between max-w-md mx-auto">
      <div>
        <Header
          title="Quanto Posso Gastar?"
          subtitle="Configure seu orçamento em 30 segundos"
        />

        <Card gradient className="mt-4 mb-6">
          <p className="text-xs text-emerald-300/90 leading-relaxed">
            💡 O aplicativo calcula exatamente quanto dinheiro você tem disponível para gastar a cada dia até o próximo salário.
          </p>
        </Card>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Sua Renda Mensal (R$)
            </label>
            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              required
              className="w-full text-xl font-bold bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 text-slate-100 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Dia do Recebimento (1 a 31)
            </label>
            <input
              type="number"
              min="1"
              max="31"
              value={payDay}
              onChange={(e) => setPayDay(e.target.value)}
              required
              className="w-full text-xl font-bold bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 text-slate-100 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Gastos Fixos Mensais (Aluguel, contas...) (R$)
            </label>
            <input
              type="number"
              value={fixedExpenses}
              onChange={(e) => setFixedExpenses(e.target.value)}
              required
              className="w-full text-xl font-bold bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 text-slate-100 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Meta de Economia por mês (R$)
            </label>
            <input
              type="number"
              value={savingsGoal}
              onChange={(e) => setSavingsGoal(e.target.value)}
              required
              className="w-full text-xl font-bold bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 text-slate-100 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="pt-4">
            <Button type="submit" variant="primary" className="w-full py-4 text-base">
              Começar Agora
            </Button>
          </div>
        </form>
      </div>

      <div className="text-center py-4">
        <p className="text-xs text-slate-500">🔒 Dados 100% privados e armazenados apenas no seu celular</p>
      </div>
    </div>
  );
};
