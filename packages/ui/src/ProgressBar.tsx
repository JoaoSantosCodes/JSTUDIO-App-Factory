import React from 'react';

export interface ProgressBarProps {
  progress: number; // 0 to 100
  color?: 'emerald' | 'amber' | 'rose';
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  color = 'emerald',
  className = '',
}) => {
  const clamped = Math.min(100, Math.max(0, progress));

  const colors = {
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500',
    rose: 'bg-rose-500',
  };

  return (
    <div className={`w-full h-2 rounded-full bg-slate-800 overflow-hidden ${className}`}>
      <div
        className={`h-full transition-all duration-500 ease-out ${colors[color]}`}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
};
