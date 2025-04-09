export type ChatFile = {
  id: string;
  name: string;
  type: string;
  size: number;
  url?: string;
};

export type ChatMessage = {
  id: string;
  text: string;
  time: string;
  senderId: string;
  senderName: string;
  roomId: string;
  replyTo?: null | { senderName: string; text: string | null };
  files?: ChatFile[];
};
