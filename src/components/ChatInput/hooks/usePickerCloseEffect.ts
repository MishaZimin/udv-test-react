import { useEffect } from 'react';

export const usePickerCloseEffect = (
  isPickerOpen: boolean,
  pickerRef: React.RefObject<HTMLDivElement | null>,
  setIsPickerOpen: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setIsPickerOpen(false);
      }
    };

    if (isPickerOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPickerOpen, pickerRef, setIsPickerOpen]);
};
