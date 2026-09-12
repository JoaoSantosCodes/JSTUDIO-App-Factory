import React from 'react';

export interface HeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle, action }) => {
  return (
    <header className="flex items-center justify-between py-4 px-1">
      <div>
        <h1 className="text-xl font-black bg-gradient-to-r from-emerald-400 to-teal-200 bg-clip-text text-transparent">
          {title}
        </h1>
        {subtitle && <p className="text-xs text-slate-400 font-medium mt-0.5">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </header>
  );
};
