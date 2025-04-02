import { getFile } from './fileStorage';

const blobCache = new Map<string, string>();

export const getBlobUrl = async (fileId: string): Promise<string | null> => {
  if (blobCache.has(fileId)) {
    return blobCache.get(fileId)!;
  }

  try {
    const storedFile = await getFile(fileId);
    if (!storedFile) return null;

    const blobUrl = URL.createObjectURL(storedFile.file);
    blobCache.set(fileId, blobUrl);
    return blobUrl;
  } catch (error) {
    console.error('Error loading file:', error);
    return null;
  }
};

export const revokeBlobUrl = (fileId: string) => {
  if (blobCache.has(fileId)) {
    URL.revokeObjectURL(blobCache.get(fileId)!);
    blobCache.delete(fileId);
  }
};
