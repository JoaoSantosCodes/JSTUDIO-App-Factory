import React, { useEffect, useState } from 'react';
import { BudgetSettings, calculateDailyBudget, DailyBudgetCalculation, ExpenseItem, formatDateISO } from '@jstudio/money';
import { LocalStorageDriver } from '@jstudio/storage';
import { AnalyticsDriver } from '@jstudio/analytics';
import { ConsentDriver } from '@jstudio/consent';
import { NotificationDriver } from '@jstudio/notifications';

import { OnboardingPage } from './pages/OnboardingPage';
import { TodayPage } from './pages/TodayPage';
import { HistoryPage } from './pages/HistoryPage';
import { SettingsPage } from './pages/SettingsPage';

import { BottomNavigation, TabType } from './components/BottomNavigation';
import { AddExpenseModal } from './components/AddExpenseModal';
import { BannerAdContainer } from './components/BannerAdContainer';

const SETTINGS_KEY = '@jstudio/qpg_settings';
const EXPENSES_KEY = '@jstudio/qpg_expenses';
const ONBOARDED_KEY = '@jstudio/qpg_onboarded';

const defaultSettings: BudgetSettings = {
  monthlyIncome: 3000,
  payDay: 5,
  fixedExpenses: 1000,
  savingsGoal: 200,
};

export const App: React.FC = () => {
  const [isOnboarded, setIsOnboarded] = useState<boolean | null>(null);
  const [settings, setSettings] = useState<BudgetSettings>(defaultSettings);
  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);
  const [activeTab, setActiveTab] = useState<TabType>('today');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    async function loadInitialData() {
      await AnalyticsDriver.init();
      await ConsentDriver.requestConsent();

      const onboardedVal = await LocalStorageDriver.getItem<boolean>(ONBOARDED_KEY, false);
      const settingsVal = await LocalStorageDriver.getItem<BudgetSettings>(SETTINGS_KEY, defaultSettings);
      const expensesVal = await LocalStorageDriver.getItem<ExpenseItem[]>(EXPENSES_KEY, []);

      setSettings(settingsVal);
      setExpenses(expensesVal);
      setIsOnboarded(onboardedVal);

      if (onboardedVal) {
        AnalyticsDriver.logEvent('app_open');
        NotificationDriver.scheduleDailyReminder(20, 0);
      }
    }
    loadInitialData();
  }, []);

  const handleCompleteOnboarding = async (newSettings: BudgetSettings) => {
    setSettings(newSettings);
    setIsOnboarded(true);
    await LocalStorageDriver.setItem(SETTINGS_KEY, newSettings);
    await LocalStorageDriver.setItem(ONBOARDED_KEY, true);
    await AnalyticsDriver.logEvent('budget_created');
    await NotificationDriver.scheduleDailyReminder(20, 0);
  };

  const handleAddExpense = async (amount: number, description: string, category: string) => {
    const newExpense: ExpenseItem = {
      id: Date.now().toString(),
      amount,
      description,
      category,
      date: formatDateISO(new Date()),
      createdAt: Date.now(),
    };
    const updated = [newExpense, ...expenses];
    setExpenses(updated);
    await LocalStorageDriver.setItem(EXPENSES_KEY, updated);
    await AnalyticsDriver.logEvent('expense_added');
  };

  const handleDeleteExpense = async (id: string) => {
    const updated = expenses.filter((e) => e.id !== id);
    setExpenses(updated);
    await LocalStorageDriver.setItem(EXPENSES_KEY, updated);
    await AnalyticsDriver.logEvent('expense_deleted');
  };

  const handleUpdateSettings = async (newSettings: BudgetSettings) => {
    setSettings(newSettings);
    await LocalStorageDriver.setItem(SETTINGS_KEY, newSettings);
  };

  const handleResetData = async () => {
    if (confirm('Tem certeza que deseja apagar todos os lançamentos e configurações?')) {
      await LocalStorageDriver.clearAll();
      setExpenses([]);
      setSettings(defaultSettings);
      setIsOnboarded(false);
    }
  };

  if (isOnboarded === null) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 text-xs">
        Carregando JSTUDIO App Factory...
      </div>
    );
  }

  if (!isOnboarded) {
    return <OnboardingPage onComplete={handleCompleteOnboarding} />;
  }

  const calculation: DailyBudgetCalculation = calculateDailyBudget(settings, expenses);
  const todayISO = formatDateISO(new Date());
  const todayExpenses = expenses.filter((e) => e.date === todayISO);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-slate-950">
      {activeTab === 'today' && (
        <TodayPage
          calculation={calculation}
          todayExpenses={todayExpenses}
          onOpenAddModal={() => setIsAddModalOpen(true)}
          onDeleteExpense={handleDeleteExpense}
        />
      )}

      {activeTab === 'history' && (
        <HistoryPage
          calculation={calculation}
          allExpenses={expenses}
          onDeleteExpense={handleDeleteExpense}
        />
      )}

      {activeTab === 'settings' && (
        <SettingsPage
          settings={settings}
          onUpdateSettings={handleUpdateSettings}
          onResetData={handleResetData}
        />
      )}

      <BannerAdContainer />

      <BottomNavigation
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'history') AnalyticsDriver.logEvent('history_opened');
          if (tab === 'settings') AnalyticsDriver.logEvent('settings_opened');
        }}
      />

      <AddExpenseModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddExpense={handleAddExpense}
        currentRemainingToday={calculation.remainingToday}
      />
    </div>
  );
};
