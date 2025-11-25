type InlineMessageVariant = 'info' | 'error';

interface InlineMessageProps {
  message: string;
  variant?: InlineMessageVariant;
}

const variants: Record<InlineMessageVariant, string> = {
  info: 'bg-[#1a1f29] text-amber-200 border-[#2f333c]',
  error: 'bg-[#1f1416] text-rose-200 border-[#3a1f24]',
};

export function InlineMessage({ message, variant = 'info' }: InlineMessageProps) {
  return (
    <div className={`w-full rounded-lg border px-3 py-2 text-sm ${variants[variant]}`}>
      {message}
    </div>
  );
}
