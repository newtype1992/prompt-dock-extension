import type { Folder } from '../../../models/folder';

interface FolderSelectProps {
  value: string | 'all';
  folders: Folder[];
  onChange: (value: string | 'all') => void;
  labelHidden?: boolean;
}

export function FolderSelect({ value, folders, onChange, labelHidden = false }: FolderSelectProps) {
  const labelText = 'Folder';
  const gapClass = labelHidden ? 'gap-0' : 'gap-1';

  return (
    <label className={`flex w-full flex-col ${gapClass} text-xs text-slate-400`}>
      {!labelHidden ? (
        <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">
          {labelText}
        </span>
      ) : null}
      <select
        aria-label={labelHidden ? labelText : undefined}
        className="h-10 w-full rounded-lg border border-[#2f333c] bg-[#15181f] px-3 text-sm font-medium text-slate-100 shadow-[0_1px_0_rgba(0,0,0,0.05)] focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-300/40"
        value={value}
        onChange={(event) => onChange(event.target.value as FolderSelectProps['value'])}
      >
        <option value="all">All folders</option>
        {folders.map((folder) => (
          <option key={folder.id} value={folder.id}>
            {folder.name}
          </option>
        ))}
      </select>
    </label>
  );
}
