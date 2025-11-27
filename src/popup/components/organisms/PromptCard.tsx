import type { Prompt } from '../../../models/prompt';
import { PromptCardActions } from '../molecules/PromptCardActions';
import { PromptCardBody } from '../molecules/PromptCardBody';
import { PromptCardHeader } from '../molecules/PromptCardHeader';

interface PromptCardProps {
  prompt: Prompt;
  folderName?: string | null;
  onCopy: (prompt: Prompt) => void;
  onEdit: (prompt: Prompt) => void;
  onDelete: (prompt: Prompt) => void;
  onTogglePin: (prompt: Prompt) => void;
  onSelect?: (prompt: Prompt) => void;
  isSelected?: boolean;
}

export function PromptCard({
  prompt,
  folderName,
  onCopy,
  onEdit,
  onDelete,
  onTogglePin,
  onSelect,
  isSelected = false,
}: PromptCardProps) {
  const selectedClasses = isSelected
    ? 'border-amber-500/60 shadow-[0_0_0_1px_rgba(245,158,11,0.5)]'
    : 'border-[#252932]';

  return (
    <div
      className={`mb-3 rounded-xl bg-[#11141c] px-3.5 py-3 shadow-[0_8px_24px_-18px_rgba(0,0,0,0.7)] ${selectedClasses}`}
      onClick={() => onSelect?.(prompt)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect?.(prompt);
        }
      }}
    >
      <PromptCardHeader
        title={prompt.title}
        pinned={prompt.pinned}
        onTogglePin={() => onTogglePin(prompt)}
      />
      <PromptCardBody content={prompt.content} tags={prompt.tags} folderName={folderName} />
      <PromptCardActions
        onCopy={() => onCopy(prompt)}
        onEdit={() => onEdit(prompt)}
        onDelete={() => {
          const confirmDelete = window.confirm('Delete this prompt?');
          if (confirmDelete) {
            onDelete(prompt);
          }
        }}
      />
    </div>
  );
}
