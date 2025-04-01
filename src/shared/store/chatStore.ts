import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { nanoid } from 'nanoid';

export type ChatMessage = {
  id: string;
  text: string;
  time: string;
  senderId: string;
  senderName: string;
  roomId: string;
  replyTo: null | { senderName: string | null; text: string | null };
  files?: Array<{
    name: string;
    type: string;
    size: number;
    url: string;
  }>;
};

type ChatRooms = Record<string, ChatMessage[]>;

export const chatRoomsAtom = atomWithStorage<ChatRooms>('chat-rooms', {});

export const addMessageAtom = atom(
  null,
  (get, set, message: Omit<ChatMessage, 'id' | 'time'>) => {
    const rooms = get(chatRoomsAtom);
    const time = new Date().toLocaleTimeString().slice(0, 5);

    set(chatRoomsAtom, {
      ...rooms,
      [message.roomId]: [
        ...(rooms[message.roomId] || []),
        {
          ...message,
          id: nanoid(),
          time,
          replyTo: message.replyTo ?? null,
        },
      ],
    });
  },
);
