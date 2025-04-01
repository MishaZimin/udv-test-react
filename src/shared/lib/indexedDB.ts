const DB_NAME = 'ChatFilesDB';
const STORE_NAME = 'files';
const DB_VERSION = 1;

const openDatabase = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        console.log('IndexedDB: Создаю объектное хранилище "files"');
        db.createObjectStore(STORE_NAME, { keyPath: 'name' });
      }
    };

    request.onsuccess = () => {
      console.log('IndexedDB: База данных открыта');
      resolve(request.result);
    };

    request.onerror = () => {
      console.error('Ошибка при открытии IndexedDB:', request.error);
      reject(request.error);
    };
  });
};

export const saveFile = async (fileName: string, file: File) => {
  try {
    const db = await openDatabase();
    const transaction = db.transaction(['files'], 'readwrite');
    const store = transaction.objectStore('files');

    const reader = new FileReader();

    reader.onloadend = () => {
      const fileData = {
        name: fileName,
        data: reader.result,
        type: file.type,
      };

      const putRequest = store.put(fileData);

      putRequest.onsuccess = () => {
        console.log('Файл сохранён в IndexedDB:', fileName);
      };

      putRequest.onerror = (err) => {
        console.error('Ошибка при сохранении файла:', err);
        throw err;
      };
    };

    reader.onerror = (err) => {
      console.error('Ошибка при чтении файла:', err);
      throw err;
    };

    reader.readAsDataURL(file);
  } catch (error) {
    console.error('Ошибка при сохранении файла:', error);
  }
};

export const getFile = async (fileName: string) => {
  const db = await openDatabase();
  const transaction = db.transaction(STORE_NAME, 'readonly');
  const store = transaction.objectStore(STORE_NAME);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return new Promise<any>((resolve, reject) => {
    const request = store.get(fileName);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};
