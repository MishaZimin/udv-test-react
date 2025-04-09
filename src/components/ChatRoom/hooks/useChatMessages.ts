import { useEffect, useMemo, useRef } from 'react';
import { getFile } from '@/shared/lib/fileStorage';
import type { ChatMessage } from '@/shared/types/types';

export function useChatMessages(messages: ChatMessage[]) {
  const blobUrls = useRef<Map<string, string>>(new Map());

  useEffect(() => {
    const currentBlobUrls = blobUrls.current;

    const activeFileIds = new Set(
      messages.flatMap((msg) => msg.files?.map((file) => file.id) || []),
    );

    return () => {
      currentBlobUrls.forEach((url, id) => {
        if (!activeFileIds.has(id)) {
          URL.revokeObjectURL(url);
          currentBlobUrls.delete(id);
        }
      });
    };
  }, [messages]);

  useEffect(() => {
    const loadFiles = async () => {
      const filesToLoad = messages
        .flatMap((msg) => msg.files || [])
        .filter((file) => !blobUrls.current.has(file.id));

      await Promise.all(
        filesToLoad.map(async (file) => {
          try {
            const storedFile = await getFile(file.id);
            if (storedFile) {
              const blobUrl = URL.createObjectURL(storedFile.file);
              blobUrls.current.set(file.id, blobUrl);
            }
          } catch (error) {
            console.error('Failed to load file:', file.id, error);
          }
        }),
      );
    };

    loadFiles();
  }, [messages]);

  const enrichMessage = (message: ChatMessage): ChatMessage => {
    if (!message.files) return message;
  
    const filesWithUrls = message.files.map(file => ({
      ...file,
      url: blobUrls.current.get(file.id)
    }));
  
    return { ...message, files: filesWithUrls };
  };
  
  return useMemo(() => messages.map(enrichMessage), [messages]);
}
