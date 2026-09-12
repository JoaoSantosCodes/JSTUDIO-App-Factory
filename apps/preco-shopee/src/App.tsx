import React, { useEffect, useState } from 'react';
import { LocalStorageDriver } from '@jstudio/storage';
import { AnalyticsDriver } from '@jstudio/analytics';
import { ConsentDriver } from '@jstudio/consent';

import { CalculatorPage } from './pages/CalculatorPage';
import { SavedProduct, SavedProductsPage } from './pages/SavedProductsPage';
import { SettingsPage } from './pages/SettingsPage';
import { BottomNavigation, ShopeeTabType } from './components/BottomNavigation';
import { BannerAdContainer } from './components/BannerAdContainer';

const SAVED_PRODUCTS_KEY = '@jstudio/shopee_saved_products';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ShopeeTabType>('calculator');
  const [savedProducts, setSavedProducts] = useState<SavedProduct[]>([]);

  useEffect(() => {
    async function init() {
      await AnalyticsDriver.init();
      await ConsentDriver.requestConsent();
      const loaded = await LocalStorageDriver.getItem<SavedProduct[]>(SAVED_PRODUCTS_KEY, []);
      setSavedProducts(loaded);
      AnalyticsDriver.logEvent('app_open');
    }
    init();
  }, []);

  const handleSaveProduct = async (name: string, price: number, profit: number, cost: number) => {
    const newItem: SavedProduct = {
      id: Date.now().toString(),
      name,
      price,
      profit,
      cost,
      date: new Date().toLocaleDateString('pt-BR'),
    };
    const updated = [newItem, ...savedProducts];
    setSavedProducts(updated);
    await LocalStorageDriver.setItem(SAVED_PRODUCTS_KEY, updated);
    await AnalyticsDriver.logEvent('expense_added');
  };

  const handleDeleteProduct = async (id: string) => {
    const updated = savedProducts.filter((p) => p.id !== id);
    setSavedProducts(updated);
    await LocalStorageDriver.setItem(SAVED_PRODUCTS_KEY, updated);
    await AnalyticsDriver.logEvent('expense_deleted');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950">
      {activeTab === 'calculator' && (
        <CalculatorPage onSaveProduct={handleSaveProduct} />
      )}

      {activeTab === 'saved' && (
        <SavedProductsPage
          products={savedProducts}
          onDeleteProduct={handleDeleteProduct}
        />
      )}

      {activeTab === 'settings' && <SettingsPage />}

      <BannerAdContainer />

      <BottomNavigation
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'saved') AnalyticsDriver.logEvent('history_opened');
          if (tab === 'settings') AnalyticsDriver.logEvent('settings_opened');
        }}
      />
    </div>
  );
};
