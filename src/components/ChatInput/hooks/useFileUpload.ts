import { useRef, useState } from 'react';

export const useFileUpload = () => {
  const [files, setFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles([...files, ...Array.from(e.target.files)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const clearFiles = () => setFiles([]);

  const openFileDialog = () => inputRef.current?.click();

  return {
    files,
    inputRef,
    handleFileChange,
    removeFile,
    clearFiles,
    openFileDialog,
  };
};
