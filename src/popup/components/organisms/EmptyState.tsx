import { Button } from '../atoms/Button';

interface EmptyStateProps {
  onAddPrompt: () => void;
}

export function EmptyState({ onAddPrompt }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[#2f333c] bg-[#11141c] px-4 py-8 text-center shadow-[0_8px_24px_-20px_rgba(0,0,0,0.7)]">
      <div className="text-2xl">✨</div>
      <h3 className="mt-2 text-base font-semibold text-slate-100">No prompts yet</h3>
      <p className="mt-1 text-sm text-slate-400">Save your go-to prompts for quick reuse.</p>
      <Button className="mt-4" onClick={onAddPrompt}>
        Add prompt
      </Button>
    </div>
  );
}
