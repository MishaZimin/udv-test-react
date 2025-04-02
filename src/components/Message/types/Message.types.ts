import { ActionItem } from '../ui/MessageActions';

export interface ChatFile {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
}

export type MessageProps = {
  text: string;
  time: string;
  isMine: boolean;
  senderName: string;
  files?: ChatFile[];
  onAction?: (action: string) => void;
  customActions?: ActionItem[];
  replyTo: null | { senderName: string | null; text: string | null };
};
