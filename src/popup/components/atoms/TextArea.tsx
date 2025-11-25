import type { TextareaHTMLAttributes } from 'react';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export function TextArea({ label, className = '', ...props }: TextAreaProps) {
  return (
    <label className="flex w-full flex-col gap-1 text-xs text-slate-400">
      {label && (
        <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">
          {label}
        </span>
      )}
      <textarea
        className={`min-h-[120px] w-full rounded-lg border border-[#2f333c] bg-[#15181f] px-3 py-2.5 text-sm leading-relaxed text-slate-100 placeholder:text-slate-500 shadow-[0_1px_0_rgba(0,0,0,0.05)] focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-300/40 ${className}`}
        {...props}
      />
    </label>
  );
}
