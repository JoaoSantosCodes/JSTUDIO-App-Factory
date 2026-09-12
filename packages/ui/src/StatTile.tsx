import React from 'react';

export interface StatTileProps {
  label: string;
  value: string;
  subtext?: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
}

export const StatTile: React.FC<StatTileProps> = ({
  label,
  value,
  subtext,
  icon,
  trend = 'neutral',
}) => {
  const trendColors = {
    up: 'text-emerald-400',
    down: 'text-rose-400',
    neutral: 'text-slate-400',
  };

  return (
    <div className="flex flex-col p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
          {label}
        </span>
        {icon && <span className="text-slate-400">{icon}</span>}
      </div>
      <span className="text-xl font-bold text-slate-100">{value}</span>
      {subtext && (
        <span className={`text-xs mt-1 font-medium ${trendColors[trend]}`}>
          {subtext}
        </span>
      )}
    </div>
  );
};
