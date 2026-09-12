export interface BudgetSettings {
  monthlyIncome: number;
  payDay: number; // 1 to 31
  fixedExpenses: number;
  savingsGoal: number;
}

export interface ExpenseItem {
  id: string;
  amount: number;
  date: string; // ISO format YYYY-MM-DD
  description: string;
  category?: string;
  createdAt: number;
}

export interface CycleRange {
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  totalDays: number;
  daysRemaining: number; // Includes today
}

export interface DailyBudgetCalculation {
  cycle: CycleRange;
  netMonthlyBudget: number; // Income - Fixed - Savings Goal
  totalCycleExpenses: number;
  remainingCycleBudget: number;
  dailyBudgetBaseline: number; // Budget allocated for today before today's expenses
  spentToday: number;
  remainingToday: number;
  projectedTomorrowBudget: number;
}
