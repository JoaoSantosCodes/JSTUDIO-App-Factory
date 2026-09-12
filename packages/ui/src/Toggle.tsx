import React from 'react';

export interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

export const Toggle: React.FC<ToggleProps> = ({ checked, onChange, label }) => {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <div
        className={`w-11 h-6 rounded-full transition-colors relative p-1 ${
          checked ? 'bg-emerald-500' : 'bg-slate-700'
        }`}
      >
        <div
          className={`w-4 h-4 rounded-full bg-slate-950 transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </div>
      {label && <span className="ml-3 text-xs font-semibold text-slate-300">{label}</span>}
    </label>
  );
};
