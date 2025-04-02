export interface ChatFile {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  time: string;
  senderId: string;
  senderName: string;
  roomId: string;
  replyTo: null | { senderName: string; text: string | null };
  files?: ChatFile[];
}
