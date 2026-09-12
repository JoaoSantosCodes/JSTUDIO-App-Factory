import React, { useState } from 'react';
import { Button, Modal } from '@jstudio/ui';
import { formatCurrency } from '@jstudio/money';

export interface AddExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddExpense: (amount: number, description: string, category: string) => void;
  currentRemainingToday: number;
}

export const AddExpenseModal: React.FC<AddExpenseModalProps> = ({
  isOpen,
  onClose,
  onAddExpense,
  currentRemainingToday,
}) => {
  const [amountStr, setAmountStr] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Alimentação');

  const categories = ['Alimentação', 'Transporte', 'Lazer', 'Compras', 'Outros'];

  const numericAmount = parseFloat(amountStr.replace(',', '.')) || 0;
  const newRemainingToday = currentRemainingToday - numericAmount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (numericAmount <= 0) return;
    onAddExpense(numericAmount, description || category, category);
    setAmountStr('');
    setDescription('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Registrar Gasto">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Valor do Gasto (R$)
          </label>
          <input
            type="number"
            step="0.01"
            placeholder="0,00"
            value={amountStr}
            onChange={(e) => setAmountStr(e.target.value)}
            autoFocus
            required
            className="w-full text-3xl font-black bg-slate-950 border border-slate-700 rounded-2xl px-4 py-3 text-emerald-400 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>

        {numericAmount > 0 && (
          <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 flex justify-between items-center text-xs">
            <span className="text-slate-400">Saldo restante de hoje ficará:</span>
            <span
              className={`font-bold ${
                newRemainingToday >= 0 ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {formatCurrency(newRemainingToday)}
            </span>
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Descrição (opcional)
          </label>
          <input
            type="text"
            placeholder="Ex: Almoço no restaurante, Uber..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full text-sm bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-slate-200 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Categoria
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  category === cat
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-2 flex gap-3">
          <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
            Cancelar
          </Button>
          <Button type="submit" variant="primary" className="flex-1">
            Confirmar Gasto
          </Button>
        </div>
      </form>
    </Modal>
  );
};
