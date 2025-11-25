import { TagChip } from '../atoms/TagChip';

interface TagListProps {
  tags: string[];
}

export function TagList({ tags }: TagListProps) {
  if (!tags.length) return null;

  return (
    <div className="mt-2 flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <TagChip key={tag} label={tag} />
      ))}
    </div>
  );
}
