import type { InputHTMLAttributes } from 'react';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function TextInput({ label, className = '', ...props }: TextInputProps) {
  return (
    <label className="flex w-full flex-col gap-1 text-xs text-slate-400">
      {label && (
        <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">
          {label}
        </span>
      )}
      <input
        className={`h-10 w-full rounded-lg border border-[#2f333c] bg-[#15181f] px-3 text-sm text-slate-100 placeholder:text-slate-500 shadow-[0_1px_0_rgba(0,0,0,0.05)] focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-300/40 ${className}`}
        {...props}
      />
    </label>
  );
}
