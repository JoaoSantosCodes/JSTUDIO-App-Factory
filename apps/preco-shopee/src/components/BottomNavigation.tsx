import React from 'react';
import { Calculator, BookmarkCheck, Settings } from 'lucide-react';

export type ShopeeTabType = 'calculator' | 'saved' | 'settings';

export interface BottomNavigationProps {
  activeTab: ShopeeTabType;
  onSelectTab: (tab: ShopeeTabType) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, onSelectTab }) => {
  const tabs = [
    { id: 'calculator' as ShopeeTabType, label: 'Calculadora', icon: Calculator },
    { id: 'saved' as ShopeeTabType, label: 'Salvos', icon: BookmarkCheck },
    { id: 'settings' as ShopeeTabType, label: 'Ajustes', icon: Settings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/90 backdrop-blur-lg border-t border-slate-800 px-6 py-2">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center py-1 px-4 rounded-2xl transition-all duration-200 ${
                isActive
                  ? 'text-amber-400 bg-amber-950/40 font-bold scale-105'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-semibold">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
