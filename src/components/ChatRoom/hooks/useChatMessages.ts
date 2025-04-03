import { useEffect, useMemo, useRef } from 'react';
import { getFile } from '@/shared/lib/fileStorage';
import type { ChatMessage } from '@/shared/types/types';

export function useChatMessages(messages: ChatMessage[]) {
  const blobUrlsRef = useRef<Map<string, string>>(new Map());

  const enrichedMessages = useMemo(() => {
    return messages.map((msg) => {
      if (!msg.files) return msg;

      const filesWithUrls = msg.files.map((file) => {
        const url = blobUrlsRef.current.get(file.id);
        return url ? { ...file, url } : file;
      });

      return { ...msg, files: filesWithUrls };
    });
  }, [messages]);

  useEffect(() => {
    const currentBlobUrls = blobUrlsRef.current;
    const activeFileIds = new Set(
      messages.flatMap((msg) => msg.files?.map((file) => file.id) || []),
    );

    const loadMissingFiles = async () => {
      for (const msg of messages) {
        if (!msg.files) continue;

        for (const file of msg.files) {
          if (!currentBlobUrls.has(file.id)) {
            try {
              const storedFile = await getFile(file.id);
              if (storedFile) {
                const blobUrl = URL.createObjectURL(storedFile.file);
                currentBlobUrls.set(file.id, blobUrl);
              }
            } catch (error) {
              console.error('File load error:', error);
            }
          }
        }
      }
    };

    loadMissingFiles();

    return () => {
      currentBlobUrls.forEach((url, id) => {
        if (!activeFileIds.has(id)) {
          URL.revokeObjectURL(url);
          currentBlobUrls.delete(id);
        }
      });
    };
  }, [messages]);

  return enrichedMessages;
}
