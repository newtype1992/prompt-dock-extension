interface HeaderBarProps {
  promptCount: number;
}

const LOGO_SRC = '/icons/icon32.png';

export function HeaderBar({ promptCount }: HeaderBarProps) {
  return (
    <header className="mb-1 flex items-center justify-between border-b border-[#2a2e36] pb-3">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1c1f27] border border-[#2f333c]">
          <img src={LOGO_SRC} alt="PromptDock logo" className="h-6 w-6" draggable={false} />
        </div>
        <div>
          <p className="text-xs font-semibold text-amber-400">PromptDock</p>
          <h1 className="text-lg font-bold text-slate-100">Prompt library</h1>
        </div>
      </div>
      <span className="rounded bg-[#1c1f27] px-2 py-1 text-[11px] font-semibold text-slate-300 border border-[#2f333c]">
        {promptCount} prompts
      </span>
    </header>
  );
}
