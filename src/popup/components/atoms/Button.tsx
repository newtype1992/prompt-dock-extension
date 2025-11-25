import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
}

const baseClasses = [
  'inline-flex items-center justify-center gap-2 rounded-md text-sm font-semibold transition-all',
  'focus:outline-none focus:ring-2 focus:ring-amber-300/40 disabled:opacity-60 disabled:cursor-not-allowed',
  'px-3.5 py-2',
].join(' ');

const variantClasses: Record<ButtonVariant, string> = {
  primary: [
    'bg-amber-500 text-black shadow-[0_12px_30px_-16px_rgba(245,158,11,0.8)]',
    'hover:bg-amber-400 active:bg-amber-500',
  ].join(' '),
  secondary: ['bg-[#1c1f27] border border-[#2f333c] text-slate-100', 'hover:bg-[#232733]'].join(
    ' ',
  ),
  ghost: 'bg-transparent text-slate-300 hover:bg-[#1c1f27] border border-transparent',
};

export function Button({ children, className = '', variant = 'primary', ...props }: ButtonProps) {
  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
