interface PromptCardHeaderProps {
  title: string;
  pinned: boolean;
  onTogglePin: () => void;
}

export function PromptCardHeader({ title, pinned, onTogglePin }: PromptCardHeaderProps) {
  return (
    <div className="mb-2 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <h3 className="text-sm font-semibold text-slate-100">{title}</h3>
        {pinned ? (
          <span className="rounded-full border border-amber-700 bg-[#251a0b] px-2 py-0.5 text-[11px] font-semibold text-amber-200">
            Pinned
          </span>
        ) : null}
      </div>
      <button
        className="h-8 w-8 inline-flex items-center justify-center rounded-md text-amber-400 hover:text-amber-300 hover:bg-[#1c1f27] focus:outline-none focus:ring-2 focus:ring-amber-300/40"
        onClick={onTogglePin}
        aria-label={pinned ? 'Unpin prompt' : 'Pin prompt'}
        title={pinned ? 'Unpin prompt' : 'Pin prompt'}
      >
        {pinned ? '★' : '☆'}
      </button>
    </div>
  );
}
