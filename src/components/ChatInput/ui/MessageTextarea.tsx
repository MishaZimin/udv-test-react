import { useRef, useEffect, KeyboardEvent } from 'react';

export type MessageTextareaProps = {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  placeholder?: string;
};

export const MessageTextarea = ({
  value,
  onChange,
  onSend,
  placeholder,
}: MessageTextareaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  useEffect(() => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = 'auto';
    textareaRef.current.style.height = `${Math.min(
      textareaRef.current.scrollHeight,
      200,
    )}px`;
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      className="flex-1 px-3 py-2 font-base rounded-lg focus:outline-none resize-none max-h-[200px] bg-transparent"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      style={{ height: '42px' }}
      rows={1}
    />
  );
};
