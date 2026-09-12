import { describe, expect, it } from 'vitest';
import { calculateDailyBudget, formatCurrency, getCycleRange } from './calculator';
import { BudgetSettings, ExpenseItem } from './types';

describe('@jstudio/money - Daily Budget Calculator', () => {
  it('correctly calculates cycle range when payDay is in current month', () => {
    // Reference date: Sept 12, payDay: 5
    const ref = new Date(2026, 8, 12); // Month index 8 is September
    const range = getCycleRange(5, ref);

    expect(range.startDate).toBe('2026-09-05');
    expect(range.endDate).toBe('2026-10-04');
    expect(range.totalDays).toBe(30);
    // Sept 12 to Oct 04 inclusive = 23 days
    expect(range.daysRemaining).toBe(23);
  });

  it('correctly calculates cycle range when payDay is later in month', () => {
    // Reference date: Sept 3, payDay: 5
    const ref = new Date(2026, 8, 3);
    const range = getCycleRange(5, ref);

    expect(range.startDate).toBe('2026-08-05');
    expect(range.endDate).toBe('2026-09-04');
    expect(range.totalDays).toBe(31);
    // Sept 3 to Sept 4 inclusive = 2 days
    expect(range.daysRemaining).toBe(2);
  });

  it('calculates daily budget and projected tomorrow budget accurately', () => {
    const settings: BudgetSettings = {
      monthlyIncome: 3000,
      payDay: 5,
      fixedExpenses: 1000,
      savingsGoal: 200,
    };
    // Net budget = 3000 - 1000 - 200 = 1800

    const now = new Date(2026, 8, 5); // Start of cycle (Sept 5), total 30 days
    const expenses: ExpenseItem[] = [
      { id: '1', amount: 30, date: '2026-09-05', description: 'Lunch', createdAt: Date.now() },
    ];

    const result = calculateDailyBudget(settings, expenses, now);

    expect(result.netMonthlyBudget).toBe(1800);
    expect(result.totalCycleExpenses).toBe(30);
    expect(result.remainingCycleBudget).toBe(1770);
    // 1800 / 30 days = 60 per day baseline
    expect(result.dailyBudgetBaseline).toBe(60);
    expect(result.spentToday).toBe(30);
    expect(result.remainingToday).toBe(30);
    // Projected tomorrow = (1800 - 30) / 29 days = 1770 / 29 = 61.034...
    expect(result.projectedTomorrowBudget).toBeCloseTo(61.03, 1);
  });

  it('formats BRL currency correctly', () => {
    const formatted = formatCurrency(1234.5);
    expect(formatted).toContain('1.234,50');
  });
});
