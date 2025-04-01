import { ActionItem } from '../ui/MessageActions';

export type MessageProps = {
  text: string;
  time: string;
  isMine: boolean;
  senderName: string;
  files?: Array<{
    name: string;
    type: string;
    size: number;
    url: string;
  }>;
  onAction?: (action: string) => void;
  customActions?: ActionItem[];
  replyTo: null | { senderName: string | null; text: string | null };
};
