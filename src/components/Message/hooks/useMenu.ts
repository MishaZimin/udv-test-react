import { useState, useEffect, useCallback } from 'react';

export const useMenu = (ref: React.RefObject<HTMLDivElement | null>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const openMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setPosition({
      x: e.clientX + 5,
      y: e.clientY + 5,
    });
    setIsOpen(true);
    setIsHovered(false);
  }, []);

  const openMenuAtElement = useCallback(
    (element: HTMLElement, isMine: boolean) => {
      const rect = element.getBoundingClientRect();
      setPosition({
        x: isMine ? rect.left - 10 : rect.right + 10,
        y: rect.top,
      });
      setIsOpen(true);
    },
    [],
  );
  const closeMenu = useCallback(() => setIsOpen(false), []);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        closeMenu();
      }
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('contextmenu', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('contextmenu', handleClickOutside);
    };
  }, [ref, closeMenu]);

  return {
    isOpen,
    isHovered,
    position,
    openMenu,
    openMenuAtElement,
    closeMenu,
    handleMouseEnter,
    handleMouseLeave,
  };
};
