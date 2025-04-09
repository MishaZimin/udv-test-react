import { ChatFile } from '@/shared/types/types';

export type ActionItem = {
  label: string;
  value: string;
  icon?: React.ReactNode;
  danger?: boolean;
};

export type MessageProps = {
  text: string;
  time: string;
  isMine: boolean;
  senderName: string;
  files?: ChatFile[];
  customActions?: ActionItem[];
  replyTo?: null | { senderName: string | null; text: string | null };
  onAction?: (action: string) => void;
};
