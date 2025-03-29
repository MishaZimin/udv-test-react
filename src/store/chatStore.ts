import { create } from "zustand";
import { persist } from "zustand/middleware";

type Message = {
  id: number;
  text: string;
  time: string;
  isMine: boolean;
};

type ChatStore = {
  messages: Message[];
  addMessage: (text: string, isMine: boolean) => void;
};

export const useChatStore = create<ChatStore>()(
  persist(
    (set) => ({
      messages: [],
      addMessage: (text, isMine) =>
        set((state) => ({
          messages: [
            ...state.messages,
            {
              id: state.messages.length + 1,
              text,
              time: new Date().toLocaleTimeString().slice(0, 5),
              isMine,
            },
          ],
        })),
    }),
    { name: "chat-storage" }
  )
);