import { useState, useEffect, useRef } from 'react';

export const useEmojiPicker = () => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClick = (e: MouseEvent) => {
      const clickedElement = e.target as Node;
      const isClickInside = pickerRef.current?.contains(clickedElement);
      const isClickOnTrigger = triggerRef.current?.contains(clickedElement);

      if (!isClickInside && !isClickOnTrigger) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [isOpen]);

  const toggle = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  return { isOpen, toggle, close, triggerRef, pickerRef };
};
