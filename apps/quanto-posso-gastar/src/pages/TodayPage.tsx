import React from 'react';
import { Button, Card, Header, StatTile } from '@jstudio/ui';
import { DailyBudgetCalculation, ExpenseItem, formatCurrency } from '@jstudio/money';
import { PlusCircle, Wallet, TrendingDown, ArrowRight } from 'lucide-react';

export interface TodayPageProps {
  calculation: DailyBudgetCalculation;
  todayExpenses: ExpenseItem[];
  onOpenAddModal: () => void;
  onDeleteExpense: (id: string) => void;
}

export const TodayPage: React.FC<TodayPageProps> = ({
  calculation,
  todayExpenses,
  onOpenAddModal,
  onDeleteExpense,
}) => {
  const remaining = calculation.remainingToday;
  const isOverbudget = remaining < 0;

  return (
    <div className="pb-24 pt-3 px-4 max-w-md mx-auto space-y-5">
      <Header
        title="Quanto Posso Gastar?"
        subtitle={`Ciclo de ${calculation.cycle.startDate.slice(5)} até ${calculation.cycle.endDate.slice(5)} (${calculation.cycle.daysRemaining} dias restantes)`}
      />

      {/* Main Hero Card */}
      <Card gradient className="text-center py-6 px-4">
        <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase">
          Hoje Você Pode Gastar
        </span>
        <div className="mt-2 mb-3">
          <span
            className={`text-5xl font-black tracking-tight ${
              isOverbudget ? 'text-rose-400' : 'text-emerald-400'
            }`}
          >
            {formatCurrency(calculation.remainingToday)}
          </span>
        </div>

        <p className="text-xs text-slate-400 max-w-xs mx-auto">
          {isOverbudget
            ? '⚠️ Você ultrapassou o orçamento de hoje. O valor excedente foi recalculado nos próximos dias.'
            : calculation.spentToday > 0
            ? `Você já gastou ${formatCurrency(calculation.spentToday)} hoje.`
            : 'Nenhum gasto registrado hoje ainda.'}
        </p>

        <div className="mt-5">
          <Button
            onClick={onOpenAddModal}
            variant="primary"
            className="w-full py-3.5 text-base flex items-center justify-center gap-2 font-extrabold shadow-emerald-500/20 shadow-xl"
          >
            <PlusCircle className="w-5 h-5" />
            Registrar Gasto
          </Button>
        </div>
      </Card>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-2 gap-3">
        <StatTile
          label="Orçamento Inicial Hoje"
          value={formatCurrency(calculation.dailyBudgetBaseline)}
          subtext="Base do dia"
          icon={<Wallet className="w-4 h-4" />}
        />
        <StatTile
          label="Estimado Amanhã"
          value={formatCurrency(calculation.projectedTomorrowBudget)}
          subtext={calculation.spentToday > 0 ? 'Após gastos de hoje' : 'Mantendo o padrão'}
          icon={<ArrowRight className="w-4 h-4" />}
          trend={calculation.projectedTomorrowBudget >= calculation.dailyBudgetBaseline ? 'up' : 'down'}
        />
      </div>

      {/* Today's Expense List */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-sm font-bold text-slate-200">Gastos de Hoje</h3>
          <span className="text-xs text-slate-400 font-semibold">{todayExpenses.length} registro(s)</span>
        </div>

        {todayExpenses.length === 0 ? (
          <div className="text-center py-8 rounded-2xl bg-slate-900/40 border border-slate-800/60">
            <TrendingDown className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-xs text-slate-400 font-medium">Sua carteira está intacta hoje! 🎉</p>
          </div>
        ) : (
          <div className="space-y-2">
            {todayExpenses.map((exp) => (
              <div
                key={exp.id}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800"
              >
                <div>
                  <p className="text-sm font-bold text-slate-200">{exp.description}</p>
                  {exp.category && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-800 text-slate-400">
                      {exp.category}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-black text-rose-400">
                    -{formatCurrency(exp.amount)}
                  </span>
                  <button
                    onClick={() => onDeleteExpense(exp.id)}
                    className="text-slate-500 hover:text-rose-400 p-1 text-xs"
                    title="Excluir gasto"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
