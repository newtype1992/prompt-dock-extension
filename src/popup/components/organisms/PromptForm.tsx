import { useMemo, useState, type FormEvent } from 'react';
import type { Folder } from '../../../models/folder';
import type { Prompt } from '../../../models/prompt';
import { Button } from '../atoms/Button';
import { TextArea } from '../atoms/TextArea';
import { TextInput } from '../atoms/TextInput';

export interface PromptFormValues {
  id?: string;
  title: string;
  content: string;
  folderName: string | null;
  tags: string[];
  pinned: boolean;
}

interface PromptFormProps {
  folders: Folder[];
  initialPrompt?: Prompt;
  onSubmit: (values: PromptFormValues) => Promise<void> | void;
  onCancel?: () => void;
  autoFocusTitle?: boolean;
}

export function PromptForm({
  folders,
  initialPrompt,
  onSubmit,
  onCancel,
  autoFocusTitle = false,
}: PromptFormProps) {
  const [title, setTitle] = useState(initialPrompt?.title ?? '');
  const [content, setContent] = useState(initialPrompt?.content ?? '');
  const [folderInput, setFolderInput] = useState(() => {
    if (!initialPrompt?.folder) return '';
    const match = folders.find((f) => f.id === initialPrompt.folder);
    return match?.name ?? initialPrompt.folder;
  });
  const [tagsInput, setTagsInput] = useState(initialPrompt?.tags.join(', ') ?? '');
  const [pinned, setPinned] = useState(initialPrompt?.pinned ?? false);
  const [submitting, setSubmitting] = useState(false);
  const isEditing = Boolean(initialPrompt);

  const folderNames = useMemo(() => folders.map((folder) => folder.name), [folders]);

  const parseTags = (value: string) =>
    value
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      await onSubmit({
        id: initialPrompt?.id,
        title: title.trim(),
        content: content.trim(),
        folderName: folderInput.trim() ? folderInput.trim() : null,
        tags: parseTags(tagsInput),
        pinned,
      });
      if (!initialPrompt) {
        setTitle('');
        setContent('');
        setFolderInput('');
        setTagsInput('');
        setPinned(false);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      className="rounded-xl border border-[#252932] bg-[#11141c] p-4 shadow-[0_10px_30px_-20px_rgba(0,0,0,0.7)]"
      onSubmit={handleSubmit}
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">
          {isEditing ? 'Edit prompt' : 'Add prompt'}
        </div>
        <span className="rounded-full bg-[#1c1f27] px-2 py-0.5 text-[11px] font-semibold text-slate-200 border border-[#2f333c]">
          Quick add
        </span>
      </div>
      <div className="flex flex-col gap-3">
        <TextInput
          label="Title"
          autoFocus={autoFocusTitle}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
        <TextArea
          label="Content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          rows={4}
          required
        />
        <div className="flex flex-col gap-1 text-xs text-slate-400">
          <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">
            Folder
          </span>
          <input
            className="h-10 w-full rounded-lg border border-[#2f333c] bg-[#15181f] px-3 text-sm text-slate-100 placeholder:text-slate-500 shadow-[0_1px_0_rgba(0,0,0,0.05)] focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-300/40"
            list="folder-options"
            placeholder="Choose or type a folder"
            value={folderInput}
            onChange={(event) => setFolderInput(event.target.value)}
          />
          <datalist id="folder-options">
            {folderNames.map((name) => (
              <option key={name} value={name} />
            ))}
          </datalist>
          <p className="text-[11px] text-slate-500">Enter a new name to create a folder on save.</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
          <div className="flex-1">
            <TextInput
              label="Tags (comma separated)"
              value={tagsInput}
              onChange={(event) => setTagsInput(event.target.value)}
              placeholder="e.g. brainstorming, marketing"
            />
          </div>
          <button
            type="button"
            onClick={() => setPinned((prev) => !prev)}
            aria-pressed={pinned}
            className={`inline-flex h-10 items-center gap-2 rounded-full border px-3 text-sm font-semibold ${
              pinned
                ? 'border-amber-500 bg-[#251a0b] text-amber-200'
                : 'border-[#2f333c] bg-[#1c1f27] text-slate-200 hover:border-amber-400 hover:bg-[#251a0b] hover:text-amber-200'
            }`}
          >
            <span className="text-base">{pinned ? '★' : '☆'}</span>
            {pinned ? 'Pinned' : 'Pin this'}
          </button>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <Button type="submit" disabled={submitting}>
          {isEditing ? 'Update prompt' : 'Save prompt'}
        </Button>
        {onCancel ? (
          <Button type="button" variant="secondary" onClick={onCancel} disabled={submitting}>
            Cancel
          </Button>
        ) : null}
      </div>
    </form>
  );
}
