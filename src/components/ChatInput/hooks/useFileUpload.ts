import { useState, useCallback, ChangeEvent } from 'react';

export const useFileUpload = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const fileList: FileList | null = e.target.files;
    if (!fileList) return;

    setFiles((prev: File[]) => [...prev, ...Array.from(fileList as FileList)]);
  }, []);

  const removeFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const clearFiles = useCallback(() => {
    setFiles([]);
  }, []);

  return { files, handleFileChange, removeFile, clearFiles };
};
