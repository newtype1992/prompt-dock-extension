import type { Folder } from '../../../models/folder';
import type { Prompt } from '../../../models/prompt';
import { PromptCard } from './PromptCard';

interface PromptListProps {
  prompts: Prompt[];
  folders: Folder[];
  onCopy: (prompt: Prompt) => void;
  onEdit: (prompt: Prompt) => void;
  onDelete: (prompt: Prompt) => void;
  onTogglePin: (prompt: Prompt) => void;
}

export function PromptList({
  prompts,
  folders,
  onCopy,
  onEdit,
  onDelete,
  onTogglePin,
}: PromptListProps) {
  const folderMap = new Map(folders.map((folder) => [folder.id, folder.name]));

  return (
    <div className="mt-1 space-y-3">
      {prompts.map((prompt) => (
        <PromptCard
          key={prompt.id}
          prompt={prompt}
          folderName={prompt.folder ? (folderMap.get(prompt.folder) ?? null) : null}
          onCopy={onCopy}
          onEdit={onEdit}
          onDelete={onDelete}
          onTogglePin={onTogglePin}
        />
      ))}
    </div>
  );
}
