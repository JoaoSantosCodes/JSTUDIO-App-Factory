import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'emerald' | 'amber' | 'rose' | 'slate';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'emerald',
  className = '',
}) => {
  const variants = {
    emerald: 'bg-emerald-950/80 text-emerald-400 border-emerald-500/30',
    amber: 'bg-amber-950/80 text-amber-400 border-amber-500/30',
    rose: 'bg-rose-950/80 text-rose-400 border-rose-500/30',
    slate: 'bg-slate-800 text-slate-300 border-slate-700',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
