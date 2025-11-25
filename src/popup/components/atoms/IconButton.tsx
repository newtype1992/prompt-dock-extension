import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  label?: string;
}

export function IconButton({ icon, label, className = '', ...props }: IconButtonProps) {
  return (
    <button
      className={`h-8 w-8 inline-flex items-center justify-center rounded-md text-slate-400 hover:text-slate-100 hover:bg-[#1c1f27] focus:outline-none focus:ring-2 focus:ring-amber-300/40 ${className}`}
      aria-label={label}
      title={label}
      {...props}
    >
      {icon}
    </button>
  );
}
