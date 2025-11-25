import { IconButton } from '../atoms/IconButton';

interface PromptCardActionsProps {
  onCopy: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function PromptCardActions({ onCopy, onEdit, onDelete }: PromptCardActionsProps) {
  return (
    <div className="mt-3 flex items-center justify-between border-t border-[#252932] pt-3">
      <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">
        Actions
      </div>
      <div className="flex items-center gap-1">
        <IconButton icon="📋" label="Copy" onClick={onCopy} />
        <IconButton icon="✏️" label="Edit" onClick={onEdit} />
        <IconButton
          icon="🗑"
          label="Delete"
          className="text-rose-400 hover:text-rose-300 hover:bg-[#1c1417] focus:ring-rose-200/40"
          onClick={onDelete}
        />
      </div>
    </div>
  );
}
