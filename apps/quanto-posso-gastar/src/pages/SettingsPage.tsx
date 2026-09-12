import React, { useState } from 'react';
import { Button, Card, Header } from '@jstudio/ui';
import { BudgetSettings } from '@jstudio/money';
import { NotificationDriver } from '@jstudio/notifications';
import { Bell, ShieldCheck, Trash2 } from 'lucide-react';

export interface SettingsPageProps {
  settings: BudgetSettings;
  onUpdateSettings: (newSettings: BudgetSettings) => void;
  onResetData: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({
  settings,
  onUpdateSettings,
  onResetData,
}) => {
  const [income, setIncome] = useState(settings.monthlyIncome.toString());
  const [payDay, setPayDay] = useState(settings.payDay.toString());
  const [fixedExpenses, setFixedExpenses] = useState(settings.fixedExpenses.toString());
  const [savingsGoal, setSavingsGoal] = useState(settings.savingsGoal.toString());
  const [reminderEnabled, setReminderEnabled] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings({
      monthlyIncome: parseFloat(income) || 0,
      payDay: parseInt(payDay, 10) || 5,
      fixedExpenses: parseFloat(fixedExpenses) || 0,
      savingsGoal: parseFloat(savingsGoal) || 0,
    });
    alert('Ajustes salvos com sucesso!');
  };

  const handleToggleReminder = async () => {
    const nextState = !reminderEnabled;
    setReminderEnabled(nextState);
    if (nextState) {
      await NotificationDriver.scheduleDailyReminder(20, 0);
    } else {
      await NotificationDriver.cancelDailyReminder();
    }
  };

  return (
    <div className="pb-24 pt-3 px-4 max-w-md mx-auto space-y-5">
      <Header title="Ajustes e Parâmetros" subtitle="Personalize os dados da sua fábrica" />

      <form onSubmit={handleSubmit} className="space-y-4">
        <Card>
          <h3 className="text-sm font-bold text-slate-200 mb-3">Parâmetros Financeiros</h3>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Renda Mensal (R$)
              </label>
              <input
                type="number"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                required
                className="w-full text-sm font-bold bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-100"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Dia do Recebimento (1 a 31)
              </label>
              <input
                type="number"
                min="1"
                max="31"
                value={payDay}
                onChange={(e) => setPayDay(e.target.value)}
                required
                className="w-full text-sm font-bold bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-100"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Gastos Fixos (R$)
              </label>
              <input
                type="number"
                value={fixedExpenses}
                onChange={(e) => setFixedExpenses(e.target.value)}
                required
                className="w-full text-sm font-bold bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-100"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Meta de Economia (R$)
              </label>
              <input
                type="number"
                value={savingsGoal}
                onChange={(e) => setSavingsGoal(e.target.value)}
                required
                className="w-full text-sm font-bold bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-100"
              />
            </div>
          </div>

          <Button type="submit" variant="primary" className="w-full mt-4 py-3">
            Salvar Alterações
          </Button>
        </Card>
      </form>

      {/* Preferences & Notifications */}
      <Card>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-emerald-400" />
            <div>
              <p className="text-sm font-bold text-slate-200">Lembrete Diário (20:00)</p>
              <p className="text-xs text-slate-400">Notificação local para registrar gastos</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleToggleReminder}
            className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
              reminderEnabled ? 'bg-emerald-500' : 'bg-slate-700'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-slate-950 transition-transform ${
                reminderEnabled ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </Card>

      {/* Privacy Guarantee */}
      <Card>
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-emerald-400 flex-shrink-0" />
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Privacidade Garantida
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Seus dados nunca saem deste aparelho. Nenhum valor financeiro é enviado para servidores.
            </p>
          </div>
        </div>
      </Card>

      {/* Factory Metadata & Reset */}
      <Card className="space-y-3">
        <div className="flex justify-between items-center text-xs text-slate-500">
          <span>Product ID: QPG-001</span>
          <span>Target SDK: 36</span>
        </div>
        <div className="flex justify-between items-center text-xs text-slate-500">
          <span>Capacitor 8 + React 19</span>
          <span>pnpm monorepo</span>
        </div>

        <div className="pt-2">
          <Button
            onClick={onResetData}
            variant="danger"
            className="w-full py-2.5 text-xs flex items-center justify-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Zerar Dados e Resetar App
          </Button>
        </div>
      </Card>
    </div>
  );
};
