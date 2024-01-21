import { CheckIcon, CopyIcon } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

export const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(() => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
    setCopied(true);
  }, [text]);

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => {
        setCopied(false);
      }, 3000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [copied]);

  return (
    <button
      className="group rounded-full bg-secondary p-1.5 transition-all duration-75 hover:scale-105 hover:bg-blue-100 active:scale-95"
      type="button"
      onClick={copy}
    >
      <span className="sr-only">Copy</span>
      {copied ? (
        <CheckIcon className="size-3.5 text-primary transition-all group-hover:text-blue-800" />
      ) : (
        <CopyIcon className="size-3.5 text-primary transition-all group-hover:text-blue-800" />
      )}
    </button>
  );
};
