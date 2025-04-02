import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { nanoid } from 'nanoid';
import { saveFile } from '../../../shared/lib/fileStorage';
import { ChatMessage } from '../../../shared/types/files';

type ChatRooms = Record<string, ChatMessage[]>;

export const chatRoomsAtom = atomWithStorage<ChatRooms>('chat-rooms', {});

export const addMessageAtom = atom(
  null,
  async (
    get,
    set,
    message: Omit<ChatMessage, 'id' | 'time' | 'files'> & { files?: File[] },
  ) => {
    const rooms = get(chatRoomsAtom);
    const time = new Date().toLocaleTimeString().slice(0, 5);

    const savedFiles = message.files
      ? await Promise.all(
          message.files.map(async (file) => {
            const fileId = await saveFile(file);
            const fileUrl = URL.createObjectURL(file);
            return {
              id: fileId,
              name: file.name,
              type: file.type,
              size: file.size,
              url: fileUrl,
            };
          }),
        )
      : undefined;

    const newMessage: ChatMessage = {
      ...message,
      id: nanoid(),
      time,
      replyTo: message.replyTo ?? null,
      files: savedFiles,
    };

    set(chatRoomsAtom, {
      ...rooms,
      [message.roomId]: [...(rooms[message.roomId] || []), newMessage],
    });
  },
);
