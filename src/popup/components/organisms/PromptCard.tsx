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
}

export function PromptCard({
  prompt,
  folderName,
  onCopy,
  onEdit,
  onDelete,
  onTogglePin,
}: PromptCardProps) {
  return (
    <div className="mb-3 rounded-xl border border-[#252932] bg-[#11141c] px-3.5 py-3 shadow-[0_8px_24px_-18px_rgba(0,0,0,0.7)]">
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
