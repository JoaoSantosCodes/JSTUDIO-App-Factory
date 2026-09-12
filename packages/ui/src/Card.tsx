import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  gradient?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', gradient = false }) => {
  return (
    <div
      className={`rounded-3xl p-5 transition-all duration-300 ${
        gradient
          ? 'bg-gradient-to-br from-slate-900 via-emerald-950/40 to-slate-900 border border-emerald-500/20 shadow-xl shadow-emerald-950/40'
          : 'bg-slate-900/80 backdrop-blur-md border border-slate-800 shadow-lg'
      } ${className}`}
    >
      {children}
    </div>
  );
};
