import type { Prompt } from '../../../models/prompt';

interface FavoritesBarProps {
  favorites: Prompt[];
  onCopyPrompt: (prompt: Prompt) => void;
}

export function FavoritesBar({ favorites, onCopyPrompt }: FavoritesBarProps) {
  if (!favorites.length) return null;

  return (
    <div className="mb-3 flex gap-2 overflow-x-auto">
      {favorites.map((prompt) => (
        <button
          key={prompt.id}
          type="button"
          title={prompt.title}
          className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-[#2f333c] bg-[#1c1f27] px-3 py-1 text-xs font-semibold text-slate-100 hover:border-amber-400 hover:bg-[#251a0b] hover:text-amber-200"
          onClick={() => onCopyPrompt(prompt)}
        >
          <span className="text-amber-300">★</span>
          <span className="max-w-[180px] truncate">{prompt.title}</span>
        </button>
      ))}
    </div>
  );
}
