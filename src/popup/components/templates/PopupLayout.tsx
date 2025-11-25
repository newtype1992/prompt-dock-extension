import type { ReactNode } from 'react';

interface PopupLayoutProps {
  header: ReactNode;
  children: ReactNode;
}

export function PopupLayout({ header, children }: PopupLayoutProps) {
  return (
    <div className="w-[400px] min-h-[520px] bg-[#0e0f13] p-4 text-sm text-slate-100 font-['Space_Grotesk',sans-serif]">
      {header}
      <div className="space-y-4">{children}</div>
    </div>
  );
}
