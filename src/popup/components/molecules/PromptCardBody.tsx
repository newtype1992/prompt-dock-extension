import { TagList } from './TagList';

interface PromptCardBodyProps {
  content: string;
  tags: string[];
  folderName?: string | null;
}

export function PromptCardBody({ content, tags, folderName }: PromptCardBodyProps) {
  return (
    <div className="space-y-2 text-sm text-slate-200">
      {folderName ? (
        <div className="inline-flex items-center rounded-full border border-[#2f333c] bg-[#1c1f27] px-2.5 py-1 text-[11px] font-semibold text-slate-200">
          {folderName}
        </div>
      ) : null}
      <p
        className="leading-relaxed text-slate-200"
        style={{
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {content}
      </p>
      <TagList tags={tags} />
    </div>
  );
}
