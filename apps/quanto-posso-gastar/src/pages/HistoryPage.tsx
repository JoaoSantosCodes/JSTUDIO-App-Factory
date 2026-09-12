import React from 'react';
import { Card, Header, StatTile } from '@jstudio/ui';
import { DailyBudgetCalculation, ExpenseItem, formatCurrency } from '@jstudio/money';
import { Trash2 } from 'lucide-react';

export interface HistoryPageProps {
  calculation: DailyBudgetCalculation;
  allExpenses: ExpenseItem[];
  onDeleteExpense: (id: string) => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({
  calculation,
  allExpenses,
  onDeleteExpense,
}) => {
  // Group expenses by date descending
  const grouped = allExpenses.reduce((acc, exp) => {
    if (!acc[exp.date]) acc[exp.date] = [];
    acc[exp.date].push(exp);
    return acc;
  }, {} as Record<string, ExpenseItem[]>);

  const sortedDates = Object.keys(grouped).sort((a, b) => (a < b ? 1 : -1));

  return (
    <div className="pb-24 pt-3 px-4 max-w-md mx-auto space-y-5">
      <Header
        title="Histórico do Ciclo"
        subtitle={`Total acumulado de gastos no período`}
      />

      <div className="grid grid-cols-2 gap-3">
        <StatTile
          label="Teto do Ciclo"
          value={formatCurrency(calculation.netMonthlyBudget)}
          subtext="Após fixos e meta"
        />
        <StatTile
          label="Total Gastos"
          value={formatCurrency(calculation.totalCycleExpenses)}
          subtext={`Saldo: ${formatCurrency(calculation.remainingCycleBudget)}`}
          trend={calculation.remainingCycleBudget >= 0 ? 'up' : 'down'}
        />
      </div>

      {sortedDates.length === 0 ? (
        <Card className="text-center py-10">
          <p className="text-xs text-slate-400">Nenhum gasto gravado neste período ainda.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {sortedDates.map((date) => {
            const dayExpenses = grouped[date];
            const dayTotal = dayExpenses.reduce((sum, e) => sum + e.amount, 0);

            return (
              <div key={date} className="space-y-2">
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {date}
                  </span>
                  <span className="text-xs font-bold text-slate-400">
                    Subtotal: {formatCurrency(dayTotal)}
                  </span>
                </div>

                {dayExpenses.map((exp) => (
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
                        className="text-slate-500 hover:text-rose-400 p-1"
                        title="Excluir"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
