interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
      >
        <path
          d="M13.5 12.5 17 16m-1-7a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search prompts..."
        aria-label="Search prompts"
        className="h-10 w-full rounded-lg border border-[#2f333c] bg-[#15181f] px-3 pl-10 text-sm text-slate-100 placeholder:text-slate-500 shadow-[0_1px_0_rgba(0,0,0,0.05)] focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-300/40"
      />
    </div>
  );
}
