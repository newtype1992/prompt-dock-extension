interface TagChipProps {
  label: string;
}

export function TagChip({ label }: TagChipProps) {
  return (
    <span className="rounded-full border border-amber-700 bg-[#251a0b] px-2.5 py-1 text-[11px] font-semibold text-amber-200 tracking-tight">
      {label}
    </span>
  );
}
