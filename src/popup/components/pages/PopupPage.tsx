import { useMemo, useState } from 'react';
import type { Prompt } from '../../../models/prompt';
import { generateId } from '../../utils/id';
import { usePromptData } from '../../hooks/usePromptData';
import { InlineMessage } from '../atoms/InlineMessage';
import { FolderSelect } from '../molecules/FolderSelect';
import { SearchBar } from '../molecules/SearchBar';
import { EmptyState } from '../organisms/EmptyState';
import { HeaderBar } from '../organisms/HeaderBar';
import { PromptForm, type PromptFormValues } from '../organisms/PromptForm';
import { PromptList } from '../organisms/PromptList';
import { PopupLayout } from '../templates/PopupLayout';

export function PopupPage() {
  const {
    prompts,
    folders,
    loading,
    error,
    clearError,
    setErrorMessage,
    createPrompt,
    updatePrompt,
    deletePrompt,
    createFolder,
  } = usePromptData();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFolder, setSelectedFolder] = useState<string | 'all'>('all');
  const [pinnedOnly, setPinnedOnly] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState<Prompt | null>(null);

  const filteredPrompts = useMemo(() => {
    const normalizedSearch = searchTerm.toLowerCase();

    return prompts
      .filter((prompt) => (selectedFolder === 'all' ? true : prompt.folder === selectedFolder))
      .filter((prompt) => (pinnedOnly ? prompt.pinned : true))
      .filter((prompt) => {
        if (!normalizedSearch) return true;
        return (
          prompt.title.toLowerCase().includes(normalizedSearch) ||
          prompt.content.toLowerCase().includes(normalizedSearch) ||
          prompt.tags.some((tag) => tag.toLowerCase().includes(normalizedSearch))
        );
      })
      .sort((a, b) => {
        if (a.pinned === b.pinned) {
          return b.updatedAt - a.updatedAt;
        }
        return a.pinned ? -1 : 1;
      });
  }, [prompts, searchTerm, selectedFolder, pinnedOnly]);

  const handleFolderForPrompt = async (folderName: string | null) => {
    if (!folderName) return null;
    const existingFolder = folders.find(
      (folder) => folder.name.toLowerCase() === folderName.toLowerCase(),
    );
    if (existingFolder) return existingFolder.id;

    const newFolderId = generateId();
    await createFolder({ id: newFolderId, name: folderName, createdAt: Date.now() });
    return newFolderId;
  };

  const handleSavePrompt = async (values: PromptFormValues) => {
    clearError();
    const folderId = await handleFolderForPrompt(values.folderName);
    const timestamp = Date.now();

    const promptToSave: Prompt = editingPrompt
      ? {
          ...editingPrompt,
          title: values.title,
          content: values.content,
          folder: folderId,
          tags: values.tags,
          pinned: values.pinned,
          updatedAt: timestamp,
        }
      : {
          id: values.id ?? generateId(),
          title: values.title,
          content: values.content,
          folder: folderId,
          tags: values.tags,
          pinned: values.pinned,
          createdAt: timestamp,
          updatedAt: timestamp,
        };

    if (editingPrompt) {
      await updatePrompt(promptToSave);
    } else {
      await createPrompt(promptToSave);
    }

    setShowForm(false);
    setEditingPrompt(null);
  };

  const handleEditPrompt = (prompt: Prompt) => {
    setEditingPrompt(prompt);
    setShowForm(true);
  };

  const handleDeletePrompt = async (prompt: Prompt) => {
    clearError();
    await deletePrompt(prompt.id);
    if (editingPrompt?.id === prompt.id) {
      setEditingPrompt(null);
      setShowForm(false);
    }
  };

  const handleTogglePin = async (prompt: Prompt) => {
    clearError();
    await updatePrompt({ ...prompt, pinned: !prompt.pinned, updatedAt: Date.now() });
  };

  const handleCopyPrompt = async (prompt: Prompt) => {
    try {
      await navigator.clipboard.writeText(prompt.content);
    } catch (err) {
      console.error(err);
      setErrorMessage('Could not copy the prompt. Please try again.');
    }
  };

  const hasNoMatches = !loading && prompts.length > 0 && filteredPrompts.length === 0;

  return (
    <PopupLayout header={<HeaderBar promptCount={prompts.length} />}>
      {error ? <InlineMessage message={error} variant="error" /> : null}

      <div className="rounded-lg border border-[#252932] bg-[#11141c] p-3 shadow-[0_8px_20px_-18px_rgba(0,0,0,0.7)]">
        <div className="flex items-center justify-between text-[12px] font-medium text-slate-400">
          <span>Filter &amp; find</span>
          <span className="text-slate-500">
            {filteredPrompts.length} of {prompts.length} visible
          </span>
        </div>
        <div className="mt-2 space-y-2">
          <SearchBar value={searchTerm} onChange={(value) => setSearchTerm(value)} />
          <div className="space-y-1">
            <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">
              Folder
            </div>
            <div className="grid grid-cols-[1fr_auto_auto] items-center gap-2">
              <FolderSelect
                labelHidden
                value={selectedFolder}
                folders={folders}
                onChange={setSelectedFolder}
              />
              <button
                type="button"
                className={`inline-flex h-10 items-center gap-2 rounded-md border px-3 text-sm font-semibold transition ${
                  pinnedOnly
                    ? 'border-amber-500 bg-[#251a0b] text-amber-200'
                    : 'border-[#2f333c] bg-[#1c1f27] text-slate-200 hover:border-amber-400 hover:bg-[#251a0b] hover:text-amber-200'
                }`}
                aria-pressed={pinnedOnly}
                onClick={() => setPinnedOnly((prev) => !prev)}
              >
                <span className="text-base">{pinnedOnly ? '★' : '☆'}</span>
                Pinned
              </button>
              <button
                type="button"
                className="inline-flex h-10 items-center gap-2 rounded-md bg-amber-500 px-3 text-sm font-semibold text-black shadow-[0_12px_30px_-16px_rgba(245,158,11,0.8)] hover:bg-amber-400 active:bg-amber-500"
                onClick={() => {
                  setShowForm(true);
                  setEditingPrompt(null);
                }}
              >
                + New
              </button>
            </div>
          </div>
        </div>
      </div>

      {showForm ? (
        <PromptForm
          folders={folders}
          initialPrompt={editingPrompt ?? undefined}
          onSubmit={handleSavePrompt}
          onCancel={() => {
            setShowForm(false);
            setEditingPrompt(null);
          }}
        />
      ) : null}

      {loading ? (
        <p className="text-xs text-slate-500">Loading prompts...</p>
      ) : prompts.length === 0 ? (
        <EmptyState
          onAddPrompt={() => {
            setShowForm(true);
            setEditingPrompt(null);
          }}
        />
      ) : hasNoMatches ? (
        <InlineMessage
          message={
            searchTerm
              ? 'No results for your search. Try another keyword or add a new prompt.'
              : 'No prompts match your filters. Try another folder or clear pinned only.'
          }
        />
      ) : (
        <>
          <p className="text-xs text-slate-400">{filteredPrompts.length} prompts</p>
          <PromptList
            prompts={filteredPrompts}
            folders={folders}
            onCopy={handleCopyPrompt}
            onEdit={handleEditPrompt}
            onDelete={handleDeletePrompt}
            onTogglePin={handleTogglePin}
          />
        </>
      )}
    </PopupLayout>
  );
}
