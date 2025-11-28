interface TagSuggestionsProps {
  suggestions: string[];
  onAddTag: (tag: string) => void;
}

export function TagSuggestions({ suggestions, onAddTag }: TagSuggestionsProps) {
  if (!suggestions.length) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {suggestions.map((tag) => (
        <button
          key={tag}
          type="button"
          className="inline-flex items-center rounded-full border border-[#2f333c] bg-[#1c1f27] px-2.5 py-1 text-[11px] font-semibold text-slate-100 hover:border-amber-400 hover:bg-[#251a0b] hover:text-amber-200"
          onClick={() => onAddTag(tag)}
        >
          #{tag}
        </button>
      ))}
    </div>
  );
}
