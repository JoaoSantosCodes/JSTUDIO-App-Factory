import { BudgetSettings, CycleRange, DailyBudgetCalculation, ExpenseItem } from './types';

/**
 * Formats a Date object to YYYY-MM-DD string in local time
 */
export function formatDateISO(date: Date): string {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

/**
 * Normalizes a pay day to be valid for a specific year and month
 */
function getValidPayDate(year: number, monthIndex: number, targetPayDay: number): Date {
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const actualDay = Math.min(targetPayDay, daysInMonth);
  return new Date(year, monthIndex, actualDay, 0, 0, 0, 0);
}

/**
 * Calculates start, end, and remaining days of the current salary cycle
 */
export function getCycleRange(payDay: number, referenceDate: Date = new Date()): CycleRange {
  const refYear = referenceDate.getFullYear();
  const refMonth = referenceDate.getMonth();
  const refDay = referenceDate.getDate();

  let cycleStart: Date;
  let cycleEnd: Date;

  const currentMonthPayDate = getValidPayDate(refYear, refMonth, payDay);

  if (refDay >= currentMonthPayDate.getDate()) {
    // Current cycle started this month
    cycleStart = currentMonthPayDate;
    const nextMonthPayDate = getValidPayDate(refYear, refMonth + 1, payDay);
    cycleEnd = new Date(nextMonthPayDate);
    cycleEnd.setDate(cycleEnd.getDate() - 1);
  } else {
    // Current cycle started last month
    const lastMonthPayDate = getValidPayDate(refYear, refMonth - 1, payDay);
    cycleStart = lastMonthPayDate;
    cycleEnd = new Date(currentMonthPayDate);
    cycleEnd.setDate(cycleEnd.getDate() - 1);
  }

  // Calculate total days in cycle
  const msPerDay = 1000 * 60 * 60 * 24;
  const totalDays = Math.round((cycleEnd.getTime() - cycleStart.getTime()) / msPerDay) + 1;

  // Calculate days remaining (including today)
  const todayNormalized = new Date(refYear, refMonth, refDay, 0, 0, 0, 0);
  const daysRemaining = Math.max(1, Math.round((cycleEnd.getTime() - todayNormalized.getTime()) / msPerDay) + 1);

  return {
    startDate: formatDateISO(cycleStart),
    endDate: formatDateISO(cycleEnd),
    totalDays,
    daysRemaining,
  };
}

/**
 * Main calculation engine for daily budget
 */
export function calculateDailyBudget(
  settings: BudgetSettings,
  expenses: ExpenseItem[],
  now: Date = new Date()
): DailyBudgetCalculation {
  const cycle = getCycleRange(settings.payDay, now);
  const todayISO = formatDateISO(now);

  const netMonthlyBudget = Math.max(
    0,
    settings.monthlyIncome - (settings.fixedExpenses + settings.savingsGoal)
  );

  // Filter expenses strictly inside the current cycle
  const cycleExpenses = expenses.filter(
    (exp) => exp.date >= cycle.startDate && exp.date <= cycle.endDate
  );

  const totalCycleExpenses = cycleExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  const remainingCycleBudget = netMonthlyBudget - totalCycleExpenses;

  // Expenses recorded specifically today
  const spentToday = expenses
    .filter((exp) => exp.date === todayISO)
    .reduce((sum, exp) => sum + exp.amount, 0);

  // Baseline daily budget for today = (remaining cycle budget + spent today) / days remaining
  const budgetAtStartOfToday = remainingCycleBudget + spentToday;
  const dailyBudgetBaseline = budgetAtStartOfToday > 0
    ? budgetAtStartOfToday / cycle.daysRemaining
    : 0;

  const remainingToday = dailyBudgetBaseline - spentToday;

  // Projected tomorrow budget if no more expenses are added today
  const daysRemainingTomorrow = cycle.daysRemaining - 1;
  const projectedTomorrowBudget = daysRemainingTomorrow > 0
    ? Math.max(0, remainingCycleBudget / daysRemainingTomorrow)
    : 0;

  return {
    cycle,
    netMonthlyBudget,
    totalCycleExpenses,
    remainingCycleBudget,
    dailyBudgetBaseline,
    spentToday,
    remainingToday,
    projectedTomorrowBudget,
  };
}

/**
 * Helper to format currency values cleanly
 */
export function formatCurrency(
  amount: number,
  locale: string = 'pt-BR',
  currency: string = 'BRL'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
}
