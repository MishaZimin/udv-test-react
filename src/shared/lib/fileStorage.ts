import localforage from 'localforage';

export interface StoredFile {
  id: string;
  file: Blob;
  name: string;
  type: string;
  size: number;
}

export const fileStorage = localforage.createInstance({
  name: 'chat-files',
  storeName: 'files',
  driver: [localforage.INDEXEDDB],
});

export async function saveFile(file: File): Promise<string> {
  const fileId = crypto.randomUUID();
  const storedFile: StoredFile = {
    id: fileId,
    file: new Blob([file], { type: file.type }),
    name: file.name,
    type: file.type,
    size: file.size,
  };
  await fileStorage.setItem(fileId, storedFile);
  return fileId;
}

export async function getFile(fileId: string): Promise<StoredFile | null> {
  return fileId ? await fileStorage.getItem<StoredFile>(fileId) : null;
}
